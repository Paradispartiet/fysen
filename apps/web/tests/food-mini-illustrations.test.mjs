import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { foodIllustrationNames, foodIllustrationSrc } from "../components/food-illustration-data.ts";
import { illustrationForDishName, illustrationForIngredient } from "../components/food-illustration-match.ts";

test("all registered original food miniatures exist as transparent vector assets", async () => {
  assert.equal(foodIllustrationNames.length, 33);
  assert.equal(new Set(foodIllustrationNames).size, foodIllustrationNames.length);
  for (const id of foodIllustrationNames) {
    assert.equal(foodIllustrationSrc(id), `/food-icons/${id}.svg`);
    const file = new URL(`../public/food-icons/${id}.svg`, import.meta.url);
    const content = await readFile(file, "utf8");
    assert.match(content, /^<svg[^>]*viewBox="0 0 96 96"/u, id);
    assert.match(content, /<title>/u, id);
    assert.ok(content.length > 400, id);
    assert.doesNotMatch(content, /<rect[^>]*fill="#(?:fff|ffffff)"/iu, "icons must be transparent");
  }
});

test("recipe ingredients only receive artwork when a real ingredient is named", () => {
  assert.equal(illustrationForIngredient("200 g hakkede tomater"), "tomato");
  assert.equal(illustrationForIngredient("2 ss olivenolje"), "olive");
  assert.equal(illustrationForIngredient("frisk basilikum"), "basil");
  assert.equal(illustrationForIngredient("1 ts kardemomme"), "spice");
  assert.equal(illustrationForIngredient("200 g kyllingfilet"), "chicken");
  assert.equal(illustrationForIngredient("2 ts salt"), null);
  assert.equal(illustrationForIngredient("noe valgfritt"), null);
});

test("known dishes get appropriate miniatures without treating imagery as menu proof", () => {
  assert.equal(illustrationForDishName("Pizza margherita"), "pizza");
  assert.equal(illustrationForDishName("Pasta carbonara"), "pasta");
  assert.equal(illustrationForDishName("Tacos al pastor"), "taco");
  assert.equal(illustrationForDishName("Ramen"), "soup");
  assert.equal(illustrationForDishName("Doro wat"), null);
});
