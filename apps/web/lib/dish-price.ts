import type { DishSearchResult } from "@fysen/contracts";

function formatNokAmount(priceMinor: number): string {
  return new Intl.NumberFormat("nb-NO", {
    maximumFractionDigits: priceMinor % 100 === 0 ? 0 : 2,
  }).format(priceMinor / 100);
}

function formatExactPrice(priceMinor: number, currency: string): string {
  if (currency === "NOK") return `${formatNokAmount(priceMinor)} kr`;

  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency,
    maximumFractionDigits: priceMinor % 100 === 0 ? 0 : 2,
  }).format(priceMinor / 100);
}

export function formatDishPrice(dish: DishSearchResult["dish"]): string {
  if (dish.priceMinor === null) return "Pris ikke oppgitt";

  if (dish.priceKind === "from") {
    return `fra ${formatExactPrice(dish.priceMinor, dish.currency)}`;
  }

  if (dish.priceKind === "multiple" && dish.priceMaxMinor !== null) {
    if (dish.currency === "NOK") {
      return `${formatNokAmount(dish.priceMinor)}–${formatNokAmount(dish.priceMaxMinor)} kr`;
    }
    return `${formatExactPrice(dish.priceMinor, dish.currency)}–${formatExactPrice(dish.priceMaxMinor, dish.currency)}`;
  }

  return formatExactPrice(dish.priceMinor, dish.currency);
}
