import { foodDishCatalog, findFoodDishByQuery, getFoodDish } from "./catalog";
import { article as ramen } from "./articles/ramen";
import { article as sushi } from "./articles/sushi";
import { article as gyoza } from "./articles/gyoza";
import { article as katsu } from "./articles/katsu";
import { article as bao } from "./articles/bao";
import { article as mapoTofu } from "./articles/mapo-tofu";
import { article as padThai } from "./articles/pad-thai";
import { article as tomYum } from "./articles/tom-yum";
import { article as pho } from "./articles/pho";
import { article as banhMi } from "./articles/banh-mi";
import { article as butterChicken } from "./articles/butter-chicken";
import { article as biryani } from "./articles/biryani";
import { article as dosa } from "./articles/dosa";
import { article as chanaMasala } from "./articles/chana-masala";
import { article as carbonara } from "./articles/carbonara";
import { article as cacioEPepe } from "./articles/cacio-e-pepe";
import { article as pizzaMargherita } from "./articles/pizza-margherita";
import { article as arancini } from "./articles/arancini";
import { article as falafel } from "./articles/falafel";
import { article as hummus } from "./articles/hummus";
import { article as shawarma } from "./articles/shawarma";
import { article as manakish } from "./articles/manakish";
import { article as koshari } from "./articles/koshari";
import { article as pide } from "./articles/pide";
import { article as tacosAlPastor } from "./articles/tacos-al-pastor";
import { article as birria } from "./articles/birria";
import { article as cochinitaPibil } from "./articles/cochinita-pibil";
import { article as pozole } from "./articles/pozole";
import { article as fishTaco } from "./articles/fish-taco";
import { article as smashburger } from "./articles/smashburger";
import type { FoodDishCatalogEntry, FoodKnowledgeArticle, FoodKnowledgeDish } from "./types";

export type { FoodDishCatalogEntry, FoodKnowledgeArticle, FoodKnowledgeDish } from "./types";
export { foodDishCatalog, findFoodDishByQuery, getFoodDish } from "./catalog";

export const foodKnowledgeArticles: readonly FoodKnowledgeArticle[] = [
  ramen, sushi, gyoza, katsu, bao, mapoTofu, padThai, tomYum, pho, banhMi,
  butterChicken, biryani, dosa, chanaMasala, carbonara, cacioEPepe,
  pizzaMargherita, arancini, falafel, hummus, shawarma, manakish, koshari,
  pide, tacosAlPastor, birria, cochinitaPibil, pozole, fishTaco, smashburger,
];

const catalogIds = new Set(foodDishCatalog.map((dish) => dish.id));
const articleById = new Map<string, FoodKnowledgeArticle>();

for (const article of foodKnowledgeArticles) {
  if (!catalogIds.has(article.dishId)) throw new Error(`Food Knowledge article points to unknown dish: ${article.dishId}`);
  if (articleById.has(article.dishId)) throw new Error(`Duplicate Food Knowledge article: ${article.dishId}`);
  for (const relatedDishId of article.relatedDishIds) {
    if (!catalogIds.has(relatedDishId)) {
      throw new Error(`Food Knowledge article ${article.dishId} points to unknown related dish: ${relatedDishId}`);
    }
  }
  articleById.set(article.dishId, article);
}

export const foodKnowledgeDishes: readonly FoodKnowledgeDish[] = foodKnowledgeArticles.map((article) => ({
  ...getFoodDish(article.dishId),
  ...article,
}));

export const featuredLearningDishIds = [
  "ramen",
  "biryani",
  "carbonara",
  "falafel",
  "pad-thai",
  "birria",
  "pho",
  "pizza-margherita",
  "dosa",
] as const;

export function hasFoodKnowledge(dishId: string): boolean {
  return articleById.has(dishId);
}

export function getFoodKnowledgeDish(dishId: string): FoodKnowledgeDish | null {
  const article = articleById.get(dishId);
  return article ? { ...getFoodDish(dishId), ...article } : null;
}

export function findFoodKnowledgeDishByQuery(value: string): FoodKnowledgeDish | null {
  const catalogDish = findFoodDishByQuery(value);
  return catalogDish ? getFoodKnowledgeDish(catalogDish.id) : null;
}

export function getRelatedFoodDishes(dish: FoodKnowledgeDish): readonly FoodDishCatalogEntry[] {
  return dish.relatedDishIds.map(getFoodDish);
}
