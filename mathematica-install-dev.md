---
layout: default
title: Black Hole Perturbation Toolkit
---

# Installing Mathematica Packages for developers

Most users should install the Mathematica packages via the [Paclet server](mathematica-install.html). However if you are working on developing a new feature or bugfix for a package you may wish to have Mathematica instead load a version directly from a git repository. You will find the link to the GitHub repository at the bottom of each of the individual package webpages.

Once you have a local copy of the repository cloned, you can then direct Mathematica to use that version of the package using `PacletDirectoryLoad` (`PacletDirectoryAdd` in versions of Mathematica prior to 12.1). For example, if you have the git repository for the Teukolsky package in `~/BHPToolkit/Teukolsky`, then you would use the following commands to load that version of the package:
```Mathematica
PacletDirectoryLoad["~/BHPToolkit/Teukolsky"]
<< Teukolsky`
````

Note that if you have previously used the packages prior to the development of the paclet system, you may already have them installed in the `Applications` folder inside your `UserBaseDirectory`. To avoid confusion, it is recommended that you remove these versions or move them elsewhere on your computer.

If you are looking for things to work on in a particular package then a good place to start is by looking at the issue tracker. More information about that can be found on our [issue tracker info page](issue-tracker-info).

If you are working on the webpage for a package then see our [gh-pages guide](gh-pages).

Developers may also be interested in seeing the pages on [Creating Documentation](mathematica-documentation-build) and  [Creating Paclets](mathematica-paclets).
