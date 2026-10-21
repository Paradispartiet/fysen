import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "fysen:native:favorites:v1";
const MAX_FAVORITES = 100;

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

export async function readFavorites(): Promise<FavoriteDish[]> {
  const value = await AsyncStorage.getItem(STORAGE_KEY);
  if (!value) return [];
  try {
    return normalizeFavorites(JSON.parse(value) as unknown);
  } catch {
    return [];
  }
}

export async function writeFavorites(items: readonly FavoriteDish[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeFavorites(items)));
}
