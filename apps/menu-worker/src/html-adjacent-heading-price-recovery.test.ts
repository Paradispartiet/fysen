import { describe, expect, it } from "vitest";
import {
  HTML_ADJACENT_HEADING_PRICE_RECOVERY_VERSION,
  recoverAdjacentHeadingPriceHtmlItems,
} from "./html-adjacent-heading-price-recovery.js";

describe("adjacent heading-price HTML recovery", () => {
  it("recovers a repeated dish-heading level, preserves comma names and excludes footer phone metadata", () => {
    const items = recoverAdjacentHeadingPriceHtmlItems(`
      <html><body>
        <h2>Our Menu</h2>
        <h3>Doro Wet</h3><div><span>NOK</span><strong>290</strong></div><p>Chicken and injera</p>
        <h3>Key Wet</h3><div>NOK 280</div><p>Beef and injera</p>
        <h3>Shiro w/salad</h3><div>NOK 265</div><p>Ground peas, onion, garlic, oil</p>
        <h3>Shiro, Meser</h3><div>NOK 290</div><p>Injera pieces mixed with onion and berbere</p>
        <h3>Salad w/tuna</h3><div>NOK 165</div><p>Lettuce and tuna</p>
        <footer>Phone: 457 66 490</footer>
      </body></html>
    `);

    expect(HTML_ADJACENT_HEADING_PRICE_RECOVERY_VERSION).toBe("heading-price-v3");
    expect(items.map((item) => [item.name, item.priceMinor, item.priceKind])).toEqual([
      ["Doro Wet", 29000, "exact"],
      ["Key Wet", 28000, "exact"],
      ["Shiro w/salad", 26500, "exact"],
      ["Shiro, Meser", 29000, "exact"],
      ["Salad w/tuna", 16500, "exact"],
    ]);
    expect(items.some((item) => item.name.startsWith("Phone:"))).toBe(false);
  });

  it("preserves from-price semantics instead of inventing an exact price", () => {
    const items = recoverAdjacentHeadingPriceHtmlItems(`
      <html><body>
        <h2>Corndogs</h2>
        <h3>Sausage Corndog</h3><p>fra 99 NOK</p>
        <h3>Half & Half Corndog</h3><p>fra 109 NOK</p>
        <h3>Mozzarella Corndog</h3><p>from 115 NOK</p>
        <h3>Octopus Ink Corndog</h3><p>119 NOK</p>
      </body></html>
    `);

    expect(items.map((item) => [item.name, item.priceMinor, item.priceKind])).toEqual([
      ["Sausage Corndog", 9900, "from"],
      ["Half & Half Corndog", 10900, "from"],
      ["Mozzarella Corndog", 11500, "from"],
      ["Octopus Ink Corndog", 11900, "exact"],
    ]);
  });

  it("keeps the first dish after a section heading when a nested UI badge precedes its price", () => {
    const items = recoverAdjacentHeadingPriceHtmlItems(`
      <html><body>
        <h2>Main courses</h2>
        <h3>House Plov</h3><h4>Popular dish</h4><p>from 349 NOK</p>
        <h3>Vegetable Plov</h3><p>from 329 NOK</p>
        <h3>Clay Pot Lamb</h3><p>449 NOK</p>
        <h3>Handmade Dumplings</h3><p>399 NOK</p>
      </body></html>
    `);

    expect(items.map((item) => [item.name, item.priceMinor, item.priceKind])).toEqual([
      ["House Plov", 34900, "from"],
      ["Vegetable Plov", 32900, "from"],
      ["Clay Pot Lamb", 44900, "exact"],
      ["Handmade Dumplings", 39900, "exact"],
    ]);
  });

  it("excludes descendant beverage cards when a repeated heading-price menu enters a drink section", () => {
    const items = recoverAdjacentHeadingPriceHtmlItems(`
      <html><body>
        <h2>Main courses</h2>
        <h3>Lamb Rice</h3><p>299 NOK</p>
        <h3>Chicken Rice</h3><p>279 NOK</p>
        <h3>Vegetable Rice</h3><p>249 NOK</p>
        <h3>Beef Noodles</h3><p>319 NOK</p>
        <h2>Drikke</h2>
        <h3>House Soda</h3><p>55 NOK</p>
        <h3>Yoghurt Drink</h3><p>59 NOK</p>
        <h3>Pear Lemonade</h3><p>69 NOK</p>
        <h3>Dark Malt Drink</h3><p>79 NOK</p>
      </body></html>
    `);

    expect(items.map((item) => item.name)).toEqual([
      "Lamb Rice",
      "Chicken Rice",
      "Vegetable Rice",
      "Beef Noodles",
    ]);
  });

  it("parses dotted European thousands in NOK cards without treating ordinary decimals as thousands", () => {
    const items = recoverAdjacentHeadingPriceHtmlItems(`
      <html><body>
        <h3>Sharing Menu Four</h3><p>from 2.396 NOK</p>
        <h3>Sharing Menu Six</h3><p>from 3.100 NOK</p>
        <h3>Small Plate</h3><p>99.50 NOK</p>
        <h3>Dessert Plate</h3><p>119 NOK</p>
      </body></html>
    `);

    expect(items.map((item) => [item.name, item.priceMinor, item.priceKind])).toEqual([
      ["Sharing Menu Four", 239600, "from"],
      ["Sharing Menu Six", 310000, "from"],
      ["Small Plate", 9950, "exact"],
      ["Dessert Plate", 11900, "exact"],
    ]);
  });

  it("does not reinterpret a line containing multiple displayed prices as one from-price", () => {
    const items = recoverAdjacentHeadingPriceHtmlItems(`
      <html><body>
        <h3>Discounted Bowl</h3><p>fra 199,20 NOK 249 NOK</p>
        <h3>Dish Two</h3><p>109 NOK</p>
        <h3>Dish Three</h3><p>115 NOK</p>
        <h3>Dish Four</h3><p>119 NOK</p>
      </body></html>
    `);

    expect(items.some((item) => item.name === "Discounted Bowl")).toBe(false);
  });

  it("rejects bottled-water headings while preserving neighboring food cards", () => {
    const items = recoverAdjacentHeadingPriceHtmlItems(`
      <html><body>
        <h3>Deep-fried Mandu</h3><p>79 NOK</p>
        <h3>Spicy Pork Bulgogi Bowl</h3><p>239 NOK</p>
        <h3>Telemark Still Naturell</h3><p>49 NOK</p>
        <h3>Telemark Sparkling Naturell</h3><p>49 NOK</p>
        <h3>Bibimbap</h3><p>229 NOK</p>
        <h3>Tteokbokki</h3><p>189 NOK</p>
      </body></html>
    `);

    expect(items.map((item) => item.name)).toEqual([
      "Deep-fried Mandu",
      "Spicy Pork Bulgogi Bowl",
      "Bibimbap",
      "Tteokbokki",
    ]);
  });

  it("fails closed when there are too few repeated heading-price cards to establish a menu pattern", () => {
    const items = recoverAdjacentHeadingPriceHtmlItems(`
      <html><body>
        <h2>Summer offer</h2><p>NOK 250</p>
        <h2>Gift card</h2><p>NOK 500</p>
        <h2>Opening hours</h2><p>Monday to Friday</p>
      </body></html>
    `);

    expect(items).toEqual([]);
  });
});
