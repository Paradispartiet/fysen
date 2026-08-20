import { describe, expect, it } from "vitest";
import {
  HTML_TRAILING_PRICE_CARD_RECOVERY_VERSION,
  isStrongNumberedTrailingPriceCardRecovery,
  recoverTrailingPriceCardHtmlItems,
} from "./html-trailing-price-card-recovery.js";

describe("trailing-price HTML card recovery", () => {
  it("recovers repeated title-description cards when the marked price is glued to metadata", () => {
    const items = recoverTrailingPriceCardHtmlItems(`
      <html><body>
        <div>Menu</div>
        <div>Dish One</div><div>Marinert kjøtt og urter.</div><div>Allergener: melk, hvete199 kr</div>
        <div>Dish Two</div><div>Grillet kylling med salat.</div><div>(Allergener: gluten, melk)209 kr</div>
        <div>Dish Three</div><div>Serveres med ris.</div><div>219 kr</div>
        <div>Dish Four</div><div>Bakt aubergine med yoghurt.</div><div>Allergener: melk229 kr</div>
        <div>Dish Five</div><div>Marinert lam med chili.</div><div>fra 239 kr</div>
      </body></html>
    `);

    expect(HTML_TRAILING_PRICE_CARD_RECOVERY_VERSION).toBe("trailing-price-card-v7");
    expect(items.map((item) => [item.name, item.priceMinor, item.priceKind])).toEqual([
      ["Dish One", 19900, "exact"],
      ["Dish Two", 20900, "exact"],
      ["Dish Three", 21900, "exact"],
      ["Dish Four", 22900, "exact"],
      ["Dish Five", 23900, "from"],
    ]);
    expect(items[0]?.description).toContain("Allergener: melk, hvete");
  });

  it("prefers semantic category cards so a beverage section cannot leak back into the menu", () => {
    const items = recoverTrailingPriceCardHtmlItems(`
      <html><body>
        <div data-testid="menu-category-section">
          <div data-testid="menu-category-section-title"><h2>Forretter</h2></div>
          <div data-testid="menu-product"><span data-testid="menu-product-name">Falafel</span><span data-testid="menu-product-price">99 NOK</span></div>
          <div data-testid="menu-product"><span data-testid="menu-product-name">Hummus</span><span data-testid="menu-product-price">109 NOK</span></div>
        </div>
        <div data-testid="menu-category-section">
          <div data-testid="menu-category-section-title"><h2>Hovedretter</h2></div>
          <div data-testid="menu-product"><span data-testid="menu-product-name">Lamb Rice</span><span data-testid="menu-product-price">from 299 NOK</span></div>
          <div data-testid="menu-product"><span data-testid="menu-product-name">Chicken Rice</span><span data-testid="menu-product-price">279 NOK</span></div>
        </div>
        <div data-testid="menu-category-section">
          <div data-testid="menu-category-section-title"><h2>Drikke</h2></div>
          <div data-testid="menu-product"><span data-testid="menu-product-name">House Soda</span><span data-testid="menu-product-price">55 NOK</span></div>
          <div data-testid="menu-product"><span data-testid="menu-product-name">Ayran</span><span data-testid="menu-product-price">55 NOK</span></div>
        </div>
      </body></html>
    `);

    expect(items.map((item) => [item.sectionName, item.name, item.priceKind])).toEqual([
      ["Forretter", "Falafel", "exact"],
      ["Forretter", "Hummus", "exact"],
      ["Hovedretter", "Lamb Rice", "from"],
      ["Hovedretter", "Chicken Rice", "exact"],
    ]);
  });

  it("fails closed on ambiguous multi-price metadata while preserving neighboring cards", () => {
    const items = recoverTrailingPriceCardHtmlItems(`
      <html><body>
        <div>Dish One</div><div>Beskrivelse.</div><div>199 kr</div>
        <div>Ambiguous Dish</div><div>Valg 199 kr 249 kr</div>
        <div>Dish Two</div><div>Beskrivelse.</div><div>209 kr</div>
        <div>Dish Three</div><div>Beskrivelse.</div><div>219 kr</div>
        <div>Dish Four</div><div>Beskrivelse.</div><div>229 kr</div>
        <div>Dish Five</div><div>Beskrivelse.</div><div>239 kr</div>
      </body></html>
    `);

    expect(items.map((item) => item.name)).toEqual([
      "Dish One",
      "Dish Two",
      "Dish Three",
      "Dish Four",
      "Dish Five",
    ]);
    expect(items.some((item) => item.name === "Ambiguous Dish")).toBe(false);
  });

  it("does not turn navigation, commerce prompts or descriptive prose into dishes", () => {
    const items = recoverTrailingPriceCardHtmlItems(`
      <html><body>
        <div>top of page</div><div>Gift card</div><div>Choose amount</div><div>500 kr</div>
        <div>Dish One</div><div>Marinert kjøtt, løk og urter.</div><div>199 kr</div>
        <div>Dish Two</div><div>Serveres med salat.</div><div>209 kr</div>
        <div>Dish Three</div><div>Grillet kylling med hvitløk.</div><div>219 kr</div>
        <div>Dish Four</div><div>Bakt aubergine med yoghurt.</div><div>229 kr</div>
      </body></html>
    `);

    expect(items.map((item) => item.name)).toEqual(["Dish One", "Dish Two", "Dish Three", "Dish Four"]);
  });

  it("canonicalizes a dense numbered menu and drops unnumbered add-ons and drinks", () => {
    const items = recoverTrailingPriceCardHtmlItems(`
      <html><body>
        <p>1 Satay</p><p>Kylling satay med peanøttsaus 125 kr</p>
        <p>2 Ka Nhom Jeep</p><p>Reker dumplings med soyasaus 115 kr</p>
        <p>3 Gyoza</p><p>Friterte dumplings med grønnsaker 109 kr</p>
        <p>4 Tod Man Plah</p><p>Fiskekaker med søt chilisaus 109 kr</p>
        <p>5 Popie Tod</p><p>Vårruller med grønnsaker og chilisaus 105 kr</p>
        <p>8 Phad Khi Mao</p><p>259 kr</p>
        <p>9 Kwuitiew Gai</p><p>255 kr</p>
        <p>10 Kwuitiew Tom Yum</p><p>249 kr</p>
        <p>11 Kwuitiew Nua</p><p>Stekt oksekjøtt i panang karri med kokosmelk, lange bønner og paprika</p><p>249 kr</p>
        <p>12 Phad Mhi</p><p>Stekte nudler med grønnsaker, egg og soyasaus 259 kr</p>
        <p>Kylling</p><p>60 kr</p>
        <p>Iskaffe</p><p>99 kr</p>
      </body></html>
    `);

    expect(items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Satay", 12500],
      ["Ka Nhom Jeep", 11500],
      ["Gyoza", 10900],
      ["Tod Man Plah", 10900],
      ["Popie Tod", 10500],
      ["Phad Khi Mao", 25900],
      ["Kwuitiew Gai", 25500],
      ["Kwuitiew Tom Yum", 24900],
      ["Kwuitiew Nua", 24900],
      ["Phad Mhi", 25900],
    ]);
    expect(isStrongNumberedTrailingPriceCardRecovery(items)).toBe(true);
  });

  it("uses an inline dish title and honors an explicit a-la-carte scope", () => {
    const items = recoverTrailingPriceCardHtmlItems(`
      <html><body>
        <p>TASTING MENU</p>
        <p>Chef Selection 870,-</p>
        <p>A LA CARTA</p>
        <p>ENTRADAS / APPETIZERS</p>
        <p>Tostada de Callos (from the coast) 230,-</p>
        <p>Fresh scallops / avocado / salsa</p>
        <p>(Skalldyr, Soya, Peanøtter)</p>
        <p>Aguachile de Salmon 220,-</p>
        <p>Fresh salmon / pomegranate / grapefruit</p>
        <p>(Fisk)</p>
        <p>Berenjena con Mole Rosa (chef's inspiration) 210,-</p>
        <p>Pink mole / tempura eggplant / tamarind</p>
        <p>(Hvete, Nøtter)</p>
        <p>Molotes de Platano (Oaxaca) 210,-</p>
        <p>Mashed plantain / beans / fresh cheese</p>
        <p>(Laktose, Hvete)</p>
        <p>Tetela (Oaxaca) 210,-</p>
        <p>Masa / gouda / octopus / shrimp</p>
        <p>(Laktose, Skalldyr)</p>
        <p>BRUNCH</p>
        <p>Huevos Rancheros 240,-</p>
      </body></html>
    `);

    expect(items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Tostada de Callos (from the coast)", 23000],
      ["Aguachile de Salmon", 22000],
      ["Berenjena con Mole Rosa (chef's inspiration)", 21000],
      ["Molotes de Platano (Oaxaca)", 21000],
      ["Tetela (Oaxaca)", 21000],
    ]);
  });

  it("requires a repeated card pattern instead of trusting isolated price-adjacent text", () => {
    const items = recoverTrailingPriceCardHtmlItems(`
      <html><body>
        <div>Special offer</div><div>199 kr</div>
        <div>Chef recommendation</div><div>249 kr</div>
        <div>Opening hours</div><div>Monday to Friday</div>
      </body></html>
    `);

    expect(items).toEqual([]);
  });
});
