import { getCurrency } from "./currencyStore";

export function formatCurrency(amount: number) {
  const currency = getCurrency();

  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
  }).format(amount);
}
