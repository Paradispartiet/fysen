import { randomUUID } from "node:crypto";
import type { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDatabasePool } from "./client.js";
import { runMigrations } from "./migrate.js";
import { MenuIndexRepository } from "./repository.js";

const databaseUrl = process.env.DATABASE_URL;
const integrationDescribe = databaseUrl ? describe : describe.skip;

integrationDescribe("menu source response limit persistence", () => {
  let pool: Pool;
  beforeAll(async () => {
    if (!databaseUrl) throw new Error("DATABASE_URL is required for integration tests");
    pool = createDatabasePool({ connectionString: databaseUrl });
    await runMigrations(pool);
    await pool.query("TRUNCATE fysen.restaurants CASCADE");
  });
  afterAll(async () => { await pool.end(); });

  it("persists and updates the bounded per-source byte limit", async () => {
    const repository = new MenuIndexRepository(pool);
    const suffix = randomUUID();
    const restaurantId = await repository.upsertRestaurant({
      slug: `response-limit-${suffix}`,
      name: "Response Limit",
      websiteUrl: null,
      address: "Testgata 9",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.91,
      longitude: 10.75,
    });
    const source = await repository.upsertMenuSource({
      restaurantId,
      url: `https://example.com/menu-${suffix}`,
      sourceType: "html",
      fetchMode: "http",
      userAgent: "FysenMenuBot/0.1",
      checkIntervalMinutes: 720,
      minimumExpectedItems: 3,
      maxResponseBytes: 3 * 1024 * 1024,
    });
    expect(source.maxResponseBytes).toBe(3 * 1024 * 1024);
    expect((await repository.getMenuSourceById(source.id))?.maxResponseBytes).toBe(3 * 1024 * 1024);

    const updated = await repository.upsertMenuSource({
      restaurantId,
      url: source.url,
      sourceType: "html",
      fetchMode: "http",
      userAgent: "FysenMenuBot/0.1",
      checkIntervalMinutes: 720,
      minimumExpectedItems: 3,
      maxResponseBytes: null,
    });
    expect(updated.maxResponseBytes).toBeNull();
  });
});
