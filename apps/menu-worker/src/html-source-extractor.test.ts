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
    expect(HTML_SOURCE_EXTRACTOR_VERSION).toBe("html-v19");
    expect(result.items.map((item) => item.name)).toEqual(["Falafel", "Bakalawa"]);
    expect(result.items.map((item) => item.priceMinor)).toEqual([9800, 12900]);
    expect(result.visibleText).not.toContain("Husets Cabernet");
  });

  it("blocks compound wine and other-drinks sections while allowing a later food section", () => {
    const html = `
      <html><body>
        <h2>Hovedretter</h2>
        <p>Slakterburger 220 kr</p>
        <h2>VIN & MUSSERENDE</h2>
        <p>Chinon les terrasses Pascal Lambert 2023</p>
        <p>Flaske 880 kr</p>
        <h2>ANDRE DRIKKER</h2>
        <p>Guinness Draught 90 kr</p>
        <h2>Dessert</h2>
        <p>Churros 129 kr</p>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    expect(result.items.map((item) => item.name)).toEqual(["Slakterburger", "Churros"]);
    expect(result.visibleText).not.toContain("Chinon les terrasses");
    expect(result.visibleText).not.toContain("Guinness Draught");
  });

  it("does not confuse a similarly worded food heading with a beverage section", () => {
    const html = `
      <html><body>
        <h2>Andre retter</h2>
        <p>Ungarsk gulasj 240 kr</p>
        <p>Slakterburger 220 kr</p>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    expect(result.items.map((item) => item.name)).toEqual(["Ungarsk gulasj", "Slakterburger"]);
  });

  it("skips plain food-section labels before the first standalone-price dish in a section", () => {
    const html = `
      <html><body>
        <p>Forretter</p>
        <p>Golden rolls</p>
        <p>Sprøstekte vietnamesiske vårruller med salat og urter.</p>
        <p>84,-</p>
        <p>Green rolls</p>
        <p>Ferske vietnamesiske vårruller med urter og grønnsaker.</p>
        <p>94,-</p>
        <p>Hovedretter</p>
        <p>Confusion Duck</p>
        <p>Sprøstekt and servert med wokede grønnsaker.</p>
        <p>214,-</p>
        <p>Desserter</p>
        <p>Dagens Dessert</p>
        <p>Spør oss om dagens dessert.</p>
        <p>99,-</p>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    expect(result.items.map((item) => item.name)).toEqual([
      "Golden rolls",
      "Green rolls",
      "Confusion Duck",
      "Dagens Dessert",
    ]);
    expect(result.items.map((item) => item.priceMinor)).toEqual([8400, 9400, 21400, 9900]);
    expect(result.items.some((item) => /^(?:Forretter|Hovedretter|Desserter)$/u.test(item.name))).toBe(false);
  });

  it("extracts repeated standalone-price blocks from the earliest plausible title inside each block", () => {
    const html = `
      <html><body>
        <h2>Forretter</h2>
        <p>Golden rolls</p>
        <p>Sprøstekte vietnamesiske vårruller med salat og urter.</p>
        <p>84,-</p>
        <p>Green rolls</p>
        <p>Ferske vietnamesiske vårruller med urter og grønnsaker.</p>
        <p>Servert med vår egen peanøttsaus.</p>
        <p>94,-</p>
        <h2>Hovedretter</h2>
        <p>Confusion Duck</p>
        <p>Sprøstekt and servert med wokede grønnsaker.</p>
        <p>Husets saus serveres ved siden av.</p>
        <p>214,-</p>
        <h2>Sushiruller</h2>
        <p>Mrs. Fish</p>
        <p>Fritert scampi og agurk toppet med laks.</p>
        <p>Serveres med husets saus.</p>
        <p>164,-</p>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    expect(result.items.map((item) => item.name)).toEqual([
      "Golden rolls",
      "Green rolls",
      "Confusion Duck",
      "Mrs. Fish",
    ]);
    expect(result.items.map((item) => item.priceMinor)).toEqual([8400, 9400, 21400, 16400]);
    expect(result.items[1]?.description).toContain("peanøttsaus");
    expect(result.items.some((item) => /^(?:Forretter|Hovedretter|Sushiruller)$/u.test(item.name))).toBe(false);
  });

  it("recovers a unique dish heading when a strong description anchors a standalone price block", () => {
    const html = `
      <html><body>
        <h2>Hovedretter</h2>
        <h3>Smoked Duck</h3>
        <p>Sprøstekt and servert med wokede grønnsaker og husets fyldige saus.</p>
        <p>214,-</p>
        <p>Ginger Beef</p>
        <p>Woket oksekjøtt med ingefær, vårløk og grønnsaker.</p>
        <p>229,-</p>
        <p>Lemongrass Chicken</p>
        <p>Kylling med sitrongress, chili, urter og friske grønnsaker.</p>
        <p>199,-</p>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    expect(result.items.map((item) => item.name)).toEqual(["Smoked Duck", "Ginger Beef", "Lemongrass Chicken"]);
    expect(result.items.map((item) => item.priceMinor)).toEqual([21400, 22900, 19900]);
  });

  it("does not promote a unique section heading when the following title is not a strong description", () => {
    const html = `
      <html><body>
        <h2>CHEF SPECIALS</h2>
        <p>Slow Braised Beef Noodles</p>
        <p>249,-</p>
        <p>Charred Chicken</p>
        <p>Grillet kylling med urter, lime og grønnsaker.</p>
        <p>229,-</p>
        <p>Garden Curry</p>
        <p>Grønnsakscurry med kokosmelk, chili og friske urter.</p>
        <p>209,-</p>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    expect(result.items.map((item) => item.name)).toEqual(["Slow Braised Beef Noodles", "Charred Chicken", "Garden Curry"]);
    expect(result.items.map((item) => item.priceMinor)).toEqual([24900, 22900, 20900]);
    expect(result.items.some((item) => item.name === "CHEF SPECIALS")).toBe(false);
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

  it("preserves an explicit leading quantity unit instead of treating it as a menu index", () => {
    const html = `
      <html><body>
        <h2>BURGERS</h2>
        <p>90 GRAM HAMBURGER</p>
        <p>For kids and smaller appetites.</p>
        <p>139 kr</p>
        <p>1 Satay</p>
        <p>Chicken satay with peanut sauce.</p>
        <p>125 kr</p>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    expect(result.items.map((item) => item.name)).toEqual([
      "90 GRAM HAMBURGER",
      "Satay",
    ]);
    expect(result.items.map((item) => item.priceMinor)).toEqual([13900, 12500]);
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
  it("prefers a plausible long first dish title over its repeated section heading", () => {
    const html = `
      <html><body>
        <h2>DUMPLINGS</h2>
        <p>Pork Gyoza with Japanese ketchup (4 pcs)</p>
        <p>195,-</p>
        <p>Chicken Gyoza with Truffle Tosazu (4 pcs)</p>
        <p>195,-</p>
        <h2>PROTEINS</h2>
        <p>Grilled Chicken Yakiniku with Goma Cabbage salad</p>
        <p>245,-</p>
        <p>Grilled Seabass with chili garlic sauce</p>
        <p>275,-</p>
      </body></html>
    `;
    expect(extractScopedHtmlMenu(html).items.map((entry) => entry.name)).toEqual([
      "Pork Gyoza with Japanese ketchup",
      "Chicken Gyoza with Truffle Tosazu",
      "Grilled Chicken Yakiniku with Goma Cabbage salad",
      "Grilled Seabass with chili garlic sauce",
    ]);
  });

  it("does not treat a section intro as the dish when another title remains before price", () => {
    const html = `
      <html><body>
        <h2>Pizza</h2>
        <p>Rykende fersk italiensk pizza fra steinovnen</p>
        <p>Diavola</p>
        <p>Tomatsaus, ost, ventricina, oliven, rødløk, ruccola, chili</p>
        <p>259,-</p>
        <p>Wanna Beef?</p>
        <p>Tomatsaus, ost, biff, rødløk, sjampinjong, aioli</p>
        <p>269,-</p>
        <p>Don't chicken out</p>
        <p>Tomatsaus, ost, kylling, chili, løk og paprika</p>
        <p>249,-</p>
      </body></html>
    `;
    const result = extractScopedHtmlMenu(html);
    expect(result.items.some((entry) => entry.name === "Rykende fersk italiensk pizza fra steinovnen")).toBe(false);
  });

});
