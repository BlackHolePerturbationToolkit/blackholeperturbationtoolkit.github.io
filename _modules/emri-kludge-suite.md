---
name: "EMRI Kludge Suite"
requirements: GSL, FFTW
citation:
  - text: "A. J. K. Chua & J. R. Gair, Improved analytic extreme-mass-ratio inspiral model for scoping out eLISA data analysis, Class. Quantum Grav. 32, 232002 (2015)"
    doi: "10.1088/0264-9381/32/23/232002"
    arxiv: "1510.06245"
    inspire: "1399176"
    bibtex: |
      @article{Chua:2015mua,
          author = "Chua, Alvin J. K. and Gair, Jonathan R.",
          title = "{Improved analytic extreme-mass-ratio inspiral model for scoping out eLISA data analysis}",
          eprint = "1510.06245",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          doi = "10.1088/0264-9381/32/23/232002",
          journal = "Class. Quant. Grav.",
          volume = "32",
          pages = "232002",
          year = "2015"
      }
  - text: "A. J. K. Chua, C. J. Moore & J. R. Gair, Augmented kludge waveforms for detecting extreme-mass-ratio inspirals, Phys. Rev. D 96, 044005 (2017)"
    doi: "10.1103/PhysRevD.96.044005"
    arxiv: "1705.04259"
    inspire: "1599062"
    bibtex: |
      @article{Chua:2017ujo,
          author = "Chua, Alvin J. K. and Moore, Christopher J. and Gair, Jonathan R.",
          title = "{Augmented kludge waveforms for detecting extreme-mass-ratio inspirals}",
          eprint = "1705.04259",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          doi = "10.1103/PhysRevD.96.044005",
          journal = "Phys. Rev. D",
          volume = "96",
          number = "4",
          pages = "044005",
          year = "2017"
      }
  - text: "For the AK waveform:<br> L. Barack & C. Cutler, LISA capture sources: Approximate waveforms, signal-to-noise ratios, and parameter estimation accuracy, Phys. Rev. D 69, 082005 (2004)"
    doi: "10.1103/PhysRevD.69.082005"
    arxiv: "gr-qc/0310125"
    inspire: "631861"
    bibtex: |
      @article{Barack:2003fp,
          author = "Barack, Leor and Cutler, Curt",
          title = "{LISA capture sources: Approximate waveforms, signal-to-noise ratios, and parameter estimation accuracy}",
          eprint = "gr-qc/0310125",
          archivePrefix = "arXiv",
          doi = "10.1103/PhysRevD.69.082005",
          journal = "Phys. Rev. D",
          volume = "69",
          pages = "082005",
          year = "2004"
      }
  - text: "For the NK waveform:<br> S. Babak, H. Fang, J. R. Gair, K. Glampedakis & S. A. Hughes, 'Kludge' gravitational waveforms for a test-body orbiting a Kerr black hole, Phys. Rev. D 75, 024005 (2007)"
    doi: "10.1103/PhysRevD.75.024005"
    arxiv: "gr-qc/0607007"
    inspire: "720683"
    bibtex: |
      @article{Babak:2006uv,
          author = "Babak, Stanislav and Fang, Hua and Gair, Jonathan R. and Glampedakis, Kostas and Hughes, Scott A.",
          title = "{'Kludge' gravitational waveforms for a test-body orbiting a Kerr black hole}",
          eprint = "gr-qc/0607007",
          archivePrefix = "arXiv",
          doi = "10.1103/PhysRevD.75.024005",
          journal = "Phys. Rev. D",
          volume = "75",
          pages = "024005",
          year = "2007",
          note = "[Erratum: Phys.Rev.D 77, 04990 (2008)]"
      }
---

<div class="callout" markdown="1">
**No longer maintained.** EMRI Kludge Suite was discontinued in January 2021 and is kept
here for reference. Active development moved to
[FastEMRIWaveforms]({{ '/modules/fastemriwaveforms/' | relative_url }}), which includes an
improved AAK waveform for generic Kerr inspirals with a 5PN trajectory
(`Pn5AAKWaveform`). New projects should use FastEMRIWaveforms.
</div>

## Overview

EMRI Kludge Suite is a C/C++ code (with Python wrappers) for generating kludge waveforms for
extreme mass-ratio inspirals (EMRIs) into Kerr black holes. All waveforms share the same
settings and parameters. It contains three waveform models:

- the **augmented analytic kludge (AAK)** of Chua & Gair (2015) and Chua, Moore & Gair (2017)
- the **analytic kludge (AK)** of Barack & Cutler (2004)
- the **numerical kludge (NK)** of Babak et al. (2007)

It can also output the fixed-and-equal-arm LISA TDI channels $(X, Y, Z)$ for the AAK and
AK. These are computed directly in the Fourier domain using the stationary phase
approximation. The AAK phases can be output on their own, without amplitudes. They are fast
to generate and can be heavily downsampled, and their time derivatives are the Kerr
fundamental frequencies. The AAK waveform also has a CUDA (GPU) implementation with a
Python interface.

The final release is version 0.5.2.

## Installation

The GSL and FFTW libraries are needed to compile the code. Clone the repository and run
`make` (use `make clean` first to remove any previous build):

```bash
git clone https://github.com/alvincjk/EMRI_Kludge_Suite
cd EMRI_Kludge_Suite
make
```

This builds the executables `AAK_Waveform`, `AK_Waveform`, `NK_Waveform`, `AAK_TDI`,
`AK_TDI` and `AAK_Phase` in `./bin`. To install the Python modules (all AAK outputs, the AK
TDIs, and the GPU AAK), run:

```bash
python setup.py install    # or: python setup.py install --user
```

## Usage

### Command line

Each executable reads a formatted settings/parameters file. Templates with default values
and descriptions of every entry are in `./examples` (`SetPar_Waveform`, `SetPar_TDI`,
`SetPar_Phase`). For example:

```bash
bin/AAK_Waveform examples/SetPar_Waveform
```

generates an AAK waveform with the default settings and parameters and writes:

- `bin/example_wave.dat`: waveform data (t, h_I, h_II)
- `bin/example_traj.dat`: inspiral trajectory (t, p/M, e, iota, E, L_z, Q)
- `bin/example_info.txt`: additional information such as signal-to-noise ratio and timing

`bin/AAK_TDI examples/SetPar_TDI` writes the TDI data (f, Xf_r, Xf_im, Yf_r, Yf_im, Zf_r,
Zf_im). `bin/AAK_Phase examples/SetPar_Phase` writes the phases and frequencies (t,
phase_r, phase_theta, phase_phi, omega_r, omega_theta, omega_phi, e).

### Python

The `AAKwrapper` module has four functions: `wave`, `tdi`, `phase` and `aktdi`. They
correspond to `AAK_Waveform`, `AAK_TDI`, `AAK_Phase` and `AK_TDI`. From
`examples/AAKdemo.py`:

```python
import AAKwrapper

pars = {'backint': True,   # end at plunge and integrate backwards
        'LISA': False,     # convert to LISA response
        'length': 1000000, # number of waveform points
        'dt': 5.184,       # time step (s)
        'p': 6.,           # initial semi-latus rectum p/M
        'T': 1.,           # duration (yr), used if dt < 0
        'f': 2.e-3,        # initial GW frequency (Hz), used if p < 0
        'T_fit': 1.,       # max duration of local fit (radiation-reaction time steps)
        'mu': 1.e1,        # compact-object mass (solar masses)
        'M': 1.e6,         # black-hole mass (solar masses)
        's': 0.5,          # black-hole spin a/M
        'e': 0.1,          # initial eccentricity
        'iota': 0.524,     # inclination of L from S
        'gamma': 0.,       # initial angle of periapsis from L x S
        'psi': 0.,         # initial true anomaly
        'theta_S': 0.785,  # source polar angle (ecliptic)
        'phi_S': 0.785,    # source azimuthal angle (ecliptic)
        'theta_K': 1.05,   # BH spin polar angle (ecliptic)
        'phi_K': 1.05,     # BH spin azimuthal angle (ecliptic)
        'alpha': 0.,       # initial azimuthal orientation
        'D': 1.}           # source distance (Gpc)

t, hI, hII, timing = AAKwrapper.wave(pars)
```

The GPU AAK is demonstrated in `examples/pygpuAAKdemo.py`.

## Known limitations

The final README lists these known bugs:

- The approximate LISA response functions h_I/h_II for the AAK/AK and the NK do not
  match, probably because the Doppler shift is implemented with different conventions.
- The NK may produce NaNs at times that coincide with specific fractions of the LISA
  orbital period (when integer values of `dt` are used), or near plunge. A workaround for
  isolated NaNs is included.
- All waveforms may have trouble with zero or very small values of some parameters, such
  as spin, eccentricity and inclination.

## Examples

The [`examples`](https://github.com/alvincjk/EMRI_Kludge_Suite/tree/master/examples)
folder contains the parameter-file templates, `AAKdemo.py`, `pygpuAAKdemo.py`, and an SNR
tutorial notebook (`SNR_tutorial.ipynb`).

## Authors and contributors

Alvin Chua, Jonathan Gair, Michael Katz. The suite builds on code by Leor Barack (AK) and
Scott Hughes (NK). The TDI executables are based on an approximate derivation and
implementation by Stanislav Babak, and Michele Vallisneri wrote the Python wrapper for the
AAK.
