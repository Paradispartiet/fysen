import { describe, expect, it } from "vitest";
import {
  countBlockingCatalogOnboardingFailures,
  isBlockingCatalogOnboardingFailure,
  type CatalogOnboardingFailureSignal,
} from "./catalog-onboarding-failure-policy.js";

const restoreWarning =
  "published coverage restored after extractor refresh failure; latest known snapshot remains manifest-valid";

function signal(
  overrides: Partial<CatalogOnboardingFailureSignal> = {},
): CatalogOnboardingFailureSignal {
  return {
    outcome: "failed",
    warnings: [],
    error: "unknown failure",
    ...overrides,
  };
}

describe("catalog onboarding failure policy", () => {
  it("does not block successful catalog results", () => {
    expect(
      isBlockingCatalogOnboardingFailure(
        signal({ outcome: "already_published", error: null }),
      ),
    ).toBe(false);
  });

  it("does not block a first refresh-watch failure after safe published coverage is restored", () => {
    expect(
      isBlockingCatalogOnboardingFailure(
        signal({
          warnings: [restoreWarning],
          error: "First extractor refresh watch was quarantined",
        }),
      ),
    ).toBe(false);
  });

  it("does not block a second refresh-watch failure after a validated fallback is restored", () => {
    expect(
      isBlockingCatalogOnboardingFailure(
        signal({
          warnings: [restoreWarning],
          error: "Second extractor refresh watch was quarantined",
        }),
      ),
    ).toBe(false);
  });

  it("keeps refresh failures blocking when published coverage was not safely restored", () => {
    expect(
      isBlockingCatalogOnboardingFailure(
        signal({ error: "First extractor refresh watch was quarantined" }),
      ),
    ).toBe(true);
  });

  it("keeps manifest-quality and metadata failures blocking even if coverage was restored", () => {
    expect(
      isBlockingCatalogOnboardingFailure(
        signal({
          warnings: [restoreWarning],
          error:
            "Published restaurant no longer satisfies onboarding assertions: items=2/30, missing=none, forbidden=none",
        }),
      ),
    ).toBe(true);

    expect(
      isBlockingCatalogOnboardingFailure(
        signal({
          warnings: [restoreWarning],
          error: "Action verification failed",
        }),
      ),
    ).toBe(true);
  });

  it("counts only failures that still block catalog materialization", () => {
    expect(
      countBlockingCatalogOnboardingFailures([
        signal({ outcome: "published", error: null }),
        signal({
          warnings: [restoreWarning],
          error: "First extractor refresh watch was quarantined",
        }),
        signal({ error: "First onboarding watch was quarantined" }),
      ]),
    ).toBe(1);
  });
});
