/* Build an "on this page" table of contents from the module body headings,
   and highlight the current section while scrolling. */
(function () {
  "use strict";
  var toc = document.getElementById("toc");
  var body = document.querySelector(".module-body");
  if (!toc || !body) return;

  var headings = Array.prototype.slice.call(body.querySelectorAll("h2[id], h3[id]"));
  if (!headings.length) { toc.style.display = "none"; return; }

  var title = document.createElement("p");
  title.className = "toc-title";
  title.textContent = "On this page";
  toc.appendChild(title);

  var links = {};
  headings.forEach(function (h) {
    var a = document.createElement("a");
    a.href = "#" + h.id;
    a.textContent = h.textContent;
    if (h.tagName === "H3") a.className = "lvl-3";
    a.addEventListener("click", function (e) {
      e.preventDefault();
      h.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", "#" + h.id);
    });
    toc.appendChild(a);
    links[h.id] = a;
  });

  if (!("IntersectionObserver" in window)) return;
  var current = null;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        if (current) current.classList.remove("active");
        current = links[entry.target.id];
        if (current) current.classList.add("active");
      }
    });
  }, { rootMargin: "0px 0px -75% 0px", threshold: 0 });

  headings.forEach(function (h) { observer.observe(h); });
})();
