import { describe, expect, it } from "vitest";
import { restaurantOnboardingManifestSchema } from "./onboarding-manifest.js";

const validManifest = {
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
    url: "https://example.com/menu",
    sourceType: "html",
    checkIntervalMinutes: 360,
    minimumExpectedItems: 5,
  },
  qualityAssertions: {
    requiredDishNames: ["Biff tartar"],
  },
} as const;

describe("restaurant onboarding manifest", () => {
  it("applies safe defaults for bot identity, fetch mode, actions and dish variants", () => {
    const parsed = restaurantOnboardingManifestSchema.parse(validManifest);
    expect(parsed.menuSource.userAgent).toBe("FysenMenuBot/0.1");
    expect(parsed.menuSource.fetchMode).toBe("http");
    expect(parsed.actions).toEqual([]);
    expect(parsed.qualityAssertions.requiredDishVariants).toEqual([]);
  });

  it("accepts explicit browser fetch for rendered HTML sources", () => {
    const parsed = restaurantOnboardingManifestSchema.parse({
      ...validManifest,
      menuSource: { ...validManifest.menuSource, fetchMode: "browser" },
    });
    expect(parsed.menuSource.fetchMode).toBe("browser");
    expect(parsed.menuSource.sourceType).toBe("html");
  });

  it("accepts PDF sources and explicit section/price assertions", () => {
    const parsed = restaurantOnboardingManifestSchema.parse({
      ...validManifest,
      menuSource: {
        ...validManifest.menuSource,
        url: "https://example.com/menu.pdf",
        sourceType: "pdf",
      },
      qualityAssertions: {
        requiredDishNames: ["Pasta carbonara"],
        requiredDishVariants: [
          { name: "Pasta carbonara", sectionName: "PRIMI PIATTI", priceMinor: 26000 },
          { name: "Pasta carbonara", sectionName: "BAMBINI", priceMinor: 12500 },
        ],
      },
    });
    expect(parsed.menuSource.sourceType).toBe("pdf");
    expect(parsed.qualityAssertions.requiredDishVariants).toHaveLength(2);
    expect(parsed.qualityAssertions.requiredDishVariants[0]).toMatchObject({
      sectionName: "PRIMI PIATTI",
      priceMinor: 26000,
    });
  });

  it("rejects browser fetch for PDF sources", () => {
    expect(() =>
      restaurantOnboardingManifestSchema.parse({
        ...validManifest,
        menuSource: {
          ...validManifest.menuSource,
          url: "https://example.com/menu.pdf",
          sourceType: "pdf",
          fetchMode: "browser",
        },
      }),
    ).toThrow("Browser fetch mode only supports HTML/JSON-LD sources");
  });

  it("accepts source-backed hours and commercial actions", () => {
    const parsed = restaurantOnboardingManifestSchema.parse({
      ...validManifest,
      hoursSource: {
        url: "https://example.com/",
        timeZone: "Europe/Oslo",
        checkIntervalMinutes: 720,
        minimumExpectedIntervals: 5,
      },
      actions: [
        {
          type: "booking",
          url: "https://example.com/booking",
          sourceUrl: "https://example.com/booking",
        },
      ],
    });
    expect(parsed.hoursSource?.timeZone).toBe("Europe/Oslo");
    expect(parsed.actions[0]).toMatchObject({ type: "booking", provider: null });
  });

  it("requires HTTPS sources and explicit dish smoke assertions", () => {
    expect(() =>
      restaurantOnboardingManifestSchema.parse({
        ...validManifest,
        menuSource: { ...validManifest.menuSource, url: "http://example.com/menu" },
      }),
    ).toThrow();
    expect(() =>
      restaurantOnboardingManifestSchema.parse({
        ...validManifest,
        hoursSource: {
          url: "http://example.com/",
          timeZone: "Europe/Oslo",
          checkIntervalMinutes: 720,
          minimumExpectedIntervals: 5,
        },
      }),
    ).toThrow();
    expect(() =>
      restaurantOnboardingManifestSchema.parse({
        ...validManifest,
        qualityAssertions: { requiredDishNames: [] },
      }),
    ).toThrow();
  });
});
