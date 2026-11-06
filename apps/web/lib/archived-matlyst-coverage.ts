import type { PublicMenuArchive } from "./verified-menu-archive";

export interface ArchivedMatlystDishDescriptor {
  readonly id: string;
  readonly label: string;
  readonly query: string;
  readonly aliases: readonly string[];
}

export interface ArchivedMatlystRestaurant {
  readonly id: string;
  readonly name: string;
  readonly address: string;
}

export interface ArchivedMatlystDishCoverage {
  readonly restaurantCount: number;
  readonly restaurantExamples: readonly ArchivedMatlystRestaurant[];
}

export interface ArchivedMatlystCoverage {
  readonly archiveDate: string;
  readonly byDish: Readonly<Record<string, ArchivedMatlystDishCoverage>>;
}

function normalizedWords(value: string): string {
  return value.normalize("NFKD")
    .replace(/\p{M}+/gu, "")
    .toLocaleLowerCase("nb-NO")
    .replace(/æ/gu, "ae")
    .replace(/ø/gu, "o")
    .replace(/å/gu, "a")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim().replace(/\s+/gu, " ");
}

function containsPhrase(value: string, phrase: string): boolean {
  return value === phrase || value.startsWith(phrase + " ") ||
    value.endsWith(" " + phrase) || value.includes(" " + phrase + " ");
}

/**
 * Compute Matlyst restaurant proofs from the same immutable, checksum-verified
 * source used by the public archive search. Never call these "fresh" or "live":
 * each source has its own original observed-at timestamp in the archive.
 *
 * Match each menu row to only its strongest editorial dish identity. This
 * avoids counting one menu row as several unrelated dishes, and we deduplicate
 * restaurants independently of multiple menu variants.
 */
export function summarizeArchivedMatlyst(
  archive: PublicMenuArchive,
  descriptors: readonly ArchivedMatlystDishDescriptor[],
): ArchivedMatlystCoverage {
  const unique = new Map<string, { terms: readonly string[] }>();
  for (const dish of descriptors) {
    if (!dish.id || unique.has(dish.id)) continue;
    const terms = [...new Set([dish.query, dish.label, ...dish.aliases]
      .map(normalizedWords).filter((term) => term.length >= 3))];
    if (terms.length) unique.set(dish.id, { terms });
  }

  const buckets = new Map<string, Map<string, ArchivedMatlystRestaurant>>();
  for (const row of archive.items) {
    const sourceIndex = row[0];
    if (archive.quarantinedSourceIndices.has(sourceIndex)) continue;
    const source = archive.sources[sourceIndex];
    if (!source) continue;
    const restaurant = archive.restaurants[source[0]];
    if (!restaurant || archive.quarantinedSlugs.has(restaurant[1]) ||
        normalizedWords(restaurant[3]) !== "oslo") continue;

    const name = normalizedWords(row[2]);
    if (!name) continue;
    let bestId: string | null = null;
    let bestScore = 0;
    for (const [dishId, { terms }] of unique) {
      for (const term of terms) {
        const score = name === term ? 3 : containsPhrase(name, term) ? 2 : 0;
        if (score > bestScore) {
          bestScore = score;
          bestId = dishId;
        }
      }
      if (bestScore === 3) break;
    }
    if (!bestId) continue;
    let restaurants = buckets.get(bestId);
    if (!restaurants) {
      restaurants = new Map();
      buckets.set(bestId, restaurants);
    }
    if (!restaurants.has(restaurant[1])) {
      restaurants.set(restaurant[1], {
        id: restaurant[1],
        name: restaurant[0],
        address: restaurant[2],
      });
    }
  }

  const byDish: Record<string, ArchivedMatlystDishCoverage> = Object.create(null);
  for (const id of unique.keys()) {
    const restaurants = buckets.get(id);
    byDish[id] = {
      restaurantCount: restaurants?.size ?? 0,
      restaurantExamples: restaurants ? [...restaurants.values()].slice(0, 2) : [],
    };
  }
  return { archiveDate: archive.archiveDate, byDish };
}
