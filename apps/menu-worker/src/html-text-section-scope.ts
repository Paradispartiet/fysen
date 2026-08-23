import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";

export const HTML_TEXT_SECTION_SCOPE_VERSION = "text-section-scope-v8";

const SECTION_COUNT_SUFFIX = /\s*\(\s*\d{1,3}\s*\)\s*$/u;
const BEVERAGE_SECTION_LABEL =
  /^(?:drikke(?:meny)?|drinks?(?:\s+menu)?|beverages?(?:\s+menu)?|andre\s+drikker?|other\s+drinks?|mineralvann|mineral\s+water|soft\s+drinks?|sodas?|brus|milkshakes?|coffee(?:\s+and\s+tea|\s+drinks?)?|tea|kaffe\s*[/|]\s*coffee|vinkart|vin(?:kart|liste|meny)?|wine(?:\s+(?:list|menu))?|vin\s+glass\s*[/|]\s*wine\s+glass(?:\s*\(\s*\d+\s*cl\s*\))?|hvitvin\s*[/|]\s*white\s+wine|rødvin\s*[/|]\s*red\s+wine|cocktails?|mocktails?|aperitifs?|draught\s+beer|draft\s+beer|beer\s+on\s+tap|fat\s+øl\s*[/|]\s*tap\s+beer|flaske\s+øl\s*[/|]\s*bottle\s+beer|musserende\s*[/|]\s*sparkling\s+wine|øl\s*[/|]\s*beer|øl(?:\s*,?\s*cider.*)?|beer(?:s)?(?:\s*,?\s*cider.*)?|cider|alkoholfritt|non[- ]alcoholic(?:\s+drinks?)?)$/iu;
const FOOD_SECTION_LABEL =
  /^(?:food|mat|forretter?|starters?|appetizers?|small\s+plates?|small\s+dishes?\s*(?:&|and)\s*sharing\s+plates?|classics?|dumplings?|proteins?|småretter|burgers?|hovedretter?|mains?|main\s+courses?|supper?|soups?|barnemeny|children'?s\s+menu|kids?\s+menu|sauser?|sauces?|desserter?|desserts?|sides?|tilbehør|salater?|salads?|pizza(?:er|s)?|noodles?|nudler|curr(?:y|ies)|wok|grillretter?|snacks?(?:\s+menu)?|fries|kylling|chicken|lam|lamb|kebab|vegetar|vegetarian|spesial|special|nan|naan)$/iu;
const MENU_END_SECTION_LABEL =
  /^(?:product\s+information|restaurant\s+information|restaurantinformasjon|allergen(?:oversikt|er|s)?|reservasjoner?|reservations?|kontakt(?:\s+oss)?|contact(?:\s+us)?|booking|bordbestilling)$/iu;
const MENU_PRICE_SIGNAL =
  /(?:^|\s)(?:(?:fra|from)\s*)?(?:(?:NOK|kr\.?)\s*)?[1-9]\d{0,3}(?:[.,]\d{1,3})?\s*(?:,-|kr\.?|NOK)?$/iu;
const ALLERGEN_CODE_ONLY =
  /^\(\s*[a-z]{1,4}\+?(?:\s*[,/]\s*[a-z]{1,4}\+?)*\s*\)\.?$/iu;
const QUANTITY_OPTION_ONLY =
  /^(?:(?:\d+\s+)?(?:kule(?:r)?|scoops?)|\d+\s+(?:per|pers?\.?|personer?|persons?|people))(?:\s*[_-]{2,})?$/iu;
const CONTACT_METADATA =
  /^(?:ring\s+oss\s+på|call\s+us(?:\s+(?:at|on))?|tel(?:efon)?|tlf|phone)\s*:?\s*\+?\d[\d\s()+.-]{4,}$/iu;
const PER_PERSON_PRICE_METADATA =
  /^(?:(?:nok|kr\.?)\s*)?[1-9]\d{1,3}(?:[.,]\d{1,2})?\s*(?:,-|kr\.?|nok)?\s*(?:per|pr)\s+(?:person|personer|persons?|people)$/iu;
const OUTPUT_METADATA =
  /^(?:our\s+menu|all\s+dishes\s+are\s+served\s+with\s+rice|contents?\s*:.*|druer\s*:.*|grapes?\s*:.*)$/iu;
const DESCRIPTION_FRAGMENT =
  /^(?:pieces?\s+of\b|served\s+with\b|topped\s+with\b|glazed\s+with\b|all\s+dishes\s+are\s+served\b|can\s+be\s+made\b|homemade\s+.+\s+cooked\s+in\b|chicken\s+cooked\s+in\b|grilled\s+chicken\s+in\b|traditional\s+.+\s+dessert\s+with\b)/iu;
const DESCRIPTION_PHRASE =
  /\b(?:served\s+with|topped\s+with|glazed\s+with|comes\s+with|cooked\s+in|prepared\s+(?:in|with))\b/iu;
const BILINGUAL_SECTION_PART =
  /^(?:forretter?|ap+etizers?|starters?|kjøtt\s+curries|non[- ]veg\s+curries|vegetar\s+curries|vegetarian\s+curries|nanbrød|nanbread|fat\s+øl|tap\s+beer|flaske\s+øl|bottle\s+beer|musserende|sparkling\s+wine|soft\s+drinks?)$/iu;
const EXPLICIT_TRAILING_PRICE =
  /\s+(?:(?:nok|kr\.?)\s*)?[1-9]\d{1,3}(?:[.,]\d{1,2})?\s*(?:,-|kr\.?|nok)\s*$/iu;
const BARE_DASH_TRAILING_PRICE = /\s+[-–—]\s*([1-9]\d{1,3})\s*$/u;
const TRAILING_LEADER = /\s*_{3,}\s*$/u;
const TRAILING_ITEM_ALLERGEN_CODES =
  /\s+\((?:[\p{L}]{1,2}|\d{1,2})(?:\s*[,/+ ]\s*(?:[\p{L}]{1,2}|\d{1,2}))*\)$/u;
const SOURCE_EXCERPT_SEPARATOR = /\s+—\s+/u;
const DIRECT_SOURCE_PRICE =
  /^(?:(?:fra|from)\s*)?(?:(?:NOK|kr\.?)\s*)?[1-9]\d{0,3}(?:[.,]\d{1,2})?\s*(?:,-|kr\.?|NOK)?$/iu;

type MenuSectionState = "unknown" | "food" | "beverage";

function normalizeLine(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/\p{Cf}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizedSectionLabel(value: string): string {
  return normalizeLine(value).replace(SECTION_COUNT_SUFFIX, "").trim();
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

    if (!countedSection && BEVERAGE_SECTION_LABEL.test(sectionLabel)) {
      state = "beverage";
      states[index] = "unknown";
      continue;
    }
    if (!countedSection && FOOD_SECTION_LABEL.test(sectionLabel)) {
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

function stripOuterParentheses(value: string): string {
  const trimmed = value.trim();
  if (trimmed.startsWith("(") && trimmed.endsWith(")")) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

function isBilingualMenuSection(value: string): boolean {
  const parts = value
    .split(/[|/]/u)
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.length >= 2 && parts.every((part) => BILINGUAL_SECTION_PART.test(part));
}

function looksLikeDescriptionFragment(value: string): boolean {
  const normalized = normalizeLine(value);
  if (DESCRIPTION_FRAGMENT.test(normalized)) return true;
  const wordCount = normalized.split(/\s+/u).filter(Boolean).length;
  return wordCount >= 8 && DESCRIPTION_PHRASE.test(normalized);
}

function isObviousOutputNoise(
  value: string,
  allowDirectPricedFoodDescription = false,
): boolean {
  const normalized = normalizeLine(value);
  const unwrapped = stripOuterParentheses(normalized);
  const withoutLeadingDelimiter = unwrapped.replace(/^[/|•]+\s*/u, "").trim();
  return (
    ALLERGEN_CODE_ONLY.test(normalized) ||
    QUANTITY_OPTION_ONLY.test(normalized) ||
    CONTACT_METADATA.test(normalized) ||
    PER_PERSON_PRICE_METADATA.test(normalized) ||
    OUTPUT_METADATA.test(withoutLeadingDelimiter) ||
    (!allowDirectPricedFoodDescription &&
      looksLikeDescriptionFragment(withoutLeadingDelimiter)) ||
    isBilingualMenuSection(withoutLeadingDelimiter) ||
    BEVERAGE_SECTION_LABEL.test(normalizedSectionLabel(withoutLeadingDelimiter)) ||
    /^(?:gluten[- ]?fri|gluten[- ]?free)$/iu.test(withoutLeadingDelimiter)
  );
}

function cleanOutputArtifactName(item: MenuObservedItem): MenuObservedItem {
  let name = normalizeLine(item.name).replace(TRAILING_LEADER, "").trim();
  name = name.replace(EXPLICIT_TRAILING_PRICE, "").trim();
  const barePrice = name.match(BARE_DASH_TRAILING_PRICE);
  if (barePrice?.[1] && Number(barePrice[1]) >= 40 && item.priceMinor === Number(barePrice[1]) * 100) {
    name = name.replace(BARE_DASH_TRAILING_PRICE, "").trim();
  }
  name = name.replace(/[-–—]\s*$/u, "").trim();
  if (!name || name === item.name) return item;
  return {
    ...item,
    name,
    normalizedName: normalizeDishName(name),
    sourceKey: createMenuItemSourceKey(name, item.sectionName),
  };
}

function hasDirectPriceSourceProvenance(item: MenuObservedItem): boolean {
  const sourceExcerpt = item.sourceExcerpt?.trim() ?? "";
  if (!sourceExcerpt) return false;
  const segments = sourceExcerpt
    .split(SOURCE_EXCERPT_SEPARATOR)
    .map(normalizeLine)
    .filter(Boolean);
  if (segments.length < 2) return false;
  if (normalizeDishName(segments[0] ?? "") !== item.normalizedName) return false;
  return DIRECT_SOURCE_PRICE.test(segments[1] ?? "");
}

function lineReferencesItem(
  line: string,
  itemName: string,
  matchTrailingAllergenCodes = false,
): boolean {
  const normalizedEvidenceLine = normalizeLine(line);
  const evidenceLine = matchTrailingAllergenCodes
    ? normalizedEvidenceLine.replace(TRAILING_ITEM_ALLERGEN_CODES, "").trim()
    : normalizedEvidenceLine;
  const normalizedLine = normalizeDishName(evidenceLine);
  const normalizedName = normalizeDishName(itemName);
  if (!normalizedName || !normalizedLine.startsWith(normalizedName)) return false;
  if (normalizedLine.length === normalizedName.length) return true;
  const remainder = normalizedLine.slice(normalizedName.length).trim();
  return /^(?:\d|nok\b|kr\b)/iu.test(remainder);
}

function sectionEvidenceForItem(
  item: MenuObservedItem,
  lines: readonly string[],
  states: readonly MenuSectionState[],
  matchTrailingAllergenCodes = false,
): ItemSectionEvidence {
  const evidence: ItemSectionEvidence = {
    hasFoodOccurrence: false,
    hasBeverageOccurrence: false,
  };
  for (let index = 0; index < lines.length; index += 1) {
    const state = states[index] ?? "unknown";
    if (state === "unknown") continue;
    const line = lines[index] ?? "";
    if (
      !lineReferencesItem(line, item.name, matchTrailingAllergenCodes)
    )
      continue;
    if (state === "food") evidence.hasFoodOccurrence = true;
    if (state === "beverage") evidence.hasBeverageOccurrence = true;
    if (evidence.hasFoodOccurrence && evidence.hasBeverageOccurrence) break;
  }
  return evidence;
}

interface BeverageSectionFilterOptions {
  readonly matchTrailingAllergenCodes?: boolean;
}

export function filterPlainTextBeverageSectionItems(
  items: readonly MenuObservedItem[],
  visibleText: string,
  options: BeverageSectionFilterOptions = {},
): readonly MenuObservedItem[] {
  if (items.length === 0) return items;
  const cleanedItems = items.map(cleanOutputArtifactName);
  const lines = visibleText.split("\n").map(normalizeLine).filter(Boolean);
  const hasBeverageSection = lines.some((line) =>
    BEVERAGE_SECTION_LABEL.test(normalizedSectionLabel(line)),
  );
  const states = sectionStateByPosition(lines);

  return cleanedItems.filter((item) => {
    const evidence = sectionEvidenceForItem(
      item,
      lines,
      states,
      options.matchTrailingAllergenCodes ?? false,
    );
    const allowDirectPricedFoodDescription =
      looksLikeDescriptionFragment(item.name) &&
      hasDirectPriceSourceProvenance(item) &&
      evidence.hasFoodOccurrence &&
      !evidence.hasBeverageOccurrence;
    if (isObviousOutputNoise(item.name, allowDirectPricedFoodDescription))
      return false;
    if (!hasBeverageSection || !evidence.hasBeverageOccurrence) return true;
    return evidence.hasFoodOccurrence;
  });
}

export function filterHtmlBeverageSectionItemsWithScopedProvenance(
  items: readonly MenuObservedItem[],
  scopedVisibleText: string,
  fullVisibleText: string,
): readonly MenuObservedItem[] {
  if (items.length === 0) return items;

  const scopedLines = scopedVisibleText
    .split("\n")
    .map(normalizeLine)
    .filter(Boolean);
  const scopedItems: MenuObservedItem[] = [];
  const fullPageRecoveryItems: MenuObservedItem[] = [];

  for (const item of items) {
    if (
      scopedLines.some((line) =>
        lineReferencesItem(line, item.name, true),
      )
    ) {
      scopedItems.push(item);
    } else {
      fullPageRecoveryItems.push(item);
    }
  }

  const scopedFiltered = filterPlainTextBeverageSectionItems(
    scopedItems,
    scopedVisibleText,
  );
  const fullPageFiltered = filterPlainTextBeverageSectionItems(
    fullPageRecoveryItems,
    fullVisibleText,
    { matchTrailingAllergenCodes: true },
  );

  const unique = new Map<string, MenuObservedItem>();
  for (const item of fullPageFiltered) unique.set(item.sourceKey, item);
  for (const item of scopedFiltered) unique.set(item.sourceKey, item);
  return [...unique.values()].sort((left, right) => left.position - right.position);
}
