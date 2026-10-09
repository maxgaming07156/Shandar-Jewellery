"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatPKR } from "@/lib/currency";
import { ProductImage } from "./ProductImage";

export function CartLines({ compact = false }: { compact?: boolean }) {
  const { items, setQty, remove } = useCart();
  return (
    <ul className="divide-y divide-champagne">
      {items.map((i) => (
        <li key={i.key} className="flex gap-3 py-4">
          <div className={compact ? "w-20 shrink-0" : "w-24 shrink-0 sm:w-28"}><ProductImage product={i.product} /></div>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <Link href={`/shop/${i.product.slug}`} className="font-serif leading-snug hover:text-maroon">{i.product.name}</Link>
            {i.variant && <p className="text-xs text-muted">{i.product.variantLabel}: {i.variant}</p>}
            <p className="text-sm text-muted">{formatPKR(i.product.price)} each</p>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex items-center border border-champagne" role="group" aria-label={`Quantity for ${i.product.name}`}>
                <button type="button" onClick={() => setQty(i.key, i.qty - 1)} disabled={i.qty <= 1} aria-label="Decrease quantity" className="flex h-11 w-11 items-center justify-center disabled:opacity-40"><Minus size={14} aria-hidden="true" /></button>
                <span className="w-8 text-center text-sm" aria-live="polite">{i.qty}</span>
                <button type="button" onClick={() => setQty(i.key, i.qty + 1)} aria-label="Increase quantity" className="flex h-11 w-11 items-center justify-center"><Plus size={14} aria-hidden="true" /></button>
              </div>
              <p className="font-semibold text-maroon">{formatPKR(i.lineTotal)}</p>
              <button type="button" onClick={() => remove(i.key)} className="flex h-11 w-11 items-center justify-center text-muted hover:text-maroon" aria-label={`Remove ${i.product.name} from bag`}><Trash2 size={16} aria-hidden="true" /></button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function CartDrawer() {
  const { drawerOpen, setDrawerOpen, items, subtotal, count } = useCart();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>("button, a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
      if (e.key === "Tab" && ref.current) { // focus trap
        const f = [...ref.current.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]")];
        if (!f.length) return; const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey); document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; prev?.focus(); };
  }, [drawerOpen, setDrawerOpen]);
  if (!drawerOpen) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/50" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
      <div ref={ref} role="dialog" aria-modal="true" aria-label="Shopping bag" className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-ivory shadow-xl">
        <div className="flex items-center justify-between border-b border-champagne px-4 py-3">
          <h2 className="font-serif text-xl text-maroon">Your bag ({count})</h2>
          <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close bag" className="flex h-11 w-11 items-center justify-center"><X aria-hidden="true" /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-4">
          {items.length ? <CartLines compact /> : (<div className="py-16 text-center"><p className="font-serif text-lg">Your bag is empty</p><Link href="/shop" onClick={() => setDrawerOpen(false)} className="mt-4 inline-block text-maroon underline">Continue shopping</Link></div>)}
        </div>
        {items.length > 0 && (
          <div className="space-y-3 border-t border-champagne bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <p className="flex justify-between"><span>Subtotal</span><span className="font-semibold">{formatPKR(subtotal)}</span></p>
            <p className="text-xs text-muted">Delivery is calculated at checkout.</p>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/cart" onClick={() => setDrawerOpen(false)} className="flex min-h-11 items-center justify-center border border-maroon text-maroon">View bag</Link>
              <Link href="/checkout" onClick={() => setDrawerOpen(false)} className="flex min-h-11 items-center justify-center bg-maroon text-ivory">Checkout</Link>
            </div>
            <button type="button" onClick={() => setDrawerOpen(false)} className="w-full min-h-11 text-sm text-muted underline">Continue shopping</button>
          </div>
        )}
      </div>
    </div>
  );
}
