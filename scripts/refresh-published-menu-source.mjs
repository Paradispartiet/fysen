import { resolve } from "node:path";
import {
  createMenuFingerprint,
  diffMenuItems,
} from "../packages/menu-core/dist/index.js";
import {
  createDatabasePool,
  listEnabledMenuSourcesForRestaurant,
  MenuIndexRepository,
  replaceMenuSourceSupport,
  replacePublishedMenuSourceAuthority,
  setMenuSourceEnabled,
} from "../packages/database/dist/index.js";
import { HttpMenuClient } from "../apps/menu-worker/dist/http-client.js";
import { canonicalizeUniqueMenuSourceKeys } from "../apps/menu-worker/dist/menu-source-key-canonicalizer.js";
import {
  extractMenuSource,
  fetchMenuSource,
  shouldForceReextract,
} from "../apps/menu-worker/dist/menu-source-runtime.js";
import { readRestaurantOnboardingManifest } from "../apps/menu-worker/dist/onboarding-manifest.js";
import { evaluateManifestMenuQuality } from "../apps/menu-worker/dist/manifest-quality.js";
import { watchMenuSourceOnce } from "../apps/menu-worker/dist/watcher.js";

const acceptedOutcomes = new Set(["changed", "unchanged", "not_modified"]);

function fail(message, details = null) {
  const suffix = details === null ? "" : `: ${JSON.stringify(details)}`;
  throw new Error(`${message}${suffix}`);
}

function evidenceText(items) {
  return items.map((item) => item.sourceExcerpt ?? item.name).join("\n");
}

async function persistManifestValidatedExtractorRebaseline({
  repository,
  source,
  manifest,
  previousSnapshot,
  sourceSupport,
  httpClient,
}) {
  if (!previousSnapshot) {
    fail(`Refusing extractor rebaseline without an existing snapshot: ${manifest.restaurant.slug}`);
  }
  if (!shouldForceReextract(source.sourceType, previousSnapshot.extractorVersion)) {
    fail(`Refusing suspicious-drop rebaseline without an extractor-version change: ${manifest.restaurant.slug}`, {
      previousExtractorVersion: previousSnapshot.extractorVersion,
      sourceType: source.sourceType,
    });
  }

  const startedAt = new Date().toISOString();
  const fetched = await fetchMenuSource(
    {
      url: source.url,
      sourceType: source.sourceType,
      fetchMode: source.fetchMode,
      userAgent: source.userAgent,
      etag: null,
      lastModified: null,
      maxResponseBytes: source.maxResponseBytes,
      sourceSupport,
    },
    httpClient,
  );
  if (fetched.kind === "not_modified") {
    fail(`Refusing extractor rebaseline from HTTP not-modified response: ${manifest.restaurant.slug}`);
  }

  const rawExtracted = await extractMenuSource(source.sourceType, fetched);
  const items = canonicalizeUniqueMenuSourceKeys(rawExtracted.items);
  const quality = evaluateManifestMenuQuality(manifest, items);
  if (!quality.accepted) {
    fail(`Refusing extractor rebaseline that violates canonical assertions: ${manifest.restaurant.slug}`, quality);
  }

  const fingerprint = createMenuFingerprint(items);
  const changes = diffMenuItems(previousSnapshot.items, items);
  const snapshotId = await repository.recordSnapshot({
    menuSourceId: source.id,
    expectedPreviousSnapshotId: previousSnapshot.id,
    startedAt,
    fetchedAt: fetched.fetchedAt,
    httpStatus: fetched.status,
    responseContentType: fetched.contentType,
    rawSha256: fetched.rawSha256,
    normalizedSha256: fingerprint,
    normalizedText: evidenceText(items),
    etag: fetched.etag,
    lastModified: fetched.lastModified,
    robotsAllowed: fetched.robotsAllowed,
    fetchDurationMs: fetched.durationMs,
    extractorVersion: rawExtracted.extractorVersion,
    items,
    changes: changes.map((change) => ({
      itemSourceKey: change.sourceKey,
      kind: change.kind,
      before: change.before,
      after: change.after,
    })),
  });

  return {
    snapshotId,
    previousSnapshotId: previousSnapshot.id,
    previousExtractorVersion: previousSnapshot.extractorVersion,
    extractorVersion: rawExtracted.extractorVersion,
    previousItemCount: previousSnapshot.items.length,
    itemCount: items.length,
    changeCount: changes.length,
    quality,
  };
}

async function refreshManifest(manifestPath) {
  const absolutePath = resolve(manifestPath);
  const manifest = await readRestaurantOnboardingManifest(absolutePath);
  const pool = createDatabasePool({ maxConnections: 2 });

  try {
    const restaurantResult = await pool.query(
      `SELECT id, active
         FROM fysen.restaurants
        WHERE slug = $1
        LIMIT 1`,
      [manifest.restaurant.slug],
    );
    const restaurant = restaurantResult.rows[0];
    if (!restaurant) fail(`Canonical restaurant is missing in production: ${manifest.restaurant.slug}`);
    if (restaurant.active !== true) fail(`Canonical restaurant is inactive in production: ${manifest.restaurant.slug}`);

    const repository = new MenuIndexRepository(pool);
    const enabledSourcesBefore = await listEnabledMenuSourcesForRestaurant(pool, restaurant.id);
    const source = await repository.upsertMenuSource({
      restaurantId: restaurant.id,
      url: manifest.menuSource.url,
      sourceType: manifest.menuSource.sourceType,
      fetchMode: manifest.menuSource.fetchMode,
      userAgent: manifest.menuSource.userAgent,
      checkIntervalMinutes: manifest.menuSource.checkIntervalMinutes,
      minimumExpectedItems: manifest.menuSource.minimumExpectedItems,
      maxResponseBytes: manifest.menuSource.maxResponseBytes ?? null,
    });
    const stagedMigration = enabledSourcesBefore.some((enabledSource) => enabledSource.id !== source.id);
    if (stagedMigration && source.enabled) {
      await setMenuSourceEnabled(pool, source.id, false);
    } else if (!stagedMigration && !source.enabled) {
      fail(`Canonical menu source is disabled in production: ${manifest.restaurant.slug}`, {
        menuSourceId: source.id,
        sourceUrl: source.url,
      });
    }

    await replaceMenuSourceSupport(pool, source.id, manifest.menuSource.sourceSupport);
    const previousSnapshot = await repository.getLatestSnapshotWithItems(source.id);
    const httpClient = new HttpMenuClient();
    let watch = await watchMenuSourceOnce(
      repository,
      source.id,
      httpClient,
      manifest.menuSource.sourceSupport,
      { allowDisabled: stagedMigration },
    );
    let rebaseline = null;

    if (watch.outcome === "quarantined" && !stagedMigration) {
      rebaseline = await persistManifestValidatedExtractorRebaseline({
        repository,
        source,
        manifest,
        previousSnapshot,
        sourceSupport: manifest.menuSource.sourceSupport,
        httpClient,
      });
      watch = await watchMenuSourceOnce(
        repository,
        source.id,
        httpClient,
        manifest.menuSource.sourceSupport,
      );
    }

    if (!acceptedOutcomes.has(watch.outcome)) {
      fail(`Published menu refresh failed for ${manifest.restaurant.slug}`, {
        ...watch,
        stagedMigration,
        rebaseline,
      });
    }

    const snapshot = await repository.getLatestSnapshotWithItems(source.id);
    const quality = evaluateManifestMenuQuality(manifest, snapshot?.items ?? []);
    if (!quality.accepted) {
      fail(`Published menu refresh violated canonical assertions for ${manifest.restaurant.slug}`, {
        ...quality,
        stagedMigration,
        rebaseline,
      });
    }

    if (stagedMigration) {
      await replacePublishedMenuSourceAuthority(pool, restaurant.id, source.id);
    }

    return {
      slug: manifest.restaurant.slug,
      menuSourceId: source.id,
      sourceUrl: source.url,
      fetchMode: manifest.menuSource.fetchMode,
      stagedMigration,
      rebaseline,
      watch,
      snapshotFetchedAt: snapshot?.fetchedAt ?? null,
      itemCount: quality.itemCount,
      minimumExpectedItems: quality.minimumExpectedItems,
      requiredDishCount: manifest.qualityAssertions.requiredDishNames.length,
      requiredVariantCount: manifest.qualityAssertions.requiredDishVariants.length,
      forbiddenDishCount: manifest.qualityAssertions.forbiddenDishNames.length,
    };
  } finally {
    await pool.end();
  }
}

const paths = process.argv.slice(2);
if (paths.length === 0) {
  fail("Usage: node scripts/refresh-published-menu-source.mjs <manifest.json> [manifest.json ...]");
}

const results = [];
for (const manifestPath of paths) {
  results.push(await refreshManifest(manifestPath));
}

process.stdout.write(`${JSON.stringify({ status: "verified", count: results.length, results }, null, 2)}\n`);
