---
name: "kerrgeodesic_gw"
requirements: SageMath 9.3+ (or passagemath)
citation:
  - text: "E. Gourgoulhon, A. Le Tiec, F. H. Vincent & N. Warburton, Gravitational waves from bodies orbiting the Galactic Center black hole and their detectability by LISA, A&A 627, A92 (2019)"
    doi: "10.1051/0004-6361/201935406"
    arxiv: "1903.02049"
    inspire: "1723890"
    bibtex: |
      @article{Gourgoulhon:2019iyu,
          author = "Gourgoulhon, Eric and Le Tiec, Alexandre and Vincent, Frederic H. and Warburton, Niels",
          title = "{Gravitational waves from bodies orbiting the Galactic Center black hole and their detectability by LISA}",
          eprint = "1903.02049",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          doi = "10.1051/0004-6361/201935406",
          journal = "Astron. Astrophys.",
          volume = "627",
          pages = "A92",
          year = "2019"
      }
---

## Overview

kerrgeodesic_gw is a [SageMath](https://www.sagemath.org/) package for computing the
gravitational radiation from material orbiting a Kerr black hole. It was developed for
[Gourgoulhon, Le Tiec, Vincent & Warburton (2019)](https://doi.org/10.1051/0004-6361/201935406),
which studies gravitational waves from bodies orbiting Sgr A\* and their detectability by
LISA. The paper is open access and describes the formulas the package implements. The
package uses the differential-geometry tools of the
[SageManifolds](https://sagemanifolds.obspm.fr/) project.

For a particle of mass $\mu$ on a circular equatorial orbit of radius $r_0$ about a Kerr
black hole of mass $M$ and spin $a$, the waveform is

$$
h_+ - i h_\times = \frac{2\mu}{r} \sum_{\ell=2}^{\infty} \sum_{m=-\ell,\, m\neq 0}^{\ell}
\frac{Z^\infty_{\ell m}(r_0)}{(m\omega_0)^2}\, {}_{-2}S^{am\omega_0}_{\ell m}(\theta,\phi)\,
e^{-i m \phi_0}\, e^{-i m \omega_0 (t-r_*)} ,
$$

where $\omega_0$ is the orbital angular velocity, ${}\_{-2}S^{am\omega_0}\_{\ell m}$ are
spin-weighted spheroidal harmonics, and the amplitudes $Z^\infty_{\ell m}(r_0)$ come from
solutions of the radial Teukolsky equation. The package ships tabulated values of
$Z^\infty_{\ell m}$ for spins $a/M$ from 0 to 0.98 and interpolates them with splines.

The main capabilities are:

- the Kerr spacetime as a SageManifolds Lorentzian manifold (`KerrBH`), with Boyer–Lindquist
  coordinates, the metric and curvature, horizon, photon-orbit, marginally bound and ISCO
  radii, circular-orbit frequencies, Roche limits, and numerical integration of timelike
  and null geodesics
- spin-weighted spherical and spheroidal harmonics, and spheroidal eigenvalues
- waveforms $h_+$ and $h_\times$, their Fourier spectra, the radiated power, and secular
  frequency change and decay time for a particle on a circular equatorial orbit
- waveforms from an extended blob of matter on a circular orbit
- the LISA strain sensitivity and noise power spectral density, signal-to-noise ratios and
  maximum detectable radius
- astronomical data such as physical constants, the solar mass and the mass and distance of
  Sgr A\*, in SI and geometrized units

## Installation

The package needs [SageMath](https://www.sagemath.org/) 9.3 or later. Only version 0.3.2
of the package works with older SageMath versions. Install it from
[PyPI](https://pypi.org/project/kerrgeodesic-gw/) into SageMath:

```bash
sage -pip install kerrgeodesic_gw
```

On [CoCalc](https://cocalc.com), add `--user` (`sage -pip install --user kerrgeodesic_gw`).
If SageMath came from a system package (e.g. Ubuntu's `sagemath`), user-level `pip`
installs may not work. Install a SageMath binary from the
[download page](https://www.sagemath.org/download-linux.html) instead.

### Without a full SageMath installation

You can also use the package in a plain Python virtual environment, with the modularized
[passagemath](https://github.com/passagemath/passagemath) distribution of the Sage library:

```bash
git clone https://github.com/BlackHolePerturbationToolkit/kerrgeodesic_gw.git
cd kerrgeodesic_gw
python3 -m venv venv_kerrgeodesic_gw
. venv_kerrgeodesic_gw/bin/activate
pip install -e .[passagemath]
```

### From source

```bash
git clone https://github.com/BlackHolePerturbationToolkit/kerrgeodesic_gw.git
sage -pip install --upgrade --no-index -v kerrgeodesic_gw
```

Add `-e` for a development install. Running `sage -t kerrgeodesic_gw` from the repository
root runs the doctests.

## Usage

In a SageMath session:

```python
sage: from kerrgeodesic_gw import spin_weighted_spherical_harmonic
sage: theta, phi = var('theta phi')
sage: spin_weighted_spherical_harmonic(-2, 2, 1, theta, phi)
1/4*(sqrt(5)*cos(theta) + sqrt(5))*e^(I*phi)*sin(theta)/sqrt(pi)
```

In a passagemath virtual environment, first import the needed parts of the Sage library:

```python
>>> from sage.all__sagemath_symbolics import *
>>> from sage.all__sagemath_plot import *
>>> from kerrgeodesic_gw import spin_weighted_spherical_harmonic
```

### Waveform from a particle on the ISCO

This example, from the *Gravitational waves from circular orbits* notebook, computes the
rescaled waveform $(r/\mu)\,h_{+,\times}$ for a particle on the prograde ISCO of a Kerr
black hole with $a = 0.9M$:

```python
sage: from kerrgeodesic_gw import KerrBH, h_plus_particle, h_cross_particle, plot_h_particle
sage: a = 0.90
sage: r0 = KerrBH(a).isco_radius()
sage: r0
2.32088304176189
sage: theta = pi/4; phi = 0; u = 0
sage: h_plus_particle(a, r0, u, theta, phi)
0.5582496798737479
sage: h_cross_particle(a, r0, u, theta, phi)
-0.05710956283550757
sage: umax = 2/KerrBH(a).orbital_frequency(r0)
sage: plot_h_particle(a, r0, theta, phi, 0, umax, plot_points=400)
```

### LISA signal-to-noise ratio for a source at Sgr A\*

Continuing the example, the SNR in LISA after one day of observation of a $1\,M_\odot$
body on this orbit about Sgr A\*:

```python
sage: from kerrgeodesic_gw import astro_data, lisa_detector, signal_to_noise_particle
sage: mu_ov_r = astro_data.solar_mass_m / astro_data.SgrA_distance_m
sage: BH_time_scale = astro_data.SgrA_mass_s
sage: psd = lisa_detector.power_spectral_density
sage: t_obs = 24*3600  # 1 day in seconds
sage: signal_to_noise_particle(a, r0, pi/4, psd, t_obs, BH_time_scale, scale=mu_ov_r)
103718.23722663395
```

## Examples

- [Reference manual](https://sagemanifolds.obspm.fr/kerrgeodesic_gw/reference/)
  ([PDF](https://sagemanifolds.obspm.fr/kerrgeodesic_gw/kerrgeodesic_gw.pdf))
- Demo notebooks (view on nbviewer, or run on Binder from the
  [README](https://github.com/BlackHolePerturbationToolkit/kerrgeodesic_gw#online-documentation)):
  - [Spin-weighted spheroidal harmonics](https://nbviewer.jupyter.org/github/BlackHolePerturbationToolkit/kerrgeodesic_gw/blob/master/Notebooks/basic_kerrgeodesic_gw.ipynb)
  - [Timelike and null geodesics in Kerr spacetime](https://nbviewer.jupyter.org/github/BlackHolePerturbationToolkit/kerrgeodesic_gw/blob/master/Notebooks/Kerr_geodesics.ipynb)
  - [Gravitational waves from circular orbits around a Kerr black hole](https://nbviewer.jupyter.org/github/BlackHolePerturbationToolkit/kerrgeodesic_gw/blob/master/Notebooks/grav_waves_circular.ipynb)
  - [More on gravitational waves from circular orbits](https://nbviewer.jupyter.org/github/BlackHolePerturbationToolkit/kerrgeodesic_gw/blob/master/Notebooks/gw_single_particle.ipynb)
- For the tensor-calculus features of `KerrBH`, see the SageManifolds Kerr notebooks
  ([Kerr 1](https://nbviewer.jupyter.org/github/sagemanifolds/SageManifolds/blob/master/Notebooks/SM_Kerr.ipynb),
  [Kerr 2](https://nbviewer.jupyter.org/github/sagemanifolds/SageManifolds/blob/master/Notebooks/SM_Kerr_Killing_tensor.ipynb))
  and the [SageManifolds documentation](https://sagemanifolds.obspm.fr/documentation.html).

## Authors and contributors

Eric Gourgoulhon, Alexandre Le Tiec, Frédéric Vincent, Niels Warburton
