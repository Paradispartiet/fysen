import { randomUUID } from "node:crypto";
import type { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDatabasePool } from "./client.js";
import { runMigrations } from "./migrate.js";
import {
  listEnabledMenuSourcesForRestaurant,
  replacePublishedMenuSourceAuthority,
  setMenuSourceEnabled,
} from "./menu-source-state.js";
import { MenuIndexRepository } from "./repository.js";

const databaseUrl = process.env.DATABASE_URL;
const integrationDescribe = databaseUrl ? describe : describe.skip;

integrationDescribe("published menu source authority", () => {
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

  it("keeps the old source authoritative until the staged source is atomically promoted", async () => {
    const repository = new MenuIndexRepository(pool);
    const suffix = randomUUID();
    const restaurantId = await repository.upsertRestaurant({
      slug: `source-migration-${suffix}`,
      name: "Source Migration Test",
      websiteUrl: "https://example.com/",
      address: "Testgata 2",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.9139,
      longitude: 10.7522,
    });
    const oldSource = await repository.upsertMenuSource({
      restaurantId,
      url: `https://example.com/old-${suffix}`,
      sourceType: "html",
      userAgent: "FysenMenuBot/0.1",
      checkIntervalMinutes: 720,
      minimumExpectedItems: 1,
    });
    const stagedSource = await repository.upsertMenuSource({
      restaurantId,
      url: `https://example.com/new-${suffix}`,
      sourceType: "html",
      userAgent: "FysenMenuBot/0.1",
      checkIntervalMinutes: 720,
      minimumExpectedItems: 1,
    });

    await setMenuSourceEnabled(pool, stagedSource.id, false);
    expect(await listEnabledMenuSourcesForRestaurant(pool, restaurantId)).toEqual([
      { id: oldSource.id, url: oldSource.url },
    ]);

    const promoted = await replacePublishedMenuSourceAuthority(
      pool,
      restaurantId,
      stagedSource.id,
    );
    expect(promoted).toEqual({
      authoritativeMenuSourceId: stagedSource.id,
      disabledOtherCount: 1,
    });
    expect(await listEnabledMenuSourcesForRestaurant(pool, restaurantId)).toEqual([
      { id: stagedSource.id, url: stagedSource.url },
    ]);
  });

  it("refuses to promote a source owned by another restaurant", async () => {
    const repository = new MenuIndexRepository(pool);
    const suffix = randomUUID();
    const firstRestaurantId = await repository.upsertRestaurant({
      slug: `source-owner-a-${suffix}`,
      name: "Owner A",
      websiteUrl: null,
      address: "Testgata 3",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.9139,
      longitude: 10.7522,
    });
    const secondRestaurantId = await repository.upsertRestaurant({
      slug: `source-owner-b-${suffix}`,
      name: "Owner B",
      websiteUrl: null,
      address: "Testgata 4",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.914,
      longitude: 10.7523,
    });
    const foreignSource = await repository.upsertMenuSource({
      restaurantId: secondRestaurantId,
      url: `https://example.com/foreign-${suffix}`,
      sourceType: "html",
      userAgent: "FysenMenuBot/0.1",
      checkIntervalMinutes: 720,
      minimumExpectedItems: 1,
    });

    await expect(
      replacePublishedMenuSourceAuthority(
        pool,
        firstRestaurantId,
        foreignSource.id,
      ),
    ).rejects.toThrow("does not belong to restaurant");
  });
});
