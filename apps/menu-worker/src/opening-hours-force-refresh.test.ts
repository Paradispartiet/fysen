import { describe, expect, it } from "vitest";
import {
  OPENING_HOURS_RUNTIME_EXTRACTOR_VERSION,
  shouldForceOpeningHoursReextract,
} from "./opening-hours-source-runtime.js";

describe("opening-hours extractor refresh policy", () => {
  it("forces a full fetch only when a stored snapshot used an older runtime extractor", () => {
    expect(shouldForceOpeningHoursReextract("hours-visible-v4")).toBe(true);
    expect(
      shouldForceOpeningHoursReextract(
        OPENING_HOURS_RUNTIME_EXTRACTOR_VERSION,
      ),
    ).toBe(false);
    expect(shouldForceOpeningHoursReextract(null)).toBe(false);
  });
});
