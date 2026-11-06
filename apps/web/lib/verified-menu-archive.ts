import { createHash } from "node:crypto";
import { gunzipSync } from "node:zlib";

const publicIndexBase =
  "https://raw.githubusercontent.com/Paradispartiet/fysen/fysen-free-public-index/";
const maxCompressedBytes = 4 * 1024 * 1024;
const maxUncompressedBytes = 32 * 1024 * 1024;

type RestaurantRow = readonly [string, string, string, string, string];
type SourceRow = readonly [number, string, string];
type ItemRow = readonly [number, string, string, number | null, string, number | null, string, string];

export interface PublicMenuArchive {
  readonly archiveDate: string;
  readonly lastRefreshAt: string | null;
  readonly restaurants: readonly RestaurantRow[];
  readonly sources: readonly SourceRow[];
  readonly items: readonly ItemRow[];
  readonly quarantinedSourceIndices: ReadonlySet<number>;
  readonly quarantinedSlugs: ReadonlySet<string>;
}

export interface ArchivedMenuMatch {
  readonly name: string;
  readonly restaurantName: string;
  readonly restaurantSlug: string;
  readonly address: string;
  readonly priceMinor: number | null;
  readonly priceKind: string;
  readonly sourceUrl: string;
  readonly observedAt: string;
}

function dictionary(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Invalid public menu archive format");
  }
  return value as Record<string, unknown>;
}

function validDate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}/u.test(value) &&
    Number.isFinite(Date.parse(value));
}

function validHttpUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

/**
 * Public data comes from the isolated, quality-gated Free archive.
 * Metadata and compressed index must match exactly. No timestamps are
 * changed and no archive rows are ever written to the live database.
 */
export function parsePublicMenuArchive(manifestValue: unknown, indexValue: unknown): PublicMenuArchive {
  const manifest = dictionary(manifestValue);
  const index = dictionary(indexValue);
  if (manifest.version !== 1 || index.version !== 1 ||
      !validDate(manifest.archiveDate) || manifest.archiveDate !== index.archiveDate ||
      !Array.isArray(index.restaurants) || !Array.isArray(index.sources) ||
      !Array.isArray(index.items) ||
      index.restaurants.length !== manifest.restaurants ||
      index.sources.length !== manifest.sources ||
      index.items.length !== manifest.dishes) {
    throw new Error("Public menu archive manifest mismatch");
  }

  if (!index.restaurants.every((row: unknown) =>
    Array.isArray(row) && row.length >= 4 &&
    typeof row[0] === "string" && typeof row[1] === "string" &&
    typeof row[2] === "string" && typeof row[3] === "string"
  )) {
    throw new Error("Invalid archived restaurants");
  }
  if (!index.sources.every((row: unknown) =>
    Array.isArray(row) && row.length >= 3 &&
    Number.isInteger(row[0]) && row[0] >= 0 && row[0] < index.restaurants.length &&
    validHttpUrl(row[1]) && validDate(row[2])
  )) {
    throw new Error("Invalid archived source provenance");
  }
  if (!index.items.every((row: unknown) =>
    Array.isArray(row) && row.length >= 7 &&
    Number.isInteger(row[0]) && row[0] >= 0 && row[0] < index.sources.length &&
    typeof row[1] === "string" && row[1].trim().length > 0 &&
    typeof row[2] === "string" && row[2].trim().length > 0 &&
    (row[3] === null || Number.isSafeInteger(row[3])) &&
    typeof row[4] === "string"
  )) {
    throw new Error("Invalid archived menu items");
  }

  // The quarantine metadata is mandatory. If it is lost or malformed we
  // fail closed instead of silently showing disputed restaurant identities.
  const quarantines = dictionary(manifest.sourceQuarantines);
  if (Object.keys(quarantines).length === 0) {
    throw new Error("Public archive missing identity quarantine metadata");
  }
  const indices = new Set<number>();
  const slugs = new Set<string>();
  for (const [sourceIndex, rawRecord] of Object.entries(quarantines)) {
    const record = dictionary(rawRecord);
    const indexNumber = Number(sourceIndex);
    if (!Number.isInteger(indexNumber) || indexNumber < 0 ||
        indexNumber >= index.sources.length ||
        record.code !== "identity-unverified" ||
        typeof record.slug !== "string" || record.slug.trim() === "") {
      throw new Error("Invalid public archive quarantine");
    }
    indices.add(indexNumber);
    slugs.add(record.slug);
  }

  return {
    archiveDate: manifest.archiveDate,
    lastRefreshAt: validDate(manifest.lastRefreshAt) ? manifest.lastRefreshAt : null,
    restaurants: index.restaurants as RestaurantRow[],
    sources: index.sources as SourceRow[],
    items: index.items as ItemRow[],
    quarantinedSourceIndices: indices,
    quarantinedSlugs: slugs,
  };
}

export function normalizeArchiveQuery(input: string): string {
  return input.normalize("NFKC").toLocaleLowerCase("nb-NO")
    .replace(/[^\p{L}\p{N}]+/gu, " ").trim().replace(/\s+/gu, " ");
}

export function searchPublicMenuArchive(
  archive: PublicMenuArchive,
  query: string,
  city = "Oslo",
  limit = 20,
): ArchivedMenuMatch[] {
  const normalized = normalizeArchiveQuery(query);
  if (normalized.length < 2 || city.trim().toLocaleLowerCase("nb-NO") !== "oslo") return [];
  const candidates: Array<{ score: number; result: ArchivedMenuMatch }> = [];
  for (const row of archive.items) {
    const sourceIndex = row[0];
    if (archive.quarantinedSourceIndices.has(sourceIndex)) continue;
    const source = archive.sources[sourceIndex];
    if (!source) continue;
    const restaurant = archive.restaurants[source[0]];
    if (!restaurant || archive.quarantinedSlugs.has(restaurant[1])) continue;
    if (restaurant[3].toLocaleLowerCase("nb-NO") !== "oslo") continue;
    const name = normalizeArchiveQuery(row[2]);
    if (!name.includes(normalized)) continue;
    const score = name === normalized ? 3 : name.startsWith(normalized) ? 2 : 1;
    candidates.push({
      score,
      result: {
        name: row[1],
        restaurantName: restaurant[0],
        restaurantSlug: restaurant[1],
        address: restaurant[2],
        priceMinor: row[3],
        priceKind: row[4],
        sourceUrl: source[1],
        observedAt: source[2],
      },
    });
  }
  candidates.sort((a, b) =>
    b.score - a.score ||
    b.result.observedAt.localeCompare(a.result.observedAt) ||
    a.result.restaurantName.localeCompare(b.result.restaurantName, "nb") ||
    a.result.name.localeCompare(b.result.name, "nb")
  );
  const results: ArchivedMenuMatch[] = [];
  const perRestaurant = new Map<string, number>();
  const seen = new Set<string>();
  for (const { result } of candidates) {
    const seenKey = result.restaurantSlug + ":" + normalizeArchiveQuery(result.name) +
      ":" + (result.priceMinor ?? "unknown");
    if (seen.has(seenKey) || (perRestaurant.get(result.restaurantSlug) ?? 0) >= 2) continue;
    seen.add(seenKey);
    perRestaurant.set(result.restaurantSlug, (perRestaurant.get(result.restaurantSlug) ?? 0) + 1);
    results.push(result);
    if (results.length >= Math.min(Math.max(limit, 1), 20)) break;
  }
  return results;
}

let cached: { expires: number; promise: Promise<PublicMenuArchive> } | null = null;

async function loadPublicArchive(): Promise<PublicMenuArchive> {
  const manifestResponse = await fetch(publicIndexBase + "manifest.json", {
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!manifestResponse.ok) throw new Error("Public menu manifest unavailable");
  const manifest: unknown = await manifestResponse.json();
  const metadata = dictionary(manifest);
  if (typeof metadata.sha256 !== "string" || !/^[a-f0-9]{64}$/u.test(metadata.sha256) ||
      typeof metadata.bytes !== "number" || metadata.bytes > maxCompressedBytes ||
      metadata.bytes < 100) {
    throw new Error("Invalid public menu archive fingerprint");
  }

  // Digest-keyed URL avoids combining a freshly updated manifest with an
  // older CDN-cached blob from an earlier menu refresh.
  const indexResponse = await fetch(
    publicIndexBase + "index.json.gz?sha256=" + encodeURIComponent(metadata.sha256),
    { cache: "no-store", signal: AbortSignal.timeout(12_000) },
  );
  if (!indexResponse.ok) throw new Error("Public menu archive unavailable");
  const compressed = Buffer.from(await indexResponse.arrayBuffer());
  if (compressed.byteLength > maxCompressedBytes ||
      compressed.byteLength !== metadata.bytes ||
      createHash("sha256").update(compressed).digest("hex") !== metadata.sha256) {
    throw new Error("Public menu archive integrity mismatch");
  }
  const decompressed = gunzipSync(compressed, { maxOutputLength: maxUncompressedBytes });
  const index: unknown = JSON.parse(decompressed.toString("utf8"));
  return parsePublicMenuArchive(metadata, index);
}

export function getPublicMenuArchive(): Promise<PublicMenuArchive> {
  const now = Date.now();
  if (cached && cached.expires > now) return cached.promise;
  const promise = loadPublicArchive();
  cached = { expires: now + 5 * 60_000, promise };
  // Do not cache failed fetches.
  void promise.catch(() => {
    if (cached?.promise === promise) cached = null;
  });
  return promise;
}
