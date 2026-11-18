import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { URL } from "node:url";
import { italianFoodTypes } from "../components/cuisine-explorer-taxonomy.ts";
import { matchesItalianFoodType, italianFoodTypeByName } from "../components/italian-food-type-filter.ts";

const type = (name) => {
  const match = italianFoodTypeByName(name);
  assert.ok(match, `missing Italian food type: ${name}`);
  return match;
};

test("all seven Italian families can be selected without confusing them with regions", () => {
  assert.equal(italianFoodTypes.length, 7);
  assert.deepEqual(italianFoodTypes.map((item) => item.name), [
    "Pizza", "Pasta", "Risotto og ris", "Forretter",
    "Kjøtt og fisk", "Supper og gryter", "Bakverk og dessert",
  ]);
  assert.equal(italianFoodTypeByName("Siciliansk"), null);
  assert.equal(italianFoodTypeByName(null), null);
});

test("Italian dish families match common menu names and specific specialties", () => {
  assert.equal(matchesItalianFoodType("Pizza Margherita", type("Pizza")), true);
  assert.equal(matchesItalianFoodType("Pizza napoletana", type("Pizza")), true);
  assert.equal(matchesItalianFoodType("Spaghetti carbonara", type("Pasta")), true);
  assert.equal(matchesItalianFoodType("Cacio e pepe", type("Pasta")), true);
  assert.equal(matchesItalianFoodType("Orecchiette alle cime di rapa", type("Pasta")), true);
  assert.equal(matchesItalianFoodType("Arancini siciliani", type("Risotto og ris")), true);
  assert.equal(matchesItalianFoodType("Focaccia", type("Forretter")), true);
  assert.equal(matchesItalianFoodType("Bistecca alla fiorentina", type("Kjøtt og fisk")), true);
  assert.equal(matchesItalianFoodType("Ribollita", type("Supper og gryter")), true);
  assert.equal(matchesItalianFoodType("Tiramisù", type("Bakverk og dessert")), true);
  assert.equal(matchesItalianFoodType("Sushi", type("Pasta")), false);
  assert.equal(matchesItalianFoodType("Burger", type("Pizza")), false);
});

test("Alle retter retains region navigation alongside independent illustrated food types", async () => {
  const browse = await readFile(new URL("../components/dish-browse.tsx", import.meta.url), "utf8");
  assert.match(browse, /setSelectedCuisineArea\(areaName\)/u);
  assert.match(browse, /setSelectedFoodTypeName\(type\.name\)/u);
  assert.match(browse, /setSelectedCuisineArea\(null\)/u);
  assert.match(browse, /className="dishBrowseItalianTypes"/u);
  assert.match(browse, /FoodIllustration name=\{type\.illustration\}/u);
  assert.ok(browse.includes('matchingCuisineFoodType('));
  assert.ok(browse.includes('selectedCuisine.name, dish.name, selectedFoodType'));
  const explorer = await readFile(new URL("../components/cuisine-explorer.tsx", import.meta.url), "utf8");
  assert.ok(explorer.includes('matchingCuisineFoodType(selectedCuisine.name, dish.label, selectedFoodType)'));
});

test("recent and popular dishes show only locally matched editorial artwork", async () => {
  for (const component of ["recent-dishes.tsx", "popular-dishes.tsx"]) {
    const source = await readFile(new URL(`../components/${component}`, import.meta.url), "utf8");
    assert.match(source, /illustrationForDishName\(dish\.name\)/u);
    assert.match(source, /<FoodIllustration/u);
  }
});
