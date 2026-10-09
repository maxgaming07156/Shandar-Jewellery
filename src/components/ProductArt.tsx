import type { CategorySlug, Tone } from "@/lib/products";
const stone: Record<Tone, string> = { gold: "#D9B96A", pearl: "#F4EFE6", ruby: "#9B1B30", emerald: "#1F6B4F", kundan: "#F8F1DF" };
/** Illustrated fallback used until real product photography is added to /public/products. Decorative. */
export function ProductArt({ category, tone }: { category: CategorySlug; tone: Tone }) {
  const s = stone[tone], g = "#B89148";
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true" focusable="false">
      <rect width="200" height="200" fill="#F3E7CE" /><circle cx="100" cy="100" r="82" fill="#FFF9F0" opacity=".7" />
      <g fill="none" stroke={g} strokeWidth="3" strokeLinecap="round">
        {category === "jhumkas" && [62, 138].map((x) => (<g key={x}><circle cx={x} cy="52" r="6" fill={s} /><path d={`M${x - 24} 100 Q${x} 62 ${x + 24} 100 Z`} fill={g} fillOpacity=".25" /><path d={`M${x - 24} 100 H${x + 24}`} />{[-16, 0, 16].map((d) => <circle key={d} cx={x + d} cy="114" r="5" fill={s} />)}</g>))}
        {category === "bangles" && [0, 1, 2].map((i) => <ellipse key={i} cx="100" cy="100" rx={70 - i * 12} ry={70 - i * 12} strokeWidth={i === 1 ? 8 : 4} stroke={i === 1 ? s : g} />)}
        {category === "necklaces" && (<g><path d="M30 60 Q100 190 170 60" strokeWidth="4" />{[50, 70, 90, 110, 130, 150].map((x, i) => <circle key={x} cx={x} cy={[78, 110, 128, 128, 110, 78][i]} r="5" fill={s} />)}<path d="M100 134 l12 18 -12 20 -12 -20 z" fill={s} /></g>)}
        {category === "rings" && (<g><circle cx="100" cy="122" r="46" strokeWidth="9" /><path d="M100 54 l22 24 -22 24 -22 -24 z" fill={s} /></g>)}
        {category === "bracelets" && (<g><ellipse cx="100" cy="100" rx="72" ry="46" strokeWidth="6" />{Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2; return <circle key={i} cx={100 + 72 * Math.cos(a)} cy={100 + 46 * Math.sin(a)} r="6" fill={s} />; })}</g>)}
        {category === "tikka-sets" && (<g><path d="M30 40 Q100 20 170 40" /><path d="M100 30 V70" /><path d="M100 70 l24 32 -24 40 -24 -40 z" fill={s} fillOpacity=".9" /><circle cx="100" cy="160" r="9" fill={s} /><circle cx="52" cy="110" r="10" fill={s} /><circle cx="148" cy="110" r="10" fill={s} /></g>)}
      </g>
    </svg>
  );
}
