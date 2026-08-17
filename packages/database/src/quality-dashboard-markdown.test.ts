import { describe, expect, it } from "vitest";
import { renderQualityDashboardMarkdown } from "./quality-dashboard-markdown.js";
import type { QualityDashboardReport } from "./quality-dashboard.js";

describe("quality dashboard markdown", () => {
  it("renders health, demand and zero-result coverage signals", () => {
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
    };

    const markdown = renderQualityDashboardMarkdown(report);
    expect(markdown).toContain("Active restaurants: **2**");
    expect(markdown).toContain("Rodeo");
    expect(markdown).toContain("✅ healthy · 16 items");
    expect(markdown).toContain("✅ booking");
    expect(markdown).toContain("ramen \\| spicy");
    expect(markdown).toContain("ingen IP-adresser");
  });
});
