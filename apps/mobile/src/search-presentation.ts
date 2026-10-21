import type { DishSearchMatchType } from "@fysen/contracts";

/** Keep the API's order within each group; do not invent a search ranking. */
export function groupDishMatches<T extends { readonly match: { readonly type: DishSearchMatchType } }>(
  results: readonly T[],
): { direct: T[]; similar: T[] } {
  const direct: T[] = [];
  const similar: T[] = [];
  for (const result of results) {
    if (result.match.type === "contains" || result.match.type === "fuzzy") {
      similar.push(result);
    } else {
      direct.push(result);
    }
  }
  return { direct, similar };
}

export function descriptionPreview(raw: string, maxLength = 165): string {
  const cleaned = raw.replace(/\s+/gu, " ").trim();
  if (cleaned.length <= maxLength) return cleaned;
  const prefix = cleaned.slice(0, maxLength);
  const lastSpace = prefix.lastIndexOf(" ");
  const end = lastSpace >= maxLength * 0.65 ? lastSpace : maxLength;
  return prefix.slice(0, end).trimEnd() + "…";
}
