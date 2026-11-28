import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { archivedOsloMapIndex } from "../lib/verified-menu-archive.ts";

test("static map index includes only latest eligible Oslo sources and known catalog identities", () => {
  const archive = {
    version: 1, archiveDate: "2026-11-28", lastRefreshAt: null,
    restaurants: [["A","a","Gate 1","Oslo","NO"],["B","b","Gate 2","Oslo","NO"]],
    sources: [[0,"https://example.org/old","2026-10-01"],[0,"https://example.org/new","2026-11-01"],[1,"https://example.org/b","2026-11-01"],[0,"https://example.org/quarantine","2026-11-27"]],
    items: [[0,"Old","old",10000,"exact",null,"",""],[1,"New Pizza","new pizza",20000,"exact",null,"",""],[1,"New Pizza","new pizza",20000,"exact",null,"",""],[2,"Other","other",30000,"exact",null,"",""],[3,"Bad","bad",10000,"exact",null,"",""]],
    quarantinedSourceIndices: new Set([3]), quarantinedSlugs: new Set(),
  };
  const index = archivedOsloMapIndex(archive, new Set(["a"]));
  assert.equal(index.realtime, false);
  assert.deepEqual(index.groups, [{slug:"a",source:"https://example.org/new",date:"2026-11-01",items:[["New Pizza","new pizza",20000,"exact",null]]}]);
  assert.deepEqual(archivedOsloMapIndex(archive, new Set()).groups, []);
});

test("static and server map flows use shared map component without legacy OSM embed", () => {
  const read = path => readFileSync(new URL(path, import.meta.url), "utf8");
  const results = read("../components/search-results.tsx");
  const preview = read("../components/static-preview-search-page.tsx");
  const staticSearch = read("../components/static-map-dish-search.tsx");
  const menu = read("../components/map-restaurant-menu.tsx");
  const generator = read("../scripts/generate-static-map-menu.mjs");
  assert.match(results, /<RestaurantMap rows=\{mappedRows\}/);
  assert.doesNotMatch(results, /openstreetmap\.org\/export\/embed\.html/);
  assert.match(results, /for \(const result of filteredPrimary\)/);
  assert.match(preview, /<StaticMapDishSearch/);
  assert.match(staticSearch, /loadStaticMapIndex/);
  assert.match(staticSearch, /<RestaurantMap/);
  assert.match(menu, /staticRestaurantMenu\(index, slug\)/);
  assert.match(generator, /getPublicMenuArchive\(\)/);
});
