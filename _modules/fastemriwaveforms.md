---
name: FastEMRIWaveforms
requirements: Python 3.9+
citation:
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
---

## Overview

FastEMRIWaveforms (FEW) generates fully relativistic extreme mass-ratio inspiral
(EMRI) waveforms quickly enough for LISA data analysis — seconds on a CPU, and
faster still on a GPU. The framework is modular: a trajectory module evolves the
inspiral, an amplitude module supplies the mode amplitudes, and a summation
module assembles the waveform. Modules can be swapped to trade accuracy against
speed.

## Installation

The CPU build installs from PyPI:

```bash
pip install fastemriwaveforms
```

GPU acceleration requires a build matched to your CUDA toolkit; see the
[full documentation](https://bhptoolkit.org/FastEMRIWaveforms_main.html) for the
right package and the supported model names.

## Usage

Generate a waveform from a high-level model. Parameter names and conventions
follow the FEW documentation:

```python
from few.waveform import GenerateEMRIWaveform

wave = GenerateEMRIWaveform("FastSchwarzschildEccentricFlux")

h = wave(
    M=1e6,      # primary mass (solar masses)
    mu=1e1,     # secondary mass (solar masses)
    a=0.0,      # primary spin
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

The repository ships tutorial notebooks covering trajectory generation,
individual modules, and GPU usage. Start from the
[documentation](https://bhptoolkit.org/FastEMRIWaveforms_main.html).
