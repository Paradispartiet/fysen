import {
  normalizeDishName,
  normalizeMenuPriceSemantics,
  type MenuObservedItem,
} from "@fysen/menu-core";

export const MENU_SOURCE_KEY_CANONICALIZER_VERSION = "source-key-v1";

function normalizeOptionalText(value: string | null): string | null {
  if (!value) return null;
  const normalized = value.normalize("NFKC").replace(/\s+/g, " ").trim();
  return normalized || null;
}

function sameCanonicalObservation(
  left: MenuObservedItem,
  right: MenuObservedItem,
): boolean {
  if (normalizeDishName(left.name) !== normalizeDishName(right.name)) return false;
  if (
    normalizeDishName(left.sectionName ?? "") !==
    normalizeDishName(right.sectionName ?? "")
  ) {
    return false;
  }

  const leftPrice = normalizeMenuPriceSemantics(left);
  const rightPrice = normalizeMenuPriceSemantics(right);
  if (
    leftPrice.priceMinor !== rightPrice.priceMinor ||
    leftPrice.priceKind !== rightPrice.priceKind ||
    leftPrice.priceMaxMinor !== rightPrice.priceMaxMinor ||
    left.currency.toUpperCase() !== right.currency.toUpperCase()
  ) {
    return false;
  }

  const leftDescription = normalizeOptionalText(left.description);
  const rightDescription = normalizeOptionalText(right.description);
  return (
    leftDescription === null ||
    rightDescription === null ||
    leftDescription === rightDescription
  );
}

function preferObservation(
  left: MenuObservedItem,
  right: MenuObservedItem,
): MenuObservedItem {
  const leftDescription = normalizeOptionalText(left.description);
  const rightDescription = normalizeOptionalText(right.description);
  if (leftDescription === null && rightDescription !== null) return right;
  if (rightDescription === null && leftDescription !== null) return left;
  if (right.confidence !== left.confidence) {
    return right.confidence > left.confidence ? right : left;
  }

  const leftExcerptLength = normalizeOptionalText(left.sourceExcerpt)?.length ?? 0;
  const rightExcerptLength = normalizeOptionalText(right.sourceExcerpt)?.length ?? 0;
  if (rightExcerptLength !== leftExcerptLength) {
    return rightExcerptLength > leftExcerptLength ? right : left;
  }
  return right.position < left.position ? right : left;
}

function observationSummary(item: MenuObservedItem): string {
  const price = normalizeMenuPriceSemantics(item);
  const max = price.priceMaxMinor === null ? "" : `-${price.priceMaxMinor}`;
  return `${item.name} [${item.sectionName ?? "no section"}] ${price.priceKind}:${price.priceMinor ?? "null"}${max} ${item.currency}`;
}

export class ConflictingMenuSourceKeyError extends Error {
  constructor(
    readonly sourceKey: string,
    readonly first: MenuObservedItem,
    readonly second: MenuObservedItem,
  ) {
    super(
      `Conflicting observations share menu source key ${sourceKey}: ${observationSummary(first)} <> ${observationSummary(second)}`,
    );
    this.name = "ConflictingMenuSourceKeyError";
  }
}

export function canonicalizeUniqueMenuSourceKeys(
  items: readonly MenuObservedItem[],
): readonly MenuObservedItem[] {
  const unique = new Map<string, MenuObservedItem>();

  for (const item of items) {
    const existing = unique.get(item.sourceKey);
    if (!existing) {
      unique.set(item.sourceKey, item);
      continue;
    }
    if (!sameCanonicalObservation(existing, item)) {
      throw new ConflictingMenuSourceKeyError(item.sourceKey, existing, item);
    }
    unique.set(item.sourceKey, preferObservation(existing, item));
  }

  return [...unique.values()].sort((left, right) => left.position - right.position);
}
