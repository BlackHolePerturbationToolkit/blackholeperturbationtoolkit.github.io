---
name: "Fast Self-Forced Inspirals"
requirements: GSL, FFTW, libconfig, SCons
citation:
  - text: "Fast Self-forced Inspirals"
    doi: "10.1088/1361-6382/aac8ce"
    arxiv: "1802.05281"
    inspire: "1655172"
    bibtex: |
      @article{VanDeMeent:2018cgn,
          author = "Van De Meent, Maarten and Warburton, Niels",
          title = "{Fast Self-forced Inspirals}",
          eprint = "1802.05281",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          doi = "10.1088/1361-6382/aac8ce",
          journal = "Class. Quant. Grav.",
          volume = "35",
          number = "14",
          pages = "144003",
          year = "2018"
      }
---

## Overview

Fast Self-Forced Inspirals is a C++ code that rapidly computes inspiral trajectories, and
the associated waveforms, for eccentric small-mass-ratio inspirals into a Schwarzschild
black hole. The inspirals include the local (first-order) gravitational self-force.

The speed comes from integrating the near-identity transformed (NIT) equations of motion.
A near-identity transformation removes the dependence on the orbital phases from the
self-forced equations of motion, so they can be integrated with large time steps while
retaining the secular and oscillatory self-force effects. A NIT inspiral is computed in
milliseconds, whereas integrating the full self-forced equations of motion takes seconds
to hours depending on the mass ratio. The method is described in
[van de Meent & Warburton (2018)](https://arxiv.org/abs/1802.05281).

![NIT phase space inspiral]({{ '/assets/img/modules/fast-self-forced-inspirals/phase_space_inspiral.png' | relative_url }})

## Status

The NIT inspiral model is built on the self-force model of
[N. Warburton et al.](https://arxiv.org/abs/1111.6908). As a result it is only valid for
Schwarzschild inspirals with initial parameters $0 \le e < 0.2$ and $6 + 2e < p < 12$.
Extensions using the self-force model of [T. Osburn et al.](https://arxiv.org/abs/1511.01498),
and to generic inspirals in Kerr spacetime, were planned but are not part of the current
code.

## Installation

The code depends on:

- the [GNU Scientific Library (GSL)](https://www.gnu.org/software/gsl/)
- [FFTW](http://www.fftw.org/)
- [libconfig](https://hyperrealm.github.io/libconfig/) (the C++ library, `libconfig++`)
- [SCons](https://scons.org/) for building
- a C++14 compiler (the build uses `g++`)

Clone the repository and build with `scons` in the top-level directory:

```bash
git clone https://github.com/BlackHolePerturbationToolkit/Fast_Self-Forced_Inspirals.git
cd Fast_Self-Forced_Inspirals
scons
```

This creates the executable `NIT_inspiral` in the top-level directory. If your libraries
are in non-standard locations, edit `src/SConscript`.

## Usage

Run `./NIT_inspiral` from the top-level directory: it reads `config/parameters.cfg` and the
self-force model in `GSF_model_data/`, and writes to `data/` and `output/`. Running it
without arguments prints the list of options.

Before computing any NIT inspiral, compute the averaged forcing functions. This is a
one-off, two-step process:

```bash
./NIT_inspiral -d    # decompose the self-force into Fourier modes
./NIT_inspiral -c    # compute the averaged forcing functions from the Fourier coefficients
```

Then compute an inspiral from initial semi-latus rectum `p0`, eccentricity `e0` and (small)
mass ratio `q`. It runs from the initial parameters until the onset of plunge near the
separatrix:

```bash
./NIT_inspiral -n p0 e0 q    # NIT inspiral (milliseconds)
./NIT_inspiral -f p0 e0 q    # full self-forced inspiral (seconds to hours, depending on q)
```

To compute the waveform for an inspiral, first compute the inspiral itself with one of the
commands above, then run

```bash
./NIT_inspiral -w p0 e0 q -n    # waveform for the NIT inspiral
./NIT_inspiral -w p0 e0 q -f    # waveform for the full self-forced inspiral
```

The waveform settings are read from `config/parameters.cfg`:

| Setting | Meaning |
|---|---|
| `M_solar` | mass of the primary in solar masses |
| `Deltat_sec` | waveform sampling time step in seconds |
| `i_max` | number of time steps in the waveform |
| `Dense_output` | `1` to output the trajectory at regular intervals in the orbital phase $\chi$; `0` to output at every step of the adaptive integrator |
| `n_per_orbit` | with dense output, the number of outputs per $2\pi$ of $\chi$ |

## Data format

All output is plain text in `output/`, with the run parameters in the file name, e.g.
`output/Inspiral_NIT_p<p0>_e<e0>_q<q>.dat` and `output/Waveform_NIT_p<p0>_e<e0>_q<q>.dat`
(`Full` in place of `NIT` for full inspirals).

- **Inspiral files** contain columns `chi p e xi t phi` for NIT inspirals, or
  `chi p e chi0 t phi` for full inspirals. Here `chi` is the orbital phase variable used to parametrise the inspiral, `p` and `e` are
  the semi-latus rectum and eccentricity, and `t` and `phi` are the time and azimuthal angle.
- **Waveform files** contain columns `t h+ h×`, with `t` in seconds.

## Examples

Compute a NIT inspiral and its waveform for $p_0 = 10$, $e_0 = 0.1$ and $q = 10^{-5}$:

```bash
./NIT_inspiral -d
./NIT_inspiral -c
./NIT_inspiral -n 10 0.1 1e-5
./NIT_inspiral -w 10 0.1 1e-5 -n
```

## License

The code is licensed under the [GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html). See the
[LICENSE file](https://github.com/BlackHolePerturbationToolkit/Fast_Self-Forced_Inspirals/blob/master/LICENSE.md)
for details.

## Authors and contributors

**Niels Warburton**, Maarten van de Meent
