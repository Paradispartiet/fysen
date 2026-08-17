import {
  createDatabasePool,
  MenuIndexRepository,
  setRestaurantCoverageActive,
  upsertRestaurantCandidate,
  type WatchOutcome,
} from "@fysen/database";
import { normalizeDishName } from "@fysen/menu-core";
import {
  listRestaurantOnboardingManifests,
  readRestaurantOnboardingManifest,
  type RestaurantOnboardingManifest,
} from "./onboarding-manifest.js";
import { watchMenuSourceOnce, type MenuWatchSummary } from "./watcher.js";

const acceptedOutcomes = new Set<WatchOutcome>(["changed", "unchanged", "not_modified"]);

export type RestaurantOnboardingOutcome = "published" | "already_published" | "failed";

export interface RestaurantOnboardingResult {
  readonly slug: string;
  readonly outcome: RestaurantOnboardingOutcome;
  readonly restaurantId: string | null;
  readonly menuSourceId: string | null;
  readonly firstWatch: MenuWatchSummary | null;
  readonly secondWatch: MenuWatchSummary | null;
  readonly itemCount: number | null;
  readonly missingRequiredDishes: readonly string[];
  readonly error: string | null;
}

export interface RestaurantCatalogOnboardingSummary {
  readonly manifestCount: number;
  readonly publishedCount: number;
  readonly alreadyPublishedCount: number;
  readonly failedCount: number;
  readonly results: readonly RestaurantOnboardingResult[];
}

function accepted(summary: MenuWatchSummary): boolean {
  return acceptedOutcomes.has(summary.outcome);
}

function missingDishAssertions(
  manifest: RestaurantOnboardingManifest,
  normalizedNames: ReadonlySet<string>,
): readonly string[] {
  return manifest.qualityAssertions.requiredDishNames.filter(
    (name) => !normalizedNames.has(normalizeDishName(name)),
  );
}

async function assertLatestSnapshot(
  repository: MenuIndexRepository,
  menuSourceId: string,
  manifest: RestaurantOnboardingManifest,
): Promise<{ readonly itemCount: number; readonly missing: readonly string[] }> {
  const snapshot = await repository.getLatestSnapshotWithItems(menuSourceId);
  if (!snapshot) {
    return {
      itemCount: 0,
      missing: manifest.qualityAssertions.requiredDishNames,
    };
  }

  const normalizedNames = new Set(snapshot.items.map((item) => item.normalizedName));
  return {
    itemCount: snapshot.items.length,
    missing: missingDishAssertions(manifest, normalizedNames),
  };
}

async function onboardOne(
  manifest: RestaurantOnboardingManifest,
): Promise<RestaurantOnboardingResult> {
  const pool = createDatabasePool({ maxConnections: 2 });
  let restaurantId: string | null = null;
  let menuSourceId: string | null = null;
  let firstWatch: MenuWatchSummary | null = null;
  let secondWatch: MenuWatchSummary | null = null;

  try {
    const candidate = await upsertRestaurantCandidate(pool, manifest.restaurant);
    restaurantId = candidate.id;

    const repository = new MenuIndexRepository(pool);
    const source = await repository.upsertMenuSource({
      restaurantId: candidate.id,
      url: manifest.menuSource.url,
      sourceType: manifest.menuSource.sourceType,
      userAgent: manifest.menuSource.userAgent,
      checkIntervalMinutes: manifest.menuSource.checkIntervalMinutes,
      minimumExpectedItems: manifest.menuSource.minimumExpectedItems,
    });
    menuSourceId = source.id;

    if (candidate.active) {
      const current = await assertLatestSnapshot(repository, source.id, manifest);
      return {
        slug: manifest.restaurant.slug,
        outcome: "already_published",
        restaurantId,
        menuSourceId,
        firstWatch: null,
        secondWatch: null,
        itemCount: current.itemCount,
        missingRequiredDishes: current.missing,
        error: null,
      };
    }

    firstWatch = await watchMenuSourceOnce(repository, source.id);
    if (!accepted(firstWatch)) {
      throw new Error(`First onboarding watch was ${firstWatch.outcome}`);
    }

    const afterFirst = await assertLatestSnapshot(repository, source.id, manifest);
    if (afterFirst.itemCount < manifest.menuSource.minimumExpectedItems) {
      throw new Error(
        `First onboarding snapshot has ${afterFirst.itemCount} items; expected at least ${manifest.menuSource.minimumExpectedItems}`,
      );
    }
    if (afterFirst.missing.length > 0) {
      throw new Error(`Required dishes missing after first watch: ${afterFirst.missing.join(", ")}`);
    }

    secondWatch = await watchMenuSourceOnce(repository, source.id);
    if (!accepted(secondWatch)) {
      throw new Error(`Second onboarding watch was ${secondWatch.outcome}`);
    }

    const afterSecond = await assertLatestSnapshot(repository, source.id, manifest);
    if (afterSecond.itemCount < manifest.menuSource.minimumExpectedItems) {
      throw new Error(
        `Second onboarding snapshot has ${afterSecond.itemCount} items; expected at least ${manifest.menuSource.minimumExpectedItems}`,
      );
    }
    if (afterSecond.missing.length > 0) {
      throw new Error(`Required dishes missing after second watch: ${afterSecond.missing.join(", ")}`);
    }

    await setRestaurantCoverageActive(pool, candidate.id, true);
    return {
      slug: manifest.restaurant.slug,
      outcome: "published",
      restaurantId,
      menuSourceId,
      firstWatch,
      secondWatch,
      itemCount: afterSecond.itemCount,
      missingRequiredDishes: [],
      error: null,
    };
  } catch (error) {
    return {
      slug: manifest.restaurant.slug,
      outcome: "failed",
      restaurantId,
      menuSourceId,
      firstWatch,
      secondWatch,
      itemCount: null,
      missingRequiredDishes: [],
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    await pool.end();
  }
}

export async function onboardRestaurantManifest(path: string): Promise<RestaurantOnboardingResult> {
  return onboardOne(await readRestaurantOnboardingManifest(path));
}

export async function onboardRestaurantCatalog(): Promise<RestaurantCatalogOnboardingSummary> {
  const entries = await listRestaurantOnboardingManifests();
  const results: RestaurantOnboardingResult[] = [];

  for (const entry of entries) {
    results.push(await onboardOne(entry.manifest));
  }

  return {
    manifestCount: entries.length,
    publishedCount: results.filter((result) => result.outcome === "published").length,
    alreadyPublishedCount: results.filter((result) => result.outcome === "already_published").length,
    failedCount: results.filter((result) => result.outcome === "failed").length,
    results,
  };
}
