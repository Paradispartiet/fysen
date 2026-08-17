import type { Pool, PoolClient, QueryResultRow } from "pg";

export type MenuSourceType = "html" | "json_ld" | "pdf" | "image" | "api";
export type MenuSourceFetchMode = "http" | "browser";
export type WatchOutcome =
  | "changed"
  | "unchanged"
  | "not_modified"
  | "blocked_by_robots"
  | "fetch_error"
  | "extraction_error"
  | "quarantined";

export class ConcurrentMenuUpdateError extends Error {
  constructor(
    readonly menuSourceId: string,
    readonly expectedPreviousSnapshotId: string | null,
    readonly actualPreviousSnapshotId: string | null,
  ) {
    super(
      `Menu source ${menuSourceId} changed concurrently: expected previous snapshot ${expectedPreviousSnapshotId ?? "none"}, found ${actualPreviousSnapshotId ?? "none"}`,
    );
    this.name = "ConcurrentMenuUpdateError";
  }
}

export interface UpsertRestaurantInput {
  readonly slug: string;
  readonly name: string;
  readonly websiteUrl: string | null;
  readonly address: string;
  readonly city: string;
  readonly countryCode: string;
  readonly latitude: number;
  readonly longitude: number;
}

export interface UpsertMenuSourceInput {
  readonly restaurantId: string;
  readonly url: string;
  readonly sourceType: MenuSourceType;
  readonly fetchMode?: MenuSourceFetchMode;
  readonly userAgent: string;
  readonly checkIntervalMinutes: number;
  readonly minimumExpectedItems: number;
}

export interface StoredMenuSource {
  readonly id: string;
  readonly restaurantId: string;
  readonly url: string;
  readonly sourceType: MenuSourceType;
  readonly fetchMode: MenuSourceFetchMode;
  readonly enabled: boolean;
  readonly userAgent: string;
  readonly checkIntervalMinutes: number;
  readonly minimumExpectedItems: number;
  readonly etag: string | null;
  readonly lastModified: string | null;
  readonly lastMenuFingerprint: string | null;
}

export interface StoredMenuItem {
  readonly sourceKey: string;
  readonly name: string;
  readonly normalizedName: string;
  readonly description: string | null;
  readonly sectionName: string | null;
  readonly priceMinor: number | null;
  readonly currency: string;
  readonly position: number;
  readonly extractionMethod: "json_ld" | "html_heuristic" | "manual" | "api";
  readonly confidence: number;
  readonly sourceExcerpt: string | null;
}

export interface StoredSnapshot {
  readonly id: string;
  readonly menuSourceId: string;
  readonly fetchedAt: string;
  readonly normalizedSha256: string;
  readonly extractorVersion: string;
  readonly items: readonly StoredMenuItem[];
}

export interface SnapshotWriteInput {
  readonly menuSourceId: string;
  readonly expectedPreviousSnapshotId: string | null;
  readonly fetchedAt: string;
  readonly startedAt: string;
  readonly httpStatus: number;
  readonly responseContentType: string | null;
  readonly rawSha256: string;
  readonly normalizedSha256: string;
  readonly normalizedText: string;
  readonly etag: string | null;
  readonly lastModified: string | null;
  readonly robotsAllowed: boolean;
  readonly fetchDurationMs: number;
  readonly extractorVersion: string;
  readonly items: readonly StoredMenuItem[];
  readonly changes: readonly SnapshotChangeInput[];
}

export interface SnapshotChangeInput {
  readonly itemSourceKey: string | null;
  readonly kind: "added" | "removed" | "price_changed" | "content_changed";
  readonly before: unknown | null;
  readonly after: unknown | null;
}

export interface CheckMetadata {
  readonly menuSourceId: string;
  readonly startedAt: string;
  readonly completedAt: string;
  readonly httpStatus: number | null;
  readonly etag: string | null;
  readonly lastModified: string | null;
  readonly extractedItemCount: number | null;
  readonly details?: Readonly<Record<string, unknown>>;
}

export interface FailureMetadata extends CheckMetadata {
  readonly outcome: Exclude<WatchOutcome, "changed" | "unchanged" | "not_modified">;
  readonly errorCode: string;
  readonly errorMessage: string;
}

interface IdRow extends QueryResultRow {
  id: string;
}

interface SourceRow extends QueryResultRow {
  id: string;
  restaurant_id: string;
  url: string;
  source_type: MenuSourceType;
  fetch_mode: MenuSourceFetchMode;
  enabled: boolean;
  user_agent: string;
  check_interval_minutes: number;
  minimum_expected_items: number;
  etag: string | null;
  last_modified: string | null;
  last_menu_fingerprint: string | null;
}

interface SnapshotRow extends QueryResultRow {
  id: string;
  menu_source_id: string;
  fetched_at: Date;
  normalized_sha256: string;
  extractor_version: string;
}

interface ItemRow extends QueryResultRow {
  source_key: string;
  original_name: string;
  normalized_name: string;
  description: string | null;
  section_name: string | null;
  price_minor: number | null;
  currency: string;
  position: number;
  extraction_method: StoredMenuItem["extractionMethod"];
  confidence: number;
  source_excerpt: string | null;
}

function firstRow<T extends QueryResultRow>(rows: readonly T[], context: string): T {
  const row = rows[0];
  if (!row) throw new Error(`Expected a row from ${context}`);
  return row;
}

function mapSource(row: SourceRow): StoredMenuSource {
  return {
    id: row.id,
    restaurantId: row.restaurant_id,
    url: row.url,
    sourceType: row.source_type,
    fetchMode: row.fetch_mode,
    enabled: row.enabled,
    userAgent: row.user_agent,
    checkIntervalMinutes: row.check_interval_minutes,
    minimumExpectedItems: row.minimum_expected_items,
    etag: row.etag,
    lastModified: row.last_modified,
    lastMenuFingerprint: row.last_menu_fingerprint,
  };
}

function mapItem(row: ItemRow): StoredMenuItem {
  return {
    sourceKey: row.source_key,
    name: row.original_name,
    normalizedName: row.normalized_name,
    description: row.description,
    sectionName: row.section_name,
    priceMinor: row.price_minor,
    currency: row.currency,
    position: row.position,
    extractionMethod: row.extraction_method,
    confidence: Number(row.confidence),
    sourceExcerpt: row.source_excerpt,
  };
}

export class MenuIndexRepository {
  constructor(private readonly pool: Pool) {}

  async upsertRestaurant(input: UpsertRestaurantInput): Promise<string> {
    const result = await this.pool.query<IdRow>(
      `
        INSERT INTO fysen.restaurants (
          slug, name, website_url, address, city, country_code, location
        ) VALUES (
          $1, $2, $3, $4, $5, $6,
          ST_SetSRID(ST_MakePoint($8, $7), 4326)::geography
        )
        ON CONFLICT (slug) DO UPDATE SET
          name = EXCLUDED.name,
          website_url = EXCLUDED.website_url,
          address = EXCLUDED.address,
          city = EXCLUDED.city,
          country_code = EXCLUDED.country_code,
          location = EXCLUDED.location,
          updated_at = now()
        RETURNING id
      `,
      [
        input.slug,
        input.name,
        input.websiteUrl,
        input.address,
        input.city,
        input.countryCode,
        input.latitude,
        input.longitude,
      ],
    );
    return firstRow(result.rows, "restaurant upsert").id;
  }

  async upsertMenuSource(input: UpsertMenuSourceInput): Promise<StoredMenuSource> {
    const result = await this.pool.query<SourceRow>(
      `
        INSERT INTO fysen.menu_sources (
          restaurant_id, url, source_type, fetch_mode, user_agent, check_interval_minutes, minimum_expected_items
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (restaurant_id, url) DO UPDATE SET
          source_type = EXCLUDED.source_type,
          fetch_mode = EXCLUDED.fetch_mode,
          user_agent = EXCLUDED.user_agent,
          check_interval_minutes = EXCLUDED.check_interval_minutes,
          minimum_expected_items = EXCLUDED.minimum_expected_items,
          updated_at = now()
        RETURNING *
      `,
      [
        input.restaurantId,
        input.url,
        input.sourceType,
        input.fetchMode ?? "http",
        input.userAgent,
        input.checkIntervalMinutes,
        input.minimumExpectedItems,
      ],
    );
    return mapSource(firstRow(result.rows, "menu source upsert"));
  }

  async getMenuSourceById(id: string): Promise<StoredMenuSource | null> {
    const result = await this.pool.query<SourceRow>("SELECT * FROM fysen.menu_sources WHERE id = $1", [id]);
    const row = result.rows[0];
    return row ? mapSource(row) : null;
  }

  async getLatestSnapshotWithItems(menuSourceId: string): Promise<StoredSnapshot | null> {
    const snapshotResult = await this.pool.query<SnapshotRow>(
      `
        SELECT id, menu_source_id, fetched_at, normalized_sha256, extractor_version
        FROM fysen.menu_snapshots
        WHERE menu_source_id = $1
        ORDER BY fetched_at DESC, created_at DESC
        LIMIT 1
      `,
      [menuSourceId],
    );
    const snapshot = snapshotResult.rows[0];
    if (!snapshot) return null;

    const itemResult = await this.pool.query<ItemRow>(
      `
        SELECT source_key, original_name, normalized_name, description, section_name,
               price_minor, currency, position, extraction_method, confidence, source_excerpt
        FROM fysen.menu_items
        WHERE snapshot_id = $1
        ORDER BY position ASC, id ASC
      `,
      [snapshot.id],
    );

    return {
      id: snapshot.id,
      menuSourceId: snapshot.menu_source_id,
      fetchedAt: snapshot.fetched_at.toISOString(),
      normalizedSha256: snapshot.normalized_sha256,
      extractorVersion: snapshot.extractor_version,
      items: itemResult.rows.map(mapItem),
    };
  }

  async recordSnapshot(input: SnapshotWriteInput): Promise<string> {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const sourceLock = await client.query<IdRow>(
        "SELECT id FROM fysen.menu_sources WHERE id = $1 FOR UPDATE",
        [input.menuSourceId],
      );
      firstRow(sourceLock.rows, "menu source lock");

      const previousSnapshotId = await this.getLatestSnapshotId(client, input.menuSourceId);
      if (previousSnapshotId !== input.expectedPreviousSnapshotId) {
        throw new ConcurrentMenuUpdateError(
          input.menuSourceId,
          input.expectedPreviousSnapshotId,
          previousSnapshotId,
        );
      }

      const snapshotResult = await client.query<IdRow>(
        `
          INSERT INTO fysen.menu_snapshots (
            menu_source_id, fetched_at, http_status, response_content_type, raw_sha256,
            normalized_sha256, normalized_text, etag, last_modified, robots_allowed,
            fetch_duration_ms, extractor_version
          ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
          RETURNING id
        `,
        [
          input.menuSourceId,
          input.fetchedAt,
          input.httpStatus,
          input.responseContentType,
          input.rawSha256,
          input.normalizedSha256,
          input.normalizedText,
          input.etag,
          input.lastModified,
          input.robotsAllowed,
          input.fetchDurationMs,
          input.extractorVersion,
        ],
      );
      const snapshotId = firstRow(snapshotResult.rows, "snapshot insert").id;

      for (const item of input.items) {
        await client.query(
          `
            INSERT INTO fysen.menu_items (
              snapshot_id, source_key, original_name, normalized_name, description, section_name,
              price_minor, currency, position, extraction_method, confidence, source_excerpt
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
          `,
          [
            snapshotId,
            item.sourceKey,
            item.name,
            item.normalizedName,
            item.description,
            item.sectionName,
            item.priceMinor,
            item.currency,
            item.position,
            item.extractionMethod,
            item.confidence,
            item.sourceExcerpt,
          ],
        );
      }

      for (const change of input.changes) {
        await client.query(
          `
            INSERT INTO fysen.menu_changes (
              menu_source_id, previous_snapshot_id, current_snapshot_id, item_source_key,
              kind, before_value, after_value, detected_at
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
          `,
          [
            input.menuSourceId,
            previousSnapshotId,
            snapshotId,
            change.itemSourceKey,
            change.kind,
            change.before,
            change.after,
            input.fetchedAt,
          ],
        );
      }

      await client.query(
        `
          UPDATE fysen.menu_sources SET
            etag = $2,
            last_modified = $3,
            last_http_status = $4,
            last_menu_fingerprint = $5,
            last_checked_at = $6,
            last_changed_at = $6,
            next_check_at = $6::timestamptz + make_interval(mins => check_interval_minutes),
            consecutive_failures = 0,
            updated_at = now()
          WHERE id = $1
        `,
        [
          input.menuSourceId,
          input.etag,
          input.lastModified,
          input.httpStatus,
          input.normalizedSha256,
          input.fetchedAt,
        ],
      );

      await this.insertWatchRun(client, {
        menuSourceId: input.menuSourceId,
        snapshotId,
        outcome: "changed",
        startedAt: input.startedAt,
        completedAt: input.fetchedAt,
        httpStatus: input.httpStatus,
        extractedItemCount: input.items.length,
        errorCode: null,
        errorMessage: null,
        details: { changeCount: input.changes.length },
      });

      await client.query("COMMIT");
      return snapshotId;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async recordSuccessfulCheck(input: CheckMetadata, outcome: "unchanged" | "not_modified"): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(
        `
          UPDATE fysen.menu_sources SET
            etag = COALESCE($2, etag),
            last_modified = COALESCE($3, last_modified),
            last_http_status = $4,
            last_checked_at = $5,
            next_check_at = $5::timestamptz + make_interval(mins => check_interval_minutes),
            consecutive_failures = 0,
            updated_at = now()
          WHERE id = $1
        `,
        [input.menuSourceId, input.etag, input.lastModified, input.httpStatus, input.completedAt],
      );
      await this.insertWatchRun(client, {
        menuSourceId: input.menuSourceId,
        snapshotId: null,
        outcome,
        startedAt: input.startedAt,
        completedAt: input.completedAt,
        httpStatus: input.httpStatus,
        extractedItemCount: input.extractedItemCount,
        errorCode: null,
        errorMessage: null,
        details: input.details ?? {},
      });
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async recordFailure(input: FailureMetadata): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(
        `
          UPDATE fysen.menu_sources SET
            last_http_status = $2,
            last_checked_at = $3,
            next_check_at = $3::timestamptz + make_interval(mins => LEAST(1440, check_interval_minutes * 2)),
            consecutive_failures = consecutive_failures + 1,
            updated_at = now()
          WHERE id = $1
        `,
        [input.menuSourceId, input.httpStatus, input.completedAt],
      );
      await this.insertWatchRun(client, {
        menuSourceId: input.menuSourceId,
        snapshotId: null,
        outcome: input.outcome,
        startedAt: input.startedAt,
        completedAt: input.completedAt,
        httpStatus: input.httpStatus,
        extractedItemCount: input.extractedItemCount,
        errorCode: input.errorCode,
        errorMessage: input.errorMessage,
        details: input.details ?? {},
      });
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  private async getLatestSnapshotId(client: PoolClient, menuSourceId: string): Promise<string | null> {
    const result = await client.query<IdRow>(
      `
        SELECT id
        FROM fysen.menu_snapshots
        WHERE menu_source_id = $1
        ORDER BY fetched_at DESC, created_at DESC
        LIMIT 1
      `,
      [menuSourceId],
    );
    return result.rows[0]?.id ?? null;
  }

  private async insertWatchRun(
    client: PoolClient,
    input: {
      readonly menuSourceId: string;
      readonly snapshotId: string | null;
      readonly outcome: WatchOutcome;
      readonly startedAt: string;
      readonly completedAt: string;
      readonly httpStatus: number | null;
      readonly extractedItemCount: number | null;
      readonly errorCode: string | null;
      readonly errorMessage: string | null;
      readonly details: Readonly<Record<string, unknown>>;
    },
  ): Promise<void> {
    await client.query(
      `
        INSERT INTO fysen.menu_watch_runs (
          menu_source_id, snapshot_id, outcome, started_at, completed_at, http_status,
          extracted_item_count, error_code, error_message, details
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      `,
      [
        input.menuSourceId,
        input.snapshotId,
        input.outcome,
        input.startedAt,
        input.completedAt,
        input.httpStatus,
        input.extractedItemCount,
        input.errorCode,
        input.errorMessage,
        input.details,
      ],
    );
  }
}
