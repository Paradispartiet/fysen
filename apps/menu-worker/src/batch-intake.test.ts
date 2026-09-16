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
});
