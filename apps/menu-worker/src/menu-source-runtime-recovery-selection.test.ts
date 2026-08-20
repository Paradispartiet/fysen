import { describe, expect, it } from "vitest";
import { extractMenuSource } from "./menu-source-runtime.js";

async function extract(html: string) {
  return extractMenuSource("html", {
    kind: "content",
    fetchedAt: "2026-08-20T00:00:00.000Z",
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

describe("HTML runtime recovery selection", () => {
  it("selects the canonical numbered recovery instead of a larger add-on-polluted result", async () => {
    const result = await extract(`
      <html><body>
        <p>1 Satay</p><p>125 kr</p>
        <p>2 Ka Nhom Jeep</p><p>115 kr</p>
        <p>3 Gyoza</p><p>109 kr</p>
        <p>4 Tod Man Plah</p><p>109 kr</p>
        <p>5 Popie Tod</p><p>105 kr</p>
        <p>8 Phad Khi Mao</p><p>259 kr</p>
        <p>9 Kwuitiew Gai</p><p>255 kr</p>
        <p>10 Kwuitiew Tom Yum</p><p>249 kr</p>
        <p>11 Kwuitiew Nua</p><p>249 kr</p>
        <p>12 Phad Mhi</p><p>Stekte nudler med grønnsaker, egg og soyasaus</p><p>259 kr</p>
        <p>Kylling</p><p>60 kr</p>
        <p>Iskaffe</p><p>99 kr</p>
      </body></html>
    `);

    expect(result.items.map((item) => item.name)).toEqual([
      "Satay",
      "Ka Nhom Jeep",
      "Gyoza",
      "Tod Man Plah",
      "Popie Tod",
      "Phad Khi Mao",
      "Kwuitiew Gai",
      "Kwuitiew Tom Yum",
      "Kwuitiew Nua",
      "Phad Mhi",
    ]);
  });

  it("selects inline title-price cards inside an explicit a-la-carte scope", async () => {
    const result = await extract(`
      <html><body>
        <p>TASTING MENU</p><p>Chef Selection 870,-</p>
        <p>A LA CARTA</p>
        <p>Tostada de Callos (from the coast) 230,-</p><p>(Skalldyr, Soya, Peanøtter)</p>
        <p>Aguachile de Salmon 220,-</p><p>(Fisk)</p>
        <p>Berenjena con Mole Rosa (chef's inspiration) 210,-</p><p>(Hvete, Nøtter)</p>
        <p>Molotes de Platano (Oaxaca) 210,-</p><p>(Laktose, Hvete)</p>
        <p>Tetela (Oaxaca) 210,-</p><p>(Laktose, Skalldyr)</p>
        <p>BRUNCH</p><p>Huevos Rancheros 240,-</p>
      </body></html>
    `);

    expect(result.items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Tostada de Callos (from the coast)", 23000],
      ["Aguachile de Salmon", 22000],
      ["Berenjena con Mole Rosa (chef's inspiration)", 21000],
      ["Molotes de Platano (Oaxaca)", 21000],
      ["Tetela (Oaxaca)", 21000],
    ]);
  });
});
