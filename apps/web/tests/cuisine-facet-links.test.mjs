import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { URL } from "node:url";
import { dishBrowseCuisineHref } from "../lib/public-path.ts";

test("cuisine links round-trip either region or food type without combining them", () => {
  const region = new URL(dishBrowseCuisineHref("Oslo", "Italiensk", { region: "Siciliansk" }), "https://fysen.test");
  assert.equal(region.searchParams.get("city"), "Oslo");
  assert.equal(region.searchParams.get("cuisine"), "Italiensk");
  assert.equal(region.searchParams.get("region"), "Siciliansk");
  assert.equal(region.searchParams.get("mat"), null);

  const type = new URL(dishBrowseCuisineHref("Oslo", "Italiensk", { mat: "Pizza" }), "https://fysen.test");
  assert.equal(type.searchParams.get("mat"), "Pizza");
  assert.equal(type.searchParams.get("region"), null);

  const ambiguous = new URL(dishBrowseCuisineHref("Oslo", "Italiensk", { region: "Lazio", mat: "Pasta" }), "https://fysen.test");
  assert.equal(ambiguous.searchParams.get("mat"), "Pasta");
  assert.equal(ambiguous.searchParams.get("region"), null);
  assert.equal(new URL(dishBrowseCuisineHref("Oslo"), "https://fysen.test").searchParams.has("cuisine"), false);
  assert.equal(new URL(dishBrowseCuisineHref("Oslo", undefined, { mat: "Pizza" }), "https://fysen.test").searchParams.has("mat"), false);
});

test("live and archived searches share validated cuisine facet parameters", async () => {
  const route = await readFile(new URL("../app/search/page.tsx", import.meta.url), "utf8");
  const live = await readFile(new URL("../components/dish-browse.tsx", import.meta.url), "utf8");
  const archive = await readFile(new URL("../components/verified-menu-archive-view.tsx", import.meta.url), "utf8");
  assert.ok(route.includes("initialAreaName={first(params.region)}"));
  assert.ok(route.includes("initialFoodTypeName={first(params.mat)}"));
  assert.ok(live.includes("const initialArea = initialAtlas && !initialType"));
  assert.ok(live.includes("type.name === initialFoodTypeName"));
  assert.ok(live.includes("area.name === initialAreaName"));
  assert.ok(live.includes("chooseArea(areaName)"));
  assert.ok(live.includes("chooseFoodType(type.name)"));
  assert.ok(live.includes("dishBrowseCuisineHref(city, cuisineName, selection)"));
  assert.ok(archive.includes('params.set("region", option.region)'));
  assert.ok(archive.includes('params.set("mat", option.mat)'));
});

test("static preview and production redirect preserve the chosen kitchen facets", async () => {
  const source = await readFile(new URL("../components/static-preview-search-page.tsx", import.meta.url), "utf8");
  assert.ok(source.includes('cuisine: (params.get("cuisine") ?? "").trim()'));
  assert.ok(source.includes('region: (params.get("region") ?? "").trim()'));
  assert.ok(source.includes('mat: (params.get("mat") ?? "").trim()'));
  assert.ok(source.includes('initialCuisineName={query?.cuisine ?? ""}'));
  assert.ok(source.includes('initialFoodTypeName={query?.mat ?? ""}'));
  assert.ok(source.includes('initialAreaName={query?.region ?? ""}'));
  assert.ok(source.includes('if (query.cuisine) params.set("cuisine", query.cuisine)'));
});
