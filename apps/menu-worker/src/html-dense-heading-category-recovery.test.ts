import { describe, expect, it } from "vitest";
import { recoverSemanticCategoryCardHtmlItems } from "./html-category-card-recovery.js";
import { extractMenuSource } from "./menu-source-runtime.js";

function pricedFoodCards(start: number, count: number): string {
  return Array.from({ length: count }, (_, offset) => {
    const index = start + offset;
    const number = String(index).padStart(2, "0");
    return `<article><h3>Dish ${number}</h3><p>Creamy sauce garlic coriander blend</p><p>${200 + index} NOK</p></article>`;
  }).join("\n");
}

function denseMenuHtml(): string {
  return `
    <html><body>
      <h2>DRAUGHT BEER</h2>
      <article><h3>House Lager</h3><p>99 NOK</p></article>
      <h2>CURRIES</h2>
      ${pricedFoodCards(1, 12)}
      <h2>GRILL</h2>
      ${pricedFoodCards(13, 12)}
      <h2>MILKSHAKES</h2>
      <article><h3>Vanilla Shake</h3><p>109 NOK</p></article>
    </body></html>
  `;
}

async function extract(html: string) {
  return extractMenuSource("html", {
    kind: "content",
    fetchedAt: "2026-08-21T00:00:00.000Z",
    status: 200,
    contentType: "text/html; charset=utf-8",
    body: html,
    bodyBytes: new TextEncoder().encode(html),
    rawSha256: "dense-heading-fixture",
    etag: null,
    lastModified: null,
    durationMs: 1,
    robotsAllowed: true,
  });
}

describe("dense semantic heading category recovery", () => {
  it("binds a large heading-price menu to real food sections and blocks beverage sections", () => {
    const items = recoverSemanticCategoryCardHtmlItems(denseMenuHtml());

    expect(items).toHaveLength(24);
    expect(items.slice(0, 12).every((item) => item.sectionName === "CURRIES")).toBe(true);
    expect(items.slice(12).every((item) => item.sectionName === "GRILL")).toBe(true);
    expect(items.every((item) => item.confidence === 0.99)).toBe(true);
    expect(items.map((item) => item.name)).not.toContain("House Lager");
    expect(items.map((item) => item.name)).not.toContain("Vanilla Shake");
  });

  it("lets the semantic category path win over nearby description-shaped text in full runtime", async () => {
    const result = await extract(denseMenuHtml());
    const names = result.items.map((item) => item.name);

    expect(names).toHaveLength(24);
    expect(names[0]).toBe("Dish 01");
    expect(names.at(-1)).toBe("Dish 24");
    expect(names).not.toContain("Creamy sauce garlic coriander blend");
    expect(names).not.toContain("House Lager");
    expect(names).not.toContain("Vanilla Shake");
  });

  it("tolerates a small minority of unsectioned priced headings while keeping only section-bound dishes", () => {
    const html = `
      <html><body>
        <h3>Seasonal offer</h3><p>399 NOK</p>
        <h3>Gift card</h3><p>500 NOK</p>
        <h2>CURRIES</h2>
        ${pricedFoodCards(1, 12)}
        <h2>GRILL</h2>
        ${pricedFoodCards(13, 12)}
      </body></html>
    `;
    const items = recoverSemanticCategoryCardHtmlItems(html);

    expect(items).toHaveLength(24);
    expect(items.map((item) => item.name)).not.toContain("Seasonal offer");
    expect(items.map((item) => item.name)).not.toContain("Gift card");
    expect(items.every((item) => item.sectionName !== null)).toBe(true);
  });

  it("does not claim semantic authority when section coverage drops below the quality gate", () => {
    const unsectioned = pricedFoodCards(1, 6);
    const sectioned = pricedFoodCards(7, 20);
    const html = `
      <html><body>
        ${unsectioned}
        <h2>CURRIES</h2>
        ${sectioned}
        <h2>GRILL</h2>
        <h3>Final Dish</h3><p>299 NOK</p>
      </body></html>
    `;

    expect(recoverSemanticCategoryCardHtmlItems(html)).toEqual([]);
  });

  it("does not claim semantic authority for a small generic heading list", () => {
    const html = `
      <html><body>
        <h2>CURRIES</h2>
        ${pricedFoodCards(1, 4)}
        <h2>GRILL</h2>
        ${pricedFoodCards(5, 4)}
      </body></html>
    `;

    expect(recoverSemanticCategoryCardHtmlItems(html)).toEqual([]);
  });
});