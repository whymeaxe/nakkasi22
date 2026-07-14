# NAKKASI — Conceptual Furniture Site

A static site (originally a Google Stitch design export) wired up with
working navigation, a real shopping cart, per-product spec/enquiry pages,
and phone-friendly responsive layout — ready to preview or deploy as-is.

## Pages

| File                | Page                                  |
|---------------------|----------------------------------------|
| `index.html`        | Home                                   |
| `collection.html`   | Gallery / product listing (filter + search) |
| `product.html`      | Product detail — specs + enquiry form (`?id=...`) |
| `teak-monolith.html`| Flagship product story page            |
| `about.html`        | Studio / about page                    |

## What's wired up

- **Navigation** — header, footer, and logo links all point to the real pages above.
- **Mobile menu** — the hamburger icon opens a full-screen nav overlay on small screens.
- **Responsive layout** — the original export used fixed desktop type sizes (80px/64px/48px headings) with no mobile fallback, which overflowed on phones. `assets/css/responsive.css` rescales type, section spacing, and the nav pill under 768px so nothing runs off-screen. Tested down to 360px wide.
- **Real shopping cart** — the bag icon opens a slide-in drawer (`assets/js/cart.js`). You can add/remove items and adjust quantity, the item count badge and subtotal update live, and the cart persists across pages and reloads via `localStorage`. There's no payment/checkout in this brief — the drawer's action is "Send Enquiry", which emails the studio the list of items.
- **Product pages** — every product in the collection grid now links to its own page (`product.html?id=<product-id>`) showing full specs (material, dimensions, finish, origin, lead time), an "Add to Bag" button, and an enquiry form (validates client-side, then opens a pre-filled email to the studio). Product data lives in `assets/js/products.js` — add a product there and it's automatically available everywhere.
- **Collection filters** — SEATING / LIGHTING / SCULPTURAL OBJECTS buttons filter the grid; the search icon opens a live search box.
- **Newsletter forms** (home + about) — validate the email client-side and show a confirmation message.
- **Placeholder links** (Privacy, Terms, Careers, Institutional, Instagram, Pinterest, Vimeo) — show a "coming soon" message instead of doing nothing.

## Deploying

This is a plain static site — no build step, no dependencies to install.

**GitHub Pages:**
1. Create a new repo and drag these files in (or `git init` this folder and push).
2. In the repo Settings → Pages, set the source to the `main` branch, root folder.
3. Your site will be live at `https://<username>.github.io/<repo>/`.

**Any other static host** (Netlify, Vercel, S3, etc.): just upload the folder — `index.html` is the entry point.

## Next steps for a fully production-ready build

- Wire the newsletter form, enquiry form, and cart "Send Enquiry" action to a real backend/CRM (e.g. Formspree, a serverless function, or your CMS) instead of the `mailto:` fallback.
- Add a real checkout if you want in-site payment — right now the cart is enquiry-only, which fits a made-to-order furniture business but won't process payment.
- Replace the placeholder hero/product images (currently hotlinked from Google's asset CDN) with the client's own hosted images before launch — those links can expire.
- Add real pages for Privacy, Terms, Careers, etc.


## Deploying

This is a plain static site — no build step, no dependencies to install.

**GitHub Pages:**
1. Create a new repo and drag these files in (or `git init` this folder and push).
2. In the repo Settings → Pages, set the source to the `main` branch, root folder.
3. Your site will be live at `https://<username>.github.io/<repo>/`.

**Any other static host** (Netlify, Vercel, S3, etc.): just upload the folder — `index.html` is the entry point.

## Next steps for a fully production-ready build

- Wire the newsletter form and mailto CTAs to a real backend/CRM (e.g. Mailchimp, Formspree, or a custom endpoint).
- Build out individual product detail pages instead of pointing every card at `teak-monolith.html`.
- Replace the placeholder hero/product images (currently hotlinked from Google's asset CDN) with the client's own hosted images before launch — those links can expire.
- Add real pages for Privacy, Terms, Careers, etc.
