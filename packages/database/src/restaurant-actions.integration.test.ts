import type { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDatabasePool } from "./client.js";
import { runMigrations } from "./migrate.js";
import { MenuIndexRepository } from "./repository.js";
import {
  disableRestaurantAction,
  listRestaurantActionsForReverification,
  recordRestaurantActionVerificationFailure,
  recordRestaurantActionVerificationSuccess,
  upsertRestaurantAction,
} from "./restaurant-actions.js";

const databaseUrl = process.env.DATABASE_URL;
const integrationDescribe = databaseUrl ? describe : describe.skip;

integrationDescribe("restaurant action persistence", () => {
  let pool: Pool;
  let restaurantId: string;
  let bookingActionId: string;

  beforeAll(async () => {
    if (!databaseUrl) throw new Error("DATABASE_URL is required for integration tests");
    pool = createDatabasePool({ connectionString: databaseUrl });
    await runMigrations(pool);
    await pool.query("TRUNCATE fysen.restaurants CASCADE");

    const repository = new MenuIndexRepository(pool);
    restaurantId = await repository.upsertRestaurant({
      slug: "actions-bistro-oslo",
      name: "Actions Bistro",
      websiteUrl: "https://example.com/",
      address: "Handlinggata 1",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.9139,
      longitude: 10.7522,
    });

    const now = Date.now();
    bookingActionId = await upsertRestaurantAction(pool, {
      restaurantId,
      actionType: "booking",
      url: "https://example.com/book",
      sourceUrl: "https://example.com/book",
      provider: "TestBook",
      verificationMethod: "first_party_page",
      verifiedAt: new Date(now - 60_000).toISOString(),
      expiresAt: new Date(now + 24 * 60 * 60 * 1000).toISOString(),
    });

    await upsertRestaurantAction(pool, {
      restaurantId,
      actionType: "order",
      url: "https://example.com/order",
      sourceUrl: "https://example.com/order",
      provider: "TestOrder",
      verificationMethod: "provider_api",
      verifiedAt: new Date(now).toISOString(),
      expiresAt: new Date(now + 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
  });

  afterAll(async () => {
    await pool.end();
  });

  it("selects only actions that need reverification soon", async () => {
    const due = await listRestaurantActionsForReverification(pool, 25, new Date());
    expect(due).toHaveLength(1);
    expect(due[0]).toMatchObject({
      id: bookingActionId,
      restaurantId,
      actionType: "booking",
      url: "https://example.com/book",
    });
  });

  it("audits failures without extending verification", async () => {
    const before = await pool.query<{ expires_at: Date }>(
      "SELECT expires_at FROM fysen.restaurant_actions WHERE id = $1",
      [bookingActionId],
    );
    const originalExpiry = before.rows[0]?.expires_at.toISOString();

    const now = new Date().toISOString();
    await recordRestaurantActionVerificationFailure(pool, {
      actionId: bookingActionId,
      startedAt: now,
      completedAt: now,
      httpStatus: 503,
      errorCode: "HTTP_STATUS",
      errorMessage: "Temporary failure",
    });

    const after = await pool.query<{ expires_at: Date }>(
      "SELECT expires_at FROM fysen.restaurant_actions WHERE id = $1",
      [bookingActionId],
    );
    expect(after.rows[0]?.expires_at.toISOString()).toBe(originalExpiry);

    const runs = await pool.query<{ outcome: string; error_code: string | null }>(
      "SELECT outcome, error_code FROM fysen.restaurant_action_verification_runs WHERE restaurant_action_id = $1 ORDER BY created_at",
      [bookingActionId],
    );
    expect(runs.rows.at(-1)).toEqual({ outcome: "fetch_error", error_code: "HTTP_STATUS" });
  });

  it("extends successful verification atomically and removes the action from the due queue", async () => {
    const verifiedAt = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    await recordRestaurantActionVerificationSuccess(pool, {
      actionId: bookingActionId,
      startedAt: verifiedAt,
      completedAt: verifiedAt,
      httpStatus: 200,
      verifiedAt,
      expiresAt,
    });

    const action = await pool.query<{ verified_at: Date; expires_at: Date; enabled: boolean }>(
      "SELECT verified_at, expires_at, enabled FROM fysen.restaurant_actions WHERE id = $1",
      [bookingActionId],
    );
    expect(action.rows[0]?.verified_at.toISOString()).toBe(verifiedAt);
    expect(action.rows[0]?.expires_at.toISOString()).toBe(expiresAt);
    expect(action.rows[0]?.enabled).toBe(true);

    const due = await listRestaurantActionsForReverification(pool, 25, new Date());
    expect(due.find((candidate) => candidate.id === bookingActionId)).toBeUndefined();
  });

  it("can disable a canonical action without deleting its audit history", async () => {
    expect(await disableRestaurantAction(pool, restaurantId, "booking")).toBe(true);
    expect(await disableRestaurantAction(pool, restaurantId, "booking")).toBe(false);

    const action = await pool.query<{ enabled: boolean }>(
      "SELECT enabled FROM fysen.restaurant_actions WHERE id = $1",
      [bookingActionId],
    );
    expect(action.rows[0]?.enabled).toBe(false);

    const runCount = await pool.query<{ count: string }>(
      "SELECT count(*)::text AS count FROM fysen.restaurant_action_verification_runs WHERE restaurant_action_id = $1",
      [bookingActionId],
    );
    expect(Number(runCount.rows[0]?.count ?? 0)).toBeGreaterThanOrEqual(2);
  });
});
