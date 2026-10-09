# QA report: milestone 1 (built offline; no npm install possible)

## Verified (run here)
- `npm test` (tsx): 9 groups pass. Catalogue (24 products, 4 per category, unique slugs/SKUs, integer prices); search/category/price/sort; cart add/merge/variant separation/qty floor and cap/stock cap/remove; totals recomputed from dataset, Rs. 200 delivery, empty cart = 0; corrupted LocalStorage sanitised; Pakistani phone formats (local, +92, 0092, 92, spaces/dashes) and rejections; name/email/address validators; WhatsApp link only when configured and URL-encoded; EmailJS wrapper: unconfigured never succeeds, success only on status 200, errors reported, payload keys match template.
- Strict `tsc` on `src/lib` and tests: no errors.
- Syntax parse of all `.tsx` files: no errors.
- (EmailJS SDK was stubbed for these runs; the real SDK was not exercised.)

## NOT verified (blocked: no network, no dependencies installed)
- `npm install`, `next build`, `next lint`, full project type-check (React/Next types unavailable)
- Rendering in a browser: hydration, console errors, responsive layout at 360/390/768/1024/1440, focus behaviour of drawers, keyboard/screen-reader checks, contrast
- Real EmailJS delivery to cq07156@gmail.com (needs credentials)
- Next 15 specifics (async `params`, `next/font` fetch) are written to the docs but untested
- Product photography (none bundled; illustrated fallback used)

## Known gaps (milestone 2)
About, contact, shipping & returns, privacy policy, terms pages; sitemap/robots/canonical; no wishlist; product ratings intentionally omitted.
