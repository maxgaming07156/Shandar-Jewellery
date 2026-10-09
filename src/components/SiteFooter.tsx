import Link from "next/link";
import { Logo } from "./Logo";
import { categories } from "@/lib/products";
import { WhatsAppLink } from "./WhatsAppButton";
import { WA } from "@/lib/whatsapp";
export function SiteFooter() {
  return (
    <footer className="mt-20 bg-burgundy text-champagne">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div><Logo light /><p className="mt-3 text-sm">Traditional and contemporary South Asian fashion jewellery, inspired by Pakistani celebrations. Imitation / gold-plated jewellery.</p></div>
        <nav aria-label="Shop"><h2 className="mb-3 font-serif text-lg text-ivory">Shop</h2><ul className="space-y-2 text-sm">{categories.map((c) => <li key={c.slug}><Link href={`/collections/${c.slug}`} className="inline-block py-1 hover:text-ivory">{c.name}</Link></li>)}</ul></nav>
        <nav aria-label="Quick links"><h2 className="mb-3 font-serif text-lg text-ivory">Quick links</h2><ul className="space-y-2 text-sm"><li><Link href="/shop" className="inline-block py-1">All jewellery</Link></li><li><Link href="/cart" className="inline-block py-1">Your bag</Link></li><li><Link href="/free-bracelet" className="inline-block py-1">Free bracelet</Link></li></ul></nav>
        <div><h2 className="mb-3 font-serif text-lg text-ivory">Contact</h2><p className="text-sm"><WhatsAppLink message={WA.general} className="underline">Message us on WhatsApp</WhatsAppLink></p><p className="mt-2 text-xs">Contact email, address and hours will be added by the business owner.</p></div>
      </div>
      <p className="border-t border-gold/30 px-4 py-4 text-center text-xs">© {new Date().getFullYear()} Shandar Jewellery. Demo store: checkout does not place real orders.</p>
    </footer>
  );
}
