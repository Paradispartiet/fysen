/* global process, console */
import { readdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL, URL } from "node:url";

export const catalogDir = fileURLToPath(new URL("../../menu-worker/catalog/", import.meta.url));
const output = fileURLToPath(new URL("../lib/restaurant-coordinate-data.ts", import.meta.url));

export function coordinateRow(restaurant) {
  if (!restaurant || typeof restaurant.slug !== "string" || !restaurant.slug.trim()
    || typeof restaurant.name !== "string" || !restaurant.name.trim()
    || typeof restaurant.address !== "string" || !restaurant.address.trim()
    || typeof restaurant.city !== "string" || restaurant.city.trim().toLowerCase() !== "oslo"
    || restaurant.countryCode !== "NO"
    || !Number.isFinite(restaurant.latitude) || !Number.isFinite(restaurant.longitude)
    || restaurant.latitude < 59.7 || restaurant.latitude > 60.2
    || restaurant.longitude < 10.4 || restaurant.longitude > 11.1) return null;
  return [restaurant.slug, restaurant.name, restaurant.address, restaurant.latitude, restaurant.longitude];
}

export function collectCoordinateRows(directory = catalogDir) {
  const files = readdirSync(directory).filter(name => name.endsWith(".json")).sort();
  if (!files.length) throw new Error("Fysen restaurant catalog is empty");
  const rows = [];
  const seen = new Set();
  for (const file of files) {
    const { restaurant } = JSON.parse(readFileSync(join(directory, file), "utf8"));
    const row = coordinateRow(restaurant);
    if (!row) continue;
    if (seen.has(row[0])) throw new Error("Duplicate restaurant coordinate identity: " + row[0]);
    seen.add(row[0]);
    rows.push(row);
  }
  rows.sort((a, b) => a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0);
  return { rows, catalogCount: files.length };
}

export function renderCoordinateModule(rows) {
  return "// Generated from apps/menu-worker/catalog by scripts/generate-restaurant-coordinates.mjs.\n"
    + "// Catalog coordinates only; do not infer locations from restaurant names.\n"
    + "export const restaurantCoordinateRows: readonly (readonly [string, string, string, number, number])[] = [\n"
    + rows.map(row => "  " + JSON.stringify(row) + ",\n").join("")
    + "];\n";
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { rows, catalogCount } = collectCoordinateRows();
  if (!rows.length) throw new Error("No eligible Oslo restaurant coordinates");
  const source = renderCoordinateModule(rows);
  const temporary = output + "." + process.pid + ".tmp";
  writeFileSync(temporary, source, "utf8");
  renameSync(temporary, output);
  console.log("Fysen restaurant coordinates: " + rows.length + "/" + catalogCount + " catalog entries");
}
