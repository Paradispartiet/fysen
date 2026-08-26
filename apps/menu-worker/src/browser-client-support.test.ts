import { describe, expect, it } from "vitest";
import { browserRequestDecision } from "./browser-client.js";

const sourceOrigin = "https://restaurant.example";

describe("browser support origins", () => {
  it("allows declared redirect origins for document and data requests", () => {
    for (const resourceType of ["document", "xhr", "fetch"]) {
      expect(
        browserRequestDecision({
          sourceOrigin,
          requestUrl: "https://order.example/menu",
          resourceType,
          redirectOrigins: ["https://order.example"],
        }),
      ).toEqual({ action: "allow", validatePublicNetwork: true });
    }
  });

  it("allows browser-data origins for xhr/fetch but never for document navigation", () => {
    for (const resourceType of ["xhr", "fetch"]) {
      expect(
        browserRequestDecision({
          sourceOrigin,
          requestUrl: "https://menu-data.example/api/menu",
          resourceType,
          browserDataOrigins: ["https://menu-data.example"],
        }),
      ).toEqual({ action: "allow", validatePublicNetwork: true });
    }

    expect(
      browserRequestDecision({
        sourceOrigin,
        requestUrl: "https://menu-data.example/menu",
        resourceType: "document",
        browserDataOrigins: ["https://menu-data.example"],
      }),
    ).toMatchObject({ action: "block", fatal: true });
  });

  it("nonfatally blocks explicitly declared telemetry origins without authorizing navigation", () => {
    for (const resourceType of ["xhr", "fetch", "script"]) {
      expect(
        browserRequestDecision({
          sourceOrigin,
          requestUrl: "https://telemetry.example/collect",
          resourceType,
          browserBlockedOrigins: ["https://telemetry.example"],
        }),
      ).toEqual({
        action: "block",
        reason: "explicitly blocked browser origin: https://telemetry.example",
        fatal: false,
      });
    }

    expect(
      browserRequestDecision({
        sourceOrigin,
        requestUrl: "https://telemetry.example/landing",
        resourceType: "document",
        browserBlockedOrigins: ["https://telemetry.example"],
      }),
    ).toMatchObject({ action: "block", fatal: true });
  });

  it("nonfatally blocks narrow Google measurement endpoints used by rendered pages", () => {
    for (const requestUrl of [
      "https://www.google.com/ccm/collect?en=page_view",
      "https://www.google.com/pagead/1p-conversion/12345/",
      "https://www.google.com/pagead/1p-user-list/12345/",
      "https://www.google.com/rmkt/collect/12345/",
      "https://www.google.com/ads/ga-audiences",
    ]) {
      expect(
        browserRequestDecision({
          sourceOrigin,
          requestUrl,
          resourceType: "fetch",
        }),
      ).toEqual({
        action: "block",
        reason: "blocked non-essential telemetry origin: https://www.google.com",
        fatal: false,
      });
    }
  });

  it("does not turn the Google origin into a general browser-data allowlist", () => {
    expect(
      browserRequestDecision({
        sourceOrigin,
        requestUrl: "https://www.google.com/api/menu",
        resourceType: "xhr",
      }),
    ).toMatchObject({ action: "block", fatal: true });

    expect(
      browserRequestDecision({
        sourceOrigin,
        requestUrl: "https://www.google.com/ccm/collect",
        resourceType: "document",
      }),
    ).toMatchObject({ action: "block", fatal: true });
  });

  it("keeps undeclared cross-origin document/xhr/fetch fail-closed", () => {
    for (const resourceType of ["document", "xhr", "fetch"]) {
      expect(
        browserRequestDecision({
          sourceOrigin,
          requestUrl: "https://unexpected.example/menu",
          resourceType,
          redirectOrigins: ["https://order.example"],
          browserDataOrigins: ["https://menu-data.example"],
          browserBlockedOrigins: ["https://telemetry.example"],
        }),
      ).toMatchObject({ action: "block", fatal: true });
    }
  });
});
