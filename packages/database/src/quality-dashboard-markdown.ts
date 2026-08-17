import type {
  QualityActionReport,
  QualityDashboardReport,
  QualityHealth,
  QualityRestaurantReport,
  QualitySafeMatchType,
} from "./quality-dashboard.js";

const healthLabel: Readonly<Record<QualityHealth, string>> = {
  healthy: "✅ healthy",
  degraded: "⚠️ degraded",
  stale: "🕒 stale",
  unverified: "❔ unverified",
  disabled: "⏸️ disabled",
};

const resolutionLabel: Readonly<Record<QualitySafeMatchType, string>> = {
  exact: "exact",
  canonical: "canonical",
  prefix: "prefix",
  contains: "contains",
};

function shortTime(value: string | null): string {
  if (!value) return "—";
  return value.replace("T", " ").replace(/\.\d{3}Z$/, "Z");
}

function actionLabel(action: QualityActionReport): string {
  const prefix = action.type === "booking" ? "booking" : "order";
  if (action.status === "verified") return `✅ ${prefix}`;
  if (action.status === "expiring") return `⚠️ ${prefix} expiring`;
  if (action.status === "expired") return `❌ ${prefix} expired`;
  return `⏸️ ${prefix} disabled`;
}

function restaurantMenuSummary(restaurant: QualityRestaurantReport): string {
  return restaurant.menuSources
    .map(
      (source) =>
        `${healthLabel[source.health]} · ${source.currentItemCount} items · failures ${source.consecutiveFailures}` +
        (source.lastErrorCode ? ` · ${source.lastErrorCode}` : ""),
    )
    .join("<br>");
}

function restaurantActions(restaurant: QualityRestaurantReport): string {
  if (restaurant.actions.length === 0) return "—";
  return restaurant.actions.map(actionLabel).join("<br>");
}

function escapeCell(value: string): string {
  return value.replaceAll("|", "\\|");
}

function aliasList(values: readonly string[]): string {
  return values.length === 0 ? "—" : values.map((value) => `\`${escapeCell(value)}\``).join(", ");
}

function percent(value: number, total: number): string {
  if (total === 0) return "0.0%";
  return `${((value / total) * 100).toFixed(1)}%`;
}

function score(value: number): string {
  return value.toFixed(3);
}

export function renderQualityDashboardMarkdown(report: QualityDashboardReport): string {
  const lines: string[] = [
    "# Fysen Quality Dashboard",
    "",
    `Generated: ${shortTime(report.generatedAt)}`,
    "",
    "## Pilot health",
    "",
    `- Active restaurants: **${report.totals.activeRestaurants}**`,
    `- Candidate restaurants: **${report.totals.candidateRestaurants}**`,
    `- Menu sources: **${report.totals.menuSources}** (${report.totals.healthyMenuSources} healthy, ${report.totals.degradedMenuSources} needing attention)`,
    `- Current menu items: **${report.totals.currentMenuItems}**`,
    `- Historical zero-result searches, 7d: **${report.totals.zeroResultSearches7d}**`,
    `- Unresolved zero-result searches, 7d: **${report.totals.unresolvedZeroResultSearches7d}**`,
    `- Conversion events, 7d: **${report.totals.conversions7d}**`,
    "",
    "## Restaurants",
    "",
    "| Restaurant | Coverage | Menu | Last checked | Hours | Actions | Impressions 7d | Conversions 7d |",
    "|---|---|---|---|---|---|---:|---:|",
  ];

  for (const restaurant of report.restaurants) {
    const latestMenuCheck = restaurant.menuSources
      .map((source) => source.lastCheckedAt)
      .filter((value): value is string => value !== null)
      .sort()
      .at(-1) ?? null;
    lines.push(
      `| ${escapeCell(restaurant.name)} | ${restaurant.active ? "✅ published" : "🧪 candidate"} | ${restaurantMenuSummary(restaurant)} | ${shortTime(latestMenuCheck)} | ${healthLabel[restaurant.hours.health]} · ${restaurant.hours.intervalCount} intervals${restaurant.hours.lastErrorCode ? ` · ${restaurant.hours.lastErrorCode}` : ""} | ${restaurantActions(restaurant)} | ${restaurant.impressions7d} | ${restaurant.conversions7d} |`,
    );
  }

  const matchTotal = report.matching.impressions7d;
  lines.push(
    "",
    "## Matching quality, 7d",
    "",
    `- Result impressions: **${matchTotal}**`,
    `- Exact: **${report.matching.byMatchType.exact}** (${percent(report.matching.byMatchType.exact, matchTotal)})`,
    `- Canonical: **${report.matching.byMatchType.canonical}** (${percent(report.matching.byMatchType.canonical, matchTotal)})`,
    `- Prefix: **${report.matching.byMatchType.prefix}** (${percent(report.matching.byMatchType.prefix, matchTotal)})`,
    `- Contains: **${report.matching.byMatchType.contains}** (${percent(report.matching.byMatchType.contains, matchTotal)})`,
    `- Fuzzy: **${report.matching.byMatchType.fuzzy}** (${percent(report.matching.byMatchType.fuzzy, matchTotal)})`,
    "",
    "### Canonical concepts",
    "",
    "| Concept | Query aliases | Menu aliases | Current menu items | Canonical impressions 7d |",
    "|---|---|---|---:|---:|",
  );

  if (report.matching.canonicalConcepts.length === 0) {
    lines.push("| — | — | — | 0 | 0 |");
  } else {
    for (const concept of report.matching.canonicalConcepts) {
      lines.push(
        `| ${escapeCell(concept.canonicalName)} (\`${escapeCell(concept.slug)}\`) | ${aliasList(concept.queryAliases)} | ${aliasList(concept.menuAliases)} | ${concept.currentMenuItemMatches} | ${concept.canonicalImpressions7d} |`,
      );
    }
  }

  lines.push("", "### Canonical queries", "");
  if (report.matching.topCanonicalQueries7d.length === 0) {
    lines.push("Ingen canonical-opprykk de siste 7 dagene.");
  } else {
    lines.push(
      "| Query | Canonical dish | Searches 7d | Impressions 7d | Avg score |",
      "|---|---|---:|---:|---:|",
    );
    for (const query of report.matching.topCanonicalQueries7d) {
      lines.push(
        `| ${escapeCell(query.normalizedQuery)} | ${escapeCell(query.canonicalDishName)} (\`${escapeCell(query.canonicalDishSlug)}\`) | ${query.searches7d} | ${query.impressions7d} | ${score(query.averageScore)} |`,
      );
    }
  }

  const unresolvedFuzzy = report.matching.topFuzzyQueries7d.filter((query) => query.currentResolution === null);
  const resolvedFuzzy = report.matching.topFuzzyQueries7d.filter((query) => query.currentResolution !== null);

  lines.push("", "### Fuzzy queries til manuell vurdering", "");
  if (unresolvedFuzzy.length === 0) {
    lines.push(
      report.matching.topFuzzyQueries7d.length === 0
        ? "Ingen fuzzy-treff de siste 7 dagene."
        : "Ingen uløste fuzzy-signaler etter replay mot dagens søkbare indeks.",
    );
  } else {
    lines.push(
      "| Query | City | Searches 7d | Fuzzy impressions 7d | Avg score | Best score |",
      "|---|---|---:|---:|---:|---:|",
    );
    for (const query of unresolvedFuzzy) {
      lines.push(
        `| ${escapeCell(query.normalizedQuery)} | ${escapeCell(query.city)} | ${query.searches7d} | ${query.impressions7d} | ${score(query.averageScore)} | ${score(query.bestScore)} |`,
      );
    }
  }
  lines.push(
    "",
    "> Fuzzy-listen er et review-signal. Den oppretter aldri aliaser automatisk. Replay bruker bare dagens sikre exact/canonical/prefix/contains-treff i samme by.",
  );

  if (resolvedFuzzy.length > 0) {
    lines.push(
      "",
      "### Historiske fuzzy-signaler løst av dagens indeks",
      "",
      "| Query | City | Historical searches 7d | Fuzzy impressions 7d | Current resolution |",
      "|---|---|---:|---:|---|",
    );
    for (const query of resolvedFuzzy) {
      const resolution = query.currentResolution;
      if (!resolution) continue;
      lines.push(
        `| ${escapeCell(query.normalizedQuery)} | ${escapeCell(query.city)} | ${query.searches7d} | ${query.impressions7d} | ✅ ${resolutionLabel[resolution]} |`,
      );
    }
    lines.push(
      "",
      "> Disse radene hadde fuzzy impressions tidligere i 7-dagersvinduet, men trenger ikke alias-review så lenge dagens ferske indeks gir et sikkert treff.",
    );
  }

  const unresolvedZeroResults = report.topZeroResultQueries7d.filter((query) => query.currentResolution === null);
  const resolvedZeroResults = report.topZeroResultQueries7d.filter((query) => query.currentResolution !== null);

  lines.push("", "## Nulltreff som fortsatt peker på coverage", "");
  if (unresolvedZeroResults.length === 0) {
    lines.push(
      report.topZeroResultQueries7d.length === 0
        ? "Ingen nulltreff de siste 7 dagene."
        : "Ingen uløste nulltreff etter replay mot dagens søkbare indeks.",
    );
  } else {
    lines.push("| Query | City | Nulltreff 7d | Sist sett |", "|---|---|---:|---|");
    for (const query of unresolvedZeroResults) {
      lines.push(
        `| ${escapeCell(query.normalizedQuery)} | ${escapeCell(query.city)} | ${query.count7d} | ${shortTime(query.lastSeenAt)} |`,
      );
    }
  }
  lines.push(
    "",
    "> Coverage-listen replayes mot dagens ferske indeks i samme by. Bare exact/canonical/prefix/contains kan markere et historisk nulltreff som løst; fuzzy alene teller fortsatt som uløst.",
  );

  if (resolvedZeroResults.length > 0) {
    lines.push(
      "",
      "### Historiske nulltreff løst av dagens indeks",
      "",
      "| Query | City | Historical null results 7d | Sist sett | Current resolution |",
      "|---|---|---:|---|---|",
    );
    for (const query of resolvedZeroResults) {
      const resolution = query.currentResolution;
      if (!resolution) continue;
      lines.push(
        `| ${escapeCell(query.normalizedQuery)} | ${escapeCell(query.city)} | ${query.count7d} | ${shortTime(query.lastSeenAt)} | ✅ ${resolutionLabel[resolution]} |`,
      );
    }
    lines.push(
      "",
      "> Historiske nulltreff beholdes som etterspørselsdata, men brukes ikke lenger som coverage-prioritet når dagens indeks allerede gir et sikkert treff.",
    );
  }

  lines.push(
    "",
    "> Denne rapporten ligger i det private GitHub-repoet. Den inneholder aggregert produktetterspørsel, men ingen IP-adresser, user-agent, konto-ID eller permanente brukerprofiler.",
    "",
  );
  return lines.join("\n");
}
