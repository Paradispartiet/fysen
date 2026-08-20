import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  classifyRestaurantValidationFailure,
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
        error: actionAccepted ? null : "Booking endpoint failed",
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

  it("rejects unsafe concurrency values", async () => {
    const directory = await mkdtemp(join(tmpdir(), "fysen-batch-validator-"));
    await expect(
      validateRestaurantManifestBatch(directory, { concurrency: 0 }),
    ).rejects.toThrow("between 1 and 12");
  });
});
