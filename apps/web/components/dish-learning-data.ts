import { orderedFoodKnowledgeDishes, type FoodKnowledgeDish } from "../content/food-knowledge";

export type DishLearningDetail = FoodKnowledgeDish;
export const learningDishes: readonly DishLearningDetail[] = orderedFoodKnowledgeDishes;
export const featuredLearningDishCount = 6;
