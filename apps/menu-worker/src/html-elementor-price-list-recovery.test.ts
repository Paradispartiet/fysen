import { describe, expect, it } from "vitest";
import {
  HTML_ELEMENTOR_PRICE_LIST_RECOVERY_VERSION,
  recoverElementorPriceListHtmlItems,
} from "./html-elementor-price-list-recovery.js";

function card(title: string, price: string, description = ""): string {
  return `<div class="elementor-price-list-item"><div class="elementor-price-list-header"><span class="elementor-price-list-title">${title}</span><span class="elementor-price-list-price">${price}</span></div><p class="elementor-price-list-description">${description}</p></div>`;
}

describe("Elementor price-list structural recovery", () => {
  it("binds every complete card to its explicit title and price", () => {
    const html = [
      card("KITFO / ክትፎ", "kr349.00", "Raw beef with spices"),
      card("Zilzil Tebsi/ ዝልዝል ጥብሲ", "kr389.00", "Chili nivo / gluten fri"),
      card("Spesialbestiling (to dager før) Dero hel full høne 12 egg Spesialbestilles", "kr2600.00"),
      card("Suppe med linser og pasta", "kr239.00", "Soup with lenses and pasta"),
    ].join("");
    const items = recoverElementorPriceListHtmlItems(html);
    expect(HTML_ELEMENTOR_PRICE_LIST_RECOVERY_VERSION).toBe(
      "elementor-price-list-v1",
    );
    expect(items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["KITFO / ክትፎ", 34900],
      ["Zilzil Tebsi/ ዝልዝል ጥብሲ", 38900],
      [
        "Spesialbestiling (to dager før) Dero hel full høne 12 egg Spesialbestilles",
        260000,
      ],
      ["Suppe med linser og pasta", 23900],
    ]);
    expect(items.every((item) => item.confidence === 0.995)).toBe(true);
  });

  it("fails closed instead of partially preferring an incomplete card family", () => {
    const html = [
      card("Dish one", "100"),
      card("Dish two", "110"),
      card("Dish three", "120"),
      `<div class="elementor-price-list-item"><span class="elementor-price-list-title">Dish four</span></div>`,
    ].join("");
    expect(recoverElementorPriceListHtmlItems(html)).toEqual([]);
  });

  it("fails closed on duplicate titles because section identity is not explicit", () => {
    const html = [
      card("House dish", "100"),
      card("House dish", "110"),
      card("Dish three", "120"),
      card("Dish four", "130"),
    ].join("");
    expect(recoverElementorPriceListHtmlItems(html)).toEqual([]);
  });
});
