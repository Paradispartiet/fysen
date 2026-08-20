import type { MenuObservedItem } from "@fysen/menu-core";

export const HTML_HEADING_RECOVERY_SUPPLEMENT_VERSION = "heading-supplement-v1";

export function supplementStrongHeadingRecovery(
  primaryItems: readonly MenuObservedItem[],
  headingItems: readonly MenuObservedItem[],
): readonly MenuObservedItem[] {
  if (headingItems.length < 4) return primaryItems;
  if (primaryItems.length > 0 && headingItems.length < Math.ceil(primaryItems.length * 0.5)) {
    return primaryItems;
  }

  const output = [...primaryItems];
  const nameCounts = new Map<string, number>();
  for (const item of primaryItems) {
    nameCounts.set(item.normalizedName, (nameCounts.get(item.normalizedName) ?? 0) + 1);
  }

  for (const candidate of headingItems) {
    if ((nameCounts.get(candidate.normalizedName) ?? 0) > 0) continue;
    output.push(candidate);
    nameCounts.set(candidate.normalizedName, 1);
  }

  return output.sort((a, b) => a.position - b.position);
}
