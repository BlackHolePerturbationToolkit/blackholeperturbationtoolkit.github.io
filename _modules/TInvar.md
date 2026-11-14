---
name: "TInvar"
requirements: xAct
---

## Overview

TInvar provides a set of functions for canonicalising expressions involving the Riemann
tensor, built on the [xAct](http://www.xact.es/) tensor algebra suite.

xAct's core canonicalisation function, `ToCanonical`, efficiently handles single-term
symmetries such as $R_{abcd} = -R_{bacd}$. The Riemann tensor also has multi-term symmetries
through the Bianchi identities, and `ToCanonical` cannot use those to canonicalise
expressions. TInvar adds that functionality through a new function, `RiemannSimplify`, which
uses the Bianchi identities to bring expressions into a fully canonical form.

A canonical form needs a basis in which to represent the expression. TInvar uses the basis of
independent Riemann monomials identified by Fulling, King, Wybourne and Cummins in
["Normal forms for tensor polynomials: I. The Riemann tensor"](https://doi.org/10.1088/0264-9381/9/5/003),
Class. Quantum Grav. **9**, 1151 (1992). Its elements are organised by order (number of
derivatives of the metric), degree (number of Riemann tensors) and rank (number of free
indices); that paper enumerated all basis elements up to order 12, degree 6 and rank 12.
TInvar takes an arbitrary Riemann polynomial and simplifies it into its normal form with
respect to this basis.

TInvar is based on the Invar and Invar2 packages
([Martín-García, Portugal & Manssur 2007](https://arxiv.org/abs/0704.1756);
[Martín-García, Yllanes & Portugal 2008](https://arxiv.org/abs/0802.1274)), which handle
scalar Riemann invariants. TInvar extends this to tensor expressions with free indices.

## Installation

To run this package you will need to first install [xAct](http://www.xact.es/).

TInvar is distributed as a Mathematica paclet. If you haven't done so already, add the
BHPToolkit paclet server and refresh the list of packages available:

```mathematica
PacletSiteRegister["https://pacletserver.bhptoolkit.org", "Black Hole Perturbation Toolkit Paclet Server"]
PacletSiteUpdate["https://pacletserver.bhptoolkit.org"]
```

Then install the package:

```mathematica
PacletInstall["TInvar"]
```

## Usage

Load the package and define a manifold, a metric $g_{ab}$ and its covariant derivative `CD`
with the usual xAct functions:

```mathematica
<< xAct`TInvar`

DefManifold[M, 4, IndexRange[a, f]];
DefMetric[-1, g[-a, -b], CD];
```

The package provides four main functions:

| Function | Purpose |
|---|---|
| `RiemannSimplify` | Simplify expressions involving the Riemann tensor |
| `InvSimplify` | Simplify expressions involving invariants |
| `RiemannToInv` | Convert Riemann tensors to their invariant form |
| `InvToRiemann` | Convert invariants to their explicit tensor expressions |

At the highest level, `RiemannSimplify` takes a tensor expression involving the Riemann
tensor and writes it in canonical form in terms of the Fulling et al. basis. For example, it
uses the first Bianchi identity to reduce the cyclic sum $R_{abcd} + R_{acdb} + R_{adbc}$ to
zero, which `ToCanonical` alone cannot do:

```mathematica
RiemannSimplify[RiemannCD[a, b, c, d] + RiemannCD[a, c, d, b] + RiemannCD[a, d, b, c]]
```

Internally, TInvar converts all expressions to an "invariant" format. You don't usually need
to know about this when using `RiemannSimplify`, but you can convert explicitly to and from
this format:

```mathematica
inv = RiemannToInv[RiemannCD[a, b, c, d] RiemannCD[-a, -b, -c, -d]]
InvToRiemann[inv]
```

`RiemannSimplify[expr]` is equivalent to `InvToRiemann[InvSimplify[RiemannToInv[expr]]]`.
The functions `RiemannToPerm`, `PermToRiemann`, `InvToPerm` and `PermToInv` convert
between Riemann tensors, canonical permutations and invariants.

See the [online documentation](https://bhptoolkit.org/TInvar/doc/html/guide/TInvar.html)
for the full list of functions. The same documentation is available in Mathematica's
Documentation Center: select Help → Wolfram Documentation and search for `TInvar`.

## Examples

The [TInvar tutorial](https://bhptoolkit.org/TInvar/doc/html/tutorial/TInvar.html) covers
basic usage and verifies well-known identities. It checks the 40 identities in the database
of the MathTensor package by Leonard Parker and Steven M. Christensen, and the identities of
Decanini and Folacci,
["FKWC-bases and geometrical identities for classical and quantum field theories in curved spacetime"](https://arxiv.org/abs/0805.1595).
For each identity it shows whether `ToCanonical` alone or `RiemannSimplify` shows it to vanish.
Many of them need the Bianchi identities.

## Authors and contributors

TInvar was created by Kevin Kiely, Barry Wardell, Adrian Ottewill and José M. Martín-García.

It is based on Invar and Invar2, which were created by José M. Martín-García, David Yllanes,
Renato Portugal and Leon Manssur.
