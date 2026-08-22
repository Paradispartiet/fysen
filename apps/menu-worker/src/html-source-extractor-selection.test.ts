import { describe, expect, it } from "vitest";
import { extractScopedHtmlMenu } from "./html-source-extractor.js";

describe("standalone price-block selection", () => {
  it("does not let a sparse specialized recovery replace a richer fallback", () => {
    const html = `
      <html><body>
        <h2>Meny</h2>
        <p>Fallback Dish One 101 kr</p>
        <p>Fallback Dish Two 102 kr</p>
        <p>Fallback Dish Three 103 kr</p>
        <p>Fallback Dish Four 104 kr</p>
        <p>Fallback Dish Five 105 kr</p>
        <h2>Specials</h2>
        <p>DIRECT SPECIAL ONE</p><p>201 kr</p>
        <p>DIRECT SPECIAL TWO</p><p>202 kr</p>
        <p>DIRECT SPECIAL THREE</p><p>203 kr</p>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    const names = result.items.map((item) => item.name);

    expect(names).toContain("Fallback Dish One");
    expect(names).toContain("Fallback Dish Five");
    expect(result.items.length).toBeGreaterThan(3);
  });
});
