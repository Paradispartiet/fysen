import { BadRequestException } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
import {
  parseRestaurantClaimRequest,
  parseRestaurantClaimSlug,
  RestaurantClaimsController,
} from "./restaurant-claims.controller.js";
import type { RestaurantClaimsService } from "./restaurant-claims.service.js";

describe("restaurant claims controller", () => {
  it("normalizes a pending claim request and requires verification evidence", () => {
    expect(
      parseRestaurantClaimRequest({
        claimantName: "  Test Owner  ",
        claimantEmail: "OWNER@EXAMPLE.COM",
        claimantRole: "owner",
        evidenceUrl: "https://restaurant.example/contact",
        evidenceNote: "",
      }),
    ).toEqual({
      claimantName: "Test Owner",
      claimantEmail: "owner@example.com",
      claimantRole: "owner",
      evidenceUrl: "https://restaurant.example/contact",
      evidenceNote: null,
    });

    expect(() =>
      parseRestaurantClaimRequest({
        claimantName: "Test Owner",
        claimantEmail: "owner@example.com",
        claimantRole: "owner",
        evidenceUrl: "",
        evidenceNote: "",
      }),
    ).toThrow(BadRequestException);
  });

  it("rejects malformed restaurant slugs", () => {
    expect(parseRestaurantClaimSlug("claim-test-oslo")).toBe("claim-test-oslo");
    expect(() => parseRestaurantClaimSlug("../../admin")).toThrow(BadRequestException);
  });

  it("only exposes context and pending request operations through the public controller", async () => {
    const service = {
      context: vi.fn().mockResolvedValue({
        restaurant: { slug: "claim-test-oslo", name: "Claim Test", address: "Testgata 1", city: "Oslo" },
        claimState: "unclaimed",
      }),
      request: vi.fn().mockResolvedValue({
        claimId: "11111111-1111-4111-8111-111111111111",
        status: "pending",
        duplicate: false,
      }),
    } as unknown as RestaurantClaimsService;
    const controller = new RestaurantClaimsController(service);

    await expect(controller.context("claim-test-oslo")).resolves.toMatchObject({ claimState: "unclaimed" });
    await expect(
      controller.request("claim-test-oslo", {
        claimantName: "Test Owner",
        claimantEmail: "owner@example.com",
        claimantRole: "owner",
        evidenceUrl: null,
        evidenceNote: "First-party staff can verify this affiliation through the restaurant.",
      }),
    ).resolves.toMatchObject({ status: "pending" });

    expect(Object.getOwnPropertyNames(RestaurantClaimsController.prototype)).toEqual(
      expect.arrayContaining(["constructor", "context", "request"]),
    );
    expect(Object.getOwnPropertyNames(RestaurantClaimsController.prototype)).not.toEqual(
      expect.arrayContaining(["verify", "review", "grantAccess"]),
    );
  });
});
