import { formatPKR } from "@/lib/currency";
import type { Product } from "@/lib/products";
export function Price({ p, large = false }: { p: Product; large?: boolean }) {
  return (
    <p className={`flex flex-wrap items-baseline gap-x-2 ${large ? "text-xl" : "text-sm"}`}>
      <span className="font-semibold text-maroon">{formatPKR(p.price)}</span>
      {p.originalPrice && (<><span className="text-muted line-through"><span className="sr-only">Original price </span>{formatPKR(p.originalPrice)}</span></>)}
    </p>
  );
}
