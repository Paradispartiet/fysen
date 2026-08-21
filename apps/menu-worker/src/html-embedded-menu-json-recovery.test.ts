import { describe, expect, it } from "vitest";
import {
  HTML_EMBEDDED_MENU_JSON_RECOVERY_VERSION,
  recoverEmbeddedStructuredMenuJson,
} from "./html-embedded-menu-json-recovery.js";

function htmlWithPayload(payload: unknown): string {
  return `<html><body><script type="application/json">${JSON.stringify(payload)}</script></body></html>`;
}

describe("embedded structured menu JSON recovery", () => {
  it("recovers category-bound food items with minor-unit prices and skips popularity, beverage and auxiliary categories", () => {
    const payload = {
      page: {
        menu: {
          categories: [
            { name: "Populært", item_ids: ["plov", "manty"] },
            { name: "Hovedretter", item_ids: ["plov", "manty", "lagman", "kebab"] },
            { name: "Drikke", item_ids: ["cola", "ayran"] },
            { name: "Cafe", item_ids: ["coffee"] },
            { name: "Iced Tea", item_ids: ["iced-tea"] },
            { name: "Easy Milk Tea", item_ids: ["milk-tea"] },
            { name: "Slushy Tea", item_ids: ["slushy"] },
            { name: "Extra", item_ids: ["rice"] },
          ],
          items: [
            { id: "plov", name: "Usbekisk Plov", description: "Ris, gulrot og kjøtt", price: 34900 },
            { id: "manty", name: "Manty", description: "Dampede dumplings", price: 39900 },
            { id: "lagman", name: "Lagman", description: "Nudler", price: 39900 },
            { id: "kebab", name: "Qazon Kebab", description: "Grillet kjøtt", price: 44900 },
            { id: "cola", name: "Coca-Cola", description: "", price: 5900 },
            { id: "ayran", name: "Ayran", description: "", price: 6900 },
            { id: "coffee", name: "Vietnamese Coffee", description: "", price: 7500 },
            { id: "iced-tea", name: "Peach Tea", description: "", price: 7900 },
            { id: "milk-tea", name: "Taro Milk Tea", description: "", price: 8500 },
            { id: "slushy", name: "Mango Slushy", description: "", price: 8500 },
            { id: "rice", name: "Extra Rice", description: "", price: 3900 },
          ],
        },
      },
    };

    const items = recoverEmbeddedStructuredMenuJson(htmlWithPayload(payload));

    expect(HTML_EMBEDDED_MENU_JSON_RECOVERY_VERSION).toBe("embedded-menu-json-v2");
    expect(items.map((item) => [item.sectionName, item.name, item.priceMinor])).toEqual([
      ["Hovedretter", "Usbekisk Plov", 34900],
      ["Hovedretter", "Manty", 39900],
      ["Hovedretter", "Lagman", 39900],
      ["Hovedretter", "Qazon Kebab", 44900],
    ]);
    expect(items.every((item) => item.extractionMethod === "api")).toBe(true);
  });

  it("fails closed when category bindings do not cover enough items", () => {
    const payload = {
      categories: [
        { name: "Mains", item_ids: ["a"] },
        { name: "Desserts", item_ids: ["b"] },
      ],
      items: [
        { id: "a", name: "Dish A", price: 19900 },
        { id: "b", name: "Dish B", price: 20900 },
        { id: "c", name: "Dish C", price: 21900 },
        { id: "d", name: "Dish D", price: 22900 },
        { id: "e", name: "Dish E", price: 23900 },
      ],
    };

    expect(recoverEmbeddedStructuredMenuJson(htmlWithPayload(payload))).toEqual([]);
  });

  it("fails closed for major-unit or implausibly low prices", () => {
    const payload = {
      categories: [
        { name: "Mains", item_ids: ["a", "b"] },
        { name: "Desserts", item_ids: ["c", "d"] },
      ],
      items: [
        { id: "a", name: "Dish A", price: 199 },
        { id: "b", name: "Dish B", price: 209 },
        { id: "c", name: "Dish C", price: 119 },
        { id: "d", name: "Dish D", price: 129 },
      ],
    };

    expect(recoverEmbeddedStructuredMenuJson(htmlWithPayload(payload))).toEqual([]);
  });

  it("ignores malformed scripts and unrelated JSON state", () => {
    const html = `
      <html><body>
        <script type="application/json">not-json</script>
        <script type="application/json">${JSON.stringify({ categories: [], items: [] })}</script>
      </body></html>
    `;

    expect(recoverEmbeddedStructuredMenuJson(html)).toEqual([]);
  });
});
