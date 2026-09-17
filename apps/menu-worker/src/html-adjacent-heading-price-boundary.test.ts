import { describe, expect, it } from "vitest";
import {
  HTML_ADJACENT_HEADING_PRICE_RECOVERY_VERSION,
  recoverAdjacentHeadingPriceHtmlItems,
} from "./html-adjacent-heading-price-recovery.js";

describe("adjacent heading-price low-price boundaries", () => {
  it("does not skip an explicit sub-floor price and steal a later card price", () => {
    const items = recoverAdjacentHeadingPriceHtmlItems(`
      <html><body>
        <h2>Extra order</h2>
        <h3>Shrimp chips</h3><p>NOK 55</p>
        <h3>Chillimayonnase</h3><p>NOK 20</p>
        <h3>Ponzosauce</h3><p>NOK 20</p>
        <h3>Kimchee-teriyaki sauce</h3><p>NOK 20</p>
        <h3>Kimchi salad</h3><p>NOK 95</p>
        <h3>Crème brûlée</h3><p>NOK 155</p>
        <h3>Chocolate fondant</h3><p>NOK 165</p>
      </body></html>
    `);

    expect(HTML_ADJACENT_HEADING_PRICE_RECOVERY_VERSION).toBe("heading-price-v9");
    expect(items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Shrimp chips", 5500],
      ["Kimchi salad", 9500],
      ["Crème brûlée", 15500],
      ["Chocolate fondant", 16500],
    ]);
    expect(items.some((item) => item.name === "Chillimayonnase")).toBe(false);
  });
});
