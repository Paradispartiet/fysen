import { describe, expect, it } from "vitest";
import {
  accountBrowserRequest,
  browserRequestDecision,
  type BrowserRequestBudget,
  type BrowserRequestDecision,
} from "./browser-client.js";

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

  it("permits public HTTPS script candidates to pass the network validator", () => {
    expect(
      browserRequestDecision({ sourceOrigin, requestUrl: "https://cdn.example.net/app.js", resourceType: "script" }),
    ).toEqual({ action: "allow", validatePublicNetwork: true });
  });

  it("blocks presentation-heavy resources without failing the rendered source", () => {
    for (const [resourceType, url] of [
      ["image", "https://cdn.example.net/photo.jpg"],
      ["stylesheet", "https://cdn.example.net/site.css"],
    ] as const) {
      expect(
        browserRequestDecision({ sourceOrigin, requestUrl: url, resourceType }),
      ).toEqual({ action: "block", reason: `blocked resource type: ${resourceType}`, fatal: false });
    }
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
      message: "Rendered source exceeded 1000 browser route events",
    });
    expect(overflow.budget.networkRequests).toBe(0);
  });
});
