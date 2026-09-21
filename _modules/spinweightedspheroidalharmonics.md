---
name: "SpinWeightedSpheroidalHarmonics"
citation:
  - text: SpinWeightedSpheroidalHarmonics
    doi: 10.5281/zenodo.8090680
  - text: "Black Hole Perturbation Toolkit: Low frequency and post-Newtonian expansions"
---

<!-- Scaffolded from _data/tools.yml. Replace the TODO sections with real
     documentation, then delete the stub notice below. -->

<!-- <div class="callout" markdown="1">
**Stub page.** Full documentation for SpinWeightedSpheroidalHarmonics is in progress. For now, see the [source repository](https://github.com/BlackHolePerturbationToolkit/SpinWeightedSpheroidalHarmonics) and the [package page](https://bhptoolkit.org/SpinWeightedSpheroidalHarmonics). 
</div>-->

## Overview

The SpinWeightedSpheroidalHarmonics package provides functions for computing spin-weighted spheroidal harmonics, spin-weighted spherical harmonics, and their associated eigenvalues. Support is included for both arbitrary-precision numerical evaluation and for series expansions.

The SpinWeightedSpheroidalHarmonics package gives solutions to the angular Teukolsky equation:
$$
\frac{1}{\sin\theta}\dfrac{d}{d\theta}\bigg(\sin\theta\dfrac{d}{d\theta}\bigg) -\gamma^2 \sin^2\theta -\frac{(m+s \cos\theta)^2}{\sin^2\theta} - 2 s \gamma \cos\theta +s + {}_s \lambda_{\ell m} + 2 m  \gamma \bigg] {}_{s} S_{\ell m}(\gamma;\theta,0) = 0
\,,
$$

where ${}\_s \lambda_{\ell m }$ is the spin weighted spheroidal eigenvalue and $ \gamma = a \omega $ the spheroidicity


<!-- TODO: expand — what it computes, key features, and related packages. -->

## Installation

Install with the command shown in the header:

```mathematica
PacletInstall["SpinWeightedSpheroidalHarmonics"]
```
Load the package via,

```mathematica
<<SpinWeightedSpheroidalHarmonics`
```

## Usage


`SpinWeightedSpheroidalHarmonicS[s,ℓ,m,γ,θ,ϕ]` gives a solution ${}\_s S_{\ell m} (\gamma;\theta,\phi)$:

```Mathematica
SpinWeightedSpheroidalHarmonicS[s,l,m,γ,θ,ϕ]
```

For numerical use it is recommended to a priori omit the angular arguments:

```Mathematica
S=SpinWeightedSpheroidalHarmonicS[-2,2,2,.5]
S[.3,.5]
```

`SpinWeightedSphericalHarmonicY[s,ℓ,m,θ,ϕ]` gives the spin-weighted spherical harmonic function ${}\_s Y_{\ell m}(θ,ϕ) = {}\_s S_{\ell m}(0;θ,ϕ)$:

```Mathematica
Y=SpinWeightedSphericalHarmonicY[-2,2,2,θ,ϕ]
```

The spin-weighted spheroidal harmonics ${}\_s S_{\ell m} (\gamma;\theta,\phi)$ can be expanded in spin-weighted spherical harmonics ${}\_s Y_{\ell m} (\theta,\phi)$:

```Mathematica
SpinWeightedSpheroidalHarmonicS[s,l,m,γ,θ,ϕ]//Series[#,{γ,0,2}]&
```

SpinWeightedSpheroidalEigenValue[s,ℓ,m,γ] gives the spin-weighted spheroidal eigenvalue ${}\_s \lambda_{\ell m}$:

```Mathematica
λ=SpinWeightedSpheroidalEigenvalue[-2,2,2,.4]
```

again it admits a series expansion:

```Mathematica
SpinWeightedSpheroidalEigenvalue[s,l,m,γ]//Series[#,{γ,0,3}]&
```

When making use of series expansions extensively it might be useful to run the following:

```Mathematica
SetSpinWeightedOptions["OverloadSeries"->True]
```

## Examples

### Satisfying the spheroidal equation
We can write out the spheroidal equation,
```Mathematica
SpheroidalEquation[s_, ℓ_, m_, γ_, θ_, φ_] := 
 Module[{aux, ϑ, ϕ},
  aux = D[SpinWeightedSpheroidalHarmonicS[s, ℓ, m, γ, ϑ, ϕ], {ϑ, 2}] + Cot[ϑ] D[SpinWeightedSpheroidalHarmonicS[s, ℓ, m, γ, ϑ, ϕ], ϑ] + (2 γ (m - s Cos[ϑ]) - (m + s Cos[ϑ])^2/Sin[ϑ]^2 + SpinWeightedSpheroidalEigenvalue[s, ℓ, m, γ] + s - γ^2 Sin[ϑ]^2) SpinWeightedSpheroidalHarmonicS[s, ℓ, m, γ, ϑ, ϕ];
  aux = aux /. {ϑ -> θ, ϕ -> φ};
  aux
  ]

SpheroidalEquation[s, ℓ, m, γ, θ, φ] 
```
and check that our solutions satisfy it numerically to arbitrary precission,

```Mathematica
SpheroidalEquation[-2, 2, 2, .3`300, .2`300, .5`300]
```

or analytically as a series expansion.

```Mathematica
SpheroidalEquation[-2, 2, 2, γ, θ, ϕ] //Series[#, {γ, 0, 5}] & // Simplify
```

### Implementing spin raising and lowering operators in Schwarzschild

We can use SpinWeightedSimplify to implement the Schwarzschild ð and ð' as spin raising and lowering operators

```Mathematica
ð[SpinWeightedSphericalHarmonicY[s_, ℓ_, m_, ϑ_, ϕ_]] := 1/(Sqrt[2] r) (D[#, ϑ] + I Csc[ϑ] D[#, ϕ] - s Cot[ϑ] #) &@ SpinWeightedSphericalHarmonicY[s, ℓ, m, ϑ, ϕ];
ðp[SpinWeightedSphericalHarmonicY[s_, ℓ_, m_, ϑ_, ϕ_]] := 1/(Sqrt[2] r) (D[#, ϑ] - I Csc[ϑ] D[#, ϕ] + s Cot[ϑ] #) &@ SpinWeightedSphericalHarmonicY[s, ℓ, m, ϑ, ϕ];

ð[SpinWeightedSphericalHarmonicY[-4, ℓ, m, ϑ, ϕ]] // SpinWeightedSimplify[#, "s" -> -3] & // Simplify
ðp[SpinWeightedSphericalHarmonicY[-4, ℓ, m, ϑ, ϕ]] // SpinWeightedSimplify[#, "s" -> -5] & // Simplify
```




<!-- TODO: link to worked examples or notebooks. -->
See the [repository](https://github.com/BlackHolePerturbationToolkit/SpinWeightedSpheroidalHarmonics) for more examples.

## Authors and contributors 

Barry Wardell, Niels Warburton, Kwinten Fransen, Samuel Upton, Kevin Cunningham, Marc Casals, Sarp Akcay, Adrian Ottewill, Jakob Neef


