import { siteConfig } from "./site-config";
import type { Product } from "./products";

export type CartLine = { key: string; productId: string; variant?: string; qty: number };
export const lineKey = (id: string, variant?: string) => `${id}::${variant ?? ""}`;
const cap = (qty: number, p?: Product) => Math.max(1, Math.min(qty, siteConfig.maxQtyPerLine, p ? p.stock : siteConfig.maxQtyPerLine));

export function addLine(lines: CartLine[], p: Product, variant: string | undefined, qty: number): CartLine[] {
  if (p.stock <= 0) return lines;
  const key = lineKey(p.id, variant);
  const existing = lines.find((l) => l.key === key);
  if (existing) return lines.map((l) => (l.key === key ? { ...l, qty: cap(l.qty + qty, p) } : l));
  return [...lines, { key, productId: p.id, variant, qty: cap(qty, p) }];
}
export const setQty = (lines: CartLine[], key: string, qty: number, byId: (id: string) => Product | undefined): CartLine[] =>
  lines.map((l) => (l.key === key ? { ...l, qty: cap(qty, byId(l.productId)) } : l));
export const removeLine = (lines: CartLine[], key: string) => lines.filter((l) => l.key !== key);

/** Validate persisted data: drops unknown products, bad variants, bad quantities. */
export function sanitize(raw: unknown, byId: (id: string) => Product | undefined): CartLine[] {
  if (!Array.isArray(raw)) return [];
  const out: CartLine[] = [];
  for (const r of raw) {
    if (!r || typeof r !== "object") continue;
    const { productId, variant, qty } = r as Record<string, unknown>;
    if (typeof productId !== "string" || typeof qty !== "number" || !Number.isFinite(qty)) continue;
    const p = byId(productId);
    if (!p || p.stock <= 0) continue;
    const v = typeof variant === "string" ? variant : undefined;
    if (p.variants?.length ? !v || !p.variants.includes(v) : v) continue;
    const key = lineKey(productId, v);
    if (out.some((o) => o.key === key)) continue;
    out.push({ key, productId, variant: v, qty: cap(Math.floor(qty), p) });
  }
  return out;
}

/** Totals always recomputed from the product dataset, never from stored prices. */
export function totals(lines: CartLine[], byId: (id: string) => Product | undefined, freeDelivery = false) {
  const items = lines.flatMap((l) => {
    const product = byId(l.productId);
    return product ? [{ ...l, product, lineTotal: product.price * l.qty }] : [];
  });
  const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);
  const { fee, freeOver } = siteConfig.delivery;
  const delivery = !items.length || freeDelivery || (freeOver !== null && subtotal >= freeOver) ? 0 : fee;
  return { items, count: items.reduce((s, i) => s + i.qty, 0), subtotal, delivery, total: subtotal + delivery };
}
