import { describe, expect, it } from "vitest";
import { restaurantOnboardingManifestSchema } from "./onboarding-manifest.js";
import { createRestaurantVerificationLog } from "./verification-log.js";

function manifest(slug: string, verification?: { status: "provisional" | "unverified"; note: string }) {
  return restaurantOnboardingManifestSchema.parse({
    version: 1,
    restaurant: {
      slug,
      name: slug,
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
      minimumExpectedItems: 1,
    },
    ...(verification?.status === "provisional"
      ? {
          hoursSource: {
            url: "https://example.com/hours",
            timeZone: "Europe/Oslo",
            checkIntervalMinutes: 360,
            minimumExpectedIntervals: 7,
          },
        }
      : {}),
    ...(verification
      ? {
          verification: {
            hours: {
              status: verification.status,
              checkedAt: "2026-08-19",
              note: verification.note,
            },
          },
        }
      : {}),
    qualityAssertions: {
      requiredDishNames: ["Testrett"],
    },
  });
}

describe("restaurant verification log", () => {
  it("lists only explicitly uncertain restaurants in stable slug order", () => {
    const log = createRestaurantVerificationLog([
      manifest("verified-bistro"),
      manifest("zeta-bistro", { status: "unverified", note: "No canonical kitchen-hours source." }),
      manifest("alpha-bistro", { status: "provisional", note: "Conflicting first-party hours sections." }),
    ]);

    expect(log.uncertainCount).toBe(2);
    expect(log.entries.map((entry) => entry.slug)).toEqual(["alpha-bistro", "zeta-bistro"]);
    expect(log.entries[0]?.hours).toEqual({
      status: "provisional",
      checkedAt: "2026-08-19",
      note: "Conflicting first-party hours sections.",
      sourceUrl: "https://example.com/hours",
    });
    expect(log.entries[1]?.hours.sourceUrl).toBeNull();
  });
});
