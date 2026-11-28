import test from "node:test";
import assert from "node:assert/strict";
import { previewLocales } from "../lib/locale-messages.ts";
import { resultMessages, resultText } from "../lib/result-messages.ts";

const placeholders = (value) => [...value.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();

test("all result dictionaries preserve keys and interpolation parameters", () => {
  for (const locale of previewLocales) {
    assert.deepEqual(Object.keys(resultMessages[locale]).sort(), Object.keys(resultMessages.nb).sort());
    for (const [key, value] of Object.entries(resultMessages[locale])) {
      assert.ok(value.trim(), locale + ":" + key);
      assert.deepEqual(placeholders(value), placeholders(resultMessages.nb[key]), locale + ":" + key);
    }
    assert.notEqual(resultText(locale, "similar"), resultText(locale, "verified"));
  }
});

test("counts and original restaurant names survive translation", () => {
  assert.equal(resultText("sv", "count", { visible: 2, total: 5 }), "Visar 2 av 5 hämtade maträttsträffar");
  assert.equal(resultText("en", "mapTitle", { name: "København $&" }), "Map: København $&");
  assert.equal(resultText("nb", "similar"), "Lignende rett – kontroller menyen");
});
