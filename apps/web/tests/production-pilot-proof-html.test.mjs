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

test("krever en faktisk rendret rettliste i tillegg til overskriften", async () => {
  const { hasServerRenderedLiveDishBrowse } = await import("../../../scripts/production-pilot-proof-html.mjs");
  const heading = '<h1 id="dish-browse-title">Alle retter i <!-- -->Oslo</h1>';
  const list = '<div class="dishBrowseList"><div class="dishBrowseItem"><a class="dishBrowseItemMain" href="/search?q=gyoza"><strong>Gyoza</strong></a></div></div>';
  assert.equal(hasServerRenderedLiveDishBrowse(heading + list, "Oslo"), true);
  assert.equal(hasServerRenderedLiveDishBrowse(heading + list, "Bergen"), false);
  assert.equal(hasServerRenderedLiveDishBrowse(list, "Oslo"), false);
  assert.equal(hasServerRenderedLiveDishBrowse(heading + '<p>Prøv igjen om litt.</p>', "Oslo"), false);
  assert.equal(hasServerRenderedLiveDishBrowse(heading + '<div class="dishBrowseList"></div>', "Oslo"), false);
  assert.equal(hasServerRenderedLiveDishBrowse(heading + list.replace('Gyoza', ' '), "Oslo"), false);
});

test("godtar ikke serialisert liste-HTML i skript som rendret innhold", async () => {
  const { hasServerRenderedLiveDishBrowse } = await import("../../../scripts/production-pilot-proof-html.mjs");
  const heading = '<h1 id="dish-browse-title">Alle retter i Oslo</h1>';
  const script = '<script type="application/json">{"html":"<div class=\'dishBrowseList\'><div class=\'dishBrowseItem\'><a class=\'dishBrowseItemMain\'><strong>Gyoza</strong></a></div></div>"}</script>';
  assert.equal(hasServerRenderedLiveDishBrowse(heading + script, "Oslo"), false);
});
