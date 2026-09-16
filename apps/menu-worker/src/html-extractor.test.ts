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

  it("supports Norwegian kr prefixes, decimal commas, and numbered menu labels without lowering the price floor", () => {
    const html = `
      <html><body>
        <section>
          <h3>1. Crispy Tenders</h3>
          <p>kr 35,00</p>
        </section>
        <section>
          <h3>3. 5 Hot Wings</h3>
          <p>kr 70,00</p>
        </section>
        <section>
          <h3>45. CHICKEN TIKKA</h3>
          <p>kr 219,00</p>
        </section>
        <p>61. PHAD THAI kr 169,00</p>
      </body></html>
    `;

    const result = extractHtmlMenu(html);
    expect(result.items.map((item) => item.name)).toEqual(["5 Hot Wings", "CHICKEN TIKKA", "PHAD THAI"]);
    expect(result.items.map((item) => item.priceMinor)).toEqual([7000, 21900, 16900]);
    expect(result.items.some((item) => item.name === "Crispy Tenders")).toBe(false);
  });

  it("propagates an explicit shared section price to multiple dish headings", () => {
    const html = `
      <html><body>
        <h2>Småretter</h2>
        <p>KIMCHI 95,-</p>
        <p>Vår hjemmelagde kimchi</p>
        <p>Ramen 260,-</p>
        <h3>SHOYU RAMEN</h3>
        <p>Sellerirotsuppe med grønn olje og håndlagde nudler</p>
        <h3>SPICY MISO RAMEN</h3>
        <p>Langtidskokt kylling paitan suppe med chashu</p>
        <h3>KYLLING SHOYU PAITAN RAMEN</h3>
        <p>Shoyu paitan suppe med koji confitert kylling</p>
        <h3>SPICY HASSELNØTT TAN TAN MEN</h3>
        <p>Håndlagede ramennudler i spicy hasselnøttsaus</p>
        <p>*Vegetarisk ramen kan gjøres vegansk uten egget</p>
        <h3>Menyforklaring</h3>
        <p>RAMEN: er en japansk nudelsuppe.</p>
      </body></html>
    `;

    const result = extractHtmlMenu(html);
    const ramenItems = result.items.filter((item) => item.sectionName === "Ramen");
    expect(ramenItems.map((item) => item.name)).toEqual([
      "SHOYU RAMEN",
      "SPICY MISO RAMEN",
      "KYLLING SHOYU PAITAN RAMEN",
      "SPICY HASSELNØTT TAN TAN MEN",
    ]);
    expect(ramenItems.every((item) => item.priceMinor === 26000)).toBe(true);
    expect(ramenItems.every((item) => item.confidence === 0.76)).toBe(true);
    expect(result.items.some((item) => item.name === "Ramen")).toBe(false);
    expect(result.items.find((item) => item.name === "SHOYU RAMEN")?.description).toContain("Sellerirotsuppe");
  });

  it("does not propagate a possible section price without at least two strong child headings", () => {
    const html = `
      <html><body>
        <p>Dagens meny 450,-</p>
        <h3>CHEF'S CHOICE</h3>
        <p>Spør servitøren om dagens servering</p>
        <h3>Kontakt</h3>
      </body></html>
    `;
    const result = extractHtmlMenu(html);
    expect(result.items.some((item) => item.name === "CHEF'S CHOICE")).toBe(false);
    expect(result.items.some((item) => item.sectionName === "Dagens meny")).toBe(false);
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
