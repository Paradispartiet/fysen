import type { FysenProDashboard } from "@fysen/contracts/fysen-pro";
import { describe, expect, it } from "vitest";
import {
  FYSEN_PRO_DEMAND_GAP_MIN_SEARCHES,
  protectFysenProDashboard,
} from "./fysen-pro.service.js";

function dashboardFixture(): FysenProDashboard {
  return {
    restaurant: { slug: "privacy-test-oslo", name: "Privacy Test", address: "Testgata 1", city: "Oslo" },
    periodDays: 30,
    metrics: {
      impressions: 0,
      clicks: 0,
      ctr: 0,
      clickBreakdown: { menu: 0, restaurant: 0, directions: 0, booking: 0, order: 0 },
    },
    topDishes: [],
    menuSources: [],
    actions: [],
    cityDemandGaps: [
      { query: "one private-ish query", searches7d: 1, signal: "zero_result" },
      { query: "two private-ish query", searches7d: 2, signal: "fuzzy_only" },
      { query: "aggregated market query", searches7d: 3, signal: "zero_and_fuzzy" },
    ],
  };
}

describe("Fysen Pro privacy projection", () => {
  it("does not disclose raw low-volume demand queries to restaurants", () => {
    expect(FYSEN_PRO_DEMAND_GAP_MIN_SEARCHES).toBe(3);
    const protectedDashboard = protectFysenProDashboard(dashboardFixture());
    expect(protectedDashboard.cityDemandGaps).toEqual([
      { query: "aggregated market query", searches7d: 3, signal: "zero_and_fuzzy" },
    ]);
  });
});
