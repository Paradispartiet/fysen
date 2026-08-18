import { describe, expect, it } from "vitest";
import { extractScopedHtmlMenu, HTML_SOURCE_EXTRACTOR_VERSION } from "./html-source-extractor.js";

describe("extractScopedHtmlMenu", () => {
  it("excludes a beverage section and resumes at the next sibling food heading", () => {
    const html = `
      <html><body>
        <h2>Meze</h2>
        <p>Falafel</p>
        <p>98 kr</p>
        <h2>Vinkart</h2>
        <h3>Rødvin</h3>
        <p>Husets Cabernet</p>
        <p>159 kr</p>
        <h2>Dessert</h2>
        <p>Bakalawa</p>
        <p>129 kr</p>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    expect(HTML_SOURCE_EXTRACTOR_VERSION).toBe("html-v6");
    expect(result.items.map((item) => item.name)).toEqual(["Falafel", "Bakalawa"]);
    expect(result.items.map((item) => item.priceMinor)).toEqual([9800, 12900]);
    expect(result.visibleText).not.toContain("Husets Cabernet");
  });

  it("recovers repeated title-description-price cards without making descriptions searchable dish names", () => {
    const html = `
      <html><body>
        <h2>Meet the dishes</h2>
        <div><h3>Creamy Chick-N Bowl 蒜香奶油鸡面</h3><p>Ramen with creamy garlic pork broth and BBQ chicken. 195,-</p></div>
        <div><h3>Tender Short Ribs 招牌牛肋油泼面</h3><p>Homemade wide flat noodle with slow-cooked beef ribs and chilli oil. 249,-</p></div>
        <div><h3>Beijing ChaCha 牛肉炸酱面</h3><p>Homemade wide flat noodle with spiced minced beef and soybean paste. 149,-</p></div>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    expect(result.items.map((item) => item.name)).toEqual([
      "Creamy Chick-N Bowl 蒜香奶油鸡面",
      "Tender Short Ribs 招牌牛肋油泼面",
      "Beijing ChaCha 牛肉炸酱面",
    ]);
    expect(result.items.map((item) => item.priceMinor)).toEqual([19500, 24900, 14900]);
    expect(result.items[0]?.description).toContain("Ramen with creamy garlic pork broth");
    expect(result.items.some((item) => item.name.startsWith("Ramen with"))).toBe(false);
  });

  it("does not promote a one-off section label when a normal inline dish follows it", () => {
    const html = `
      <html><body>
        <h2>PASTA</h2>
        <p>Slow-cooked beef and tomato pasta 249,-</p>
        <p>Carbonara 229,-</p>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    expect(result.items.map((item) => item.name)).toEqual(["Slow-cooked beef and tomato pasta", "Carbonara"]);
  });

  it("keeps nested drink headings blocked beneath a drinks-menu heading", () => {
    const html = `
      <html><body>
        <h2>Mat</h2>
        <p>Kibbeh</p>
        <p>139 kr</p>
        <h2>Drikkemeny</h2>
        <h3>Cocktails</h3>
        <p>Dry Martini</p>
        <p>169 kr</p>
        <h3>Cognac</h3>
        <p>House Cognac</p>
        <p>189 kr</p>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    expect(result.items.map((item) => item.name)).toEqual(["Kibbeh"]);
    expect(result.visibleText).not.toContain("Dry Martini");
    expect(result.visibleText).not.toContain("House Cognac");
  });

  it("filters obvious coffee and tea beverages that appear inside a food package", () => {
    const html = `
      <html><body>
        <h2>Kjøkkensjefens menyer</h2>
        <p>Falafel 98 kr</p>
        <p>Arabisk kaffe med kardemomme</p>
        <p>659 kr</p>
        <p>Te 45 kr</p>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    expect(result.items.some((item) => item.name === "Falafel")).toBe(true);
    expect(result.items.some((item) => /kaffe|^te$/iu.test(item.name))).toBe(false);
  });

  it("preserves structured MenuItem JSON-LD as the authoritative extraction method", () => {
    const html = `
      <html><body>
        <script type="application/ld+json">
          {"@context":"https://schema.org","@type":"MenuItem","name":"Hommus","offers":{"@type":"Offer","price":"98","priceCurrency":"NOK"}}
        </script>
        <h2>Drikkemeny</h2>
        <p>Dry Martini</p><p>169 kr</p>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    expect(result.method).toBe("json_ld");
    expect(result.items.map((item) => item.name)).toEqual(["Hommus"]);
  });
});
