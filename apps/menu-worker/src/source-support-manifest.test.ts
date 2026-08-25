import { describe, expect, it } from "vitest";
import { restaurantOnboardingManifestSchema } from "./onboarding-manifest.js";

const manifest = {
  version: 1,
  restaurant: {
    slug: "support-test-oslo",
    name: "Support Test",
    websiteUrl: "https://restaurant.example/",
    address: "Testgata 1",
    city: "Oslo",
    countryCode: "NO",
    latitude: 59.91,
    longitude: 10.75,
  },
  menuSource: {
    url: "https://restaurant.example/menu",
    sourceType: "html",
    fetchMode: "browser",
    checkIntervalMinutes: 360,
    minimumExpectedItems: 3,
  },
  qualityAssertions: {
    requiredDishNames: ["Testrett"],
  },
} as const;

describe("menu source support origins", () => {
  it("defaults to no cross-origin support", () => {
    const parsed = restaurantOnboardingManifestSchema.parse(manifest);
    expect(parsed.menuSource.sourceSupport).toEqual({
      redirectOrigins: [],
      browserDataOrigins: [],
      browserBlockedOrigins: [],
    });
  });

  it("normalizes exact HTTPS origins and keeps redirect/data purposes separate", () => {
    const parsed = restaurantOnboardingManifestSchema.parse({
      ...manifest,
      menuSource: {
        ...manifest.menuSource,
        sourceSupport: {
          redirectOrigins: ["https://order.example/"],
          browserDataOrigins: ["https://menu-data.example/"],
        },
      },
    });
    expect(parsed.menuSource.sourceSupport).toEqual({
      redirectOrigins: ["https://order.example"],
      browserDataOrigins: ["https://menu-data.example"],
      browserBlockedOrigins: [],
    });
  });

  it("rejects paths, non-HTTPS origins, source-origin duplication and browser data for HTTP mode", () => {
    for (const origin of ["http://order.example", "https://order.example/menu"] as const) {
      expect(() =>
        restaurantOnboardingManifestSchema.parse({
          ...manifest,
          menuSource: {
            ...manifest.menuSource,
            sourceSupport: { redirectOrigins: [origin] },
          },
        }),
      ).toThrow();
    }

    expect(() =>
      restaurantOnboardingManifestSchema.parse({
        ...manifest,
        menuSource: {
          ...manifest.menuSource,
          sourceSupport: { redirectOrigins: ["https://restaurant.example"] },
        },
      }),
    ).toThrow("already allowed");

    expect(() =>
      restaurantOnboardingManifestSchema.parse({
        ...manifest,
        menuSource: {
          ...manifest.menuSource,
          fetchMode: "http",
          sourceSupport: { browserDataOrigins: ["https://data.example"] },
        },
      }),
    ).toThrow("browserDataOrigins require browser fetch mode");
  });

  it("rejects duplicate and overlapping purposes", () => {
    expect(() =>
      restaurantOnboardingManifestSchema.parse({
        ...manifest,
        menuSource: {
          ...manifest.menuSource,
          sourceSupport: {
            redirectOrigins: ["https://order.example", "https://order.example/"],
          },
        },
      }),
    ).toThrow("unique");

    expect(() =>
      restaurantOnboardingManifestSchema.parse({
        ...manifest,
        menuSource: {
          ...manifest.menuSource,
          sourceSupport: {
            redirectOrigins: ["https://order.example"],
            browserDataOrigins: ["https://order.example"],
          },
        },
      }),
    ).toThrow("must not also be listed");
  });
});
