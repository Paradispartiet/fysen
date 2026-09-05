import { describe, expect, it } from "vitest";
import {
  HTML_EMBEDDED_MENU_JSON_RECOVERY_VERSION,
  recoverEmbeddedStructuredMenuJson,
} from "./html-embedded-menu-json-recovery.js";

function htmlWithPayload(payload: unknown): string {
  return `<html><body><script type="application/json">${JSON.stringify(payload)}</script></body></html>`;
}

function htmlWithJsonLd(payload: unknown): string {
  return `<html><body><script type="application/ld+json">${JSON.stringify(payload)}</script></body></html>`;
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

  it("recovers Schema.org MenuSection and MenuItem JSON-LD with NOK Offer prices", () => {
    const payload = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: "8 Fish",
      hasMenu: {
        "@type": "Menu",
        hasMenuSection: [
          {
            "@type": "MenuSection",
            name: "Forretter",
            hasMenuItem: [
              {
                "@type": "MenuItem",
                name: "Våruller",
                description: "Kylling og grønnsaker",
                offers: {
                  "@type": "Offer",
                  price: "69.00",
                  priceCurrency: "NOK",
                },
              },
              {
                "@type": "MenuItem",
                name: "Fritert Scampi",
                offers: [{ price: 59, priceCurrency: "NOK" }],
              },
            ],
          },
          {
            "@type": "MenuSection",
            name: "Sushi Mix",
            hasMenuItem: [
              {
                "@type": "MenuItem",
                name: "Sushi Mix 15",
                offers: { price: "225.00", priceCurrency: "NOK" },
              },
              {
                "@type": "MenuItem",
                name: "Sushi Mix 20",
                offers: { price: "325,00", priceCurrency: "NOK" },
              },
            ],
          },
          {
            "@type": "MenuSection",
            name: "Drikke",
            hasMenuItem: [
              {
                "@type": "MenuItem",
                name: "Pepsi Max",
                offers: { price: "45.00", priceCurrency: "NOK" },
              },
            ],
          },
        ],
      },
    };

    const items = recoverEmbeddedStructuredMenuJson(htmlWithJsonLd(payload));

    expect(items.map((item) => [item.sectionName, item.name, item.priceMinor])).toEqual([
      ["Forretter", "Våruller", 6900],
      ["Forretter", "Fritert Scampi", 5900],
      ["Sushi Mix", "Sushi Mix 15", 22500],
      ["Sushi Mix", "Sushi Mix 20", 32500],
    ]);
  });

  it("fails closed when Schema.org offers are not NOK or do not contain plausible prices", () => {
    const payload = {
      "@type": "Menu",
      hasMenuSection: [
        {
          name: "Mains",
          hasMenuItem: [
            { "@type": "MenuItem", name: "A", offers: { price: "19.00", priceCurrency: "NOK" } },
            { "@type": "MenuItem", name: "B", offers: { price: "199.00", priceCurrency: "EUR" } },
            { "@type": "MenuItem", name: "C", offers: { price: "bad", priceCurrency: "NOK" } },
            { "@type": "MenuItem", name: "D", offers: { price: "0", priceCurrency: "NOK" } },
          ],
        },
      ],
    };

    expect(recoverEmbeddedStructuredMenuJson(htmlWithJsonLd(payload))).toEqual([]);
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

  it("fails closed for major-unit or implausibly low legacy prices", () => {
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
