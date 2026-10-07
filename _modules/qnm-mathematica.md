---
name: "QNM"
requirements: SpinWeightedSpheroidalHarmonics, Teukolsky
citation:
  - text: QNM
    doi: 10.5281/zenodo.17114757
    bibtex: |
      @software{BHPToolkit:QNM,
        author       = {Wardell, Barry and Pantelidou, Christiana and Cownden, Brad and Mac Uilliam, Jake and O'Toole, Conor and Macedo, Rodrigo and Assaad, Jamil},
        title        = {QNM},
        month        = sep,
        year         = 2025,
        publisher    = {Zenodo},
        version      = {0.4.1},
        doi          = {10.5281/zenodo.17194969},
        url          = {https://doi.org/10.5281/zenodo.17194969},
      }
  - text: Black Hole Perturbation Toolkit
    bibtex: |
      @misc{BHPToolkit,
        title = {{Black Hole Perturbation Toolkit}},
        howpublished = {(\href{http://bhptoolkit.org/}{bhptoolkit.org})},
      }
---

## Overview

QNM is a Mathematica package for computing quasinormal mode (QNM) solutions of the Teukolsky equation in
Schwarzschild and Kerr spacetime. The quasinormal mode frequencies $\omega$ are those of the radial Teukolsky
equation,

$$
\bigg[\Delta^{-s} \frac{d}{dr} \bigg( \Delta^{s+1}\frac{d }{dr}\bigg)
  +\frac{K^2 - 2 i s (r-M)K}{\Delta} + 4 i s \omega r - {}_s \lambda_{\ell m} \bigg]{}_{s} \psi_{\ell m \omega} = 0 \nonumber
$$

with $K=(r^2+a^2)\omega - a m$ and $\Delta = r^2 - 2 M r + a^2$, subject to quasinormal boundary conditions
(ingoing at the horizon and outgoing at infinity). For $s = 0$ this is equivalent to the scalar wave equation
in Kerr spacetime.

The package provides two main functions:

```mathematica
QNMFrequency[s, l, m, n, a]
QNMRadial[s, l, m, n, a]
```

where

- $s$ is the spin-weight of the field,
- $\ell$ is the multipolar index,
- $m$ is the azimuthal index,
- $n$ is the overtone number,
- $a$ is the black hole spin parameter.

Frequencies can be computed with a range of methods and evaluated to arbitrary numerical precision. QNM
builds on the [SpinWeightedSpheroidalHarmonics]({{ '/modules/spinweightedspheroidalharmonics/' | relative_url }})
and [Teukolsky]({{ '/modules/teukolsky/' | relative_url }}) packages, and supersedes the older
QuasiNormalModes package, which is no longer maintained. For a Python package for Kerr quasinormal modes see
[qnm]({{ '/modules/qnm/' | relative_url }}).

## Installation

QNM is distributed as a paclet. Once the BHPToolkit paclet server is set
up (see [Get started]({{ '/get-started/' | relative_url }})), install it together with its dependencies:

```mathematica
PacletSiteRegister["https://pacletserver.bhptoolkit.org", "Black Hole Perturbation Toolkit Paclet Server"]
PacletSiteUpdate["https://pacletserver.bhptoolkit.org"]
PacletInstall["SpinWeightedSpheroidalHarmonics"]
PacletInstall["Teukolsky"]
PacletInstall["QNM"]
```

## Usage

### Loading the package

```mathematica
<< QNM`
```

### Quasinormal mode frequencies

Compute the quasinormal mode frequency for $s = -2$, $\ell = 2$, $m = 2$, $n = 0$ and $a = 0.3$:

```mathematica
QNMFrequency[-2, 2, 2, 0, 0.3]
```

For numerical values of $a$, `QNMFrequency` aims to produce a result with the maximum precision allowed by the
precision of $a$. For example, evaluate the frequency to higher accuracy with

```mathematica
QNMFrequency[-2, 2, 2, 0, 0.3`64, Method -> "IncidenceAmplitude"]
```

### Methods

The `Method` option selects the algorithm used:

| Method | Description |
|--------|-------------|
| `"SpheroidalEigenvalue"` (default) | Spectral solution on a hyperboloidal slice, following [Ripley, Class. Quantum Grav. 39, 145009 (2022)](https://doi.org/10.1088/1361-6382/ac776d). |
| `"Interpolation"` | Interpolates tabulated values from Leo Stein's [qnm]({{ '/modules/qnm/' | relative_url }}) package. Tables are not available for every $(s, \ell, m, n)$. |
| `"IncidenceAmplitude"` | Searches directly for a zero of the incidence amplitude of the "In" solution from the Teukolsky package. The slowest method, but it can produce the most accurate results. |
| `"Leaver"` | Leaver's continued-fraction method ([Leaver 1985](https://doi.org/10.1098/rspa.1985.0119); [Nollert 1993](https://doi.org/10.1103/PhysRevD.47.5253)). |
| `"Spectral1D"` | Eigenvalues of the radial operator discretised on a hyperboloidal slice ([Ansorg & Panosso Macedo 2016](https://doi.org/10.1103/PhysRevD.93.124016)). Schwarzschild ($a = 0$) only. |
| `"Spectral2D"` | Eigenvalues of the 2D radial–angular operator on a hyperboloidal slice ([Assaad & Panosso Macedo, arXiv:2506.04326](https://arxiv.org/abs/2506.04326)). Computes a whole set of $(\ell, n)$ frequencies at once, so requires `l = All` and `n = All`. |
| `"Large-l Asymptotic"` | Asymptotic expansion valid for $\ell \gg n$, $\ell \gg 1$ ([Dolan & Ottewill 2009](https://doi.org/10.1088/0264-9381/26/22/225003) in Schwarzschild). |
| `"Large-n Asymptotic"` | Asymptotic expansion valid for $n \gg \ell$, $n \gg 1$ ([Casals et al. 2013](https://doi.org/10.1103/PhysRevD.88.044022)). Schwarzschild only. |

If no initial guess is given, the `"SpheroidalEigenvalue"` and `"IncidenceAmplitude"` methods use the
`"Interpolation"` result as their initial guess, falling back to the asymptotic expansions if no tabulated data
is available.

Sub-options can be passed by giving the method as a list:

- `"SpheroidalEigenvalue"`: `"NumPoints"` (size of the spectral grid), `"InitialGuess"` and `"AccuracyCheck"`
  (`True` by default; `False` for faster performance);
- `"IncidenceAmplitude"`: `"InitialGuess"`;
- `"Interpolation"`: the options of Mathematica's `Interpolation`;
- `"Spectral2D"`: `"NumAngularPoints"` and `"NumRadialPoints"`.

```mathematica
QNMFrequency[-2, 2, 2, 0, 0.3, Method -> {"SpheroidalEigenvalue", "NumPoints" -> 32, "InitialGuess" -> 0.4 - 0.08I, "AccuracyCheck" -> False}]
QNMFrequency[-2, 2, 2, 0, 0.3, Method -> {"IncidenceAmplitude", "InitialGuess" -> 0.4 - 0.08I}]
QNMFrequency[-2, All, 2, All, 0.3, Method -> {"Spectral2D", "NumAngularPoints" -> 12, "NumRadialPoints" -> 12}]
```

### Radial eigenfunctions

`QNMRadial[s, l, m, n, a]` computes the radial eigenfunction of a quasinormal mode, returning a
`QNMRadialFunction` that stores the solution along with the frequency, the spheroidal eigenvalue, the mode
numbers and the asymptotic amplitudes at the horizon and infinity. Solutions are normalised so that the amplitude
at the horizon is 1.

```mathematica
ψ = QNMRadial[-2, 2, 2, 0, 0.3];
ψ[10]
ψ["Amplitudes"]
```

Solutions are computed with a spectral discretisation on a hyperboloidal slice (`Method -> "Hyperboloidal"`,
the only method currently supported). Its sub-options are `"NumPoints"` and `"Coordinates"`, which can be
`"Hyperboloidal"` (the default), `"CompactifiedHyperboloidal"` or `"Boyer-Lindquist"`:

```mathematica
QNMRadial[-2, 2, 2, 0, 0.3, Method -> {"Hyperboloidal", "NumPoints" -> 100, "Coordinates" -> "Boyer-Lindquist"}]
```

By default the frequency is computed with `QNMFrequency`; a precomputed value can be supplied with the
`"Frequency"` option.

## Examples

### A mode as a function of spin

Plot the $(s, \ell, m, n) = (-2, 2, 2, 0)$ mode frequency as a function of $a$:

```mathematica
ParametricPlot[
  ReIm[QNMFrequency[-2, 2, 2, 0, a, Method -> {"SpheroidalEigenvalue", "AccuracyCheck" -> False}]], {a, 0, 0.9},
  AspectRatio -> 1/GoldenRatio, AxesLabel -> {"Re[ω]", "Im[ω]"}]
```

### Near-extremal spins and higher modes

For very high spins the default options may not give an accurate result. In those cases use the
`"IncidenceAmplitude"` method, or the `"SpheroidalEigenvalue"` method with a larger spectral grid:

```mathematica
QNMFrequency[-2, 2, 2, 0, 0.999, Method -> "IncidenceAmplitude"]
QNMFrequency[-2, 2, 2, 0, 0.999, Method -> {"SpheroidalEigenvalue", "NumPoints" -> 45}]
```

When no tabulated data is available for a mode, methods that need an initial guess fall back to asymptotic
expansions, which may pick out a different mode than expected. A good initial guess can be supplied explicitly
(though there is no guarantee that the mode found corresponds to the specified overtone number):

```mathematica
QNMFrequency[-2, 8, 8, 0, 0.999, Method -> {"SpheroidalEigenvalue", "InitialGuess" -> 3.5 - 0.01I}]
```

### An unconventional mode

Find the "unconventional mode" of [arXiv:2506.14635](https://arxiv.org/abs/2506.14635) with a high-precision
initial guess:

```mathematica
With[{s = -2, l = 2, m = 2, a = 0.0``128, ωguess = 0.015`128 - 1.99`128 I},
  QNMFrequency[s, l, m, 0, a, Method -> {"IncidenceAmplitude", "InitialGuess" -> ωguess}]
]
```

Additional documentation, including reference pages for each function, is included in the Mathematica
Documentation Centre.

## Authors and contributors

Barry Wardell, Christiana Pantelidou, Brad Cownden, Jake Mac Uilliam, Conor O'Toole, Rodrigo Macedo, Jamil Assaad
