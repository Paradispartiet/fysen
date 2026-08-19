import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { listMigrationFiles } from "./migrate.js";

describe("database migrations", () => {
  it("keeps migrations ordered and creates the required spatial/search extensions", async () => {
    expect(await listMigrationFiles()).toEqual([
      "0001_menu_index.sql",
      "0002_seed_rodeo_pilot.sql",
      "0003_revenue_funnel.sql",
      "0004_restaurant_actions.sql",
      "0005_restaurant_hours.sql",
      "0006_dish_concepts.sql",
      "0007_pdf_text_extraction.sql",
      "0008_menu_source_fetch_mode.sql",
      "0009_remove_blocked_tunco_candidate.sql",
      "0010_menu_item_price_semantics.sql",
      "0011_restaurant_hours_scope_hints.sql",
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

    const actionsSql = await readFile(
      new URL("../migrations/0004_restaurant_actions.sql", import.meta.url),
      "utf8",
    );
    expect(actionsSql).toContain("CREATE TABLE IF NOT EXISTS fysen.restaurant_actions");
    expect(actionsSql).toContain("CREATE TABLE IF NOT EXISTS fysen.restaurant_action_verification_runs");
    expect(actionsSql).toContain("action_type IN ('booking', 'order')");
    expect(actionsSql).toContain("expires_at > verified_at");
    expect(actionsSql).toContain("'https://www.rodeooslo.no/booking'");
    expect(actionsSql).toContain("'first_party_page'");

    const hoursSql = await readFile(
      new URL("../migrations/0005_restaurant_hours.sql", import.meta.url),
      "utf8",
    );
    expect(hoursSql).toContain("CREATE TABLE IF NOT EXISTS fysen.restaurant_hours_sources");
    expect(hoursSql).toContain("CREATE TABLE IF NOT EXISTS fysen.restaurant_hours_snapshots");
    expect(hoursSql).toContain("CREATE TABLE IF NOT EXISTS fysen.restaurant_hours_intervals");
    expect(hoursSql).toContain("CREATE TABLE IF NOT EXISTS fysen.restaurant_hours_watch_runs");
    expect(hoursSql).toContain("service_type IN ('kitchen')");
    expect(hoursSql).toContain("'Europe/Oslo'");
    expect(hoursSql).toContain("'https://www.rodeooslo.no/'");
    expect(hoursSql).toContain("minimum_expected_intervals");

    const dishConceptsSql = await readFile(
      new URL("../migrations/0006_dish_concepts.sql", import.meta.url),
      "utf8",
    );
    expect(dishConceptsSql).toContain("CREATE TABLE IF NOT EXISTS fysen.dish_concepts");
    expect(dishConceptsSql).toContain("CREATE TABLE IF NOT EXISTS fysen.dish_aliases");
    expect(dishConceptsSql).toContain("normalized_alias text NOT NULL UNIQUE");
    expect(dishConceptsSql).toContain("'canonical'");
    expect(dishConceptsSql).toContain("'beef-tartare'");
    expect(dishConceptsSql).toContain("'tartar av okse'");
    expect(dishConceptsSql).toContain("'chicken-caesar-burger'");
    expect(dishConceptsSql).not.toContain("('beef-tartare', 'Tartar', 'tartar'");

    const pdfTextSql = await readFile(
      new URL("../migrations/0007_pdf_text_extraction.sql", import.meta.url),
      "utf8",
    );
    expect(pdfTextSql).toContain("menu_items_extraction_method_check");
    expect(pdfTextSql).toContain("'pdf_text'");
    expect(pdfTextSql).toContain("VALIDATE CONSTRAINT menu_items_extraction_method_check");

    const fetchModeSql = await readFile(
      new URL("../migrations/0008_menu_source_fetch_mode.sql", import.meta.url),
      "utf8",
    );
    expect(fetchModeSql).toContain("fetch_mode text NOT NULL DEFAULT 'http'");
    expect(fetchModeSql).toContain("fetch_mode IN ('http', 'browser')");

    const tuncoCleanupSql = await readFile(
      new URL("../migrations/0009_remove_blocked_tunco_candidate.sql", import.meta.url),
      "utf8",
    );
    expect(tuncoCleanupSql).toContain("slug = 'tunco-st-hanshaugen-oslo'");
    expect(tuncoCleanupSql).toContain("active = false");

    const priceSemanticsSql = await readFile(
      new URL("../migrations/0010_menu_item_price_semantics.sql", import.meta.url),
      "utf8",
    );
    expect(priceSemanticsSql).toContain("price_kind text NOT NULL DEFAULT 'exact'");
    expect(priceSemanticsSql).toContain("price_kind IN ('exact', 'from', 'multiple')");
    expect(priceSemanticsSql).toContain("price_max_minor >= price_minor");
    expect(priceSemanticsSql).toContain("VALIDATE CONSTRAINT menu_items_price_shape_check");

    const hoursScopeHintsSql = await readFile(
      new URL("../migrations/0011_restaurant_hours_scope_hints.sql", import.meta.url),
      "utf8",
    );
    expect(hoursScopeHintsSql).toContain("scope_hints text[] NOT NULL DEFAULT ARRAY[]::text[]");
    expect(hoursScopeHintsSql).toContain("cardinality(scope_hints) <= 8");
    expect(hoursScopeHintsSql).toContain("VALIDATE CONSTRAINT restaurant_hours_sources_scope_hints_count_check");
  });
});
