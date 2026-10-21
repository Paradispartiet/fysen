import assert from "node:assert/strict";
import test from "node:test";
import {
  createSerialWriter, favoriteKey, normalizeFavorites, toggleFavoriteList,
} from "../src/favorite-state.ts";

const dish = (name) => ({ name, query: name });

test("rapid consecutive favorite changes use latest list without losing earlier taps", () => {
  let items = [];
  items = toggleFavoriteList(items, dish("Ramen"));
  items = toggleFavoriteList(items, dish("Pizza"));
  items = toggleFavoriteList(items, dish("Pho"));
  assert.deepEqual(items.map((x) => x.query), ["Pho", "Pizza", "Ramen"]);
  items = toggleFavoriteList(items, dish("Pizza"));
  assert.deepEqual(items.map((x) => x.query), ["Pho", "Ramen"]);
});

test("saved snapshots are written in tap order even if first save is slow", async () => {
  let releaseFirst = () => undefined;
  const block = new Promise((resolve) => { releaseFirst = resolve; });
  const recorded = [];
  let started = false;
  const writer = createSerialWriter(async (value) => {
    if (!started) {
      started = true;
      await block;
    }
    recorded.push(value);
  });
  const first = writer(["Ramen"]);
  const second = writer(["Ramen", "Pizza"]);
  await Promise.resolve();
  assert.deepEqual(recorded, []);
  releaseFirst();
  await Promise.all([first, second]);
  assert.deepEqual(recorded, [["Ramen"], ["Ramen", "Pizza"]]);
});

test("a rejected storage write does not block the next persisted list", async () => {
  const persisted = [];
  let attempts = 0;
  const writer = createSerialWriter(async (value) => {
    attempts += 1;
    if (attempts === 1) throw new Error("storage temporary unavailable");
    persisted.push(value);
  });
  await assert.rejects(writer(["first"]), /storage temporary unavailable/);
  await writer(["first", "second"]);
  assert.deepEqual(persisted, [["first", "second"]]);
});

test("never evict an older favorite silently when the list is full", () => {
  const full = Array.from({ length: 100 }, (_, i) => dish("dish-" + i));
  assert.equal(toggleFavoriteList(full, dish("new-dish")), full);
  const withOneRemoved = toggleFavoriteList(full, dish("dish-10"));
  assert.equal(withOneRemoved.length, 99);
  assert.equal(withOneRemoved.some((item) => item.query === "dish-10"), false);
});

test("restored favorites are validated and deduplicated by Norwegian keys", () => {
  const items = normalizeFavorites([
    { name: "Ramen", query: " ramen " },
    { name: "RAMEN", query: "RAMEN" },
    { name: "Pho", query: "pho" },
    { name: "Bad", query: "x" },
    null,
  ]);
  assert.deepEqual(items, [{ name: "Ramen", query: "ramen" }, { name: "Pho", query: "pho" }]);
  assert.equal(favoriteKey(" Æble "), "æble");
});
