import { describe, expect, it } from "vitest";
import type { MenuObservedItem } from "@fysen/menu-core";
import { restaurantOnboardingManifestSchema } from "./onboarding-manifest.js";
import { evaluateManifestMenuQuality } from "./manifest-quality.js";

const manifest = restaurantOnboardingManifestSchema.parse({
  version: 1,
  restaurant: {
    slug: "test-bistro-oslo",
    name: "Test Bistro",
    websiteUrl: "https://example.com/",
    address: "Testgata 1",
    city: "Oslo",
    countryCode: "NO",
    latitude: 59.91,
    longitude: 10.75,
  },
  menuSource: {
    url: "https://example.com/menu.pdf",
    sourceType: "pdf",
    checkIntervalMinutes: 360,
    minimumExpectedItems: 2,
  },
  qualityAssertions: {
    requiredDishNames: ["Bambus Signatur", "Spicy Tempura Scampi"],
    requiredDishVariants: [
      {
        name: "Bambus Signatur",
        priceMinor: 28500,
        priceKind: "multiple",
        priceMaxMinor: 30900,
      },
    ],
    forbiddenDishNames: ["SPICY"],
  },
});

function item(
  name: string,
  options: Partial<Pick<MenuObservedItem, "priceMinor" | "priceKind" | "priceMaxMinor" | "sectionName">> = {},
): MenuObservedItem {
  return {
    sourceKey: name,
    name,
    normalizedName: name.toLocaleLowerCase("nb-NO"),
    description: null,
    sectionName: options.sectionName ?? null,
    priceMinor: options.priceMinor ?? 12500,
    ...(options.priceKind !== undefined ? { priceKind: options.priceKind } : {}),
    ...(options.priceMaxMinor !== undefined ? { priceMaxMinor: options.priceMaxMinor } : {}),
    currency: "NOK",
    position: 0,
    extractionMethod: "pdf_text",
    confidence: 0.9,
    sourceExcerpt: name,
  };
}

describe("manifest menu quality", () => {
  it("accepts a menu only when minimum, required dishes and price semantics all match", () => {
    const result = evaluateManifestMenuQuality(manifest, [
      item("Bambus Signatur", {
        priceMinor: 28500,
        priceKind: "multiple",
        priceMaxMinor: 30900,
      }),
      item("Spicy Tempura Scampi", { priceMinor: 12500, priceKind: "multiple", priceMaxMinor: 13500 }),
    ]);

    expect(result).toEqual({
      accepted: true,
      itemCount: 2,
      minimumExpectedItems: 2,
      missingRequiredDishes: [],
      forbiddenDishesPresent: [],
    });
  });

  it("rejects a matching dish when its declared price semantics are wrong", () => {
    const result = evaluateManifestMenuQuality(manifest, [
      item("Bambus Signatur", { priceMinor: 28500 }),
      item("Spicy Tempura Scampi"),
    ]);

    expect(result.accepted).toBe(false);
    expect(result.missingRequiredDishes).toContain("Bambus Signatur @ 28500 multiple..30900");
  });

  it("rejects parser fragments declared forbidden even when required dishes also exist", () => {
    const result = evaluateManifestMenuQuality(manifest, [
      item("Bambus Signatur", {
        priceMinor: 28500,
        priceKind: "multiple",
        priceMaxMinor: 30900,
      }),
      item("Spicy Tempura Scampi"),
      item("SPICY"),
    ]);

    expect(result.accepted).toBe(false);
    expect(result.forbiddenDishesPresent).toEqual(["SPICY"]);
  });

  it("rejects a menu below its declared item floor", () => {
    const result = evaluateManifestMenuQuality(manifest, [
      item("Bambus Signatur", {
        priceMinor: 28500,
        priceKind: "multiple",
        priceMaxMinor: 30900,
      }),
    ]);

    expect(result.accepted).toBe(false);
    expect(result.itemCount).toBe(1);
    expect(result.minimumExpectedItems).toBe(2);
  });
});
