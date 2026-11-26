import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { cuisineLabel, translatedCuisineNames } from "../lib/cuisine-labels.ts";
import { previewLocales } from "../lib/locale-messages.ts";

const read = (name) => readFileSync(new URL("../components/" + name, import.meta.url), "utf8");

test("every atlas area and food type has an explicit localized display label", () => {
  const atlas = read("cuisine-explorer-taxonomy.ts");
  const foodTypes = read("cuisine-food-type-data.ts");
  const home = read("cuisine-explorer-data.ts").split("const homeCuisineSpecs:")[1].split("const cuisineSpecs:")[0];
  const names = [...new Set([...atlas.matchAll(/(?:\bname|"name"):\s*"([^"]+)"/g), ...foodTypes.matchAll(/\bname:\s*"([^"]+)"/g), ...home.matchAll(/\b(?:name|areasLabel):\s*"([^"]+)"/g)].map((match) => match[1]))];
  assert.ok(names.length > 140);
  for (const name of names) {
    assert.ok(translatedCuisineNames.includes(name), name);
    for (const locale of previewLocales) assert.ok(cuisineLabel(name, locale).trim());
    assert.equal(cuisineLabel(name, "nb"), name);
  }
});

test("localized labels do not alter canonical names, dish queries, or filter selections", () => {
  assert.equal(cuisineLabel("Nordisk", "fi"), "Pohjoismainen");
  assert.equal(cuisineLabel("Fisk og sjømat", "sv"), "Fisk och skaldjur");
  assert.equal(cuisineLabel("Pizza", "nb"), "Pizza");
  assert.equal(cuisineLabel("Unregistered", "en"), "Unregistered");
  const explorer = read("cuisine-explorer.tsx");
  assert.match(explorer, /setSelectedAreaName\(area.name\)/u);
  assert.match(explorer, /setSelectedTypeName\(type.name\)/u);
  assert.match(explorer, /dishSearchHref\(dish.query\)/u);
});
