import { countBlockingCatalogOnboardingFailures } from "./catalog-onboarding-failure-policy.js";
import { listRestaurantOnboardingManifests } from "./onboarding-manifest.js";
import {
  onboardRestaurantManifest,
  type RestaurantCatalogOnboardingSummary,
  type RestaurantOnboardingResult,
} from "./onboarding.js";

const DEFAULT_CATALOG_MATERIALIZATION_CONCURRENCY = 4;
const MAX_CATALOG_MATERIALIZATION_CONCURRENCY = 8;

export interface CatalogMaterializationSummary extends RestaurantCatalogOnboardingSummary {
  readonly concurrency: number;
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
  const blockingFailedCount = countBlockingCatalogOnboardingFailures(results);

  return {
    manifestCount: entries.length,
    publishedCount: results.filter((result) => result.outcome === "published").length,
    alreadyPublishedCount: results.filter((result) => result.outcome === "already_published").length,
    failedCount: results.filter((result) => result.outcome === "failed").length,
    results,
    concurrency,
    blockingFailedCount,
  };
}
