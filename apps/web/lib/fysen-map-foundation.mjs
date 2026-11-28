// Pure map data and style helpers. No provider requests at import time.
export const FYSEN_MAP_STYLE_URL = "https://tiles.openfreemap.org/styles/positron";
export const FYSEN_MAP_COLORS = Object.freeze({
  background: "#171c19",
  paper: "#242a26",
  building: "#303731",
  park: "#203426",
  water: "#18303b",
  road: "#57645a",
  ink: "#e8eee6",
  restaurant: "#b9df9a",
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
      else if (source === "landcover" || source === "landuse") paint["fill-color"] = c.paper;
      if ("fill-outline-color" in paint) paint["fill-outline-color"] = c.building;
    }
    if (layer.type === "line") {
      if (source === "transportation") paint["line-color"] = /casing|outline/.test(id) ? c.background : c.road;
      else if (source === "waterway") paint["line-color"] = c.water;
      else if (source === "boundary") paint["line-color"] = "#48524a";
    }
    if (layer.type === "symbol" && (layer.layout?.["text-field"] || "text-color" in paint)) {
      paint["text-color"] = c.ink;
      paint["text-halo-color"] = c.background;
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
