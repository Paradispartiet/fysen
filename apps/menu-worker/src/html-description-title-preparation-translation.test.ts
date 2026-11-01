import { describe, expect, it } from "vitest";
import {
  recoverDescriptionNamedHtmlItems,
  looksLikeHtmlDescription,
} from "./html-description-title-recovery.js";
import { extractScopedHtmlMenu } from "./html-source-extractor.js";

describe("directly priced translated preparation titles", () => {
  it("keeps a mixed-case preparation title beside its own price rather than its accordion heading", () => {
    const extracted = extractScopedHtmlMenu(`
      <h2>Hovedretter</h2>
      <div class="accordion">
        <div>Signatur Klassisk</div>
        <div><p><span>DAMPET Seabass 特 色 蒸 海 鱼<br/>398,-</span>
          <span><br/>Med Lee Kum Kee soyasaus.<br/>
          Serveres ved wokket bimibrokkoli og shimejisopp.<br/></span>
          <span>(Hvetemel, Soya, Fisk, Sesam)</span><br/>
          <span>GRILLET OKSEINDREFILET 炭 燒 牛 柳<br/>398,-</span><br/>
          Med sukiyaki-peppersaus og dagens grønnsaker.
        </p></div>
      </div>
      <h2>Desserter</h2><p>MANGOPUDDING<br/>135,-<br/>Med frisk mango.</p>
    `);
    const items = recoverDescriptionNamedHtmlItems(
      extracted.items,
      extracted.visibleText,
    );

    expect(items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["DAMPET Seabass 特 色 蒸 海 鱼", 39800],
      ["GRILLET OKSEINDREFILET 炭 燒 牛 柳", 39800],
      ["MANGOPUDDING", 13500],
    ]);
    expect(items.some((item) => item.name === "Signatur Klassisk")).toBe(false);
  });

  it("continues to treat preparation prose and translated instructions as descriptions", () => {
    expect(looksLikeHtmlDescription("DAMPET Seabass 特 色 蒸 海 鱼")).toBe(false);
    expect(looksLikeHtmlDescription("Grilled Seabass 烤 魚")).toBe(false);
    expect(looksLikeHtmlDescription("Dampet med soyasaus 蒸 鱼")).toBe(true);
    expect(looksLikeHtmlDescription("Grilled with garlic 烤 魚")).toBe(true);
    expect(looksLikeHtmlDescription("Dampet fisk med grønnsaker.")).toBe(true);
  });
});
