import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { URL } from "node:url";
import { cuisineAtlasAreas, italianFoodTypes } from "../components/cuisine-explorer-taxonomy.ts";
import { italianFoodTypeByName, matchesItalianFoodType } from "../components/italian-food-type-filter.ts";

test("Italian archive navigation shows exactly ten geographically grounded regional flags", () => {
  const regions = cuisineAtlasAreas.Italiensk;
  assert.equal(regions.length, 10);
  assert.equal(new Set(regions.map((area) => area.name)).size, 10);
  for (const area of regions) {
    assert.ok(area.flagFile?.endsWith(".svg"), area.name);
    assert.ok(area.flagRegion, area.name);
    assert.equal(area.flag, undefined, area.name);
    assert.equal(area.illustration, undefined, area.name);
  }
});

test("Italian type suggestions cover all seven food families, including desserts", () => {
  assert.equal(italianFoodTypes.length, 7);
  for (const type of italianFoodTypes) {
    assert.ok(italianFoodTypeByName(type.name));
    assert.ok(type.dishNames.length > 0, type.name);
    assert.ok(type.dishNames.some((dish) => matchesItalianFoodType(dish, type)), type.name);
    assert.ok(type.illustration, type.name);
  }
  assert.ok(italianFoodTypeByName("Bakverk og dessert")?.dishNames.includes("Cannoli"));
  assert.equal(italianFoodTypeByName("Ukjent"), null);
});

test("archived page routes Italian region or food type through validated query parameters", async () => {
  const route = await readFile(new URL("../app/search/page.tsx", import.meta.url), "utf8");
  const browse = await readFile(new URL("../components/verified-menu-archive-view.tsx", import.meta.url), "utf8");
  assert.match(route, /initialItalianTypeName=\{first\(params\.mat\)\}/u);
  assert.match(route, /initialItalianRegionName=\{first\(params\.region\)\}/u);
  assert.match(browse, /homeCuisines\.find\(\(cuisine\) => cuisine\.name === "Italiensk"\)/u);
  assert.match(browse, /italianFoodTypeByName\(initialItalianTypeName\)/u);
  assert.match(browse, /area\.name === initialItalianRegionName/u);
  assert.match(browse, /params\.set\("region", option\.region\)/u);
  assert.match(browse, /params\.set\("mat", option\.mat\)/u);
  assert.match(browse, /!selectedItalianType/u);
});

test("archive respects one identity per tile and labels culinary examples as suggestions", async () => {
  const browse = await readFile(new URL("../components/verified-menu-archive-view.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../components/verified-menu-archive-view.module.css", import.meta.url), "utf8");
  assert.match(browse, /regionalFlagUrl\(area\.flagFile\)/u);
  assert.match(browse, /<FoodIllustration name=\{type\.illustration\}/u);
  assert.match(browse, /Kilde og lisens for regionsflagget/u);
  assert.match(browse, /supplementalItalianTypeDishes/u);
  assert.match(browse, /visibleSuggestions\.map/u);
  assert.match(browse, /ikke bekreftede menytreff/u);
  assert.match(browse, /browseArchivedMenuDishes\(archive, city, 48\)/u);
  assert.match(css, /\.italianAtlasTiles/u);
  assert.match(css, /object-fit:\s*contain/u);
  assert.match(css, /@media \(max-width: 380px\)/u);
});
