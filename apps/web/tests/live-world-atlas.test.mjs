import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { URL } from "node:url";
import { foodTypesForCuisine } from "../components/cuisine-food-type-data.ts";

test("all twelve main kitchens are available alongside older national traditions", async () => {
  const source = await readFile(new URL("../components/dish-browse.tsx", import.meta.url), "utf8");
  assert.ok(source.includes("...homeCuisines"));
  assert.ok(source.includes("...cuisines.filter("));
  assert.ok(source.includes("!homeCuisines.some((main) => main.name === cuisine.name)"));
  assert.ok(source.includes("cuisineOptions.map((cuisine)"));
  assert.ok(source.includes("homeCuisines.includes(cuisine)"));
});

test("live browse displays one image identity on every atlas region tile", async () => {
  const source = await readFile(new URL("../components/dish-browse.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../styles/dish-browse.css", import.meta.url), "utf8");
  assert.ok(source.includes("area?.flagFile ?"));
  assert.ok(source.includes("regionalFlagUrl(area.flagFile)"));
  assert.ok(source.includes("area?.flag ?"));
  assert.ok(source.includes("dishBrowseCountryFlag"));
  assert.ok(source.includes("area?.illustration ?"));
  assert.ok(source.includes("name={area.illustration}"));
  assert.match(css, /\.dishBrowseRegionFlag/u);
  assert.match(css, /\.dishBrowseCountryFlag/u);
  assert.match(css, /\.dishBrowseAreaArtwork/u);
  assert.match(css, /object-fit:\s*contain/u);
});

test("live browse supports 57 illustrated food types without duplicating fast food", async () => {
  const expected = {
    Asiatisk: 6,
    Indisk: 5,
    Italiensk: 7,
    Midtøsten: 4,
    Mexicansk: 6,
    Afrikansk: 5,
    Fransk: 5,
    Spansk: 5,
    Gresk: 4,
    Amerikansk: 4,
    Nordisk: 6,
  };
  assert.equal(Object.entries(expected).reduce((sum, [name, count]) => {
    assert.equal(foodTypesForCuisine(name).length, count, name);
    return sum + count;
  }, 0), 57);
  assert.equal(foodTypesForCuisine("Fast food").length, 0);
  const source = await readFile(new URL("../components/dish-browse.tsx", import.meta.url), "utf8");
  assert.ok(source.includes("foodTypesForCuisine(selectedAtlas.name)"));
  assert.ok(source.includes("availableFoodTypes.map((type)"));
  assert.ok(source.includes("matchingCuisineFoodType("));
  assert.ok(source.includes("setSelectedFoodTypeName(type.name)"));
  assert.ok(source.includes("setSelectedCuisineArea(null)"));
});

test("live cuisine filters only show evidence-backed menu matches", async () => {
  const source = await readFile(new URL("../components/dish-browse.tsx", import.meta.url), "utf8");
  assert.ok(source.includes("discoveryCoverage(data.dishes, suggestionDescriptor(entry.dish)).restaurantCount"));
  assert.ok(source.includes("liveItemsForDiscoveryScope(data.dishes, cuisineDiscoveryScope)"));
  assert.ok(source.includes('hasKnowledge: false'));
  assert.ok(source.includes('areaName: "Mattype"'));
  assert.ok(source.includes("dishSearchHref(dish.query, data.city)"));
  assert.ok(source.includes("dish.restaurantCount"));
});
