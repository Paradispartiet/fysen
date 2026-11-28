import test from "node:test";
import assert from "node:assert/strict";
import { foodKnowledgeDishIds } from "../content/food-knowledge/manifest.ts";
import { localizedSummary, translatedSummaryIds } from "../lib/dish-summary-translations.ts";
import { draftInternationalSummaries, internationalSummaryLocales } from "../lib/international-summary-drafts.ts";

test("review summaries cover valid canonical IDs in all five languages", () => {
  const ids = Object.keys(draftInternationalSummaries);
  assert.equal(ids.length, 138);
  const canonical = new Set(foodKnowledgeDishIds);
  for (const [id, row] of Object.entries(draftInternationalSummaries)) {
    assert.ok(canonical.has(id), id);
    assert.deepEqual(Object.keys(row).sort(), [...internationalSummaryLocales].sort(), id);
    for (const value of Object.values(row)) assert.ok(value.trim(), id);
  }
  for (const id of translatedSummaryIds) {
    assert.equal(draftInternationalSummaries[id].en, localizedSummary(id, "", "en").text, id);
  }
});
