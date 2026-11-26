import { describe, expect, it } from "vitest";
import { parseNordicMenuPrice } from "./nordic-menu-price.js";

describe("Nordic reviewed price fields", () => {
  it("preserves kroner and low euro amounts in local minor units", () => {
    expect(parseNordicMenuPrice("173", "DKK")).toEqual({
      currency: "DKK", priceMinor: 17300, priceKind: "exact", priceMaxMinor: null,
    });
    expect(parseNordicMenuPrice("285:-", "SEK")?.priceMinor).toBe(28500);
    expect(parseNordicMenuPrice("kr 198,-", "DKK")?.priceMinor).toBe(19800);
    expect(parseNordicMenuPrice("€ 7,90", "EUR")?.priceMinor).toBe(790);
    expect(parseNordicMenuPrice("29,90 EUR", "EUR")?.priceMinor).toBe(2990);
    expect(parseNordicMenuPrice("14,20/22,20", "EUR")).toEqual({
      currency: "EUR", priceMinor: 1420, priceKind: "multiple", priceMaxMinor: 2220,
    });
  });
  it("rejects foreign currency, ambiguous formats and units", () => {
    for (const raw of ["285 NOK", "EUR 285", "€285", "1/1 295", "195, 1/1 295", "50 g", "12:30", "0", "2026-11-25", "1.200"]) {
      expect(parseNordicMenuPrice(raw, "SEK")).toBeNull();
    }
    expect(parseNordicMenuPrice("3,50/hlö", "EUR")).toBeNull();
    expect(parseNordicMenuPrice("14,20 kr", "EUR")).toBeNull();
    expect(parseNordicMenuPrice("22,20/14,20", "EUR")).toBeNull();
  });
});

  describe("Icelandic whole-króna menu fields", () => {
    it("accepts unambiguous thousands separators only for ISK", () => {
      expect(parseNordicMenuPrice("3.290 kr.", "ISK")?.priceMinor).toBe(329000);
      expect(parseNordicMenuPrice("ISK 3 290", "ISK")?.priceMinor).toBe(329000);
      expect(parseNordicMenuPrice("3.290,- kr.", "ISK")?.priceMinor).toBe(329000);
      expect(parseNordicMenuPrice("3.290/4.290", "ISK")?.priceMaxMinor).toBe(429000);
      for (const raw of ["3,29", "3.29", "3.290 EUR", "3.290 NOK", "3,290", "0"]) expect(parseNordicMenuPrice(raw, "ISK")).toBeNull();
      expect(parseNordicMenuPrice("3.290", "SEK")).toBeNull();
      expect(parseNordicMenuPrice("ISK 3290", "DKK")).toBeNull();
    });
  });
