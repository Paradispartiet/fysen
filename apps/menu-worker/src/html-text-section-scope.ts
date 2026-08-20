import { normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";

export const HTML_TEXT_SECTION_SCOPE_VERSION = "text-section-scope-v1";

const BEVERAGE_SECTION_LABEL = /^(?:drikke(?:meny)?|drinks?(?:\s+menu)?|beverages?(?:\s+menu)?|andre\s+drikker?|other\s+drinks?|mineralvann|soft\s+drinks?|sodas?|brus|vinkart|vin(?:kart|liste|meny)?|wine(?:\s+(?:list|menu))?|cocktails?|øl(?:\s*,?\s*cider.*)?|beer(?:s)?(?:\s*,?\s*cider.*)?|alkoholfritt|non[- ]alcoholic(?:\s+drinks?)?)$/iu;
const FOOD_SECTION_LABEL = /^(?:forretter?|starters?|appetizers?|small\s+plates?|småretter|hovedretter?|mains?|main\s+courses?|supper?|soups?|barnemeny|kids?\s+menu|sauser?|sauces?|desserter?|desserts?|sides?|tilbehør|salater?|salads?|pizza(?:er|s)?|noodles?|nudler|curr(?:y|ies)|wok|grillretter?)$/iu;
const MENU_END_SECTION_LABEL = /^(?:product\s+information|restaurant\s+information|allergen(?:oversikt|er|s)?|reservasjoner?|reservations?|kontakt(?:\s+oss)?|contact(?:\s+us)?|booking|bordbestilling)$/iu;

function normalizeLine(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}

interface BlockedRange {
  readonly start: number;
  readonly end: number;
}

function blockedBeverageRanges(lines: readonly string[]): readonly BlockedRange[] {
  const ranges: BlockedRange[] = [];
  let start: number | null = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? "";
    if (BEVERAGE_SECTION_LABEL.test(line)) {
      if (start === null) start = index + 1;
      continue;
    }
    if (start === null) continue;
    if (FOOD_SECTION_LABEL.test(line) || MENU_END_SECTION_LABEL.test(line)) {
      ranges.push({ start, end: index });
      start = null;
    }
  }

  if (start !== null) ranges.push({ start, end: lines.length });
  return ranges;
}

function insideBlockedRange(position: number, ranges: readonly BlockedRange[]): boolean {
  return ranges.some((range) => position >= range.start && position < range.end);
}

export function filterPlainTextBeverageSectionItems(
  items: readonly MenuObservedItem[],
  visibleText: string,
): readonly MenuObservedItem[] {
  if (items.length === 0) return items;
  const lines = visibleText.split("\n").map(normalizeLine).filter(Boolean);
  const ranges = blockedBeverageRanges(lines);
  if (ranges.length === 0) return items;

  const positionsByName = new Map<string, number[]>();
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? "";
    if (!line || !/\p{L}/u.test(line)) continue;
    const normalized = normalizeDishName(line);
    const positions = positionsByName.get(normalized) ?? [];
    positions.push(index);
    positionsByName.set(normalized, positions);
  }

  return items.filter((item) => {
    const positions = positionsByName.get(item.normalizedName) ?? [];
    if (positions.length === 0) return true;
    const inside = positions.some((position) => insideBlockedRange(position, ranges));
    const outside = positions.some((position) => !insideBlockedRange(position, ranges));
    return !inside || outside;
  });
}
