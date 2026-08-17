import { describe, expect, it } from "vitest";
import { renderQualityDashboardMarkdown } from "./quality-dashboard-markdown.js";
import type { QualityDashboardReport } from "./quality-dashboard.js";

describe("quality dashboard markdown", () => {
  it("renders health, matching quality, current fuzzy replay, demand and zero-result coverage signals", () => {
    const report: QualityDashboardReport = {
      generatedAt: "2026-08-17T08:00:00.000Z",
      totals: {
        activeRestaurants: 2,
        candidateRestaurants: 0,
        menuSources: 2,
        healthyMenuSources: 2,
        degradedMenuSources: 0,
        currentMenuItems: 36,
        zeroResultSearches7d: 3,
        conversions7d: 4,
      },
      restaurants: [
        {
          restaurantId: "restaurant-1",
          slug: "rodeo-oslo",
          name: "Rodeo",
          active: true,
          city: "Oslo",
          menuSources: [
            {
              sourceId: "source-1",
              url: "https://example.com/menu",
              enabled: true,
              health: "healthy",
              currentItemCount: 16,
              lastCheckedAt: "2026-08-17T07:55:00.000Z",
              lastChangedAt: "2026-08-16T20:00:00.000Z",
              freshUntil: "2026-08-18T07:55:00.000Z",
              nextCheckAt: "2026-08-17T13:55:00.000Z",
              consecutiveFailures: 0,
              lastOutcome: "unchanged",
              lastErrorCode: null,
            },
          ],
          hours: {
            sourceUrl: "https://example.com/",
            health: "healthy",
            intervalCount: 5,
            lastCheckedAt: "2026-08-17T07:50:00.000Z",
            freshUntil: "2026-08-18T07:50:00.000Z",
            nextCheckAt: "2026-08-17T19:50:00.000Z",
            consecutiveFailures: 0,
            lastOutcome: "unchanged",
            lastErrorCode: null,
          },
          actions: [
            {
              type: "booking",
              enabled: true,
              expiresAt: "2026-09-01T00:00:00.000Z",
              status: "verified",
            },
          ],
          impressions7d: 9,
          conversions7d: 4,
        },
      ],
      topZeroResultQueries7d: [
        {
          normalizedQuery: "ramen | spicy",
          count7d: 3,
          lastSeenAt: "2026-08-17T07:59:00.000Z",
        },
      ],
      matching: {
        impressions7d: 20,
        byMatchType: {
          exact: 8,
          canonical: 4,
          prefix: 3,
          contains: 3,
          fuzzy: 2,
        },
        canonicalConcepts: [
          {
            slug: "beef-tartare",
            canonicalName: "Biff tartar",
            queryAliases: ["beef tartare", "biff tartar", "steak tartare", "tartar av okse"],
            menuAliases: ["beef tartare", "biff tartar", "tartar av okse"],
            currentMenuItemMatches: 1,
            canonicalImpressions7d: 4,
          },
        ],
        topCanonicalQueries7d: [
          {
            normalizedQuery: "beef tartare",
            canonicalDishSlug: "beef-tartare",
            canonicalDishName: "Biff tartar",
            searches7d: 2,
            impressions7d: 2,
            averageScore: 0.98,
          },
        ],
        topFuzzyQueries7d: [
          {
            normalizedQuery: "bif tartar",
            city: "Oslo",
            searches7d: 2,
            impressions7d: 2,
            averageScore: 0.82,
            bestScore: 0.84,
            currentResolution: null,
          },
          {
            normalizedQuery: "shoyu ramen",
            city: "Oslo",
            searches7d: 3,
            impressions7d: 6,
            averageScore: 0.38,
            bestScore: 0.44,
            currentResolution: "exact",
          },
        ],
      },
    };

    const markdown = renderQualityDashboardMarkdown(report);
    expect(markdown).toContain("Active restaurants: **2**");
    expect(markdown).toContain("Rodeo");
    expect(markdown).toContain("✅ healthy · 16 items");
    expect(markdown).toContain("✅ booking");
    expect(markdown).toContain("Matching quality, 7d");
    expect(markdown).toContain("Canonical: **4** (20.0%)");
    expect(markdown).toContain("Biff tartar (`beef-tartare`)");
    expect(markdown).toContain("beef tartare");
    expect(markdown).toContain("Fuzzy queries til manuell vurdering");
    expect(markdown).toContain("bif tartar");
    expect(markdown).toContain("Oslo");
    expect(markdown).toContain("Historiske fuzzy-signaler løst av dagens indeks");
    expect(markdown).toContain("shoyu ramen");
    expect(markdown).toContain("✅ exact");
    expect(markdown).toContain("Replay bruker bare dagens sikre exact/canonical/prefix/contains-treff");
    expect(markdown).toContain("ramen \\| spicy");
    expect(markdown).toContain("ingen IP-adresser");
  });
});
