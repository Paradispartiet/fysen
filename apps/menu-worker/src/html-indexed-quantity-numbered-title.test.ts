import { describe, expect, it } from "vitest";
import { extractScopedHtmlMenu } from "./html-source-extractor.js";

describe("indexed numeric-quantity numbered dish titles", () => {
  it("keeps the numeric quantity while removing the explicit menu index", () => {
    const html = `
      <html><body>
        <h2>Kylling</h2>
        <p>1 Chicken Burger</p>
        <p>Saftig kyllingburger med salat og dressing.</p>
        <p>149 kr</p>
        <p>3. 5 Hot Wings</p>
        <p>Fem sprø hot wings med valgfri saus.</p>
        <p>70 kr</p>
        <p>4 Kebab Pizza</p>
        <p>Pizza med kebabkjøtt, ost og saus.</p>
        <p>299 kr</p>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);

    expect(result.items.map((item) => item.name)).toEqual([
      "Chicken Burger",
      "5 Hot Wings",
      "Kebab Pizza",
    ]);
    expect(result.items.map((item) => item.priceMinor)).toEqual([14900, 7000, 29900]);
  });

  it("does not reinterpret two bare leading numbers as an indexed quantity title", () => {
    const html = `
      <html><body>
        <p>1 Chicken Burger</p><p>149 kr</p>
        <p>3 5 Hot Wings</p><p>70 kr</p>
        <p>4 Kebab Pizza</p><p>299 kr</p>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);

    expect(result.items.map((item) => item.name)).toEqual(["Chicken Burger", "Kebab Pizza"]);
    expect(result.items.some((item) => item.name === "5 Hot Wings")).toBe(false);
  });
});
