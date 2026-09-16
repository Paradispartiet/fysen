import { describe, expect, it } from "vitest";
import {
  HTML_PRICE_WRAPPED_RECOVERY_VERSION,
  recoverPriceWrappedHtmlItems,
} from "./html-price-wrapped-recovery.js";

describe("HTML same-price wrapped menu recovery", () => {
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

  it("recovers repeated title followed by marked price and description rows", () => {
    const visibleText = [
      "STARTERS",
      "EDAMAME",
      "99,-Salt / Spicy",
      "VÅRRULLER",
      "169,- /Fylt med scampi, kylling og grønnsaker",
      "POPRICE SCAMPI ROLL",
      "159,- / 3 stk. Sprø scampi med chilimajones",
      "CRISPY DUCK",
      "239,-Sprøstekt and med hoisinsaus",
      "DESSERT",
    ].join("\n");

    const items = recoverPriceWrappedHtmlItems(visibleText);

    expect(items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["EDAMAME", 9900],
      ["VÅRRULLER", 16900],
      ["POPRICE SCAMPI ROLL", 15900],
      ["CRISPY DUCK", 23900],
    ]);
    expect(items[1]?.description).toContain("scampi");
  });

  it("requires at least four title plus priced-description rows before activating", () => {
    const visibleText = [
      "EDAMAME",
      "99,-Salt / Spicy",
      "VÅRRULLER",
      "169,- /Fylt med scampi",
      "CRISPY DUCK",
      "239,-Sprøstekt and",
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

  it("requires at least three complete wrappers before activating", () => {
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
