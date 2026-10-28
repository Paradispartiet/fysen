import { load } from "cheerio";
import { normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";
import { extractHtmlVisibleText } from "./html-extractor.js";

export const HTML_VISIBLE_LAYOUT_RECONCILIATION_VERSION = "visible-layout-v6";

const NUMBERED_MENU_TITLE = /^(\d{1,2})\s*[.)]\s*(.+)$/u;
const STANDALONE_PRICE = /^(?:kr\.?\s*)?([1-9]\d{1,3})(?:\s*,\s*[-–])?$/iu;

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
  const labelledSizes = /(?:^|\b)L\s*XL\b/iu.test(header);
  const pizzaSection = /\bPIZZA\b/iu.test(header);
  const priceByName = new Map<string, readonly number[]>();
  let inferredSizesFromRepeatedRows = false;
  for (const [index, title] of titles.entries()) {
    const next = titles[index + 1]?.line ?? Math.min(lines.length, title.line + 55);
    const blockLines = lines.slice(title.line + 1, Math.min(next, title.line + 55));
    const prices = blockLines.flatMap((line) => {
      const whole = asPriceMinor(line);
      if (whole !== null) return [whole];
      // Some websites render the currency marker in adjacent inline spans,
      // yielding a single text node such as "255,-400,-".
      const inlinePrices = [...line.matchAll(/(?<!\d)([1-9]\d{1,3})\s*,\s*-/gu)]
        .map((match) => Number(match[1]) * 100)
        .filter((amount) => amount >= 4_000 && amount <= 1_000_000);
      return inlinePrices;
    });
    if (prices.length === 2 && prices[1]! > prices[0]!) {
      priceByName.set(title.name, prices);
    }
  }
  // Text extraction can concatenate separate inline price spans. Read a
  // second, tag-boundary-preserving view only for independently named dishes;
  // require a repeated sequence, and agreement with the structured base price.
  if (priceByName.size < 4) {
    const $ = load(html);
    $("script, style, noscript, svg, template").remove();
    const withSpaces = ($("body").html() ?? "").replace(/<[^>]+>/gu, " ");
    const decoded = load("<body>" + withSpaces + "</body>")("body").text();
    const flattened = normalizeDishName(decoded);
    const placements = items
      .map((item) => ({ item, start: flattened.indexOf(item.normalizedName) }))
      .filter((entry) => entry.start >= 0)
      .sort((left, right) => left.start - right.start);
    const candidatePairs = new Map<string, readonly number[]>();
    for (const [index, placement] of placements.entries()) {
      const start = placement.start + placement.item.normalizedName.length;
      const next = placements[index + 1]?.start ?? flattened.length;
      const seasonal = flattened.indexOf("seasonal pizza", start);
      const nextSection = flattened.indexOf("sides", start);
      const end = Math.min(
        next,
        seasonal >= 0 ? seasonal : flattened.length,
        nextSection >= 0 ? nextSection : flattened.length,
        start + 600,
      );
      if (end <= start) continue;
      const prices = [...flattened.slice(start, end).matchAll(/\b([1-9]\d{1,3})\b/gu)]
        .map((match) => Number(match[1]) * 100)
        .filter((amount) => amount >= 4_000 && amount <= 1_000_000);
      const priceIndex = prices.indexOf(placement.item.priceMinor ?? -1);
      if (priceIndex >= 0 && prices[priceIndex + 1]! > prices[priceIndex]!) {
        candidatePairs.set(placement.item.normalizedName, [
          prices[priceIndex]!,
          prices[priceIndex + 1]!,
        ]);
      }
    }
    if (candidatePairs.size >= 4 && /\bpizza\b/iu.test(flattened)) {
      inferredSizesFromRepeatedRows = true;
      for (const [name, amounts] of candidatePairs) priceByName.set(name, amounts);
    }
  }
  // With the labels absent from extracted DOM text, repeated numbered pizza
  // rows with two matching prices independently establish a multi-price grid.
  if (!labelledSizes && !(pizzaSection && priceByName.size >= 4) && !inferredSizesFromRepeatedRows)
    return items;
  return items.map((item) => {
    const prices = priceByName.get(item.normalizedName);
    if (!prices || prices[0] !== item.priceMinor) return item;
    return {
      ...item,
      priceKind: "multiple" as const,
      priceMaxMinor: prices[1]!,
      sourceExcerpt: [item.sourceExcerpt, (labelledSizes ? "Visible size prices: L " : "Two visible prices: ") + prices[0]! / 100 + " NOK, " + (labelledSizes ? "XL " : "") + prices[1]! / 100 + " NOK"]
        .filter(Boolean)
        .join(" — ")
        .slice(0, 1000),
    };
  });
}

/**
 * Price bindings are stronger when the source visibly prints a number on the
 * line immediately following the exact dish title. Correct misattributions
 * from adjacent set-menu sections without guessing from nearby amounts.
 */
export function reconcileImmediatelyPricedItems(
  html: string,
  items: readonly MenuObservedItem[],
): readonly MenuObservedItem[] {
  const lines = visibleLines(html);
  const directPrices = new Map<string, number>();
  for (let index = 0; index < lines.length - 1; index += 1) {
    const name = normalizeDishName(lines[index]!);
    const price = asPriceMinor(lines[index + 1]!);
    if (name && price !== null) directPrices.set(name, price);
  }
  return items.map((item) => {
    if (item.priceKind === "multiple") return item;
    const direct = directPrices.get(item.normalizedName);
    if (direct === undefined || direct === item.priceMinor) return item;
    return {
      ...item,
      priceMinor: direct,
      priceKind: "exact" as const,
      priceMaxMinor: null,
      sourceExcerpt: [item.sourceExcerpt, "Immediately following visible price: " + direct / 100 + " NOK"]
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
    if (headingLine < 0 || item.priceMinor === null) return true;

    // Only cross the known failure boundary: a preceding priced group menu
    // supplying its price to an unpriced following section heading. Ordinary
    // h2 dish titles elsewhere must remain untouched.
    const beforeHeading = lines.slice(Math.max(0, headingLine - 45), headingLine).join(" ");
    const groupMenuScope = /(?:selskapsmenyer|group\s+menus|set\s+menus?)/iu.test(beforeHeading);
    const inheritedGroupPrice = new RegExp("(?:^|\\D)" + String(item.priceMinor / 100) + "(?:\\D|$)", "u")
      .test(beforeHeading);
    if (!groupMenuScope || !inheritedGroupPrice) return true;

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
