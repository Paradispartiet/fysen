import { describe, expect, it } from "vitest";
import type { HoursVerificationStatus } from "./onboarding-manifest.js";
import {
  summarizeOpeningHoursWatchResults,
  type OpeningHoursWatchResult,
} from "./run-opening-hours.js";

function failedResult(
  sourceId: string,
  outcome: OpeningHoursWatchResult["outcome"],
): OpeningHoursWatchResult {
  return {
    sourceId,
    restaurantSlug: `${sourceId}-restaurant`,
    sourceUrl: `https://example.com/${sourceId}`,
    outcome,
    intervalCount: null,
    snapshotId: null,
    errorCode: "TEST_FAILURE",
  };
}

describe("restaurant hours watcher failure classification", () => {
  it("keeps provisional and unverified source failures visible without weakening blocking failures", () => {
    const due = [
      { id: "provisional", restaurantSlug: "provisional-place" },
      { id: "unverified", restaurantSlug: "unverified-place" },
      { id: "verified", restaurantSlug: "verified-place" },
      { id: "unknown", restaurantSlug: "unknown-place" },
      { id: "audit", restaurantSlug: "provisional-place" },
      { id: "healthy", restaurantSlug: "verified-place" },
    ];
    const results: OpeningHoursWatchResult[] = [
      failedResult("provisional", "extraction_error"),
      failedResult("unverified", "quarantined"),
      failedResult("verified", "fetch_error"),
      failedResult("unknown", "fetch_error"),
      failedResult("audit", "unexpected_error"),
      {
        sourceId: "healthy",
        restaurantSlug: "verified-place",
        sourceUrl: "https://example.com/healthy",
        outcome: "unchanged",
        intervalCount: 7,
        snapshotId: null,
        errorCode: null,
      },
    ];
    const verificationStatusBySlug = new Map<string, HoursVerificationStatus>([
      ["provisional-place", "provisional"],
      ["unverified-place", "unverified"],
      ["verified-place", "verified"],
    ]);

    const summary = summarizeOpeningHoursWatchResults(
      due,
      results,
      verificationStatusBySlug,
    );

    expect(summary.dueCount).toBe(6);
    expect(summary.failedCount).toBe(5);
    expect(summary.nonBlockingFailedCount).toBe(2);
    expect(summary.blockingFailedCount).toBe(3);
    expect(summary.results).toBe(results);
  });
});
