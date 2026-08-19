import {
  createDatabasePool,
  getRestaurantActionState,
  MenuIndexRepository,
  quiesceRestaurantCandidate,
  recordRestaurantActionVerificationSuccess,
  setMenuSourceEnabled,
  setRestaurantCoverageActive,
  upsertRestaurantAction,
  upsertRestaurantCandidate,
  upsertRestaurantHoursSource,
  type RestaurantActionType,
  type WatchOutcome,
} from "@fysen/database";
import { verifyActionSource } from "./action-source-runtime.js";
import { HttpMenuClient } from "./http-client.js";
import {
  listRestaurantOnboardingManifests,
  readRestaurantOnboardingManifest,
  type RestaurantOnboardingManifest,
} from "./onboarding-manifest.js";
import {
  evaluateManifestMenuQuality,
  type ManifestMenuQualityResult,
} from "./manifest-quality.js";
import {
  watchRestaurantHoursSourceOnce,
  type OpeningHoursWatchResult,
} from "./run-opening-hours.js";
import {
  shouldForceReextract,
  watchMenuSourceOnce,
  type MenuWatchSummary,
} from "./watcher.js";

const acceptedOutcomes = new Set<WatchOutcome>(["changed", "unchanged", "not_modified"]);
const ACTION_VERIFICATION_DAYS = 30;
const ACTION_REVERIFY_WINDOW_DAYS = 7;

export type RestaurantOnboardingOutcome = "published" | "already_published" | "failed";
export type OnboardingActionOutcome = "verified" | "already_verified";

export interface OnboardingActionResult {
  readonly type: RestaurantActionType;
  readonly actionId: string;
  readonly outcome: OnboardingActionOutcome;
}

export interface RestaurantOnboardingResult {
  readonly slug: string;
  readonly outcome: RestaurantOnboardingOutcome;
  readonly restaurantId: string | null;
  readonly menuSourceId: string | null;
  readonly hoursSourceId: string | null;
  readonly hoursWatch: OpeningHoursWatchResult | null;
  readonly actions: readonly OnboardingActionResult[];
  readonly firstWatch: MenuWatchSummary | null;
  readonly secondWatch: MenuWatchSummary | null;
  readonly itemCount: number | null;
  readonly missingRequiredDishes: readonly string[];
  readonly forbiddenDishesPresent: readonly string[];
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

function acceptedHours(summary: OpeningHoursWatchResult): boolean {
  return summary.outcome === "changed" || summary.outcome === "unchanged" || summary.outcome === "not_modified";
}

function qualityFailure(prefix: string, quality: ManifestMenuQualityResult): string {
  return `${prefix}: items=${quality.itemCount}/${quality.minimumExpectedItems}, missing=${quality.missingRequiredDishes.join(",") || "none"}, forbidden=${quality.forbiddenDishesPresent.join(",") || "none"}`;
}

async function assertLatestSnapshot(
  repository: MenuIndexRepository,
  menuSourceId: string,
  manifest: RestaurantOnboardingManifest,
): Promise<ManifestMenuQualityResult> {
  const snapshot = await repository.getLatestSnapshotWithItems(menuSourceId);
  return evaluateManifestMenuQuality(manifest, snapshot?.items ?? []);
}

async function ensureAction(
  pool: ReturnType<typeof createDatabasePool>,
  manifest: RestaurantOnboardingManifest,
  restaurantId: string,
  action: RestaurantOnboardingManifest["actions"][number],
  client: HttpMenuClient,
): Promise<OnboardingActionResult> {
  const existing = await getRestaurantActionState(pool, restaurantId, action.type);
  const reverifyAfter = Date.now() + ACTION_REVERIFY_WINDOW_DAYS * 24 * 60 * 60 * 1000;
  if (
    existing?.enabled &&
    existing.url === action.url &&
    existing.sourceUrl === action.sourceUrl &&
    existing.provider === action.provider &&
    new Date(existing.expiresAt).getTime() > reverifyAfter
  ) {
    return { type: action.type, actionId: existing.id, outcome: "already_verified" };
  }

  const startedAt = new Date().toISOString();
  const verified = await verifyActionSource(
    { url: action.url, userAgent: manifest.menuSource.userAgent },
    client,
  );
  const completedAt = new Date().toISOString();
  const expiresAt = new Date(
    new Date(verified.fetchedAt).getTime() + ACTION_VERIFICATION_DAYS * 24 * 60 * 60 * 1000,
  ).toISOString();
  const actionId = await upsertRestaurantAction(pool, {
    restaurantId,
    actionType: action.type,
    url: action.url,
    sourceUrl: action.sourceUrl,
    provider: action.provider,
    verificationMethod: "first_party_page",
    verifiedAt: verified.fetchedAt,
    expiresAt,
  });
  await recordRestaurantActionVerificationSuccess(pool, {
    actionId,
    startedAt,
    completedAt,
    httpStatus: verified.httpStatus,
    verifiedAt: verified.fetchedAt,
    expiresAt,
  });
  return { type: action.type, actionId, outcome: "verified" };
}

async function ensureMetadata(
  pool: ReturnType<typeof createDatabasePool>,
  manifest: RestaurantOnboardingManifest,
  restaurantId: string,
): Promise<{ readonly hoursSourceId: string | null; readonly actions: readonly OnboardingActionResult[] }> {
  const hoursSourceId = manifest.hoursSource
    ? await upsertRestaurantHoursSource(pool, {
        restaurantId,
        url: manifest.hoursSource.url,
        timeZone: manifest.hoursSource.timeZone,
        checkIntervalMinutes: manifest.hoursSource.checkIntervalMinutes,
        minimumExpectedIntervals: manifest.hoursSource.minimumExpectedIntervals,
        scopeHints: manifest.hoursSource.scopeHints,
      })
    : null;

  const client = new HttpMenuClient();
  const actions: OnboardingActionResult[] = [];
  for (const action of manifest.actions) {
    actions.push(await ensureAction(pool, manifest, restaurantId, action, client));
  }
  return { hoursSourceId, actions };
}

async function onboardOne(
  manifest: RestaurantOnboardingManifest,
): Promise<RestaurantOnboardingResult> {
  const pool = createDatabasePool({ maxConnections: 2 });
  let restaurantId: string | null = null;
  let candidateWasActive: boolean | null = null;
  let menuSourceId: string | null = null;
  let hoursSourceId: string | null = null;
  let hoursWatch: OpeningHoursWatchResult | null = null;
  let actions: readonly OnboardingActionResult[] = [];
  let firstWatch: MenuWatchSummary | null = null;
  let secondWatch: MenuWatchSummary | null = null;
  let latestQuality: ManifestMenuQualityResult | null = null;

  try {
    const candidate = await upsertRestaurantCandidate(pool, manifest.restaurant);
    restaurantId = candidate.id;
    candidateWasActive = candidate.active;

    const repository = new MenuIndexRepository(pool);
    const source = await repository.upsertMenuSource({
      restaurantId: candidate.id,
      url: manifest.menuSource.url,
      sourceType: manifest.menuSource.sourceType,
      fetchMode: manifest.menuSource.fetchMode,
      userAgent: manifest.menuSource.userAgent,
      checkIntervalMinutes: manifest.menuSource.checkIntervalMinutes,
      minimumExpectedItems: manifest.menuSource.minimumExpectedItems,
    });
    menuSourceId = source.id;

    if (!candidate.active && !source.enabled) {
      await setMenuSourceEnabled(pool, source.id, true);
    }

    if (candidate.active) {
      const previousSnapshot = await repository.getLatestSnapshotWithItems(source.id);
      const requiresExtractorRefresh = previousSnapshot
        ? shouldForceReextract(source.sourceType, previousSnapshot.extractorVersion)
        : false;

      if (requiresExtractorRefresh) {
        await setRestaurantCoverageActive(pool, candidate.id, false);

        firstWatch = await watchMenuSourceOnce(repository, source.id);
        if (!accepted(firstWatch)) {
          throw new Error(`First extractor refresh watch was ${firstWatch.outcome}`);
        }

        latestQuality = await assertLatestSnapshot(repository, source.id, manifest);
        if (!latestQuality.accepted) {
          throw new Error(qualityFailure("First extractor refresh failed onboarding assertions", latestQuality));
        }

        secondWatch = await watchMenuSourceOnce(repository, source.id);
        if (!accepted(secondWatch)) {
          throw new Error(`Second extractor refresh watch was ${secondWatch.outcome}`);
        }
      }

      latestQuality = await assertLatestSnapshot(repository, source.id, manifest);
      if (!latestQuality.accepted) {
        await setRestaurantCoverageActive(pool, candidate.id, false);
        throw new Error(qualityFailure("Published restaurant no longer satisfies onboarding assertions", latestQuality));
      }
      const metadata = await ensureMetadata(pool, manifest, candidate.id);
      hoursSourceId = metadata.hoursSourceId;
      actions = metadata.actions;
      if (requiresExtractorRefresh) {
        await setRestaurantCoverageActive(pool, candidate.id, true);
      }
      return {
        slug: manifest.restaurant.slug,
        outcome: "already_published",
        restaurantId,
        menuSourceId,
        hoursSourceId,
        hoursWatch,
        actions,
        firstWatch,
        secondWatch,
        itemCount: latestQuality.itemCount,
        missingRequiredDishes: latestQuality.missingRequiredDishes,
        forbiddenDishesPresent: latestQuality.forbiddenDishesPresent,
        error: null,
      };
    }

    firstWatch = await watchMenuSourceOnce(repository, source.id);
    if (!accepted(firstWatch)) {
      throw new Error(`First onboarding watch was ${firstWatch.outcome}`);
    }

    latestQuality = await assertLatestSnapshot(repository, source.id, manifest);
    if (!latestQuality.accepted) {
      throw new Error(qualityFailure("First onboarding snapshot failed assertions", latestQuality));
    }

    secondWatch = await watchMenuSourceOnce(repository, source.id);
    if (!accepted(secondWatch)) {
      throw new Error(`Second onboarding watch was ${secondWatch.outcome}`);
    }

    latestQuality = await assertLatestSnapshot(repository, source.id, manifest);
    if (!latestQuality.accepted) {
      throw new Error(qualityFailure("Second onboarding snapshot failed assertions", latestQuality));
    }

    const metadata = await ensureMetadata(pool, manifest, candidate.id);
    hoursSourceId = metadata.hoursSourceId;
    actions = metadata.actions;
    if (hoursSourceId) {
      hoursWatch = await watchRestaurantHoursSourceOnce(pool, hoursSourceId);
      if (!acceptedHours(hoursWatch)) {
        throw new Error(`Initial onboarding hours watch was ${hoursWatch.outcome}${hoursWatch.errorCode ? ` (${hoursWatch.errorCode})` : ""}`);
      }
    }
    await setRestaurantCoverageActive(pool, candidate.id, true);
    return {
      slug: manifest.restaurant.slug,
      outcome: "published",
      restaurantId,
      menuSourceId,
      hoursSourceId,
      hoursWatch,
      actions,
      firstWatch,
      secondWatch,
      itemCount: latestQuality.itemCount,
      missingRequiredDishes: latestQuality.missingRequiredDishes,
      forbiddenDishesPresent: latestQuality.forbiddenDishesPresent,
      error: null,
    };
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : String(error);
    if (candidateWasActive === false && restaurantId) {
      try {
        const quiesced = await quiesceRestaurantCandidate(pool, restaurantId);
        errorMessage += `; candidate sources disabled: menu=${quiesced.menuSourcesDisabled}, hours=${quiesced.hoursSourcesDisabled}, actions=${quiesced.actionsDisabled}`;
      } catch (quiesceError) {
        errorMessage += `; candidate quiesce failed: ${quiesceError instanceof Error ? quiesceError.message : String(quiesceError)}`;
      }
    }

    return {
      slug: manifest.restaurant.slug,
      outcome: "failed",
      restaurantId,
      menuSourceId,
      hoursSourceId,
      hoursWatch,
      actions,
      firstWatch,
      secondWatch,
      itemCount: latestQuality?.itemCount ?? null,
      missingRequiredDishes: latestQuality?.missingRequiredDishes ?? [],
      forbiddenDishesPresent: latestQuality?.forbiddenDishesPresent ?? [],
      error: errorMessage,
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
