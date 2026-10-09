import { parsePkMobile } from "./phone";
export const validateName = (v: string) => {
  const t = v.trim().replace(/\s+/g, " ");
  if (!t) return "Enter your full name.";
  if (t.length < 3 || !/\p{L}{2,}/u.test(t) || /\d/.test(t)) return "Enter your full name (letters only).";
  return "";
};
export const validateEmail = (v: string) => {
  const t = v.trim();
  if (!t) return "Enter your email address.";
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t) ? "" : "Enter a valid email address, e.g. name@example.com.";
};
export const validatePhone = (v: string) => (parsePkMobile(v).valid ? "" : parsePkMobile(v).error ?? "Invalid phone number.");
export const validateAddress = (v: string) => {
  const t = v.trim().replace(/\s+/g, " ");
  if (!t) return "Enter your complete delivery address.";
  if (t.length < 15 || t.split(" ").length < 3)
    return "Include house/building number, street, area and city. A city name alone is not enough.";
  return "";
};
export const validateRequired = (label: string) => (v: string) => (v.trim() ? "" : `Select or enter your ${label}.`);
export const PROVINCES = ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", "Islamabad Capital Territory", "Gilgit-Baltistan", "Azad Jammu & Kashmir"];
