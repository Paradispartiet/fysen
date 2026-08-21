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

    expect(HTML_CATEGORY_CARD_RECOVERY_VERSION).toBe("category-cards-v4");
    expect(items.map((item) => [item.sectionName, item.name, item.priceMinor, item.priceKind])).toEqual([
      ["Forretter", "House Bread", 9900, "from"],
      ["Forretter", "Aubergine Salad", 27900, "from"],
      ["Hovedretter", "Vegetable Plov", 34900, "from"],
      ["Hovedretter", "Sharing Menu Four", 239600, "from"],
    ]);
    expect(items[0]?.description).toBe("Fresh bread.");
    expect(items.some((item) => item.name === "House Soda" || item.name === "Ayran")).toBe(false);
  });

  it("accepts one strong food category when an explicit beverage category provides the section boundary", () => {
    const items = recoverSemanticCategoryCardHtmlItems(`
      <html><body>
        <div data-testid="menu-category-section">
          <div data-testid="menu-category-section-title"><h2>Mains</h2></div>
          <p>Cutlery available</p>
          <div data-testid="menu-product"><span data-testid="menu-product-name">House Sausage</span><span data-testid="menu-product-price">160 NOK</span></div>
          <div data-testid="menu-product"><span data-testid="menu-product-name">Cabbage Stew</span><span data-testid="menu-product-price">160 NOK</span></div>
          <div data-testid="menu-product"><span data-testid="menu-product-name">Cheese Dumplings</span><span data-testid="menu-product-price">249 NOK</span></div>
          <div data-testid="menu-product"><span data-testid="menu-product-name">Meat Dumplings</span><span data-testid="menu-product-price">249 NOK</span></div>
        </div>
        <div data-testid="menu-category-section">
          <div data-testid="menu-category-section-title"><h2>Drikke</h2></div>
          <div data-testid="menu-product"><span data-testid="menu-product-name">House Soda</span><span data-testid="menu-product-price">55 NOK</span></div>
        </div>
      </body></html>
    `);

    expect(items.map((item) => [item.sectionName, item.name, item.priceMinor])).toEqual([
      ["Mains", "House Sausage", 16000],
      ["Mains", "Cabbage Stew", 16000],
      ["Mains", "Cheese Dumplings", 24900],
      ["Mains", "Meat Dumplings", 24900],
    ]);
    expect(items.some((item) => item.name === "Cutlery available" || item.name === "House Soda")).toBe(false);
  });

  it("uses the current semantic price while ignoring an explicitly marked before-discount price", () => {
    const items = recoverSemanticCategoryCardHtmlItems(`
      <html><body>
        <div data-testid="menu-category-section">
          <div data-testid="menu-category-section-title"><h2>Bulgogi bowl</h2></div>
          <div data-testid="menu-product">
            <span data-testid="menu-product-name">Beef Bulgogi Bowl</span>
            <p data-testid="menu-product-price">fra 199,20 NOK<span data-testid="menu-product-price-before-discount">249 NOK</span></p>
          </div>
          <div data-testid="menu-product"><span data-testid="menu-product-name">Spicy Pork Bulgogi Bowl</span><span data-testid="menu-product-price">239 NOK</span></div>
          <div data-testid="menu-product"><span data-testid="menu-product-name">Chicken Bowl</span><span data-testid="menu-product-price">229 NOK</span></div>
          <div data-testid="menu-product"><span data-testid="menu-product-name">Vegan Bowl</span><span data-testid="menu-product-price">219 NOK</span></div>
        </div>
        <div data-testid="menu-category-section">
          <div data-testid="menu-category-section-title"><h2>Mineralvann</h2></div>
          <div data-testid="menu-product"><span data-testid="menu-product-name">House Soda</span><span data-testid="menu-product-price">49 NOK</span></div>
        </div>
      </body></html>
    `);

    expect(items.map((item) => [item.name, item.priceMinor, item.priceKind])).toEqual([
      ["Beef Bulgogi Bowl", 19920, "from"],
      ["Spicy Pork Bulgogi Bowl", 23900, "exact"],
      ["Chicken Bowl", 22900, "exact"],
      ["Vegan Bowl", 21900, "exact"],
    ]);
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

  it("still requires independent category evidence for a single food section", () => {
    expect(
      recoverSemanticCategoryCardHtmlItems(`
        <html><body>
          <div data-testid="menu-category-section">
            <div data-testid="menu-category-section-title"><h2>Mains</h2></div>
            <div data-testid="menu-product"><span data-testid="menu-product-name">Dish One</span><span data-testid="menu-product-price">199 NOK</span></div>
            <div data-testid="menu-product"><span data-testid="menu-product-name">Dish Two</span><span data-testid="menu-product-price">209 NOK</span></div>
            <div data-testid="menu-product"><span data-testid="menu-product-name">Dish Three</span><span data-testid="menu-product-price">219 NOK</span></div>
            <div data-testid="menu-product"><span data-testid="menu-product-name">Dish Four</span><span data-testid="menu-product-price">229 NOK</span></div>
          </div>
          <div data-testid="menu-category-section">
            <div data-testid="menu-category-section-title"><h2>Information</h2></div>
          </div>
        </body></html>
      `),
    ).toEqual([]);
  });
});