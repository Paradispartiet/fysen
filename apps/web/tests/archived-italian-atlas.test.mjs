import { browseText } from "../lib/browse-messages.ts";
import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { URL } from "node:url";
import { cuisineAtlasAreas } from "../components/cuisine-explorer-taxonomy.ts";
import { foodTypesForCuisine, matchingCuisineFoodType } from "../components/cuisine-food-type-data.ts";

test("archived atlas serves all twelve existing main cuisines and all 101 undercategories", async () => {
  const dataSource = await readFile(new URL("../components/cuisine-explorer-data.ts", import.meta.url), "utf8");
  const mainNames = Object.keys(cuisineAtlasAreas);
  assert.equal(mainNames.length, 12);
  assert.equal(Object.values(cuisineAtlasAreas).reduce((sum, areas) => sum + areas.length, 0), 101);
  assert.ok(dataSource.includes("buildCuisines(homeCuisineSpecs)"));
  for (const [cuisineName, areas] of Object.entries(cuisineAtlasAreas)) {
    assert.ok(dataSource.includes(`name: "${cuisineName}"`), cuisineName);
    assert.ok(areas.length > 0);
    for (const area of areas) {
      assert.equal([area.flag, area.flagFile, area.illustration].filter(Boolean).length, 1, area.name);
    }
  }
});

test("Italian regional flags and its seven separate illustrated food families remain intact", () => {
  const italian = cuisineAtlasAreas.Italiensk;
  assert.equal(italian.length, 10);
  assert.ok(italian.every((area) => area.flagFile && area.flagRegion && !area.illustration));
  assert.equal(foodTypesForCuisine("Italiensk").length, 7);
  const pizza = foodTypesForCuisine("Italiensk").find((type) => type.name === "Pizza");
  assert.ok(pizza);
  assert.ok(matchingCuisineFoodType("Italiensk", "Pizza Margherita", pizza));
});

test("archive route uses validated region and food-type query parameters", async () => {
  const route = await readFile(new URL("../app/search/page.tsx", import.meta.url), "utf8");
  const browse = await readFile(new URL("../components/verified-menu-archive-view.tsx", import.meta.url), "utf8");
  assert.ok(route.includes("initialFoodTypeName={first(params.mat)}"));
  assert.ok(route.includes("initialAreaName={first(params.region)}"));
  assert.ok(browse.includes('homeCuisines.find((cuisine) => cuisine.name === initialCuisineName)'));
  assert.ok(browse.includes("availableFoodTypes.find((item) => item.name === initialFoodTypeName)"));
  assert.ok(browse.includes("area.name === initialAreaName"));
  assert.ok(browse.includes('params.set("region", option.region)'));
  assert.ok(browse.includes('params.set("mat", option.mat)'));
  assert.ok(browse.includes("selectedAtlas && !selectedFoodType"));
});

test("archive keeps country flags, regional flags, and original food drawings separate", async () => {
  const browse = await readFile(new URL("../components/verified-menu-archive-view.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../components/verified-menu-archive-view.module.css", import.meta.url), "utf8");
  assert.ok(browse.includes("regionalFlagUrl(area.flagFile)"));
  assert.ok(browse.includes("styles.atlasCountryFlag"));
  assert.ok(browse.includes("name={area.illustration}"));
  assert.ok(browse.includes("name={type.illustration}"));
  assert.ok(browse.includes('<BrowseText message="flagSource" />'));
  assert.equal(browseText("nb","flagSource"), "Kilde og lisens for regionsflagget");
  assert.ok(browse.includes("supplementalFoodTypeDishes"));
  assert.ok(browse.includes("visibleSuggestions.map"));
  assert.ok(browse.includes('<BrowseText message="suggestionOnly" />'));
  assert.match(browseText("nb","suggestionOnly"), /ikke bekreftede menytreff/u);
  assert.ok(browse.includes("browseArchivedMenuDishes(archive, city, 48)"));
  assert.ok(browse.includes("seenSuggestionNames"));
  assert.match(css, /\.italianAtlasTiles/u);
  assert.match(css, /\.atlasCountryFlag/u);
  assert.match(css, /object-fit:\s*contain/u);
  assert.match(css, /@media \(max-width: 380px\)/u);
});
