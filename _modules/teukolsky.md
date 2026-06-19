---
name: Teukolsky
requirements: Mathematica 12.0+
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
Needs["Teukolsky`"]
```

## Usage

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

## Examples

Worked notebooks covering radial solutions, fluxes and metric reconstruction
are in the
[MathematicaToolkitExamples](https://github.com/BlackHolePerturbationToolkit/MathematicaToolkitExamples)
repository.
