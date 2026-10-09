# Setup: EmailJS, WhatsApp, deployment

EmailJS may require account verification and a plan that fits your volume. Check current limits in your dashboard.

1. Create an account at emailjs.com.
2. **Email Services > Add service**: connect the sending mailbox (e.g. Gmail). Note the **Service ID**.
3. **Email Templates > Create**. Set **To email** to `cq07156@gmail.com`, **Reply-To** to `{{reply_to}}`, **Subject** `New Free Bracelet Request — Shandar Jewellery`. Body:
```
New free bracelet request

--- Submitted by customer ---
Name: {{customer_name}}
Email: {{customer_email}}
Phone: {{customer_phone}}
Delivery address: {{delivery_address}}

--- System metadata ---
Submitted at (UTC): {{submitted_at}}
Offer: {{offer}}
```
   Variable names must match exactly: `customer_name, customer_email, reply_to, customer_phone, delivery_address, submitted_at, offer`. Note the **Template ID**.
4. **Account > General**: copy the **Public Key**.
5. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`. **Restart `npm run dev`** after any change.
6. Production: add the same three variables in your host's environment settings (e.g. Vercel > Project > Settings > Environment Variables) and redeploy (they are inlined at build time).
7. Test: submit the form in dev, then on the deployed site; confirm the email arrives at cq07156@gmail.com. Unconfigured = the form shows a configuration error, never a success.
8. Abuse controls: in the EmailJS dashboard restrict allowed domains (Security) and enable its spam protections where offered. A public browser key cannot replace server-side rate limiting; duplicate-click prevention here is client-side only. Plan a backend/CAPTCHA before any large campaign.

## WhatsApp
Set `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits with country code, e.g. `923XXXXXXXXX`). Empty = the floating button is hidden and links show "not available yet".

## Owner must provide before launch
EmailJS service/template/public key (+ domain restriction); WhatsApp number; contact email, address, hours (when published); delivery fee/free-delivery rule and courier policy; returns policy; real product photos and verified stock/prices; privacy policy and terms review.
