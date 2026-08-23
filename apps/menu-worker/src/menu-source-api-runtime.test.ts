import { describe, expect, it } from "vitest";
import {
  assertSupportedMenuSource,
  extractMenuSource,
  extractorVersionForSourceType,
} from "./menu-source-runtime.js";
import { PUBLIC_MENU_API_EXTRACTOR_VERSION } from "./public-menu-api-extractor.js";

describe("API menu source runtime", () => {
  it("supports HTTP API sources and rejects browser API mode", () => {
    expect(() =>
      assertSupportedMenuSource({ sourceType: "api", fetchMode: "http" }),
    ).not.toThrow();
    expect(() =>
      assertSupportedMenuSource({ sourceType: "api", fetchMode: "browser" }),
    ).toThrow("Browser fetch mode only supports HTML/JSON-LD sources");
    expect(extractorVersionForSourceType("api")).toBe(
      PUBLIC_MENU_API_EXTRACTOR_VERSION,
    );
  });

  it("extracts structured API payloads through the shared runtime", async () => {
    const body = JSON.stringify({
      location: {
        menus: [
          {
            menuSections: [
              {
                title: "Tapas",
                menuItems: [
                  {
                    name: "Gambas al ajillo",
                    price: { amount: 189, currency: "NOK" },
                  },
                ],
              },
            ],
          },
        ],
      },
    });
    const extracted = await extractMenuSource("api", {
      kind: "content",
      fetchedAt: "2026-08-23T10:00:00.000Z",
      status: 200,
      contentType: "application/json",
      body,
      bodyBytes: new TextEncoder().encode(body),
      rawSha256: "0".repeat(64),
      etag: null,
      lastModified: null,
      durationMs: 1,
      robotsAllowed: true,
    });
    expect(extracted.method).toBe("api");
    expect(extracted.extractorVersion).toBe(PUBLIC_MENU_API_EXTRACTOR_VERSION);
    expect(extracted.items).toHaveLength(1);
    expect(extracted.items[0]).toMatchObject({
      name: "Gambas al ajillo",
      priceMinor: 18900,
      extractionMethod: "api",
    });
  });
});
