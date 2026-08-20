import { normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";

export const HTML_TEXT_SECTION_SCOPE_VERSION = "text-section-scope-v1";

const SECTION_COUNT_SUFFIX = /\s*\(\s*\d{1,3}\s*\)\s*$/u;
const BEVERAGE_SECTION_LABEL = /^(?:drikke(?:meny)?|drinks?(?:\s+menu)?|beverages?(?:\s+menu)?|andre\s+drikker?|other\s+drinks?|mineralvann|soft\s+drinks?|sodas?|brus|vinkart|vin(?:kart|liste|meny)?|wine(?:\s+(?:list|menu))?|cocktails?|øl(?:\s*,?\s*cider.*)?|beer(?:s)?(?:\s*,?\s*cider.*)?|alkoholfritt|non[- ]alcoholic(?:\s+drinks?)?)$/iu;
const FOOD_SECTION_LABEL = /^(?:forretter?|starters?|appetizers?|small\s+plates?|småretter|hovedretter?|mains?|main\s+courses?|supper?|soups?|barnemeny|kids?\s+menu|sauser?|sauces?|desserter?|desserts?|sides?|tilbehør|salater?|salads?|pizza(?:er|s)?|noodles?|nudler|curr(?:y|ies)|wok|grillretter?)$/iu;
const MENU_END_SECTION_LABEL = /^(?:product\s+information|restaurant\s+information|restaurantinformasjon|allergen(?:oversikt|er|s)?|reservasjoner?|reservations?|kontakt(?:\s+oss)?|contact(?:\s+us)?|booking|bordbestilling)$/iu;
const MENU_PRICE_SIGNAL = /(?:^|\s)(?:(?:fra|from)\s*)?(?:(?:NOK|kr\.?)\s*)?[1-9]\d{0,3}(?:[.,]\d{1,3})?\s*(?:,-|kr\.?|NOK)?$/iu;

type MenuSectionState = "unknown" | "food" | "beverage";

function normalizeLine(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}

function normalizedSectionLabel(value: string): string {
  return normalizeLine(value).replace(SECTION_COUNT_SUFFIX, "").trim();
}

function sectionStateByPosition(lines: readonly string[]): readonly MenuSectionState[] {
  const states: MenuSectionState[] = [];
  let state: MenuSectionState = "unknown";
  let sawPrice = false;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? "";
    const sectionLabel = normalizedSectionLabel(line);

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
  const lines = visibleText.split("\n").map(normalizeLine).filter(Boolean);
  if (!lines.some((line) => BEVERAGE_SECTION_LABEL.test(normalizedSectionLabel(line)))) return items;

  const states = sectionStateByPosition(lines);
  const evidenceByName = new Map<string, ItemSectionEvidence>();

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? "";
    if (!line || !/\p{L}/u.test(line)) continue;
    const state = states[index] ?? "unknown";
    if (state === "unknown") continue;

    const normalized = normalizeDishName(line);
    const evidence = evidenceByName.get(normalized) ?? {
      hasFoodOccurrence: false,
      hasBeverageOccurrence: false,
    };
    if (state === "food") evidence.hasFoodOccurrence = true;
    if (state === "beverage") evidence.hasBeverageOccurrence = true;
    evidenceByName.set(normalized, evidence);
  }

  return items.filter((item) => {
    const evidence = evidenceByName.get(item.normalizedName);
    if (!evidence?.hasBeverageOccurrence) return true;
    return evidence.hasFoodOccurrence;
  });
}
