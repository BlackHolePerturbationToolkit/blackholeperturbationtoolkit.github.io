# Version control of Mathematica files with git

Create a `.gitattributes` file in your repository and include the following:
```gitconfig
# Source files
# Caution: *.m also matches Matlab files.
# ============
*.nb             text diff=mathematica
*.wls            text diff=mathematica
*.wl             text diff=mathematica
*.m              text diff=mathematica

# Test files
# ==========
*.wlt            text diff=mathematica
*.mt             text diff=mathematica

# Binary files
# ============
*.mx             binary
```

Add the following to your `~/.gitconfig`:
```gitconfig
[diff "mathematica"]
  binary = true
[difftool "mmadiff"]
  cmd=open -a Mathematica `mmadiff.wls \"$LOCAL\" \"$REMOTE\"`
```
Put the below code in a script file called `nbdiff.wls` and put it somewhere that it can be found (e.g. `/usr/local/bin/nbdiff.wls`). 
```mathematica
#!/usr/bin/env wolframscript
(* ::Package:: *)

Needs["AuthorTools`"];

UsingFrontEnd[
	nb = NotebookPut[NotebookDiff[$ScriptCommandLine[[2]], $ScriptCommandLine[[3]], IgnoreOptionDiffs->{CellID,CellLabel}]];
	file = CreateFile[];
	nbfile = file<>".nb";
	NotebookSave[nb, nbfile];
	NotebookClose[nb];
	DeleteFile[file];
]
Return[nbfile]
```
Now you can use git's difftool command to get a user-friendly list of changes in a Mathematica notebook:
```bash
git difftool -t mmadiff
```
