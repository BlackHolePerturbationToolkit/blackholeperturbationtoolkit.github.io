---
layout: default
title: Black Hole Perturbation Toolkit
---

# Version control of Mathematica notebooks with git

There are several problems with keeping Mathematica notebooks under version control with git, most notably:
- Small changes to a file often introduce significant changes throughout the file.
- The output of `git diff` is not very human readable when applied to Mathematica notebooks.

The following are some suggestions to make working with notebooks under version control more tolerable.

## Save notebooks in format suitable for version control

The [SaveReadableNotebook](https://resources.wolframcloud.com/FunctionRepository/resources/SaveReadableNotebook) resource converts the representation of a notebook within an nb file into one that is more suitable for keeping in version control.

If you are storing a notebook in a git repository, it is recommended that, before committing a new version of the notebook, you convert it to a readable format by running the following command from a separate notebook:
```Mathematica
ResourceFunction["SaveReadableNotebook"]["file.nb", "file.nb",
   "IndentSize" -> 0,
   "ExcludedCellOptions" -> {CellChangeTimes, ExpressionUUID, 
   CellLabel}]
```
where `file.nb` is the name of the notebook file.

## (Optional) Don't clutter `git diff` output with notebook diffs

It's possible to tell git to treat Mathematica notebooks as text files for the purpose of tracking changes (so that small changes only lead to small commits), but to make `git diff` treat them as binary so that it only shows them as having changed and doesn't give the largely unreadable text diffs. To do this, add the following to your `~/.gitconfig`:
```gitconfig
[diff "mathematica"]
  binary = true
```
Then, create a `.gitattributes` file in your git repository and include the following:
```gitconfig
# Mathematica notebooks
# ============
*.nb             text diff=mathematica

# Binary files
# ============
*.mx             binary
```
This solution is not essential if you use the `SaveReadableNotebook` function described above, but it may still be useful in some cases.

## Use Mathematica to show changes to a notebook in a human-readable form
As of version 14.1, Mathematica has a nice built-in `Diff` command that can be used to compare two notebooks. It's straightforward to hook this in with git through its `difftool` command (this is for macOS, you may need a slightly different `cmd=...` line if you are using Linux or Windows):
1. Add the following to your `~/.gitconfig`:
```gitconfig
[difftool "nbdiff"]
  cmd = open -a Wolfram `nbdiff.wls \"$LOCAL\" \"$REMOTE\" \"$MERGED\"`
```
2. Put the below code in a script file called `nbdiff.wls` and put it somewhere that it can be found (e.g. `/usr/local/bin/nbdiff.wls`). 

```Mathematica
#!/usr/bin/env wolframscript

UsingFrontEnd[
  With[{old = File[$ScriptCommandLine[[2]]], new = File[$ScriptCommandLine[[3]]], file = $ScriptCommandLine[[4]]}, {diff = Diff[old, new]},
    contents = {
	  TextCell["Notebook changes", "Section"],
	  TextCell["Showing changes for file: "<>file, "Text"],
	  ExpressionCell[Defer[changes = diff;], "Input", Editable -> False],
	  ExpressionCell[Defer[changes], "Input"],
	  ExpressionCell[diff, "Output"]};
	nb = CreateDocument[contents];
	tmpfile = CreateFile[];
	nbfile = tmpfile<>".nb";
	NotebookSave[nb, nbfile];
	NotebookClose[nb];
	FileDelete[tmpfile];
]];
Return[nbfile]
```

3. Use git's difftool command to get a user-friendly list of changes in a Mathematica notebook:
```bash
git difftool -t nbdiff
```

## Use Mathematica to perform git merges with notebooks
As of version 14.1, Mathematica has a nice built-in `Diff3` command that can be used to merge two sets of changes to a notebook. It's straightforward to hook this in with git through its `mergetool` command (this is for macOS, you may need a slightly different `cmd=...` line if you are using Linux or Windows):
1. Add the following to your `~/.gitconfig`:
```gitconfig
[mergetool "nbmerge"]
  cmd = open -a Wolfram `nbmerge.wls \"$BASE\" \"$LOCAL\" \"$REMOTE\" \"$MERGED\"`
```
2. Put the below code in a script file called `nbmerge.wls` and put it somewhere that it can be found (e.g. `/usr/local/bin/nbmerge.wls`). 

```Mathematica
#!/usr/bin/env wolframscript

UsingFrontEnd[
  With[{old = File[$ScriptCommandLine[[2]]], new1 = File[$ScriptCommandLine[[3]]], new2 = File[$ScriptCommandLine[[4]]], file = $ScriptCommandLine[[5]]}, {diff3 = Diff3[old, new1, new2]},
    contents = {
	  TextCell["Notebook changes", "Section"],
	  TextCell["Showing changes for file: "<>file, "Text"],
	  ExpressionCell[Defer[changes = diff3;], "Input", Editable -> False],
	  ExpressionCell[Defer[changes], "Input"],
	  ExpressionCell[diff3, "Output"],
	  TextCell["To apply these changes, run the line above and then run the following line: ", "Text"],
	  ExpressionCell[Defer[DiffApply[diff3, old, File[file], "Input"]};
	nb = CreateDocument[contents];
	tmpfile = CreateFile[];
	nbfile = tmpfile<>".nb";
	NotebookSave[nb, nbfile];
	NotebookClose[nb];
	FileDelete[tmpfile];
]];
Return[nbfile]
```

3. Use git's mergetool command to get merge the changes
```bash
git mergetool -t nbmerge
```
