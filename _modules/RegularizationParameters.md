---
name: "RegularizationParameters"
citation:
  - text: "Heffernan, Ottewill and Wardell, High-order expansions of the Detweiler-Whiting singular field in Schwarzschild spacetime, Phys. Rev. D 86, 104023 (2012)"
    doi: "10.1103/PhysRevD.86.104023"
    arxiv: "1204.0794"
    inspire: "1102971"
    bibtex: |
      @article{Heffernan:2012su,
          author = "Heffernan, Anna and Ottewill, Adrian and Wardell, Barry",
          title = "{High-order expansions of the Detweiler-Whiting singular field in Schwarzschild spacetime}",
          eprint = "1204.0794",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          doi = "10.1103/PhysRevD.86.104023",
          journal = "Phys. Rev. D",
          volume = "86",
          pages = "104023",
          year = "2012"
      }
  - text: "Heffernan, Ottewill and Wardell, High-order expansions of the Detweiler-Whiting singular field in Kerr spacetime, Phys. Rev. D 89, 024030 (2014)"
    doi: "10.1103/PhysRevD.89.024030"
    arxiv: "1211.6446"
    inspire: "1204585"
    bibtex: |
      @article{Heffernan:2012vj,
          author = "Heffernan, Anna and Ottewill, Adrian and Wardell, Barry",
          title = "{High-order expansions of the Detweiler-Whiting singular field in Kerr spacetime}",
          eprint = "1211.6446",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          doi = "10.1103/PhysRevD.89.024030",
          journal = "Phys. Rev. D",
          volume = "89",
          number = "2",
          pages = "024030",
          year = "2014"
      }
  - text: "For the Regularisation package (scalar field, generic Kerr orbits):<br> Heffernan, Regularization of a scalar charged particle for generic orbits in Kerr spacetime, Phys. Rev. D 106, 064031 (2022)"
    doi: "10.1103/PhysRevD.106.064031"
    arxiv: "2107.14750"
    inspire: "1896583"
    bibtex: |
      @article{Heffernan:2021olv,
          author = "Heffernan, Anna",
          title = "{Regularization of a scalar charged particle for generic orbits in Kerr spacetime}",
          eprint = "2107.14750",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          doi = "10.1103/PhysRevD.106.064031",
          journal = "Phys. Rev. D",
          volume = "106",
          number = "6",
          pages = "064031",
          year = "2022"
      }
  - text: "Heffernan, Self-Force Regularisation Parameters Package (Zenodo, 2022)"
    doi: "10.5281/zenodo.6282572"
    bibtex: |
      @software{Heffernan:2022zenodo,
          author    = {Heffernan, Anna},
          title     = {{Self-Force Regularisation Parameters Package}},
          year      = 2022,
          publisher = {Zenodo},
          version   = {1.0},
          doi       = {10.5281/zenodo.6282572},
          url       = {https://doi.org/10.5281/zenodo.6282572}
      }
---

## Overview

In the mode-sum approach to the self-force, the retarded field is computed numerically one spherical
harmonic $\ell$-mode at a time. Each mode is finite at the particle, but their sum diverges. The
*regularization parameters* are analytic expressions for the large-$\ell$ behaviour of the singular
(Detweiler–Whiting) field. Subtracting them mode by mode leaves a sum that converges to the regular
field at the particle:

$$
F^{\rm R}_a = \sum_{\ell=0}^{\infty}\left[F^{\rm ret}_{a\,\ell} - (2\ell+1)F_{a[-1]} - F_{a[0]} - \frac{F_{a[2]}}{(2\ell-1)(2\ell+3)} - \dots\right],
$$

where the next term is $F\_{a[4]}/[(2\ell-3)(2\ell-1)(2\ell+3)(2\ell+5)]$, and so on.

The first two parameters, $F\_{a[-1]}$ and $F\_{a[0]}$, are enough to make the sum converge. Each higher-order parameter speeds up convergence
by another two powers of $\ell$.

This collection gathers the latest regularization parameters for scalar, electromagnetic and
gravitational fields in Schwarzschild and Kerr spacetimes. It also has parameters for related scalar
quantities: the singular field itself, the Detweiler redshift $\tfrac12 h\_{ab}u^a u^b$, and the spin
precession and tidal invariants. The notation follows
[Heffernan, Ottewill and Wardell (2012)](https://arxiv.org/abs/1204.0794), which writes the parameters
as $F\_{a[n]}$ with $n$ the order in distance from the particle. In the original notation:

| This page | Original notation |
|-----------|-------------------|
| $F\_{a[-1]}$ | $A\_a$ |
| $F\_{a[0]}$ | $B\_a$ |
| $F\_{a[2]}$ | $D\_a$ |
| $F\_{a[4]}$ | $F\_a$ |
| $F\_{a[6]}$ | $H\_a$ |

There are two repositories:

- [RegularizationParameters](https://github.com/BlackHolePerturbationToolkit/RegularizationParameters)
  holds the parameters as Mathematica notebooks for Schwarzschild, equatorial Kerr and accelerated
  (non-geodesic) Schwarzschild orbits. This is the main, most complete resource.
- [RegularizationParametersPackage](https://github.com/BlackHolePerturbationToolkit/RegularizationParametersPackage)
  holds `Regularisation`, an early-stage (v0.1.0) Mathematica package. It evaluates the scalar-field
  self-force parameters $F\_{a[-1]}$, $F\_{a[0]}$ and $F\_{a[2]}$ for generic (eccentric, inclined) orbits
  in Kerr spacetime, from [Heffernan (2022)](https://arxiv.org/abs/2107.14750).

## Available parameters

The tables below list where each set of parameters was first derived. If you use a set of parameters,
please cite the corresponding papers as well as the Toolkit.

### Schwarzschild spacetime

**Geodesic self-force parameters**

| Field | Orbit | Parameters | Authors | Reference |
|-------|-------|------------|---------|-----------|
| Scalar | Eccentric | $F\_{a[-1]}$, $F\_{a[0]}$ | L. Barack, A. Ori | Phys. Rev. D 66, 084022 (2002), [arXiv:gr-qc/0204093](https://arxiv.org/abs/gr-qc/0204093) |
| | | $F\_{a[2]}$ | R. Haas, E. Poisson | Phys. Rev. D 74, 044009 (2006), [arXiv:gr-qc/0605077](https://arxiv.org/abs/gr-qc/0605077) |
| | | $F\_{a[4]}$, $F\_{a[6]}$ | A. Heffernan, A. Ottewill, B. Wardell | Phys. Rev. D 86, 104023 (2012), [arXiv:1204.0794](https://arxiv.org/abs/1204.0794) |
| | Circular | $F\_{a[-1]}$, $F\_{a[0]}$ | L. Barack, A. Ori | (1999), [arXiv:gr-qc/9911040](https://arxiv.org/abs/gr-qc/9911040) |
| | | $F\_{a[2]}$ | S. Detweiler, E. Messaritaki, B. F. Whiting | Phys. Rev. D 67, 104016 (2003), [arXiv:gr-qc/0205079](https://arxiv.org/abs/gr-qc/0205079) |
| Electromagnetic | Eccentric | $F\_{a[-1]}$, $F\_{a[0]}$ | L. Barack, A. Ori | Phys. Rev. D 67, 024029 (2003), [arXiv:gr-qc/0209072](https://arxiv.org/abs/gr-qc/0209072) |
| | | $F\_{a[2]}$ | R. Haas | [arXiv:1112.3707](https://arxiv.org/abs/1112.3707) |
| | | $F\_{a[4]}$ | A. Heffernan, A. Ottewill, B. Wardell | Phys. Rev. D 86, 104023 (2012), [arXiv:1204.0794](https://arxiv.org/abs/1204.0794) |
| Gravitational | Eccentric | $F\_{a[-1]}$, $F\_{a[0]}$ | L. Barack, A. Ori | Phys. Rev. D 67, 024029 (2003), [arXiv:gr-qc/0209072](https://arxiv.org/abs/gr-qc/0209072) |
| | | $F\_{a[2]}$, $F\_{a[4]}$ | A. Heffernan, A. Ottewill, B. Wardell | Phys. Rev. D 86, 104023 (2012), [arXiv:1204.0794](https://arxiv.org/abs/1204.0794) |

**Useful scalar quantities for geodesic motion**

| Quantity | Field | Orbit | Parameters | Authors | Reference |
|----------|-------|-------|------------|---------|-----------|
| Singular field | Scalar | Eccentric | $\Phi\_{[0]}$, $\Phi\_{[2]}$, $\Phi\_{[4]}$, $\Phi\_{[6]}$ | A. Heffernan, A. Ottewill, B. Wardell | Phys. Rev. D 86, 104023 (2012), [arXiv:1204.0794](https://arxiv.org/abs/1204.0794) |
| | | Circular | $\Phi\_{[0]}$, $\Phi\_{[2]}$ | L. M. Diaz-Rivera, E. Messaritaki, B. F. Whiting, S. Detweiler | Phys. Rev. D 70, 124018 (2004), [arXiv:gr-qc/0410011](https://arxiv.org/abs/gr-qc/0410011) |
| Detweiler redshift | Gravitational | Eccentric | $H\_{[0]}$, $H\_{[2]}$, $H\_{[4]}$ | A. Heffernan, A. Ottewill, B. Wardell | Phys. Rev. D 86, 104023 (2012), [arXiv:1204.0794](https://arxiv.org/abs/1204.0794) |

The Schwarzschild notebook also has the regularization parameters for the gravitational spin-precession
invariant $\Delta\psi$ and the tidal invariants $\Delta\lambda$ on circular orbits, as defined in
S. R. Dolan, P. Nolan, A. C. Ottewill, N. Warburton and B. Wardell, *Tidal invariants for compact binaries
on quasi-circular orbits*, Phys. Rev. D 91, 023009 (2015), [arXiv:1406.4890](https://arxiv.org/abs/1406.4890).

**Non-geodesic parameters**

| Quantity | Field | Orbit | Parameters | Authors | Reference |
|----------|-------|-------|------------|---------|-----------|
| Self-force | Scalar | Eccentric | $F\_{a[-1]}$, $F\_{a[0]}$, $F\_{a[2]}$ | A. Heffernan;<br>A. Heffernan, A. C. Ottewill, N. Warburton, B. Wardell, P. Diener | [arXiv:1403.6177](https://arxiv.org/abs/1403.6177) (2014);<br>Class. Quant. Grav. 35, 194001 (2018), [arXiv:1712.01098](https://arxiv.org/abs/1712.01098) |
| | | Static | $F\_{a[-1]}$, $F\_{a[0]}$, $F\_{a[2]}$ | M. Casals, E. Poisson, I. Vega | Phys. Rev. D 86, 064033 (2012), [arXiv:1206.3772](https://arxiv.org/abs/1206.3772) |
| Singular field | Scalar | Eccentric | $\Phi\_{[0]}$, $\Phi\_{[2]}$ | A. Heffernan, A. C. Ottewill, N. Warburton, B. Wardell, P. Diener | Class. Quant. Grav. 35, 194001 (2018), [arXiv:1712.01098](https://arxiv.org/abs/1712.01098) |

### Kerr spacetime

**Geodesic self-force parameters**

| Field | Orbit | Parameters | Authors | Reference |
|-------|-------|------------|---------|-----------|
| Scalar | Eccentric, inclined | $F\_{a[-1]}$, $F\_{a[0]}$ | L. Barack, A. Ori | Phys. Rev. Lett. 90, 111101 (2003), [arXiv:gr-qc/0212103](https://arxiv.org/abs/gr-qc/0212103) |
| | | $F\_{a[2]}$ | A. Heffernan | Phys. Rev. D 106, 064031 (2022), [arXiv:2107.14750](https://arxiv.org/abs/2107.14750) |
| | Eccentric, equatorial | $F\_{a[2]}$, $F\_{a[4]}$ | A. Heffernan, A. Ottewill, B. Wardell | Phys. Rev. D 89, 024030 (2014), [arXiv:1211.6446](https://arxiv.org/abs/1211.6446) |
| Electromagnetic and gravitational | Eccentric, inclined | $F\_{a[-1]}$, $F\_{a[0]}$ | L. Barack, A. Ori | Phys. Rev. Lett. 90, 111101 (2003), [arXiv:gr-qc/0212103](https://arxiv.org/abs/gr-qc/0212103) |
| | Eccentric, equatorial | $F\_{a[2]}$ | A. Heffernan, A. Ottewill, B. Wardell | Phys. Rev. D 89, 024030 (2014), [arXiv:1211.6446](https://arxiv.org/abs/1211.6446) |

**Useful scalar quantities for geodesic motion**

| Quantity | Field | Orbit | Parameters | Authors | Reference |
|----------|-------|-------|------------|---------|-----------|
| Singular field | Scalar | Eccentric, inclined | $\Phi\_{[0]}$, $\Phi\_{[2]}$ | A. Heffernan | Phys. Rev. D 106, 064031 (2022), [arXiv:2107.14750](https://arxiv.org/abs/2107.14750) |
| | | Eccentric, equatorial | $\Phi\_{[0]}$, $\Phi\_{[2]}$, $\Phi\_{[4]}$ | A. Heffernan, A. Ottewill, B. Wardell | Phys. Rev. D 89, 024030 (2014), [arXiv:1211.6446](https://arxiv.org/abs/1211.6446) |
| Detweiler redshift | Gravitational | Eccentric, equatorial | $H\_{[0]}$, $H\_{[2]}$ | A. Heffernan, A. Ottewill, B. Wardell | Phys. Rev. D 89, 024030 (2014), [arXiv:1211.6446](https://arxiv.org/abs/1211.6446) |

## Installation

### Parameter notebooks

The notebooks are not a package. Clone the repository and open them in Mathematica:

```bash
git clone https://github.com/BlackHolePerturbationToolkit/RegularizationParameters.git
```

| Notebook | Contents |
|----------|----------|
| `SchwarzschildRegularizationParameters.nb` | Scalar, electromagnetic and gravitational self-force parameters, the scalar singular field, $\tfrac12 h\_{ab}u^a u^b$, and the spin-precession and tidal invariants for geodesics in Schwarzschild spacetime |
| `KerrRegularizationParameters.nb` | Scalar, electromagnetic and gravitational parameters for equatorial geodesics in Kerr spacetime, including scalar and $\tfrac12 h\_{ab}u^a u^b$ $m$-mode parameters, plus a worked example |
| `AcceleratedSchwarzschildSRPs.nb` | Scalar self-force parameters for accelerated (non-geodesic) motion in Schwarzschild spacetime ([arXiv:1712.01098](https://arxiv.org/abs/1712.01098)) |

### Regularisation package

The `Regularisation` package is not on the BHPToolkit paclet server. Clone its repository and put the
package's `Kernel` directory on your `$Path`:

```bash
git clone https://github.com/BlackHolePerturbationToolkit/RegularizationParametersPackage.git
```

```mathematica
AppendTo[$Path, "/path/to/RegularizationParametersPackage/Regularisation/Kernel"];
Needs["Regularisation`"]
```

Put the `Kernel` directory itself on `$Path`. The main file loads its component files by bare file name,
so loading the directory with `PacletDirectoryLoad` does not currently work. The package compiles its
functions to C (`CompilationTarget -> "C"`), so it needs a C compiler that Mathematica can use.

## Usage

### Parameter notebooks

Each notebook defines the parameters as symbolic expressions in the orbital parameters. The same
symbols are reused for the scalar, electromagnetic and gravitational sections, so evaluate only the
section you need.

**Schwarzschild.** Orbits are parametrized by the energy `E0`, the angular momentum `L`, the radial
four-velocity `ur` and the radial position `r0`. For example, a circular orbit of radius $10M$ has:

```mathematica
r0 = 10 M;
E0 = (1 - 2 M/r0) Sqrt[r0/(r0 - 3 M)];
L = r0 Sqrt[M/(r0 - 3 M)];
ur = 0;
```

Self-force parameters are stored as `Flt[n]`, `Flr[n]` and `Flϕ[n]` for $n = -1, 0, 2, 4, 6$, with the
$\ell$-dependence written out explicitly. The scalar field parameters are `Φl[n]`,
$\tfrac12 h\_{ab}u^a u^b$ is `Hl[n]`, the spin-precession parameters are `Δψ[n]`, and the tidal
parameters are `Δλ1[n]`, `Δλ2[n]`, `Δλ3[n]` and `ΔλB[n]`. The spin-precession and tidal parameters
are valid only for circular orbits.

The leading-order parameter often depends on the direction from which the worldline is approached.
This enters through `Sign[Δr]`: $+1$ if the self-force is computed from just outside $r\_0$, $-1$ if from
just inside.

**Kerr (equatorial).** Orbits are parametrized by the energy `ℰ`, the angular momentum `ℒ`, the radial
four-velocity `ur`, the radial position `r` and the black hole spin `a`. The self-force parameters are
stored as `Ft[n]`, `Fr[n]` and `Fϕ[n]`, the scalar field parameters as `Φ[n]`, and
$\tfrac12 h\_{ab}u^a u^b$ as `H[n]`. Here the $\ell$-dependent prefactors are factored out, as in the
equation in the [Overview](#overview). The $m$-mode parameters (`Fmt[4]`, `Fmr[4]`, `Fmϕ[4]` and
`Φm[4]` for the scalar field, plus an $m$-mode section that redefines `H[2]` and `H[4]` for
$\tfrac12 h\_{ab}u^a u^b$) include their $m$-dependence explicitly. The $m$-mode
$\tfrac12 h\_{ab}u^a u^b$ parameters are valid only for circular orbits.

The scalar, electromagnetic and gravitational parameters in the Kerr notebook have been checked in
several ways. They reduce to the Schwarzschild values for $a \to 0$. Covariant and coordinate
calculations agree. They satisfy the Barack–Ori relations between the $A\_\alpha$ and $B\_\alpha$
parameters for the three fields. The scalar $\ell$-mode and $m$-mode parameters correctly regularize
independent numerical data.

### Regularisation package

`RPscalarA`, `RPscalarB` and `RPscalarD` return $F\_{a[-1]}$, $F\_{a[0]}$ and $F\_{a[2]}$ for the
scalar self-force as a list of the four components $\\{t, r, \theta, \phi\\}$. Each takes ten
arguments: the energy, angular momentum, Carter constant, black hole spin, black hole mass, the
particle's radius and polar angle $\theta$, the sign of $\Delta r$, the sign of $u^r$ and the sign of
$u^\theta$.

```mathematica
RPscalarA[En, Lz, Q, a, M, r, θ, sΔr, sur, suθ]
RPscalarB[En, Lz, Q, a, M, r, θ, sΔr, sur, suθ]
RPscalarD[En, Lz, Q, a, M, r, θ, sΔr, sur, suθ]
```

`ElFactor[k, l]` gives the $\ell$-dependent prefactor multiplying $F\_{a[k]}$: $2\ell+1$ for $k=-1$, $1$
for $k=0$, and $1/((2\ell-1)(2\ell+3))$ for $k=2$. The wrapper
`RegParam[field, function, order, parameters]` selects the parameter by field (currently only
`"Scalar"`) and order ($-1$, $0$, $1$ or $2$). `cite` returns BibTeX entries for the references
appropriate to the orbit you used.

## Examples

`KerrRegularizationParameters.nb` ends with a worked example. It takes the numerically computed
$\ell$-modes of the radial scalar self-force for an eccentric equatorial orbit ($a = 0.5M$,
$p = 10$, $e = 0.2$, evaluated at periastron from just inside the particle) and subtracts the
regularization parameters order by order:

```mathematica
Frl[-1] = Table[N[(2 l + 1) Fr[-1]], {l, 0, 18}];
Frl[0] = Table[N[Fr[0]], {l, 0, 18}];
Frl[2] = Table[N[Fr[2]/((2 l - 1) (2 l + 3))], {l, 0, 18}];
Frl[4] = Table[N[Fr[4]/((2 l - 3) (2 l - 1) (2 l + 3) (2 l + 5))], {l, 0, 18}];

ListLogLogPlot[Abs[{FrRet, FrRet - Frl[-1], FrRet - Frl[-1] - Frl[0],
    FrRet - Frl[-1] - Frl[0] - Frl[2], FrRet - Frl[-1] - Frl[0] - Frl[2] - Frl[4]}],
  PlotRange -> {10^-10, 1}, DataRange -> {0, 18}, Frame -> True]
```

The plot shows the faster fall-off in $\ell$ as each higher-order parameter is subtracted. The notebook
supplies `FrRet` (the retarded $\ell$-modes) and the orbital constants.

## Authors and contributors

Anna Heffernan, Adrian Ottewill, Barry Wardell, Niels Warburton
