import { describe, expect, it } from "vitest";
import {
  requiredPublishedSourceMigrationWatchCount,
  shouldStagePublishedSourceMigration,
} from "./onboarding.js";

describe("published source migration detection", () => {
  it("stages only when an active restaurant has another enabled source", () => {
    expect(
      shouldStagePublishedSourceMigration(true, "canonical", [
        { id: "legacy" },
        { id: "canonical" },
      ]),
    ).toBe(true);
    expect(
      shouldStagePublishedSourceMigration(true, "canonical", [
        { id: "canonical" },
      ]),
    ).toBe(false);
    expect(
      shouldStagePublishedSourceMigration(false, "canonical", [
        { id: "legacy" },
        { id: "canonical" },
      ]),
    ).toBe(false);
  });

  it("requires two fresh watches for a new staged source but only one when a prior staged snapshot is already manifest-valid", () => {
    expect(requiredPublishedSourceMigrationWatchCount(false)).toBe(2);
    expect(requiredPublishedSourceMigrationWatchCount(true)).toBe(1);
  });
});
