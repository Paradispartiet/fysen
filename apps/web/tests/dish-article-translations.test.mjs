import test from "node:test";
import assert from "node:assert/strict";
import { article } from "../content/food-knowledge/articles/dal-makhani.ts";
import { article as ramen } from "../content/food-knowledge/articles/ramen.ts";
import { article as biryani } from "../content/food-knowledge/articles/biryani.ts";
import { article as falafel } from "../content/food-knowledge/articles/falafel.ts";
import { article as carbonara } from "../content/food-knowledge/articles/carbonara.ts";
import { article as tacosAlPastor } from "../content/food-knowledge/articles/tacos-al-pastor.ts";
import { article as padThai } from "../content/food-knowledge/articles/pad-thai.ts";
import { article as sushi } from "../content/food-knowledge/articles/sushi.ts";
import { article as gyoza } from "../content/food-knowledge/articles/gyoza.ts";
import { article as tomYum } from "../content/food-knowledge/articles/tom-yum.ts";
import { article as pho } from "../content/food-knowledge/articles/pho.ts";
import { article as banhMi } from "../content/food-knowledge/articles/banh-mi.ts";
import { previewLocales } from "../lib/locale-messages.ts";
import { localizedArticleBody, translatedArticleIds } from "../lib/dish-article-translations.ts";

const numericTokens = (value) => value.match(/[0-9]+|[½¼¾]/gu) ?? [];

for (const original of [article, ramen, biryani, falafel, carbonara, tacosAlPastor, padThai, sushi, gyoza, tomYum, pho, banhMi]) {
test(`complete ${original.dishId} translations retain recipe quantities, times and structure`, () => {
  const article = original;
  assert.ok(translatedArticleIds.includes(article.dishId));
  for (const locale of previewLocales) {
    const { body, lang } = localizedArticleBody(article, locale);
    assert.equal(lang, locale);
    for (const field of ["overview", "history", "flavor", "technique"]) assert.ok(body[field].trim());
    for (const field of ["essentials", "variants", "serving", "commonMistakes"]) {
      assert.equal(body[field].length, article[field].length);
      assert.ok(body[field].every((value) => value.trim()));
    }
    for (const field of ["yield", "time"]) assert.deepEqual(numericTokens(body.recipe[field]), numericTokens(article.recipe[field]));
    for (const field of ["ingredients", "steps"]) {
      assert.equal(body.recipe[field].length, article.recipe[field].length);
      body.recipe[field].forEach((value, index) => {
        assert.ok(value.trim());
        assert.deepEqual(numericTokens(value), numericTokens(article.recipe[field][index]), locale + ":" + field + ":" + index);
      });
    }
  }
});
}

test("original article remains the exact fallback for missing translations", () => {
  assert.equal(localizedArticleBody(article, "nb").body, article);
  const unregistered = { ...article, dishId: "unregistered" };
  const result = localizedArticleBody(unregistered, "sv");
  assert.equal(result.lang, "nb");
  assert.equal(result.body, unregistered);
});
