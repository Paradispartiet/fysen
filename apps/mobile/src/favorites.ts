import AsyncStorage from "@react-native-async-storage/async-storage";
import { normalizeFavorites } from "./favorites-model";

export {
  MAX_FAVORITES,
  favoriteKey,
  normalizeFavorites,
  toggleFavorite,
} from "./favorites-model";
export type { FavoriteDish } from "./favorites-model";

const STORAGE_KEY = "fysen:native:favorites:v1";

export async function readFavorites() {
  const value = await AsyncStorage.getItem(STORAGE_KEY);
  if (!value) return [];
  try {
    return normalizeFavorites(JSON.parse(value) as unknown);
  } catch {
    return [];
  }
}

export async function writeFavorites(items: readonly import("./favorites-model").FavoriteDish[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeFavorites(items)));
}
