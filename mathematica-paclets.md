---
layout: default
title: Black Hole Perturbation Toolkit
---

# Creating Paclets for Mathematica packages

The Mathematica packages in the toolkit are all distributed to users using the [Paclet](https://reference.wolfram.com/language/guide/Paclets.html) system. This is described in detail in a [notebook](https://www.wolframcloud.com/obj/tgayley/Published/PacletDevelopment.nb) and [introductory video](https://www.wolfram.com/broadcast/video.php?sx=paclet&v=2833) by Todd Gayley, the creater of the Paclet system. Below is a brief description of the steps required to build paclets for release by the toolkit. This is based on creating release version 0.5.0 of the PostNewtonianSelfForce package. The instructions should be adjusted in the obvious way for different versions and packages. 

1. Update version number in `PacletInfo.wl`. All paclets should have a unique version number. When multiple versions are installed, the version loaded by Mathematica will typically be the one with the largest version number.
2. Tag version in git: `git tag 0.5.0 && git push --tags`
3. Create paclet, from within Mathematica:
   ```Mathematica
   << PacletTools`
   PacletBuild["/Users/barry/Documents/Research/Code/PostNewtonianSelfForce"]
   ```
4. Update the [paclet server repository](https://github.com/BlackHolePerturbationToolkit/Pacletserver).
   1. Checkout the server repository and copy `build/PostNewtonialSelfForce-0.5.0.paclet` to the `Paclets` directory.
   2. Regenerate the index of available paclets:
      ```Mathematica
      PacletManager`BuildPacletSiteFiles["/Users/barry/Documents/Research/Projects/BHPT/pacletserver"]
      ```
   3. Commit and push changes.
5. Update pacletserver.bhptoolkit.org by pulling the repository on the server.
6. Create release on GitHub:
   1. Go to Releases page on GitHub repository website.
   2. Select "Draft a new release"
   3. Choose tag, e.g. "0.5.0".
   4. Select "Generate release notes", then edit as appropriate. In particular, you may want to copy the brief description of the paclet from previous releases.
   5. Attach paclet file but drag-dropping it to the page.
   5. Click "Publish realease"
7. A new version will automatically be published on Zenodo. Check the details in the new version are correct. In particular, things such as the title, ORCIDs and authors are not automatically carried over from previous versions and may need to be corrected.
