import { describe, expect, it } from "vitest";
import { extractHtmlMenu } from "./html-extractor.js";

describe("JSON-LD menu section scoping", () => {
  it("keeps food MenuItems and excludes MenuItems nested under a beverage MenuSection", () => {
    const html = `
      <html><body>
        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "Menu",
            "hasMenuSection": [
              {
                "@type": "MenuSection",
                "name": "Hovedretter",
                "hasMenuItem": [
                  {
                    "@type": "MenuItem",
                    "name": "Manty",
                    "offers": { "@type": "Offer", "price": "299", "priceCurrency": "NOK" }
                  }
                ]
              },
              {
                "@type": "MenuSection",
                "name": "Drikke",
                "hasMenuItem": [
                  {
                    "@type": "MenuItem",
                    "name": "Natakhtari Pære",
                    "description": "Georgisk limonade",
                    "offers": { "@type": "Offer", "price": "64", "priceCurrency": "NOK" }
                  },
                  {
                    "@type": "MenuItem",
                    "name": "Ayran",
                    "offers": { "@type": "Offer", "price": "55", "priceCurrency": "NOK" }
                  }
                ]
              }
            ]
          }
        </script>
      </body></html>
    `;

    const result = extractHtmlMenu(html);
    expect(result.method).toBe("json_ld");
    expect(result.items.map((item) => item.name)).toEqual(["Manty"]);
    expect(result.items[0]?.priceMinor).toBe(29900);
  });

  it("does not discard an unscoped JSON-LD MenuItem solely because its name is unfamiliar", () => {
    const html = `
      <html><body>
        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "MenuItem",
            "name": "Kvass-marinated ribs",
            "offers": { "@type": "Offer", "price": "289", "priceCurrency": "NOK" }
          }
        </script>
      </body></html>
    `;

    expect(extractHtmlMenu(html).items.map((item) => item.name)).toEqual([
      "Kvass-marinated ribs",
    ]);
  });
});
