import { describe, expect, it } from "vitest";
import { extractScopedHtmlMenu } from "./html-source-extractor.js";
import {
  HTML_PRICE_NOTATION_NORMALIZER_VERSION,
  normalizeHtmlPriceNotation,
} from "./menu-source-runtime.js";

describe("HTML menu price notation normalization", () => {
  it("normalizes common slash-style NOK prices without changing ordinary prices", () => {
    expect(HTML_PRICE_NOTATION_NORMALIZER_VERSION).toBe("price-notation-v1");
    expect(normalizeHtmlPriceNotation("KR. 179,/- · 165/- · 199,- · NOK 249")).toBe(
      "KR. 179,- · 165,- · 199,- · NOK 249",
    );
  });

  it("makes heading-description-price cards with slash-style prices canonical-extractable", () => {
    const html = `
      <html><body>
        <h2>Starters</h2>
        <article>
          <h3>Coastal Delight</h3>
          <p>Spiced coastal starter with herbs and coconut.</p>
          <h4>KR. 179,/-</h4>
        </article>
        <article>
          <h3>Palak Corn Kebab</h3>
          <p>Spinach and corn kebab with aromatic spices.</p>
          <h4>KR. 165,/-</h4>
        </article>
        <article>
          <h3>Tangy Lamb Chop</h3>
          <p>Grilled lamb chop with tangy marinade.</p>
          <h4>KR. 199,/-</h4>
        </article>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(normalizeHtmlPriceNotation(html));
    expect(result.items.map((item) => item.name)).toEqual([
      "Coastal Delight",
      "Palak Corn Kebab",
      "Tangy Lamb Chop",
    ]);
    expect(result.items.map((item) => item.priceMinor)).toEqual([17900, 16500, 19900]);
  });
});
