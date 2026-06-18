#!/usr/bin/env python3
"""
Bootstrap _data/papers_sources.yml from the legacy publications list.

Run this ONCE to migrate the hand-maintained list on the old users page into
the minimal source format (arXiv id + contributed flag). After that, maintain
_data/papers_sources.yml by hand and run generate_publications.py to refresh.

    # from the live page (default):
    python scripts/migrate_legacy_list.py

    # or from a local copy (saved HTML or markdown):
    python scripts/migrate_legacy_list.py --source path/to/users.html

The legacy list marks code/data contributions with a trailing "(*)"; those
become `contributed: true`. Entries without an arXiv id are reported so you can
add them manually.
"""

import argparse
import html
import os
import re
import sys
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT = os.path.join(ROOT, "_data", "papers_sources.yml")
DEFAULT_SOURCE = "https://bhptoolkit.org/users.html"
UA = "BHPToolkit-site/1.0 (legacy migration; +https://bhptoolkit.org)"

ARXIV_RE = re.compile(r"arXiv:(\d{4}\.\d{4,5})", re.I)
# split the list into entries at "237. ", "1. ", etc.
ENTRY_SPLIT = re.compile(r"(?m)(?=^\s*\d+\.\s)")


def load(source):
    if re.match(r"^https?://", source):
        req = urllib.request.Request(source, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.read().decode("utf-8", "replace")
    return open(source, encoding="utf-8").read()


def to_text(raw):
    # strip tags and unescape entities so "(*)" and arXiv ids survive cleanly
    text = re.sub(r"<[^>]+>", " ", raw)
    return html.unescape(text)


def parse(text):
    entries, seen, missing = [], set(), []
    chunks = ENTRY_SPLIT.split(text)
    for chunk in chunks:
        if not re.match(r"^\s*\d+\.\s", chunk):
            continue
        ids = ARXIV_RE.findall(chunk)
        num_m = re.match(r"^\s*(\d+)\.", chunk)
        num = num_m.group(1) if num_m else "?"
        if not ids:
            snippet = re.sub(r"\s+", " ", chunk).strip()[:80]
            missing.append(f"#{num}: {snippet}")
            continue
        arxiv_id = ids[0]
        if arxiv_id in seen:
            continue
        seen.add(arxiv_id)
        # contributed if a "(*)" appears in this entry (after the id, typically)
        contributed = "(*)" in chunk or "( * )" in chunk
        entries.append((arxiv_id, contributed))
    return entries, missing


def write(entries, path):
    lines = [
        "# ---------------------------------------------------------------------------",
        "# Source of truth for the publications list. Discovery stays human: add an",
        "# entry when a paper is reported (email niels). Metadata, numbering and the",
        "# citation curve are produced by scripts/generate_publications.py.",
        "#",
        "# Each entry needs an `arxiv` id. Mark code/data contributions with",
        "# `contributed: true`. For papers with no arXiv id, give title/authors/year",
        "# directly (and optionally `doi:`) and the generator will pass them through.",
        "# ---------------------------------------------------------------------------",
    ]
    for arxiv_id, contributed in entries:
        if contributed:
            lines.append(f'- {{arxiv: "{arxiv_id}", contributed: true}}')
        else:
            lines.append(f'- {{arxiv: "{arxiv_id}"}}')
    open(path, "w", encoding="utf-8").write("\n".join(lines) + "\n")


def main():
    ap = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--source", default=DEFAULT_SOURCE,
                    help="legacy list URL or local file (default: live users page)")
    ap.add_argument("--out", default=OUT, help="output source file")
    ap.add_argument("--force", action="store_true",
                    help="overwrite an existing source file")
    args = ap.parse_args()

    if os.path.exists(args.out) and not args.force:
        sys.exit(f"{args.out} already exists. Re-run with --force to overwrite.")

    try:
        raw = load(args.source)
    except Exception as e:  # noqa: BLE001
        sys.exit(f"Could not read source ({args.source}): {e}")

    entries, missing = parse(to_text(raw))
    if not entries:
        sys.exit("No arXiv ids found — is the source the legacy publications list?")

    write(entries, args.out)
    contributed = sum(1 for _, c in entries if c)
    print(f"Wrote {len(entries)} entries ({contributed} contributed) to {args.out}")
    if missing:
        print(f"\n{len(missing)} legacy entries had no arXiv id — add these by hand:")
        for m in missing:
            print("  " + m)
    print("\nNext: python scripts/generate_publications.py")


if __name__ == "__main__":
    main()
