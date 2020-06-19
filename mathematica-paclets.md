---
layout: default
title: Black Hole Perturbation Toolkit
---

# Creating Paclets for Mathematica packages

The Mathematica packages in the toolkit are all distributed to users using the [Paclet](https://reference.wolfram.com/language/guide/Paclets.html) system. This is described in detail in a [notebook](https://www.wolframcloud.com/obj/tgayley/Published/PacletDevelopment.nb) and [introductory video](https://www.wolfram.com/broadcast/video.php?sx=paclet&v=2833) by Todd Gayley, the creater of the Paclet system. This page gives a brief description of the steps required to build paclets for distribution by the toolkit.


## 1. Increment the version number
All paclets should have a unique version number. When multiple versions are installed, the version loaded by Mathematica will typically be the one with the largest version number. As such, the first step in creating a paclet is to update the version number inside the PacletInfo.wl file.

## 2. Build documentation
Before creating a paclet, most packages have documentation which should be built. See the [documentation guide](mathematica-documentation-build) for instructions.

## 3. Create Paclets
The paclet is built using the `CreatePacletArchive` function in Mathematica. This should be given a list of files to include in the paclet. Packages in the toolkit include a `CreatePaclet.nb` notebook within the `Source` directory which already includes a list of the appropriate files to include for that paclet. In order to create the paclet, it is sufficient to run the `CreatePacletArchive` command in this notebook. 

## 4. Copy paclet to the to paclet server
The paclet server is a simple web server with a directory containing the paclets along with an index file. The new paclet files should be copied to the server inside a `Paclets` subdirectory.

## 5. Update the paclet index
The index file should be updated by running `PacletManager`BuildPacletSiteFiles` with the path where the paclets are stored (the directory inside which the `Paclets` subdirectory exists).

