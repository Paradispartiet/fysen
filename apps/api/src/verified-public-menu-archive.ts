import { createHash } from "node:crypto";
import { gunzipSync } from "node:zlib";

const archiveRoot = "https://raw.githubusercontent.com/Paradispartiet/fysen/fysen-free-public-index/";
const maximumCompressedBytes = 4 * 1024 * 1024;
const maximumUncompressedBytes = 32 * 1024 * 1024;
const cacheDurationMs = 120_000;

type RestaurantRow = readonly [string, string, string, string, string];
type SourceRow = readonly [number, string, string];
type ItemRow = readonly [number, string, string, number | null, "exact" | "from" | "multiple", number | null, string, string];

export interface VerifiedPublicArchive {
  readonly archiveDate: string;
  readonly lastRefreshAt: string | null;
  readonly restaurants: readonly RestaurantRow[];
  readonly sources: readonly SourceRow[];
  readonly items: readonly ItemRow[];
  readonly quarantinedSources: ReadonlySet<number>;
  readonly quarantinedSlugs: ReadonlySet<string>;
}

export interface ArchivedPublicDish {
  readonly name: string;
  readonly normalizedName: string;
  readonly priceMinor: number | null;
  readonly priceKind: "exact" | "from" | "multiple";
  readonly priceMaxMinor: number | null;
  readonly currency: "NOK";
  readonly restaurant: {
    readonly name: string;
    readonly slug: string;
    readonly address: string;
    readonly city: string;
  };
  readonly menu: {
    readonly sourceUrl: string;
    readonly observedAt: string;
  };
}

function record(value: unknown): Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Invalid verified public archive object");
  }
  return value as Record<string, unknown>;
}

function date(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}/u.test(value) &&
    Number.isFinite(Date.parse(value));
}

function httpUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return (url.protocol === "https:" || url.protocol === "http:") &&
      Boolean(url.hostname);
  } catch {
    return false;
  }
}

export function normalizeArchiveDishName(value: string): string {
  return value.normalize("NFKC").toLocaleLowerCase("nb-NO")
    .replace(/[^\p{L}\p{N}]+/gu, " ").trim().replace(/\s+/gu, " ");
}

/** Fail closed: no archived rows without matching manifest and valid quarantine. */
export function parseVerifiedPublicArchive(manifestValue: unknown, indexValue: unknown): VerifiedPublicArchive {
  const manifest = record(manifestValue);
  const index = record(indexValue);
  if (manifest.version !== 1 || index.version !== 1 ||
      !date(manifest.archiveDate) || manifest.archiveDate !== index.archiveDate ||
      !Array.isArray(index.restaurants) || !Array.isArray(index.sources) ||
      !Array.isArray(index.items) ||
      manifest.restaurants !== index.restaurants.length ||
      manifest.sources !== index.sources.length ||
      manifest.dishes !== index.items.length) {
    throw new Error("Verified public archive counts do not match manifest");
  }

  const restaurants = index.restaurants as unknown[];
  const sources = index.sources as unknown[];
  const items = index.items as unknown[];
  if (!restaurants.every((r) => Array.isArray(r) && r.length >= 5 &&
      r.slice(0, 5).every((v: unknown) => typeof v === "string") &&
      r[0].length > 0 && r[1].length > 0)) {
    throw new Error("Invalid verified public archive restaurants");
  }
  if (!sources.every((r) => Array.isArray(r) && r.length >= 3 &&
      Number.isInteger(r[0]) && r[0] >= 0 && r[0] < restaurants.length &&
      httpUrl(r[1]) && date(r[2]))) {
    throw new Error("Invalid verified public archive sources");
  }
  if (!items.every((r) => Array.isArray(r) && r.length >= 8 &&
      Number.isInteger(r[0]) && r[0] >= 0 && r[0] < sources.length &&
      typeof r[1] === "string" && r[1].trim().length > 0 &&
      typeof r[2] === "string" && r[2].trim().length > 0 &&
      (r[3] === null || (Number.isSafeInteger(r[3]) && r[3] >= 0)) &&
      ["exact", "from", "multiple"].includes(r[4]) &&
      (r[5] === null || (Number.isSafeInteger(r[5]) && r[5] >= 0)) &&
      typeof r[6] === "string" && typeof r[7] === "string")) {
    throw new Error("Invalid verified public archive items");
  }

  // A missing or invalid quarantine list is unsafe even when the raw menu
  // index is checksum-valid. Verify that each index maps to the stated slug.
  const quarantine = record(manifest.sourceQuarantines);
  if (Object.keys(quarantine).length < 4) {
    throw new Error("Missing required restaurant identity quarantine");
  }
  const quarantinedSources = new Set<number>();
  const quarantinedSlugs = new Set<string>();
  for (const [rawIndex, value] of Object.entries(quarantine)) {
    const data = record(value);
    const indexNumber = Number(rawIndex);
    if (!Number.isInteger(indexNumber) || String(indexNumber) !== rawIndex ||
        indexNumber < 0 || indexNumber >= sources.length ||
        data.code !== "identity-unverified" ||
        typeof data.slug !== "string" || !data.slug) {
      throw new Error("Invalid restaurant identity quarantine");
    }
    const source = sources[indexNumber] as SourceRow;
    const restaurant = restaurants[source[0]] as RestaurantRow;
    if (restaurant[1] !== data.slug) {
      throw new Error("Identity quarantine does not match archived restaurant");
    }
    quarantinedSources.add(indexNumber);
    quarantinedSlugs.add(data.slug);
  }

  return {
    archiveDate: manifest.archiveDate,
    lastRefreshAt: date(manifest.lastRefreshAt) ? manifest.lastRefreshAt : null,
    restaurants: restaurants as RestaurantRow[],
    sources: sources as SourceRow[],
    items: items as ItemRow[],
    quarantinedSources,
    quarantinedSlugs,
  };
}

let stored: { until: number; value: Promise<VerifiedPublicArchive> } | null = null;

export function resetVerifiedPublicArchiveCacheForTest(): void {
  stored = null;
}

export async function getVerifiedPublicArchive(): Promise<VerifiedPublicArchive> {
  if (stored && Date.now() < stored.until) return stored.value;
  const pending = loadVerifiedPublicArchive();
  stored = { until: Date.now() + cacheDurationMs, value: pending };
  try {
    return await pending;
  } catch (error) {
    if (stored?.value === pending) stored = null;
    throw error;
  }
}

async function loadVerifiedPublicArchive(): Promise<VerifiedPublicArchive> {
  const manifestResponse = await fetch(archiveRoot + "manifest.json", {
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!manifestResponse.ok) throw new Error("Verified public manifest unavailable");
  const manifest: unknown = await manifestResponse.json();
  const metadata = record(manifest);
  if (typeof metadata.sha256 !== "string" || !/^[a-f0-9]{64}$/u.test(metadata.sha256) ||
      typeof metadata.bytes !== "number" || !Number.isSafeInteger(metadata.bytes) ||
      metadata.bytes < 100 || metadata.bytes > maximumCompressedBytes) {
    throw new Error("Invalid verified public archive fingerprint");
  }
  const blobResponse = await fetch(
    archiveRoot + "index.json.gz?sha256=" + encodeURIComponent(metadata.sha256), {
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    },
  );
  if (!blobResponse.ok) throw new Error("Verified public archive unavailable");
  const compressed = Buffer.from(await blobResponse.arrayBuffer());
  if (compressed.byteLength !== metadata.bytes ||
      compressed.byteLength > maximumCompressedBytes ||
      createHash("sha256").update(compressed).digest("hex") !== metadata.sha256) {
    throw new Error("Verified public archive checksum mismatch");
  }
  const uncompressed = gunzipSync(compressed, { maxOutputLength: maximumUncompressedBytes });
  const index: unknown = JSON.parse(uncompressed.toString("utf8"));
  return parseVerifiedPublicArchive(manifest, index);
}

function selectedItems(archive: VerifiedPublicArchive, city: string): Array<{
  row: ItemRow;
  source: SourceRow;
  restaurant: RestaurantRow;
}> {
  if (city.trim().toLocaleLowerCase("nb-NO") !== "oslo") return [];
  const selected: Array<{ row: ItemRow; source: SourceRow; restaurant: RestaurantRow }> = [];
  for (const row of archive.items) {
    if (archive.quarantinedSources.has(row[0])) continue;
    const source = archive.sources[row[0]];
    if (!source) continue;
    const restaurant = archive.restaurants[source[0]];
    if (!restaurant || archive.quarantinedSlugs.has(restaurant[1])) continue;
    if (restaurant[3].toLocaleLowerCase("nb-NO") !== "oslo") continue;
    selected.push({ row, source, restaurant });
  }
  return selected;
}

export function archivedPublicSearch(
  archive: VerifiedPublicArchive,
  query: string,
  city: string,
  limit = 20,
): {
  readonly source: "verified-menu-archive";
  readonly realtime: false;
  readonly archiveDate: string;
  readonly lastRefreshAt: string | null;
  readonly query: string;
  readonly city: string;
  readonly count: number;
  readonly results: readonly ArchivedPublicDish[];
} {
  const normalizedQuery = normalizeArchiveDishName(query);
  const matches = selectedItems(archive, city)
    .filter(({ row }) => normalizedQuery.length >= 2 && row[2].includes(normalizedQuery))
    .map(({ row, source, restaurant }) => ({
      score: row[2] === normalizedQuery ? 3 : row[2].startsWith(normalizedQuery) ? 2 : 1,
      row, source, restaurant,
    }));
  matches.sort((a, b) =>
    b.score - a.score ||
    b.source[2].localeCompare(a.source[2]) ||
    a.restaurant[0].localeCompare(b.restaurant[0], "nb") ||
    a.row[1].localeCompare(b.row[1], "nb"));
  const results: ArchivedPublicDish[] = [];
  const perRestaurant = new Map<string, number>();
  const seen = new Set<string>();
  for (const { row, source, restaurant } of matches) {
    const key = restaurant[1] + ":" + row[2] + ":" + (row[3] ?? "unknown");
    if (seen.has(key) || (perRestaurant.get(restaurant[1]) ?? 0) >= 2) continue;
    seen.add(key);
    perRestaurant.set(restaurant[1], (perRestaurant.get(restaurant[1]) ?? 0) + 1);
    results.push({
      name: row[1],
      normalizedName: row[2],
      priceMinor: row[3],
      priceKind: row[4],
      priceMaxMinor: row[5],
      currency: "NOK",
      restaurant: {
        name: restaurant[0],
        slug: restaurant[1],
        address: restaurant[2],
        city: restaurant[3],
      },
      menu: { sourceUrl: source[1], observedAt: source[2] },
    });
    if (results.length >= Math.min(Math.max(limit, 1), 50)) break;
  }
  return {
    source: "verified-menu-archive",
    realtime: false,
    archiveDate: archive.archiveDate,
    lastRefreshAt: archive.lastRefreshAt,
    query, city, count: results.length, results,
  };
}

export function archivedPublicBrowse(archive: VerifiedPublicArchive, city: string): {
  readonly source: "verified-menu-archive";
  readonly realtime: false;
  readonly archiveDate: string;
  readonly lastRefreshAt: string | null;
  readonly city: string;
  readonly count: number;
  readonly dishes: readonly {
    readonly name: string;
    readonly query: string;
    readonly restaurantCount: number;
    readonly restaurantExamples: readonly { name: string; slug: string; address: string }[];
  }[];
} {
  const grouped = new Map<string, {
    name: string;
    restaurants: Map<string, { name: string; slug: string; address: string }>;
  }>();
  for (const { row, restaurant } of selectedItems(archive, city)) {
    const key = row[2];
    let current = grouped.get(key);
    if (!current) {
      current = { name: row[1], restaurants: new Map() };
      grouped.set(key, current);
    }
    if (!current.restaurants.has(restaurant[1])) {
      current.restaurants.set(restaurant[1], {
        name: restaurant[0], slug: restaurant[1], address: restaurant[2],
      });
    }
  }
  const dishes = Array.from(grouped, ([query, item]) => ({
    name: item.name,
    query,
    restaurantCount: item.restaurants.size,
    restaurantExamples: [...item.restaurants.values()].slice(0, 2),
  })).sort((a, b) => b.restaurantCount - a.restaurantCount ||
    a.name.localeCompare(b.name, "nb")).slice(0, 60);
  return {
    source: "verified-menu-archive", realtime: false,
    archiveDate: archive.archiveDate, lastRefreshAt: archive.lastRefreshAt,
    city, count: grouped.size, dishes,
  };
}
