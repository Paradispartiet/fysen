import { describe, expect, it } from "vitest";
import { extractScopedHtmlMenu } from "./html-source-extractor.js";
import { extractMenuSource } from "./menu-source-runtime.js";

function menu(price = 99): string {
  const names = ["Nigiri Salmon", "Nigiri Tuna", "Nigiri Hamachi", "California Maki", "Lobster Futomaki", "Stekte Nudler"];
  return `<html><body><script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org", "@type": "Menu",
    hasMenuItem: names.slice(0, 3).map((name) => ({
      "@type": "MenuItem", name,
      offers: { "@type": "Offer", price: 99, priceCurrency: "NOK" },
    })),
  })}</script><section>${names.map((name, index) =>
    `<div class="dish"><div class="dish__left"><div class="dish__name">${name}</div></div><div class="dish__price">${index === 0 ? price : 99}<small>kr</small></div></div>`
  ).join("")}<div class="dish"><div class="dish__name">Proteinvalg</div><div class="dish__price"></div></div>
  <div class="dish"><div class="dish__name">Milk Tea</div><div class="dish__price">69 / 79<small>Liten / Stor</small></div></div></section></body></html>`;
}

describe("partial structured menu recovery", () => {
  it("supplements a small JSON-LD sample only from repeated explicit name-price cards", () => {
    const result = extractScopedHtmlMenu(menu());
    expect(result.items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Nigiri Salmon", 9900], ["Nigiri Tuna", 9900], ["Nigiri Hamachi", 9900],
      ["California Maki", 9900], ["Lobster Futomaki", 9900], ["Stekte Nudler", 9900],
    ]);
  });

  it("keeps the structured result when one sampled dish has a conflicting visible price", () => {
    expect(extractScopedHtmlMenu(menu(109)).items).toHaveLength(3);
  });

  it("does not recover explicitly hidden cards", () => {
    const html = menu().replace('<section>', '<section class="w-condition-invisible">');
    expect(extractScopedHtmlMenu(html).items).toHaveLength(3);
  });

  it("does not supplement when a sampled title has multiple prices in the same card", () => {
    const html = menu().replace('99<small>kr</small>', '99 / 109<small>kr</small>');
    expect(extractScopedHtmlMenu(html).items).toHaveLength(3);
  });

  it("keeps exact card evidence through runtime markup normalization", async () => {
    const html = menu();
    const result = await extractMenuSource("html", {
      kind: "content", status: 200, body: html, bodyBytes: new TextEncoder().encode(html),
      contentType: "text/html", fetchedAt: "2026-10-30T00:00:00Z", rawSha256: "fixture",
      etag: null, lastModified: null, durationMs: 1, robotsAllowed: true,
    });
    expect(result.items).toHaveLength(6);
    expect(result.items.find((item) => item.name === "California Maki")?.priceMinor).toBe(9900);
  });

  it("does not supplement from inline display-none cards", () => {
    const html = menu().replace('<section>', '<section style="display:none">');
    expect(extractScopedHtmlMenu(html).items).toHaveLength(3);
  });
});
