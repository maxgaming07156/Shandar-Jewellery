"use client";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { whatsappLink, WA } from "@/lib/whatsapp";
/** Hidden on checkout/cart so it never covers primary actions; sits above the safe area on mobile. */
export function WhatsAppButton({ message = WA.general }: { message?: string }) {
  const path = usePathname();
  const href = whatsappLink(message);
  if (!href || path.startsWith("/checkout") || path.startsWith("/cart")) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp (opens in a new tab)"
      className="fixed bottom-4 right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#1E7F4F] text-white shadow-lg hover:bg-[#17653E]"><MessageCircle aria-hidden="true" /></a>
  );
}
export function WhatsAppLink({ message, children, className = "" }: { message: string; children: React.ReactNode; className?: string }) {
  const href = whatsappLink(message);
  if (!href) return <span className={`text-sm text-muted ${className}`}>WhatsApp support is not available yet.</span>;
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}<span className="sr-only"> (opens in a new tab)</span></a>;
}
