import { describe, expect, it } from "vitest";
import {
  PDF_EXTRACTOR_VERSION,
  extractMenuItemsFromPdfLines,
} from "./pdf-extractor.js";

describe("PDF prefixed NOK prices", () => {
  it("parses kr/NOK before the price and removes menu numbers and trailing allergen codes", () => {
    const items = extractMenuItemsFromPdfLines([
      "VENTERETTER // Snacks",
      "31. Rekechips og peanøtter H P kr. 79",
      "87. Dampet Edamame bønner kr.79",
      "FORRETTER // Starters",
      "30. Sprøstekt vårruller H SEM kr. 99",
      "55. Wonton suppe H SK SEM SY kr.109",
      "HOVEDRETTER // Main Dishes",
      "60. Biff stekt m/ grønnsaker i soyasaus (sterk) SY SEM NOK 249",
    ]);

    expect(PDF_EXTRACTOR_VERSION).toBe("pdf-text-v7");
    expect(items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Rekechips og peanøtter", 7900],
      ["Dampet Edamame bønner", 7900],
      ["Sprøstekt vårruller", 9900],
      ["Wonton suppe", 10900],
      ["Biff stekt m/ grønnsaker i soyasaus (sterk)", 24900],
    ]);
  });

  it("keeps ordinary suffix-style PDF prices working", () => {
    const items = extractMenuItemsFromPdfLines([
      "DESSERT",
      "Tiramisù 149,-",
      "Panna cotta 159 kr.",
      "Gelato 169 NOK",
    ]);
    expect(items.map((item) => item.name)).toEqual([
      "Tiramisù",
      "Panna cotta",
      "Gelato",
    ]);
  });
});
