---
name: "Spin-Weighted Spheroidal Harmonics"
citation:
  - text: SpinWeightedSpheroidalHarmonics
    doi: 10.5281/zenodo.8090680
    bibtex: |
      @software{BHPToolkit:SpinWeightedSpheroidalHarmonics,
        author       = {Wardell, Barry and Warburton, Niels and Cunningham, Kevin and Ottewill, Adrian and Casals, Marc and Neef, Jakob and Upton, Samuel D. and Fransen, Kwinten},
        title        = {SpinWeightedSpheroidalHarmonics},
        month        = sep,
        year         = 2026,
        publisher    = {Zenodo},
        version      = {1.1.1},
        doi          = {10.5281/zenodo.22809903},
        url          = {https://doi.org/10.5281/zenodo.22809903},
        swhid        = {swh:1:dir:f09182c98751055ea8450962b95b6aaa5b67d049;origin=https://doi.org/10.5281/zenodo.8090680;visit=swh:1:snp:e4facb38391d33453c83f50c0e6b1c79d7853e17;anchor=swh:1:rel:1f9649ba435521ce327117247e9177ce29266695;path=BlackHolePerturbationToolkit-SpinWeightedSpheroidalHarmonics-48cd355},
      }
  - text: "For use of the analytical capabilities:<br> Black Hole Perturbation Toolkit: Low frequency and post-Newtonian expansions"
    arxiv: "2609.25281"
    inspire: "3206100"
    bibtex: |
      @article{Neef:2026qoq,
          author = "Neef, Jakob and Kavanagh, Chris and Ottewill, Adrian",
          title = "{Black Hole Perturbation Toolkit: Low frequency and post-Newtonian expansions}",
          eprint = "2609.25281",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          month = "9",
          year = "2026"
      }
  - text: Black Hole Perturbation Toolkit
    bibtex: |
      @misc{BHPToolkit,
        title = {{Black Hole Perturbation Toolkit}},
        howpublished = {(\href{http://bhptoolkit.org/}{bhptoolkit.org})},
      }
---

## Overview

The SpinWeightedSpheroidalHarmonics package provides functions for computing spin-weighted spheroidal harmonics, spin-weighted spherical harmonics, and their associated eigenvalues. Support is included for both arbitrary-precision numerical evaluation and for series expansions.

![The spin-weighted spheroidal harmonic with s=-2, l=2, gamma=1.9]({{ '/assets/img/modules/spinweightedspheroidalharmonics/swsh.png' | relative_url }})

The SpinWeightedSpheroidalHarmonics package gives solutions to the angular Teukolsky equation:
$$
\bigg[\frac{1}{\sin\theta}\dfrac{d}{d\theta}\bigg(\sin\theta\dfrac{d}{d\theta}\bigg) -\gamma^2 \sin^2\theta -\frac{(m+s \cos\theta)^2}{\sin^2\theta} - 2 s \gamma \cos\theta +s + {}_s \lambda_{\ell m} + 2 m  \gamma \bigg] {}_{s} S_{\ell m}(\gamma;\theta,0) = 0
\,,
$$

where $s$ is the spin-weight, $\ell, m$ are the multipolar indices, ${}\_s \lambda_{\ell m }$ is the spin-weighted spheroidal eigenvalue and $\gamma = a \omega$ is the spheroidicity.

Output tracks the precision of the input, so high-precision results are obtained simply by giving high-precision arguments. Expansions are available both for small $\gamma$ (in terms of spin-weighted spherical harmonics) and, for the eigenvalue, about $\gamma = \infty$.

The package provides the angular dependence for the [Teukolsky]({{ '/modules/teukolsky/' | relative_url }}) package and is also a dependency of [ReggeWheeler]({{ '/modules/reggewheeler/' | relative_url }}). Full reference documentation is available [online]({{ '/SpinWeightedSpheroidalHarmonics/doc/html/guide/SpinWeightedSpheroidalHarmonics.html' | relative_url }}) and in the Wolfram Documentation Center.

## Installation

SpinWeightedSpheroidalHarmonics is distributed as a paclet. Once the BHPToolkit paclet server is set
up (see [Get started]({{ '/get-started/' | relative_url }})), install it by name:

```mathematica
PacletSiteRegister["https://pacletserver.bhptoolkit.org", "Black Hole Perturbation Toolkit Paclet Server"]
PacletSiteUpdate["https://pacletserver.bhptoolkit.org"]
PacletInstall["SpinWeightedSpheroidalHarmonics"]
```

## Usage

### Loading the package
The package can be loaded with:
```mathematica
<<SpinWeightedSpheroidalHarmonics`
```

### Spin-weighted spheroidal harmonics ${}\_sS_{\ell m }$


`SpinWeightedSpheroidalHarmonicS[s,ℓ,m,γ,θ,ϕ]` returns a spin-weighted spheroidal harmonic ${}\_s S_{\ell m} (\gamma;\theta,\phi)$, which is a to the angular Teukolsky equation:

```Mathematica
SpinWeightedSpheroidalHarmonicS[s,l,m,γ,θ,ϕ]
```

For numerical use it is recommended to a priori omit the angular arguments:

```Mathematica
S=SpinWeightedSpheroidalHarmonicS[-2,2,2,.5]
S[.3,.5]
```

### Spin-weighted spherical harmonics ${}\_sY_{\ell m }$

`SpinWeightedSphericalHarmonicY[s,ℓ,m,θ,ϕ]` gives the spin-weighted spherical harmonic function ${}\_s Y_{\ell m}(θ,ϕ) = {}\_s S_{\ell m}(0;θ,ϕ)$:

```Mathematica
Y=SpinWeightedSphericalHarmonicY[-2,2,2,θ,ϕ]
```

### Spin-weighted spheroidal eigenvalue

`SpinWeightedSpheroidalEigenValue[s,ℓ,m,γ]` gives the spin-weighted spheroidal eigenvalue ${}\_s \lambda_{\ell m}$:

```Mathematica
λ=SpinWeightedSpheroidalEigenvalue[-2,2,2,.4]
```


### Series expansions

The spin-weighted spheroidal harmonics ${}\_s S_{\ell m} (\gamma;\theta,\phi)$ can be expanded in spin-weighted spherical harmonics ${}\_s Y_{\ell m} (\theta,\phi)$:

```Mathematica
SpinWeightedSpheroidalHarmonicS[s,l,m,γ,θ,ϕ]//Series[#,{γ,0,2}]&
```
Likewise the eigenvalue admits a series expansion:

```Mathematica
SpinWeightedSpheroidalEigenvalue[s,l,m,γ]//Series[#,{γ,0,3}]&
```

The eigenvalue can also be expanded about $\gamma = \infty$. This currently requires explicit (integer or half-integer) values of $s$, $\ell$ and $m$:

```Mathematica
Series[SpinWeightedSpheroidalEigenvalue[2, 2, 2, γ], {γ, ∞, 6}]
```

which returns

$$
-6 \gamma - 1 + \frac{3}{4 \gamma} - \frac{15}{64 \gamma^3} - \frac{3}{16 \gamma^4} + \frac{3}{512 \gamma^5} + \frac{27}{128 \gamma^6} + O\left(\frac{1}{\gamma}\right)^7 \nonumber
$$

When making extensive use of series expansions it can be useful to run the following:

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

We can use `SpinWeightedSimplify` to implement the Schwarzschild ð and ð' as spin raising and lowering operators

```Mathematica
ð[SpinWeightedSphericalHarmonicY[s_, ℓ_, m_, ϑ_, ϕ_]] := 1/(Sqrt[2] r) (D[#, ϑ] + I Csc[ϑ] D[#, ϕ] - s Cot[ϑ] #) &@ SpinWeightedSphericalHarmonicY[s, ℓ, m, ϑ, ϕ];
ðp[SpinWeightedSphericalHarmonicY[s_, ℓ_, m_, ϑ_, ϕ_]] := 1/(Sqrt[2] r) (D[#, ϑ] - I Csc[ϑ] D[#, ϕ] + s Cot[ϑ] #) &@ SpinWeightedSphericalHarmonicY[s, ℓ, m, ϑ, ϕ];

ð[SpinWeightedSphericalHarmonicY[-4, ℓ, m, ϑ, ϕ]] // SpinWeightedSimplify[#, "s" -> -3] & // Simplify
ðp[SpinWeightedSphericalHarmonicY[-4, ℓ, m, ϑ, ϕ]] // SpinWeightedSimplify[#, "s" -> -5] & // Simplify
```


### Further examples

See the [online reference documentation]({{ '/SpinWeightedSpheroidalHarmonics/doc/html/guide/SpinWeightedSpheroidalHarmonics.html' | relative_url }}) (also available in the Mathematica Documentation Centre) for a tutorial and documentation on individual functions. More example notebooks are in the [Mathematica Toolkit Examples](https://github.com/BlackHolePerturbationToolkit/MathematicaToolkitExamples) repository.

## Authors and contributors 

Barry Wardell, Niels Warburton, Kwinten Fransen, Samuel Upton, Kevin Cunningham, Marc Casals, Sarp Akcay, Adrian Ottewill, Jakob Neef
