---
layout: default
title: Black Hole Perturbation Toolkit
---

## Installation

The BHPToolkit is made up of many individual tools that can be installed depending on what the user is interested in. The webpage for each tool gives the instructions for installation. We recommend (where available) using the packaged versions of each tool as the development version can be unstable if changes are being made. For Python code the tool can often be installed via [pip](https://packaging.python.org/tutorials/installing-packages/), C and C++ tools will each describe their dependencies in their README pages, and Mathematica packages can be installed via the Paclet system. Instructions for the latter are given below.

- [Installing BHPToolkit Mathematica packages](mathematica-install.html)

## Documentation

Each module comes with its own documentation. Currently, in places this can be quite minimal but we are continuously working to improve this. Soon we have have direct links to the Mathematica documentation here, as well as links to the documentation for other key modules.

At the 2020 virtual BHPToolkit workshop all the talks where recorded. They are a great introduction for new users. Check them out on the [BHPToolkit YouTube channel](https://www.youtube.com/channel/UCuQQbp9Buq-R3da4zASTFfw).

## Reporting issues or making suggestions

We do our best to ensure the components of the Toolkit work correctly but inevitably errors will slip through our tests. If you find something you think is in error please do report it via the issue tracker associated with the corresponding repository. Similarly, if you have a suggestion for new features these can also be added to the issue trackers. See our [issue tracker information page](issue-tracker-info.html) for a guide on using the issue trackers.

## Unit testing

One of the aims of the Toolkit is for all components to be well-tested and reliable. To assist with this we have enabled continuous integration testing using GitHub Actions. This means each time the code is changed it is automatically tested to ensure no errors have been introduced. You can find the current build status of various packages on the [unit test status page](https://bhptoolkit.org/teststatus).

## Naming conventions

We aim to have consistent naming conventions in use across the Toolkit. The current list can be found on the [name conventions page](conventions.html).

## BHPToolkit Workshops

Find information on upcoming and previous workshops on the [BHPToolkit workshops page](workshops.html).

## Other useful information

- [Mathematica and git](cleannb.html)
- [Setting up repository webpages with gh-pages](http://bhptoolkit.org/gh-pages)