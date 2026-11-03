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
  refreshedSourceIndices?: number[];
}
export function replaceOneSource(
  index: FreeIndex,
  sourceIndex: number,
  observedAt: string,
  observations: readonly MenuObservedItem[],
): FreeIndex {
  if (!Number.isInteger(sourceIndex) || sourceIndex < 0 || sourceIndex >= index.sources.length) {
    throw new Error("Source index outside published index");
  }
  if (!observations.length || !Number.isFinite(Date.parse(observedAt))) {
    throw new Error("Cannot replace a source with an empty or undated menu");
  }
  const old = index.sources[sourceIndex]!;
  const updated: FreeSource[] = index.sources.map((source, indexOfSource): FreeSource =>
    indexOfSource === sourceIndex ? [old[0], old[1], observedAt] : source
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
