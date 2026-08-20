import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { createDatabasePool, searchDishes } from "../packages/database/dist/index.js";
import { normalizeDishName } from "../packages/menu-core/dist/index.js";

const catalogDirectory = path.resolve("apps/menu-worker/catalog");
const acceptedWatchOutcomes = new Set(["changed", "unchanged", "not_modified"]);
const apiBaseUrl = (process.env.FYSEN_PUBLIC_API_URL?.trim() || "https://fysen-api.vercel.app").replace(/\/$/, "");
const webBaseUrl = (process.env.FYSEN_PUBLIC_WEB_URL?.trim() || "https://fysen-matsgran-8572s-projects.vercel.app").replace(/\/$/, "");

function fail(message, details = null) {
  const suffix = details === null ? "" : `: ${JSON.stringify(details)}`;
  throw new Error(`${message}${suffix}`);
}

async function readCatalog() {
  const fileNames = (await readdir(catalogDirectory))
    .filter((fileName) => fileName.endsWith(".json"))
    .sort((left, right) => left.localeCompare(right, "en"));

  if (fileNames.length === 0) fail("Production catalog is empty");

  const manifests = [];
  const seenSlugs = new Set();
  for (const fileName of fileNames) {
    const manifest = JSON.parse(await readFile(path.join(catalogDirectory, fileName), "utf8"));
    const slug = manifest?.restaurant?.slug;
    const city = manifest?.restaurant?.city;
    const sourceUrl = manifest?.menuSource?.url;
    const minimumExpectedItems = manifest?.menuSource?.minimumExpectedItems;
    if (typeof slug !== "string" || !slug) fail(`Catalog manifest ${fileName} is missing restaurant.slug`);
    if (seenSlugs.has(slug)) fail(`Catalog contains duplicate restaurant slug ${slug}`);
    if (typeof city !== "string" || !city) fail(`Catalog manifest ${fileName} is missing restaurant.city`);
    if (typeof sourceUrl !== "string" || !sourceUrl) fail(`Catalog manifest ${fileName} is missing menuSource.url`);
    if (!Number.isSafeInteger(minimumExpectedItems) || minimumExpectedItems < 1) {
      fail(`Catalog manifest ${fileName} has invalid menuSource.minimumExpectedItems`);
    }
    seenSlugs.add(slug);
    manifests.push({ fileName, slug, city, sourceUrl, minimumExpectedItems });
  }

  return manifests;
}

async function verifyCatalogMaterialization(pool, manifests) {
  const slugs = manifests.map((manifest) => manifest.slug);
  const sourceUrls = manifests.map((manifest) => manifest.sourceUrl);
  const minimumExpectedItems = manifests.map((manifest) => manifest.minimumExpectedItems);

  const result = await pool.query(
    `WITH expected AS (
       SELECT *
         FROM unnest($1::text[], $2::text[], $3::integer[])
           AS expected_row(slug, source_url, minimum_expected_items)
     )
     SELECT expected.slug,
            expected.source_url,
            expected.minimum_expected_items,
            restaurant.id AS restaurant_id,
            restaurant.name AS restaurant_name,
            restaurant.city,
            restaurant.active,
            source.id AS menu_source_id,
            source.enabled AS menu_source_enabled,
            source.last_checked_at,
            source.check_interval_minutes,
            snapshot.id AS snapshot_id,
            snapshot.fetched_at AS snapshot_fetched_at,
            COALESCE((
              SELECT count(*)::integer
                FROM fysen.menu_items AS item
               WHERE item.snapshot_id = snapshot.id
            ), 0) AS item_count,
            watch.outcome AS latest_watch_outcome,
            watch.started_at AS latest_watch_started_at
       FROM expected
       LEFT JOIN fysen.restaurants AS restaurant
         ON restaurant.slug = expected.slug
       LEFT JOIN LATERAL (
         SELECT menu_source.*
           FROM fysen.menu_sources AS menu_source
          WHERE menu_source.restaurant_id = restaurant.id
            AND menu_source.url = expected.source_url
          ORDER BY menu_source.updated_at DESC, menu_source.id
          LIMIT 1
       ) AS source ON true
       LEFT JOIN LATERAL (
         SELECT menu_snapshot.id, menu_snapshot.fetched_at
           FROM fysen.menu_snapshots AS menu_snapshot
          WHERE menu_snapshot.menu_source_id = source.id
          ORDER BY menu_snapshot.fetched_at DESC, menu_snapshot.id DESC
          LIMIT 1
       ) AS snapshot ON true
       LEFT JOIN LATERAL (
         SELECT watch_run.outcome, watch_run.started_at
           FROM fysen.menu_watch_runs AS watch_run
          WHERE watch_run.menu_source_id = source.id
          ORDER BY watch_run.started_at DESC, watch_run.id DESC
          LIMIT 1
       ) AS watch ON true
      ORDER BY expected.slug`,
    [slugs, sourceUrls, minimumExpectedItems],
  );

  const manifestBySlug = new Map(manifests.map((manifest) => [manifest.slug, manifest]));
  const failures = [];
  const verified = [];
  const now = Date.now();

  for (const row of result.rows) {
    const manifest = manifestBySlug.get(row.slug);
    if (!manifest) {
      failures.push({ slug: row.slug, reason: "unexpected proof row" });
      continue;
    }

    const reasons = [];
    if (!row.restaurant_id) reasons.push("restaurant is not materialized");
    if (row.active !== true) reasons.push("restaurant is not active");
    if (row.city !== manifest.city) reasons.push(`city is ${row.city ?? "null"}, expected ${manifest.city}`);
    if (!row.menu_source_id) reasons.push("canonical menu source is not materialized");
    if (row.menu_source_enabled !== true) reasons.push("canonical menu source is disabled");

    const lastCheckedAt = row.last_checked_at ? new Date(row.last_checked_at) : null;
    const checkIntervalMinutes = Number(row.check_interval_minutes ?? 0);
    if (!lastCheckedAt || Number.isNaN(lastCheckedAt.getTime())) {
      reasons.push("canonical menu source has never been checked");
    } else if (!Number.isFinite(checkIntervalMinutes) || checkIntervalMinutes <= 0) {
      reasons.push("canonical menu source has an invalid check interval");
    } else {
      const freshForMinutes = Math.max(checkIntervalMinutes * 3, 1_440);
      const freshUntil = lastCheckedAt.getTime() + freshForMinutes * 60_000;
      if (now > freshUntil) reasons.push(`canonical menu source is stale since ${new Date(freshUntil).toISOString()}`);
    }

    if (!row.snapshot_id) reasons.push("canonical menu source has no published snapshot");
    const itemCount = Number(row.item_count ?? 0);
    if (itemCount < manifest.minimumExpectedItems) {
      reasons.push(`published snapshot has ${itemCount} items, expected at least ${manifest.minimumExpectedItems}`);
    }
    if (!acceptedWatchOutcomes.has(row.latest_watch_outcome)) {
      reasons.push(`latest menu watcher outcome is ${row.latest_watch_outcome ?? "missing"}`);
    }

    if (reasons.length > 0) {
      failures.push({ slug: manifest.slug, sourceUrl: manifest.sourceUrl, reasons });
      continue;
    }

    verified.push({
      slug: manifest.slug,
      name: row.restaurant_name,
      sourceUrl: manifest.sourceUrl,
      itemCount,
      lastCheckedAt: lastCheckedAt.toISOString(),
      snapshotFetchedAt: new Date(row.snapshot_fetched_at).toISOString(),
      latestWatchOutcome: row.latest_watch_outcome,
      latestWatchStartedAt: new Date(row.latest_watch_started_at).toISOString(),
    });
  }

  if (result.rows.length !== manifests.length) {
    failures.push({ reason: `proof returned ${result.rows.length} rows for ${manifests.length} catalog manifests` });
  }
  if (failures.length > 0) fail("Production catalog materialization proof failed", failures);

  return verified;
}

function assertSearchTarget(rows, testCase) {
  const primaryRows = rows.filter((row) => row.matchType !== "fuzzy");
  const eligibleRows = testCase.expectedMatch === "fuzzy" ? rows.filter((row) => row.matchType === "fuzzy") : primaryRows;
  if (eligibleRows.length < testCase.minCount) {
    fail(`${testCase.label} search returned too few primary results`, {
      query: testCase.query,
      expected: testCase.minCount,
      actual: eligibleRows.length,
    });
  }

  const target = testCase.expectedSlug
    ? eligibleRows.find((row) => row.restaurantSlug === testCase.expectedSlug)
    : eligibleRows[0] ?? null;
  if (!target) fail(`${testCase.label} expected restaurant is missing`, { expectedSlug: testCase.expectedSlug });

  if (testCase.expectedDishName && target.dishName !== testCase.expectedDishName) {
    fail(`${testCase.label} dish name mismatch`, { expected: testCase.expectedDishName, actual: target.dishName });
  }
  if (testCase.expectedPriceMinor !== undefined && target.priceMinor !== testCase.expectedPriceMinor) {
    fail(`${testCase.label} price mismatch`, { expected: testCase.expectedPriceMinor, actual: target.priceMinor });
  }
  if (testCase.expectedOpening && target.opening.state !== testCase.expectedOpening) {
    fail(`${testCase.label} opening-state mismatch`, { expected: testCase.expectedOpening, actual: target.opening.state });
  }
  if (testCase.expectedAction === "booking" && !target.bookingAction) {
    fail(`${testCase.label} expected a verified booking action`);
  }
  if (testCase.expectedAction === "order" && !target.orderAction) {
    fail(`${testCase.label} expected a verified order action`);
  }
  if (testCase.expectDistance && !(typeof target.distanceMeters === "number" && target.distanceMeters >= 0)) {
    fail(`${testCase.label} expected a computed distance`, { distanceMeters: target.distanceMeters });
  }

  return {
    label: testCase.label,
    query: testCase.query,
    primaryCount: primaryRows.length,
    target: {
      restaurantSlug: target.restaurantSlug,
      restaurantName: target.restaurantName,
      dishName: target.dishName,
      priceMinor: target.priceMinor,
      matchType: target.matchType,
      opening: target.opening.state,
      hasBooking: Boolean(target.bookingAction),
      hasOrder: Boolean(target.orderAction),
      observedAt: target.observedAt,
      lastCheckedAt: target.lastCheckedAt,
      distanceMeters: target.distanceMeters,
    },
  };
}

async function verifySearchSmokes(pool) {
  const cases = [
    {
      label: "Punjab Tandoori",
      query: "Punjabi Mix Grill",
      expectedSlug: "punjab-tandoori-gronland-oslo",
      expectedDishName: "Punjabi Mix Grill",
      expectedPriceMinor: 24_000,
      expectedAction: "order",
      minCount: 1,
    },
    {
      label: "Valentes provisional hours",
      query: "Valentes Spesial",
      expectedSlug: "valentes-vika-oslo",
      expectedDishName: "Valentes Spesial",
      expectedPriceMinor: 36_500,
      expectedOpening: "unknown",
      expectedAction: "booking",
      minCount: 1,
    },
    {
      label: "Collett's browser source and provisional hours",
      query: "Wienerschnitzel",
      expectedSlug: "colletts-parkservering-oslo",
      expectedDishName: "Wienerschnitzel (Kalv)",
      expectedPriceMinor: 39_900,
      expectedOpening: "unknown",
      expectedAction: "booking",
      minCount: 1,
    },
    {
      label: "Common dish",
      query: "Margherita",
      minCount: 3,
    },
    { label: "Ramen", query: "ramen", minCount: 1 },
    { label: "Pizza", query: "pizza", minCount: 1 },
    { label: "Indian dish", query: "Butter Chicken", minCount: 2 },
    { label: "Fuzzy spelling", query: "margerita", expectedMatch: "fuzzy", minCount: 1 },
    { label: "Geolocation and distance", query: "pizza", latitude: 59.9139, longitude: 10.7522, expectDistance: true, minCount: 1 },
  ];

  const outputs = [];
  for (const testCase of cases) {
    const normalizedQuery = normalizeDishName(testCase.query);
    const rows = await searchDishes(pool, {
      normalizedQuery,
      city: "Oslo",
      limit: 20,
      latitude: testCase.latitude ?? null,
      longitude: testCase.longitude ?? null,
      sort: "relevance",
    });
    outputs.push(assertSearchTarget(rows, testCase));
  }
  return outputs;
}

async function fetchWithProofTimeout(url) {
  return fetch(url, {
    cache: "no-store",
    headers: { accept: "*/*", "user-agent": "FysenProductionProof/1.0" },
    signal: AbortSignal.timeout(10_000),
  });
}

async function verifyPublicSurfaces() {
  const browseUrl = `${apiBaseUrl}/v1/dishes/browse?city=Oslo`;
  const browseResponse = await fetchWithProofTimeout(browseUrl);
  if (!browseResponse.ok) fail("Public API browse is unavailable", { status: browseResponse.status, browseUrl });
  const browse = await browseResponse.json();
  if (browse?.city !== "Oslo" || !Array.isArray(browse?.dishes) || browse.dishes.length < 1) {
    fail("Public API browse returned an invalid Oslo payload", browse);
  }
  if (browse.count !== browse.dishes.length) {
    fail("Public API browse count does not match its dish list", { count: browse.count, dishes: browse.dishes.length });
  }
  if (
    browse?.quality?.filterVersion !== "consumer-v1"
    || browse.quality.rawItemCount < browse.count
    || browse.quality.validItemCount !== browse.quality.rawItemCount - browse.quality.excludedItemCount
    || browse.quality.deduplicatedItemCount !== browse.quality.validItemCount - browse.count
  ) {
    fail("Public API browse is missing canonical consumer-catalog proof", browse?.quality ?? null);
  }
  const forbiddenBrowsePatterns = [
    /^allergen/i,
    /^\d+\s*(?:stk|cl|ml|l|g|kg|biter|bottles?)?$/i,
    /\b(?:aperol spritz|cola|fanta|sprite|vann|water)\b/i,
  ];
  const leakedBrowseItems = browse.dishes
    .filter((dish) => forbiddenBrowsePatterns.some((pattern) => pattern.test(dish?.name ?? "")))
    .map((dish) => dish?.name);
  if (leakedBrowseItems.length > 0) fail("Consumer browse leaks non-dish menu entries", leakedBrowseItems);
  const publicDishNames = new Set(browse.dishes.map((dish) => dish?.name));
  const requiredPublicDishes = ["Punjabi Mix Grill", "Valentes Spesial", "Wienerschnitzel (Kalv)"];
  const missingPublicDishes = requiredPublicDishes.filter((name) => !publicDishNames.has(name));
  if (missingPublicDishes.length > 0) {
    fail("Public API browse is missing representative current-catalog dishes", missingPublicDishes);
  }
  if (!browse.dishes.some((dish) => dish?.id?.startsWith("concept:"))) {
    fail("Public consumer catalog is missing a canonical lexicon identity");
  }
  if (!browse.dishes.some((dish) => dish?.id?.startsWith("menu:"))) {
    fail("Public consumer catalog is missing a valid non-lexicon identity");
  }

  const webBrowseUrl = `${webBaseUrl}/search?city=Oslo`;
  const webResponse = await fetchWithProofTimeout(webBrowseUrl);
  if (!webResponse.ok) fail("Public web browse is unavailable", { status: webResponse.status, webBrowseUrl });
  const webHtml = await webResponse.text();
  if (!webHtml.includes("Alle retter i Oslo")) {
    fail("Public web is not rendering the current live dish-browse surface", { webBrowseUrl });
  }

  return {
    api: { url: browseUrl, city: browse.city, dishCount: browse.count, quality: browse.quality, representativeDishes: requiredPublicDishes },
    web: { url: webBrowseUrl, liveDishBrowseRendered: true },
  };
}

const pool = createDatabasePool({ maxConnections: 2 });
try {
  const manifests = await readCatalog();
  const materialized = await verifyCatalogMaterialization(pool, manifests);
  const searchSmokes = await verifySearchSmokes(pool);
  const publicSurfaces = await verifyPublicSurfaces();

  process.stdout.write(`${JSON.stringify({
    status: "verified",
    recordedRevenueEvents: false,
    catalog: {
      count: manifests.length,
      slugs: manifests.map((manifest) => manifest.slug),
      materialized,
    },
    searchSmokes,
    publicSurfaces,
  }, null, 2)}\n`);
} finally {
  await pool.end();
}
