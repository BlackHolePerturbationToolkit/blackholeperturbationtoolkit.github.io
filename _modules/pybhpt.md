---
name: "pybhpt"
requirements: Python 3.12+
citation:
  - text: "pybhpt (software), Zenodo"
    doi: "10.5281/zenodo.18317623"
    bibtex: |
      @software{Nasipak_pybhpt_2026,
          author = {Nasipak, Zachary},
          license = {GPL-3.0},
          month = sep,
          title = {{pybhpt}},
          url = {https://github.com/znasipak/pybhpt},
          doi = {10.5281/zenodo.18317623},
          version = {v1.0.0},
          year = {2026}
      }
  - text: "For gravitational calculations:<br> Z. Nasipak, Metric reconstruction and the Hamiltonian for eccentric, precessing binaries in the small-mass-ratio limit, Phys. Rev. D 113, 124051 (2026)"
    doi: "10.1103/7zkx-vbg9"
    arxiv: "2507.07746"
    inspire: "2944608"
    bibtex: |
      @article{Nasipak:2025tby,
          author = "Nasipak, Zachary",
          title = "{Metric reconstruction and the Hamiltonian for eccentric, precessing binaries in the small-mass-ratio limit}",
          eprint = "2507.07746",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          doi = "10.1103/7zkx-vbg9",
          journal = "Phys. Rev. D",
          volume = "113",
          number = "12",
          pages = "124051",
          year = "2026"
      }
  - text: "For scalar calculations (alternatively to the above):<br> Z. Nasipak, Adiabatic evolution due to the conservative scalar self-force during orbital resonances, Phys. Rev. D 106, 064042 (2022)"
    doi: "10.1103/PhysRevD.106.064042"
    arxiv: "2207.02224"
    inspire: "2106534"
    bibtex: |
      @article{Nasipak:2022xjh,
          author = "Nasipak, Zachary",
          title = "{Adiabatic evolution due to the conservative scalar self-force during orbital resonances}",
          eprint = "2207.02224",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          doi = "10.1103/PhysRevD.106.064042",
          journal = "Phys. Rev. D",
          volume = "106",
          number = "6",
          pages = "064042",
          year = "2022"
      }
---

## Overview

`pybhpt` is a set of numerical tools for perturbations of Kerr spacetime, focused on the
self-forces and metric perturbations experienced by small bodies moving in a Kerr background.
It is written in C++ with a Cython/Python interface and is organized into subpackages:

| Subpackage | Purpose |
|---|---|
| `pybhpt.geo` | bound, periodic, timelike geodesics in Kerr spacetime |
| `pybhpt.radial` | homogeneous solutions of the radial Teukolsky equation |
| `pybhpt.swsh` | spin-weighted spheroidal harmonics and their eigenvalues |
| `pybhpt.teuk` | inhomogeneous solutions (Teukolsky amplitudes) of the radial Teukolsky equation for a point particle on a bound Kerr geodesic |
| `pybhpt.flux` | gravitational-wave fluxes of energy, angular momentum and Carter constant from a point particle on a generic bound Kerr geodesic |
| `pybhpt.hertz` | Hertz potentials for the CCK and AAB metric reconstruction procedures |
| `pybhpt.metric` | coefficients for reconstructing the metric perturbation from the Hertz potentials |
| `pybhpt.redshift` | the generalized Detweiler redshift invariant in a range of gauges |

Related Toolkit packages include [Teukolsky]({{ '/modules/teukolsky/' | relative_url }}),
[SpinWeightedSpheroidalHarmonics]({{ '/modules/spinweightedspheroidalharmonics/' | relative_url }})
and [KerrGeodesics]({{ '/modules/kerrgeodesics/' | relative_url }}) in Mathematica, and
[KerrGeoPy]({{ '/modules/kerrgeopy/' | relative_url }}) in Python.

## Installation

Tagged releases are published on [PyPI](https://pypi.org/project/pybhpt) as wheels for
macOS and 64-bit Linux:

```bash
python3 -m pip install pybhpt
```

To build from source you need a C/C++ compiler, GSL, Boost, Cython, numpy and scipy. The
developers recommend a conda environment:

```bash
git clone https://github.com/znasipak/pybhpt.git
cd pybhpt
conda env create -f environment.yml
conda activate pybhpt-env
git submodule update --init --recursive extern/boost
cd extern/boost && chmod +x bootstrap.sh && ./bootstrap.sh && ./b2 headers && cd ../..
pip install .
```

Run `pytest .` to check the installation. The
[installation guide](https://pybhpt.readthedocs.io/en/latest/installation.html) covers
optional dependencies, Jupyter kernels and compiler troubleshooting.

## Usage

This example, adapted from the quick tutorial in the documentation, builds a background
geodesic, solves for a single Teukolsky mode of $\psi_4$, and computes that mode's
contribution to the fluxes:

```python
from pybhpt.geo import KerrGeodesic
from pybhpt.teuk import TeukolskyMode
from pybhpt.flux import FluxMode

# Background geodesic: spin a, semi-latus rectum p, eccentricity e,
# cosine of inclination x, number of samples
a, p, e, x, nsamples = (0.9, 8., 0.2, 0.9, 2**9)
geo = KerrGeodesic(a, p, e, x, nsamples)

# Teukolsky mode (s, j, m, k, n) sourced by the point particle
s, j, m, k, n = (-2, 2, 2, 1, 3)
teuk = TeukolskyMode(s, j, m, k, n, geo)
teuk.solve(geo)

# Flux contributions from this mode, ordered (E, Lz, Q)
fluxes = FluxMode(geo, teuk)
print(fluxes.infinityfluxes)
print(fluxes.horizonfluxes)
print(fluxes.totalfluxes)
```

The `KerrGeodesic` object exposes the orbital constants (`geo.orbitalenergy`,
`geo.orbitalangularmomentum`, `geo.carterconstant`), the Mino-time frequencies
(`geo.minofrequencies`) and the Boyer–Lindquist frequencies (`geo.frequencies`). Calling
`geo(la)` evaluates $x^\mu_p(\lambda) = (t_p, r_p, \theta_p, \phi_p)$ at Mino time $\lambda$.

### Homogeneous radial solutions and spheroidal harmonics

```python
import numpy as np
from pybhpt.radial import RadialTeukolsky
from pybhpt.swsh import SpinWeightedSpheroidalHarmonic, swsh_eigenvalue

s, j, m, a, omega = -2, 12, 3, 0.99, 2.2
r_hor = 1 + np.sqrt(1 - a**2)
r_grid = np.linspace(r_hor + 2, 100, 3000)
Rt = RadialTeukolsky(s, j, m, a, omega, r_grid)
Rt.solve()
Rin = Rt.radialsolutions('In')
Rup = Rt.radialsolutions('Up')

swsh_eigenvalue(-2, 2, 2, 2.4)
S = SpinWeightedSpheroidalHarmonic(-1, 4, 1, 0.43)
S(np.linspace(0, np.pi, 100))
```

### Metric reconstruction

From a solved `TeukolskyMode`, `pybhpt.hertz.HertzMode` builds the Hertz potential in any
of the gauges listed in `pybhpt.hertz.available_gauges` (`'IRG'`, `'ORG'`, `'SRG0'`,
`'SRG4'`, `'ARG0'`, `'ARG4'`). `pybhpt.metric.MetricCoefficients` then gives the
coefficients for reconstructing the metric perturbation:

```python
from pybhpt.hertz import HertzMode

phi = HertzMode(teuk, "ORG")
phi.solve()
```

## Examples

The [pybhpt documentation](https://pybhpt.readthedocs.io/en/latest/) has user-guide
notebooks on geodesics, radial Teukolsky solutions, spin-weighted spheroidal harmonics,
Teukolsky amplitudes, fluxes, snapshot waveforms and metric reconstruction. It also has
background notes, performance benchmarks and the full API reference. The notebooks are in
the [`docs/notebooks`](https://github.com/znasipak/pybhpt/tree/main/docs/notebooks)
folder of the repository.

The theory and numerical methods behind the code are described in
[arXiv:2507.07746](https://arxiv.org/abs/2507.07746),
[arXiv:2310.19706](https://arxiv.org/abs/2310.19706) and
[arXiv:2207.02224](https://arxiv.org/abs/2207.02224).

## Authors and contributors

Zachary Nasipak (author), with contributions from Christian Chapman-Bird.
