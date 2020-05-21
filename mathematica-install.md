---
layout: default
title: Black Hole Perturbation Toolkit
---

# Installing Mathematica Packages

We recommend that you install the Toolkit Mathematica packages via the Paclet server. The instructions for doing this are given below.

Currently the following packages can be installed from the Paclet server and have no dependencies: [SpinWeightedSpheroidalHarmonics](https://bhptoolkit.org/SpinWeightedSpheroidalHarmonics/), [KerrGeodesics](https://bhptoolkit.org/KerrGeodesics/), [PostNewtonianSelfForce](https://bhptoolkit.org/PostNewtonianSelfForce/), [GeneralRelativityTensors](https://github.com/BlackHolePerturbationToolkit/GeneralRelativityTensors). The following packages depend on SpinWeightedSpheroidalHarmonics and KerrGeodesics so you must install these for them to work: [ReggeWheeler](https://bhptoolkit.org/ReggeWheeler/) and [Teukolsky](https://bhptoolkit.org/Teukolsky/)

## Add the Black Hole Perturbation Toolkit Paclet Server

The following instructions either only need to be done once or when upgrading packages.

### Mathematica 12.1 or newer

Add the Black Hole Perturbation Toolkit paclet server to Mathematica's list of paclet servers. This command only needs to be run once.
```Mathematica
PacletSiteRegister["https://pacletserver.bhptoolkit.org", "Black Hole Perturbation Toolkit Paclet Server"]
```
Get an updated list of packages available on the server. You should run this command when you want to upgrade a package.
```Mathematica
PacletSiteUpdate["https://pacletserver.bhptoolkit.org"]
```
To see which paclets are available:
```Mathematica
PacletFindRemote["*", <|"Location" -> "https://pacletserver.bhptoolkit.org"|>]
```

### Mathematica 12.0 or older

Add the Black Hole Perturbation Toolkit paclet server to Mathematica's list of paclet servers. This command only needs to be run once.
```Mathematica
PacletSiteAdd["http://pacletserver.bhptoolkit.org", "Black Hole Perturbation Toolkit Paclet Server"]
```
Get an updated list of packages available on the server. You should run this command when you want to upgrade a package.
```Mathematica
PacletSiteUpdate["http://pacletserver.bhptoolkit.org"]
```
To see which paclets are available:
```Mathematica
PacletFindRemote["*", "Location" -> "http://pacletserver.bhptoolkit.org"]
```

## Install packages

To install each package use a command like the following:
```Mathematica
PacletInstall["ReggeWheeler"]
```

## Loading a package

Once installed, each package can be loaded via, e.g.,

```Mathematica
<< ReggeWheeler`
```
