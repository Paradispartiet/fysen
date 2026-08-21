import { describe, expect, it } from "vitest";
import { shouldRestorePublishedCoverageAfterRefreshFailure } from "./onboarding.js";

describe("published coverage during extractor refresh", () => {
  it("restores previous coverage when refresh fails before a new accepted snapshot", () => {
    expect(
      shouldRestorePublishedCoverageAfterRefreshFailure({
        temporarilyDeactivated: true,
        latestSnapshotIsSafe: true,
      }),
    ).toBe(true);
  });

  it("keeps coverage inactive when a newly accepted snapshot fails manifest quality", () => {
    expect(
      shouldRestorePublishedCoverageAfterRefreshFailure({
        temporarilyDeactivated: true,
        latestSnapshotIsSafe: false,
      }),
    ).toBe(false);
  });

  it("restores coverage after a validated refresh snapshot if a later step fails", () => {
    expect(
      shouldRestorePublishedCoverageAfterRefreshFailure({
        temporarilyDeactivated: true,
        latestSnapshotIsSafe: true,
      }),
    ).toBe(true);
  });

  it("does not toggle coverage outside a temporary extractor refresh", () => {
    expect(
      shouldRestorePublishedCoverageAfterRefreshFailure({
        temporarilyDeactivated: false,
        latestSnapshotIsSafe: true,
      }),
    ).toBe(false);
  });
});
