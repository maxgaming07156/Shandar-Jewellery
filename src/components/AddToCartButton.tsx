"use client";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/lib/products";
/** Cards: products with variants must be chosen on the detail page. */
export function AddToCartButton({ product, variant, qty = 1, onNeedVariant, className = "" }: { product: Product; variant?: string; qty?: number; onNeedVariant?: () => void; className?: string }) {
  const { add } = useCart();
  const out = product.stock <= 0;
  return (
    <button type="button" disabled={out}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (product.variants?.length && !variant) { onNeedVariant?.(); return; } add(product, variant, qty); }}
      className={`inline-flex min-h-11 items-center justify-center gap-2 bg-maroon px-4 text-sm font-medium text-ivory transition hover:bg-burgundy disabled:cursor-not-allowed disabled:bg-muted ${className}`}>
      <ShoppingBag size={16} aria-hidden="true" />{out ? "Out of stock" : "Add to bag"}<span className="sr-only">: {product.name}</span>
    </button>
  );
}
