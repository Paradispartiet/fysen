import {
  createDatabasePool,
  listDueRestaurantHoursSources,
  recordRestaurantHoursFailure,
  recordRestaurantHoursNotModified,
  recordRestaurantHoursObservation,
  type RestaurantHoursWatchOutcome,
} from "@fysen/database";
import { sha256 } from "@fysen/menu-core";
import { HttpMenuClient, MenuFetchError } from "./http-client.js";
import {
  OPENING_HOURS_EXTRACTOR_VERSION,
  OpeningHoursExtractionError,
  extractKitchenOpeningHours,
} from "./opening-hours-extractor.js";

export interface OpeningHoursWatchSummary {
  readonly dueCount: number;
  readonly failedCount: number;
  readonly results: readonly {
    readonly sourceId: string;
    readonly outcome: RestaurantHoursWatchOutcome | "unexpected_error";
    readonly intervalCount: number | null;
    readonly snapshotId: string | null;
    readonly errorCode: string | null;
  }[];
}

function fingerprint(intervals: readonly { isoWeekday: number; opensAt: string; closesAt: string; closesNextDay: boolean }[]): string {
  return sha256(
    JSON.stringify(
      [...intervals].sort(
        (a, b) =>
          a.isoWeekday - b.isoWeekday ||
          a.opensAt.localeCompare(b.opensAt) ||
          a.closesAt.localeCompare(b.closesAt) ||
          Number(a.closesNextDay) - Number(b.closesNextDay),
      ),
    ),
  );
}

export async function runDueRestaurantHours(limit = 25): Promise<OpeningHoursWatchSummary> {
  const pool = createDatabasePool({ maxConnections: 2 });
  const client = new HttpMenuClient();
  const userAgent = process.env.FYSEN_MENU_BOT_USER_AGENT?.trim() || "FysenMenuBot/0.1";

  try {
    const due = await listDueRestaurantHoursSources(pool, limit);
    const results: Array<OpeningHoursWatchSummary["results"][number]> = [];
    let failedCount = 0;

    for (const source of due) {
      const startedAt = new Date().toISOString();
      try {
        const response = await client.fetchSource({
          url: source.url,
          userAgent,
          etag: source.etag,
          lastModified: source.lastModified,
        });
        const completedAt = new Date().toISOString();

        if (response.kind === "not_modified") {
          await recordRestaurantHoursNotModified(pool, {
            sourceId: source.id,
            startedAt,
            completedAt,
            fetchedAt: response.fetchedAt,
            etag: response.etag,
            lastModified: response.lastModified,
          });
          results.push({
            sourceId: source.id,
            outcome: "not_modified",
            intervalCount: null,
            snapshotId: null,
            errorCode: null,
          });
          continue;
        }

        if (source.extractor !== "visible_text_v1") {
          throw new OpeningHoursExtractionError("UNSUPPORTED_EXTRACTOR", `Unsupported hours extractor: ${source.extractor}`);
        }

        const extracted = extractKitchenOpeningHours(response.body, [
          source.url,
          source.restaurantSlug,
          source.restaurantName,
        ]);
        const observed = await recordRestaurantHoursObservation(pool, {
          sourceId: source.id,
          startedAt,
          completedAt,
          fetchedAt: response.fetchedAt,
          httpStatus: response.status,
          rawSha256: response.rawSha256,
          scheduleFingerprint: fingerprint(extracted.intervals),
          extractorVersion: OPENING_HOURS_EXTRACTOR_VERSION,
          sourceExcerpt: extracted.sourceExcerpt,
          etag: response.etag,
          lastModified: response.lastModified,
          intervals: extracted.intervals,
        });
        if (observed.outcome === "quarantined") failedCount += 1;
        results.push({
          sourceId: source.id,
          outcome: observed.outcome,
          intervalCount: extracted.intervals.length,
          snapshotId: observed.snapshotId,
          errorCode: observed.outcome === "quarantined" ? "SUSPICIOUS_INTERVAL_COUNT" : null,
        });
      } catch (error) {
        failedCount += 1;
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
          results.push({
            sourceId: source.id,
            outcome,
            intervalCount: null,
            snapshotId: null,
            errorCode,
          });
        } catch (auditError) {
          results.push({
            sourceId: source.id,
            outcome: "unexpected_error",
            intervalCount: null,
            snapshotId: null,
            errorCode: auditError instanceof Error ? auditError.message : String(auditError),
          });
        }
      }
    }

    return { dueCount: due.length, failedCount, results };
  } finally {
    await pool.end();
  }
}
