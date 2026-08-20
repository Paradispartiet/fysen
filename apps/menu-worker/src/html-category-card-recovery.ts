import { load } from "cheerio";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
  type MenuPriceKind,
} from "@fysen/menu-core";

export const HTML_CATEGORY_CARD_RECOVERY_VERSION = "category-cards-v2";

const CATEGORY_SECTION = "[data-testid='menu-category-section']";
const CATEGORY_TITLE = "[data-testid='menu-category-section-title']";
const PRODUCT_CARD = "[data-testid='menu-product']";
const PRODUCT_NAME = "[data-testid='menu-product-name']";
const PRODUCT_PRICE = "[data-testid='menu-product-price']";
const PRODUCT_DESCRIPTION = "[data-testid='menu-product-description']";
const BEVERAGE_SECTION = /^(?:drikke(?:meny)?|drinks?(?:\s+menu)?|beverages?(?:\s+menu)?|andre\s+drikker?|other\s+drinks?|bar(?:\s+menu)?|mineralvann|soft\s+drinks?|sodas?|brus|vinkart|vin(?:kart|liste|meny)?|wine(?:\s+(?:list|menu))?|cocktails?|champagne(?:\s+cocktails?)?|øl(?:\s*,?\s*cider.*)?|beer(?:s)?(?:\s*,?\s*cider.*)?|alkoholfritt|non[- ]alcoholic(?:\s+drinks?)?|kaffedrinker|coffee\s+drinks?|kaffe\/te.*|coffee\/tea.*)$/iu;
const PRICE_LINE = /^(?:(fra|from)\s+)?(?:(?:NOK|kr\.?)\s*)?([1-9]\d{0,3})(?:([.,])(\d{1,3}))?(?:\s*(?:,-|kr\.?|NOK))?$/iu;

interface ParsedPrice {
  readonly priceMinor: number;
  readonly priceKind: MenuPriceKind;
}

function normalizeText(value: string): string {
  return value.normalize("NFKC").replace(/\s+/gu, " ").trim();
}

function parsePrice(value: string): ParsedPrice | null {
  const match = normalizeText(value).match(PRICE_LINE);
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

export function recoverSemanticCategoryCardHtmlItems(html: string): readonly MenuObservedItem[] {
  const $ = load(html);
  const sections = $(CATEGORY_SECTION).toArray();
  if (sections.length < 2) return [];

  const items: MenuObservedItem[] = [];
  const categoryNames = new Set<string>();
  let hasBeverageSection = false;
  let position = 0;

  for (const section of sections) {
    const sectionName = normalizeText($(section).find(CATEGORY_TITLE).first().text());
    if (!sectionName) continue;
    if (BEVERAGE_SECTION.test(sectionName)) {
      hasBeverageSection = true;
      continue;
    }

    const cards = $(section).find(PRODUCT_CARD).toArray();
    if (cards.length === 0) continue;
    categoryNames.add(normalizeDishName(sectionName));

    for (const card of cards) {
      const name = normalizeText($(card).find(PRODUCT_NAME).first().text());
      const priceText = normalizeText($(card).find(PRODUCT_PRICE).first().text());
      const price = parsePrice(priceText);
      if (!name || !/\p{L}/u.test(name) || !price) continue;

      const description = normalizeText($(card).find(PRODUCT_DESCRIPTION).first().text()) || null;
      const sourceKey = createMenuItemSourceKey(name, sectionName);
      items.push({
        sourceKey,
        name,
        normalizedName: normalizeDishName(name),
        description,
        sectionName,
        priceMinor: price.priceMinor,
        priceKind: price.priceKind,
        priceMaxMinor: null,
        currency: "NOK",
        position,
        extractionMethod: "html_heuristic",
        confidence: 0.99,
        sourceExcerpt: `${sectionName} — ${name} — ${priceText}`.slice(0, 1000),
      });
      position += 1;
    }
  }

  const hasStrongCategoryEvidence =
    categoryNames.size >= 2 || (categoryNames.size === 1 && hasBeverageSection);
  if (!hasStrongCategoryEvidence || items.length < 4) return [];
  return items;
}
