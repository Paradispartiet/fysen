/* global process, console */
import { writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { collectCoordinateRows } from "./generate-restaurant-coordinates.mjs";

export function buildRestaurantMap(sourceCommit, catalog = collectCoordinateRows()) {
  if (!/^[a-f0-9]{40}$/u.test(sourceCommit)) throw new Error("Exact Fysen source commit required");
  if (!catalog.rows.length || catalog.rows.length > catalog.catalogCount) throw new Error("Empty or invalid catalog");
  return {
    schemaVersion: 1,
    source: "fysen-catalog",
    sourceCommit,
    city: "Oslo",
    catalogCount: catalog.catalogCount,
    restaurants: catalog.rows.map(([slug, name, address, latitude, longitude]) => ({
      slug, name, address, latitude, longitude
    })),
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [, , sourceCommit, output] = process.argv;
  if (!output) throw new Error("Output path required");
  const data = buildRestaurantMap(sourceCommit);
  writeFileSync(output, JSON.stringify(data) + "\n", "utf8");
  console.log("Public Fysen map: " + data.restaurants.length + "/" + data.catalogCount);
}
