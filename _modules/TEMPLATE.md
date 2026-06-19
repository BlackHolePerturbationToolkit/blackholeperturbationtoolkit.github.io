---
# =========================================================================
# MODULE DOCUMENTATION TEMPLATE
# Copy this file to _modules/<slug>.md (lowercase, no spaces) — the slug
# becomes the URL, e.g. _modules/teukolsky.md -> /modules/teukolsky/.
# `published: false` keeps this scaffold itself out of the built site.
# =========================================================================
published: false

# `name` MUST exactly match the tool's name in _data/tools.yml. That single
# match is all this page needs: the catalogue card links here automatically,
# and the header (language, status, install command, source/docs links,
# domain, and the summary line) is pulled from that tools.yml entry. You do
# NOT repeat any of those settings here.
name: ModuleName

# ---- everything below is OPTIONAL and doc-only ----
# summary:      override the catalogue blurb for this page's header lede
# requirements: shown as a chip in the header, e.g. "Mathematica 12.0+"
# Any of lang / status / install / repo / docs / domain can also be set here
# to override the tools.yml value for this page only (rarely needed).
#
# requirements: Python 3.9+
#
# Optional module-specific citations, added to the standard Toolkit
# acknowledgement in the auto-generated "Citing" section:
# citation:
#   - text: "Author et al., Title, Journal (Year)"
#     url: "https://arxiv.org/abs/0000.00000"
---

## Overview

What the module does, what problem it solves, and where it sits relative to the
rest of the Toolkit. Two or three short paragraphs is plenty. Mention the key
packages it builds on or pairs with.

## Installation

How to install, including any non-obvious dependencies. The header already shows
the one-line install command; expand on it here if needed.

## Usage

A minimal, runnable example. Use fenced code blocks with a language for
highlighting:

```python
import modulename
result = modulename.compute(...)
```

## Examples

Link to worked examples, notebooks, or tutorials. The "Citing" section is added
automatically below — you don't need to write it here.
