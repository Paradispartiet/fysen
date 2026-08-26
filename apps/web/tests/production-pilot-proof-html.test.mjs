import assert from "node:assert/strict";
import test from "node:test";
import { hasServerRenderedDishBrowseHeading } from "../../../scripts/production-pilot-proof-html.mjs";

test("godtar React SSR-separatorer i den strukturelle browse-overskriften", () => {
  assert.equal(
    hasServerRenderedDishBrowseHeading(
      '<main><h1 id="dish-browse-title">Alle retter i <!-- -->Oslo</h1></main>',
      "Oslo",
    ),
    true,
  );
});

test("krever riktig overskrift, struktur og by", () => {
  assert.equal(
    hasServerRenderedDishBrowseHeading(
      '<main><h1 id="dish-browse-title">Alle retter i Oslo</h1></main>',
      "Oslo",
    ),
    true,
  );
  assert.equal(
    hasServerRenderedDishBrowseHeading(
      '<main><h1 id="dish-browse-title">Alle retter i Bergen</h1></main>',
      "Oslo",
    ),
    false,
  );
  assert.equal(
    hasServerRenderedDishBrowseHeading(
      "<main><p>Alle retter i Oslo</p></main>",
      "Oslo",
    ),
    false,
  );
});
