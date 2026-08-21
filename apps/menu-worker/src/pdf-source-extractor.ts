import { normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";
import { extractPdfMenu, type ExtractedPdfMenu } from "./pdf-extractor.js";

export const PDF_SOURCE_EXTRACTOR_VERSION = "pdf-text-v10";

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
  const normalizedLine = normalizeDishName(line);
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
  return {
    ...extracted,
    items: scopePdfMenuItems(extracted.visibleText, extracted.items),
  };
}
