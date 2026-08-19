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

    expect(HTML_ADJACENT_HEADING_PRICE_RECOVERY_VERSION).toBe("heading-price-v1");
    expect(items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Doro Wet", 29000],
      ["Key Wet", 28000],
      ["Shiro w/salad", 26500],
      ["Shiro, Meser", 29000],
      ["Salad w/tuna", 16500],
    ]);
    expect(items.some((item) => item.name.startsWith("Phone:"))).toBe(false);
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
