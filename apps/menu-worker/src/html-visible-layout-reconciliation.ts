import { load } from "cheerio";
import { normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";
import { extractHtmlVisibleText } from "./html-extractor.js";

export const HTML_VISIBLE_LAYOUT_RECONCILIATION_VERSION = "visible-layout-v1";

const NUMBERED_MENU_TITLE = /^(\d{1,2})\s*[.)]\s*(.+)$/u;
const STANDALONE_PRICE = /^(?:kr\.?\s*)?([1-9]\d{1,3})(?:\s*,[-–])?$/iu;

function visibleLines(html: string): readonly string[] {
  return extractHtmlVisibleText(html)
    .split("\n")
    .map((line) => line.normalize("NFKC").replace(/\s+/gu, " ").trim())
    .filter(Boolean);
}

function asPriceMinor(line: string): number | null {
  const matched = line.match(STANDALONE_PRICE);
  if (!matched?.[1]) return null;
  const price = Number(matched[1]) * 100;
  return price >= 4_000 && price <= 1_000_000 ? price : null;
}

/**
 * Recover prices from an explicitly labelled L / XL menu, not arbitrary pairs
 * of numbers in a description. A numbered title must delimit each dish, and
 * the first visible amount must agree with its structured JSON-LD price.
 */
export function reconcileVisibleSizePrices(
  html: string,
  items: readonly MenuObservedItem[],
): readonly MenuObservedItem[] {
  const lines = visibleLines(html);
  const titles: Array<{ readonly line: number; readonly name: string }> = [];
  for (const [line, value] of lines.entries()) {
    const match = value.match(NUMBERED_MENU_TITLE);
    if (match?.[2]) titles.push({ line, name: normalizeDishName(match[2]) });
  }
  if (titles.length < 3) return items;
  const header = lines.slice(Math.max(0, titles[0]!.line - 12), titles[0]!.line).join(" ");
  if (!/\bL\s+XL\b/iu.test(header)) return items;
  const priceByName = new Map<string, readonly number[]>();
  for (const [index, title] of titles.entries()) {
    const next = titles[index + 1]?.line ?? Math.min(lines.length, title.line + 55);
    const prices = lines
      .slice(title.line + 1, Math.min(next, title.line + 55))
      .map(asPriceMinor)
      .filter((price): price is number => price !== null);
    if (prices.length === 2 && prices[1]! > prices[0]!) {
      priceByName.set(title.name, prices);
    }
  }
  return items.map((item) => {
    const prices = priceByName.get(item.normalizedName);
    if (!prices || prices[0] !== item.priceMinor) return item;
    return {
      ...item,
      priceKind: "multiple" as const,
      priceMaxMinor: prices[1]!,
      sourceExcerpt: [item.sourceExcerpt, "Visible size prices: L " + prices[0]! / 100 + " NOK, XL " + prices[1]! / 100 + " NOK"]
        .filter(Boolean)
        .join(" — ")
        .slice(0, 1000),
    };
  });
}

/**
 * A bare h1/h2 heading followed by several independently priced dishes
 * describes a menu section, not an additional dish. Do not attach the price
 * of the preceding group menu to that heading.
 */
export function removeUnpricedParentMenuHeadings(
  html: string,
  items: readonly MenuObservedItem[],
): readonly MenuObservedItem[] {
  const $ = load(html);
  const bareHeadings = new Set<string>();
  $("h1, h2").each((_, element) => {
    const value = $(element).text().normalize("NFKC").replace(/\s+/gu, " ").trim();
    if (value && asPriceMinor(value) === null && !/\b(?:kr|NOK)\s*\d|\d+\s*,-/iu.test(value)) {
      bareHeadings.add(normalizeDishName(value));
    }
  });
  if (bareHeadings.size === 0) return items;
  const lines = visibleLines(html);
  const pricedNames = new Set(items.filter((item) => item.priceMinor !== null).map((item) => item.normalizedName));

  return items.filter((item) => {
    if (!bareHeadings.has(item.normalizedName)) return true;
    const headingLine = lines.findIndex((line) => normalizeDishName(line) === item.normalizedName);
    if (headingLine < 0) return true;

    // The next independent dish, not a directly adjacent price, must follow
    // the parent heading; otherwise this could itself be a priced h2 dish.
    let childTitleLine = -1;
    for (let offset = 1; offset <= 3; offset += 1) {
      const next = lines[headingLine + offset];
      if (!next || asPriceMinor(next) !== null) break;
      if (pricedNames.has(normalizeDishName(next)) && normalizeDishName(next) !== item.normalizedName) {
        childTitleLine = headingLine + offset;
        break;
      }
    }
    if (childTitleLine < 0) return true;

    const children = new Set<string>();
    for (const line of lines.slice(childTitleLine, headingLine + 125)) {
      const name = normalizeDishName(line);
      if (name !== item.normalizedName && pricedNames.has(name)) children.add(name);
      if (children.size >= 3) return false;
    }
    return true;
  });
}
