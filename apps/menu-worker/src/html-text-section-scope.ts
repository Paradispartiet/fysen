import {
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";
import {
  filterHtmlBeverageSectionItemsWithScopedProvenance as filterHtmlBeverageSectionItemsWithScopedProvenanceBase,
  filterPlainTextBeverageSectionItems,
} from "./html-text-section-scope-base.js";

export * from "./html-text-section-scope-base.js";

export const HTML_TEXT_SECTION_SCOPE_VERSION = "text-section-scope-v15";

const SOURCE_EXCERPT_SEPARATOR = /\s+—\s+/u;
const DIRECT_SOURCE_PRICE =
  /^(?:(?:fra|from)\s*)?(?:(?:NOK|kr\.?)\s*)?[1-9]\d{0,3}(?:[.,]\d{1,2})?\s*(?:,-|kr\.?|NOK)?$/iu;
const ALLERGEN_CODE_ONLY =
  /^\(\s*[a-z]{1,4}\d*\+?(?:\s*[,/]\s*[a-z]{1,4}\d*\+?)*\s*\)\.?$/iu;
const DESCRIPTION_PHRASE =
  /\b(?:serveres(?:\s+med)?|servert(?:\s+med)?)\b/iu;

function hasDirectAllergenPriceProvenance(item: MenuObservedItem): boolean {
  if (!DESCRIPTION_PHRASE.test(item.name)) return false;
  const sourceExcerpt = item.sourceExcerpt?.trim() ?? "";
  if (!sourceExcerpt) return false;
  const segments = sourceExcerpt
    .split(SOURCE_EXCERPT_SEPARATOR)
    .map((segment) => segment.normalize("NFKC").replace(/\p{Cf}/gu, "").replace(/\s+/g, " ").trim())
    .filter(Boolean);
  if (segments.length < 3) return false;
  if (normalizeDishName(segments[0] ?? "") !== item.normalizedName) return false;
  const directPrice = segments[segments.length - 1] ?? "";
  if (!DIRECT_SOURCE_PRICE.test(directPrice)) return false;
  return segments.slice(1, -1).every((segment) => ALLERGEN_CODE_ONLY.test(segment));
}

export function filterHtmlBeverageSectionItemsWithScopedProvenance(
  items: readonly MenuObservedItem[],
  scopedVisibleText: string,
  fullVisibleText: string,
): readonly MenuObservedItem[] {
  const filtered = filterHtmlBeverageSectionItemsWithScopedProvenanceBase(
    items,
    scopedVisibleText,
    fullVisibleText,
  );
  if (filtered.length === items.length) return filtered;

  const included = new Set(filtered.map((item) => item.sourceKey));
  const recoverable = items.filter(
    (item) => !included.has(item.sourceKey) && hasDirectAllergenPriceProvenance(item),
  );
  if (recoverable.length === 0) return filtered;

  const recovered = filterPlainTextBeverageSectionItems(
    recoverable,
    fullVisibleText,
    { matchTrailingAllergenCodes: true },
  );
  if (recovered.length === 0) return filtered;

  const unique = new Map<string, MenuObservedItem>();
  for (const item of filtered) unique.set(item.sourceKey, item);
  for (const item of recovered) unique.set(item.sourceKey, item);
  return [...unique.values()].sort((left, right) => left.position - right.position);
}
