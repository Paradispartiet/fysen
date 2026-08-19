import { load } from "cheerio";
import { describe, expect, it } from "vitest";
import { recoverDescriptionNamedHtmlItems } from "./html-description-title-recovery.js";
import {
  HTML_HEADING_NORMALIZER_VERSION,
  normalizeHtmlHeadingLineBreaks,
} from "./html-heading-normalizer.js";
import { extractScopedHtmlMenu } from "./html-source-extractor.js";

describe("HTML heading line-break normalizer", () => {
  it("keeps a br-split dish heading semantically whole through the canonical HTML runtime chain", () => {
    const html = `
      <html><body>
        <section>
          <h2>Kylling og Lam</h2>
          <h4>Kofta (arabisk gryterett<br>med kjøttboller)</h4>
          <p>Godt krydret kjøtt av okse og lam. Serveres med salat og bulgur.</p>
          <h5>Kr. 310,-</h5>
          <h4>Lammegryte</h4>
          <p>Godt krydret kjøtt av lammebog. Serveres med salat og bulgur.</p>
          <h5>Kr. 310,-</h5>
          <h4>Kyllinggryte</h4>
          <p>Godt krydret beinfri kylling. Serveres med salat og bulgur.</p>
          <h5>Kr. 310,-</h5>
        </section>
      </body></html>
    `;

    const normalized = normalizeHtmlHeadingLineBreaks(html);
    const extracted = extractScopedHtmlMenu(normalized);
    const recovered = recoverDescriptionNamedHtmlItems(extracted.items, extracted.visibleText);

    expect(HTML_HEADING_NORMALIZER_VERSION).toBe("heading-v2");
    expect(recovered.map((item) => [item.name, item.priceMinor])).toContainEqual([
      "Kofta (arabisk gryterett med kjøttboller)",
      31000,
    ]);
  });

  it("does not flatten br elements outside heading elements", () => {
    const normalized = normalizeHtmlHeadingLineBreaks(
      "<html><body><h4>Dish<br>Name</h4><p>Line one<br>Line two</p></body></html>",
    );
    const $ = load(normalized);

    expect($("h4").text().replace(/\s+/g, " ").trim()).toBe("Dish Name");
    expect($("h4 br")).toHaveLength(0);
    expect($("p br")).toHaveLength(1);
  });

  it("recovers a dish when a standalone currency label separates its heading from the price", () => {
    const normalized = normalizeHtmlHeadingLineBreaks(`
      <html><body>
        <section>
          <h3>Doro Wet</h3>
          <div>NOK</div>
          <div>290</div>
        </section>
      </body></html>
    `);

    const extracted = extractScopedHtmlMenu(normalized);
    expect(extracted.items.map((item) => [item.name, item.priceMinor])).toContainEqual([
      "Doro Wet",
      29000,
    ]);
    expect(extracted.items.some((item) => item.name === "NOK")).toBe(false);
  });

  it("removes phone metadata instead of turning its trailing digits into a menu price", () => {
    const normalized = normalizeHtmlHeadingLineBreaks(`
      <html><body>
        <footer><p>Phone: 457 66 490</p></footer>
        <section><p>Tibis 320</p></section>
      </body></html>
    `);

    const extracted = extractScopedHtmlMenu(normalized);
    expect(extracted.items.map((item) => [item.name, item.priceMinor])).toContainEqual([
      "Tibis",
      32000,
    ]);
    expect(extracted.items.some((item) => /^Phone:/iu.test(item.name))).toBe(false);
  });
});
