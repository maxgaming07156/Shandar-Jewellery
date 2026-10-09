import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { categories, getCategory } from "@/lib/products";
import { ShopClient } from "@/app/shop/ShopClient";
import { Breadcrumb } from "@/components/Section";
type P = { params: Promise<{ category: string }> };
export const generateStaticParams = () => categories.map((c) => ({ category: c.slug }));
export async function generateMetadata({ params }: P): Promise<Metadata> { const c = getCategory((await params).category); return c ? { title: c.name, description: `${c.name}: ${c.blurb}.` } : {}; }
export default async function Collection({ params }: P) {
  const c = getCategory((await params).category); if (!c) notFound();
  return (<><Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: c.name }]} /><div className="mx-auto max-w-7xl px-4 py-8"><h1 className="text-3xl text-maroon sm:text-4xl">{c.name}</h1><p className="mb-6 text-muted">{c.blurb}</p><Suspense fallback={<p role="status">Loading...</p>}><ShopClient fixedCategory={c.slug} /></Suspense></div></>);
}
