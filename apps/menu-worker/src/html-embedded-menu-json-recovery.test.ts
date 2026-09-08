import { describe, expect, it } from "vitest";
import {
  HTML_EMBEDDED_MENU_JSON_RECOVERY_VERSION,
  recoverEmbeddedStructuredMenuJson,
} from "./html-embedded-menu-json-recovery.js";

function htmlWithPayload(payload: unknown): string {
  return `<html><body><script type="application/json">${JSON.stringify(payload)}</script></body></html>`;
}

describe("embedded structured menu JSON recovery", () => {
  it("recovers category-bound food items with minor-unit prices and skips popularity and drink categories", () => {
    const payload = {
      page: {
        menu: {
          categories: [
            { name: "Populært", item_ids: ["plov", "manty"] },
            {
              name: "Hovedretter",
              item_ids: ["plov", "manty", "lagman", "kebab"],
            },
            { name: "Drikke", item_ids: ["cola", "ayran"] },
            { name: "Easy Milk Tea", item_ids: ["tea"] },
          ],
          items: [
            {
              id: "plov",
              name: "Usbekisk Plov",
              description: "Ris, gulrot og kjøtt",
              price: 34900,
            },
            {
              id: "manty",
              name: "Manty",
              description: "Dampede dumplings",
              price: 39900,
            },
            { id: "lagman", name: "Lagman", description: "Nudler", price: 39900 },
            {
              id: "kebab",
              name: "Qazon Kebab",
              description: "Grillet kjøtt",
              price: 44900,
            },
            { id: "cola", name: "Coca-Cola", description: "", price: 5900 },
            { id: "ayran", name: "Ayran", description: "", price: 6900 },
            { id: "tea", name: "Signature Milk Tea", description: "", price: 7500 },
          ],
        },
      },
    };

    const items = recoverEmbeddedStructuredMenuJson(htmlWithPayload(payload));

    expect(HTML_EMBEDDED_MENU_JSON_RECOVERY_VERSION).toBe(
      "embedded-menu-json-v3",
    );
    expect(
      items.map((item) => [item.sectionName, item.name, item.priceMinor]),
    ).toEqual([
      ["Hovedretter", "Usbekisk Plov", 34900],
      ["Hovedretter", "Manty", 39900],
      ["Hovedretter", "Lagman", 39900],
      ["Hovedretter", "Qazon Kebab", 44900],
    ]);
    expect(items.every((item) => item.extractionMethod === "api")).toBe(true);
  });

  it("supplements an embedded food menu with high-confidence visible heading cards omitted from the payload", () => {
    const payload = {
      categories: [
        { name: "Nudler & Suppe", item_ids: ["pho", "bun"] },
        { name: "Småretter", item_ids: ["beef", "dragon"] },
      ],
      items: [
        { id: "pho", name: "Phở Special", price: 33900 },
        { id: "bun", name: "Bún Bò Huế", price: 33900 },
        { id: "beef", name: "Bò tái chanh", price: 21500 },
        { id: "dragon", name: "Dragon Ball", price: 18900 },
      ],
    };
    const html = `
      <html><body>
        <script type="application/json">${JSON.stringify(payload)}</script>
        <h2>Nudler & Suppe</h2>
        <h3>Phở Special</h3><p>339 NOK</p>
        <h3>Bún Bò Huế</h3><p>339 NOK</p>
        <h2>Småretter</h2>
        <h3>Bò tái chanh</h3><p>215 NOK</p>
        <h3>Dragon Ball</h3><p>189 NOK</p>
        <h3>Mực Chiên Giòn</h3><p>175 NOK</p>
        <h2>Drikke</h2>
        <h3>Trà Vải</h3><p>75 NOK</p>
      </body></html>
    `;

    const items = recoverEmbeddedStructuredMenuJson(html);

    expect(items.map((item) => [item.name, item.priceMinor])).toContainEqual([
      "Mực Chiên Giòn",
      17500,
    ]);
    expect(items.map((item) => item.name)).not.toContain("Trà Vải");
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

    expect(recoverEmbeddedStructuredMenuJson(htmlWithPayload(payload))).toEqual(
      [],
    );
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

    expect(recoverEmbeddedStructuredMenuJson(htmlWithPayload(payload))).toEqual(
      [],
    );
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
