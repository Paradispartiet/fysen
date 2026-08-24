import { describe, expect, it } from "vitest";
import {
  HTML_ADJACENT_HEADING_PRICE_RECOVERY_VERSION,
  recoverAdjacentHeadingPriceHtmlItems,
} from "./html-adjacent-heading-price-recovery.js";

describe("wrapped heading-price recovery", () => {
  it("crosses repeated page-builder wrapper text without borrowing a later dish price", () => {
    const card = (name: string, description: string, price: number) => `
      <div class="outer-card">
        <div class="inner-card">
          <h4>${name}</h4>
          <div><div><p>${description}</p></div></div>
          <div><div><h5>Kr. ${price},-</h5></div></div>
        </div>
      </div>
    `;
    const html = `<html><body>
      <h2>À la carte</h2>
      ${card("Hummus", "Kikert- og sesampuré med pitabrød", 119)}
      ${card("Gresk salat", "Salat med fetaost og oliven", 220)}
      <h2>Gaza-kebab</h2>
      ${card("Gaza kebab", "Grillet kjøtt med salat og bulgur", 350)}
      <h2>Kylling og Lam</h2>
      ${card("Kylling Tawok", "Marinert og grillet kyllingbryst", 310)}
      <h2>Drikkemeny</h2>
      ${card("Husets rødvin", "Glass", 159)}
    </body></html>`;

    const items = recoverAdjacentHeadingPriceHtmlItems(html);
    expect(HTML_ADJACENT_HEADING_PRICE_RECOVERY_VERSION).toBe("heading-price-v7");
    expect(items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Hummus", 11900],
      ["Gresk salat", 22000],
      ["Gaza kebab", 35000],
      ["Kylling Tawok", 31000],
    ]);
    expect(items.some((item) => item.name === "Husets rødvin")).toBe(false);
  });

  it("stops at a new semantic dish heading instead of scanning onward for a price", () => {
    const items = recoverAdjacentHeadingPriceHtmlItems(`
      <html><body>
        <h2>Main courses</h2>
        <h3>Unpriced card</h3><div><p>Description only</p></div>
        <h3>Priced card</h3><div><p>Description</p></div><h4>299 NOK</h4>
        <h3>Third card</h3><h4>279 NOK</h4>
        <h3>Fourth card</h3><h4>249 NOK</h4>
        <h3>Fifth card</h3><h4>319 NOK</h4>
      </body></html>
    `);
    expect(items.some((item) => item.name === "Unpriced card")).toBe(false);
    expect(items.find((item) => item.name === "Priced card")?.priceMinor).toBe(29900);
  });
});
