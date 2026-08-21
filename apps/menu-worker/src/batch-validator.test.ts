import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  classifyRestaurantValidationFailure,
  isRetryableRestaurantValidationFailure,
  validateRestaurantManifestBatch,
} from "./batch-validator.js";
import type { RestaurantManifestValidationResult } from "./manifest-validator.js";

function validation(
  slug: string,
  options: {
    readonly menuAccepted?: boolean;
    readonly menuError?: string | null;
    readonly hasQuality?: boolean;
    readonly hoursAccepted?: boolean;
    readonly actionAccepted?: boolean;
    readonly actionError?: string | null;
  } = {},
): RestaurantManifestValidationResult {
  const menuAccepted = options.menuAccepted ?? true;
  const hoursAccepted = options.hoursAccepted ?? true;
  const actionAccepted = options.actionAccepted ?? true;
  return {
    slug,
    accepted: menuAccepted && hoursAccepted && actionAccepted,
    menu: {
      accepted: menuAccepted,
      url: "https://example.com/menu",
      httpStatus: menuAccepted ? 200 : null,
      method: menuAccepted ? "html" : null,
      extractorVersion: menuAccepted ? "test" : null,
      fingerprint: menuAccepted ? "fingerprint" : null,
      quality: options.hasQuality
        ? {
            accepted: false,
            itemCount: 4,
            minimumExpectedItems: 8,
            missingRequiredDishes: ["Ramen"],
            forbiddenDishesPresent: [],
          }
        : null,
      observedDishNames: [],
      observedDishVariants: [],
      error: options.menuError ?? null,
    },
    hours: {
      accepted: hoursAccepted,
      blocking: true,
      verificationStatus: "verified",
      url: "https://example.com/hours",
      httpStatus: hoursAccepted ? 200 : null,
      intervalCount: hoursAccepted ? 7 : 0,
      minimumExpectedIntervals: 7,
      extractorVersion: hoursAccepted ? "test" : null,
      error: hoursAccepted ? null : "Opening-hours assertions failed",
    },
    actions: [
      {
        type: "booking",
        url: "https://example.com/booking",
        accepted: actionAccepted,
        httpStatus: actionAccepted ? 200 : null,
        error: actionAccepted
          ? null
          : (options.actionError ?? "Booking endpoint failed"),
      },
    ],
    errors: [],
    warnings: [],
  };
}

describe("restaurant batch validation", () => {
  it("classifies source failures without weakening quality assertions", () => {
    expect(
      classifyRestaurantValidationFailure(
        validation("assertions", { menuAccepted: false, hasQuality: true }),
      ),
    ).toEqual(["menu_assertions"]);
    expect(
      classifyRestaurantValidationFailure(
        validation("timeout", {
          menuAccepted: false,
          menuError: "Network timeout fetching source",
        }),
      ),
    ).toEqual(["transport"]);
    expect(
      classifyRestaurantValidationFailure(
        validation("hours", { hoursAccepted: false }),
      ),
    ).toEqual(["hours"]);
    expect(
      classifyRestaurantValidationFailure(
        validation("action", { actionAccepted: false }),
      ),
    ).toEqual(["action"]);
  });

  it("retries bounded transient transport, action and invalid-payload failures", () => {
    expect(
      isRetryableRestaurantValidationFailure(
        validation("transport", {
          menuAccepted: false,
          menuError: "Menu fetch returned HTTP 403",
        }),
      ),
    ).toBe(true);
    expect(
      isRetryableRestaurantValidationFailure(
        validation("pdf", {
          menuAccepted: false,
          menuError: "PDF source did not start with a PDF signature",
        }),
      ),
    ).toBe(true);
    expect(
      isRetryableRestaurantValidationFailure(
        validation("action", {
          actionAccepted: false,
          actionError: "The operation was aborted due to timeout",
        }),
      ),
    ).toBe(true);
  });

  it("never retries deterministic menu assertions or hours semantics", () => {
    expect(
      isRetryableRestaurantValidationFailure(
        validation("assertions", { menuAccepted: false, hasQuality: true }),
      ),
    ).toBe(false);
    expect(
      isRetryableRestaurantValidationFailure(
        validation("hours", { hoursAccepted: false }),
      ),
    ).toBe(false);
  });

  it("recovers a transient source on a later bounded attempt", async () => {
    const directory = await mkdtemp(join(tmpdir(), "fysen-batch-validator-"));
    await writeFile(join(directory, "a.json"), "{}");
    let calls = 0;

    const summary = await validateRestaurantManifestBatch(directory, {
      retryDelayMs: 0,
      validatePath: async () => {
        calls += 1;
        if (calls < 3) {
          return validation("a", {
            menuAccepted: false,
            menuError: "Menu fetch returned HTTP 403",
          });
        }
        return validation("a");
      },
    });

    expect(calls).toBe(3);
    expect(summary.acceptedCount).toBe(1);
    expect(summary.failedCount).toBe(0);
    expect(summary.results[0]?.failureFamilies).toEqual([]);
  });

  it("does not retry a deterministic quality failure", async () => {
    const directory = await mkdtemp(join(tmpdir(), "fysen-batch-validator-"));
    await writeFile(join(directory, "a.json"), "{}");
    let calls = 0;

    const summary = await validateRestaurantManifestBatch(directory, {
      retryDelayMs: 0,
      validatePath: async () => {
        calls += 1;
        return validation("a", { menuAccepted: false, hasQuality: true });
      },
    });

    expect(calls).toBe(1);
    expect(summary.acceptedCount).toBe(0);
    expect(summary.failureFamilyCounts.menu_assertions).toBe(1);
  });

  it("keeps stable order and isolates malformed manifests from the rest of the batch", async () => {
    const directory = await mkdtemp(join(tmpdir(), "fysen-batch-validator-"));
    await Promise.all([
      writeFile(join(directory, "a.json"), "{}"),
      writeFile(join(directory, "b.json"), "{}"),
      writeFile(join(directory, "c.json"), "{}"),
    ]);

    const active = { count: 0, maximum: 0 };
    const summary = await validateRestaurantManifestBatch(directory, {
      concurrency: 2,
      retryDelayMs: 0,
      validatePath: async (path) => {
        active.count += 1;
        active.maximum = Math.max(active.maximum, active.count);
        await new Promise((resolve) =>
          setTimeout(resolve, path.endsWith("a.json") ? 20 : 5),
        );
        active.count -= 1;
        if (path.endsWith("b.json")) throw new Error("Invalid manifest JSON");
        return validation(path.endsWith("a.json") ? "a" : "c");
      },
    });

    expect(active.maximum).toBe(2);
    expect(summary.manifestCount).toBe(3);
    expect(summary.acceptedCount).toBe(2);
    expect(summary.failedCount).toBe(1);
    expect(summary.failureFamilyCounts.manifest).toBe(1);
    expect(summary.results.map((result) => result.slug)).toEqual([
      "a",
      null,
      "c",
    ]);
  });

  it("rejects unsafe concurrency and retry-delay values", async () => {
    const directory = await mkdtemp(join(tmpdir(), "fysen-batch-validator-"));
    await expect(
      validateRestaurantManifestBatch(directory, { concurrency: 0 }),
    ).rejects.toThrow("between 1 and 12");
    await expect(
      validateRestaurantManifestBatch(directory, { retryDelayMs: -1 }),
    ).rejects.toThrow("between 0 and 10000");
  });
});
