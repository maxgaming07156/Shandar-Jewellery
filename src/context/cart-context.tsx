"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from "react";
import { addLine, removeLine, sanitize, setQty, totals, type CartLine } from "@/lib/cart-logic";
import { getProduct, type Product } from "@/lib/products";

const STORAGE_KEY = "shandar-cart-v1";
type Action = { t: "hydrate"; lines: CartLine[] } | { t: "add"; p: Product; v?: string; qty: number } | { t: "qty"; key: string; qty: number } | { t: "remove"; key: string } | { t: "clear" };
const reducer = (s: CartLine[], a: Action): CartLine[] =>
  a.t === "hydrate" ? a.lines : a.t === "add" ? addLine(s, a.p, a.v, a.qty) : a.t === "qty" ? setQty(s, a.key, a.qty, getProduct) : a.t === "remove" ? removeLine(s, a.key) : [];

type Ctx = ReturnType<typeof totals> & {
  hydrated: boolean; drawerOpen: boolean; setDrawerOpen: (o: boolean) => void; announcement: string;
  add: (p: Product, variant: string | undefined, qty: number) => void;
  setQty: (key: string, qty: number) => void; remove: (key: string) => void; clear: () => void;
};
const CartContext = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => { // hydrate after mount to avoid SSR mismatch
    try { dispatch({ t: "hydrate", lines: sanitize(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]"), getProduct) }); } catch { /* corrupted: start empty */ }
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(lines.map(({ productId, variant, qty }) => ({ productId, variant, qty })))); } catch { /* storage unavailable */ }
  }, [lines, hydrated]);

  const add = useCallback((p: Product, variant: string | undefined, qty: number) => {
    dispatch({ t: "add", p, v: variant, qty });
    setAnnouncement(`${p.name} added to your bag`); setDrawerOpen(true);
  }, []);
  const value = useMemo<Ctx>(() => ({
    ...totals(lines, getProduct), hydrated, drawerOpen, setDrawerOpen, announcement, add,
    setQty: (key, qty) => dispatch({ t: "qty", key, qty }), remove: (key) => dispatch({ t: "remove", key }), clear: () => dispatch({ t: "clear" }),
  }), [lines, hydrated, drawerOpen, announcement, add]);
  return (
    <CartContext.Provider value={value}>
      {children}
      <div role="status" aria-live="polite" className="sr-only">{announcement}</div>
    </CartContext.Provider>
  );
}
export const useCart = () => { const c = useContext(CartContext); if (!c) throw new Error("useCart outside CartProvider"); return c; };
