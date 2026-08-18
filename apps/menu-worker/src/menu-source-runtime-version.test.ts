import { describe, expect, it } from "vitest";
import { extractorVersionForSourceType, shouldForceReextract } from "./menu-source-runtime.js";

describe("HTML runtime extractor version", () => {
  it("tracks both scoped HTML and JSON-LD extractor revisions", () => {
    expect(extractorVersionForSourceType("html")).toBe("html-v14+html-v5");
    expect(extractorVersionForSourceType("json_ld")).toBe("html-v14+html-v5");
    expect(shouldForceReextract("html", "html-v14")).toBe(true);
    expect(shouldForceReextract("json_ld", "html-v14")).toBe(true);
  });
});
