import test from "node:test";
import assert from "node:assert/strict";
import { additionalDishes } from "../content/food-knowledge/articles/additional-dishes.ts";
import { draftInternationalArticles } from "../content/food-knowledge/translations/international-review.ts";
import { internationalSummaryLocales, draftInternationalSummaries } from "../lib/international-summary-drafts.ts";
const nums = (s) => s.match(/[0-9]+|[½¼¾]/gu) ?? [];
test("International article bodies retain exact recipe structure and numeric tokens", () => {
  assert.equal(Object.keys(draftInternationalArticles).length, 116);
  for (const [id, translations] of Object.entries(draftInternationalArticles)) {
    const original = additionalDishes.find((a) => a.dishId === id);
    assert.ok(original, id);
    assert.deepEqual(Object.keys(translations).sort(), [...internationalSummaryLocales].sort());
    for (const locale of internationalSummaryLocales) {
      const body = translations[locale];
      assert.ok(draftInternationalSummaries[id][locale].trim());
      for (const key of ["overview","history","flavor","technique"]) assert.ok(body[key].trim());
      for (const key of ["essentials","variants","serving","commonMistakes"]) {
        assert.equal(body[key].length, original[key].length);
        assert.ok(body[key].every((s) => s.trim()));
        assert.deepEqual(body[key].map(nums), original[key].map(nums));
      }
      for (const key of ["ingredients","steps"]) {
        assert.equal(body.recipe[key].length, original.recipe[key].length);
        assert.ok(body.recipe[key].every((s) => s.trim()));
        assert.deepEqual(body.recipe[key].map(nums), original.recipe[key].map(nums));
      }
      for (const key of ["yield","time"]) assert.deepEqual(nums(body.recipe[key]), nums(original.recipe[key]));
      assert.ok(body.recipe.label.trim());
      assert.equal(Object.hasOwn(body, "sources"), false);
      assert.equal(Object.hasOwn(body, "relatedDishIds"), false);
    }
  }
});
