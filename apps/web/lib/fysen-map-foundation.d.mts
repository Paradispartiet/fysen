export type CoordinateRow = readonly [string, string, string, number, number];
export type MapFeature = { type: "Feature"; id: string; geometry: { type: "Point"; coordinates: [number, number] }; properties: { slug: string; name: string; address: string } };
export type MapFeatures = { type: "FeatureCollection"; features: MapFeature[] };
export const FYSEN_MAP_STYLE_URL: string;
export const FYSEN_MAP_COLORS: Readonly<Record<string, string>>;
export function restaurantMapFeatures(rows: readonly CoordinateRow[]): MapFeatures;
export function fysenBaseStyle(style: unknown): unknown;
export function distanceMeters(a: readonly [number, number], b: readonly [number, number]): number;
export function nearestMapFeatures(features: readonly MapFeature[], location: readonly [number, number], limit?: number): { feature: MapFeature; distance: number }[];
