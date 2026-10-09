export type CategorySlug = "jhumkas" | "bangles" | "necklaces" | "rings" | "bracelets" | "tikka-sets";
export type Tone = "gold" | "pearl" | "ruby" | "emerald" | "kundan";

export type Product = {
  id: string; slug: string; name: string; category: CategorySlug;
  price: number; originalPrice?: number; // integer PKR
  description: string; material: string; colour: string; tone: Tone;
  variants?: string[]; variantLabel?: string;
  images: string[]; // local paths under /public/products, e.g. "/products/noor-kundan-jhumkas-1.jpg". Empty = illustrated fallback.
  sku: string; stock: number; featured: boolean; bestseller: boolean;
  addedAt: string; // ISO date, used for "Newest"
  tags: string[];
};

export const categories: { slug: CategorySlug; name: string; navName: string; blurb: string }[] = [
  { slug: "jhumkas", name: "Jhumkas", navName: "Jhumkas", blurb: "Bells, drops & chand balis" },
  { slug: "bangles", name: "Bangles & Kangan", navName: "Bangles & Kangan", blurb: "Stacks, kangan & kadas" },
  { slug: "necklaces", name: "Necklaces", navName: "Necklaces", blurb: "Chokers, pendants & statement sets" },
  { slug: "rings", name: "Rings", navName: "Rings", blurb: "Adjustable & statement styles" },
  { slug: "bracelets", name: "Bracelets", navName: "Bracelets", blurb: "Everyday to festive" },
  { slug: "tikka-sets", name: "Tikka & Sets", navName: "Tikka & Sets", blurb: "Maang tikka & bridal-style sets" },
];

const BANGLE = ["2.4", "2.6", "2.8"];
const RING = ["Adjustable"];
// [name, category, price, original|0, tone, colour, material, desc, featured, bestseller, variants, stock, date]
type Row = [string, CategorySlug, number, number, Tone, string, string, string, boolean, boolean, string[] | undefined, number, string];
const rows: Row[] = [
  ["Noor Kundan Jhumkas", "jhumkas", 1850, 2250, "kundan", "Gold & ivory", "Gold-plated alloy, kundan-style stones", "Domed jhumkas with kundan-style stones and tiny pearl-style drops. Light enough for a full evening.", true, true, undefined, 24, "2026-09-12"],
  ["Meher Pearl Drop Earrings", "jhumkas", 1250, 0, "pearl", "Ivory pearl", "Gold-tone alloy, glass pearl-style beads", "Soft drop earrings with glass pearl-style beads. Easy with both shalwar kameez and western wear.", false, false, undefined, 30, "2026-08-02"],
  ["Chand Bali Statement Earrings", "jhumkas", 2450, 0, "kundan", "Gold & ruby", "Gold-plated alloy, crescent design, imitation stones", "Crescent chand bali earrings with imitation ruby accents, made for Eid and wedding events.", true, true, undefined, 15, "2026-09-20"],
  ["Gulbahar Antique Jhumkas", "jhumkas", 1650, 0, "gold", "Antique gold", "Antique-finish plated alloy", "Textured antique-finish jhumkas with a floral crown and a soft bell chime.", false, false, undefined, 20, "2026-07-14"],
  ["Zareen Gold-Tone Bangles", "bangles", 1450, 0, "gold", "Gold-tone", "Gold-tone plated brass", "A set of slim textured bangles that stack neatly with your favourite glass choorian.", false, true, BANGLE, 40, "2026-08-18"],
  ["Mehr Kundan Kangan Pair", "bangles", 2850, 3350, "kundan", "Gold & ivory", "Gold-plated alloy, kundan-style stones", "A pair of kundan-style kangan with hand-set stones, designed as a festive centrepiece.", true, true, BANGLE, 12, "2026-09-25"],
  ["Sitara Traditional Bangle Set", "bangles", 1950, 0, "ruby", "Maroon & gold", "Enamelled alloy, gold-tone plating", "A traditional set of enamelled bangles in maroon and gold with star-pattern detailing.", false, false, BANGLE, 18, "2026-07-30"],
  ["Noorani Textured Kada", "bangles", 1750, 0, "gold", "Antique gold", "Plated brass, antique finish", "A single statement kada with a hammered texture. Pair with a simple kurta.", false, false, BANGLE, 22, "2026-06-21"],
  ["Afsana Kundan Necklace", "necklaces", 3950, 4650, "kundan", "Gold & green", "Gold-plated alloy, kundan-style and glass stones", "Layered kundan-style necklace with emerald-tone glass drops, for weddings and dawat evenings.", true, true, undefined, 9, "2026-09-28"],
  ["Hoor Pearl Choker", "necklaces", 2750, 0, "pearl", "Ivory pearl", "Glass pearl-style beads, gold-tone clasp", "A close-fitting choker of graduated pearl-style beads with an adjustable back chain.", true, false, undefined, 14, "2026-08-25"],
  ["Gulzar Polki Pendant Set", "necklaces", 3250, 0, "kundan", "Gold & pink", "Gold-plated alloy, polki-style stones", "Pendant necklace with matching earrings, set with polki-style stones.", false, false, undefined, 10, "2026-07-08"],
  ["Mehfil Gold-Tone Necklace", "necklaces", 2450, 0, "gold", "Gold-tone", "Gold-tone plated alloy", "A graceful gold-tone necklace with a filigree centre panel, for daily wear and gifting.", false, false, undefined, 17, "2026-06-15"],
  ["Sitara Adjustable Ring", "rings", 650, 0, "gold", "Gold-tone", "Gold-tone plated brass", "A fine star-motif ring with an open adjustable band.", false, false, RING, 50, "2026-08-10"],
  ["Mehr Stone Statement Ring", "rings", 950, 0, "ruby", "Gold & ruby", "Plated alloy, imitation stone", "A bold cocktail ring with a large imitation ruby-tone stone.", false, true, RING, 26, "2026-09-02"],
  ["Noor Floral Ring", "rings", 750, 0, "pearl", "Gold & pearl", "Plated alloy, pearl-style centre", "Petal-shaped ring around a pearl-style centre, light and easy to stack.", false, false, RING, 35, "2026-07-22"],
  ["Zoya Kundan Ring", "rings", 1150, 1450, "kundan", "Gold & ivory", "Gold-plated alloy, kundan-style stones", "An adjustable ring in kundan style, made to match jhumkas and kangan.", false, false, RING, 21, "2026-09-15"],
  ["Nazakat Everyday Bracelet", "bracelets", 850, 0, "gold", "Gold-tone", "Gold-tone plated brass", "A delicate chain bracelet with an adjustable clasp for everyday wear.", false, true, undefined, 45, "2026-08-05"],
  ["Chandni Pearl Bracelet", "bracelets", 1250, 0, "pearl", "Ivory pearl", "Glass pearl-style beads, elastic cord", "A pearl-style beaded bracelet on stretch cord, comfortable all day.", true, false, undefined, 28, "2026-09-08"],
  ["Meher Charm Bracelet", "bracelets", 950, 0, "gold", "Gold-tone", "Plated alloy charms", "Chain bracelet with tiny moon, star and flower charms.", false, false, undefined, 31, "2026-07-18"],
  ["Noor Gold-Tone Cuff", "bracelets", 1450, 0, "gold", "Antique gold", "Plated brass, antique finish", "An open cuff with engraved paisley detail. Slightly adjustable to fit most wrists.", false, false, undefined, 16, "2026-06-30"],
  ["Rani Kundan Tikka", "tikka-sets", 1650, 0, "kundan", "Gold & ivory", "Gold-plated alloy, kundan-style stones", "A maang tikka with kundan-style stones and a pearl-style drop on a chain.", false, false, undefined, 19, "2026-08-14"],
  ["Dulhan Polki Jewellery Set", "tikka-sets", 5950, 6950, "kundan", "Gold & ruby", "Gold-plated alloy, polki-style and imitation stones", "Necklace, earrings and tikka set for bridal-style events, in polki-style stones.", true, true, undefined, 6, "2026-09-30"],
  ["Gulnaar Festive Tikka Set", "tikka-sets", 2950, 0, "ruby", "Gold & pink", "Gold-plated alloy, imitation stones", "Matching tikka and earrings for Eid, mehndi and festive gatherings.", false, false, undefined, 13, "2026-09-05"],
  ["Mehrosh Traditional Jewellery Set", "tikka-sets", 4450, 0, "emerald", "Gold & emerald", "Gold-plated alloy, glass stones", "Traditional set with necklace, earrings and tikka in emerald-tone glass stones.", false, false, undefined, 3, "2026-07-27"],
];

const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const prefix: Record<CategorySlug, string> = { jhumkas: "JHM", bangles: "BNG", necklaces: "NCK", rings: "RNG", bracelets: "BRC", "tikka-sets": "TKS" };

export const products: Product[] = rows.map((r, i) => ({
  id: `p${String(i + 1).padStart(3, "0")}`, slug: slugify(r[0]), name: r[0], category: r[1], price: r[2],
  originalPrice: r[3] || undefined, description: r[7], material: r[6], colour: r[5], tone: r[4],
  variants: r[10], variantLabel: r[1] === "rings" ? "Size" : "Bangle size (in)", images: [],
  sku: `SHJ-${prefix[r[1]]}-${String(i + 1).padStart(3, "0")}`, stock: r[11], featured: r[8], bestseller: r[9],
  addedAt: r[12], tags: [r[1], r[4], r[5].toLowerCase()],
}));

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const productsIn = (c: CategorySlug) => products.filter((p) => p.category === c);
export const discountPct = (p: Product) => (p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0);

export type SortKey = "featured" | "price-asc" | "price-desc" | "name" | "newest";
export function filterProducts(list: Product[], o: { q?: string; category?: string; min?: number; max?: number; sort?: SortKey }) {
  const q = (o.q ?? "").trim().toLowerCase();
  const out = list.filter((p) =>
    (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) &&
    (!o.category || p.category === o.category) &&
    (o.min === undefined || p.price >= o.min) && (o.max === undefined || p.price <= o.max));
  const s = o.sort ?? "featured";
  return out.sort((a, b) =>
    s === "price-asc" ? a.price - b.price : s === "price-desc" ? b.price - a.price :
    s === "name" ? a.name.localeCompare(b.name) : s === "newest" ? b.addedAt.localeCompare(a.addedAt) :
    Number(b.featured) - Number(a.featured) || Number(b.bestseller) - Number(a.bestseller));
}
