"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/products";
import { discountPct } from "@/lib/products";
import { ProductImage } from "./ProductImage";
import { Price } from "./Price";
import { AddToCartButton } from "./AddToCartButton";
export function ProductCard({ product }: { product: Product }) {
  const router = useRouter(); const d = discountPct(product);
  return (
    <article className="group flex flex-col border border-champagne bg-white">
      <Link href={`/shop/${product.slug}`} className="relative block overflow-hidden" aria-label={`View ${product.name}`}>
        <div className="transition duration-500 group-hover:scale-105 motion-reduce:transition-none"><ProductImage product={product} /></div>
        {d > 0 && <span className="absolute left-2 top-2 bg-maroon px-2 py-1 text-xs text-ivory">{d}% off</span>}
        {product.stock > 0 && product.stock <= 5 && <span className="absolute bottom-2 left-2 bg-ivory px-2 py-1 text-xs text-maroon">Only {product.stock} left</span>}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <h3 className="font-serif text-base leading-snug text-ink"><Link href={`/shop/${product.slug}`} className="hover:text-maroon">{product.name}</Link></h3>
        <Price p={product} />
        <AddToCartButton product={product} className="mt-auto w-full" onNeedVariant={() => router.push(`/shop/${product.slug}`)} />
        {product.variants && <p className="text-xs text-muted">Choose {product.variantLabel?.toLowerCase()} on the next page</p>}
      </div>
    </article>
  );
}
export const ProductGrid = ({ items }: { items: Product[] }) => (
  <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">{items.map((p) => <li key={p.id} className="flex"><div className="flex w-full flex-col [&>article]:flex-1"><ProductCard product={p} /></div></li>)}</ul>
);
