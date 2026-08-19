import { describe, expect, it } from "vitest";
import {
  HTML_PRICE_WRAPPED_RECOVERY_VERSION,
  recoverPriceWrappedHtmlItems,
} from "./html-price-wrapped-recovery.js";

describe("HTML price-wrapped menu recovery", () => {
  it("recovers repeated price-title-description-same-price blocks", () => {
    const visibleText = [
      "FORRETTER",
      "Kr. 185,-",
      "GRATINERTE REKER",
      "Reker gratinert med hvitløk og urter",
      "Kr. 185,-",
      "Kr. 189,-",
      "PANNESTEKT SCAMPI",
      "Scampi med chili, hvitløk og sitron",
      "Kr. 189,-",
      "Kr. 169,-",
      "BLOMKÅLSUPPE",
      "Kremet blomkålsuppe med sprø topping",
      "Kr. 169,-",
    ].join("\n");

    const items = recoverPriceWrappedHtmlItems(visibleText);

    expect(HTML_PRICE_WRAPPED_RECOVERY_VERSION).toBe("price-wrapped-v2");
    expect(items.map((item) => item.name)).toEqual([
      "GRATINERTE REKER",
      "PANNESTEKT SCAMPI",
      "BLOMKÅLSUPPE",
    ]);
    expect(items.map((item) => item.priceMinor)).toEqual([18500, 18900, 16900]);
    expect(items[0]?.description).toContain("hvitløk");
  });

  it("recovers a sequence where explicit kr prices are fused to description or allergen text", () => {
    const visibleText = [
      "Tyrkisk Retter",
      "Ali Nazik med adana kebab",
      "En tradisjonell rett med aubergine og hvitløksyoghurt.",
      "Allergener: melk, hvete",
      "309 kr",
      "Adana kebab",
      "Marinert kjøttdeig, chili og tzatziki.",
      "Allergener: Melk og hvete309 kr",
      "Sis kebab",
      "Marinert kjøtt fra ytrefilet grillspyd, tomat og chili.",
      "Allergener: Melk og hvete329 kr",
      "Mix grill",
      "Tre grillspyd, ytrefilet, lam og kylling.",
      "(Allergener: gluten, melk)349 kr",
      "Køfte",
      "Marinert kjøttdeig, chili og tzatziki.",
      "Allergener: Melk og hvete294 kr",
    ].join("\n");

    const items = recoverPriceWrappedHtmlItems(visibleText);

    expect(items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Ali Nazik med adana kebab", 30900],
      ["Adana kebab", 30900],
      ["Sis kebab", 32900],
      ["Mix grill", 34900],
      ["Køfte", 29400],
    ]);
    expect(items.every((item) => !item.description?.match(/allergener?/iu))).toBe(true);
  });

  it("does not treat naked numbers, years, weights or phone-like text as fused prices", () => {
    const visibleText = [
      "Dish One",
      "250gr biff med saus",
      "Allergener: melk og hvete309",
      "Dish Two",
      "Etablert 2024",
      "Kontakt 90012136",
      "Dish Three",
      "Allergener: melk og hvete329",
      "Dish Four",
      "Pris uten valuta 349",
      "Dish Five",
      "Allergener: melk og hvete294",
    ].join("\n");

    expect(recoverPriceWrappedHtmlItems(visibleText)).toEqual([]);
  });

  it("does not activate fused recovery from too few explicit fused-price cards", () => {
    const visibleText = [
      "Dish One",
      "Allergener: melk309 kr",
      "Dish Two",
      "Allergener: melk329 kr",
      "Dish Three",
      "Allergener: melk349 kr",
    ].join("\n");

    expect(recoverPriceWrappedHtmlItems(visibleText)).toEqual([]);
  });

  it("does not accept mismatched price boundaries", () => {
    const visibleText = [
      "Kr. 185,-",
      "GRATINERTE REKER",
      "Reker gratinert med hvitløk",
      "Kr. 189,-",
      "Kr. 169,-",
      "BLOMKÅLSUPPE",
      "Kremet blomkålsuppe",
      "Kr. 175,-",
      "Kr. 195,-",
      "LIMOUSIN CARPACCIO",
      "Tynne skiver av okse",
      "Kr. 205,-",
    ].join("\n");

    expect(recoverPriceWrappedHtmlItems(visibleText)).toEqual([]);
  });

  it("requires at least three complete wrappers before activating legacy same-price recovery", () => {
    const visibleText = [
      "Kr. 185,-",
      "GRATINERTE REKER",
      "Reker gratinert med hvitløk",
      "Kr. 185,-",
      "Kr. 189,-",
      "PANNESTEKT SCAMPI",
      "Scampi med chili",
      "Kr. 189,-",
    ].join("\n");

    expect(recoverPriceWrappedHtmlItems(visibleText)).toEqual([]);
  });
});
