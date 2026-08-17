import { describe, expect, it } from "vitest";
import { extractMenuItemsFromPdfLines } from "./pdf-extractor.js";

describe("PDF trailing-price parsing", () => {
  it("parses prices from the right edge when the dish name itself contains numbers", () => {
    const items = extractMenuItemsFromPdfLines([
      "VARMRETTER",
      "CRISPY DUCK for 2 570 / 590",
      "And med pannekaker og hoisinsaus",
      "FAMILIEPAKKE 4 personer 699 / 749",
      "Stor delepakke",
      "SALMON OMEGA 3 229 / 249",
      "Laks og avokado",
    ]);

    expect(items).toHaveLength(3);
    expect(items[0]).toMatchObject({
      name: "CRISPY DUCK for 2",
      priceMinor: 57000,
      priceKind: "multiple",
      priceMaxMinor: 59000,
    });
    expect(items[1]).toMatchObject({
      name: "FAMILIEPAKKE 4 personer",
      priceMinor: 69900,
      priceKind: "multiple",
      priceMaxMinor: 74900,
    });
    expect(items[2]).toMatchObject({
      name: "SALMON OMEGA 3",
      priceMinor: 22900,
      priceKind: "multiple",
      priceMaxMinor: 24900,
    });
  });

  it("keeps quantity numbers in exact-price dish names", () => {
    const items = extractMenuItemsFromPdfLines([
      "SMÅRETTER",
      "VÅRRULLER 4 stk. 129",
      "Grønnsaker og sweet chili",
    ]);

    expect(items[0]).toMatchObject({
      name: "VÅRRULLER 4 stk.",
      priceMinor: 12900,
      priceKind: "exact",
      priceMaxMinor: null,
    });
  });

  it("still rejects a trailing number below the canonical menu-price floor", () => {
    const items = extractMenuItemsFromPdfLines([
      "NIGIRI",
      "Laks 3 biter 29",
    ]);
    expect(items).toHaveLength(0);
  });
});
