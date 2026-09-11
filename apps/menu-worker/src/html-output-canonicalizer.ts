import { normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";
import { looksLikeHtmlDescription } from "./html-description-title-recovery.js";

export const HTML_OUTPUT_CANONICALIZER_VERSION = "output-canonical-v7";

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
  /^(?:\d+\s*[- ]?course(?:\s+menu)?|\d+\s*[- ]?retters?\s+meny)\s*\/?\/?$/iu;
const COMPONENT_QUANTITY_LABEL_ITEM =
  /^\d+\s+(?:types?|pieces?|kinds?)\s+of\b/iu;
const TEMPORARY_CLOSURE_NOTICE_ITEM =
  /\b(?:sommerlukket|feriestengt|midlertidig\s+stengt|temporarily\s+closed|closed)\b.*\b\d{1,2}[./-]\d{1,2}/iu;
const PREPARATION_LED_DISH_TITLE =
  /^(?:bakt|grillet|stekt|fritert|braisert|røkt|dampet|baked|grilled|fried|braised|smoked|steamed)\s+\S+(?:\s+\S+){0,5}$/iu;

function isPreparationLedDishTitle(value: string): boolean {
  const name = value.trim();
  if (!PREPARATION_LED_DISH_TITLE.test(name)) return false;
  const letters = name.replace(/[^\p{L}]+/gu, "");
  if (!letters) return false;
  const allUpper = letters === letters.toLocaleUpperCase("nb-NO");
  const words = name.split(/\s+/u).filter(Boolean);
  const firstLetter = name.match(/\p{L}/u)?.[0] ?? "";
  const startsUpper =
    Boolean(firstLetter) &&
    firstLetter === firstLetter.toLocaleUpperCase("nb-NO");
  return allUpper || (startsUpper && words.length <= 4);
}

export function isStrongCanonicalDishTitle(value: string): boolean {
  const name = value.trim();
  const letters = name.replace(/[^\p{L}]+/gu, "");
  if (!letters) return false;
  const allUpper =
    letters.length >= 4 && letters === letters.toLocaleUpperCase("nb-NO");
  const firstLetter = name.match(/\p{L}/u)?.[0] ?? "";
  const startsUpper =
    Boolean(firstLetter) &&
    firstLetter === firstLetter.toLocaleUpperCase("nb-NO");
  const words = name.split(/\s+/u).filter(Boolean);
  return (
    allUpper ||
    isPreparationLedDishTitle(name) ||
    (startsUpper && words.length <= 4 && !looksLikeHtmlDescription(name))
  );
}

function isLowercaseMultiword(value: string): boolean {
  const name = value.trim();
  const firstLetter = name.match(/\p{L}/u)?.[0] ?? "";
  if (!firstLetter || firstLetter !== firstLetter.toLocaleLowerCase("nb-NO"))
    return false;
  return name.split(/\s+/u).filter(Boolean).length >= 2;
}

function looksLikeLowercaseSamePriceProse(value: string): boolean {
  const name = value.trim();
  if (!isLowercaseMultiword(name)) return false;
  const words = name.split(/\s+/u).filter(Boolean);
  return (
    words.length >= 5 &&
    (/[,;]/u.test(name) || /\b(?:and|with|og|med)\b/iu.test(name))
  );
}

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

function excerptParts(item: MenuObservedItem): readonly string[] {
  return (item.sourceExcerpt ?? "")
    .split(SOURCE_EXCERPT_SEPARATOR)
    .map((part) => normalizeDishName(part.trim()))
    .filter(Boolean);
}

function isStrictExcerptSuffix(
  suffix: readonly string[],
  full: readonly string[],
): boolean {
  if (suffix.length === 0 || suffix.length >= full.length) return false;
  const offset = full.length - suffix.length;
  return suffix.every((part, index) => full[offset + index] === part);
}

export function isUnambiguousSamePriceExcerptFragment(
  fragment: MenuObservedItem,
  candidate: MenuObservedItem,
): boolean {
  if (
    candidate === fragment ||
    !samePrice(candidate, fragment) ||
    candidate.normalizedName === fragment.normalizedName
  )
    return false;

  // Never demote an already strong canonical title merely because a trailing
  // recovery candidate contains it in the same-price card.
  if (isStrongCanonicalDishTitle(fragment.name)) return false;

  // A structurally nearby line is not stronger evidence when the line itself
  // is semantically description-like. This protects real dish titles such as
  // a named bánh mì from being replaced by its ingredient sentence.
  if (
    looksLikeHtmlDescription(candidate.name) &&
    !isPreparationLedDishTitle(candidate.name)
  )
    return false;

  const fragmentParts = excerptParts(fragment);
  const candidateParts = excerptParts(candidate);
  const fragmentStartsTooEarly =
    fragmentParts[0] === fragment.normalizedName &&
    candidateParts[0] === candidate.normalizedName &&
    isStrictExcerptSuffix(candidateParts, fragmentParts) &&
    candidate.position >= fragment.position;

  // If one recovery path starts exactly one or more lines too early while a
  // second path independently recovers the complete same-price suffix, prefer
  // the narrower title unless the broader head is itself a strong dish title.
  if (fragmentStartsTooEarly) return true;

  // Longer lower-case prose is description evidence when it follows a
  // stronger same-price title in source order, even if the two recovery paths
  // do not carry identical excerpts.
  if (
    looksLikeLowercaseSamePriceProse(fragment.name) &&
    candidate.position < fragment.position
  )
    return true;

  if (
    candidateParts.length < 2 ||
    candidateParts[0] !== candidate.normalizedName ||
    !candidateParts.slice(1).includes(fragment.normalizedName)
  )
    return false;

  // Lower-case multiword text explicitly embedded after a stronger same-price
  // candidate is component/description evidence. Requiring excerpt containment
  // prevents price coincidence alone from filtering legitimate lower-case dish
  // names.
  if (isLowercaseMultiword(fragment.name)) return true;

  // Reciprocal excerpts are ambiguous unless source order identifies the
  // leading title. In a normal card the canonical dish title precedes its
  // same-price description/sauce fragment. Prefer that earlier non-description
  // candidate; otherwise preserve both fail-closed.
  const reciprocal =
    fragmentParts.length >= 2 &&
    fragmentParts[0] === fragment.normalizedName &&
    fragmentParts.slice(1).includes(candidate.normalizedName);

  if (!reciprocal) return true;
  return candidate.position < fragment.position;
}

function isSamePriceExcerptFragment(
  item: MenuObservedItem,
  items: readonly MenuObservedItem[],
): boolean {
  return items.some((candidate) =>
    isUnambiguousSamePriceExcerptFragment(item, candidate),
  );
}

function isHighPricedComponentQuantity(item: MenuObservedItem): boolean {
  return Boolean(
    item.priceMinor !== null &&
      item.priceMinor >= 100_000 &&
      COMPONENT_QUANTITY_LABEL_ITEM.test(item.name.trim()),
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
    MULTI_PRICE_DISPLAY_ITEM.test(name) ||
    SUPPLEMENT_LABEL_ITEM.test(name) ||
    WINE_PAIRING_LABEL_ITEM.test(name) ||
    COURSE_PACKAGE_LABEL_ITEM.test(name) ||
    TEMPORARY_CLOSURE_NOTICE_ITEM.test(name) ||
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
      !isSamePriceExcerptFragment(item, labelFilteredItems),
  );
}
