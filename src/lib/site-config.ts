export const siteConfig = {
  name: "Shandar Jewellery",
  tagline: "Traditional elegance, delivered across Pakistan.",
  // Digits only incl. country code. Empty = WhatsApp unavailable (never fabricate a number).
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  braceletRecipient: "cq07156@gmail.com", // set in the EmailJS template, documented in SETUP.md
  delivery: { fee: 200, freeOver: null as number | null }, // PKR; configurable
  maxQtyPerLine: 10,
};
