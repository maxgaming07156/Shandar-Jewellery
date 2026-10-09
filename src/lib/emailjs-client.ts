import emailjs from "@emailjs/browser";

export type BraceletPayload = { name: string; email: string; phone: string; address: string };
export type SendResult = { ok: true } | { ok: false; reason: "unconfigured" | "failed" };
type Sender = (service: string, template: string, params: Record<string, string>, publicKey: string) => Promise<{ status: number }>;

const defaultSender: Sender = (s, t, p, k) => emailjs.send(s, t, p, { publicKey: k });

/** Template variables - must match the EmailJS template (see SETUP.md). Recipient is set in the template. */
export function buildParams(p: BraceletPayload, now = new Date()) {
  return {
    customer_name: p.name,
    customer_email: p.email,
    reply_to: p.email,
    customer_phone: p.phone,
    delivery_address: p.address,
    submitted_at: now.toISOString(),
    offer: "Free Bracelet Request",
  };
}

export async function sendBraceletRequest(
  p: BraceletPayload,
  env = {
    service: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    template: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    key: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  },
  sender: Sender = defaultSender,
): Promise<SendResult> {
  const missing = (v?: string) => !v || v.startsWith("your_");
  if (missing(env.service) || missing(env.template) || missing(env.key)) return { ok: false, reason: "unconfigured" };
  try {
    const res = await sender(env.service!, env.template!, buildParams(p), env.key!);
    return res.status === 200 ? { ok: true } : { ok: false, reason: "failed" };
  } catch {
    return { ok: false, reason: "failed" }; // never log the payload or error body (may contain PII)
  }
}
