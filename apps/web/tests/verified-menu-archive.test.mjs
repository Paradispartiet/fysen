import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";

// Exercise the actual server-only archive implementation without network access.
// The web package already depends on TypeScript; no new test package is needed.
const source = readFileSync(new URL("../lib/verified-menu-archive.ts", import.meta.url), "utf8");
const transpiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const archiveModule = await import(
  "data:text/javascript;base64," + Buffer.from(transpiled).toString("base64")
);

const metadata = {
  version: 1,
  archiveDate: "2026-11-02",
  lastRefreshAt: "2026-11-06T01:44:08Z",
  restaurants: 3,
  sources: 3,
  dishes: 4,
  sourceQuarantines: {
    0: { slug: "falafel-station-brugata-oslo", code: "identity-unverified" },
  },
};

const index = {
  version: 1,
  archiveDate: "2026-11-02",
  restaurants: [
    ["Unverified Falafel Station", "falafel-station-brugata-oslo", "Brugata 1", "Oslo", ""],
    ["King Falafel", "king-falafel-brugata-oslo", "Brugata 2", "Oslo", ""],
    ["Another Ramen Place", "another-ramen-place-oslo", "Rettgata 2", "Oslo", ""],
  ],
  sources: [
    [0, "https://example.org/falafel", "2026-11-05T09:00:00Z"],
    [1, "https://example.org/king", "2026-11-02T11:00:00Z"],
    [2, "https://example.org/ramen", "2026-11-04T12:00:00Z"],
  ],
  items: [
    [0, "Ramen", "ramen", 19000, "exact", null, "", ""],
    [1, "Ramen", "ramen", 20000, "exact", null, "", ""],
    [2, "Spicy ramen", "spicy ramen", 24900, "exact", null, "", ""],
    [2, "Ramen", "ramen", 23500, "exact", null, "", ""],
  ],
};

test("archive fallback excludes quarantined identities but preserves King Falafel", () => {
  const archive = archiveModule.parsePublicMenuArchive(metadata, index);
  const matches = archiveModule.searchPublicMenuArchive(archive, "ramen");
  assert.equal(matches.length, 3);
  assert.ok(matches.every((item) => item.restaurantSlug !== "falafel-station-brugata-oslo"));
  assert.ok(matches.some((item) => item.restaurantSlug === "king-falafel-brugata-oslo"));
  assert.ok(matches.some((item) => item.observedAt === "2026-11-02T11:00:00Z"));
  assert.equal(archive.archiveDate, "2026-11-02");
});

test("quarantine metadata is mandatory", () => {
  assert.throws(
    () => archiveModule.parsePublicMenuArchive({ ...metadata, sourceQuarantines: {} }, index),
    /quarantine/u,
  );
});

test("manifest and archive counts must match", () => {
  assert.throws(
    () => archiveModule.parsePublicMenuArchive({ ...metadata, dishes: 5 }, index),
    /mismatch/u,
  );
});

test("archive query filtering does not fabricate matches in another city", () => {
  const archive = archiveModule.parsePublicMenuArchive(metadata, index);
  assert.deepEqual(archiveModule.searchPublicMenuArchive(archive, "r"), []);
  assert.deepEqual(archiveModule.searchPublicMenuArchive(archive, "ramen", "Bergen"), []);
  assert.equal(archiveModule.normalizeArchiveQuery("  RåMEN!!! "), "råmen");
});
