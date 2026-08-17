import type { Pool, PoolClient, QueryResultRow } from "pg";

export type FunnelMatchType = "exact" | "canonical" | "prefix" | "contains" | "fuzzy";
export type ConversionEventType =
  | "menu_clicked"
  | "restaurant_clicked"
  | "directions_clicked"
  | "booking_clicked"
  | "order_clicked";

export interface SearchFunnelImpressionInput {
  readonly menuItemId: string;
  readonly restaurantId: string;
  readonly rank: number;
  readonly matchType: FunnelMatchType;
  readonly matchScore: number;
}

export interface RecordSearchFunnelInput {
  readonly normalizedQuery: string;
  readonly city: string;
  readonly impressions: readonly SearchFunnelImpressionInput[];
}

export interface RecordedSearchFunnel {
  readonly searchId: string;
  readonly impressionIdsByMenuItemId: Readonly<Record<string, string>>;
}

export interface RecordConversionEventInput {
  readonly clientEventId: string;
  readonly impressionId: string;
  readonly eventType: ConversionEventType;
}

interface IdRow extends QueryResultRow {
  id: string;
}

interface ImpressionIdRow extends QueryResultRow {
  id: string;
  menu_item_id: string;
}

async function insertImpressions(
  client: PoolClient,
  searchId: string,
  impressions: readonly SearchFunnelImpressionInput[],
): Promise<Readonly<Record<string, string>>> {
  if (impressions.length === 0) return {};

  const menuItemIds = impressions.map((impression) => impression.menuItemId);
  const restaurantIds = impressions.map((impression) => impression.restaurantId);
  const ranks = impressions.map((impression) => impression.rank);
  const matchTypes = impressions.map((impression) => impression.matchType);
  const matchScores = impressions.map((impression) => impression.matchScore);

  const result = await client.query<ImpressionIdRow>(
    `
      INSERT INTO fysen.search_result_impressions (
        search_id,
        menu_item_id,
        restaurant_id,
        rank,
        match_type,
        match_score
      )
      SELECT
        $1::uuid,
        impression.menu_item_id,
        impression.restaurant_id,
        impression.rank,
        impression.match_type,
        impression.match_score
      FROM unnest(
        $2::uuid[],
        $3::uuid[],
        $4::integer[],
        $5::text[],
        $6::double precision[]
      ) AS impression(menu_item_id, restaurant_id, rank, match_type, match_score)
      RETURNING id, menu_item_id
    `,
    [searchId, menuItemIds, restaurantIds, ranks, matchTypes, matchScores],
  );

  return Object.fromEntries(result.rows.map((row) => [row.menu_item_id, row.id]));
}

export async function recordSearchFunnel(
  pool: Pool,
  input: RecordSearchFunnelInput,
): Promise<RecordedSearchFunnel> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const searchResult = await client.query<IdRow>(
      `
        INSERT INTO fysen.search_events (normalized_query, city, result_count)
        VALUES ($1, $2, $3)
        RETURNING id
      `,
      [input.normalizedQuery, input.city, input.impressions.length],
    );
    const searchId = searchResult.rows[0]?.id;
    if (!searchId) throw new Error("Failed to create Fysen search event");

    const impressionIdsByMenuItemId = await insertImpressions(client, searchId, input.impressions);
    await client.query("COMMIT");

    return { searchId, impressionIdsByMenuItemId };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function recordConversionEvent(
  pool: Pool,
  input: RecordConversionEventInput,
): Promise<string> {
  const inserted = await pool.query<IdRow>(
    `
      INSERT INTO fysen.conversion_events (client_event_id, impression_id, event_type)
      VALUES ($1, $2, $3)
      ON CONFLICT (client_event_id) DO NOTHING
      RETURNING id
    `,
    [input.clientEventId, input.impressionId, input.eventType],
  );

  const insertedId = inserted.rows[0]?.id;
  if (insertedId) return insertedId;

  const existing = await pool.query<IdRow>(
    "SELECT id FROM fysen.conversion_events WHERE client_event_id = $1",
    [input.clientEventId],
  );
  const existingId = existing.rows[0]?.id;
  if (!existingId) throw new Error("Failed to record or resolve Fysen conversion event");
  return existingId;
}
