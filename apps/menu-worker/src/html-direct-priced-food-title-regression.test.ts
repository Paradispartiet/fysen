import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";
import { describe, expect, it } from "vitest";
import { recoverDescriptionNamedHtmlItems } from "./html-description-title-recovery.js";
import { extractScopedHtmlMenu } from "./html-source-extractor.js";
import { filterHtmlBeverageSectionItemsWithScopedProvenance } from "./html-text-section-scope.js";

function observedItem(
  name: string,
  priceMinor: number,
  sourceExcerpt: string,
  position = 0,
): MenuObservedItem {
  return {
    sourceKey: createMenuItemSourceKey(name),
    name,
    normalizedName: normalizeDishName(name),
    description: null,
    sectionName: null,
    priceMinor,
    currency: "NOK",
    position,
    extractionMethod: "html_heuristic",
    confidence: 0.9,
    sourceExcerpt,
  };
}

describe("direct-priced long food title regression", () => {
  it("recovers long titles only when a direct price is anchored by an explicit food section", () => {
    const chicken =
      "Grilled Chicken Yakiniku, served with Goma Cabbage salad";
    const seabass =
      "Grilled Seabass with chili/garlic sauce, served with burdock root";
    const dessert =
      "Miso cookie with butter, orange and white chocolate, served with a delicious Five-Spice Ice-Cream";
    const html = `
      <html><body>
        <h2>PROTEINS</h2>
        <p>${chicken}</p>
        <p>245,-</p>
        <p>${seabass}</p>
        <p>275</p>
        <h2>DESSERT</h2>
        <p>${dessert}</p>
        <p>135</p>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);

    expect(result.items.map((item) => item.name)).toEqual([
      chicken,
      seabass,
      dessert,
    ]);
    expect(result.items.map((item) => item.priceMinor)).toEqual([
      24500,
      27500,
      13500,
    ]);
    expect(
      result.items.some((item) => /^(?:PROTEINS|DESSERT)$/u.test(item.name)),
    ).toBe(false);
  });

  it("does not replace a directly priced dish title with its food-section heading", () => {
    const chicken =
      "Grilled Chicken Yakiniku, served with Goma Cabbage salad";
    const visibleText = `PROTEINS\n${chicken}\n245,-`;
    const recovered = recoverDescriptionNamedHtmlItems(
      [observedItem(chicken, 24500, `${chicken} — 245,-`, 1)],
      visibleText,
    );

    expect(recovered).toHaveLength(1);
    expect(recovered[0]?.name).toBe(chicken);
    expect(recovered[0]?.priceMinor).toBe(24500);
  });

  it("keeps direct-priced food titles containing served-with wording without reopening description noise", () => {
    const chicken =
      "Grilled Chicken Yakiniku, served with Goma Cabbage salad";
    const descriptionNoise =
      "Served with pickles and fresh herbs on the side";
    const visibleText = [
      "DRINKS",
      "House Wine",
      "145,-",
      "PROTEINS",
      chicken,
      "245,-",
      descriptionNoise,
    ].join("\n");
    const items = [
      observedItem(chicken, 24500, `${chicken} — 245,-`, 4),
      observedItem(descriptionNoise, 24500, descriptionNoise, 6),
    ];

    const filtered = filterHtmlBeverageSectionItemsWithScopedProvenance(
      items,
      visibleText,
      visibleText,
    );

    expect(filtered.map((item) => item.name)).toEqual([chicken]);
  });
});
