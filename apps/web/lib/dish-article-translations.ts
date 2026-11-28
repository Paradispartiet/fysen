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
import { katsuTranslations } from "../content/food-knowledge/translations/katsu.ts";
import { baoTranslations } from "../content/food-knowledge/translations/bao.ts";
import { mapoTofuTranslations } from "../content/food-knowledge/translations/mapo-tofu.ts";
import { butterChickenTranslations } from "../content/food-knowledge/translations/butter-chicken.ts";
import { tandooriTranslations } from "../content/food-knowledge/translations/tandoori.ts";
import { chanaMasalaTranslations } from "../content/food-knowledge/translations/chana-masala.ts";
import { dosaTranslations } from "../content/food-knowledge/translations/dosa.ts";
import { cacioEPepeTranslations } from "../content/food-knowledge/translations/cacio-e-pepe.ts";
import { pizzaMargheritaTranslations } from "../content/food-knowledge/translations/pizza-margherita.ts";
import { aranciniTranslations } from "../content/food-knowledge/translations/arancini.ts";
import { pastaAllaNormaTranslations } from "../content/food-knowledge/translations/pasta-alla-norma.ts";
import { hummusTranslations } from "../content/food-knowledge/translations/hummus.ts";
import { shawarmaTranslations } from "../content/food-knowledge/translations/shawarma.ts";
import { manakishTranslations } from "../content/food-knowledge/translations/manakish.ts";
import { koshariTranslations } from "../content/food-knowledge/translations/koshari.ts";
import { pideTranslations } from "../content/food-knowledge/translations/pide.ts";
import { birriaTranslations } from "../content/food-knowledge/translations/birria.ts";
import { cochinitaPibilTranslations } from "../content/food-knowledge/translations/cochinita-pibil.ts";
import { pozoleTranslations } from "../content/food-knowledge/translations/pozole.ts";
import { fishTacoTranslations } from "../content/food-knowledge/translations/fish-taco.ts";
import { smashburgerTranslations } from "../content/food-knowledge/translations/smashburger.ts";
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
  "katsu": katsuTranslations,
  "bao": baoTranslations,
  "mapo-tofu": mapoTofuTranslations,
  "butter-chicken": butterChickenTranslations,
  "tandoori": tandooriTranslations,
  "chana-masala": chanaMasalaTranslations,
  "dosa": dosaTranslations,
  "cacio-e-pepe": cacioEPepeTranslations,
  "pizza-margherita": pizzaMargheritaTranslations,
  "arancini": aranciniTranslations,
  "pasta-alla-norma": pastaAllaNormaTranslations,
  "hummus": hummusTranslations,
  "shawarma": shawarmaTranslations,
  "manakish": manakishTranslations,
  "koshari": koshariTranslations,
  "pide": pideTranslations,
  "birria": birriaTranslations,
  "cochinita-pibil": cochinitaPibilTranslations,
  "pozole": pozoleTranslations,
  "fish-taco": fishTacoTranslations,
  "smashburger": smashburgerTranslations,
};

export const translatedArticleIds = Object.keys(articles);
export function localizedArticleBody(article: FoodKnowledgeArticle, locale: PreviewLocale): { body: ArticleBody; lang: PreviewLocale } {
  const translated = locale === "nb" || !Object.hasOwn(articles, article.dishId) ? undefined : articles[article.dishId]?.[locale];
  return translated ? { body: translated, lang: locale } : { body: article, lang: "nb" };
}
