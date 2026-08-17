import type { MenuObservedItem } from "@fysen/menu-core";
import { BrowserMenuClient } from "./browser-client.js";
import { extractHtmlMenu, HTML_EXTRACTOR_VERSION } from "./html-extractor.js";
import { HttpMenuClient, type MenuHttpFetchResult } from "./http-client.js";
import { extractPdfMenu, PDF_EXTRACTOR_VERSION } from "./pdf-extractor.js";

const DEFAULT_MAX_PDF_RESPONSE_BYTES = 8 * 1024 * 1024;
const MAX_PDF_RESPONSE_BYTES = 25 * 1024 * 1024;

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

export function pdfResponseByteLimit(): number {
  const configured = Number(process.env.FYSEN_MAX_PDF_RESPONSE_BYTES);
  if (!Number.isInteger(configured) || configured <= 0) return DEFAULT_MAX_PDF_RESPONSE_BYTES;
  return Math.min(configured, MAX_PDF_RESPONSE_BYTES);
}

export function extractorVersionForSourceType(sourceType: string): string | null {
  if (sourceType === "html" || sourceType === "json_ld") return HTML_EXTRACTOR_VERSION;
  if (sourceType === "pdf") return PDF_EXTRACTOR_VERSION;
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
    const extracted = extractHtmlMenu(fetched.body);
    assertExtractionMethodForSourceType(sourceType, extracted.method);
    return {
      items: extracted.items,
      method: extracted.method,
      extractorVersion: HTML_EXTRACTOR_VERSION,
    };
  }
  if (sourceType === "pdf") {
    const extracted = await extractPdfMenu(fetched.bodyBytes);
    return {
      items: extracted.items,
      method: extracted.method,
      extractorVersion: PDF_EXTRACTOR_VERSION,
    };
  }
  throw new Error(`Menu runtime does not extract source type ${sourceType}`);
}
