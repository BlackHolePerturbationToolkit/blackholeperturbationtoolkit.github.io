---
name: qnm
summary: Kerr quasinormal mode frequencies, separation constants and spherical-spheroidal mixing coefficients.
lang: Python
domain: qnm
status: stable
requirements: Python 3.7+
repo: https://github.com/BlackHolePerturbationToolkit/qnm
install: pip install qnm
citation:
  - text: "Stein, qnm: A Python package for calculating Kerr quasinormal modes, J. Open Source Softw. 4(42), 1683 (2019)"
    url: "https://arxiv.org/abs/1908.10377"
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
