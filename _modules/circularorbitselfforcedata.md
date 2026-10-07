---
name: "CircularOrbitSelfForceData"
citation:
  - text: "For the Kerr fluxes with |a| ≤ 0.9M:<br> Taracchini, Buonanno, Khanna and Hughes, Small mass plunging into a Kerr black hole: Anatomy of the inspiral-merger-ringdown waveforms, Phys. Rev. D 90, 084025 (2014)"
    doi: "10.1103/PhysRevD.90.084025"
    arxiv: "1404.1819"
    inspire: "1288871"
    bibtex: |
      @article{Taracchini:2014zpa,
          author = "Taracchini, Andrea and Buonanno, Alessandra and Khanna, Gaurav and Hughes, Scott A.",
          title = "{Small mass plunging into a Kerr black hole: Anatomy of the inspiral-merger-ringdown waveforms}",
          eprint = "1404.1819",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          doi = "10.1103/PhysRevD.90.084025",
          journal = "Phys. Rev. D",
          volume = "90",
          number = "8",
          pages = "084025",
          year = "2014"
      }
  - text: "For the near-extremal Kerr fluxes:<br> Gralla, Hughes and Warburton, Inspiral into Gargantua, Class. Quant. Grav. 33, 155002 (2016)"
    doi: "10.1088/0264-9381/33/15/155002"
    arxiv: "1603.01221"
    inspire: "1425927"
    bibtex: |
      @article{Gralla:2016qfw,
          author = "Gralla, Samuel E. and Hughes, Scott A. and Warburton, Niels",
          title = "{Inspiral into Gargantua}",
          eprint = "1603.01221",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          doi = "10.1088/0264-9381/33/15/155002",
          journal = "Class. Quant. Grav.",
          volume = "33",
          number = "15",
          pages = "155002",
          year = "2016",
          note = "[Erratum: Class.Quant.Grav. 37, 109501 (2020)]"
      }
---

## Overview

CircularOrbitSelfForceData is a collection of black hole perturbation and self-force data for a point
particle on a circular (equatorial) orbit about a Schwarzschild or Kerr black hole. It contains:

- gravitational-wave energy fluxes to infinity and down the horizon, for Schwarzschild and for Kerr
  spins from $a = -0.99M$ to $a = 0.999M$, plus near-extremal data;
- linear-in-spin corrections to the fluxes from a spinning secondary;
- local gauge-invariant self-force quantities: Detweiler's redshift invariant, the spin-precession
  invariant, tidal and octupolar invariants, and the second-order binding energy.

The data come from many groups. Each file or folder README names the paper the data were published
in. **If you use the data, please cite the relevant work** (listed below) and acknowledge the Toolkit,
for example: "This work made use of data hosted as part of the Black Hole Perturbation Toolkit at
bhptoolkit.org."

All data are plain-text, whitespace-separated columns in geometric units with $M = 1$. No code is
needed to read them.

## Installation

Clone the repository (about 20 MB):

```bash
git clone https://github.com/BlackHolePerturbationToolkit/CircularOrbitSelfForceData.git
```

You can also read individual files directly from GitHub without cloning, using their raw URLs:

```
https://raw.githubusercontent.com/BlackHolePerturbationToolkit/CircularOrbitSelfForceData/master/<path>
```

## Data format

### Schwarzschild

| File | Columns | Reference |
|------|---------|-----------|
| `Schwarzschild/Flux_Edot.dat` | $r\_0/M$, $\dot E\_\infty$, $\dot E\_{\rm H}$ (10,000 radii from $r\_0 = 6M$ to $10^4M$) | — |
| `Schwarzschild/Redshift_and_spin_invariants.dat` | $r\_0/M$, $\Delta U\,(M/\mu)$, $\Delta\psi\,(M/\mu)$ | Dolan et al., Phys. Rev. D 91, 023009 (2015), [arXiv:1406.4890](https://arxiv.org/abs/1406.4890), Table III |
| `Schwarzschild/Tidal_invariants.dat` | $r\_\Omega/M$, $\Delta\lambda^E\_1$, $\Delta\lambda^E\_2$, $\Delta\lambda^E\_3$, $\Delta\chi$, … (see the file header) | Dolan et al., Phys. Rev. D 91, 023009 (2015), [arXiv:1406.4890](https://arxiv.org/abs/1406.4890), Table I |
| `Schwarzschild/delta_K3plus.dat` | $r\_0/M$, $\delta K\_{3+}$ (the effective-one-body quantity of Eq. (2.47) of the reference) | Nolan et al., Phys. Rev. D 92, 123008 (2015), [arXiv:1505.04447](https://arxiv.org/abs/1505.04447) |
| `Schwarzschild/SecondOrderEbindingEnergy.dat` | $1/y$, $E\_{\rm SF}$, estimated error in $E\_{\rm SF}$, $E^{\rm cons}\_{\rm SF}$, $E^{\rm 1st\,law}$, $\Delta E\_{\rm SF}$, $\Delta E^{\rm cons}\_{\rm SF}$ | Pound, Wardell, Warburton and Miller, Phys. Rev. Lett. 124, 021101 (2020), [arXiv:1908.07419](https://arxiv.org/abs/1908.07419) |
| `Schwarzschild/Spin/SpinFluxFixedr0.dat` | $r\_0$, $F\_0$, $F^{\rm H}\_\sigma$, $F^{\rm Inf}\_\sigma$, $(dE/dt)\_\sigma$, $\Delta\_{\rm rel}$ | Akcay et al., Phys. Rev. D 102, 064013 (2020), [arXiv:1912.09461](https://arxiv.org/abs/1912.09461), Table I |
| `Schwarzschild/Spin/SpinFluxFixedy.dat` | $y$, $F\_0$, $F^{\rm H}\_\sigma$, $F^{\rm Inf}\_\sigma$, $(dE/dt)\_\sigma$, $\Delta\_{\rm rel}$ | Akcay et al., [arXiv:1912.09461](https://arxiv.org/abs/1912.09461), Table II |

Apart from the flux file, every Schwarzschild file starts with `#` comment lines describing the data,
its column format and its source.

The `Schwarzschild/Spin` README also points to additional spinning-secondary data hosted on Zenodo:

| Description | Authors | Reference | Data |
|-------------|---------|-----------|------|
| Spin-aligned flux for four different spin supplementary conditions | E. Harms, G. Lukes-Gerakopoulos, S. Bernuzzi, A. Nagar | Phys. Rev. D 94, 104010 (2016), [arXiv:1609.00356](https://arxiv.org/abs/1609.00356) | [Zenodo](https://zenodo.org/record/61308) |
| Spin-aligned flux, including linearized (in spin) flux | S. Bernuzzi, E. Harms, G. Lukes-Gerakopoulos | Phys. Rev. D 100, 104056 (2019), [arXiv:1907.12233](https://arxiv.org/abs/1907.12233) | [Zenodo](https://zenodo.org/record/3355374) |

### Kerr

**Fluxes** (`Kerr/Fluxes/`)

| File | Columns | Reference |
|------|---------|-----------|
| `Flux_Edot_a<a>.dat` for $a/M \in \\{\pm0.1, \pm0.2, \pm0.3, \pm0.4, \pm0.5, \pm0.6, -0.7, \pm0.8, \pm0.9, 0.95, \pm0.99, 0.995, 0.999\\}$ | $r\_0/M$, $\dot E\_\infty$, $\dot E\_{\rm H}$ (10,000 radii from $10^4M$ down to the innermost stable circular orbit) | For $\lvert a\rvert \le 0.9M$: computed by S. A. Hughes for Taracchini et al., Phys. Rev. D 90, 084025 (2014), [arXiv:1404.1819](https://arxiv.org/abs/1404.1819) |
| `Flux_Edot_eps_1e-9.dat` | $r\_0/M$, $\dot E\_\infty$, $\dot E\_{\rm H}$ for the near-extremal spin $a = (1-\epsilon)M$, $\epsilon = 10^{-9}$ | Gralla, Hughes and Warburton, Class. Quant. Grav. 33, 155002 (2016), [arXiv:1603.01221](https://arxiv.org/abs/1603.01221) |

Negative values of $a$ correspond to retrograde orbits. For prograde orbits the horizon flux
$\dot E\_{\rm H}$ can be negative, wherever superradiance extracts energy from the black hole.

**Spinning-secondary flux corrections** (`Kerr/Fluxes/Spin/`)

| File | Columns | Reference |
|------|---------|-----------|
| `Fluxes_spin_corr_a<a>.dat` for $a/M \in \\{0.1, \dots, 0.9, 0.95, 0.97, 0.99, 0.995\\}$ | $r$, `flux_corr`: the absolute value of the linear-in-spin correction to the flux, normalized to $q^2$ with $q$ the mass ratio (one header line) | Piovano, Maselli and Pani, Phys. Rev. D 102, 024041 (2020), [arXiv:2004.02654](https://arxiv.org/abs/2004.02654) |

All of these flux corrections are negative over the range of $r$ covered. The files store their
absolute values.

**Local invariants** (`Kerr/Local_Invariants/`)

| File | Columns | Reference |
|------|---------|-----------|
| `redshift_invariant.dat` | $r\_0/M$, then $\Delta U$ for $a/M = -0.9, -0.7, -0.5, 0, 0.5, 0.7, 0.9$ (`-` where no value is available) | Shah, Friedman and Keidl, Phys. Rev. D 86, 084059 (2012), [arXiv:1207.5595](https://arxiv.org/abs/1207.5595), Table III |
| `spin_invariant.dat` | $a/M$, $r/M$, $\delta\psi$, estimated absolute numerical error (no header; $a/M = -0.9, -0.8, \dots, 0.9$) | Bini, Damour, Geralico, Kavanagh and van de Meent, Phys. Rev. D 98, 104062 (2018), [arXiv:1809.02516](https://arxiv.org/abs/1809.02516) |

## Usage

### Mathematica

Files without a header can be imported directly as a table. For files with `#` comment lines, keep
only the numeric rows:

```mathematica
base = "https://raw.githubusercontent.com/BlackHolePerturbationToolkit/CircularOrbitSelfForceData/master/";

flux = Import[base <> "Schwarzschild/Flux_Edot.dat", "Table"];
redshift = Select[Import[base <> "Schwarzschild/Redshift_and_spin_invariants.dat", "Table"], VectorQ[#, NumericQ] &];
spinCorr = Import[base <> "Kerr/Fluxes/Spin/Fluxes_spin_corr_a0.9.dat", "Table", "HeaderLines" -> 1];
```

To read a local clone, replace `base` with the path to the cloned repository.

### Python

`numpy.loadtxt` skips `#` comment lines by default:

```python
import numpy as np

base = "https://raw.githubusercontent.com/BlackHolePerturbationToolkit/CircularOrbitSelfForceData/master/"

r0, Edot_inf, Edot_H = np.loadtxt(base + "Kerr/Fluxes/Flux_Edot_a0.9.dat", unpack=True)
r0, dU, dpsi = np.loadtxt(base + "Schwarzschild/Redshift_and_spin_invariants.dat", unpack=True)
r, flux_corr = np.loadtxt(base + "Kerr/Fluxes/Spin/Fluxes_spin_corr_a0.9.dat", skiprows=1, unpack=True)

# missing entries ("-") in the Kerr redshift table become NaN
dU_kerr = np.genfromtxt(base + "Kerr/Local_Invariants/redshift_invariant.dat")
```

## Examples

Plot the total gravitational-wave energy flux against orbital radius for a prograde orbit about a
black hole with $a = 0.9M$:

```python
import numpy as np
import matplotlib.pyplot as plt

base = "https://raw.githubusercontent.com/BlackHolePerturbationToolkit/CircularOrbitSelfForceData/master/"
r0, Edot_inf, Edot_H = np.loadtxt(base + "Kerr/Fluxes/Flux_Edot_a0.9.dat", unpack=True)

plt.loglog(r0, Edot_inf + Edot_H)
plt.xlabel(r"$r_0/M$")
plt.ylabel(r"$\dot E_\infty + \dot E_H$")
plt.show()
```

For computing fluxes and self-force quantities yourself, see the
[Teukolsky]({{ '/modules/teukolsky/' | relative_url }}) package and the other self-force modules in
the Toolkit.

## Authors and contributors

The repository is maintained by Niels Warburton. Data contributed by Scott Hughes; Samuel Gralla,
Scott Hughes and Niels Warburton; Gabriel Andres Piovano, Andrea Maselli and Paolo Pani; Abhay Shah,
John Friedman and Tobias Keidl; Donato Bini, Thibault Damour, Andrea Geralico, Chris Kavanagh and
Maarten van de Meent; Sam Dolan, Patrick Nolan, Adrian Ottewill, Niels Warburton and Barry Wardell;
Adam Pound, Barry Wardell, Niels Warburton and Jeremy Miller; Sarp Akcay, Sam Dolan, Chris Kavanagh,
Jordan Moxon, Niels Warburton and Barry Wardell.
