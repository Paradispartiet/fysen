import { describe, expect, it } from "vitest";
import {
  shouldAcceptConfirmedSuspiciousDrop,
  shouldConfirmRejectedExtraction,
} from "./watcher.js";

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


describe("confirmed extractor-refresh rebaseline", () => {
  const suspiciousDrop = {
    accepted: false as const,
    code: "suspicious_drop" as const,
    message: "large apparent drop",
  };

  it("accepts only a forced extractor refresh with two identical suspicious-drop extractions", () => {
    expect(
      shouldAcceptConfirmedSuspiciousDrop({
        forceReextract: true,
        firstAssessment: suspiciousDrop,
        confirmationAssessment: suspiciousDrop,
        firstFingerprint: "same-fingerprint",
        confirmationFingerprint: "same-fingerprint",
      }),
    ).toBe(true);
  });

  it("does not weaken ordinary watcher quarantine behavior", () => {
    expect(
      shouldAcceptConfirmedSuspiciousDrop({
        forceReextract: false,
        firstAssessment: suspiciousDrop,
        confirmationAssessment: suspiciousDrop,
        firstFingerprint: "same-fingerprint",
        confirmationFingerprint: "same-fingerprint",
      }),
    ).toBe(false);
  });

  it("rejects non-identical or below-minimum confirmation results", () => {
    expect(
      shouldAcceptConfirmedSuspiciousDrop({
        forceReextract: true,
        firstAssessment: suspiciousDrop,
        confirmationAssessment: suspiciousDrop,
        firstFingerprint: "first",
        confirmationFingerprint: "second",
      }),
    ).toBe(false);

    expect(
      shouldAcceptConfirmedSuspiciousDrop({
        forceReextract: true,
        firstAssessment: suspiciousDrop,
        confirmationAssessment: {
          accepted: false,
          code: "below_minimum",
          message: "too few items",
        },
        firstFingerprint: "same-fingerprint",
        confirmationFingerprint: "same-fingerprint",
      }),
    ).toBe(false);
  });
});
