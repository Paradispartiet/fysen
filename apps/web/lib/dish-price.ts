import type { DishSearchResult } from "@fysen/contracts";
import type { PreviewLocale } from "./locale-messages.ts";
import { locales } from "./locales.ts";

export const priceLabels = {
  "nb": [
    "Pris ikke oppgitt",
    "fra",
    "Flere priser fra"
  ],
  "nn": [
    "Pris ikkje oppgjeven",
    "frå",
    "Fleire prisar frå"
  ],
  "sv": [
    "Pris ej angivet",
    "från",
    "Flera priser från"
  ],
  "da": [
    "Pris ikke oplyst",
    "fra",
    "Flere priser fra"
  ],
  "fi": [
    "Hintaa ei ilmoitettu",
    "alkaen",
    "Useita hintoja, alkaen"
  ],
  "is": [
    "Verð ekki gefið upp",
    "frá",
    "Nokkur verð, frá"
  ],
  "en": [
    "Price not listed",
    "from",
    "Multiple prices from"
  ]
} as const;

function formatNokAmount(priceMinor: number): string {
  return new Intl.NumberFormat("nb-NO", {
    maximumFractionDigits: priceMinor % 100 === 0 ? 0 : 2,
  }).format(priceMinor / 100);
}

function formatExactPrice(priceMinor: number, currency: string, locale: PreviewLocale): string {
  if (currency === "NOK" && locale === "nb") return `${formatNokAmount(priceMinor)} kr`;

  return new Intl.NumberFormat(locales[locale].intl, {
    style: "currency",
    currency,
    maximumFractionDigits: priceMinor % 100 === 0 ? 0 : 2,
  }).format(priceMinor / 100);
}

export function formatDishPrice(dish: Pick<DishSearchResult["dish"], "priceMinor" | "priceKind" | "priceMaxMinor" | "currency">, locale: PreviewLocale = "nb"): string {
  if (dish.priceMinor === null) return priceLabels[locale][0];

  if (dish.priceKind === "from") {
    return `${priceLabels[locale][1]} ${formatExactPrice(dish.priceMinor, dish.currency, locale)}`;
  }

  if (dish.priceKind === "multiple" && dish.priceMaxMinor !== null) {
    if (dish.currency === "NOK" && locale === "nb") {
      return `${formatNokAmount(dish.priceMinor)}–${formatNokAmount(dish.priceMaxMinor)} kr`;
    }
    return `${formatExactPrice(dish.priceMinor, dish.currency, locale)}–${formatExactPrice(dish.priceMaxMinor, dish.currency, locale)}`;
  }

  return formatExactPrice(dish.priceMinor, dish.currency, locale);
}
