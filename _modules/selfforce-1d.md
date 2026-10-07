---
name: "SelfForce-1D"
requirements: gfortran 7.3+ or ifort 17+, BLAS/LAPACK, GSL
citation:
  - text: "A variant of SelfForce-1D was used for the time-domain results in: Accelerated motion and the self-force in Schwarzschild spacetime"
    doi: "10.1088/1361-6382/aad420"
    arxiv: "1712.01098"
    inspire: "1640629"
    bibtex: |
      @article{Heffernan:2017cad,
          author = "Heffernan, Anna and Ottewill, Adrian C. and Warburton, Niels and Wardell, Barry and Diener, Peter",
          title = "{Accelerated motion and the self-force in Schwarzschild spacetime}",
          eprint = "1712.01098",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          doi = "10.1088/1361-6382/aad420",
          journal = "Class. Quant. Grav.",
          volume = "35",
          number = "19",
          pages = "194001",
          year = "2018"
      }
---

## Overview

SelfForce-1D is a code infrastructure for simulating extreme mass ratio inspirals (EMRIs)
using the effective-source approach to the self-force problem. Currently, a scalar charge in
a Schwarzschild spacetime is the main system implemented; the hope is that more systems will
be added. The code is a complete, much more modular rewrite of the earlier 1DScalarWaveDG
code, designed to make it easy to add other systems of equations.

The code solves the 1+1D (mode-decomposed) wave equation using discontinuous Galerkin (DG)
methods. It can solve the sourced wave equation using effective-source methods, where the
source is a scalar point charge moving on a circular or eccentric (geodesic or accelerated)
bound orbit. The self-force for each $\ell$-mode is extracted at the particle's location, and
the field is extracted at the horizon and at future null infinity ($\mathcal{I}^+$). The
evolution is parallelised over modes with OpenMP.

The current source tree also builds an executable, `rwz.x`, for Regge–Wheeler–Zerilli
perturbations of Schwarzschild, which is exercised by the regression tests.

## Installation

The code is written in modern object-oriented Fortran, so it will not work with older
compilers. It has been successfully compiled with gfortran 7.3.0 and ifort 17.0.7. It may also
work with somewhat older compilers, but that is untested.

Requirements:

- BLAS/LAPACK and the [GNU Scientific Library (GSL)](https://www.gnu.org/software/gsl/)
- a C++ compiler, for the bundled effective-source code (by Barry Wardell)
- `h5dump` from [HDF5](https://www.hdfgroup.org/solutions/hdf5/), used during the build to
  extract the Wigner D include files
- [SCons](https://scons.org/) version 3.1.0 or later. Earlier versions have a bug in
  dependency resolution for submodules and type-bound procedures. A local copy of SCons 3.1.1
  is included in the repository.

Clone the code from Bitbucket:

```bash
git clone https://bitbucket.org/peterdiener/selfforce-1d.git SelfForce-1D
cd SelfForce-1D
```

Edit the `SConstruct` file to match your compilers and libraries. Example files for the
Intel (`SConstruct.intel`) and GNU (`SConstruct.gnu`) compilers are provided, along with
`SConstruct.fedora`, which is used by the repository's `Dockerfile`. Then build:

```bash
scons
```

If a recent enough SCons is not available, use the bundled copy. To avoid cluttering the
source tree, extract it somewhere else, for example:

```bash
mkdir ~/SCons-local-3.1.1
cp SCons-local/scons-local-3.1.1.tar.gz ~/SCons-local-3.1.1
cd ~/SCons-local-3.1.1
tar xvzf scons-local-3.1.1.tar.gz
cd -
python ~/SCons-local-3.1.1/scons.py
```

During the first build you may see warnings about include directories that don't exist. You
can safely ignore them, as the directories are created during compilation. Because of an issue
with SCons, the **first build fails if it is run in parallel** (`scons -jN` with `N>1`).
Later builds can run in parallel, as long as the `Build` directory is not removed.

A successful build creates a `Build` directory holding the object and module files, and
`Build/Exe` holding the executables. `test.x` is the main executable (despite its name).
`accel_test.x` and `accel_history_test.x` are simpler test codes, and `rwz.x` is the
Regge–Wheeler–Zerilli driver.

## Usage

The code reads its parameters from a parameter file using Fortran namelist I/O. A parameter
file starts with `&params` and ends with `/`, with variable assignments in between. Everything
after a `!` is a comment. All valid parameters are defined in
`Src/Parameters/module_parameters.f90`. For example, `Par/scalargaussian_o8.par` evolves
Gaussian initial data for a scalar field in Schwarzschild until $t = 1000M$:

```fortran
&params
equation_name = 'scalar_schwarzschild'
n_elems = 32
order = 8
Sminus = -20.0
r_center = 10.0
mass = 1.0
lmin = 0
lmax = 2
t_initial = 0.0
t_final = 1000.0
sigma = 1.0
amplitude = 1.0
out0d_every = 20
out1d_every = 38
use_field_observer = .true.
/
```

Run the code from a separate directory, preferably outside the `SelfForce-1D` tree, holding a
copy of the parameter file. Since parallelisation is over modes, set `OMP_NUM_THREADS` to at
most the number of evolved modes (4 in this example):

```bash
mkdir ~/runs/gaussian && cd ~/runs/gaussian
cp <path to SelfForce-1D>/Par/scalargaussian_o8.par .
export OMP_NUM_THREADS=4
<path to SelfForce-1D>/Build/Exe/test.x scalargaussian_o8.par
```

## Examples

### Evolution of Gaussian initial data

The run above extracts the scalar field at the horizon and at $\mathcal{I}^+$ as a function of
coordinate time, in files `psi.[123].extract.asc`. To look at the late-time tails, copy
`Par/plot_tails_ScalarGaussianOrder8.gp` into the run directory and, in `gnuplot`, run

```
load 'plot_tails_ScalarGaussianOrder8.gp'
```

This shows log-log plots of the field for $\ell = 0, 1, 2$. You should see the expected
power-law tails: the field decays as $t^{-(2\ell+3)}$ at the horizon and as $t^{-(\ell+2)}$ at
$\mathcal{I}^+$. The expected decay is seen in all cases except $\ell = 2$ at the horizon,
where roundoff error is reached before the tail sets in. A second script,
`Par/plot_qnm_ScalarGaussianOrder8.gp`, plots the early part of the waveform at the horizon
together with the expected quasinormal-mode ringing, using
[Emanuele Berti's ringdown data](https://pages.jh.edu/~eberti2/ringdown/). For $\ell = 1$ and
$\ell = 2$ the agreement is excellent once the initial transient has died away.

### A particle on an eccentric geodesic

`Par/scalar_p7.2_e0.5_o8.par` sets up a scalar charge on an eccentric geodesic with
semi-latus rectum $p = 7.2$ and eccentricity $e = 0.5$, and evolves all modes from
$\ell = 0$ to $\ell = 10$. It uses a world-tube and the osculating-orbit description. Because
the orbit is not circular, a time-dependent coordinate transformation is used in a region of
10 DG elements either side of the particle. The effective source is turned on smoothly but
quickly (on a timescale of $0.1M$), starting from zero initial data. Run it as before:

```bash
<path to SelfForce-1D>/Build/Exe/test.x scalar_p7.2_e0.5_o8.par
```

Then plot the radial component of the self-force at the particle with
`load 'plot_sf_ScalarP7.2E0.5_Order8.gp'` (from `Par/`) in gnuplot. After an initial transient,
the self-force becomes periodic with the radial period of the orbit, and for $\ell > 4$ the
mode amplitudes decrease with $\ell$, as expected for a convergent mode sum.

### Initial data

Starting from zero initial data with a smooth turn-on of the effective source generates
transients, which must propagate away before the self-force can be extracted accurately. Due
to the slow decay of the tails for low $\ell$, this can take a long evolution. If initial
data consistent with the orbit are available, the evolution can instead start with the
effective source at full strength and the correct self-force from the beginning. The
`InitialData` directory contains a Python code by Niels Warburton that computes initial data
for the full retarded field in the frequency domain, for geodesic and accelerated eccentric
orbits, at any given set of coordinates. Copy `InitialData` outside the source tree before
using it.

1. **Get the coordinates.** Run the evolution code with `output_coords_for_exact = .true.`
   and `t_final = 0.0` to write the grid coordinates to `coords.asc`. Examples are
   `Par/scalar_p8.0_e0.1_o<n>.par` for $p = 8$, $e = 0.1$ and DG order `n` = 8, 16, 32.
2. **Compute the initial data.** Copy `coords.asc` to
   `InitialData/data/input/coords_p<p>_e<e>_n<n>_accel.dat`, then, in the `InitialData`
   directory, run

   ```bash
   # usage: python SSF_init.py p e kappa n lmin lmax
   python SSF_init.py 8 0.1 1.0 8 0 2
   ```

   Here `kappa` sets how accelerated the orbit is (`kappa = 1` is a geodesic), `n` is the
   DG order, and `lmin`, `lmax` are the range of $\ell$ to compute. Note the value printed
   after `phi value at chi=pi:`. This is the initial azimuthal angle to use in the evolution.
   The initial data are written to
   `InitialData/data/output/SSF_init_data_p<p>_e<e>_n<n>_l<l>m<m>.dat`.
3. **Evolve.** In the parameter file from step 1, set `t_final`, change
   `turn_on_source_smoothly` to `.false.`, and set `use_exact_initial_data = .true.`,
   `exact_initial_data_lmax` (modes above it are still turned on smoothly), `input_directory`
   and `input_basename` (the file name without the `l<l>m<m>.dat` part). The files
   `Par/scalar_p8.0_e0.1_o<n>_evolve.par` are ready-made examples that read the example
   initial data shipped with the code.

### Tests

Regression and portability tests are run from the main `SelfForce-1D` directory with

```bash
Src/Test/run_tests.py
```

The script reports passing and failing tests. New output in the `RunTests` directory can be
compared with the reference data in `Test`.

## Documentation

Documentation of the interfaces of all classes and type-bound procedures, generated with FORD,
is available at <https://www.cct.lsu.edu/~diener/SelfForce1D/Doc/index.html>. The
[README](https://bitbucket.org/peterdiener/selfforce-1d/src/master/README.md) in the
repository has further details on building and running the code.

## Authors and contributors

**Peter Diener**, Barry Wardell, Niels Warburton
