import { describe, expect, it } from "vitest";
import { HTML_EXTRACTOR_VERSION } from "./html-extractor.js";
import { PDF_EXTRACTOR_VERSION } from "./pdf-extractor.js";
import { extractorVersionForSourceType, shouldForceReextract } from "./watcher.js";

describe("menu watcher extractor refresh policy", () => {
  it("forces a fresh PDF fetch when the stored snapshot used an older extractor", () => {
    expect(extractorVersionForSourceType("pdf")).toBe(PDF_EXTRACTOR_VERSION);
    expect(shouldForceReextract("pdf", "pdf-text-v1")).toBe(true);
    expect(shouldForceReextract("pdf", PDF_EXTRACTOR_VERSION)).toBe(false);
  });

  it("uses the same version policy for supported HTML sources", () => {
    expect(extractorVersionForSourceType("html")).toBe(HTML_EXTRACTOR_VERSION);
    expect(extractorVersionForSourceType("json_ld")).toBe(HTML_EXTRACTOR_VERSION);
    expect(shouldForceReextract("html", HTML_EXTRACTOR_VERSION)).toBe(false);
  });

  it("does not invent a refresh policy when there is no prior extraction", () => {
    expect(shouldForceReextract("pdf", null)).toBe(false);
    expect(shouldForceReextract("image", "legacy")).toBe(false);
  });
});
