import { resolve } from "node:path";
import {
  createDatabasePool,
  MenuIndexRepository,
  replaceMenuSourceSupport,
} from "../packages/database/dist/index.js";
import { HttpMenuClient } from "../apps/menu-worker/dist/http-client.js";
import { readRestaurantOnboardingManifest } from "../apps/menu-worker/dist/onboarding-manifest.js";
import { evaluateManifestMenuQuality } from "../apps/menu-worker/dist/manifest-quality.js";
import { watchMenuSourceOnce } from "../apps/menu-worker/dist/watcher.js";

const acceptedOutcomes = new Set(["changed", "unchanged", "not_modified"]);

function fail(message, details = null) {
  const suffix = details === null ? "" : `: ${JSON.stringify(details)}`;
  throw new Error(`${message}${suffix}`);
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
    if (!source.enabled) {
      fail(`Canonical menu source is disabled in production: ${manifest.restaurant.slug}`, {
        menuSourceId: source.id,
        sourceUrl: source.url,
      });
    }

    await replaceMenuSourceSupport(pool, source.id, manifest.menuSource.sourceSupport);
    const watch = await watchMenuSourceOnce(
      repository,
      source.id,
      new HttpMenuClient(),
      manifest.menuSource.sourceSupport,
    );
    if (!acceptedOutcomes.has(watch.outcome)) {
      fail(`Published menu refresh failed for ${manifest.restaurant.slug}`, watch);
    }

    const snapshot = await repository.getLatestSnapshotWithItems(source.id);
    const quality = evaluateManifestMenuQuality(manifest, snapshot?.items ?? []);
    if (!quality.accepted) {
      fail(`Published menu refresh violated canonical assertions for ${manifest.restaurant.slug}`, quality);
    }

    return {
      slug: manifest.restaurant.slug,
      menuSourceId: source.id,
      sourceUrl: source.url,
      fetchMode: manifest.menuSource.fetchMode,
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
