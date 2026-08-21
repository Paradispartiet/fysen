import type { DishBrowseItem, DishBrowseRestaurantExample } from "@fysen/contracts/dish-browse";

export type DiscoveryDishDescriptor = {
  readonly label: string;
  readonly query: string;
  readonly aliases?: readonly string[];
};

export type DiscoveryCoverage = {
  readonly restaurantCount: number;
  readonly restaurantExamples: readonly DishBrowseRestaurantExample[];
  readonly matchedDishes: readonly DishBrowseItem[];
};

export function normalizeDiscoveryText(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/\p{M}+/gu, "")
    .toLocaleLowerCase("nb-NO")
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function containsPhrase(value: string, phrase: string): boolean {
  if (!phrase) return false;
  return value === phrase || value.startsWith(`${phrase} `) || value.endsWith(` ${phrase}`) || value.includes(` ${phrase} `);
}

function descriptorTerms(descriptor: DiscoveryDishDescriptor): readonly string[] {
  const terms = [descriptor.query, descriptor.label, ...(descriptor.aliases ?? [])]
    .map(normalizeDiscoveryText)
    .filter(Boolean);
  return [...new Set(terms)];
}

function matchScore(item: DishBrowseItem, descriptor: DiscoveryDishDescriptor): number {
  const values = [item.query, item.name].map(normalizeDiscoveryText).filter(Boolean);
  const terms = descriptorTerms(descriptor);

  for (const term of terms) {
    if (values.some((value) => value === term)) return 3;
  }
  for (const term of terms) {
    if (values.some((value) => containsPhrase(value, term))) return 2;
  }
  return 0;
}

export function liveDishMatchesDescriptor(item: DishBrowseItem, descriptor: DiscoveryDishDescriptor): boolean {
  return matchScore(item, descriptor) > 0;
}

export function discoveryCoverage(
  dishes: readonly DishBrowseItem[],
  descriptor: DiscoveryDishDescriptor,
): DiscoveryCoverage {
  const ranked = dishes
    .map((item) => ({ item, score: matchScore(item, descriptor) }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score || right.item.restaurantCount - left.item.restaurantCount || left.item.name.localeCompare(right.item.name, "nb"));

  const best = ranked[0];
  if (!best) return { restaurantCount: 0, restaurantExamples: [], matchedDishes: [] };

  const strongest = ranked.filter((entry) => entry.score === best.score).map((entry) => entry.item);
  const seenRestaurants = new Set<string>();
  const restaurantExamples = strongest.flatMap((item) => item.restaurantExamples).filter((restaurant) => {
    if (seenRestaurants.has(restaurant.id) || seenRestaurants.size >= 2) return false;
    seenRestaurants.add(restaurant.id);
    return true;
  });
  return {
    // Multiple menu spellings can overlap at the same restaurant. Use the strongest single live
    // identity for the count and deduplicate the representative restaurant proof across spellings.
    restaurantCount: Math.max(...strongest.map((item) => item.restaurantCount)),
    restaurantExamples,
    matchedDishes: strongest,
  };
}
