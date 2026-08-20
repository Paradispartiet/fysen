import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";

export const HTML_EXPLICIT_FROM_PRICE_RECOVERY_VERSION = "from-price-v1";

const FROM_PRICE = /^(?:fra|from)\s+(?:(?:NOK|kr\.?)\s*)?([1-9]\d{0,3})(?:([.,])(\d{1,3}))?(?:\s*(?:,-|kr\.?|NOK))?$/iu;
const INLINE_FROM_PRICE = /^(.{2,180}?)\s+(?:fra|from)\s+(?:(?:NOK|kr\.?)\s*)?([1-9]\d{0,3})(?:([.,])(\d{1,3}))?(?:\s*(?:,-|kr\.?|NOK))?$/iu;
const ANY_PRICE = /^(?:(?:fra|from)\s+)?(?:(?:NOK|kr\.?)\s*)?[1-9]\d{0,3}(?:[.,]\d{1,3})?(?:\s*(?:,-|kr\.?|NOK))?$/iu;
const SECTION_OR_UI_LABEL = /^(?:meny|menu|forretter?|starters?|appetizers?|småretter|hovedretter?|mains?|main\s+courses?|supper?|soups?|barnemeny|kids?\s+menu|sauser?|sauces?|desserter?|desserts?|drikke(?:meny)?|drinks?|beverages?|popular(?:\s+dish)?|most\s+ordered|bestseller|opening(?:\s+hours)?|åpningstider|contact|kontakt|address|adresse|booking|reservation(?:s)?|reservasjoner?|allergens?|allergener?)$/iu;
const DESCRIPTION_LEAD = /^(?:serveres?|servert|served|with|med|toppet|topped|inneholder|contains?|inkludert|including|tradisjonell|traditional|en\s+|a\s+|an\s+)\b/iu;

function normalizeLine(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}

function priceMinor(wholeText: string, separator: string | undefined, trailing: string | undefined): number | null {
  let whole = Number(wholeText);
  const tail = trailing ?? "";
  let decimals = "";

  if (separator === "." && tail.length === 3) {
    whole = Number(`${wholeText}${tail}`);
  } else {
    if (tail.length > 2) return null;
    decimals = tail.padEnd(2, "0").slice(0, 2);
  }

  const amount = whole * 100 + Number(decimals || "0");
  return amount >= 4_000 && amount <= 1_000_000 ? amount : null;
}

function looksLikeTitle(value: string): boolean {
  const title = normalizeLine(value);
  if (!title || title.length < 2 || title.length > 160 || !/\p{L}/u.test(title)) return false;
  if (ANY_PRICE.test(title) || SECTION_OR_UI_LABEL.test(title)) return false;
  if (/^(?:©|™|https?:\/\/|www\.|\d+(?:[.,]\d+)?\s*(?:l|cl|ml|kg)\b)/iu.test(title)) return false;
  const words = title.split(/\s+/).filter(Boolean);
  if (words.length > 12 || /[.!?]$/u.test(title)) return false;
  if (DESCRIPTION_LEAD.test(title) && words.length >= 6) return false;
  return true;
}

function nearestTitle(lines: readonly string[], pricePosition: number): { title: string; position: number } | null {
  for (let offset = 1; offset <= 5; offset += 1) {
    const position = pricePosition - offset;
    if (position < 0) break;
    const candidate = normalizeLine(lines[position] ?? "");
    if (!candidate) continue;
    if (ANY_PRICE.test(candidate)) break;
    if (SECTION_OR_UI_LABEL.test(candidate)) continue;
    if (!looksLikeTitle(candidate)) continue;
    return { title: candidate, position };
  }
  return null;
}

export function recoverExplicitFromPriceHtmlItems(visibleText: string): readonly MenuObservedItem[] {
  const lines = visibleText.split("\n").map(normalizeLine).filter(Boolean);
  const unique = new Map<string, MenuObservedItem>();

  for (let position = 0; position < lines.length; position += 1) {
    const line = lines[position] ?? "";
    const standalone = line.match(FROM_PRICE);
    const inline = standalone ? null : line.match(INLINE_FROM_PRICE);

    const rawWhole = standalone?.[1] ?? inline?.[2];
    const separator = standalone?.[2] ?? inline?.[3];
    const trailing = standalone?.[3] ?? inline?.[4];
    if (!rawWhole) continue;
    const parsedPrice = priceMinor(rawWhole, separator, trailing);
    if (parsedPrice === null) continue;

    const inlineTitle = inline?.[1] ? normalizeLine(inline[1]) : null;
    const recovery = inlineTitle && looksLikeTitle(inlineTitle)
      ? { title: inlineTitle, position }
      : nearestTitle(lines, position);
    if (!recovery) continue;

    const sourceKey = createMenuItemSourceKey(recovery.title);
    unique.set(sourceKey, {
      sourceKey,
      name: recovery.title,
      normalizedName: normalizeDishName(recovery.title),
      description: null,
      sectionName: null,
      priceMinor: parsedPrice,
      priceKind: "from",
      priceMaxMinor: null,
      currency: "NOK",
      position: recovery.position,
      extractionMethod: "html_heuristic",
      confidence: 0.97,
      sourceExcerpt: `${recovery.title} — ${line}`.slice(0, 1000),
    });
  }

  return [...unique.values()].sort((a, b) => a.position - b.position);
}
