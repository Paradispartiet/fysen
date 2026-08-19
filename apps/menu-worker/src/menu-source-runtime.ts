import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";
import { BrowserMenuClient } from "./browser-client.js";
import {
  HTML_DESCRIPTION_TITLE_RECOVERY_VERSION,
  recoverDescriptionNamedHtmlItems,
} from "./html-description-title-recovery.js";
import { HTML_EXTRACTOR_VERSION } from "./html-extractor.js";
import {
  HTML_HEADING_NORMALIZER_VERSION,
  normalizeHtmlHeadingLineBreaks,
} from "./html-heading-normalizer.js";
import {
  HTML_PRICE_WRAPPED_RECOVERY_VERSION,
  recoverPriceWrappedHtmlItems,
} from "./html-price-wrapped-recovery.js";
import {
  extractScopedHtmlMenu,
  HTML_SOURCE_EXTRACTOR_VERSION,
} from "./html-source-extractor.js";
import { HttpMenuClient, type MenuHttpFetchResult } from "./http-client.js";
import { extractScopedPdfMenu, PDF_SOURCE_EXTRACTOR_VERSION } from "./pdf-source-extractor.js";

const DEFAULT_MAX_PDF_RESPONSE_BYTES = 8 * 1024 * 1024;
const MAX_PDF_RESPONSE_BYTES = 25 * 1024 * 1024;
const TRAILING_ALLERGEN_CODES = /\s+\((?:[A-Z0-9]{1,3})(?:\s*[,/+ ]\s*[A-Z0-9]{1,3})*\)$/u;
const TRAILING_INLINE_PRICE = /\s+[-–—]\s*(?:(?:kr\.?\s*)[1-9]\d{1,3}(?:[.,]\d{1,2})?|[1-9]\d{1,3}(?:[.,]\d{1,2})?\s*(?:,-|kr\.?|nok))$/iu;
const TRAILING_PARENTHETICAL = /\s+\([^()]{1,60}\)$/u;
const SOURCE_EXCERPT_SEPARATOR = /\s+—\s+/u;
const LEADING_MENU_NUMBER = /^\d{1,3}\s*[.)]?\s+/u;
const NON_DISH_HTML_ITEM = /^(?:legg i handlekurv|add to cart|håndlagde produkter\b|handmade products\b)/iu;
const RETAIL_APPAREL_ITEM = /\b(?:tee|t-?shirt|hoodie|sweatshirt|caps?)$/iu;
const HISTORICAL_SINCE_ITEM = /·\s*siden$/iu;
const BEVERAGE_MENU_ITEM = /^(?:(?:coca[- ]?cola|cola(?:\s+zero)?|fanta|sprite|farris(?:\s+\p{L}+)?|eplemost|(?:\p{L}+\s+)?juice|(?:\p{L}+\s+)?lassi)(?:\s+.*)?|hard\s+seltz(?:\s+.*)?|.*\b(?:pilsner|pærecider|cider|ingefærøl)\b.*|.*\bøl\b.*(?:\bflaske\b|\bglass\b|\d+[,.]\d+)|(?:rosévin|hvitvin|rødvin)(?:\s+(?:glass|flaske))?|.*\b(?:coffee|kaffe|espresso|americano|cappuccino|latte|tea|te)\b|.*\b(?:cola|ginger\s+beer)\b)$/iu;
const BOTTLED_BEVERAGE_VOLUME = /\bflaske\s+0[,.]\d{1,2}(?:\s*l)?$/iu;
export const HTML_PRICE_NOTATION_NORMALIZER_VERSION = "price-notation-v1";
export const HTML_ITEM_NAME_NORMALIZER_VERSION = "item-name-v6";
const HTML_RUNTIME_EXTRACTOR_VERSION = `${HTML_SOURCE_EXTRACTOR_VERSION}+${HTML_EXTRACTOR_VERSION}+${HTML_DESCRIPTION_TITLE_RECOVERY_VERSION}+${HTML_HEADING_NORMALIZER_VERSION}+${HTML_PRICE_NOTATION_NORMALIZER_VERSION}+${HTML_ITEM_NAME_NORMALIZER_VERSION}+${HTML_PRICE_WRAPPED_RECOVERY_VERSION}`;

export type ExtractableMenuSourceType = "html" | "json_ld" | "pdf";
export type MenuSourceFetchMode = "http" | "browser";

export interface MenuSourceSupportInput {
  readonly redirectOrigins: readonly string[];
  readonly browserDataOrigins: readonly string[];
}

const EMPTY_MENU_SOURCE_SUPPORT: MenuSourceSupportInput = {
  redirectOrigins: [],
  browserDataOrigins: [],
};

export interface MenuSourceRuntimeInput {
  readonly url: string;
  readonly sourceType: string;
  readonly fetchMode: MenuSourceFetchMode;
  readonly userAgent: string;
  readonly etag: string | null;
  readonly lastModified: string | null;
  readonly sourceSupport?: MenuSourceSupportInput;
}

export interface ExtractedMenuSource {
  readonly items: readonly MenuObservedItem[];
  readonly method: string;
  readonly extractorVersion: string;
}

type MenuContentFetchResult = Extract<MenuHttpFetchResult, { readonly kind: "content" }>;

export function normalizeHtmlPriceNotation(html: string): string {
  return html.replace(
    /(\b(?:kr\.?\s*)?[1-9]\d{1,3})(?:\s*,)?\s*\/-/giu,
    "$1,-",
  );
}

function restoreSemanticParentheticalName(item: MenuObservedItem): string {
  const excerptHead = item.sourceExcerpt
    ?.split(SOURCE_EXCERPT_SEPARATOR)[0]
    ?.replace(LEADING_MENU_NUMBER, "")
    .trim();
  if (!excerptHead || !TRAILING_PARENTHETICAL.test(excerptHead)) return item.name;
  if (TRAILING_ALLERGEN_CODES.test(excerptHead)) return item.name;

  const withoutParenthetical = excerptHead.replace(TRAILING_PARENTHETICAL, "").trim();
  if (normalizeDishName(withoutParenthetical) !== normalizeDishName(item.name)) return item.name;
  return excerptHead;
}

export function normalizeHtmlItemName(item: MenuObservedItem): MenuObservedItem {
  const restored = restoreSemanticParentheticalName(item);
  const name = restored
    .replace(TRAILING_ALLERGEN_CODES, "")
    .replace(TRAILING_INLINE_PRICE, "")
    .trim();
  if (!name || name === item.name) return item;
  return {
    ...item,
    name,
    normalizedName: normalizeDishName(name),
    sourceKey: createMenuItemSourceKey(name, item.sectionName),
  };
}

export function isCanonicalHtmlMenuItem(item: MenuObservedItem): boolean {
  const name = item.name.trim();
  return (
    /\p{L}/u.test(name) &&
    !NON_DISH_HTML_ITEM.test(name) &&
    !RETAIL_APPAREL_ITEM.test(name) &&
    !HISTORICAL_SINCE_ITEM.test(name) &&
    !BEVERAGE_MENU_ITEM.test(name) &&
    !BOTTLED_BEVERAGE_VOLUME.test(name)
  );
}

export function pdfResponseByteLimit(): number {
  const configured = Number(process.env.FYSEN_MAX_PDF_RESPONSE_BYTES);
  if (!Number.isInteger(configured) || configured <= 0) return DEFAULT_MAX_PDF_RESPONSE_BYTES;
  return Math.min(configured, MAX_PDF_RESPONSE_BYTES);
}

export function extractorVersionForSourceType(sourceType: string): string | null {
  if (sourceType === "html" || sourceType === "json_ld") return HTML_RUNTIME_EXTRACTOR_VERSION;
  if (sourceType === "pdf") return PDF_SOURCE_EXTRACTOR_VERSION;
  return null;
}

export function shouldForceReextract(sourceType: string, previousExtractorVersion: string | null): boolean {
  const currentExtractorVersion = extractorVersionForSourceType(sourceType);
  return (
    currentExtractorVersion !== null &&
    previousExtractorVersion !== null &&
    previousExtractorVersion !== currentExtractorVersion
  );
}

export function assertExtractionMethodForSourceType(sourceType: string, extractionMethod: string): void {
  if (sourceType === "json_ld" && extractionMethod !== "json_ld") {
    throw new Error(
      `Source declared json_ld but extractor resolved ${extractionMethod}; refusing implicit HTML fallback`,
    );
  }
}

export function assertSupportedMenuSource(input: Pick<MenuSourceRuntimeInput, "sourceType" | "fetchMode">): void {
  if (input.sourceType !== "html" && input.sourceType !== "json_ld" && input.sourceType !== "pdf") {
    throw new Error(`Menu runtime does not support source type ${input.sourceType}`);
  }
  if (input.fetchMode === "browser" && input.sourceType !== "html" && input.sourceType !== "json_ld") {
    throw new Error(`Browser fetch mode only supports HTML/JSON-LD sources, got ${input.sourceType}`);
  }
}

export async function fetchMenuSource(
  input: MenuSourceRuntimeInput,
  httpClient = new HttpMenuClient(),
): Promise<MenuHttpFetchResult> {
  assertSupportedMenuSource(input);
  const sourceSupport = input.sourceSupport ?? EMPTY_MENU_SOURCE_SUPPORT;
  if (input.fetchMode === "browser") {
    return new BrowserMenuClient(httpClient).fetchSource({
      url: input.url,
      userAgent: input.userAgent,
      sourceSupport,
    });
  }

  return httpClient.fetchSource(
    {
      url: input.url,
      userAgent: input.userAgent,
      etag: input.etag,
      lastModified: input.lastModified,
    },
    {
      allowedRedirectOrigins: sourceSupport.redirectOrigins,
      ...(input.sourceType === "pdf" ? { maxResponseBytes: pdfResponseByteLimit() } : {}),
    },
  );
}

export async function extractMenuSource(
  sourceType: string,
  fetched: MenuContentFetchResult,
): Promise<ExtractedMenuSource> {
  if (sourceType === "html" || sourceType === "json_ld") {
    const extracted = extractScopedHtmlMenu(
      normalizeHtmlPriceNotation(normalizeHtmlHeadingLineBreaks(fetched.body)),
    );
    assertExtractionMethodForSourceType(sourceType, extracted.method);
    const recoveredItems =
      extracted.method === "html_heuristic"
        ? recoverDescriptionNamedHtmlItems(extracted.items, extracted.visibleText)
        : extracted.items;
    const priceWrappedItems =
      extracted.method === "html_heuristic"
        ? recoverPriceWrappedHtmlItems(extracted.visibleText)
        : [];
    const preferredItems =
      priceWrappedItems.length >= 3 && priceWrappedItems.length >= recoveredItems.length * 2
        ? priceWrappedItems
        : recoveredItems;
    const normalizedItems =
      extracted.method === "html_heuristic"
        ? preferredItems.map(normalizeHtmlItemName)
        : preferredItems;
    const items = normalizedItems.filter(isCanonicalHtmlMenuItem);
    return {
      items,
      method: extracted.method,
      extractorVersion: HTML_RUNTIME_EXTRACTOR_VERSION,
    };
  }
  if (sourceType === "pdf") {
    const extracted = await extractScopedPdfMenu(fetched.bodyBytes);
    return {
      items: extracted.items,
      method: extracted.method,
      extractorVersion: PDF_SOURCE_EXTRACTOR_VERSION,
    };
  }
  throw new Error(`Menu runtime does not extract source type ${sourceType}`);
}
