// Pure map data and style helpers. No provider requests at import time.
export const FYSEN_MAP_STYLE_URL = "https://tiles.openfreemap.org/styles/positron";
export const FYSEN_MAP_COLORS = Object.freeze({
  background: "#F4F0E8",
  paper: "#FCFAF5",
  building: "#E5DDD0",
  park: "#DCE4D2",
  water: "#BCD5DE",
  road: "#FCFAF5",
  ink: "#171713",
  restaurant: "#B45132",
});

export function restaurantMapFeatures(rows) {
  const features = [];
  const seen = new Set();
  for (const [slug, name, address, lat, lon] of rows) {
    if (typeof slug !== "string" || !slug.trim() || seen.has(slug)
      || typeof name !== "string" || !name.trim()
      || typeof address !== "string" || !address.trim()
      || !Number.isFinite(lat) || !Number.isFinite(lon)
      || lat < 59.7 || lat > 60.2 || lon < 10.4 || lon > 11.1) continue;
    seen.add(slug);
    features.push({
      type: "Feature", id: slug,
      geometry: { type: "Point", coordinates: [lon, lat] },
      properties: { slug, name, address },
    });
  }
  return { type: "FeatureCollection", features };
}

export function fysenBaseStyle(style) {
  if (style?.version !== 8 || !Array.isArray(style.layers) || !style.sources) {
    throw new TypeError("Expected a MapLibre v8 style");
  }
  const c = FYSEN_MAP_COLORS;
  const layers = style.layers.flatMap(layer => {
    const source = layer["source-layer"] ?? "";
    const id = layer.id.toLowerCase();
    // Fysen's catalogue supplies restaurant markers; do not show generic POIs.
    if (source === "poi" || /(^|[-_])poi($|[-_])/.test(id)) return [];
    const paint = { ...layer.paint };
    if (layer.type === "background") paint["background-color"] = c.background;
    if (layer.type === "fill") {
      if (source === "water") paint["fill-color"] = c.water;
      else if (source === "building") paint["fill-color"] = c.building;
      else if (source === "park" || /park|grass|wood|forest/.test(id)) paint["fill-color"] = c.park;
    }
    if (layer.type === "line" && source === "transportation"
      && /road|street|highway|motorway/.test(id) && !/casing|outline|rail|tunnel/.test(id)) {
      paint["line-color"] = c.road;
    }
    return [{ ...layer, paint }];
  });
  return { ...style, name: "Fysen Oslo", layers };
}

export function distanceMeters(a, b) {
  const valid = p => Array.isArray(p) && p.length === 2
    && Number.isFinite(p[0]) && Math.abs(p[0]) <= 180
    && Number.isFinite(p[1]) && Math.abs(p[1]) <= 90;
  if (!valid(a) || !valid(b)) return Infinity;
  const rad = n => n * Math.PI / 180;
  const dLat = rad(b[1] - a[1]), dLon = rad(b[0] - a[0]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[1])) * Math.cos(rad(b[1])) * Math.sin(dLon / 2) ** 2;
  return 6371000 * 2 * Math.asin(Math.sqrt(Math.min(1, Math.max(0, h))));
}

export function nearestMapFeatures(features, location, limit = 4) {
  return features.map(feature => ({ feature, distance: distanceMeters(location, feature.geometry.coordinates) }))
    .filter(row => Number.isFinite(row.distance))
    .sort((a, b) => a.distance - b.distance || a.feature.id.localeCompare(b.feature.id))
    .slice(0, Math.max(0, limit));
}
