import { BadRequestException } from "@nestjs/common";
import { describe, expect, it } from "vitest";
import { parseConversionEvent } from "./funnel.controller.js";

describe("conversion funnel input", () => {
  it("accepts a bounded attributed conversion event", () => {
    expect(
      parseConversionEvent({
        clientEventId: "11111111-1111-4111-8111-111111111111",
        impressionId: "22222222-2222-4222-8222-222222222222",
        eventType: "menu_clicked",
      }),
    ).toEqual({
      clientEventId: "11111111-1111-4111-8111-111111111111",
      impressionId: "22222222-2222-4222-8222-222222222222",
      eventType: "menu_clicked",
    });
  });

  it("rejects unsupported actions and malformed ids", () => {
    expect(() =>
      parseConversionEvent({
        clientEventId: "not-a-uuid",
        impressionId: "22222222-2222-4222-8222-222222222222",
        eventType: "sponsored_clicked",
      }),
    ).toThrow(BadRequestException);
  });
});
