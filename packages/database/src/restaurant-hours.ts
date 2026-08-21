import type { Pool, PoolClient, QueryResultRow } from "pg";

export type RestaurantHoursWatchOutcome =
  | "changed"
  | "unchanged"
  | "not_modified"
  | "fetch_error"
  | "extraction_error"
  | "quarantined";

export interface RestaurantHoursSourceTarget {
  readonly id: string;
  readonly restaurantId: string;
  readonly restaurantSlug: string;
  readonly restaurantName: string;
  readonly serviceType: "kitchen";
  readonly url: string;
  readonly timeZone: string;
  readonly extractor: "visible_text_v1";
  readonly checkIntervalMinutes: number;
  readonly minimumExpectedIntervals: number;
  readonly scopeHints: readonly string[];
  readonly etag: string | null;
  readonly lastModified: string | null;
  readonly lastScheduleFingerprint: string | null;
}

export interface RestaurantHoursIntervalInput {
  readonly isoWeekday: number;
  readonly opensAt: string;
  readonly closesAt: string;
  readonly closesNextDay: boolean;
}

export interface RestaurantHoursObservationInput {
  readonly sourceId: string;
  readonly startedAt: string;
  readonly completedAt: string;
  readonly fetchedAt: string;
  readonly httpStatus: number;
  readonly rawSha256: string;
  readonly scheduleFingerprint: string;
  readonly extractorVersion: string;
  readonly sourceExcerpt: string | null;
  readonly etag: string | null;
  readonly lastModified: string | null;
  readonly intervals: readonly RestaurantHoursIntervalInput[];
}

interface SourceRow extends QueryResultRow {
  id: string;
  restaurant_id: string;
  restaurant_slug: string;
  restaurant_name: string;
  service_type: "kitchen";
  url: string;
  time_zone: string;
  extractor: "visible_text_v1";
  check_interval_minutes: number;
  minimum_expected_intervals: number;
  scope_hints: string[];
  etag: string | null;
  last_modified: string | null;
  last_schedule_fingerprint: string | null;
}

interface LockedSourceRow extends QueryResultRow {
  id: string;
  check_interval_minutes: number;
  minimum_expected_intervals: number;
  last_schedule_fingerprint: string | null;
  last_checked_at: Date | null;
}

interface SnapshotStateRow extends QueryResultRow {
  interval_count: number;
  extractor_version: string;
}

function mapSource(row: SourceRow): RestaurantHoursSourceTarget {
  return {
    id: row.id,
    restaurantId: row.restaurant_id,
    restaurantSlug: row.restaurant_slug,
    restaurantName: row.restaurant_name,
    serviceType: row.service_type,
    url: row.url,
    timeZone: row.time_zone,
    extractor: row.extractor,
    checkIntervalMinutes: Number(row.check_interval_minutes),
    minimumExpectedIntervals: Number(row.minimum_expected_intervals),
    scopeHints: row.scope_hints,
    etag: row.etag,
    lastModified: row.last_modified,
    lastScheduleFingerprint: row.last_schedule_fingerprint,
  };
}

function nextCheckAt(baseIso: string, minutes: number): string {
  return new Date(new Date(baseIso).getTime() + minutes * 60_000).toISOString();
}

async function insertWatchRun(
  client: PoolClient,
  input: {
    readonly sourceId: string;
    readonly snapshotId: string | null;
    readonly outcome: RestaurantHoursWatchOutcome;
    readonly startedAt: string;
    readonly completedAt: string;
    readonly httpStatus: number | null;
    readonly errorCode: string | null;
    readonly errorMessage: string | null;
  },
): Promise<void> {
  await client.query(
    `INSERT INTO fysen.restaurant_hours_watch_runs (
       source_id, snapshot_id, outcome, started_at, completed_at,
       http_status, error_code, error_message
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      input.sourceId,
      input.snapshotId,
      input.outcome,
      input.startedAt,
      input.completedAt,
      input.httpStatus,
      input.errorCode,
      input.errorMessage,
    ],
  );
}

async function lockSource(client: PoolClient, sourceId: string): Promise<LockedSourceRow> {
  const result = await client.query<LockedSourceRow>(
    `SELECT id, check_interval_minutes, minimum_expected_intervals,
            last_schedule_fingerprint, last_checked_at
       FROM fysen.restaurant_hours_sources
      WHERE id = $1 AND enabled = true
      FOR UPDATE`,
    [sourceId],
  );
  const row = result.rows[0];
  if (!row) throw new Error(`Restaurant hours source ${sourceId} is missing or disabled`);
  return row;
}

export async function listDueRestaurantHoursSources(
  pool: Pool,
  limit = 25,
): Promise<readonly RestaurantHoursSourceTarget[]> {
  const boundedLimit = Math.max(1, Math.min(100, Math.trunc(limit)));
  const result = await pool.query<SourceRow>(
    `SELECT s.id,
            s.restaurant_id,
            r.slug AS restaurant_slug,
            r.name AS restaurant_name,
            s.service_type,
            s.url,
            s.time_zone,
            s.extractor,
            s.check_interval_minutes,
            s.minimum_expected_intervals,
            s.scope_hints,
            s.etag,
            s.last_modified,
            s.last_schedule_fingerprint
       FROM fysen.restaurant_hours_sources s
       JOIN fysen.restaurants r ON r.id = s.restaurant_id
      WHERE s.enabled = true
        AND s.next_check_at <= now()
      ORDER BY s.next_check_at ASC, s.id ASC
      LIMIT $1`,
    [boundedLimit],
  );
  return result.rows.map(mapSource);
}

export async function recordRestaurantHoursObservation(
  pool: Pool,
  input: RestaurantHoursObservationInput,
): Promise<{ readonly outcome: "changed" | "unchanged" | "quarantined"; readonly snapshotId: string | null }> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const source = await lockSource(client, input.sourceId);

    if (source.last_checked_at && new Date(input.fetchedAt).getTime() < source.last_checked_at.getTime()) {
      throw new Error(`Stale restaurant hours observation for ${input.sourceId}`);
    }

    const previousResult = await client.query<SnapshotStateRow>(
      `SELECT interval_count, extractor_version
         FROM fysen.restaurant_hours_snapshots
        WHERE source_id = $1
        ORDER BY fetched_at DESC, created_at DESC
        LIMIT 1`,
      [input.sourceId],
    );
    const previousSnapshot = previousResult.rows[0] ?? null;
    const previousCount = previousSnapshot?.interval_count ?? null;
    const suspiciousMinimum = previousCount === null ? 0 : Math.ceil(Number(previousCount) * 0.5);
    const requiredMinimum = Math.max(source.minimum_expected_intervals, suspiciousMinimum);

    if (input.intervals.length < requiredMinimum) {
      await client.query(
        `UPDATE fysen.restaurant_hours_sources
            SET consecutive_failures = consecutive_failures + 1,
                next_check_at = $2,
                updated_at = now()
          WHERE id = $1`,
        [input.sourceId, nextCheckAt(input.completedAt, Math.min(120, source.check_interval_minutes))],
      );
      await insertWatchRun(client, {
        sourceId: input.sourceId,
        snapshotId: null,
        outcome: "quarantined",
        startedAt: input.startedAt,
        completedAt: input.completedAt,
        httpStatus: input.httpStatus,
        errorCode: "SUSPICIOUS_INTERVAL_COUNT",
        errorMessage: `Extracted ${input.intervals.length} intervals; expected at least ${requiredMinimum}`,
      });
      await client.query("COMMIT");
      return { outcome: "quarantined", snapshotId: null };
    }

    const scheduleUnchanged =
      source.last_schedule_fingerprint === input.scheduleFingerprint;
    const extractorUnchanged =
      previousSnapshot?.extractor_version === input.extractorVersion;

    if (scheduleUnchanged && extractorUnchanged) {
      await client.query(
        `UPDATE fysen.restaurant_hours_sources
            SET etag = $2,
                last_modified = $3,
                last_checked_at = $4,
                next_check_at = $5,
                consecutive_failures = 0,
                updated_at = now()
          WHERE id = $1`,
        [
          input.sourceId,
          input.etag,
          input.lastModified,
          input.fetchedAt,
          nextCheckAt(input.fetchedAt, source.check_interval_minutes),
        ],
      );
      await insertWatchRun(client, {
        sourceId: input.sourceId,
        snapshotId: null,
        outcome: "unchanged",
        startedAt: input.startedAt,
        completedAt: input.completedAt,
        httpStatus: input.httpStatus,
        errorCode: null,
        errorMessage: null,
      });
      await client.query("COMMIT");
      return { outcome: "unchanged", snapshotId: null };
    }

    const snapshotResult = await client.query<{ id: string }>(
      `INSERT INTO fysen.restaurant_hours_snapshots (
         source_id, fetched_at, raw_sha256, schedule_fingerprint,
         extractor_version, interval_count, source_excerpt
       ) VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [
        input.sourceId,
        input.fetchedAt,
        input.rawSha256,
        input.scheduleFingerprint,
        input.extractorVersion,
        input.intervals.length,
        input.sourceExcerpt,
      ],
    );
    const snapshotId = snapshotResult.rows[0]?.id;
    if (!snapshotId) throw new Error("Restaurant hours snapshot insert did not return an id");

    for (const interval of input.intervals) {
      await client.query(
        `INSERT INTO fysen.restaurant_hours_intervals (
           snapshot_id, iso_weekday, opens_at, closes_at, closes_next_day
         ) VALUES ($1, $2, $3::time, $4::time, $5)`,
        [snapshotId, interval.isoWeekday, interval.opensAt, interval.closesAt, interval.closesNextDay],
      );
    }

    await client.query(
      `UPDATE fysen.restaurant_hours_sources
          SET etag = $2,
              last_modified = $3,
              last_schedule_fingerprint = $4,
              last_checked_at = $5,
              last_changed_at = CASE
                WHEN last_schedule_fingerprint IS DISTINCT FROM $4 THEN $5
                ELSE last_changed_at
              END,
              next_check_at = $6,
              consecutive_failures = 0,
              updated_at = now()
        WHERE id = $1`,
      [
        input.sourceId,
        input.etag,
        input.lastModified,
        input.scheduleFingerprint,
        input.fetchedAt,
        nextCheckAt(input.fetchedAt, source.check_interval_minutes),
      ],
    );
    await insertWatchRun(client, {
      sourceId: input.sourceId,
      snapshotId,
      outcome: scheduleUnchanged ? "unchanged" : "changed",
      startedAt: input.startedAt,
      completedAt: input.completedAt,
      httpStatus: input.httpStatus,
      errorCode: null,
      errorMessage: null,
    });
    await client.query("COMMIT");
    return {
      outcome: scheduleUnchanged ? "unchanged" : "changed",
      snapshotId,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function recordRestaurantHoursNotModified(
  pool: Pool,
  input: {
    readonly sourceId: string;
    readonly startedAt: string;
    readonly completedAt: string;
    readonly fetchedAt: string;
    readonly etag: string | null;
    readonly lastModified: string | null;
  },
): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const source = await lockSource(client, input.sourceId);
    if (!source.last_schedule_fingerprint) {
      throw new Error(`Cannot accept 304 before first restaurant hours snapshot for ${input.sourceId}`);
    }
    await client.query(
      `UPDATE fysen.restaurant_hours_sources
          SET etag = $2,
              last_modified = $3,
              last_checked_at = $4,
              next_check_at = $5,
              consecutive_failures = 0,
              updated_at = now()
        WHERE id = $1`,
      [
        input.sourceId,
        input.etag,
        input.lastModified,
        input.fetchedAt,
        nextCheckAt(input.fetchedAt, source.check_interval_minutes),
      ],
    );
    await insertWatchRun(client, {
      sourceId: input.sourceId,
      snapshotId: null,
      outcome: "not_modified",
      startedAt: input.startedAt,
      completedAt: input.completedAt,
      httpStatus: 304,
      errorCode: null,
      errorMessage: null,
    });
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function recordRestaurantHoursFailure(
  pool: Pool,
  input: {
    readonly sourceId: string;
    readonly outcome: "fetch_error" | "extraction_error";
    readonly startedAt: string;
    readonly completedAt: string;
    readonly httpStatus: number | null;
    readonly errorCode: string;
    readonly errorMessage: string;
  },
): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const source = await lockSource(client, input.sourceId);
    await client.query(
      `UPDATE fysen.restaurant_hours_sources
          SET consecutive_failures = consecutive_failures + 1,
              next_check_at = $2,
              updated_at = now()
        WHERE id = $1`,
      [input.sourceId, nextCheckAt(input.completedAt, Math.min(120, source.check_interval_minutes))],
    );
    await insertWatchRun(client, {
      sourceId: input.sourceId,
      snapshotId: null,
      outcome: input.outcome,
      startedAt: input.startedAt,
      completedAt: input.completedAt,
      httpStatus: input.httpStatus,
      errorCode: input.errorCode,
      errorMessage: input.errorMessage.slice(0, 2000),
    });
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
