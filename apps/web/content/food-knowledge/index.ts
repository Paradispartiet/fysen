import { article as arancini } from "./articles/arancini";
import { article as banhMi } from "./articles/banh-mi";
import { article as bao } from "./articles/bao";
import { article as birria } from "./articles/birria";
import { article as biryani } from "./articles/biryani";
import { article as butterChicken } from "./articles/butter-chicken";
import { article as cacioEPepe } from "./articles/cacio-e-pepe";
import { article as carbonara } from "./articles/carbonara";
import { article as chanaMasala } from "./articles/chana-masala";
import { article as cochinitaPibil } from "./articles/cochinita-pibil";
import { article as dosa } from "./articles/dosa";
import { article as falafel } from "./articles/falafel";
import { article as fishTaco } from "./articles/fish-taco";
import { article as gyoza } from "./articles/gyoza";
import { article as hummus } from "./articles/hummus";
import { article as katsu } from "./articles/katsu";
import { article as koshari } from "./articles/koshari";
import { article as manakish } from "./articles/manakish";
import { article as mapoTofu } from "./articles/mapo-tofu";
import { article as padThai } from "./articles/pad-thai";
import { article as pastaAllaNorma } from "./articles/pasta-alla-norma";
import { article as pho } from "./articles/pho";
import { article as pide } from "./articles/pide";
import { article as pizzaMargherita } from "./articles/pizza-margherita";
import { article as pozole } from "./articles/pozole";
import { article as ramen } from "./articles/ramen";
import { article as shawarma } from "./articles/shawarma";
import { article as smashburger } from "./articles/smashburger";
import { article as sushi } from "./articles/sushi";
import { article as tacosAlPastor } from "./articles/tacos-al-pastor";
import { article as tandoori } from "./articles/tandoori";
import { article as tomYum } from "./articles/tom-yum";
import { foodDishCatalog, getFoodDish } from "./catalog";
import { featuredFoodKnowledgeDishIds, foodKnowledgeDishIds } from "./manifest";
import type { FoodKnowledgeArticle, FoodKnowledgeDish } from "./types";

export { foodDishCatalog, findFoodDishByQuery, getFoodDish } from "./catalog";
export { featuredFoodKnowledgeDishIds, foodKnowledgeDishIds, foodKnowledgeDishIdSet } from "./manifest";
export type { FoodDishCatalogEntry, FoodDishId, FoodKnowledgeArticle, FoodKnowledgeDish } from "./types";

const articles: readonly FoodKnowledgeArticle[] = [
  ramen,
  sushi,
  gyoza,
  katsu,
  bao,
  mapoTofu,
  padThai,
  tomYum,
  pho,
  banhMi,
  butterChicken,
  tandoori,
  chanaMasala,
  dosa,
  biryani,
  carbonara,
  cacioEPepe,
  pizzaMargherita,
  arancini,
  pastaAllaNorma,
  falafel,
  hummus,
  shawarma,
  manakish,
  koshari,
  pide,
  tacosAlPastor,
  birria,
  cochinitaPibil,
  pozole,
  fishTaco,
  smashburger,
];

const articleByDishId = new Map<string, FoodKnowledgeArticle>();
for (const article of articles) {
  getFoodDish(article.dishId);
  if (articleByDishId.has(article.dishId)) throw new Error(`Duplicate food knowledge article: ${article.dishId}`);
  articleByDishId.set(article.dishId, article);
  for (const relatedDishId of article.relatedDishIds) getFoodDish(relatedDishId);
}

if (articles.length !== foodKnowledgeDishIds.length) {
  throw new Error(`Food knowledge manifest has ${foodKnowledgeDishIds.length} ids but ${articles.length} articles`);
}
for (const dishId of foodKnowledgeDishIds) {
  if (!articleByDishId.has(dishId)) throw new Error(`Food knowledge manifest is missing article ${dishId}`);
}

export const foodKnowledgeArticles = articles;

export const foodKnowledgeDishes: readonly FoodKnowledgeDish[] = foodKnowledgeDishIds.map((dishId) => {
  const catalog = getFoodDish(dishId);
  const article = articleByDishId.get(dishId);
  if (!article) throw new Error(`Missing food knowledge article: ${dishId}`);
  return { ...catalog, ...article };
});

const knowledgeDishById = new Map(foodKnowledgeDishes.map((dish) => [dish.id, dish]));

export function getFoodKnowledgeDish(dishId: string): FoodKnowledgeDish | null {
  return knowledgeDishById.get(dishId) ?? null;
}

export function getRelatedFoodDishes(dish: Pick<FoodKnowledgeArticle, "relatedDishIds">) {
  return dish.relatedDishIds.map((dishId) => getFoodDish(dishId));
}

export const featuredFoodKnowledgeDishes: readonly FoodKnowledgeDish[] = featuredFoodKnowledgeDishIds.map((dishId) => {
  const dish = knowledgeDishById.get(dishId);
  if (!dish) throw new Error(`Featured food knowledge dish has no article: ${dishId}`);
  return dish;
});

const featuredIds = new Set(featuredFoodKnowledgeDishIds);
export const orderedFoodKnowledgeDishes: readonly FoodKnowledgeDish[] = [
  ...featuredFoodKnowledgeDishes,
  ...foodKnowledgeDishes
    .filter((dish) => !featuredIds.has(dish.id as never))
    .sort((left, right) => right.explorerPriority - left.explorerPriority || left.name.localeCompare(right.name, "nb")),
];
