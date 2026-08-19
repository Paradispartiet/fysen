import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
import {
  FysenProController,
  parseFysenProBearer,
  parseFysenProSetupRedeem,
} from "./fysen-pro.controller.js";
import type { FysenProService } from "./fysen-pro.service.js";

const setupToken = "A".repeat(43);
const sessionToken = "B".repeat(43);

describe("Fysen Pro controller", () => {
  it("validates the one-time setup token payload", () => {
    expect(parseFysenProSetupRedeem({ setupToken: `  ${setupToken}  ` })).toEqual({ setupToken });
    expect(() => parseFysenProSetupRedeem({ setupToken: "short" })).toThrow(BadRequestException);
  });

  it("accepts only a strict Bearer session", () => {
    expect(parseFysenProBearer(`Bearer ${sessionToken}`)).toBe(sessionToken);
    expect(() => parseFysenProBearer(undefined)).toThrow(UnauthorizedException);
    expect(() => parseFysenProBearer(`Basic ${sessionToken}`)).toThrow(UnauthorizedException);
    expect(() => parseFysenProBearer(`Bearer ${sessionToken} extra`)).toThrow(UnauthorizedException);
  });

  it("exposes redeem, dashboard and logout without any public setup-token issuance", async () => {
    const service = {
      redeem: vi.fn().mockResolvedValue({
        sessionToken,
        expiresAt: "2026-08-26T12:00:00.000Z",
      }),
      dashboard: vi.fn().mockResolvedValue({
        restaurant: { slug: "pro-test-oslo", name: "Pro Test", address: "Testgata 1", city: "Oslo" },
        periodDays: 30,
        metrics: {
          impressions: 1,
          clicks: 0,
          ctr: 0,
          clickBreakdown: { menu: 0, restaurant: 0, directions: 0, booking: 0, order: 0 },
        },
        topDishes: [],
        menuSources: [],
        actions: [],
        cityDemandGaps: [],
      }),
      logout: vi.fn().mockResolvedValue({ accepted: true }),
    } as unknown as FysenProService;
    const controller = new FysenProController(service);

    await expect(controller.redeem({ setupToken })).resolves.toMatchObject({ sessionToken });
    await expect(controller.dashboard(`Bearer ${sessionToken}`)).resolves.toMatchObject({ periodDays: 30 });
    await expect(controller.logout(`Bearer ${sessionToken}`)).resolves.toEqual({ accepted: true });

    const publicMethods = Object.getOwnPropertyNames(FysenProController.prototype);
    expect(publicMethods).toEqual(expect.arrayContaining(["constructor", "redeem", "dashboard", "logout"]));
    expect(publicMethods).not.toEqual(
      expect.arrayContaining(["issue", "invite", "issueSetupToken", "grantAccess", "review"]),
    );
  });
});
