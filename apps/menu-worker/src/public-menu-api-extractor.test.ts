import { describe, expect, it } from "vitest";
import {
  PUBLIC_MENU_API_EXTRACTOR_VERSION,
  extractPublicMenuApi,
} from "./public-menu-api-extractor.js";

describe("public menu API extractor", () => {
  it("extracts localized nested service-menu items and skips beverage/inactive sections", () => {
    const body = JSON.stringify({
      location: {
        menus: [
          {
            menuSections: [
              {
                titles: [{ language: "no", text: "Alkoholfri drikke / Alcohol free beverages" }],
                menuItems: [
                  {
                    names: [{ language: "no", text: "Cola" }],
                    price: { amount: 65, currency: "NOK" },
                    active: true,
                  },
                ],
              },
              {
                titles: [{ language: "no", text: "Tapas" }],
                menuItems: [
                  {
                    names: [{ language: "no", text: "Patatas bravas" }],
                    descriptions: [{ language: "no", text: "Potet, salsa brava og aioli" }],
                    price: { amount: 129, currency: "NOK" },
                    active: true,
                  },
                  {
                    names: [{ language: "no", text: "Utgått rett" }],
                    price: { amount: 199, currency: "NOK" },
                    active: false,
                  },
                ],
                subSections: [
                  {
                    titles: [{ language: "no", text: "Croquetas" }],
                    menuItems: [
                      {
                        names: [{ language: "no", text: "Croquetas de jamón" }],
                        variants: [
                          { availability: "AVAILABLE", price: { amount: 149, currency: "NOK" } },
                        ],
                        active: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    });

    const items = extractPublicMenuApi(body);
    expect(PUBLIC_MENU_API_EXTRACTOR_VERSION).toBe("public-menu-api-v1");
    expect(items.map((item) => item.name)).toEqual([
      "Patatas bravas",
      "Croquetas de jamón",
    ]);
    expect(items[0]).toMatchObject({
      sectionName: "Tapas",
      description: "Potet, salsa brava og aioli",
      priceMinor: 12900,
      currency: "NOK",
      extractionMethod: "api",
      confidence: 1,
    });
    expect(items[1]).toMatchObject({
      sectionName: "Croquetas",
      priceMinor: 14900,
      priceKind: "exact",
    });
  });

  it("preserves multiple variant prices when no direct price exists", () => {
    const items = extractPublicMenuApi(
      JSON.stringify({
        menus: [
          {
            menuSections: [
              {
                title: "Mat",
                menuItems: [
                  {
                    name: "Tasting plate",
                    variants: [
                      { price: { amount: 200, currency: "NOK" } },
                      { price: { amount: 250, currency: "NOK" } },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }),
    );
    expect(items[0]).toMatchObject({
      priceMinor: 20000,
      priceKind: "multiple",
      priceMaxMinor: 25000,
    });
  });

  it("fails closed on unrelated JSON and conflicting duplicate prices", () => {
    expect(() => extractPublicMenuApi(JSON.stringify({ ok: true }))).toThrow(
      "exposed no menus array",
    );
    expect(() =>
      extractPublicMenuApi(
        JSON.stringify({
          menus: [
            {
              menuSections: [
                {
                  title: "Tapas",
                  menuItems: [
                    { name: "Oliven", price: { amount: 75, currency: "NOK" } },
                    { name: "Oliven", price: { amount: 85, currency: "NOK" } },
                  ],
                },
              ],
            },
          ],
        }),
      ),
    ).toThrow("conflicting duplicate prices");
  });
});
