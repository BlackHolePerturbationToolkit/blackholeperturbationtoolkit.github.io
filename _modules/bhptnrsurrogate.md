---
name: "BHPTNRSurrogate"
requirements: Python 3.8+
citation:
  - text: "For BHPTNRSur1dq1e4: Surrogate model for gravitational wave signals from nonspinning, comparable- to large-mass-ratio black hole binaries built on black hole perturbation theory waveforms calibrated to numerical relativity"
    doi: "10.1103/PhysRevD.106.104025"
    arxiv: "2204.01972"
    inspire: "2063398"
    bibtex: |
      @article{Islam:2022laz,
          author = "Islam, Tousif and Field, Scott E. and Hughes, Scott A. and Khanna, Gaurav and Varma, Vijay and Giesler, Matthew and Scheel, Mark A. and Kidder, Lawrence E. and Pfeiffer, Harald P.",
          title = "{Surrogate model for gravitational wave signals from nonspinning, comparable-to large-mass-ratio black hole binaries built on black hole perturbation theory waveforms calibrated to numerical relativity}",
          eprint = "2204.01972",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          doi = "10.1103/PhysRevD.106.104025",
          journal = "Phys. Rev. D",
          volume = "106",
          number = "10",
          pages = "104025",
          year = "2022"
      }
  - text: "For BHPTNRSur2dq1e3: Gravitational wave surrogate model for spinning, intermediate mass ratio binaries based on perturbation theory and numerical relativity"
    doi: "10.1103/PhysRevD.110.124069"
    arxiv: "2407.18319"
    inspire: "2811291"
    bibtex: |
      @article{Rink:2024swg,
          author = "Rink, Katie and Bachhar, Ritesh and Islam, Tousif and Rifat, Nur E. M. and Gonzalez-Quesada, Kevin and Field, Scott E. and Khanna, Gaurav and Hughes, Scott A. and Varma, Vijay",
          title = "{Gravitational wave surrogate model for spinning, intermediate mass ratio binaries based on perturbation theory and numerical relativity}",
          eprint = "2407.18319",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          doi = "10.1103/PhysRevD.110.124069",
          journal = "Phys. Rev. D",
          volume = "110",
          number = "12",
          pages = "124069",
          year = "2024"
      }
  - text: "For either model (the original software infrastructure): Surrogate model for gravitational wave signals from comparable and large-mass-ratio black hole binaries"
    doi: "10.1103/PhysRevD.101.081502"
    arxiv: "1910.10473"
    inspire: "1760429"
    bibtex: |
      @article{Rifat:2019ltp,
          author = "Rifat, Nur E. M. and Field, Scott E. and Khanna, Gaurav and Varma, Vijay",
          title = "{Surrogate model for gravitational wave signals from comparable and large-mass-ratio black hole binaries}",
          eprint = "1910.10473",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          doi = "10.1103/PhysRevD.101.081502",
          journal = "Phys. Rev. D",
          volume = "101",
          number = "8",
          pages = "081502",
          year = "2020"
      }
---

## Overview

BHPTNRSurrogate is a Python package for evaluating a family of surrogate
gravitational waveform models. The models are trained on waveforms generated with
point-particle black hole perturbation theory (ppBHPT) and calibrated to numerical
relativity (NR) in the comparable-mass regime, so they cover mass ratios from
comparable to large (intermediate and extreme). Each waveform takes a fraction of a
second to evaluate and includes many harmonic modes.

![BHPTNR surrogate]({{ '/assets/img/modules/bhptnrsurrogate/BHPTK-EMRI.png' | relative_url }})

The package builds on the earlier
[EMRISurrogate]({{ '/modules/emrisurrogate/' | relative_url }}) package, which is no
longer actively maintained.

## Model details

The "raw" surrogate model is trained on ppBHPT waveform data and is defined by

$$
h_{\tt S}(t, \theta, \phi; q, \chi_1) = \sum^{\infty}_{\ell=2} \sum_{m=-\ell}^{\ell} h_{\tt S}^{\ell,m}(t; q, \chi_1) \, {}^{-2}Y_{\ell m}(\theta, \phi) \,,
$$

where ${}^{-2}Y\_{\ell m}$ are the spin-weight $-2$ spherical harmonics,
$q = m\_1/m\_2 \geq 1$ is the mass ratio, and $\chi\_1$ is the dimensionless spin of
the larger black hole. The surrogate provides fast evaluations of the modes
$h\_{\tt S}^{\ell,m}$ with $m > 0$; the $m < 0$ modes follow from
$h^{\ell,-m} = (-1)^{\ell} \left(h^{\ell,m}\right)^\*$.

By default, the package returns rescaled waveform modes,

$$
h^{\ell,m}_{\tt S, \alpha}(t ; q, \chi_1) = \alpha_{\ell} \, h^{\ell,m}_{\tt S}\left( t \beta; q, \chi_1 \right) \,,
$$

where the calibration parameters $\alpha\_{\ell}(q,\chi\_1)$ and $\beta(q,\chi\_1)$ are
tuned to NR simulations. Most users will want the NR-calibrated model. To generate
pure ppBHPT waveforms without any tuning to NR (i.e. $\alpha\_{\ell} = \beta = 1$),
pass `calibrated=False` to `generate_surrogate`.

### Available models

| Model | Parameters | Modes | Raw ppBHPT length |
|---|---|---|---|
| **BHPTNRSur1dq1e4** | Non-spinning; $2.5 \le q \le 10^4$ | 50 modes up to $\ell=10$ (listed below); modes up to $\ell=5$ are calibrated to NR | $\sim 30{,}500M$ |
| **BHPTNRSur2dq1e3** | Aligned spin on the larger black hole; $3 \le q \le 1000$, $-0.8 \le \chi\_1 \le 0.8$ | All modes up to $\ell=4$ except (4,1) and the $m=0$ modes, plus their $m<0$ counterparts | $\sim 13{,}500M$ |

The $m>0$ modes of BHPTNRSur1dq1e4 are (2,2), (2,1), (3,1), (3,2), (3,3), (4,2), (4,3),
(4,4), (5,3), (5,4), (5,5), (6,4), (6,5), (6,6), (7,5), (7,6), (7,7), (8,6), (8,7), (8,8),
(9,7), (9,8), (9,9), (10,8) and (10,9); together with their $m<0$ counterparts this makes
50 modes.

Details of BHPTNRSur1dq1e4 are in [Islam et al. (2022)](https://arxiv.org/abs/2204.01972)
and of BHPTNRSur2dq1e3 in [Rink et al. (2024)](https://arxiv.org/abs/2407.18319).
The predecessor model EMRISur1dq1e4 is not included in this package; it is still
available, but deprecated, in [EMRISurrogate]({{ '/modules/emrisurrogate/' | relative_url }}).

### Mass convention

Both models use the total mass $M$ by default (`mass_scale='M'`). For uncalibrated
waveforms the underlying ppBHPT data use the primary mass $m\_1$, so the package
rescales both time and strain by $q/(q+1)$ to return total-mass units. This default
changed in version 0.2.0. To reproduce the earlier behaviour, pass `mass_scale='m1'`.
That option is only available for uncalibrated geometric-unit waveforms; calibrated and
physical-unit waveforms require `mass_scale='M'`.

## Installation

Clone the repository (with its submodule) and install it locally:

```bash
git clone https://github.com/BlackHolePerturbationToolkit/BHPTNRSurrogate.git
cd BHPTNRSurrogate
git submodule init
git submodule update
pip install -e .
```

Runtime dependencies (numpy, scipy, h5py, gwtools and scikit-learn) are installed
automatically.

The surrogate data files (`BHPTNRSur1dq1e4.h5` and `BHPTNRSur2dq1e3.h5`) are hosted on
[Zenodo](https://zenodo.org/records/13340319). They are downloaded automatically into the
package's `data/` directory the first time you call a model. Alternatively, download them
yourself and place them in `BHPTNRSurrogate/data/`:

```bash
wget https://zenodo.org/records/13340319/BHPTNRSur1dq1e4.h5
wget https://zenodo.org/records/13340319/BHPTNRSur2dq1e3.h5
```

To use a custom data directory, set the `BHPTNR_SURROGATE_DATA_DIR` environment variable
before importing the package.

Parts of the tutorial notebooks also need [gwsurrogate](https://pypi.org/project/gwsurrogate/)
(`pip install gwsurrogate` or `conda install -c conda-forge gwsurrogate`). You don't need it
to evaluate the BHPTNRSurrogate models.

## Usage

Each model is a module with a `generate_surrogate` function. It returns the time array and
a dictionary of modes keyed by `(l, m)`. Run `help(bhptsur.generate_surrogate)` for the full
list of options.

```python
import numpy as np
from BHPTNRSurrogate.surrogates import BHPTNRSur1dq1e4 as bhptsur

# NR-calibrated modes in geometric units (t in M, h in rh/M)
t, h = bhptsur.generate_surrogate(q=20)
h22 = h[(2, 2)]

# raw (uncalibrated) ppBHPT waveform
t, h = bhptsur.generate_surrogate(q=20, calibrated=False)

# physical units: total mass in solar masses, distance in Mpc
t, h = bhptsur.generate_surrogate(q=100, M_tot=60, dist_mpc=100)

# evaluated at a point on the sphere, summing all modes up to l = 3
t, h = bhptsur.generate_surrogate(q=18, M_tot=60, dist_mpc=100,
                                  orb_phase=np.pi/3, inclination=np.pi/4,
                                  lmax=3, mode_sum=True)
```

The spinning model takes the primary spin as `spin1`:

```python
from BHPTNRSurrogate.surrogates import BHPTNRSur2dq1e3 as bhptsur

t, h = bhptsur.generate_surrogate(q=20, spin1=0.5)
```

Other useful options include `modes` (a list of `(l, m)` modes to return), `lmax`, and
`neg_modes` (whether to return the $m<0$ modes; default `True`). Calibrated and physical
waveforms are always in total-mass units; see [Mass convention](#mass-convention) above.

## Examples

The repository's `tutorials` directory has example notebooks for both models:

- [BHPTNRSur1dq1e4.ipynb](https://github.com/BlackHolePerturbationToolkit/BHPTNRSurrogate/blob/main/tutorials/BHPTNRSur1dq1e4.ipynb):
  calibrated and uncalibrated waveforms, physical units, evaluation on the sphere, mode
  selection and mode sums. It also reproduces comparisons against the NR surrogate
  NRHybSur3dq8 from the BHPTNRSur1dq1e4 paper (this part needs gwsurrogate).
- [BHPTNRSur2dq1e3.ipynb](https://github.com/BlackHolePerturbationToolkit/BHPTNRSurrogate/blob/main/tutorials/BHPTNRSur2dq1e3.ipynb):
  the same tour for the aligned-spin model.

## Known problems

Known bugs are recorded in the project
[issue tracker](https://github.com/BlackHolePerturbationToolkit/BHPTNRSurrogate/issues).

## License

BHPTNRSurrogate is distributed under the MIT License. See the
[LICENSE file](https://github.com/BlackHolePerturbationToolkit/BHPTNRSurrogate/blob/main/LICENSE)
for details.

## Authors and contributors

Ritesh Bachhar, Scott Field, Tousif Islam, Gaurav Khanna, Nur Rifat, Katie Rink, Vijay Varma
