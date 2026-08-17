import type { Pool, PoolClient, QueryResultRow } from "pg";

export interface RestaurantCandidateInput {
  readonly slug: string;
  readonly name: string;
  readonly websiteUrl: string | null;
  readonly address: string;
  readonly city: string;
  readonly countryCode: string;
  readonly latitude: number;
  readonly longitude: number;
}

export interface RestaurantCoverageState {
  readonly id: string;
  readonly slug: string;
  readonly active: boolean;
}

export interface CandidateQuiesceResult {
  readonly menuSourcesDisabled: number;
  readonly hoursSourcesDisabled: number;
  readonly actionsDisabled: number;
}

interface CoverageRow extends QueryResultRow {
  id: string;
  slug: string;
  active: boolean;
}

function mapCoverage(row: CoverageRow): RestaurantCoverageState {
  return { id: row.id, slug: row.slug, active: row.active };
}

async function inTransaction<T>(pool: Pool, work: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await work(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function upsertRestaurantCandidate(
  pool: Pool,
  input: RestaurantCandidateInput,
): Promise<RestaurantCoverageState> {
  const result = await pool.query<CoverageRow>(
    `INSERT INTO fysen.restaurants (
       slug, name, website_url, address, city, country_code, location, active
     ) VALUES (
       $1, $2, $3, $4, $5, $6,
       ST_SetSRID(ST_MakePoint($8, $7), 4326)::geography,
       false
     )
     ON CONFLICT (slug) DO UPDATE SET
       name = EXCLUDED.name,
       website_url = EXCLUDED.website_url,
       address = EXCLUDED.address,
       city = EXCLUDED.city,
       country_code = EXCLUDED.country_code,
       location = EXCLUDED.location,
       updated_at = now()
     RETURNING id, slug, active`,
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
  const row = result.rows[0];
  if (!row) throw new Error(`Restaurant candidate upsert returned no row for ${input.slug}`);
  return mapCoverage(row);
}

export async function setRestaurantCoverageActive(
  pool: Pool,
  restaurantId: string,
  active: boolean,
): Promise<RestaurantCoverageState> {
  const result = await pool.query<CoverageRow>(
    `UPDATE fysen.restaurants
        SET active = $2, updated_at = now()
      WHERE id = $1
      RETURNING id, slug, active`,
    [restaurantId, active],
  );
  const row = result.rows[0];
  if (!row) throw new Error(`Unknown restaurant ${restaurantId}`);
  return mapCoverage(row);
}

export async function quiesceRestaurantCandidate(
  pool: Pool,
  restaurantId: string,
): Promise<CandidateQuiesceResult> {
  return inTransaction(pool, async (client) => {
    const candidate = await client.query<{ active: boolean }>(
      `SELECT active FROM fysen.restaurants WHERE id = $1 FOR UPDATE`,
      [restaurantId],
    );
    const row = candidate.rows[0];
    if (!row) throw new Error(`Unknown restaurant ${restaurantId}`);
    if (row.active) {
      return { menuSourcesDisabled: 0, hoursSourcesDisabled: 0, actionsDisabled: 0 };
    }

    const menuSources = await client.query(
      `UPDATE fysen.menu_sources
          SET enabled = false,
              updated_at = now()
        WHERE restaurant_id = $1
          AND enabled = true`,
      [restaurantId],
    );
    const hoursSources = await client.query(
      `UPDATE fysen.restaurant_hours_sources
          SET enabled = false,
              updated_at = now()
        WHERE restaurant_id = $1
          AND enabled = true`,
      [restaurantId],
    );
    const actions = await client.query(
      `UPDATE fysen.restaurant_actions
          SET enabled = false,
              updated_at = now()
        WHERE restaurant_id = $1
          AND enabled = true`,
      [restaurantId],
    );

    return {
      menuSourcesDisabled: menuSources.rowCount ?? 0,
      hoursSourcesDisabled: hoursSources.rowCount ?? 0,
      actionsDisabled: actions.rowCount ?? 0,
    };
  });
}

export async function getRestaurantCoverageState(
  pool: Pool,
  slug: string,
): Promise<RestaurantCoverageState | null> {
  const result = await pool.query<CoverageRow>(
    `SELECT id, slug, active FROM fysen.restaurants WHERE slug = $1`,
    [slug],
  );
  const row = result.rows[0];
  return row ? mapCoverage(row) : null;
}
