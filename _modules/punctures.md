---
name: "Punctures"
citation:
  - text: "Upton, Wardell, Pound, Warburton and Barack, Effective source for second-order self-force calculations: Quasicircular orbits in Schwarzschild spacetime, Phys. Rev. D 113, 064013 (2026)"
    doi: "10.1103/f9j2-k64r"
    arxiv: "2508.00087"
    inspire: "2956213"
    bibtex: |
      @article{Upton:2025bja,
          author = "Upton, Samuel D. and Wardell, Barry and Pound, Adam and Warburton, Niels and Barack, Leor",
          title = "{Effective source for second-order self-force calculations: Quasicircular orbits in Schwarzschild spacetime}",
          eprint = "2508.00087",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          doi = "10.1103/f9j2-k64r",
          journal = "Phys. Rev. D",
          volume = "113",
          number = "6",
          pages = "064013",
          year = "2026"
      }
  - text: "Pound and Miller, Practical, covariant puncture for second-order self-force calculations, Phys. Rev. D 89, 104020 (2014)"
    doi: "10.1103/PhysRevD.89.104020"
    arxiv: "1403.1843"
    inspire: "1284969"
    bibtex: |
      @article{Pound:2014xva,
          author = "Pound, Adam and Miller, Jeremy",
          title = "{Practical, covariant puncture for second-order self-force calculations}",
          eprint = "1403.1843",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          doi = "10.1103/PhysRevD.89.104020",
          journal = "Phys. Rev. D",
          volume = "89",
          number = "10",
          pages = "104020",
          year = "2014"
      }
---

## Overview

The Punctures repository contains the puncture fields for second-order self-force calculations,
specialised to a point mass on a quasicircular orbit of radius $r\_0$ about a Schwarzschild black hole
in the Lorenz gauge. In a puncture (or effective-source) scheme the singular part of the field near the
particle is approximated analytically by a *puncture* $h^{\mathcal{P}}\_{\mu\nu}$. Subtracting it from the
field equations gives an effective source, from which a field that is finite at the particle is computed
numerically. The details are in
[Effective source for second-order self-force calculations: quasicircular orbits in Schwarzschild spacetime](https://arxiv.org/abs/2508.00087)
(Upton, Wardell, Pound, Warburton and Barack). The covariant second-order puncture they build on was derived by
[Pound and Miller (2014)](https://arxiv.org/abs/1403.1843).

The punctures are given as modes in the Barack–Lousto–Sago basis of tensor spherical harmonics, labelled
by $i = 1, \dots, 10$ and $(\ell, m)$, as functions of $r\_0$, the black hole mass $M$ and the radial
distance from the particle, $\Delta r = r - r\_0$. Mode decompositions are first done in a rotated frame
where the particle sits at the pole, where only a few azimuthal numbers $m^\prime$ contribute. They are
then rotated back to the physical frame with Wigner $D$-matrices.

The repository has three parts:

- **First-order puncture** $h^{1\mathcal{P}}\_{\mu\nu}$, including terms up to order $\epsilon^2$ in the
  distance from the particle, together with the scripts that produce numerical mode data for the
  first-order singular, regular and retarded fields.
- **Second-order puncture** $h^{2\mathcal{P}}\_{\mu\nu}$, split into the pieces
  $h^{\rm SS}\_{\mu\nu}$, $h^{\rm SR}\_{\mu\nu}$, $h^{\delta m}\_{\mu\nu}$, $h^{\delta z}\_{\mu\nu}$ and
  $h^{\rm ms}\_{\mu\nu}$ defined in the paper above. These are provided as covariant expressions and as
  $\ell m$ modes.
- **First-order regular field** $h^{\mathcal{R}1}\_{\mu\nu}$ and its derivatives at the particle,
  computed by mode-sum regularization from numerical first-order data.

Punctures is not a loadable package. It is a collection of Mathematica notebooks, scripts and
precomputed expressions, intended to be used alongside the first-order Lorenz-gauge solver
[h1Lorenz]({{ '/modules/h1lorenz/' | relative_url }}) and the second-order source code
[SecondOrderRicci]({{ '/modules/secondorderricci/' | relative_url }}).

## Installation

Punctures is not on the BHPToolkit paclet server. Clone the repository (about 30 MB, mostly large
expression files):

```bash
git clone https://github.com/BlackHolePerturbationToolkit/Punctures.git
```

The notebooks load their companion files with `NotebookDirectory[]`, so open them from inside the
cloned repository. Nothing needs to be added to `$Path`.

## Repository contents

| Path | Contents |
|------|----------|
| `SecondOrder/h2Pilm.m` | $\ell m$ modes of the second-order puncture pieces in the rotated frame: `hSSlm[i][l, m']`, `hSRlm[i][l, m']`, `hδmlm[i][l, m']`, `hδzlm[i][l, m']` and `hmslm[i][l, m']` |
| `SecondOrder/LoadSecondOrderPunctures.nb` | Loads `h2Pilm.m`, rotates the modes to the physical frame, and defines `h2P[piece, i, l, m]` for `piece` one of `"SS"`, `"SR"`, `"δm"`, `"δz"`, `"ms"` |
| `SecondOrder/CovariantSecondOrderPunctureMultiscale.nb` | Covariant (multiscale) expressions for $h^{\rm SS}$, $h^{\rm SR}$, $h^{\delta m}$, $h^{\delta z}$ and $h^{\rm ms}$, organised by order in distance from the worldline |
| `First Order/h1P-exact-order-eps2.wl` | Script that computes the first-order puncture modes to order $\epsilon^2$ for a given $r\_0$ |
| `First Order/h1P-r0.nb`, `h1P-r0-4derivs.nb` | Notebooks that derive the first-order puncture modes |
| `First Order/h1P-4derivs.m` | Rotated-frame first-order puncture modes `h1Pilm[i][l, m']` |
| `First Order/h0.m`, `h0-4derivs.m` | Puncture modes at the particle, `h0[i, l, m', r0, M]`, with one-sided radial derivatives `dh0Left`, `dh0Right`, `ddh0Left`, … (up to fourth derivatives in `h0-4derivs.m`) |
| `First Order/Process-h1P.nb` | Combines the per-mode output of `h1P-exact-order-eps2.wl` into a single file |
| `First Order/h1S-exact-order-eps2.nb` | Generates HDF5 files for $h^{1\mathcal{S}}$, $h^{1\mathcal{R}}$ and $h^{1,\rm ret}$, including second derivatives |
| `hR1/hR.nb`, `hR.m` | Computes the regularized first-order Lorenz-gauge metric perturbation and its derivatives on the worldline from $h^{1\mathcal{R}}$ mode data |

## Usage

### Second-order punctures

Open `SecondOrder/LoadSecondOrderPunctures.nb` from the cloned repository and evaluate it. This loads
the mode expressions in `h2Pilm.m` and defines `h2P[piece, i, l, m]`. That function returns the
physical-frame $(i, \ell, m)$ mode of a piece of the second-order puncture as an expression in $r\_0$,
$M$, $\Omega$ and $\Delta r$. Evaluate it numerically by fixing those symbols, for example the
$i=1$, $\ell=m=2$ mode of $h^{\rm SR}$:

```mathematica
Block[{M = 1, r0 = 7.6, Δr = 0.4, Ω = 7.6^(-3/2)}, h2P["SR", 1, 2, 2]]
```

Throughout the repository, `Δr` (`\[CapitalDelta]r`) is the symbol for $\Delta r$ and `Ω`
(`\[CapitalOmega]`) is the symbol for the orbital frequency $\Omega$.

The notebook also plots the $h^{\rm SS}$ modes against $\Delta r$:

```mathematica
plothSS[i_, l_, m_][r1_] := Block[{M = 1, Ω = r1^(-3/2), r0 = r1, hSSEval},
  hSSEval = h2P["SS", i, l, m];
  Plot[Evaluate[ReIm[hSSEval]], {Δr, -2, 2}, PlotTheme -> "Detailed", FrameLabel -> {"Δr"}]]

Table[plothSS[i, 2, 2][7.6], {i, 1, 7}]
Table[plothSS[i, 2, 1][7.6], {i, 8, 10}]
```

Only $h^{\rm SS}$ is fully determined by the orbit. The other pieces need first-order data that you
supply yourself: the first-order regular field $h^{\mathcal{R}1}\_{ab}$ and its covariant derivatives
(see `hR1/`), the first-order self-force $F^r\_1$, the inspiral rate $\dot r\_0$, and so on.

You can also load the rotated-frame mode expressions on their own:

```mathematica
Get[FileNameJoin[{"/path/to/Punctures", "SecondOrder", "h2Pilm.m"}]];
hSSlm[1][2, 0] /. {M -> 1, r0 -> 10, Δr -> 1/10} // N
```

### First-order punctures and fields

The first-order pipeline is described in `First Order/README.md`:

1. Edit the "Parameters" section of `h1P-exact-order-eps2.wl`, which sets the working precision,
   `lmax`, the maximum rotated-frame $m^\prime$, the $\Delta r$ range and the output directory.
2. Run the script with `r0` set. It writes one file per field component $i$, plus separate files for
   the first and second derivatives. On a cluster, `First Order/README.md` gives a SLURM script that runs:

   ```bash
   WolframKernel -run "r0=1990/100; Get[\"../h1P-exact-order-eps2.wl\"]; Quit[];"
   ```

3. Run `process[r0]` in `Process-h1P.nb` to combine the output into a single file.
4. Run `h1S-exact-order-eps2.nb` to produce HDF5 files for $h^{1\mathcal{S}}$, $h^{1\mathcal{R}}$ and
   $h^{1,\rm ret}$, including second derivatives.

## Examples

- `SecondOrder/LoadSecondOrderPunctures.nb`: loads and evaluates every second-order puncture piece and
  plots the $h^{\rm SS}$ modes.
- `hR1/hR.nb`: builds the coordinate components of $h^{\mathcal{R}1}\_{\mu\nu}$ and its derivatives at the
  particle from $(\ell, m)$ modes by mode-sum regularization.
- `SecondOrder/CovariantSecondOrderPunctureMultiscale.nb`: the covariant puncture expressions before
  mode decomposition.

## Authors and contributors

Jeremy Miller, Adam Pound, Samuel D. Upton, Barry Wardell
