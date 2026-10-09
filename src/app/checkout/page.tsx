"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { useCart } from "@/context/cart-context";
import { formatPKR } from "@/lib/currency";
import { parsePkMobile } from "@/lib/phone";
import { PROVINCES, validateAddress, validateEmail, validateName, validatePhone, validateRequired } from "@/lib/validation";
import { FormField } from "@/components/FormField";

type V = { name: string; email: string; phone: string; province: string; city: string; address: string; notes: string };
const empty: V = { name: "", email: "", phone: "", province: "", city: "", address: "", notes: "" };
type Done = { ref: string; items: { name: string; qty: number; variant?: string; lineTotal: number }[]; subtotal: number; delivery: number; total: number };

export default function Checkout() {
  const { items, hydrated, subtotal, delivery, total, clear } = useCart();
  const [v, setV] = useState<V>(empty); const [errors, setErrors] = useState<Partial<Record<keyof V, string>>>({}); const [done, setDone] = useState<Done | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const set = (k: keyof V) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setV((x) => ({ ...x, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = { name: validateName(v.name), email: validateEmail(v.email), phone: validatePhone(v.phone), province: validateRequired("province")(v.province), city: validateRequired("city")(v.city), address: validateAddress(v.address) };
    const filtered = Object.fromEntries(Object.entries(errs).filter(([, m]) => m)) as typeof errors; setErrors(filtered);
    if (Object.keys(filtered).length) { setTimeout(() => formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus(), 0); return; }
    // totals come from the cart (recomputed from the product dataset), never from form values
    setDone({ ref: `DEMO-${Date.now().toString(36).toUpperCase()}`, items: items.map((i) => ({ name: i.product.name, qty: i.qty, variant: i.variant, lineTotal: i.lineTotal })), subtotal, delivery, total });
    clear(); window.scrollTo({ top: 0 });
  };

  if (!hydrated) return <p role="status" className="p-10 text-center text-muted">Loading...</p>;
  if (done) return (
    <div className="mx-auto max-w-2xl px-4 py-12" role="status">
      <h1 className="text-3xl text-maroon">Demo order summary</h1>
      <p className="mt-3 border border-gold bg-champagne/40 p-4 font-medium">This is a demonstration checkout. Your order has not been sent to Shandar Jewellery.</p>
      <p className="mt-4 text-sm text-muted">Demo reference: <strong className="text-ink">{done.ref}</strong>. No personal details were stored or transmitted.</p>
      <ul className="mt-4 divide-y divide-champagne border-y border-champagne">{done.items.map((i, k) => <li key={k} className="flex justify-between gap-3 py-2 text-sm"><span>{i.name}{i.variant ? ` (${i.variant})` : ""} x {i.qty}</span><span>{formatPKR(i.lineTotal)}</span></li>)}</ul>
      <dl className="mt-3 space-y-1 text-sm"><div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPKR(done.subtotal)}</dd></div><div className="flex justify-between"><dt>Delivery</dt><dd>{formatPKR(done.delivery)}</dd></div><div className="flex justify-between text-base font-semibold"><dt>Total (Cash on Delivery)</dt><dd>{formatPKR(done.total)}</dd></div></dl>
      <Link href="/shop" className="mt-6 inline-flex min-h-12 items-center bg-maroon px-6 text-ivory">Continue shopping</Link>
    </div>
  );
  if (!items.length) return (<div className="mx-auto max-w-xl px-4 py-20 text-center"><h1 className="text-3xl text-maroon">Checkout</h1><p className="mt-3 text-muted">Your bag is empty.</p><Link href="/shop" className="mt-5 inline-flex min-h-11 items-center bg-maroon px-6 text-ivory">Continue shopping</Link></div>);

  const phone = parsePkMobile(v.phone);
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl text-maroon sm:text-4xl">Checkout</h1>
      <p className="mt-3 border border-gold bg-champagne/40 p-3 text-sm">Demonstration checkout only: no payment is taken and no order is sent to Shandar Jewellery.</p>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <form ref={formRef} onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2"><FormField id="name" label="Full name" error={errors.name}>{(a) => <input {...a} autoComplete="name" value={v.name} onChange={set("name")} />}</FormField></div>
          <FormField id="email" label="Email address" error={errors.email}>{(a) => <input {...a} type="email" autoComplete="email" value={v.email} onChange={set("email")} />}</FormField>
          <FormField id="phone" label="Mobile number" error={errors.phone} hint={phone.valid ? `We will read this as ${phone.display}` : "e.g. 0300 1234567 or +92 300 1234567"}>{(a) => <input {...a} type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={set("phone")} />}</FormField>
          <FormField id="province" label="Province / territory" error={errors.province}>{(a) => <select {...a} autoComplete="address-level1" value={v.province} onChange={set("province")}><option value="">Select</option>{PROVINCES.map((p) => <option key={p}>{p}</option>)}</select>}</FormField>
          <FormField id="city" label="City" error={errors.city}>{(a) => <input {...a} autoComplete="address-level2" value={v.city} onChange={set("city")} />}</FormField>
          <div className="sm:col-span-2"><FormField id="address" label="Complete delivery address" error={errors.address} hint="House/building number, street, area and city.">{(a) => <textarea {...a} rows={3} autoComplete="street-address" value={v.address} onChange={set("address")} />}</FormField></div>
          <div className="sm:col-span-2"><FormField id="notes" label="Address instructions" required={false}>{(a) => <textarea {...a} rows={2} value={v.notes} onChange={set("notes")} />}</FormField></div>
          <fieldset className="border border-champagne bg-white p-4 sm:col-span-2"><legend className="px-1 text-sm font-medium">Payment</legend>
            <label className="flex items-center gap-3"><input type="radio" checked readOnly className="h-5 w-5 accent-[#641E2B]" /><span>Cash on Delivery (COD)</span></label><p className="mt-1 text-xs text-muted">Pay in cash when your order arrives. We never ask for card or bank details.</p></fieldset>
          <button type="submit" className="min-h-12 bg-maroon px-6 font-medium text-ivory hover:bg-burgundy sm:col-span-2">Place demo order</button>
        </form>
        <aside className="h-fit border border-champagne bg-white p-5" aria-label="Order summary">
          <h2 className="text-xl">Order summary</h2>
          <ul className="mt-3 divide-y divide-champagne text-sm">{items.map((i) => <li key={i.key} className="flex justify-between gap-3 py-2"><span>{i.product.name}{i.variant ? ` (${i.variant})` : ""} x {i.qty}</span><span>{formatPKR(i.lineTotal)}</span></li>)}</ul>
          <dl className="mt-3 space-y-1 text-sm"><div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPKR(subtotal)}</dd></div><div className="flex justify-between"><dt>Delivery (flat estimate, not a courier quote)</dt><dd>{formatPKR(delivery)}</dd></div><div className="flex justify-between border-t border-champagne pt-2 text-base font-semibold"><dt>Total</dt><dd>{formatPKR(total)}</dd></div></dl>
          <Link href="/cart" className="mt-3 inline-block text-sm underline">Edit bag</Link>
        </aside>
      </div>
    </div>
  );
}
