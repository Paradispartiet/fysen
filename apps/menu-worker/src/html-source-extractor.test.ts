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
    expect(HTML_SOURCE_EXTRACTOR_VERSION).toBe("html-v10");
    expect(result.items.map((item) => item.name)).toEqual(["Falafel", "Bakalawa"]);
    expect(result.items.map((item) => item.priceMinor)).toEqual([9800, 12900]);
    expect(result.visibleText).not.toContain("Husets Cabernet");
  });

  it("normalizes numbered dish cards and removes repeated add-on price blocks", () => {
    const html = `
      <html><body>
        <h2>NOODLES</h2>
        <p>1 Satay</p>
        <p>Chicken satay with peanut sauce</p>
        <p>125 kr</p>
        <p>Ekstra sulten?</p>
        <p>Kylling</p><p>60 kr</p><p>Biff</p><p>80 kr</p><p>Vis mer</p>
        <p>13 Phad Thai Kung</p>
        <p>Fried rice noodles with king prawns, egg and peanuts</p>
        <p>259 kr</p>
        <p>Ekstra sulten?</p>
        <p>Kylling</p><p>60 kr</p><p>Reker</p><p>80 kr</p>
        <p>30 Tom Yum Kung</p>
        <p>Tom yum soup with king prawns, coconut milk and lemongrass</p>
        <p>259 kr</p>
        <footer><p>Rice Bowl since 1972</p></footer>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    expect(result.items.map((item) => item.name)).toEqual(["Satay", "Phad Thai Kung", "Tom Yum Kung"]);
    expect(result.items.map((item) => item.priceMinor)).toEqual([12500, 25900, 25900]);
    expect(result.items.some((item) => /^(?:Kylling|Biff|Reker|Ris)$/u.test(item.name))).toBe(false);
    expect(result.items.some((item) => /Rice Bowl since/iu.test(item.name))).toBe(false);
  });

  it("does not treat an extras label as a block boundary on an unnumbered menu", () => {
    const html = `
      <html><body>
        <h2>Small plates</h2>
        <p>Extras</p>
        <p>Halloumi 89 kr</p>
        <p>Falafel 79 kr</p>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    expect(result.items.map((item) => item.name)).toEqual(["Halloumi", "Falafel"]);
  });

  it("recovers repeated title-description-price cards with inline prices", () => {
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
  });

  it("recovers repeated title-description-standalone-price cards", () => {
    const html = `
      <html><body>
        <h2>Meet the dishes</h2>
        <div><h3>Creamy Chick-N Bowl 蒜香奶油鸡面</h3><p>Ramen with creamy garlic pork broth and BBQ chicken.</p><p>195,-</p></div>
        <div><h3>Tender Short Ribs 招牌牛肋油泼面</h3><p>Homemade wide flat noodle with slow-cooked beef ribs and chilli oil.</p><p>249,-</p></div>
        <div><h3>Beijing ChaCha 牛肉炸酱面</h3><p>Homemade wide flat noodle with spiced minced beef and soybean paste.</p><p>149,-</p></div>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    expect(result.items.map((item) => item.name)).toEqual([
      "Creamy Chick-N Bowl 蒜香奶油鸡面",
      "Tender Short Ribs 招牌牛肋油泼面",
      "Beijing ChaCha 牛肉炸酱面",
    ]);
    expect(result.items.map((item) => item.priceMinor)).toEqual([19500, 24900, 14900]);
    expect(result.items[0]?.description).toBe("Ramen with creamy garlic pork broth and BBQ chicken.");
  });

  it("combines adjacent title lines from different writing systems in repeated cards", () => {
    const html = `
      <html><body>
        <h2>Meet the dishes</h2>
        <div><h3>Creamy Chick-N Bowl</h3><h4>蒜香奶油鸡面</h4><p>Ramen with creamy garlic pork broth and BBQ chicken.</p><p>195,-</p></div>
        <div><h3>Tender Short Ribs</h3><h4>招牌牛肋油泼面🌶</h4><p>Homemade wide flat noodle with slow-cooked beef ribs and chilli oil.</p><p>249,-</p></div>
        <div><h3>Beijing ChaCha</h3><h4>牛肉炸酱面</h4><p>Homemade wide flat noodle with spiced minced beef and soybean paste.</p><p>149,-</p></div>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    expect(result.items.map((item) => item.name)).toEqual([
      "Creamy Chick-N Bowl 蒜香奶油鸡面",
      "Tender Short Ribs 招牌牛肋油泼面🌶",
      "Beijing ChaCha 牛肉炸酱面",
    ]);
    expect(result.items.map((item) => item.priceMinor)).toEqual([19500, 24900, 14900]);
  });

  it("does not combine a section heading with a following title in another script", () => {
    const html = `
      <html><body>
        <h2>NOODLES</h2>
        <div><h3>牛肉面</h3><p>Slow-cooked beef noodle soup with herbs.</p><p>199,-</p></div>
        <div><h3>鸡肉面</h3><p>Chicken noodle soup with herbs and greens.</p><p>189,-</p></div>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    expect(result.items.map((item) => item.name)).toEqual(["牛肉面", "鸡肉面"]);
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
        <p>Iskaffe 99 kr</p>
        <p>Thai Te 99 kr</p>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    expect(result.items.some((item) => item.name === "Falafel")).toBe(true);
    expect(result.items.some((item) => /kaffe|^te$|thai te/iu.test(item.name))).toBe(false);
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
