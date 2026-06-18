#!/usr/bin/env python3
"""
Generate _data/papers.yml and _data/citations.yml from _data/papers_sources.yml.

The source file is the single point of truth and is kept deliberately minimal:
discovery stays human (add an entry when a paper is reported), while titles,
authors, dates, the sequential numbering, and the citation-accumulation curve
are all produced here.

    python scripts/generate_publications.py            # normal run (uses cache)
    python scripts/generate_publications.py --refresh  # ignore cache, refetch
    python scripts/generate_publications.py --offline   # no network; IDs only

Metadata comes from INSPIRE-HEP, falling back to the arXiv API. Even with no
network at all, the script still produces valid output (numbering, years and
the curve are derived from the arXiv IDs themselves); only titles and authors
need the API. Requires PyYAML:  pip install pyyaml

This is a maintainer tool, not part of the Jekyll build.
"""

import argparse
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

try:
    import yaml
except ImportError:
    sys.exit("This script needs PyYAML. Install it with:  pip install pyyaml")

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
DATA = os.path.join(ROOT, "_data")
SRC = os.path.join(DATA, "papers_sources.yml")
CACHE = os.path.join(HERE, ".cache")
USER_AGENT = "BHPToolkit-site/1.0 (publications generator; +https://bhptoolkit.org)"

ARXIV_RE = re.compile(r"^(?:arXiv:)?(\d{4}\.\d{4,5})(v\d+)?$", re.I)


# --------------------------------------------------------------------------- #
# HTTP helpers
# --------------------------------------------------------------------------- #
def _get(url, timeout=20, retries=3):
    """GET a URL with a couple of polite retries. Returns bytes or None."""
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.read()
        except Exception as e:  # noqa: BLE001 — network errors are expected
            wait = 2 ** attempt
            if attempt < retries - 1:
                sys.stderr.write(f"  retry in {wait}s ({e})\n")
                time.sleep(wait)
    return None


def fetch_inspire(arxiv_id):
    fields = "titles,authors.full_name,collaborations,earliest_date,dois"
    url = (
        "https://inspirehep.net/api/literature?q="
        + urllib.parse.quote(f"arxiv:{arxiv_id}")
        + f"&fields={fields}&size=1"
    )
    raw = _get(url)
    if not raw:
        return None
    try:
        hits = json.loads(raw)["hits"]["hits"]
    except (KeyError, json.JSONDecodeError):
        return None
    if not hits:
        return None
    md = hits[0].get("metadata", {})
    title = (md.get("titles") or [{}])[0].get("title")
    if not title:
        return None
    authors = [a.get("full_name", "") for a in md.get("authors", [])]
    collab = [c.get("value") for c in md.get("collaborations", []) if c.get("value")]
    return {
        "title": title.strip(),
        "authors_raw": authors,
        "collaboration": collab[0] if collab else None,
        "date": (md.get("earliest_date") or "")[:7] or None,
        "doi": (md.get("dois") or [{}])[0].get("value"),
        "source": "inspire",
    }


def fetch_arxiv(arxiv_id):
    url = f"http://export.arxiv.org/api/query?id_list={arxiv_id}&max_results=1"
    raw = _get(url)
    if not raw:
        return None
    ns = {"a": "http://www.w3.org/2005/Atom"}
    try:
        entry = ET.fromstring(raw).find("a:entry", ns)
    except ET.ParseError:
        return None
    if entry is None:
        return None
    title_el = entry.find("a:title", ns)
    if title_el is None or not (title_el.text or "").strip():
        return None
    authors = [
        (a.find("a:name", ns).text or "").strip()
        for a in entry.findall("a:author", ns)
    ]
    published = entry.find("a:published", ns)
    date = (published.text[:7] if published is not None and published.text else None)
    return {
        "title": re.sub(r"\s+", " ", title_el.text).strip(),
        "authors_raw": authors,        # arXiv gives "First Last" already
        "collaboration": None,
        "date": date,
        "doi": None,
        "source": "arxiv",
        "arxiv_name_order": True,
    }


# --------------------------------------------------------------------------- #
# Formatting
# --------------------------------------------------------------------------- #
def reorder_name(name, already_first_last=False):
    name = name.strip()
    if already_first_last or "," not in name:
        return name
    last, first = name.split(",", 1)
    return f"{first.strip()} {last.strip()}".strip()


def format_authors(meta):
    names = meta.get("authors_raw") or []
    first_last = meta.get("arxiv_name_order", False)
    names = [reorder_name(n, first_last) for n in names if n.strip()]
    collab = meta.get("collaboration")
    if collab and len(names) > 10:
        return f"{collab} et al."
    if not names:
        return collab or "Unknown"
    if len(names) <= 12:
        return ", ".join(names)
    return f"{names[0]} et al."


def date_from_arxiv(arxiv_id):
    """Reliable YYYY-MM fallback straight from the new-style arXiv id."""
    m = re.match(r"(\d{2})(\d{2})\.\d+", arxiv_id)
    if not m:
        return None
    yy, mm = m.group(1), m.group(2)
    return f"20{yy}-{mm}"


# --------------------------------------------------------------------------- #
# Cache
# --------------------------------------------------------------------------- #
def cache_path(arxiv_id):
    return os.path.join(CACHE, f"{arxiv_id}.json")


def load_cache(arxiv_id):
    p = cache_path(arxiv_id)
    if os.path.exists(p):
        try:
            return json.load(open(p, encoding="utf-8"))
        except json.JSONDecodeError:
            return None
    return None


def save_cache(arxiv_id, meta):
    os.makedirs(CACHE, exist_ok=True)
    json.dump(meta, open(cache_path(arxiv_id), "w", encoding="utf-8"), ensure_ascii=False)


# --------------------------------------------------------------------------- #
# YAML output (small hand-rolled serializer for stable, diff-friendly files)
# --------------------------------------------------------------------------- #
def y(value):
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, (int, float)):
        return str(value)
    s = str(value).replace("\\", "\\\\").replace('"', '\\"')
    s = re.sub(r"\s+", " ", s).strip()
    return '"' + s + '"'


def write_papers(papers, path):
    lines = [
        "# ---------------------------------------------------------------------------",
        "# GENERATED by scripts/generate_publications.py — do not edit by hand.",
        "# Edit _data/papers_sources.yml and re-run the script instead.",
        "# ---------------------------------------------------------------------------",
    ]
    for p in papers:
        parts = [f"num: {p['num']}", f"year: {p['year']}", f"title: {y(p['title'])}",
                 f"authors: {y(p['authors'])}"]
        if p.get("arxiv"):
            parts.append(f"arxiv: {y(p['arxiv'])}")
        if p.get("doi"):
            parts.append(f"doi: {y(p['doi'])}")
        parts.append(f"contributed: {y(bool(p.get('contributed')))}")
        lines.append("- {" + ", ".join(parts) + "}")
    open(path, "w", encoding="utf-8").write("\n".join(lines) + "\n")


def write_citations(points, path):
    lines = [
        "# GENERATED by scripts/generate_publications.py — do not edit by hand.",
        "# Cumulative papers citing the Toolkit, and the subset that contributed.",
    ]
    for pt in points:
        lines.append(
            "- {date: %s, total: %d, contributed: %d}"
            % (y(pt["date"]), pt["total"], pt["contributed"])
        )
    open(path, "w", encoding="utf-8").write("\n".join(lines) + "\n")


def build_citations(papers):
    """One cumulative point per year, dated at the latest paper in that year."""
    by_year = {}
    for p in papers:
        by_year.setdefault(p["year"], []).append(p)
    points = []
    years = sorted(by_year)
    for yr in years:
        latest = max(pp["date"] for pp in by_year[yr])
        total = sum(1 for pp in papers if pp["year"] <= yr)
        contrib = sum(1 for pp in papers if pp["year"] <= yr and pp.get("contributed"))
        points.append({"date": latest, "total": total, "contributed": contrib})
    return points


# --------------------------------------------------------------------------- #
# Main
# --------------------------------------------------------------------------- #
def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--refresh", action="store_true", help="ignore cache and refetch metadata")
    ap.add_argument("--offline", action="store_true", help="do not hit the network at all")
    ap.add_argument("--source", default=SRC, help="source YAML (default _data/papers_sources.yml)")
    ap.add_argument("--sleep", type=float, default=0.3, help="seconds between API calls")
    args = ap.parse_args()

    if not os.path.exists(args.source):
        sys.exit(f"Source not found: {args.source}\n"
                 f"Bootstrap it with: python scripts/migrate_legacy_list.py")

    sources = yaml.safe_load(open(args.source, encoding="utf-8")) or []
    records = []
    seen = set()

    for entry in sources:
        arxiv_id = None
        if entry.get("arxiv"):
            m = ARXIV_RE.match(str(entry["arxiv"]).strip())
            arxiv_id = m.group(1) if m else str(entry["arxiv"]).strip()
        if arxiv_id and arxiv_id in seen:
            sys.stderr.write(f"  duplicate skipped: {arxiv_id}\n")
            continue
        if arxiv_id:
            seen.add(arxiv_id)

        meta = None
        manual_complete = entry.get("title") and entry.get("authors") and entry.get("year")
        if arxiv_id and not manual_complete:
            if not args.refresh:
                meta = load_cache(arxiv_id)
            if meta is None and not args.offline:
                sys.stderr.write(f"fetching {arxiv_id} … ")
                meta = fetch_inspire(arxiv_id) or fetch_arxiv(arxiv_id)
                if meta:
                    save_cache(arxiv_id, meta)
                    sys.stderr.write(f"ok ({meta['source']})\n")
                else:
                    sys.stderr.write("not found\n")
                time.sleep(args.sleep)

        date = (entry.get("date")
                or (meta or {}).get("date")
                or (date_from_arxiv(arxiv_id) if arxiv_id else None))
        if not date:
            sys.stderr.write(f"  skipping entry with no date/arxiv: {entry}\n")
            continue

        title = entry.get("title") or (meta or {}).get("title") or f"[{arxiv_id}]"
        if entry.get("authors"):
            authors = entry["authors"]
        elif meta:
            authors = format_authors(meta)
        else:
            authors = "Unknown — run with network to fill in"

        records.append({
            "arxiv": arxiv_id,
            "doi": entry.get("doi") or (meta or {}).get("doi"),
            "title": title,
            "authors": authors,
            "date": date,
            "year": int(date[:4]),
            "contributed": bool(entry.get("contributed", False)),
        })

    # oldest first → assign sequential numbers → newest first for output
    records.sort(key=lambda r: (r["date"], r["title"]))
    for i, r in enumerate(records, start=1):
        r["num"] = i
    records.reverse()

    write_papers(records, os.path.join(DATA, "papers.yml"))
    write_citations(build_citations(records), os.path.join(DATA, "citations.yml"))

    contributed = sum(1 for r in records if r["contributed"])
    missing = sum(1 for r in records if r["authors"].startswith("Unknown"))
    print(f"Wrote {len(records)} papers ({contributed} contributed) to _data/papers.yml")
    print(f"Wrote {len(build_citations(records))} citation points to _data/citations.yml")
    if missing:
        print(f"  {missing} entries are missing metadata — rerun with network to fill them.")


if __name__ == "__main__":
    main()
