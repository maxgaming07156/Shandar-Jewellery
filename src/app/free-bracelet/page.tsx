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
      <section className="mt-10 border border-champagne bg-white p-5 text-sm" aria-labelledby="privacy-h">
        <h2 id="privacy-h" className="text-xl text-maroon">Privacy notice</h2>
        <p className="mt-2">We collect your name, email, mobile number and delivery address only to review and process this request and contact you about it. When you submit, your details are sent through EmailJS, our email service provider, to the Shandar Jewellery inbox. We do not store them in your browser, use them for marketing, or subscribe you to anything. This site has no custom backend yet; a full privacy policy page will be added.</p>
        <p className="mt-2">Questions? <WhatsAppLink message={WA.bracelet} className="text-maroon underline">Ask on WhatsApp</WhatsAppLink></p>
      </section>
    </div>
  );
}
