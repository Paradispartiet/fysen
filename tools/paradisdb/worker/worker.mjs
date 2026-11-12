/* ParadisDB v0 — public Fysen API adapter for Cloudflare Workers + D1.
 * Explicitly READ-ONLY. No private app documents, login, uploads or payments.
 * No service is deployed by this source file. */
const SOURCE = "verified-menu-archive";
const MAX_RESULTS = 50;
const MAX_MATCH_ROWS = 500;
const ALLOWED_PATHS = new Set([
  "/v1/dishes/archive/status",
  "/v1/dishes/archive/search",
]);

// FTS5 trigram LIKE is indexed for three or more normalized characters.
// Very short searches retain the original bounded query for compatibility;
// those can still scan broadly and must be considered in the cost budget.
const PUBLIC_SELECT =
  "SELECT restaurant_name,restaurant_slug,address,city,dish_name,normalized_name," +
  " price_minor,price_kind,price_max_minor,source_url,observed_at" +
  " FROM fysen_public_items WHERE lower(city) = ? AND instr(normalized_name, ?) > 0" +
  " ORDER BY CASE WHEN normalized_name = ? THEN 3" +
  " WHEN substr(normalized_name, 1, length(?)) = ? THEN 2 ELSE 1 END DESC," +
  " observed_at DESC, restaurant_name ASC, dish_name ASC LIMIT " + MAX_MATCH_ROWS;

const PUBLIC_FTS_SELECT =
  "SELECT i.restaurant_name,i.restaurant_slug,i.address,i.city,i.dish_name,i.normalized_name," +
  " i.price_minor,i.price_kind,i.price_max_minor,i.source_url,i.observed_at" +
  " FROM fysen_public_trigrams AS tr" +
  " JOIN fysen_public_items AS i ON i.item_index = tr.rowid" +
  " WHERE lower(i.city) = ? AND tr.normalized_name LIKE ?" +
  " ORDER BY CASE WHEN i.normalized_name = ? THEN 3" +
  " WHEN substr(i.normalized_name, 1, length(?)) = ? THEN 2 ELSE 1 END DESC," +
  " i.observed_at DESC, i.restaurant_name ASC, i.dish_name ASC LIMIT " + MAX_MATCH_ROWS;

function response(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": status === 200 ? "public, max-age=60" : "no-store",
      "x-content-type-options": "nosniff",
      "x-frame-options": "DENY",
      "referrer-policy": "no-referrer",
    },
  });
}
function invalid(message) { return response({ code: "INVALID_QUERY", message }, 400); }
function unavailable() {
  return response({
    code: "PARADISDB_PUBLIC_ARCHIVE_UNAVAILABLE",
    message: "Verified public archive is not ready.",
  }, 503);
}
function normalize(value) {
  return String(value).normalize("NFKC").toLocaleLowerCase("nb-NO")
    .replace(/[^\p{L}\p{N}]+/gu, " ").trim().replace(/\s+/gu, " ");
}
async function publicManifest(db) {
  const data = await db.prepare(
    "SELECT key,value FROM public_archive_meta" +
    " WHERE key IN ('public_ready','archiveDate','lastRefreshAt','sha256'," +
    "'restaurants','sources','originalItems','publicItems','quarantinedSources','publicRowsSha256')"
  ).all();
  const meta = Object.fromEntries((data.results || []).map(({ key, value }) => {
    try { return [key, JSON.parse(value)]; } catch { return [key, null]; }
  }));
  if (meta.public_ready !== true || typeof meta.sha256 !== "string"
      || !/^[a-f0-9]{64}$/.test(meta.sha256)
      || !/^[a-f0-9]{64}$/.test(String(meta.publicRowsSha256 || ""))
      || !Number.isInteger(meta.publicItems) || meta.publicItems < 1
      || !Number.isInteger(meta.quarantinedSources) || meta.quarantinedSources < 4
      || typeof meta.archiveDate !== "string") {
    return null;
  }
  return meta;
}
function parseSearch(searchParams) {
  const allowed = new Set(["q", "city", "limit"]);
  if ([...searchParams.keys()].some(k => !allowed.has(k))
      || [...allowed].some(k => searchParams.getAll(k).length > 1)) {
    return null;
  }
  const q = searchParams.get("q") || "";
  const normalized = normalize(q.trim());
  const city = searchParams.get("city") || "Oslo";
  const literalLimit = searchParams.get("limit") || "20";
  if (!/^[1-9]\d{0,1}$/.test(literalLimit)) return null;
  const limit = Number(literalLimit);
  if (normalized.length < 2 || normalized.length > 80 || q.length > 160
      || city.length > 80 || !city.trim() || limit > MAX_RESULTS) return null;
  return { q, normalized, city, limit };
}
function formatSearch(meta, parsed, rows) {
  const results = [], perRestaurant = new Map(), seen = new Set();
  for (const row of rows) {
    const key = row.restaurant_slug + ":" + row.normalized_name + ":" +
      (row.price_minor ?? "unknown");
    if (seen.has(key) || (perRestaurant.get(row.restaurant_slug) || 0) >= 2) continue;
    seen.add(key);
    perRestaurant.set(row.restaurant_slug, (perRestaurant.get(row.restaurant_slug) || 0) + 1);
    results.push({
      name: row.dish_name, normalizedName: row.normalized_name,
      priceMinor: row.price_minor, priceKind: row.price_kind,
      priceMaxMinor: row.price_max_minor, currency: "NOK",
      restaurant: {
        name: row.restaurant_name, slug: row.restaurant_slug,
        address: row.address, city: row.city,
      },
      menu: { sourceUrl: row.source_url, observedAt: row.observed_at },
    });
    if (results.length >= parsed.limit) break;
  }
  return {
    source: SOURCE, realtime: false, archiveDate: meta.archiveDate,
    lastRefreshAt: meta.lastRefreshAt, query: parsed.q, city: parsed.city,
    count: results.length, results,
  };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!ALLOWED_PATHS.has(url.pathname)) {
      return response({ code: "NOT_FOUND" }, 404);
    }
    // 405 before touching D1. No HTTP writes, even from a signed-in visitor.
    if (request.method !== "GET") {
      const res = response({ code: "METHOD_NOT_ALLOWED" }, 405);
      res.headers.set("allow", "GET");
      return res;
    }
    if (!env || typeof env.PUBLIC_DB?.prepare !== "function") return unavailable();
    try {
      const parsed = url.pathname.endsWith("/search") ? parseSearch(url.searchParams) : null;
      if (url.pathname.endsWith("/search") && !parsed) {
        return invalid("Expected q (2–80 characters), optional city and limit (1–50).");
      }
      if (url.pathname.endsWith("/status") && [...url.searchParams.keys()].length) {
        return invalid("Status endpoint accepts no query parameters.");
      }
      const meta = await publicManifest(env.PUBLIC_DB);
      if (!meta) return unavailable(); // Partial/unsigned imports are never served.
      if (url.pathname.endsWith("/status")) {
        return response({
          source: SOURCE, realtime: false,
          archiveDate: meta.archiveDate, lastRefreshAt: meta.lastRefreshAt,
          restaurants: meta.restaurants, menuSources: meta.sources,
          menuItems: meta.publicItems, identityQuarantines: meta.quarantinedSources,
          sha256: meta.sha256, publicRowsSha256: meta.publicRowsSha256,
        });
      }
      const indexed = parsed.normalized.length >= 3;
      const { results } = await env.PUBLIC_DB.prepare(indexed ? PUBLIC_FTS_SELECT : PUBLIC_SELECT)
        .bind(parsed.city.trim().toLowerCase(),
          indexed ? "%" + parsed.normalized + "%" : parsed.normalized,
          parsed.normalized, parsed.normalized, parsed.normalized)
        .all();
      return response(formatSearch(meta, parsed, results || []));
    } catch {
      // Never expose D1 SQL details or credentials in public errors.
      return unavailable();
    }
  }
};
