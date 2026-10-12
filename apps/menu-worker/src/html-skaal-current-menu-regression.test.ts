import { describe, expect, it } from "vitest";
import {
  recoverInlineHeadingMultiplePriceHtmlItems,
  recoverTrailingPriceCardHtmlItems,
} from "./html-trailing-price-card-recovery.js";
import { extractMenuSource } from "./menu-source-runtime.js";

// The three menu sections and priced headings reflect Skaal's first-party
// page on 2026-10-12. Keep these source-backed titles rather than compensating
// for parser loss by reducing minimumExpectedItems below 20.
const sections: ReadonlyArray<readonly [string, ReadonlyArray<readonly [string, string]>]> = [
  ["Kveldsmeny", [
    ["Østers Naturell / Dagens topping", "45/55,-"],
    ["Bolinhos", "115,-"],
    ["Toast - Cheddar & Jalapeño", "165,-"],
    ["Toast - Svineknoke, Cheddar/Jalapeno", "175,-"],
    ["Betesalat m/ Ricottakrem", "205,-"],
    ["Crispy Aubergine", "195,-"],
    ["Lange m/Szechuan", "235,-"],
    ['"SKAAL Lasagne"', "235,-"],
    ["Lammeribs", "245,-"],
    ["Tarte Tatin m/ Pære", "165,-"],
    ["Brillat Savarin", "165,-"],
  ]],
  ["Lunchmeny Tirsdag-Fredag", [
    ["Østers Lunch", "45/55,-"],
    ["Toast - Cheddar & Jalapeño", "165,-"],
    ["Toast - Svineknoke, Cheddar/Jalapeno", "175,-"],
    ["Fritert Gresskar m/ Hvit Bønne Hummus", "225,-"],
    ["Skagentoast", "235,-"],
    ["Andeconfit Toast", "245,-"],
    ["Fries & Alioli", "85,-"],
    ["Brownie", "165,-"],
  ]],
  ["Brunch (Lørdag&Søndag) - Alle retter kan fint deles på bordet", [
    ["Østers Brunch", "45/55,-"],
    ["Toast - Cheddar & Jalapeño", "165,-"],
    ["Toast - Svineknoke, Cheddar/Jalapeno", "175,-"],
    ["Nachos m/ Krabbe", "225,-"],
    ["Fritert Gresskar m/ Hvit Bønne Hummus & Egg", "235,-"],
    ["Andeconfit Toast", "245,-"],
    ["Skagentoast", "235,-"],
    ["Fries & Alioli", "85,-"],
    ["Brownie", "165,-"],
  ]],
];

const html = `<html><body>${sections.map(([section, dishes]) =>
  `<h2>${section}</h2>${dishes.map(([name, price]) =>
    `<article><h3>${name} ${price}</h3><p>Serveres på Skaal.</p><p>HV, E, L</p></article>`,
  ).join("")}`,
).join("")}<h2>Allergier</h2><p>HV: Hvete</p></body></html>`;

describe("Skaal first-party menu heading regressions", () => {
  it("recovers explicitly priced fritert headings without interpreting descriptions as dishes", () => {
    const recovered = recoverTrailingPriceCardHtmlItems(html);
    expect(recovered.map((item) => [item.name, item.priceMinor])).toEqual(
      expect.arrayContaining([
        ["Fritert Gresskar m/ Hvit Bønne Hummus", 22500],
        ["Fritert Gresskar m/ Hvit Bønne Hummus & Egg", 23500],
      ]),
    );
    expect(recovered.some((item) => item.name === "Serveres på Skaal.")).toBe(false);
  });

  it("preserves distinct 45/55 kr oyster prices as multiple, never an invented fixed price", () => {
    const recovered = recoverInlineHeadingMultiplePriceHtmlItems(html);
    expect(recovered.map((item) => [item.name, item.priceMinor, item.priceKind, item.priceMaxMinor])).toEqual([
      ["Østers Naturell / Dagens topping", 4500, "multiple", 5500],
      ["Østers Lunch", 4500, "multiple", 5500],
      ["Østers Brunch", 4500, "multiple", 5500],
    ]);
  });

  it("keeps the source-backed 20-distinct-dish floor and current required variants", async () => {
    const result = await extractMenuSource("html", {
      kind: "content",
      fetchedAt: "2026-10-12T00:00:00.000Z",
      status: 200,
      contentType: "text/html",
      body: html,
      bodyBytes: new TextEncoder().encode(html),
      rawSha256: "skaal-source-regression",
      etag: null,
      lastModified: null,
      durationMs: 1,
      robotsAllowed: true,
    });
    const uniqueNames = new Set(result.items.map((item) => item.normalizedName));
    expect(uniqueNames.size).toBeGreaterThanOrEqual(20);
    for (const [name, price] of [
      ["Betesalat m/ Ricottakrem", 20500],
      ["Lammeribs", 24500],
      ["Fritert Gresskar m/ Hvit Bønne Hummus", 22500],
      ["Fritert Gresskar m/ Hvit Bønne Hummus & Egg", 23500],
    ] as const) {
      expect(result.items).toContainEqual(expect.objectContaining({ name, priceMinor: price }));
    }
    expect(result.items.filter((item) => item.name.startsWith("Østers"))).toHaveLength(3);
    expect(result.items.some((item) => /Thaisalat m\/Reker|Meatball Sub/u.test(item.name))).toBe(false);
  });
});
