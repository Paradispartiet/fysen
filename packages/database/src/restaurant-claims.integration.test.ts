import type { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDatabasePool } from "./client.js";
import { runMigrations } from "./migrate.js";
import { MenuIndexRepository } from "./repository.js";
import { listActiveRestaurantAccessGrants } from "./restaurant-claim-operator.js";
import {
  getRestaurantClaimContext,
  requestRestaurantClaim,
  reviewRestaurantClaim,
  revokeRestaurantAccess,
  RestaurantClaimStateError,
  upsertRestaurantOwnedProfile,
} from "./restaurant-claims.js";

const databaseUrl = process.env.DATABASE_URL;
const integrationDescribe = databaseUrl ? describe : describe.skip;

integrationDescribe("restaurant claims integration", () => {
  let pool: Pool;
  let restaurantId: string;
  let snapshotId: string;

  beforeAll(async () => {
    if (!databaseUrl) throw new Error("DATABASE_URL is required for integration tests");
    pool = createDatabasePool({ connectionString: databaseUrl });
    await runMigrations(pool);
    await pool.query("TRUNCATE fysen.restaurant_claims CASCADE");
    await pool.query("TRUNCATE fysen.restaurants CASCADE");

    const repository = new MenuIndexRepository(pool);
    restaurantId = await repository.upsertRestaurant({
      slug: "claim-test-oslo",
      name: "Canonical Claim Test",
      websiteUrl: "https://canonical.example/",
      address: "Kildegata 1",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.91,
      longitude: 10.75,
    });
    const source = await repository.upsertMenuSource({
      restaurantId,
      url: "https://canonical.example/menu",
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
      rawSha256: "1".repeat(64),
      normalizedSha256: "2".repeat(64),
      normalizedText: "Canonical dish 199",
      etag: null,
      lastModified: null,
      robotsAllowed: true,
      fetchDurationMs: 5,
      extractorVersion: "claim-test",
      items: [
        {
          sourceKey: "3".repeat(64),
          name: "Canonical dish",
          normalizedName: "canonical dish",
          description: null,
          sectionName: null,
          priceMinor: 19900,
          currency: "NOK",
          position: 0,
          extractionMethod: "html_heuristic",
          confidence: 0.9,
          sourceExcerpt: "Canonical dish 199",
        },
      ],
      changes: [],
    });
  });

  afterAll(async () => {
    await pool.end();
  });

  it("keeps public claim state PII-free and gates owned fields behind verified access", async () => {
    const initial = await getRestaurantClaimContext(pool, "claim-test-oslo");
    expect(initial).toEqual({
      restaurant: {
        slug: "claim-test-oslo",
        name: "Canonical Claim Test",
        address: "Kildegata 1",
        city: "Oslo",
      },
      claimState: "unclaimed",
    });
    expect(JSON.stringify(initial)).not.toContain("@example");

    const first = await requestRestaurantClaim(pool, {
      restaurantSlug: "claim-test-oslo",
      claimantName: "Test Owner",
      claimantEmail: "OWNER@EXAMPLE.COM",
      claimantRole: "owner",
      evidenceUrl: "https://canonical.example/contact",
      evidenceNote: null,
    });
    if (!first) throw new Error("Expected claim receipt");
    expect(first).toMatchObject({ status: "pending", duplicate: false });

    const duplicate = await requestRestaurantClaim(pool, {
      restaurantSlug: "claim-test-oslo",
      claimantName: "Test Owner",
      claimantEmail: "owner@example.com",
      claimantRole: "owner",
      evidenceUrl: null,
      evidenceNote: "The restaurant can verify me through its registered business contact.",
    });
    expect(duplicate).toEqual({ claimId: first.claimId, status: "pending", duplicate: true });
    expect((await getRestaurantClaimContext(pool, "claim-test-oslo"))?.claimState).toBe("under_review");

    const beforeEvidence = await pool.query<{
      name: string;
      website_url: string | null;
      snapshot_hash: string;
      menu_name: string;
    }>(
      `SELECT
         restaurant.name,
         restaurant.website_url,
         snapshot.normalized_sha256 AS snapshot_hash,
         item.original_name AS menu_name
       FROM fysen.restaurants AS restaurant
       JOIN fysen.menu_sources AS source ON source.restaurant_id = restaurant.id
       JOIN fysen.menu_snapshots AS snapshot ON snapshot.menu_source_id = source.id
       JOIN fysen.menu_items AS item ON item.snapshot_id = snapshot.id
       WHERE restaurant.id = $1 AND snapshot.id = $2
       LIMIT 1`,
      [restaurantId, snapshotId],
    );

    await expect(
      upsertRestaurantOwnedProfile(pool, {
        accessGrantId: "00000000-0000-4000-8000-000000000000",
        displayName: "Claimed display name",
        publicContactEmail: "hello@example.com",
        publicContactPhone: "+47 00 00 00 00",
        websiteUrl: "https://claimed.example/",
        shortDescription: "Restaurant-owned presentation text.",
      }),
    ).rejects.toBeInstanceOf(RestaurantClaimStateError);

    const reviewed = await reviewRestaurantClaim(pool, {
      claimId: first.claimId,
      outcome: "verified",
      reviewNote: "Verified against first-party business contact.",
      reviewedBy: "fysen-review",
    });
    expect(reviewed.status).toBe("verified");
    expect(reviewed.accessGrantId).toMatch(/^[0-9a-f-]{36}$/);
    if (!reviewed.accessGrantId) throw new Error("Expected restaurant access grant");
    expect((await getRestaurantClaimContext(pool, "claim-test-oslo"))?.claimState).toBe("claimed");

    const activeGrants = await listActiveRestaurantAccessGrants(pool);
    expect(activeGrants).toContainEqual({
      accessGrantId: reviewed.accessGrantId,
      claimId: first.claimId,
      restaurant: {
        slug: "claim-test-oslo",
        name: "Canonical Claim Test",
        address: "Kildegata 1",
      },
      principal: { email: "owner@example.com", role: "owner" },
      grantedAt: expect.any(String),
    });

    const profile = await upsertRestaurantOwnedProfile(pool, {
      accessGrantId: reviewed.accessGrantId,
      displayName: "Claimed display name",
      publicContactEmail: "hello@example.com",
      publicContactPhone: "+47 00 00 00 00",
      websiteUrl: "https://claimed.example/",
      shortDescription: "Restaurant-owned presentation text.",
    });
    expect(profile).toMatchObject({
      restaurantId,
      displayName: "Claimed display name",
      websiteUrl: "https://claimed.example/",
      updatedByAccessGrantId: reviewed.accessGrantId,
    });

    const afterEvidence = await pool.query<{
      name: string;
      website_url: string | null;
      snapshot_hash: string;
      menu_name: string;
    }>(
      `SELECT
         restaurant.name,
         restaurant.website_url,
         snapshot.normalized_sha256 AS snapshot_hash,
         item.original_name AS menu_name
       FROM fysen.restaurants AS restaurant
       JOIN fysen.menu_sources AS source ON source.restaurant_id = restaurant.id
       JOIN fysen.menu_snapshots AS snapshot ON snapshot.menu_source_id = source.id
       JOIN fysen.menu_items AS item ON item.snapshot_id = snapshot.id
       WHERE restaurant.id = $1 AND snapshot.id = $2
       LIMIT 1`,
      [restaurantId, snapshotId],
    );
    expect(afterEvidence.rows[0]).toEqual(beforeEvidence.rows[0]);

    const events = await pool.query<{ event_type: string }>(
      `SELECT event_type
         FROM fysen.restaurant_claim_audit_log
        WHERE restaurant_id = $1
        ORDER BY occurred_at, event_type`,
      [restaurantId],
    );
    expect(events.rows.map((row) => row.event_type)).toEqual(
      expect.arrayContaining(["claim_submitted", "claim_verified", "access_granted", "owner_fields_updated"]),
    );

    await revokeRestaurantAccess(pool, reviewed.accessGrantId, "fysen-review");
    expect((await listActiveRestaurantAccessGrants(pool)).some((grant) => grant.accessGrantId === reviewed.accessGrantId)).toBe(false);
    await expect(
      upsertRestaurantOwnedProfile(pool, {
        accessGrantId: reviewed.accessGrantId,
        displayName: "Blocked update",
        publicContactEmail: null,
        publicContactPhone: null,
        websiteUrl: null,
        shortDescription: null,
      }),
    ).rejects.toBeInstanceOf(RestaurantClaimStateError);
  });

  it("never exposes a public claim endpoint for review and rejects nonexistent restaurants in storage", async () => {
    const missing = await requestRestaurantClaim(pool, {
      restaurantSlug: "does-not-exist-oslo",
      claimantName: "Missing Owner",
      claimantEmail: "missing@example.com",
      claimantRole: "manager",
      evidenceUrl: null,
      evidenceNote: "Verification details for a restaurant that does not exist in Fysen.",
    });
    expect(missing).toBeNull();
  });
});
