import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";

// A card may render "Dish - ingredients 298,- (F, M)" on one line.
// Do not inherit prices from neighboring lines or promote multi-size rows.
export const HTML_HYPHEN_PRICED_FOOD_RECOVERY_VERSION = "hyphen-priced-food-v1";

const NAMED_PRICED_FOOD = /^(.{3,90}?)\\s+[-–—]\\s+(.{6,400}?)\\s+(?:[-–—]\\s+)?([1-9]\\d{1,3})\\s*,-(?:\\s*\\([^()]{1,90}\\))?\\s*$/u;
const MULTI_PRICE = /[1-9]\\d{1,3}\\s*,-\\s*\\/\\s*[1-9]\\d{1,3}/u;
const NON_FOOD_LEAD = /^(?:vermouth|cocktail|aperitif|aperol|vodka|gin|beer|øl|vin|wine|cava|whisk(?:e)?y|sangria)\\b/iu;
const NON_FOOD_TITLE = /^(?:allergener?|allergens?|sideretter|dessert|hovedretter|forretter|småretter|kaviar|østers)\\b/iu;

export function recoverHyphenDescriptionPricedFoodItems(
  scopedMenuText: string,
): readonly MenuObservedItem[] {
  const found = new Map<string, MenuObservedItem>();
  for (const [position, raw] of scopedMenuText.split("\\n").entries()) {
    const line = raw.normalize("NFKC").replace(/\\s+/gu, " ").trim();
    if (!line || MULTI_PRICE.test(line)) continue;
    const m = line.match(NAMED_PRICED_FOOD);
    if (!m?.[1] || !m[2] || !m[3]) continue;
    const name = m[1].trim();
    const description = m[2].trim();
    const priceMinor = Number(m[3]) * 100;
    if (
      name.split(/\\s+/u).length > 12 ||
      name.endsWith("-") ||
      !/\\p{L}/u.test(name) ||
      NON_FOOD_LEAD.test(name) ||
      NON_FOOD_TITLE.test(name) ||
      priceMinor < 4_000 || priceMinor > 1_000_000
    ) continue;
    const sourceKey = createMenuItemSourceKey(name);
    found.set(sourceKey, {
      sourceKey,
      name,
      normalizedName: normalizeDishName(name),
      description,
      sectionName: null,
      priceMinor,
      priceKind: "exact",
      priceMaxMinor: null,
      currency: "NOK",
      position,
      extractionMethod: "html_heuristic",
      confidence: 0.98,
      sourceExcerpt: line.slice(0, 1000),
    });
  }
  return [...found.values()].sort((a, b) => a.position - b.position);
}

/** Use source-bound title and price instead of a truncated description title. */
export function mergeSourceBackedHyphenPricedFoodItems(
  current: readonly MenuObservedItem[],
  recovered: readonly MenuObservedItem[],
): readonly MenuObservedItem[] {
  if (recovered.length === 0) return current;
  const result = [...current];
  for (const candidate of recovered) {
    const exactIndex = result.findIndex((item) => item.normalizedName === candidate.normalizedName);
    if (exactIndex >= 0) {
      // A clearly priced, explicitly named dish corrects an earlier price leak.
      const existing = result[exactIndex]!;
      if (existing.priceMinor !== candidate.priceMinor) {
        result[exactIndex] = { ...existing, priceMinor: candidate.priceMinor,
          priceKind: "exact", priceMaxMinor: null,
          sourceExcerpt: candidate.sourceExcerpt,
          confidence: Math.min(existing.confidence, candidate.confidence) };
      }
      continue;
    }
    const verboseIndex = result.findIndex((item) =>
      item.normalizedName.startsWith(candidate.normalizedName + " - ") &&
      item.priceMinor === candidate.priceMinor &&
      item.sectionName === null
    );
    if (verboseIndex >= 0) {
      result[verboseIndex] = candidate;
      continue;
    }
    result.push(candidate);
  }
  return result.sort((a, b) => a.position - b.position);
}
