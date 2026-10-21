import AsyncStorage from "@react-native-async-storage/async-storage";
import { normalizeFavorites } from "./favorite-state";

export { favoriteKey } from "./favorite-state";
export type { FavoriteDish } from "./favorite-state";
import type { FavoriteDish } from "./favorite-state";

const STORAGE_KEY = "fysen:native:favorites:v1";

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
