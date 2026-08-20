import { describe, expect, it } from "vitest";
import { extractMenuSource } from "./menu-source-runtime.js";

describe("HTML runtime duplicate dish section selection", () => {
  it("keeps both price variants when a preferred recovery sees the same dish in distinct sections", async () => {
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
        <article>
          <h3>Shawarma</h3>
          <p>Marinert kjøtt servert med grønnsaker og bulgur.</p>
          <p>kr 339</p>
        </article>
      </body></html>
    `;
    const bodyBytes = new TextEncoder().encode(html);

    const result = await extractMenuSource("html", {
      kind: "content",
      fetchedAt: "2026-08-20T00:00:00.000Z",
      status: 200,
      contentType: "text/html; charset=utf-8",
      body: html,
      bodyBytes,
      rawSha256: "fixture",
      etag: null,
      lastModified: null,
      durationMs: 1,
      robotsAllowed: true,
    });

    const fatouche = result.items
      .filter((item) => item.name === "Fatouche")
      .map((item) => ({ priceMinor: item.priceMinor, sectionName: item.sectionName }));

    expect(fatouche).toEqual([
      { priceMinor: 17900, sectionName: "Salater & Suppe" },
      { priceMinor: 34900, sectionName: "Kylling" },
    ]);
    expect(new Set(result.items.map((item) => item.sourceKey)).size).toBe(result.items.length);
  });
});
