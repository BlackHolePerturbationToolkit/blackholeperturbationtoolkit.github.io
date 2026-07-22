---
name: qnm
requirements: Python 3.7+
citation:
  - text: "Stein, qnm: A Python package for calculating Kerr quasinormal modes, J. Open Source Softw. 4(42), 1683 (2019)"
    doi: "10.21105/joss.01683"
    arxiv: "1908.10377"
    inspire: "1751578"
    bibtex: |
      @article{Stein:2019mop,
          author = "Stein, Leo C.",
          title = "{qnm: A Python package for calculating Kerr quasinormal modes, separation constants, and spherical-spheroidal mixing coefficients}",
          eprint = "1908.10377",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          doi = "10.21105/joss.01683",
          journal = "J. Open Source Softw.",
          volume = "4",
          number = "42",
          pages = "1683",
          year = "2019"
      }
---

## Overview

qnm computes the quasinormal mode (QNM) frequencies of Kerr black holes using
the Cook-Zalutskiy spectral approach. Alongside each frequency it returns the
angular separation constant and the spherical-spheroidal mixing coefficients,
which are needed to project the spheroidal harmonics onto the spherical basis.

The package ships with a precomputed cache of low-lying multipoles and overtones,
so common modes are available without any on-the-fly root finding.

## Installation

```bash
pip install qnm
```

The first time you use the cached modes, download the precomputed data:

```python
import qnm
qnm.download_data()
```

## Usage

Fetch a mode from the cache and evaluate it at a dimensionless spin `a`:

```python
import qnm

mode = qnm.modes_cache(s=-2, l=2, m=2, n=0)
omega, A, C = mode(a=0.68)

print(omega)   # complex QNM frequency
print(A)       # angular separation constant
```

`omega` is the complex frequency (the imaginary part sets the damping time), and
`C` holds the spherical-spheroidal mixing coefficients for the mode.

## Examples

The repository includes notebooks demonstrating the cache, overtones, and
mixing-coefficient usage.
