import type { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDatabasePool } from "./client.js";
import {
  getRestaurantProDashboard,
  issueRestaurantProSetupToken,
  redeemRestaurantProSetupToken,
  revokeRestaurantProSession,
} from "./fysen-pro.js";
import { recordConversionEvent, recordSearchFunnel } from "./funnel.js";
import { runMigrations } from "./migrate.js";
import { MenuIndexRepository } from "./repository.js";
import {
  requestRestaurantClaim,
  reviewRestaurantClaim,
  revokeRestaurantAccess,
} from "./restaurant-claims.js";

const databaseUrl = process.env.DATABASE_URL;
const integrationDescribe = databaseUrl ? describe : describe.skip;

integrationDescribe("Fysen Pro integration", () => {
  let pool: Pool;
  let restaurantId: string;
  let menuItemId: string;
  let accessGrantId: string;

  beforeAll(async () => {
    if (!databaseUrl) throw new Error("DATABASE_URL is required for integration tests");
    pool = createDatabasePool({ connectionString: databaseUrl });
    await runMigrations(pool);
    await pool.query("TRUNCATE fysen.search_events CASCADE");
    await pool.query("TRUNCATE fysen.restaurant_claims CASCADE");
    await pool.query("TRUNCATE fysen.restaurants CASCADE");

    const repository = new MenuIndexRepository(pool);
    restaurantId = await repository.upsertRestaurant({
      slug: "fysen-pro-test-oslo",
      name: "Fysen Pro Test",
      websiteUrl: "https://pro.example/",
      address: "Proveien 1",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.9139,
      longitude: 10.7522,
    });
    const source = await repository.upsertMenuSource({
      restaurantId,
      url: "https://pro.example/menu",
      sourceType: "html",
      userAgent: "FysenMenuBot/0.1",
      checkIntervalMinutes: 360,
      minimumExpectedItems: 1,
    });
    const now = new Date().toISOString();
    const snapshotId = await repository.recordSnapshot({
      menuSourceId: source.id,
      expectedPreviousSnapshotId: null,
      fetchedAt: now,
      startedAt: now,
      httpStatus: 200,
      responseContentType: "text/html",
      rawSha256: "7".repeat(64),
      normalizedSha256: "8".repeat(64),
      normalizedText: "Pro burger 219",
      etag: null,
      lastModified: null,
      robotsAllowed: true,
      fetchDurationMs: 5,
      extractorVersion: "fysen-pro-test",
      items: [
        {
          sourceKey: "9".repeat(64),
          name: "Pro burger",
          normalizedName: "pro burger",
          description: null,
          sectionName: "Burgere",
          priceMinor: 21900,
          currency: "NOK",
          position: 0,
          extractionMethod: "html_heuristic",
          confidence: 0.95,
          sourceExcerpt: "Pro burger 219",
        },
      ],
      changes: [],
    });

    const item = await pool.query<{ id: string }>(
      "SELECT id FROM fysen.menu_items WHERE snapshot_id = $1 LIMIT 1",
      [snapshotId],
    );
    menuItemId = item.rows[0]?.id ?? "";
    if (!menuItemId) throw new Error("Expected Fysen Pro menu item");

    await pool.query(
      `INSERT INTO fysen.restaurant_actions (
         restaurant_id,
         action_type,
         url,
         source_url,
         verification_method,
         verified_at,
         expires_at,
         enabled
       ) VALUES ($1, 'booking', 'https://pro.example/book', 'https://pro.example/book', 'first_party_page', now(), now() + interval '30 days', true)`,
      [restaurantId],
    );

    const claim = await requestRestaurantClaim(pool, {
      restaurantSlug: "fysen-pro-test-oslo",
      claimantName: "Pro Owner",
      claimantEmail: "owner@pro.example",
      claimantRole: "owner",
      evidenceUrl: "https://pro.example/contact",
      evidenceNote: null,
    });
    if (!claim) throw new Error("Expected Fysen Pro claim");
    const reviewed = await reviewRestaurantClaim(pool, {
      claimId: claim.claimId,
      outcome: "verified",
      reviewNote: "Verified for Fysen Pro integration.",
      reviewedBy: "fysen-pro-test-reviewer",
    });
    accessGrantId = reviewed.accessGrantId ?? "";
    if (!accessGrantId) throw new Error("Expected active Fysen Pro access grant");

    const search = await recordSearchFunnel(pool, {
      normalizedQuery: "pro burger",
      city: "Oslo",
      impressions: [
        {
          menuItemId,
          restaurantId,
          rank: 1,
          matchType: "exact",
          matchScore: 1,
        },
      ],
    });
    const impressionId = search.impressionIdsByMenuItemId[menuItemId];
    if (!impressionId) throw new Error("Expected Fysen Pro impression");
    await recordConversionEvent(pool, {
      clientEventId: "44444444-4444-4444-8444-444444444444",
      impressionId,
      eventType: "menu_clicked",
    });

    await pool.query(
      `INSERT INTO fysen.search_events (normalized_query, city, result_count, demand_source)
       VALUES ('pro pilot demand gap zyx', 'Oslo', 0, 'explicit_search')`,
    );
  });

  afterAll(async () => {
    await pool.end();
  });

  it("uses one-time hashed setup tokens and hashed sessions for a grant-scoped dashboard", async () => {
    const setup = await issueRestaurantProSetupToken(pool, {
      accessGrantId,
      createdBy: "fysen-pro-test-reviewer",
      ttlHours: 24,
    });
    expect(setup.setupToken.length).toBeGreaterThanOrEqual(32);

    const storedSetup = await pool.query<{ token_hash: string }>(
      `SELECT token_hash
         FROM fysen.restaurant_pro_setup_tokens
        WHERE access_grant_id = $1
        ORDER BY created_at DESC
        LIMIT 1`,
      [accessGrantId],
    );
    expect(storedSetup.rows[0]?.token_hash).toMatch(/^[a-f0-9]{64}$/);
    expect(storedSetup.rows[0]?.token_hash).not.toBe(setup.setupToken);

    const session = await redeemRestaurantProSetupToken(pool, setup.setupToken);
    expect(session?.sessionToken.length).toBeGreaterThanOrEqual(32);
    await expect(redeemRestaurantProSetupToken(pool, setup.setupToken)).resolves.toBeNull();
    if (!session) throw new Error("Expected Fysen Pro session");

    const storedSession = await pool.query<{ token_hash: string }>(
      `SELECT token_hash
         FROM fysen.restaurant_pro_sessions
        WHERE access_grant_id = $1
        ORDER BY created_at DESC
        LIMIT 1`,
      [accessGrantId],
    );
    expect(storedSession.rows[0]?.token_hash).toMatch(/^[a-f0-9]{64}$/);
    expect(storedSession.rows[0]?.token_hash).not.toBe(session.sessionToken);

    const dashboard = await getRestaurantProDashboard(pool, session.sessionToken);
    expect(dashboard).not.toBeNull();
    expect(dashboard).toMatchObject({
      restaurant: {
        slug: "fysen-pro-test-oslo",
        name: "Fysen Pro Test",
        city: "Oslo",
      },
      periodDays: 30,
      metrics: {
        impressions: 1,
        clicks: 1,
        ctr: 1,
        clickBreakdown: { menu: 1, restaurant: 0, directions: 0, booking: 0, order: 0 },
      },
    });
    expect(dashboard?.topDishes).toEqual([
      expect.objectContaining({ name: "Pro burger", impressions: 1, clicks: 1 }),
    ]);
    expect(dashboard?.menuSources).toEqual([
      expect.objectContaining({ url: "https://pro.example/menu", enabled: true, consecutiveFailures: 0 }),
    ]);
    expect(dashboard?.actions).toEqual([
      expect.objectContaining({ type: "booking", enabled: true, publishable: true }),
    ]);
    expect(dashboard?.cityDemandGaps).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ query: "pro pilot demand gap zyx", searches7d: 1, signal: "zero_result" }),
      ]),
    );

    await expect(revokeRestaurantProSession(pool, session.sessionToken)).resolves.toBe(true);
    await expect(getRestaurantProDashboard(pool, session.sessionToken)).resolves.toBeNull();
  });

  it("invalidates an otherwise-live Pro session as soon as the restaurant access grant is revoked", async () => {
    const setup = await issueRestaurantProSetupToken(pool, {
      accessGrantId,
      createdBy: "fysen-pro-test-reviewer",
      ttlHours: 24,
    });
    const session = await redeemRestaurantProSetupToken(pool, setup.setupToken);
    if (!session) throw new Error("Expected second Fysen Pro session");

    await expect(getRestaurantProDashboard(pool, session.sessionToken)).resolves.not.toBeNull();
    await revokeRestaurantAccess(pool, accessGrantId, "fysen-pro-test-reviewer");
    await expect(getRestaurantProDashboard(pool, session.sessionToken)).resolves.toBeNull();
  });
});
