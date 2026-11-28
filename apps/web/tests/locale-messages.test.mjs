import test from "node:test";
import assert from "node:assert/strict";
import { messages, previewLocales, isPreviewLocale, translate } from "../lib/locale-messages.ts";

test("each preview locale has exactly the Bokmål message keys", () => {
  for (const locale of previewLocales) {
    assert.deepEqual(Object.keys(messages[locale]).sort(), Object.keys(messages.nb).sort(), locale);
    for (const [key, text] of Object.entries(messages[locale])) {
      assert.ok(text.trim(), locale + ":" + key);
      assert.equal(text.includes("{city}"), messages.nb[key].includes("{city}"), locale + ":" + key);
    }
  }
});

test("planned but unreviewed locales are not selectable in the preview", () => {
  for (const locale of ["fo", "kl", "se", "fr", "pt", "es", "de", "constructor"]) assert.equal(isPreviewLocale(locale), false);
});

test("city substitution preserves the actual city and never changes search identity", () => {
  assert.equal(translate("sv", "allDishes", "København"), "Se alla maträtter i København");
  assert.equal(translate("nb", "selectedCity", "Oslo"), "Valgt by: Oslo");
});
