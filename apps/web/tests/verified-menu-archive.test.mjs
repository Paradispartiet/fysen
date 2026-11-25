import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import process from "node:process";
import { URL } from "node:url";

// Use the same direct TypeScript imports as the other Node 24 web tests.
import * as archiveModule from "../lib/verified-menu-archive.ts";
import { parseNordicMenuPrice } from "../../menu-worker/src/nordic-menu-price.ts";

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

test("archive keeps the second source price for multiple-price dishes", () => {
  const withVariants = JSON.parse(JSON.stringify(index));
  withVariants.items[1][4] = "multiple";
  withVariants.items[1][5] = 30000;
  const archive = archiveModule.parsePublicMenuArchive(metadata, withVariants);
  const item = archiveModule.searchPublicMenuArchive(archive, "ramen")
    .find((result) => result.restaurantSlug === "king-falafel-brugata-oslo");
  assert.equal(item?.priceMinor, 20000);
  assert.equal(item?.priceMaxMinor, 30000);
  assert.equal(item?.priceKind, "multiple");
});

test("quarantine metadata is mandatory", () => {
  assert.throws(
    () => archiveModule.parsePublicMenuArchive({ ...metadata, sourceQuarantines: {} }, index),
    /quarantine/u,
  );
});

test("quarantine must identify the restaurant at its exact source index", () => {
  const misidentified = {
    ...metadata,
    sourceQuarantines: {
      0: { slug: "king-falafel-brugata-oslo", code: "identity-unverified" },
    },
  };
  assert.throws(
    () => archiveModule.parsePublicMenuArchive(misidentified, index),
    /quarantine.*identity/u,
  );

  const movedSource = JSON.parse(JSON.stringify(index));
  movedSource.sources[0][0] = 1;
  assert.throws(
    () => archiveModule.parsePublicMenuArchive(metadata, movedSource),
    /quarantine.*identity/u,
  );

  // Numeric spellings such as "00" must not create ambiguous references.
  const malformedIndex = {
    ...metadata,
    sourceQuarantines: {
      "00": { slug: "falafel-station-brugata-oslo", code: "identity-unverified" },
    },
  };
  assert.throws(
    () => archiveModule.parsePublicMenuArchive(malformedIndex, index),
    /Invalid public archive quarantine/u,
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

test("the current public Free archive passes integrity and quarantine checks", {
  skip: process.env.FYSEN_ARCHIVE_LIVE_PROOF !== "1",
}, async () => {
  const archive = await archiveModule.getPublicMenuArchive();
  assert.ok(archive.restaurants.length > 900);
  assert.ok(archive.items.length > 40_000);
  assert.ok(archive.quarantinedSourceIndices.size >= 4);
  const matches = archiveModule.searchPublicMenuArchive(archive, "ramen", "Oslo");
  assert.ok(matches.length > 0);
  for (const result of matches) {
    assert.ok(!archive.quarantinedSlugs.has(result.restaurantSlug));
    assert.ok(result.observedAt.startsWith("2026-"));
  }
});

test("archive browse offers historical dishes without quarantined restaurants", () => {
  const archive = archiveModule.parsePublicMenuArchive(metadata, index);
  const dishes = archiveModule.browseArchivedMenuDishes(archive, "Oslo");
  assert.equal(dishes[0]?.query, "ramen");
  assert.equal(dishes[0]?.restaurantCount, 2);
  assert.equal(dishes[0]?.newestObservedAt, "2026-11-04T12:00:00Z");
  assert.equal(dishes[1]?.query, "spicy ramen");
  assert.equal(dishes[1]?.restaurantCount, 1);
  assert.deepEqual(archiveModule.browseArchivedMenuDishes(archive, "Bergen"), []);
  assert.deepEqual(archiveModule.browseArchivedMenuDishes(archive, "Oslo", 0), []);
});

test("a successful empty live API response still exposes the historical menu route", () => {
  const search = readFileSync(new URL("../app/search/page.tsx", import.meta.url), "utf8");
  const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  const preview = readFileSync(new URL("../components/static-preview-search-page.tsx", import.meta.url), "utf8");
  const archivedView = readFileSync(new URL("../components/verified-menu-archive-view.tsx", import.meta.url), "utf8");
  assert.match(search, /searchPublicMenuArchive\(archive, q, city, Infinity\)/u);
  assert.match(search, /archive=\{archive\}/u);
  assert.match(home, /browseData\.dishes\.length === 0/u);
  assert.match(home, /reconcileMenuVersions\(stored, browseData\?\.menuVersions/u);
  assert.match(preview, /response\.browse\?\.dishes\.length === 0/u);
  assert.match(preview, /response\.search\?\.results\.length === 0/u);
  assert.match(archivedView, /browseArchivedMenuDishes\(archive, city, 48\)/u);
  assert.match(archivedView, /Alle retter i \{city\}/u);
  assert.match(archivedView, /Finn retten/u);
  assert.doesNotMatch(archivedView, /arkivtreff|Meny sist kontrollert|Fersksøket har ingen treff/u);
});


test("full archive search returns all 35 restaurants even with old menus", () => {
  const archive = {
    archiveDate: "2026-11-02", lastRefreshAt: null,
    restaurants: Array.from({ length: 35 }, (_, i) => ["Bistro " + i, "bistro-" + i, "Gate " + i, "Oslo", ""]),
    sources: Array.from({ length: 35 }, (_, i) => [i, "https://example.org/" + i, "2020-01-01T00:00:00Z"]),
    items: Array.from({ length: 35 }, (_, i) => [i, "Ramen", "ramen", 20000, "exact", null, "NOK", ""]),
    quarantinedSourceIndices: new Set(), quarantinedSlugs: new Set(),
  };
  const complete = archiveModule.searchPublicMenuArchive(archive, "ramen", "Oslo", Infinity);
  assert.equal(complete.length, 35);
  assert.equal(new Set(complete.map((item) => item.restaurantSlug)).size, 35);
  assert.equal(archiveModule.searchPublicMenuArchive(archive, "ramen").length, 20);
});

test("newer full menu suppresses a removed dish even when the live search returns no dish matches", () => {
  const archive = archiveModule.parsePublicMenuArchive(metadata, index);
  const selected = archiveModule.reconcileMenuVersions(archive, [{
    restaurantSlug: "king-falafel-brugata-oslo", restaurantId: "live-king",
    observedAt: "2026-11-25T12:00:00Z",
  }]);
  const matches = archiveModule.searchPublicMenuArchive(selected.archive, "ramen", "Oslo", Infinity);
  assert.ok(!matches.some((match) => match.restaurantSlug === "king-falafel-brugata-oslo"));
  assert.ok(matches.some((match) => match.restaurantSlug === "another-ramen-place-oslo"));
  assert.ok(!selected.suppressedLiveIds.has("live-king"));
});

test("newer archive menu replaces the older live version regardless of searched dish", () => {
  const archive = archiveModule.parsePublicMenuArchive(metadata, index);
  const selected = archiveModule.reconcileMenuVersions(archive, [{
    restaurantSlug: "king-falafel-brugata-oslo", restaurantId: "live-king",
    observedAt: "2020-01-01T12:00:00Z",
  }]);
  assert.ok(selected.suppressedLiveIds.has("live-king"));
  assert.ok(archiveModule.searchPublicMenuArchive(selected.archive, "ramen", "Oslo", Infinity).some((match) => match.restaurantSlug === "king-falafel-brugata-oslo"));
});

test("only the most recent complete menu for a restaurant is used within the archive", () => {
  const original = archiveModule.parsePublicMenuArchive(metadata, index);
  const withReplacement = {
    ...original,
    sources: [...original.sources, [1, "https://example.org/new-menu", "2026-11-25T00:00:00Z"]],
    items: [...original.items, [3, "Pizza", "pizza", 20000, "exact", null, "NOK", ""]],
  };
  const selected = archiveModule.reconcileMenuVersions(withReplacement, []);
  assert.ok(!archiveModule.searchPublicMenuArchive(selected.archive, "ramen", "Oslo", Infinity)
    .some((match) => match.restaurantSlug === "king-falafel-brugata-oslo"));
  assert.ok(archiveModule.searchPublicMenuArchive(selected.archive, "pizza", "Oslo", Infinity)
    .some((match) => match.restaurantSlug === "king-falafel-brugata-oslo"));
});

test("v2 Nordic archive isolates cities, preserves local currencies and supports city aliases", () => {
  const nordic = [ ["København", "DKK"], ["Stockholm", "SEK"], ["Helsinki", "EUR"] ];
  const mixed = JSON.parse(JSON.stringify(index));
  mixed.version = 2;
  mixed.items = mixed.items.map((row) => [...row, "NOK"]);
  for (const [city, currency] of nordic) {
    const restaurant = mixed.restaurants.length;
    const source = mixed.sources.length;
    mixed.restaurants.push(["Fixture " + city, "fixture-" + city, "Test 1", city, ""]);
    mixed.sources.push([restaurant, "https://example.org/" + source, "2026-11-10T12:00:00Z"]);
    mixed.items.push([source, "Ramen", "ramen", 1500, "exact", null, "", "", currency]);
  }
  const manifest = { ...metadata, version: 2, restaurants: mixed.restaurants.length, sources: mixed.sources.length, dishes: mixed.items.length };
  const archive = archiveModule.parsePublicMenuArchive(manifest, mixed);
  for (const [city, currency] of nordic) {
    const results = archiveModule.searchPublicMenuArchive(archive, "ramen", city);
    assert.equal(results.length, 1);
    assert.equal(results[0].currency, currency);
    assert.equal(results[0].priceMinor, 1500);
    assert.equal(archiveModule.browseArchivedMenuDishes(archive, city)[0].restaurantCount, 1);
    assert.equal(archiveModule.archiveHasCity(archive, city), true);
  }
  assert.equal(archiveModule.searchPublicMenuArchive(archive, "ramen", "Copenhagen")[0].currency, "DKK");
  assert.equal(archiveModule.searchPublicMenuArchive(archive, "ramen", "Helsingfors")[0].currency, "EUR");
  assert.equal(archiveModule.searchPublicMenuArchive(archive, "ramen", "Oslo").length, 3);
  assert.equal(archiveModule.archiveHasCity(archive, "Bergen"), false);
  mixed.items.at(-1)[8] = "NOK";
  assert.throws(() => archiveModule.parsePublicMenuArchive(manifest, mixed), /currency/u);
  mixed.items.at(-1).pop();
  assert.throws(() => archiveModule.parsePublicMenuArchive(manifest, mixed), /currency/u);
  const legacy = archiveModule.parsePublicMenuArchive(metadata, index);
  assert.equal(archiveModule.archiveHasCity(legacy, "Stockholm"), false);
  assert.equal(archiveModule.searchPublicMenuArchive(legacy, "ramen")[0].currency, "NOK");
});

test("reviewed Nordic pilot dishes reach the real archive search without entering production", () => {
  const review = JSON.parse(readFileSync(new URL("../../../docs/nordic-pilot-reviewed-food-menus.json", import.meta.url), "utf8"));
  const identity = JSON.parse(readFileSync(new URL("../../../docs/nordic-pilot-source-review.json", import.meta.url), "utf8"));
  assert.equal(review.status, "review-only-not-runtime");
  const mixed = JSON.parse(JSON.stringify(index));
  mixed.version = 2;
  mixed.items = mixed.items.map((row) => [...row, "NOK"]);
  let reviewedCount = 0;
  for (const menu of review.menus) {
    const restaurant = identity.restaurants.find((r) => r.slug === menu.restaurantSlug);
    assert.ok(restaurant);
    assert.equal(restaurant.currency, menu.currency);
    assert.equal(restaurant.city, menu.city);
    const restaurantIndex = mixed.restaurants.length;
    mixed.restaurants.push([restaurant.name, restaurant.slug, restaurant.address, restaurant.city, ""]);
    const sourceIds = new Map();
    for (const dish of menu.items) {
      assert.equal(dish.publishEligible, false);
      const price = parseNordicMenuPrice(dish.priceField, menu.currency);
      assert.ok(price, dish.name);
      const sourceUrl = dish.sourceUrl ?? menu.source;
      let sourceIndex = sourceIds.get(sourceUrl);
      if (sourceIndex === undefined) {
        sourceIndex = mixed.sources.length;
        sourceIds.set(sourceUrl, sourceIndex);
        mixed.sources.push([restaurantIndex, sourceUrl, review.reviewDate]);
      }
      mixed.items.push([sourceIndex, dish.name, archiveModule.normalizeArchiveQuery(dish.name),
        price.priceMinor, price.priceKind, price.priceMaxMinor, "", "", price.currency]);
      reviewedCount++;
    }
  }
  assert.equal(reviewedCount, 124);
  const manifest = { ...metadata, version: 2, restaurants: mixed.restaurants.length,
    sources: mixed.sources.length, dishes: mixed.items.length };
  const archive = archiveModule.parsePublicMenuArchive(manifest, mixed);
  for (const menu of review.menus) {
    assert.ok(archiveModule.archiveHasCity(archive, menu.city));
    assert.equal(archiveModule.browseArchivedMenuDishes(archive, menu.city, 100).length, menu.items.length);
    for (const dish of menu.items) {
      const price = parseNordicMenuPrice(dish.priceField, menu.currency);
      const query = archiveModule.normalizeArchiveQuery(dish.name);
      const result = archiveModule.searchPublicMenuArchive(archive, query, menu.city)
        .find((r) => r.name === dish.name && r.restaurantSlug === menu.restaurantSlug);
      assert.ok(result, menu.city + ": " + dish.name);
      assert.equal(result.priceMinor, price.priceMinor);
      assert.equal(result.priceMaxMinor, price.priceMaxMinor);
      assert.equal(result.currency, menu.currency);
      assert.equal(result.sourceUrl, dish.sourceUrl ?? menu.source);
      assert.equal(result.observedAt, review.reviewDate);
      for (const other of review.menus.filter((m) => m.city !== menu.city)) {
        assert.ok(archiveModule.searchPublicMenuArchive(archive, query, other.city)
          .every((r) => r.restaurantSlug !== menu.restaurantSlug));
      }
    }
  }
  assert.equal(archiveModule.searchPublicMenuArchive(archive, "ramen", "Oslo").length, 3);
  assert.equal(archiveModule.archiveHasCity(archive, "Bergen"), false);
});
