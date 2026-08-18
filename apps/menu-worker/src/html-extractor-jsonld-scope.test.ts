import { describe, expect, it } from "vitest";
import { extractHtmlMenu, HTML_EXTRACTOR_VERSION } from "./html-extractor.js";

describe("JSON-LD menu scope", () => {
  it("canonicalizes numbered dish names and excludes explicit beverage-category items", () => {
    const html = `
      <html><body>
        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@graph": [
              {"@type":"MenuItem","name":"1. MARGHERITA","offers":{"@type":"Offer","price":"170","priceCurrency":"NOK"}},
              {"@type":"MenuItem","name":"12. CALZONE KYLLING","offers":{"@type":"Offer","price":"169","priceCurrency":"NOK"}},
              {"@type":"MenuItem","name":"BRUS/ MINERALVANN","offers":{"@type":"Offer","price":"39","priceCurrency":"NOK"}},
              {"@type":"MenuItem","name":"Spaghetti Carbonara","offers":{"@type":"Offer","price":"265","priceCurrency":"NOK"}}
            ]
          }
        </script>
      </body></html>
    `;

    const result = extractHtmlMenu(html);
    expect(HTML_EXTRACTOR_VERSION).toBe("html-v5");
    expect(result.method).toBe("json_ld");
    expect(result.items.map((item) => item.name)).toEqual([
      "MARGHERITA",
      "CALZONE KYLLING",
      "Spaghetti Carbonara",
    ]);
    expect(result.items.map((item) => item.priceMinor)).toEqual([17000, 16900, 26500]);
  });

  it("preserves ordinary structured food items", () => {
    const html = `
      <html><body>
        <script type="application/ld+json">
          {"@context":"https://schema.org","@type":"MenuItem","name":"Pho Bo","description":"Risnudler og biff","offers":{"@type":"Offer","price":"189","priceCurrency":"NOK"}}
        </script>
      </body></html>
    `;

    const result = extractHtmlMenu(html);
    expect(result.items).toHaveLength(1);
    expect(result.items[0]?.name).toBe("Pho Bo");
    expect(result.items[0]?.priceMinor).toBe(18900);
    expect(result.items[0]?.extractionMethod).toBe("json_ld");
  });
});
