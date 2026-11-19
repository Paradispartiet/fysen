import assert from "node:assert/strict";
import test from "node:test";
import { descriptionPreview, groupDishMatches } from "../src/search-presentation.ts";

test("text matching groups preserve API ranking, without discarding similar dishes", () => {
  const input = [
    { id: "a", match: { type: "fuzzy" } },
    { id: "b", match: { type: "exact" } },
    { id: "c", match: { type: "contains" } },
    { id: "d", match: { type: "canonical" } },
    { id: "e", match: { type: "prefix" } },
  ];
  const result = groupDishMatches(input);
  assert.deepEqual(result.direct.map((x) => x.id), ["b", "d", "e"]);
  assert.deepEqual(result.similar.map((x) => x.id), ["a", "c"]);
  assert.equal(input[0].id, "a", "The API results must not be mutated.");
});

test("short, empty and multiline descriptions remain readable", () => {
  assert.equal(descriptionPreview("  Kremet ramen  "), "Kremet ramen");
  assert.equal(descriptionPreview("  "), "");
  assert.equal(descriptionPreview("En\n\nlang   beskrivelse  "), "En lang beskrivelse");
});

test("a lengthy menu description is clipped only for the mobile preview", () => {
  const full = "Et godt eksempel på en lang menybeskrivelse " + "med ferske råvarer og tilbehør ".repeat(12);
  const preview = descriptionPreview(full);
  assert.ok(preview.length <= 166);
  assert.ok(preview.endsWith("…"));
  assert.ok(!preview.includes("  "));
  assert.equal(full.includes("\n"), false);
});

test("native archived cards place price, provenance and actual observation before actions", async () => {
  const fs = await import("node:fs");
  const source = fs.readFileSync(new URL("../App.tsx", import.meta.url), "utf8");
  const start = source.indexOf("function SearchResultCard(");
  const end = source.indexOf("function SearchScreen(", start);
  const card = source.slice(start, end);
  const price = card.indexOf("{formatPrice(result)}");
  const provenance = card.indexOf("{priceProvenanceLabel(result.menu.sourceUrl)}");
  const observed = card.indexOf("{observedText}");
  const link = card.indexOf('label="Se meny ↗"');
  assert.ok(price >= 0 && provenance > price && observed > provenance && link > observed);
  assert.doesNotMatch(card, /descriptionExpanded|result\.dish|result\.menuItemId/u);
});
