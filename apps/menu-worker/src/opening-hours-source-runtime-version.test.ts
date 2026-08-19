import { describe, expect, it } from "vitest";
import { OPENING_HOURS_DUPLICATE_SECTION_RECOVERY_VERSION } from "./opening-hours-duplicate-section-recovery.js";
import { OPENING_HOURS_SCOPE_HINT_RESOLVER_VERSION } from "./opening-hours-scope-hints.js";
import { OPENING_HOURS_SOURCE_EXTRACTOR_VERSION } from "./opening-hours-source-extractor.js";
import { OPENING_HOURS_RUNTIME_EXTRACTOR_VERSION } from "./opening-hours-source-runtime.js";

describe("opening-hours runtime extractor version", () => {
  it("includes canonical source extraction, duplicate recovery and scope-priority semantics", () => {
    expect(OPENING_HOURS_RUNTIME_EXTRACTOR_VERSION).toBe(
      `${OPENING_HOURS_SOURCE_EXTRACTOR_VERSION}+${OPENING_HOURS_DUPLICATE_SECTION_RECOVERY_VERSION}+${OPENING_HOURS_SCOPE_HINT_RESOLVER_VERSION}`,
    );
    expect(OPENING_HOURS_RUNTIME_EXTRACTOR_VERSION).toBe(
      "hours-visible-v15+scope-duplicates-v1+scope-priority-v1",
    );
  });
});
