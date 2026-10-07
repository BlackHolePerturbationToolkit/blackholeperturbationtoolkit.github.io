---
name: "GeneralRelativityTensors"
---

## Overview

GeneralRelativityTensors is a Mathematica package that provides a set of functions for performing
coordinate-based tensor calculations, with a focus on general relativity and black holes in particular.

Its main features include:

- built-in metrics in their standard coordinates (Minkowski, Schwarzschild, Kerr, Reissner–Nordström,
  Kerr–Newman, the two-sphere, and the $\mathcal{M}^2 \times \mathcal{S}^2$ sectors of spherically
  symmetric spacetimes), as well as user-defined metrics;
- tensors with abstract indices that are raised and lowered automatically using the associated metric;
- tensor algebra (sums, products, contractions) and partial and covariant derivatives;
- built-in curvature tensors (Christoffel symbols, Riemann, Ricci, Einstein, Weyl and Cotton tensors,
  Kretschmann scalar, Bianchi identities), electromagnetic quantities, and Newman–Penrose objects
  (Kinnersley null tetrad and spin coefficients);
- tensors defined along curves, such as the four-velocity of a geodesic;
- caching of computed tensor values.

The package has extensive documentation and tutorials in the Mathematica Documentation Centre.

## Installation

GeneralRelativityTensors is distributed as a paclet. Once the BHPToolkit paclet server is set
up (see [Get started]({{ '/get-started/' | relative_url }})), install it by name:

```mathematica
PacletSiteRegister["https://pacletserver.bhptoolkit.org", "Black Hole Perturbation Toolkit Paclet Server"]
PacletSiteUpdate["https://pacletserver.bhptoolkit.org"]
PacletInstall["GeneralRelativityTensors"]
```

Alternatively, the latest development version can be obtained by cloning the
[repository](https://github.com/BlackHolePerturbationToolkit/GeneralRelativityTensors) and placing it
somewhere on Mathematica's `$Path` (e.g. `~/Library/Mathematica/Applications/` on macOS or
`~/.Mathematica/Applications/` on Linux).

## Usage

### Loading the package

```mathematica
<< GeneralRelativityTensors`
```

Below we give a few simple examples of the package in action.

### Defining the metric

All calculations using GeneralRelativityTensors require a metric with explicit values. You can define
your own metric, and there is also a range of useful built-in metrics, e.g.

```mathematica
g = ToMetric["Kerr"]
```

Other built-in metrics include `"Minkowski"`, `"MinkowskiSpherical"`, `"Schwarzschild"`,
`"ReissnerNordstrom"`, `"KerrNewman"` and `"TwoSphere"` (see the documentation of `ToMetric` for the full
list). Built-in four-dimensional metrics use Schwarzschild or Boyer–Lindquist coordinates and lower-case
Greek indices.

To view the components of any tensor use the `TensorValues` function. For example, with the metric defined
above, `TensorValues[g]` returns

$$
\left(
\begin{array}{cccc}
 \frac{a^2 \sin ^2(\theta )-a^2+2 M r-r^2}{a^2 \cos ^2(\theta )+r^2} & 0 & 0 & -\frac{2 a
   M r \sin ^2(\theta )}{a^2 \cos ^2(\theta )+r^2} \\
 0 & \frac{a^2 \cos ^2(\theta )+r^2}{a^2-2 M r+r^2} & 0 & 0 \\
 0 & 0 & a^2 \cos ^2(\theta )+r^2 & 0 \\
 -\frac{2 a M r \sin ^2(\theta )}{a^2 \cos ^2(\theta )+r^2} & 0 & 0 & \frac{\sin
   ^2(\theta ) \left(\left(a^2+r^2\right)^2-a^2 \sin ^2(\theta ) \left(a^2-2 M
   r+r^2\right)\right)}{a^2 \cos ^2(\theta )+r^2} \\
\end{array}
\right) \nonumber
$$

A custom metric is defined by giving a name (and optionally a display name), the coordinates, the
components and the set of index symbols to use (`"Latin"`, `"CapitalLatin"`, `"Greek"` or an explicit
list of symbols):

```mathematica
{% raw %}newMetVals = {{-f[x, y], 0, 0}, {0, h[x, y] x^2, x y h[x, y]}, {0, x y h[x, y], h[x, y] x^2}};{% endraw %}
g3 = ToMetric[{"NewMetric", "gnew"}, {t, x, y}, newMetVals, "Latin"]
```

### Defining tensors

The real power of the package comes from forming and manipulating tensors. Tensors are created using
`ToTensor`. A few things to note:

- Tensors must be defined with an associated metric, so that indices can be raised or lowered.
- Negative indices are covariant, while positive indices are contravariant.

The following defines a covector $t_\alpha$ on the Kerr metric $g$ above, with components that are
functions of $r$:

```mathematica
t1 = ToTensor[{"NewTensor", "t"}, g, {f1[r], f2[r], f3[r], f4[r]}, {-α}]
```

The contravariant version, $t^\alpha$, is obtained with `t1[α]`, and individual components with, e.g.,
`t1[-r]`. As with the metric, the values of any tensor can be computed explicitly using `TensorValues`.

### Common tensors

Many common tensors are built in. For instance

```mathematica
ChristoffelSymbol[g, "ActWith" -> Simplify]
```

computes the Christoffel symbols $\Gamma^\alpha{}\_{\beta\gamma}$. The `"ActWith"` option applies the given
function (here `Simplify`) to each component before returning the result. Other built-in tensors include
`RiemannTensor`, `RicciTensor`, `RicciScalar`, `EinsteinTensor`, `WeylTensor`, `CottonTensor`,
`KretschmannScalar`, `BianchiIdentities`, `MaxwellPotential`, `FieldStrengthTensor`,
`MaxwellStressEnergyTensor`, `FourVelocityVector`, `KinnersleyNullTetrad` and `SpinCoefficient`.

### Merging tensors

Another way to construct tensors is by merging other tensors using `MergeTensors`. For example, the
Einstein tensor can be constructed from the Ricci tensor, the Ricci scalar and the metric:

```mathematica
g = ToMetric["Schwarzschild"];
ricT = RicciTensor[g];
ricS = RicciScalar[g];
einExpr = ricT[-α, -β] - g[-α, -β] ricS/2
```

`einExpr` is not yet a tensor, but rather a sum and product of three different tensors. These can be
combined into a single tensor with `MergeTensors`:

```mathematica
einS = MergeTensors[einExpr, {"EinsteinSchwarzschild", "G"}, "ActWith" -> Simplify]
```

This returns $G\_{\alpha\beta}$. You can then explicitly check that the Schwarzschild solution is a vacuum
solution: `TensorValues[einS]` returns

```mathematica
{% raw %}{{0, 0, 0, 0}, {0, 0, 0, 0}, {0, 0, 0, 0}, {0, 0, 0, 0}}{% endraw %}
```

### Covariant derivatives and curves

`CovariantD` returns the covariant derivative of a tensor expression (as a sum and product of tensors, which
can be combined with `MergeTensors`). Tensors can also be defined along a curve; for example
`FourVelocityVector["SchwarzschildGeneric"]` gives the four-velocity of a generic worldline in Schwarzschild,
and the geodesic equation follows from its covariant derivative along itself:

```mathematica
uS = FourVelocityVector["SchwarzschildGeneric"];
covDuS = CovariantD[uS, uS];
TensorValues@MergeTensors[covDuS, "ActWith" -> Simplify]
```

## Examples

The above just scratches the surface of what the package can do. The Mathematica Documentation Centre
contains reference pages for every function and tutorials covering:

- Introduction to GeneralRelativityTensors
- Introduction to Tensor Curves
- Manipulating and differentiating Tensors
- Built-in common Tensors
- Caching Tensor values
- Pattern matching with Tensors
- Examples – Wave equations

## Authors and contributors

**Seth Hopper**, Barry Wardell
