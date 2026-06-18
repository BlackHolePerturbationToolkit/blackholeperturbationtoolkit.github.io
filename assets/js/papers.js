/* Publications page: filter the list and draw the citation curve. */
(function () {
  "use strict";

  /* ---- list filtering ---- */
  var list = document.getElementById("pub-list");
  if (list) {
    var rows = Array.prototype.slice.call(list.querySelectorAll(".pub-row"));
    var search = document.getElementById("pub-search");
    var yearSel = document.getElementById("pub-year");
    var contribOnly = document.getElementById("pub-contrib");
    var empty = document.getElementById("pub-empty");
    var count = document.getElementById("pub-count");

    function apply() {
      var q = search ? search.value.trim().toLowerCase() : "";
      var yr = yearSel ? yearSel.value : "all";
      var co = contribOnly ? contribOnly.checked : false;
      var shown = 0;
      rows.forEach(function (row) {
        var hay = (row.getAttribute("data-search") || "").toLowerCase();
        var rowYear = row.getAttribute("data-year");
        var contributed = row.getAttribute("data-contributed") === "true";
        var ok = (!q || hay.indexOf(q) !== -1) &&
                 (yr === "all" || rowYear === yr) &&
                 (!co || contributed);
        row.style.display = ok ? "" : "none";
        if (ok) shown++;
      });
      if (empty) empty.style.display = shown ? "none" : "block";
      if (count) count.textContent = shown + (shown === 1 ? " paper" : " papers");
    }
    [search].forEach(function (el) { if (el) el.addEventListener("input", apply); });
    [yearSel, contribOnly].forEach(function (el) { if (el) el.addEventListener("change", apply); });
    apply();
  }

  /* ---- citation curve (lightweight inline SVG, no dependencies) ---- */
  var holder = document.getElementById("cite-chart");
  if (!holder) return;
  var data;
  try { data = JSON.parse(holder.getAttribute("data-points")); } catch (e) { return; }
  if (!data || !data.length) return;

  var css = getComputedStyle(document.documentElement);
  var accent = css.getPropertyValue("--accent").trim() || "#38d6c4";
  var violet = css.getPropertyValue("--violet").trim() || "#a78bfa";
  var muted = css.getPropertyValue("--text-faint").trim() || "#5b6884";

  var W = 920, H = 300, padL = 44, padR = 16, padT = 16, padB = 34;
  var maxY = Math.max.apply(null, data.map(function (d) { return d.total; }));
  var niceMax = Math.ceil(maxY / 50) * 50;

  function x(i) { return padL + (i / (data.length - 1)) * (W - padL - padR); }
  function y(v) { return H - padB - (v / niceMax) * (H - padT - padB); }

  function line(key) {
    return data.map(function (d, i) { return (i ? "L" : "M") + x(i).toFixed(1) + " " + y(d[key]).toFixed(1); }).join(" ");
  }
  function area(key) {
    return line(key) + " L" + x(data.length - 1).toFixed(1) + " " + y(0) + " L" + x(0).toFixed(1) + " " + y(0) + " Z";
  }

  var gridLines = "", labels = "";
  for (var g = 0; g <= niceMax; g += niceMax / 4) {
    var gy = y(g).toFixed(1);
    gridLines += '<line x1="' + padL + '" y1="' + gy + '" x2="' + (W - padR) + '" y2="' + gy + '" stroke="' + muted + '" stroke-opacity="0.18"/>';
    labels += '<text x="' + (padL - 8) + '" y="' + (parseFloat(gy) + 4) + '" text-anchor="end" fill="' + muted + '" font-size="12" font-family="monospace">' + g + "</text>";
  }
  var xlabels = "";
  data.forEach(function (d, i) {
    if (d.date.slice(5, 7) === "01") {   // label at each January boundary
      xlabels += '<text x="' + x(i).toFixed(1) + '" y="' + (H - padB + 20) + '" text-anchor="middle" fill="' + muted + '" font-size="11" font-family="monospace">' + d.date.slice(0, 4) + "</text>";
    }
  });

  holder.innerHTML =
    '<svg viewBox="0 0 ' + W + " " + H + '" width="100%" role="img" aria-label="Cumulative citations to the Toolkit over time">' +
      '<defs><linearGradient id="fillA" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="' + accent + '" stop-opacity="0.22"/>' +
        '<stop offset="1" stop-color="' + accent + '" stop-opacity="0"/>' +
      "</linearGradient></defs>" +
      gridLines + labels + xlabels +
      '<path d="' + area("total") + '" fill="url(#fillA)"/>' +
      '<path d="' + line("total") + '" fill="none" stroke="' + accent + '" stroke-width="2.4" stroke-linejoin="round"/>' +
      '<path d="' + line("contributed") + '" fill="none" stroke="' + violet + '" stroke-width="2.4" stroke-linejoin="round" stroke-dasharray="2 5" stroke-linecap="round"/>' +
    "</svg>";
})();
