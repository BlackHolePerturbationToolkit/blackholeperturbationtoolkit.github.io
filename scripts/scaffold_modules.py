#!/usr/bin/env python3
"""
Scaffold per-module documentation pages from _data/tools.yml.

Creates a stub _modules/<slug>.md for every tool that does not already have a
documentation page (matched by the front-matter `name`). Existing pages are
never touched unless you pass --force. Run it again whenever you add a tool.

    python scripts/scaffold_modules.py            # create missing stubs
    python scripts/scaffold_modules.py --force     # also overwrite existing

Requires PyYAML:  pip install pyyaml
"""

import argparse
import glob
import os
import re
import sys

try:
    import yaml
except ImportError:
    sys.exit("This script needs PyYAML. Install it with:  pip install pyyaml")

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
TOOLS = os.path.join(ROOT, "_data", "tools.yml")
MODDIR = os.path.join(ROOT, "_modules")

FENCE = {
    "Python": "python", "SageMath": "python", "Mathematica": "mathematica",
    "C/C++": "cpp", "Fortran": "fortran",
}

# Comment delimiters per code-fence language, for the placeholder snippet.
COMMENT = {
    "python": ("#", ""), "cpp": ("//", ""), "fortran": ("!", ""),
    "mathematica": ("(*", " *)"), "text": ("#", ""),
}


def slugify(text):
    s = text.lower().strip()
    s = re.sub(r"\s+", "-", s)
    s = re.sub(r"[^a-z0-9_-]", "", s)
    s = re.sub(r"-+", "-", s).strip("-")
    return s or "module"


def q(value):
    """Quote a YAML scalar safely (double-quoted, escaped)."""
    s = str(value).replace("\\", "\\\\").replace('"', '\\"')
    return '"' + re.sub(r"\s+", " ", s).strip() + '"'


def existing_pages():
    """Return (names_with_pages, used_slugs) from the current _modules dir."""
    names, slugs = set(), set()
    for path in glob.glob(os.path.join(MODDIR, "*.md")):
        slugs.add(os.path.splitext(os.path.basename(path))[0])
        try:
            head = open(path, encoding="utf-8").read().split("---", 2)
            if len(head) >= 3:
                fm = yaml.safe_load(head[1]) or {}
                if fm.get("name"):
                    names.add(fm["name"])
        except Exception:  # noqa: BLE001
            pass
    return names, slugs


def choose_slug(tool, used):
    base = slugify(tool["name"])
    if base not in used:
        return base
    repo_base = slugify(tool.get("repo", "").rstrip("/").split("/")[-1])
    if repo_base and repo_base not in used:
        return repo_base
    i = 2
    while f"{base}-{i}" in used:
        i += 1
    return f"{base}-{i}"


def install_block(tool):
    install = tool.get("install")
    lang = tool.get("lang", "")
    if install:
        fence = "mathematica" if "Paclet" in install else "bash"
        return f"Install with the command shown in the header:\n\n```{fence}\n{install}\n```"
    repo = tool.get("repo", "")
    if lang == "Mathematica":
        return ("Clone the repository, add it to your Mathematica ``$Path``, and load it "
                f"with ``Needs``. See the [repository README]({repo}) for details.")
    if lang in ("C/C++", "Fortran"):
        return ("Build from source — clone the repository and follow the dependency and "
                "build instructions in its README:\n\n"
                f"```bash\ngit clone {repo}\n```")
    return f"Install from the repository — see the [README]({repo}) for instructions."


def usage_section(tool):
    if tool.get("status") == "data":
        loader = ""
        if tool.get("lang") == "Mathematica":
            loader = ("\n\nThe repository includes a Mathematica package for loading and "
                      "manipulating the data:\n\n```mathematica\n(* see the repository for the "
                      "loader and dataset layout *)\n```")
        return ("## Accessing the data\n\n"
                "<!-- TODO: describe the dataset layout, formats and how to load it. -->\n"
                f"The data lives in the [repository]({tool.get('repo','')})." + loader)
    fence = FENCE.get(tool.get("lang", ""), "text")
    comment, close = COMMENT.get(fence, ("#", ""))
    return ("## Usage\n\n"
            "<!-- TODO: add a minimal, runnable example. -->\n\n"
            f"```{fence}\n{comment} example coming soon — see the repository for current usage{close}\n```")


def render(tool):
    name = tool["name"]
    fm = ["---", f"name: {q(name)}"]
    if tool.get("blurb"):
        fm.append(f"summary: {q(tool['blurb'])}")
    for key in ("lang", "domain", "status"):
        if tool.get(key):
            fm.append(f"{key}: {q(tool[key])}")
    if tool.get("repo"):
        fm.append(f"repo: {q(tool['repo'])}")
    if tool.get("url") and tool["url"] != tool.get("repo"):
        fm.append(f"docs: {q(tool['url'])}")
    if tool.get("install"):
        fm.append(f"install: {q(tool['install'])}")
    fm.append("---")

    repo = tool.get("repo", "")
    docs = tool.get("url")
    stub_links = f"the [source repository]({repo})"
    if docs and docs != repo:
        stub_links += f" and the [package page]({docs})"

    is_data = tool.get("status") == "data"
    install_md = "" if is_data else f"## Installation\n\n{install_block(tool)}\n\n"

    body = f"""
<!-- Scaffolded from _data/tools.yml. Replace the TODO sections with real
     documentation, then delete the stub notice below. -->

<div class="callout" markdown="1">
**Stub page.** Full documentation for {name} is in progress. For now, see {stub_links}.
</div>

## Overview

{tool.get('blurb', '')}.

<!-- TODO: expand — what it computes, key features, and related packages. -->

{install_md}{usage_section(tool)}

## Examples

<!-- TODO: link to worked examples or notebooks. -->
See the [repository]({repo}) for examples.
"""
    return "\n".join(fm) + "\n" + body


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--force", action="store_true", help="overwrite existing module pages")
    args = ap.parse_args()

    tools = yaml.safe_load(open(TOOLS, encoding="utf-8"))
    have_names, used_slugs = existing_pages()
    os.makedirs(MODDIR, exist_ok=True)

    created, skipped = [], []
    for tool in tools:
        if tool["name"] in have_names and not args.force:
            skipped.append(tool["name"])
            continue
        slug = choose_slug(tool, used_slugs)
        used_slugs.add(slug)
        have_names.add(tool["name"])
        path = os.path.join(MODDIR, slug + ".md")
        if os.path.exists(path) and not args.force:
            skipped.append(tool["name"])
            continue
        open(path, "w", encoding="utf-8").write(render(tool))
        created.append((tool["name"], slug))

    print(f"Created {len(created)} stub page(s):")
    for name, slug in created:
        print(f"  {name:34s} -> _modules/{slug}.md")
    if skipped:
        print(f"Skipped {len(skipped)} tool(s) that already have a page.")


if __name__ == "__main__":
    main()
