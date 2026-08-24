import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
  type MenuPriceKind,
} from "@fysen/menu-core";

export const PUBLIC_MENU_API_EXTRACTOR_VERSION = "public-menu-api-v3";

type JsonRecord = Record<string, unknown>;

interface ParsedPrice {
  readonly priceMinor: number;
  readonly priceKind: MenuPriceKind;
  readonly priceMaxMinor: number | null;
  readonly currency: string;
}

const BEVERAGE_SECTION =
  /(?:alkohol|drikke|drinks?|beverages?|soft\s+drinks?|øl|beer|vin|wine|cava|champagne|prosecco|musserende|sparkling|sangria|cocktails?|mocktails?|cider|kaffe|coffee|\bte\b|\btea\b|avec|brennevin|spirits?|liquors?|liqueurs?|orujos?|whisk(?:e)?y|bourbon|\brom\b|\brum\b|\bgin\b|vodka|tequila|brandy|cognac|sherry|portvin|dessertvin|digestif)/iu;
const NON_DISH_SECTION =
  /(?:\bbutikk\b|\bshop\b|retail|merch(?:andise)?|gavekort|gift\s*cards?|\bdonat(?:e|ion|ions)\b|\bdonasjon(?:er)?\b|\bcharity\b|\bveldedighet\b)/iu;
const NON_DISH_PLACEHOLDER =
  /^(?:test(?:\s+button)?(?:\s*\([^)]*\))?|button(?:\s*\([^)]*\))?)$/iu;

function asRecord(value: unknown): JsonRecord | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as JsonRecord)
    : null;
}

function asArray(value: unknown): readonly unknown[] {
  return Array.isArray(value) ? value : [];
}

function normalizedText(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.normalize("NFKC").trim().replace(/\s+/gu, " ");
  return normalized.length > 0 ? normalized : null;
}

function isWeOrderOperationalParenthetical(value: string): boolean {
  const compact = value
    .normalize("NFKC")
    .toLocaleUpperCase("nb-NO")
    .replace(/[^\p{L}]/gu, "");
  return (
    compact.includes("MÅBESTILLESSOMTILLEGG") ||
    compact.includes("MUSTBEORDEREDSEPARATELY") ||
    compact.includes("ORDERSEPARATELY")
  );
}

function cleanWeOrderText(value: unknown): string | null {
  const text = normalizedText(value);
  if (!text) return null;
  const cleaned = text.replace(/\(([^()]*)\)/gu, (full, inner: string) =>
    isWeOrderOperationalParenthetical(inner) ? " " : full,
  );
  return normalizedText(cleaned);
}

function localizedText(value: unknown): string | null {
  const direct = normalizedText(value);
  if (direct) return direct;
  const entries = asArray(value)
    .map(asRecord)
    .filter((entry): entry is JsonRecord => entry !== null)
    .map((entry) => ({
      language: normalizedText(entry.language)?.toLocaleLowerCase("en-US") ?? "",
      text: normalizedText(entry.text ?? entry.name ?? entry.value),
    }))
    .filter((entry) => entry.text !== null);
  for (const language of ["nb", "no", "nn", "en"]) {
    const match = entries.find((entry) => entry.language === language);
    if (match?.text) return match.text;
  }
  return entries[0]?.text ?? null;
}

function numericAmount(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return null;
  const normalized = value.trim().replace(",", ".");
  if (!/^\d+(?:\.\d{1,2})?$/u.test(normalized)) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function directPrice(value: unknown): { priceMinor: number; currency: string } | null {
  const price = asRecord(value);
  if (!price) return null;
  const amount = numericAmount(price.amount);
  const currency = normalizedText(price.currency)?.toUpperCase() ?? null;
  if (amount === null || amount <= 0 || !currency || !/^[A-Z]{3}$/u.test(currency)) {
    return null;
  }
  const priceMinor = Math.round(amount * 100);
  if (!Number.isSafeInteger(priceMinor)) return null;
  return { priceMinor, currency };
}

function itemPrice(item: JsonRecord): ParsedPrice | null {
  const direct = directPrice(item.price);
  if (direct) {
    return {
      ...direct,
      priceKind: "exact",
      priceMaxMinor: null,
    };
  }

  const variantPrices = asArray(item.variants)
    .map(asRecord)
    .filter((variant): variant is JsonRecord => variant !== null)
    .filter((variant) => variant.availability !== "UNAVAILABLE")
    .map((variant) => directPrice(variant.price))
    .filter(
      (price): price is { priceMinor: number; currency: string } => price !== null,
    );
  if (variantPrices.length === 0) return null;
  const currencies = new Set(variantPrices.map((price) => price.currency));
  if (currencies.size !== 1) return null;
  const amounts = [...new Set(variantPrices.map((price) => price.priceMinor))].sort(
    (left, right) => left - right,
  );
  const minimum = amounts[0];
  if (minimum === undefined) return null;
  if (amounts.length === 1) {
    return {
      priceMinor: minimum,
      priceKind: "exact",
      priceMaxMinor: null,
      currency: variantPrices[0]?.currency ?? "NOK",
    };
  }
  return {
    priceMinor: minimum,
    priceKind: "multiple",
    priceMaxMinor: amounts.at(-1) ?? minimum,
    currency: variantPrices[0]?.currency ?? "NOK",
  };
}

function nokDisplayAmount(value: unknown): number | null {
  const text = normalizedText(value)?.replace(/\s+/gu, "") ?? null;
  if (!text) return null;
  const withoutPrefix = text.replace(/^kr/iu, "");
  const wholeNok = /^(\d+),-$/u.exec(withoutPrefix);
  if (wholeNok?.[1]) return Number(wholeNok[1]);
  return null;
}

function weOrderPrice(item: JsonRecord): ParsedPrice | null {
  const amount = numericAmount(item.price);
  if (amount === null) return null;
  if (amount <= 0) return null;

  const displayAmount = nokDisplayAmount(item.dPrice);
  const name = cleanWeOrderText(item.name) ?? normalizedText(item.name) ?? "unnamed item";
  if (displayAmount === null) {
    throw new Error(`Public menu API WeOrder price lacks NOK display evidence for ${name}`);
  }
  if (Math.abs(amount - displayAmount) > 0.005) {
    throw new Error(`Public menu API WeOrder numeric/display price conflict for ${name}`);
  }

  const priceMinor = Math.round(amount * 100);
  if (!Number.isSafeInteger(priceMinor)) {
    throw new Error(`Public menu API WeOrder price is outside safe integer range for ${name}`);
  }
  return {
    priceMinor,
    priceKind: "exact",
    priceMaxMinor: null,
    currency: "NOK",
  };
}

function sourceExcerpt(
  name: string,
  description: string | null,
  sectionName: string | null,
  price: ParsedPrice,
): string {
  return JSON.stringify({
    name,
    description,
    sectionName,
    priceMinor: price.priceMinor,
    priceKind: price.priceKind,
    priceMaxMinor: price.priceMaxMinor,
    currency: price.currency,
  }).slice(0, 2000);
}

function finalizeItems(items: readonly MenuObservedItem[]): readonly MenuObservedItem[] {
  const bySourceKey = new Map<string, MenuObservedItem>();
  for (const item of items) {
    const existing = bySourceKey.get(item.sourceKey);
    if (!existing) {
      bySourceKey.set(item.sourceKey, item);
      continue;
    }
    if (
      existing.priceMinor !== item.priceMinor ||
      (existing.priceKind ?? "exact") !== (item.priceKind ?? "exact") ||
      (existing.priceMaxMinor ?? null) !== (item.priceMaxMinor ?? null) ||
      existing.currency !== item.currency
    ) {
      throw new Error(
        `Public menu API exposed conflicting duplicate prices for ${item.name}`,
      );
    }
  }
  return [...bySourceKey.values()].map((item, index) => ({
    ...item,
    position: index,
  }));
}

function extractWeOrderMenu(root: JsonRecord): readonly MenuObservedItem[] | null {
  const data = asRecord(root.data);
  if (!data) return null;
  const menuId = numericAmount(data.id);
  const menuStructure = numericAmount(data.menuStructure);
  const menuVersion = normalizedText(data.menuVersion);
  const menus = asArray(data.menu);
  if (menuId === null || menuStructure === null || !menuVersion || menus.length === 0) {
    return null;
  }
  if (root.success !== true) {
    throw new Error("Public menu API WeOrder payload is not successful");
  }

  const items: MenuObservedItem[] = [];
  let recognizedFoodMenuCount = 0;
  let recognizedCategoryCount = 0;
  let recognizedEntryCount = 0;
  let position = 0;

  for (const rawMenu of menus) {
    const menu = asRecord(rawMenu);
    if (!menu) continue;
    const menuName = normalizedText(menu.name);
    const menuType = normalizedText(menu.type)?.toLocaleLowerCase("en-US") ?? null;
    const categories = asArray(menu.categories);
    if (!menuName || !menuType || categories.length === 0) continue;
    if (menuType !== "food") continue;
    recognizedFoodMenuCount += 1;

    for (const rawCategory of categories) {
      const category = asRecord(rawCategory);
      if (!category) continue;
      const categoryName = normalizedText(category.name) ?? menuName;
      const entries = asArray(category.entries);
      if (entries.length === 0) continue;
      recognizedCategoryCount += 1;
      const categoryExcluded =
        BEVERAGE_SECTION.test(categoryName) || NON_DISH_SECTION.test(categoryName);

      for (const rawEntry of entries) {
        const entry = asRecord(rawEntry);
        if (!entry) continue;
        recognizedEntryCount += 1;
        if (categoryExcluded || entry.isAlcohol === true) continue;
        const name = cleanWeOrderText(entry.name);
        if (!name || !/\p{L}/u.test(name) || NON_DISH_PLACEHOLDER.test(name)) continue;
        const price = weOrderPrice(entry);
        if (!price) continue;
        const description = cleanWeOrderText(entry.desc ?? entry.description);
        items.push({
          sourceKey: createMenuItemSourceKey(name, categoryName),
          name,
          normalizedName: normalizeDishName(name),
          description,
          sectionName: categoryName,
          priceMinor: price.priceMinor,
          priceKind: price.priceKind,
          priceMaxMinor: price.priceMaxMinor,
          currency: price.currency,
          position,
          extractionMethod: "api",
          confidence: 1,
          sourceExcerpt: sourceExcerpt(name, description, categoryName, price),
        });
        position += 1;
      }
    }
  }

  if (
    recognizedFoodMenuCount === 0 ||
    recognizedCategoryCount === 0 ||
    recognizedEntryCount === 0
  ) {
    throw new Error("Public menu API WeOrder payload exposed no recognizable food entries");
  }
  if (items.length === 0) {
    throw new Error("Public menu API WeOrder payload exposed no positive-price food items");
  }
  return finalizeItems(items);
}

export function extractPublicMenuApi(body: string): readonly MenuObservedItem[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(body) as unknown;
  } catch {
    throw new Error("Public menu API response is not valid JSON");
  }
  const root = asRecord(parsed);
  if (!root) throw new Error("Public menu API response must be a JSON object");

  const weOrderItems = extractWeOrderMenu(root);
  if (weOrderItems) return weOrderItems;

  const location = asRecord(root.location);
  const menus = asArray(location?.menus ?? root.menus);
  if (menus.length === 0) {
    throw new Error("Public menu API exposed no menus array");
  }

  const items: MenuObservedItem[] = [];
  let recognizedSectionCount = 0;
  let position = 0;

  const visitSections = (
    rawSections: unknown,
    inheritedSectionName: string | null = null,
    inheritedExcluded = false,
  ): void => {
    for (const rawSection of asArray(rawSections)) {
      const section = asRecord(rawSection);
      if (!section) continue;
      recognizedSectionCount += 1;
      const sectionName =
        localizedText(section.titles ?? section.names ?? section.title ?? section.name) ??
        inheritedSectionName;
      const isExcludedSection =
        inheritedExcluded ||
        (sectionName !== null &&
          (BEVERAGE_SECTION.test(sectionName) || NON_DISH_SECTION.test(sectionName)));

      if (!isExcludedSection) {
        for (const rawItem of asArray(section.menuItems ?? section.items ?? section.products)) {
          const item = asRecord(rawItem);
          if (!item || item.active === false) continue;
          const name = localizedText(item.names ?? item.titles ?? item.name ?? item.title);
          if (!name || !/\p{L}/u.test(name) || NON_DISH_PLACEHOLDER.test(name)) continue;
          const price = itemPrice(item);
          if (!price) continue;
          const description = localizedText(item.descriptions ?? item.description);
          items.push({
            sourceKey: createMenuItemSourceKey(name, sectionName),
            name,
            normalizedName: normalizeDishName(name),
            description,
            sectionName,
            priceMinor: price.priceMinor,
            priceKind: price.priceKind,
            priceMaxMinor: price.priceMaxMinor,
            currency: price.currency,
            position,
            extractionMethod: "api",
            confidence: 1,
            sourceExcerpt: sourceExcerpt(name, description, sectionName, price),
          });
          position += 1;
        }
      }

      visitSections(
        section.subSections ?? section.subsections ?? section.sections,
        sectionName,
        isExcludedSection,
      );
    }
  };

  for (const rawMenu of menus) {
    const menu = asRecord(rawMenu);
    if (!menu) continue;
    visitSections(menu.menuSections ?? menu.sections);
  }
  if (recognizedSectionCount === 0) {
    throw new Error("Public menu API exposed no recognizable menu sections");
  }

  return finalizeItems(items);
}
