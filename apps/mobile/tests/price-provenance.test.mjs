import assert from "node:assert/strict";
import test from "node:test";
import { priceProvenanceLabel } from "../src/price-provenance.ts";

test("labels delivery prices only for trusted exact hosts and subdomains", () => {
  assert.match(priceProvenanceLabel("https://wolt.com/en/nor/oslo"), /Wolt-leveringspris/);
  assert.match(priceProvenanceLabel("https://www.wolt.com/"), /Wolt-leveringspris/);
  assert.match(priceProvenanceLabel("https://foodora.no/"), /Foodora-leveringspris/);
  assert.match(priceProvenanceLabel("https://merchant.foodora.no/"), /Foodora-leveringspris/);
});

test("does not falsely label other restaurants or spoofed delivery domains", () => {
  for (const url of [
    "https://restaurant.no/meny",
    "https://wolt.com.evil.example/restaurant",
    "https://evilwolt.com/restaurant",
    "https://foodora.no.evil.example/restaurant",
    "not a URL",
    "",
  ]) {
    assert.equal(priceProvenanceLabel(url), "Pris fra menykilden");
  }
});
