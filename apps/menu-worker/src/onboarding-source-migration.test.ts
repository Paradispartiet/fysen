import { describe, expect, it } from "vitest";
import { shouldStagePublishedSourceMigration } from "./onboarding.js";

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
});
