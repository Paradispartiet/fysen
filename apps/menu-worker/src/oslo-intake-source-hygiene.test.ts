import { describe, expect, it } from "vitest";
import { createMenuItemSourceKey, normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";
import { extractHtmlMenu } from "./html-extractor.js";
import { isCanonicalBatchIntakeMenuItem, isCanonicalHtmlMenuItem } from "./menu-source-runtime.js";

function item(name: string): MenuObservedItem {
  return {
    sourceKey: createMenuItemSourceKey(name),
    name,
    normalizedName: normalizeDishName(name),
    description: null,
    sectionName: null,
    priceMinor: 28900,
    currency: "NOK",
    position: 0,
    extractionMethod: "html_heuristic",
    confidence: 0.9,
    sourceExcerpt: name,
  };
}

describe("Oslo intake source hygiene", () => {
  it("drops allergen rows and phone-number fragments without dropping priced dishes", () => {
    for (const name of [
      "A: hvete, milk, egg",
      "A: hvete, melk, egg, sulfitt",
      "Allergen: Egg, sulfitt, sennep",
      "Allergener: melk, hvete",
      "22144444 eller 924 32",
      "22144444",
      "DESSERT : TIRAMISU",
      "FORRETT: SHARING AV ITALIENSK SPEKEMAT",
      "HOVEDRETT: PASTA OG PIZZA SHARING",
      "Alle våre pizzaer kan lages glutenfri +",
      "Alle pizzaer kan lages glutenfri",
      "All our pizzas can be made gluten-free +",
    ]) {
      expect(isCanonicalHtmlMenuItem(item(name)), name).toBe(false);
      expect(isCanonicalBatchIntakeMenuItem(item(name)), name).toBe(false);
    }
    for (const name of ["Pasta Salsiccia", "Torshovburger & fries", "A la carte burger", "Pizza Tatler", "Fries & Hvitløksmajones"]) {
      expect(isCanonicalBatchIntakeMenuItem(item(name)), name).toBe(true);
    }
  });

  it("rejects a stale structured dish when nearly all JSON-LD menu titles are visible", () => {
    const dishes = ["Ain't that a classic", "Pollo Loco", "Funky Margarita", "Texas Cowboy", "Cajun Chicken Salad"];
    const structured = [...dishes.slice(0, 4), "Mediterranean Chicken Salad"];
    const html = `<html><body><script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@graph": structured.map((name) => ({
        "@type": "MenuItem",
        name,
        offers: { "@type": "Offer", price: "275", priceCurrency: "NOK" },
      })),
    })}</script><main><h1>PIZZA</h1>${dishes.map((name) => `<p>${name} 275,-</p>`).join("")}</main></body></html>`;
    const result = extractHtmlMenu(html);
    expect(result.method).toBe("json_ld");
    expect(result.items.map((dish) => dish.name)).toEqual(dishes.slice(0, 4));
  });

  it("retains valid JSON-LD when there is no comparable visible menu", () => {
    const html = `<html><body><script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@graph": ["Pasta Salsiccia", "Pizza Tatler", "Mushroom Risotto", "Seafood Soup", "Cajun Salad"].map((name) => ({
        "@type": "MenuItem", name, offers: { "@type": "Offer", price: "250" },
      })),
    })}</script><p>Restaurant online booking</p></body></html>`;
    expect(extractHtmlMenu(html).items).toHaveLength(5);
  });
});
