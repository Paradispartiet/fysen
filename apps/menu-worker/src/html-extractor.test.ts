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

  it("conservatively links standalone prices to nearby dish names", () => {
    const html = `
      <html><body>
        <section>
          <h3>Chicken Ceasar Burger</h3>
          <p>Allergens: wheat, milk, mustard, soy, egg</p>
          <p>259 kr</p>
        </section>
        <section>
          <h3>Beef Cheek Burger - 130g</h3>
          <p>With Chimichurri Sauce, BBQ Sauce, Red Chilli Pickles</p>
          <p>Allergens: wheat, milk, mustard, egg, sesame</p>
          <p>259 kr</p>
        </section>
      </body></html>
    `;
    const result = extractHtmlMenu(html);
    expect(result.method).toBe("html_heuristic");
    expect(result.items.map((item) => item.name)).toEqual(["Chicken Ceasar Burger", "Beef Cheek Burger - 130g"]);
    expect(result.items.map((item) => item.priceMinor)).toEqual([25900, 25900]);
    expect(result.items[1]?.description).toBe("With Chimichurri Sauce, BBQ Sauce, Red Chilli Pickles");
    expect(result.items[0]?.confidence).toBe(0.72);
  });

  it("does not turn standalone prices after non-dish metadata into menu items", () => {
    const html = `
      <html><body>
        <p>Opening Hours</p>
        <p>Tuesday-Friday</p>
        <p>16-22</p>
        <p>Contact</p>
        <p>90226090</p>
      </body></html>
    `;
    expect(extractHtmlMenu(html).items).toEqual([]);
  });
});
