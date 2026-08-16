import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { listMigrationFiles } from "./migrate.js";

describe("database migrations", () => {
  it("keeps migrations ordered and creates the required spatial/search extensions", async () => {
    expect(await listMigrationFiles()).toEqual(["0001_menu_index.sql"]);

    const sql = await readFile(new URL("../migrations/0001_menu_index.sql", import.meta.url), "utf8");
    expect(sql).toContain("CREATE EXTENSION IF NOT EXISTS postgis");
    expect(sql).toContain("CREATE EXTENSION IF NOT EXISTS pg_trgm");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS fysen.restaurants");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS fysen.menu_sources");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS fysen.menu_snapshots");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS fysen.menu_items");
  });
});
