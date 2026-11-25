import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
import { createHash } from "node:crypto";
import * as web from "../apps/web/lib/verified-menu-archive.ts";
import * as api from "../apps/api/src/verified-public-menu-archive.ts";

const [originalDir, candidateDir, reportsDir] = process.argv.slice(2);
assert.ok(originalDir && candidateDir && reportsDir);
const readJson = (p) => JSON.parse(readFileSync(p, "utf8"));
function readArchive(dir) {
  const meta = readJson(dir + "/manifest.json");
  const bytes = readFileSync(dir + "/index.json.gz");
  assert.equal(bytes.length, meta.bytes);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), meta.sha256);
  return {meta, index: JSON.parse(gunzipSync(bytes).toString("utf8"))};
}
const original = readArchive(originalDir);
const next = readArchive(candidateDir);
assert.equal(next.meta.version, 2);
assert.equal(next.index.version, 2);
assert.equal(next.meta.restaurants, original.meta.restaurants + 3);
assert.equal(next.meta.sources, original.meta.sources + 15);
assert.equal(next.meta.dishes, original.meta.dishes + 124);
assert.deepEqual(next.meta.sourceQuarantines, original.meta.sourceQuarantines);
for (const key of ["restaurants","sources"]) {
  assert.deepEqual(next.index[key].slice(0, original.index[key].length), original.index[key]);
}
assert.deepEqual(next.index.items.slice(0, original.index.items.length), original.index.items.map((r) => [...r, "NOK"]));
const webArchive = web.parsePublicMenuArchive(next.meta, next.index);
const apiArchive = api.parseVerifiedPublicArchive(next.meta, next.index);
const selected = web.reconcileMenuVersions(webArchive, []).archive;
let checked = 0;
for (const [key, city, currency, slug, count] of [
  ["savotta","Helsinki","EUR","savotta-aleksanterinkatu-helsinki",22],
  ["pelikan","Stockholm","SEK","pelikan-blekingegatan-stockholm",33],
  ["schonnemann","København","DKK","schonnemann-hauser-plads-kobenhavn",69],
]) {
  const report = readJson(reportsDir + "/" + key + ".json");
  assert.equal(report.items.length, count);
  for (const item of report.items) {
    const query = web.normalizeArchiveQuery(item.name);
    const webMatch = web.searchPublicMenuArchive(selected, query, city, Infinity).find((r) => r.name === item.name && r.restaurantSlug === slug);
    const apiMatch = api.archivedPublicSearch(apiArchive, query, city, 50).results.find((r) => r.name === item.name && r.restaurant.slug === slug);
    for (const match of [webMatch, apiMatch]) {
      assert.ok(match, city + ": " + item.name);
      assert.equal(match.priceMinor, item.priceMinor);
      assert.equal(match.priceMaxMinor, item.priceMaxMinor);
      assert.equal(match.currency, currency);
    }
    assert.ok(web.searchPublicMenuArchive(selected, query, "Oslo", Infinity).every((r) => r.restaurantSlug !== slug));
    checked++;
  }
}
assert.equal(checked, 124);
console.log(JSON.stringify({status:"candidate-verified-not-published",preservedOsloRestaurants:original.meta.restaurants,preservedOsloDishes:original.meta.dishes,restaurants:next.meta.restaurants,dishes:next.meta.dishes,sourceQuarantines:Object.keys(next.meta.sourceQuarantines).length,webAndApiVerified:checked},null,2));
