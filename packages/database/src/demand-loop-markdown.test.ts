import { describe, expect, it } from "vitest";
import { renderDemandLoopMarkdown } from "./demand-loop-markdown.js";
import type { DemandLoopReport } from "./demand-loop.js";

describe("demand loop markdown", () => {
  it("renders a bounded trusted gap queue and separates resolved and legacy demand", () => {
    const report: DemandLoopReport = {
      generatedAt: "2026-08-19T12:00:00.000Z",
      totals: {
        explicitSignalSearches7d: 8,
        unresolvedSignalSearches7d: 5,
        resolvedSignalSearches7d: 3,
        queueSize: 2,
        legacyUnclassifiedSignalSearches7d: 11,
      },
      queue: [
        {
          normalizedQuery: "ramen | spicy",
          city: "Oslo",
          searches7d: 3,
          zeroResultSearches7d: 3,
          fuzzySearches7d: 0,
          fuzzyImpressions7d: 0,
          averageFuzzyScore: null,
          bestFuzzyScore: null,
          lastSeenAt: "2026-08-19T11:00:00.000Z",
          signal: "zero_result",
          reviewLane: "coverage_or_alias",
          currentResolution: null,
        },
        {
          normalizedQuery: "bif tartar",
          city: "Oslo",
          searches7d: 2,
          zeroResultSearches7d: 0,
          fuzzySearches7d: 2,
          fuzzyImpressions7d: 4,
          averageFuzzyScore: 0.81,
          bestFuzzyScore: 0.84,
          lastSeenAt: "2026-08-19T10:00:00.000Z",
          signal: "fuzzy_only",
          reviewLane: "alias_or_parser",
          currentResolution: null,
        },
      ],
      resolvedByCurrentIndex: [
        {
          normalizedQuery: "carbonara",
          city: "Oslo",
          searches7d: 3,
          zeroResultSearches7d: 1,
          fuzzySearches7d: 2,
          fuzzyImpressions7d: 2,
          averageFuzzyScore: 0.7,
          bestFuzzyScore: 0.72,
          lastSeenAt: "2026-08-18T10:00:00.000Z",
          signal: "zero_and_fuzzy",
          reviewLane: "coverage_or_alias",
          currentResolution: "exact",
        },
      ],
    };

    const markdown = renderDemandLoopMarkdown(report);
    expect(markdown).toContain("Fysen Demand Loop v1");
    expect(markdown).toContain("Prioritert gap-kø: **2** / maks 20");
    expect(markdown).toContain("ramen \\| spicy");
    expect(markdown).toContain("coverage / alias-review");
    expect(markdown).toContain("bif tartar");
    expect(markdown).toContain("alias / parser-review");
    expect(markdown).toContain("Historiske signaler løst av dagens indeks");
    expect(markdown).toContain("✅ exact");
    expect(markdown).toContain("legacy_unclassified");
    expect(markdown).toContain("Bare `demand_source = explicit_search`");
    expect(markdown).toContain("aldri aliaser, parserregler eller restaurantkandidater");
  });
});
