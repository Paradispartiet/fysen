import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";
import { extractPdfMenu, type ExtractedPdfMenu } from "./pdf-extractor.js";

export const PDF_SOURCE_EXTRACTOR_VERSION = "pdf-text-v12";

const LOW_PER_ITEM_PRICE =
  /^(?:(?:kr\.?|nok)\s*(3\d)|(3\d)\s*(?:kr\.?|nok))\s*(?:,-)?\s*\((?:pr\.?\s*stk\.?|per\s+(?:piece|item|stk\.?)|each)\)$/iu;
const LEADING_MENU_NUMBER = /^\d{1,3}\s*[.)]\s*/u;
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

function looksLikePricingMetadata(name: string): boolean {
  const normalized = normalizeScopeLine(name);
  return /^(?:minimum|min)\s+\d+\s+(?:personer|persons?|people)\b.*\b(?:pris|price)\s+(?:per|pr)\s+(?:person|personer)\b/u.test(
    normalized,
  );
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
    scoped.push(item);
  }

  return scoped.map((item, position) => ({ ...item, position }));
}

export async function extractScopedPdfMenu(bytes: Uint8Array): Promise<ExtractedPdfMenu> {
  const extracted = await extractPdfMenu(bytes);
  const recoveredItems = recoverExplicitLowPerItemPdfRows(
    extracted.visibleText,
    extracted.items,
  );
  return {
    ...extracted,
    items: scopePdfMenuItems(extracted.visibleText, recoveredItems),
  };
}
