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
