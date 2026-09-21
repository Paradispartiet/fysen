import { describe, expect, it } from "vitest";
import {
  mapWithBoundedConcurrency,
  parseCatalogMaterializationConcurrency,
  shouldRepairCatalogSourceHealth,
} from "./catalog-materialization.js";

describe("catalog materialization concurrency", () => {
  it("defaults to four workers and rejects invalid bounds", () => {
    expect(parseCatalogMaterializationConcurrency(undefined)).toBe(4);
    expect(parseCatalogMaterializationConcurrency(" 3 ")).toBe(3);
    expect(() => parseCatalogMaterializationConcurrency("0")).toThrow(/between 1 and 8/);
    expect(() => parseCatalogMaterializationConcurrency("9")).toThrow(/between 1 and 8/);
    expect(() => parseCatalogMaterializationConcurrency("4x")).toThrow(/integer between 1 and 8/);
  });

  it("preserves result order while never exceeding the worker bound", async () => {
    let active = 0;
    let maxActive = 0;

    const result = await mapWithBoundedConcurrency([0, 1, 2, 3, 4, 5], 3, async (value) => {
      active += 1;
      maxActive = Math.max(maxActive, active);
      await new Promise((resolve) => setTimeout(resolve, 8 + (5 - value)));
      active -= 1;
      return `item-${value}`;
    });

    expect(maxActive).toBe(3);
    expect(result).toEqual(["item-0", "item-1", "item-2", "item-3", "item-4", "item-5"]);
  });
});

describe("catalog source health repair selection", () => {
  const now = Date.parse("2026-09-21T03:00:00.000Z");

  it("repairs missing or failed latest watcher outcomes", () => {
    const base = {
      lastCheckedAt: "2026-09-21T02:00:00.000Z",
      checkIntervalMinutes: 60,
    };

    expect(shouldRepairCatalogSourceHealth(null, now)).toBe(true);
    expect(shouldRepairCatalogSourceHealth({ ...base, latestOutcome: null }, now)).toBe(true);
    expect(shouldRepairCatalogSourceHealth({ ...base, latestOutcome: "fetch_error" }, now)).toBe(true);
    expect(shouldRepairCatalogSourceHealth({ ...base, latestOutcome: "extraction_error" }, now)).toBe(true);
    expect(shouldRepairCatalogSourceHealth({ ...base, latestOutcome: "quarantined" }, now)).toBe(true);
    expect(shouldRepairCatalogSourceHealth({ ...base, latestOutcome: "blocked_by_robots" }, now)).toBe(true);
  });

  it("repairs accepted watcher outcomes once the reconcile freshness window has expired", () => {
    const accepted = ["changed", "unchanged", "not_modified"] as const;

    for (const latestOutcome of accepted) {
      expect(shouldRepairCatalogSourceHealth({
        latestOutcome,
        lastCheckedAt: "2026-09-20T03:00:00.000Z",
        checkIntervalMinutes: 60,
      }, now)).toBe(false);

      expect(shouldRepairCatalogSourceHealth({
        latestOutcome,
        lastCheckedAt: "2026-09-20T02:59:59.999Z",
        checkIntervalMinutes: 60,
      }, now)).toBe(true);
    }
  });

  it("uses three check intervals when that exceeds the one-day freshness floor", () => {
    expect(shouldRepairCatalogSourceHealth({
      latestOutcome: "unchanged",
      lastCheckedAt: "2026-09-19T21:00:00.000Z",
      checkIntervalMinutes: 600,
    }, now)).toBe(false);

    expect(shouldRepairCatalogSourceHealth({
      latestOutcome: "unchanged",
      lastCheckedAt: "2026-09-19T20:59:59.999Z",
      checkIntervalMinutes: 600,
    }, now)).toBe(true);
  });

  it("repairs accepted outcomes with missing or invalid freshness metadata", () => {
    expect(shouldRepairCatalogSourceHealth({
      latestOutcome: "unchanged",
      lastCheckedAt: null,
      checkIntervalMinutes: 60,
    }, now)).toBe(true);
    expect(shouldRepairCatalogSourceHealth({
      latestOutcome: "unchanged",
      lastCheckedAt: "not-a-date",
      checkIntervalMinutes: 60,
    }, now)).toBe(true);
    expect(shouldRepairCatalogSourceHealth({
      latestOutcome: "unchanged",
      lastCheckedAt: "2026-09-21T02:00:00.000Z",
      checkIntervalMinutes: 0,
    }, now)).toBe(true);
  });
});
