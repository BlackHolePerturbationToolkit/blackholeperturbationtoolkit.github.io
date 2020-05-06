{% include head.html %}

# Using gh-pages

Each repository can have a website associated with it using GitHubs gh-pages. This allows for websites to easily be built using Markdown.

```
$ git checkout --orphan gh-pages
# preview files to be deleted
$ git rm -rf --dry-run .
# actually delete the files
$ git rm -rf .
```

Then create `index.md`, commit and push. Each `.md` file should contain the following at the start:

```
---
layout: default
title: Black Hole Perturbation Toolkit
---
```

The BHPToolkit gh-pages is setup to use [MathJax](https://www.mathjax.org/). To enable this on a particular page put

```
{{ "{% include head.html %} " }}%}
```
At the top of the page

This means you can include equations in webpage by placing LaTeX between dollar signs. e.g., $a^2 + b^2 = c^2$.


# Previewing gh-pages locally

If you want to test changes to the gh-pages website before pushing them install Jekyll, navigate to the directory containing the site and execute `bundle exec jekyll serve`. You can now view the site at [http://localhost:4000](http://localhost:4000).

With Jekyll running locally every time you make a change to the source the site is regenerated. Once you are happy with the changes you can push them to the repository (note, the local Jekyll server will create an _sites directory that should not be added to the repository).