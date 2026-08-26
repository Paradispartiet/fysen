import { describe, expect, it } from "vitest";
import { resolveManifestMenuFetchMode } from "./manifest-validator.js";

describe("resolveManifestMenuFetchMode", () => {
  it.each([
    "https://semeny.no/sted/396anatoliarestauranttoyentorg",
    "https://www.meny.semeny.no/restaurant/menu",
    "https://meny.semeny.no/restaurant/menu",
  ])("keeps declared HTTP transport for Semeny sources: %s", (url) => {
    expect(resolveManifestMenuFetchMode({ url, fetchMode: "http" })).toBe("http");
  });

  it("keeps declared HTTP transport for unrelated providers", () => {
    expect(
      resolveManifestMenuFetchMode({
        url: "https://restaurant.example/menu",
        fetchMode: "http",
      }),
    ).toBe("http");
  });

  it("keeps explicit browser transport", () => {
    expect(
      resolveManifestMenuFetchMode({
        url: "https://semeny.no/sted/example",
        fetchMode: "browser",
      }),
    ).toBe("browser");
  });
});
