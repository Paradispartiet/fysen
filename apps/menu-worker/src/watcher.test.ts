import { describe, expect, it } from "vitest";
import { HTML_ADJACENT_HEADING_PRICE_RECOVERY_VERSION } from "./html-adjacent-heading-price-recovery.js";
import { HTML_DESCRIPTION_TITLE_RECOVERY_VERSION } from "./html-description-title-recovery.js";
import { HTML_EXTRACTOR_VERSION } from "./html-extractor.js";
import { HTML_HEADING_NORMALIZER_VERSION } from "./html-heading-normalizer.js";
import { HTML_PRICE_WRAPPED_RECOVERY_VERSION } from "./html-price-wrapped-recovery.js";
import { HTML_SOURCE_EXTRACTOR_VERSION } from "./html-source-extractor.js";
import {
  HTML_BEVERAGE_FILTER_VERSION,
  HTML_ITEM_NAME_NORMALIZER_VERSION,
  HTML_PRICE_NOTATION_NORMALIZER_VERSION,
  assertExtractionMethodForSourceType,
  extractorVersionForSourceType,
  shouldForceReextract,
} from "./menu-source-runtime.js";
import { PDF_EXTRACTOR_VERSION } from "./pdf-extractor.js";
import { PDF_SOURCE_EXTRACTOR_VERSION } from "./pdf-source-extractor.js";

describe("menu source runtime extractor refresh policy", () => {
  it("forces a fresh PDF fetch when the stored snapshot used an older extractor", () => {
    expect(extractorVersionForSourceType("pdf")).toBe(PDF_SOURCE_EXTRACTOR_VERSION);
    expect(shouldForceReextract("pdf", "pdf-text-v1")).toBe(true);
    expect(shouldForceReextract("pdf", PDF_EXTRACTOR_VERSION)).toBe(true);
    expect(shouldForceReextract("pdf", PDF_SOURCE_EXTRACTOR_VERSION)).toBe(false);
  });

  it("uses the composed runtime version policy for supported HTML sources", () => {
    const runtimeVersion = [
      HTML_SOURCE_EXTRACTOR_VERSION,
      HTML_EXTRACTOR_VERSION,
      HTML_DESCRIPTION_TITLE_RECOVERY_VERSION,
      HTML_HEADING_NORMALIZER_VERSION,
      HTML_PRICE_NOTATION_NORMALIZER_VERSION,
      HTML_ITEM_NAME_NORMALIZER_VERSION,
      HTML_BEVERAGE_FILTER_VERSION,
      HTML_PRICE_WRAPPED_RECOVERY_VERSION,
      HTML_ADJACENT_HEADING_PRICE_RECOVERY_VERSION,
    ].join("+");
    expect(extractorVersionForSourceType("html")).toBe(runtimeVersion);
    expect(extractorVersionForSourceType("json_ld")).toBe(runtimeVersion);
    expect(shouldForceReextract("html", HTML_EXTRACTOR_VERSION)).toBe(true);
    expect(shouldForceReextract("html", HTML_SOURCE_EXTRACTOR_VERSION)).toBe(true);
    expect(shouldForceReextract("html", runtimeVersion)).toBe(false);
  });

  it("does not invent a refresh policy when there is no prior extraction", () => {
    expect(shouldForceReextract("pdf", null)).toBe(false);
    expect(shouldForceReextract("image", "legacy")).toBe(false);
  });

  it("requires declared JSON-LD sources to actually extract JSON-LD", () => {
    expect(() => assertExtractionMethodForSourceType("json_ld", "json_ld")).not.toThrow();
    expect(() => assertExtractionMethodForSourceType("json_ld", "html_heuristic")).toThrow(
      /declared json_ld/,
    );
  });

  it("allows ordinary HTML sources to use whichever safe HTML extractor wins", () => {
    expect(() => assertExtractionMethodForSourceType("html", "html_heuristic")).not.toThrow();
    expect(() => assertExtractionMethodForSourceType("html", "json_ld")).not.toThrow();
  });
});
