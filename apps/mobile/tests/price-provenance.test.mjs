import assert from "node:assert/strict";
import test from "node:test";
import { priceProvenanceLabel } from "../src/price-provenance.ts";

test("flags Wolt prices as delivery prices rather than dine-in prices", () => {
  for (const source of [
    "https://wolt.com/no/nor/oslo/restaurant/example",
    "https://merchant.wolt.com/menu",
    "https://WOLT.COM/path",
  ]) {
    assert.equal(priceProvenanceLabel(source), "Wolt-leveringspris · kan avvike fra bordpris");
  }
});

test("flags Foodora prices as delivery prices", () => {
  for (const source of [
    "https://foodora.no/restaurant/example",
    "https://www.foodora.no/restaurant/example",
  ]) {
    assert.equal(priceProvenanceLabel(source), "Foodora-leveringspris · kan avvike fra bordpris");
  }
});

test("does not mistake lookalike hosts for delivery services", () => {
  for (const source of [
    "https://fake-wolt.com/menu",
    "https://wolt.com.evil.example/menu",
    "https://foodora.no.evil.example/menu",
    "https://www.restaurant.no/menu?ref=wolt.com",
    "https://example-restaurant.no/menu",
    "not-a-url",
  ]) {
    assert.equal(priceProvenanceLabel(source), "Pris fra menykilden");
  }
});

test("native result and Matlyst cards show provenance only for sourced prices", () => {
  const { readFileSync } = await import("node:fs");
  const code = readFileSync(new URL("../App.tsx", import.meta.url), "utf8");
  assert.match(code, /result\.dish\.priceMinor !== null \? \([\s\S]*priceProvenanceLabel\(result\.menu\.sourceUrl\)/);
  assert.match(code, /dish\.priceMinor !== null \? \([\s\S]*priceProvenanceLabel\(dish\.sourceUrl\)/);
});
