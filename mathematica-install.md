---
layout: default
title: Black Hole Perturbation Toolkit
---

# Installing Mathematica Packages

Add the Black Hole Perturbation Toolkit Paclet Server
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

Install the ReggeWheeler package
```Mathematica
PacletInstall["ReggeWheeler"]
```
