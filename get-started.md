---
layout: page
title: Get started
permalink: /get-started/
eyebrow: Installation
lede: The Toolkit is many independent packages. Install only the ones you need — each tool's own page has the full detail. Here's the fast path for each ecosystem.
description: How to install Black Hole Perturbation Toolkit packages in Python, Mathematica, C/C++ and Fortran.
---

## Python

Most Python packages are on PyPI and install with `pip`:

```bash
pip install fastemriwaveforms
pip install qnm
pip install kerrgeopy
```

For SageMath packages, use Sage's bundled pip:

```bash
sage -pip install kerrgeodesic_gw
```

GPU-accelerated packages such as `fastemriwaveforms` have additional CUDA
requirements — see the package page for the matching build.

## Mathematica

Mathematica packages are distributed as paclets. If you haven't done so already, add the
BHPToolkit paclet server and refresh the list of packages available:

```mathematica
PacletSiteRegister["https://pacletserver.bhptoolkit.org", "Black Hole Perturbation Toolkit Paclet Server"]
PacletSiteUpdate["https://pacletserver.bhptoolkit.org"]
```

then install any package by name:

```mathematica
PacletInstall["Teukolsky"]
PacletInstall["KerrGeodesics"]
PacletInstall["SpinWeightedSpheroidalHarmonics"]
```

We recommend the released paclets over the development versions, which can be
unstable while changes are being made. Full setup instructions, including
adding the paclet server, are on the [Mathematica install guide](https://bhptoolkit.org/mathematica-install.html).

## C / C++

C and C++ tools build from source and document their dependencies in each
repository's `README`. The typical pattern:

```bash
git clone https://github.com/BlackHolePerturbationToolkit/GremlinEq
cd GremlinEq
# follow the README for dependencies and the build step
```

## Fortran

Fortran packages such as `SelfForce-1D` ship with build instructions in their
repositories. Check the README for the required compiler and libraries.

<div class="callout" markdown="1">
**Tip.** Prefer released versions where they exist. The development branch is
where active work happens and may break between commits.
</div>

## Next steps

- Browse the [full catalogue]({{ '/tools/' | relative_url }}) to find the right package
- Read the [documentation]({{ '/documentation/' | relative_url }}) for tutorials and conventions
- See [how to cite]({{ '/community/#citing' | relative_url }}) the Toolkit in your work
