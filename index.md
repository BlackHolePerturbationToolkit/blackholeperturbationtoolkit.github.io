---
layout: default
title: Black Hole Perturbation Toolkit
---

## Project List

Current **Mathematica** projects in the Toolkit include:

* [SpinWeightedSpheroidalHarmonics](https://blackholeperturbationtoolkit.github.io/SpinWeightedSpheroidalHarmonics): Tools for computing spin-weighted spheroidal harmonics and their associated eigenvalues.
* [KerrGeodesics](https://blackholeperturbationtoolkit.github.io/KerrGeodesics): Tools for computing bound timelike geodesics about a Kerr black hole.
* [Teukolsky](https://github.com/BlackHolePerturbationToolkit/Teukolsky): A set of functions for computing solutions to the Teukolsky equation for perturbations of the spacetime of a Kerr black hole.
* [QuasiNormalModes](https://github.com/BlackHolePerturbationToolkit/QuasiNormalModes): Tools for computing quasinormal modes in Schwarzschild and Kerr spacetime

Current **C/C++** projects in the Toolkit include:

* [Fast Self-forced Inspirals](https://blackholeperturbationtoolkit.github.io/Fast_Self-Forced_Inspirals/): Code to compute self-force inspirals rapidly using the near-identity transformed (NIT'd) equations of motion.
* [EMRI Kludge Suite](https://github.com/alvincjk/EMRI_Kludge_Suite): A suite of software for computing kludge waveforms for generic extreme mass-ratio inspirals into a Kerr black hole.

A range of further tools are being developed and will be added as the project expands. There is also a **repository of results** associated with the Toolkit. Current publicly available results include:

* [PostNewtonian-SelfForce](http://bhptoolkit.org/PostNewtonianSelfForce/): Results for various quantities to high post-Newtonian order and linear-order in the mass ratio.
* [RegularizationParameters](https://github.com/BlackHolePerturbationToolkit/RegularizationParameters): Regularization parameters to compute the regular field at the particle.
* [Circular Orbit Self-force Data](https://github.com/BlackHolePerturbationToolkit/CircularOrbitSelfForceData): Numerical data for fluxes and self-force quantities for circular orbits

We also have **example code** which demonstrates how to use various pieces of the Toolkit:

 * [Mathematica Toolkit Examples](https://github.com/BlackHolePerturbationToolkit/MathematicaToolkitExamples): Examples using the Mathematica modules of the Toolkit

## Citation Guideline

If you make use of any of the Toolkit in your research please acknowledge using:

> This work makes use of the Black Hole Perturbation Toolkit.

To cite the Toolkit please use this [BibTeX entry](BHPToolkit.bib) (or similar). Some modules also request additional citations. Please check the documentation for individual modules. 

### Why Cite?

A lot of researcher time and effort goes into developing the Toolkit. Acknowledging and citing this work demonstrates that it is being used which helps us secure additional funding to support further development. In addition to citations, if you make use of the Toolkit in your work please let us know at niels [dot] warburton [at] ucd [dot] ie so we can add you to our list of known users.

## Community

Development of the Toolkit is led by the researchers at University College Dublin, the University of North Carolina at Chapel Hill and the Kavli Institute for Astrophysics and Space Research at the Massachusetts Institute of Technology.

<img src="UCDLogo.jpg" height="90px"> &nbsp;&nbsp; <img src="UNC_logo.jpg" height="90px"> &nbsp;&nbsp; <img src="logo-mit-kavli.png" height="90px">

Development of the SpinWeightedSpheroidalHarmonics packages is supported by the European Space Agency's [Summer of Code](http://www.esa.int/Our_Activities/Space_Engineering_Technology/SOCIS_The_ESA_Summer_of_Code_in_Space).

## Philosophy

Our goal is for less researcher time to be spent writing code and more time spent doing physics. Currently there exist multiple scattered black hole perturbation theory codes developed by a wide array of individuals or groups over a number of decades. This project aims to bring together some of the core elements of these codes into a Toolkit that can be used by all.

Toolkit modules will typically be developed and thoroughly tested in Mathematica, before other languages are supported (usually C/C++ and python). We welcome suggestions, bug reports, and code from all members of the community.

### Contributing code?

Developing code to compute perturbations to black holes takes a lot of time and effort. The goal of the Toolkit is not to have each and every researcher's cutting edge code on public display, rather to build a core of software that is common to many of the codes that currently exist. This will stop researchers having to reinvent the wheel and thus decrease the development time for new software. This will, in turn, assist the study of black hole perturbation theory for gravitational wave science.