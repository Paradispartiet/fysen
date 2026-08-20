import { describe, expect, it } from "vitest";
import { parseRestaurantClaimOperatorCommand } from "./restaurant-claim-operator.js";

const CLAIM_ID = "123e4567-e89b-42d3-a456-426614174000";

describe("restaurant claim operator CLI", () => {
  it("parses bounded pending-claim listing", () => {
    expect(parseRestaurantClaimOperatorCommand(["--", "list"])).toEqual({ kind: "list", limit: 25 });
    expect(parseRestaurantClaimOperatorCommand(["list", "50"])).toEqual({ kind: "list", limit: 50 });
    expect(() => parseRestaurantClaimOperatorCommand(["list", "0"])).toThrow(/between 1 and 100/);
    expect(() => parseRestaurantClaimOperatorCommand(["list", "101"])).toThrow(/between 1 and 100/);
  });

  it("parses verify and reject without generating a Pro secret", () => {
    expect(
      parseRestaurantClaimOperatorCommand([
        "verify",
        CLAIM_ID,
        "pilot-reviewer",
        "Verified",
        "through",
        "independent",
        "business",
        "contact.",
      ]),
    ).toEqual({
      kind: "review",
      claimId: CLAIM_ID,
      outcome: "verified",
      reviewedBy: "pilot-reviewer",
      reviewNote: "Verified through independent business contact.",
    });

    expect(parseRestaurantClaimOperatorCommand(["reject", CLAIM_ID, "pilot-reviewer", "Evidence was insufficient."])).toEqual({
      kind: "review",
      claimId: CLAIM_ID,
      outcome: "rejected",
      reviewedBy: "pilot-reviewer",
      reviewNote: "Evidence was insufficient.",
    });
  });

  it("fails closed on malformed review commands", () => {
    expect(() => parseRestaurantClaimOperatorCommand(["verify", "not-a-uuid", "reviewer", "Verified evidence."])).toThrow(
      /UUID/,
    );
    expect(() => parseRestaurantClaimOperatorCommand(["verify", CLAIM_ID, "reviewer"])).toThrow(/reviewNote/);
    expect(() => parseRestaurantClaimOperatorCommand(["approve", CLAIM_ID, "reviewer", "Verified evidence."])).toThrow(
      /list, verify, reject/,
    );
  });
});
