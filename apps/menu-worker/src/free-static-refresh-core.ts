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
): FreeSourceFailureCode {
  const key = String(sourceIndex);
  const code = classifyFreeSourceFailure(error);
  const previous = failures[key];
  failures[key] = {
    code,
    consecutive: previous?.code === code ? previous.consecutive + 1 : 1,
    lastFailedAt: attemptedAt,
  };
  return code;
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
