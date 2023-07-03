---
layout: default
title: Black Hole Perturbation Toolkit
---

# Installing Mathematica Packages

If you are a regular user we recommend that you install the Toolkit Mathematica packages via the Paclet server. The instructions for doing this are given immediately below. If you are a developer see the [Mathematica developer instructions](mathematica-install-dev.html).

Currently the following packages can be installed from the Paclet server and have no dependencies: [SpinWeightedSpheroidalHarmonics](https://bhptoolkit.org/SpinWeightedSpheroidalHarmonics/), [KerrGeodesics](https://bhptoolkit.org/KerrGeodesics/), [PostNewtonianSelfForce](https://bhptoolkit.org/PostNewtonianSelfForce/), [GeneralRelativityTensors](https://bhptoolkit.org/GeneralRelativityTensors). The following packages depend on SpinWeightedSpheroidalHarmonics and KerrGeodesics so you must install these for them to work: [ReggeWheeler](https://bhptoolkit.org/ReggeWheeler/) and [Teukolsky](https://bhptoolkit.org/Teukolsky/).

## Add the Black Hole Perturbation Toolkit Paclet Server

This step only needs to be done once and persists even if you quit and restart Mathematica.

### Mathematica 12.1 or newer

Add the Black Hole Perturbation Toolkit paclet server to Mathematica's list of paclet servers.
```Mathematica
PacletSiteRegister["https://pacletserver.bhptoolkit.org", "Black Hole Perturbation Toolkit Paclet Server"]
```
Get an updated list of packages available on the server.
```Mathematica
PacletSiteUpdate["https://pacletserver.bhptoolkit.org"]
```
To see which paclets are available:
```Mathematica
PacletFindRemote["*", <|"Location" -> "https://pacletserver.bhptoolkit.org"|>]
```

### Mathematica 12.0 or older

Add the Black Hole Perturbation Toolkit paclet server to Mathematica's list of paclet servers.
```Mathematica
PacletSiteAdd["http://pacletserver.bhptoolkit.org", "Black Hole Perturbation Toolkit Paclet Server"]
```
Get an updated list of packages available on the server.
```Mathematica
PacletSiteUpdate["http://pacletserver.bhptoolkit.org"]
```
To see which paclets are available:
```Mathematica
PacletFindRemote["*", "Location" -> "http://pacletserver.bhptoolkit.org"]
```

## Install packages

To install all of the packages currently available in the toolkit:
```Mathematica
PacletInstall["GeneralRelativityTensors"];
PacletInstall["KerrGeodesics"];
PacletInstall["PostNewtonianSelfForce"];
PacletInstall["ReggeWheeler"];
PacletInstall["SpinWeightedSpheroidalHarmonics"];
PacletInstall["Teukolsky"];
PacletInstall["PerturbationEquaations"]
```

## Updating to latest version of a package
If a new version of a package becomes available, you can easily upgrade to the latest version by first running the `PacletSiteUpdate` command as above, and then running `PacletInstall` for the chosen package.


## Loading a package

Once installed, each package can be loaded via, e.g.,

```Mathematica
<< ReggeWheeler`
```
