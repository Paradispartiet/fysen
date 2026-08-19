import { describe, expect, it } from "vitest";
import {
  HTML_TRAILING_PRICE_CARD_RECOVERY_VERSION,
  recoverTrailingPriceCardHtmlItems,
} from "./html-trailing-price-card-recovery.js";

describe("trailing-price HTML card recovery", () => {
  it("recovers repeated title-description cards when the marked price is glued to metadata", () => {
    const items = recoverTrailingPriceCardHtmlItems(`
      <html><body>
        <div>Menu</div>
        <div>Dish One</div><div>Marinert kjøtt og urter.</div><div>Allergener: melk, hvete199 kr</div>
        <div>Dish Two</div><div>Grillet kylling med salat.</div><div>(Allergener: gluten, melk)209 kr</div>
        <div>Dish Three</div><div>Serveres med ris.</div><div>219 kr</div>
        <div>Dish Four</div><div>Bakt aubergine med yoghurt.</div><div>Allergener: melk229 kr</div>
        <div>Dish Five</div><div>Marinert lam med chili.</div><div>fra 239 kr</div>
      </body></html>
    `);

    expect(HTML_TRAILING_PRICE_CARD_RECOVERY_VERSION).toBe("trailing-price-card-v2");
    expect(items.map((item) => [item.name, item.priceMinor, item.priceKind])).toEqual([
      ["Dish One", 19900, "exact"],
      ["Dish Two", 20900, "exact"],
      ["Dish Three", 21900, "exact"],
      ["Dish Four", 22900, "exact"],
      ["Dish Five", 23900, "from"],
    ]);
    expect(items[0]?.description).toContain("Allergener: melk, hvete");
  });

  it("fails closed on ambiguous multi-price metadata while preserving neighboring cards", () => {
    const items = recoverTrailingPriceCardHtmlItems(`
      <html><body>
        <div>Dish One</div><div>Beskrivelse.</div><div>199 kr</div>
        <div>Ambiguous Dish</div><div>Valg 199 kr 249 kr</div>
        <div>Dish Two</div><div>Beskrivelse.</div><div>209 kr</div>
        <div>Dish Three</div><div>Beskrivelse.</div><div>219 kr</div>
        <div>Dish Four</div><div>Beskrivelse.</div><div>229 kr</div>
        <div>Dish Five</div><div>Beskrivelse.</div><div>239 kr</div>
      </body></html>
    `);

    expect(items.map((item) => item.name)).toEqual([
      "Dish One",
      "Dish Two",
      "Dish Three",
      "Dish Four",
      "Dish Five",
    ]);
    expect(items.some((item) => item.name === "Ambiguous Dish")).toBe(false);
  });

  it("does not turn navigation, commerce prompts or descriptive prose into dishes", () => {
    const items = recoverTrailingPriceCardHtmlItems(`
      <html><body>
        <div>top of page</div><div>Gift card</div><div>Choose amount</div><div>500 kr</div>
        <div>Dish One</div><div>Marinert kjøtt, løk og urter.</div><div>199 kr</div>
        <div>Dish Two</div><div>Serveres med salat.</div><div>209 kr</div>
        <div>Dish Three</div><div>Grillet kylling med hvitløk.</div><div>219 kr</div>
        <div>Dish Four</div><div>Bakt aubergine med yoghurt.</div><div>229 kr</div>
      </body></html>
    `);

    expect(items.map((item) => item.name)).toEqual(["Dish One", "Dish Two", "Dish Three", "Dish Four"]);
  });

  it("requires a repeated card pattern instead of trusting isolated price-adjacent text", () => {
    const items = recoverTrailingPriceCardHtmlItems(`
      <html><body>
        <div>Special offer</div><div>199 kr</div>
        <div>Chef recommendation</div><div>249 kr</div>
        <div>Opening hours</div><div>Monday to Friday</div>
      </body></html>
    `);

    expect(items).toEqual([]);
  });
});
