import type { MenuObservedItem } from "@fysen/menu-core";

export type FreeMenu = [number, string, string, number | null, string, number | null, string, string];
export type FreeSource = [number, string, string];
export type FreeRestaurant = [string, string, string, string, string];
export interface FreeIndex {
  version: 1;
  archiveDate: string;
  restaurants: FreeRestaurant[];
  sources: FreeSource[];
  items: FreeMenu[];
}
export type FreeSourceFailureCode = "http-404" | "http-error" | "quality" | "no-content" | "other";
export interface FreeSourceFailure {
  code: FreeSourceFailureCode;
  consecutive: number;
  lastFailedAt: string;
  // SHA-256 of the public source and assertions used for this attempt.
  // A changed proof can be retried once without waiting for the old backoff.
  sourceProofHash?: string;
}

// Store only bounded diagnostic codes; provider messages and response bodies
// must never be copied into the published manifest.
export function classifyFreeSourceFailure(error: unknown): FreeSourceFailureCode {
  const message = error instanceof Error ? error.message : String(error);
  if (/\bHTTP\s*404\b/i.test(message)) return "http-404";
  if (/\bHTTP\s*[45]\d{2}\b/i.test(message)) return "http-error";
  if (/Quality check rejected updated menu/i.test(message)) return "quality";
  if (/Source returned no content|empty or undated menu/i.test(message)) return "no-content";
  return "other";
}

export function recordFreeSourceFailure(
  failures: Record<string, FreeSourceFailure>,
  sourceIndex: number,
  attemptedAt: string,
  error: unknown,
  sourceProofHash?: string,
): FreeSourceFailureCode {
  const key = String(sourceIndex);
  const code = classifyFreeSourceFailure(error);
  const previous = failures[key];
  failures[key] = {
    code,
    consecutive: previous?.code === code ? previous.consecutive + 1 : 1,
    lastFailedAt: attemptedAt,
    ...(sourceProofHash ? { sourceProofHash } : {}),
  };
  return code;
}

// A few broken extractor fragments must not block an otherwise complete, verified
// Norwegian menu. Never publish a foreign-currency or unnamed row; only discard
// up to three suspect rows from a substantial extraction (at most 10%). All
// source-specific floors, mandatory dishes and suspicious-drop checks still run
// on the *remaining* rows. Larger anomalies fail closed and retain old data.
export function retainPublishableFreeMenuObservations(
  observations: readonly MenuObservedItem[],
): { items: MenuObservedItem[]; discarded: number } {
  const items = observations.filter((item) =>
    item.currency === "NOK" && Boolean(item.name.trim()) && Boolean(item.normalizedName.trim()),
  );
  const discarded = observations.length - items.length;
  const allowedDiscard = observations.length >= 20
    ? Math.min(3, Math.floor(observations.length / 10))
    : 0;
  if (items.length === 0 || discarded > allowedDiscard) {
    throw new Error("Quality check rejected updated menu: invalid extracted items exceed safe budget");
  }
  return { items, discarded };
}

// A browser fetch executes JavaScript and can make more network requests than a
// simple HTTPS fetch. Bound it to one source per scheduled Free refresh, while
// filling the remaining batch with ordinary HTTP sources in age order.
export function selectBoundedFreeRefreshEntries<T extends { menuSource: { fetchMode: "http" | "browser" } }>(
  ordered: readonly (readonly [number, T])[],
  maxAttempts: number,
  maxBrowserAttempts = 1,
): [number, T][] {
  if (!Number.isInteger(maxAttempts) || maxAttempts < 1 || maxAttempts > 24 ||
      !Number.isInteger(maxBrowserAttempts) || maxBrowserAttempts < 0 || maxBrowserAttempts > 1) {
    throw new Error("Invalid Free refresh attempt budget");
  }
  const selected: [number, T][] = [];
  let browsers = 0;
  for (const [sourceIndex, entry] of ordered) {
    if (selected.length >= maxAttempts) break;
    if (entry.menuSource.fetchMode === "browser") {
      if (browsers >= maxBrowserAttempts) continue;
      browsers++;
    }
    selected.push([sourceIndex, entry]);
  }
  return selected;
}

// Prioritize source-address changes for BOTH ordinary HTTPS and browser menus.
// Every replacement still runs the original source/quality/fail-closed gates.
// Browser migrations come first, but remain capped at one per bounded batch.
// After any attempt (including failure), wait six hours before making that
// still-unpublished migration jump ahead of unrelated older sources again.
export function prioritizeUnpublishedMenuMigrations<T extends {
  menuSource: { fetchMode: "http" | "browser"; url: string };
}>(
  ordered: readonly (readonly [number, T])[],
  publishedSources: readonly FreeSource[],
  attempts: Readonly<Record<string, string>> = {},
  nowMillis = Date.now(),
): [number, T][] {
  const browserMigrations: [number, T][] = [];
  const httpMigrations: [number, T][] = [];
  const ordinary: [number, T][] = [];
  const retryAfterMillis = 6 * 60 * 60 * 1000;

  for (const [sourceIndex, entry] of ordered) {
    const publishedUrl = publishedSources[sourceIndex]?.[1];
    const lastAttemptMillis = Date.parse(attempts[String(sourceIndex)] ?? "");
    const recentAttempt =
      Number.isFinite(lastAttemptMillis) &&
      nowMillis >= lastAttemptMillis &&
      nowMillis - lastAttemptMillis < retryAfterMillis;

    if (publishedUrl === undefined || publishedUrl === entry.menuSource.url || recentAttempt) {
      ordinary.push([sourceIndex, entry]);
    } else if (entry.menuSource.fetchMode === "browser") {
      browserMigrations.push([sourceIndex, entry]);
    } else {
      httpMigrations.push([sourceIndex, entry]);
    }
  }
  return [...browserMigrations, ...httpMigrations, ...ordinary];
}

// A source rejected for missing mandatory dishes may be fixed by a precise
// catalog correction. Retry at most ONE such source ahead of the normal bounded
// rotation. Repeated failures back off (six hours, then one day), so a broken
// provider cannot starve other restaurants or inflate network usage.
export function prioritizeOneRecoverableFreeQualityFailure<T>(
  ordered: readonly (readonly [number, T])[],
  failures: Readonly<Record<string, FreeSourceFailure>>,
  nowMillis = Date.now(),
  sourceProofHashes: Readonly<Record<string, string>> = {},
): [number, T][] {
  let chosen: [number, T] | null = null;
  let oldestFailedAt = Number.POSITIVE_INFINITY;
  for (const [sourceIndex, entry] of ordered) {
    const failure = failures[String(sourceIndex)];
    if (failure?.code !== "quality" ||
        !Number.isInteger(failure.consecutive) || failure.consecutive < 1) continue;
    const failedAt = Date.parse(failure.lastFailedAt);
    const elapsed = nowMillis - failedAt;
    const retryAfterMillis = failure.consecutive === 1
      ? 0
      : failure.consecutive === 2 ? 6 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
    // A corrected manifest is a new proof, not an unchanged failed provider.
    // Legacy failures without a stored hash get one bounded recheck. Every
    // subsequent failed attempt records the current hash and honors backoff.
    const currentProofHash = sourceProofHashes[String(sourceIndex)];
    const correctedProof = currentProofHash !== undefined &&
      currentProofHash !== failure.sourceProofHash;
    if (!Number.isFinite(elapsed) || elapsed < 0 ||
        (!correctedProof && elapsed < retryAfterMillis)) continue;
    if (failedAt < oldestFailedAt) {
      chosen = [sourceIndex, entry];
      oldestFailedAt = failedAt;
    }
  }
  if (chosen === null) {
    return ordered.map(([sourceIndex, entry]): [number, T] => [sourceIndex, entry]);
  }
  return [chosen, ...ordered.filter(([index]) => index !== chosen[0])
    .map(([sourceIndex, entry]): [number, T] => [sourceIndex, entry])];
}

export interface FreeManifest {
  version: 1;
  archiveDate: string;
  restaurants: number;
  sources: number;
  dishes: number;
  bytes: number;
  sha256: string;
  disclaimer: string;
  lastRefreshAt?: string;
  sourceAttempts?: Record<string, string>;
  sourceFailures?: Record<string, FreeSourceFailure>;
  refreshedSourceIndices?: number[];
}
export function findMatchingFreeSourceIndex(
  index: FreeIndex,
  restaurantSlug: string,
  sourceUrl: string,
): number | null {
  const restaurantIndices = index.restaurants.flatMap((restaurant, indexOfRestaurant) =>
    restaurant[1] === restaurantSlug ? [indexOfRestaurant] : []
  );
  if (restaurantIndices.length !== 1) return null;
  const candidates = index.sources.flatMap((source, indexOfSource) =>
    source[0] === restaurantIndices[0] ? [indexOfSource] : []
  );
  if (candidates.length === 0) return null;
  const exact = candidates.filter((sourceIndex) => index.sources[sourceIndex]?.[1] === sourceUrl);
  if (exact.length === 1) return exact[0]!;
  // Permit a verified source URL migration only for a restaurant with
  // exactly one public menu source. Never guess between multiple menus.
  return candidates.length === 1 ? candidates[0]! : null;
}

export function replaceOneSource(
  index: FreeIndex,
  sourceIndex: number,
  observedAt: string,
  observations: readonly MenuObservedItem[],
  approvedSourceUrl?: string,
): FreeIndex {
  if (!Number.isInteger(sourceIndex) || sourceIndex < 0 || sourceIndex >= index.sources.length) {
    throw new Error("Source index outside published index");
  }
  if (!observations.length || !Number.isFinite(Date.parse(observedAt))) {
    throw new Error("Cannot replace a source with an empty or undated menu");
  }
  if (approvedSourceUrl !== undefined) {
    const url = new URL(approvedSourceUrl);
    if (url.protocol !== "https:" || url.username || url.password) {
      throw new Error("Source URL migration requires a credential-free HTTPS URL");
    }
  }
  const old = index.sources[sourceIndex]!;
  const updated: FreeSource[] = index.sources.map((source, indexOfSource): FreeSource =>
    indexOfSource === sourceIndex ? [old[0], approvedSourceUrl ?? old[1], observedAt] : source
  );
  const newRows: FreeMenu[] = observations.map((item): FreeMenu => {
    if (!item.name || !item.normalizedName || item.currency !== "NOK") {
      throw new Error("Unexpected currency or empty dish name");
    }
    if (item.priceMinor !== null && (!Number.isSafeInteger(item.priceMinor) || item.priceMinor < 0)) {
      throw new Error("Invalid dish price");
    }
    return [
      sourceIndex, item.name, item.normalizedName, item.priceMinor,
      item.priceKind ?? "exact", item.priceMaxMinor ?? null,
      (item.description ?? "").slice(0, 180), item.sectionName ?? "",
    ];
  });
  return {
    ...index,
    sources: updated,
    items: [...index.items.filter((item) => item[0] !== sourceIndex), ...newRows],
  };
}
