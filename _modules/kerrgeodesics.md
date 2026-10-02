---
name: "KerrGeodesics"
citation:
  - text: KerrGeodesics
    doi: 10.5281/zenodo.8108265
    bibtex: |
      @software{BHPToolkit:KerrGeodesics,
        author       = {Niels Warburton and Barry Wardell and Oliver Long and Sam Upton and Philip Lynch and Zachary Nasipak and Leo C. Stein},
        title        = {KerrGeodesics},
        month        = jul,
        year         = 2023,
        publisher    = {Zenodo},
        version      = {0.9.0},
        doi          = {10.5281/zenodo.8108265},
        url          = {https://doi.org/10.5281/zenodo.8108265},
      }
---

<!-- Scaffolded from _data/tools.yml. Replace the TODO sections with real
     documentation, then delete the stub notice below. -->

<div class="callout" markdown="1">
**Stub page.** Full documentation for KerrGeodesics is in progress. For now, see the [source repository](https://github.com/BlackHolePerturbationToolkit/KerrGeodesics) and the [package page](https://bhptoolkit.org/KerrGeodesics).
</div>

## Overview

Bound timelike geodesics about a Kerr black hole.

<!-- TODO: expand — what it computes, key features, and related packages. -->

## Installation

Install with the command shown in the header:

```mathematica
PacletSiteRegister["https://pacletserver.bhptoolkit.org", "Black Hole Perturbation Toolkit Paclet Server"]
PacletSiteUpdate["https://pacletserver.bhptoolkit.org"]
PacletInstall["KerrGeodesics"]
```

## Usage

### Loading the package
Load the package:
```mathematica
<< KerrGeodesics`
```

### Orbits

`KerrGeoOrbit[a,p,e,x]` returns a Kerr geodesic for Kerr spin $a$, semi-latus rectum $p$, eccentricity $e$ and inclination parameter $x$:

```mathematica
orbit=KerrGeoOrbit[.3,20,.4,π/7]
```

We can extract e.g. the energy via:

```mathematica
orbit["Energy"]
```

## Examples

### Plotting a generic orbit

```mathematica
With[{a = .998, r0 = 4, e = .6, x = .9, from = 0, to = 15, view = {50, 200, 50}, color = RGBColor["#de4037"]},
    Module[{spherePlot, spherePlotGlow, orbitPlot, radius, orbit,points}, 
        orbit = KerrGeoOrbit[a, r0, e, x];
        radius = 1 + Sqrt[1 - a^2];
        {t, r, ϑ, φ} = orbit["Trajectory"];
        points = Table[Re@{r[λ] Sin[ϑ[λ]] Cos[φ[λ]],r[λ] Sin[ϑ[λ]] Sin[φ[λ]], r[λ] Cos[ϑ[λ]]}, {λ, from, to, (to - from)/2000}];
        orbitPlot = Graphics3D[{color, Thickness[.005], Line[points]}];
        spherePlot = Graphics3D[{Black, Sphere[{0, 0, 0}, radius]}];
        spherePlotGlow = Graphics3D[{Opacity[.4], Glow[Lighter[Blue, .8]], Black, EdgeForm[None], Cylinder[{0.1 radius view/view . view, -0.1 radius view / view . view}, radius + .2]}];
        plot = Show[orbitPlot, spherePlot, spherePlotGlow, ViewPoint -> view, Boxed -> False, Axes -> False, PlotRange -> All, Background -> None, BaseStyle -> {RenderingOptions -> {"3DRenderingMethod" -> "BSPTree"}}]
    ]
]
```

<!-- TODO: link to worked examples or notebooks. -->
See the [repository](https://github.com/BlackHolePerturbationToolkit/KerrGeodesics) for examples.
