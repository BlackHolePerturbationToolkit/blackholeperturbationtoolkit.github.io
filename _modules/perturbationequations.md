---
name: "PerturbationEquations"
requirements: xAct
citation:
  - text: "Second-order perturbations of the Schwarzschild spacetime: Practical, covariant, and gauge-invariant formalisms"
    doi: "10.1103/PhysRevD.110.064030"
    arxiv: "2306.17847"
    inspire: "2673488"
    bibtex: |
      @article{Spiers:2023mor,
          author = "Spiers, Andrew and Pound, Adam and Wardell, Barry",
          title = "{Second-order perturbations of the Schwarzschild spacetime: Practical, covariant, and gauge-invariant formalisms}",
          eprint = "2306.17847",
          archivePrefix = "arXiv",
          primaryClass = "gr-qc",
          doi = "10.1103/PhysRevD.110.064030",
          journal = "Phys. Rev. D",
          volume = "110",
          number = "6",
          pages = "064030",
          year = "2024"
      }
  - text: "PerturbationEquations"
    doi: 10.5281/zenodo.8107166
---

## Overview

First- and second-order Einstein and Teukolsky equations in Schwarzschild.

The PerturbationEquations Mathematica package provides a set of tools for working with the spherical-harmonic decompositions of the first- and second-order Einstein equations and Teukolsky equations in Schwarzschild spacetime.

The package’s main functions are:
- `SchwarzschildLinearOperator`: generates spherical-harmonic modes of the lienarized Ricci or Einstein tensor in terms of modes of the metric perturbation.
- `SchwarzschildQuadraticOperator`: generates spherical-harmonic modes modes of the quadratic source term in the second-order Einstein equation or second-order Teukolsky equation. This source term can be the quadratic Einstein tensor, the quadratic Ricci tensor, or an associated Teukolsky source term. These quadratic modes are expressed as products of modes of a metric perturbation.

Expressions can be generated in a number of common spherical harmonic bases. They can also be specialized to a number of common gauge choices.

## Installation

To run this package you will need to first install [xAct](http://www.xact.es/).

PerturbationEquations is distributed as a Mathematica paclet. If you haven’t done so already, add the BHPToolkit paclet server and refresh the list of packages available:
```Mathematica
PacletSiteRegister["https://pacletserver.bhptoolkit.org", "Black Hole Perturbation Toolkit Paclet Server"]
PacletSiteUpdate["https://pacletserver.bhptoolkit.org"]
```
Then install the package:
```Mathematica
PacletInstall["PerturbationEquations"]
```

## Usage

After installing xAct and PerturbationEquations, load the package using
```Mathematica
<< xAct`PerturbationEquations`
```

## Examples

You can find examples in the built-in documentation for the SchwarzschildLinearOperator and SchwarzschildQuadraticOperator functions. Search for those functions in the Wolfram Documentation Center within Mathematica.
