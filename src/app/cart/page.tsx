"use client";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { CartLines } from "@/components/CartDrawer";
import { formatPKR } from "@/lib/currency";
export default function CartPage() {
  const { items, hydrated, subtotal, delivery, total, clear } = useCart();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl text-maroon sm:text-4xl">Your bag</h1>
      {!hydrated ? <p role="status" className="mt-8 text-muted">Loading your bag...</p> : !items.length ? (
        <div className="mt-8 border border-champagne bg-white p-12 text-center"><p className="font-serif text-xl">Your bag is empty</p><p className="mt-1 text-muted">Find something beautiful to wear.</p><Link href="/shop" className="mt-5 inline-flex min-h-11 items-center bg-maroon px-6 text-ivory">Continue shopping</Link></div>
      ) : (
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_20rem]">
          <div><CartLines /><button type="button" onClick={clear} className="mt-2 min-h-11 text-sm text-muted underline">Clear bag</button></div>
          <aside className="h-fit border border-champagne bg-white p-5" aria-label="Order summary">
            <h2 className="text-xl">Summary</h2>
            <dl className="mt-3 space-y-2 text-sm"><div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPKR(subtotal)}</dd></div><div className="flex justify-between"><dt>Delivery (estimate)</dt><dd>{formatPKR(delivery)}</dd></div><div className="flex justify-between border-t border-champagne pt-2 text-base font-semibold"><dt>Total</dt><dd>{formatPKR(total)}</dd></div></dl>
            <Link href="/checkout" className="mt-4 flex min-h-12 items-center justify-center bg-maroon text-ivory">Proceed to checkout</Link>
            <Link href="/shop" className="mt-2 flex min-h-11 items-center justify-center text-sm underline">Continue shopping</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
