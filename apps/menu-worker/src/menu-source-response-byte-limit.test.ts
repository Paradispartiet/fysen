import { describe, expect, it } from "vitest";
import { HttpMenuClient } from "./http-client.js";
import { fetchMenuSource } from "./menu-source-runtime.js";
import { restaurantOnboardingManifestSchema } from "./onboarding-manifest.js";

const publicResolver = async (): Promise<readonly { address: string }[]> => [
  { address: "93.184.216.34" },
];

const baseManifest = {
  version: 1,
  restaurant: {
    slug: "response-limit-test-oslo",
    name: "Response Limit Test",
    websiteUrl: "https://restaurant.test/",
    address: "Testgata 1",
    city: "Oslo",
    countryCode: "NO",
    latitude: 59.91,
    longitude: 10.75,
  },
  menuSource: {
    url: "https://restaurant.test/menu",
    sourceType: "html",
    fetchMode: "http",
    userAgent: "FysenMenuBot/0.1",
    checkIntervalMinutes: 720,
    minimumExpectedItems: 3,
  },
  qualityAssertions: { requiredDishNames: ["Testrett"] },
} as const;

function clientForBody(body: string): HttpMenuClient {
  return new HttpMenuClient({
    fetchImpl: (async (url: URL) =>
      url.pathname === "/robots.txt"
        ? new Response("User-agent: *\nAllow: /\n", { status: 200 })
        : new Response(body, { status: 200, headers: { "Content-Type": "text/html" } })) as typeof fetch,
    resolver: publicResolver,
    minHostDelayMs: 1,
    timeoutMs: 1000,
  });
}

describe("bounded per-source HTTP response bytes", () => {
  it("accepts a bounded HTTP override and rejects browser, PDF and values above 4 MiB", () => {
    expect(
      restaurantOnboardingManifestSchema.parse({
        ...baseManifest,
        menuSource: { ...baseManifest.menuSource, maxResponseBytes: 3 * 1024 * 1024 },
      }).menuSource.maxResponseBytes,
    ).toBe(3 * 1024 * 1024);

    expect(() =>
      restaurantOnboardingManifestSchema.parse({
        ...baseManifest,
        menuSource: { ...baseManifest.menuSource, fetchMode: "browser", maxResponseBytes: 3 * 1024 * 1024 },
      }),
    ).toThrow("maxResponseBytes is only valid for HTTP fetch mode");

    expect(() =>
      restaurantOnboardingManifestSchema.parse({
        ...baseManifest,
        menuSource: { ...baseManifest.menuSource, sourceType: "pdf", maxResponseBytes: 3 * 1024 * 1024 },
      }),
    ).toThrow("PDF response limits use the dedicated PDF policy");

    expect(() =>
      restaurantOnboardingManifestSchema.parse({
        ...baseManifest,
        menuSource: { ...baseManifest.menuSource, maxResponseBytes: 4 * 1024 * 1024 + 1 },
      }),
    ).toThrow();
  });

  it("keeps the 2 MiB default but permits an explicitly bounded 3 MiB HTTP source", async () => {
    const body = `<html><body>${"x".repeat(2 * 1024 * 1024 + 32 * 1024)}</body></html>`;
    const input = {
      url: "https://restaurant.test/menu",
      sourceType: "html",
      fetchMode: "http" as const,
      userAgent: "FysenMenuBot/0.1",
      etag: null,
      lastModified: null,
    };

    await expect(fetchMenuSource(input, clientForBody(body))).rejects.toMatchObject({
      code: "BODY_TOO_LARGE",
    });

    const fetched = await fetchMenuSource(
      { ...input, maxResponseBytes: 3 * 1024 * 1024 },
      clientForBody(body),
    );
    expect(fetched.kind).toBe("content");
    if (fetched.kind === "content") expect(fetched.bodyBytes.byteLength).toBeGreaterThan(2 * 1024 * 1024);
  });

  it("fails closed for direct runtime callers above the 4 MiB manifest ceiling", async () => {
    await expect(
      fetchMenuSource(
        {
          url: "https://restaurant.test/menu",
          sourceType: "html",
          fetchMode: "http",
          userAgent: "FysenMenuBot/0.1",
          etag: null,
          lastModified: null,
          maxResponseBytes: 4 * 1024 * 1024 + 1,
        },
        clientForBody("<html></html>"),
      ),
    ).rejects.toThrow("HTTP source response byte limit must be an integer between");
  });
});
