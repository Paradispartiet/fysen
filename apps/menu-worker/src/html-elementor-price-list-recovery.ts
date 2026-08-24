import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";
import { load, type CheerioAPI } from "cheerio";

export const HTML_ELEMENTOR_PRICE_LIST_RECOVERY_VERSION =
  "elementor-price-list-v2";

const CARD_SELECTOR = ".elementor-price-list-item";
const TITLE_SELECTOR = ".elementor-price-list-title";
const PRICE_SELECTOR = ".elementor-price-list-price";
const DESCRIPTION_SELECTOR = ".elementor-price-list-description";
const PRICE =
  /^(?:(?:NOK|kr\.?)\s*)?([1-9]\d{1,3})(?:[.,](\d{1,2}))?(?:\s*(?:,-|kr\.?|NOK))?$/iu;
const UI_TITLE =
  /^(?:menu|meny|drinks?|drikke|events?|kontakt|contact|booking|reservations?)$/iu;

function normalizeText(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}

function parsePriceMinor(value: string): number | null {
  const match = normalizeText(value).match(PRICE);
  if (!match?.[1]) return null;
  const whole = Number(match[1]);
  const decimals = (match[2] ?? "").padEnd(2, "0").slice(0, 2);
  const priceMinor = whole * 100 + Number(decimals || "0");
  return priceMinor >= 4_000 && priceMinor <= 1_000_000
    ? priceMinor
    : null;
}

function plausibleTitle(value: string): boolean {
  const title = normalizeText(value);
  return (
    title.length >= 2 &&
    title.length <= 220 &&
    /\p{L}/u.test(title) &&
    !UI_TITLE.test(title) &&
    !/^(?:https?:\/\/|www\.|©|™)/iu.test(title)
  );
}

function headingLevel(tagName: string): number | null {
  const match = tagName.toLocaleLowerCase().match(/^h([1-6])$/u);
  return match?.[1] ? Number(match[1]) : null;
}

function broaderHeadingPriceCardCount($: CheerioAPI): number {
  const headings = $("h1, h2, h3, h4, h5, h6").toArray();
  let count = 0;

  for (let index = 0; index < headings.length; index += 1) {
    const heading = headings[index];
    if (!heading) continue;
    const level = headingLevel(heading.tagName);
    const title = normalizeText($(heading).text());
    if (level === null || !plausibleTitle(title) || parsePriceMinor(title) !== null)
      continue;

    for (let nextIndex = index + 1; nextIndex < headings.length; nextIndex += 1) {
      const nextHeading = headings[nextIndex];
      if (!nextHeading) break;
      const nextLevel = headingLevel(nextHeading.tagName);
      const nextText = normalizeText($(nextHeading).text());
      if (nextLevel === null) continue;
      if (nextLevel <= level) break;

      if (parsePriceMinor(nextText) !== null) {
        count += 1;
        break;
      }

      // A nested semantic heading before a price means the outer heading was a
      // section/container label, not the dish title for that price.
      if (plausibleTitle(nextText)) break;
    }
  }

  return count;
}

export function recoverElementorPriceListHtmlItems(
  html: string,
): readonly MenuObservedItem[] {
  const $ = load(html);
  const cards = $(CARD_SELECTOR);
  if (cards.length < 4) return [];

  const items: MenuObservedItem[] = [];
  const normalizedNames = new Set<string>();
  let invalid = false;

  cards.each((position, element) => {
    if (invalid) return;
    const card = $(element);
    const titles = card.find(TITLE_SELECTOR);
    const prices = card.find(PRICE_SELECTOR);
    if (titles.length !== 1 || prices.length !== 1) {
      invalid = true;
      return;
    }

    const name = normalizeText(titles.first().text());
    const priceText = normalizeText(prices.first().text());
    const priceMinor = parsePriceMinor(priceText);
    const normalizedName = normalizeDishName(name);
    if (
      !plausibleTitle(name) ||
      priceMinor === null ||
      !normalizedName ||
      normalizedNames.has(normalizedName)
    ) {
      invalid = true;
      return;
    }
    normalizedNames.add(normalizedName);

    const description =
      normalizeText(card.find(DESCRIPTION_SELECTOR).first().text()) || null;
    items.push({
      sourceKey: createMenuItemSourceKey(name),
      name,
      normalizedName,
      description,
      sectionName: null,
      priceMinor,
      currency: "NOK",
      position,
      extractionMethod: "html_heuristic",
      confidence: 0.995,
      sourceExcerpt: [
        `${name} ${priceText}`,
        description,
      ]
        .filter(Boolean)
        .join(" — ")
        .slice(0, 1000),
    });
  });

  if (invalid || items.length !== cards.length) return [];

  const broaderHeadingCards = broaderHeadingPriceCardCount($);
  if (
    broaderHeadingCards >= Math.max(
      items.length + 2,
      Math.ceil(items.length * 1.5),
    )
  ) {
    return [];
  }

  return items;
}
