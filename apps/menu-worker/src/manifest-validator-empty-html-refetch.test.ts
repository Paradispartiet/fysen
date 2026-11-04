import { describe, expect, it } from "vitest";
import { HttpMenuClient } from "./http-client.js";
import {
  shouldRetryEmptyHtmlHeuristic,
  validateRestaurantManifest,
} from "./manifest-validator.js";
import type { RestaurantOnboardingManifest } from "./onboarding-manifest.js";

const publicResolver = async (): Promise<readonly { address: string }[]> => [
  { address: "93.184.216.34" },
];

function asFetch(
  implementation: (url: URL, init: RequestInit) => Promise<Response>,
): typeof fetch {
  return implementation as unknown as typeof fetch;
}

function manifest(
  minimumExpectedItems: number,
  requiredDishNames: readonly string[],
): RestaurantOnboardingManifest {
  return {
    version: 1,
    restaurant: {
      slug: "retry-test-oslo",
      name: "Retry Test",
      websiteUrl: null,
      address: "Testveien 1",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.9,
      longitude: 10.7,
    },
    menuSource: {
      url: "https://restaurant.test/menu",
      sourceType: "html",
      fetchMode: "http",
      userAgent: "FysenMenuBot/0.1",
      checkIntervalMinutes: 60,
      minimumExpectedItems,
      sourceSupport: {
        redirectOrigins: [],
        browserDataOrigins: [],
        browserBlockedOrigins: [],
      },
    },
    verification: {},
    actions: [],
    qualityAssertions: {
      requiredDishNames: [...requiredDishNames],
      requiredDishVariants: [],
      forbiddenDishNames: [],
    },
  };
}

describe("manifest empty HTML refetch policy", () => {
  it("retries exactly once when HTTP 200 resolves to an empty html_heuristic shell", async () => {
    let robotsCalls = 0;
    let menuCalls = 0;
    const fetchImpl = asFetch(async (input) => {
      if (input.pathname === "/robots.txt") {
        robotsCalls += 1;
        return new Response("User-agent: *\nAllow: /\n", { status: 200 });
      }
      menuCalls += 1;
      if (menuCalls === 1) {
        return new Response(
          "<html><body><main>Loading menu...</main></body></html>",
          { status: 200, headers: { "Content-Type": "text/html" } },
        );
      }
      return new Response(
        "<html><body><h2>Hovedretter</h2><p>Falafel 98 kr</p></body></html>",
        { status: 200, headers: { "Content-Type": "text/html" } },
      );
    });
    const client = new HttpMenuClient({
      fetchImpl,
      resolver: publicResolver,
      minHostDelayMs: 1,
      timeoutMs: 1000,
    });

    const result = await validateRestaurantManifest(
      manifest(1, ["Falafel"]),
      client,
    );

    expect(result.accepted).toBe(true);
    expect(result.menu.method).toBe("html_heuristic");
    expect(result.menu.quality?.itemCount).toBe(1);
    expect(menuCalls).toBe(2);
    expect(robotsCalls).toBe(1);
  });

  it("does not retry a non-empty response that fails real quality assertions", async () => {
    let robotsCalls = 0;
    let menuCalls = 0;
    const fetchImpl = asFetch(async (input) => {
      if (input.pathname === "/robots.txt") {
        robotsCalls += 1;
        return new Response("User-agent: *\nAllow: /\n", { status: 200 });
      }
      menuCalls += 1;
      return new Response(
        "<html><body><h2>Hovedretter</h2><p>Falafel 98 kr</p></body></html>",
        { status: 200, headers: { "Content-Type": "text/html" } },
      );
    });
    const client = new HttpMenuClient({
      fetchImpl,
      resolver: publicResolver,
      minHostDelayMs: 1,
      timeoutMs: 1000,
    });

    const result = await validateRestaurantManifest(
      manifest(2, ["Falafel"]),
      client,
    );

    expect(result.accepted).toBe(false);
    expect(result.menu.quality?.itemCount).toBe(1);
    expect(result.menu.error).toContain("items=1/2");
    expect(menuCalls).toBe(1);
    expect(robotsCalls).toBe(1);
  });

  it.each([
    ["DKK", false],
    ["NOK", true],
  ] as const)("uses the public publication currency rule for JSON-LD %s", async (currency, expected) => {
    const client = new HttpMenuClient({
      fetchImpl: asFetch(async (input) => {
        if (input.pathname === "/robots.txt") {
          return new Response("User-agent: *\\nAllow: /\\n", { status: 200 });
        }
        const schema = {
          "@context": "https://schema.org",
          "@type": "MenuItem",
          name: "Falafel",
          offers: { "@type": "Offer", price: "98", priceCurrency: currency },
        };
        return new Response(
          `<html><body><script type="application/ld+json">${JSON.stringify(schema)}</script></body></html>`,
          { status: 200, headers: { "Content-Type": "text/html" } },
        );
      }),
      resolver: publicResolver,
      minHostDelayMs: 1,
      timeoutMs: 1000,
    });

    const result = await validateRestaurantManifest(manifest(1, ["Falafel"]), client);
    expect(result.menu.httpStatus).toBe(200);
    expect(result.menu.method).toBe("json_ld");
    expect(result.accepted).toBe(expected);
    expect(result.menu.quality?.accepted).toBe(expected);
    expect(result.menu.quality?.itemCount).toBe(1);
    if (!expected) {
      expect(result.menu.error).toContain("nonNok=1");
      expect(result.menu.error).toContain("limit=0");
    } else {
      expect(result.menu.error).toBeNull();
    }
  });

  it("checks mandatory dishes after omitting at most two invalid fragments", async () => {
    const client = new HttpMenuClient({
      fetchImpl: asFetch(async (input) => {
        if (input.pathname === "/robots.txt") {
          return new Response("User-agent: *\\nAllow: /\\n", { status: 200 });
        }
        const dishes = Array.from({ length: 28 }, (_, index) => ({
          "@type": "MenuItem",
          name: index === 0 ? "Falafel" : `Rettnavn ${index}`,
          offers: { "@type": "Offer", price: "98", priceCurrency: index > 25 ? "DKK" : "NOK" },
        }));
        const schema = { "@context": "https://schema.org", "@type": "Menu", hasMenuItem: dishes };
        return new Response(
          `<html><body><script type="application/ld+json">${JSON.stringify(schema)}</script></body></html>`,
          { status: 200, headers: { "Content-Type": "text/html" } },
        );
      }),
      resolver: publicResolver,
      minHostDelayMs: 1,
      timeoutMs: 1000,
    });

    const result = await validateRestaurantManifest(manifest(26, ["Falafel"]), client);
    expect(result.accepted).toBe(true);
    expect(result.menu.quality?.itemCount).toBe(26);
    expect(result.menu.observedDishNames).toHaveLength(28); // raw audit remains available
  });

  it("keeps the retry predicate limited to the exact empty HTTP HTML condition", () => {
    expect(
      shouldRetryEmptyHtmlHeuristic({
        fetchMode: "http",
        sourceType: "html",
        httpStatus: 200,
        extractionMethod: "html_heuristic",
        itemCount: 0,
      }),
    ).toBe(true);

    for (const candidate of [
      { fetchMode: "browser" as const, sourceType: "html" as const, httpStatus: 200, extractionMethod: "html_heuristic", itemCount: 0 },
      { fetchMode: "http" as const, sourceType: "json_ld" as const, httpStatus: 200, extractionMethod: "html_heuristic", itemCount: 0 },
      { fetchMode: "http" as const, sourceType: "html" as const, httpStatus: 503, extractionMethod: "html_heuristic", itemCount: 0 },
      { fetchMode: "http" as const, sourceType: "html" as const, httpStatus: 200, extractionMethod: "json_ld", itemCount: 0 },
      { fetchMode: "http" as const, sourceType: "html" as const, httpStatus: 200, extractionMethod: "html_heuristic", itemCount: 1 },
    ]) {
      expect(shouldRetryEmptyHtmlHeuristic(candidate)).toBe(false);
    }
  });
});
