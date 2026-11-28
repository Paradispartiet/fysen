// Pure map data and style helpers. No provider requests at import time.
export const FYSEN_MAP_STYLE_URL = "https://tiles.openfreemap.org/styles/positron";
export const FYSEN_MAP_COLORS = Object.freeze({
  background: "#353b37",
  paper: "#414741",
  building: "#62645e",
  park: "#51804e",
  forest: "#3b6946",
  water: "#325c70",
  road: "#b4b6ab",
  majorRoad: "#d6c9af",
  path: "#909d88",
  casing: "#4d514b",
  ink: "#f2f0e7",
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
    // Fysen's own catalogue supplies restaurant markers.
    if (source === "poi" || /(^|[-_])poi($|[-_])/.test(id)) return [];
    const paint = { ...layer.paint };
    const layout = { ...layer.layout };
    if (layer.type === "background") paint["background-color"] = c.background;
    if (layer.type === "fill") {
      if (source === "water") paint["fill-color"] = c.water;
      else if (source === "building") {
        paint["fill-color"] = c.building;
        if ("fill-outline-color" in paint) paint["fill-outline-color"] = "#464b45";
      } else if (source === "park" || /park|grass|meadow|garden|recreation|cemetery/.test(id)) {
        paint["fill-color"] = c.park;
        paint["fill-opacity"] = 0.9;
        delete paint["fill-pattern"];
      } else if (/wood|forest/.test(id)) {
        paint["fill-color"] = c.forest;
        paint["fill-opacity"] = 0.9;
        delete paint["fill-pattern"];
      } else if (source === "landcover" || source === "landuse") {
        paint["fill-color"] = c.paper;
      } else if (source === "transportation") paint["fill-color"] = c.road;
    }
    if (layer.type === "line") {
      if (source === "transportation") {
        const railway = /rail|tram|transit/.test(id);
        const casing = /casing|outline/.test(id);
        const path = /path|pedestrian|footway|cycleway|track/.test(id);
        const minor = /minor|service|residential|local|street/.test(id);
        const major = /major|motorway|trunk|primary|secondary|tertiary/.test(id);
        paint["line-color"] = railway ? "#7f8883" : casing ? c.casing : path ? c.path : major ? c.majorRoad : c.road;
        if (!railway && !casing && !/tunnel|ferry/.test(id)) {
          paint["line-opacity"] = path ? 0.85 : 1;
          if (minor) paint["line-width"] = ["interpolate", ["linear"], ["zoom"], 10, 0.65, 12, 1.3, 14, 2.4, 17, 5.5, 20, 15];
          else if (path) paint["line-width"] = ["interpolate", ["linear"], ["zoom"], 12, 0.7, 15, 1.5, 18, 3, 20, 5];
          else if (major) paint["line-width"] = ["interpolate", ["linear"], ["zoom"], 8, 1, 11, 2.2, 14, 4, 17, 9, 20, 22];
        }
      } else if (source === "waterway") paint["line-color"] = c.water;
      else if (source === "boundary") paint["line-color"] = "#68736b";
    }
    if (layer.type === "symbol" && (layer.layout?.["text-field"] || "text-color" in paint)) {
      paint["text-color"] = c.ink;
      paint["text-halo-color"] = c.background;
      if (source === "transportation_name") {
        paint["text-halo-width"] = 1.3;
        paint["text-opacity"] = 1;
      }
    }
    return [{ ...layer, layout, paint }];
  });
  // Positron has only a subset of vegetation layers. Use actual vector
  // classifications, never inferred green rectangles or restaurant categories.
  const vectorLayer = layers.find(layer => ["landcover", "landuse", "park", "transportation"].includes(layer["source-layer"]) &&
    typeof layer.source === "string" && style.sources[layer.source]?.type === "vector");
  if (vectorLayer) {
    const vegetation = (id, sourceLayer, classes, color) => ({
      id, type: "fill", source: vectorLayer.source, "source-layer": sourceLayer,
      minzoom: 9,
      filter: ["all", ["==", ["geometry-type"], "Polygon"], ["any",
        ["match", ["get", "class"], classes, true, false],
        ["match", ["get", "subclass"], classes, true, false]]],
      paint: { "fill-color": color, "fill-opacity": 0.92 },
    });
    const insertAt = layers.findIndex(layer => ["building", "transportation", "transportation_name"].includes(layer["source-layer"]) || layer.type === "symbol");
    layers.splice(insertAt < 0 ? layers.length : insertAt, 0,
      vegetation("fysen-wood-cover", "landcover", ["wood", "forest"], c.forest),
      vegetation("fysen-grass-cover", "landcover", ["grass", "meadow"], c.park),
      vegetation("fysen-green-landuse", "landuse", ["grass", "meadow", "park", "garden", "recreation_ground", "village_green", "cemetery"], c.park));
  }
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
