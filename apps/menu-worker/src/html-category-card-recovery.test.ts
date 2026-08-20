import { describe, expect, it } from "vitest";
import {
  HTML_CATEGORY_CARD_RECOVERY_VERSION,
  recoverSemanticCategoryCardHtmlItems,
} from "./html-category-card-recovery.js";

describe("semantic menu category card recovery", () => {
  it("extracts food cards with section identity, prices and descriptions while excluding drinks", () => {
    const items = recoverSemanticCategoryCardHtmlItems(`
      <html><body>
        <div data-testid="menu-category-section">
          <div data-testid="menu-category-section-title"><h2>Forretter</h2></div>
          <ul class="dish-list-grid">
            <li data-testid="menu-product"><h3><span data-testid="menu-product-name">House Bread</span></h3><p data-testid="menu-product-price">from 99 NOK</p><p data-testid="menu-product-description">Fresh bread.</p></li>
            <li data-testid="menu-product"><h3><span data-testid="menu-product-name">Aubergine Salad</span></h3><p data-testid="menu-product-price">from 279 NOK</p></li>
          </ul>
        </div>
        <div data-testid="menu-category-section">
          <div data-testid="menu-category-section-title"><h2>Hovedretter</h2></div>
          <ul class="dish-list-grid">
            <li data-testid="menu-product"><h3><span data-testid="menu-product-name">Vegetable Plov</span></h3><p data-testid="menu-product-price">from 349 NOK</p></li>
            <li data-testid="menu-product"><h3><span data-testid="menu-product-name">Sharing Menu Four</span></h3><p data-testid="menu-product-price">from 2.396 NOK</p></li>
          </ul>
        </div>
        <div data-testid="menu-category-section">
          <div data-testid="menu-category-section-title"><h2>Drikke</h2></div>
          <ul class="dish-list-grid">
            <li data-testid="menu-product"><h3><span data-testid="menu-product-name">House Soda</span></h3><p data-testid="menu-product-price">55 NOK</p></li>
            <li data-testid="menu-product"><h3><span data-testid="menu-product-name">Ayran</span></h3><p data-testid="menu-product-price">55 NOK</p></li>
          </ul>
        </div>
      </body></html>
    `);

    expect(HTML_CATEGORY_CARD_RECOVERY_VERSION).toBe("category-cards-v1");
    expect(items.map((item) => [item.sectionName, item.name, item.priceMinor, item.priceKind])).toEqual([
      ["Forretter", "House Bread", 9900, "from"],
      ["Forretter", "Aubergine Salad", 27900, "from"],
      ["Hovedretter", "Vegetable Plov", 34900, "from"],
      ["Hovedretter", "Sharing Menu Four", 239600, "from"],
    ]);
    expect(items[0]?.description).toBe("Fresh bread.");
    expect(items.some((item) => item.name === "House Soda" || item.name === "Ayran")).toBe(false);
  });

  it("preserves duplicate dish names in different semantic menu sections", () => {
    const items = recoverSemanticCategoryCardHtmlItems(`
      <html><body>
        <div data-testid="menu-category-section">
          <div data-testid="menu-category-section-title"><h2>Lunch</h2></div>
          <div data-testid="menu-product"><span data-testid="menu-product-name">House Special</span><span data-testid="menu-product-price">199 NOK</span></div>
          <div data-testid="menu-product"><span data-testid="menu-product-name">Soup</span><span data-testid="menu-product-price">99 NOK</span></div>
        </div>
        <div data-testid="menu-category-section">
          <div data-testid="menu-category-section-title"><h2>Dinner</h2></div>
          <div data-testid="menu-product"><span data-testid="menu-product-name">House Special</span><span data-testid="menu-product-price">299 NOK</span></div>
          <div data-testid="menu-product"><span data-testid="menu-product-name">Steak</span><span data-testid="menu-product-price">399 NOK</span></div>
        </div>
      </body></html>
    `);

    const specials = items.filter((item) => item.name === "House Special");
    expect(specials).toHaveLength(2);
    expect(specials.map((item) => [item.sectionName, item.priceMinor])).toEqual([
      ["Lunch", 19900],
      ["Dinner", 29900],
    ]);
    expect(specials[0]?.sourceKey).not.toBe(specials[1]?.sourceKey);
  });

  it("fails closed when the semantic card pattern is too small to establish a menu", () => {
    expect(
      recoverSemanticCategoryCardHtmlItems(`
        <html><body>
          <div data-testid="menu-category-section">
            <div data-testid="menu-category-section-title"><h2>Offer</h2></div>
            <div data-testid="menu-product"><span data-testid="menu-product-name">Gift Card</span><span data-testid="menu-product-price">500 NOK</span></div>
          </div>
        </body></html>
      `),
    ).toEqual([]);
  });
});
