---
layout: default
title: Black Hole Perturbation Toolkit
---

# Generating documentation for Mathematica packages

All of the Mathematica packages within the Black Hole Perturbation Toolkit include documentation that is built directly into the Mathematica documentation centre. This is generated using the built-in documentation facilities in Mathematica. There are three steps to creating new documentation for a package: 


## 1. Consider which documentation to provide
There are three types of documentation pages:
1. **Symbol reference pages:** These give an explanation of what the functionality is provided along with some usage examples.
2. **Guide pages:** These give a summary of the functionality provided by the package in to form of a list of symbols with a brief description for each one.
3. **Tutorials:** These provide an extended tutorial showing how to use the package.

At the very least, all public Symbols for a package should have reference pages. It is recommended that you also create at least one guide page and one tutorial notebook page for your package.


## 2. Create source documentation files
The documentation is built from source files stored in the Documentation directory. The best way to learn how to do this is to look at existing packages, for example [Teukolsky](https://github.com/BlackHolePerturbationToolkit/Teukolsky/tree/master/Documentation).


## 3. Build the documentation
The documentation is generated as part of the [Paclet build](https://bhptoolkit.org/mathematica-paclets) process.


## Important points
- When creating documentation notebooks, it is a good idea to [store them in a version-control friendly form](http://bhptoolkit.org/mathematica-git).
- It may be preferable for notebooks to not have any output cells, so as not to bloat the repository.
- You may wish to set the FrontEndVersion for tutorial notebooks for maximum support of older Mathematica versions.
