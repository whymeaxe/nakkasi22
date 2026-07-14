/**
 * NAKKASI — cart
 * A real, working cart with no backend: items persist in localStorage so
 * they survive a page reload or a jump between pages. There's no
 * checkout/payment step in this brief — the drawer's primary action is
 * "Send Enquiry", which routes the cart contents into the enquiry form
 * on the product page (or a mailto fallback with the list of items).
 */
(function () {
  "use strict";

  var STORAGE_KEY = "nakkasi_cart";

  function readCart() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function writeCart(cart) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) { /* ignore quota/availability errors */ }
  }

  function getProduct(id) {
    return (window.NAKKASI_PRODUCTS || {})[id] || null;
  }

  function addToCart(id, qty) {
    qty = qty || 1;
    var cart = readCart();
    cart[id] = (cart[id] || 0) + qty;
    writeCart(cart);
    renderDrawer();
    updateBadges();
  }

  function setQty(id, qty) {
    var cart = readCart();
    if (qty <= 0) {
      delete cart[id];
    } else {
      cart[id] = qty;
    }
    writeCart(cart);
    renderDrawer();
    updateBadges();
  }

  function removeFromCart(id) {
    setQty(id, 0);
  }

  function cartEntries() {
    var cart = readCart();
    return Object.keys(cart)
      .map(function (id) {
        var product = getProduct(id);
        return product ? { id: id, qty: cart[id], product: product } : null;
      })
      .filter(Boolean);
  }

  function cartCount() {
    var cart = readCart();
    return Object.keys(cart).reduce(function (sum, id) { return sum + cart[id]; }, 0);
  }

  function cartTotal() {
    return cartEntries().reduce(function (sum, entry) {
      return sum + entry.product.price * entry.qty;
    }, 0);
  }

  function formatPrice(n) {
    return "$" + n.toLocaleString("en-US");
  }

  function updateBadges() {
    var count = cartCount();
    document.querySelectorAll(".cart-badge").forEach(function (badge) {
      badge.textContent = count;
      badge.classList.toggle("hidden", count === 0);
    });
  }

  /* -----------------------------------------------------------
   * Drawer UI — built once, reused across every page that loads
   * this script (index, collection, product, teak-monolith, about).
   * --------------------------------------------------------- */
  var drawerEl, overlayEl, itemsEl, totalEl, emptyEl;

  function buildDrawer() {
    if (drawerEl) return;

    overlayEl = document.createElement("div");
    overlayEl.id = "cart-overlay";
    overlayEl.style.cssText = "position:fixed;inset:0;background:rgba(27,28,28,.4);z-index:200;opacity:0;pointer-events:none;transition:opacity .3s ease;";

    drawerEl = document.createElement("div");
    drawerEl.id = "cart-drawer";
    drawerEl.style.cssText = [
      "position:fixed", "top:0", "right:0", "height:100%", "width:min(420px, 92vw)",
      "background:#fbf9f8", "z-index:201", "transform:translateX(100%)",
      "transition:transform .35s cubic-bezier(.4,0,.2,1)", "display:flex", "flex-direction:column",
      "box-shadow:-10px 0 40px rgba(0,0,0,.15)", "font-family:'Plus Jakarta Sans', sans-serif"
    ].join(";");

    drawerEl.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:24px;border-bottom:1px solid rgba(27,28,28,.08);">' +
        '<span style="font-family:\'Bodoni Moda\',serif;font-size:20px;letter-spacing:.02em;">Your Bag</span>' +
        '<button id="cart-close" aria-label="Close bag" style="background:none;border:0;font-size:26px;line-height:1;cursor:pointer;color:#1b1c1c;" class="material-symbols-outlined">close</button>' +
      '</div>' +
      '<div id="cart-items" style="flex:1;overflow-y:auto;padding:24px;"></div>' +
      '<div id="cart-footer" style="padding:24px;border-top:1px solid rgba(27,28,28,.08);"></div>';

    document.body.appendChild(overlayEl);
    document.body.appendChild(drawerEl);

    itemsEl = drawerEl.querySelector("#cart-items");

    drawerEl.querySelector("#cart-close").addEventListener("click", closeCart);
    overlayEl.addEventListener("click", closeCart);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeCart();
    });
  }

  function renderDrawer() {
    if (!drawerEl) return;
    var entries = cartEntries();
    var footer = drawerEl.querySelector("#cart-footer");

    if (entries.length === 0) {
      itemsEl.innerHTML = '<p style="color:#6b6b6b;font-size:15px;line-height:1.6;">Your bag is empty. Every piece here is a bespoke commission — add one from the collection to start an enquiry.</p>';
      footer.innerHTML = '<a href="collection.html" style="display:block;text-align:center;background:#1b1c1c;color:#fbf9f8;padding:14px;text-decoration:none;font-size:13px;letter-spacing:.08em;text-transform:uppercase;">Browse the Collection</a>';
      return;
    }

    itemsEl.innerHTML = entries.map(function (entry) {
      return (
        '<div style="display:flex;gap:14px;margin-bottom:20px;">' +
          '<img src="' + entry.product.image + '" alt="' + entry.product.name + '" style="width:76px;height:76px;object-fit:cover;flex-shrink:0;background:#eee;">' +
          '<div style="flex:1;min-width:0;">' +
            '<div style="display:flex;justify-content:space-between;gap:8px;">' +
              '<span style="font-size:15px;font-weight:600;">' + entry.product.name + '</span>' +
              '<button data-remove="' + entry.id + '" aria-label="Remove" style="background:none;border:0;color:#6b6b6b;cursor:pointer;font-size:13px;text-decoration:underline;flex-shrink:0;">Remove</button>' +
            '</div>' +
            '<div style="color:#6b6b6b;font-size:13px;margin-top:2px;">' + entry.product.category + '</div>' +
            '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:10px;">' +
              '<div style="display:flex;align-items:center;border:1px solid rgba(27,28,28,.15);">' +
                '<button data-qty-down="' + entry.id + '" style="width:28px;height:28px;background:none;border:0;cursor:pointer;font-size:16px;">−</button>' +
                '<span style="width:28px;text-align:center;font-size:14px;">' + entry.qty + '</span>' +
                '<button data-qty-up="' + entry.id + '" style="width:28px;height:28px;background:none;border:0;cursor:pointer;font-size:16px;">+</button>' +
              '</div>' +
              '<span style="font-size:14px;font-weight:600;">' + formatPrice(entry.product.price * entry.qty) + '</span>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join("");

    var total = cartTotal();
    footer.innerHTML =
      '<div style="display:flex;justify-content:space-between;font-size:15px;margin-bottom:16px;">' +
        '<span>Estimated total</span><span style="font-weight:600;">' + formatPrice(total) + '</span>' +
      '</div>' +
      '<button id="cart-enquire" style="display:block;width:100%;text-align:center;background:#1b1c1c;color:#fbf9f8;padding:14px;border:0;cursor:pointer;font-size:13px;letter-spacing:.08em;text-transform:uppercase;">Send Enquiry</button>' +
      '<p style="color:#6b6b6b;font-size:12px;margin-top:10px;text-align:center;">Every piece is made to order. Pricing is a starting estimate — we\'ll confirm final cost and lead time in the enquiry.</p>';

    itemsEl.querySelectorAll("[data-remove]").forEach(function (btn) {
      btn.addEventListener("click", function () { removeFromCart(btn.dataset.remove); });
    });
    itemsEl.querySelectorAll("[data-qty-up]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.dataset.qtyUp;
        setQty(id, (readCart()[id] || 0) + 1);
      });
    });
    itemsEl.querySelectorAll("[data-qty-down]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.dataset.qtyDown;
        setQty(id, (readCart()[id] || 0) - 1);
      });
    });

    var enquireBtn = footer.querySelector("#cart-enquire");
    if (enquireBtn) {
      enquireBtn.addEventListener("click", function () {
        var lines = entries.map(function (e) { return e.qty + "x " + e.product.name; }).join("%0D%0A");
        window.location.href = "mailto:studio@nakkasi.com?subject=Enquiry%20-%20NAKKASI%20Bag&body=I'd%20like%20to%20enquire%20about%3A%0D%0A" + lines;
      });
    }
  }

  function openCart() {
    buildDrawer();
    renderDrawer();
    requestAnimationFrame(function () {
      overlayEl.style.opacity = "1";
      overlayEl.style.pointerEvents = "auto";
      drawerEl.style.transform = "translateX(0)";
    });
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    if (!drawerEl) return;
    overlayEl.style.opacity = "0";
    overlayEl.style.pointerEvents = "none";
    drawerEl.style.transform = "translateX(100%)";
    document.body.style.overflow = "";
  }

  function initBagButtons() {
    document.querySelectorAll("#bag-toggle").forEach(function (btn) {
      // Add a small item-count badge onto the bag icon
      btn.style.position = "relative";
      var badge = document.createElement("span");
      badge.className = "cart-badge hidden";
      badge.style.cssText = "position:absolute;top:-6px;right:-8px;background:#8a3324;color:#fff;font-size:10px;line-height:1;border-radius:999px;padding:3px 5px;font-family:'Plus Jakarta Sans',sans-serif;";
      btn.appendChild(badge);
      btn.addEventListener("click", openCart);
    });
    updateBadges();
  }

  window.NakkasiCart = {
    add: addToCart,
    remove: removeFromCart,
    setQty: setQty,
    open: openCart,
    close: closeCart,
    count: cartCount
  };

  document.addEventListener("DOMContentLoaded", initBagButtons);
})();
