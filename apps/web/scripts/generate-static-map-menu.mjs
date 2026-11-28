/* global console */
import { writeFileSync, mkdirSync } from "node:fs";
import { URL } from "node:url";
import { getPublicMenuArchive, archivedOsloMapIndex } from "../lib/verified-menu-archive.ts";
import { collectCoordinateRows } from "./generate-restaurant-coordinates.mjs";

const { rows } = collectCoordinateRows();
const archive = await getPublicMenuArchive();
const index = archivedOsloMapIndex(archive, new Set(rows.map(row => row[0])));
if (!index.groups.length) throw new Error("No verified Oslo map menu groups");
const directory = new URL("../public/map-data/", import.meta.url);
mkdirSync(directory, { recursive: true });
writeFileSync(new URL("menus.json", directory), JSON.stringify(index));
console.log("Verified static map menus: " + index.groups.length + " source groups, " + index.groups.reduce((total, group) => total + group.items.length, 0) + " menu items");
