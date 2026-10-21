export const MAX_FAVORITES = 100;

export type FavoriteDish = {
  name: string;
  query: string;
};

export function favoriteKey(query: string): string {
  return query.trim().toLocaleLowerCase("nb-NO");
}

export function normalizeFavorites(raw: unknown): FavoriteDish[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const result: FavoriteDish[] = [];
  for (const candidate of raw) {
    if (!candidate || typeof candidate !== "object") continue;
    const entry = candidate as Partial<FavoriteDish>;
    if (typeof entry.name !== "string" || typeof entry.query !== "string") continue;
    const name = entry.name.trim();
    const query = entry.query.trim();
    if (!name || query.length < 2 || query.length > 80) continue;
    const key = favoriteKey(query);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push({ name, query });
    if (result.length >= MAX_FAVORITES) break;
  }
  return result;
}

export function toggleFavorite(
  current: readonly FavoriteDish[],
  item: FavoriteDish,
): FavoriteDish[] {
  const valid = normalizeFavorites([item]);
  if (valid.length === 0) return [...current];
  const candidate = valid[0]!;
  const key = favoriteKey(candidate.query);
  const exists = current.some((entry) => favoriteKey(entry.query) === key);
  return exists
    ? current.filter((entry) => favoriteKey(entry.query) !== key)
    : normalizeFavorites([candidate, ...current]);
}
