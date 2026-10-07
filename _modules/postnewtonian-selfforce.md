---
name: "PostNewtonian-SelfForce"
citation:
  - text: PostNewtonianSelfForce
    doi: 10.5281/zenodo.8112959
    bibtex: |
      @software{BHPToolkit:PostNewtonianSelfForce,
        author       = {Wardell, Barry and Warburton, Niels and Kavanagh, Chris and Munna, Christopher and Evans, Charles R. and Trestini, David},
        title        = {PostNewtonianSelfForce},
        month        = jul,
        year         = 2025,
        publisher    = {Zenodo},
        version      = {0.6.0},
        doi          = {10.5281/zenodo.15969633},
        url          = {https://doi.org/10.5281/zenodo.15969633},
      }
  - text: Black Hole Perturbation Toolkit
    bibtex: |
      @misc{BHPToolkit,
        title = {{Black Hole Perturbation Toolkit}},
        howpublished = {(\href{http://bhptoolkit.org/}{bhptoolkit.org})},
      }
---

## Overview

The PostNewtonianSelfForce package provides a collection of high-order post-Newtonian (PN) series computed
at linear order in the mass ratio using black hole perturbation theory, together with a set of Mathematica
functions for listing, loading and working with them.

The results are categorized by spacetime (Schwarzschild or Kerr) and orbit type (circular, eccentric,
spherical or generic), and give the highest-order PN results known. Available quantities include:

- energy and angular-momentum fluxes to infinity and down the horizon, in total and for individual
  $(\ell, m)$ modes (including scalar-field fluxes and finite-size spin and tidal corrections in Kerr);
- local gauge-invariant quantities such as the redshift, spin-precession and tidal invariants;
- memory contributions to the waveform for circular orbits in Kerr;
- PN expansions of orbital quantities (constants of motion and frequencies) for spherical orbits in Kerr.

Every series carries the authors and reference for the result, and each subdirectory of the
[SeriesData](https://github.com/BlackHolePerturbationToolkit/PostNewtonianSelfForce/tree/master/SeriesData)
folder has a README that records who has contributed to the growth of these PN series over the years.

## Installation

PostNewtonianSelfForce is distributed as a paclet (the PN series are included as assets). Once the
BHPToolkit paclet server is set up (see [Get started]({{ '/get-started/' | relative_url }})), install it by name:

```mathematica
PacletSiteRegister["https://pacletserver.bhptoolkit.org", "Black Hole Perturbation Toolkit Paclet Server"]
PacletSiteUpdate["https://pacletserver.bhptoolkit.org"]
PacletInstall["PostNewtonianSelfForce"]
```

## Usage

### Loading the package

```mathematica
<< PostNewtonianSelfForce`
```

### Listing and loading the PN series

Listing and loading PN series is done using the `PostNewtonianExpansion` command. To list all the available PN
series use `PostNewtonianExpansion[]`. This produces a long list. To return a subset of this list you can
provide a string or a list of strings as an argument; prefix a string with `!` to exclude it. For example,
to list all PN series for circular orbits in Schwarzschild spacetime that are local quantities, but not ones
involving spin, use

```mathematica
PostNewtonianExpansion[{"Schwarzschild", "Circular", "Local", "!Spin"}]
```

which returns

```mathematica
{"/Schwarzschild/Circular/Local/Redshift", "/Schwarzschild/Circular/Local/Tidal-lambdaB",
 "/Schwarzschild/Circular/Local/Tidal-lambdaE1", "/Schwarzschild/Circular/Local/Tidal-lambdaE2",
 "/Schwarzschild/Circular/Local/Tidal-lambdaE3"}
```

Strings are matched as (case-insensitive) substrings of the series names. If the strings match a unique
series, that series is loaded; otherwise the list of matching names is returned. For example,
`PostNewtonianExpansion["/Schwarzschild/Circular/Flux/Infinity"]` matches both the total flux and the
individual `-l2m1`, `-l2m2`, … mode contributions, so it returns a list of names. To load the PN series for the
total flux radiated to infinity by a particle on a circular orbit about a Schwarzschild black hole, exclude the
mode contributions:

```mathematica
PNSeries = PostNewtonianExpansion[{"/Schwarzschild/Circular/Flux/Infinity", "!-l"}]
```

Note that as more PN series are added a given combination of strings might no longer return a unique series.
Executing the above command returns a `PostNewtonianData` object, which stores the PN series and information
about it:

![Output of PostNewtonianExpansion: a PostNewtonianData object]({{ '/assets/img/modules/postnewtonian-selfforce/PNData.png' | relative_url }}){: width="60%"}

### Working with the PN series

`Keys[PNSeries]` lists the available properties: `"Name"`, `"Description"`, `"Authors"`, `"References"` and
`"Series"`. The entire PN series can be extracted with

```mathematica
PNSeries["Series"]
```

The series for circular orbits are expanded in $y = (m\_1\Omega\_\phi)^{2/3}$. In this case the series is very
large, so you may want to truncate it, e.g. `PNSeries["Series"] + O[y]^7`. If instead you just want a particular
coefficient use `PostNewtonianCoefficient[PNSeries, n]`, where `n` is the power of $y$ whose coefficient you
are interested in, or `PostNewtonianCoefficient[PNSeries, n, nL]` for the coefficient of $y^n \log^{n\_L} y$.

### Special functions in some series

Some series contain additional functions that are held unevaluated until needed. The energy flux for eccentric
orbits in Schwarzschild is an example: at $\mathcal{O}(y^{13/2})$ the function `oneP5PN[e, highestPower]` appears.
To evaluate it, use `ReleaseHold` and specify the order of the expansion in eccentricity:

```mathematica
FluxEnEcc = PostNewtonianExpansion["/Schwarzschild/Eccentric/Flux/EInfinity"];
ReleaseHold[PostNewtonianCoefficient[FluxEnEcc, 13/2] /. highestPower -> 10]
```

### References for the PN series

If you make use of any PN series in your work you can find the correct reference by calling
`PNSeries["References"]`. In this case this returns

```mathematica
{"Gravitational Waves from a Particle in Circular Orbits around a Schwarzschild Black Hole
 to the 22nd Post-Newtonian Order, R. Fujita, Prog. Theor. Phys. 128 (2012) pp. 971-992, arXiv:1211.5535."}
```

Note that this reference is only for the most recent paper concerning that PN series. For a full list of the
contributions made by many authors over the years, see the README files in the SeriesData folder of the
repository (e.g., in the
[circular orbit series directory](https://github.com/BlackHolePerturbationToolkit/PostNewtonianSelfForce/tree/master/SeriesData/Schwarzschild/Circular)).

## Examples

### Mode-by-mode fluxes

Load the $\ell = m = 2$ contribution to the flux at infinity for circular orbits in Schwarzschild, and extract
its coefficients:

```mathematica
FluxInfPN[2, 2] = PostNewtonianExpansion["/Schwarzschild/Circular/Flux/Infinity-l2m2"];
FluxInfPN[2, 2]["Authors"]
PostNewtonianCoefficient[FluxInfPN[2, 2], 7]
```

Example notebooks, including `PostNewtonianSelfForce.nb` and `PNSF_Ecc_Fluxes.nb`, can be found in the
[Mathematica Toolkit Examples](https://github.com/BlackHolePerturbationToolkit/MathematicaToolkitExamples)
repository. The Mathematica Documentation Centre contains a tutorial and reference pages for each function.

## Authors and contributors

**Package:** Barry Wardell, Niels Warburton, Priti Gupta, Chris Kavanagh, Christopher Munna, Charles R. Evans,
David Trestini, Josh Mathews

**PN series:** Donato Bini, Thibault Damour, Charles Evans, Ryuichi Fujita, Seth Hopper, Chris Kavanagh,
Chris Munna, Adrian Ottewill, Abhay Shah, Norichika Sago, Barry Wardell, and many others (see the README files
in the repository)
