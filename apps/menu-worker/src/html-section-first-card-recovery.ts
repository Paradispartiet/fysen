import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
  type MenuPriceKind,
} from "@fysen/menu-core";

export const HTML_SECTION_FIRST_CARD_RECOVERY_VERSION = "section-first-card-v1";

const SECTION_COUNT_SUFFIX = /\s*\(\s*\d{1,3}\s*\)\s*$/u;
const FOOD_SECTION_LABEL = /^(?:forretter?|starters?|appetizers?|small\s+plates?|småretter|hovedretter?|mains?|main\s+courses?|supper?|soups?|barnemeny|kids?\s+menu|sauser?|sauces?|desserter?|desserts?|sides?|tilbehør|salater?|salads?|pizza(?:er|s)?|noodles?|nudler|curr(?:y|ies)|wok|grillretter?)$/iu;
const BEVERAGE_SECTION_LABEL = /^(?:drikke(?:meny)?|drinks?(?:\s+menu)?|beverages?(?:\s+menu)?|andre\s+drikker?|other\s+drinks?|mineralvann|soft\s+drinks?|sodas?|brus|vinkart|vin(?:kart|liste|meny)?|wine(?:\s+(?:list|menu))?|cocktails?|øl(?:\s*,?\s*cider.*)?|beer(?:s)?(?:\s*,?\s*cider.*)?|alkoholfritt|non[- ]alcoholic(?:\s+drinks?)?)$/iu;
const MENU_END_SECTION_LABEL = /^(?:product\s+information|restaurant\s+information|restaurantinformasjon|allergen(?:oversikt|er|s)?|reservasjoner?|reservations?|kontakt(?:\s+oss)?|contact(?:\s+us)?|booking|bordbestilling)$/iu;
const PRICE_LINE = /^(?:(fra|from)\s*)?(?:(?:NOK|kr\.?)\s*)?([1-9]\d{0,3})(?:([.,])(\d{1,3}))?(?:\s*(?:,-|kr\.?|NOK))?$/iu;
const UI_LABEL = /^(?:popular\s+dish|most\s+ordered|bestseller|#?\d+\s+(?:most\s+liked|mest\s+likte)|image|add\s+to\s+cart|legg\s+i\s+handlekurv|show\s+more|vis\s+mer)$/iu;
const DESCRIPTION_LEAD = /^(?:serveres?|servert|served|with|med|toppet|topped|inneholder|contains?|inkludert|including|tradisjonell|traditional|en\s+|a\s+|an\s+)\b/iu;

function normalizeLine(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}

function normalizedSectionLabel(value: string): string {
  return normalizeLine(value).replace(SECTION_COUNT_SUFFIX, "").trim();
}

function isSectionBoundary(value: string): boolean {
  const label = normalizedSectionLabel(value);
  return (
    FOOD_SECTION_LABEL.test(label) ||
    BEVERAGE_SECTION_LABEL.test(label) ||
    MENU_END_SECTION_LABEL.test(label)
  );
}

function parsePrice(value: string): { priceMinor: number; priceKind: MenuPriceKind } | null {
  const match = normalizeLine(value).match(PRICE_LINE);
  if (!match?.[2]) return null;

  const separator = match[3] ?? null;
  const trailingDigits = match[4] ?? "";
  let whole = Number(match[2]);
  let decimals = "";

  if (separator === "." && trailingDigits.length === 3) {
    whole = Number(`${match[2]}${trailingDigits}`);
  } else {
    if (trailingDigits.length > 2) return null;
    decimals = trailingDigits.padEnd(2, "0").slice(0, 2);
  }

  const priceMinor = whole * 100 + Number(decimals || "0");
  if (priceMinor < 4_000 || priceMinor > 1_000_000) return null;
  return {
    priceMinor,
    priceKind: match[1] ? "from" : "exact",
  };
}

function looksLikeTitle(value: string): boolean {
  const title = normalizeLine(value);
  if (!title || title.length < 2 || title.length > 180 || !/\p{L}/u.test(title)) return false;
  if (isSectionBoundary(title) || PRICE_LINE.test(title) || UI_LABEL.test(title)) return false;
  if (/^(?:©|™|https?:\/\/|www\.|\d+(?:[.,]\d+)?\s*(?:l|cl|ml|kg)\b)/iu.test(title)) return false;
  if (/\b(?:liter|kilogram)\s*=/iu.test(title)) return false;
  const words = title.split(/\s+/).filter(Boolean);
  if (words.length > 12 || /[.!?]$/u.test(title)) return false;
  if (DESCRIPTION_LEAD.test(title) && words.length >= 6) return false;
  return true;
}

export function recoverFirstCardAfterPlainFoodSections(visibleText: string): readonly MenuObservedItem[] {
  const lines = visibleText.split("\n").map(normalizeLine).filter(Boolean);
  const recovered = new Map<string, MenuObservedItem>();

  for (let sectionIndex = 0; sectionIndex < lines.length; sectionIndex += 1) {
    const rawSection = lines[sectionIndex] ?? "";
    const sectionLabel = normalizedSectionLabel(rawSection);
    if (!FOOD_SECTION_LABEL.test(sectionLabel)) continue;

    let title: { name: string; position: number } | null = null;
    const scanEnd = Math.min(lines.length, sectionIndex + 30);

    for (let index = sectionIndex + 1; index < scanEnd; index += 1) {
      const line = lines[index] ?? "";
      if (isSectionBoundary(line)) break;

      const price = parsePrice(line);
      if (price) {
        if (!title) break;
        const sourceKey = createMenuItemSourceKey(title.name);
        recovered.set(sourceKey, {
          sourceKey,
          name: title.name,
          normalizedName: normalizeDishName(title.name),
          description: null,
          sectionName: null,
          priceMinor: price.priceMinor,
          priceKind: price.priceKind,
          priceMaxMinor: null,
          currency: "NOK",
          position: title.position,
          extractionMethod: "html_heuristic",
          confidence: 0.95,
          sourceExcerpt: lines.slice(title.position, index + 1).join(" — ").slice(0, 1000),
        });
        break;
      }

      if (!title && looksLikeTitle(line)) {
        title = { name: line, position: index };
      }
    }
  }

  return [...recovered.values()].sort((a, b) => a.position - b.position);
}
