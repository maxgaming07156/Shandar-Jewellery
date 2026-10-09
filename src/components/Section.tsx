import Link from "next/link";
export const Section = ({ title, href, cta, children }: { title: string; href?: string; cta?: string; children: React.ReactNode }) => (
  <section className="mx-auto max-w-7xl px-4 pt-14 sm:pt-20">
    <div className="mb-6 flex items-end justify-between gap-4"><h2 className="text-2xl text-maroon sm:text-3xl">{title}</h2>{href && <Link href={href} className="shrink-0 py-2 text-sm text-golddeep underline">{cta}</Link>}</div>
    {children}
  </section>
);
export const Breadcrumb = ({ trail }: { trail: { label: string; href?: string }[] }) => (
  <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-5 text-sm text-muted"><ol className="flex flex-wrap gap-1">{trail.map((t, i) => (<li key={t.label} className="flex gap-1">{t.href ? <a href={t.href} className="underline">{t.label}</a> : <span aria-current="page" className="text-ink">{t.label}</span>}{i < trail.length - 1 && <span aria-hidden="true">/</span>}</li>))}</ol></nav>
);
