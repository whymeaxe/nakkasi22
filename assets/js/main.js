/**
 * NAKKASI — shared site behaviour
 * Handles: mobile nav, toast feedback, product filtering + search,
 * newsletter form submission, and the teak-monolith CTA/sticky bar.
 *
 * This runs on every page. Each section checks for the elements it
 * needs, so it's safe to include on pages that don't have them.
 */
(function () {
  "use strict";

  /* -----------------------------------------------------------
   * Toast — lightweight feedback for actions that don't navigate
   * --------------------------------------------------------- */
  function showToast(message) {
    var existing = document.getElementById("site-toast");
    if (existing) existing.remove();

    var toast = document.createElement("div");
    toast.id = "site-toast";
    toast.textContent = message;
    toast.style.cssText = [
      "position:fixed", "left:50%", "bottom:32px", "transform:translate(-50%, 20px)",
      "background:#1b1c1c", "color:#fbf9f8", "padding:14px 28px", "border-radius:999px",
      "font-family:'Plus Jakarta Sans', sans-serif", "font-size:14px", "letter-spacing:0.02em",
      "z-index:9999", "opacity:0", "transition:opacity .3s ease, transform .3s ease",
      "box-shadow:0 10px 30px rgba(0,0,0,.2)", "max-width:90vw", "text-align:center"
    ].join(";");
    document.body.appendChild(toast);

    requestAnimationFrame(function () {
      toast.style.opacity = "1";
      toast.style.transform = "translate(-50%, 0)";
    });

    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      toast.style.opacity = "0";
      toast.style.transform = "translate(-50%, 20px)";
      setTimeout(function () { toast.remove(); }, 300);
    }, 2600);
  }

  /* -----------------------------------------------------------
   * Mobile navigation overlay
   * Built from whatever links live in #nav-links, so it always
   * matches the current page's desktop nav.
   * --------------------------------------------------------- */
  function initMobileMenu() {
    var menuBtn = document.getElementById("menu-toggle");
    var navLinks = document.getElementById("nav-links");
    if (!menuBtn || !navLinks) return;

    var overlay = document.createElement("div");
    overlay.id = "mobile-menu-overlay";
    overlay.style.cssText = [
      "position:fixed", "inset:0", "background:#fbf9f8", "z-index:100",
      "display:flex", "flex-direction:column", "align-items:center", "justify-content:center",
      "gap:32px", "opacity:0", "pointer-events:none", "transition:opacity .3s ease"
    ].join(";");

    var closeBtn = document.createElement("button");
    closeBtn.setAttribute("aria-label", "Close menu");
    closeBtn.className = "material-symbols-outlined";
    closeBtn.textContent = "close";
    closeBtn.style.cssText = "position:absolute;top:32px;right:32px;font-size:32px;color:#1b1c1c;background:none;border:0;";
    overlay.appendChild(closeBtn);

    var linkWrap = document.createElement("div");
    linkWrap.style.cssText = "display:flex;flex-direction:column;align-items:center;gap:28px;";
    var links = navLinks.querySelectorAll("a");
    links.forEach(function (a) {
      var clone = a.cloneNode(true);
      clone.style.fontSize = "28px";
      clone.style.fontFamily = "'Bodoni Moda', serif";
      clone.style.color = "#1b1c1c";
      linkWrap.appendChild(clone);
    });
    overlay.appendChild(linkWrap);
    document.body.appendChild(overlay);

    function open() {
      overlay.style.opacity = "1";
      overlay.style.pointerEvents = "auto";
      document.body.style.overflow = "hidden";
    }
    function close() {
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
      document.body.style.overflow = "";
    }

    menuBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });
    linkWrap.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* Shopping bag is handled by cart.js (real add/remove/qty drawer) */

  /* -----------------------------------------------------------
   * Placeholder links (legal/social pages not yet built)
   * Anything still pointing at "#" gets a friendly stub message
   * instead of silently doing nothing or jumping to top of page.
   * --------------------------------------------------------- */
  function initStubLinks() {
    document.querySelectorAll('a[href="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        showToast(a.textContent.trim() + " — page coming soon.");
      });
    });
  }

  /* -----------------------------------------------------------
   * Collection page: category filter + live search
   * --------------------------------------------------------- */
  function initCollectionFilters() {
    var grid = document.getElementById("product-grid");
    var filterBar = document.getElementById("filter-bar");
    if (!grid || !filterBar) return;

    var cards = Array.prototype.slice.call(grid.querySelectorAll(".product-card"));
    var noResults = document.getElementById("no-results");
    var searchInput = document.getElementById("search-input");
    var activeFilter = "all";

    function applyFilters() {
      var query = (searchInput && searchInput.value || "").trim().toLowerCase();
      var visibleCount = 0;
      cards.forEach(function (card) {
        var matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
        var matchesSearch = !query || (card.dataset.name || "").toLowerCase().indexOf(query) !== -1;
        var show = matchesFilter && matchesSearch;
        card.style.display = show ? "" : "none";
        if (show) visibleCount++;
      });
      if (noResults) noResults.classList.toggle("hidden", visibleCount !== 0);
    }

    filterBar.querySelectorAll("button[data-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeFilter = btn.dataset.filter;
        filterBar.querySelectorAll("button[data-filter]").forEach(function (b) {
          b.classList.remove("filter-active", "text-on-surface");
          b.classList.add("text-secondary");
        });
        btn.classList.add("filter-active", "text-on-surface");
        btn.classList.remove("text-secondary");
        applyFilters();
      });
    });

    // Cards navigate to their own product detail page (keyboard + click),
    // and each gets a quick "Add to Bag" button that doesn't trigger navigation.
    cards.forEach(function (card) {
      var id = card.dataset.id;
      function go() {
        window.location.href = "product.html?id=" + encodeURIComponent(id);
      }
      card.addEventListener("click", go);
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          go();
        }
      });

      var priceRow = card.querySelector(".flex.justify-between.items-start");
      if (priceRow && id) {
        var addBtn = document.createElement("button");
        addBtn.textContent = "ADD TO BAG";
        addBtn.className = "mt-3 w-full border border-on-surface/20 hover:border-on-surface hover:bg-on-surface hover:text-surface transition-colors font-label-sm text-label-sm uppercase tracking-wider py-2";
        addBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          if (window.NakkasiCart) {
            window.NakkasiCart.add(id, 1);
            window.NakkasiCart.open();
          }
        });
        priceRow.parentElement.appendChild(addBtn);
      }
    });

    // Search toggle
    var searchToggle = document.getElementById("search-toggle");
    var searchBox = document.getElementById("search-box");
    if (searchToggle && searchBox) {
      searchToggle.addEventListener("click", function () {
        var isHidden = searchBox.classList.contains("hidden");
        searchBox.classList.toggle("hidden");
        if (isHidden && searchInput) searchInput.focus();
      });
    }
    if (searchInput) {
      searchInput.addEventListener("input", applyFilters);
    }
  }

  /* -----------------------------------------------------------
   * Newsletter forms (index + about pages)
   * No backend on this brief — validate client-side and confirm.
   * --------------------------------------------------------- */
  function initNewsletterForm() {
    var form = document.getElementById("newsletter-form");
    if (!form) return;
    var success = document.getElementById("newsletter-success");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var email = input ? input.value.trim() : "";
      var isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!isValid) {
        if (input) {
          input.style.borderColor = "#ba1a1a";
          input.focus();
        }
        showToast("Enter a valid email address to join the archive.");
        return;
      }

      if (input) input.style.borderColor = "";
      form.reset();
      if (success) {
        success.classList.remove("hidden");
      } else {
        showToast("Thank you — you're on the list.");
      }
    });
  }

  /* -----------------------------------------------------------
   * Teak Monolith: sticky mobile CTA bar reveals after the hero
   * --------------------------------------------------------- */
  function initStickyAcquireBar() {
    var bar = document.getElementById("sticky-acquire");
    if (!bar) return;

    function update() {
      if (window.scrollY > window.innerHeight * 0.6) {
        bar.classList.remove("translate-y-full");
      } else {
        bar.classList.add("translate-y-full");
      }
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    initCollectionFilters();
    initNewsletterForm();
    initStickyAcquireBar();
    initStubLinks();
  });
})();
