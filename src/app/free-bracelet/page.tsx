import type { Metadata } from "next";
import { FreeBraceletForm } from "./FreeBraceletForm";
import { ProductArt } from "@/components/ProductArt";
import { WhatsAppLink } from "@/components/WhatsAppButton";
import { WA } from "@/lib/whatsapp";
export const metadata: Metadata = { title: "Free Bracelet Request", description: "Request a complimentary Shandar Jewellery bracelet. Free bracelet, free standard delivery, subject to stock and offer terms." };
export default function FreeBracelet() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="grid items-center gap-8 md:grid-cols-[1fr_16rem]">
        <div>
          <h1 className="text-3xl text-maroon sm:text-5xl">Your First Shandar Gift Is on Us</h1>
          <p className="mt-4">Receive a complimentary bracelet from Shandar Jewellery. Complete the form below with your contact and delivery details so we can review your request and arrange delivery.</p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted"><li>The bracelet and standard delivery are free. No purchase is required and you are not charged for submitting.</li><li>Availability is subject to stock and the published offer terms.</li><li>This is a request, not a guarantee of fulfilment.</li></ul>
        </div>
        <div className="hidden aspect-square overflow-hidden border border-champagne md:block" role="img" aria-label="Illustration of a gold bracelet"><ProductArt category="bracelets" tone="pearl" /></div>
      </div>
      <div className="mt-10"><p className="mb-4 text-sm">Fields marked <span className="text-maroon">*</span> are required.</p><FreeBraceletForm /></div>
    </div>
  );
}
