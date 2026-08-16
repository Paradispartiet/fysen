import { describe, expect, it } from "vitest";
import { assertPublicHttpUrl, isPublicIpAddress } from "./security.js";

describe("crawler URL safety", () => {
  it("allows public unicast addresses and rejects private/loopback ranges", () => {
    expect(isPublicIpAddress("8.8.8.8")).toBe(true);
    expect(isPublicIpAddress("10.0.0.1")).toBe(false);
    expect(isPublicIpAddress("127.0.0.1")).toBe(false);
    expect(isPublicIpAddress("::1")).toBe(false);
  });

  it("rejects a public-looking hostname if DNS resolves to a private address", async () => {
    await expect(
      assertPublicHttpUrl("https://example.test/menu", async () => [{ address: "192.168.1.4" }]),
    ).rejects.toThrow(/non-public/);
  });

  it("accepts a hostname when all resolved addresses are public", async () => {
    const url = await assertPublicHttpUrl("https://example.test/menu", async () => [
      { address: "93.184.216.34" },
    ]);
    expect(url.hostname).toBe("example.test");
  });
});
