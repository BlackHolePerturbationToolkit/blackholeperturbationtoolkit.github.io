---
name: "Gremlin"
requirements: GSL 2.5+, GMP, FFTW, HDF5
citation:
  - text: "S. A. Hughes, computer code GremlinEq, available from the Black Hole Perturbation Toolkit (bhptoolkit.org)"
---

## Overview

Gremlin is a toolkit for studying solutions to the Teukolsky equation with a point-particle
source on a bound, timelike orbit of a Kerr black hole. GremlinEq is a version of Gremlin
that specialises the source to **circular, equatorial orbits**. It computes the Teukolsky
amplitudes at infinity and on the horizon, the radiated fluxes of energy and angular
momentum, the resulting adiabatic inspiral, and the gravitational waveform.

The full Gremlin package will be released publicly via the Black Hole Perturbation Toolkit
once certain proprietary libraries used in its development have been cleaned up and
replaced with open-source resources. GremlinEq has been so cleaned, and is provided as an
initial release.

At heart, GremlinEq is a set of C++ libraries; the executables are thin wrappers around
them. The key classes are:

| Class | Purpose |
|---|---|
| `SWSH` | Spin-weighted spheroidal harmonics (with `Clebsch` for Clebsch–Gordan coefficients) |
| `FT` | Homogeneous solutions of the Teukolsky equation, following Fujita and Tagoshi (MST method) |
| `CEKG` | Circular, equatorial Kerr geodesics |
| `CEKR` | Radiation from circular, equatorial Kerr geodesics |
| `CETD` | Circular, equatorial Teukolsky driver: solves many modes and orbits, and writes the HDF5 data files |
| `CEDR` | Circular, equatorial data reader for the HDF5 output |
| `CEID` | Circular, equatorial inspiral data: interpolates output from many orbits to study inspirals and waveforms |
| `Kerr`, `GKG`, `RRGW`, `TidalH`, `Tensors` | Kerr orbit utilities, generic Kerr geodesics, radiation reaction and waves, tidally distorted horizons, and multi-index array allocation |

Full class and source documentation, generated with Doxygen, is available in the
[reference documentation](https://bhptoolkit.org/GremlinEq/doc/). The repository also
includes a short manual, [doc/doc.pdf](https://github.com/BlackHolePerturbationToolkit/GremlinEq/blob/master/doc/doc.pdf).

## Installation

GremlinEq depends on:

- the [GNU Scientific Library (GSL)](https://www.gnu.org/software/gsl/), version 2.5 or later
- the [GNU Multiple Precision Arithmetic Library (GMP)](https://gmplib.org/)
- [FFTW](http://www.fftw.org/)
- [HDF5](https://www.hdfgroup.org/solutions/hdf5/)

and needs a C++ compiler (it has been tested with `g++`) and Make. On a Mac these libraries
are easily installed with [Homebrew](https://brew.sh/); on Linux, use your package manager.
On Windows, use the Windows Subsystem for Linux; see
[doc/Install-Windows.md](https://github.com/BlackHolePerturbationToolkit/GremlinEq/blob/master/doc/Install-Windows.md).

```bash
git clone https://github.com/BlackHolePerturbationToolkit/GremlinEq.git
cd GremlinEq
make
```

This builds the libraries in `lib/` and the executables in `bin/`. If your version of Make
does not define `CURDIR`, set `TOP` in the `Makefile` to the GremlinEq directory. If GMP and
HDF5 are not in `/usr/local/include` and `/usr/local/lib` (the Homebrew defaults), edit the
`INCLGMP`, `INCLHDF5`, `LIBGMP` and `LIBHDF5` variables in the `Makefile`.

`make` builds the core executables. The horizon-geometry executables (`TidalHEq`,
`TidalHSurf`, `EmbedEq`, `EmbedSurf`), which were written for a specific project, are built
separately with `make horizgeom`.

## Usage

Every executable takes command-line arguments; run it without arguments to print a short
description of them.

The main executable, `Circ_Eq`, solves the Teukolsky equation for a single $(\ell, m)$ mode
of a single circular, equatorial orbit:

```bash
# arguments: r  a  prograde(1)/retrograde(0)  l  m  output-basename
bin/Circ_Eq 10.0 0.9 1 2 2 orbit
```

This writes (or adds the mode to) the HDF5 file `orbit.h5`, and prints
`r Re(Z^inf) Im(Z^inf) Re(Z^H) Im(Z^H)` to standard output. Further modes of the same orbit
can be added to the same file by re-running with other values of `l` and `m`.

The HDF5 file has two groups: `params`, holding the orbital radius $r$, spin parameter $a$,
energy $E$, axial angular momentum $L_z$ and axial frequency $\Omega_\phi$; and `modes`,
holding for each $(\ell, m)$:

- the spheroidal eigenvalue $\lambda$
- the amplitudes $Z^\infty$ (to infinity) and $Z^{\rm H}$ (down the horizon)
- $R^{\rm in}$, $\partial_r R^{\rm in}$, $R^{\rm up}$ and $\partial_r R^{\rm up}$ at the orbit
- the fluxes $\dot E^\infty$, $\dot E^{\rm H}$, $\dot L_z^\infty$, $\dot L_z^{\rm H}$
- the rates of change of orbital radius $\dot r^\infty$ and $\dot r^{\rm H}$ due to each flux

Post-process the data with `Fluxes` and `GW`:

```bash
# total and per-mode fluxes (argument: the .h5 file name)
bin/Fluxes orbit.h5

# waveform; arguments: basename  cos(theta)  phi(degrees)  dt  Nsteps
bin/GW orbit 0.5 0.0 1.0 1000
```

`Fluxes` prints the total horizon and infinity energy fluxes, followed by one line per mode
with `l m Re(Z^inf) Im(Z^inf) Re(Z^H) Im(Z^H) Edot^H Edot^inf Lzdot^H Lzdot^inf`. `GW` writes
`orbit.wave` with columns `t h+ h× Re(psi4) Im(psi4) |psi4|`.

## Executables

| Executable | Purpose |
|---|---|
| `Circ_Eq` | Solve for a single $(\ell, m)$ mode of a single orbit |
| `Circ_Eq_Seq` | Solve for all $m$ up to some $\ell_{\max}$ over a range of radii |
| `Circ_Eq_Seq2` | Solve over a range of orbits evenly spaced in $v = (M\Omega_\phi)^{1/3}$, adding $\ell$ modes until the flux converges to a given tolerance |
| `Fluxes` | Fluxes of energy and angular momentum and the Teukolsky amplitudes for a single orbit |
| `GW` | Gravitational waveform from a single orbit |
| `Circ_Eq_TotFlux_r`, `Circ_Eq_TotFlux_v` | Total energy and angular momentum fluxes for data evenly spaced in $r$ (pairs with `Circ_Eq_Seq`) or in $v$ (pairs with `Circ_Eq_Seq2`) |
| `Circ_Eq_Traj` | Adiabatic inspiral trajectory from data evenly spaced in radius |
| `Circ_Eq_Wave` | As `Circ_Eq_Traj`, also producing the gravitational waveform |
| `Circ_Eq_Clm`, `Circ_Eq_Clm2` | As `Circ_Eq_Wave`, but output a single amplitude $C_{\ell m}$ (input evenly spaced in $r$ or in $v$, respectively) |
| `Circ_Eq_Ymode_v`, `Circ_Eq_Smode_v` | As `Circ_Eq_Clm2`, with output and fluxes decomposed into spin-weighted spherical or spheroidal harmonics |
| `Circ_Eq_lmode_v`, `Circ_Eq_mmode_v` | Distribution of the energy flux over $\ell$ or $m$ modes, for data evenly spaced in $v$ |
| `TidalHEq`, `TidalHSurf` | Curvature of a horizon distorted by an orbiting companion (equatorial plane / whole surface) |
| `EmbedEq`, `EmbedSurf` | Embedding geometry of a horizon distorted by an orbiting companion (equatorial plane / whole surface) |

Several of these were written for particular projects; for example, the `TidalH` and `Embed`
executables were used in [O'Sullivan & Hughes (2014)](https://arxiv.org/abs/1407.6983) and
[O'Sullivan & Hughes (2016)](https://arxiv.org/abs/1505.03809).

## Examples

A typical workflow for an adiabatic inspiral is to compute a sequence of orbits over a range
of radii with `Circ_Eq_Seq`, then post-process the resulting data with `Circ_Eq_TotFlux_r`,
`Circ_Eq_Traj` or `Circ_Eq_Wave`:

```bash
# arguments: r_start  r_stop  a  prograde(1)/retrograde(0)  lmax  dr  output-basename
# (r_start must be larger than r_stop)
bin/Circ_Eq_Seq 20.0 3.0 0.9 1 10 0.1 seq

# total fluxes for the sequence; arguments: basename  rmin  rmax  dr
bin/Circ_Eq_TotFlux_r seq 3.0 20.0 0.1
```

`Circ_Eq_Seq` writes one HDF5 file per orbit (`seq_r20.0.h5`, `seq_r19.9.h5`, ...).
`Circ_Eq_TotFlux_r` reads them back and writes `seq.flux`, with columns
`r Omega Omega^(1/3) Edot^H Edot^inf Lzdot^H Lzdot^inf`. Run any of the post-processing
executables without arguments to see their inputs. See the
[reference documentation](https://bhptoolkit.org/GremlinEq/doc/) for details of the
underlying classes.

## Authors and contributors

**Scott Hughes**, Halston Lim, Niels Warburton
