import { test } from "node:test";
import assert from "node:assert/strict";
import worker from "../worker.mjs";

const URL_BASE = "https://paradisdb-worker.example";
function makeDb({ ready = true, error = false, rows = [], rateAllowed = true } = {}) {
  const sql = [], params = [], rateCalls = [];
  const manifest = {
    public_ready: ready, archiveDate: "2026-11-02",
    lastRefreshAt: "2026-11-12T11:40:54.434Z",
    restaurants: 973, sources: 973, originalItems: 47265,
    publicItems: 47265, quarantinedSources: 4,
    sha256: "42fe1c9b1df7b9aab48fef5965870b580b2d9e7da0a3000f25495d21287a8cbc",
    publicRowsSha256: "b".repeat(64),
  };
  const db = {
    prepare(query) {
      sql.push(query);
      const entry = {
        bind(...values) { params.push(values); return entry; },
        async all() {
          if (error) throw Error("SECRET INTERNAL D1 ERROR");
          if (query.includes("public_archive_meta")) {
            return { results: Object.entries(manifest).map(([key,value]) => ({
              key, value: JSON.stringify(value)
            })) };
          }
          return { results: rows };
        }
      };
      return entry;
    }
  };
  return {
    PUBLIC_DB: db, PARADISDB_PUBLIC_ENABLED: "true",
    PUBLIC_RATE_LIMITER: {
      async limit({ key }) { rateCalls.push(key); return { success: rateAllowed }; }
    },
    sql, params, rateCalls
  };
}
function request(path, method = "GET") {
  return new Request(URL_BASE + path, { method });
}
function row(restaurant_slug, name, price = 17500) {
  return {
    restaurant_name: "Restaurant " + restaurant_slug,
    restaurant_slug, address: "Testgata 1", city: "Oslo",
    dish_name: name, normalized_name: name.toLocaleLowerCase("nb-NO"),
    price_minor: price, price_kind: "exact", price_max_minor: null,
    source_url: "https://restaurant.example/menu", observed_at: "2026-11-11T10:00:00Z"
  };
}
test("public status exposes verifiable archive counts and no private documents", async () => {
  const env = makeDb();
  const response = await worker.fetch(request("/v1/dishes/archive/status"), env);
  assert.equal(response.status, 200);
  const doc = await response.json();
  assert.equal(doc.menuItems, 47265);
  assert.equal(doc.restaurants, 973);
  assert.equal(doc.identityQuarantines, 4);
  assert.equal(doc.realtime, false);
  assert.equal(doc.source, "verified-menu-archive");
  assert.match(doc.sha256, /^[0-9a-f]{64}$/);
  assert.match(doc.publicRowsSha256, /^[0-9a-f]{64}$/);
  assert.equal(env.sql.length, 1);
  assert.deepEqual(env.rateCalls, ["public-status"]);
  assert.match(env.sql[0], /^SELECT /);
  assert.doesNotMatch(JSON.stringify(doc), /auth|token|userId|private|password/i);
});
test("public search preserves source provenance and max-two per restaurant", async () => {
  const env = makeDb({ rows: [
    row("a", "Ramen tofu"), row("a", "Ramen tofu"),
    row("a", "Ramen shoyu"), row("a", "Ramen miso"),
    row("b", "Ramen kylling")
  ] });
  const response = await worker.fetch(request("/v1/dishes/archive/search?q=Ramen&city=Oslo&limit=3"), env);
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.count, 3);
  assert.equal(data.results.filter(r => r.restaurant.slug === "a").length, 2);
  assert.equal(data.results[0].menu.observedAt, "2026-11-11T10:00:00Z");
  assert.equal(data.results[0].menu.sourceUrl, "https://restaurant.example/menu");
  assert.equal(data.results[0].currency, "NOK");
  assert.equal(data.realtime, false);
  assert.deepEqual(env.params[0], ["oslo", "%ramen%", "ramen", "ramen", "ramen"]);
  assert.match(env.sql[1], /fysen_public_trigrams/);
  assert.match(env.sql[1], /tr\.normalized_name LIKE \?/);
  assert.deepEqual(env.rateCalls, ["public-search"]);
});
test("short searches refuse unindexed full scans before touching D1", async () => {
  const env = makeDb({ rows: [row("a", "Øl")] });
  const response = await worker.fetch(request("/v1/dishes/archive/search?q=%C3%B8l"), env);
  assert.equal(response.status, 400);
  assert.equal(env.sql.length, 0);
  assert.equal(env.rateCalls.length, 0);
});

test("malicious input is passed via bound parameter, never interpolated into SQL", async () => {
  const env = makeDb();
  const value = "ramen%27%20OR%201%3D1--";
  const response = await worker.fetch(request("/v1/dishes/archive/search?q=" + value), env);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).count, 0);
  assert.equal(env.sql.length, 2);
  assert.ok(env.params[0][1].includes("or 1 1"));
  assert.ok(!env.sql[1].includes("1=1"));
});
test("rejects invalid search parameters and disallows large reads", async () => {
  for (const path of [
    "/v1/dishes/archive/search?q=x",
    "/v1/dishes/archive/search?q=%C3%B8l",
    "/v1/dishes/archive/search?q=ramen&limit=51",
    "/v1/dishes/archive/search?q=ramen&limit=-1",
    "/v1/dishes/archive/search?q=ramen&limit=1.2",
    "/v1/dishes/archive/search?q=ramen&q=tofu",
    "/v1/dishes/archive/search?q=ramen&extra=foo",
    "/v1/dishes/archive/status?secret=1"
  ]) {
    const env = makeDb();
    const result = await worker.fetch(request(path), env);
    assert.equal(result.status, 400, path);
    assert.equal(env.sql.length, 0, "Invalid requests must not touch D1");
  }
});
test("not-ready and missing D1 bindings fail closed without leaking SQL diagnostics", async () => {
  const incomplete = makeDb({ ready: false });
  assert.equal((await worker.fetch(request("/v1/dishes/archive/status"), incomplete)).status, 503);
  assert.equal(incomplete.sql.length, 1, "Not-ready DB must never be searched");
  assert.equal((await worker.fetch(request("/v1/dishes/archive/status"), {})).status, 503);
  const broken = makeDb({ error: true });
  const result = await worker.fetch(request("/v1/dishes/archive/status"), broken);
  assert.equal(result.status, 503);
  assert.doesNotMatch(await result.text(), /SECRET INTERNAL/i);
});
test("production activation requires explicit switch and rate limiter", async () => {
  const missingSwitch = makeDb();
  delete missingSwitch.PARADISDB_PUBLIC_ENABLED;
  assert.equal((await worker.fetch(request("/v1/dishes/archive/status"), missingSwitch)).status, 503);
  assert.equal(missingSwitch.sql.length, 0);
  assert.equal(missingSwitch.rateCalls.length, 0);
  const missingLimiter = makeDb();
  delete missingLimiter.PUBLIC_RATE_LIMITER;
  assert.equal((await worker.fetch(request("/v1/dishes/archive/search?q=ramen"), missingLimiter)).status, 503);
  assert.equal(missingLimiter.sql.length, 0);
  const limited = makeDb({ rateAllowed: false });
  const blocked = await worker.fetch(request("/v1/dishes/archive/search?q=ramen"), limited);
  assert.equal(blocked.status, 429);
  assert.equal((await blocked.json()).code, "RATE_LIMITED");
  assert.deepEqual(limited.rateCalls, ["public-search"]);
  assert.equal(limited.sql.length, 0);
});

test("all private, admin, write and unknown HTTP routes are unreachable", async () => {
  for (const path of [
    "/api/aha/documents", "/v1/private/reading-library",
    "/v1/dishes/archive/import", "/v1/dishes/archive/delete"
  ]) {
    const env = makeDb();
    assert.equal((await worker.fetch(request(path))).status, 404);
  }
  for (const method of ["POST", "PUT", "DELETE", "PATCH"]) {
    const env = makeDb();
    const result = await worker.fetch(request("/v1/dishes/archive/search?q=ramen", method), env);
    assert.equal(result.status, 405);
    assert.equal(result.headers.get("allow"), "GET");
    assert.equal(env.sql.length, 0);
  }
});
test("successful operations issue only SELECT statements", async () => {
  const env = makeDb({rows: [row("a", "Ramen")]});
  await worker.fetch(request("/v1/dishes/archive/status"), env);
  await worker.fetch(request("/v1/dishes/archive/search?q=ramen"), env);
  assert.equal(env.sql.length, 3);
  assert.ok(env.sql.every(q => /^\s*SELECT\b/i.test(q)));
  assert.ok(env.sql.every(q => !/\b(?:INSERT|UPDATE|DELETE|DROP|ALTER|CREATE)\b/i.test(q)));
});
