import { createHash } from "node:crypto";
import { gzipSync } from "node:zlib";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  archivedPublicBrowse,
  archivedPublicSearch,
  getVerifiedPublicArchive,
  normalizeArchiveDishName,
  parseVerifiedPublicArchive,
  resetVerifiedPublicArchiveCacheForTest,
} from "./verified-public-menu-archive.js";
import { VerifiedPublicArchiveController } from "./verified-public-menu-archive.controller.js";

const quarantinedSlugs = [
  "city-work-akersgata-oslo",
  "falafel-station-brugata-oslo",
  "fancii-oslo",
  "ferrys-pizzeria-filipstad-oslo",
] as const;

const rawIndex = {
  version: 1,
  archiveDate: "2026-11-02",
  restaurants: [
    ...quarantinedSlugs.map((slug) => ["Unverified " + slug, slug, "Testveien 1", "Oslo", ""]),
    ["Ramenhuset", "ramenhuset-oslo", "Rådhusgata 2", "Oslo", ""],
    ["Suppehuset", "suppehuset-oslo", "Storgata 4", "Oslo", ""],
  ],
  sources: [
    ...quarantinedSlugs.map((_, i) => [i, "https://example.org/quarantine" + i, "2026-11-05T10:00:00Z"]),
    [4, "https://example.org/ramen", "2026-11-02T12:00:00Z"],
    [5, "https://example.org/suppe", "2026-11-06T12:00:00Z"],
  ],
  items: [
    [0, "Ramen", "ramen", 12000, "exact", null, "", ""],
    [1, "Ramen", "ramen", 13000, "exact", null, "", ""],
    [2, "Ramen", "ramen", 14000, "exact", null, "", ""],
    [3, "Ramen", "ramen", 15000, "exact", null, "", ""],
    [4, "Ramen", "ramen", 19000, "exact", null, "", ""],
    [4, "Spicy ramen", "spicy ramen", 24000, "multiple", 28000, "", ""],
    [5, "Ramen", "ramen", 20000, "exact", null, "", ""],
  ],
};

const metadata = {
  version: 1,
  archiveDate: "2026-11-02",
  lastRefreshAt: "2026-11-08T00:00:00Z",
  restaurants: rawIndex.restaurants.length,
  sources: rawIndex.sources.length,
  dishes: rawIndex.items.length,
  sourceQuarantines: Object.fromEntries(quarantinedSlugs.map((slug, i) => [
    String(i), { code: "identity-unverified", slug },
  ])),
};

afterEach(() => {
  vi.unstubAllGlobals();
  resetVerifiedPublicArchiveCacheForTest();
});

describe("Fysen verified public archive read API", () => {
  it("excludes all four disputed identities and does not fabricate freshness", () => {
    const archive = parseVerifiedPublicArchive(metadata, rawIndex);
    const ramen = archivedPublicSearch(archive, "ramen", "Oslo", 20);
    expect(ramen.source).toBe("verified-menu-archive");
    expect(ramen.realtime).toBe(false);
    expect(ramen.archiveDate).toBe("2026-11-02");
    expect(ramen.lastRefreshAt).toBe("2026-11-08T00:00:00Z");
    expect(ramen.results).toHaveLength(3);
    expect(ramen.results.every((dish) =>
      !quarantinedSlugs.includes(dish.restaurant.slug as typeof quarantinedSlugs[number]))).toBe(true);
    expect(ramen.results.map((r) => r.menu.observedAt)).toContain("2026-11-02T12:00:00Z");
    expect(ramen.results.every((r) => !("freshUntil" in r.menu) && !("openNow" in r.restaurant))).toBe(true);
    expect(ramen.results.find((r) => r.name === "Spicy ramen")?.priceMaxMinor).toBe(28000);
    expect(normalizeArchiveDishName("  RÅMEN!! ")).toBe("råmen");
  });

  it("browse groups verified dishes by distinct restaurants, never by popularity", () => {
    const archive = parseVerifiedPublicArchive(metadata, rawIndex);
    const list = archivedPublicBrowse(archive, "Oslo");
    expect(list.realtime).toBe(false);
    expect(list.count).toBe(2);
    const ramen = list.dishes.find((item) => item.query === "ramen");
    expect(ramen?.restaurantCount).toBe(2);
    expect(ramen?.restaurantExamples).toHaveLength(2);
    expect(list.dishes.every((item) => item.restaurantExamples.every((r) =>
      !quarantinedSlugs.includes(r.slug as typeof quarantinedSlugs[number])))).toBe(true);
    expect(archivedPublicBrowse(archive, "Bergen").dishes).toEqual([]);
    expect(archivedPublicSearch(archive, "ramen", "Bergen").results).toEqual([]);
  });

  it("fails closed on missing quarantines, mismatched slugs, invalid source and count drift", () => {
    expect(() => parseVerifiedPublicArchive({
      ...metadata, sourceQuarantines: {},
    }, rawIndex)).toThrow(/quarantine/u);
    expect(() => parseVerifiedPublicArchive({
      ...metadata, sourceQuarantines: {
        ...metadata.sourceQuarantines,
        0: { code: "identity-unverified", slug: "another-restaurant" },
      },
    }, rawIndex)).toThrow(/quarantine/u);
    expect(() => parseVerifiedPublicArchive(metadata, {
      ...rawIndex, sources: rawIndex.sources.map((r, i) => i === 5
        ? [r[0], "javascript:malicious()", r[2]] : r),
    })).toThrow(/sources/u);
    expect(() => parseVerifiedPublicArchive({ ...metadata, dishes: 999 }, rawIndex))
      .toThrow(/counts/u);
  });

  it("rejects a corrupted compressed blob even if metadata looks valid", async () => {
    const validCompressed = gzipSync(Buffer.from(JSON.stringify(rawIndex)));
    const manifest = {
      ...metadata,
      bytes: validCompressed.length,
      sha256: createHash("sha256").update(validCompressed).digest("hex"),
    };
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => manifest })
      .mockResolvedValueOnce({
        ok: true, arrayBuffer: async () =>
          Buffer.from("not a valid archived menu").buffer,
      });
    vi.stubGlobal("fetch", fetchMock);
    await expect(getVerifiedPublicArchive()).rejects.toThrow(/checksum/u);
  });

  it("loads digest-verified bytes once per cache period and serves source dates", async () => {
    const compressed = gzipSync(Buffer.from(JSON.stringify(rawIndex)));
    const sha256 = createHash("sha256").update(compressed).digest("hex");
    const manifest = { ...metadata, bytes: compressed.length, sha256 };
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => manifest })
      .mockResolvedValueOnce({
        ok: true, arrayBuffer: async () => compressed.buffer.slice(
          compressed.byteOffset, compressed.byteOffset + compressed.byteLength),
      });
    vi.stubGlobal("fetch", fetchMock);
    const first = await getVerifiedPublicArchive();
    expect(await getVerifiedPublicArchive()).toBe(first);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[1]?.[0]).toContain("?sha256=" + sha256);
    const controller = new VerifiedPublicArchiveController();
    const result = await controller.search({ q: "ramen", city: "Oslo", limit: "3" });
    expect(result.results).toHaveLength(3);
    expect(result.results[0]?.menu.observedAt).toBeTruthy();
    const state = await controller.status();
    expect(state.realtime).toBe(false);
    expect(state.identityQuarantines).toBe(4);
    expect(state.menuItems).toBe(7);
  });

  it("rejects location-based archive results rather than inventing coordinates", async () => {
    const controller = new VerifiedPublicArchiveController();
    await expect(controller.search({
      q: "ramen", lat: "59.9", lon: "10.7", sort: "distance",
    })).rejects.toThrow(/distance/u);
    await expect(controller.search({ q: "r" })).rejects.toThrow();
    await expect(controller.browse({ city: ["Oslo", "Bergen"] })).rejects.toThrow();
  });
});
