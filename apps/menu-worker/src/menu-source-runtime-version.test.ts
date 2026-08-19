import { describe, expect, it } from "vitest";
import { HTML_ADJACENT_HEADING_PRICE_RECOVERY_VERSION } from "./html-adjacent-heading-price-recovery.js";
import { HTML_DESCRIPTION_TITLE_RECOVERY_VERSION } from "./html-description-title-recovery.js";
import { HTML_EXTRACTOR_VERSION } from "./html-extractor.js";
import { HTML_HEADING_NORMALIZER_VERSION } from "./html-heading-normalizer.js";
import { HTML_PRICE_WRAPPED_RECOVERY_VERSION } from "./html-price-wrapped-recovery.js";
import { HTML_SOURCE_EXTRACTOR_VERSION } from "./html-source-extractor.js";
import {
  HTML_ITEM_NAME_NORMALIZER_VERSION,
  HTML_PRICE_NOTATION_NORMALIZER_VERSION,
  extractorVersionForSourceType,
  shouldForceReextract,
} from "./menu-source-runtime.js";

describe("HTML runtime extractor version", () => {
  it("tracks every extractor and runtime normalizer revision", () => {
    const runtimeVersion = [
      HTML_SOURCE_EXTRACTOR_VERSION,
      HTML_EXTRACTOR_VERSION,
      HTML_DESCRIPTION_TITLE_RECOVERY_VERSION,
      HTML_HEADING_NORMALIZER_VERSION,
      HTML_PRICE_NOTATION_NORMALIZER_VERSION,
      HTML_ITEM_NAME_NORMALIZER_VERSION,
      HTML_PRICE_WRAPPED_RECOVERY_VERSION,
      HTML_ADJACENT_HEADING_PRICE_RECOVERY_VERSION,
    ].join("+");

    expect(extractorVersionForSourceType("html")).toBe(runtimeVersion);
    expect(extractorVersionForSourceType("json_ld")).toBe(runtimeVersion);
    expect(shouldForceReextract("html", "html-v14+html-v7+titles-v8+heading-v1")).toBe(true);
    expect(shouldForceReextract("json_ld", "html-v14+html-v7+titles-v8+heading-v1")).toBe(true);
    expect(shouldForceReextract("html", runtimeVersion)).toBe(false);
  });
});
