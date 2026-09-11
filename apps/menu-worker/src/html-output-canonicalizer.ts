import { normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";

export const HTML_OUTPUT_CANONICALIZER_VERSION = "output-canonical-v10";

const SOURCE_EXCERPT_SEPARATOR = /\s+—\s+/u;
const ADDON_SECTION_HINT =
  /^(?:add|with|legg\s+til|med)\b.*(?:\+\s*(?:kr\.?\s*)?\d+|\b\d+\s*(?:,-|kr\.?|nok)(?:\s|$))/iu;
const BADGE_ONLY_ITEM = /^(?:veg(?:etarian)?(?:\s+spicy)?|spicy)$/iu;
const BRANDED_MENU_SECTION_ITEM =
  /^(?:[A-ZÆØÅ]{2,24}\s+)(?:RAW|MAKI|TACO|SMÅRETTER|SALATER|VEGANSK|SHARING)$/u;
const PER_PERSON_PRICE_DISPLAY_ONLY_ITEM =
  /^(?:(?:nok|kr\.?)\s*)?[1-9]\d{1,3}(?:[.,]\d{1,2})?\s*,?[–—-]\s+per\s+(?:person|pers\.?)$/iu;
const DAILY_MENU_LABEL_ITEM =
  /^dagens\s+(?:veganske|vegetariske)\s+meny$/iu;
const COMMON_FOOD_SECTION_ITEM = /^(?:dumplings?|proteins?)$/iu;
const UPGRADE_SECTION_ITEM =
  /^(?:upgrades?\s*(?:&|and)\s*extras?|give\s+me\s+an\s+upgrade|select\s+your\s+topping!?)$/iu;
const SHORT_ALLERGEN_CODE_ITEM = /^[A-ZÆØÅ]{1,2}$/u;
const MULTI_PRICE_DISPLAY_ITEM =
  /^(?:(?:kr\.?|nok)\s*)?[1-9]\d{1,3}\s*(?:(?:piece|pieces|pcs?|stk)\s*)?\/\s*(?:(?:kr\.?|nok)\s*)?[1-9]\d{1,3}\b/iu;
const SUPPLEMENT_LABEL_ITEM = /^(?:supplement|tillegg)\s*:?$/iu;
const WINE_PAIRING_LABEL_ITEM =
  /^(?:wine\s+pairing(?:\s+nok)?|vinpakke(?:\s+nok)?)$/iu;
const COURSE_PACKAGE_LABEL_ITEM =
  /^(?:\d+\s*[- ]?(?:course(?:\s+menu)?|retters?\s+meny))(?:\s*\/\/\s*\d+\s*[- ]?(?:course(?:\s+menu)?|retters?\s+meny))?(?:\s+kr)?$/iu;
const COMPONENT_QUANTITY_LABEL_ITEM =
  /^\d+\s+(?:types?|pieces?|kinds?)\s+of\b/iu;
const TEMPORARY_CLOSURE_NOTICE_ITEM =
  /\b(?:sommerlukket|feriestengt|midlertidig\s+stengt|temporarily\s+closed|closed)\b.*\b\d{1,2}[./-]\d{1,2}/iu;

const PRICE_ONLY_ITEM = /^(?:kr\.?|nok)\s*[1-9]\d{1,3}(?:[.,]\d{1,2})?$/iu;
const SIZE_ONLY_ITEM = /^(?:small|large|liten|stor)$/iu;
const QUANTITY_ONLY_ITEM = /^\d+(?:[.,]\d+)?\s*(?:gr\.?|g|kg|stk|pcs?)$/iu;
const DATE_NOTICE_ITEM = /^(?:gjelder|gyldig|valid)\b.*\b\d{1,2}\.?\s+[\p{L}]+/iu;
const COPYRIGHT_METADATA_ITEM = /^copyright\s*©?/iu;
const ADDRESS_METADATA_ITEM =
  /^(?:[A-ZÆØÅ][\p{L}.-]+(?:veien|gata|gaten|gate|allé|alle|plass|torget))$/u;
const COMMON_DISPLAY_LABEL_ITEM =
  /^(?:kalde?\s+forretter|sideretter|for\s+hele\s+bordet)$/iu;
const SHARE_DISPLAY_ITEM =
  /^(?:større\s+cuts?\s+laget\s+for\s+deling.*)$/iu;
const TRAILING_INCOMPLETE_MULTI_PRICE_ITEM = /\b[1-9]\d{1,3}\s*\/\s*$/u;
const QUANTITY_PRICE_SPLIT_ITEM =
  /^\d+\s*(?:stk|pcs?|pieces?)\s+[1-9]\d{1,3}\s*(?:kr\.?|nok)?\s*\/\s*\d+\s*(?:stk|pcs?|pieces?)?$/iu;
const WINE_VINTAGE_ITEM =
  /\b(?:gew(?:ü|u)r(?:z|s)traminer|riesling|chardonnay|pinot\s+noir|cabernet|merlot|sauvignon)\b.*\b(?:19|20)\d{2}\b/iu;
const BARE_UNIT_ITEM = /^(?:gr\.?|gram|grams?|stk|pcs?)$/iu;
const ALLERGEN_DESCRIPTION_PAREN =
  /\([^)]*\b(?:milk|egg|wheat|gluten|sulfite|sulphite|melk|egg|hvete|skalldyr|shellfish|nuts?|nøtter?)\b[^)]*\)$/iu;


function samePrice(
  left: Pick<MenuObservedItem, "priceMinor">,
  right: Pick<MenuObservedItem, "priceMinor">,
): boolean {
  return (
    left.priceMinor !== null &&
    right.priceMinor !== null &&
    left.priceMinor === right.priceMinor
  );
}

function mirroredPromotionalNames(
  items: readonly MenuObservedItem[],
): ReadonlySet<string> {
  const byName = new Map<string, MenuObservedItem[]>();
  for (const item of items) {
    const group = byName.get(item.normalizedName) ?? [];
    group.push(item);
    byName.set(item.normalizedName, group);
  }

  const mirrored = new Set<string>();
  for (const [normalizedName, group] of byName) {
    if (group.length < 3) continue;
    const sectionNames = group
      .map((item) => item.sectionName)
      .filter((value): value is string => Boolean(value));
    if (sectionNames.length !== group.length) continue;
    if (new Set(sectionNames.map(normalizeDishName)).size < 3) continue;

    const everyEntryMirrorsPricedSectionDish = group.every((item) => {
      const sectionName = item.sectionName;
      if (!sectionName) return false;
      const normalizedSectionName = normalizeDishName(sectionName);
      if (!normalizedSectionName || normalizedSectionName === normalizedName)
        return false;
      return items.some(
        (candidate) =>
          candidate !== item &&
          candidate.normalizedName === normalizedSectionName &&
          samePrice(candidate, item),
      );
    });
    if (everyEntryMirrorsPricedSectionDish) mirrored.add(normalizedName);
  }
  return mirrored;
}

function isNumericPrefixSuffixFragment(
  item: MenuObservedItem,
  items: readonly MenuObservedItem[],
): boolean {
  const excerptHead = item.sourceExcerpt
    ?.split(SOURCE_EXCERPT_SEPARATOR)[0]
    ?.trim();
  if (!excerptHead) return false;
  if (!/^\d+\s+/u.test(excerptHead)) return false;
  const normalizedExcerptHead = normalizeDishName(excerptHead);
  if (!/^\d+\s+/u.test(normalizedExcerptHead)) return false;

  return items.some((candidate) => {
    if (candidate === item || !samePrice(candidate, item)) return false;
    if (!/^\d+\s+/u.test(candidate.normalizedName)) return false;
    if (candidate.normalizedName !== normalizedExcerptHead) return false;
    return (
      candidate.normalizedName.length > item.normalizedName.length + 2 &&
      candidate.normalizedName.endsWith(` ${item.normalizedName}`)
    );
  });
}

function isNumericTitleSuffixMisreadAsPrice(
  item: MenuObservedItem,
  items: readonly MenuObservedItem[],
): boolean {
  if (item.priceMinor === null || item.priceMinor % 100 !== 0) return false;
  const numericSuffix = String(item.priceMinor / 100);
  if (!/^[1-9]\d?$/u.test(numericSuffix)) return false;
  const expectedFullName = `${item.normalizedName} ${numericSuffix}`;
  return items.some(
    (candidate) =>
      candidate !== item && candidate.normalizedName === expectedFullName,
  );
}

function isAddonScopedDuplicate(
  item: MenuObservedItem,
  items: readonly MenuObservedItem[],
): boolean {
  if (!item.sectionName || !ADDON_SECTION_HINT.test(item.sectionName))
    return false;
  return items.some(
    (candidate) =>
      candidate !== item &&
      candidate.normalizedName === item.normalizedName &&
      samePrice(candidate, item) &&
      !ADDON_SECTION_HINT.test(candidate.sectionName ?? ""),
  );
}

export function isLikelySamePriceCardFragment(
  item: Pick<MenuObservedItem, "name">,
): boolean {
  const name = item.name.trim();
  const words = name.split(/\s+/u).filter(Boolean);
  return (
    /^[a-zæøå]/u.test(name) ||
    (words.length <= 6 &&
      (/[;,]/u.test(name) ||
        /\b(?:saus|sauce|dressing|beurre\s+blanc|gastrix|sorbet|emulsjon|emulsion)\b/iu.test(
          name,
        )))
  );
}

function excerptParts(item: MenuObservedItem): readonly string[] {
  return (item.sourceExcerpt ?? "")
    .split(SOURCE_EXCERPT_SEPARATOR)
    .map((part) => normalizeDishName(part.trim()))
    .filter(Boolean);
}

function isSamePriceExcerptFragment(
  item: MenuObservedItem,
  items: readonly MenuObservedItem[],
): boolean {
  if (!isLikelySamePriceCardFragment(item)) return false;
  return items.some((candidate) => {
    if (
      candidate === item ||
      !samePrice(candidate, item) ||
      candidate.normalizedName === item.normalizedName ||
      isLikelySamePriceCardFragment(candidate)
    )
      return false;
    const parts = excerptParts(candidate);
    if (parts.length < 2) return false;
    if (parts[0] !== candidate.normalizedName) return false;
    return parts.slice(1).includes(item.normalizedName);
  });
}

function isHighPricedComponentQuantity(item: MenuObservedItem): boolean {
  return Boolean(
    item.priceMinor !== null &&
      item.priceMinor >= 100_000 &&
      COMPONENT_QUANTITY_LABEL_ITEM.test(item.name.trim()),
  );
}

function isLowInformationSamePriceFragment(
  item: MenuObservedItem,
  items: readonly MenuObservedItem[],
): boolean {
  const name = item.name.trim();
  const words = name.split(/\s+/u).filter(Boolean);
  const fragmentLike =
    /^[a-zæøå]/u.test(name) &&
    words.length <= 6 &&
    (words.length === 1 ||
      /(?:cream|majones|mayonnaise|velout[eé]|pur[eé]|toast|potet|potato|hasselback|pommes|saus|sauce|dressing)/iu.test(name));
  if (!fragmentLike || item.priceMinor === null) return false;
  const titleCaseDensity = items.filter((candidate) =>
    /^[A-ZÆØÅ]/u.test(candidate.name.trim()),
  ).length;
  if (titleCaseDensity >= 4) return true;
  return items.some(
    (candidate) =>
      candidate !== item &&
      samePrice(candidate, item) &&
      !/^[a-zæøå]/u.test(candidate.name.trim()) &&
      candidate.name.trim().split(/\s+/u).length >= 2,
  );
}

function isExtremeDuplicatePriceOutlier(
  item: MenuObservedItem,
  items: readonly MenuObservedItem[],
): boolean {
  if (item.priceMinor === null || item.priceMinor < 50_000) return false;
  const sameNamePrices = items
    .filter(
      (candidate) =>
        candidate !== item &&
        candidate.normalizedName === item.normalizedName &&
        candidate.priceMinor !== null,
    )
    .map((candidate) => candidate.priceMinor as number);
  if (sameNamePrices.length === 0) return false;
  const lowest = Math.min(...sameNamePrices);
  return lowest > 0 && item.priceMinor >= lowest * 4;
}

function isLowercaseAllergenDescriptionItem(name: string): boolean {
  return /^[a-zæøå]/u.test(name) && ALLERGEN_DESCRIPTION_PAREN.test(name);
}

function isOutputNoiseLabel(item: MenuObservedItem): boolean {
  const name = item.name.trim();
  return (
    BADGE_ONLY_ITEM.test(name) ||
    BRANDED_MENU_SECTION_ITEM.test(name) ||
    COMMON_FOOD_SECTION_ITEM.test(name) ||
    UPGRADE_SECTION_ITEM.test(name) ||
    SHORT_ALLERGEN_CODE_ITEM.test(name) ||
    MULTI_PRICE_DISPLAY_ITEM.test(name) ||
    SUPPLEMENT_LABEL_ITEM.test(name) ||
    WINE_PAIRING_LABEL_ITEM.test(name) ||
    COURSE_PACKAGE_LABEL_ITEM.test(name) ||
    TEMPORARY_CLOSURE_NOTICE_ITEM.test(name) ||
    PRICE_ONLY_ITEM.test(name) ||
    SIZE_ONLY_ITEM.test(name) ||
    QUANTITY_ONLY_ITEM.test(name) ||
    DATE_NOTICE_ITEM.test(name) ||
    COPYRIGHT_METADATA_ITEM.test(name) ||
    ADDRESS_METADATA_ITEM.test(name) ||
    COMMON_DISPLAY_LABEL_ITEM.test(name) ||
    SHARE_DISPLAY_ITEM.test(name) ||
    TRAILING_INCOMPLETE_MULTI_PRICE_ITEM.test(name) ||
    QUANTITY_PRICE_SPLIT_ITEM.test(name) ||
    WINE_VINTAGE_ITEM.test(name) ||
    BARE_UNIT_ITEM.test(name) ||
    isLowercaseAllergenDescriptionItem(name) ||
    PER_PERSON_PRICE_DISPLAY_ONLY_ITEM.test(name) ||
    DAILY_MENU_LABEL_ITEM.test(name)
  );
}

export function canonicalizeHtmlOutputItems(
  items: readonly MenuObservedItem[],
): readonly MenuObservedItem[] {
  const labelFilteredItems = items.filter((item) => !isOutputNoiseLabel(item));
  if (labelFilteredItems.length < 2) return labelFilteredItems;
  const mirroredNames = mirroredPromotionalNames(labelFilteredItems);
  return labelFilteredItems.filter(
    (item) =>
      !mirroredNames.has(item.normalizedName) &&
      !isNumericPrefixSuffixFragment(item, labelFilteredItems) &&
      !isNumericTitleSuffixMisreadAsPrice(item, labelFilteredItems) &&
      !isAddonScopedDuplicate(item, labelFilteredItems) &&
      !isHighPricedComponentQuantity(item) &&
      !isSamePriceExcerptFragment(item, labelFilteredItems) &&
      !isLowInformationSamePriceFragment(item, labelFilteredItems) &&
      !isExtremeDuplicatePriceOutlier(item, labelFilteredItems),
  );
}
