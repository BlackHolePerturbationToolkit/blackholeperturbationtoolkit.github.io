#!/usr/bin/env python3
"""
Regenerate the logo and favicon assets from the orbital geometry.

The logomark reproduces the project's original favicon: an eccentric geodesic
orbit shown at two periastron-precession phases (two ellipses sharing a common
focus), with the central black hole sitting at that shared focus. The black
hole is drawn as a dark disc ringed by a bright photon ring so it reads at any
size and on any background. Rethemed to the observatory palette (teal orbits,
gold ring); a faithful red variant is also emitted.

Writes to the site root, _includes/ and assets/img/:
    favicon.svg  favicon.ico  favicon-32x32.png  favicon-16x16.png
    apple-touch-icon.png  _includes/logo.html
    assets/img/logo.svg  assets/img/logo-lockup.svg  assets/img/logo-red.svg

    python scripts/generate_logo.py        # requires: pip install cairosvg pillow

Edit the ORBIT PARAMETERS below to reshape the mark everywhere at once.
"""

import io
import math
import os
import sys

try:
    import cairosvg
    from PIL import Image
except ImportError:
    sys.exit("This script needs cairosvg and pillow:  pip install cairosvg pillow")

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
IMG = os.path.join(ROOT, "assets", "img")
INC = os.path.join(ROOT, "_includes")

# --- ORBIT PARAMETERS ----------------------------------------------------- #
ECC = 0.65          # orbital eccentricity
PRECESS = 56        # periastron precession between the two drawn orbits (deg)
ORIENT = 66         # overall orientation of periastron (deg)
VIEW = 100          # viewBox size
PAD = 10            # padding inside the viewBox
STROKE = 7.2        # orbit stroke width
BH_R = 7.4          # black-hole disc radius
RING_R = 10.6       # photon-ring radius
RING_W = 3.0        # photon-ring stroke

# --- theme colours -------------------------------------------------------- #
TEAL, GOLD = "#38d6c4", "#fbbf24"
TEAL_D, INK_LIGHT = "#0c8d7e", "#0e1626"   # light-theme orbits / ink
RED, BH_DARK = "#e21b1b", "#05080f"
BG, INK = "#0b1020", "#e9eef9"


def _orbits():
    a = 1.0
    p = a * (1 - ECC * ECC)
    omegas = [math.radians(ORIENT - PRECESS / 2), math.radians(ORIENT + PRECESS / 2)]
    raw, allpts = [], []
    for om in omegas:
        pts = []
        for i in range(261):
            th = 2 * math.pi * i / 260
            r = p / (1 + ECC * math.cos(th - om))
            pts.append((r * math.cos(th), -r * math.sin(th)))
        raw.append(pts)
        allpts += pts
    xs = [x for x, y in allpts]
    ys = [y for x, y in allpts]
    s = (VIEW - 2 * PAD) / max(max(xs) - min(xs), max(ys) - min(ys))
    cx, cy = (min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2

    def tf(x, y):
        return ((x - cx) * s + VIEW / 2, (y - cy) * s + VIEW / 2)

    paths = ["M" + " L".join(f"{X:.2f} {Y:.2f}" for X, Y in (tf(x, y) for x, y in pts)) + " Z"
             for pts in raw]
    return paths, tf(0, 0)


PATHS, (FX, FY) = _orbits()


def mark(orbit, ring, bh, bg=None, rx_bg=22):
    bgrect = (f'<rect width="{VIEW}" height="{VIEW}" rx="{rx_bg}" fill="{bg}"/>' if bg else "")
    orbits = "".join(f'<path d="{d}"/>' for d in PATHS)
    ringel = (f'<circle cx="{FX:.2f}" cy="{FY:.2f}" r="{RING_R}" fill="none" '
              f'stroke="{ring}" stroke-width="{RING_W}"/>' if ring else "")
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VIEW} {VIEW}">'
            f'{bgrect}'
            f'<g fill="none" stroke="{orbit}" stroke-width="{STROKE}" stroke-linejoin="round">{orbits}</g>'
            f'<circle cx="{FX:.2f}" cy="{FY:.2f}" r="{BH_R}" fill="{bh}"/>'
            f'{ringel}</svg>')


def inline(css_class=None):
    cls = f' class="{css_class}"' if css_class else ""
    a11y = ' role="img" aria-hidden="true" focusable="false"' if css_class else ""
    orbits = "".join(f'<path d="{d}"/>' for d in PATHS)
    return (f'<svg{cls}{a11y} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VIEW} {VIEW}" fill="none">'
            f'<g stroke="currentColor" stroke-width="{STROKE}" stroke-linejoin="round">{orbits}</g>'
            f'<circle cx="{FX:.2f}" cy="{FY:.2f}" r="{BH_R}" fill="var(--logo-bh, #05080f)"/>'
            f'<circle class="bh-ring" cx="{FX:.2f}" cy="{FY:.2f}" r="{RING_R}" stroke="var(--gold, #fbbf24)" '
            f'stroke-width="{RING_W}"/></svg>')


def lockup(orbit, bh, ink, accent, ring=None):
    orbits = "".join(f'<path d="{d}"/>' for d in PATHS)
    ringel = (f'<circle cx="{FX:.2f}" cy="{FY:.2f}" r="{RING_R}" fill="none" '
              f'stroke="{ring}" stroke-width="{RING_W}"/>' if ring else "")
    g = (f'<g transform="translate(8,18) scale(0.64)">'
         f'<g fill="none" stroke="{orbit}" stroke-width="{STROKE}" stroke-linejoin="round">{orbits}</g>'
         f'<circle cx="{FX:.2f}" cy="{FY:.2f}" r="{BH_R}" fill="{bh}"/>'
         f'{ringel}</g>')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 100" '
            f'font-family="\'Space Grotesk\',sans-serif">{g}'
            f'<text x="92" y="62" font-size="38" font-weight="600" letter-spacing="-0.5">'
            f'<tspan fill="{ink}">BHP</tspan><tspan fill="{accent}">Toolkit</tspan></text></svg>')


def png(svg, size):
    data = cairosvg.svg2png(bytestring=svg.encode(), output_width=size, output_height=size)
    return Image.open(io.BytesIO(data)).convert("RGBA")


def main():
    os.makedirs(IMG, exist_ok=True)
    # favicon / app icon: red orbits on white, solid dark black-hole dot (no ring —
    # it isn't needed for contrast on white). Header & lockups stay teal/theme-adaptive.
    FAVICON_ORBIT, FAVICON_BG = RED, "#ffffff"
    icon = mark(orbit=FAVICON_ORBIT, ring=None, bh=BH_DARK, bg=FAVICON_BG)
    open(os.path.join(ROOT, "favicon.svg"), "w").write(icon)
    png(icon, 32).save(os.path.join(ROOT, "favicon-32x32.png"))
    png(icon, 16).save(os.path.join(ROOT, "favicon-16x16.png"))
    png(mark(orbit=FAVICON_ORBIT, ring=None, bh=BH_DARK, bg=FAVICON_BG, rx_bg=0), 180).save(
        os.path.join(ROOT, "apple-touch-icon.png"))
    png(icon, 256).save(os.path.join(ROOT, "favicon.ico"),
                        sizes=[(16, 16), (24, 24), (32, 32), (48, 48), (64, 64)])
    open(os.path.join(INC, "logo.html"), "w").write(inline(css_class="logo-mark") + "\n")
    open(os.path.join(IMG, "logo.svg"), "w").write(inline())
    open(os.path.join(IMG, "logo-lockup.svg"), "w").write(
        lockup(TEAL, BH_DARK, INK, TEAL, ring=GOLD))            # dark: with ring
    open(os.path.join(IMG, "logo-lockup-light.svg"), "w").write(
        lockup(TEAL_D, INK_LIGHT, INK_LIGHT, TEAL_D))           # light: no ring
    open(os.path.join(IMG, "logo-red.svg"), "w").write(mark(orbit=RED, ring="#111111", bh="#111111"))
    print("Regenerated favicon + logo assets (precessing eccentric orbits).")
    print(f"  focus at ({FX:.1f}, {FY:.1f}) in {VIEW}x{VIEW} viewBox")


if __name__ == "__main__":
    main()
