import { describe, expect, it } from "vitest";
import { HTML_ADJACENT_HEADING_PRICE_RECOVERY_VERSION } from "./html-adjacent-heading-price-recovery.js";
import { HTML_DESCRIPTION_TITLE_RECOVERY_VERSION } from "./html-description-title-recovery.js";
import { HTML_EXPLICIT_FROM_PRICE_RECOVERY_VERSION } from "./html-explicit-from-price-recovery.js";
import { HTML_EXTRACTOR_VERSION } from "./html-extractor.js";
import { HTML_HEADING_NORMALIZER_VERSION } from "./html-heading-normalizer.js";
import { HTML_HEADING_RECOVERY_SUPPLEMENT_VERSION } from "./html-heading-recovery-supplement.js";
import { HTML_PRICE_WRAPPED_RECOVERY_VERSION } from "./html-price-wrapped-recovery.js";
import { HTML_SECTION_FIRST_CARD_RECOVERY_VERSION } from "./html-section-first-card-recovery.js";
import { HTML_SOURCE_EXTRACTOR_VERSION } from "./html-source-extractor.js";
import { HTML_TEXT_SECTION_SCOPE_VERSION } from "./html-text-section-scope.js";
import { HTML_TRAILING_PRICE_CARD_RECOVERY_VERSION } from "./html-trailing-price-card-recovery.js";
import {
  HTML_BEVERAGE_FILTER_VERSION,
  HTML_ITEM_NAME_NORMALIZER_VERSION,
  HTML_NON_DISH_FILTER_VERSION,
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
      HTML_NON_DISH_FILTER_VERSION,
      HTML_BEVERAGE_FILTER_VERSION,
      HTML_TRAILING_PRICE_CARD_RECOVERY_VERSION,
      HTML_PRICE_WRAPPED_RECOVERY_VERSION,
      HTML_ADJACENT_HEADING_PRICE_RECOVERY_VERSION,
      HTML_HEADING_RECOVERY_SUPPLEMENT_VERSION,
      HTML_EXPLICIT_FROM_PRICE_RECOVERY_VERSION,
      HTML_SECTION_FIRST_CARD_RECOVERY_VERSION,
      HTML_TEXT_SECTION_SCOPE_VERSION,
    ].join("+");

    expect(HTML_ITEM_NAME_NORMALIZER_VERSION).toBe("item-name-v8");
    expect(HTML_NON_DISH_FILTER_VERSION).toBe("non-dish-v6");
    expect(HTML_BEVERAGE_FILTER_VERSION).toBe("beverage-v5");
    expect(HTML_TRAILING_PRICE_CARD_RECOVERY_VERSION).toBe("trailing-price-card-v2");
    expect(HTML_HEADING_RECOVERY_SUPPLEMENT_VERSION).toBe("heading-supplement-v1");
    expect(HTML_EXPLICIT_FROM_PRICE_RECOVERY_VERSION).toBe("from-price-v1");
    expect(HTML_SECTION_FIRST_CARD_RECOVERY_VERSION).toBe("section-first-card-v1");
    expect(HTML_TEXT_SECTION_SCOPE_VERSION).toBe("text-section-scope-v1");
    expect(extractorVersionForSourceType("html")).toBe(runtimeVersion);
    expect(extractorVersionForSourceType("json_ld")).toBe(runtimeVersion);
    expect(shouldForceReextract("html", "html-v14+html-v7+titles-v8+heading-v1")).toBe(true);
    expect(shouldForceReextract("json_ld", "html-v14+html-v7+titles-v8+heading-v1")).toBe(true);
    expect(shouldForceReextract("html", runtimeVersion)).toBe(false);
  });
});
