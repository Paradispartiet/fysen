/* End-to-end public Worker API tests against the REAL, verified Fysen archive.
 * Node executes the production Worker module with a read-only SQLite D1 shim.
 * No Cloudflare credentials, no remote deployment, no private data, no writes.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import worker from "../worker.mjs";

const path = process.env.PARADISDB_PUBLIC_SQLITE_PATH || "";
const enabled = path && existsSync(path);
const python = String.raw`import json, pathlib, sqlite3, sys
p=pathlib.Path(sys.argv[1]).resolve()
query=sys.argv[2]
args=json.loads(sys.argv[3])
if not query.lstrip().upper().startswith("SELECT ") or ";" in query:
    raise ValueError("Only one SELECT is allowed through the local D1 compatibility test")
db=sqlite3.connect(p.as_uri() + "?mode=ro", uri=True)
db.row_factory=sqlite3.Row
db.execute("PRAGMA query_only=ON")
rows=[dict(row) for row in db.execute(query,args).fetchall()]
print(json.dumps({"results":rows}, ensure_ascii=False))
`;
function readQuery(sql, params=[]) {
  if (!enabled) throw new Error("Real public SQL fixture has not been imported");
  return JSON.parse(execFileSync("python3", ["-c", python, path, sql, JSON.stringify(params)], {
    encoding: "utf8", maxBuffer: 5 * 1024 * 1024, timeout: 8000
  }));
}
function d1() {
  const sqls = [];
  return {
    sqls,
    PARADISDB_PUBLIC_ENABLED: "true",
    PUBLIC_RATE_LIMITER: { async limit() { return { success: true }; } },
    PUBLIC_DB: {
      prepare(sql) {
        if (!/^\s*SELECT\b/i.test(sql)) throw new Error("Attempt to write in readonly adapter");
        sqls.push(sql);
        return {
          bind(...params) { return { all: async () => readQuery(sql, params) }; },
          all: async () => readQuery(sql)
        };
      }
    }
  };
}
const url = (endpoint) => "https://paradisdb-public.example" + endpoint;
test("real 47k public records: status reflects imported source SHA and row hash", { skip: !enabled }, async () => {
  const env = d1();
  const response = await worker.fetch(new Request(url("/v1/dishes/archive/status")), env);
  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.equal(payload.source, "verified-menu-archive");
  assert.equal(payload.realtime, false);
  assert.equal(payload.restaurants, 973);
  assert.equal(payload.menuItems, 47265);
  assert.equal(payload.identityQuarantines, 4);
  assert.equal(payload.sha256, "42fe1c9b1df7b9aab48fef5965870b580b2d9e7da0a3000f25495d21287a8cbc");
  assert.match(payload.publicRowsSha256, /^[a-f0-9]{64}$/);
  assert.equal(env.sqls.length, 1);
});
test("real 47k public records: query returns verifiable restaurant, date and menu URL", { skip: !enabled }, async () => {
  const env = d1();
  const result = await worker.fetch(new Request(url("/v1/dishes/archive/search?q=ramen&city=Oslo&limit=20")), env);
  assert.equal(result.status, 200);
  const payload = await result.json();
  assert.ok(payload.count > 0 && payload.count <= 20);
  assert.equal(payload.realtime, false);
  assert.equal(payload.archiveDate, "2026-11-02");
  const perRestaurant = new Map();
  for (const r of payload.results) {
    assert.equal(r.restaurant.city, "Oslo");
    assert.ok(r.normalizedName.includes("ramen"));
    assert.match(r.menu.sourceUrl, /^https?:\/\//);
    assert.match(r.menu.observedAt, /^\d{4}-\d{2}-\d{2}/);
    perRestaurant.set(r.restaurant.slug, (perRestaurant.get(r.restaurant.slug) || 0) + 1);
  }
  assert.ok([...perRestaurant.values()].every(count => count <= 2));
  assert.ok(env.sqls.every(q => /^\s*SELECT\b/i.test(q)));
  assert.ok(env.sqls.some(q => q.includes("fysen_public_trigrams")));
});
test("real archive: short unindexed searches are rejected with no D1 read", { skip: !enabled }, async () => {
  const env = d1();
  const response = await worker.fetch(new Request(url("/v1/dishes/archive/search?q=%C3%B8l")), env);
  assert.equal(response.status, 400);
  assert.equal(env.sqls.length, 0);
});
test("real archive: malicious search stays inside parameterized SELECT", { skip: !enabled }, async () => {
  const env = d1();
  const response = await worker.fetch(new Request(url("/v1/dishes/archive/search?q=" + encodeURIComponent("ramen' OR 1=1--"))), env);
  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.equal(payload.count, 0);
  assert.ok(env.sqls.every(sql => /^\s*SELECT\b/i.test(sql)));
  assert.ok(env.sqls.every(sql => !sql.includes("1=1")));
});
test("real public DB cannot expose private documents or accept writes", { skip: !enabled }, async () => {
  const env = d1();
  for (const endpoint of ["/api/aha/documents", "/v1/private", "/admin"]) {
    const r = await worker.fetch(new Request(url(endpoint)), env);
    assert.equal(r.status, 404);
  }
  const r = await worker.fetch(new Request(url("/v1/dishes/archive/search?q=ramen"), { method: "POST" }), env);
  assert.equal(r.status, 405);
  assert.equal(env.sqls.length, 0);
  const tables = readQuery("SELECT name FROM sqlite_master WHERE type='table'").results.map(x=>x.name);
  assert.ok(tables.includes("fysen_public_items"));
  assert.ok(tables.includes("public_archive_meta"));
  assert.ok(tables.includes("fysen_public_trigrams"));
  assert.ok(tables.every(name =>
    name === "fysen_public_items" || name === "public_archive_meta" ||
    name.startsWith("fysen_public_trigrams_") || name === "fysen_public_trigrams"
  ), "Only the public archive and its FTS5 tables may exist");
});
