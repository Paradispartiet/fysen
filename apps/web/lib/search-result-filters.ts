import type { DishSearchResult } from "@fysen/contracts";

export interface SearchResultFilters {
  readonly openNow: boolean;
  readonly maxPriceMinor: number | null;
  readonly maxDistanceMeters: number | null;
}

// Filter only returned results. The API currently caps searches at 20 rows.
export function filterSearchResults<T extends Pick<DishSearchResult, "dish" | "opening" | "distanceMeters">>(
  results: readonly T[],
  filters: SearchResultFilters,
): T[] {
  return results.filter((result) => {
    if (filters.openNow && result.opening.state !== "open") return false;
    if (filters.maxPriceMinor !== null && (result.dish.priceMinor === null || result.dish.priceMinor > filters.maxPriceMinor)) {
      return false;
    }
    if (filters.maxDistanceMeters !== null &&
        (result.distanceMeters === null || result.distanceMeters > filters.maxDistanceMeters)) {
      return false;
    }
    return true;
  });
}

export function oneResultPerRestaurant<T extends Pick<DishSearchResult, "restaurant">>(results: readonly T[]): T[] {
  const seen = new Set<string>();
  return results.filter((result) => {
    const slug = result.restaurant.slug;
    if (seen.has(slug)) return false;
    seen.add(slug);
    return true;
  });
}
