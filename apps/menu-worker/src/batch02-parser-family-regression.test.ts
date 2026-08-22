import { describe, expect, it } from "vitest";
import {
  HTML_NON_DISH_FILTER_VERSION,
  HTML_PRICE_NOTATION_NORMALIZER_VERSION,
  isCanonicalHtmlMenuItem,
  normalizeHtmlPriceNotation,
} from "./menu-source-runtime.js";
import {
  HTML_TRAILING_PRICE_CARD_RECOVERY_VERSION,
  recoverTrailingPriceCardHtmlItems,
} from "./html-trailing-price-card-recovery.js";
import type { MenuObservedItem } from "@fysen/menu-core";

function item(name: string): MenuObservedItem {
  return {
    sourceKey: name,
    name,
    normalizedName: name.toLocaleLowerCase("nb-NO"),
    description: null,
    sectionName: null,
    priceMinor: 19500,
    currency: "NOK",
    position: 1,
    extractionMethod: "html_heuristic",
    confidence: 0.95,
    sourceExcerpt: name,
  };
}

describe("Batch 02 generic parser families", () => {
  it("normalizes Scandinavian dot-dash whole-NOK notation before extraction", () => {
    expect(HTML_PRICE_NOTATION_NORMALIZER_VERSION).toBe("price-notation-v3");
    const normalized = normalizeHtmlPriceNotation(`
      <h3>Triple Chili Cheese 135.-</h3>
      <h3>The Godfather 269.-</h3>
      <p>American Fries 84.-</p>
    `);
    expect(normalized).toContain("Triple Chili Cheese 135,-");
    expect(normalized).toContain("The Godfather 269,-");
    expect(normalized).toContain("American Fries 84,-");
  });

  it("recovers Kverneriet-style title plus normalized trailing price cards", () => {
    const html = normalizeHtmlPriceNotation(`
      <html><body>
        <h2>Burgers</h2>
        <h3>The Godfather 269.-</h3><p>Mortadella, provolone and dijonaisse.</p>
        <h3>The Boss 255.-</h3><p>Bacon, cheese, mushrooms and onions.</p>
        <h3>True Blue 269.-</h3><p>Blue cheese, tomato chutney and pistachios.</p>
        <h3>Burgler 245.-</h3><p>Cheddar, tomato, onion and lettuce.</p>
      </body></html>
    `);
    const items = recoverTrailingPriceCardHtmlItems(html);
    expect(items.map(({ name }) => name)).toEqual([
      "The Godfather",
      "The Boss",
      "True Blue",
      "Burgler",
    ]);
    expect(items.map(({ priceMinor }) => priceMinor)).toEqual([
      26900,
      25500,
      26900,
      24500,
    ]);
  });

  it("recovers a title followed by a marked price and parenthetical allergen metadata", () => {
    expect(HTML_TRAILING_PRICE_CARD_RECOVERY_VERSION).toBe(
      "trailing-price-card-v11",
    );
    const html = `
      <html><body>
        <h2>DUMPLINGS</h2>
        <p>Pork Gyoza with Japanese ketchup (4 pcs)</p>
        <p>195,- (Mollusc, garlic, fish, gluten)</p>
        <p>Chicken Gyoza with Truffle Tosazu (4 pcs)</p>
        <p>195,-(Gluten, sesame, fish, mushroom)</p>
        <p>King Crab dumplings with kimchi mayonnaise (4 pcs)</p>
        <p>195,-(Shellfish, mustard, egg, garlic, fish, gluten)</p>
        <p>Shiitake Wontons with vinegar/soy dip (5 pcs)</p>
        <p>205,-(Lactose, garlic, gluten, egg, soy)</p>
      </body></html>
    `;
    const items = recoverTrailingPriceCardHtmlItems(html);
    expect(items.map(({ name }) => name)).toEqual([
      "Pork Gyoza with Japanese ketchup (4 pcs)",
      "Chicken Gyoza with Truffle Tosazu (4 pcs)",
      "King Crab dumplings with kimchi mayonnaise (4 pcs)",
      "Shiitake Wontons with vinegar/soy dip (5 pcs)",
    ]);
    expect(items.every(({ priceMinor }) => priceMinor === 19500 || priceMinor === 20500)).toBe(true);
    expect(items[0]?.description).toContain("Mollusc");
  });

  it("rejects badge, branded section and per-person display labels without rejecting real dishes", () => {
    expect(HTML_NON_DISH_FILTER_VERSION).toBe("non-dish-v9");
    for (const name of [
      "VEG",
      "VEG SPICY",
      "SAWAN RAW",
      "SAWAN MAKI",
      "SAWAN TACO",
      "SAWAN SMÅRETTER",
      "SAWAN SALATER",
      "SAWAN VEGANSK",
      "SAWAN SHARING",
      "975,– per person",
      "Dagens veganske meny",
    ]) {
      expect(isCanonicalHtmlMenuItem(item(name)), name).toBe(false);
    }

    for (const name of [
      "Vegan crispy oyster mushrooms",
      "Laksetartar taco agurk, yuzu, ingefær og soya",
      "Chicken Tikka",
      "Veg Biryani",
    ]) {
      expect(isCanonicalHtmlMenuItem(item(name)), name).toBe(true);
    }
  });
});
