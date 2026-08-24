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
    expect(PUBLIC_MENU_API_EXTRACTOR_VERSION).toBe("public-menu-api-v3");
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

describe("public menu API food filtering", () => {
  it("drops alcohol service sections and zero-priced UI placeholders", () => {
    const items = extractPublicMenuApi(
      JSON.stringify({
        location: {
          menus: [
            {
              menuSections: [
                {
                  title: "Cava / Musserende",
                  menuItems: [
                    { name: "House Cava", price: { amount: 845, currency: "NOK" } },
                  ],
                },
                {
                  title: "Gin & Tonic",
                  menuItems: [
                    { name: "House Gin & Tonic", price: { amount: 175, currency: "NOK" } },
                  ],
                },
                {
                  title: "Tapas",
                  menuItems: [
                    { name: "Patatas bravas", price: { amount: 105, currency: "NOK" } },
                    { name: "Test Button (Uteservering)", price: { amount: 0, currency: "NOK" } },
                    { name: "Test", price: { amount: 50, currency: "NOK" } },
                  ],
                },
              ],
            },
          ],
        },
      }),
    );
    expect(items.map((item) => item.name)).toEqual(["Patatas bravas"]);
  });
});

describe("public menu API excluded retail sections", () => {
  it("drops retail sections and all nested descendants while preserving food siblings", () => {
    const items = extractPublicMenuApi(
      JSON.stringify({
        location: {
          menus: [
            {
              menuSections: [
                {
                  title: "Butikk",
                  menuItems: [
                    {
                      name: "Olivenolje 250ml",
                      price: { amount: 120, currency: "NOK" },
                    },
                  ],
                  subSections: [
                    {
                      title: "Delikatesser",
                      menuItems: [
                        {
                          name: "Gaveeske",
                          price: { amount: 299, currency: "NOK" },
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
                  ],
                },
              ],
            },
          ],
        },
      }),
    );

    expect(items.map((item) => item.name)).toEqual(["Patatas bravas"]);
    expect(items[0]).toMatchObject({
      sectionName: "Tapas",
      priceMinor: 10500,
      extractionMethod: "api",
    });
  });
});

describe("public menu API WeOrder schema", () => {
  const weOrderFixture = {
    data: {
      id: 22743,
      menuStructure: 9,
      menuVersion: "22743.406",
      isAlcoholClosed: false,
      modifierGroups: [],
      menu: [
        {
          id: 43028,
          name: "Restaurant Curries",
          type: "food",
          categories: [
            {
              id: 71699,
              name: "Restaurant Curries",
              entries: [
                {
                  id: 463250,
                  name: "Butter Chicken",
                  price: 279,
                  dPrice: "279,-",
                  isAlcohol: false,
                  isSoldOut: false,
                  desc: "Grillede kyllingbiter i aromatisk tomatsaus.",
                },
                {
                  id: 463248,
                  name: "Chicken Korma",
                  price: 279,
                  dPrice: "279,-",
                  isAlcohol: false,
                  isSoldOut: false,
                  desc: "Kylling i aromatisk kryddersaus.",
                },
              ],
            },
          ],
        },
        {
          id: 43033,
          name: "Drikke",
          type: "drinks",
          categories: [
            {
              id: 71475,
              name: "Mineralvann",
              entries: [
                {
                  id: 1494452,
                  name: "Cola Zero Takeaway",
                  price: 55,
                  dPrice: "55,-",
                  isAlcohol: false,
                },
                {
                  id: 2257896,
                  name: "Ønsker å bestille mere",
                  price: 0,
                  dPrice: "0,-",
                  isAlcohol: false,
                },
              ],
            },
          ],
        },
      ],
      programTypes: [],
      iconPaths: [],
      imgPaths: [],
      thumbnailPaths: [],
    },
    success: true,
    messages: [],
  };

  it("extracts positive-price food entries and excludes drink menus", () => {
    const items = extractPublicMenuApi(JSON.stringify(weOrderFixture));
    expect(items.map((item) => item.name)).toEqual(["Butter Chicken", "Chicken Korma"]);
    expect(items[0]).toMatchObject({
      sectionName: "Restaurant Curries",
      description: "Grillede kyllingbiter i aromatisk tomatsaus.",
      priceMinor: 27900,
      priceKind: "exact",
      priceMaxMinor: null,
      currency: "NOK",
      extractionMethod: "api",
      confidence: 1,
    });
  });

  it("filters alcohol entries even inside otherwise-food menus", () => {
    const fixture = structuredClone(weOrderFixture);
    fixture.data.menu[0]!.categories[0]!.entries.push({
      id: 999999,
      name: "House wine",
      price: 165,
      dPrice: "165,-",
      isAlcohol: true,
      isSoldOut: false,
      desc: "",
    });
    expect(extractPublicMenuApi(JSON.stringify(fixture)).map((item) => item.name)).toEqual([
      "Butter Chicken",
      "Chicken Korma",
    ]);
  });

  it("fails closed on unsuccessful, malformed-price and unrecognizable WeOrder payloads", () => {
    expect(() =>
      extractPublicMenuApi(JSON.stringify({ ...weOrderFixture, success: false })),
    ).toThrow("WeOrder payload is not successful");

    const badPrice = structuredClone(weOrderFixture);
    badPrice.data.menu[0]!.categories[0]!.entries[0]!.dPrice = "299,-";
    badPrice.data.menu[0]!.categories[0]!.entries[1]!.dPrice = "299,-";
    expect(() => extractPublicMenuApi(JSON.stringify(badPrice))).toThrow(
      "numeric/display price conflict for Butter Chicken",
    );

    const noCategories = structuredClone(weOrderFixture);
    noCategories.data.menu = [
      {
        id: 1,
        name: "Food",
        type: "food",
        categories: [],
      },
    ];
    expect(() => extractPublicMenuApi(JSON.stringify(noCategories))).toThrow(
      "no recognizable food entries",
    );
  });
});
