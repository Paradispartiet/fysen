import { describe, expect, it } from "vitest";
import { recoverTrailingPriceCardHtmlItems } from "./html-trailing-price-card-recovery.js";

describe("trailing-price card section identity", () => {
  it("keeps duplicate plain-text dish cards when headings prove distinct sections", () => {
    const items = recoverTrailingPriceCardHtmlItems(`
      <html><body>
        <h2>Salater & Suppe og Fiskeretter</h2>
        <h3>Salater & Suppe</h3>
        <p>Friskt, lett og smakfullt – perfekt som forrett eller et enkelt måltid i seg selv.</p>
        <div>Fatouche</div><div>kr 179</div><p>Blandet salat med fritert libanesisk brød.</p>
        <div>Chorbet Ades</div><div>kr 149</div><p>Linsesuppe med hvitløk og tomater.</p>

        <h3>Fiskeretter</h3>
        <p>Delikate retter fra havet, tilberedt med middelhavskrydder og friske grønnsaker.</p>
        <div>Gambari</div><div>kr 339</div><p>Grillet scampi med sesongens grønnsaker og tabbouleh.</p>

        <h2>Kjøttretter</h2>
        <h3>Kylling</h3>
        <p>Mørt og marinert – klassiske kyllingretter med autentiske krydder og tilbehør.</p>
        <div>Fatouche</div><div>kr 349</div><p>Grillspyd av kylling servert med sesongens grønnsaker og bulgur.</p>
        <div>Kos Kos Kylling</div><div>kr 349</div><p>Marinert kyllingbryst med middelhavskrydder, grønnsaker og bistro-poteter.</p>
      </body></html>
    `);

    const fatouche = items
      .filter((item) => item.name === "Fatouche")
      .map((item) => ({
        priceMinor: item.priceMinor,
        sectionName: item.sectionName,
        sourceKey: item.sourceKey,
      }));

    expect(fatouche).toHaveLength(2);
    expect(fatouche.map(({ priceMinor, sectionName }) => ({ priceMinor, sectionName }))).toEqual([
      { priceMinor: 17900, sectionName: "Salater & Suppe" },
      { priceMinor: 34900, sectionName: "Kylling" },
    ]);
    expect(new Set(fatouche.map((item) => item.sourceKey)).size).toBe(2);

    expect(items.find((item) => item.name === "Chorbet Ades")?.sectionName).toBeNull();
    expect(items.find((item) => item.name === "Gambari")?.sectionName).toBeNull();
    expect(items.find((item) => item.name === "Kos Kos Kylling")?.sectionName).toBeNull();
  });
});
