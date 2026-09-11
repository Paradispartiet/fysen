import { randomUUID } from "node:crypto";
import type { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDatabasePool } from "./client.js";
import { runMigrations } from "./migrate.js";
import {
  getMenuSourceSupport,
  replaceMenuSourceSupport,
} from "./menu-source-support.js";
import { MenuIndexRepository } from "./repository.js";

const databaseUrl = process.env.DATABASE_URL;
const integrationDescribe = databaseUrl ? describe : describe.skip;

integrationDescribe("menu source support persistence", () => {
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

  it("round-trips allowed and explicitly blocked browser origins", async () => {
    const repository = new MenuIndexRepository(pool);
    const suffix = randomUUID();
    const restaurantId = await repository.upsertRestaurant({
      slug: `source-support-${suffix}`,
      name: "Source Support",
      websiteUrl: "https://example.com/",
      address: "Testgata 20",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.91,
      longitude: 10.75,
    });
    const source = await repository.upsertMenuSource({
      restaurantId,
      url: `https://example.com/menu-${suffix}`,
      sourceType: "html",
      fetchMode: "browser",
      userAgent: "FysenMenuBot/0.1",
      checkIntervalMinutes: 360,
      minimumExpectedItems: 3,
    });

    await replaceMenuSourceSupport(pool, source.id, {
      redirectOrigins: ["https://orders.example"],
      browserDataOrigins: ["https://api.example"],
      browserBlockedOrigins: ["https://tracking.example"],
    });

    await expect(getMenuSourceSupport(pool, source.id)).resolves.toEqual({
      redirectOrigins: ["https://orders.example"],
      browserDataOrigins: ["https://api.example"],
      browserBlockedOrigins: ["https://tracking.example"],
    });

    await replaceMenuSourceSupport(pool, source.id, {
      redirectOrigins: [],
      browserDataOrigins: [],
      browserBlockedOrigins: [],
    });

    await expect(getMenuSourceSupport(pool, source.id)).resolves.toEqual({
      redirectOrigins: [],
      browserDataOrigins: [],
      browserBlockedOrigins: [],
    });
  });

  it("refuses an origin that is both browser data and blocked", async () => {
    await expect(
      replaceMenuSourceSupport(pool, randomUUID(), {
        redirectOrigins: [],
        browserDataOrigins: ["https://tracking.example"],
        browserBlockedOrigins: ["https://tracking.example"],
      }),
    ).rejects.toThrow("both allowed and blocked");
  });
});
