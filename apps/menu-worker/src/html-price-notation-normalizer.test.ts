import { describe, expect, it } from "vitest";
import { extractScopedHtmlMenu } from "./html-source-extractor.js";
import {
  HTML_ITEM_NAME_NORMALIZER_VERSION,
  HTML_PRICE_NOTATION_NORMALIZER_VERSION,
  isCanonicalHtmlMenuItem,
  normalizeHtmlItemName,
  normalizeHtmlPriceNotation,
} from "./menu-source-runtime.js";

describe("HTML menu runtime normalization", () => {
  it("normalizes common slash-style NOK prices without changing ordinary prices", () => {
    expect(HTML_PRICE_NOTATION_NORMALIZER_VERSION).toBe("price-notation-v1");
    expect(normalizeHtmlPriceNotation("KR. 179,/- · 165/- · 199,- · NOK 249")).toBe(
      "KR. 179,- · 165,- · 199,- · NOK 249",
    );
  });

  it("makes heading-description-price cards with slash-style prices canonical-extractable", () => {
    const html = `
      <html><body>
        <h2>Starters</h2>
        <article>
          <h3>Coastal Delight</h3>
          <p>Spiced coastal starter with herbs and coconut.</p>
          <h4>KR. 179,/-</h4>
        </article>
        <article>
          <h3>Palak Corn Kebab</h3>
          <p>Spinach and corn kebab with aromatic spices.</p>
          <h4>KR. 165,/-</h4>
        </article>
        <article>
          <h3>Tangy Lamb Chop</h3>
          <p>Grilled lamb chop with tangy marinade.</p>
          <h4>KR. 199,/-</h4>
        </article>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(normalizeHtmlPriceNotation(html));
    expect(result.items.map((item) => item.name)).toEqual([
      "Coastal Delight",
      "Palak Corn Kebab",
      "Tangy Lamb Chop",
    ]);
    expect(result.items.map((item) => item.priceMinor)).toEqual([17900, 16500, 19900]);
  });

  it("strips short uppercase allergen-code lists while preserving semantic parentheses", () => {
    expect(HTML_ITEM_NAME_NORMALIZER_VERSION).toBe("item-name-v3");
    const allergenItem = normalizeHtmlItemName({
      sourceKey: "old",
      name: "Rasmalai (G, M, E, N)",
      normalizedName: "rasmalai g m e n",
      description: "Milk dumpling dessert.",
      sectionName: "Desserts",
      priceMinor: 16900,
      currency: "NOK",
      position: 4,
      extractionMethod: "html_heuristic",
      confidence: 0.9,
      sourceExcerpt: "Rasmalai (G, M, E, N) — KR. 169,/-",
    });
    const semanticItem = normalizeHtmlItemName({
      sourceKey: "old-semantic",
      name: "Wienerschnitzel",
      normalizedName: "wienerschnitzel",
      description: "Med grønnsaker og pommes frites.",
      sectionName: "Hovedretter",
      priceMinor: 39900,
      currency: "NOK",
      position: 10,
      extractionMethod: "html_heuristic",
      confidence: 0.9,
      sourceExcerpt: "11. Wienerschnitzel (Kalv) — Kr 399,-",
    });

    expect(allergenItem.name).toBe("Rasmalai");
    expect(allergenItem.normalizedName).toBe("rasmalai");
    expect(semanticItem.name).toBe("Wienerschnitzel (Kalv)");
    expect(semanticItem.normalizedName).toContain("kalv");
    expect(semanticItem.priceMinor).toBe(39900);
  });

  it("still strips a single short allergen code", () => {
    const item = normalizeHtmlItemName({
      sourceKey: "old",
      name: "Coastal Delight (SF)",
      normalizedName: "coastal delight sf",
      description: null,
      sectionName: null,
      priceMinor: 17900,
      currency: "NOK",
      position: 1,
      extractionMethod: "html_heuristic",
      confidence: 0.9,
      sourceExcerpt: "Coastal Delight (SF) — 179",
    });

    expect(item.name).toBe("Coastal Delight");
  });

  it("strips a recovered trailing inline NOK price without changing the parsed price value", () => {
    const item = normalizeHtmlItemName({
      sourceKey: "old",
      name: "Vegetar BURGER - 235 KR",
      normalizedName: "vegetar burger 235 kr",
      description: "H, SO, L",
      sectionName: "Burgers",
      priceMinor: 23500,
      currency: "NOK",
      position: 8,
      extractionMethod: "html_heuristic",
      confidence: 0.84,
      sourceExcerpt: "Vegetar BURGER - 235 KR — H, SO, L — 235",
    });

    expect(item.name).toBe("Vegetar BURGER");
    expect(item.normalizedName).toBe("vegetar burger");
    expect(item.sourceKey).not.toBe("old");
    expect(item.priceMinor).toBe(23500);
    expect(item.description).toBe("H, SO, L");
  });

  it("does not strip a dash-number suffix when it lacks a currency marker", () => {
    const item = normalizeHtmlItemName({
      sourceKey: "stable",
      name: "Table 42 - 7",
      normalizedName: "table 42 7",
      description: null,
      sectionName: null,
      priceMinor: 700,
      currency: "NOK",
      position: 1,
      extractionMethod: "html_heuristic",
      confidence: 0.9,
      sourceExcerpt: "Table 42 - 7",
    });

    expect(item.name).toBe("Table 42 - 7");
    expect(item.sourceKey).toBe("stable");
  });

  it("rejects numeric-only HTML item names as non-canonical menu entries", () => {
    expect(
      isCanonicalHtmlMenuItem({
        sourceKey: "phone-fragment",
        name: "994 44",
        normalizedName: "994 44",
        description: null,
        sectionName: null,
        priceMinor: 99400,
        currency: "NOK",
        position: 99,
        extractionMethod: "html_heuristic",
        confidence: 0.5,
        sourceExcerpt: "994 44",
      }),
    ).toBe(false);
  });
});
