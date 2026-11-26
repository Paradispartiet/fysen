import type { FoodKnowledgeArticle } from "../content/food-knowledge/types.ts";
import { dalMakhaniTranslations } from "../content/food-knowledge/translations/dal-makhani.ts";
import type { PreviewLocale } from "./locale-messages.ts";

export type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
const articles: Readonly<Record<string, Partial<Record<Exclude<PreviewLocale, "nb">, ArticleBody>>>> = {
  "dal-makhani": dalMakhaniTranslations,
};

export const translatedArticleIds = Object.keys(articles);
export function localizedArticleBody(article: FoodKnowledgeArticle, locale: PreviewLocale): { body: ArticleBody; lang: PreviewLocale } {
  const translated = locale === "nb" || !Object.hasOwn(articles, article.dishId) ? undefined : articles[article.dishId]?.[locale];
  return translated ? { body: translated, lang: locale } : { body: article, lang: "nb" };
}
