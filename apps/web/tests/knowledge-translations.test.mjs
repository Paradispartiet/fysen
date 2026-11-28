import test from "node:test";
import assert from "node:assert/strict";
import { foodKnowledgeDishIds } from "../content/food-knowledge/manifest.ts";
import { additionalDishes } from "../content/food-knowledge/articles/additional-dishes.ts";
import { dishDisplayName } from "../lib/dish-display-names.ts";
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

test("all original encyclopedia summaries are translated, with explicit Bokmål fallback for new articles", () => {
  const addedIds = new Set(additionalDishes.map((dish) => dish.dishId));
  const originalIds = foodKnowledgeDishIds.filter((id) => !addedIds.has(id));
  assert.equal(translatedSummaryIds.length, 33);
  assert.deepEqual([...translatedSummaryIds].sort(), [...originalIds].sort());
  for (const dish of additionalDishes) {
    for (const locale of previewLocales) {
      assert.deepEqual(localizedSummary(dish.dishId, dish.summary, locale), { text: dish.summary, lang: "nb" });
    }
  }
  for (const id of originalIds) {
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

test("dish display labels leave Norwegian and international dish names intact", () => {
  assert.equal(dishDisplayName("fish-taco", "Fish taco", "sv"), "Fisktaco");
  assert.equal(dishDisplayName("fish-taco", "Fish taco", "nb"), "Fish taco");
  assert.equal(dishDisplayName("dal-makhani", "Dal makhani", "fi"), "Dal makhani");
});
