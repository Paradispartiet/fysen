import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";

export const API_SOURCE_EXTRACTOR_VERSION = "api-v1";

const BEVERAGE_SECTION = /(?:\b(?:drikke|drinker|drinks?|beverages?|soft\s*drinks?|alkoholfri|alcohol\s*free|cerveza|beer|øl|sangria|cava|vin|wine|ros[eé]vin|hvitvin|white\s*wine|rødvin|red\s*wine|sherry|cocktails?|brennevin|spirits?|kaffe|coffee|te|tea)\b)/iu;
const NON_FOOD_SECTION = /^(?:butikk|shop|test(?:\s+ticket)?|gavekort|gift\s*cards?)$/iu;
const AGGREGATE_SECTION = /^(?:alle\s+produkter|all\s+products?)$/iu;

interface LocalizedText {
  readonly language?: unknown;
  readonly text?: unknown;
}

interface ApiPrice {
  readonly amount?: unknown;
  readonly currency?: unknown;
}

interface ApiVariant {
  readonly price?: ApiPrice;
}

interface ApiMenuItem {
  readonly id?: unknown;
  readonly names?: unknown;
  readonly descriptions?: unknown;
  readonly price?: ApiPrice;
  readonly variants?: unknown;
  readonly active?: unknown;
}

interface ApiSection {
  readonly titles?: unknown;
  readonly menuItems?: unknown;
  readonly subSections?: unknown;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function localizedText(value: unknown): string | null {
  if (!Array.isArray(value)) return null;
  const rows = value
    .map((entry) => asRecord(entry) as LocalizedText | null)
    .filter((entry): entry is LocalizedText => entry !== null)
    .map((entry) => ({
      language: typeof entry.language === "string" ? entry.language.toLowerCase() : "",
      text: typeof entry.text === "string" ? entry.text.trim() : "",
    }))
    .filter((entry) => entry.text.length > 0);
  return (
    rows.find((entry) => ["no", "nb", "nn"].includes(entry.language))?.text ??
    rows.find((entry) => entry.language === "en")?.text ??
    rows[0]?.text ??
    null
  );
}

function toMinor(price: ApiPrice): number | null {
  if (price.currency !== "NOK") {
    if (price.amount !== undefined) {
      throw new Error(`Structured menu API contains unsupported currency ${String(price.currency)}`);
    }
    return null;
  }
  if (typeof price.amount !== "number" || !Number.isFinite(price.amount) || price.amount < 0) return null;
  const minor = Math.round(price.amount * 100);
  if (Math.abs(minor / 100 - price.amount) > 1e-9) {
    throw new Error(`Structured menu API price has more than two decimals: ${price.amount}`);
  }
  return minor;
}

function itemPrices(item: ApiMenuItem): readonly number[] {
  const prices: number[] = [];
  if (item.price) {
    const minor = toMinor(item.price);
    if (minor !== null) prices.push(minor);
  }
  if (Array.isArray(item.variants)) {
    for (const rawVariant of item.variants) {
      const variant = asRecord(rawVariant) as ApiVariant | null;
      if (!variant?.price) continue;
      const minor = toMinor(variant.price);
      if (minor !== null) prices.push(minor);
    }
  }
  return [...new Set(prices)].sort((a, b) => a - b);
}

function normalizeSectionName(value: string): string {
  return value.replace(/[^\p{L}\p{N}&/| .'-]+/gu, " ").replace(/\s+/g, " ").trim();
}

function isBeverageSection(name: string): boolean {
  return BEVERAGE_SECTION.test(normalizeSectionName(name));
}

function isNonFoodSection(name: string): boolean {
  return NON_FOOD_SECTION.test(normalizeSectionName(name));
}

function isAggregateSection(name: string): boolean {
  return AGGREGATE_SECTION.test(normalizeSectionName(name));
}

export function extractStructuredApiMenu(body: string): readonly MenuObservedItem[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(body) as unknown;
  } catch {
    throw new Error("Structured menu API did not return valid JSON");
  }

  const root = asRecord(parsed);
  const location = asRecord(root?.location);
  const menus = location?.menus;
  if (!Array.isArray(menus) || menus.length === 0) {
    throw new Error("Structured menu API did not expose location.menus");
  }

  const output: MenuObservedItem[] = [];
  let position = 0;

  const visitSection = (rawSection: unknown, inheritedExcluded = false): void => {
    const section = asRecord(rawSection) as ApiSection | null;
    if (!section) return;
    const sectionName = localizedText(section.titles);
    if (!sectionName) return;
    const excluded = inheritedExcluded || isBeverageSection(sectionName) || isNonFoodSection(sectionName);
    const subSections = Array.isArray(section.subSections) ? section.subSections : [];
    const aggregate = isAggregateSection(sectionName);

    if (!excluded && !aggregate && Array.isArray(section.menuItems)) {
      for (const rawItem of section.menuItems) {
        const item = asRecord(rawItem) as ApiMenuItem | null;
        if (!item || item.active === false) continue;
        const name = localizedText(item.names);
        if (!name || !/\p{L}/u.test(name)) continue;
        const prices = itemPrices(item);
        if (prices.length === 0) continue;
        const description = localizedText(item.descriptions);
        const priceMinor = prices[0] ?? null;
        const priceMaxMinor = prices.length > 1 ? prices.at(-1) ?? null : null;
        output.push({
          name,
          normalizedName: normalizeDishName(name),
          sectionName,
          description,
          priceMinor,
          priceKind: prices.length > 1 ? "multiple" : "exact",
          priceMaxMinor,
          sourceKey: createMenuItemSourceKey(name, sectionName),
          sourceExcerpt: `${sectionName} — ${name} — ${prices.map((value) => `${value / 100} NOK`).join(" / ")}`,
          confidence: 1,
          position: position++,
        });
      }
    }

    for (const subSection of subSections) visitSection(subSection, excluded);
  };

  for (const rawMenu of menus) {
    const menu = asRecord(rawMenu);
    if (!Array.isArray(menu?.menuSections)) continue;
    for (const section of menu.menuSections) visitSection(section);
  }

  if (output.length === 0) {
    throw new Error("Structured menu API contained no canonical priced food items");
  }

  const deduped = new Map<string, MenuObservedItem>();
  for (const item of output) {
    const key = `${item.sourceKey}\u0000${item.priceMinor}\u0000${item.priceMaxMinor ?? ""}`;
    if (!deduped.has(key)) deduped.set(key, item);
  }
  return [...deduped.values()].map((item, index) => ({ ...item, position: index }));
}
