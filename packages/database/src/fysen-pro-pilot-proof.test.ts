import { describe, expect, it } from "vitest";
import {
  assertAcceptedOnlyPayload,
  parseFysenProSessionSetCookie,
  summarizeFysenProDashboard,
} from "./fysen-pro-pilot-proof.js";

const SESSION_TOKEN = "s".repeat(48);

function dashboard(searches7d = 3) {
  return {
    restaurant: { slug: "pilot-restaurant-oslo", name: "Pilot Restaurant", address: "Testveien 1", city: "Oslo" },
    periodDays: 30,
    metrics: {
      impressions: 12,
      clicks: 4,
      ctr: 0.25,
      clickBreakdown: { menu: 1, restaurant: 1, directions: 1, booking: 1, order: 0 },
    },
    topDishes: [{ name: "Ramen", impressions: 8, clicks: 2 }],
    menuSources: [],
    actions: [],
    cityDemandGaps: [{ query: "udekket rett", searches7d, signal: "zero_result" }],
  };
}

describe("Fysen Pro pilot proof assertions", () => {
  it("requires the production HttpOnly session cookie contract", () => {
    expect(
      parseFysenProSessionSetCookie(
        `fysen_pro_session=${SESSION_TOKEN}; Path=/; Expires=Thu, 27 Aug 2026 10:00:00 GMT; HttpOnly; Secure; SameSite=Lax`,
      ),
    ).toEqual({ sessionToken: SESSION_TOKEN, httpOnly: true, secure: true, sameSite: "lax", path: "/" });

    expect(() => parseFysenProSessionSetCookie(`fysen_pro_session=${SESSION_TOKEN}; Path=/; Secure; SameSite=Lax`)).toThrow(
      /HttpOnly/,
    );
    expect(() =>
      parseFysenProSessionSetCookie(`fysen_pro_session=${SESSION_TOKEN}; Path=/; HttpOnly; SameSite=Lax`),
    ).toThrow(/Secure/);
  });

  it("locks the dashboard to the expected restaurant and privacy threshold", () => {
    expect(summarizeFysenProDashboard(dashboard(), "pilot-restaurant-oslo")).toEqual({
      restaurant: { slug: "pilot-restaurant-oslo", name: "Pilot Restaurant", city: "Oslo" },
      periodDays: 30,
      impressions: 12,
      clicks: 4,
      ctr: 0.25,
      topDishCount: 1,
      menuSourceCount: 0,
      actionCount: 0,
      cityDemandGapCount: 1,
      lowVolumeDemandProtected: true,
    });

    expect(() => summarizeFysenProDashboard(dashboard(), "other-restaurant-oslo")).toThrow(/scoped/);
    expect(() => summarizeFysenProDashboard(dashboard(2), "pilot-restaurant-oslo")).toThrow(/low-volume/);
  });

  it("refuses token fields in public web acknowledgement payloads", () => {
    expect(() => assertAcceptedOnlyPayload({ accepted: true }, "login")).not.toThrow();
    expect(() => assertAcceptedOnlyPayload({ accepted: true, sessionToken: SESSION_TOKEN }, "login")).toThrow(/forbidden token/);
    expect(() => assertAcceptedOnlyPayload({ accepted: false }, "logout")).toThrow(/accepted=true/);
  });
});
