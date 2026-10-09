import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopClient } from "./ShopClient";
import { Breadcrumb } from "@/components/Section";
export const metadata: Metadata = { title: "Shop all jewellery", description: "Browse jhumkas, bangles, necklaces, rings, bracelets and bridal-style sets." };
export default function Shop() {
  return (<><Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Shop" }]} /><div className="mx-auto max-w-7xl px-4 py-8"><h1 className="mb-6 text-3xl text-maroon sm:text-4xl">All Jewellery</h1><Suspense fallback={<p role="status">Loading jewellery...</p>}><ShopClient /></Suspense></div></>);
}
