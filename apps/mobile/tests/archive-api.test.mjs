import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { URL } from "node:url";
import ts from "typescript";

const source = readFileSync(new URL("../src/api.ts", import.meta.url), "utf8");
const js = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const api = await import("data:text/javascript;base64," + Buffer.from(js).toString("base64"));

const item = {
  name: "Ramen",
  normalizedName: "ramen",
  priceMinor: 19500,
  priceMaxMinor: null,
  priceKind: "exact",
  currency: "NOK",
  restaurant: { name: "Ramenhuset", slug: "ramenhuset-oslo", address: "Storgata 1", city: "Oslo" },
  menu: { sourceUrl: "https://example.org/menu", observedAt: "2026-11-01T10:00:00Z" },
};
const envelope = { source: "verified-menu-archive", realtime: false, city: "Oslo" };

test("mobile archive rejects unverified provenance and malformed prices", () => {
  assert.throws(() => api.parseArchivedSearch({ ...envelope, realtime: true, results: [item] }), /kildeinformasjon/u);
  assert.throws(() => api.parseArchivedSearch({ ...envelope, source: "live-db", results: [item] }), /kildeinformasjon/u);
  assert.throws(() => api.parseArchivedSearch({
    ...envelope, results: [{ ...item, priceMinor: -100 }],
  }), /menyinformasjon/u);
  assert.throws(() => api.parseArchivedSearch({
    ...envelope, results: [{ ...item, menu: { ...item.menu, sourceUrl: "javascript:alert(1)" } }],
  }), /menyinformasjon/u);
  assert.deepEqual(api.parseArchivedSearch({ ...envelope, results: [] }).results, []);
});

test("mobile archive preserves source/observation and invents no canonical DB identifiers", () => {
  const parsed = api.parseArchivedSearch({ ...envelope, results: [item] });
  assert.equal(parsed.realtime, false);
  assert.equal(parsed.results[0].priceMinor, 19500);
  assert.equal(parsed.results[0].menu.observedAt, item.menu.observedAt);
  assert.equal(parsed.results[0].menu.sourceUrl, item.menu.sourceUrl);
  assert.equal("menuItemId" in parsed.results[0], false);
  assert.equal("booking" in parsed.results[0], false);
});

test("Matlyst archive counts do not imply real-time popularity", () => {
  const parsed = api.parseArchivedBrowse({ ...envelope, dishes: [
    { name: "Ramen", query: "ramen", restaurantCount: 3 },
  ] });
  assert.equal(parsed.dishes[0].restaurantCount, 3);
  assert.equal(parsed.realtime, false);
  assert.equal("popularDishes" in parsed, false);
});

test("mobile fetches only archive endpoints and keeps empty results empty", async () => {
  const previous = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    return { ok: true, json: async () => calls.length === 1
      ? { ...envelope, results: [] }
      : { ...envelope, dishes: [] } };
  };
  try {
    const search = await api.searchDishes("ramen");
    const browse = await api.loadFeatured();
    assert.deepEqual(search.results, []);
    assert.deepEqual(browse.dishes, []);
    assert.match(calls[0], /\/v1\/dishes\/archive\/search\?/u);
    assert.match(calls[1], /\/v1\/dishes\/archive\/browse\?/u);
    assert.ok(calls.every((url) => !/\/v1\/dishes\/(?:search|browse|featured)\?/u.test(url)));
  } finally {
    globalThis.fetch = previous;
  }
});
