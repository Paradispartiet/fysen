import {
  createDatabasePool,
  getLatestRestaurantHoursSnapshotExtractorVersion,
  getRestaurantHoursSourceById,
  listDueRestaurantHoursSources,
  recordRestaurantHoursFailure,
  recordRestaurantHoursNotModified,
  recordRestaurantHoursObservation,
  type RestaurantHoursSourceTarget,
  type RestaurantHoursWatchOutcome,
} from "@fysen/database";
import { HttpMenuClient, MenuFetchError } from "./http-client.js";
import {
  getHoursVerificationStatus,
  listRestaurantOnboardingManifests,
  type HoursVerificationStatus,
} from "./onboarding-manifest.js";
import { OpeningHoursExtractionError } from "./opening-hours-extractor.js";
import {
  resolveOpeningHoursSource,
  shouldForceOpeningHoursReextract,
} from "./opening-hours-source-runtime.js";

export interface OpeningHoursWatchResult {
  readonly sourceId: string;
  readonly outcome: RestaurantHoursWatchOutcome | "unexpected_error";
  readonly intervalCount: number | null;
  readonly snapshotId: string | null;
  readonly errorCode: string | null;
}

export interface OpeningHoursWatchSummary {
  readonly dueCount: number;
  readonly failedCount: number;
  readonly blockingFailedCount: number;
  readonly nonBlockingFailedCount: number;
  readonly results: readonly OpeningHoursWatchResult[];
}

function menuBotUserAgent(): string {
  return process.env.FYSEN_MENU_BOT_USER_AGENT?.trim() || "FysenMenuBot/0.1";
}

function isFailedOutcome(outcome: OpeningHoursWatchResult["outcome"]): boolean {
  return (
    outcome === "quarantined" ||
    outcome === "extraction_error" ||
    outcome === "fetch_error" ||
    outcome === "unexpected_error"
  );
}

export function summarizeOpeningHoursWatchResults(
  due: readonly Pick<RestaurantHoursSourceTarget, "id" | "restaurantSlug">[],
  results: readonly OpeningHoursWatchResult[],
  verificationStatusBySlug: ReadonlyMap<string, HoursVerificationStatus>,
): OpeningHoursWatchSummary {
  const sourceById = new Map(due.map((source) => [source.id, source] as const));
  let failedCount = 0;
  let blockingFailedCount = 0;
  let nonBlockingFailedCount = 0;

  for (const result of results) {
    if (!isFailedOutcome(result.outcome)) continue;
    failedCount += 1;

    const source = sourceById.get(result.sourceId);
    const verificationStatus = source
      ? verificationStatusBySlug.get(source.restaurantSlug)
      : undefined;
    const explicitlyNonBlocking =
      result.outcome !== "unexpected_error" &&
      (verificationStatus === "provisional" || verificationStatus === "unverified");

    if (explicitlyNonBlocking) {
      nonBlockingFailedCount += 1;
    } else {
      blockingFailedCount += 1;
    }
  }

  return {
    dueCount: due.length,
    failedCount,
    blockingFailedCount,
    nonBlockingFailedCount,
    results,
  };
}

async function watchRestaurantHoursTargetOnce(
  pool: ReturnType<typeof createDatabasePool>,
  source: RestaurantHoursSourceTarget,
  client: HttpMenuClient,
  userAgent: string,
): Promise<OpeningHoursWatchResult> {
  const startedAt = new Date().toISOString();
  try {
    const previousExtractorVersion =
      await getLatestRestaurantHoursSnapshotExtractorVersion(pool, source.id);
    const forceReextract = shouldForceOpeningHoursReextract(
      previousExtractorVersion,
    );
    const resolved = await resolveOpeningHoursSource(
      {
        url: source.url,
        userAgent,
        etag: forceReextract ? null : source.etag,
        lastModified: forceReextract ? null : source.lastModified,
        extractor: source.extractor,
        scopeHints: source.scopeHints,
        fallbackScopeHints: [
          source.url,
          source.restaurantSlug,
          source.restaurantName,
        ],
      },
      client,
    );
    const completedAt = new Date().toISOString();

    if (resolved.kind === "not_modified") {
      if (forceReextract) {
        const errorCode = "FORCED_HOURS_REEXTRACT_NOT_MODIFIED";
        const errorMessage =
          "Hours source returned HTTP 304 while a newer runtime extractor required a full re-extraction";
        await recordRestaurantHoursFailure(pool, {
          sourceId: source.id,
          outcome: "fetch_error",
          startedAt,
          completedAt,
          httpStatus: resolved.fetched.status,
          errorCode,
          errorMessage,
        });
        return {
          sourceId: source.id,
          outcome: "fetch_error",
          intervalCount: null,
          snapshotId: null,
          errorCode,
        };
      }
      await recordRestaurantHoursNotModified(pool, {
        sourceId: source.id,
        startedAt,
        completedAt,
        fetchedAt: resolved.fetched.fetchedAt,
        etag: resolved.fetched.etag,
        lastModified: resolved.fetched.lastModified,
      });
      return {
        sourceId: source.id,
        outcome: "not_modified",
        intervalCount: null,
        snapshotId: null,
        errorCode: null,
      };
    }

    const observed = await recordRestaurantHoursObservation(pool, {
      sourceId: source.id,
      startedAt,
      completedAt,
      fetchedAt: resolved.fetched.fetchedAt,
      httpStatus: resolved.fetched.status,
      rawSha256: resolved.fetched.rawSha256,
      scheduleFingerprint: resolved.scheduleFingerprint,
      extractorVersion: resolved.extractorVersion,
      sourceExcerpt: resolved.extracted.sourceExcerpt,
      etag: resolved.fetched.etag,
      lastModified: resolved.fetched.lastModified,
      intervals: resolved.extracted.intervals,
    });
    return {
      sourceId: source.id,
      outcome: observed.outcome,
      intervalCount: resolved.extracted.intervals.length,
      snapshotId: observed.snapshotId,
      errorCode: observed.outcome === "quarantined" ? "SUSPICIOUS_INTERVAL_COUNT" : null,
    };
  } catch (error) {
    const completedAt = new Date().toISOString();
    const fetchError = error instanceof MenuFetchError ? error : null;
    const extractionError = error instanceof OpeningHoursExtractionError ? error : null;
    const outcome = extractionError ? "extraction_error" : "fetch_error";
    const errorCode = extractionError?.code ?? fetchError?.code ?? "UNEXPECTED_ERROR";
    const errorMessage = error instanceof Error ? error.message : String(error);
    try {
      await recordRestaurantHoursFailure(pool, {
        sourceId: source.id,
        outcome,
        startedAt,
        completedAt,
        httpStatus: fetchError?.httpStatus ?? null,
        errorCode,
        errorMessage,
      });
      return {
        sourceId: source.id,
        outcome,
        intervalCount: null,
        snapshotId: null,
        errorCode,
      };
    } catch (auditError) {
      return {
        sourceId: source.id,
        outcome: "unexpected_error",
        intervalCount: null,
        snapshotId: null,
        errorCode: auditError instanceof Error ? auditError.message : String(auditError),
      };
    }
  }
}

export async function watchRestaurantHoursSourceOnce(
  pool: ReturnType<typeof createDatabasePool>,
  sourceId: string,
  client = new HttpMenuClient(),
): Promise<OpeningHoursWatchResult> {
  const source = await getRestaurantHoursSourceById(pool, sourceId);
  if (!source) throw new Error(`Restaurant hours source ${sourceId} is missing or disabled`);
  return watchRestaurantHoursTargetOnce(pool, source, client, menuBotUserAgent());
}

export async function runDueRestaurantHours(limit = 25): Promise<OpeningHoursWatchSummary> {
  const pool = createDatabasePool({ maxConnections: 2 });
  const client = new HttpMenuClient();
  const userAgent = menuBotUserAgent();

  try {
    const due = await listDueRestaurantHoursSources(pool, limit);
    const catalog = await listRestaurantOnboardingManifests();
    const verificationStatusBySlug = new Map(
      catalog.map(({ manifest }) => [
        manifest.restaurant.slug,
        getHoursVerificationStatus(manifest),
      ] as const),
    );
    const results: OpeningHoursWatchResult[] = [];

    for (const source of due) {
      results.push(await watchRestaurantHoursTargetOnce(pool, source, client, userAgent));
    }

    return summarizeOpeningHoursWatchResults(due, results, verificationStatusBySlug);
  } finally {
    await pool.end();
  }
}
