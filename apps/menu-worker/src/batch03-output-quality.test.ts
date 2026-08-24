import { describe, expect, it } from "vitest";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";
import {
  filterHtmlBeverageSectionItemsWithScopedProvenance,
  filterPlainTextBeverageSectionItems,
} from "./html-text-section-scope.js";
import { extractPublicMenuApi } from "./public-menu-api-extractor.js";

function item(name: string, priceMinor: number, position: number): MenuObservedItem {
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
    confidence: 0.95,
    sourceExcerpt: `${name} — ${priceMinor / 100}`,
  };
}

describe("Batch 03 HTML output quality", () => {
  it("uses full-page section evidence for scoped items without dropping a food dish named Sake", () => {
    const items = [
      item("Morudoba Sake", 19900, 1),
      item("Mauro Moliino, La Morra Cuneo, Italia", 119500, 2),
      item("Aooni IPA", 16900, 3),
    ];

    const scopedVisibleText = [
      "Morudoba Sake 199",
      "Mauro Moliino, La Morra Cuneo, Italia 1195",
      "Aooni IPA 169",
    ].join("\n");
    const fullVisibleText = [
      "Food",
      "Morudoba Sake 199",
      "Drinks",
      "Red Wine",
      "Mauro Moliino, La Morra Cuneo, Italia 1195",
      "Beer & Cider",
      "Aooni IPA 169",
    ].join("\n");

    expect(
      filterHtmlBeverageSectionItemsWithScopedProvenance(
        items,
        scopedVisibleText,
        fullVisibleText,
      ).map((entry) => entry.name),
    ).toEqual(["Morudoba Sake"]);
  });

  it("drops role signatures and unpriced menu headings while preserving actual dishes", () => {
    const items = [
      item("– Head Chef", 48900, 1),
      item("En boks med 10 gram Oscietra kaviar", 48900, 2),
      item("Hanamis spesialiteter", 85600, 3),
      item("Ovnsstekt hummer", 85600, 4),
      item("Barnemeny", 20500, 5),
      item("Mini Hanami", 20500, 6),
      item("Gunkan maki – 2 biter", 14900, 7),
      item("Ikura: Lakserogn", 14900, 8),
      item("Maki – 6 biter", 24500, 9),
      item("California maki", 24500, 10),
    ];

    expect(
      filterPlainTextBeverageSectionItems(
        items,
        items.map((entry) => `${entry.name} ${entry.priceMinor / 100}`).join("\n"),
      ).map((entry) => entry.name),
    ).toEqual([
      "En boks med 10 gram Oscietra kaviar",
      "Ovnsstekt hummer",
      "Mini Hanami",
      "Ikura: Lakserogn",
      "California maki",
    ]);
  });
});

describe("Batch 03 public API output quality", () => {
  it("drops donation/service sections while preserving priced food siblings", () => {
    const items = extractPublicMenuApi(
      JSON.stringify({
        location: {
          menus: [
            {
              menuSections: [
                {
                  title: "Donate for your water!",
                  menuItems: [
                    {
                      name: "Water for education",
                      price: { amount: 15, currency: "NOK" },
                    },
                  ],
                },
                {
                  title: "Tapas",
                  menuItems: [
                    {
                      name: "Patatas bravas",
                      price: { amount: 105, currency: "NOK" },
                    },
                  ],
                },
              ],
            },
          ],
        },
      }),
    );

    expect(items.map((entry) => entry.name)).toEqual(["Patatas bravas"]);
  });
});
