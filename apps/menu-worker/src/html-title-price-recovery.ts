import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";

export const HTML_TITLE_PRICE_RECOVERY_VERSION = "title-price-v1";

const STANDALONE_PRICE = /^(?:(?:kr\.?\s*)?[1-9]\d{1,3}(?:[.,]\d{1,2})?(?:\s*(?:,-|kr\.?|nok))?)$/iu;
const PRICE_VALUE = /^(?:kr\.?\s*)?([1-9]\d{1,3})(?:[.,](\d{1,2}))?(?:\s*(?:,-|kr\.?|nok))?$/iu;
const PURE_ORDINAL = /^\d{1,3}\s*[.)]?$/u;
const SECTION_OR_UI_LABEL = /^(?:meny|menu|antipasti|forretter?|starters?|småretter|hovedretter?|mains?|secondi|grillretter?|andre retter|desserter?|desserts?|pizza|pasta|drikke(?:meny)?|drinks?|booking|bestill|bord|åpningstider|opening hours|kontakt(?:informasjon)?|contact|allergener?|allergens?|beliggenhet|ingen produkter ennå)$/iu;
const DESCRIPTION_LEAD = /^(?:serveres?|servert|served|with|med|toppet|topped|inneholder|contains?|inkludert|including|består av|consists of)\b/iu;

function normalizeVisibleLine(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}

function priceMinor(value: string): number | null {
  const match = normalizeVisibleLine(value).match(PRICE_VALUE);
  if (!match?.[1]) return null;
  const whole = Number(match[1]);
  const decimals = (match[2] ?? "").padEnd(2, "0").slice(0, 2);
  const amount = whole * 100 + Number(decimals || "0");
  return amount >= 4_000 && amount <= 1_000_000 ? amount : null;
}

function looksLikeDishTitle(value: string): boolean {
  const title = normalizeVisibleLine(value);
  if (!title || title.length < 2 || title.length > 160 || !/\p{L}/u.test(title)) return false;
  if (STANDALONE_PRICE.test(title) || PURE_ORDINAL.test(title) || SECTION_OR_UI_LABEL.test(title)) return false;
  if (/^(?:©|™|https?:\/\/|www\.)/iu.test(title) || /@/u.test(title)) return false;
  if (DESCRIPTION_LEAD.test(title) || /[.!?;:]$/u.test(title)) return false;
  return title.split(/\s+/).filter(Boolean).length <= 12;
}

function titleIndexBeforePrice(lines: readonly string[], pricePosition: number): number | null {
  for (let offset = 1; offset <= 2; offset += 1) {
    const index = pricePosition - offset;
    if (index < 0) break;
    const line = lines[index] ?? "";
    if (!line) continue;
    if (STANDALONE_PRICE.test(line)) return null;
    if (PURE_ORDINAL.test(line)) continue;
    return looksLikeDishTitle(line) ? index : null;
  }
  return null;
}

function descriptionAfterPrice(
  lines: readonly string[],
  pricePosition: number,
  nextPricePosition: number,
): string | null {
  const parts: string[] = [];
  const scanEnd = Math.min(nextPricePosition, pricePosition + 6);
  for (let index = pricePosition + 1; index < scanEnd; index += 1) {
    const line = lines[index] ?? "";
    if (!line || PURE_ORDINAL.test(line) || SECTION_OR_UI_LABEL.test(line)) continue;
    if (STANDALONE_PRICE.test(line)) break;
    const next = lines[index + 1] ?? "";
    if (looksLikeDishTitle(line) && STANDALONE_PRICE.test(next)) break;
    parts.push(line);
  }
  return parts.join(" ").trim() || null;
}

export function recoverTitlePriceHtmlItems(visibleText: string): readonly MenuObservedItem[] {
  const lines = visibleText
    .split("\n")
    .map(normalizeVisibleLine)
    .filter(Boolean);
  const pricePositions = lines
    .map((line, index) => (STANDALONE_PRICE.test(line) ? index : -1))
    .filter((index) => index >= 0);
  const unique = new Map<string, MenuObservedItem>();

  for (const [offset, pricePosition] of pricePositions.entries()) {
    const amount = priceMinor(lines[pricePosition] ?? "");
    if (amount === null) continue;
    const titleIndex = titleIndexBeforePrice(lines, pricePosition);
    if (titleIndex === null) continue;
    const title = lines[titleIndex] ?? "";
    const nextPricePosition = pricePositions[offset + 1] ?? lines.length;
    const description = descriptionAfterPrice(lines, pricePosition, nextPricePosition);
    const sourceKey = createMenuItemSourceKey(title);

    unique.set(sourceKey, {
      sourceKey,
      name: title,
      normalizedName: normalizeDishName(title),
      description,
      sectionName: null,
      priceMinor: amount,
      currency: "NOK",
      position: titleIndex,
      extractionMethod: "html_heuristic",
      confidence: 0.92,
      sourceExcerpt: lines.slice(titleIndex, Math.min(nextPricePosition, pricePosition + 5)).join(" — ").slice(0, 1000),
    });
  }

  if (unique.size < 3 || unique.size * 3 < pricePositions.length * 2) return [];
  return [...unique.values()].sort((a, b) => a.position - b.position);
}
