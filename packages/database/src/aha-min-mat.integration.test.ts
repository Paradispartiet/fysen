import type { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDatabasePool } from "./client.js";
import {
  createAhaConsumerSession,
  issueAhaAnalysisHandoff,
  listMinMatItems,
  redeemAhaAnalysisHandoff,
  removeMinMatItem,
  revokeAhaConsumerSession,
  saveMinMatItem,
} from "./aha-min-mat.js";
import { runMigrations } from "./migrate.js";
import { MenuIndexRepository } from "./repository.js";

const databaseUrl = process.env.DATABASE_URL;
const integrationDescribe = databaseUrl ? describe : describe.skip;

integrationDescribe("AHA Min mat integration", () => {
  let pool: Pool;
  let menuItemId = "";
  let snapshotId = "";
  let restaurantId = "";

  beforeAll(async () => {
    if (!databaseUrl) throw new Error("DATABASE_URL is required for integration tests");
    pool = createDatabasePool({ connectionString: databaseUrl });
    await runMigrations(pool);
    await pool.query("TRUNCATE fysen.aha_consumer_sessions CASCADE");
    await pool.query("TRUNCATE fysen.restaurants CASCADE");

    const repository = new MenuIndexRepository(pool);
    restaurantId = await repository.upsertRestaurant({
      slug: "aha-min-mat-test-oslo",
      name: "AHA Min Mat Test",
      websiteUrl: "https://minmat.example/",
      address: "Matveien 1",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.9139,
      longitude: 10.7522,
    });
    const source = await repository.upsertMenuSource({
      restaurantId,
      url: "https://minmat.example/menu",
      sourceType: "html",
      userAgent: "FysenMenuBot/0.1",
      checkIntervalMinutes: 360,
      minimumExpectedItems: 1,
    });
    const now = new Date().toISOString();
    snapshotId = await repository.recordSnapshot({
      menuSourceId: source.id,
      expectedPreviousSnapshotId: null,
      fetchedAt: now,
      startedAt: now,
      httpStatus: 200,
      responseContentType: "text/html",
      rawSha256: "a".repeat(64),
      normalizedSha256: "b".repeat(64),
      normalizedText: "Daal makhani 199",
      etag: null,
      lastModified: null,
      robotsAllowed: true,
      fetchDurationMs: 5,
      extractorVersion: "aha-min-mat-test",
      items: [{
        sourceKey: "c".repeat(64),
        name: "Daal makhani",
        normalizedName: "daal makhani",
        description: null,
        sectionName: "Vegetar",
        priceMinor: 19900,
        currency: "NOK",
        position: 0,
        extractionMethod: "html_heuristic",
        confidence: 0.95,
        sourceExcerpt: "Daal makhani 199",
      }],
      changes: [],
    });
    const item = await pool.query<{ id: string }>("SELECT id FROM fysen.menu_items WHERE snapshot_id = $1 LIMIT 1", [snapshotId]);
    menuItemId = item.rows[0]?.id ?? "";
    if (!menuItemId) throw new Error("Expected Min mat menu item");
  });

  afterAll(async () => { await pool.end(); });

  it("keeps AHA consumer auth hash-only, replay-safe and separate from Fysen Pro", async () => {
    const authorization = {
      authorizationId: "33333333-3333-4333-8333-333333333333",
      subject: "aha-subject-min-mat",
      provider: "supabase",
      scopes: ["fysen:min_mat", "fysen:analysis_handoff"] as const,
      policyVersion: "aha_fysen_connection_v1" as const,
      expiresAt: new Date(Date.now() + 60_000).toISOString(),
    };
    const session = await createAhaConsumerSession(pool, authorization);
    expect(session?.sessionToken.length).toBeGreaterThanOrEqual(43);
    if (!session) throw new Error("Expected AHA consumer session");
    await expect(createAhaConsumerSession(pool, authorization)).resolves.toBeNull();

    const stored = await pool.query<{ token_hash: string }>(
      "SELECT token_hash FROM fysen.aha_consumer_sessions WHERE aha_authorization_id = $1",
      [authorization.authorizationId],
    );
    expect(stored.rows[0]?.token_hash).toMatch(/^[a-f0-9]{64}$/);
    expect(stored.rows[0]?.token_hash).not.toBe(session.sessionToken);

    const columns = await pool.query<{ column_name: string }>(
      `SELECT column_name FROM information_schema.columns
        WHERE table_schema = 'fysen'
          AND table_name IN ('aha_consumer_sessions', 'aha_analysis_handoffs')`,
    );
    expect(columns.rows.map((row) => row.column_name)).not.toContain("session_token");
    expect(columns.rows.map((row) => row.column_name)).not.toContain("handoff_token");

    const proLink = await pool.query<{ count: string }>(
      `SELECT count(*)::text AS count
         FROM information_schema.constraint_column_usage
        WHERE table_schema = 'fysen'
          AND table_name IN ('restaurant_access_grants', 'restaurant_pro_sessions')
          AND column_name IN ('aha_subject', 'aha_authorization_id')`,
    );
    expect(Number(proLink.rows[0]?.count ?? "0")).toBe(0);

    const canonicalBefore = await pool.query(
      `SELECT r.name, mi.original_name, mi.price_minor, snap.normalized_sha256
         FROM fysen.menu_items mi
         JOIN fysen.menu_snapshots snap ON snap.id = mi.snapshot_id
         JOIN fysen.menu_sources src ON src.id = snap.menu_source_id
         JOIN fysen.restaurants r ON r.id = src.restaurant_id
        WHERE mi.id = $1`,
      [menuItemId],
    );

    const saved = await saveMinMatItem(pool, session.sessionToken, menuItemId);
    expect(saved).toMatchObject({
      menuItemId,
      snapshotId,
      restaurantId,
      dishName: "Daal makhani",
      restaurantName: "AHA Min Mat Test",
      restaurantSlug: "aha-min-mat-test-oslo",
      city: "Oslo",
      priceMinor: 19900,
      currency: "NOK",
    });
    await expect(saveMinMatItem(pool, session.sessionToken, "44444444-4444-4444-8444-444444444444")).resolves.toBeNull();
    await expect(listMinMatItems(pool, session.sessionToken)).resolves.toHaveLength(1);

    const canonicalAfter = await pool.query(
      `SELECT r.name, mi.original_name, mi.price_minor, snap.normalized_sha256
         FROM fysen.menu_items mi
         JOIN fysen.menu_snapshots snap ON snap.id = mi.snapshot_id
         JOIN fysen.menu_sources src ON src.id = snap.menu_source_id
         JOIN fysen.restaurants r ON r.id = src.restaurant_id
        WHERE mi.id = $1`,
      [menuItemId],
    );
    expect(canonicalAfter.rows).toEqual(canonicalBefore.rows);

    const handoff = await issueAhaAnalysisHandoff(pool, session.sessionToken);
    expect(handoff?.handoffToken.length).toBeGreaterThanOrEqual(43);
    if (!handoff || !saved) throw new Error("Expected AHA handoff");
    const storedHandoff = await pool.query<{ token_hash: string; item_ids: string[] }>(
      "SELECT token_hash, item_ids FROM fysen.aha_analysis_handoffs ORDER BY created_at DESC LIMIT 1",
    );
    expect(storedHandoff.rows[0]?.token_hash).toMatch(/^[a-f0-9]{64}$/);
    expect(storedHandoff.rows[0]?.token_hash).not.toBe(handoff.handoffToken);
    expect(storedHandoff.rows[0]?.item_ids).toEqual([saved.savedItemId]);

    await removeMinMatItem(pool, session.sessionToken, saved.savedItemId);
    const payload = await redeemAhaAnalysisHandoff(pool, handoff.handoffToken);
    expect(payload).toMatchObject({
      version: "fysen_food_collection_v1",
      source: "fysen",
      purpose: "user_requested_analysis",
      privacy: {
        scope: "private_user",
        includesSearchHistory: false,
        publicSharing: false,
        modelTrainingAllowed: false,
      },
    });
    expect(payload?.items).toEqual([
      expect.objectContaining({ savedItemId: saved.savedItemId, dishName: "Daal makhani" }),
    ]);
    await expect(redeemAhaAnalysisHandoff(pool, handoff.handoffToken)).resolves.toBeNull();

    const recovered = await saveMinMatItem(pool, session.sessionToken, menuItemId);
    expect(recovered?.savedItemId).not.toBe(saved.savedItemId);
    const secondSession = await createAhaConsumerSession(pool, {
      ...authorization,
      authorizationId: "55555555-5555-4555-8555-555555555555",
    });
    if (!secondSession) throw new Error("Expected second-device AHA session");
    await expect(listMinMatItems(pool, secondSession.sessionToken)).resolves.toEqual([
      expect.objectContaining({ savedItemId: recovered?.savedItemId, dishName: "Daal makhani" }),
    ]);

    await pool.query(
      `INSERT INTO fysen.min_mat_items
         (aha_subject, menu_item_id, snapshot_id, restaurant_id, dish_name, restaurant_name,
          restaurant_slug, city, price_minor, currency, saved_at)
       SELECT $1, gen_random_uuid(), $2, $3, 'Proof dish ' || value, 'AHA Min Mat Test',
              'aha-min-mat-test-oslo', 'Oslo', 10000 + value, 'NOK', now() - make_interval(secs => value)
         FROM generate_series(1, 55) AS value`,
      [authorization.subject, snapshotId, restaurantId],
    );
    const cappedHandoff = await issueAhaAnalysisHandoff(pool, secondSession.sessionToken);
    expect(cappedHandoff?.itemCount).toBe(50);
    if (!cappedHandoff) throw new Error("Expected capped AHA handoff");
    await pool.query(
      `UPDATE fysen.aha_analysis_handoffs
          SET created_at = now() - interval '2 minutes', expires_at = now() - interval '1 minute'
        WHERE token_hash = encode(digest($1, 'sha256'), 'hex')`,
      [cappedHandoff.handoffToken],
    );
    await expect(redeemAhaAnalysisHandoff(pool, cappedHandoff.handoffToken)).resolves.toBeNull();

    await expect(revokeAhaConsumerSession(pool, session.sessionToken)).resolves.toBe(true);
    await expect(listMinMatItems(pool, session.sessionToken)).resolves.toBeNull();
  });
});
