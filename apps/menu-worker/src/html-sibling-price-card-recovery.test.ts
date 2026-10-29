import { describe, expect, it } from "vitest";
import { recoverSiblingPricedNumberedHtmlCards } from "./html-sibling-price-card-recovery.js";

describe("strict first-party numbered title + sibling price recovery", () => {
  it("recovers priced numbered sides through intervening allergy labels without confusing them for dish names", () => {
    const html = `
      <section>
        <div class="rett">
          <div class="rett-innhold">
            <h4 class="rett-tittel">No. 43 Creamed Broccoli</h4>
            <ul class="allergener"><li class="allergen">Laktose</li><li class="allergen">Melk</li></ul>
          </div>
          <div class="pris">65,-</div>
        </div>
        <div class="rett">
          <div class="rett-innhold"><h4 class="rett-tittel">No. 44 Fried Vegetables</h4></div>
          <div class="pris">65,-</div>
        </div>
      </section>`;
    const result = recoverSiblingPricedNumberedHtmlCards(html);
    expect(result.map((item) => [item.name, item.priceMinor])).toEqual([
      ["No. 43 Creamed Broccoli", 6500],
      ["No. 44 Fried Vegetables", 6500],
    ]);
    expect(result.every((item) => item.sourceExcerpt?.includes("65,-"))).toBe(true);
  });

  it("rejects unrelated, unpriced, misnested, and purely decorative items", () => {
    const html = `
      <section>
        <div class="rett"><div class="rett-innhold"><h4 class="rett-tittel">No. 45 Unpriced</h4></div><div class="pris">,-</div></div>
        <div class="rett"><div class="rett-innhold"><h4 class="rett-tittel">No. 46 Misnested</h4><div class="pris">95,-</div></div></div>
        <div class="rett"><div class="rett-innhold"><h4 class="rett-tittel">Gift Card</h4></div><div class="pris">250,-</div></div>
        <div class="rett"><div class="rett-innhold"><h4 class="rett-tittel">No. 47 Alcohol Only</h4></div><div class="pris">0,-</div></div>
      </section>`;
    expect(recoverSiblingPricedNumberedHtmlCards(html)).toEqual([]);
  });

  it("keeps only the first direct source-priced instance of duplicate numbered cards", () => {
    const html = `
      <div class="rett"><div class="rett-innhold"><h4 class="rett-tittel">No. 43 Creamed Broccoli</h4></div><div class="pris">65,-</div></div>
      <div class="rett"><div class="rett-innhold"><h4 class="rett-tittel">No. 43 Creamed Broccoli</h4></div><div class="pris">65,-</div></div>`;
    expect(recoverSiblingPricedNumberedHtmlCards(html)).toHaveLength(1);
  });
});
