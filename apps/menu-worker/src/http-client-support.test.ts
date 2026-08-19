import { describe, expect, it } from "vitest";
import { HttpMenuClient } from "./http-client.js";

const publicResolver = async (): Promise<readonly { address: string }[]> => [
  { address: "93.184.216.34" },
];

function asFetch(implementation: (url: URL) => Promise<Response>): typeof fetch {
  return implementation as unknown as typeof fetch;
}

function redirectingFetch(): typeof fetch {
  return asFetch(async (url) => {
    if (url.pathname === "/robots.txt") {
      return new Response("User-agent: *\nAllow: /\n", { status: 200 });
    }
    if (url.hostname === "restaurant.test") {
      return new Response(null, {
        status: 302,
        headers: { Location: "https://order.test/menu" },
      });
    }
    return new Response("<html><body>Menu</body></html>", {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  });
}

describe("HTTP menu source support origins", () => {
  it("still blocks undeclared cross-origin redirects", async () => {
    const client = new HttpMenuClient({
      fetchImpl: redirectingFetch(),
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
    ).rejects.toMatchObject({ code: "CROSS_ORIGIN_REDIRECT" });
  });

  it("allows only an explicitly declared redirect origin and rechecks its robots policy", async () => {
    const calls: string[] = [];
    const client = new HttpMenuClient({
      fetchImpl: asFetch(async (url) => {
        calls.push(url.href);
        if (url.pathname === "/robots.txt") {
          return new Response("User-agent: *\nAllow: /\n", { status: 200 });
        }
        if (url.hostname === "restaurant.test") {
          return new Response(null, {
            status: 302,
            headers: { Location: "https://order.test/menu" },
          });
        }
        return new Response("<html><body>Menu</body></html>", {
          status: 200,
          headers: { "Content-Type": "text/html" },
        });
      }),
      resolver: publicResolver,
      minHostDelayMs: 1,
      timeoutMs: 1000,
    });

    const result = await client.fetchSource(
      {
        url: "https://restaurant.test/menu",
        userAgent: "FysenMenuBot/0.1",
        etag: null,
        lastModified: null,
      },
      { allowedRedirectOrigins: ["https://order.test"] },
    );

    expect(result.kind).toBe("content");
    expect(calls).toContain("https://order.test/robots.txt");
    expect(calls).toContain("https://order.test/menu");
  });

  it("keeps robots responses bounded but accepts a valid policy above the old 256 KiB cap", async () => {
    const largeRobots = `User-agent: *\nAllow: /\n#${"x".repeat(300 * 1024)}`;
    const client = new HttpMenuClient({
      fetchImpl: asFetch(async (url) =>
        url.pathname === "/robots.txt"
          ? new Response(largeRobots, { status: 200 })
          : new Response("<html><body>Menu</body></html>", { status: 200 }),
      ),
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
    ).resolves.toMatchObject({ kind: "content", status: 200 });
  });

  it("refuses an undeclared second hop even after an allowed first hop", async () => {
    const client = new HttpMenuClient({
      fetchImpl: asFetch(async (url) => {
        if (url.pathname === "/robots.txt") {
          return new Response("User-agent: *\nAllow: /\n", { status: 200 });
        }
        if (url.hostname === "restaurant.test") {
          return new Response(null, { status: 302, headers: { Location: "https://order.test/menu" } });
        }
        return new Response(null, { status: 302, headers: { Location: "https://third.test/menu" } });
      }),
      resolver: publicResolver,
      minHostDelayMs: 1,
      timeoutMs: 1000,
    });

    await expect(
      client.fetchSource(
        {
          url: "https://restaurant.test/menu",
          userAgent: "FysenMenuBot/0.1",
          etag: null,
          lastModified: null,
        },
        { allowedRedirectOrigins: ["https://order.test"] },
      ),
    ).rejects.toMatchObject({ code: "CROSS_ORIGIN_REDIRECT" });
  });
});
