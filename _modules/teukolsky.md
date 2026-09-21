---
name: Teukolsky
requirements: SpinWeightedSpheroidalHarmonics, KerrGeodesics
citation:
  - text: Teukolsky
    doi: 10.5281/zenodo.7037850
  - text: "Black Hole Perturbation Toolkit: Low frequency and post-Newtonian expansions"
---

## Overview

The radial Teukolsky equation is given by

$$\Delta^{-s} \dfrac{d}{dr} \bigg[\Delta^{s+1}\dfrac{d {_sR_{\ell m}(r)}}{dr}\bigg] + \bigg[\frac{K^2 - 2 i s (r-M)K}{\Delta} + 4 i s \omega r - {_s\lambda_{\ell m}} \bigg] {_s R_{\ell m}(r)} = \mathcal{T} \nonumber \,,$$
 
where $\Delta = r^2 - 2Mr + a^2$, $K=(r^2 + a^2)\omega - a m$, $s$ is the spin-weight of the perturbing field, ${}\_s\lambda_{\ell m}$ is the spin-weighted spheroidal eigenvalue, $\omega$ is the mode frequency, and $\mathcal{T}$ is the source. The Teukolsky equation governs perturbations of the Kerr spacetime for fields of spin-weight `s`(scalar, electromagnetic and gravitational). 

The package provides numerical and analytical implementations of the homogeneous "In" and "Up" solutions and their amplitudes. These solutions are defined by their retarded boundary conditions on the horizon and at infinity respectively. It also provides point particle data (e.g., energy and horizon fluxes) for a source on a bound geodesic.

It builds on two other Toolkit packages: SpinWeightedSpheroidalHarmonics for the
angular dependence, and KerrGeodesics for the orbital motion of the source.


## Installation

Teukolsky is distributed as a paclet. Once the BHPToolkit paclet server is set
up (see [Get started]({{ '/get-started/' | relative_url }})), install it by name:

```mathematica
PacletSiteRegister["https://pacletserver.bhptoolkit.org", "Black Hole Perturbation Toolkit Paclet Server"]
PacletSiteUpdate["https://pacletserver.bhptoolkit.org"]
PacletInstall["Teukolsky"]
```

## Usage

### Loading the package
Load the package:
```mathematica
<< Teukolsky`
```

### Homogeneous Solutions

The homogeneous solutions can be computed numerically with `TeukolskyRadial`:

```Mathematica
RN=TeukolskyRadial[-2,2,2,.3,.5]
RN["In"][20]
```

or analytically as a PN expansion using `TeukolskyRadialPN`:

```Mathematica
RPN=TeukolskyRadialPN[-2,2,m,a,ω,{η,5}]
RPN["In"][r]
```
### Amplitudes

Numerically the amplitudes can be extracted from the radial functions:

```Mathematica
RN=TeukolskyRadial[-2,2,2,.3,.5];
RN["In"]["Amplitudes"]["Reflection"]
```

Analytically it is recommended to use `TeukolskyAmplitudePN` which also gives access to other radius independent quantities, e.g., the phase shift.

```Mathematica
Binc=TeukolskyAmplitudePN["Binc","Simplify"->True][-2,2,m,a,ω,{γ,4}]
ps=TeukolskyAmplitudePN["PhaseShift","Simplify"->True][-2,2,m,a,ω,{γ,4}]
```

### Renormalized Angular Momentum

The renormalized angular momentum $\nu$ can be computed numerically with `RenormalizedAngularMomentum`:

```Mathematica
RenormalizedAngularMomentum[-2, 2, 2, .3`32, .4`32]
```

The analytical implementation comes through `MSTCoefficientsPN`

```Mathematica
MSTCoefficientsPN[-2, 2, m, a, ω, {γ,7}][νMST]
```

### Inhomogeneous Solutions and Fluxes

Numerical inhomogeneous solutions for a point particle moving on a generic bound orbit in Kerr spacetime can be computed with `TeukolskyPointParticleMode`:
```Mathematica
With[{a = 0.9, p = 10.0, e=0, x=1, s = -2, l = 2, m = 2},
  orbit = KerrGeoOrbit[a, p, e, x];
  ψ4 = TeukolskyPointParticleMode[s, l, m, orbit];
]
```  
From the resulting object we can extract, e.g., the energy fluxes at infinity $\mathcal{I}$ and the horizon $\mathcal{H}$:

```Mathematica
  ψ4["EnergyFlux"]
```  

The analytical implementation can be found in `TeukolskyPointParticleModePN`, which is currently limited to circular orbits in Kerr:

```Mathematica
  orbitPN = KerrGeoOrbit[a, r0, 0, 1];
  ψ4PN = TeukolskyPointParticleModePN[-2, 2, 2, orbitPN, {η, 3}];
  ψ4PN["EnergyFlux"]
```  

See the Mathematica Documentation Centre for a tutorial, documentation on individual functions and further examples.

## Examples

### Checking Analytical Against Numerical Fluxes

```mathematica
EchoTiming[
With[{s = -2, ℓ = 2, m = 2, order = 13, a = .7, r0min = 5, r0max = 1000, points = 100,prec = 200},
 Module[{aux, orbit, ψN, orbitN, ns, r0s, flux, aa, orbitPN, flux2, fluxPN, fluxN, plotAux},
 r0s = Subdivide[Log[r0min], Log[r0max], points] // Exp // SetPrecision[#, prec] &;
  ns = Range[1, order, 2];
  orbit = KerrGeoOrbit[SetPrecision[a, prec], r0, 0, 1];
  EchoTiming[ψ = TeukolskyPointParticleModePN[s, ℓ, m, orbit, {\[Eta], order}], "ψPN"];
  EchoTiming[Table[fluxN[r0] = TeukolskyPointParticleMode[s, ℓ, m, orbit]["EnergyFlux"]["\[ScriptCapitalI]"] /. aa -> SetPrecision[a, prec], {r0, r0s}], "Numerics Table"];
  EchoTiming[flux = ψ["EnergyFlux"]["\[ScriptCapitalI]"], "PN flux"];
  EchoTiming[Table[flux2[n] = flux // SeriesTake[#, n] & // Normal // ReplaceAll[\[Eta] -> 1], {n, ns}], "PN Table 1"];
  EchoTiming[Table[Table[fluxPN[n, r0] = flux2[n], {r0, r0s}], {n, ns}], "PN Table 2"];
  EchoTiming[Table[aux[n] = Table[{r0, Abs[fluxPN[n, r0]/fluxN[r0] - 1]}, {r0, r0s}], {n, ns}], "Relative Error"];
  plotAux = ListLogLogPlot[aux[order], PlotRange -> {10^-20, 1}, PlotStyle -> Transparent, ImageSize -> Large, Joined -> True, Axes -> False, Frame -> True, FrameLabel -> {"\!\(\*SubscriptBox[\(r\), \(0\)]\)", "Relative Error"}, PlotTheme -> "Detailed"];
  Table[plotFlux[n] = ListLogLogPlot[aux[n], Joined -> True, PlotStyle -> {ColorData["DarkRainbow"][n/order]}, PlotLegends -> {ToString[(n - 1)/2] <> "PN"}], {n, ns}];
  Show[{plotAux, Table[plotFlux[n], {n, ns}]} // Flatten]
  ]], "Total"]
```

## Tools

The Teukolsky package features a hidden subcontext with various additional tools, many of which are especially useful when dealing with series expansions in Mathematica:

```mathematica
<<Teukolsky`PN`Tools`;
?Teukolsky`PN`Tools`*
```


## Authors and contributors

Barry Wardell, Niels Warburton, Marc Casals, Adrian Ottewill, Chris Kavanagh, Leanne Durkan, Ben Leather, Theo Torres, Jakob Neef

