import { load } from "cheerio";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
  type MenuPriceKind,
} from "@fysen/menu-core";

export const HTML_STRONG_TITLE_PRICE_RECOVERY_VERSION = "strong-title-price-v3";

const PRICE_LINE = /^(?:(fra|from)\s+)?(?:(?:NOK|kr\.?)\s*)?([1-9]\d{0,3})(?:([.,])(\d{1,3}))?\s*(?:,?[-–—]|,-|kr\.?|NOK)?(?:\s+per\s+(?:person|personer?|persons?))?(?:\s+minimum\s+\d+\s+(?:personer?|persons?))?$/iu;
const SEPARATOR_LINE = /^(?:[-–—•·]\s*)+$/u;
const ROOT_OR_UI_HEADING = /^(?:menu|meny|our\s+menu|vår\s+meny|opening(?:\s+hours)?|åpningstider|contact|kontakt|booking|reservation(?:s)?|reservasjoner?)$/iu;

interface ParsedPrice {
  readonly priceMinor: number;
  readonly priceKind: MenuPriceKind;
}

function normalizeText(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/[\u200B-\u200D\uFEFF]/gu, "")
    .replace(/\s+/gu, " ")
    .trim();
}

function parsePrice(value: string): ParsedPrice | null {
  const match = normalizeText(value).replace(/(\d)\.\s*[-–—]$/u, "$1,-").match(PRICE_LINE);
  if (!match?.[2]) return null;

  const separator = match[3] ?? null;
  const trailingDigits = match[4] ?? "";
  let whole = Number(match[2]);
  let decimals = "";

  if (separator === "." && trailingDigits.length === 3) {
    whole = Number(`${match[2]}${trailingDigits}`);
  } else {
    if (trailingDigits.length > 2) return null;
    decimals = trailingDigits.padEnd(2, "0").slice(0, 2);
  }

  const priceMinor = whole * 100 + Number(decimals || "0");
  if (priceMinor < 4_000 || priceMinor > 1_000_000) return null;
  return {
    priceMinor,
    priceKind: match[1] ? "from" : "exact",
  };
}

function looksLikeTitle(value: string): boolean {
  const title = normalizeText(value);
  if (!title || title.length < 2 || title.length > 180 || !/\p{L}/u.test(title)) return false;
  if (PRICE_LINE.test(title) || SEPARATOR_LINE.test(title)) return false;
  if (/^(?:©|™|https?:\/\/|www\.|phone\s*:|telefon\s*:)/iu.test(title)) return false;
  return title.split(/\s+/u).filter(Boolean).length <= 16;
}

const FOOD_SECTION = /^(?:forretter?|starters?|appetizers?|småretter|small plates|hovedretter?|mains?|main courses?|desserter?|desserts?|tilbehør|sides?)$/iu;
const INLINE_PRICE = /^(.+?)\s+((?:(?:fra|from)\s+)?(?:(?:NOK|kr\.?)\s*)?[1-9]\d{0,3}(?:[.,]\d{1,3})?\s*(?:[.,]?\s*[-–—]|kr\.?|NOK)?)$/iu;
const MARKED_AMOUNT = /(?:\b(?:kr\.?|NOK)\s*[1-9]\d{0,3}(?:[.,]\d{1,3})?|\b[1-9]\d{0,3}(?:[.,]\d{1,3})?\s*(?:kr\.?|NOK)\b|\b[1-9]\d{0,3}\s*[.,]\s*[-–—])/giu;

/** A price belongs to its own BR-delimited bold line, even when italic
 * emphasis is nested inside the bold text. Unlike a translation after a
 * bold title, the whole paragraph must be owned by strong markup. */
function analyzeEmphasizedPriceLines(html: string): { items: MenuObservedItem[]; complete: boolean } {
  const $ = load(html);
  $("script, style, noscript, svg, template, nav, header, footer, [hidden], [aria-hidden='true']").remove();
  $("[style]").each((_, node) => {
    if (/(?:display\s*:\s*none|visibility\s*:\s*hidden)/iu.test($(node).attr("style") ?? "")) $(node).remove();
  });
  const allergenCodes = new Set<string>();
  $("p, li").each((_, node) => {
    const text = $(node).text();
    const legend = text.match(/allergener?:\s*([\s\S]*)/iu)?.[1];
    for (const code of legend?.match(/\b[A-ZÆØÅ]{1,3}\b/gu) ?? []) allergenCodes.add(code);
  });
  const withoutCodes = (text: string): string => {
    const suffix = text.match(/\s+([A-ZÆØÅ]{1,3}(?:[.,]\s*[A-ZÆØÅ]{1,3})*)\s*$/u);
    return suffix && suffix[1]!.split(/[.,]\s*/u).every(code => allergenCodes.has(code))
      ? text.slice(0, suffix.index).trim() : text;
  };
  const items: MenuObservedItem[] = [];
  let sectionName: string | null = null;
  let complete = true;
  let visitedAmounts = 0;
  $("h1, h2, h3, h4, h5, h6, p, li").each((_, node) => {
    const block = $(node);
    if (block.find("p, li").length) return;
    const copy = block.clone();
    copy.find("br").replaceWith("\n");
    const lines = copy.text().split(/\n|\r|\u2028|\u2029/u).map(normalizeText).filter(Boolean);
    visitedAmounts += lines.reduce((total, line) => total + [...line.matchAll(MARKED_AMOUNT)].length, 0);
    if (lines.some(line => parsePrice(line) !== null || /(?:\b(?:EUR|USD|GBP|SEK|DKK)\s*\d|[€$£]\s*\d|\d[\d.,]*\s*[€$£])/iu.test(line))) complete = false;
    if (block.is("h1, h2, h3, h4, h5, h6")) {
      const heading = normalizeText(block.text());
      sectionName = FOOD_SECTION.test(heading) ? heading : null;
      // A separately headed multi-course menu is a bundle, rather than an
      // independently orderable dish. Only this heading's amount is exempt;
      // later unbound priced paragraphs still fail the coverage proof.
      const headingAmounts = [...heading.matchAll(MARKED_AMOUNT)];
      const bundleHeading = headingAmounts.length === 1 && /\b(?:\d+\s*retters.*meny|\d+\s*course.*menu)\b/iu.test(heading);
      if (headingAmounts.length && !bundleHeading) complete = false;
      const datedMenuHeading = /^[\p{L}\s]*(?:meny(?:en)?|menu)\s+20\d{2}\s*[-–—]\s*(?:serveres fra|served from)\s*(?:[1-9]|[12]\d|3[01])\.?\s+(?:januar|februar|mars|april|mai|juni|juli|august|september|oktober|november|desember|january|february|march|may|june|july|october|december)(?:\s+(?:frem til jul|until christmas))?$/iu.test(heading);
      const residualHeading = heading.replace(MARKED_AMOUNT, " ")
        .replace(/\b\d+\s*(?:retters|courses?)\b/iu, " ");
      if (!datedMenuHeading && /(?<!\d)[1-9]\d{1,3}(?:[.,]\d+)?(?!\d)/u.test(residualHeading)) complete = false;
      return;
    }
    const outsideStrong = block.clone();
    outsideStrong.find("strong").remove();
    const ownedBoldLines = Boolean(sectionName) && !normalizeText(outsideStrong.text()) && block.find("strong em, strong i").length > 0 && block.find("em > strong, i > strong, a").length === 0;
    const offers: { index: number; title: string; price: ParsedPrice; instruction: string | null }[] = [];
    for (const [index, line] of lines.entries()) {
      const marked = [...line.matchAll(MARKED_AMOUNT)];
      if (!marked.length) continue;
      const match = line.match(INLINE_PRICE);
      const rawTitle = withoutCodes(match?.[1] ?? "");
      const price = match && marked.length === 1 ? parsePrice(match[2] ?? "") : null;
      const instruction = rawTitle.match(/^(.+?)\s*[-–—]\s*((?:.+?\s+)?(?:serveres|served)\b.+)$/iu)?.[2] ?? null;
      if (!ownedBoldLines || !price || !looksLikeTitle(rawTitle) || /\b\d+(?:[.,]\d+)?\s*(?:(?:kr\.?|NOK)\s*)?(?:[/,;|+&:–—-]|og|eller|and|or)\s*$/iu.test(rawTitle) || /^(?:allergens?|allergener)\s*:/iu.test(rawTitle) || [...rawTitle.matchAll(MARKED_AMOUNT)].length) {
        complete = false;
        continue;
      }
      offers.push({ index, title: rawTitle, price, instruction });
    }
    for (const [offerIndex, offer] of offers.entries()) {
      const end = offers[offerIndex + 1]?.index ?? lines.length;
      const detailLines = lines.slice(offer.index + 1, end);
      const legendIndex = detailLines.findIndex(line => /^(?:allergens?|allergener)\s*:/iu.test(line));
      const description = [offer.instruction, ...(legendIndex < 0 ? detailLines : detailLines.slice(0, legendIndex))
        .map(withoutCodes)].filter(Boolean).join(" ") || null;
      items.push({
        sourceKey: createMenuItemSourceKey(offer.title, sectionName), name: offer.title,
        normalizedName: normalizeDishName(offer.title), description, sectionName,
        priceMinor: offer.price.priceMinor, priceKind: offer.price.priceKind, priceMaxMinor: null,
        currency: "NOK", position: items.length, extractionMethod: "html_heuristic", confidence: 0.995,
        sourceExcerpt: [sectionName, ...lines.slice(offer.index, end)].filter(Boolean).join(" — ").slice(0, 1000),
      });
    }
  });
  const visibleCopy = $("body").clone();
  visibleCopy.find("h1, h2, h3, h4, h5, h6").remove();
  // Contact overlays can be siblings of the menu rather than semantic headers.
  // Exempt only a postal-address-shaped paragraph inside an address/contact
  // container; never discard the whole container, which could contain food.
  visibleCopy.find("p").each((_, node) => {
    const paragraph = $(node);
    if (paragraph.closest("address, [itemprop='address'], [class*='address'], [class*='contact'], [id*='contact']").length &&
        /^\d{1,5}\s+[\p{L} .'-]+,\s*[\p{L} .'-]+,\s*\d{4,6}$/u.test(normalizeText(paragraph.text()))) paragraph.remove();
  });
  visibleCopy.find("br").replaceWith("\n");
  visibleCopy.find("p, li, div, section, article, h1, h2, h3, h4, h5, h6").prepend("\n").append("\n");
  const visibleText = visibleCopy.text();
  const visibleAmounts = [...$("body").text().matchAll(MARKED_AMOUNT)].length;
  const unboundBarePrice = visibleText.split(/\n|\r/u).some(rawLine => {
    const normalizedLine = normalizeText(rawLine);
    // Telephone area-code formatting and clock times are explicit UI metadata.
    if (/^(?:\+\d{1,3}\s*)?\(\d{2,4}\)\s*\d{3,4}[-\s]\d{4}$/u.test(normalizedLine)) return false;
    const line = normalizedLine.replace(MARKED_AMOUNT, " ")
      .replace(/\b(?:[01]?\d|2[0-3]):[0-5]\d\b/gu, " ")
      // Explicit weights, volumes, counts, and servings are quantity facts.
      .replace(/\d+(?:[.,]\d+)?\s*(?:kg|g|ml|cl|dl|l|stk\.?|pcs|pieces?|ganger|times|personer?|persons?)\b/giu, " ")
      .replace(/^\d+[.)]\s+/u, "");
    return /(?<!\d)[1-9]\d{1,3}(?:[.,]\d+)?(?!\d)/u.test(line);
  });
  const foreignPrice = /(?:\b(?:EUR|USD|GBP|SEK|DKK)\s*\d|[€$£]\s*\d|\d[\d.,]*\s*[€$£])/iu.test(visibleText);
  const pricesBySourceKey = new Map<string, string>();
  for (const item of items) {
    const price = `${item.priceMinor}\u0000${item.priceKind}`;
    const previous = pricesBySourceKey.get(item.sourceKey);
    if (previous !== undefined && previous !== price) complete = false;
    pricesBySourceKey.set(item.sourceKey, price);
  }
  const unique = new Map(items.map(item => [`${item.sourceKey}\u0000${item.priceMinor}\u0000${item.priceKind}`, item]));
  const uniqueItems = [...unique.values()].map((item, position) => ({ ...item, position }));
  return { items: uniqueItems, complete: complete && !unboundBarePrice && !foreignPrice && visibleAmounts === visitedAmounts && uniqueItems.length >= 6 };
}

/** Strict proof for preferring these line cards over noisier, larger flattened
 * output: every visible marked amount must own one recovered offer, except a
 * separately headed multi-course bundle. */
export function hasCompleteStrongTitlePriceLineCoverage(html: string): boolean {
  return analyzeEmphasizedPriceLines(html).complete;
}

export function recoverStrongTitlePriceHtmlItems(html: string): readonly MenuObservedItem[] {
  const lineRecovery = analyzeEmphasizedPriceLines(html);
  if (lineRecovery.complete) return lineRecovery.items;
  const $ = load(html);
  $("script, style, noscript, svg, template").remove();

  const recovered: MenuObservedItem[] = [];
  let position = 0;

  $("p, li").each((_, element) => {
    const block = $(element);
    const fullText = normalizeText(block.text());
    if (!fullText) return;

    // A bold, directly priced first line is stronger title evidence than
    // generic word-count/ingredient-list description heuristics. Preserve
    // the BR boundary so allergens and translated titles cannot own a price.
    const firstLineHtml = (block.html() ?? "").split(/<br\s*\/?\s*>/iu)
      .find((fragment) => normalizeText(load(fragment).text()));
    if (firstLineHtml) {
      const line = load(firstLineHtml);
      const lineText = normalizeText(line.text());
      const inline = lineText.match(/^(.+?)\s+((?:(?:fra|from)\s+)?(?:(?:NOK|kr\.?)\s*)?[1-9]\d{0,3}(?:[.,]\d{1,3})?\s*(?:[.,]?\s*[-–—]|kr\.?|NOK)?)$/iu);
      const rawTitle = inline?.[1] ?? "";
      const priceText = inline?.[2] ?? "";
      const boldText = normalizeText(line("strong").toArray().map((node) => line(node).text()).join(" "));
      const price = /(?:\bkr\b|\bNOK\b|[.,]\s*[-–—])/iu.test(priceText) ? parsePrice(priceText) : null;
      // An earlier amount followed by an alternative separator is another
      // price, not part of the title. Do not fall back to a sibling's price.
      if (price && (
        /\b(?:kr\.?|NOK)\s*\d|\d\s*(?:kr\.?|NOK)\b|\d\s*[.,]\s*[-–—]/iu.test(rawTitle) ||
        /\b\d+(?:[.,]\d+)?\s*(?:(?:kr\.?|NOK)\s*)?(?:[/,;|+&:–—-]|og|eller|and|or)\s*$/iu.test(rawTitle)
      )) return;
      const instruction = rawTitle.match(/^(.+?)\s+[-–—]\s+(.+\b(?:serveres|served)\b.+)$/iu);
      const title = instruction?.[1] ?? rawTitle;
      if (price && looksLikeTitle(title) && boldText.startsWith(rawTitle) &&
          line("em, i, a").length === 0 &&
          !/^(?:allergens?|allergener)\s*:/iu.test(title) &&
          !/\b(?:kr\.?|NOK)\s*\d|\d\s*[.,]\s*[-–—]/iu.test(title)) {
        const rawSectionName = normalizeText(block.prevAll("h1, h2, h3, h4, h5, h6").first().text());
        const sectionName = rawSectionName && !ROOT_OR_UI_HEADING.test(rawSectionName) ? rawSectionName : null;
        const description = [instruction?.[2], normalizeText(fullText.slice(lineText.length))].filter(Boolean).join(" ") || null;
        recovered.push({
          sourceKey: createMenuItemSourceKey(title, sectionName),
          name: title,
          normalizedName: normalizeDishName(title),
          description,
          sectionName,
          priceMinor: price.priceMinor,
          priceKind: price.priceKind,
          priceMaxMinor: null,
          currency: "NOK",
          position,
          extractionMethod: "html_heuristic",
          confidence: 0.995,
          sourceExcerpt: fullText.slice(0, 1000),
        });
        position += 1;
        return;
      }
    }

    const strongTexts = block
      .find("strong")
      .toArray()
      .map((strong) => normalizeText($(strong).text()))
      .filter(Boolean);
    if (strongTexts.length === 0) return;

    const firstStrong = strongTexts[0] ?? "";
    if (!firstStrong || !fullText.toLocaleLowerCase().startsWith(firstStrong.toLocaleLowerCase())) return;

    const combinedStrong = normalizeText(strongTexts.join(" "));
    const title =
      combinedStrong && fullText.toLocaleLowerCase() === combinedStrong.toLocaleLowerCase()
        ? combinedStrong
        : firstStrong;
    if (!looksLikeTitle(title)) return;

    const inlineDescription = normalizeText(fullText.slice(title.length)) || null;
    let sibling = block.next();
    let standaloneDescription: string | null = null;
    let price: ParsedPrice | null = null;
    let priceText: string | null = null;

    for (let step = 0; step < 5 && sibling.length > 0; step += 1) {
      const siblingText = normalizeText(sibling.text());
      if (!siblingText || SEPARATOR_LINE.test(siblingText)) {
        sibling = sibling.next();
        continue;
      }
      if (sibling.is("h1, h2, h3, h4, h5, h6")) break;

      if (sibling.is("p, li")) {
        const nextStrong = normalizeText(sibling.find("strong").first().text());
        if (
          nextStrong &&
          siblingText.toLocaleLowerCase().startsWith(nextStrong.toLocaleLowerCase())
        ) {
          break;
        }
      }

      const parsed = parsePrice(siblingText);
      if (parsed) {
        price = parsed;
        priceText = siblingText;
        break;
      }

      const canUseStandaloneDescription =
        inlineDescription === null &&
        standaloneDescription === null &&
        sibling.find("strong").length === 0 &&
        siblingText.length <= 420;
      if (!canUseStandaloneDescription) break;
      standaloneDescription = siblingText;
      sibling = sibling.next();
    }

    if (!price || !priceText) return;

    const rawSectionName = normalizeText(
      block.prevAll("h1, h2, h3, h4, h5, h6").first().text(),
    );
    const sectionName =
      rawSectionName && !ROOT_OR_UI_HEADING.test(rawSectionName)
        ? rawSectionName
        : null;
    const description = inlineDescription ?? standaloneDescription;
    const sourceKey = createMenuItemSourceKey(title, sectionName);
    recovered.push({
      sourceKey,
      name: title,
      normalizedName: normalizeDishName(title),
      description,
      sectionName,
      priceMinor: price.priceMinor,
      priceKind: price.priceKind,
      priceMaxMinor: null,
      currency: "NOK",
      position,
      extractionMethod: "html_heuristic",
      confidence: 0.995,
      sourceExcerpt: `${sectionName ? `${sectionName} — ` : ""}${fullText}${standaloneDescription ? ` — ${standaloneDescription}` : ""} — ${priceText}`.slice(0, 1000),
    });
    position += 1;
  });

  if (recovered.length < 6) return [];

  const unique = new Map<string, MenuObservedItem>();
  for (const item of recovered) {
    const key = `${item.sourceKey}\u0000${item.priceMinor}\u0000${item.priceKind}`;
    if (!unique.has(key)) unique.set(key, item);
  }
  const items = [...unique.values()];
  if (items.length < 6) return [];
  return items.map((item, index) => ({ ...item, position: index }));
}
