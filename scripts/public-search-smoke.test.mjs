import assert from "node:assert/strict";
import test from "node:test";
import { checkResponse, verifyPublicSearch } from "./public-search-smoke.mjs";
const row = { restaurant: { slug: "valentes-vika-oslo", city: "Oslo" },
  dish: { name: "Valentes Spesial", priceMinor: 39800, currency: "NOK", priceKind: "exact" },
  menu: { sourceUrl: "https://example.org/menu", observedAt: "2026-11-01T08:00:00Z",
    lastCheckedAt: "2026-11-02T08:00:00Z", freshUntil: "2026-11-03T08:00:00Z" },
  match: { type: "exact" } };
const good = { query: "Valentes Spesial", city: "Oslo", count: 1, results: [row] };
test("accepts source-backed public result", () => assert.equal(checkResponse(good).priceMinor, 39800));
test("rejects missing, wrong-priced or sourceless results", () => {
  assert.throws(() => checkResponse({ ...good, count: 0, results: [] }));
  assert.throws(() => checkResponse({ ...good, results: [{ ...row, dish: { ...row.dish, priceMinor: 10 } }] }));
  assert.throws(() => checkResponse({ ...good, results: [{ ...row, menu: { ...row.menu, sourceUrl: "" } }] }));
});
test("hits both production endpoints without retries", async () => {
  const urls = [];
  const proof = await verifyPublicSearch(async url => {
    urls.push(url);
    return { ok: true, json: async () => good };
  });
  assert.deepEqual(proof.proofs.map(p => p.endpoint), ["api", "web-search"]);
  assert.equal(urls.length, 2);
  assert.ok(urls.every(u => u.includes("Valentes+Spesial")));
  await assert.rejects(verifyPublicSearch(async () => ({ ok: false, status: 502 })), /HTTP 502/);
});
