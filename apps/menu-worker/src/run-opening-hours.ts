import {
  createDatabasePool,
  getRestaurantHoursSourceById,
  listDueRestaurantHoursSources,
  recordRestaurantHoursFailure,
  recordRestaurantHoursNotModified,
  recordRestaurantHoursObservation,
  type RestaurantHoursSourceTarget,
  type RestaurantHoursWatchOutcome,
} from "@fysen/database";
import { HttpMenuClient, MenuFetchError } from "./http-client.js";
import { OpeningHoursExtractionError } from "./opening-hours-extractor.js";
import { resolveOpeningHoursSource } from "./opening-hours-source-runtime.js";

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
  readonly results: readonly OpeningHoursWatchResult[];
}

function menuBotUserAgent(): string {
  return process.env.FYSEN_MENU_BOT_USER_AGENT?.trim() || "FysenMenuBot/0.1";
}

async function watchRestaurantHoursTargetOnce(
  pool: ReturnType<typeof createDatabasePool>,
  source: RestaurantHoursSourceTarget,
  client: HttpMenuClient,
  userAgent: string,
): Promise<OpeningHoursWatchResult> {
  const startedAt = new Date().toISOString();
  try {
    const resolved = await resolveOpeningHoursSource(
      {
        url: source.url,
        userAgent,
        etag: source.etag,
        lastModified: source.lastModified,
        extractor: source.extractor,
        scopeHints: [
          ...source.scopeHints,
          source.url,
          source.restaurantSlug,
          source.restaurantName,
        ],
      },
      client,
    );
    const completedAt = new Date().toISOString();

    if (resolved.kind === "not_modified") {
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
    const results: OpeningHoursWatchResult[] = [];
    let failedCount = 0;

    for (const source of due) {
      const result = await watchRestaurantHoursTargetOnce(pool, source, client, userAgent);
      if (
        result.outcome === "quarantined" ||
        result.outcome === "extraction_error" ||
        result.outcome === "fetch_error" ||
        result.outcome === "unexpected_error"
      ) {
        failedCount += 1;
      }
      results.push(result);
    }

    return { dueCount: due.length, failedCount, results };
  } finally {
    await pool.end();
  }
}
