import test from "node:test";
import assert from "node:assert/strict";
import { formatDishPrice, priceLabels } from "../lib/dish-price.ts";
import { priceProvenanceLabel } from "../lib/price-provenance.ts";
import { previewLocales } from "../lib/locale-messages.ts";
import { locales } from "../lib/locales.ts";

test("currency remains the menu currency, not the interface language", () => {
  for (const locale of previewLocales) {
    for (const currency of ["NOK","SEK","DKK","EUR","ISK"]) {
      const dish = { priceMinor: 12500, priceMaxMinor: null, priceKind: "exact", currency };
      const expected = locale === "nb" && currency === "NOK" ? "125 kr" :
        new Intl.NumberFormat(locales[locale].intl, { style: "currency", currency, maximumFractionDigits: 0 }).format(125);
      assert.equal(formatDishPrice(dish, locale), expected);
      assert.equal(formatDishPrice({ ...dish, priceKind: "from" }, locale), priceLabels[locale][1] + " " + expected);
      assert.equal(formatDishPrice({ ...dish, priceMinor: null }, locale), priceLabels[locale][0]);
      const before = JSON.stringify(dish);
      formatDishPrice(dish, locale);
      assert.equal(JSON.stringify(dish), before);
    }
    assert.match(priceProvenanceLabel("https://wolt.com/menu", locale), /Wolt/);
    assert.match(priceProvenanceLabel("https://www.foodora.no/menu", locale), /Foodora/);
    assert.doesNotMatch(priceProvenanceLabel("https://wolt.com.example.org/menu", locale), /Wolt/);
  }
});
