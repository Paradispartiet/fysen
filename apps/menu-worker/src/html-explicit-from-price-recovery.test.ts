import { describe, expect, it } from "vitest";
import {
  HTML_EXPLICIT_FROM_PRICE_RECOVERY_VERSION,
  recoverExplicitFromPriceHtmlItems,
} from "./html-explicit-from-price-recovery.js";

describe("explicit from-price HTML recovery", () => {
  it("recovers standalone from-price cards and preserves from semantics", () => {
    const items = recoverExplicitFromPriceHtmlItems(`
      Hovedretter
      House Plov
      from 349 NOK
      Traditional rice dish with meat and carrots.
      Vegetable Plov
      fra 329 NOK
      Vegetable rice dish with chickpeas.
    `);

    expect(HTML_EXPLICIT_FROM_PRICE_RECOVERY_VERSION).toBe("from-price-v1");
    expect(items.map((item) => [item.name, item.priceMinor, item.priceKind])).toEqual([
      ["House Plov", 34900, "from"],
      ["Vegetable Plov", 32900, "from"],
    ]);
  });

  it("understands dotted European thousands without confusing decimal prices", () => {
    const items = recoverExplicitFromPriceHtmlItems(`
      Sharing Menu Four
      from 2.396 NOK
      Sharing Menu Six
      from 3.100 NOK
      Small Plate
      from 99.50 NOK
    `);

    expect(items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Sharing Menu Four", 239600],
      ["Sharing Menu Six", 310000],
      ["Small Plate", 9950],
    ]);
  });

  it("supports inline title + from-price lines and ignores section labels as titles", () => {
    const items = recoverExplicitFromPriceHtmlItems(`
      Forretter
      Crispy Rolls from 119 NOK
      Hovedretter
      Lamb Stew fra 299 NOK
      Dessert
      from 149 NOK
    `);

    expect(items.map((item) => item.name)).toEqual(["Crispy Rolls", "Lamb Stew"]);
  });

  it("does not cross another price boundary when no plausible title precedes a from-price", () => {
    const items = recoverExplicitFromPriceHtmlItems(`
      House Soup
      from 159 NOK
      99 NOK
      from 249 NOK
    `);

    expect(items.map((item) => item.name)).toEqual(["House Soup"]);
  });
});
