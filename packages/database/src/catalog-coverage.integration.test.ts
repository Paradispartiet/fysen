import type { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { reconcileRestaurantCatalogCoverage } from "./catalog-coverage.js";
import { createDatabasePool } from "./client.js";
import { setRestaurantCoverageActive, upsertRestaurantCandidate } from "./coverage.js";
import { runMigrations } from "./migrate.js";
import { MenuIndexRepository } from "./repository.js";
import { upsertRestaurantAction } from "./restaurant-actions.js";
import { upsertRestaurantHoursSource } from "./restaurant-hours-sources.js";

const databaseUrl = process.env.DATABASE_URL;
const integrationDescribe = databaseUrl ? describe : describe.skip;

integrationDescribe("canonical catalog coverage reconciliation", () => {
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

  it("quiesces operational rows missing from the canonical city catalog without touching canonical or other-city coverage", async () => {
    const canonical = await upsertRestaurantCandidate(pool, {
      slug: "canonical-oslo",
      name: "Canonical Oslo",
      websiteUrl: "https://example.com/",
      address: "Canonicalgata 1",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.91,
      longitude: 10.75,
    });
    const stale = await upsertRestaurantCandidate(pool, {
      slug: "removed-oslo",
      name: "Removed Oslo",
      websiteUrl: "https://example.com/",
      address: "Removedgata 2",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.92,
      longitude: 10.76,
    });
    const otherCity = await upsertRestaurantCandidate(pool, {
      slug: "outside-city",
      name: "Outside City",
      websiteUrl: "https://example.com/",
      address: "Bergensgata 3",
      city: "Bergen",
      countryCode: "NO",
      latitude: 60.39,
      longitude: 5.32,
    });

    const repository = new MenuIndexRepository(pool);
    for (const [candidate, suffix] of [[canonical, "canonical"], [stale, "stale"], [otherCity, "other"]] as const) {
      await repository.upsertMenuSource({
        restaurantId: candidate.id,
        url: `https://example.com/${suffix}-menu`,
        sourceType: "html",
        userAgent: "FysenMenuBot/0.1",
        checkIntervalMinutes: 360,
        minimumExpectedItems: 1,
      });
      await setRestaurantCoverageActive(pool, candidate.id, true);
    }

    await upsertRestaurantHoursSource(pool, {
      restaurantId: stale.id,
      url: "https://example.com/stale-hours",
      timeZone: "Europe/Oslo",
      checkIntervalMinutes: 360,
      minimumExpectedIntervals: 7,
    });
    const verifiedAt = new Date().toISOString();
    await upsertRestaurantAction(pool, {
      restaurantId: stale.id,
      actionType: "order",
      url: "https://example.com/stale-order",
      sourceUrl: "https://example.com/stale-order",
      provider: "Example",
      verificationMethod: "first_party_page",
      verifiedAt,
      expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
    });

    const reconciled = await reconcileRestaurantCatalogCoverage(pool, [
      { slug: "canonical-oslo", city: "Oslo" },
    ]);
    expect(reconciled).toEqual({
      quiescedRestaurantCount: 1,
      deactivatedRestaurantCount: 1,
      menuSourcesDisabled: 1,
      hoursSourcesDisabled: 1,
      actionsDisabled: 1,
      slugs: ["removed-oslo"],
    });

    const states = await pool.query<{
      slug: string;
      active: boolean;
      enabled_menu_sources: number;
    }>(
      `SELECT restaurant.slug,
              restaurant.active,
              count(source.id) FILTER (WHERE source.enabled = true)::integer AS enabled_menu_sources
         FROM fysen.restaurants AS restaurant
         LEFT JOIN fysen.menu_sources AS source ON source.restaurant_id = restaurant.id
        GROUP BY restaurant.id, restaurant.slug, restaurant.active
        ORDER BY restaurant.slug`,
    );
    expect(states.rows).toEqual([
      { slug: "canonical-oslo", active: true, enabled_menu_sources: 1 },
      { slug: "outside-city", active: true, enabled_menu_sources: 1 },
      { slug: "removed-oslo", active: false, enabled_menu_sources: 0 },
    ]);

    const secondPass = await reconcileRestaurantCatalogCoverage(pool, [
      { slug: "canonical-oslo", city: "Oslo" },
    ]);
    expect(secondPass.quiescedRestaurantCount).toBe(0);
  });

  it("refuses an empty canonical set", async () => {
    await expect(reconcileRestaurantCatalogCoverage(pool, [])).rejects.toThrow(/empty canonical catalog/);
  });
});
