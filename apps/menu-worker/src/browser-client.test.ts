import { describe, expect, it } from "vitest";
import {
  accountBrowserRequest,
  browserRequestDecision,
  normalizedBrowserReadinessTexts,
  type BrowserRequestBudget,
  type BrowserRequestDecision,
} from "./browser-client.js";

describe("browser render readiness", () => {
  it("trims, deduplicates and bounds manifest readiness assertions", () => {
    expect(
      normalizedBrowserReadinessTexts([
        " Tyrkisk Frokost ",
        "Tyrkisk Frokost",
        "Ayran",
        "",
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
      ]),
    ).toEqual([
      "Tyrkisk Frokost",
      "Ayran",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
    ]);
  });

  it("keeps browser sources without assertions on the normal readiness path", () => {
    expect(normalizedBrowserReadinessTexts(undefined)).toEqual([]);
  });
});

describe("browser request policy", () => {
  const sourceOrigin = "https://order.example.com";

  it("allows same-origin document and data requests", () => {
    expect(
      browserRequestDecision({ sourceOrigin, requestUrl: "https://order.example.com/menu", resourceType: "document" }),
    ).toEqual({ action: "allow", validatePublicNetwork: true });
    expect(
      browserRequestDecision({ sourceOrigin, requestUrl: "https://order.example.com/api/menu", resourceType: "fetch" }),
    ).toEqual({ action: "allow", validatePublicNetwork: true });
  });

  it("fails closed on cross-origin document, xhr and fetch", () => {
    for (const resourceType of ["document", "xhr", "fetch"]) {
      expect(
        browserRequestDecision({ sourceOrigin, requestUrl: "https://api.other.example/menu", resourceType }),
      ).toMatchObject({ action: "block", fatal: true });
    }
  });

  it("permits public HTTPS script/style candidates to pass the network validator", () => {
    expect(
      browserRequestDecision({ sourceOrigin, requestUrl: "https://cdn.example.net/app.js", resourceType: "script" }),
    ).toEqual({ action: "allow", validatePublicNetwork: true });
  });

  it("blocks heavy resources without failing the rendered source", () => {
    expect(
      browserRequestDecision({ sourceOrigin, requestUrl: "https://cdn.example.net/photo.jpg", resourceType: "image" }),
    ).toEqual({ action: "block", reason: "blocked resource type: image", fatal: false });
  });

  it("fails closed on non-HTTPS browser traffic", () => {
    expect(
      browserRequestDecision({ sourceOrigin, requestUrl: "http://order.example.com/api/menu", resourceType: "fetch" }),
    ).toMatchObject({ action: "block", fatal: true });
  });
});

describe("browser request budget", () => {
  const allowed: BrowserRequestDecision = { action: "allow", validatePublicNetwork: true };
  const blocked: BrowserRequestDecision = {
    action: "block",
    reason: "blocked resource type: image",
    fatal: false,
  };

  it("does not charge blocked resources against the allowed-network budget", () => {
    let budget: BrowserRequestBudget = { routeEvents: 0, networkRequests: 0 };
    for (let index = 0; index < 500; index += 1) {
      const result = accountBrowserRequest(budget, blocked);
      expect(result.violation).toBeNull();
      budget = result.budget;
    }

    expect(budget).toEqual({ routeEvents: 500, networkRequests: 0 });
  });

  it("still fails closed after 120 allowed browser network requests", () => {
    let budget: BrowserRequestBudget = { routeEvents: 0, networkRequests: 0 };
    for (let index = 0; index < 120; index += 1) {
      const result = accountBrowserRequest(budget, allowed);
      expect(result.violation).toBeNull();
      budget = result.budget;
    }

    const blockedResult = accountBrowserRequest(budget, blocked);
    expect(blockedResult.violation).toBeNull();
    expect(blockedResult.budget.networkRequests).toBe(120);

    const overflow = accountBrowserRequest(blockedResult.budget, allowed);
    expect(overflow.violation).toEqual({
      code: "BROWSER_REQUEST_LIMIT",
      message: "Rendered source exceeded 120 allowed browser network requests",
    });
  });

  it("keeps a separate hard cap on all browser route events", () => {
    let budget: BrowserRequestBudget = { routeEvents: 0, networkRequests: 0 };
    for (let index = 0; index < 1000; index += 1) {
      const result = accountBrowserRequest(budget, blocked);
      expect(result.violation).toBeNull();
      budget = result.budget;
    }

    const overflow = accountBrowserRequest(budget, blocked);
    expect(overflow.violation).toEqual({
      code: "BROWSER_ROUTE_EVENT_LIMIT",
      message: "Rendered source exceeded 1000 allowed browser route events".replace(" allowed", ""),
    });
    expect(overflow.budget.networkRequests).toBe(0);
  });
});
