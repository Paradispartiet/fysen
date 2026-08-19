import { describe, expect, it } from "vitest";
import {
  HttpMenuClient,
  type MenuHttpFetchResult,
  type MenuHttpSourceState,
} from "./http-client.js";
import { resolveOpeningHoursSource } from "./opening-hours-source-runtime.js";

const multiScopeHoursHtml = `
  <html><body>
    <h3>Åpningstider CUE</h3>
    <p>Mandag - Søndag | 15:00 - 01:00</p>
    <h3>Åpningstider PIZZERIA</h3>
    <p>Mandag - Søndag | 18:00 - 23:30</p>
  </body></html>
`;

class StaticHoursClient extends HttpMenuClient {
  constructor(private readonly body: string) {
    super();
  }

  override async fetchSource(_source: MenuHttpSourceState): Promise<MenuHttpFetchResult> {
    return {
      kind: "content",
      fetchedAt: "2026-08-19T00:00:00.000Z",
      status: 200,
      contentType: "text/html",
      body: this.body,
      bodyBytes: new TextEncoder().encode(this.body),
      rawSha256: "test-raw-sha",
      etag: null,
      lastModified: null,
      durationMs: 0,
      robotsAllowed: true,
    };
  }
}

describe("opening-hours source scope priority", () => {
  it("uses explicit scope alone even when fallback restaurant identity matches another section", async () => {
    const resolved = await resolveOpeningHoursSource(
      {
        url: "https://www.cueoslo.no/meny",
        userAgent: "FysenMenuBot/0.1",
        etag: null,
        lastModified: null,
        scopeHints: ["Pizzeria"],
        fallbackScopeHints: [
          "https://www.cueoslo.no/meny",
          "cue-thorvald-meyers-gate-oslo",
          "Cue Oslo",
        ],
      },
      new StaticHoursClient(multiScopeHoursHtml),
    );

    expect(resolved.kind).toBe("content");
    if (resolved.kind !== "content") throw new Error("Expected content response");
    expect(resolved.extracted.intervals).toHaveLength(7);
    expect(
      resolved.extracted.intervals.every(
        (item) => item.opensAt === "18:00" && item.closesAt === "23:30",
      ),
    ).toBe(true);
    expect(resolved.extractorVersion).toContain("scope-priority-v1");
  });

  it("uses restaurant identity fallback when explicit scope is empty", async () => {
    const resolved = await resolveOpeningHoursSource(
      {
        url: "https://www.cueoslo.no/meny",
        userAgent: "FysenMenuBot/0.1",
        etag: null,
        lastModified: null,
        scopeHints: [],
        fallbackScopeHints: ["Cue Oslo"],
      },
      new StaticHoursClient(multiScopeHoursHtml),
    );

    expect(resolved.kind).toBe("content");
    if (resolved.kind !== "content") throw new Error("Expected content response");
    expect(resolved.extracted.intervals).toHaveLength(7);
    expect(
      resolved.extracted.intervals.every(
        (item) => item.opensAt === "15:00" && item.closesAt === "01:00" && item.closesNextDay,
      ),
    ).toBe(true);
  });
});
