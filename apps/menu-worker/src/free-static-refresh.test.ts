import { describe, expect, it } from "vitest";
import type { MenuObservedItem } from "@fysen/menu-core";
import { classifyFreeSourceFailure, findMatchingFreeSourceIndex, prioritizeOneRecoverableFreeQualityFailure, prioritizeUnpublishedMenuMigrations, recordFreeSourceFailure, replaceOneSource, selectBoundedFreeRefreshEntries, type FreeIndex, type FreeSourceFailure } from "./free-static-refresh-core.js";
const baseline: FreeIndex = {
  version: 1, archiveDate: "2026-11-02",
  restaurants: [["Restaurant A", "restaurant-a", "Oslo", "Oslo", ""],
                ["Restaurant B", "restaurant-b", "Oslo", "Oslo", ""]],
  sources: [[0, "https://example.org/a", "2026-11-02T09:00:00Z"],
            [1, "https://example.org/b", "2026-11-02T09:00:00Z"]],
  items: [[0, "Gammel rett", "gammel rett", 10000, "exact", null, "", ""],
          [1, "Bevart rett", "bevart rett", 20000, "exact", null, "", ""]],
};
const item: MenuObservedItem = {
  sourceKey: "a", name: "Ny rett", normalizedName: "ny rett", description: "Nylaget",
  sectionName: "Hovedretter", priceMinor: 15000, currency: "NOK",
  position: 0, extractionMethod: "html_heuristic", confidence: 0.9, sourceExcerpt: null,
};
describe("Free Fysen one-source refresh", () => {
  it("keeps the other restaurant and source unchanged", () => {
    const next = replaceOneSource(baseline, 0, "2026-11-03T04:00:00Z", [item]);
    expect(next.restaurants).toEqual(baseline.restaurants);
    expect(next.sources[0]?.[2]).toBe("2026-11-03T04:00:00Z");
    expect(next.sources[1]).toEqual(baseline.sources[1]);
    expect(next.items.filter((it) => it[0] === 1)).toEqual(baseline.items.filter((it) => it[0] === 1));
    expect(next.items.find((it) => it[0] === 0)?.[1]).toBe("Ny rett");
    expect(baseline.items[0]?.[1]).toBe("Gammel rett");
  });
  it("fails closed on empty menu and invalid source index", () => {
    expect(() => replaceOneSource(baseline, 0, "2026-11-03T04:00:00Z", [])).toThrow();
    expect(() => replaceOneSource(baseline, 2, "2026-11-03T04:00:00Z", [item])).toThrow();
  });
  it("allows a verified menu URL change for one unambiguous restaurant source", () => {
    expect(findMatchingFreeSourceIndex(baseline, "restaurant-a", "https://example.org/a")) .toBe(0);
    expect(findMatchingFreeSourceIndex(baseline, "restaurant-a", "https://example.org/a2")).toBe(0);
    const next = replaceOneSource(baseline, 0, "2026-11-03T05:00:00Z", [item], "https://example.org/a2");
    expect(next.sources[0]?.[1]).toBe("https://example.org/a2");
    expect(baseline.sources[0]?.[1]).toBe("https://example.org/a");
    expect(next.sources[1]).toEqual(baseline.sources[1]);
  });
  it("does not guess between multiple menu sources for one restaurant", () => {
    const multiple: FreeIndex = {
      ...baseline,
      sources: [...baseline.sources, [0, "https://example.org/another-menu", "2026-11-02T09:00:00Z"]],
    };
    expect(findMatchingFreeSourceIndex(multiple, "restaurant-a", "https://example.org/not-yet-known")).toBeNull();
    expect(findMatchingFreeSourceIndex(multiple, "restaurant-a", "https://example.org/a")).toBe(0);
    expect(findMatchingFreeSourceIndex(multiple, "unknown-restaurant", "https://example.org/a")).toBeNull();
    expect(() => replaceOneSource(baseline, 0, "2026-11-03T05:00:00Z", [item], "http://example.org/a2")).toThrow();
  });
  it("limits browsers to one per batch and fills remaining slots with HTTP sources", () => {
    const candidates = [
      [0, { menuSource: { fetchMode: "browser" as const } }],
      [1, { menuSource: { fetchMode: "browser" as const } }],
      [2, { menuSource: { fetchMode: "http" as const } }],
      [3, { menuSource: { fetchMode: "http" as const } }],
    ] as const;
    expect(selectBoundedFreeRefreshEntries(candidates, 3).map(([sourceIndex]) => sourceIndex)).toEqual([0, 2, 3]);
    expect(selectBoundedFreeRefreshEntries(candidates, 2, 0).map(([sourceIndex]) => sourceIndex)).toEqual([2, 3]);
    expect(selectBoundedFreeRefreshEntries(candidates, 4).map(([sourceIndex]) => sourceIndex)).toEqual([0, 2, 3]);
    expect(() => selectBoundedFreeRefreshEntries(candidates, 25)).toThrow();
    expect(() => selectBoundedFreeRefreshEntries(candidates, 3, 2)).toThrow();
  });
  it("prioritizes both browser and HTTP URL migrations before oldest-first unchanged sources", () => {
    const candidates = [
      [2, {menuSource: {fetchMode: "browser" as const, url: "https://example.org/c"}}],
      [3, {menuSource: {fetchMode: "http" as const, url: "https://example.org/d"}}],
      [1, {menuSource: {fetchMode: "http" as const, url: "https://new.example.org/b"}}],
      [0, {menuSource: {fetchMode: "browser" as const, url: "https://menu.example.org/new-a"}}],
    ] as const;
    const sources: FreeIndex["sources"] = [
      [0, "https://old.example.org/a", "2026-11-02T09:00:00Z"],
      [1, "https://example.org/b", "2026-11-02T09:00:00Z"],
      [2, "https://example.org/c", "2026-11-02T09:00:00Z"],
      [3, "https://example.org/d", "2026-11-02T09:00:00Z"],
    ];
    const prioritized = prioritizeUnpublishedMenuMigrations(candidates, sources);
    expect(prioritized.map(([sourceIndex]) => sourceIndex)).toEqual([0, 1, 2, 3]);
    expect(selectBoundedFreeRefreshEntries(prioritized, 2).map(([sourceIndex]) => sourceIndex))
      .toEqual([0, 1]); // Browser + HTTP use the same two-attempt budget.
    // After approval, exact matching URLs return to ordinary age order.
    sources[0] = [0, "https://menu.example.org/new-a", "2026-11-03T08:00:00Z"];
    sources[1] = [1, "https://new.example.org/b", "2026-11-03T08:00:00Z"];
    expect(prioritizeUnpublishedMenuMigrations(candidates, sources).map(([sourceIndex]) => sourceIndex))
      .toEqual([2, 3, 1, 0]);
    // An unknown index must not be treated as a new high-priority migration.
    expect(prioritizeUnpublishedMenuMigrations([
      [99, {menuSource: {fetchMode: "http", url: "https://unknown.example.org/menu"}}],
    ], sources).map(([sourceIndex]) => sourceIndex)).toEqual([99]);
  });

  it("backs off recently attempted URL migrations instead of retrying them every run", () => {
    const candidates = [
      [2, {menuSource: {fetchMode: "http" as const, url: "https://example.org/c"}}],
      [0, {menuSource: {fetchMode: "http" as const, url: "https://example.org/new-a"}}],
      [1, {menuSource: {fetchMode: "browser" as const, url: "https://example.org/new-b"}}],
    ] as const;
    const sources: FreeIndex["sources"] = [
      [0, "https://example.org/a", "2026-11-02T09:00:00Z"],
      [1, "https://example.org/b", "2026-11-02T09:00:00Z"],
      [2, "https://example.org/c", "2026-11-02T09:00:00Z"],
    ];
    const now = Date.parse("2026-11-03T12:00:00Z");
    expect(prioritizeUnpublishedMenuMigrations(candidates, sources, {
      "0": "2026-11-03T11:00:00Z",
      "1": "2026-11-03T07:00:00Z",
    }, now).map(([i]) => i)).toEqual([2, 0, 1]);
    // At the six-hour boundary, migration priority may resume.
    expect(prioritizeUnpublishedMenuMigrations(candidates, sources, {
      "0": "2026-11-03T06:00:00Z",
      "1": "2026-11-03T05:59:59Z",
    }, now).map(([i]) => i)).toEqual([1, 0, 2]);
    expect(selectBoundedFreeRefreshEntries(prioritizeUnpublishedMenuMigrations(candidates, sources), 2).length)
      .toBe(2);
  });
  it("retries only one recently corrected quality failure, preserving the bounded budget", () => {
    const candidates = [
      [0, {menuSource: {fetchMode: "browser" as const}}],
      [1, {menuSource: {fetchMode: "http" as const}}],
      [2, {menuSource: {fetchMode: "http" as const}}],
      [3, {menuSource: {fetchMode: "http" as const}}],
    ] as const;
    const now = Date.parse("2026-11-03T12:00:00Z");
    const failures: Record<string, FreeSourceFailure> = {
      "3": {code:"quality",consecutive:1,lastFailedAt:"2026-11-03T11:55:00Z"},
      "2": {code:"quality",consecutive:1,lastFailedAt:"2026-11-03T11:00:00Z"},
      "1": {code:"http-404",consecutive:1,lastFailedAt:"2026-11-02T12:00:00Z"},
      "99": {code:"quality",consecutive:1,lastFailedAt:"2026-11-02T10:00:00Z"},
    };
    const prioritized = prioritizeOneRecoverableFreeQualityFailure(candidates, failures, now);
    expect(prioritized.map(([i]) => i)).toEqual([2,0,1,3]); // Oldest quality failure wins.
    expect(selectBoundedFreeRefreshEntries(prioritized, 3).map(([i]) => i))
      .toEqual([2,0,1]); // At most 3 requests and one browser.
  });

  it("backs off repeated quality failures and rejects future or invalid failure timestamps", () => {
    const candidates = [
      [0, {menuSource: {fetchMode: "http" as const}}],
      [1, {menuSource: {fetchMode: "http" as const}}],
    ] as const;
    const now = Date.parse("2026-11-03T12:00:00Z");
    const failures: Record<string, FreeSourceFailure> = {
      "1": {code:"quality",consecutive:2,lastFailedAt:"2026-11-03T11:30:00Z"},
    };
    expect(prioritizeOneRecoverableFreeQualityFailure(candidates, failures, now).map(([i])=>i))
      .toEqual([0,1]);
    failures["1"] = {code:"quality",consecutive:2,lastFailedAt:"2026-11-03T06:00:00Z"};
    expect(prioritizeOneRecoverableFreeQualityFailure(candidates, failures, now).map(([i])=>i))
      .toEqual([1,0]);
    failures["1"] = {code:"quality",consecutive:3,lastFailedAt:"2026-11-02T12:01:00Z"};
    expect(prioritizeOneRecoverableFreeQualityFailure(candidates, failures, now).map(([i])=>i))
      .toEqual([0,1]);
    failures["1"] = {code:"quality",consecutive:3,lastFailedAt:"2026-11-02T12:00:00Z"};
    expect(prioritizeOneRecoverableFreeQualityFailure(candidates, failures, now).map(([i])=>i))
      .toEqual([1,0]);
    failures["1"] = {code:"quality",consecutive:1,lastFailedAt:"2026-11-04T12:00:00Z"};
    expect(prioritizeOneRecoverableFreeQualityFailure(candidates, failures, now).map(([i])=>i))
      .toEqual([0,1]);
    failures["1"] = {code:"quality",consecutive:1,lastFailedAt:"invalid"};
    expect(prioritizeOneRecoverableFreeQualityFailure(candidates, failures, now).map(([i])=>i))
      .toEqual([0,1]);
  });

  it("classifies provider failures without storing raw provider responses", () => {
    expect(classifyFreeSourceFailure(new Error("Menu fetch returned HTTP 404"))).toBe("http-404");
    expect(classifyFreeSourceFailure(new Error("HTTP 403 denied"))).toBe("http-error");
    expect(classifyFreeSourceFailure(new Error("Quality check rejected updated menu: mandatory dishes missing"))).toBe("quality");
    expect(classifyFreeSourceFailure(new Error("Source returned no content; old menu retained"))).toBe("no-content");
    expect(classifyFreeSourceFailure(new Error("private token: secret"))).toBe("other");
  });
  it("tracks repeated failures by source and clears them after a verified success", () => {
    const failures: Record<string, FreeSourceFailure> = {};
    expect(recordFreeSourceFailure(failures, 4, "2026-11-03T06:00:00Z", Error("HTTP 404 token=sensitive"))).toBe("http-404");
    expect(recordFreeSourceFailure(failures, 4, "2026-11-03T07:00:00Z", Error("HTTP 404"))).toBe("http-404");
    expect(failures).toEqual({
      "4": {code: "http-404", consecutive: 2, lastFailedAt: "2026-11-03T07:00:00Z"},
    });
    expect(JSON.stringify(failures)).not.toContain("sensitive");
    expect(recordFreeSourceFailure(failures, 4, "2026-11-03T08:00:00Z", Error("Quality check rejected updated menu"))).toBe("quality");
    expect(failures["4"].consecutive).toBe(1);
    delete failures["4"];
    expect(failures).toEqual({});
  });
  it("never publishes unsupported currency or empty names", () => {
    expect(() => replaceOneSource(baseline, 0, "2026-11-03T04:00:00Z", [{...item, currency:"USD"}])).toThrow();
    expect(() => replaceOneSource(baseline, 0, "2026-11-03T04:00:00Z", [{...item, name:""}])).toThrow();
  });
});
