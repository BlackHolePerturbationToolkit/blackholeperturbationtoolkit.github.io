---
# =========================================================================
# MODULE DOCUMENTATION TEMPLATE
# Copy this file to _modules/<slug>.md (lowercase, no spaces) — the slug
# becomes the URL, e.g. _modules/teukolsky.md -> /modules/teukolsky/.
# `published: false` keeps this scaffold itself out of the built site.
# =========================================================================
published: false

# `name` MUST exactly match the tool's name in _data/tools.yml — that match
# is what makes the catalogue card link here automatically.
name: ModuleName
summary: One-line description of what the module computes.

# Metadata mirrors the catalogue entry (kept here so the doc page is
# self-contained). Use the same values as in _data/tools.yml.
lang: Python              # Python | SageMath | Mathematica | C/C++ | Fortran
domain: perturbations     # one of the ids in _data/domains.yml
status: stable            # stable | beta | data
requirements: Python 3.9+ # optional — shown as a chip in the header

repo: https://github.com/BlackHolePerturbationToolkit/ModuleName
docs: https://bhptoolkit.org/ModuleName/   # optional upstream/full docs
install: pip install modulename            # optional — gets a copy button

# Optional module-specific citations, added to the standard Toolkit
# acknowledgement in the auto-generated "Citing" section.
citation:
  - text: "Author et al., Title, Journal (Year)"
    url: "https://arxiv.org/abs/0000.00000"
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
