---
name: "h1Lorenz"
requirements: GSL, HDF5, MPI, SCons
citation:
  - text: "Akcay, Warburton and Barack, Frequency-domain algorithm for the Lorenz-gauge gravitational self-force, Phys. Rev. D 88, 104009 (2013)"
    doi: "10.1103/PhysRevD.88.104009"
    arxiv: "1308.5223"
    inspire: "1250752"
    bibtex: |
      @article{Akcay:2013wfa,
          author = "Akcay, Sarp and Warburton, Niels and Barack, Leor",
          title = "{Frequency-domain algorithm for the Lorenz-gauge gravitational self-force}",
          eprint = "1308.5223",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          doi = "10.1103/PhysRevD.88.104009",
          journal = "Phys. Rev. D",
          volume = "88",
          number = "10",
          pages = "104009",
          year = "2013"
      }
---

## Overview

h1Lorenz computes the first-order metric perturbation, in the mass ratio, sourced by a point particle
on a circular orbit about a Schwarzschild black hole, in the Lorenz gauge. It works in the frequency
domain. It returns the tensor-spherical-harmonic modes of the perturbation and their first radial
derivatives on a radial grid you supply. The modes are in the Barack–Lousto–Sago basis, $\bar h^{(i)\ell m}$
with $i = 1, \dots, 10$.

For each $(\ell, m)$ mode the code integrates the coupled radial ODEs for the independent components.
It builds the remaining "gauge" components from the Lorenz gauge condition, and matches homogeneous
solutions at the particle to obtain the inhomogeneous (retarded) field. For some modes it also computes
asymptotic amplitudes at infinity and on the horizon. The static modes (monopole and even-parity
$m = 0$ modes) are handled separately, as are the odd and even dipoles. The work over $(\ell, m)$ modes
is distributed with MPI.

The code is a modified version of the one developed for
[Akcay, Warburton and Barack (2013)](https://arxiv.org/abs/1308.5223). Its output is the starting
point of the second-order chain in the Toolkit. The
[Punctures]({{ '/modules/punctures/' | relative_url }}) repository regularizes it to get the first-order
regular field, and [SecondOrderRicci]({{ '/modules/secondorderricci/' | relative_url }}) uses it to build
the second-order source.

## Installation

h1Lorenz is built from source with [SCons](https://scons.org/). It needs the GNU Scientific Library,
HDF5 including the high-level `hdf5_hl` library, and an MPI implementation that provides `mpicc`
(for example OpenMPI).

```bash
git clone https://github.com/BlackHolePerturbationToolkit/h1Lorenz.git
cd h1Lorenz
scons
```

This produces the `h1Lorenz` executable in the top-level directory. HDF5 include and library paths are
set in `src/SConscript` (`CPPPATH`, `LIBPATH`). The defaults are the Debian/Ubuntu serial-HDF5
locations, so edit them for other systems.

## Usage

### 1. Generate a radial grid

The code evaluates the field on a radial grid read from an HDF5 file. The file has a dataset `r` with
the grid points and a dataset `ImportantIndexes` with three (1-based) indices: the start of the
region around the particle, the particle radius $r\_0$, and the end of the region around the particle.
`notebooks/ComputeRadialGrid.nb` builds a suitable grid and writes it to
`input/radial_grid_r<r0>.h5`. The grid has 500 points uniform in tortoise coordinate between $r = 2M + 10^{-5}M$
and $2.5M$. From there it has a spacing of $0.01M$ out to $r\_0 + \Delta r\_0$, where $\Delta r\_0 = 2M$
($4M$ for $r\_0 > 20M$). The spacing then grows to $0.1M$, $0.5M$ and $4M$ out to $r = 100M$, $1000M$
and $10^4 M$ respectively. The same
construction is in the script `notebooks/ComputeRadialGrid.wl`, which expects `r0` and `gridFile` to be
set before it is loaded:

```bash
wolframscript -code 'r0 = 8.1; gridFile = "input/radial_grid_r8.1.h5"; Get["notebooks/ComputeRadialGrid.wl"]'
```

### 2. Run the code

```bash
mpirun -n <numprocs> ./h1Lorenz <r0> <lmax> <gridfile> <outdir>
```

- `r0`: the orbital radius, in Schwarzschild coordinates.
- `lmax`: the maximum $\ell$ to compute.
- `gridfile`: the grid file from step 1.
- `outdir`: the output directory.

Use at least two processes, because one process hands out work to the others. The README notes that
runs with more than two processes have not been tested recently. For example, to compute all modes
up to $\ell = 15$ for $r\_0 = 8.1M$:

```bash
mpirun -n 2 ./h1Lorenz 8.1 15 input/radial_grid_r8.1.h5 data/fields_r8.1
```

**Known limitation:** the even-$\ell$, $m = 0$ modes are generally not computed accurately, or at all,
because the homogeneous solutions must be integrated over long regions. Replace them with the results
of another calculation.

### Output

Each $(\ell, m)$ mode with $m \ge 0$ is written to `<outdir>/h1-l<l>m<m>.h5`, which contains:

| Dataset | Contents |
|---------|----------|
| `grid` | The radial grid, with attributes `raindex`, `r0index` and `rbindex` |
| `inhom_left` | The field for $r \le r\_0$ |
| `inhom_right` | The field for $r \ge r\_0$, using right-hand derivatives at the particle |
| `C_inf`, `C_horiz` | Complex asymptotic amplitudes at infinity and on the horizon, stored as real and imaginary parts |

In `inhom_left` and `inhom_right`, each row is a grid point. Each field component has four columns:
the real and imaginary parts of $\bar h^{(i)\ell m}$ and of its first radial derivative. The components
appear in the order $\\{1,3,5,6,7,2,4\\}$ for even $\ell+m$ with $\ell \ge 2$, and $\\{9,10,8\\}$ for odd
$\ell+m$ with $\ell \ge 2$. The low multipoles use $\\{1,3,6,2\\}$ ($\ell=0$), $\\{1,3,5,6,2,4\\}$
($\ell = m = 1$) and $\\{9,8\\}$ ($\ell = 1$, $m = 0$). The odd dipole includes a pure-gauge piece that
makes it regular at the horizon while keeping the correct angular momentum.

## Examples

`notebooks/Loadh1LorenzData.nb` defines `Loadh1Data[r0, l, m]`, which reads a mode file into
[SimulationTools](https://simulationtools.org/) DataTables `h1[r0][i, l, m]` and `drh1[r0][i, l, m]`,
together with the asymptotic amplitudes `CInfinity[r0][i, l, m]` and `CH[r0][i, l, m]`. Its
example run loads and plots the $\ell = 2$ modes for $r\_0 = 6M$:

```mathematica
Loadh1Data[6, 2, 2]
Loadh1Data[6, 2, 1]

ListLogLinearPlot[ReIm[Shifted[Slab[h1[6][7, 2, 2], 2 ;; 200], -2]], Joined -> True, PlotRange -> All]
```

It then checks the result against the [Teukolsky]({{ '/modules/teukolsky/' | relative_url }}) package.
It computes the $\ell = 2$ energy flux at infinity from the asymptotic amplitudes, using Eq. (75) of
[arXiv:1012.5860](https://arxiv.org/abs/1012.5860), and compares it with `TeukolskyPointParticleMode`.

### Related papers

- Lorenz-gauge decomposition into tensor spherical harmonics:
  [arXiv:gr-qc/0510019](https://arxiv.org/abs/gr-qc/0510019)
- Lorenz-gauge circular orbits in the frequency domain:
  [arXiv:1012.5860](https://arxiv.org/abs/1012.5860)
- Lorenz-gauge eccentric orbits in the frequency domain:
  [arXiv:1308.5223](https://arxiv.org/abs/1308.5223), [arXiv:1409.4419](https://arxiv.org/abs/1409.4419)
- Lorenz-gauge circular orbits in the time domain:
  [arXiv:gr-qc/0701069](https://arxiv.org/abs/gr-qc/0701069)
- Lorenz-gauge eccentric orbits in the time domain:
  [arXiv:1002.2386](https://arxiv.org/abs/1002.2386)

## Authors and contributors

Niels Warburton, Sarp Akcay
