import type { DishBrowseItem } from "@fysen/contracts/dish-browse";

// Source names, canonical IDs and search queries are deliberately untouched.
// The public browse list alone uses alphabetic display labels and sorts on them.
export function browseDishDisplayName(value: string): string {
  const normalized = value.normalize("NFKC")
    .replace(/[\uFE00-\uFE0F\u200C\u200D\u20E3]/gu, "");

  // Strip menu quantities as a unit, not just their number ("2 stk", "150g").
  const withoutQuantities = normalized.replace(
    /(?:\p{N}+(?:[.,/⁄\-–]\p{N}+)*\s*)+(?:stk|stykker|pcs|pieces?|biter|kg|g|mg|ml|cl|l|pers(?:oner)?)(?!\p{L})/giu,
    " ",
  );

  // "4ost" still has a useful word; codes like "7a" and "A5" do not.
  const withoutNumericCodes = withoutQuantities
    .replace(/(?<!\p{L})\p{N}+(?=\p{L}{3,}(?![\p{L}\p{N}]))/gu, "")
    .replace(/[\p{L}\p{N}]*\p{N}[\p{L}\p{N}]*/gu, " ");

  // Retain Unicode letters and combining accents, but no digits, symbols,
  // emoji or punctuation anywhere in the visible browse title.
  return withoutNumericCodes
    .replace(/[^\p{L}\p{M}]+/gu, " ")
    .replace(/\s+(?:RECOMMENDED|ANBEFALT)$/iu, "")
    .replace(/\s+/gu, " ")
    .trim();
}

const dishNameCollator = new Intl.Collator("nb-NO", { sensitivity: "base" });

export function sortBrowseDishesForDisplay(items: readonly DishBrowseItem[]): DishBrowseItem[] {
  return items
    .map((item) => ({ item, displayName: browseDishDisplayName(item.name) }))
    .filter((entry) => entry.displayName.length > 0)
    .sort((left, right) =>
      dishNameCollator.compare(left.displayName, right.displayName)
      || dishNameCollator.compare(left.item.name, right.item.name)
      || left.item.id.localeCompare(right.item.id),
    )
    .map(({ item }) => item);
}
