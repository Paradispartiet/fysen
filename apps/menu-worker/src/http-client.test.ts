import { describe, expect, it } from "vitest";
import { sha256 } from "@fysen/menu-core";
import {
  boundedHttpTimeoutMs,
  HttpMenuClient,
  type MenuFetchError,
} from "./http-client.js";

const publicResolver = async (): Promise<readonly { address: string }[]> => [
  { address: "93.184.216.34" },
];

function asFetch(
  implementation: (url: URL, init: RequestInit) => Promise<Response>,
): typeof fetch {
  return implementation as unknown as typeof fetch;
}

describe("HttpMenuClient", () => {
  it("uses a larger but bounded production timeout", () => {
    expect(boundedHttpTimeoutMs(undefined)).toBe(20_000);
    expect(boundedHttpTimeoutMs("25000")).toBe(25_000);
    expect(boundedHttpTimeoutMs("999999")).toBe(30_000);
    expect(boundedHttpTimeoutMs("invalid")).toBe(20_000);
  });

  it("reserves same-origin request slots before concurrent fetches can race", async () => {
    const requestPaths: string[] = [];
    const requestTimes: number[] = [];
    const fetchImpl = asFetch(async (input) => {
      requestPaths.push(input.pathname);
      requestTimes.push(Date.now());
      if (input.pathname === "/robots.txt") {
        return new Response("User-agent: *\nAllow: /\n", { status: 200 });
      }
      return new Response("<html><body>menu</body></html>", { status: 200 });
    });
    const firstClient = new HttpMenuClient({
      fetchImpl,
      resolver: publicResolver,
      minHostDelayMs: 30,
      timeoutMs: 1000,
    });
    const secondClient = new HttpMenuClient({
      fetchImpl,
      resolver: publicResolver,
      minHostDelayMs: 30,
      timeoutMs: 1000,
    });
    const source = (path: string) => ({
      url: `https://restaurant.test/${path}`,
      userAgent: "FysenMenuBot/0.1",
      etag: null,
      lastModified: null,
    });

    const pending = Promise.all([
      firstClient.fetchSource(source("one")),
      secondClient.fetchSource(source("two")),
    ]);
    await pending;
    expect(requestPaths).toHaveLength(4);
    for (let index = 1; index < requestTimes.length; index += 1) {
      expect((requestTimes[index] as number) - (requestTimes[index - 1] as number)).toBeGreaterThanOrEqual(20);
    }
  });

  it("honors robots.txt and sends conditional validators to the menu request", async () => {
    const calls: { readonly url: string; readonly headers: Headers }[] = [];
    const fetchImpl = asFetch(async (input, init) => {
      const headers = new Headers(init.headers);
      calls.push({ url: input.href, headers });
      if (input.pathname === "/robots.txt") {
        return new Response("User-agent: *\nAllow: /\n", { status: 200 });
      }
      return new Response(null, { status: 304, headers: { ETag: '"v2"' } });
    });

    const client = new HttpMenuClient({
      fetchImpl,
      resolver: publicResolver,
      minHostDelayMs: 1,
      timeoutMs: 1000,
    });
    const result = await client.fetchSource({
      url: "https://restaurant.test/menu",
      userAgent: "FysenMenuBot/0.1",
      etag: '"v1"',
      lastModified: "Sat, 15 Aug 2026 12:00:00 GMT",
    });

    expect(result.kind).toBe("not_modified");
    expect(calls).toHaveLength(2);
    expect(calls[1]?.headers.get("if-none-match")).toBe('"v1"');
    expect(calls[1]?.headers.get("if-modified-since")).toBe(
      "Sat, 15 Aug 2026 12:00:00 GMT",
    );
  });

  it("preserves binary response bytes and hashes the exact bytes", async () => {
    const bytes = Uint8Array.from([0x25, 0x50, 0x44, 0x46, 0x00, 0xff, 0x0a]);
    const fetchImpl = asFetch(async (input) => {
      if (input.pathname === "/robots.txt") {
        return new Response("User-agent: *\nAllow: /\n", { status: 200 });
      }
      return new Response(bytes, {
        status: 200,
        headers: { "Content-Type": "application/pdf" },
      });
    });
    const client = new HttpMenuClient({
      fetchImpl,
      resolver: publicResolver,
      minHostDelayMs: 1,
      timeoutMs: 1000,
    });
    const result = await client.fetchSource({
      url: "https://restaurant.test/menu.pdf",
      userAgent: "FysenMenuBot/0.1",
      etag: null,
      lastModified: null,
    });

    expect(result.kind).toBe("content");
    if (result.kind !== "content") throw new Error("Expected content response");
    expect([...result.bodyBytes]).toEqual([...bytes]);
    expect(result.rawSha256).toBe(sha256(bytes));
    expect(result.contentType).toBe("application/pdf");
  });

  it("allows an explicit bounded source-specific body limit without changing the client default", async () => {
    const fetchImpl = asFetch(async (input) => {
      if (input.pathname === "/robots.txt") {
        return new Response("User-agent: *\nAllow: /\n", { status: 200 });
      }
      return new Response("0123456789", {
        status: 200,
        headers: { "Content-Length": "10", "Content-Type": "application/pdf" },
      });
    });
    const client = new HttpMenuClient({
      fetchImpl,
      resolver: publicResolver,
      minHostDelayMs: 1,
      timeoutMs: 1000,
      maxResponseBytes: 5,
    });
    const source = {
      url: "https://restaurant.test/menu.pdf",
      userAgent: "FysenMenuBot/0.1",
      etag: null,
      lastModified: null,
    };

    await expect(
      client.fetchSource(source),
    ).rejects.toMatchObject<MenuFetchError>({ code: "BODY_TOO_LARGE" });
    const result = await client.fetchSource(source, { maxResponseBytes: 16 });
    expect(result.kind).toBe("content");
    if (result.kind !== "content") throw new Error("Expected content response");
    expect(result.bodyBytes.byteLength).toBe(10);
  });

  it("rejects unsafe explicit body-limit overrides above the hard cap", async () => {
    const client = new HttpMenuClient({
      fetchImpl: asFetch(
        async () => new Response("never fetched", { status: 200 }),
      ),
      resolver: publicResolver,
      minHostDelayMs: 1,
      timeoutMs: 1000,
    });
    await expect(
      client.fetchSource(
        {
          url: "https://restaurant.test/menu.pdf",
          userAgent: "FysenMenuBot/0.1",
          etag: null,
          lastModified: null,
        },
        { maxResponseBytes: 26 * 1024 * 1024 },
      ),
    ).rejects.toMatchObject<MenuFetchError>({ code: "INVALID_BODY_LIMIT" });
  });

  it("does not fetch the menu when robots.txt disallows the target", async () => {
    let calls = 0;
    const fetchImpl = asFetch(async (input) => {
      calls += 1;
      expect(input.pathname).toBe("/robots.txt");
      return new Response("User-agent: FysenMenuBot\nDisallow: /menu\n", {
        status: 200,
      });
    });

    const client = new HttpMenuClient({
      fetchImpl,
      resolver: publicResolver,
      minHostDelayMs: 1,
      timeoutMs: 1000,
    });

    await expect(
      client.fetchSource({
        url: "https://restaurant.test/menu",
        userAgent: "FysenMenuBot",
        etag: null,
        lastModified: null,
      }),
    ).rejects.toMatchObject<MenuFetchError>({ code: "ROBOTS_DISALLOWED" });
    expect(calls).toBe(1);
  });

  it("retries one transient robots.txt 502 before evaluating the rules", async () => {
    let robotsCalls = 0;
    let menuCalls = 0;
    const fetchImpl = asFetch(async (input) => {
      if (input.pathname === "/robots.txt") {
        robotsCalls += 1;
        if (robotsCalls === 1)
          return new Response("temporary upstream failure", { status: 502 });
        return new Response("User-agent: *\nAllow: /\n", { status: 200 });
      }
      menuCalls += 1;
      return new Response("<html><body>menu</body></html>", {
        status: 200,
        headers: { "Content-Type": "text/html" },
      });
    });

    const client = new HttpMenuClient({
      fetchImpl,
      resolver: publicResolver,
      minHostDelayMs: 1,
      timeoutMs: 1000,
    });
    const result = await client.fetchSource({
      url: "https://restaurant.test/menu",
      userAgent: "FysenMenuBot/0.1",
      etag: null,
      lastModified: null,
    });

    expect(result.kind).toBe("content");
    expect(robotsCalls).toBe(2);
    expect(menuCalls).toBe(1);
  });

  it("keeps robots.txt fail-closed after bounded transient retries", async () => {
    let robotsCalls = 0;
    const fetchImpl = asFetch(async (input) => {
      expect(input.pathname).toBe("/robots.txt");
      robotsCalls += 1;
      return new Response("upstream failure", { status: 502 });
    });

    const client = new HttpMenuClient({
      fetchImpl,
      resolver: publicResolver,
      minHostDelayMs: 1,
      timeoutMs: 1000,
    });

    await expect(
      client.fetchSource({
        url: "https://restaurant.test/menu",
        userAgent: "FysenMenuBot/0.1",
        etag: null,
        lastModified: null,
      }),
    ).rejects.toMatchObject<MenuFetchError>({
      code: "ROBOTS_UNAVAILABLE",
      httpStatus: 502,
    });
    expect(robotsCalls).toBe(2);
  });

  it("retries one transient network failure for a menu GET", async () => {
    let menuCalls = 0;
    const fetchImpl = asFetch(async (input) => {
      if (input.pathname === "/robots.txt") {
        return new Response("User-agent: *\nAllow: /\n", { status: 200 });
      }
      menuCalls += 1;
      if (menuCalls === 1) throw new Error("fetch failed");
      return new Response("<html><body>menu</body></html>", {
        status: 200,
        headers: { "Content-Type": "text/html" },
      });
    });

    const client = new HttpMenuClient({
      fetchImpl,
      resolver: publicResolver,
      minHostDelayMs: 1,
      timeoutMs: 1000,
    });
    const result = await client.fetchSource({
      url: "https://restaurant.test/menu",
      userAgent: "FysenMenuBot/0.1",
      etag: null,
      lastModified: null,
    });

    expect(result.kind).toBe("content");
    expect(menuCalls).toBe(2);
  });

  it("blocks cross-origin redirects after revalidating the destination", async () => {
    const fetchImpl = asFetch(async (input) => {
      if (input.pathname === "/robots.txt") {
        return new Response("User-agent: *\nAllow: /\n", { status: 200 });
      }
      return new Response(null, {
        status: 302,
        headers: { Location: "https://other-restaurant.test/menu" },
      });
    });
    const client = new HttpMenuClient({
      fetchImpl,
      resolver: publicResolver,
      minHostDelayMs: 1,
      timeoutMs: 1000,
    });
    await expect(
      client.fetchSource({
        url: "https://restaurant.test/menu",
        userAgent: "FysenMenuBot/0.1",
        etag: null,
        lastModified: null,
      }),
    ).rejects.toMatchObject<MenuFetchError>({ code: "CROSS_ORIGIN_REDIRECT" });
  });

  it("rejects oversized menu bodies before they reach extraction", async () => {
    const fetchImpl = asFetch(async (input) => {
      if (input.pathname === "/robots.txt") {
        return new Response("User-agent: *\nAllow: /\n", { status: 200 });
      }
      return new Response("0123456789", {
        status: 200,
        headers: { "Content-Length": "10", "Content-Type": "text/html" },
      });
    });
    const client = new HttpMenuClient({
      fetchImpl,
      resolver: publicResolver,
      minHostDelayMs: 1,
      timeoutMs: 1000,
      maxResponseBytes: 5,
    });
    await expect(
      client.fetchSource({
        url: "https://restaurant.test/menu",
        userAgent: "FysenMenuBot/0.1",
        etag: null,
        lastModified: null,
      }),
    ).rejects.toMatchObject<MenuFetchError>({ code: "BODY_TOO_LARGE" });
  });
});
