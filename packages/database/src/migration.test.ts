import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { listMigrationFiles } from "./migrate.js";

describe("database migrations", () => {
  it("keeps migrations ordered and creates the required spatial/search extensions", async () => {
    expect(await listMigrationFiles()).toEqual([
      "0001_menu_index.sql",
      "0002_seed_rodeo_pilot.sql",
      "0003_revenue_funnel.sql",
    ]);

    const schemaSql = await readFile(
      new URL("../migrations/0001_menu_index.sql", import.meta.url),
      "utf8",
    );
    expect(schemaSql).toContain("CREATE EXTENSION IF NOT EXISTS postgis");
    expect(schemaSql).toContain("CREATE EXTENSION IF NOT EXISTS pg_trgm");
    expect(schemaSql).toContain("CREATE TABLE IF NOT EXISTS fysen.restaurants");
    expect(schemaSql).toContain("CREATE TABLE IF NOT EXISTS fysen.menu_sources");
    expect(schemaSql).toContain("CREATE TABLE IF NOT EXISTS fysen.menu_snapshots");
    expect(schemaSql).toContain("CREATE TABLE IF NOT EXISTS fysen.menu_items");

    const seedSql = await readFile(
      new URL("../migrations/0002_seed_rodeo_pilot.sql", import.meta.url),
      "utf8",
    );
    expect(seedSql).toContain("'rodeo-oslo'");
    expect(seedSql).toContain("'https://www.rodeooslo.no/'");
    expect(seedSql).toContain("next_check_at");

    const revenueSql = await readFile(
      new URL("../migrations/0003_revenue_funnel.sql", import.meta.url),
      "utf8",
    );
    expect(revenueSql).toContain("CREATE TABLE IF NOT EXISTS fysen.search_events");
    expect(revenueSql).toContain("CREATE TABLE IF NOT EXISTS fysen.search_result_impressions");
    expect(revenueSql).toContain("CREATE TABLE IF NOT EXISTS fysen.conversion_events");
    expect(revenueSql).toContain("WHERE result_count = 0");
    expect(revenueSql).toContain("client_event_id uuid NOT NULL UNIQUE");
  });
});
