import test from "node:test";
import assert from "node:assert/strict";
import { previewLocales } from "../lib/locale-messages.ts";
import { knowledgeMessages, knowledgeText } from "../lib/knowledge-messages.ts";
import { localizedSummary, translatedSummaryIds } from "../lib/dish-summary-translations.ts";

test("food encyclopedia copy preserves all interpolation placeholders", () => {
  const tokens = (text) => [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
  for (const locale of previewLocales) {
    assert.deepEqual(Object.keys(knowledgeMessages[locale]), Object.keys(knowledgeMessages.nb));
    for (const [key, value] of Object.entries(knowledgeMessages[locale])) {
      assert.ok(value.trim());
      assert.deepEqual(tokens(value), tokens(knowledgeMessages.nb[key]));
    }
  }
  assert.equal(knowledgeText("sv", "find", { name: "Dal makhani" }), "Hitta Dal makhani");
});

test("featured dishes and Dal makhani have translated summaries", () => {
  assert.equal(translatedSummaryIds.length, 12);
  for (const id of ["ramen", "biryani", "falafel", "carbonara", "tacos-al-pastor", "pad-thai", "dal-makhani"]) {
    assert.ok(translatedSummaryIds.includes(id));
    for (const locale of previewLocales.filter((value) => value !== "nb")) {
      const summary = localizedSummary(id, "original", locale);
      assert.equal(summary.lang, locale);
      assert.notEqual(summary.text, "original");
    }
  }
});

test("untranslated articles and Bokmål retain the exact original text and language", () => {
  assert.deepEqual(localizedSummary("unknown", "Original tekst", "sv"), { text: "Original tekst", lang: "nb" });
  assert.deepEqual(localizedSummary("ramen", "Original tekst", "nb"), { text: "Original tekst", lang: "nb" });
});
