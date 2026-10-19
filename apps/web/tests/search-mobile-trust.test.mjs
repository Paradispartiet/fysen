import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { fileURLToPath, URL } from "node:url";
import { priceProvenanceLabel } from "../lib/price-provenance.ts";

const read = (relative) => readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");

describe("Price channel provenance", () => {
  it("marks known delivery marketplaces without claiming dine-in pricing", () => {
    assert.match(priceProvenanceLabel("https://wolt.com/nb/nor/oslo/restaurant/test"), /Wolt-leveringspris.*kan avvike/u);
    assert.match(priceProvenanceLabel("https://www.foodora.no/restaurant/test"), /Foodora-leveringspris.*kan avvike/u);
  });

  it("does not mistake lookalike hosts for delivery services", () => {
    assert.equal(priceProvenanceLabel("https://notwolt.com/menu"), "Pris fra menykilden");
    assert.equal(priceProvenanceLabel("https://wolt.com.evil.example/menu"), "Pris fra menykilden");
    assert.equal(priceProvenanceLabel("https://myrestaurant.no/meny"), "Pris fra menykilden");
    assert.equal(priceProvenanceLabel("not-a-url"), "Pris fra menykilden");
  });
});

describe("Search-to-restaurant mobile trust contract", () => {
  it("preserves coordinates and sort when the user submits another dish", () => {
    const form = read("../components/dish-search.tsx");
    const page = read("../app/search/page.tsx");
    assert.match(form, /name="lat" value=\{latitude\}/u);
    assert.match(form, /name="lon" value=\{longitude\}/u);
    assert.match(form, /name="sort" value=\{sort\}/u);
    assert.match(page, /latitude=\{hasLocation \? latitude : null\}/u);
    assert.match(page, /longitude=\{hasLocation \? longitude : null\}/u);
    assert.match(page, /sort=\{sort\}/u);
  });

  it("uses the configured base path when updating location and sorting", () => {
    const controls = read("../components/location-controls.tsx");
    assert.match(controls, /withPublicBasePath\("\/search"\)/u);
    assert.doesNotMatch(controls, /router\.push\(\x60\/search\?/u);
  });

  it("keeps fuzzy matches separate, price evidence conditional and touch actions usable", () => {
    const page = read("../app/search/page.tsx");
    const card = read("../components/dish-result.tsx");
    const actions = read("../components/dish-result.module.css");
    assert.match(read("../components/search-results.tsx"), /Lignende retter/u);
    assert.match(page, /<SearchResults/u);
    assert.match(card, /result\.match\.type === "fuzzy"/u);
    assert.match(card, /result\.dish\.priceMinor !== null/u);
    assert.match(card, /priceProvenanceLabel\(result\.menu\.sourceUrl\)/u);
    assert.match(actions, /min-height: 44px/u);
  });
});
