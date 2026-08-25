import { describe, expect, it } from "vitest";
import {
  shouldRequireSecondPublishedSourceMigrationWatch,
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

  it("does not refetch a fully validated unchanged staged source", () => {
    expect(
      shouldRequireSecondPublishedSourceMigrationWatch({ outcome: "unchanged" }),
    ).toBe(false);
  });

  it("keeps the second proof for changed or not-modified staged sources", () => {
    expect(
      shouldRequireSecondPublishedSourceMigrationWatch({ outcome: "changed" }),
    ).toBe(true);
    expect(
      shouldRequireSecondPublishedSourceMigrationWatch({ outcome: "not_modified" }),
    ).toBe(true);
  });
});
