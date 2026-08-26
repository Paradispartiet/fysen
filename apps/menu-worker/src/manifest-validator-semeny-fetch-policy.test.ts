import { describe, expect, it } from "vitest";
import { resolveManifestMenuFetchMode } from "./manifest-validator.js";

const base = {
  sourceType: "html" as const,
  fetchMode: "http" as const,
  maxResponseBytes: null,
};

describe("resolveManifestMenuFetchMode", () => {
  it.each([
    "https://semeny.no/sted/396anatoliarestauranttoyentorg",
    "https://www.meny.semeny.no/restaurant/menu",
    "https://meny.semeny.no/restaurant/menu",
  ])("uses rendered browser fetch for Semeny HTML sources: %s", (url) => {
    expect(resolveManifestMenuFetchMode({ ...base, url })).toBe("browser");
  });

  it("keeps unrelated HTML providers on their declared HTTP policy", () => {
    expect(
      resolveManifestMenuFetchMode({
        ...base,
        url: "https://restaurant.example/menu",
      }),
    ).toBe("http");
  });

  it("preserves explicit response byte caps on HTTP", () => {
    expect(
      resolveManifestMenuFetchMode({
        ...base,
        url: "https://semeny.no/sted/example",
        maxResponseBytes: 128 * 1024,
      }),
    ).toBe("http");
  });

  it("honors explicit browser mode for unrelated providers", () => {
    expect(
      resolveManifestMenuFetchMode({
        ...base,
        url: "https://restaurant.example/menu",
        fetchMode: "browser",
      }),
    ).toBe("browser");
  });

  it("does not promote non-HTML Semeny sources to browser mode", () => {
    expect(
      resolveManifestMenuFetchMode({
        ...base,
        url: "https://semeny.no/api/menu",
        sourceType: "api",
      }),
    ).toBe("http");
  });

  it("fails closed to HTTP when the source URL cannot be parsed", () => {
    expect(resolveManifestMenuFetchMode({ ...base, url: "not-a-url" })).toBe("http");
  });
});
