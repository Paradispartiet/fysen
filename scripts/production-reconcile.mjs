import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { createDatabasePool } from "../packages/database/dist/index.js";

const catalogDirectory = path.resolve("apps/menu-worker/catalog");
const acceptedWatchOutcomes = new Set(["changed", "unchanged", "not_modified"]);

function fail(message, details = null) {
  const suffix = details === null ? "" : `: ${JSON.stringify(details)}`;
  throw new Error(`${message}${suffix}`);
}

function sourceKey(slug, url) {
  return `${slug}\u0000${url}`;
}

function iso(value) {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
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

async function reconcileProduction(pool, manifests) {
  const cities = [...new Set(manifests.map((manifest) => manifest.city))].sort((a, b) => a.localeCompare(b, "en"));
  const expectedSlugs = new Set(manifests.map((manifest) => manifest.slug));
  const expectedSourceKeys = new Set(manifests.map((manifest) => sourceKey(manifest.slug, manifest.sourceUrl)));

  const restaurantsResult = await pool.query(
    `SELECT id, slug, name, city, active
       FROM fysen.restaurants
      WHERE city = ANY($1::text[])
      ORDER BY slug`,
    [cities],
  );

  const sourcesResult = await pool.query(
    `SELECT restaurant.slug,
            restaurant.name AS restaurant_name,
            restaurant.city,
            restaurant.active,
            source.id AS menu_source_id,
            source.url AS source_url,
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
            watch.started_at AS latest_watch_started_at,
            watch.completed_at AS latest_watch_completed_at,
            watch.http_status AS latest_watch_http_status,
            watch.extracted_item_count AS latest_watch_extracted_item_count,
            watch.error_code AS latest_watch_error_code,
            watch.error_message AS latest_watch_error_message,
            watch.details AS latest_watch_details
       FROM fysen.restaurants AS restaurant
       JOIN fysen.menu_sources AS source
         ON source.restaurant_id = restaurant.id
        AND source.enabled = true
       LEFT JOIN LATERAL (
         SELECT menu_snapshot.id, menu_snapshot.fetched_at
           FROM fysen.menu_snapshots AS menu_snapshot
          WHERE menu_snapshot.menu_source_id = source.id
          ORDER BY menu_snapshot.fetched_at DESC, menu_snapshot.id DESC
          LIMIT 1
       ) AS snapshot ON true
       LEFT JOIN LATERAL (
         SELECT watch_run.outcome,
                watch_run.started_at,
                watch_run.completed_at,
                watch_run.http_status,
                watch_run.extracted_item_count,
                watch_run.error_code,
                watch_run.error_message,
                watch_run.details
           FROM fysen.menu_watch_runs AS watch_run
          WHERE watch_run.menu_source_id = source.id
          ORDER BY watch_run.started_at DESC, watch_run.id DESC
          LIMIT 1
       ) AS watch ON true
      WHERE restaurant.city = ANY($1::text[])
      ORDER BY restaurant.slug, source.url, source.id`,
    [cities],
  );

  const restaurantBySlug = new Map(restaurantsResult.rows.map((row) => [row.slug, row]));
  const activeRestaurants = restaurantsResult.rows.filter((row) => row.active === true);
  const inactiveCanonical = manifests
    .filter((manifest) => restaurantBySlug.get(manifest.slug)?.active !== true)
    .map((manifest) => ({
      slug: manifest.slug,
      state: restaurantBySlug.has(manifest.slug) ? "inactive" : "missing",
    }));
  const activeNotCatalog = activeRestaurants
    .filter((row) => !expectedSlugs.has(row.slug))
    .map((row) => ({ slug: row.slug, name: row.name, city: row.city }));

  const enabledSources = sourcesResult.rows;
  const enabledSourceRowsByKey = new Map();
  for (const row of enabledSources) {
    const key = sourceKey(row.slug, row.source_url);
    const rows = enabledSourceRowsByKey.get(key) ?? [];
    rows.push(row);
    enabledSourceRowsByKey.set(key, rows);
  }

  const missingCanonicalEnabledSources = manifests
    .filter((manifest) => !enabledSourceRowsByKey.has(sourceKey(manifest.slug, manifest.sourceUrl)))
    .map((manifest) => ({ slug: manifest.slug, sourceUrl: manifest.sourceUrl }));
  const extraEnabledSources = enabledSources
    .filter((row) => !expectedSourceKeys.has(sourceKey(row.slug, row.source_url)))
    .map((row) => ({ slug: row.slug, sourceUrl: row.source_url, active: row.active }));
  const duplicateEnabledCanonicalSources = [...enabledSourceRowsByKey.entries()]
    .filter(([key, rows]) => expectedSourceKeys.has(key) && rows.length !== 1)
    .map(([, rows]) => ({ slug: rows[0].slug, sourceUrl: rows[0].source_url, count: rows.length }));

  const sourceHealthFailures = [];
  const healthySources = [];
  const now = Date.now();

  for (const manifest of manifests) {
    const rows = enabledSourceRowsByKey.get(sourceKey(manifest.slug, manifest.sourceUrl)) ?? [];
    if (rows.length !== 1) continue;
    const row = rows[0];
    const reasons = [];
    const lastCheckedAt = row.last_checked_at ? new Date(row.last_checked_at) : null;
    const checkIntervalMinutes = Number(row.check_interval_minutes ?? 0);
    const itemCount = Number(row.item_count ?? 0);

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
    if (itemCount < manifest.minimumExpectedItems) {
      reasons.push(`published snapshot has ${itemCount} items, expected at least ${manifest.minimumExpectedItems}`);
    }
    if (!acceptedWatchOutcomes.has(row.latest_watch_outcome)) {
      reasons.push(`latest menu watcher outcome is ${row.latest_watch_outcome ?? "missing"}`);
    }

    const health = {
      slug: manifest.slug,
      sourceUrl: manifest.sourceUrl,
      itemCount,
      minimumExpectedItems: manifest.minimumExpectedItems,
      lastCheckedAt: iso(row.last_checked_at),
      snapshotFetchedAt: iso(row.snapshot_fetched_at),
      latestWatchOutcome: row.latest_watch_outcome ?? null,
      latestWatchStartedAt: iso(row.latest_watch_started_at),
      latestWatchCompletedAt: iso(row.latest_watch_completed_at),
      latestWatchHttpStatus: row.latest_watch_http_status ?? null,
      latestWatchExtractedItemCount: row.latest_watch_extracted_item_count ?? null,
      latestWatchErrorCode: row.latest_watch_error_code ?? null,
      latestWatchErrorMessage: row.latest_watch_error_message ?? null,
      latestWatchDetails: row.latest_watch_details ?? null,
    };

    if (reasons.length > 0) {
      sourceHealthFailures.push({ ...health, reasons });
    } else {
      healthySources.push(health);
    }
  }

  const failures = {
    inactiveCanonical,
    activeNotCatalog,
    missingCanonicalEnabledSources,
    extraEnabledSources,
    duplicateEnabledCanonicalSources,
    sourceHealthFailures,
  };

  const hasResiduals = Object.values(failures).some((entries) => entries.length > 0);
  const countMismatch = activeRestaurants.length !== manifests.length || enabledSources.length !== manifests.length;

  return {
    status: hasResiduals || countMismatch ? "failed" : "verified",
    cities,
    canonicalCount: manifests.length,
    activeRestaurantCount: activeRestaurants.length,
    expectedEnabledSourceCount: manifests.length,
    enabledSourceCount: enabledSources.length,
    healthyCanonicalSourceCount: healthySources.length,
    inactiveCanonicalCount: inactiveCanonical.length,
    activeNotCatalogCount: activeNotCatalog.length,
    missingCanonicalEnabledSourceCount: missingCanonicalEnabledSources.length,
    extraEnabledSourceCount: extraEnabledSources.length,
    duplicateEnabledCanonicalSourceCount: duplicateEnabledCanonicalSources.length,
    sourceHealthFailureCount: sourceHealthFailures.length,
    watcherOutcomes: [...healthySources, ...sourceHealthFailures].reduce((counts, source) => {
      const outcome = source.latestWatchOutcome ?? "missing";
      counts[outcome] = (counts[outcome] ?? 0) + 1;
      return counts;
    }, {}),
    oldestLastCheckedAt: [...healthySources, ...sourceHealthFailures]
      .map((source) => source.lastCheckedAt)
      .filter(Boolean)
      .sort()[0] ?? null,
    oldestSnapshotFetchedAt: [...healthySources, ...sourceHealthFailures]
      .map((source) => source.snapshotFetchedAt)
      .filter(Boolean)
      .sort()[0] ?? null,
    failures,
    sources: healthySources,
  };
}

const pool = createDatabasePool({ maxConnections: 2 });
try {
  const manifests = await readCatalog();
  const reconcile = await reconcileProduction(pool, manifests);
  process.stdout.write(`${JSON.stringify(reconcile, null, 2)}\n`);
  if (reconcile.status !== "verified") process.exitCode = 1;
} finally {
  await pool.end();
}
