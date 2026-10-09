"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { categories, filterProducts, products, type SortKey } from "@/lib/products";
import { ProductGrid } from "@/components/ProductCard";

const RANGES = [{ l: "Any price", min: undefined, max: undefined }, { l: "Under Rs. 1,000", min: 0, max: 999 }, { l: "Rs. 1,000 - 2,000", min: 1000, max: 2000 }, { l: "Rs. 2,000 - 3,500", min: 2000, max: 3500 }, { l: "Above Rs. 3,500", min: 3501, max: undefined }];
export function ShopClient({ fixedCategory }: { fixedCategory?: string }) {
  const sp = useSearchParams();
  const [q, setQ] = useState(sp.get("q") ?? ""); const [cat, setCat] = useState(fixedCategory ?? ""); const [range, setRange] = useState(0); const [sort, setSort] = useState<SortKey>("featured");
  useEffect(() => { setQ(sp.get("q") ?? ""); }, [sp]); // header search while already on /shop
  const r = RANGES[range];
  const list = useMemo(() => filterProducts(products, { q, category: cat || undefined, min: r.min, max: r.max, sort }), [q, cat, r, sort]);
  const dirty = q || (!fixedCategory && cat) || range || sort !== "featured";
  const clear = () => { setQ(""); if (!fixedCategory) setCat(""); setRange(0); setSort("featured"); };
  const field = "min-h-11 w-full border border-champagne bg-white px-3";
  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2"><label htmlFor="q" className="mb-1 block text-sm">Search</label><input id="q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. kundan, pearl" className={field} /></div>
        {!fixedCategory && <div><label htmlFor="cat" className="mb-1 block text-sm">Category</label><select id="cat" value={cat} onChange={(e) => setCat(e.target.value)} className={field}><option value="">All categories</option>{categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></div>}
        <div><label htmlFor="price" className="mb-1 block text-sm">Price</label><select id="price" value={range} onChange={(e) => setRange(Number(e.target.value))} className={field}>{RANGES.map((x, i) => <option key={x.l} value={i}>{x.l}</option>)}</select></div>
        <div><label htmlFor="sort" className="mb-1 block text-sm">Sort by</label><select id="sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className={field}><option value="featured">Featured</option><option value="newest">Newest</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name">Alphabetical</option></select></div>
      </form>
      <div className="mb-4 flex items-center justify-between"><p role="status" aria-live="polite" className="text-sm text-muted">{list.length} {list.length === 1 ? "piece" : "pieces"}</p>{dirty ? <button type="button" onClick={clear} className="min-h-11 text-sm text-maroon underline">Clear filters</button> : null}</div>
      {list.length ? <ProductGrid items={list} /> : (<div className="border border-champagne bg-white p-10 text-center"><p className="font-serif text-xl">No jewellery matches your search</p><p className="mt-1 text-sm text-muted">Try fewer words or a wider price range.</p><button type="button" onClick={clear} className="mt-4 min-h-11 bg-maroon px-5 text-ivory">Clear filters</button></div>)}
    </div>
  );
}
