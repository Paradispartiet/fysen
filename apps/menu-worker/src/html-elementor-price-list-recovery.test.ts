import { describe, expect, it } from "vitest";
import {
  HTML_ELEMENTOR_PRICE_LIST_RECOVERY_VERSION,
  recoverElementorPriceListHtmlItems,
} from "./html-elementor-price-list-recovery.js";

function card(title: string, price: string, description = ""): string {
  return `<div class="elementor-price-list-item"><div class="elementor-price-list-header"><span class="elementor-price-list-title">${title}</span><span class="elementor-price-list-price">${price}</span></div><p class="elementor-price-list-description">${description}</p></div>`;
}

function headingCard(title: string, price: number): string {
  return `<h4>${title}</h4><p>Canonical dish description</p><h5>Kr. ${price},-</h5>`;
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
      "elementor-price-list-v2",
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

  it("defers a partial Elementor family when the same document exposes a clearly broader heading-price menu", () => {
    const elementorSuffix = [
      card("Dessert one", "139"),
      card("Dessert two", "139"),
      card("Dessert three", "139"),
      card("Dessert four", "145"),
    ].join("");
    const broaderMenu = Array.from({ length: 8 }, (_, index) =>
      headingCard(`Main dish ${index + 1}`, 220 + index),
    ).join("");

    expect(
      recoverElementorPriceListHtmlItems(
        `<html><body>${broaderMenu}${elementorSuffix}</body></html>`,
      ),
    ).toEqual([]);
  });

  it("does not defer a complete Elementor menu merely because a few heading-price cards coexist", () => {
    const elementorMenu = [
      card("Dish one", "100"),
      card("Dish two", "110"),
      card("Dish three", "120"),
      card("Dish four", "130"),
    ].join("");
    const smallHeadingFamily = [
      headingCard("Special one", 210),
      headingCard("Special two", 220),
    ].join("");

    expect(
      recoverElementorPriceListHtmlItems(
        `<html><body>${smallHeadingFamily}${elementorMenu}</body></html>`,
      ).map((item) => item.name),
    ).toEqual(["Dish one", "Dish two", "Dish three", "Dish four"]);
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
