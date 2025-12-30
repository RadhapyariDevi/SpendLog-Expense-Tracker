import { CURRENCIES } from "@/config/currency";

const DEFAULT = "INR";
const KEY = "currency";

export function getCurrency() {
  const saved = localStorage.getItem(KEY);
  return saved && saved in CURRENCIES ? CURRENCIES[saved as keyof typeof CURRENCIES] : CURRENCIES[DEFAULT];
}

export function setCurrency(key: keyof typeof CURRENCIES) {
  localStorage.setItem(KEY, key);
}
