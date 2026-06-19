# Black Hole Perturbation Toolkit — website

A redesigned Jekyll site for [bhptoolkit.org](https://bhptoolkit.org). Dark
"observatory" theme with a light mode, a physics-organised tool catalogue, and
a data-driven publications page.

## Run locally

```bash
bundle install
bundle exec jekyll serve
# open http://localhost:4000
```

Requires Ruby and Bundler. The only required gem is `jekyll` (see `Gemfile`).

## Structure

```
_config.yml            site settings (titles, links, contact)
_data/
  navigation.yml       header links
  domains.yml          physics domains for the catalogue (id, name, icon, blurb)
  tools.yml            the tool catalogue — one entry per package
  papers.yml           publications (a representative subset; see below)
  citations.yml        cumulative points for the citations chart
_modules/              per-tool documentation pages (one .md per tool)
  TEMPLATE.md          scaffold to copy (published: false, not built)
_layouts/              default + page + module
_includes/             head, header, footer, tool-card, logo
assets/css/style.css   the whole theme — edit the tokens in :root to re-skin
assets/js/             theme.js, catalog.js, papers.js, module.js (doc TOC)
assets/img/            logo.svg (inline mark), logo-lockup.svg
favicon.*              favicon set + apple-touch-icon (generated from the mark)
index.html             home
tools.html             catalogue (filter by domain / search)
get-started.md         install instructions
documentation.md       docs hub
community.md           contributors, map, citing, contributing
publications.html      citation chart + filterable list
scripts/               publications generator + legacy migration (maintainer tools)
```

## Everyday maintenance

**Add a tool:** append an entry to `_data/tools.yml`. Set `domain` to one of the
ids in `_data/domains.yml`, pick `status` (`stable` / `beta` / `data` / `deprecated`), and add
`featured: true` to surface it on the homepage. No template editing needed.

**Add a physics domain:** add to `_data/domains.yml` (with a
[Tabler icon](https://tabler.io/icons) name); a filter pill and homepage tile
appear automatically.

**Re-skin:** every colour lives in the `:root` and `[data-theme="light"]`
blocks at the top of `assets/css/style.css`. The accent is an evolved version
of the original `#157878` teal.

## Per-module documentation

Each tool can have its own themed documentation page under `_modules/`. They're
a Jekyll collection rendered with the `module` layout, which provides the
header, install command, source/issue links, an auto-generated "on this page"
table of contents, a "Citing" section, and cross-links to related tools in the
same domain.

To add one, copy `_modules/TEMPLATE.md` to `_modules/<slug>.md` (lowercase — the
slug becomes the URL, e.g. `_modules/teukolsky.md` → `/modules/teukolsky/`), fill
in the front matter, and write the body in markdown. The only rule: the
front-matter `name` must exactly match the tool's name in `_data/tools.yml`.
That match is what makes the catalogue card's "Docs" link point at the local
page automatically; tools without a module page fall back to their upstream URL.

The body just needs `## Overview`, `## Installation`, `## Usage` (and any other)
sections — the layout adds the heading anchors, the contents rail, and the
citing block. Fenced code blocks are syntax-highlighted by Rouge using the theme
colours. Three worked examples ship as references: `teukolsky.md`,
`fastemriwaveforms.md` and `qnm.md`.

To scaffold pages for every tool at once (front matter filled from
`_data/tools.yml`, bodies left as `TODO` stubs), run:

```bash
python scripts/scaffold_modules.py        # creates a stub for any tool missing one
```

It never overwrites an existing page (use `--force` to regenerate). The
remaining ~20 tools ship as stubs already; replace their `TODO` sections and
delete the "stub page" notice as you write real docs.



## Logo & favicon

The logomark is derived from the project's original favicon — two crossing
orbital ellipses with a small body (the inspiralling secondary) — rethemed to
the observatory palette (teal orbits, a gold body). The header and footer use an
inline, theme-adaptive version (`_includes/logo.html`, orbits in the accent
colour via `currentColor`, body in `--gold`), so it follows light/dark mode.

The favicon set (`favicon.svg`, `favicon.ico`, `favicon-32x32.png`,
`favicon-16x16.png`, `apple-touch-icon.png`) and `assets/img/logo-lockup.svg`
are generated from one source geometry:

```bash
python scripts/generate_logo.py        # requires: pip install cairosvg pillow
```

Edit the geometry or colours at the top of that script to change the mark
everywhere at once.

## Publications: generated, not hand-maintained

The publications list and the citation curve are **generated**. The only thing
you edit by hand is `_data/papers_sources.yml` — a minimal list of arXiv ids
with an optional `contributed` flag. Everything else (titles, authors, dates,
the sequential numbering, and `_data/citations.yml`) is produced by the
generator from INSPIRE-HEP, falling back to the arXiv API.

```
_data/papers_sources.yml          you edit this (arxiv id + contributed flag)
scripts/generate_publications.py  → writes _data/papers.yml + _data/citations.yml
scripts/migrate_legacy_list.py    one-time bootstrap from the old list
.github/workflows/update-publications.yml   runs the generator in CI
```

### One-time bootstrap

The repo ships a small seed `papers_sources.yml` so the site works immediately.
To pull in the full historical list from the existing page:

```bash
python scripts/migrate_legacy_list.py --force      # writes the full source list
python scripts/generate_publications.py            # fills in metadata + curve
```

`migrate_legacy_list.py` reads the live publications page by default (or a local
file via `--source`), extracts every arXiv id, and turns each `(*)` marker into
`contributed: true`. Entries with no arXiv id are reported so you can add them
by hand.

### Day-to-day

When a new paper is reported, add one line to `_data/papers_sources.yml`:

```yaml
- {arxiv: "2606.09238"}                    # cites/acknowledges
- {arxiv: "2510.16112", contributed: true} # contributed code or data
```

Then run `python scripts/generate_publications.py`. Useful flags:

- `--refresh` ignore the cache and refetch all metadata
- `--offline` no network — still produces valid numbering, years and the curve
  from the arXiv ids alone (titles/authors are filled on the next online run)

Papers without an arXiv id can be added directly with `title`, `authors`,
`year` (and optional `doi`); the generator passes them through unchanged.

Fetched metadata is cached under `scripts/.cache/` (git-ignored), so reruns are
fast and resilient to a transient API outage. The included GitHub Action
regenerates the data weekly and whenever the source list changes, committing the
result — so the list and curve stay current with no manual step. PyYAML is the
only dependency: `pip install pyyaml`.

## Notes

- Fonts (Space Grotesk / Inter / JetBrains Mono) and Tabler icons load from
  CDNs. For a fully self-hosted build, vendor them into `assets/`.
- The citations chart is dependency-free inline SVG — no chart library needed.
- Institution logos are referenced from the existing site; drop local copies in
  `assets/` and update `community.md` if you prefer to self-host them.
