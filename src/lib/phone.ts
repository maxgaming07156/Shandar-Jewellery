export type PhoneResult = { valid: boolean; e164?: string; display?: string; error?: string };
/** Accepts 03XXXXXXXXX, 3XXXXXXXXX, 923XXXXXXXXX, +923XXXXXXXXX, 00923XXXXXXXXX (spaces/dashes ok). */
export function parsePkMobile(input: string): PhoneResult {
  let s = input.trim().replace(/[\s\-().]/g, "");
  if (!s) return { valid: false, error: "Enter your mobile number." };
  if (!/^\+?\d+$/.test(s)) return { valid: false, error: "Use digits only, e.g. 0300 1234567 or +92 300 1234567." };
  if (s.startsWith("+")) s = s.slice(1);
  if (s.startsWith("0092")) s = s.slice(4);
  else if (s.startsWith("92")) s = s.slice(2);
  else if (s.startsWith("0")) s = s.slice(1);
  if (!/^3[0-4]\d{8}$/.test(s))
    return { valid: false, error: "Enter a valid Pakistani mobile number, e.g. 0300 1234567 or +92 300 1234567." };
  return { valid: true, e164: `+92${s}`, display: `0${s.slice(0, 3)} ${s.slice(3)}` };
}
