---
layout: default
title: Black Hole Perturbation Toolkit
---

<p>
 <h1 style="display:inline">Self-Force-1D</h1> <span style="float:right;"><a href="https://bitbucket.org/peterdiener/selfforce-1d/src/master/" class="code_btn">Get the code!</a></span>
</p>

SelfForce-1D is a code infrastructure for simulating Extreme Mass Ratio Inspirals using the effective source approach to the self-force problem. Currently, only a scalar charge in a Schwarzschild spacetime background has been implemented, but it is the hope that more systems will be added soon.

The code solves the 1+1D scalar wave equation using discontinuous-Galerkin (dG) methods. The code can solve the sourced wave equation using effective-source methods, where the source is a scalar point charge moving on a a circular or eccentric (geodesic or accelerated) bound orbit.

## Installation and running the code

The code is written in modern object oriented Fortran and, hence, will not work with older compilers. The code has been successfully compiled with gfortran 7.3.0 and ifort 17.0.7. It may also work with some compilers older than that, but that is untested.

In terms of external libraries, BLAS/LAPACK and GSL are needed.

Detailed instructions for installing and running the code can be found in the README in the code repository.

## Publications

A variant of the Self-Force-1D code was used to compute the time-domain results presented in [Class. Quant. Grav. 35:194001](https://doi.org/10.1088%2F1361-6382%2Faad420), [arXiv:1712.01098](https://arxiv.org/abs/1712.01098)

## Authors and contributors

**Peter Diener**, Barry Wardell, Niels Warburton