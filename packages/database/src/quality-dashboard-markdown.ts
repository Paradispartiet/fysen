import type {
  QualityActionReport,
  QualityDashboardReport,
  QualityHealth,
  QualityRestaurantReport,
} from "./quality-dashboard.js";

const healthLabel: Readonly<Record<QualityHealth, string>> = {
  healthy: "✅ healthy",
  degraded: "⚠️ degraded",
  stale: "🕒 stale",
  unverified: "❔ unverified",
  disabled: "⏸️ disabled",
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
    `- Zero-result searches, 7d: **${report.totals.zeroResultSearches7d}**`,
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
      `| ${restaurant.name} | ${restaurant.active ? "✅ published" : "🧪 candidate"} | ${restaurantMenuSummary(restaurant)} | ${shortTime(latestMenuCheck)} | ${healthLabel[restaurant.hours.health]} · ${restaurant.hours.intervalCount} intervals${restaurant.hours.lastErrorCode ? ` · ${restaurant.hours.lastErrorCode}` : ""} | ${restaurantActions(restaurant)} | ${restaurant.impressions7d} | ${restaurant.conversions7d} |`,
    );
  }

  lines.push("", "## Nulltreff som peker på coverage", "");
  if (report.topZeroResultQueries7d.length === 0) {
    lines.push("Ingen nulltreff de siste 7 dagene.");
  } else {
    lines.push("| Query | Nulltreff 7d | Sist sett |", "|---|---:|---|");
    for (const query of report.topZeroResultQueries7d) {
      lines.push(`| ${query.normalizedQuery.replaceAll("|", "\\|")} | ${query.count7d} | ${shortTime(query.lastSeenAt)} |`);
    }
  }

  lines.push(
    "",
    "> Denne rapporten ligger i det private GitHub-repoet. Den inneholder aggregert produktetterspørsel, men ingen IP-adresser, user-agent, konto-ID eller permanente brukerprofiler.",
    "",
  );
  return lines.join("\n");
}
