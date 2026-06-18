---
layout: page
title: Documentation
permalink: /documentation/
eyebrow: Status &amp; docs
lede: Each module carries its own documentation. This hub points you to per-package docs, tutorials, conventions and the things that keep the Toolkit reliable.
description: Documentation, tutorials, conventions, test status and workshops for the Black Hole Perturbation Toolkit.
---

## Per-module documentation

Every package documents itself on its own page — start from the
[catalogue]({{ '/tools/' | relative_url }}) and follow the **Docs** link on any card.
Coverage varies by module and we're continuously improving it; direct links to
the Mathematica documentation for key modules are being added here.

## Tutorials &amp; talks

All talks from the 2020 virtual BHPToolkit workshop were recorded and are a
great introduction for new users. Watch them on the
[BHPToolkit YouTube channel]({{ site.youtube }}). Worked examples for the
Mathematica modules live in the
[MathematicaToolkitExamples](https://github.com/BlackHolePerturbationToolkit/MathematicaToolkitExamples)
repository.

## Reporting issues &amp; suggesting features

We test the components carefully, but errors do slip through. Please report
anything you think is wrong — or suggest new features — via the issue tracker
on the relevant repository. See the
[issue tracker guide](https://bhptoolkit.org/issue-tracker-info.html) for how
to file a useful report.

## Reliability

<div class="two-col" markdown="0">
  <div class="panel">
    <h3>Continuous integration</h3>
    <p class="muted">Packages are tested automatically on every change using GitHub Actions, so regressions are caught early. Current build status is on the <a href="https://bhptoolkit.org/teststatus">unit test status page</a>.</p>
  </div>
  <div class="panel">
    <h3>Naming conventions</h3>
    <p class="muted">We keep consistent naming across the Toolkit so functions and quantities mean the same thing everywhere. The current list is on the <a href="https://bhptoolkit.org/conventions.html">conventions page</a>.</p>
  </div>
</div>

## Workshops

Information on upcoming and previous workshops is on the
[workshops page](https://bhptoolkit.org/workshops.html).

## For developers

- [Developing Mathematica tools](https://bhptoolkit.org/mathematica-dev)
- [Setting up repository webpages with gh-pages](https://bhptoolkit.org/gh-pages)
