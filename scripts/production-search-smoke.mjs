import { createDatabasePool, searchDishes } from "../packages/database/dist/index.js";
import { normalizeDishName } from "../packages/menu-core/dist/index.js";

function requiredEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required`);
  return value;
}

function optionalInteger(name) {
  const raw = process.env[name]?.trim();
  if (!raw) return null;
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value < 0) throw new Error(`${name} must be a non-negative integer`);
  return value;
}

function assertEqual(actual, expected, label) {
  if (expected === null || expected === undefined || expected === "" || expected === "any" || expected === "none") return;
  if (actual !== expected) throw new Error(`${label}: expected ${expected}, got ${actual ?? "null"}`);
}

const query = requiredEnv("SMOKE_QUERY");
const city = process.env.SMOKE_CITY?.trim() || "Oslo";
const normalizedQuery = normalizeDishName(query);
if (!normalizedQuery) throw new Error("SMOKE_QUERY normalizes to an empty value");

const minCount = optionalInteger("SMOKE_MIN_COUNT") ?? 1;
const expectedSlug = process.env.SMOKE_EXPECTED_RESTAURANT_SLUG?.trim() || null;
const expectedDishName = process.env.SMOKE_EXPECTED_DISH_NAME?.trim() || null;
const expectedPriceMinor = optionalInteger("SMOKE_EXPECTED_PRICE_MINOR");
const expectedPriceKind = process.env.SMOKE_EXPECTED_PRICE_KIND?.trim() || null;
const expectedPriceMaxMinor = optionalInteger("SMOKE_EXPECTED_PRICE_MAX_MINOR");
const expectedMatchType = process.env.SMOKE_EXPECTED_MATCH_TYPE?.trim() || null;
const expectedOpening = process.env.SMOKE_EXPECTED_OPENING?.trim() || null;
const expectedAction = process.env.SMOKE_EXPECTED_ACTION?.trim() || null;

const pool = createDatabasePool({ maxConnections: 2 });
try {
  const rows = await searchDishes(pool, {
    normalizedQuery,
    city,
    limit: 20,
    latitude: null,
    longitude: null,
    sort: "relevance",
  });

  if (rows.length < minCount) {
    throw new Error(`Expected at least ${minCount} result(s), got ${rows.length}`);
  }

  const target = expectedSlug
    ? rows.find((row) => row.restaurantSlug === expectedSlug)
    : rows[0] ?? null;
  if (!target) {
    throw new Error(`Expected restaurant ${expectedSlug} was not present in ${rows.length} result(s)`);
  }

  if (expectedDishName && target.dishName !== expectedDishName) {
    throw new Error(`dish name: expected ${expectedDishName}, got ${target.dishName}`);
  }
  if (expectedPriceMinor !== null && target.priceMinor !== expectedPriceMinor) {
    throw new Error(`priceMinor: expected ${expectedPriceMinor}, got ${target.priceMinor ?? "null"}`);
  }
  assertEqual(target.priceKind, expectedPriceKind, "price kind");
  if (expectedPriceMaxMinor !== null && target.priceMaxMinor !== expectedPriceMaxMinor) {
    throw new Error(`priceMaxMinor: expected ${expectedPriceMaxMinor}, got ${target.priceMaxMinor ?? "null"}`);
  }
  assertEqual(target.matchType, expectedMatchType, "match type");
  assertEqual(target.opening.state, expectedOpening, "opening state");

  if (expectedAction === "booking" && !target.bookingAction) {
    throw new Error("Expected a verified booking action, but none was returned");
  }
  if (expectedAction === "order" && !target.orderAction) {
    throw new Error("Expected a verified order action, but none was returned");
  }

  const output = {
    ok: true,
    recordedRevenueEvents: false,
    query,
    normalizedQuery,
    city,
    count: rows.length,
    target: {
      dishName: target.dishName,
      normalizedName: target.normalizedName,
      priceMinor: target.priceMinor,
      priceKind: target.priceKind,
      priceMaxMinor: target.priceMaxMinor,
      currency: target.currency,
      confidence: target.confidence,
      restaurantSlug: target.restaurantSlug,
      restaurantName: target.restaurantName,
      opening: target.opening,
      matchType: target.matchType,
      score: target.score,
      canonicalDish: target.canonicalDish,
      menu: {
        sourceUrl: target.sourceUrl,
        observedAt: target.observedAt,
        lastCheckedAt: target.lastCheckedAt,
        freshUntil: target.freshUntil,
      },
      actions: {
        booking: target.bookingAction,
        order: target.orderAction,
      },
    },
  };
  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
} finally {
  await pool.end();
}
