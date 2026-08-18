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
    expect(HTML_SOURCE_EXTRACTOR_VERSION).toBe("html-v11");
    expect(result.items.map((item) => item.name)).toEqual(["Falafel", "Bakalawa"]);
    expect(result.items.map((item) => item.priceMinor)).toEqual([9800, 12900]);
    expect(result.visibleText).not.toContain("Husets Cabernet");
  });

  it("recovers repeated heading cards with multiline descriptions and strips trailing allergen codes", () => {
    const html = `
      <html><body>
        <h2>Forretter</h2>
        <div>
          <h3>Green rolls (2,3,5)</h3>
          <p>Ferske vietnamesiske vårruller med urter og grønnsaker.</p>
          <p>Servert med vår egen peanøttsaus.</p>
          <p>94,-</p>
        </div>
        <div>
          <h3>Chicken Satay (2,5)</h3>
          <p>Kyllingspyd marinert på vietnamesisk vis.</p>
          <p>Servert med vår egen peanøttdippsaus.</p>
          <p>129,-</p>
        </div>
        <div>
          <h3>Pho Bo (1,3,6)</h3>
          <p>Vietnamesisk tradisjonell biffsuppe med risnudler.</p>
          <p>Serveres med friske urter og lime.</p>
          <p>189,-</p>
        </div>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    expect(result.items.map((item) => item.name)).toEqual(["Green rolls", "Chicken Satay", "Pho Bo"]);
    expect(result.items.map((item) => item.priceMinor)).toEqual([9400, 12900, 18900]);
    expect(result.items[0]?.description).toContain("Ferske vietnamesiske vårruller");
    expect(result.items[0]?.description).toContain("peanøttsaus");
  });

  it("blocks mineral-water and other beverage sections without leaking soft drinks", () => {
    const html = `
      <html><body>
        <h2>Hovedretter</h2>
        <p>Pho Bo</p><p>Tradisjonell vietnamesisk biffsuppe.</p><p>189 kr</p>
        <p>Shaking Beef</p><p>Indrefilet ristet på vietnamesisk vis.</p><p>234 kr</p>
        <h2>Mineralvann</h2>
        <p>Coca-Cola</p><p>46 kr</p>
        <p>Sprite</p><p>46 kr</p>
        <h2>Cocktails</h2>
        <p>Cuba Libre</p><p>159 kr</p>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    expect(result.items.map((item) => item.name)).toEqual(["Pho Bo", "Shaking Beef"]);
    expect(result.visibleText).not.toContain("Coca-Cola");
    expect(result.visibleText).not.toContain("Cuba Libre");
  });

  it("ends menu scope at terminal allergen/reservation/contact headings after food has been seen", () => {
    const html = `
      <html><body>
        <h2>Mat</h2>
        <p>Golden Wontons 99 kr</p>
        <p>Edamame 69 kr</p>
        <h2>Allergenoversikt</h2>
        <p>1 Gluten 2 Egg 3 Fisk 4 Peanøtter</p>
        <h1>Reservasjoner</h1>
        <p>Reservasjoner for opptil 8 personer.</p>
        <h2>Kontakt oss</h2>
        <p>Telefon: +47 940 89 000</p>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    expect(result.items.map((item) => item.name)).toEqual(["Golden Wontons", "Edamame"]);
    expect(result.visibleText).not.toContain("Allergenoversikt");
    expect(result.visibleText).not.toContain("Reservasjoner for opptil 8 personer");
    expect(result.visibleText).not.toContain("Telefon");
  });

  it("does not let a terminal heading before the menu suppress later food", () => {
    const html = `
      <html><body>
        <h2>Reservasjoner</h2>
        <p>Bestill bord før besøket.</p>
        <h2>Meny</h2>
        <p>Falafel 98 kr</p>
        <p>Bakalawa 129 kr</p>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    expect(result.items.map((item) => item.name)).toEqual(["Falafel", "Bakalawa"]);
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
