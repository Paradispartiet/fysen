import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";
import { extractPdfMenu, type ExtractedPdfMenu } from "./pdf-extractor.js";

export const PDF_SOURCE_EXTRACTOR_VERSION = "pdf-text-v15";

const LOW_PER_ITEM_PRICE =
  /^(?:(?:kr\.?|nok)\s*(3\d)|(3\d)\s*(?:kr\.?|nok))\s*(?:,-)?\s*\((?:pr\.?\s*stk\.?|per\s+(?:piece|item|stk\.?)|each)\)$/iu;
const LEADING_MENU_NUMBER = /^\d{1,3}\s*[.)]\s*/u;
const SECTION_PRICE_SIGNAL = /(?:^|\s)(?:kr\.?|nok)?\s*[1-9]\d{1,3}(?:[.,]\d{1,2})?\s*(?:,-|kr\.?|nok)?$/iu;
const PRICE_DISPLAY_ONLY_ITEM =
  /^(?:(?:kr\.?|nok)\s*)?[1-9]\d{1,3}(?:[.,]\d{1,2})?(?:\s*\/\s*(?:(?:kr\.?|nok)\s*)?[1-9]\d{1,3}(?:[.,]\d{1,2})?)?\s*(?:,-|kr\.?|nok)?$/iu;
const VARIANT_SECTION_KEYWORD =
  /\b(?:sashimi|nigiri|maki|uramaki|futomaki|temaki|sushi|tacos?|pizza(?:er|s)?|pasta|dessert(?:er|s)?|starters?|forretter?|mains?|hovedretter?|grill|bowls?)\b/iu;
const TRAILING_SHARING_TAGLINE =
  /\s+(?:perfekt\s+å\s+dele|perfect\s+for\s+sharing)!?$/iu;
const RECOVERY_ALLERGEN_CODES = new Set([
  "al",
  "b",
  "bl",
  "ca",
  "e",
  "f",
  "g",
  "h",
  "ha",
  "hne",
  "m",
  "ma",
  "mk",
  "n",
  "p",
  "pe",
  "pi",
  "r",
  "se",
  "sem",
  "sk",
  "sl",
  "sn",
  "so",
  "su",
  "sy",
  "va",
  "wa",
]);

function normalizeScopeLine(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[Đđ]/gu, (letter) => (letter === "Đ" ? "D" : "d"))
    .replace(/\p{M}/gu, "")
    .toLocaleLowerCase("nb-NO")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeVisibleLine(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}

function isBeverageSectionHeading(value: string): boolean {
  const line = normalizeScopeLine(value);
  return /^(?:bia va ruou(?: beer spirits)?|beer(?: and)? spirits|giai khat(?: non alcohol(?:ic)?)?|non alcoholic(?: drinks?)?|ruou pha(?: cocktails?)?|cocktails?|khong con(?: mocktails?)?|mocktails?|do uong(?: drinks?)?|drikke(?:meny)?|drinks?|beverages?|barnedrinker|barne drikker|kids drinks?|children s drinks?|vinkart|vin(?:kart|liste|meny)?|wine(?: list| menu)?|beer|ol|spirits?|brennevin|liquor)$/u.test(
    line,
  );
}

function isFoodSectionHeading(value: string): boolean {
  const line = normalizeScopeLine(value);
  return /^(?:do ngot(?: dessert)?|desserts?|dolci|mat|food|forretter|starters?|smaretter|small plates?|snacks?|hovedretter|main courses?|mains?)$/u.test(
    line,
  );
}

function beverageBlockedLines(visibleText: string): readonly boolean[] {
  const lines = visibleText.split("\n");
  const blocked: boolean[] = [];
  let beverageSection = false;

  for (const [index, line] of lines.entries()) {
    if (isBeverageSectionHeading(line)) {
      beverageSection = true;
      blocked[index] = true;
      continue;
    }
    if (beverageSection && isFoodSectionHeading(line)) {
      beverageSection = false;
      blocked[index] = false;
      continue;
    }
    blocked[index] = beverageSection;
  }

  return blocked;
}

function lineStartsWithDishName(line: string, dishName: string): boolean {
  const normalizedLine = normalizeDishName(
    normalizeVisibleLine(line).replace(LEADING_MENU_NUMBER, ""),
  );
  const normalizedName = normalizeDishName(dishName);
  if (!normalizedName || !normalizedLine.startsWith(normalizedName)) return false;
  if (normalizedLine.length === normalizedName.length) return true;
  const next = normalizedLine.slice(normalizedName.length, normalizedName.length + 1);
  return next === " " || /\d/u.test(next);
}

function findNextDishLine(lines: readonly string[], dishName: string, startIndex: number): number | null {
  for (let index = Math.max(0, startIndex); index < lines.length; index += 1) {
    if (lineStartsWithDishName(lines[index] ?? "", dishName)) return index;
  }
  return null;
}

function looksLikeVariantSectionHeading(value: string): boolean {
  const line = normalizeVisibleLine(value);
  if (
    line.length < 3 ||
    line.length > 80 ||
    SECTION_PRICE_SIGNAL.test(line) ||
    !VARIANT_SECTION_KEYWORD.test(line)
  ) {
    return false;
  }
  return line.split(/\s+/u).filter(Boolean).length <= 6;
}

function nearestVariantSectionHeading(
  lines: readonly string[],
  dishLineIndex: number,
): string | null {
  for (let index = dishLineIndex - 1; index >= Math.max(0, dishLineIndex - 16); index -= 1) {
    const line = normalizeVisibleLine(lines[index] ?? "");
    if (!line) continue;
    if (looksLikeVariantSectionHeading(line)) return line;
  }
  return null;
}

export function disambiguateConflictingPdfSourceKeys(
  visibleText: string,
  items: readonly MenuObservedItem[],
): readonly MenuObservedItem[] {
  const groups = new Map<string, MenuObservedItem[]>();
  for (const item of items) {
    const group = groups.get(item.sourceKey) ?? [];
    group.push(item);
    groups.set(item.sourceKey, group);
  }

  const conflictingKeys = new Set<string>();
  for (const [sourceKey, group] of groups) {
    if (group.length < 2) continue;
    const prices = new Set(
      group.map(
        (item) =>
          `${item.priceKind ?? "exact"}:${item.priceMinor ?? "null"}:${item.priceMaxMinor ?? "null"}`,
      ),
    );
    if (prices.size >= 2) conflictingKeys.add(sourceKey);
  }
  if (conflictingKeys.size === 0) return items;

  const lines = visibleText.split("\n").map(normalizeVisibleLine);
  const sectionByItem = new Map<MenuObservedItem, string>();
  let searchFrom = 0;
  for (const item of items) {
    const lineIndex = findNextDishLine(lines, item.name, searchFrom);
    if (lineIndex !== null) searchFrom = lineIndex + 1;
    if (lineIndex === null || !conflictingKeys.has(item.sourceKey)) continue;
    const section = nearestVariantSectionHeading(lines, lineIndex);
    if (section) sectionByItem.set(item, section);
  }

  const resolvedKeys = new Set<string>();
  for (const sourceKey of conflictingKeys) {
    const group = groups.get(sourceKey) ?? [];
    const sections = group
      .map((item) => sectionByItem.get(item) ?? null)
      .filter((value): value is string => Boolean(value));
    if (sections.length !== group.length) continue;
    const distinctSections = new Set(sections.map(normalizeDishName));
    if (distinctSections.size >= 2) resolvedKeys.add(sourceKey);
  }

  return items.map((item) => {
    if (!resolvedKeys.has(item.sourceKey)) return item;
    const sectionName = sectionByItem.get(item);
    if (!sectionName) return item;
    return {
      ...item,
      sectionName,
      sourceKey: createMenuItemSourceKey(item.name, sectionName),
    };
  });
}

function looksLikePricingMetadata(name: string): boolean {
  const visible = normalizeVisibleLine(name);
  if (PRICE_DISPLAY_ONLY_ITEM.test(visible)) return true;
  const normalized = normalizeScopeLine(visible);
  return /^(?:minimum|min)\s+\d+\s+(?:personer|persons?|people)\b.*\b(?:pris|price)\s+(?:per|pr)\s+(?:person|personer)\b/u.test(
    normalized,
  );
}

function cleanPdfOutputItemName(item: MenuObservedItem): MenuObservedItem {
  const name = normalizeVisibleLine(item.name).replace(TRAILING_SHARING_TAGLINE, "").trim();
  if (!name || name === item.name) return item;
  return {
    ...item,
    name,
    normalizedName: normalizeDishName(name),
    sourceKey: createMenuItemSourceKey(name, item.sectionName),
  };
}

function canonicalRecoveredDishName(value: string): string {
  const tokens = normalizeVisibleLine(value)
    .replace(LEADING_MENU_NUMBER, "")
    .split(/\s+/u);
  let end = tokens.length;
  while (end > 0) {
    const token = (tokens[end - 1] ?? "").replace(/[(),.;:]+$/gu, "");
    if (!/^[A-ZÆØÅ]{1,3}$/u.test(token)) break;
    if (!RECOVERY_ALLERGEN_CODES.has(token.toLocaleLowerCase("nb-NO"))) break;
    end -= 1;
  }
  return tokens.slice(0, end).join(" ").trim();
}

export function recoverExplicitLowPerItemPdfRows(
  visibleText: string,
  items: readonly MenuObservedItem[],
): readonly MenuObservedItem[] {
  const recovered = [...items];
  const known = new Set(
    items.map((item) => `${item.normalizedName}\u0000${item.priceMinor ?? "null"}`),
  );
  const lines = visibleText.split("\n").map(normalizeVisibleLine);

  for (let index = 0; index + 1 < lines.length; index += 1) {
    const rawName = lines[index] ?? "";
    const rawPrice = lines[index + 1] ?? "";
    const match = rawPrice.match(LOW_PER_ITEM_PRICE);
    const kronerText = match?.[1] ?? match?.[2];
    if (!kronerText) continue;

    const name = canonicalRecoveredDishName(rawName);
    if (name.length < 2 || name.length > 220 || !/\p{L}/u.test(name)) continue;
    const priceMinor = Number(kronerText) * 100;
    const normalizedName = normalizeDishName(name);
    const key = `${normalizedName}\u0000${priceMinor}`;
    if (known.has(key)) continue;
    known.add(key);

    recovered.push({
      sourceKey: createMenuItemSourceKey(name),
      name,
      normalizedName,
      description: null,
      sectionName: null,
      priceMinor,
      priceKind: "exact",
      priceMaxMinor: null,
      currency: "NOK",
      position: recovered.length,
      extractionMethod: "pdf_text",
      confidence: 0.82,
      sourceExcerpt: `${rawName} — ${rawPrice}`.slice(0, 1000),
    });
  }

  return recovered;
}

export function scopePdfMenuItems(
  visibleText: string,
  items: readonly MenuObservedItem[],
): readonly MenuObservedItem[] {
  const lines = visibleText.split("\n");
  const blocked = beverageBlockedLines(visibleText);
  const scoped: MenuObservedItem[] = [];
  let searchFrom = 0;

  for (const item of items) {
    if (looksLikePricingMetadata(item.name)) continue;
    const lineIndex = findNextDishLine(lines, item.name, searchFrom);
    if (lineIndex !== null) searchFrom = lineIndex + 1;
    if (lineIndex !== null && blocked[lineIndex]) continue;
    scoped.push(cleanPdfOutputItemName(item));
  }

  return scoped.map((item, position) => ({ ...item, position }));
}

export async function extractScopedPdfMenu(bytes: Uint8Array): Promise<ExtractedPdfMenu> {
  const extracted = await extractPdfMenu(bytes);
  const recoveredItems = recoverExplicitLowPerItemPdfRows(
    extracted.visibleText,
    extracted.items,
  );
  const disambiguatedItems = disambiguateConflictingPdfSourceKeys(
    extracted.visibleText,
    recoveredItems,
  );
  return {
    ...extracted,
    items: scopePdfMenuItems(extracted.visibleText, disambiguatedItems),
  };
}
