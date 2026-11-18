import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { URL } from "node:url";
import { cuisineAtlasAreas, italianFoodTypes } from "../components/cuisine-explorer-taxonomy.ts";
import { foodIllustrationNames } from "../components/food-illustration-data.ts";
import { cuisineFoodTypeCatalog, foodTypesForCuisine, matchingCuisineFoodType } from "../components/cuisine-food-type-data.ts";

const expectedCounts = {
  "Asiatisk": 6,
  "Indisk": 5,
  "Italiensk": 7,
  "Midtøsten": 4,
  "Mexicansk": 6,
  "Afrikansk": 5,
  "Fransk": 5,
  "Spansk": 5,
  "Gresk": 4,
  "Amerikansk": 4,
  "Nordisk": 6,
};

test("all geographical main cuisines have independent illustrated food-type families", () => {
  assert.equal(Object.keys(cuisineFoodTypeCatalog).length, 11);
  for (const [cuisine, count] of Object.entries(expectedCounts)) {
    const types = foodTypesForCuisine(cuisine);
    assert.equal(types.length, count, cuisine);
    assert.equal(new Set(types.map((type) => type.name)).size, count, cuisine);
    for (const type of types) {
      assert.ok(foodIllustrationNames.includes(type.illustration), `${cuisine}/${type.name}`);
      assert.ok(type.dishNames.length > 0, `${cuisine}/${type.name}`);
    }
  }
  assert.equal(foodTypesForCuisine("Fast food").length, 0, "already organized by food types on first tier");
  assert.equal(foodTypesForCuisine("Ukjent").length, 0);
  assert.equal(foodTypesForCuisine("Italiensk"), italianFoodTypes);
});

test("new culinary family examples are drawn from the documented regional and national atlas", () => {
  for (const [cuisine, families] of Object.entries(cuisineFoodTypeCatalog)) {
    if (cuisine === "Italiensk") continue;
    const sourceNames = new Set(cuisineAtlasAreas[cuisine].flatMap((region) => region.examples.map((name) => name.toLocaleLowerCase("nb"))));
    for (const family of families) {
      for (const name of family.dishNames) {
        assert.ok(sourceNames.has(name.toLocaleLowerCase("nb")), `${cuisine}/${family.name} has unsupported dish example: ${name}`);
      }
    }
  }
});

test("food families recognize dishes conservatively and keep each cuisine separate", () => {
  const pick = (cuisine, name) => {
    const result = foodTypesForCuisine(cuisine).find((type) => type.name === name);
    assert.ok(result, cuisine + "/" + name);
    return result;
  };

  assert.ok(matchingCuisineFoodType("Asiatisk", "Spicy ramen", pick("Asiatisk", "Nudler og supper")));
  assert.ok(matchingCuisineFoodType("Asiatisk", "Phở", pick("Asiatisk", "Nudler og supper")));
  assert.ok(matchingCuisineFoodType("Indisk", "Butter Chicken", pick("Indisk", "Curry og gryter")));
  assert.ok(matchingCuisineFoodType("Midtøsten", "Tabbouleh", pick("Midtøsten", "Meze og småretter")));
  assert.ok(matchingCuisineFoodType("Mexicansk", "Mole negro", pick("Mexicansk", "Mole og chili")));
  assert.ok(matchingCuisineFoodType("Italiensk", "Spaghetti carbonara", pick("Italiensk", "Pasta")));

  assert.equal(matchingCuisineFoodType("Asiatisk", "Ramenuppskrift", pick("Asiatisk", "Nudler og supper")), false);
  assert.equal(matchingCuisineFoodType("Indisk", "Sushi", pick("Indisk", "Curry og gryter")), false);
  assert.equal(matchingCuisineFoodType("Mexicansk", "Burger", pick("Mexicansk", "Grill og kjøtt")), false);
  assert.equal(matchingCuisineFoodType("Midtøsten", "Kebab", pick("Asiatisk", "Nudler og supper")), false);
});

test("UI preserves country/region-only flag tiles and renders standalone food-type illustrations", async () => {
  const source = await readFile(new URL("../components/cuisine-explorer.tsx", import.meta.url), "utf8");
  assert.match(source, /foodTypesForCuisine\(selectedCuisine\.name\)/u);
  assert.match(source, /matchingCuisineFoodType\(selectedCuisine\.name, dish\.label, selectedFoodType\)/u);
  assert.match(source, /setSelectedTypeName\(type\.name\)/u);
  assert.match(source, /setSelectedTypeName\("")/u);
  assert.match(source, /availableFoodTypes\.map/u);
  assert.match(source, /selectedArea\.flagFile && !selectedFoodType/u);
  assert.match(source, /<FoodIllustration name=\{type\.illustration\}/u);
  assert.match(source, /Mattyper går på tvers av regioner og land/u);
});
