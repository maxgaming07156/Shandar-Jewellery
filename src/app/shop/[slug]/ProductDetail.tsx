"use client";
import Link from "next/link";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { discountPct, type Product } from "@/lib/products";
import { ProductImage } from "@/components/ProductImage";
import { Price } from "@/components/Price";
import { WhatsAppLink } from "@/components/WhatsAppButton";
import { WA } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/site-config";

export function ProductDetail({ product: p }: { product: Product }) {
  const { add } = useCart();
  const [variant, setVariant] = useState<string | undefined>(p.variants?.length === 1 ? p.variants[0] : undefined);
  const [qty, setQty] = useState(1); const [err, setErr] = useState(""); const [img, setImg] = useState(0);
  const max = Math.min(p.stock, siteConfig.maxQtyPerLine); const d = discountPct(p);
  const onAdd = () => { if (p.variants?.length && !variant) { setErr(`Please select a ${p.variantLabel?.toLowerCase()} before adding to your bag.`); return; } setErr(""); add(p, variant, qty); };
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-2 lg:gap-14">
      <div>
        <div className="border border-champagne"><ProductImage product={p} index={img} eager /></div>
        {p.images.length > 1 && <ul className="mt-3 grid grid-cols-4 gap-2">{p.images.map((_, i) => <li key={i}><button type="button" onClick={() => setImg(i)} aria-label={`Show view ${i + 1}`} aria-pressed={img === i} className={`block w-full border-2 ${img === i ? "border-maroon" : "border-transparent"}`}><ProductImage product={p} index={i} /></button></li>)}</ul>}
      </div>
      <div>
        <h1 className="text-3xl text-maroon sm:text-4xl">{p.name}</h1>
        <div className="mt-2 flex items-center gap-3"><Price p={p} large />{d > 0 && <span className="bg-maroon px-2 py-0.5 text-xs text-ivory">{d}% off</span>}</div>
        <p className="mt-4 text-ink/90">{p.description}</p>
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm"><dt className="text-muted">Material & finish</dt><dd>{p.material}</dd><dt className="text-muted">Colour</dt><dd>{p.colour}</dd><dt className="text-muted">SKU</dt><dd>{p.sku}</dd></dl>
        <p className="mt-2 text-xs text-muted">Fashion jewellery: plated and imitation stones. Not solid gold or genuine gemstones.</p>
        {p.variants && (
          <fieldset className="mt-5"><legend className="mb-2 text-sm font-medium">{p.variantLabel}</legend>
            <div className="flex flex-wrap gap-2">{p.variants.map((v) => (<label key={v} className={`flex min-h-11 min-w-14 cursor-pointer items-center justify-center border px-4 text-sm ${variant === v ? "border-maroon bg-maroon text-ivory" : "border-champagne bg-white"} focus-within:outline focus-within:outline-2 focus-within:outline-golddeep`}><input type="radio" name="variant" value={v} checked={variant === v} onChange={() => { setVariant(v); setErr(""); }} className="sr-only" />{v}</label>))}</div>
          </fieldset>
        )}
        {err && <p role="alert" className="mt-2 text-sm font-medium text-red-800">Error: {err}</p>}
        <p className={`mt-5 text-sm ${p.stock <= 0 ? "text-red-800" : p.stock <= 5 ? "text-golddeep" : "text-green-800"}`}>{p.stock <= 0 ? "Out of stock" : p.stock <= 5 ? `Low stock: only ${p.stock} left` : "In stock"}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center border border-champagne" role="group" aria-label="Quantity">
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="Decrease quantity" className="flex h-11 w-11 items-center justify-center disabled:opacity-40"><Minus size={14} aria-hidden="true" /></button>
            <span className="w-10 text-center" aria-live="polite">{qty}</span>
            <button type="button" onClick={() => setQty((q) => Math.min(max, q + 1))} disabled={qty >= max} aria-label="Increase quantity" className="flex h-11 w-11 items-center justify-center disabled:opacity-40"><Plus size={14} aria-hidden="true" /></button>
          </div>
          <button type="button" onClick={onAdd} disabled={p.stock <= 0} className="min-h-12 flex-1 bg-maroon px-6 font-medium text-ivory hover:bg-burgundy disabled:bg-muted sm:flex-none">Add to bag</button>
        </div>
        <div className="mt-6 border border-champagne bg-white p-4 text-sm"><p className="font-medium">Delivery across Pakistan</p><p className="text-muted">Cash on delivery is the intended payment option. Delivery fee shown at checkout (Rs. {siteConfig.delivery.fee}). This is a demo store; courier timelines are not confirmed.</p></div>
        <p className="mt-4 text-sm"><WhatsAppLink message={WA.product(p.name)} className="text-maroon underline">Ask about this piece on WhatsApp</WhatsAppLink></p>
        <p className="mt-2 text-sm"><Link href="/cart" className="underline">View bag</Link></p>
      </div>
    </div>
  );
}
