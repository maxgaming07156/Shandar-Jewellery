"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { Logo } from "./Logo";
import { categories } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

const links = [{ href: "/", label: "Home" }, { href: "/shop", label: "Shop" }, ...categories.map((c) => ({ href: `/collections/${c.slug}`, label: c.navName })), { href: "/free-bracelet", label: "Free Bracelet" }];

export function SiteHeader() {
  const { count, hydrated, setDrawerOpen } = useCart();
  const [menu, setMenu] = useState(false); const [searching, setSearching] = useState(false); const [q, setQ] = useState("");
  const router = useRouter(); const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", onKey); document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [menu]);
  const submit = (e: React.FormEvent) => { e.preventDefault(); router.push(`/shop?q=${encodeURIComponent(q.trim())}`); setSearching(false); setMenu(false); };
  return (
    <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur">
      <div className="bg-burgundy px-3 py-1.5 text-center text-xs text-champagne">{siteConfig.tagline} <Link href="/free-bracelet" className="underline">Free bracelet offer</Link></div>
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 border-b border-champagne px-4 sm:h-16">
        <button type="button" className="flex h-11 w-11 items-center justify-center lg:hidden" onClick={() => setMenu(true)} aria-label="Open menu" aria-expanded={menu} aria-controls="mobile-nav"><Menu aria-hidden="true" /></button>
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-5 text-sm lg:flex">
          {links.slice(1).map((l) => <Link key={l.href} href={l.href} className="whitespace-nowrap text-ink hover:text-maroon">{l.label}</Link>)}
        </nav>
        <div className="flex items-center">
          <button type="button" onClick={() => setSearching((s) => !s)} aria-label="Search products" aria-expanded={searching} className="flex h-11 w-11 items-center justify-center"><Search aria-hidden="true" /></button>
          <button type="button" onClick={() => setDrawerOpen(true)} aria-label={`Open bag, ${hydrated ? count : 0} items`} className="relative flex h-11 w-11 items-center justify-center">
            <ShoppingBag aria-hidden="true" />
            {hydrated && count > 0 && <span aria-hidden="true" className="absolute right-0 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-maroon px-1 text-xs text-ivory">{count}</span>}
          </button>
        </div>
      </div>
      {searching && (
        <form role="search" onSubmit={submit} className="border-b border-champagne bg-white px-4 py-3">
          <div className="mx-auto flex max-w-xl gap-2">
            <label htmlFor="hdr-search" className="sr-only">Search jewellery</label>
            <input id="hdr-search" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search jewellery" className="min-h-11 flex-1 border border-champagne px-3" />
            <button className="min-h-11 bg-maroon px-4 text-ivory">Search</button>
          </div>
        </form>
      )}
      {menu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setMenu(false)} aria-hidden="true" />
          <div id="mobile-nav" ref={menuRef} role="dialog" aria-modal="true" aria-label="Menu" className="absolute left-0 top-0 h-full w-4/5 max-w-xs overflow-y-auto bg-ivory p-4">
            <div className="mb-4 flex items-center justify-between"><Logo /><button type="button" onClick={() => setMenu(false)} aria-label="Close menu" className="flex h-11 w-11 items-center justify-center"><X aria-hidden="true" /></button></div>
            <nav aria-label="Mobile"><ul>{links.map((l) => <li key={l.href}><Link href={l.href} onClick={() => setMenu(false)} className="flex min-h-12 items-center border-b border-champagne font-serif text-lg">{l.label}</Link></li>)}</ul></nav>
          </div>
        </div>
      )}
    </header>
  );
}
