export type FavoriteDish = {
  name: string;
  query: string;
};

const MAX_FAVORITES = 100;

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

/**
 * Apply one tap against the freshest in-memory snapshot. A full list is
 * unchanged rather than silently evicting an existing favorite.
 */
export function toggleFavoriteList(
  current: readonly FavoriteDish[],
  dish: FavoriteDish,
): FavoriteDish[] | readonly FavoriteDish[] {
  const key = favoriteKey(dish.query);
  if (current.some((item) => favoriteKey(item.query) === key)) {
    return current.filter((item) => favoriteKey(item.query) !== key);
  }
  if (current.length >= MAX_FAVORITES) return current;
  const updated = normalizeFavorites([dish, ...current]);
  return updated.length === current.length ? current : updated;
}

/**
 * Serialize writes so a slow earlier write can never overwrite a newer list.
 * A failed write does not block later attempts.
 */
export function createSerialWriter<T>(
  write: (value: T) => Promise<void>,
): (value: T) => Promise<void> {
  let tail: Promise<void> = Promise.resolve();
  return (value: T) => {
    const pending = tail.then(() => write(value));
    tail = pending.catch(() => undefined);
    return pending;
  };
}
