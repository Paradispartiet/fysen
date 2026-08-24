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

  it("blocks stylesheets non-fatally before they consume the semantic network budget", () => {
    expect(
      browserRequestDecision({
        sourceOrigin,
        requestUrl: "https://restaurant.example/assets/menu.css",
        resourceType: "stylesheet",
      }),
    ).toEqual({ action: "block", reason: "blocked resource type: stylesheet", fatal: false });
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
        }),
      ).toMatchObject({ action: "block", fatal: true });
    }
  });
});
