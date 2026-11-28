// Pure map data and style helpers. No provider requests at import time.
export const FYSEN_MAP_STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";
// Fysen uses Liberty's native street-map palette; these colors are only
// for its own overlays and modest vegetation contrast adjustment.
export const FYSEN_MAP_COLORS = Object.freeze({
  background: "#f8f4f0",
  park: "#c6e2aa",
  grass: "#c5dfa9",
  forest: "#a6cf93",
  restaurant: "#28734b",
  ink: "#24352c",
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
    // Keep the provider's road hierarchy, casings, natural land use,
    // water, labels, zoom expressions, symbols and terrain intact.
    // Fysen supplies its own restaurant markers, not generic POIs.
    if (source === "poi" || /(^|[-_])poi($|[-_])/.test(id)) return [];
    if (layer.type !== "fill") return [layer];
    // Only adjust known vegetation layers from Liberty: no blanket
    // landcover override, which would turn sand/ice/wetland into grass.
    if (source === "park" && id === "park") {
      return [{ ...layer, paint: { ...layer.paint, "fill-color": c.park, "fill-opacity": 0.9 } }];
    }
    if (source === "landcover" && id === "landcover_grass") {
      return [{ ...layer, paint: { ...layer.paint, "fill-color": c.grass, "fill-opacity": 0.8 } }];
    }
    if (source === "landcover" && id === "landcover_wood") {
      return [{ ...layer, paint: { ...layer.paint, "fill-color": c.forest, "fill-opacity": 0.85 } }];
    }
    return [layer];
  });
  return { ...style, name: "Fysen Oslo – dagskart", layers };
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
