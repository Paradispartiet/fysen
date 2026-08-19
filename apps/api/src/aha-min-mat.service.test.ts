import { describe, expect, it, vi } from "vitest";
import { exchangeAhaAuthorization } from "./aha-min-mat.service.js";

describe("AHA authorization exchange", () => {
  it("uses the fixed AHA exchange endpoint and validates the exact receipt", async () => {
    const fetchMock = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
      expect(String(url)).toContain("/v1/integrations/fysen/exchange");
      const sent = JSON.parse(String(init?.body ?? "{}"));
      expect(sent.clientId).toBe("fysen");
      return new Response(JSON.stringify({
        data: {
          authorizationId: "11111111-1111-4111-8111-111111111111",
          subject: "aha-subject",
          provider: "supabase",
          scopes: ["fysen:min_mat", "fysen:analysis_handoff"],
          policyVersion: "aha_fysen_connection_v1",
          expiresAt: new Date(Date.now() + 60_000).toISOString(),
        },
        meta: { requestId: "test", apiVersion: "test" },
      }), { status: 200, headers: { "content-type": "application/json" } });
    });
    const result = await exchangeAhaAuthorization({
      authorizationCode: `${"a".repeat(80)}.${"b".repeat(43)}`,
      codeVerifier: "c".repeat(64),
      redirectUri: "https://fysen.example/api/aha/callback",
    }, fetchMock as typeof fetch);
    expect(result.subject).toBe("aha-subject");
    expect(result.scopes).toEqual(["fysen:min_mat", "fysen:analysis_handoff"]);
  });
});
