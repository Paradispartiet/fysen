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
        <p>1 Satay</p><p>Kylling satay med peanøttsaus 125 kr</p>
        <p>2 Ka Nhom Jeep</p><p>Reker dumplings med soyasaus 115 kr</p>
        <p>3 Gyoza</p><p>Friterte dumplings med grønnsaker 109 kr</p>
        <p>4 Tod Man Plah</p><p>Fiskekaker med søt chilisaus 109 kr</p>
        <p>5 Popie Tod</p><p>Vårruller med grønnsaker og chilisaus 105 kr</p>
        <p>Hovedretter</p>
        <p>8 Phad Khi Mao</p><p>259 kr</p>
        <p>9 Kwuitiew Gai</p><p>255 kr</p>
        <p>10 Kwuitiew Tom Yum</p><p>249 kr</p>
        <p>11 Kwuitiew Nua</p><p>Stekt oksekjøtt i panang karri med kokosmelk, lange bønner og paprika</p><p>249 kr</p>
        <p>Drikke</p>
        <p>12 Phad Mhi</p><p>Stekte nudler med grønnsaker, egg og soyasaus 259 kr</p>
        <p>Kylling</p><p>60 kr</p>
        <p>35 kr</p><p>Vis mer</p><p>Thai Iced Delight</p><p>Iskaffe</p><p>99 kr</p>
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

  it("recovers titles after trailing-card selection and scopes drinks from the preferred path", async () => {
    const result = await extract(`
      <html><body>
        <h2>Hovedretter</h2>
        <div>Mrs. Fish</div><div>Helfritert makirull med laks</div><div>164 kr</div>
        <div>Rainbow</div><div>Fritert scampi med avokado</div><div>169 kr</div>
        <div>Gaza kebab</div><div>Kan fås gluten- og laktosefri</div><div>350 kr</div>
        <div>Dønner kebab</div><div>Blandet kjøtt av lam og okse</div><div>350 kr</div>
        <div>Mezah med en grill rett</div><div>Mini-mezah med valgfri grillrett</div><div>459 kr</div>
        <h2>Drikkemeny</h2>
        <div>Flaske</div><div>880 kr</div>
        <div>Grimbergen Blonde (0.33 l flaske)</div><div>109 kr</div>
        <div>Mineralvann</div><div>59 kr</div>
        <div>Munkholm</div><div>69 kr</div>
      </body></html>
    `);

    expect(result.items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Mrs. Fish", 16400],
      ["Rainbow", 16900],
      ["Gaza kebab", 35000],
      ["Dønner kebab", 35000],
      ["Mezah med en grill rett", 45900],
    ]);
  });

  it("supplements a selected recovery with a price-wrapped dish card", async () => {
    const result = await extract(`
      <html><body>
        <h2>Burgere</h2>
        <div>225</div><div>Haandtryk BURGER -</div><div>H, SO, L</div><div>225</div>
        <div>235</div><div>Vegetar BURGER -</div><div>H, SO, L</div><div>235</div>
        <div>245</div><div>Kylling BURGER -</div><div>H, SO, L</div><div>245</div>
        <div>255</div><div>Cheese BURGER -</div><div>H, SO, L</div><div>255</div>
      </body></html>
    `);

    expect(result.items.map((item) => [item.name, item.priceMinor])).toEqual(
      expect.arrayContaining([
        ["Haandtryk BURGER -", 22500],
        ["Vegetar BURGER -", 23500],
        ["Kylling BURGER -", 24500],
        ["Cheese BURGER -", 25500],
      ]),
    );
  });
});
