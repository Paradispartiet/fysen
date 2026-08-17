import { describe, expect, it } from "vitest";
import { sha256 } from "@fysen/menu-core";
import { HttpMenuClient, type MenuFetchError } from "./http-client.js";

const publicResolver = async (): Promise<readonly { address: string }[]> => [
  { address: "93.184.216.34" },
];

function asFetch(
  implementation: (url: URL, init: RequestInit) => Promise<Response>,
): typeof fetch {
  return implementation as unknown as typeof fetch;
}

describe("HttpMenuClient", () => {
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
    expect(calls[1]?.headers.get("if-modified-since")).toBe("Sat, 15 Aug 2026 12:00:00 GMT");
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

  it("does not fetch the menu when robots.txt disallows the target", async () => {
    let calls = 0;
    const fetchImpl = asFetch(async (input) => {
      calls += 1;
      expect(input.pathname).toBe("/robots.txt");
      return new Response("User-agent: FysenMenuBot\nDisallow: /menu\n", { status: 200 });
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
