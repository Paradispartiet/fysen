import assert from "node:assert/strict";
import test from "node:test";
import { cuisineAtlasAreas, regionalFlagUrl } from "../components/cuisine-explorer-taxonomy.ts";

const adoptedStateFlags = new Map([
  ["Yucatansk", ["Yucatán", "Flag of Yucatan.svg"]],
  ["Jaliscansk", ["Jalisco", "Flag of Jalisco.svg"]],
]);

const unverifiedOrUnofficialFlagAreas = new Map([
  ["Sentralmeksikansk", "taco"],
  ["Oaxacansk", "chili"],
  ["Pueblansk", "chili"],
  ["Veracruzansk", "fish"],
  ["Baja California", "fish"],
  ["Nordmeksikansk", "steak"],
  ["Michoacánsk", "taco"],
]);

test("Mexican tiles use only the two confirmed official flags", () => {
  const areas = cuisineAtlasAreas.Mexicansk;
  assert.equal(areas.length, 9);
  assert.equal(areas.filter((area) => area.flagFile).length, 2);

  for (const [name, [region, filename]] of adoptedStateFlags) {
    const area = areas.find((entry) => entry.name === name);
    assert.ok(area, name);
    assert.equal(area.flagRegion, region);
    assert.equal(area.flagFile, filename);
    assert.equal(area.flag, undefined);
    assert.equal(area.illustration, undefined);
    assert.ok(regionalFlagUrl(filename).includes("commons.wikimedia.org/wiki/Special:FilePath/"));
  }
});

test("unofficial or legally uncertain flags are not silently presented as state flags", () => {
  for (const [name, illustration] of unverifiedOrUnofficialFlagAreas) {
    const area = cuisineAtlasAreas.Mexicansk.find((entry) => entry.name === name);
    assert.ok(area, name);
    assert.equal(area.illustration, illustration, name);
    assert.equal(area.flag, undefined, name);
    assert.equal(area.flagFile, undefined, name);
    assert.equal(area.flagRegion, undefined, name);
  }
});

test("exactly one identity per Mexican tile and real food tradition examples", () => {
  for (const area of cuisineAtlasAreas.Mexicansk) {
    assert.equal([area.flag, area.flagFile, area.illustration].filter(Boolean).length, 1);
    assert.ok(area.examples.length > 0);
  }
});
