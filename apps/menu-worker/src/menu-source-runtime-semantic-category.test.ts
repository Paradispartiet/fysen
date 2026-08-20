import { describe, expect, it } from "vitest";
import { extractMenuSource } from "./menu-source-runtime.js";

describe("HTML runtime semantic category priority", () => {
  it("keeps one strong food category authoritative over loose UI text and excludes beverages", async () => {
    const html = `
      <html><body>
        <nav>Popular</nav>
        <div data-testid="menu-category-section">
          <div data-testid="menu-category-section-title"><h2>Mains</h2></div>
          <p>Cutlery available</p>
          <div data-testid="menu-product"><span data-testid="menu-product-name">House Sausage</span><span data-testid="menu-product-price">160 NOK</span></div>
          <div data-testid="menu-product"><span data-testid="menu-product-name">Cabbage Stew</span><span data-testid="menu-product-price">160 NOK</span></div>
          <div data-testid="menu-product"><span data-testid="menu-product-name">Cheese Dumplings</span><span data-testid="menu-product-price">249 NOK</span></div>
          <div data-testid="menu-product"><span data-testid="menu-product-name">Meat Dumplings</span><span data-testid="menu-product-price">from 249 NOK</span></div>
        </div>
        <div data-testid="menu-category-section">
          <div data-testid="menu-category-section-title"><h2>Drikke</h2></div>
          <div data-testid="menu-product"><span data-testid="menu-product-name">House Soda</span><span data-testid="menu-product-price">55 NOK</span></div>
          <div data-testid="menu-product"><span data-testid="menu-product-name">Cola Light</span><span data-testid="menu-product-price">55 NOK</span></div>
        </div>
      </body></html>
    `;
    const bodyBytes = new TextEncoder().encode(html);

    const result = await extractMenuSource("html", {
      kind: "content",
      fetchedAt: "2026-08-20T00:00:00.000Z",
      status: 200,
      contentType: "text/html; charset=utf-8",
      body: html,
      bodyBytes,
      rawSha256: "fixture",
      etag: null,
      lastModified: null,
      durationMs: 1,
      robotsAllowed: true,
    });

    expect(result.items.map((item) => [item.sectionName, item.name, item.priceMinor, item.priceKind])).toEqual([
      ["Mains", "House Sausage", 16000, "exact"],
      ["Mains", "Cabbage Stew", 16000, "exact"],
      ["Mains", "Cheese Dumplings", 24900, "exact"],
      ["Mains", "Meat Dumplings", 24900, "from"],
    ]);
    expect(result.items.every((item) => item.confidence === 0.99)).toBe(true);
    expect(result.items.some((item) => item.name === "Cutlery available" || item.name === "House Soda")).toBe(false);
  });
});
