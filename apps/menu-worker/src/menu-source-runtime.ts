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
  extractScopedHtmlMenu,
  HTML_SOURCE_EXTRACTOR_VERSION,
} from "./html-source-extractor.js";
import { HttpMenuClient, type MenuHttpFetchResult } from "./http-client.js";
import { extractScopedPdfMenu, PDF_SOURCE_EXTRACTOR_VERSION } from "./pdf-source-extractor.js";

const DEFAULT_MAX_PDF_RESPONSE_BYTES = 8 * 1024 * 1024;
const MAX_PDF_RESPONSE_BYTES = 25 * 1024 * 1024;
const TRAILING_ALLERGEN_CODES = /\s+\((?:[\p{L}\d]{1,5}\s*(?:[,/+ ]\s*)?){1,20}\)$/u;
const TRAILING_INLINE_PRICE = /\s+[-–—]\s*(?:(?:kr\.?\s*)[1-9]\d{1,3}(?:[.,]\d{1,2})?|[1-9]\d{1,3}(?:[.,]\d{1,2})?\s*(?:,-|kr\.?|nok))$/iu;
export const HTML_PRICE_NOTATION_NORMALIZER_VERSION = "price-notation-v1";
export const HTML_ITEM_NAME_NORMALIZER_VERSION = "item-name-v2";
const HTML_RUNTIME_EXTRACTOR_VERSION = `${HTML_SOURCE_EXTRACTOR_VERSION}+${HTML_EXTRACTOR_VERSION}+${HTML_DESCRIPTION_TITLE_RECOVERY_VERSION}+${HTML_HEADING_NORMALIZER_VERSION}+${HTML_PRICE_NOTATION_NORMALIZER_VERSION}+${HTML_ITEM_NAME_NORMALIZER_VERSION}`;

export type ExtractableMenuSourceType = "html" | "json_ld" | "pdf";
export type MenuSourceFetchMode = "http" | "browser";

export interface MenuSourceRuntimeInput {
  readonly url: string;
  readonly sourceType: string;
  readonly fetchMode: MenuSourceFetchMode;
  readonly userAgent: string;
  readonly etag: string | null;
  readonly lastModified: string | null;
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

export function normalizeHtmlItemName(item: MenuObservedItem): MenuObservedItem {
  const name = item.name
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
  if (input.fetchMode === "browser") {
    return new BrowserMenuClient(httpClient).fetchSource({
      url: input.url,
      userAgent: input.userAgent,
    });
  }

  return httpClient.fetchSource(
    {
      url: input.url,
      userAgent: input.userAgent,
      etag: input.etag,
      lastModified: input.lastModified,
    },
    input.sourceType === "pdf" ? { maxResponseBytes: pdfResponseByteLimit() } : {},
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
    const items =
      extracted.method === "html_heuristic"
        ? recoveredItems.map(normalizeHtmlItemName)
        : recoveredItems;
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
