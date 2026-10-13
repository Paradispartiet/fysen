import type { DishBrowseItem } from "@fysen/contracts/dish-browse";

// Live menu names remain unchanged in the API and in the search links.
// Only the visible browse titles are cleaned, so leading emoji, item numbers,
// bullets and quantity labels cannot dominate the alphabetical browse list.
export function browseDishDisplayName(value: string): string {
  const initial = value.trim().replace(/^[^\p{L}\p{N}]+/u, "");
  const withoutLeadingQuantity = initial.replace(
    /^(?:\d+(?:[.,]\d+)?\s*(?:kg|g|ml|cl|l|stk|biter|pieces?|pcs|x|×|%)(?!\p{L})[^\p{L}\p{N}]*)+/iu,
    "",
  );
  // Allow any language's letters, not just ASCII/Norwegian letters.
  // Names without letters are not usable dish titles in this list.
  return withoutLeadingQuantity.replace(/^[^\p{L}]+/u, "").trim();
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
