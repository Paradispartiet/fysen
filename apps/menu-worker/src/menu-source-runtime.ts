import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";
import { BrowserMenuClient } from "./browser-client.js";
import {
  HTML_ADJACENT_HEADING_PRICE_RECOVERY_VERSION,
  recoverAdjacentHeadingPriceHtmlItems,
} from "./html-adjacent-heading-price-recovery.js";
import {
  HTML_DESCRIPTION_TITLE_RECOVERY_VERSION,
  recoverDescriptionNamedHtmlItems,
} from "./html-description-title-recovery.js";
import {
  HTML_EXPLICIT_FROM_PRICE_RECOVERY_VERSION,
  recoverExplicitFromPriceHtmlItems,
} from "./html-explicit-from-price-recovery.js";
import { HTML_EXTRACTOR_VERSION } from "./html-extractor.js";
import {
  HTML_HEADING_NORMALIZER_VERSION,
  normalizeHtmlHeadingLineBreaks,
} from "./html-heading-normalizer.js";
import {
  HTML_HEADING_RECOVERY_SUPPLEMENT_VERSION,
  supplementStrongHeadingRecovery,
} from "./html-heading-recovery-supplement.js";
import {
  HTML_PRICE_WRAPPED_RECOVERY_VERSION,
  recoverPriceWrappedHtmlItems,
} from "./html-price-wrapped-recovery.js";
import {
  HTML_TRAILING_PRICE_CARD_RECOVERY_VERSION,
  recoverTrailingPriceCardHtmlItems,
} from "./html-trailing-price-card-recovery.js";
import {
  extractScopedHtmlMenu,
  HTML_SOURCE_EXTRACTOR_VERSION,
} from "./html-source-extractor.js";
import {
  filterPlainTextBeverageSectionItems,
  HTML_TEXT_SECTION_SCOPE_VERSION,
} from "./html-text-section-scope.js";
import { HttpMenuClient, type MenuHttpFetchResult } from "./http-client.js";
import { extractScopedPdfMenu, PDF_SOURCE_EXTRACTOR_VERSION } from "./pdf-source-extractor.js";

const DEFAULT_MAX_PDF_RESPONSE_BYTES = 8 * 1024 * 1024;
const MAX_PDF_RESPONSE_BYTES = 25 * 1024 * 1024;
const TRAILING_ALLERGEN_CODES = /\s+\((?:[A-Z0-9]{1,3})(?:\s*[,/+ ]\s*[A-Z0-9]{1,3})*\)$/u;
const TRAILING_INLINE_PRICE = /\s+[-–—]\s*(?:(?:kr\.?\s*)[1-9]\d{1,3}(?:[.,]\d{1,2})?|[1-9]\d{1,3}(?:[.,]\d{1,2})?\s*(?:,-|kr\.?|nok))$/iu;
const TRAILING_MENU_DELIMITER = /\s*[|¦]\s*$/u;
const TRAILING_PARENTHETICAL = /\s+\([^()]{1,60}\)$/u;
const SOURCE_EXCERPT_SEPARATOR = /\s+—\s+/u;
const LEADING_MENU_NUMBER = /^\d{1,3}\s*[.)]?\s+/u;
const LEADING_MENU_INDEX_BEFORE_QUANTITY = /^\d{1,3}[.)]\s+(?=\d+\s+\p{L})/u;
const NON_DISH_HTML_ITEM = /^(?:legg i handlekurv|add to cart|håndlagde produkter\b|handmade products\b|levering$|delivery$|a\s+teapot$|all\s+rights\s+reserved\b)/iu;
const PHONE_METADATA_ITEM = /^(?:tel(?:efon)?|tlf|phone)\s*:?\s*\+?\d[\d ()+.-]{4,}$/iu;
const NON_DISH_MENU_SECTION = /^(?:meny|à la carte|forretter|småretter|grillretter|hovedretter|dessert(?:er)?|drikkemeny|drikke(?:r)?|drikkevarer|cocktails?|vin|øl|bestill|bord|åpningstider|kontakt)$/iu;
const PRICE_DISPLAY_ONLY_ITEM = /^(?:(?:fra|from)\s+)?(?:(?:(?:nok|kr\.?)\s*)?[1-9]\d{0,3}(?:[.,]\d{1,2})?\s*(?:,-|kr\.?|nok)\s*){1,4}$/iu;
const KITCHEN_RETAIL_ITEM = /^(?:pizzakutter|pizza\s+cutter)$/iu;
const RETAIL_APPAREL_ITEM = /\b(?:tee|t-?shirt|hoodie|sweatshirt|caps?)$/iu;
const HISTORICAL_SINCE_ITEM = /·\s*siden$/iu;
const BEVERAGE_MENU_ITEM = /^(?:(?:coca[- ]?cola|cola(?:\s+zero)?|fanta|sprite|farris(?:\s+\p{L}+)?|eplemost|(?:\p{L}+\s+)?juice|(?:\p{L}+\s+)?lassi)(?:\s+.*)?|(?:gin\s+(?:&\s*)?tonic|dry\s+martini)|(?:arabisk|arabic|tyrkisk|turkish)\s+(?:coffee|kaffe)(?:\s+.*)?|telemark\s+(?:still|sparkling)\s+naturell(?:\s+.*)?|hard\s+seltz(?:\s+.*)?|.*\b(?:pilsner|pærecider|cider|ingefærøl)\b.*|.*\bøl\b.*(?:\bflaske\b|\bglass\b|\d+[,.]\d+)|(?:rosévin|hvitvin|rødvin)(?:\s+(?:glass|flaske))?|.*\b(?:coffee|kaffe|espresso|americano|cappuccino|latte|tea|te)\b|.*\b(?:cola|ginger\s+beer)\b)$/iu;
const BEVERAGE_STYLE_ITEM = /(?:\b(?:milk\s+tea|boba\s+milk|smoothie|lemonade|red\s+bull|energy\s+drink|mocktail)\b|^pepsi(?:\s+max)?$|^(?:aranciata|chinotto|gazzosa|limonata)$|^(?:ice|iced)\s+tea(?:\s+(?:lemon|peach|green|mango|lychee|raspberry|passion\s*fruit))?$|^(?:taro|chocolate)\s+milk$|^iced\s+cocoa(?:\s+\p{L}+){0,3}\s+milk$|^(?:matcha|chai|vanilla|caramel)(?:\s+\p{L}+){0,3}\s+latte(?:\s+cheese)?$|^(?:saigon\s+special|salt|egg)\s+cafe(?:\s*-\s*cafe\s+sua\s+da)?$|^solo(?:\s+\d+(?:[.,]\d+)?\s*(?:ml|cl|l))?$)/iu;
const BOTTLED_BEVERAGE_VOLUME = /\bflaske\s+0[,.]\d{1,2}(?:\s*l)?$/iu;
export const HTML_PRICE_NOTATION_NORMALIZER_VERSION = "price-notation-v1";
export const HTML_ITEM_NAME_NORMALIZER_VERSION = "item-name-v8";
export const HTML_NON_DISH_FILTER_VERSION = "non-dish-v6";
export const HTML_BEVERAGE_FILTER_VERSION = "beverage-v5";
const HTML_RUNTIME_EXTRACTOR_VERSION = `${HTML_SOURCE_EXTRACTOR_VERSION}+${HTML_EXTRACTOR_VERSION}+${HTML_DESCRIPTION_TITLE_RECOVERY_VERSION}+${HTML_HEADING_NORMALIZER_VERSION}+${HTML_PRICE_NOTATION_NORMALIZER_VERSION}+${HTML_ITEM_NAME_NORMALIZER_VERSION}+${HTML_NON_DISH_FILTER_VERSION}+${HTML_BEVERAGE_FILTER_VERSION}+${HTML_TRAILING_PRICE_CARD_RECOVERY_VERSION}+${HTML_PRICE_WRAPPED_RECOVERY_VERSION}+${HTML_ADJACENT_HEADING_PRICE_RECOVERY_VERSION}+${HTML_HEADING_RECOVERY_SUPPLEMENT_VERSION}+${HTML_EXPLICIT_FROM_PRICE_RECOVERY_VERSION}+${HTML_TEXT_SECTION_SCOPE_VERSION}`;

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
    .replace(LEADING_MENU_INDEX_BEFORE_QUANTITY, "")
    .replace(TRAILING_ALLERGEN_CODES, "")
    .replace(TRAILING_INLINE_PRICE, "")
    .replace(TRAILING_MENU_DELIMITER, "")
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
    !PHONE_METADATA_ITEM.test(name) &&
    !NON_DISH_MENU_SECTION.test(name) &&
    !PRICE_DISPLAY_ONLY_ITEM.test(name) &&
    !KITCHEN_RETAIL_ITEM.test(name) &&
    !RETAIL_APPAREL_ITEM.test(name) &&
    !HISTORICAL_SINCE_ITEM.test(name) &&
    !BEVERAGE_MENU_ITEM.test(name) &&
    !BEVERAGE_STYLE_ITEM.test(name) &&
    !BOTTLED_BEVERAGE_VOLUME.test(name)
  );
}

function mergeExplicitFromPriceRecovery(
  items: readonly MenuObservedItem[],
  recovered: readonly MenuObservedItem[],
): readonly MenuObservedItem[] {
  if (recovered.length === 0) return items;
  const output = [...items];

  for (const candidate of recovered) {
    const matches = output
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.normalizedName === candidate.normalizedName);

    if (matches.length === 0) {
      output.push(candidate);
      continue;
    }
    if (matches.length !== 1) continue;

    const match = matches[0];
    if (!match) continue;
    output[match.index] = {
      ...match.item,
      priceMinor: candidate.priceMinor,
      priceKind: "from",
      priceMaxMinor: null,
      confidence: Math.max(match.item.confidence, candidate.confidence),
      sourceExcerpt: candidate.sourceExcerpt ?? match.item.sourceExcerpt,
    };
  }

  return output.sort((a, b) => a.position - b.position);
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
    const normalizedHtml = normalizeHtmlPriceNotation(normalizeHtmlHeadingLineBreaks(fetched.body));
    const extracted = extractScopedHtmlMenu(normalizedHtml);
    assertExtractionMethodForSourceType(sourceType, extracted.method);
    const recoveredItems =
      extracted.method === "html_heuristic"
        ? recoverDescriptionNamedHtmlItems(extracted.items, extracted.visibleText)
        : extracted.items;
    const trailingPriceCardItems =
      extracted.method === "html_heuristic"
        ? recoverTrailingPriceCardHtmlItems(normalizedHtml)
        : [];
    const priceWrappedItems =
      extracted.method === "html_heuristic"
        ? recoverPriceWrappedHtmlItems(extracted.visibleText)
        : [];
    const headingPriceItems =
      extracted.method === "html_heuristic"
        ? recoverAdjacentHeadingPriceHtmlItems(normalizedHtml)
        : [];
    const explicitFromPriceItems =
      extracted.method === "html_heuristic"
        ? recoverExplicitFromPriceHtmlItems(extracted.visibleText)
        : [];
    const trailingPriceCardQualifies =
      trailingPriceCardItems.length >= 4 &&
      (recoveredItems.length === 0 ||
        trailingPriceCardItems.length >= Math.max(6, Math.ceil(recoveredItems.length * 1.5)));
    const headingPriceCoverageThreshold = Math.ceil(recoveredItems.length * 0.75);
    const preferredItems = trailingPriceCardQualifies
      ? trailingPriceCardItems
      : headingPriceItems.length >= 4 &&
          (recoveredItems.length === 0 || headingPriceItems.length >= headingPriceCoverageThreshold)
        ? headingPriceItems
        : priceWrappedItems.length >= 3 && priceWrappedItems.length >= recoveredItems.length * 2
          ? priceWrappedItems
          : recoveredItems;
    const headingSupplementedItems =
      extracted.method === "html_heuristic"
        ? supplementStrongHeadingRecovery(preferredItems, headingPriceItems)
        : preferredItems;
    const priceEnrichedItems =
      extracted.method === "html_heuristic"
        ? mergeExplicitFromPriceRecovery(headingSupplementedItems, explicitFromPriceItems)
        : headingSupplementedItems;
    const normalizedItems =
      extracted.method === "html_heuristic"
        ? priceEnrichedItems.map(normalizeHtmlItemName)
        : priceEnrichedItems;
    const canonicalItems = normalizedItems.filter(isCanonicalHtmlMenuItem);
    const items =
      extracted.method === "html_heuristic"
        ? filterPlainTextBeverageSectionItems(canonicalItems, extracted.visibleText)
        : canonicalItems;
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
