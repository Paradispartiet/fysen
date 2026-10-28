import { normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";
import { describe, expect, it } from "vitest";
import {
  buildGeneratedRestaurantManifest,
  type RestaurantBatchIntakeEntry,
} from "./batch-intake.js";

function item(
  name: string,
  position: number,
  options: Partial<
    Pick<MenuObservedItem, "priceMinor" | "priceKind" | "priceMaxMinor">
  > = {},
): MenuObservedItem {
  return {
    sourceKey: `dish-${position}`,
    name,
    normalizedName: normalizeDishName(name),
    description: null,
    sectionName: position < 4 ? "Starters" : "Mains",
    priceMinor: options.priceMinor ?? 10000 + position * 100,
    ...(options.priceKind ? { priceKind: options.priceKind } : {}),
    ...(options.priceMaxMinor !== undefined
      ? { priceMaxMinor: options.priceMaxMinor }
      : {}),
    currency: "NOK",
    position,
    extractionMethod: "html_heuristic",
    confidence: 0.9,
    sourceExcerpt: null,
  };
}

const entry: RestaurantBatchIntakeEntry = {
  version: 1,
  restaurant: {
    slug: "batch-bistro-oslo",
    name: "Batch Bistro",
    websiteUrl: "https://example.com/",
    address: "Testgata 1, 0001 Oslo",
    city: "Oslo",
    countryCode: "NO",
    latitude: 59.91,
    longitude: 10.75,
  },
  menuSource: {
    url: "https://example.com/menu",
    sourceType: "html",
    fetchMode: "http",
    userAgent: "FysenMenuBot/0.1",
    checkIntervalMinutes: 360,
    sourceSupport: { redirectOrigins: [], browserDataOrigins: [] },
  },
  verification: {},
  actions: [],
  assertionCount: 4,
  forbiddenDishNames: ["Drinks"],
};

describe("restaurant batch intake", () => {
  it("requires an independently audited name, price and menu floor", () => {
    const items = [item("Hval", 0, { priceMinor: 25500 }), item("Fisk (liten)", 1, { priceMinor: 23500 }),
      item("Fisk (stor)", 2, { priceMinor: 46500 }), item("Kjøttkaker", 3, { priceMinor: 28700 })];
    const strict: RestaurantBatchIntakeEntry = {
      ...entry, minimumSourceItems: 4,
      requiredDishVariants: [
        { name: "Hval", priceMinor: 25500 },
        { name: "Fisk (liten)", priceMinor: 23500 },
        { name: "Fisk (stor)", priceMinor: 46500 },
        { name: "Kjøttkaker", priceMinor: 28700 },
      ],
    };
    const result = buildGeneratedRestaurantManifest(strict, items);
    expect(result.menuSource.minimumExpectedItems).toBe(4);
    expect(result.qualityAssertions.requiredDishVariants).toHaveLength(4);
    expect(() => buildGeneratedRestaurantManifest({ ...strict, minimumSourceItems: 5 }, items))
      .toThrow(/First-party minimum/);
    expect(() => buildGeneratedRestaurantManifest(strict, items.slice(0, 3)))
      .toThrow(/First-party minimum/);
    expect(() => buildGeneratedRestaurantManifest({
      ...strict, requiredDishVariants: [{ name: "Hval", priceMinor: 99900 }],
    }, items)).toThrow(/First-party name\/price choice missing/);
  });

  it("pins the complete canonical item count and representative live prices", () => {
    const items = Array.from({ length: 10 }, (_, index) =>
      item(`Dish ${index + 1}`, index),
    );
    const manifest = buildGeneratedRestaurantManifest(entry, items);

    expect(manifest.menuSource.minimumExpectedItems).toBe(10);
    expect(manifest.qualityAssertions.requiredDishNames).toEqual([
      "Dish 1",
      "Dish 4",
      "Dish 7",
      "Dish 10",
    ]);
    expect(manifest.qualityAssertions.requiredDishVariants).toHaveLength(4);
    expect(manifest.qualityAssertions.forbiddenDishNames).toEqual(["Drinks"]);
  });

  it("food-scopes structured service labels, beverage names and beverage sections", () => {
    const manifest = buildGeneratedRestaurantManifest(entry, [
      item("Dish 1", 0),
      item("Dish 2", 1),
      item("Dish 3", 2),
      item("Dish 4", 3),
      { ...item("Bestikk", 4), extractionMethod: "json_ld" },
      { ...item("Urge 0,5l", 5), extractionMethod: "json_ld" },
      {
        ...item("Appelsin", 6),
        extractionMethod: "json_ld",
        sectionName: "Juice",
      },
      {
        ...item("Eple, Gulrot og Ingefær", 7),
        extractionMethod: "json_ld",
        sectionName: "Juice",
      },
      {
        ...item("Pepsi Max 0,5l", 8),
        extractionMethod: "json_ld",
        sectionName: "Drikke",
      },
      {
        ...item("Imsdal 0,5l", 9),
        extractionMethod: "json_ld",
        sectionName: "Drikke",
      },
    ]);

    expect(manifest.menuSource.minimumExpectedItems).toBe(4);
    expect(manifest.qualityAssertions.requiredDishNames).toEqual([
      "Dish 1",
      "Dish 2",
      "Dish 3",
      "Dish 4",
    ]);
  });

  it("excludes structured ordering-instruction sections from the integrity floor", () => {
    const manifest = buildGeneratedRestaurantManifest(entry, [
      item("Dish 1", 0),
      item("Dish 2", 1),
      item("Dish 3", 2),
      item("Dish 4", 3),
      {
        ...item("Varmes hjemme", 4, { priceMinor: null }),
        extractionMethod: "json_ld",
        sectionName: "Les før bestilling",
      },
      {
        ...item("Alt du trenger, følger med", 5, { priceMinor: null }),
        extractionMethod: "json_ld",
        sectionName: "Les før bestilling",
      },
      {
        ...item("Dampeboks gjør det enkelt", 6, { priceMinor: null }),
        extractionMethod: "json_ld",
        sectionName: "Les før bestilling",
      },
    ]);

    expect(manifest.menuSource.minimumExpectedItems).toBe(4);
    expect(manifest.qualityAssertions.requiredDishNames).toEqual([
      "Dish 1",
      "Dish 2",
      "Dish 3",
      "Dish 4",
    ]);
  });

  it("does not inflate the integrity floor for repeated equivalent source keys", () => {
    const first = item("Dish 1", 0);
    const repeated = { ...first, position: 1 };
    const manifest = buildGeneratedRestaurantManifest(entry, [
      first,
      repeated,
      item("Dish 2", 2),
      item("Dish 3", 3),
      item("Dish 4", 4),
    ]);

    expect(manifest.menuSource.minimumExpectedItems).toBe(4);
    expect(manifest.qualityAssertions.requiredDishNames).toEqual([
      "Dish 1",
      "Dish 2",
      "Dish 3",
      "Dish 4",
    ]);
  });

  it("preserves fail-closed from and multiple price semantics", () => {
    const manifest = buildGeneratedRestaurantManifest(entry, [
      item("Small", 0),
      item("From bowl", 1, { priceMinor: 14900, priceKind: "from" }),
      item("Pizza", 2, {
        priceMinor: 19900,
        priceKind: "multiple",
        priceMaxMinor: 24900,
      }),
      item("Dessert", 3),
    ]);
    expect(manifest.qualityAssertions.requiredDishVariants).toContainEqual({
      name: "From bowl",
      priceMinor: 14900,
      priceKind: "from",
    });
    expect(manifest.qualityAssertions.requiredDishVariants).toContainEqual({
      name: "Pizza",
      priceMinor: 19900,
      priceKind: "multiple",
      priceMaxMinor: 24900,
    });
  });

  it("refuses weak sources with fewer than three priced dishes", () => {
    expect(() =>
      buildGeneratedRestaurantManifest(entry, [
        item("Priced", 0),
        item("No price", 1, { priceMinor: null }),
      ]),
    ).toThrow("at least 3 are required");
  });

  it("does not generate Sumo intake locks for items in beverage sections", () => {
    const items = [
      item("Juicy Chicken Karaage", 0),
      { ...item("Mauro Moliino, La Morra Cuneo, Italia", 1), sectionName: "Red Wine" },
      item("Sim-Sim Poké", 2),
      { ...item("Henriot Rosé", 3), sectionName: "Bubbles" },
      { ...item("Bayanegra Rosé", 4), sectionName: "Rosé" },
      item("Kimchi Salad", 5),
      { ...item("Riesling GG", 6), sectionName: "White Wine" },
      { ...item("Aooni IPA", 7), sectionName: "Beer & Cider" },
      item("Morudoba Sake", 8),
    ];
    const manifest = buildGeneratedRestaurantManifest(entry, items);
    expect(manifest.menuSource.minimumExpectedItems).toBe(4);
    expect(manifest.qualityAssertions.requiredDishNames).toEqual([
      "Juicy Chicken Karaage", "Sim-Sim Poké", "Kimchi Salad", "Morudoba Sake",
    ]);
  });
});
