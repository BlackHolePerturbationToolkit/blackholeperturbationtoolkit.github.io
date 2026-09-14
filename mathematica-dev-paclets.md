---
layout: page
title: Creating Paclets for Mathematica packages
---

{% include head.html %}


The Mathematica packages in the toolkit are all distributed to users using the [Paclet](https://reference.wolfram.com/language/guide/Paclets.html) system. This is described in detail in a [notebook](https://www.wolframcloud.com/obj/tgayley/Published/PacletDevelopment.nb) and [introductory video](https://www.wolfram.com/broadcast/video.php?sx=paclet&v=2833) by Todd Gayley, the creater of the Paclet system. Below is a brief description of the steps required to build paclets for release by the toolkit. This is based on creating release version 1.1.0 of the SpinWeightedSpheroidalHarmonics package. The instructions should be adjusted in the obvious way for different versions and packages. 

1. Update version number in `PacletInfo.wl` and `CITATION.cff`. All paclets should have a unique version number. When multiple versions are installed, the version loaded by Mathematica will typically be the one with the largest version number.
2. Run the documentation notebooks so that output is generated. You should not commit the changes to these notebooks.
4. Create the paclet, from within Mathematica:
   ```Mathematica
   << PacletTools`
   PacletBuild["/Users/barry/Documents/Research/Code/SpinWeightedSpheroidalHarmonics"]
   ```
5. Test the packet by installing it locally:
   ```Mathematica
   PacletInstall["/Users/barry/Documents/Research/Code/SpinWeightedSpheroidalHarmonics/build/SpinWeightedSpheroidalHarmonics-1.1.0.paclet"]
   ```
   Check everything works as it should, documentation appears correctly, etc.
6. Tag the version in git: `git tag 1.1.0 && git push --tags`
7. Update the [paclet server repository](https://github.com/BlackHolePerturbationToolkit/Pacletserver).
   1. Checkout the server repository and copy `build/SpinWeightedSpheroidalHarmonics-1.1.0.paclet` to the `Paclets` directory.
   2. Regenerate the index of available paclets:
      ```Mathematica
      PacletManager`BuildPacletSiteFiles["/Users/barry/Documents/Research/Projects/BHPT/pacletserver"]
      ```
   3. Commit and push changes.
8. Update pacletserver.bhptoolkit.org by pulling the repository on the server.
9. Create release on GitHub:
   1. Go to Releases page on GitHub repository website.
   2. Select "Draft a new release"
   3. Choose tag, e.g. "1.1.0".
   4. Select "Generate release notes", then edit as appropriate. In particular, you may want to copy the brief description of the paclet from previous releases.
   5. Attach paclet file by drag-dropping it to the page.
   5. Click "Publish release"
10. A new version will automatically be published on Zenodo with details extracted from `CITATION.cff`. Check the details in the new version are correct.
