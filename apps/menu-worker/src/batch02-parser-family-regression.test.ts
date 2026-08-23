import { describe, expect, it } from "vitest";
import type { MenuObservedItem } from "@fysen/menu-core";
import {
  HTML_HEADING_NORMALIZER_VERSION,
  normalizeHtmlHeadingLineBreaks,
} from "./html-heading-normalizer.js";
import {
  HTML_OUTPUT_CANONICALIZER_VERSION,
  canonicalizeHtmlOutputItems,
} from "./html-output-canonicalizer.js";
import { recoverTrailingPriceCardHtmlItems } from "./html-trailing-price-card-recovery.js";

function item(name: string, position: number): MenuObservedItem {
  return {
    sourceKey: `${position}-${name}`,
    name,
    normalizedName: name.toLocaleLowerCase("nb-NO"),
    description: null,
    sectionName: null,
    priceMinor: 19500,
    currency: "NOK",
    position,
    extractionMethod: "html_heuristic",
    confidence: 0.95,
    sourceExcerpt: name,
  };
}

describe("Batch 02 generic parser families", () => {
  it("normalizes Scandinavian dot-dash whole-NOK notation before extraction", () => {
    expect(HTML_HEADING_NORMALIZER_VERSION).toBe("heading-v3");
    const normalized = normalizeHtmlHeadingLineBreaks(`
      <html><body>
        <h3>Triple Chili Cheese 135.-</h3>
        <h3>The Godfather 269.-</h3>
        <p>American Fries 84.-</p>
      </body></html>
    `);
    expect(normalized).toContain("Triple Chili Cheese 135,-");
    expect(normalized).toContain("The Godfather 269,-");
    expect(normalized).toContain("American Fries 84,-");
  });

  it("recovers Kverneriet-style title plus normalized trailing price cards", () => {
    const html = normalizeHtmlHeadingLineBreaks(`
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

  it("normalizes price lines with parenthetical allergen metadata so trailing-card recovery can use them", () => {
    const html = normalizeHtmlHeadingLineBreaks(`
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
    `);
    expect(html).not.toContain("Mollusc, garlic");
    expect(html).not.toContain("Shellfish, mustard");
    const items = recoverTrailingPriceCardHtmlItems(html);
    expect(items.map(({ name }) => name)).toEqual([
      "Pork Gyoza with Japanese ketchup (4 pcs)",
      "Chicken Gyoza with Truffle Tosazu (4 pcs)",
      "King Crab dumplings with kimchi mayonnaise (4 pcs)",
      "Shiitake Wontons with vinegar/soy dip (5 pcs)",
    ]);
    expect(items.map(({ priceMinor }) => priceMinor)).toEqual([
      19500,
      19500,
      19500,
      20500,
    ]);
  });

  it("filters badge, branded section and per-person display labels while preserving real dishes", () => {
    expect(HTML_OUTPUT_CANONICALIZER_VERSION).toBe("output-canonical-v3");
    const names = [
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
      "Vegan crispy oyster mushrooms",
      "Laksetartar taco agurk, yuzu, ingefær og soya",
      "Chicken Tikka",
      "Veg Biryani",
    ];
    const output = canonicalizeHtmlOutputItems(
      names.map((name, position) => item(name, position)),
    );
    expect(output.map(({ name }) => name)).toEqual([
      "Vegan crispy oyster mushrooms",
      "Laksetartar taco agurk, yuzu, ingefær og soya",
      "Chicken Tikka",
      "Veg Biryani",
    ]);
  });
});
