---
layout: default
title: Black Hole Perturbation Toolkit
---

# Cleaning Mathematica notebooks for inclusion in git repositories

The following function can be run to clean parts of a Mathematica notebook which make it difficult
to maintain in version control.

```Mathematica
CleanNotebook[file_] := Module[{nb, contents, newcontents},
   nb = NotebookOpen[file];
   SetOptions[nb, "TrackCellChangeTimes" -> False, 
    PrivateNotebookOptions -> {"FileOutlineCache" -> False}];
   contents = NotebookGet[nb];
   newcontents = 
    contents /. {(CellChangeTimes -> _) -> 
       Sequence[], (CellTags -> _) -> Sequence[]};
   NotebookPut[newcontents, nb];
   NotebookSave[nb];
   NotebookClose[nb];
   ];
```
