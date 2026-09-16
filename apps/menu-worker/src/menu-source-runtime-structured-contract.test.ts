import { describe, expect, it } from "vitest";
import {
  extractMenuSource,
  isCanonicalHtmlMenuItem,
} from "./menu-source-runtime.js";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";

function item(name: string): MenuObservedItem {
  return {
    sourceKey: createMenuItemSourceKey(name),
    name,
    normalizedName: normalizeDishName(name),
    description: null,
    sectionName: null,
    priceMinor: 4500,
    currency: "NOK",
    position: 0,
    extractionMethod: "html_heuristic",
    confidence: 0.9,
    sourceExcerpt: name,
  };
}

describe("structured menu contract compatibility", () => {
  it("keeps SeMeny JSON-LD contract items without weakening heuristic food filtering", async () => {
    expect(isCanonicalHtmlMenuItem(item("Bestikk"))).toBe(false);
    expect(isCanonicalHtmlMenuItem(item("Urge 0,5l"))).toBe(false);
    expect(isCanonicalHtmlMenuItem(item("Pepsi Max 0,5l"))).toBe(false);
    expect(isCanonicalHtmlMenuItem(item("Imsdal 0,5l"))).toBe(false);

    const html = `
      <html><body>
        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@graph": [
              {"@type":"MenuItem","name":"Pad Thai","offers":{"@type":"Offer","price":"219","priceCurrency":"NOK"}},
              {"@type":"MenuItem","name":"Bestikk","offers":{"@type":"Offer","price":"2","priceCurrency":"NOK"}},
              {"@type":"MenuItem","name":"Urge 0,5l","offers":{"@type":"Offer","price":"55","priceCurrency":"NOK"}},
              {"@type":"MenuItem","name":"Pepsi Max 0,5l","offers":{"@type":"Offer","price":"49","priceCurrency":"NOK"}},
              {"@type":"MenuItem","name":"Imsdal 0,5l","offers":{"@type":"Offer","price":"39","priceCurrency":"NOK"}}
            ]
          }
        </script>
      </body></html>
    `;

    const result = await extractMenuSource("html", {
      kind: "content",
      fetchedAt: "2026-09-16T00:00:00.000Z",
      status: 200,
      contentType: "text/html; charset=utf-8",
      body: html,
      bodyBytes: new TextEncoder().encode(html),
      rawSha256: "fixture",
      etag: null,
      lastModified: null,
      durationMs: 1,
      robotsAllowed: true,
    });

    expect(result.method).toBe("json_ld");
    expect(result.items.map((entry) => [entry.name, entry.priceMinor])).toEqual([
      ["Pad Thai", 21900],
      ["Bestikk", 200],
      ["Urge 0,5l", 5500],
      ["Pepsi Max 0,5l", 4900],
      ["Imsdal 0,5l", 3900],
    ]);
  });
});
