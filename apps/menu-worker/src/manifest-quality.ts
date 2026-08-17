import { normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";
import type { RestaurantOnboardingManifest } from "./onboarding-manifest.js";

export type ManifestAssertionItem = Pick<
  MenuObservedItem,
  "normalizedName" | "sectionName" | "priceMinor" | "priceKind" | "priceMaxMinor"
>;

export interface ManifestMenuQualityResult {
  readonly accepted: boolean;
  readonly itemCount: number;
  readonly minimumExpectedItems: number;
  readonly missingRequiredDishes: readonly string[];
  readonly forbiddenDishesPresent: readonly string[];
}

export function dishVariantLabel(
  variant: RestaurantOnboardingManifest["qualityAssertions"]["requiredDishVariants"][number],
): string {
  const section = variant.sectionName ? ` [${variant.sectionName}]` : "";
  const price = variant.priceMinor !== undefined ? ` @ ${variant.priceMinor}` : "";
  const priceKind = variant.priceKind ? ` ${variant.priceKind}` : "";
  const priceMax = variant.priceMaxMinor !== undefined ? `..${variant.priceMaxMinor}` : "";
  return `${variant.name}${section}${price}${priceKind}${priceMax}`;
}

export function evaluateManifestMenuQuality(
  manifest: RestaurantOnboardingManifest,
  items: readonly ManifestAssertionItem[],
): ManifestMenuQualityResult {
  const normalizedNames = new Set(items.map((item) => item.normalizedName));
  const missingNames = manifest.qualityAssertions.requiredDishNames.filter(
    (name) => !normalizedNames.has(normalizeDishName(name)),
  );
  const missingVariants = manifest.qualityAssertions.requiredDishVariants
    .filter((variant) => {
      const normalizedName = normalizeDishName(variant.name);
      const normalizedSection = variant.sectionName ? normalizeDishName(variant.sectionName) : null;
      return !items.some((item) => {
        if (item.normalizedName !== normalizedName) return false;
        if (normalizedSection !== null && normalizeDishName(item.sectionName ?? "") !== normalizedSection) return false;
        if (variant.priceMinor !== undefined && item.priceMinor !== variant.priceMinor) return false;
        if (variant.priceKind !== undefined && (item.priceKind ?? "exact") !== variant.priceKind) return false;
        if (variant.priceMaxMinor !== undefined && (item.priceMaxMinor ?? null) !== variant.priceMaxMinor) return false;
        return true;
      });
    })
    .map(dishVariantLabel);

  const forbiddenDishesPresent = manifest.qualityAssertions.forbiddenDishNames.filter((name) =>
    normalizedNames.has(normalizeDishName(name)),
  );
  const missingRequiredDishes = [...missingNames, ...missingVariants];
  const itemCount = items.length;
  const minimumExpectedItems = manifest.menuSource.minimumExpectedItems;

  return {
    accepted:
      itemCount >= minimumExpectedItems &&
      missingRequiredDishes.length === 0 &&
      forbiddenDishesPresent.length === 0,
    itemCount,
    minimumExpectedItems,
    missingRequiredDishes,
    forbiddenDishesPresent,
  };
}
