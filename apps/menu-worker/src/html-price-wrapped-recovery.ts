import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";

export const HTML_PRICE_WRAPPED_RECOVERY_VERSION = "price-wrapped-v1";

const STANDALONE_PRICE = /^(?:(?:kr\.?\s*)?[1-9]\d{1,3}(?:[.,]\d{1,2})?(?:\s*(?:,-|kr\.?|nok))?)$/iu;
const PRICE_VALUE = /^(?:kr\.?\s*)?([1-9]\d{1,3})(?:[.,](\d{1,2}))?(?:\s*(?:,-|kr\.?|nok))?$/iu;
const SECTION_OR_UI_LABEL = /^(?:meny|menu|forretter?|starters?|småretter|hovedretter?|mains?|grillretter?|desserter?|desserts?|drikke(?:meny)?|drinks?|booking|bestill|bord|åpningstider|opening hours|kontakt|contact|allergener?|allergens?)$/iu;
const DESCRIPTION_LEAD = /^(?:serveres?|servert|served|with|med|toppet|topped|inneholder|contains?|inkludert|including)\b/iu;

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
  if (STANDALONE_PRICE.test(title) || SECTION_OR_UI_LABEL.test(title)) return false;
  if (/^(?:©|™|https?:\/\/|www\.)/iu.test(title)) return false;
  if (DESCRIPTION_LEAD.test(title)) return false;
  if (/[.!?]$/u.test(title)) return false;
  return title.split(/\s+/).filter(Boolean).length <= 12;
}

export function recoverPriceWrappedHtmlItems(visibleText: string): readonly MenuObservedItem[] {
  const lines = visibleText
    .split("\n")
    .map(normalizeVisibleLine)
    .filter(Boolean);
  const pricePositions = lines
    .map((line, index) => (STANDALONE_PRICE.test(line) ? index : -1))
    .filter((index) => index >= 0);
  const unique = new Map<string, MenuObservedItem>();

  for (let offset = 0; offset + 1 < pricePositions.length; offset += 1) {
    const start = pricePositions[offset] ?? -1;
    const end = pricePositions[offset + 1] ?? -1;
    if (start < 0 || end <= start + 1 || end - start > 8) continue;

    const startPrice = priceMinor(lines[start] ?? "");
    const endPrice = priceMinor(lines[end] ?? "");
    if (startPrice === null || endPrice === null || startPrice !== endPrice) continue;

    const block = lines.slice(start + 1, end);
    const title = block[0] ?? "";
    if (!looksLikeDishTitle(title)) continue;

    const description = block
      .slice(1)
      .filter((line) => line && !SECTION_OR_UI_LABEL.test(line) && !STANDALONE_PRICE.test(line))
      .join(" ")
      .trim() || null;
    const sourceKey = createMenuItemSourceKey(title);

    unique.set(sourceKey, {
      sourceKey,
      name: title,
      normalizedName: normalizeDishName(title),
      description,
      sectionName: null,
      priceMinor: startPrice,
      currency: "NOK",
      position: start + 1,
      extractionMethod: "html_heuristic",
      confidence: 0.93,
      sourceExcerpt: lines.slice(start, end + 1).join(" — ").slice(0, 1000),
    });
  }

  if (unique.size < 3) return [];
  return [...unique.values()].sort((a, b) => a.position - b.position);
}
