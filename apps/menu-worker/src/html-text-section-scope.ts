import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";

export const HTML_TEXT_SECTION_SCOPE_VERSION = "text-section-scope-v4";

const SECTION_COUNT_SUFFIX = /\s*\(\s*\d{1,3}\s*\)\s*$/u;
const BEVERAGE_SECTION_LABEL =
  /^(?:drikke(?:meny)?|drinks?(?:\s+menu)?|beverages?(?:\s+menu)?|andre\s+drikker?|other\s+drinks?|mineralvann|mineral\s+water|soft\s+drinks?|sodas?|brus|vinkart|vin(?:kart|liste|meny)?|wine(?:\s+(?:list|menu))?|white\s+wine|red\s+wine|sparkling\s+wine|cocktails?|aperitif|mocktails?|milkshakes?|draught\s+beer|draft\s+beer|øl(?:\s*,?\s*cider.*)?|beer(?:s)?(?:\s*,?\s*cider.*)?|cider|alkoholfritt|non[- ]alcoholic(?:\s+drinks?)?|kaffe\s*\/\s*coffee|coffee\s+drinks?|coffee\s+(?:and|&)\s+tea|drikke\s*\/\s*beverages?|øl\s*\/\s*beer|fat\s+øl\s*\/\s*tap\s+beer|flaske\s+øl\s*\/\s*bottle\s+beer|vin\s+glass\s*\/\s*wine\s+glass(?:\s*\([^)]*\))?|hvitvin\s*\/\s*white\s+wine|rødvin\s*\/\s*red\s+wine|musserende\s*\/\s*sparkling\s+wine)$/iu;
const FOOD_SECTION_LABEL =
  /^(?:forretter?|starters?|appetizers?|forretter?\s*\/\s*apetizers?|small\s+plates?|småretter|hovedretter?|mains?|main\s+courses?|supper?|soups?|barnemeny|barnemeny\s*\/\s*child\s+menu|kids?\s+menu|child\s+menu|children(?:'s)?\s+menu|children\s+menu|sauser?|sauces?|desserter?|desserts?|sweet\s+dishes?|sides?|tilbehør|tilbehør\s*\/\s*accessories|salater?|salads?|raita\s*&\s*salad|pizza(?:er|s)?|burgers?|snack\s+menu|fries|noodles?|nudler|curr(?:y|ies)|wok|grillretter?|tandoori(?:\s+dishes)?|chicken\s+curr(?:y|ies)|lamb\s+curr(?:y|ies)|prawns?\s*&\s*biryani|vegetable\s+menu|kjøtt\s+curries?\s*\/\s*non-veg\s+curries?|vegetar\s+curries?\s*\/\s*vegetarian\s+curries?|nans?|nanbrød\s*\/\s*nanbread|nibbles?)$/iu;
const MENU_END_SECTION_LABEL =
  /^(?:product\s+information|restaurant\s+information|restaurantinformasjon|allergen(?:oversikt|er|s)?|reservasjoner?|reservations?|kontakt(?:\s+oss)?|contact(?:\s+us)?|booking|bordbestilling)$/iu;
const MENU_UI_LABEL = /^(?:our\s+menu|menu|meny)$/iu;
const MENU_PRICE_SIGNAL =
  /(?:^|\s)(?:(?:fra|from)\s*)?(?:(?:NOK|kr\.?)\s*)?[1-9]\d{0,3}(?:[.,]\d{1,3})?\s*(?:,-|kr\.?|NOK)?$/iu;
const INTERNAL_HEADING_MARKER = /^__FYSEN_ADJACENT_HEADING_LEVEL_[1-6]__/u;
const SHORT_ALLERGEN_CODE_ITEM =
  /^\(\s*[A-Z0-9+]{1,3}(?:\s*[,/+ ]\s*[A-Z0-9+]{1,3})*\s*\)$/iu;
const TRAILING_ALLERGEN_CODE_SUFFIX =
  /\s+\(\s*[A-Z0-9+]{1,3}(?:\s*[,/+ ]\s*[A-Z0-9+]{1,3})*\s*\)$/iu;
const PHONE_PROMPT_ITEM =
  /^(?:ring\s+oss\s+på|call\s+us\s+(?:at|on))\s*:?\s*\+?\d[\d ()+.-]{3,}$/iu;
const PRICE_PER_PERSON_ITEM =
  /^(?:(?:NOK|kr\.?)\s*)?[1-9]\d{1,3}(?:[.,]\d{1,2})?\s*(?:,-|kr\.?|NOK)?\s+(?:per|pr\.?)\s+(?:person|pers\.?)$/iu;
const SERVING_PLACEHOLDER_ITEM = /^\d{1,2}\s+(?:per|pers?\.?)\s+_+$/iu;
const SLASH_GLUTEN_FREE_ITEM = /^\/\s*gluten\s*(?:fri|free)$/iu;
const ICE_CREAM_SCOOP_METADATA_ITEM = /^(?:kule|kuler)$/iu;
const ALL_DISHES_SERVING_METADATA =
  /^(?:all|alle)\s+(?:dishes|retter)\s+(?:are\s+)?served\b/iu;
const PARENTHETICAL_DIETARY_METADATA =
  /^\(\s*can\s+be\s+made\s+(?:vegan|vegetarian|gluten[- ]?free)\s*\)$/iu;
const TRAILING_DECORATION = /\s*_{3,}\s*$/u;
const TRAILING_MARKED_PRICE =
  /\s+(?:[-–—]\s*)?([1-9]\d{1,3})(?:[.,]00)?\s*(,-|kr\.?|NOK)?$/iu;

type MenuSectionState = "unknown" | "food" | "beverage";

function normalizeLine(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}

function normalizedSectionLabel(value: string): string {
  return normalizeLine(value).replace(SECTION_COUNT_SUFFIX, "").trim();
}

function normalizedEvidenceName(value: string): string {
  return normalizeDishName(
    normalizeLine(value).replace(TRAILING_ALLERGEN_CODE_SUFFIX, "").trim(),
  );
}

function isKnownSectionLabel(value: string): boolean {
  const label = normalizedSectionLabel(value);
  return (
    MENU_UI_LABEL.test(label) ||
    FOOD_SECTION_LABEL.test(label) ||
    BEVERAGE_SECTION_LABEL.test(label) ||
    MENU_END_SECTION_LABEL.test(label)
  );
}

function isPlainTextNoiseItem(value: string): boolean {
  const line = normalizeLine(value);
  return (
    INTERNAL_HEADING_MARKER.test(line) ||
    SHORT_ALLERGEN_CODE_ITEM.test(line) ||
    PHONE_PROMPT_ITEM.test(line) ||
    PRICE_PER_PERSON_ITEM.test(line) ||
    SERVING_PLACEHOLDER_ITEM.test(line) ||
    SLASH_GLUTEN_FREE_ITEM.test(line) ||
    ICE_CREAM_SCOOP_METADATA_ITEM.test(line) ||
    ALL_DISHES_SERVING_METADATA.test(line) ||
    PARENTHETICAL_DIETARY_METADATA.test(line) ||
    isKnownSectionLabel(line)
  );
}

function normalizePlainTextItem(item: MenuObservedItem): MenuObservedItem {
  let name = normalizeLine(item.name).replace(TRAILING_DECORATION, "").trim();
  const priceMatch = name.match(TRAILING_MARKED_PRICE);
  if (priceMatch?.[1] && (priceMatch[2] || /\s[-–—]\s*\d/u.test(name))) {
    const displayedPriceMinor = Number(priceMatch[1]) * 100;
    if (displayedPriceMinor === item.priceMinor) {
      name = name.slice(0, priceMatch.index).trim();
    }
  }
  if (!name || name === item.name) return item;
  return {
    ...item,
    name,
    normalizedName: normalizeDishName(name),
    sourceKey: createMenuItemSourceKey(name, item.sectionName),
  };
}

function sectionStateByPosition(
  lines: readonly string[],
): readonly MenuSectionState[] {
  const states: MenuSectionState[] = [];
  let state: MenuSectionState = "unknown";
  let sawPrice = false;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? "";
    const sectionLabel = normalizedSectionLabel(line);
    const countedSection = SECTION_COUNT_SUFFIX.test(line);

    if (!sawPrice && !countedSection && FOOD_SECTION_LABEL.test(sectionLabel)) {
      state = "food";
      states[index] = "unknown";
      continue;
    }
    if (sawPrice && BEVERAGE_SECTION_LABEL.test(sectionLabel)) {
      state = "beverage";
      states[index] = "unknown";
      continue;
    }
    if (sawPrice && FOOD_SECTION_LABEL.test(sectionLabel)) {
      state = "food";
      states[index] = "unknown";
      continue;
    }
    if (sawPrice && MENU_END_SECTION_LABEL.test(sectionLabel)) {
      state = "unknown";
      states[index] = "unknown";
      continue;
    }

    states[index] = state;
    if (MENU_PRICE_SIGNAL.test(line)) sawPrice = true;
  }

  return states;
}

interface ItemSectionEvidence {
  hasFoodOccurrence: boolean;
  hasBeverageOccurrence: boolean;
}

export function filterPlainTextBeverageSectionItems(
  items: readonly MenuObservedItem[],
  visibleText: string,
): readonly MenuObservedItem[] {
  if (items.length === 0) return items;

  const sanitizedItems = items
    .filter((item) => !isPlainTextNoiseItem(item.name))
    .map(normalizePlainTextItem);
  if (sanitizedItems.length === 0) return sanitizedItems;

  const lines = visibleText.split("\n").map(normalizeLine).filter(Boolean);
  if (
    !lines.some((line) =>
      BEVERAGE_SECTION_LABEL.test(normalizedSectionLabel(line)),
    )
  ) {
    return sanitizedItems;
  }

  const states = sectionStateByPosition(lines);
  const evidenceByName = new Map<string, ItemSectionEvidence>();

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? "";
    if (!line || !/\p{L}/u.test(line)) continue;
    const state = states[index] ?? "unknown";
    if (state === "unknown") continue;

    const normalized = normalizedEvidenceName(line);
    const evidence = evidenceByName.get(normalized) ?? {
      hasFoodOccurrence: false,
      hasBeverageOccurrence: false,
    };
    if (state === "food") evidence.hasFoodOccurrence = true;
    if (state === "beverage") evidence.hasBeverageOccurrence = true;
    evidenceByName.set(normalized, evidence);
  }

  return sanitizedItems.filter((item) => {
    const evidence = evidenceByName.get(item.normalizedName);
    if (!evidence?.hasBeverageOccurrence) return true;
    return evidence.hasFoodOccurrence;
  });
}
