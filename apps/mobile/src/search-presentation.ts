/** Partition only on the API's documented fuzzy match type. */
export function groupDishMatches<T extends { match: { type: string } }>(
  results: readonly T[],
): { matching: T[]; similar: T[] } {
  const matching: T[] = [];
  const similar: T[] = [];
  for (const result of results) {
    if (result.match.type === "fuzzy") {
      similar.push(result);
    } else {
      matching.push(result);
    }
  }
  return { matching, similar };
}

export function hasLongDescription(description: string | null | undefined): boolean {
  return (description?.trim().length ?? 0) > 150;
}
