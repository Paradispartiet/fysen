import {
  createDatabasePool,
  getLatestMenuWatchOutcome,
  MenuIndexRepository,
  reconcileRestaurantCatalogCoverage,
  setRestaurantCoverageActive,
  type CatalogCoverageReconcileResult,
  type WatchOutcome,
} from "@fysen/database";
import { countBlockingCatalogOnboardingFailures } from "./catalog-onboarding-failure-policy.js";
import { HttpMenuClient } from "./http-client.js";
import { evaluateManifestMenuQuality } from "./manifest-quality.js";
import { listRestaurantOnboardingManifests } from "./onboarding-manifest.js";
import {
  onboardRestaurantManifest,
  type RestaurantCatalogOnboardingSummary,
  type RestaurantOnboardingResult,
} from "./onboarding.js";
import { watchMenuSourceOnce } from "./watcher.js";

const DEFAULT_CATALOG_MATERIALIZATION_CONCURRENCY = 4;
const MAX_CATALOG_MATERIALIZATION_CONCURRENCY = 8;
const ACCEPTED_WATCH_OUTCOMES = new Set<WatchOutcome>([
  "changed",
  "unchanged",
  "not_modified",
]);

export interface CatalogHealthRepairResult {
  readonly slug: string;
  readonly menuSourceId: string;
  readonly previousOutcome: WatchOutcome | null;
  readonly outcome: WatchOutcome | null;
  readonly itemCount: number | null;
  readonly error: string | null;
}

export interface CatalogMaterializationSummary extends RestaurantCatalogOnboardingSummary {
  readonly concurrency: number;
  readonly onboardingBlockingFailedCount: number;
  readonly healthRepairCount: number;
  readonly healthRepairFailedCount: number;
  readonly healthRepairs: readonly CatalogHealthRepairResult[];
  readonly coverageReconcile: CatalogCoverageReconcileResult | null;
  readonly blockingFailedCount: number;
}

export function parseCatalogMaterializationConcurrency(raw: string | undefined): number {
  if (raw === undefined || raw.trim() === "") return DEFAULT_CATALOG_MATERIALIZATION_CONCURRENCY;
  const normalized = raw.trim();
  if (!/^\d+$/.test(normalized)) {
    throw new Error(`FYSEN_CATALOG_MATERIALIZATION_CONCURRENCY must be an integer between 1 and ${MAX_CATALOG_MATERIALIZATION_CONCURRENCY}`);
  }
  const parsed = Number(normalized);
  if (parsed < 1 || parsed > MAX_CATALOG_MATERIALIZATION_CONCURRENCY) {
    throw new Error(`FYSEN_CATALOG_MATERIALIZATION_CONCURRENCY must be between 1 and ${MAX_CATALOG_MATERIALIZATION_CONCURRENCY}`);
  }
  return parsed;
}

export function shouldRepairCatalogSourceHealth(outcome: WatchOutcome | null): boolean {
  return outcome === null || !ACCEPTED_WATCH_OUTCOMES.has(outcome);
}

export async function mapWithBoundedConcurrency<T, R>(
  entries: readonly T[],
  concurrency: number,
  worker: (entry: T, index: number) => Promise<R>,
): Promise<readonly R[]> {
  if (entries.length === 0) return [];
  if (!Number.isInteger(concurrency) || concurrency < 1) {
    throw new Error("Catalog materialization concurrency must be a positive integer");
  }

  const results = new Array<R>(entries.length);
  let nextIndex = 0;
  const workerCount = Math.min(concurrency, entries.length);

  await Promise.all(
    Array.from({ length: workerCount }, async () => {
      while (true) {
        const index = nextIndex;
        nextIndex += 1;
        if (index >= entries.length) return;
        results[index] = await worker(entries[index] as T, index);
      }
    }),
  );

  return results;
}

async function repairUnhealthyCanonicalSources(
  pool: ReturnType<typeof createDatabasePool>,
  entries: Awaited<ReturnType<typeof listRestaurantOnboardingManifests>>,
  results: readonly RestaurantOnboardingResult[],
  concurrency: number,
): Promise<readonly CatalogHealthRepairResult[]> {
  const repository = new MenuIndexRepository(pool);
  const candidates = results.flatMap((result, index) => {
    const entry = entries[index];
    if (!entry || result.outcome === "failed" || !result.menuSourceId || !result.restaurantId) return [];
    return [{ entry, result }];
  });
  const httpClient = new HttpMenuClient();

  const repairs = await mapWithBoundedConcurrency(
    candidates,
    concurrency,
    async ({ entry, result }): Promise<CatalogHealthRepairResult | null> => {
      const menuSourceId = result.menuSourceId as string;
      const restaurantId = result.restaurantId as string;
      const previousOutcome = await getLatestMenuWatchOutcome(pool, menuSourceId);
      if (!shouldRepairCatalogSourceHealth(previousOutcome)) return null;

      try {
        const watch = await watchMenuSourceOnce(
          repository,
          menuSourceId,
          httpClient,
          entry.manifest.menuSource.sourceSupport,
        );
        if (!ACCEPTED_WATCH_OUTCOMES.has(watch.outcome)) {
          return {
            slug: entry.manifest.restaurant.slug,
            menuSourceId,
            previousOutcome,
            outcome: watch.outcome,
            itemCount: watch.itemCount,
            error: `Health repair watch ended with ${watch.outcome}`,
          };
        }

        const snapshot = await repository.getLatestSnapshotWithItems(menuSourceId);
        const quality = evaluateManifestMenuQuality(entry.manifest, snapshot?.items ?? []);
        if (!quality.accepted) {
          await setRestaurantCoverageActive(pool, restaurantId, false);
          return {
            slug: entry.manifest.restaurant.slug,
            menuSourceId,
            previousOutcome,
            outcome: watch.outcome,
            itemCount: quality.itemCount,
            error: `Fresh health repair snapshot failed manifest assertions: items=${quality.itemCount}/${quality.minimumExpectedItems}, missing=${quality.missingRequiredDishes.join(",") || "none"}, forbidden=${quality.forbiddenDishesPresent.join(",") || "none"}`,
          };
        }

        return {
          slug: entry.manifest.restaurant.slug,
          menuSourceId,
          previousOutcome,
          outcome: watch.outcome,
          itemCount: quality.itemCount,
          error: null,
        };
      } catch (error) {
        return {
          slug: entry.manifest.restaurant.slug,
          menuSourceId,
          previousOutcome,
          outcome: await getLatestMenuWatchOutcome(pool, menuSourceId),
          itemCount: null,
          error: error instanceof Error ? error.message : String(error),
        };
      }
    },
  );

  return repairs.filter((repair): repair is CatalogHealthRepairResult => repair !== null);
}

export async function materializeRestaurantCatalog(): Promise<CatalogMaterializationSummary> {
  const entries = await listRestaurantOnboardingManifests();
  const concurrency = parseCatalogMaterializationConcurrency(
    process.env.FYSEN_CATALOG_MATERIALIZATION_CONCURRENCY,
  );
  const results = await mapWithBoundedConcurrency(
    entries,
    concurrency,
    (entry) => onboardRestaurantManifest(entry.path),
  ) as readonly RestaurantOnboardingResult[];
  const onboardingBlockingFailedCount = countBlockingCatalogOnboardingFailures(results);

  let coverageReconcile: CatalogCoverageReconcileResult | null = null;
  let healthRepairs: readonly CatalogHealthRepairResult[] = [];
  if (onboardingBlockingFailedCount === 0) {
    const maintenancePool = createDatabasePool({ maxConnections: Math.max(4, concurrency * 2) });
    try {
      coverageReconcile = await reconcileRestaurantCatalogCoverage(
        maintenancePool,
        entries.map(({ manifest }) => ({
          slug: manifest.restaurant.slug,
          city: manifest.restaurant.city,
        })),
      );
      healthRepairs = await repairUnhealthyCanonicalSources(
        maintenancePool,
        entries,
        results,
        concurrency,
      );
    } finally {
      await maintenancePool.end();
    }
  }

  const healthRepairFailedCount = healthRepairs.filter((repair) => repair.error !== null).length;
  const blockingFailedCount = onboardingBlockingFailedCount + healthRepairFailedCount;

  return {
    manifestCount: entries.length,
    publishedCount: results.filter((result) => result.outcome === "published").length,
    alreadyPublishedCount: results.filter((result) => result.outcome === "already_published").length,
    failedCount: results.filter((result) => result.outcome === "failed").length,
    results,
    concurrency,
    onboardingBlockingFailedCount,
    healthRepairCount: healthRepairs.length,
    healthRepairFailedCount,
    healthRepairs,
    coverageReconcile,
    blockingFailedCount,
  };
}
