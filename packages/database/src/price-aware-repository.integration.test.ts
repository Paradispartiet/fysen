import type { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDatabasePool } from "./client.js";
import { MenuIndexRepository } from "./index.js";
import { runMigrations } from "./migrate.js";

const databaseUrl = process.env.DATABASE_URL;
const integrationDescribe = databaseUrl ? describe : describe.skip;

integrationDescribe("price-aware menu repository", () => {
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

  it("round-trips multiple price semantics through snapshots", async () => {
    const repository = new MenuIndexRepository(pool);
    const restaurantId = await repository.upsertRestaurant({
      slug: "price-aware-bistro-oslo",
      name: "Price Aware Bistro",
      websiteUrl: "https://example.com/",
      address: "Prisgata 1",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.91,
      longitude: 10.75,
    });
    const source = await repository.upsertMenuSource({
      restaurantId,
      url: "https://example.com/menu.pdf",
      sourceType: "pdf",
      userAgent: "FysenMenuBot/0.1",
      checkIntervalMinutes: 360,
      minimumExpectedItems: 1,
    });

    const now = new Date().toISOString();
    const item = {
      sourceKey: "a".repeat(64),
      name: "Bambus Signatur",
      normalizedName: "bambus signatur",
      description: "Testrett med to observerte priser",
      sectionName: "SIGNATUR",
      priceMinor: 28500,
      priceKind: "multiple",
      priceMaxMinor: 30900,
      currency: "NOK",
      position: 0,
      extractionMethod: "pdf_text",
      confidence: 0.84,
      sourceExcerpt: "Bambus Signatur — 285 / 309 NOK",
    } as unknown as Parameters<MenuIndexRepository["recordSnapshot"]>[0]["items"][number];

    const snapshotId = await repository.recordSnapshot({
      menuSourceId: source.id,
      expectedPreviousSnapshotId: null,
      fetchedAt: now,
      startedAt: now,
      httpStatus: 200,
      responseContentType: "application/pdf",
      rawSha256: "b".repeat(64),
      normalizedSha256: "c".repeat(64),
      normalizedText: "Bambus Signatur 285 / 309",
      etag: null,
      lastModified: null,
      robotsAllowed: true,
      fetchDurationMs: 5,
      extractorVersion: "pdf-text-v3",
      items: [item],
      changes: [],
    });

    const stored = await repository.getLatestSnapshotWithItems(source.id);
    const storedItem = stored?.items[0] as
      | (NonNullable<typeof stored>["items"][number] & {
          readonly priceKind?: string;
          readonly priceMaxMinor?: number | null;
        })
      | undefined;

    expect(stored?.id).toBe(snapshotId);
    expect(storedItem).toMatchObject({
      name: "Bambus Signatur",
      priceMinor: 28500,
      priceKind: "multiple",
      priceMaxMinor: 30900,
    });

    const databaseRow = await pool.query<{
      price_minor: number;
      price_kind: string;
      price_max_minor: number | null;
    }>(
      `SELECT price_minor, price_kind, price_max_minor
         FROM fysen.menu_items
        WHERE snapshot_id = $1
          AND source_key = $2`,
      [snapshotId, "a".repeat(64)],
    );
    expect(databaseRow.rows[0]).toEqual({
      price_minor: 28500,
      price_kind: "multiple",
      price_max_minor: 30900,
    });
  });
});
