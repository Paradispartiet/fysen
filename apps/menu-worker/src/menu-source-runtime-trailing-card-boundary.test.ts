import { describe, expect, it } from "vitest";
import { extractMenuSource } from "./menu-source-runtime.js";

async function extract(html: string) {
  return extractMenuSource("html", {
    kind: "content",
    fetchedAt: "2026-09-17T00:00:00.000Z",
    status: 200,
    contentType: "text/html; charset=utf-8",
    body: html,
    bodyBytes: new TextEncoder().encode(html),
    rawSha256: "fixture",
    etag: null,
    lastModified: null,
    durationMs: 1,
    robotsAllowed: true,
  });
}

describe("HTML runtime trailing-card boundaries", () => {
  it("preserves heading titles and does not let sub-floor extras steal a later card price", async () => {
    const result = await extract(`
      <html><body>
        <h2>Sushi</h2>
        <h3>SALMON AND KIMCHI ROLL</h3>
        <p>Salmon with kimchi</p>
        <p>NOK 139</p>
        <h3>SCALLOP</h3>
        <p>Scallop with ponzu</p>
        <p>NOK 139</p>
        <h3>CHICKEN TERIYAKI</h3>
        <p>Chicken with teriyaki</p>
        <p>NOK 259</p>
        <h3>EBI TEMPURA MAKI</h3>
        <p>Shrimp tempura roll</p>
        <p>NOK 195</p>

        <h2>Extra order</h2>
        <h3>Shrimp chips</h3><p>NOK 55</p>
        <h3>Chillimayonnase</h3><p>NOK 20</p>
        <h3>Ponzosauce</h3><p>NOK 20</p>
        <h3>Kimchee-teriyaki sauce</h3><p>NOK 20</p>
        <h3>Kimchi salad</h3><p>NOK 95</p>
        <h3>Crème brûlée</h3><p>NOK 155</p>
        <h3>Chocolate fondant</h3><p>NOK 165</p>
      </body></html>
    `);

    expect(result.items.map((item) => [item.name, item.priceMinor])).toEqual(
      expect.arrayContaining([
        ["SALMON AND KIMCHI ROLL", 13900],
        ["SCALLOP", 13900],
        ["CHICKEN TERIYAKI", 25900],
        ["EBI TEMPURA MAKI", 19500],
        ["Shrimp chips", 5500],
        ["Kimchi salad", 9500],
        ["Crème brûlée", 15500],
        ["Chocolate fondant", 16500],
      ]),
    );
    expect(result.items.some((item) => item.name === "Salmon with kimchi")).toBe(
      false,
    );
    expect(
      result.items.some(
        (item) => item.name === "Chillimayonnase" && item.priceMinor === 9500,
      ),
    ).toBe(false);
  });
});
