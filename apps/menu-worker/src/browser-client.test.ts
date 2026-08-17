import { describe, expect, it } from "vitest";
import { browserRequestDecision } from "./browser-client.js";

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
