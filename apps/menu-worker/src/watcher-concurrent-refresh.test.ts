import { describe, expect, it } from "vitest";
import { ConcurrentMenuUpdateError, type MenuIndexRepository } from "@fysen/database";
import { createMenuFingerprint } from "@fysen/menu-core";
import { HttpMenuClient, type MenuHttpFetchResult } from "./http-client.js";
import { extractMenuSource, extractorVersionForSourceType } from "./menu-source-runtime.js";
import { watchMenuSourceOnce } from "./watcher.js";

function html(price: number): string {
  return `<script type="application/ld+json">${JSON.stringify({
    "@type": "MenuItem", name: "Chicken Curry",
    offers: { "@type": "Offer", price, priceCurrency: "NOK" },
  })}</script>`;
}

class SourceClient extends HttpMenuClient {
  calls = 0;
  override async fetchSource(): Promise<MenuHttpFetchResult> {
    this.calls += 1;
    const body = html(this.calls === 1 ? 210 : 260);
    return {
      kind: "content", status: 200, body, bodyBytes: new TextEncoder().encode(body),
      contentType: "text/html", fetchedAt: "2026-10-30T12:00:00Z", rawSha256: "fixture",
      etag: null, lastModified: null, durationMs: 1, robotsAllowed: true,
    };
  }
}

async function race(mode: "once" | "always" | "database_error" | "new_minimum") {
  const baseItems = (await extractMenuSource("html", { body: html(200) } as Parameters<typeof extractMenuSource>[1])).items;
  const competingItems = (await extractMenuSource("html", { body: html(250) } as Parameters<typeof extractMenuSource>[1])).items;
  let previous = { id: "base", items: baseItems, normalizedSha256: createMenuFingerprint(baseItems), extractorVersion: extractorVersionForSourceType("html") };
  const source = { enabled: true, sourceType: "html", fetchMode: "http", url: "https://example.com/menu", userAgent: "test", etag: null, lastModified: null, lastMenuFingerprint: null, maxResponseBytes: null, minimumExpectedItems: 1 };
  const writes: Parameters<MenuIndexRepository["recordSnapshot"]>[0][] = [];
  const failures: Parameters<MenuIndexRepository["recordFailure"]>[0][] = [];
  const repository = {
    async getMenuSourceById() { return source; },
    async getLatestSnapshotWithItems() { return previous; },
    async recordFailure(value: Parameters<MenuIndexRepository["recordFailure"]>[0]) { failures.push(value); },
    async recordSnapshot(value: Parameters<MenuIndexRepository["recordSnapshot"]>[0]) {
      writes.push(value);
      if (mode === "database_error") throw new Error("database unavailable");
      if (writes.length === 1 || mode === "always") {
        previous = { ...previous, id: "competitor", items: competingItems, normalizedSha256: createMenuFingerprint(competingItems) };
        if (mode === "new_minimum") source.minimumExpectedItems = 2;
        throw new ConcurrentMenuUpdateError("source", value.expectedPreviousSnapshotId, "competitor");
      }
      return "accepted";
    },
  } as unknown as MenuIndexRepository;
  return { repository, client: new SourceClient(), writes, failures };
}

describe("concurrent menu refresh", () => {
  it("refetches and diffs against the competing snapshot before another guarded write", async () => {
    const state = await race("once");
    const result = await watchMenuSourceOnce(state.repository, "source", state.client);
    expect(result.snapshotId).toBe("accepted");
    expect(state.client.calls).toBe(2);
    expect(state.writes[1]?.expectedPreviousSnapshotId).toBe("competitor");
    expect(state.writes[1]?.items[0]?.priceMinor).toBe(26000);
    expect(state.writes[1]?.changes[0]?.before?.priceMinor).toBe(25000);
  });

  it("stops after a second conflict instead of retrying indefinitely", async () => {
    const state = await race("always");
    await expect(watchMenuSourceOnce(state.repository, "source", state.client)).rejects.toBeInstanceOf(ConcurrentMenuUpdateError);
    expect(state.writes).toHaveLength(2);
  });

  it("does not retry unrelated database failures", async () => {
    const state = await race("database_error");
    await expect(watchMenuSourceOnce(state.repository, "source", state.client)).rejects.toThrow("database unavailable");
    expect(state.writes).toHaveLength(1);
  });

  it("rechecks the latest source minimum and preserves extraction failure on retry", async () => {
    const state = await race("new_minimum");
    const result = await watchMenuSourceOnce(state.repository, "source", state.client);
    expect(result.outcome).toBe("extraction_error");
    expect(state.writes).toHaveLength(1);
    expect(state.failures[0]?.errorCode).toBe("BELOW_MINIMUM");
  });
});
