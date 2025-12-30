"use client";

import { CURRENCIES } from "@/config/currency";
import { setCurrency } from "@/lib/currencyStore";

export default function CurrencySelector() {
    
  return (
    <div className="m-5 p-6 bg-accent-foreground dark:bg-gray-800 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
          Set Your Currency Preference
        </h2>
        <p className="text-sm sm:text-md text-gray-600 dark:text-gray-300 mt-1">
          Choose the currency you want to use throughout the app. You can update this anytime.
        </p>
      </div>

      <select
        className="mt-3 sm:mt-0 px-4 py-2 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition"
        defaultValue={localStorage.getItem("currency") || "INR"}
        onChange={(e) => {
          setCurrency(e.target.value);
          window.location.reload();
        }}
      >
        {Object.entries(CURRENCIES).map(([key, c]) => (
          <option key={key} value={key}>
            {c.label}
          </option>
        ))}
      </select>
    </div>
  );
}
