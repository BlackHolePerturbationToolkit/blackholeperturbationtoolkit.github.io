---
name: Teukolsky
requirements: SpinWeightedSpheroidalHarmonics, KerrGeodesics
citation:
  - text: Teukolsky
    doi: 10.5281/zenodo.7037850
---

## Overview

The Teukolsky package computes solutions to the Teukolsky equation, which
governs perturbations of the Kerr spacetime for fields of spin-weight `s`
(scalar, electromagnetic and gravitational). It provides the homogeneous radial
solutions — the "In" and "Up" functions defined by their boundary conditions at
the horizon and at infinity — and point-particle mode data such as amplitudes
and energy fluxes for a source on a bound geodesic.

It builds on two other Toolkit packages: SpinWeightedSpheroidalHarmonics for the
angular dependence, and KerrGeodesics for the orbital motion of the source.

Further details are available in the [source repository](https://github.com/BlackHolePerturbationToolkit/Teukolsky) and the [package page](https://bhptoolkit.org/Teukolsky).

## Installation

Teukolsky is distributed as a paclet. Once the BHPToolkit paclet server is set
up (see [Get started]({{ '/get-started/' | relative_url }})), install it by name
and load it:

```mathematica
PacletInstall["Teukolsky"]
```

## Usage

Load the package:
```mathematica
<< Teukolsky`
```


## Examples

The package computes solutions to:

$$\Delta^{-s} \dfrac{d}{dr} \bigg[\Delta^{s+1}\dfrac{d R}{dr}\bigg] + \bigg[\frac{K^2 - 2 i s (r-M)K}{\Delta} + 4 i s \omega r - \lambda \bigg]R = \mathcal{T} \nonumber $$
 
where

$\Delta = r^2 - 2Mr + a^2$  
$K=(r^2 + a^2)\omega - a m$  
$s$ is the spin-weight of the perturbing field  
$\lambda$ is the spin-weighted spheroidal eigenvalue  
$\omega$ is the mode frequency  
$\mathcal{T}$ is the source

The source has been implemented for a point particle moving along a generic bound orbit in Kerr spacetime for perturbations with spin-weight $s=\\{0,\pm 1, \pm 2\\}$. As an example, the gravitational wave flux for the $l=2,m=2$ mode for a circular, equatorial orbit is easily computed using:
```Mathematica
With[{a = 0.9, p = 10.0, e=0, x=1, s = -2, l = 2, m = 2},
  orbit = KerrGeoOrbit[a, p, e, x];
  ψ4 = TeukolskyPointParticleMode[s, l, m, orbit];
  ψ4["Fluxes"]
]
```  
This returns an association with the results:  
```Mathematica
<|"Energy" -> <|"ℐ" -> 0.000022273, "ℋ" -> -5.9836*10^-8|>,
  "AngularMomentum" -> <|"ℐ" -> 0.00072438, "ℋ" -> -1.94603*10^-6|>|>
```

### Homogeneous solutions

The homogeneous solutions are also easily computed. They can be extracted from the `ψ4` object above using `R = ψ4["RadialFunctions"]`. This returns a pair `TeukolskyRadialFunction` objects which can be evaluated at a given radius, i.e., `R["In"][10.]`. The homogeneous solutions can also be computed directly via the `TeukolskyRadial[s, l, m, a, ω]` function.

### Renormalized angular momentum

Under the hood the Teukolsky package uses the MST method for computing homogeneous solutions. A key part of the MST method is the calculation of the renormalized angular momentum, $\nu$. This can be computed directly via
```
 ν = RenormalizedAngularMomentum[s, l, m, a, ω]
```


Compute a homogeneous radial solution and evaluate it at a Boyer-Lindquist
radius:

```mathematica
Needs["Teukolsky`"]

s = -2; l = 2; m = 2; a = 0.5; ω = 0.3;
R = TeukolskyRadial[s, l, m, a, ω];

R["In"][10.0]
R["Up"]["RadialDerivative"][10.0]
```

For a point particle on a bound orbit, build the orbit with KerrGeodesics and
pass it to `TeukolskyPointParticleMode` to obtain the mode amplitudes and
fluxes:

```mathematica
Needs["KerrGeodesics`"]

orbit = KerrGeoOrbit[a, 10.0, 0, 1];           (* circular, equatorial *)
mode  = TeukolskyPointParticleMode[s, l, m, 0, 0, orbit];

mode["Fluxes"]
mode["Amplitudes"]
```

### Further examples

See the Mathematica Documentation Centre for a tutorial and documentation on individual functions.

## Authors and contributors

Barry Wardell, Niels Warburton, Marc Casals, Adrian Ottewill, Chris Kavanagh, Leanne Durkan, Ben Leather, Theo Torres, Jakob Neef

