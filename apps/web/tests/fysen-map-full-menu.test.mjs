import { test } from "node:test";
import assert from "node:assert/strict";
import { archivedRestaurantMenu } from "../lib/verified-menu-archive.ts";

test("restaurant menu uses only the newest eligible exact identity and excludes quarantined entries", () => {
  const archive = {
    version: 1, archiveDate: "2026-11-28", lastRefreshAt: null,
    restaurants: [["A","a","Gate 1","Oslo"],["B","b","Gate 2","Oslo"]],
    sources: [[0,"https://example.org/old","2026-10-01"],[0,"https://example.org/new","2026-11-01"],[1,"https://example.org/b","2026-11-01"],[0,"https://example.org/quarantine","2026-11-27"]],
    items: [[0,"Old dish","old dish",10000,"exact",null,"",""],[1,"New dish","new dish",20000,"exact",null,"",""],[1,"New dish","new dish",20000,"exact",null,"",""],[2,"Other","other",30000,"exact",null,"",""],[3,"Bad","bad",10000,"exact",null,"",""]],
    quarantinedSourceIndices: new Set([3]), quarantinedSlugs: new Set(["b"]),
  };
  const result = archivedRestaurantMenu(archive, "a");
  assert.deepEqual(result.map(row => [row.name,row.priceMinor,row.observedAt]), [["New dish",20000,"2026-11-01"]]);
  assert.deepEqual(archivedRestaurantMenu(archive,"b"),[]);
  assert.deepEqual(archivedRestaurantMenu(archive,"unknown"),[]);
});
