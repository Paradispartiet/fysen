import type { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { browseDishes } from "./browse.js";
import { createDatabasePool } from "./client.js";
import { publicIdentityQuarantineSlugs } from "./identity-quarantines.js";
import { runMigrations } from "./migrate.js";
import { MenuIndexRepository } from "./repository.js";
import { searchDishes } from "./search.js";

const databaseUrl = process.env.DATABASE_URL;
const integrationDescribe = databaseUrl ? describe : describe.skip;

integrationDescribe("source-proven identity quarantines in public DB searches", () => {
  let pool: Pool;

  beforeAll(async () => {
    if (!databaseUrl) throw new Error("DATABASE_URL is required");
    pool = createDatabasePool({ connectionString: databaseUrl });
    await runMigrations(pool);
    await pool.query("TRUNCATE fysen.restaurants CASCADE");
    const repository = new MenuIndexRepository(pool);
    const slugs = [...publicIdentityQuarantineSlugs, "king-falafel-brugata-oslo"];
    const now = new Date().toISOString();

    for (const [index, slug] of slugs.entries()) {
      const id = await repository.upsertRestaurant({
        slug,
        name: slug === "king-falafel-brugata-oslo" ? "King Falafel" : "Unverified " + slug,
        websiteUrl: "https://example.org/",
        address: index + " Brugata",
        city: "Oslo",
        countryCode: "NO",
        latitude: 59.914,
        longitude: 10.755,
      });
      // A changed source URL must not reopen a quarantined restaurant.
      const source = await repository.upsertMenuSource({
        restaurantId: id,
        url: "https://example.org/" + slug + "/new-menu",
        sourceType: "html",
        userAgent: "FysenMenuBot/0.1",
        checkIntervalMinutes: 360,
        minimumExpectedItems: 1,
      });
      const key = String(index + 1).repeat(64);
      await repository.recordSnapshot({
        menuSourceId: source.id,
        expectedPreviousSnapshotId: null,
        fetchedAt: now,
        startedAt: now,
        httpStatus: 200,
        responseContentType: "text/html",
        rawSha256: "1".repeat(64),
        normalizedSha256: "2".repeat(64),
        normalizedText: "Ramen 200",
        etag: null,
        lastModified: null,
        robotsAllowed: true,
        fetchDurationMs: 10,
        extractorVersion: "identity-quarantine-integration",
        items: [{
          sourceKey: key,
          name: "Ramen",
          normalizedName: "ramen",
          description: null,
          sectionName: "Middag",
          priceMinor: 20000,
          currency: "NOK",
          position: 0,
          extractionMethod: "html_heuristic",
          confidence: 0.95,
          sourceExcerpt: "Ramen 200",
        }],
        changes: [{
          itemSourceKey: key,
          kind: "added",
          before: null,
          after: { name: "Ramen" },
        }],
      });
    }
  });

  afterAll(async () => {
    if (pool) await pool.end();
  });

  it("hides all disputed slugs from live search without suppressing King Falafel", async () => {
    const results = await searchDishes(pool, {
      normalizedQuery: "ramen",
      city: "Oslo",
      limit: 20,
      latitude: null,
      longitude: null,
      sort: "relevance",
    });
    expect(results.map((result) => result.restaurantSlug)).toEqual([
      "king-falafel-brugata-oslo",
    ]);
  });

  it("hides disputed venues from Matlyst browse and recent dishes", async () => {
    const browse = await browseDishes(pool, { city: "Oslo" });
    expect(browse.dishes).toHaveLength(1);
    expect(browse.dishes[0]?.restaurantCount).toBe(1);
    expect(browse.dishes[0]?.restaurantExamples.map((r) => r.name)).toEqual(["King Falafel"]);
    expect(browse.recentDishes.every((item) => item.restaurantName === "King Falafel")).toBe(true);
  });

  it("preserves all historical snapshots and restaurant records", async () => {
    const rows = await pool.query<{ restaurants: string; items: string }>(
      `SELECT
        (SELECT count(*)::text FROM fysen.restaurants) AS restaurants,
        (SELECT count(*)::text FROM fysen.menu_items) AS items`,
    );
    expect(rows.rows[0]).toEqual({ restaurants: "5", items: "5" });
  });
});
