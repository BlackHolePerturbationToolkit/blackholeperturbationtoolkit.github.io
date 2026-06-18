/* Theme toggle, mobile nav, copy buttons, and the hero waveform. */
(function () {
  "use strict";

  /* ---- theme toggle ---- */
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  function setIcon() {
    if (!toggle) return;
    var dark = root.getAttribute("data-theme") !== "light";
    toggle.innerHTML = dark
      ? '<i class="ti ti-sun" aria-hidden="true"></i>'
      : '<i class="ti ti-moon" aria-hidden="true"></i>';
  }
  setIcon();
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("bhp-theme", next); } catch (e) {}
      setIcon();
    });
  }

  /* ---- mobile nav ---- */
  var navToggle = document.getElementById("nav-toggle");
  var navLinks = document.getElementById("nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  /* ---- copy-to-clipboard buttons ---- */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      navigator.clipboard.writeText(btn.getAttribute("data-copy")).then(function () {
        var prev = btn.innerHTML;
        btn.innerHTML = '<i class="ti ti-check" aria-hidden="true"></i>';
        setTimeout(function () { btn.innerHTML = prev; }, 1200);
      });
    });
  });

  /* ---- hero waveform: an eccentric extreme-mass-ratio inspiral ----
     Long, slowly chirping signal that sweeps up toward plunge, with
     periastron bursts from orbital eccentricity. The dominant (m=2) GW
     frequency follows the leading inspiral chirp f ~ (t_c - t)^(-3/8);
     eccentric sidebands at the radial frequency give the burst modulation,
     and the strain envelope grows like f^(2/3). */
  var path = document.getElementById("wave-path");
  if (path) {
    var W = 1000, mid = 60, N = 2600, tEnd = 0.99, e0 = 0.38, target = 60;
    var dt = tEnd / N;
    var f2 = [], fr = [], rawCycles = 0;
    for (var i = 0; i <= N; i++) {
      var t = (i / N) * tEnd, tau = 1 - t;
      var freq = Math.pow(tau, -0.375) * (1 + 0.7 * Math.pow(t, 5)); // chirp + plunge sweep
      var k = 5.5 + 4 * t;                         // periastron advance: f2/fr grows
      f2.push(freq); fr.push(freq / k);
      rawCycles += freq * dt;
    }
    var sc = target / rawCycles, f0 = f2[0] * sc;
    var phi2 = 0, phir = 0, h = [], maxAbs = 0;
    for (i = 0; i <= N; i++) {
      var tt = (i / N) * tEnd, ec = e0 * (0.45 + 0.55 * (1 - tt));
      var amp = Math.pow(f2[i] * sc / f0, 0.6667); // strain ~ f^(2/3)
      var env = 1 + 2 * ec * Math.cos(phir) + 0.9 * ec * ec * Math.cos(2 * phir);
      var hi = amp * env * Math.sin(phi2);
      h.push(hi);
      if (Math.abs(hi) > maxAbs) maxAbs = Math.abs(hi);
      phi2 += 2 * Math.PI * f2[i] * sc * dt;
      phir += 2 * Math.PI * fr[i] * sc * dt;
    }
    var A = 50 / maxAbs, d = "";
    for (i = 0; i <= N; i++) {
      var px = ((i / N) * W).toFixed(1);
      var py = (mid - A * h[i]).toFixed(1);
      d += (i === 0 ? "M" : "L") + px + " " + py + " ";
    }
    path.setAttribute("d", d.trim());

    var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      var len = path.getTotalLength();
      path.style.strokeDasharray = len;
      path.style.strokeDashoffset = len;
      path.getBoundingClientRect();
      path.style.transition = "stroke-dashoffset 1.8s cubic-bezier(.4,0,.2,1)";
      path.style.strokeDashoffset = "0";
    }
  }
})();
