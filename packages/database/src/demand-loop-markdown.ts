import type {
  DemandGapReviewLane,
  DemandGapSignal,
  DemandLoopReport,
  DemandSafeResolution,
} from "./demand-loop.js";

const signalLabel: Readonly<Record<DemandGapSignal, string>> = {
  zero_result: "nulltreff",
  fuzzy_only: "bare fuzzy",
  zero_and_fuzzy: "nulltreff + fuzzy",
};

const laneLabel: Readonly<Record<DemandGapReviewLane, string>> = {
  coverage_or_alias: "coverage / alias-review",
  alias_or_parser: "alias / parser-review",
};

const resolutionLabel: Readonly<Record<DemandSafeResolution, string>> = {
  exact: "exact",
  canonical: "canonical",
  prefix: "prefix",
  contains: "contains",
};

function shortTime(value: string): string {
  return value.replace("T", " ").replace(/\.\d{3}Z$/, "Z");
}

function escapeCell(value: string): string {
  return value.replaceAll("|", "\\|");
}

function score(value: number | null): string {
  return value === null ? "—" : value.toFixed(3);
}

export function renderDemandLoopMarkdown(report: DemandLoopReport): string {
  const lines: string[] = [
    "# Fysen Demand Loop v1",
    "",
    `Generated: ${shortTime(report.generatedAt)}`,
    "",
    "## Trusted demand, 7d",
    "",
    `- Explicit searches med null/fuzzy-signal: **${report.totals.explicitSignalSearches7d}**`,
    `- Fortsatt uløste signaler: **${report.totals.unresolvedSignalSearches7d}**`,
    `- Løst av dagens ferske indeks: **${report.totals.resolvedSignalSearches7d}**`,
    `- Prioritert gap-kø: **${report.totals.queueSize}** / maks 20`,
    `- Legacy/unclassified signal-søk ekskludert fra prioritering: **${report.totals.legacyUnclassifiedSignalSearches7d}**`,
    "",
    "## Prioritert gap-kø",
    "",
  ];

  if (report.queue.length === 0) {
    lines.push("Ingen uløste eksplisitte demand-signaler etter replay mot dagens ferske indeks.");
  } else {
    lines.push(
      "| # | Query | City | Signal | Searches 7d | Null | Fuzzy searches | Fuzzy impressions | Avg fuzzy | Best fuzzy | Review lane |",
      "|---:|---|---|---|---:|---:|---:|---:|---:|---:|---|",
    );
    report.queue.forEach((item, index) => {
      lines.push(
        `| ${index + 1} | ${escapeCell(item.normalizedQuery)} | ${escapeCell(item.city)} | ${signalLabel[item.signal]} | ${item.searches7d} | ${item.zeroResultSearches7d} | ${item.fuzzySearches7d} | ${item.fuzzyImpressions7d} | ${score(item.averageFuzzyScore)} | ${score(item.bestFuzzyScore)} | ${laneLabel[item.reviewLane]} |`,
      );
    });
  }

  lines.push(
    "",
    "> Køen er et beslutningsgrunnlag, ikke en automatisk endringsmotor. Den oppretter aldri aliaser, parserregler eller restaurantkandidater på egen hånd.",
    "",
    "## Historiske signaler løst av dagens indeks",
    "",
  );

  if (report.resolvedByCurrentIndex.length === 0) {
    lines.push("Ingen eksplisitte null/fuzzy-signaler i vinduet er senere løst av dagens indeks.");
  } else {
    lines.push(
      "| Query | City | Historical searches 7d | Signal | Current resolution |",
      "|---|---|---:|---|---|",
    );
    for (const item of report.resolvedByCurrentIndex) {
      const resolution = item.currentResolution;
      if (!resolution) continue;
      lines.push(
        `| ${escapeCell(item.normalizedQuery)} | ${escapeCell(item.city)} | ${item.searches7d} | ${signalLabel[item.signal]} | ✅ ${resolutionLabel[resolution]} |`,
      );
    }
  }

  lines.push(
    "",
    "## Dataintegritet",
    "",
    "- Bare `demand_source = explicit_search` kan komme inn i prioritert kø.",
    "- Historiske rader fra før provenance-kontrakten er `legacy_unclassified` og beholdes, men styrer ikke prioritering.",
    "- Browse/Utforsk Oslo og direkte production-smokes skal ikke skrive search funnel-events.",
    "- Replay bruker dagens ferske indeks i samme by. Exact, canonical, prefix og contains løser et gammelt signal; fuzzy alene gjør det ikke.",
    "- Gap med nulltreff går til coverage/alias-review. Fuzzy-only går først til alias/parser-review.",
    "",
  );

  return lines.join("\n");
}
