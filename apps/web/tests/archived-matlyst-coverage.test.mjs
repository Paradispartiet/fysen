import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { readFileSync } from "node:fs";
import process from "node:process";
import { test } from "node:test";
import { URL } from "node:url";
import ts from "typescript";

function importTypescript(relativePath) {
  const source = readFileSync(new URL(relativePath, import.meta.url), "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  return import("data:text/javascript;base64," + Buffer.from(transpiled).toString("base64"));
}

const { summarizeArchivedMatlyst } = await importTypescript("../lib/archived-matlyst-coverage.ts");

const descriptors = [
  { id: "ramen", label: "Ramen", query: "ramen", aliases: [] },
  { id: "spicy-ramen", label: "Spicy ramen", query: "spicy ramen", aliases: [] },
  { id: "falafel", label: "Falafel", query: "falafel", aliases: [] },
];

const fixture = {
  archiveDate: "2026-11-02",
  lastRefreshAt: "2026-11-06T01:00:00Z",
  restaurants: [
    ["Disputed", "falafel-station-brugata-oslo", "Brugata 1", "Oslo", ""],
    ["King Falafel", "king-falafel-brugata-oslo", "Brugata 2", "Oslo", ""],
    ["Ramen Corner", "ramen-corner-oslo", "Storgata 2", "Oslo", ""],
    ["Bergen Place", "bergen-restaurant", "Storgata 3", "Bergen", ""],
    ["Changed Source", "fancii-oslo", "Storgata 4", "Oslo", ""],
  ],
  sources: [
    [0, "https://example.org/disputed", "2026-11-06T01:00:00Z"],
    [1, "https://example.org/king", "2026-11-02T01:00:00Z"],
    [2, "https://example.org/ramen", "2026-11-03T01:00:00Z"],
    [3, "https://example.org/bergen", "2026-11-05T01:00:00Z"],
    [4, "https://example.org/changed-menu", "2026-11-06T01:00:00Z"],
  ],
  items: [
    [0, "Ramen", "ramen", 20000, "exact", null, "NOK", ""],
    [0, "Falafel", "falafel", 12000, "exact", null, "NOK", ""],
    [1, "Ramen", "ramen", 20000, "exact", null, "NOK", ""],
    [1, "Ramen", "ramen", 20000, "exact", null, "NOK", ""],
    [2, "Spicy ramen", "spicy ramen", 21000, "exact", null, "NOK", ""],
    [2, "Ramen", "ramen", 19000, "exact", null, "NOK", ""],
    [3, "Ramen", "ramen", 19000, "exact", null, "NOK", ""],
    [4, "Ramen", "ramen", 19000, "exact", null, "NOK", ""],
  ],
  quarantinedSourceIndices: new Set([0]),
  quarantinedSlugs: new Set(["falafel-station-brugata-oslo", "fancii-oslo"]),
};

test("Matlyst counts distinct restaurants from verified menu rows, not menu variants", () => {
  const result = summarizeArchivedMatlyst(fixture, descriptors);
  assert.equal(result.archiveDate, "2026-11-02");
  assert.equal(Object.getPrototypeOf(result.byDish), Object.prototype, "React Server Components require a plain serializable object");
  assert.equal(result.byDish.ramen.restaurantCount, 2);
  assert.deepEqual(
    result.byDish.ramen.restaurantExamples.map((item) => item.id),
    ["king-falafel-brugata-oslo", "ramen-corner-oslo"],
  );
  assert.equal(result.byDish["spicy-ramen"].restaurantCount, 1);
  assert.equal(result.byDish.falafel.restaurantCount, 0);
});

test("Matlyst excludes identity quarantines even after source URL changes", () => {
  const result = summarizeArchivedMatlyst(fixture, descriptors);
  assert.ok(Object.values(result.byDish).every((dish) =>
    dish.restaurantExamples.every((example) =>
      !fixture.quarantinedSlugs.has(example.id)),
  ));
});

test("Matlyst does not treat substring matches as proof of an unrelated dish", () => {
  const result = summarizeArchivedMatlyst(fixture, [
    { id: "ram", label: "Ram", query: "ram", aliases: [] },
    ...descriptors,
  ]);
  assert.equal(result.byDish.ram.restaurantCount, 0);
  assert.equal(result.byDish.ramen.restaurantCount, 2);
});

test("the published public menu archive powers actual homepage restaurant coverage", {
  skip: process.env.FYSEN_ARCHIVE_LIVE_PROOF !== "1",
}, async () => {
  const { getPublicMenuArchive } = await importTypescript("../lib/verified-menu-archive.ts");
  const archive = await getPublicMenuArchive();
  const result = summarizeArchivedMatlyst(archive, descriptors);
  assert.ok(archive.items.length > 40_000);
  assert.ok(result.byDish.ramen.restaurantCount > 0);
  assert.ok(result.byDish.ramen.restaurantExamples.length > 0);
  for (const entry of Object.values(result.byDish)) {
    assert.ok(entry.restaurantExamples.every((example) =>
      !archive.quarantinedSlugs.has(example.id)));
  }
});
