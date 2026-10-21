import assert from "node:assert/strict";
import test from "node:test";
import { createFavoritesController } from "../src/favorites-controller.ts";
import { favoriteKey, normalizeFavorites, toggleFavorite } from "../src/favorites-model.ts";

const ramen = { name: "Ramen", query: "ramen" };
const sushi = { name: "Sushi", query: "sushi" };

test("favorites validate, deduplicate and cap saved entries at 100", () => {
  const source = [
    ramen,
    { name: "RAMEN", query: " RAMEN " },
    { name: "", query: "sushi" },
    { name: "Missing query", query: "" },
    ...Array.from({ length: 150 }, (_, i) => ({ name: "Rett " + i, query: "rett " + i })),
  ];
  const normalized = normalizeFavorites(source);
  assert.equal(normalized.length, 100);
  assert.equal(normalized[0]?.query, "ramen");
  assert.equal(normalized.filter((entry) => favoriteKey(entry.query) === "ramen").length, 1);
  assert.equal(toggleFavorite([ramen], { name: "Ramen", query: "RAMEN" }).length, 0);
  assert.deepEqual(toggleFavorite([ramen], sushi), [sushi, ramen]);
});

test("favorite taps are disabled while initial storage is loading", async () => {
  let finishLoad;
  const onChange = [];
  const writes = [];
  const controller = createFavoritesController(
    {
      read: () => new Promise((resolve) => { finishLoad = resolve; }),
      write: async (items) => { writes.push([...items]); },
    },
    (snapshot) => onChange.push(snapshot),
    () => assert.fail("No errors expected"),
  );
  const loading = controller.hydrate();
  assert.equal(controller.toggle(ramen), false);
  assert.equal(controller.snapshot().ready, false);
  finishLoad([sushi]);
  await loading;
  assert.deepEqual(controller.snapshot(), { ready: true, items: [sushi] });
  assert.equal(writes.length, 0);
  assert.equal(controller.toggle(ramen), true);
  await controller.flush();
  assert.deepEqual(writes[0], [ramen, sushi]);
  assert.equal(onChange.at(-1).items.length, 2);
});

test("rapid taps persist in strict order, including removal", async () => {
  const writes = [];
  let releaseFirstWrite;
  const controller = createFavoritesController(
    {
      read: async () => [],
      write: async (items) => {
        if (writes.length === 0) await new Promise((resolve) => { releaseFirstWrite = resolve; });
        writes.push(items.map((entry) => entry.query));
      },
    },
    () => {},
    () => assert.fail("No errors expected"),
  );
  await controller.hydrate();
  controller.toggle(ramen);
  controller.toggle(sushi);
  controller.toggle(ramen);
  // Let queued writes start; the first is intentionally held open.
  await Promise.resolve();
  await Promise.resolve();
  assert.equal(writes.length, 0);
  releaseFirstWrite();
  await controller.flush();
  assert.deepEqual(writes, [["ramen"], ["sushi", "ramen"], ["sushi"]]);
  assert.deepEqual(controller.snapshot().items, [sushi]);
});

test("a failed final write reverts to last persisted version", async () => {
  const issues = [];
  const snapshots = [];
  let call = 0;
  const controller = createFavoritesController(
    {
      read: async () => [ramen],
      write: async () => { if (++call === 2) throw new Error("Device storage full"); },
    },
    (snapshot) => snapshots.push(snapshot),
    (issue) => issues.push(issue),
  );
  await controller.hydrate();
  controller.toggle(sushi);
  await controller.flush();
  assert.deepEqual(controller.snapshot().items, [sushi, ramen]);
  controller.toggle(ramen);
  await controller.flush();
  assert.deepEqual(controller.snapshot().items, [sushi, ramen]);
  assert.deepEqual(issues, ["save"]);
  assert.equal(snapshots.at(-1).ready, true);
});

test("load failures still allow favorites to be saved", async () => {
  const issues = [];
  const controller = createFavoritesController(
    {
      read: async () => { throw new Error("Storage unavailable on first read"); },
      write: async () => {},
    },
    () => {},
    (issue) => issues.push(issue),
  );
  await controller.hydrate();
  assert.deepEqual(controller.snapshot(), { ready: true, items: [] });
  assert.equal(controller.toggle(ramen), true);
  await controller.flush();
  assert.deepEqual(issues, ["load"]);
});
