import assert from "node:assert/strict";
import test from "node:test";
import { cuisineAtlasAreas, regionalFlagUrl } from "../components/cuisine-explorer-taxonomy.ts";

const documentedStateFlags = new Map([
  ["Oaxacansk", ["Oaxaca", "Flag of Oaxaca.svg"]],
  ["Yucatansk", ["Yucatán", "Flag of Yucatan.svg"]],
  ["Jaliscansk", ["Jalisco", "Flag of Jalisco.svg"]],
  ["Pueblansk", ["Puebla", "Flag of Puebla.svg"]],
  ["Veracruzansk", ["Veracruz", "Flag of Veracruz.svg"]],
  ["Baja California", ["Baja California", "Flag of Baja California.svg"]],
  ["Michoacánsk", ["Michoacán", "Flag of Michoacan.svg"]],
]);

test("only geographically specific Mexican cuisines show genuine state-flag files", () => {
  const areas = cuisineAtlasAreas.Mexicansk;
  assert.equal(areas.length, 9);
  assert.equal(areas.filter((area) => area.flagFile).length, 7);
  for (const [name, [region, filename]] of documentedStateFlags) {
    const area = areas.find((entry) => entry.name === name);
    assert.ok(area, name);
    assert.equal(area.flagRegion, region);
    assert.equal(area.flagFile, filename);
    assert.equal(area.flag, undefined);
    assert.equal(area.illustration, undefined);
    assert.ok(regionalFlagUrl(filename).includes("commons.wikimedia.org/wiki/Special:FilePath/"));
  }
});

test("broader Mexican culinary areas retain one illustration instead of borrowing a state flag", () => {
  const areas = cuisineAtlasAreas.Mexicansk;
  const wider = ["Sentralmeksikansk", "Nordmeksikansk"];
  for (const name of wider) {
    const area = areas.find((entry) => entry.name === name);
    assert.ok(area?.illustration, name);
    assert.equal(area.flag, undefined);
    assert.equal(area.flagFile, undefined);
    assert.equal(area.flagRegion, undefined);
  }
  for (const area of areas) {
    assert.equal([area.flag, area.flagFile, area.illustration].filter(Boolean).length, 1);
    assert.ok(area.examples.length > 0);
  }
});
