import { describe, expect, it } from "vitest";
import { shouldConfirmRejectedExtraction } from "./watcher.js";

describe("menu watcher partial extraction confirmation", () => {
  it("confirms below-minimum observations before recording a failure", () => {
    expect(
      shouldConfirmRejectedExtraction({
        accepted: false,
        code: "below_minimum",
        message: "partial source response",
      }),
    ).toBe(true);
  });

  it("confirms suspicious drops before quarantining a source", () => {
    expect(
      shouldConfirmRejectedExtraction({
        accepted: false,
        code: "suspicious_drop",
        message: "large apparent drop",
      }),
    ).toBe(true);
  });

  it("does not add a second fetch for accepted extraction results", () => {
    expect(
      shouldConfirmRejectedExtraction({
        accepted: true,
        code: "ok",
        message: "accepted",
      }),
    ).toBe(false);
  });
});
