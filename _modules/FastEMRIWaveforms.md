---
name: FastEMRIWaveforms
requirements: Python 3.9+
citation:
  - text: "Rapid generation of fully relativistic extreme-mass-ratio-inspiral waveform templates for LISA data analysis"
    doi: "10.1103/PhysRevLett.126.051102"
    arxiv: "2008.06071"
    inspire: "1811778"
    bibtex: |
      @article{Chua:2020stf,
          author = "Chua, Alvin J. K. and Katz, Michael L. and Warburton, Niels and Hughes, Scott A.",
          title = "{Rapid generation of fully relativistic extreme-mass-ratio-inspiral waveform templates for LISA data analysis}",
          eprint = "2008.06071",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          doi = "10.1103/PhysRevLett.126.051102",
          journal = "Phys. Rev. Lett.",
          volume = "126",
          number = "5",
          pages = "051102",
          year = "2021"
      }
  - text: "FastEMRIWaveforms: New tools for millihertz gravitational-wave data analysis"
    doi: "10.1103/PhysRevD.104.064047"
    arxiv: "2104.04582"
    inspire: "1857835"
    bibtex: |
      @article{Katz:2021yft,
          author = "Katz, Michael L. and Chua, Alvin J. K. and Speri, Lorenzo and Warburton, Niels and Hughes, Scott A.",
          title = "{Fast extreme-mass-ratio-inspiral waveforms: New tools for millihertz gravitational-wave data analysis}",
          eprint = "2104.04582",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          doi = "10.1103/PhysRevD.104.064047",
          journal = "Phys. Rev. D",
          volume = "104",
          number = "6",
          pages = "064047",
          year = "2021"
      }
  - text: "Fast and Fourier: Extreme Mass Ratio Inspiral Waveforms in the Frequency Domain"
    doi: "10.3389/fams.2023.1266739"
    arxiv: "2307.12585"
    inspire: "2679864"
    bibtex: |
      @article{Speri:2023jte,
          author = "Speri, Lorenzo and Katz, Michael L. and Chua, Alvin J. K. and Hughes, Scott A. and Warburton, Niels and Thompson, Jonathan E. and Chapman-Bird, Christian E. A. and Gair, Jonathan R.",
          title = "{Fast and Fourier: Extreme Mass Ratio Inspiral Waveforms in the Frequency Domain}",
          eprint = "2307.12585",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          doi = "10.3389/fams.2023.1266739",
          month = "7",
          year = "2023"
      }
  - text: "The Fast and the Frame-Dragging: Efficient waveforms for asymmetric-mass eccentric equatorial inspirals into rapidly-spinning black holes"
    doi: "10.1103/scbp-75pf"
    arxiv: "2506.09470"
    inspire: "2933397"
    bibtex: |
      @article{Chapman-Bird:2025xtd,
          author = "Chapman-Bird, Christian E. A. and others",
          title = "{Efficient waveforms for asymmetric-mass eccentric equatorial inspirals into rapidly spinning black holes}",
          eprint = "2506.09470",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          doi = "10.1103/scbp-75pf",
          journal = "Phys. Rev. D",
          volume = "112",
          number = "10",
          pages = "104023",
          year = "2025"
      }
---

## Overview

FastEMRIWaveforms (FEW) generates fully relativistic extreme mass-ratio inspiral
(EMRI) waveforms quickly enough for LISA data analysis — seconds on a CPU, and
faster still on a GPU. The framework is modular: a trajectory module evolves the
inspiral, an amplitude module supplies the mode amplitudes, and a summation
module assembles the waveform. Modules can be swapped to trade accuracy against
speed.

The [Kerr eccentric equatorial](https://bhptoolkit.org/FastEMRIWaveforms/user/main.html#fast-kerr-eccentric-equatorial-flux-based-waveform)
produces waveforms that faithfully match (slow to generate) reference waveforms
with a worst case overlap of $∼10^{−5}$ for inspirals with initial eccentricity $e_0 \le 0.85$.
The figure below shows an example of the waveform produced by the model.

![Kerr eccentric equatorial waveform](../../assets/img/FEW2_waveform.png)


## Installation

The CPU build installs from PyPI:

```bash
pip install fastemriwaveforms
```

GPU acceleration requires a build matched to your CUDA toolkit; see the
[full documentation](https://bhptoolkit.org/FastEMRIWaveforms) for the
right package and the supported model names.

## Usage

Generate a waveform from a high-level model. Parameter names and conventions
are detailed in the [FEW documentation](https://bhptoolkit.org/FastEMRIWaveforms):

```python
from few.waveform import GenerateEMRIWaveform

wave = GenerateEMRIWaveform("KerrEccEqFlux")

h = wave(
    M=1e6,      # primary mass (solar masses)
    mu=1e1,     # secondary mass (solar masses)
    a=0.5,      # primary spin
    p0=12.0,    # initial semi-latus rectum
    e0=0.3,     # initial eccentricity
    x0=1.0,     # cosine of the inclination
    dist=1.0,   # luminosity distance (Gpc)
    dt=10.0,    # time step (s)
    T=1.0,      # observation time (years)
)
```

`h` is the complex strain time series; take its real and imaginary parts for the
two polarisations.

## Examples

The [documentation](https://bhptoolkit.org/FastEMRIWaveforms) includes tutorial notebooks
covering trajectory generation, individual modules, and GPU usage.

## Authors and contributors
For a full list of people who have contributed to the development of FEW see the [CONTRIBUTORS.md](https://github.com/BlackHolePerturbationToolkit/FastEMRIWaveforms/blob/master/CONTRIBUTORS.md) file in the repository.
