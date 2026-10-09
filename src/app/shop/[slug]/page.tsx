import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory, getProductBySlug, products } from "@/lib/products";
import { ProductDetail } from "./ProductDetail";
import { Breadcrumb, Section } from "@/components/Section";
import { ProductGrid } from "@/components/ProductCard";
type P = { params: Promise<{ slug: string }> };
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const p = getProductBySlug((await params).slug); if (!p) return {};
  return { title: p.name, description: p.description, openGraph: { title: p.name, description: p.description } };
}
export default async function ProductPage({ params }: P) {
  const p = getProductBySlug((await params).slug); if (!p) notFound();
  const c = getCategory(p.category)!;
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  return (<><Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: c.name, href: `/collections/${c.slug}` }, { label: p.name }]} />
    <ProductDetail product={p} />{related.length > 0 && <Section title="You may also like"><ProductGrid items={related} /></Section>}</>);
}
