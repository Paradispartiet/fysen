import { describe, expect, it } from "vitest";
import { extractScopedHtmlMenu } from "./html-source-extractor.js";
import { filterHtmlBeverageSectionItemsWithScopedProvenance } from "./html-text-section-scope.js";

function card(title: string, price: string, description = ""): string {
  return `<div class="elementor-price-list-item"><div class="elementor-price-list-header"><span class="elementor-price-list-title">${title}</span><span class="elementor-price-list-price">${price}</span></div><p class="elementor-price-list-description">${description}</p></div>`;
}

describe("Elementor menu-root regression", () => {
  it("does not let a pre-menu Drinks navigation label poison the food menu", () => {
    const html = `<html><body>
      <nav><a>Menu</a><a>Drinks</a><a>Events</a></nav>
      <h1>MENU</h1><h2>OUR MENU</h2>
      ${card("KITFO / ክትፎ", "kr349.00")}
      ${card("Zilzil Tebsi/ ዝልዝል ጥብሲ", "kr389.00", "Chili nivo / gluten fri")}
      ${card("Spesialbestiling (to dager før) Dero hel full høne 12 egg Spesialbestilles", "kr2600.00", "Linser (rod eller gul) 269kr")}
      ${card("Suppe med linser og pasta", "kr239.00", "Vegan soup with lenser and pasta")}
    </body></html>`;
    const extracted = extractScopedHtmlMenu(html);
    expect(extracted.items.map((item) => item.name)).toEqual([
      "KITFO / ክትፎ",
      "Zilzil Tebsi/ ዝልዝል ጥብሲ",
      "Spesialbestiling (to dager før) Dero hel full høne 12 egg Spesialbestilles",
      "Suppe med linser og pasta",
    ]);
    expect(extracted.items.map((item) => item.priceMinor)).toEqual([
      34900,
      38900,
      260000,
      23900,
    ]);

    const scoped = filterHtmlBeverageSectionItemsWithScopedProvenance(
      extracted.items,
      extracted.visibleText,
      extracted.visibleText,
    );
    expect(scoped.map((item) => item.name)).toEqual(
      extracted.items.map((item) => item.name),
    );
  });
});
