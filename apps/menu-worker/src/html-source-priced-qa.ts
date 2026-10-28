import { createMenuItemSourceKey, normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";

/**
 * Source-backed HTML price reconciliation. Never choose a neighboring price,
 * infer a serving unit or convert a per-person quote to a dish price.
 * This layer applies only after the ordinary HTML parser has finished.
 */
export const HTML_SOURCE_PRICED_QA_VERSION = "source-priced-v1";

const CURRENCY_PRICE = /\bkr\.?\s*([1-9]\d{1,3})\b/giu;
const TRAILING_PRICE = /\bkr\.?\s*([1-9]\d{1,3})(?:\s*,-)?\s*$/iu;
const PRICE_PER_PERSON = /\bkr\.?\s*[1-9]\d{1,3}\s*(?:pp|p\.p\.|per\s+(?:person|pers\.?)|pr\.?\s*(?:person|pers\.?))\b/iu;
const PAIR_OF_SIZES = /\b(liten|small)\s*\(\s*(\d{1,2})\s*\)\s*kr\.?\s*([1-9]\d{1,3})\s+(stor|large)\s*\(\s*(\d{1,2})\s*\)\s*kr\.?\s*([1-9]\d{1,3})\b/iu;
const SAUCE_ONLY = /^(?:[\p{L}-]{2,20}saus|b[eé]arnaise)(?:\s*\([^)]{2,40}\))?$/iu;
const TITLE_THEN_DESCRIPTION = /^([\p{Lu}][\p{L}\s()\-–]{5,79}?)\.\s+(?=[\p{Lu}])/u;

function visibleLines(text: string): string[] {
  return text.split("\n")
    .map((line) => line.normalize("NFKC").replace(/\s+/gu, " ").trim())
    .filter(Boolean);
}

function anchorMatches(line: string, normalizedName: string): boolean {
  const lineName = normalizeDishName(line);
  return lineName === normalizedName || lineName.startsWith(normalizedName + " ");
}

function anchoredSourceLines(item: MenuObservedItem, lines: readonly string[]): string[] {
  const result: string[] = [];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]!;
    if (!anchorMatches(line, item.normalizedName)) continue;
    result.push(line);
    if (normalizeDishName(line) === item.normalizedName && lines[i + 1]) {
      result.push(lines[i + 1]!);
    }
  }
  return result;
}

function withExactPrice(item: MenuObservedItem, kroner: number): MenuObservedItem {
  const priceMinor = kroner * 100;
  if (item.priceMinor === priceMinor) return item;
  return {
    ...item,
    priceMinor,
    priceKind: "exact",
    priceMaxMinor: null,
    confidence: Math.min(item.confidence, 0.8),
    sourceExcerpt: [item.sourceExcerpt, "Exact price at source heading: kr " + kroner]
      .filter(Boolean).join(" — ").slice(0, 1000),
  };
}

function explicitlyLinkedPrice(item: MenuObservedItem, lines: readonly string[]): number | null {
  const candidates = new Set<number>();
  for (const line of anchoredSourceLines(item, lines)) {
    if (PRICE_PER_PERSON.test(line)) continue;
    const prices = [...line.matchAll(CURRENCY_PRICE)].map((m) => Number(m[1]));
    if (prices.length !== 1 || !TRAILING_PRICE.test(line)) continue;
    const kroner = prices[0]!;
    if (kroner >= 40 && kroner <= 10_000) candidates.add(kroner);
  }
  return candidates.size === 1 ? [...candidates][0]! : null;
}

function explicitSizes(item: MenuObservedItem, lines: readonly string[]): MenuObservedItem[] | null {
  const pairs = anchoredSourceLines(item, lines)
    .map((line) => line.match(PAIR_OF_SIZES))
    .filter((pair): pair is RegExpMatchArray => pair !== null);
  if (pairs.length === 0) return null;
  const signatures = new Set(pairs.map((p) => [p[2], p[3], p[5], p[6]].join(":")));
  if (signatures.size !== 1) return null;
  const p = pairs[0]!;
  const small = Number(p[3]), large = Number(p[6]);
  if (small < 40 || large <= small || large > 10_000) return null;
  if (item.priceMinor !== small * 100 && item.priceMinor !== large * 100) return null;
  return [
    { label: "liten", pieces: Number(p[2]), kroner: small },
    { label: "stor", pieces: Number(p[5]), kroner: large },
  ].map(({ label, pieces, kroner }) => {
    const name = item.name + " (" + label + ", " + pieces + " biter)";
    return {
      ...item,
      name,
      normalizedName: normalizeDishName(name),
      sourceKey: createMenuItemSourceKey(name, item.sectionName),
      priceMinor: kroner * 100,
      priceKind: "exact" as const,
      priceMaxMinor: null,
      description: [label + " porsjon, " + pieces + " biter", item.description]
        .filter(Boolean).join(". "),
      confidence: Math.min(item.confidence, 0.8),
      sourceExcerpt: [item.sourceExcerpt, label + " (" + pieces + ") kr " + kroner]
        .filter(Boolean).join(" — ").slice(0, 1000),
    };
  });
}

function missingInlineDishes(lines: readonly string[], existing: ReadonlySet<string>): MenuObservedItem[] {
  const added: MenuObservedItem[] = [];
  for (const [position, line] of lines.entries()) {
    if (!/\b(?:ALL|allergener?|allergens?)\s*:/iu.test(line)) continue;
    const title = line.match(TITLE_THEN_DESCRIPTION)?.[1]?.trim();
    if (!title || title.split(/\s+/u).length < 2 || title.length > 80) continue;
    const name = normalizeDishName(title);
    if (existing.has(name)) continue;
    const prices = [...line.matchAll(CURRENCY_PRICE)];
    if (prices.length !== 1 || !TRAILING_PRICE.test(line) || PRICE_PER_PERSON.test(line))
      continue;
    const priceMinor = Number(prices[0]?.[1]) * 100;
    if (!Number.isSafeInteger(priceMinor) || priceMinor < 4000 || priceMinor > 1_000_000) continue;
    added.push({
      name: title,
      normalizedName: name,
      sourceKey: createMenuItemSourceKey(title),
      description: line.slice(title.length + 1).replace(/\bkr\.?\s*[1-9]\d{1,3}(?:\s*,-)?\s*$/iu, "").trim() || null,
      sectionName: null,
      priceMinor,
      priceKind: "exact",
      priceMaxMinor: null,
      currency: "NOK",
      position,
      extractionMethod: "html_heuristic",
      confidence: 0.75,
      sourceExcerpt: line.slice(0, 1000),
    });
    existing = new Set([...existing, name]);
  }
  return added;
}

export function reconcileSourcePricedHtmlDishes(
  items: readonly MenuObservedItem[],
  fullVisibleText: string,
): readonly MenuObservedItem[] {
  if (!fullVisibleText) return items;
  const lines = visibleLines(fullVisibleText);
  const corrected = items.flatMap((item) => {
    // Generic food-scope guard: a sauce-only option is not a main dish.
    if (SAUCE_ONLY.test(item.name) && item.priceMinor !== null && item.priceMinor <= 15_000)
      return [];
    const source = anchoredSourceLines(item, lines);
    // Quarantine per-person prices until the published price unit can be
    // faithfully represented in the canonical dish schema.
    if (source.some((line) => PRICE_PER_PERSON.test(line))) return [];
    const sizes = explicitSizes(item, lines);
    if (sizes) return sizes;
    const directlyPriced = explicitlyLinkedPrice(item, lines);
    return [directlyPriced !== null ? withExactPrice(item, directlyPriced) : item];
  });
  const existing = new Set(corrected.map((item) => item.normalizedName));
  const recovered = missingInlineDishes(lines, existing);
  return [...corrected, ...recovered].sort((a, b) => a.position - b.position);
}
