import { describe, expect, it } from "vitest";
import { extractScopedHtmlMenu, HTML_SOURCE_EXTRACTOR_VERSION } from "./html-source-extractor.js";

describe("explicit food section recovery", () => {
  it("recovers heading-card dishes across common named food sections and blocks drinks", () => {
    const html = `
      <html><body>
        <h2>À la carte</h2>
        <h4>Hummus</h4><p>Serveres med pitabrød</p><h5>Kr. 119,-</h5>
        <h4>Gresk salat</h4><p>Salat og fetaost</p><h5>Kr. 220,-</h5>
        <h2>Gaza-kebab</h2>
        <h4>Gaza kebab</h4><p>Serveres med salat og bulgur</p><h5>Kr. 350,-</h5>
        <h2>Kylling og Lam</h2>
        <h4>Kylling Tawok</h4><p>Marinert grillet kyllingbryst</p><h5>Kr. 310,-</h5>
        <h2>Mezah-retter</h2>
        <h4>Mezah med kjøtt</h4><h5>Kr. 399,-</h5>
        <h2>Dessert</h2>
        <h4>Ostekake</h4><p>Klassisk ostekake</p><h5>Kr. 139,-</h5>
        <h2>Drikkemeny</h2>
        <h4>Husets rødvin</h4><h5>Kr. 159,-</h5>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);

    expect(HTML_SOURCE_EXTRACTOR_VERSION).toBe("html-v22");
    expect(result.items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Hummus", 11900],
      ["Gresk salat", 22000],
      ["Gaza kebab", 35000],
      ["Kylling Tawok", 31000],
      ["Mezah med kjøtt", 39900],
      ["Ostekake", 13900],
    ]);
    expect(result.items.some((item) => item.name === "Husets rødvin")).toBe(false);
  });
});
