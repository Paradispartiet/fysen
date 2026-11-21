import "reflect-metadata";
import { createHash } from "node:crypto";
import { gzipSync } from "node:zlib";
import { Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, type NestFastifyApplication } from "@nestjs/platform-fastify";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { VerifiedPublicArchiveController } from "./verified-public-menu-archive.controller.js";
import { resetVerifiedPublicArchiveCacheForTest } from "./verified-public-menu-archive.js";

@Module({ controllers: [VerifiedPublicArchiveController] })
class ArchiveOnlyTestModule {}

const quarantinedSlugs = [
  "city-work-akersgata-oslo",
  "falafel-station-brugata-oslo",
  "fancii-oslo",
  "ferrys-pizzeria-filipstad-oslo",
];
const index = {
  version: 1,
  archiveDate: "2026-11-02",
  restaurants: [
    ...quarantinedSlugs.map((slug) => ["Unknown", slug, "Testveien 1", "Oslo", ""]),
    ["Ramenhuset", "ramenhuset-oslo", "Storgata 1", "Oslo", ""],
  ],
  sources: [
    ...quarantinedSlugs.map((_, i) => [i, "https://example.org/quarantine" + i, "2026-11-01T12:00:00Z"]),
    [4, "https://example.org/ramen", "2026-11-02T12:00:00Z"],
  ],
  items: [
    ...quarantinedSlugs.map((_, i) => [i, "Ramen", "ramen", 15000, "exact", null, "", ""]),
    [4, "Ramen", "ramen", 19000, "exact", null, "", ""],
  ],
};
const compressed = gzipSync(Buffer.from(JSON.stringify(index)));
const metadata = {
  version: 1,
  archiveDate: index.archiveDate,
  lastRefreshAt: "2026-11-08T00:00:00Z",
  restaurants: index.restaurants.length,
  sources: index.sources.length,
  dishes: index.items.length,
  sourceQuarantines: Object.fromEntries(quarantinedSlugs.map((slug, i) =>
    [String(i), { code: "identity-unverified", slug }])),
  bytes: compressed.length,
  sha256: createHash("sha256").update(compressed).digest("hex"),
};

describe("real HTTP routes for archive-only API (no Vercel or Supabase)", () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    resetVerifiedPublicArchiveCacheForTest();
    app = await NestFactory.create<NestFastifyApplication>(
      ArchiveOnlyTestModule, new FastifyAdapter(), { logger: false },
    );
    app.setGlobalPrefix("v1");
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterEach(async () => {
    vi.unstubAllGlobals();
    resetVerifiedPublicArchiveCacheForTest();
    await app.close();
  });

  it("serves real browse/search/status HTTP responses from checksum-proven archive bytes", async () => {
    const fetchMock = vi.fn(async (input: string) => {
      if (String(input).endsWith("manifest.json")) {
        return { ok: true, json: async () => metadata };
      }
      if (String(input).includes("index.json.gz?sha256=" + metadata.sha256)) {
        return {
          ok: true,
          arrayBuffer: async () => compressed.buffer.slice(
            compressed.byteOffset, compressed.byteOffset + compressed.byteLength),
        };
      }
      throw new Error("Unexpected network access: " + String(input));
    });
    vi.stubGlobal("fetch", fetchMock);

    const search = await app.inject({
      method: "GET", url: "/v1/dishes/archive/search?q=ramen&city=Oslo&limit=10",
    });
    expect(search.statusCode).toBe(200);
    const found = search.json();
    expect(found.source).toBe("verified-menu-archive");
    expect(found.realtime).toBe(false);
    expect(found.results).toHaveLength(1);
    expect(found.results[0].restaurant.slug).toBe("ramenhuset-oslo");
    expect(found.results[0].menu.observedAt).toBe("2026-11-02T12:00:00Z");
    expect(found.results[0]).not.toHaveProperty("menuItemId");

    const empty = await app.inject({
      method: "GET", url: "/v1/dishes/archive/search?q=pho&city=Oslo&limit=10",
    });
    expect(empty.statusCode).toBe(200);
    expect(empty.json().results).toEqual([]);

    const browse = await app.inject({
      method: "GET", url: "/v1/dishes/archive/browse?city=Oslo",
    });
    expect(browse.statusCode).toBe(200);
    expect(browse.json().dishes[0].restaurantCount).toBe(1);

    const status = await app.inject({ method: "GET", url: "/v1/dishes/archive/status" });
    expect(status.statusCode).toBe(200);
    expect(status.json().identityQuarantines).toBe(4);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("rejects distance search and fails closed on invalid archive checksum", async () => {
    const rejected = await app.inject({
      method: "GET", url: "/v1/dishes/archive/search?q=ramen&city=Oslo&sort=distance&lat=59.9&lon=10.7",
    });
    expect(rejected.statusCode).toBe(400);

    vi.stubGlobal("fetch", vi.fn(async (input: string) => {
      if (String(input).endsWith("manifest.json")) {
        return { ok: true, json: async () => metadata };
      }
      return { ok: true, arrayBuffer: async () => new TextEncoder().encode("bad archive").buffer };
    }));
    const broken = await app.inject({
      method: "GET", url: "/v1/dishes/archive/search?q=ramen&city=Oslo",
    });
    expect(broken.statusCode).toBe(503);
    expect(broken.json().code).toBe("VERIFIED_MENU_ARCHIVE_UNAVAILABLE");
  });
});
