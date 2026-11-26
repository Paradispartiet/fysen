import type { FoodKnowledgeArticle } from "../content/food-knowledge/types.ts";
import { dalMakhaniTranslations } from "../content/food-knowledge/translations/dal-makhani.ts";
import { ramenTranslations } from "../content/food-knowledge/translations/ramen.ts";
import { biryaniTranslations } from "../content/food-knowledge/translations/biryani.ts";
import { falafelTranslations } from "../content/food-knowledge/translations/falafel.ts";
import { carbonaraTranslations } from "../content/food-knowledge/translations/carbonara.ts";
import { tacosAlPastorTranslations } from "../content/food-knowledge/translations/tacos-al-pastor.ts";
import { padThaiTranslations } from "../content/food-knowledge/translations/pad-thai.ts";
import { sushiTranslations } from "../content/food-knowledge/translations/sushi.ts";
import { gyozaTranslations } from "../content/food-knowledge/translations/gyoza.ts";
import { tomYumTranslations } from "../content/food-knowledge/translations/tom-yum.ts";
import { phoTranslations } from "../content/food-knowledge/translations/pho.ts";
import { banhMiTranslations } from "../content/food-knowledge/translations/banh-mi.ts";
import type { PreviewLocale } from "./locale-messages.ts";

export type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
const articles: Readonly<Record<string, Partial<Record<Exclude<PreviewLocale, "nb">, ArticleBody>>>> = {
  "dal-makhani": dalMakhaniTranslations,
  ramen: ramenTranslations,
  biryani: biryaniTranslations,
  falafel: falafelTranslations,
  carbonara: carbonaraTranslations,
  "tacos-al-pastor": tacosAlPastorTranslations,
  "pad-thai": padThaiTranslations,
  sushi: sushiTranslations,
  gyoza: gyozaTranslations,
  "tom-yum": tomYumTranslations,
  pho: phoTranslations,
  "banh-mi": banhMiTranslations,
};

export const translatedArticleIds = Object.keys(articles);
export function localizedArticleBody(article: FoodKnowledgeArticle, locale: PreviewLocale): { body: ArticleBody; lang: PreviewLocale } {
  const translated = locale === "nb" || !Object.hasOwn(articles, article.dishId) ? undefined : articles[article.dishId]?.[locale];
  return translated ? { body: translated, lang: locale } : { body: article, lang: "nb" };
}
