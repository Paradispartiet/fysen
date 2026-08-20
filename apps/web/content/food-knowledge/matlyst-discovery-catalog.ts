import { foodDiscoveryCatalog } from "./discovery-catalog";
import type { FoodDishCatalogEntry } from "./types";

const ethiopianMatlystDishes: readonly FoodDishCatalogEntry[] = [
  {
    id: "doro-wat",
    name: "Doro wat",
    query: "doro wet",
    aliases: ["doro wat", "doro wot"],
    cuisine: "Etiopisk",
    region: "Etiopia",
    explorerPriority: 100,
  },
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
    id: "tibs",
    name: "Tibs",
    query: "tibis",
    aliases: ["tibs", "tibis"],
    cuisine: "Etiopisk",
    region: "Etiopia",
    explorerPriority: 94,
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
  {
    id: "shiro",
    name: "Shiro",
    query: "shiro",
    aliases: ["shiro w salad", "shiro meser"],
    cuisine: "Etiopisk",
    region: "Etiopia",
    explorerPriority: 80,
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
