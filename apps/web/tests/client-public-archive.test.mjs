import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";

const source = readFileSync(new URL("../lib/client-public-archive.ts", import.meta.url), "utf8")
  .replace('import { clientPreviewApiBaseUrl } from "./client-dish-search";',
    'const clientPreviewApiBaseUrl = "https://fysen-api.example";');
const transpiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const archive = await import("data:text/javascript;base64," +
  Buffer.from(transpiled).toString("base64"));

const menuResult = {
  name: "Ramen",
  priceMinor: 19000,
  priceMaxMinor: null,
  priceKind: "exact",
  restaurant: { name: "Ramenhuset", slug: "ramenhuset-oslo", address: "Storgata 1", city: "Oslo" },
  menu: { sourceUrl: "https://example.org/menu", observedAt: "2026-11-18T12:00:00Z" },
};

async function withResponse(body, verify) {
  const previous = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    return { ok: true, json: async () => body };
  };
  try {
    return await verify(calls);
  } finally {
    globalThis.fetch = previous;
  }
}

test("preview browse reads verified archive endpoint and keeps valid empty results", async () => {
  await withResponse({ source: "verified-menu-archive", realtime: false, dishes: [] }, async (calls) => {
    assert.deepEqual(await archive.browsePublicArchiveClient("Oslo"), []);
    assert.equal(calls.length, 1);
    assert.match(calls[0], /\/v1\/dishes\/archive\/browse\?city=Oslo/u);
    assert.doesNotMatch(calls[0], /\/v1\/dishes\/browse\?/u);
  });
});

test("preview search preserves source and price but invents no database ID", async () => {
  await withResponse({
    source: "verified-menu-archive", realtime: false, results: [menuResult],
  }, async (calls) => {
    const result = await archive.searchPublicArchiveClient("ramen", "Oslo");
    assert.equal(result.length, 1);
    assert.equal(result[0].restaurantName, "Ramenhuset");
    assert.equal(result[0].priceMinor, 19000);
    assert.equal(result[0].sourceUrl, "https://example.org/menu");
    assert.equal(result[0].observedAt, "2026-11-18T12:00:00Z");
    assert.ok(!("menuItemId" in result[0]));
    assert.match(calls[0], /\/v1\/dishes\/archive\/search\?/u);
  });
});

test("preview fails closed on unverified provenance, bad price and unsafe sources", async () => {
  const envelope = { source: "verified-menu-archive", realtime: false, results: [menuResult] };
  await withResponse({ ...envelope, realtime: true }, async () => {
    await assert.rejects(archive.searchPublicArchiveClient("ramen", "Oslo"), /provenance/u);
  });
  await withResponse({
    ...envelope, results: [{ ...menuResult, priceMinor: -100 }],
  }, async () => {
    await assert.rejects(archive.searchPublicArchiveClient("ramen", "Oslo"), /menu evidence/u);
  });
  await withResponse({
    ...envelope, results: [{ ...menuResult, menu: { ...menuResult.menu, sourceUrl: "javascript:alert(1)" } }],
  }, async () => {
    await assert.rejects(archive.searchPublicArchiveClient("ramen", "Oslo"), /menu evidence/u);
  });
});
