import Link from "next/link";
import { categories, products } from "@/lib/products";
import { ProductGrid } from "@/components/ProductCard";
import { ProductArt } from "@/components/ProductArt";
import { Section } from "@/components/Section";

const sample = (slug: string) => products.find((p) => p.category === slug)!;
export default function Home() {
  const best = products.filter((p) => p.bestseller).slice(0, 8);
  return (
    <>
      <section className="bg-burgundy text-ivory">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-champagne">Shandar Jewellery</p>
            <h1 className="mt-3 text-4xl leading-tight sm:text-6xl">Tradition, Worn Beautifully.</h1>
            <p className="mt-4 max-w-md text-champagne">Discover jewellery inspired by the beauty of Pakistani celebrations, timeless craftsmanship, and everyday elegance.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="inline-flex min-h-12 items-center bg-gold px-6 font-medium text-burgundy hover:bg-champagne">Shop the Collection</Link>
              <Link href="/free-bracelet" className="inline-flex min-h-12 items-center border border-champagne px-6 hover:bg-maroon">Claim Your Free Bracelet</Link>
            </div>
          </div>
          <div className="mx-auto aspect-square w-full max-w-md overflow-hidden border border-gold/50" role="img" aria-label="Illustration of gold jhumkas"><ProductArt category="jhumkas" tone="kundan" /></div>
        </div>
      </section>
      <Section title="Shop by category">
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {categories.map((c) => (
            <li key={c.slug}><Link href={`/collections/${c.slug}`} className="group block border border-champagne bg-white">
              <div className="aspect-[4/3] overflow-hidden"><div className="h-full w-full transition duration-500 group-hover:scale-105 motion-reduce:transition-none"><ProductArt category={c.slug} tone={sample(c.slug).tone} /></div></div>
              <div className="p-3 sm:p-4"><h3 className="text-lg text-maroon">{c.name}</h3><p className="text-sm text-muted">{c.blurb}</p></div>
            </Link></li>
          ))}
        </ul>
      </Section>
      <Section title="Bestsellers" href="/shop" cta="View all"><ProductGrid items={best} /></Section>
      <section className="mx-auto mt-14 max-w-7xl px-4 sm:mt-20">
        <div className="bg-maroon px-6 py-12 text-center text-ivory sm:py-16">
          <h2 className="text-3xl sm:text-4xl">A Little Gift, Just for You.</h2>
          <p className="mx-auto mt-3 max-w-xl text-champagne">Discover the Shandar experience with a complimentary bracelet. Submit your delivery details to request yours.</p>
          <p className="mx-auto mt-2 max-w-xl text-xs text-champagne">The bracelet and standard delivery are free, subject to the offer terms and stock availability. Submitting a request does not guarantee fulfilment.</p>
          <Link href="/free-bracelet" className="mt-6 inline-flex min-h-12 items-center bg-gold px-6 font-medium text-burgundy hover:bg-champagne">Request My Free Bracelet</Link>
        </div>
      </section>
      <Section title="Why shop with Shandar">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[["Delivery across Pakistan", "Intended nationwide delivery. Courier details are still being confirmed."], ["Cash on delivery", "COD is the intended payment option. This demo store does not process real orders."], ["WhatsApp support", "Message us with questions once the business number is configured."], ["Careful with your details", "Your free bracelet request is sent only to Shandar via EmailJS."]].map(([h, t]) => (
            <li key={h} className="border border-champagne bg-white p-5"><h3 className="text-lg text-maroon">{h}</h3><p className="mt-1 text-sm text-muted">{t}</p></li>))}
        </ul>
      </Section>
    </>
  );
}
