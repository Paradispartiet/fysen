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

  it("recovers flat localized menu rows with exact major-unit prices from Next.js JSON state", () => {
    const payload = {
      props: {
        pageProps: {
          page: {
            content: [
              {
                _type: "menu",
                name_no: "Mat",
                content: [
                  {
                    _type: "menuType",
                    name_no: "Ansjostoast",
                    name_en: "Anchovy toast",
                    description_no: "Surdeig, ansjos og urter",
                    price: "179",
                  },
                  {
                    _type: "menuType",
                    name_no: "Røkt makrellrillettes",
                    name_en: "Smoked mackerel rillettes",
                    price: "195,-",
                  },
                  {
                    _type: "menuType",
                    name_no: "Steinsopp",
                    name_en: "Porcini",
                    price: "kr 225",
                  },
                  {
                    _type: "menuType",
                    name_no: "Kylling",
                    name_en: "Chicken",
                    price: 265,
                  },
                  {
                    _type: "menuType",
                    name_en: "Cheese",
                    description_en: "Seasonal cheese",
                    price: "165",
                  },
                  {
                    _type: "social",
                    name_no: "Instagram",
                    price: "199",
                  },
                ],
              },
            ],
          },
        },
      },
    };

    const items = recoverEmbeddedStructuredMenuJson(htmlWithPayload(payload));

    expect(
      items.map((item) => [item.sectionName, item.name, item.priceMinor]),
    ).toEqual([
      ["Mat", "Ansjostoast", 17900],
      ["Mat", "Røkt makrellrillettes", 19500],
      ["Mat", "Steinsopp", 22500],
      ["Mat", "Kylling", 26500],
      ["Mat", "Cheese", 16500],
    ]);
    expect(items.every((item) => item.extractionMethod === "api")).toBe(true);
  });

  it("fails closed for unrelated flat JSON arrays with price-like fields", () => {
    const payload = {
      products: [
        { _type: "article", name: "Article A", price: "199" },
        { _type: "article", name: "Article B", price: "209" },
        { _type: "article", name: "Article C", price: "219" },
        { _type: "article", name: "Article D", price: "229" },
      ],
    };

    expect(recoverEmbeddedStructuredMenuJson(htmlWithPayload(payload))).toEqual(
      [],
    );
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
