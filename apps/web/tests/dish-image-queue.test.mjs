import assert from "node:assert/strict";
import test from "node:test";
import { buildImageQueue, readImageQueue, readRegistry } from "../scripts/dish-image-queue.mjs";

const fixtures = {
  catalog: ["pasta", "soup", "new-dish", "extra"].map(id => ({ id, name: id })),
  articles: ["pasta", "soup", "new-dish"],
  aliases: { pasta: "pasta-photo" },
  images: [
    { id: "pasta-photo", atlas: "pasta-thumb.avif", largeViewEnabled: true, largeSource: "pasta-master.avif" },
    { id: "soup-photo", catalogId: "soup", atlas: "soup-thumb.avif" },
    { id: "unrelated", query: "new-dish", atlas: "other.avif" },
  ],
};

test("The image queue uses exact identities and aliases, not menu-name guesses", () => {
  const result = buildImageQueue(fixtures);
  assert.deepEqual(result.articles, { total: 3, master: 1, thumbnail: 1, missing: 1, broken: 0 });
  assert.deepEqual(result.catalog, { total: 4, master: 1, thumbnail: 1, missing: 2, broken: 0 });
  assert.deepEqual(result.queue.map(row => row.id), ["soup", "new-dish", "extra"]);
});

test("Adding a catalog entry automatically adds a single queue item", () => {
  const result = buildImageQueue({ ...fixtures, catalog: [...fixtures.catalog, { id: "new", name: "New" }] });
  assert.equal(result.queue.filter(row => row.id === "new").length, 1);
  assert.equal(result.catalog.total, 5);
});

test("Registering the finished image removes its dish from the production queue", () => {
  const result = buildImageQueue({ ...fixtures, images: [...fixtures.images,
    { id: "new-dish", atlas: "new-thumb.avif", largeSource: "new-master.avif", largeViewEnabled: true }] });
  assert.ok(!result.queue.some(row => row.id === "new-dish"));
  assert.equal(result.articles.master, 2);
});

test("Missing bytes and ambiguous identities cannot count as completed", () => {
  const result = buildImageQueue(fixtures, filename => filename !== "pasta-master.avif");
  assert.equal(result.catalog.broken, 1);
  assert.equal(result.queue[0].id, "pasta");
  assert.throws(() => buildImageQueue({ ...fixtures, images: [...fixtures.images, { id: "other-soup", catalogId: "soup" }] }), /Ambiguous/u);
});

test("Current real catalog and Matleksikon have complete, nonduplicated image queue coverage", () => {
  const input = readRegistry();
  const report = readImageQueue();
  assert.equal(report.catalog.total, input.catalog.length);
  assert.equal(report.articles.total, input.articles.length);
  assert.equal(report.catalog.broken, 0);
  assert.equal(report.queue.length, report.catalog.total - report.catalog.master);
  assert.equal(new Set(report.queue.map(row => row.id)).size, report.queue.length);
  assert.ok(report.articles.total >= 200);
  assert.equal(report.rows.find(row => row.id === "carbonara").imageId, "pasta-carbonara");
  assert.equal(report.rows.find(row => row.id === "pad-thai").imageId, "pad-thai-reker");
});
