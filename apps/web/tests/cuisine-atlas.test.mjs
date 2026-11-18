import assert from "node:assert/strict";
import test from "node:test";
import { cuisineAtlasAreas, italianFoodTypes, regionalFlagUrl } from "../components/cuisine-explorer-taxonomy.ts";

const expectedCounts = {
  Asiatisk: 12,
  Indisk: 11,
  Italiensk: 10,
  Midtøsten: 10,
  Mexicansk: 9,
  "Fast food": 9,
  Afrikansk: 10,
  Fransk: 7,
  Spansk: 5,
  Gresk: 5,
  Amerikansk: 6,
  Nordisk: 7,
};

test("twelve cuisine families expose their distinct requested undercategories", () => {
  for (const [name, count] of Object.entries(expectedCounts)) {
    assert.equal(cuisineAtlasAreas[name]?.length, count, name);
  }
});

test("each atlas tile has one identity: a flag, a regional flag, or a symbol", () => {
  for (const [name, areas] of Object.entries(cuisineAtlasAreas)) {
    const seen = new Set();
    for (const area of areas) {
      assert.equal([area.flag, area.flagFile, area.symbol].filter(Boolean).length, 1, name + "/" + area.name);
      assert.ok(!seen.has(area.name), "duplicate area " + name + "/" + area.name);
      seen.add(area.name);
      assert.ok(area.examples.length > 0, name + "/" + area.name);
    }
  }
});

test("national cuisines use only flags; Italian culinary regions use real regional flag filenames", () => {
  for (const name of ["Asiatisk", "Midtøsten", "Afrikansk", "Nordisk"]) {
    assert.ok(cuisineAtlasAreas[name].every((area) => area.flag && !area.symbol && !area.flagFile));
  }
  const italy = cuisineAtlasAreas.Italiensk;
  assert.ok(italy.every((area) => area.flagFile?.startsWith("Flag of ") && area.flagRegion && !area.flag && !area.symbol));
  assert.ok(italy.every((area) => regionalFlagUrl(area.flagFile).startsWith("https://commons.wikimedia.org/wiki/Special:FilePath/")));
});

test("Italian cuisine can be browsed by both dish family and regional tradition", () => {
  assert.ok(italianFoodTypes.find((type) => type.name === "Pizza")?.dishNames.includes("Pizza margherita"));
  assert.ok(italianFoodTypes.find((type) => type.name === "Pasta")?.dishNames.includes("Carbonara"));
  assert.ok(italianFoodTypes.length >= 6);
});


test("regional flags are used only for bounded geographic traditions", () => {
  for (const name of ["Spansk", "Amerikansk", "Fransk"]) {
    for (const area of cuisineAtlasAreas[name]) {
      if (area.flagFile) {
        assert.ok(area.flagRegion, `${name}/${area.name} needs the flag's exact region`);
        assert.equal(area.flag, undefined);
        assert.equal(area.symbol, undefined);
      }
    }
  }
  assert.equal(cuisineAtlasAreas["Gresk"].every((area) => area.flagFile === undefined), true);
});
