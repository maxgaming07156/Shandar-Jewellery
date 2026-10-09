import Link from "next/link";
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label="Shandar Jewellery home" className="inline-flex items-center gap-2">
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true" className="text-gold"><path fill="currentColor" d="M13 1l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" /></svg>
      <span className="leading-none"><span className={`block font-serif text-xl tracking-wide ${light ? "text-ivory" : "text-maroon"}`}>Shandar</span><span className={`block text-[10px] uppercase tracking-[0.35em] ${light ? "text-champagne" : "text-golddeep"}`}>Jewellery</span></span>
    </Link>
  );
}
