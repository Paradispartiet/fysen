import type { FoodDishId } from "./types";

export const foodKnowledgeDishIds = [
  "ramen",
  "sushi",
  "gyoza",
  "katsu",
  "bao",
  "mapo-tofu",
  "pad-thai",
  "tom-yum",
  "pho",
  "banh-mi",
  "butter-chicken",
  "tandoori",
  "chana-masala",
  "dosa",
  "biryani",
  "carbonara",
  "cacio-e-pepe",
  "pizza-margherita",
  "arancini",
  "pasta-alla-norma",
  "falafel",
  "hummus",
  "shawarma",
  "manakish",
  "koshari",
  "pide",
  "tacos-al-pastor",
  "birria",
  "cochinita-pibil",
  "pozole",
  "fish-taco",
  "smashburger",
] as const satisfies readonly FoodDishId[];

export const featuredFoodKnowledgeDishIds = [
  "ramen",
  "biryani",
  "falafel",
  "carbonara",
  "tacos-al-pastor",
  "pad-thai",
] as const satisfies readonly FoodDishId[];

export const foodKnowledgeDishIdSet: ReadonlySet<string> = new Set(foodKnowledgeDishIds);
