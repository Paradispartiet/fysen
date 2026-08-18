import { describe, expect, it } from "vitest";
import { extractHtmlMenu } from "./html-extractor.js";

describe("standalone price block title selection", () => {
  it("keeps the earliest dish title, strips short allergen codes and does not dedupe equal descriptions", () => {
    const html = `
      <html><body>
        <p>TAKE AWAY</p>
        <h2>MENY</h2>
        <p>Småretter og forretter</p>
        <p>Varmretter</p>
        <h5>Kyllingburger (G+L)</h5>
        <p>Pommes frites, dressing</p>
        <p>198,-</p>
        <h5>BaconBurger (G+L)</h5>
        <p>Hjemmelaget burger. Poteter, salat, ost</p>
        <p>198,-</p>
        <h5>CheeseBurger (G+L)</h5>
        <p>Hjemmelaget burger. Poteter, salat, ost</p>
        <p>198,-</p>
        <p>Salatene serveres med baguette, smør og dressing</p>
        <h2>Barnemeny</h2>
        <h5>PØLSE</h5>
        <p>89,-</p>
        <h2>Mexikanske retter</h2>
        <h5>Nachos (L)</h5>
        <p>Krydret kjøttdeig, nacho chips, gratinert ost, salsa, rømme</p>
        <p>169,-</p>
      </body></html>
    `;

    const result = extractHtmlMenu(html);

    expect(result.items.map((item) => item.name)).toEqual([
      "Kyllingburger",
      "BaconBurger",
      "CheeseBurger",
      "PØLSE",
      "Nachos",
    ]);
    expect(result.items.map((item) => item.priceMinor)).toEqual([19800, 19800, 19800, 8900, 16900]);
    expect(result.items[1]?.description).toContain("Hjemmelaget burger");
    expect(result.items[2]?.description).toContain("Hjemmelaget burger");
  });

  it("skips long med/with descriptions while preserving shorter dish titles that contain med", () => {
    const html = `
      <html><body>
        <h5>Stekt Laks – Glutenfri</h5>
        <p>Fersk laks med ovnsstekte rotgrønnsaker og marinerte poteter</p>
        <p>219,-</p>
        <h5>Fløtegratinert kyllingbryst med eller uten skinke</h5>
        <p>Fløtesaus med champignon, serveres med ovnstekte amandinepoteter og salat</p>
        <p>249,-</p>
      </body></html>
    `;

    const result = extractHtmlMenu(html);

    expect(result.items.map((item) => item.name)).toEqual([
      "Stekt Laks – Glutenfri",
      "Fløtegratinert kyllingbryst med eller uten skinke",
    ]);
    expect(result.items.map((item) => item.priceMinor)).toEqual([21900, 24900]);
    expect(result.items[0]?.description).toContain("Fersk laks med ovnsstekte rotgrønnsaker");
  });
});
