import { describe, expect, it } from "vitest";
import { extractHtmlMenu } from "./html-extractor.js";

describe("extractHtmlMenu", () => {
  it("prefers structured MenuItem JSON-LD when available", () => {
    const html = `
      <html><body>
        <script type="application/ld+json">
          {"@context":"https://schema.org","@type":"MenuItem","name":"Ramen","description":"Kraft og nudler","offers":{"@type":"Offer","price":"249","priceCurrency":"NOK"}}
        </script>
        <p>Noise 100</p>
      </body></html>
    `;
    const result = extractHtmlMenu(html);
    expect(result.method).toBe("json_ld");
    expect(result.items).toHaveLength(1);
    expect(result.items[0]?.name).toBe("Ramen");
    expect(result.items[0]?.priceMinor).toBe(24900);
  });

  it("extracts price-terminated menu lines without treating opening hours as prices", () => {
    const html = `
      <html><body>
        <p>Dinner Tuesday - Saturday 17.00 - 21.30</p>
        <p>Tartar av okse, steinsopp og kantareller (e,sn,su) 265</p>
        <p>Ricotta dumplings med trøffel 295,-</p>
      </body></html>
    `;
    const result = extractHtmlMenu(html);
    expect(result.method).toBe("html_heuristic");
    expect(result.items.map((item) => item.name)).toEqual(["Tartar av okse", "Ricotta dumplings med trøffel"]);
    expect(result.items.map((item) => item.priceMinor)).toEqual([26500, 29500]);
  });
});
