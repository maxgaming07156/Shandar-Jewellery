# Shandar Jewellery (frontend demo, milestone 1: core shopping flows)

Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS 3. No backend, no database.

## Run it
```bash
npm install
cp .env.example .env.local   # then fill in values (see SETUP.md)
npm run dev                  # http://localhost:3000
npm test                     # logic tests (cart, phone, validation, EmailJS payload, WhatsApp)
npm run typecheck && npm run build
```

## What is built (milestone 1)
Routes: `/`, `/shop`, `/shop/[slug]` (24 products), `/collections/[category]` (jhumkas, bangles, necklaces, rings, bracelets, tikka-sets), `/cart`, `/checkout`, `/free-bracelet`, 404.
Not yet built (milestone 2): `/about`, `/contact`, `/shipping-returns`, `/privacy-policy`, `/terms`, sitemap/robots, canonical URLs. The free-bracelet page carries an inline privacy notice until the full policy page exists.

## Structure
- `src/lib/products.ts` central catalogue (integer PKR), filter/sort helpers
- `src/lib/cart-logic.ts` pure cart functions; `src/context/cart-context.tsx` state + LocalStorage (hydrates after mount, validates stored data)
- `src/lib/phone.ts`, `validation.ts` Pakistani mobile + form validation
- `src/lib/emailjs-client.ts` EmailJS send (injectable for tests); `whatsapp.ts` link helper; `site-config.ts` editable settings (delivery fee, WhatsApp, etc.)

## Product images
No photographs are bundled (this was built offline and URLs could not be verified). Products render an illustrated fallback. To add real photos, put files in `public/products/` and list their paths in each product's `images` array in `products.ts`; the fallback remains if an image fails to load. Use only photos you own or have licensed.

## Honest limits
Demo catalogue and prices; demo checkout sends nothing; free-bracelet requests are not guaranteed fulfilment; client-side checks cannot stop automated abuse.
