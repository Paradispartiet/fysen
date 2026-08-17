import type { MenuObservedItem } from "@fysen/menu-core";
import type { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDatabasePool } from "./client.js";
import { runMigrations } from "./migrate.js";
import { MenuIndexRepository } from "./repository.js";

const databaseUrl = process.env.DATABASE_URL;
const integrationDescribe = databaseUrl ? describe : describe.skip;

integrationDescribe("MenuIndexRepository price semantics", () => {
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

  async function createSource(slug: string) {
    const repository = new MenuIndexRepository(pool);
    const restaurantId = await repository.upsertRestaurant({
      slug,
      name: slug,
      websiteUrl: "https://example.com/",
      address: "Prisgata 1",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.91,
      longitude: 10.75,
    });
    const source = await repository.upsertMenuSource({
      restaurantId,
      url: `https://example.com/${slug}.pdf`,
      sourceType: "pdf",
      userAgent: "FysenMenuBot/0.1",
      checkIntervalMinutes: 360,
      minimumExpectedItems: 1,
    });
    return { repository, source };
  }

  function item(
    sourceKey: string,
    name: string,
    price: Pick<MenuObservedItem, "priceMinor" | "priceKind" | "priceMaxMinor">,
  ): MenuObservedItem {
    return {
      sourceKey,
      name,
      normalizedName: name.toLocaleLowerCase("nb-NO"),
      description: null,
      sectionName: "SIGNATUR",
      priceMinor: price.priceMinor,
      ...(price.priceKind !== undefined ? { priceKind: price.priceKind } : {}),
      ...(price.priceMaxMinor !== undefined ? { priceMaxMinor: price.priceMaxMinor } : {}),
      currency: "NOK",
      position: 0,
      extractionMethod: "pdf_text",
      confidence: 0.9,
      sourceExcerpt: name,
    };
  }

  it("persists and reads canonical exact and multiple semantics in the snapshot transaction", async () => {
    const { repository, source } = await createSource("canonical-price-roundtrip-oslo");
    const now = new Date().toISOString();
    const exact = item("a".repeat(64), "Exact Rett", { priceMinor: 20900 });
    const multiple = item("b".repeat(64), "Bambus Signatur", {
      priceMinor: 28500,
      priceKind: "multiple",
      priceMaxMinor: 30900,
    });

    const snapshotId = await repository.recordSnapshot({
      menuSourceId: source.id,
      expectedPreviousSnapshotId: null,
      fetchedAt: now,
      startedAt: now,
      httpStatus: 200,
      responseContentType: "application/pdf",
      rawSha256: "c".repeat(64),
      normalizedSha256: "d".repeat(64),
      normalizedText: "Exact Rett 209\nBambus Signatur 285 / 309",
      etag: null,
      lastModified: null,
      robotsAllowed: true,
      fetchDurationMs: 5,
      extractorVersion: "pdf-text-v4",
      items: [exact, multiple],
      changes: [],
    });

    const stored = await repository.getLatestSnapshotWithItems(source.id);
    expect(stored?.id).toBe(snapshotId);
    expect(stored?.items).toEqual([
      expect.objectContaining({
        name: "Exact Rett",
        priceMinor: 20900,
        priceKind: "exact",
        priceMaxMinor: null,
      }),
      expect.objectContaining({
        name: "Bambus Signatur",
        priceMinor: 28500,
        priceKind: "multiple",
        priceMaxMinor: 30900,
      }),
    ]);

    const rows = await pool.query<{
      original_name: string;
      price_minor: number | null;
      price_kind: string;
      price_max_minor: number | null;
    }>(
      `SELECT original_name, price_minor, price_kind, price_max_minor
         FROM fysen.menu_items
        WHERE snapshot_id = $1
        ORDER BY position, original_name`,
      [snapshotId],
    );
    expect(rows.rows).toEqual([
      {
        original_name: "Bambus Signatur",
        price_minor: 28500,
        price_kind: "multiple",
        price_max_minor: 30900,
      },
      {
        original_name: "Exact Rett",
        price_minor: 20900,
        price_kind: "exact",
        price_max_minor: null,
      },
    ]);
  });

  it("rolls back the entire snapshot when canonical price semantics are invalid", async () => {
    const { repository, source } = await createSource("invalid-price-rollback-oslo");
    const now = new Date().toISOString();
    const invalid = item("e".repeat(64), "Ugyldig Rett", {
      priceMinor: 30900,
      priceKind: "multiple",
      priceMaxMinor: 28500,
    });

    await expect(
      repository.recordSnapshot({
        menuSourceId: source.id,
        expectedPreviousSnapshotId: null,
        fetchedAt: now,
        startedAt: now,
        httpStatus: 200,
        responseContentType: "application/pdf",
        rawSha256: "f".repeat(64),
        normalizedSha256: "0".repeat(64),
        normalizedText: "Ugyldig Rett 309 / 285",
        etag: null,
        lastModified: null,
        robotsAllowed: true,
        fetchDurationMs: 5,
        extractorVersion: "pdf-text-v4",
        items: [invalid],
        changes: [],
      }),
    ).rejects.toThrow("multiple price semantics require priceMaxMinor >= priceMinor");

    const snapshotCount = await pool.query<{ count: string }>(
      "SELECT count(*)::text AS count FROM fysen.menu_snapshots WHERE menu_source_id = $1",
      [source.id],
    );
    const itemCount = await pool.query<{ count: string }>(
      `SELECT count(*)::text AS count
         FROM fysen.menu_items item
         JOIN fysen.menu_snapshots snapshot ON snapshot.id = item.snapshot_id
        WHERE snapshot.menu_source_id = $1`,
      [source.id],
    );
    expect(snapshotCount.rows[0]?.count).toBe("0");
    expect(itemCount.rows[0]?.count).toBe("0");
  });
});
