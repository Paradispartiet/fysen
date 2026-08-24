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

  it("drops role, section, description, bare quantity and trailing-separator artifacts while preserving actual dishes", () => {
    const items = [
      item("– Head Chef", 48900, 1),
      item("Zensai", 48900, 2),
      item("Zensai er små matbiter som serveres før middagen", 48900, 3),
      item("Robatagrill", 76900, 4),
      item("En boks med 10 gram Oscietra kaviar", 48900, 5),
      item("Hanamis spesialiteter", 85600, 6),
      item("Ovnsstekt hummer", 85600, 7),
      item("Barnemeny", 20500, 8),
      item("Mini Hanami", 20500, 9),
      item("Gunkan maki – 2 biter", 14900, 10),
      item("Ikura: Lakserogn", 14900, 11),
      item("Maki – 6 biter", 24500, 12),
      item("California maki", 24500, 13),
      item("6 Slices •", 21900, 14),
      item("6 slices of salmon", 21900, 15),
      item("Deep fried ebi (scampi) rolled with avocado •", 17900, 16),
      item("Tempura", 17900, 17),
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
      "6 slices of salmon",
      "Tempura",
    ]);
  });

  it("removes only conservative trailing allergen artifacts from dish names", () => {
    const items = [
      item("Black cod - H, SO, F", 44900, 1),
      item("Sake: Laks - F, SEN", 16900, 2),
      item("Spinatsalat med trøffelolje, parmesan og tørr miso H, SO, M", 17900, 3),
      item("Hanamis signatursalat med honning- og kokosdressing - SEN", 18900, 4),
      item("Kappa maki – agurk - SEN", 14900, 5),
      item("Wagyu steak - (spør din servitør om allergener)", 76900, 6),
      item("Duck - smoked", 28900, 7),
      item("Tuna - SPICY", 19900, 8),
      item("Pizza BBQ, XL", 19900, 9),
    ];

    expect(
      filterPlainTextBeverageSectionItems(
        items,
        items.map((entry) => `${entry.name} ${entry.priceMinor / 100}`).join("\n"),
      ).map((entry) => entry.name),
    ).toEqual([
      "Black cod",
      "Sake: Laks",
      "Spinatsalat med trøffelolje, parmesan og tørr miso",
      "Hanamis signatursalat med honning- og kokosdressing",
      "Kappa maki – agurk",
      "Wagyu steak",
      "Duck - smoked",
      "Tuna - SPICY",
      "Pizza BBQ, XL",
    ]);
  });
});

describe("Batch 03 public API output quality", () => {
  it("drops donation and liquor sections while preserving priced food siblings", () => {
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
                  title: "Orujos / Liquors",
                  menuItems: [
                    {
                      name: "Hiervas Pazo de Valdomino",
                      price: { amount: 145, currency: "NOK" },
                    },
                  ],
                  subSections: [
                    {
                      title: "Liqueurs",
                      menuItems: [
                        {
                          name: "House liqueur",
                          price: { amount: 125, currency: "NOK" },
                        },
                      ],
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
                    {
                      name: "Doner kebab",
                      price: { amount: 195, currency: "NOK" },
                    },
                  ],
                },
              ],
            },
          ],
        },
      }),
    );

    expect(items.map((entry) => entry.name)).toEqual([
      "Patatas bravas",
      "Doner kebab",
    ]);
  });
});
