import { describe, expect, it } from "vitest";
import {
  HTML_STRONG_TITLE_PRICE_RECOVERY_VERSION,
  recoverStrongTitlePriceHtmlItems,
} from "./html-strong-title-price-recovery.js";

describe("strong-title price recovery", () => {
  it("binds leading strong dish titles to local prices and excludes section headings", () => {
    const items = recoverStrongTitlePriceHtmlItems(`
      <h4><strong>SMALL PLATES</strong></h4>
      <p><strong>Garden dumplings</strong> herbs</p><p>120,-</p><p>—</p>
      <p><strong>Roasted aubergine</strong> chilli</p><p>180,-</p><p>—</p>
      <p><strong>Charred cabbage</strong> miso</p><p>190,-</p><p>—</p>
      <h4><strong>MAINS</strong></h4>
      <p><strong>Herb chicken</strong> rice</p><p>260,-</p><p>—</p>
      <p><strong>Market fish</strong> ginger</p><p>310,-</p><p>—</p>
      <p><strong>Mushroom rice</strong> shallots</p><p>230,-</p>
    `);
    expect(HTML_STRONG_TITLE_PRICE_RECOVERY_VERSION).toBe("strong-title-price-v2");
    expect(items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Garden dumplings", 12000], ["Roasted aubergine", 18000], ["Charred cabbage", 19000],
      ["Herb chicken", 26000], ["Market fish", 31000], ["Mushroom rice", 23000],
    ]);
    expect(items.some((item) => item.name === "SMALL PLATES" || item.name === "MAINS")).toBe(false);
  });

  it("defers a coherent strong-title suffix to substantially broader heading-price coverage", () => {
    const headingCards = Array.from({ length: 10 }, (_, index) => `
      <h4>Main dish ${index + 1}</h4>
      <p>Canonical main description ${index + 1}</p>
      <h5>${210 + index},-</h5>
    `).join("");
    const strongCards = Array.from({ length: 6 }, (_, index) => `
      <p><strong>Dessert ${index + 1}</strong> sweet finish</p>
      <p>${120 + index},-</p>
    `).join("");

    const items = recoverStrongTitlePriceHtmlItems(`
      <html><body>
        <h2>Hovedretter</h2>${headingCards}
        <h2>Dessert</h2>${strongCards}
      </body></html>
    `);

    expect(items).toEqual([]);
  });

  it("stops a group label when a nearer strong dish appears before price", () => {
    const items = recoverStrongTitlePriceHtmlItems(`
      <p><strong>Skewers (2 pcs)</strong></p>
      <p><strong>Chicken skewer</strong> herbs</p><p>220,-</p>
      <p><strong>Prawn skewer</strong> lime</p><p>230,-</p>
      <p><strong>Padron skewer</strong> sesame</p><p>190,-</p>
      <p><strong>Spring rolls</strong> herbs</p><p>210,-</p>
      <p><strong>Lamb bites</strong> tamarind</p><p>240,-</p>
      <p><strong>Crispy tofu</strong> chilli</p><p>200,-</p>
    `);
    expect(items.some((item) => item.name === "Skewers (2 pcs)")).toBe(false);
    expect(items).toHaveLength(6);
  });

  it("joins split strong title fragments and permits one plain description line", () => {
    const items = recoverStrongTitlePriceHtmlItems(`
      <p><strong>Crispy oyster</strong> <strong>mushrooms</strong></p><p>for two, pancakes</p><p>720,-</p>
      <p><strong>Dish two</strong> description</p><p>220,-</p>
      <p><strong>Dish three</strong> description</p><p>230,-</p>
      <p><strong>Dish four</strong> description</p><p>240,-</p>
      <p><strong>Dish five</strong> description</p><p>250,-</p>
      <p><strong>Dish six</strong> description</p><p>260,-</p>
    `);
    expect(items[0]?.name).toBe("Crispy oyster mushrooms");
    expect(items[0]?.description).toBe("for two, pancakes");
    expect(items[0]?.priceMinor).toBe(72000);
  });

  it("supports per-person prices and fails closed below six coherent rows", () => {
    const items = recoverStrongTitlePriceHtmlItems(`
      <p><strong>Six tastes</strong></p><p>995,– per person Minimum 2 persons</p>
      <p><strong>Seven tastes</strong></p><p>1095,– per person Minimum 2 persons</p>
      <p><strong>Vegetable menu</strong></p><p>975,– per person</p>
      <p><strong>Starter one</strong></p><p>140,-</p>
      <p><strong>Starter two</strong></p><p>150,-</p>
      <p><strong>Starter three</strong></p><p>160,-</p>
    `);
    expect(items.map((item) => item.priceMinor)).toEqual([99500, 109500, 97500, 14000, 15000, 16000]);
    expect(recoverStrongTitlePriceHtmlItems(`<p><strong>Gift card</strong></p><p>500,-</p>`)).toEqual([]);
  });
});
