import type { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDatabasePool } from "./client.js";
import {
  quiesceRestaurantCandidate,
  setRestaurantCoverageActive,
  upsertRestaurantCandidate,
} from "./coverage.js";
import { runMigrations } from "./migrate.js";
import { setMenuSourceEnabled } from "./menu-source-state.js";
import { MenuIndexRepository } from "./repository.js";
import { upsertRestaurantAction } from "./restaurant-actions.js";
import { upsertRestaurantHoursSource } from "./restaurant-hours-sources.js";
import { searchDishes } from "./search.js";

const databaseUrl = process.env.DATABASE_URL;
const integrationDescribe = databaseUrl ? describe : describe.skip;

integrationDescribe("restaurant coverage gate", () => {
  let pool: Pool;

  beforeAll(async () => {
    if (!databaseUrl) throw new Error("DATABASE_URL is required for integration tests");
    pool = createDatabasePool({ connectionString: databaseUrl });
    await runMigrations(pool);
    await pool.query("TRUNCATE fysen.restaurants CASCADE");
  });

  afterAll(async () => {
    await pool.end();
  });

  it("keeps a candidate invisible until the onboarding gate activates it", async () => {
    const candidate = await upsertRestaurantCandidate(pool, {
      slug: "candidate-bistro-oslo",
      name: "Candidate Bistro",
      websiteUrl: "https://example.com/",
      address: "Pilotgata 1",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.92,
      longitude: 10.75,
    });
    expect(candidate.active).toBe(false);

    const repository = new MenuIndexRepository(pool);
    const source = await repository.upsertMenuSource({
      restaurantId: candidate.id,
      url: "https://example.com/menu",
      sourceType: "html",
      userAgent: "FysenMenuBot/0.1",
      checkIntervalMinutes: 360,
      minimumExpectedItems: 1,
    });
    const now = new Date().toISOString();
    await repository.recordSnapshot({
      menuSourceId: source.id,
      expectedPreviousSnapshotId: null,
      fetchedAt: now,
      startedAt: now,
      httpStatus: 200,
      responseContentType: "text/html",
      rawSha256: "a".repeat(64),
      normalizedSha256: "b".repeat(64),
      normalizedText: "Pilot burger 199",
      etag: null,
      lastModified: null,
      robotsAllowed: true,
      fetchDurationMs: 5,
      extractorVersion: "coverage-test",
      items: [
        {
          sourceKey: "c".repeat(64),
          name: "Pilot burger",
          normalizedName: "pilot burger",
          description: null,
          sectionName: null,
          priceMinor: 19900,
          currency: "NOK",
          position: 0,
          extractionMethod: "html_heuristic",
          confidence: 0.9,
          sourceExcerpt: "Pilot burger 199",
        },
      ],
      changes: [],
    });

    const hidden = await searchDishes(pool, {
      normalizedQuery: "pilot burger",
      city: "Oslo",
      limit: 20,
      latitude: null,
      longitude: null,
      sort: "relevance",
    });
    expect(hidden).toEqual([]);

    const published = await setRestaurantCoverageActive(pool, candidate.id, true);
    expect(published.active).toBe(true);

    const visible = await searchDishes(pool, {
      normalizedQuery: "pilot burger",
      city: "Oslo",
      limit: 20,
      latitude: null,
      longitude: null,
      sort: "relevance",
    });
    expect(visible).toHaveLength(1);
    expect(visible[0]?.restaurantSlug).toBe("candidate-bistro-oslo");
  });

  it("disables operational sources for a failed inactive candidate and allows explicit retry", async () => {
    const candidate = await upsertRestaurantCandidate(pool, {
      slug: "sleeping-candidate-oslo",
      name: "Sleeping Candidate",
      websiteUrl: "https://example.com/",
      address: "Dvalegata 2",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.93,
      longitude: 10.76,
    });
    const repository = new MenuIndexRepository(pool);
    const menuSource = await repository.upsertMenuSource({
      restaurantId: candidate.id,
      url: "https://example.com/menu-2",
      sourceType: "html",
      userAgent: "FysenMenuBot/0.1",
      checkIntervalMinutes: 360,
      minimumExpectedItems: 1,
    });
    await upsertRestaurantHoursSource(pool, {
      restaurantId: candidate.id,
      url: "https://example.com/hours",
      timeZone: "Europe/Oslo",
      checkIntervalMinutes: 360,
      minimumExpectedIntervals: 7,
    });
    const verifiedAt = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    await upsertRestaurantAction(pool, {
      restaurantId: candidate.id,
      actionType: "order",
      url: "https://example.com/order",
      sourceUrl: "https://example.com/order",
      provider: "Example",
      verificationMethod: "first_party_page",
      verifiedAt,
      expiresAt,
    });

    const quiesced = await quiesceRestaurantCandidate(pool, candidate.id);
    expect(quiesced).toEqual({
      menuSourcesDisabled: 1,
      hoursSourcesDisabled: 1,
      actionsDisabled: 1,
    });

    const sleeping = await pool.query<{
      menu_enabled: boolean;
      hours_enabled: boolean;
      action_enabled: boolean;
    }>(
      `SELECT m.enabled AS menu_enabled,
              h.enabled AS hours_enabled,
              a.enabled AS action_enabled
         FROM fysen.menu_sources m
         JOIN fysen.restaurant_hours_sources h ON h.restaurant_id = m.restaurant_id
         JOIN fysen.restaurant_actions a ON a.restaurant_id = m.restaurant_id
        WHERE m.restaurant_id = $1`,
      [candidate.id],
    );
    expect(sleeping.rows[0]).toMatchObject({
      menu_enabled: false,
      hours_enabled: false,
      action_enabled: false,
    });

    expect(await setMenuSourceEnabled(pool, menuSource.id, true)).toBe(true);
    await upsertRestaurantHoursSource(pool, {
      restaurantId: candidate.id,
      url: "https://example.com/hours",
      timeZone: "Europe/Oslo",
      checkIntervalMinutes: 360,
      minimumExpectedIntervals: 7,
    });
    await upsertRestaurantAction(pool, {
      restaurantId: candidate.id,
      actionType: "order",
      url: "https://example.com/order",
      sourceUrl: "https://example.com/order",
      provider: "Example",
      verificationMethod: "first_party_page",
      verifiedAt,
      expiresAt,
    });

    const retried = await pool.query<{
      menu_enabled: boolean;
      hours_enabled: boolean;
      action_enabled: boolean;
    }>(
      `SELECT m.enabled AS menu_enabled,
              h.enabled AS hours_enabled,
              a.enabled AS action_enabled
         FROM fysen.menu_sources m
         JOIN fysen.restaurant_hours_sources h ON h.restaurant_id = m.restaurant_id
         JOIN fysen.restaurant_actions a ON a.restaurant_id = m.restaurant_id
        WHERE m.restaurant_id = $1`,
      [candidate.id],
    );
    expect(retried.rows[0]).toMatchObject({
      menu_enabled: true,
      hours_enabled: true,
      action_enabled: true,
    });

    await setRestaurantCoverageActive(pool, candidate.id, true);
    const protectedActive = await quiesceRestaurantCandidate(pool, candidate.id);
    expect(protectedActive).toEqual({
      menuSourcesDisabled: 0,
      hoursSourcesDisabled: 0,
      actionsDisabled: 0,
    });
  });
});
