"use client";
import { useRef, useState } from "react";
import { FormField } from "@/components/FormField";
import { parsePkMobile } from "@/lib/phone";
import { PROVINCES, validateAddress, validateEmail, validateName, validatePhone, validateRequired } from "@/lib/validation";
import { sendBraceletRequest } from "@/lib/emailjs-client";

type V = { name: string; email: string; phone: string; province: string; city: string; address: string };
const empty: V = { name: "", email: "", phone: "", province: "", city: "", address: "" };
type Status = "idle" | "sending" | "success" | "failed" | "unconfigured";

export function FreeBraceletForm() {
  const [v, setV] = useState<V>(empty); const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof V | "consent", string>>>({}); const [status, setStatus] = useState<Status>("idle");
  const busy = useRef(false); const formRef = useRef<HTMLFormElement>(null);
  const set = (k: keyof V) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setV((x) => ({ ...x, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy.current) return; // blocks double-clicks / double-submits before state updates
    const errs = { name: validateName(v.name), email: validateEmail(v.email), phone: validatePhone(v.phone), province: validateRequired("province")(v.province), city: validateRequired("city")(v.city), address: validateAddress(v.address), consent: consent ? "" : "Please confirm you have read the privacy notice and agree." };
    const filtered = Object.fromEntries(Object.entries(errs).filter(([, m]) => m)) as typeof errors; setErrors(filtered);
    if (Object.keys(filtered).length) { setTimeout(() => formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus(), 0); return; }
    busy.current = true; setStatus("sending");
    const phone = parsePkMobile(v.phone).e164!;
    const result = await sendBraceletRequest({
      name: v.name.trim().replace(/\s+/g, " "), email: v.email.trim(), phone,
      address: `${v.address.trim().replace(/\s+/g, " ")}, ${v.city.trim()}, ${v.province}`,
    });
    busy.current = false;
    if (result.ok) { setV(empty); setConsent(false); setStatus("success"); window.scrollTo({ top: 0 }); } // values kept on any failure
    else setStatus(result.reason === "unconfigured" ? "unconfigured" : "failed");
  };

  if (status === "success") return (
    <div role="status" className="border border-gold bg-white p-8 text-center">
      <h2 className="text-2xl text-maroon">Request submitted</h2>
      <p className="mt-3">Thank you for choosing Shandar Jewellery! Your free bracelet request has been submitted successfully. We&apos;ll review your request and contact you using the details provided.</p>
      <p className="mt-3 text-sm text-muted">Submitting a request does not guarantee fulfilment; we may contact you to confirm delivery details.</p>
    </div>
  );
  const sending = status === "sending", phone = parsePkMobile(v.phone);
  return (
    <form ref={formRef} onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2" aria-busy={sending}>
      {status === "unconfigured" && <div role="alert" className="border border-red-700 bg-red-50 p-3 text-sm sm:col-span-2"><strong>Email sending is not configured yet.</strong> Your request was not sent. Site owner: set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY (see SETUP.md) and restart the server. Your details are still in the form.</div>}
      {status === "failed" && <div role="alert" className="border border-red-700 bg-red-50 p-3 text-sm sm:col-span-2"><strong>We couldn&apos;t send your request.</strong> Please check your connection and try again. Your details are still in the form.</div>}
      <div className="sm:col-span-2"><FormField id="b-name" label="Full name" error={errors.name}>{(a) => <input {...a} autoComplete="name" value={v.name} onChange={set("name")} />}</FormField></div>
      <FormField id="b-email" label="Email address" error={errors.email}>{(a) => <input {...a} type="email" autoComplete="email" value={v.email} onChange={set("email")} />}</FormField>
      <FormField id="b-phone" label="Mobile number" error={errors.phone} hint={phone.valid ? `We will read this as ${phone.display}` : "e.g. 0300 1234567 or +92 300 1234567"}>{(a) => <input {...a} type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={set("phone")} />}</FormField>
      <FormField id="b-province" label="Province / territory" error={errors.province}>{(a) => <select {...a} autoComplete="address-level1" value={v.province} onChange={set("province")}><option value="">Select</option>{PROVINCES.map((p) => <option key={p}>{p}</option>)}</select>}</FormField>
      <FormField id="b-city" label="City" error={errors.city}>{(a) => <input {...a} autoComplete="address-level2" value={v.city} onChange={set("city")} />}</FormField>
      <div className="sm:col-span-2"><FormField id="b-address" label="Complete delivery address" error={errors.address} hint="House or building number, street, area and any delivery details. A city name alone is not enough.">{(a) => <textarea {...a} rows={3} autoComplete="street-address" value={v.address} onChange={set("address")} />}</FormField></div>
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "consent-err" : undefined} className="mt-1 h-5 w-5 shrink-0 accent-[#641E2B]" />
          <span className="text-sm">I have read the privacy notice below and agree to my details being used to process my free bracelet request and to contact me about it. <span className="text-maroon">*<span className="sr-only"> required</span></span></span></label>
        {errors.consent && <p id="consent-err" className="mt-1 text-sm font-medium text-red-800"><span aria-hidden="true">! </span>{errors.consent}</p>}
      </div>
      <button type="submit" disabled={sending} className="min-h-12 bg-maroon px-6 font-medium text-ivory hover:bg-burgundy disabled:cursor-wait disabled:opacity-70 sm:col-span-2">{sending ? "Sending your request..." : "Request my free bracelet"}</button>
      <p role="status" className="sr-only">{sending ? "Sending your request" : ""}</p>
    </form>
  );
}
