import { describe, expect, it } from "vitest";
import { extractScopedHtmlMenu } from "./html-source-extractor.js";

describe("HTML source scope recovery for branded main courses", () => {
  it("resumes food extraction when a plain branded main-course label follows a beverage heading", () => {
    const html = `
      <html><body>
        <h2>Pizza</h2>
        <p>Pollo</p>
        <p>249 kr</p>
        <h2>Cocktails</h2>
        <p>Gin Tonic</p>
        <p>159 kr</p>
        <div>Big Tactics Main Courses</div>
        <p>Oche Burger & Fries</p>
        <p>279 kr</p>
        <p>The Vegan Burger V</p>
        <p>229 kr</p>
        <h2>Sweets</h2>
        <p>BROWNIE & ICE CREAM</p>
        <p>99 kr</p>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);
    const names = result.items.map((item) => item.name);

    expect(result.visibleText).toContain("Big Tactics Main Courses");
    expect(result.visibleText).toContain("Oche Burger & Fries");
    expect(names).toContain("Pollo");
    expect(names).toContain("Oche Burger & Fries");
    expect(names).toContain("The Vegan Burger V");
    expect(names).toContain("BROWNIE & ICE CREAM");
    expect(names).not.toContain("Gin Tonic");
    expect(names).not.toContain("Big Tactics Main Courses");
    expect(result.visibleText).not.toContain("Gin Tonic");
  });
});
