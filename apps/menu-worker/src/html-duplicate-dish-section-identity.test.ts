import { describe, expect, it } from "vitest";
import { recoverDescriptionNamedHtmlItems } from "./html-description-title-recovery.js";
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

    const scoped = extractScopedHtmlMenu(html);
    const items = recoverDescriptionNamedHtmlItems(scoped.items, scoped.visibleText);
    const extracted = items.map((item) => ({
      name: item.name,
      priceMinor: item.priceMinor,
      sectionName: item.sectionName,
    }));

    expect(extracted).toEqual([
      { name: "Fatouche", priceMinor: 17900, sectionName: "Salater & Suppe" },
      { name: "Chorbet Ades", priceMinor: 14900, sectionName: null },
      { name: "Fatouche", priceMinor: 34900, sectionName: "Kylling" },
      { name: "Kos Kos Kylling", priceMinor: 34900, sectionName: null },
    ]);
    expect(new Set(items.map((item) => item.sourceKey)).size).toBe(items.length);
  });

  it("preserves already-correct duplicate headings until semantic section identity is applied", () => {
    const html = `
      <html><body>
        <h2>Salater & Suppe</h2>
        <article>
          <h3>Fatouche</h3>
          <p>Blandet salat med fritert libanesisk brød.</p>
          <p>kr 179</p>
        </article>
        <article>
          <h3>Chorbet Ades</h3>
          <p>Linsesuppe med hvitløk og tomater.</p>
          <p>kr 149</p>
        </article>
        <h2>Kylling</h2>
        <article>
          <h3>Fatouche</h3>
          <p>Grillspyd av kylling servert med sesongens grønnsaker og bulgur.</p>
          <p>kr 349</p>
        </article>
        <article>
          <h3>Kos Kos Kylling</h3>
          <p>Grillet kylling med bulgur og grønnsaker.</p>
          <p>kr 349</p>
        </article>
      </body></html>
    `;

    const scoped = extractScopedHtmlMenu(html);
    const extractedBeforeRecovery = scoped.items.map((item) => ({
      name: item.name,
      priceMinor: item.priceMinor,
      sectionName: item.sectionName,
    }));

    expect(extractedBeforeRecovery).toEqual([
      { name: "Fatouche", priceMinor: 17900, sectionName: "Salater & Suppe" },
      { name: "Chorbet Ades", priceMinor: 14900, sectionName: null },
      { name: "Fatouche", priceMinor: 34900, sectionName: "Kylling" },
      { name: "Kos Kos Kylling", priceMinor: 34900, sectionName: null },
    ]);

    const recovered = recoverDescriptionNamedHtmlItems(scoped.items, scoped.visibleText);
    const fatouche = recovered.filter((item) => item.name === "Fatouche");
    expect(fatouche.map((item) => [item.priceMinor, item.sectionName])).toEqual([
      [17900, "Salater & Suppe"],
      [34900, "Kylling"],
    ]);
    expect(new Set(fatouche.map((item) => item.sourceKey)).size).toBe(2);
  });

});
