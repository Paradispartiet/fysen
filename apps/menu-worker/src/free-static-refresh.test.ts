import { describe, expect, it } from "vitest";
import type { MenuObservedItem } from "@fysen/menu-core";
import { findMatchingFreeSourceIndex, replaceOneSource, type FreeIndex } from "./free-static-refresh-core.js";
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
  it("never publishes unsupported currency or empty names", () => {
    expect(() => replaceOneSource(baseline, 0, "2026-11-03T04:00:00Z", [{...item, currency:"USD"}])).toThrow();
    expect(() => replaceOneSource(baseline, 0, "2026-11-03T04:00:00Z", [{...item, name:""}])).toThrow();
  });
});
