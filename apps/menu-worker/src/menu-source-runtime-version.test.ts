import { describe, expect, it } from "vitest";
import { extractorVersionForSourceType, shouldForceReextract } from "./menu-source-runtime.js";

describe("HTML runtime extractor version", () => {
  it("tracks scoped HTML, JSON-LD and title-recovery revisions", () => {
    expect(extractorVersionForSourceType("html")).toBe("html-v14+html-v7+titles-v2");
    expect(extractorVersionForSourceType("json_ld")).toBe("html-v14+html-v7+titles-v2");
    expect(shouldForceReextract("html", "html-v14+html-v7+titles-v1")).toBe(true);
    expect(shouldForceReextract("json_ld", "html-v14+html-v7+titles-v1")).toBe(true);
  });
});
