import { load } from "cheerio";
import { createMenuItemSourceKey, normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";

export const HTML_PARAGRAPH_TITLE_PRICE_RECOVERY_VERSION = "paragraph-title-price-card-v1";

const FOOD_SECTION = /^(?:forretter?|starters?|appetizers?|småretter|small plates|hovedretter?|mains?|main courses?|desserter?|desserts?|tilbehør|sides?|salater?|salads?)$/iu;
const EXACT_PRICE = /^(?:(?:kr\.?|NOK)\s*([1-9]\d{1,3})(?:[.,](\d{1,2}))?|([1-9]\d{1,3})(?:[.,](\d{1,2}))?\s*(?:kr\.?|NOK))$/iu;
const MARKED_PRICE = /(?:\b(?:kr\.?|NOK)\s*\d|\b\d+(?:[.,]\d+)?\s*(?:kr\.?|NOK)\b|\b\d+\s*,\s*[-–—])/giu;

function clean(value: string): string {
  return value.normalize("NFKC").replace(/\s+/gu, " ").trim();
}

function hasUnsupportedAmount(value: string): boolean {
  return /(?:^|[^\d])[1-9]\d{1,3}(?:[.,]\d{1,2})?(?!\d)/u.test(value)
    || /(?:\b(?:EUR|USD|GBP|SEK|DKK)\s*\d|\d[\d.,]*\s*[€$£]|[€$£]\s*\d)/iu.test(value);
}

function isFoodSection(value: string): boolean {
  // Bilingual section labels retain the exact displayed source label.
  return value.split(/\s+[-–—/]\s+/u).every((part) => FOOD_SECTION.test(part));
}

/** Recover only structurally complete, single-offer paragraphs/cards. A title
 * and its final currency-marked price must be the two emphasized elements of
 * the same card. The first <br> separates the title from any description inside
 * the leading emphasis; later translations never become separate offers. */
function analyzeParagraphTitlePriceCards(html: string): { items: readonly MenuObservedItem[]; unboundPrices: boolean } {
  const $ = load(html);
  $("script, style, noscript, template, svg, nav, footer, header, [hidden], [aria-hidden='true'], .w-condition-invisible").remove();
  $("[style]").each((_, node) => {
    if (/(?:display\s*:\s*none|visibility\s*:\s*hidden)/iu.test($(node).attr("style") ?? "")) $(node).remove();
  });

  const recovered = new Map<string, MenuObservedItem>();
  const conflicted = new Set<string>();
  let sectionName: string | null = null;
  let position = 0;
  $("h1, h2, h3, h4, h5, h6, p, article, li, .menu-item").each((_, node) => {
    const element = $(node);
    if (element.is("h1, h2, h3, h4, h5, h6")) {
      const heading = clean(element.text());
      sectionName = isFoodSection(heading) ? heading : null;
      return;
    }
    if (!sectionName || element.find("p, article, li, .menu-item, h1, h2, h3, h4, h5, h6").length) return;

    const emphasized = element.find("strong, b");
    if (emphasized.length !== 2) return;
    const titleNode = emphasized.eq(0);
    const priceNode = emphasized.eq(1);
    const priceText = clean(priceNode.text());
    const match = priceText.match(EXACT_PRICE);
    if (!match) return;
    const whole = match[1] ?? match[3];
    const decimals = match[2] ?? match[4] ?? "";
    const priceMinor = Number(whole) * 100 + Number(decimals.padEnd(2, "0"));
    if (priceMinor < 4_000 || priceMinor > 1_000_000) return;

    const titleCopy = titleNode.clone();
    titleCopy.find("br").replaceWith("\n");
    const name = clean(titleCopy.text().split(/\n|\r|\u2028|\u2029/u)[0] ?? "");
    if (!name || name.length > 180 || !/\p{L}/u.test(name) || isFoodSection(name) || [...name.matchAll(MARKED_PRICE)].length) return;

    const cardCopy = element.clone();
    cardCopy.find("br").replaceWith("\n");
    const lines = cardCopy.text().split(/\n|\r|\u2028|\u2029/u).map(clean).filter(Boolean);
    if (lines[0] !== name || lines.at(-1) !== priceText) return;
    if (lines.slice(0, -1).some(hasUnsupportedAmount)) return;
    // Any additional currency amount is ambiguous (including an add-on): do
    // not silently assign one amount or manufacture a range/variant.
    if ([...cardCopy.text().matchAll(MARKED_PRICE)].length !== 1) return;

    const sourceKey = createMenuItemSourceKey(name, sectionName);
    if (conflicted.has(sourceKey)) return;
    const existing = recovered.get(sourceKey);
    if (existing && existing.priceMinor !== priceMinor) {
      recovered.delete(sourceKey);
      conflicted.add(sourceKey);
      return;
    }
    // Removing only validated cards leaves every unsupported visible amount
    // available for the whole-source coverage gate below.
    element.remove();
    if (existing) return;
    recovered.set(sourceKey, {
      sourceKey, name, normalizedName: normalizeDishName(name),
      description: lines.slice(1, -1).join(" ") || null,
      sectionName, priceMinor, priceKind: "exact", priceMaxMinor: null,
      currency: "NOK", position: position++, extractionMethod: "html_heuristic", confidence: 0.99,
      sourceExcerpt: [sectionName, ...lines].join(" — ").slice(0, 1000),
    });
  });
  $("br").replaceWith("\n");
  $("p, div, section, article, li, h1, h2, h3, h4, h5, h6").each((_, node) => {
    $(node).prepend("\n").append("\n");
  });
  const remainingText = $("body").text();
  const hasUnmarkedAmount = remainingText.split(/\n|\r/u).some((rawLine) => {
    const line = clean(rawLine);
    // A dated menu notice is metadata. Any other remaining two-to-four digit
    // amount may belong to a dish, including inline bare prices and allergens.
    if (/^(?:gjelder\s+fra\s+)?\d{1,2}\.?\s+(?:januar|februar|mars|april|mai|juni|juli|august|september|oktober|november|desember)\s+\d{4}[.!]?$/iu.test(line)) return false;
    return hasUnsupportedAmount(line);
  });
  const hasForeignAmount = /(?:\b(?:EUR|USD|GBP|SEK|DKK)\s*\d|\d[\d.,]*\s*[€$£]|[€$£]\s*\d)/iu.test(remainingText);
  return {
    items: [...recovered.values()],
    unboundPrices: conflicted.size > 0 || hasUnmarkedAmount || hasForeignAmount || [...remainingText.matchAll(MARKED_PRICE)].length > 0,
  };
}

export function recoverCompleteParagraphTitlePriceHtmlCards(html: string): readonly MenuObservedItem[] {
  if (!/<(?:strong|b)\b/iu.test(html) || !/\b(?:kr|NOK)\b/iu.test(html)) return [];
  const result = analyzeParagraphTitlePriceCards(html);
  return result.items.length >= 3 && !result.unboundPrices ? result.items : [];
}

export function recoverParagraphTitlePriceHtmlCards(html: string): readonly MenuObservedItem[] {
  return analyzeParagraphTitlePriceCards(html).items;
}

/** Safe replacement requires a nonempty recovered set AND no visible currency
 * prices outside accepted cards. Dates, scripts, hidden UI and navigation do
 * not count. Unsupported standalone/foreign-currency amounts block replacement. */
export function hasPricesOutsideParagraphTitleCards(html: string): boolean {
  return analyzeParagraphTitlePriceCards(html).unboundPrices;
}
