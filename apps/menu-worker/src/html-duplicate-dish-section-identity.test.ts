import { describe, expect, it } from "vitest";
import { extractScopedHtmlMenu } from "./html-source-extractor.js";

describe("duplicate dish names across semantic menu sections", () => {
  it("keeps both prices when the same dish label appears in different sections", () => {
    const html = `
      <html><body>
        <h2>Salater & Suppe og Fiskeretter</h2>
        <h3>Salater & Suppe</h3>
        <p>Friskt, lett og smakfullt – perfekt som forrett eller et enkelt måltid i seg selv.</p>
        <p>Fatouche</p>
        <p>kr 179</p>
        <p>Blandet salat med fritert libanesisk brød</p>
        <p>Allergener: Hvetegluten</p>
        <p>Chorbet Ades</p>
        <p>kr 149</p>
        <p>Linsesuppe med hvitløk og tomater.</p>
        <h2>Kjøttretter</h2>
        <h3>Kylling</h3>
        <p>Mørt og marinert – klassiske kyllingretter med autentiske krydder og tilbehør.</p>
        <p>Fatouche</p>
        <p>kr 349</p>
        <p>Grillspyd av kylling servert med sesongens grønnsaker og bulgur</p>
        <p>Allergener: Hvetegluten, laktose</p>
        <p>Kos Kos Kylling</p>
        <p>kr 349</p>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    const extracted = result.items.map((item) => ({
      name: item.name,
      priceMinor: item.priceMinor,
      sectionName: item.sectionName,
    }));

    expect(extracted).toEqual([
      { name: "Fatouche", priceMinor: 17900, sectionName: "Salater & Suppe" },
      { name: "Chorbet Ades", priceMinor: 14900, sectionName: "Salater & Suppe" },
      { name: "Fatouche", priceMinor: 34900, sectionName: "Kylling" },
      { name: "Kos Kos Kylling", priceMinor: 34900, sectionName: "Kylling" },
    ]);
    expect(new Set(result.items.map((item) => item.sourceKey)).size).toBe(result.items.length);
  });
});
