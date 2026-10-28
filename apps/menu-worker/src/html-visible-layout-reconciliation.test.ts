import { describe, expect, it } from "vitest";
import { createMenuItemSourceKey, normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";
import {
  reconcileImmediatelyPricedItems,
  reconcileVisibleSizePrices,
  removeUnpricedParentMenuHeadings,
} from "./html-visible-layout-reconciliation.js";
import { extractMenuSource } from "./menu-source-runtime.js";

function dish(name: string, price: number): MenuObservedItem {
  return {
    name,
    sourceKey: createMenuItemSourceKey(name),
    normalizedName: normalizeDishName(name),
    description: null,
    sectionName: null,
    priceMinor: price * 100,
    currency: "NOK",
    position: 0,
    extractionMethod: "html_heuristic",
    confidence: 0.9,
    sourceExcerpt: name,
  };
}

const chicagoPizzas: ReadonlyArray<readonly [string, number, number]> = [
  ["Ain't that a classic", 255, 400],
  ["Pollo Loco", 255, 400],
  ["Funky Margarita", 250, 400],
  ["Texas Cowboy", 265, 420],
  ["Into the Woods", 265, 420],
  ["The Italian Job", 275, 440],
  ["Angry Bull", 295, 485],
];

function chicagoFixture(): string {
  const structured = [...chicagoPizzas.map(([name, price]) => ({
    "@type": "MenuItem",
    name,
    offers: { "@type": "Offer", price: String(price), priceCurrency: "NOK" },
  })), {
    "@type": "MenuItem",
    name: "Mediterranean Chicken Salad",
    offers: { "@type": "Offer", price: "275", priceCurrency: "NOK" },
  }];
  return [
    "<html><body>",
    '<script type="application/ld+json">' + JSON.stringify({ "@context": "https://schema.org", "@graph": structured }) + "</script>",
    "<main><h1>PIZZA</h1><div>L</div><div>XL</div>",
    ...chicagoPizzas.flatMap(([name, first, last], index) => [
      "<h3>" + (index + 1) + "." + name + "</h3>",
      "<p>mozzarella, herbs and sauce</p><p>Allergens:</p><div>wheat</div><div>milk</div>",
      "<div>" + first + "</div><div>,-</div><div>" + last + "</div><div>,-</div>",
    ]),
    "<h3>8.Seasonal Pizza</h3><p>Ask your waiter</p><div>,-</div><div>,-</div>",
    "<h2>SIDES</h2><h3>Side salad</h3><div>95</div><p>Cajun Chicken Salad</p><div>275</div>",
    "</main></body></html>",
  ].join("\n");
}

describe("price and section hierarchy reconciliation", () => {
  it("keeps all seven published Chicago L/XL prices with no invented seasonal price", async () => {
    const html = chicagoFixture();
    const fetched = {
      kind: "content" as const,
      fetchedAt: "2026-10-14T00:00:00Z",
      status: 200,
      contentType: "text/html",
      body: html,
      bodyBytes: new TextEncoder().encode(html),
      rawSha256: "fixture",
      etag: null,
      lastModified: null,
      durationMs: 1,
      robotsAllowed: true,
    };
    const result = await extractMenuSource("html", fetched);
    expect(result.method).toBe("json_ld");
    for (const [name, l, xl] of chicagoPizzas) {
      const pizza = result.items.find((item) => item.name === name);
      expect(pizza, name).toBeDefined();
      expect(pizza?.priceMinor).toBe(l * 100);
      expect(pizza?.priceKind).toBe("multiple");
      expect(pizza?.priceMaxMinor).toBe(xl * 100);
    }
    expect(result.items.map((item) => item.name)).not.toContain("Mediterranean Chicken Salad");
    expect(result.items.map((item) => item.name)).not.toContain("Seasonal Pizza");
  });

  it("recognizes price spans concatenated by HTML layout without explicit size tokens", () => {
    const html = [
      "<html><body><h1>PIZZA</h1>",
      ...chicagoPizzas.map(([name, l, xl], index) =>
        "<h3>" + (index + 1) + "." + name + "</h3><div>" + l + ",-" + xl + ",-</div>"
      ),
      "</body></html>",
    ].join("\n");
    const items = chicagoPizzas.map(([name, price]) => dish(name, price));
    const result = reconcileVisibleSizePrices(html, items);
    expect(result.map((item) => [item.name, item.priceMinor, item.priceMaxMinor]))
      .toEqual(chicagoPizzas.map(([name, l, xl]) => [name, l * 100, xl * 100]));
  });

  it("does not invent a second price when the L/XL header is absent", () => {
    const html = "<html><body><div>1.Regina</div><p>289</p><p>450</p></body></html>";
    const result = reconcileVisibleSizePrices(html, [dish("Regina", 289)]);
    expect(result[0]?.priceKind).toBeUndefined();
    expect(result[0]?.priceMaxMinor).toBeUndefined();
  });

  it("does not assign an unrelated amount to a bare parent section heading", () => {
    const html = [
      "<html><body><h2>SELSKAPSMENYER – GROUP MENUS</h2>",
      "<div>Meny Roma. 8 PERS</div><p>pris 895</p>",
      "<h2>PIZZA DE ROMA</h2>",
      "<div>REGINA</div><div>289</div>",
      "<div>COTTO E GORGONZOLA</div><div>310</div>",
      "<div>PIZZA TATLER</div><div>319</div>",
      "<div>NORCINA</div><div>319</div>",
      "</body></html>",
    ].join("\n");
    const observed = [
      dish("Meny Roma. 8 PERS", 895),
      dish("PIZZA DE ROMA", 895),
      dish("REGINA", 289),
      dish("COTTO E GORGONZOLA", 310),
      dish("PIZZA TATLER", 319),
      dish("NORCINA", 319),
    ];
    expect(removeUnpricedParentMenuHeadings(html, observed).map((item) => item.name))
      .toEqual(observed.map((item) => item.name).filter((name) => name !== "PIZZA DE ROMA"));
  });

  it("corrects a price inherited from a previous group menu when the dish has a direct price", () => {
    const html = "<html><body><p>Meny Roma</p><p>pris 895</p><h2>PIZZA DE ROMA</h2><div>REGINA</div><div>289</div></body></html>";
    const observed = [dish("REGINA", 895)];
    const output = reconcileImmediatelyPricedItems(html, observed);
    expect(output[0]?.priceMinor).toBe(28900);
  });

  it("respects spaced comma-dash direct prices on a first-party fish-of-day card", () => {
    // Restaurant source prints 350, - around the title; a preceding
    // 395-kr fish soup must never supply this separate dish's price.
    const html = "<html><body><div>LOFOTEN'S FISH SOUP</div><p>395,-</p>" +
      "<div>350, -</div><div>FISH OF THE DAY</div><div>350, -</div></body></html>";
    const corrected = reconcileImmediatelyPricedItems(html, [dish("FISH OF THE DAY", 395)]);
    expect(corrected[0]?.priceMinor).toBe(35000);
  });

  it("preserves an already correctly priced dish", () => {
    const html = "<html><body><div>PIZZA TATLER</div><div>319</div></body></html>";
    expect(reconcileImmediatelyPricedItems(html, [dish("PIZZA TATLER", 319)])[0]?.priceMinor)
      .toBe(31900);
  });

  it("preserves a directly priced h2 dish and parent headings without three priced children", () => {
    const html = [
      "<html><body><h2>PIZZA TATLER</h2><p>319</p>",
      "<h2>PIZZA DE ROMA</h2><p>REGINA</p><p>289</p>",
      "</body></html>",
    ].join("\n");
    const items = [dish("PIZZA TATLER", 319), dish("PIZZA DE ROMA", 895), dish("REGINA", 289)];
    expect(removeUnpricedParentMenuHeadings(html, items)).toEqual(items);
  });
});
