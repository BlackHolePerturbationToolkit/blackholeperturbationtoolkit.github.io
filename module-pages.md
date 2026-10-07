---
layout: page
title: Writing a module page
---

{% include head.html %}

Every Toolkit package has its documentation page on this website, at
`https://bhptoolkit.org/modules/<slug>/`. These pages live in the
[website repository](https://github.com/BlackHolePerturbationToolkit/blackholeperturbationtoolkit.github.io),
not in the package's own repository: please don't create a `gh-pages` branch or a
`docs/` GitHub Pages site in a code repository.

## Adding or editing a page

1. Fork or clone the website repository.
2. If the package is new, add an entry for it to `_data/tools.yml`. This entry sets the
   catalogue card and the page header: name, one-line blurb, language, status, install
   command, repository and (optionally) an external documentation URL.
3. Copy `_modules/TEMPLATE.md` to `_modules/<slug>.md`. The slug is lowercase and
   becomes the URL, e.g. `_modules/teukolsky.md` becomes `/modules/teukolsky/`. Set the
   front-matter `name` to exactly the `name` used in `_data/tools.yml`.
4. Write the page in Markdown with `## Overview`, `## Installation`, `## Usage` and
   `## Examples` sections, and any others you need. Package-specific references go in
   the `citation:` front matter (see the template); the "Citing" section is generated
   automatically.
5. Put any figures in `assets/img/modules/<slug>/` and reference them with
   {% raw %}`![description]({{ '/assets/img/modules/<slug>/figure.png' | relative_url }})`{% endraw %}.
6. Open a pull request.

`_modules/teukolsky.md`, `_modules/spinweightedspheroidalharmonics.md` and
`_modules/fastemriwaveforms.md` are good examples to follow.

## Equations and code

Equations are written in LaTeX and rendered with [MathJax](https://www.mathjax.org/):
use `$...$` for inline maths and `$$...$$` on their own lines for displayed equations.
Inside inline maths, escape underscores that Markdown might otherwise read as emphasis,
e.g. `${}\_s\lambda_{\ell m}$`.

Code blocks are syntax highlighted. Give the language after the opening fence, e.g.
` ```mathematica `, ` ```python ` or ` ```bash `.

## Previewing locally

Install Jekyll and the site's dependencies with `bundle install`, then run
`bundle exec jekyll serve` in the repository and open
[http://localhost:4000](http://localhost:4000). The site is rebuilt every time you
save a change.

## Generated reference documentation

Generated API references, such as Doxygen output or Mathematica paclet documentation
exported to HTML, are kept in this repository under the package's old URL path (for
example `TInvar/doc/` or `GremlinEq/doc/`). Link to them from the `url` field in
`_data/tools.yml` so that they appear as the "Full docs" button on the module page.
Projects that build their documentation automatically from source in CI, such as
FastEMRIWaveforms, can continue to publish it from their own repository.
