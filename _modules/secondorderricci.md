---
name: "SecondOrderRicci"
requirements: GSL, HDF5, Boost, OpenMP, SCons
citation:
  - text: "Spiers, Pound and Wardell, Second-order perturbations of the Schwarzschild spacetime: Practical, covariant, and gauge-invariant formalisms, Phys. Rev. D 110, 064030 (2024)"
    doi: "10.1103/PhysRevD.110.064030"
    arxiv: "2306.17847"
    inspire: "2673488"
    bibtex: |
      @article{Spiers:2023mor,
          author = "Spiers, Andrew and Pound, Adam and Wardell, Barry",
          title = "{Second-order perturbations of the Schwarzschild spacetime: Practical, covariant, and gauge-invariant formalisms}",
          eprint = "2306.17847",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          doi = "10.1103/PhysRevD.110.064030",
          journal = "Phys. Rev. D",
          volume = "110",
          number = "6",
          pages = "064030",
          year = "2024"
      }
---

## Overview

SecondOrderRicci computes the source for the second-order Lorenz-gauge field equations in
Schwarzschild spacetime. That source is the second-order Ricci tensor
$\delta^2 R\_{\mu\nu}[h^{(1)}, h^{(1)}]$, which is quadratic in the first-order metric perturbation.

The code reads tensor-spherical-harmonic modes of a first-order field $h^{(1)}\_{\mu\nu}$ for a particle
on a circular orbit of radius $r\_0$. It then computes the $(i, \ell, m)$ modes of $\delta^2 R\_{\mu\nu}$
on the same radial grid. The modes are in the Barack–Lousto–Sago basis of tensor spherical harmonics,
$i = 1, \dots, 10$ (see Appendix A of [Wardell and Warburton (2015)](https://arxiv.org/abs/1505.07841)).
Each output mode $(\ell\_3, m\_3)$ is a sum over products of input modes $(\ell\_1, m\_1)$ and
$(\ell\_2, m\_3 - m\_1)$. The angular coupling uses Wigner 3j symbols from the GNU Scientific Library. The
loop over output modes is parallelized with OpenMP.

The code is part of the Toolkit's second-order self-force chain:

- [h1Lorenz]({{ '/modules/h1lorenz/' | relative_url }}) computes the first-order Lorenz-gauge field;
- [Punctures]({{ '/modules/punctures/' | relative_url }}) gives the singular and regular parts of that
  field and the second-order puncture;
- SecondOrderRicci builds the quadratic source from the first-order field.

For background on the second-order scheme, see
[Miller and Pound (2021)](https://arxiv.org/abs/2006.11263).

## Installation

SecondOrderRicci is built from source with [SCons](https://scons.org/). It needs:

- the GNU Scientific Library (GSL), for Wigner 3j symbols;
- HDF5, used for all input and output;
- a C++11 compiler with OpenMP support;
- Boost, for its `multi_array` type;
- SCons, the build system.

The README lists the versions it was tested with: GSL 1.16, HDF5 1.8.13, GCC 4.9.0, Boost 1.55.0 and
SCons 2.3.1. The build compiles with `-DH5_USE_110_API`.

```bash
git clone https://github.com/BlackHolePerturbationToolkit/SecondOrderRicci.git
cd SecondOrderRicci
scons
```

This builds three executables, `Ricci`, `Ricci_M` and `Ricci_S`, in the top-level directory. If your
libraries are in non-standard locations, edit the "Build options" section of `src/SConscript`
(`LIBPATH`, `CPPPATH`, `CXX` and so on). The defaults point at `/usr/local` and the Debian/Ubuntu
HDF5 locations. No installation step is needed. Run `scons VERBOSE=1` to see the full compiler
commands.

## Usage

### Input data

The first-order field must be in a directory of its own, with one HDF5 file per $(\ell, m)$ mode,
named `h1-l<l>m<m>.h5` (for $m \ge 0$), and no other files. Each file contains:

- `grid`: the radial grid. The worldline radius $r\_0$ is shared between the two datasets below, so it
  appears once in each.
- `inhom_left` and `inhom_right`: the field to the left (including $r\_0$) and right (from $r\_0$) of the
  particle. For each field component there are six columns: the real and imaginary parts of the
  Barack–Lousto–Sago field $\bar h^{(i)\ell m}$, of its first radial derivative, and of its second radial
  derivative.

The components appear in the order $\\{1,3,5,6,7,2,4\\}$ for even $\ell+m$ with $\ell \ge 2$, and
$\\{9,10,8\\}$ for odd $\ell+m$ with $\ell \ge 2$. The low multipoles use $\\{1,3,6,2\\}$
($\ell = 0$), $\\{1,3,5,6,2,4\\}$ ($\ell = 1$, $m = 1$) and $\\{9,8\\}$ ($\ell = 1$, $m = 0$). Negative-$m$
modes are reconstructed by symmetry.

[h1Lorenz]({{ '/modules/h1lorenz/' | relative_url }}) writes files with the same names and datasets,
but with only the field and its first derivative (four columns per component). The second
derivatives must be added before running SecondOrderRicci. The
[Punctures]({{ '/modules/punctures/' | relative_url }}) repository has notebooks that generate the
retarded, singular and regular first-order fields, including second derivatives, in this format.

### Running

```bash
# Quadratic source from a single first-order field, using all available modes
./Ricci <dir>

# Source bilinear in two first-order fields A and B
./Ricci <dirA> <dirB> <delta_lmax> <lmax>
```

In the second form, `lmax` is the largest output $\ell$. For each output mode the sum over input modes
is restricted to $\ell\_3 - \Delta\ell\_{\max} \le \ell\_1, \ell\_2 \le \ell\_3 + \Delta\ell\_{\max}$. A
negative `delta_lmax` lowers the maximum input $\ell$ used. Both the single-field and two-field forms
evaluate the quadratic terms with the first field in the first slot and the second field in the second
slot.

Two variants couple the supplied field to an analytically known first-order perturbation built into the
code:

```bash
./Ricci_M <dir> [<lmax>]   # coupling to the l = 0 mass perturbation
./Ricci_S <dir> [<lmax>]   # coupling to the l = 1, m = 0 odd-parity angular-momentum perturbation
```

These variants evaluate both orderings of the two fields.

The number of threads is set by the usual OpenMP environment variable, for example
`OMP_NUM_THREADS=16 ./Ricci data/h1R`.

### Output

The result is written to the current directory as `src.h5` (`src_M.h5` for `Ricci_M`, `src_S.h5` for
`Ricci_S`). It contains:

- `r`: the radial grid;
- `src i=<i> l=<l> m=<m>`: one dataset for each $(i, \ell, m)$ mode with $m \ge 0$. Each is an
  $N \times 2$ array of the real and imaginary parts of the mode on the grid.

## Examples

`notebooks/LoadSecondOrderRicciData.nb` shows how to read the output in Mathematica. It uses
[SimulationTools](https://simulationtools.org/) for data handling. The core of it is:

```mathematica
rGrid = Import["src.h5", {"Datasets", "/r"}];
Loadd2R[i_, l_, m_] := d2R[i, l, m] = ToDataTable[Transpose[{rGrid,
     Complex @@@ Import["src.h5", {"Datasets", "/src i=" <> ToString[i] <> " l=" <> ToString[l] <> " m=" <> ToString[m]}]}]];

Do[Loadd2R[i, 2, 2], {i, 1, 7}]
```

The notebook also shows how to transform the modes to retarded or advanced time slicing by multiplying
by $e^{\mp i m \Omega r\_\*}$, where $r\_\*$ is the tortoise coordinate.

## Authors and contributors

Barry Wardell
