import { describe, expect, it } from "vitest";
import {
  getHoursVerificationStatus,
  isHoursVerificationBlocking,
  restaurantOnboardingManifestSchema,
} from "./onboarding-manifest.js";

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
  it("applies safe defaults for bot identity, fetch mode and quality assertions", () => {
    const parsed = restaurantOnboardingManifestSchema.parse(validManifest);
    expect(parsed.menuSource.userAgent).toBe("FysenMenuBot/0.1");
    expect(parsed.menuSource.fetchMode).toBe("http");
    expect(parsed.actions).toEqual([]);
    expect(parsed.verification).toEqual({});
    expect(getHoursVerificationStatus(parsed)).toBe("verified");
    expect(isHoursVerificationBlocking(parsed)).toBe(true);
    expect(parsed.qualityAssertions.requiredDishVariants).toEqual([]);
    expect(parsed.qualityAssertions.forbiddenDishNames).toEqual([]);
  });

  it("accepts explicit browser fetch for rendered HTML sources", () => {
    const parsed = restaurantOnboardingManifestSchema.parse({
      ...validManifest,
      menuSource: { ...validManifest.menuSource, fetchMode: "browser" },
    });
    expect(parsed.menuSource.fetchMode).toBe("browser");
    expect(parsed.menuSource.sourceType).toBe("html");
  });

  it("accepts HTTP API menu sources and rejects browser API mode", () => {
    const parsed = restaurantOnboardingManifestSchema.parse({
      ...validManifest,
      menuSource: {
        ...validManifest.menuSource,
        url: "https://example.com/api/menu",
        sourceType: "api",
      },
    });
    expect(parsed.menuSource.sourceType).toBe("api");
    expect(parsed.menuSource.fetchMode).toBe("http");

    expect(() =>
      restaurantOnboardingManifestSchema.parse({
        ...validManifest,
        menuSource: {
          ...validManifest.menuSource,
          url: "https://example.com/api/menu",
          sourceType: "api",
          fetchMode: "browser",
        },
      }),
    ).toThrow("Browser fetch mode only supports HTML/JSON-LD sources");
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

  it("accepts generic forbidden dish assertions for parser quality gates", () => {
    const parsed = restaurantOnboardingManifestSchema.parse({
      ...validManifest,
      qualityAssertions: {
        requiredDishNames: ["Spicy Tempura Scampi"],
        forbiddenDishNames: ["SPICY", "VEGETAR"],
      },
    });
    expect(parsed.qualityAssertions.forbiddenDishNames).toEqual(["SPICY", "VEGETAR"]);
  });

  it("accepts strict multiple-price assertions", () => {
    const parsed = restaurantOnboardingManifestSchema.parse({
      ...validManifest,
      qualityAssertions: {
        requiredDishNames: ["Bambus Signatur"],
        requiredDishVariants: [
          {
            name: "Bambus Signatur",
            priceMinor: 28500,
            priceKind: "multiple",
            priceMaxMinor: 30900,
          },
        ],
      },
    });
    expect(parsed.qualityAssertions.requiredDishVariants[0]).toMatchObject({
      priceMinor: 28500,
      priceKind: "multiple",
      priceMaxMinor: 30900,
    });
  });

  it("rejects incomplete or contradictory price semantics assertions", () => {
    expect(() =>
      restaurantOnboardingManifestSchema.parse({
        ...validManifest,
        qualityAssertions: {
          requiredDishNames: ["Bambus Signatur"],
          requiredDishVariants: [{ name: "Bambus Signatur", priceKind: "multiple", priceMinor: 28500 }],
        },
      }),
    ).toThrow("multiple price assertion requires priceMaxMinor");

    expect(() =>
      restaurantOnboardingManifestSchema.parse({
        ...validManifest,
        qualityAssertions: {
          requiredDishNames: ["Bambus Signatur"],
          requiredDishVariants: [
            { name: "Bambus Signatur", priceKind: "multiple", priceMinor: 30900, priceMaxMinor: 28500 },
          ],
        },
      }),
    ).toThrow("priceMaxMinor must be >= priceMinor");

    expect(() =>
      restaurantOnboardingManifestSchema.parse({
        ...validManifest,
        qualityAssertions: {
          requiredDishNames: ["Bambus Signatur"],
          requiredDishVariants: [{ name: "Bambus Signatur", priceKind: "exact", priceMaxMinor: 30900 }],
        },
      }),
    ).toThrow("priceMaxMinor is only valid for multiple price assertions");
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

  it("accepts source-backed hours, explicit scope hints and commercial actions", () => {
    const parsed = restaurantOnboardingManifestSchema.parse({
      ...validManifest,
      hoursSource: {
        url: "https://example.com/",
        timeZone: "Europe/Oslo",
        checkIntervalMinutes: 720,
        minimumExpectedIntervals: 5,
        scopeHints: ["Pizzeria"],
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
    expect(parsed.hoursSource?.scopeHints).toEqual(["Pizzeria"]);
    expect(parsed.actions[0]).toMatchObject({ type: "booking", provider: null });

    const defaulted = restaurantOnboardingManifestSchema.parse({
      ...validManifest,
      hoursSource: {
        url: "https://example.com/",
        timeZone: "Europe/Oslo",
        checkIntervalMinutes: 720,
        minimumExpectedIntervals: 5,
      },
    });
    expect(defaulted.hoursSource?.scopeHints).toEqual([]);
  });

  it("allows explicitly provisional hours without weakening menu assertions", () => {
    const parsed = restaurantOnboardingManifestSchema.parse({
      ...validManifest,
      hoursSource: {
        url: "https://example.com/hours",
        timeZone: "Europe/Oslo",
        checkIntervalMinutes: 360,
        minimumExpectedIntervals: 7,
      },
      verification: {
        hours: {
          status: "provisional",
          checkedAt: "2026-08-19",
          note: "First-party page exposes conflicting opening-hours sections.",
        },
      },
    });
    expect(getHoursVerificationStatus(parsed)).toBe("provisional");
    expect(isHoursVerificationBlocking(parsed)).toBe(false);
    expect(parsed.qualityAssertions.requiredDishNames).toEqual(["Biff tartar"]);
  });

  it("requires an audit note and source for provisional hours, while unverified hours may omit a source", () => {
    expect(() =>
      restaurantOnboardingManifestSchema.parse({
        ...validManifest,
        verification: {
          hours: {
            status: "provisional",
            checkedAt: "2026-08-19",
            note: "Conflicting source.",
          },
        },
      }),
    ).toThrow("Provisional opening hours require an hoursSource");

    const unverified = restaurantOnboardingManifestSchema.parse({
      ...validManifest,
      verification: {
        hours: {
          status: "unverified",
          checkedAt: "2026-08-19",
          note: "No canonical kitchen-hours source is currently available.",
        },
      },
    });
    expect(getHoursVerificationStatus(unverified)).toBe("unverified");
    expect(isHoursVerificationBlocking(unverified)).toBe(false);
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
