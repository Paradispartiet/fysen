export const restaurantFavoritesKey: string;
export function parseRestaurantFavorites(raw: string | null): string[];
export function toggleRestaurantFavorite(current: readonly string[], slug: string): string[];
