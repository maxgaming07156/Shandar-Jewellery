"use client";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { ProductArt } from "./ProductArt";
export function ProductImage({ product, index = 0, eager = false }: { product: Product; index?: number; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  const src = product.images[index];
  return (
    <div className="aspect-square w-full overflow-hidden bg-champagne/40">
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={`${product.name} - ${product.colour} ${product.category.replace("-", " ")}`} width={800} height={800}
          loading={eager ? "eager" : "lazy"} onError={() => setFailed(true)} className="h-full w-full object-cover" />
      ) : (<div role="img" aria-label={`Illustration of ${product.name}`} className="h-full w-full"><ProductArt category={product.category} tone={product.tone} /></div>)}
    </div>
  );
}
