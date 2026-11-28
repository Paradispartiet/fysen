export const restaurantFavoritesKey = "fysen:restaurant-favorites:v1";
export function parseRestaurantFavorites(raw) {
  try {
    const value = JSON.parse(raw ?? "[]");
    if (!Array.isArray(value)) return [];
    return [...new Set(value.filter(slug => typeof slug === "string" && /^[a-z0-9][a-z0-9_-]{0,159}$/u.test(slug)))].slice(0, 2000);
  } catch { return []; }
}
export function toggleRestaurantFavorite(current, slug) {
  if (current.includes(slug)) return current.filter(item => item !== slug);
  return parseRestaurantFavorites(JSON.stringify([...current, slug]));
}
