import { createHash } from "node:crypto";
import { gunzipSync } from "node:zlib";

const publicIndexBase =
  "https://raw.githubusercontent.com/Paradispartiet/fysen/fysen-free-public-index/";
const maxCompressedBytes = 4 * 1024 * 1024;
const maxUncompressedBytes = 32 * 1024 * 1024;

type RestaurantRow = readonly [string, string, string, string, string];
type SourceRow = readonly [number, string, string];
type ItemRow = readonly [number, string, string, number | null, string, number | null, string, string, NordicCurrency?];

type NordicCurrency = "NOK" | "DKK" | "SEK" | "EUR" | "ISK";

// Keep the v1 Oslo-only reader and v2 Nordic reader in sync with the API/web counterpart.
function archiveCity(value: string): string {
  const key = value.trim().normalize("NFKC").toLowerCase();
  if (["københavn", "copenhagen", "kobenhavn"].includes(key)) return "københavn";
  if (["helsinki", "helsingfors"].includes(key)) return "helsinki";
  if (["reykjavík", "reykjavik"].includes(key)) return "reykjavík";
  return key;
}

function archiveCityCurrency(city: string): NordicCurrency | undefined {
  switch (archiveCity(city)) {
    case "oslo": return "NOK";
    case "københavn": return "DKK";
    case "stockholm": return "SEK";
    case "helsinki": return "EUR";
    case "reykjavík": return "ISK";
    default: return undefined;
  }
}

function itemCurrency(version: 1 | 2, city: string, row: ItemRow): NordicCurrency | undefined {
  if (version === 1) return archiveCity(city) === "oslo" ? "NOK" : undefined;
  const expected = archiveCityCurrency(city);
  if (expected === "ISK" && [row[3], row[5]].some(p => p !== null && p % 100 !== 0)) return undefined;
  return expected && row[8] === expected ? expected : undefined;
}

export interface PublicMenuArchive {
  readonly version?: 1 | 2;
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
  readonly priceMaxMinor: number | null;
  readonly priceKind: string;
  readonly priceNote?: string;
  readonly currency: NordicCurrency;
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
  if ((manifest.version !== 1 && manifest.version !== 2) || index.version !== manifest.version ||
      !validDate(manifest.archiveDate) || manifest.archiveDate !== index.archiveDate ||
      !Array.isArray(index.restaurants) || !Array.isArray(index.sources) ||
      !Array.isArray(index.items) ||
      index.restaurants.length !== manifest.restaurants ||
      index.sources.length !== manifest.sources ||
      index.items.length !== manifest.dishes) {
    throw new Error("Public menu archive manifest mismatch");
  }

  const restaurantRows = index.restaurants as unknown[];
  const sourceRows = index.sources as unknown[];
  const itemRows = index.items as unknown[];

  if (!restaurantRows.every((row: unknown) =>
    Array.isArray(row) && row.length >= 4 &&
    typeof row[0] === "string" && typeof row[1] === "string" &&
    typeof row[2] === "string" && typeof row[3] === "string"
  )) {
    throw new Error("Invalid archived restaurants");
  }
  if (!sourceRows.every((row: unknown) =>
    Array.isArray(row) && row.length >= 3 &&
    Number.isInteger(row[0]) && row[0] >= 0 && row[0] < restaurantRows.length &&
    validHttpUrl(row[1]) && validDate(row[2])
  )) {
    throw new Error("Invalid archived source provenance");
  }
  if (!itemRows.every((row: unknown) =>
    Array.isArray(row) && row.length >= 7 &&
    Number.isInteger(row[0]) && row[0] >= 0 && row[0] < sourceRows.length &&
    typeof row[1] === "string" && row[1].trim().length > 0 &&
    typeof row[2] === "string" && row[2].trim().length > 0 &&
    (row[3] === null || (Number.isSafeInteger(row[3]) && row[3] >= 0)) &&
    (row[5] === null || (Number.isSafeInteger(row[5]) && row[5] >= 0)) &&
    ["exact", "from", "multiple"].includes(row[4])
  )) {
    throw new Error("Invalid archived menu items");
  }

  // V2 requires an explicit ISO currency per item, consistent with its city.
  // Do not infer a foreign price's currency from a bare number or a kr symbol.
  if (manifest.version === 2 && !itemRows.every((value) => {
    const row = value as ItemRow;
    const source = sourceRows[row[0]] as SourceRow;
    const restaurant = restaurantRows[source[0]] as RestaurantRow;
    return itemCurrency(2, restaurant[3], row) !== undefined;
  })) {
    throw new Error("Invalid Nordic archive item currency");
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
    if (!Number.isInteger(indexNumber) || String(indexNumber) !== sourceIndex ||
        indexNumber < 0 || indexNumber >= sourceRows.length ||
        record.code !== "identity-unverified" ||
        typeof record.slug !== "string" || record.slug.trim() === "") {
      throw new Error("Invalid public archive quarantine");
    }
    // Quarantine entries are source-indexed. An index that points to a
    // different restaurant would otherwise allow the disputed identity
    // through on the public web, despite a checksum-valid archive.
    const source = sourceRows[indexNumber] as SourceRow;
    const restaurant = restaurantRows[source[0]] as RestaurantRow;
    if (restaurant[1] !== record.slug) {
      throw new Error("Public archive quarantine does not match restaurant identity");
    }
    indices.add(indexNumber);
    slugs.add(record.slug);
  }

  return {
    version: manifest.version,
    archiveDate: manifest.archiveDate,
    lastRefreshAt: validDate(manifest.lastRefreshAt) ? manifest.lastRefreshAt : null,
    restaurants: restaurantRows as RestaurantRow[],
    sources: sourceRows as SourceRow[],
    items: itemRows as ItemRow[],
    quarantinedSourceIndices: indices,
    quarantinedSlugs: slugs,
  };
}

export function archiveHasCity(archive: PublicMenuArchive, city: string): boolean {
  return archive.items.some((row) => {
    if (archive.quarantinedSourceIndices.has(row[0])) return false;
    const source = archive.sources[row[0]];
    const restaurant = source && archive.restaurants[source[0]];
    return Boolean(restaurant && !archive.quarantinedSlugs.has(restaurant[1]) &&
      archiveCity(restaurant[3]) === archiveCity(city) &&
      itemCurrency(archive.version ?? 1, restaurant[3], row));
  });
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
  if (normalized.length < 2 || !archiveCityCurrency(city)) return [];
  const candidates: Array<{ score: number; result: ArchivedMenuMatch }> = [];
  for (const row of archive.items) {
    const sourceIndex = row[0];
    if (archive.quarantinedSourceIndices.has(sourceIndex)) continue;
    const source = archive.sources[sourceIndex];
    if (!source) continue;
    const restaurant = archive.restaurants[source[0]];
    if (!restaurant || archive.quarantinedSlugs.has(restaurant[1])) continue;
    if (archiveCity(restaurant[3]) !== archiveCity(city)) continue;
    const currency = itemCurrency(archive.version ?? 1, restaurant[3], row);
    if (!currency) continue;
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
        priceMaxMinor: row[5],
        priceKind: row[4],
        ...(archive.version === 2 && currency !== "NOK" && row[6] ? { priceNote: row[6] } : {}),
        currency,
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
    if (seen.has(seenKey) || (Number.isFinite(limit) && (perRestaurant.get(result.restaurantSlug) ?? 0) >= 2)) continue;
    seen.add(seenKey);
    perRestaurant.set(result.restaurantSlug, (perRestaurant.get(result.restaurantSlug) ?? 0) + 1);
    results.push(result);
    if (Number.isFinite(limit) && results.length >= Math.min(Math.max(limit, 1), 20)) break;
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

/**
 * A limited, deduplicated selection for the Oslo archive browse landing page.
 * Counts distinct restaurants from archived source evidence, never current stock.
 * Index recency is not confused with per-menu source observation dates.
 */
export interface ArchivedBrowseDish {
  readonly name: string;
  readonly query: string;
  readonly restaurantCount: number;
  /** Most recently observed source among the restaurants in this group, not all sources. */
  readonly newestObservedAt: string;
}

export function browseArchivedMenuDishes(
  archive: PublicMenuArchive,
  city = "Oslo",
  limit = 48,
): ArchivedBrowseDish[] {
  if (!archiveCityCurrency(city)) return [];
  const groups = new Map<string, { name: string; restaurants: Set<number>; newestObservedAt: string }>();

  for (const row of archive.items) {
    const sourceIndex = row[0];
    if (archive.quarantinedSourceIndices.has(sourceIndex)) continue;
    const source = archive.sources[sourceIndex];
    if (!source) continue;
    const restaurant = archive.restaurants[source[0]];
    if (!restaurant || archive.quarantinedSlugs.has(restaurant[1]) ||
        archiveCity(restaurant[3]) !== archiveCity(city) ||
        !itemCurrency(archive.version ?? 1, restaurant[3], row)) continue;

    const query = normalizeArchiveQuery(row[2]);
    const name = row[1].trim();
    if (query.length < 3 || query.length > 90 || name.length < 3) continue;

    let group = groups.get(query);
    if (!group) {
      group = { name, restaurants: new Set<number>(), newestObservedAt: source[2] };
      groups.set(query, group);
    }
    group.restaurants.add(source[0]);
    if (source[2] > group.newestObservedAt) group.newestObservedAt = source[2];
  }

  return [...groups.entries()]
    .map(([query, group]) => ({
      name: group.name,
      query,
      restaurantCount: group.restaurants.size,
      newestObservedAt: group.newestObservedAt,
    }))
    .sort((left, right) =>
      right.restaurantCount - left.restaurantCount ||
      left.name.localeCompare(right.name, "nb-NO"))
    .slice(0, Math.max(0, Math.min(limit, 100)));
}

export interface MenuVersion {
  readonly restaurantSlug: string;
  readonly restaurantId: string;
  readonly observedAt: string;
}

/**
 * Explicitly verified aliases only. Address and name must both match.
 * The official Benares menu and its SeMeny listing refer to the same
 * restaurant at Tordenskiolds gate 8, Oslo. Do not infer other aliases
 * from similar names or shared addresses.
 */
function archiveRestaurantIdentity(restaurant: RestaurantRow): string {
  const name = normalizeArchiveQuery(restaurant[0]);
  const address = normalizeArchiveQuery(restaurant[2]);
  if (normalizeArchiveQuery(restaurant[3]) === "oslo" &&
      /^(benares|benares indisk restaurant bar)$/u.test(name) &&
      /^tordenskiolds gate 8(?: 0160 oslo| 0160| oslo)?$/u.test(address)) {
    return "verified:benares-tordenskiolds-gate-8-oslo";
  }
  return restaurant[1];
}

/** Decide between complete menu versions before matching any dish. */
export function reconcileMenuVersions(archive: PublicMenuArchive, live: readonly MenuVersion[]) {
  const identities = new Map(archive.restaurants.map((restaurant) =>
    [restaurant[1], archiveRestaurantIdentity(restaurant)] as const));
  const identityFor = (slug: string) => identities.get(slug) ?? slug;
  const latest = new Map<string, { indices: number[]; at: number }>();
  archive.sources.forEach((source, index) => {
    const restaurant = archive.restaurants[source[0]];
    if (!restaurant || archive.quarantinedSourceIndices.has(index) || archive.quarantinedSlugs.has(restaurant[1])) return;
    const at = Date.parse(source[2]);
    const identity = identityFor(restaurant[1]);
    const previous = latest.get(identity);
    // Prefer the official menu when both verified alias sources have
    // exactly the same observation timestamp.
    const officialTie = identity.startsWith("verified:") && previous &&
      at === previous.at && new URL(source[1]).hostname.replace(/^www\./u, "") === "benares.no" &&
      archive.sources[previous.indices[0]!] !== undefined &&
      new URL(archive.sources[previous.indices[0]!]![1]).hostname.replace(/^www\./u, "") !== "benares.no";
    if (!previous || at > previous.at || officialTie) latest.set(identity, { indices: [index], at });
    else if (archive.version === 2 && !identity.startsWith("verified:") && at === previous.at) previous.indices.push(index);
  });
  const liveByIdentity = new Map<string, MenuVersion>();
  for (const version of live) {
    const identity = identityFor(version.restaurantSlug);
    const previous = liveByIdentity.get(identity);
    if (!previous || Date.parse(version.observedAt) > Date.parse(previous.observedAt)) {
      liveByIdentity.set(identity, version);
    }
  }
  const archiveWins = new Set<string>();
  for (const [identity, version] of latest) {
    const other = liveByIdentity.get(identity);
    if (!other || version.at > Date.parse(other.observedAt)) archiveWins.add(identity);
  }
  const visibleSources = new Set([...latest].filter(([identity]) => archiveWins.has(identity)).flatMap(([, version]) => version.indices));
  const suppressedLive = live.filter((version) => {
    const identity = identityFor(version.restaurantSlug);
    const selected = liveByIdentity.get(identity);
    return archiveWins.has(identity) ||
      (identity.startsWith("verified:") && selected?.restaurantId !== version.restaurantId);
  });
  const suppressedLiveSlugs = new Set<string>();
  for (const [slug, identity] of identities) {
    if (archiveWins.has(identity)) suppressedLiveSlugs.add(slug);
  }
  for (const version of suppressedLive) {
    const selected = liveByIdentity.get(identityFor(version.restaurantSlug));
    if (archiveWins.has(identityFor(version.restaurantSlug)) ||
        selected?.restaurantSlug !== version.restaurantSlug) {
      suppressedLiveSlugs.add(version.restaurantSlug);
    }
  }
  return {
    archive: { ...archive, items: archive.items.filter((row) => visibleSources.has(row[0])) },
    suppressedLiveIds: new Set(suppressedLive.map((version) => version.restaurantId)),
    suppressedLiveSlugs,
  };
}
