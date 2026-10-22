/* Device-only favorites: no price, availability, or account data is cached. */
export const FAVORITES_KEY = "fysen:device-favorites:v1";
export const FAVORITES_CHANGED = "fysen:device-favorites-changed";
const LIMIT = 100;

export type DeviceFavorite = {
  menuItemId: string;
  dishName: string;
  restaurantName: string;
  city: string;
  savedAt: string;
};

export function readDeviceFavorites(): DeviceFavorite[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(FAVORITES_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is DeviceFavorite => Boolean(
      item && typeof item === "object" &&
      typeof item.menuItemId === "string" && item.menuItemId.length <= 200 &&
      typeof item.dishName === "string" && item.dishName.length <= 300 &&
      typeof item.restaurantName === "string" && item.restaurantName.length <= 200 &&
      typeof item.city === "string" && item.city.length <= 120 &&
      typeof item.savedAt === "string",
    )).slice(0, LIMIT);
  } catch {
    return [];
  }
}

export function toggleDeviceFavorite(favorite: DeviceFavorite): boolean {
  const current = readDeviceFavorites();
  const exists = current.some((item) => item.menuItemId === favorite.menuItemId);
  const next = exists ? current.filter((item) => item.menuItemId !== favorite.menuItemId) : [favorite, ...current].slice(0, LIMIT);
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(FAVORITES_CHANGED));
  return !exists;
}

export function removeDeviceFavorite(menuItemId: string): void {
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(readDeviceFavorites().filter((item) => item.menuItemId !== menuItemId)));
  window.dispatchEvent(new Event(FAVORITES_CHANGED));
}
