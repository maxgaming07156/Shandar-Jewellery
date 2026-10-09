import assert from "node:assert/strict";
import { products, getProduct, filterProducts, categories } from "../src/lib/products";
import { addLine, setQty, removeLine, sanitize, totals } from "../src/lib/cart-logic";
import { parsePkMobile } from "../src/lib/phone";
import { validateAddress, validateEmail, validateName } from "../src/lib/validation";
import { whatsappLink, WA } from "../src/lib/whatsapp";
import { sendBraceletRequest, buildParams } from "../src/lib/emailjs-client";
import { formatPKR } from "../src/lib/currency";

let n = 0; const t = (name: string, f: () => void | Promise<void>) => Promise.resolve(f()).then(() => { n++; console.log("ok -", name); });
(async () => {
  await t("24+ unique products, 4+ per category, unique slugs/SKUs", () => {
    assert.ok(products.length >= 24);
    assert.equal(new Set(products.map((p) => p.slug)).size, products.length);
    assert.equal(new Set(products.map((p) => p.sku)).size, products.length);
    for (const c of categories) assert.ok(products.filter((p) => p.category === c.slug).length >= 4, c.slug);
    assert.ok(products.every((p) => Number.isInteger(p.price) && (!p.originalPrice || p.originalPrice > p.price)));
  });
  await t("search/filter/sort", () => {
    assert.ok(filterProducts(products, { q: "kundan" }).length > 3);
    assert.equal(filterProducts(products, { category: "rings" }).length, 4);
    const r = filterProducts(products, { min: 1000, max: 1500, sort: "price-asc" });
    assert.ok(r.every((p) => p.price >= 1000 && p.price <= 1500));
    assert.deepEqual(r.map((p) => p.price), [...r.map((p) => p.price)].sort((a, b) => a - b));
    assert.equal(filterProducts(products, { q: "zzzz" }).length, 0);
    assert.equal(filterProducts(products, { sort: "newest" })[0].name, "Dulhan Polki Jewellery Set");
  });
  const by = getProduct;
  await t("cart add/merge/variants/qty/remove/stock cap", () => {
    const ring = products.find((p) => p.category === "rings")!, bangle = products.find((p) => p.category === "bangles")!;
    let l = addLine([], ring, "Adjustable", 1);
    l = addLine(l, ring, "Adjustable", 2); assert.equal(l.length, 1); assert.equal(l[0].qty, 3);
    l = addLine(l, bangle, "2.4", 1); l = addLine(l, bangle, "2.6", 1); assert.equal(l.length, 3);
    l = setQty(l, l[0].key, 0, by); assert.equal(l[0].qty, 1);
    l = setQty(l, l[0].key, 999, by); assert.equal(l[0].qty, 10);
    const low = products.find((p) => p.stock === 3)!; assert.equal(addLine([], low, undefined, 9)[0].qty, 3);
    assert.equal(removeLine(l, l[0].key).length, 2);
  });
  await t("totals recomputed from dataset; delivery Rs. 200; free bracelet delivery", () => {
    const a = products[0], l = addLine(addLine([], a, undefined, 2), products[1], undefined, 1);
    const tt = totals(l, by); assert.equal(tt.subtotal, a.price * 2 + products[1].price);
    assert.equal(tt.delivery, 200); assert.equal(tt.total, tt.subtotal + 200); assert.equal(tt.count, 3);
    assert.equal(totals([], by).delivery, 0); assert.equal(totals(l, by, true).delivery, 0);
    assert.equal(formatPKR(1850), "Rs. 1,850");
  });
  await t("corrupted storage sanitised", () => {
    const ring = products.find((p) => p.category === "rings")!;
    assert.deepEqual(sanitize("junk", by), []); assert.deepEqual(sanitize(null, by), []);
    const s = sanitize([{ productId: "nope", qty: 1 }, { productId: ring.id, qty: 1 }, { productId: ring.id, variant: "Adjustable", qty: -4 },
      { productId: ring.id, variant: "Adjustable", qty: "x" }, 5, { productId: products[0].id, qty: 2, price: 1 }], by);
    assert.equal(s.length, 2); assert.equal(s[0].qty, 1); assert.equal(s[1].productId, products[0].id);
  });
  await t("Pakistani phone formats", () => {
    for (const ok of ["03001234567", "0300 1234567", "0300-1234567", "+923001234567", "+92 300 1234567", "923001234567", "00923001234567", "3001234567"])
      assert.equal(parsePkMobile(ok).e164, "+923001234567", ok);
    for (const bad of ["", "0300123456", "02001234567", "+921234567890", "abc", "030012345678"]) assert.equal(parsePkMobile(bad).valid, false, bad);
  });
  await t("form validators", () => {
    assert.ok(validateName("")); assert.ok(validateName("A")); assert.ok(validateName("12345")); assert.equal(validateName("Ayesha Khan"), "");
    assert.ok(validateEmail("bad")); assert.ok(validateEmail("a@b")); assert.equal(validateEmail(" a@b.pk "), "");
    assert.ok(validateAddress("Lahore")); assert.ok(validateAddress("")); assert.equal(validateAddress("House 12, Street 4, Gulberg III, Lahore"), "");
  });
  await t("whatsapp link only when configured, encoded", () => {
    assert.equal(whatsappLink(WA.general, ""), null);
    assert.equal(whatsappLink(WA.general, "abc"), null);
    const u = whatsappLink(WA.product("Noor Kundan Jhumkas"), "+92 300 1234567")!;
    assert.ok(u.startsWith("https://wa.me/923001234567?text=")); assert.ok(u.includes("Noor%20Kundan%20Jhumkas"));
  });
  await t("EmailJS: unconfigured never succeeds; success only on 200; failure reported; params match template", async () => {
    const p = { name: "Ayesha Khan", email: "a@b.pk", phone: "+923001234567", address: "House 12, Street 4, Gulberg III, Lahore" };
    let called = 0; const ok = async () => { called++; return { status: 200 }; };
    assert.deepEqual(await sendBraceletRequest(p, { service: undefined, template: "t", key: "k" }, ok), { ok: false, reason: "unconfigured" });
    assert.deepEqual(await sendBraceletRequest(p, { service: "your_service_id_here", template: "t", key: "k" }, ok), { ok: false, reason: "unconfigured" });
    assert.equal(called, 0);
    assert.deepEqual(await sendBraceletRequest(p, { service: "s", template: "t", key: "k" }, ok), { ok: true });
    assert.deepEqual(await sendBraceletRequest(p, { service: "s", template: "t", key: "k" }, async () => ({ status: 500 })), { ok: false, reason: "failed" });
    assert.deepEqual(await sendBraceletRequest(p, { service: "s", template: "t", key: "k" }, async () => { throw new Error("x"); }), { ok: false, reason: "failed" });
    assert.deepEqual(Object.keys(buildParams(p)).sort(), ["customer_email", "customer_name", "customer_phone", "delivery_address", "offer", "reply_to", "submitted_at"]);
  });
  console.log(`\n${n} test groups passed`);
})().catch((e) => { console.error("FAIL", e); process.exit(1); });
