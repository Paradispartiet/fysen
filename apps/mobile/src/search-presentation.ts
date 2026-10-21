/** Preserve API ranking while separating fuzzy suggestions from dish matches. */
export function groupDishMatches<T extends { match: { type: string } }>(
  results: readonly T[],
): { direct: T[]; similar: T[] } {
  const direct: T[] = [];
  const similar: T[] = [];
  for (const item of results) {
    if (item.match.type === "fuzzy") similar.push(item);
    else direct.push(item);
  }
  return { direct, similar };
}

/** Explain prices sourced from delivery platforms, without implying dine-in rates. */
export function priceProvenanceLabel(sourceUrl: string): string {
  try {
    const hostname = new URL(sourceUrl).hostname.toLowerCase();
    if (hostname === "wolt.com" || hostname.endsWith(".wolt.com")) {
      return "Wolt-leveringspris · kan avvike fra bordpris";
    }
    if (hostname === "foodora.no" || hostname.endsWith(".foodora.no")) {
      return "Foodora-leveringspris · kan avvike fra bordpris";
    }
  } catch {
    // Invalid source URLs should not cause a result card to crash.
  }
  return "Pris fra menykilden";
}
