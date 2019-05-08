---
layout: default
title: Black Hole Perturbation Toolkit
---

# Toolkit workshops round up

First of all, a big thank you to everyone that attended the workshops. Between the MIT and UCD workshops we had over 40 participants. We are extremely grateful to many of you who have contributed code, improved documentation, added unit tests and submitted issues to the issue trackers.

We are also extremely grateful to those that presented at the workshops: Alvin Chua, Leanne Durkan, Eric Gourgoulhon, Scott Hughes, Chris Munna, Zach Nasipak, Niels Warburton, and Barry Wardell

Below is a list of the updates that happened during and since the Toolkit meetings. Please let me know if we have missed anything from the list.

## Major updates:

- We now have a continuous integration server using [Jenkins](https://jenkins.io/). A few unit tests have been added to most modules and you can find the status at [build.bhptoolkit.org](build.bhptoolkit.org.). Every time a repository is updated the unit tests are run to check the commit has not broken anything.
- The website has been reconfigured and a tab added for ["Status and documentation"](http://bhptoolkit.org/documentation.html) where you can access the build server and documentation. All software and Data is now under the ["Toolkit and Data repository tab"](http://bhptoolkit.org/toolkit.html).

## Around the meetings we welcomed 4 new modules to the Toolkit:

- [Gremlin](https://bhptoolkit.org/GremlinEq): C++ code for solving the Teukolsky equation. Initial focused on circular, equatorial orbits (thanks **Scott Hughes**)
- [Kerrgeodesic_gw](https://github.com/BlackHolePerturbationToolkit/kerrgeodesic_gw): SageMath code to compute the gravitational waves from a particle on a circular orbit about a Kerr black hole (thanks to **Eric Gourgoulhon**)
- [GeneralRelativityTensors](https://github.com/BlackHolePerturbationToolkit/GeneralRelativityTensors): Provides a set of functions for performing coordinate-based tensor calculations with a focus on general relativity and black holes in particular (thanks to **Seth Hopper**)
- [QuasiNormalModes](https://github.com/BlackHolePerturbationToolkit/QuasiNormalModes): Tools for computing quasinormal modes in Schwarzschild and Kerr spacetime (thank to **Conor O'Toole**)

## Major updates to packages

- [Teukolsky](https://github.com/BlackHolePerturbationToolkit/Teukolsky): The API for this package has been redesigned. You can now calculate the homogeneous solutions for any spin-weight and the retarded solution s=-2 for a particle on a circular equatorial orbit. The normalization still needs to be added so we can calculate the flux. Example code will be added soon. (thanks to many people at the UCD workshop who helped designing the new API).

## Other updates:

- [KerrGeodesics](https://bhptoolkit.org/KerrGeodesics): You can now calculate propertime frequencies with KerrGeoFrequencies[a, p, e, x, Time -> "Proper"] (thanks **Maarten van de Meent**)
- [QuasiNormalModes](https://github.com/BlackHolePerturbationToolkit/QuasiNormalModes): ReggePole calculations in Schwarzschild spacetime were added to the reggepoles branch (thanks **Tom Stratton**)
- [QuasiNormalModes](https://github.com/BlackHolePerturbationToolkit/QuasiNormalModes): Tables of QNM mode was added to the QNMTables branch (thanks **Vishal Baibhav**)
- We can monitor user access to [bhptoolkit.org](https://bhptoolkit.org) using GoogleAnalytics.
- [PostNewtonianSelfForce](https://bhptoolkit.org/PostNewtonianSelfForce/): Basic documentation added. Improved format for the series data that can handle eccentric orbits. Example eccentric orbit flux added.  (thanks **Chris Munna**)


## New code under development/testing

The follow is new code that is under heavy development so use it at your own risk.

- RegularizationParameters: Mathematica package for easy access to the known regularization parameters (thanks **Ben Leather**)
- OsculatingElements: Mathematica package for computing inspirals using the osculating elements approach. Schwarzschild currently but will be extended to Kerr (thanks **Philip Lynch**)
- KerrGeoResonanceLocator: new function for [KerrGeodesics](https://bhptoolkit.org/KerrGeodesics) to locate resonance orbits (thanks **Josh Mathews**)
- ReggeWheeler: New Mathematica package under heavy development to calculate solutions to the Regge-Wheeler equation. The API of this new package should closely follow the Teukolsky one. (thanks **Jonathan Thompson**)
- [qnm](https://pypi.org/project/qnm/): a new python package to compute qnm's from **Leo Stein** (not currently integrated into the Toolkit but this is an option)


## Documentation

- [Gremlin Docs](https://bhptoolkit.org/GremlinEq/doc/): Added Doxygen documentation (thanks **Halston Lim**). The Jenkin's server automatically builds the documentation every time the repository is updated.
- [Naming Conventions](http://bhptoolkit.org/conventions.html): We decided on naming conventions for quantities that are common across the Toolkit.


## Data:

We decide on the following steps to open up data:

- small data sets can be added directly to the GitHub repository, e.g., [circular orbit data](https://github.com/BlackHolePerturbationToolkit/CircularOrbitSelfForceData).
- Larger datasets should be added to the Toolkit GoogleDrive. Contact Barry Wardell for access.
- Once we are happy with a large dataset we will deposit it with Zenodo.

The following data has recently been added to the Google Drive:

- Flux data for eccentric orbits (thanks **Scott Hughes**)