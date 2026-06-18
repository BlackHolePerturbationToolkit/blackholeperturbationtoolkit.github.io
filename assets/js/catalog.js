/* Tool catalogue: filter cards by domain pill + free-text search. */
(function () {
  "use strict";
  var grid = document.getElementById("tool-grid");
  if (!grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll(".card"));
  var pills = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));
  var searchEl = document.getElementById("tool-search");
  var emptyEl = document.getElementById("tool-empty");
  var countEl = document.getElementById("tool-count");

  var activeFilter = "all";
  var query = "";

  function apply() {
    var shown = 0;
    cards.forEach(function (card) {
      var domain = card.getAttribute("data-domain");
      var lang = (card.getAttribute("data-lang") || "").toLowerCase();
      var status = (card.getAttribute("data-status") || "").toLowerCase();
      var haystack = (card.getAttribute("data-search") || "").toLowerCase();

      var matchFilter =
        activeFilter === "all" ||
        domain === activeFilter ||
        lang === activeFilter ||
        status === activeFilter;
      var matchQuery = !query || haystack.indexOf(query) !== -1;

      var show = matchFilter && matchQuery;
      card.style.display = show ? "" : "none";
      if (show) shown++;
    });
    if (emptyEl) emptyEl.style.display = shown ? "none" : "block";
    if (countEl) countEl.textContent = shown + (shown === 1 ? " tool" : " tools");
  }

  pills.forEach(function (pill) {
    pill.addEventListener("click", function () {
      pills.forEach(function (p) { p.classList.remove("active"); p.setAttribute("aria-pressed", "false"); });
      pill.classList.add("active");
      pill.setAttribute("aria-pressed", "true");
      activeFilter = pill.getAttribute("data-filter");
      apply();
    });
  });

  if (searchEl) {
    searchEl.addEventListener("input", function () {
      query = searchEl.value.trim().toLowerCase();
      apply();
    });
  }

  // If the page was opened with a #domain hash (from the homepage tiles),
  // activate that filter on load.
  function applyHash() {
    var h = (location.hash || "").replace("#", "");
    if (!h) return;
    var pill = document.querySelector('[data-filter="' + h + '"]');
    if (pill) pill.click();
  }
  window.addEventListener("hashchange", applyHash);
  applyHash();

  apply();
})();
