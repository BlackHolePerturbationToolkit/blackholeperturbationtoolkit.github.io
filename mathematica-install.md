---
layout: default
title: Black Hole Perturbation Toolkit
---

# Installing Mathematica Packages

## Add the Black Hole Perturbation Toolkit Paclet Server

### Mathematica 12.1 or newer

Add the Black Hole Perturbation Toolkit paclet server to Mathematica's list of paclet servers
```Mathematica
PacletSiteRegister["https://pacletserver.bhptoolkit.org", "Black Hole Perturbation Toolkit Paclet Server"]
```
Get an updated list of packages available on the server
```Mathematica
PacletSiteUpdate["https://pacletserver.bhptoolkit.org"]
```
To see which paclets are available:
```Mathematica
PacletFindRemote["*", <|"Location" -> "https://pacletserver.bhptoolkit.org"|>]
```

### Mathematica 12.0 or older

Add the Black Hole Perturbation Toolkit paclet server to Mathematica's list of paclet servers
```Mathematica
PacletSiteAdd["http://pacletserver.bhptoolkit.org", "Black Hole Perturbation Toolkit Paclet Server"]
```
Get an updated list of packages available on the server
```Mathematica
PacletSiteUpdate["http://pacletserver.bhptoolkit.org"]
```
To see which paclets are available:
```Mathematica
PacletFindRemote["*", "Location" -> "http://pacletserver.bhptoolkit.org"]
```

## Install packages

Install the ReggeWheeler package
```Mathematica
PacletInstall["ReggeWheeler"]
```
