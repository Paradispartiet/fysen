export type FoodDishId = string;

export type FoodDishCatalogEntry = {
  readonly id: FoodDishId;
  readonly name: string;
  readonly query: string;
  readonly aliases: readonly string[];
  readonly cuisine: string;
  readonly region: string;
  readonly explorerPriority: number;
};

export type FoodKnowledgeSource = {
  readonly label: string;
  readonly href: string;
};

export type FoodKnowledgeRecipe = {
  readonly label: string;
  readonly yield: string;
  readonly time: string;
  readonly ingredients: readonly string[];
  readonly steps: readonly string[];
};

export type FoodKnowledgeArticle = {
  readonly dishId: FoodDishId;
  readonly summary: string;
  readonly overview: string;
  readonly history: string;
  readonly flavor: string;
  readonly technique: string;
  readonly essentials: readonly string[];
  readonly recipe: FoodKnowledgeRecipe;
  readonly variants: readonly string[];
  readonly serving: readonly string[];
  readonly commonMistakes: readonly string[];
  readonly relatedDishIds: readonly FoodDishId[];
  readonly sources: readonly FoodKnowledgeSource[];
};

export type FoodKnowledgeDish = FoodDishCatalogEntry & FoodKnowledgeArticle;
