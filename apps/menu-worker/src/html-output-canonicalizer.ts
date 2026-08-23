import { normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";

export const HTML_OUTPUT_CANONICALIZER_VERSION = "output-canonical-v3";

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

function isOutputNoiseLabel(item: MenuObservedItem): boolean {
  const name = item.name.trim();
  return (
    BADGE_ONLY_ITEM.test(name) ||
    BRANDED_MENU_SECTION_ITEM.test(name) ||
    COMMON_FOOD_SECTION_ITEM.test(name) ||
    UPGRADE_SECTION_ITEM.test(name) ||
    SHORT_ALLERGEN_CODE_ITEM.test(name) ||
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
      !isAddonScopedDuplicate(item, labelFilteredItems),
  );
}
