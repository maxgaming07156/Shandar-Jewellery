import { siteConfig } from "./site-config";
export const WA = {
  general: "Assalam-o-Alaikum! I have a question about Shandar Jewellery.",
  product: (name: string) => `Assalam-o-Alaikum! I would like to know more about ${name}.`,
  bracelet: "Assalam-o-Alaikum! I have a question about the Shandar Jewellery free bracelet offer.",
};
/** Returns null unless a plausible number (8-15 digits) is configured. */
export function whatsappLink(message: string, number: string = siteConfig.whatsappNumber): string | null {
  const digits = number.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
