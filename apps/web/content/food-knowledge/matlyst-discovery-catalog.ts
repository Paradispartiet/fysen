import { foodDiscoveryCatalog } from "./discovery-catalog";
import type { FoodDishCatalogEntry } from "./types";

const ethiopianMatlystDishes: readonly FoodDishCatalogEntry[] = [
  {
    id: "key-wat",
    name: "Key wat",
    query: "key wet",
    aliases: ["key wat", "key wot"],
    cuisine: "Etiopisk",
    region: "Etiopia",
    explorerPriority: 96,
  },
  {
    id: "awaze-tibs",
    name: "Awaze tibs",
    query: "awaze tibis",
    aliases: ["awaze tibs"],
    cuisine: "Etiopisk",
    region: "Etiopia",
    explorerPriority: 90,
  },
  {
    id: "gored-gored",
    name: "Gored gored",
    query: "gored gored",
    aliases: [],
    cuisine: "Etiopisk",
    region: "Etiopia",
    explorerPriority: 86,
  },
  {
    id: "firfir",
    name: "Firfir",
    query: "firfir",
    aliases: [],
    cuisine: "Etiopisk",
    region: "Etiopia",
    explorerPriority: 84,
  },
  {
    id: "mesir-wat",
    name: "Mesir wat",
    query: "meser wet",
    aliases: ["mesir wat", "meser wat", "mesir wot"],
    cuisine: "Etiopisk",
    region: "Etiopia",
    explorerPriority: 82,
  },
];

const existingIds = new Set(foodDiscoveryCatalog.map((dish) => dish.id));
for (const dish of ethiopianMatlystDishes) {
  if (existingIds.has(dish.id)) {
    throw new Error(`Duplicate Matlyst discovery dish id: ${dish.id}`);
  }
  existingIds.add(dish.id);
}

export const matlystDiscoveryCatalog: readonly FoodDishCatalogEntry[] = [
  ...foodDiscoveryCatalog,
  ...ethiopianMatlystDishes,
];
