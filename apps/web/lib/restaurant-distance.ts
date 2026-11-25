import { restaurantCoordinateRows as rows } from "./restaurant-coordinate-data.ts";

export type Coordinates = { readonly latitude: number; readonly longitude: number };
type RestaurantIdentity = { readonly id: string; readonly name: string; readonly address: string };
type CoordinateRow = (typeof rows)[number];

function normalize(value: string): string {
  return value.normalize("NFKC").toLocaleLowerCase("nb-NO").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}
function key(name: string, address: string): string { return normalize(name) + "|" + normalize(address); }
const bySlug = new Map(rows.map(row => [row[0], row]));
const byIdentity = new Map<string, CoordinateRow | null>();
for (const row of rows) {
  const identity = key(row[1], row[2]);
  byIdentity.set(identity, byIdentity.has(identity) ? null : row);
}
export function restaurantCoordinates(restaurant: RestaurantIdentity): Coordinates | null {
  const slug = bySlug.get(restaurant.id);
  const row = slug && normalize(slug[2]) === normalize(restaurant.address)
    ? slug : byIdentity.get(key(restaurant.name, restaurant.address));
  return row ? { latitude: row[3], longitude: row[4] } : null;
}
export function distanceMeters(from: Coordinates, to: Coordinates): number {
  const rad = Math.PI / 180;
  const a = Math.sin((to.latitude - from.latitude) * rad / 2) ** 2
    + Math.cos(from.latitude * rad) * Math.cos(to.latitude * rad)
    * Math.sin((to.longitude - from.longitude) * rad / 2) ** 2;
  return 6371000 * 2 * Math.asin(Math.sqrt(Math.min(1, Math.max(0, a))));
}
export function rankRestaurantsByDistance<T extends RestaurantIdentity>(restaurants: readonly T[], location: Coordinates | null): { known: readonly T[]; unknown: readonly T[] } {
  if (!location) return { known: [], unknown: restaurants };
  const known: { restaurant: T; distance: number }[] = [];
  const unknown: T[] = [];
  for (const restaurant of restaurants) {
    const coordinates = restaurantCoordinates(restaurant);
    if (coordinates) known.push({ restaurant, distance: distanceMeters(location, coordinates) });
    else unknown.push(restaurant);
  }
  known.sort((a, b) => a.distance - b.distance);
  return { known: known.map(entry => entry.restaurant), unknown };
}
