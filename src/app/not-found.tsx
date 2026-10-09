import Link from "next/link";
export default function NotFound() {
  return (<div className="mx-auto max-w-xl px-4 py-24 text-center"><h1 className="text-4xl text-maroon">Page not found</h1><p className="mt-3 text-muted">We could not find that page. It may have moved.</p><Link href="/shop" className="mt-6 inline-flex min-h-11 items-center bg-maroon px-6 text-ivory">Browse the collection</Link></div>);
}
