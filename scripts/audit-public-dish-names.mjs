import { mkdir, writeFile } from "node:fs/promises";

const apiBaseUrl = (process.env.FYSEN_PUBLIC_API_URL?.trim() || "https://fysen-api.vercel.app").replace(/\/$/, "");
const browseUrl = `${apiBaseUrl}/v1/dishes/browse?city=Oslo`;
const reportDirectory = process.env.FYSEN_AUDIT_REPORT_DIR?.trim() || "reports/oslo-public-dish-names";

// These are review hints, not publication filters. A match never removes a dish.
export function reviewReasons(name) {
  const value = name.normalize("NFKC").trim();
  const reasons = [];
  if (/\b(?:wine|beer)\s+(?:package|pairing)\b|\b(?:vinpakke|olpakke|drikkepakke|drikkemeny)\b/iu.test(value)
    || /^(?:lettmelk|helmelk|fanta|sprite|coca[ -]?cola|pepsi|heineken|aperol spritz)\b/iu.test(value)) {
    reasons.push("possible_beverage");
  }
  if (/\b(?:kr|nok)\s*\d{2,5}\b|\b\d{2,5}\s*(?:kr|nok)\b|\b\d{2,5}[,.]-(?:\s|$)/iu.test(value)) {
    reasons.push("price_fragment");
  }
  if (/[,:;\-–—/]\s*$/u.test(value) || /^[,:;\-–—/]/u.test(value)) {
    reasons.push("dangling_punctuation");
  }
  if (/^(?:forretter|hovedretter|desserter|meny|menu|drikkevarer|tilbehor|ekstra)\s*$/iu.test(value)
    || /^(?:\d+[,.]?\d*\s*(?:cl|ml|l)|\d{2,4})\s*$/iu.test(value)) {
    reasons.push("possible_heading_or_fragment");
  }
  if (value.length > 120) reasons.push("long_name");
  return reasons;
}

export function auditBrowse(browse) {
  if (browse?.city !== "Oslo" || !Array.isArray(browse.dishes)
    || browse.count !== browse.dishes.length || browse.quality?.filterVersion !== "consumer-v1") {
    throw new Error("The public Oslo browse payload is incomplete or has an unexpected quality contract");
  }
  const candidates = browse.dishes.flatMap((dish) => {
    if (typeof dish?.name !== "string" || typeof dish?.id !== "string") {
      throw new Error("The public Oslo browse payload contains an invalid dish");
    }
    const reasons = reviewReasons(dish.name);
    return reasons.length ? [{ id: dish.id, name: dish.name, reasons, restaurantCount: dish.restaurantCount,
      restaurantExamples: dish.restaurantExamples }] : [];
  });
  const reasonCounts = Object.fromEntries(
    [...new Set(candidates.flatMap((candidate) => candidate.reasons))].sort().map((reason) =>
      [reason, candidates.filter((candidate) => candidate.reasons.includes(reason)).length]),
  );
  return {
    generatedAt: new Date().toISOString(),
    source: browseUrl,
    city: browse.city,
    count: browse.count,
    quality: browse.quality,
    reasonCounts,
    candidates,
    // Keep the complete public list so review can find patterns that the heuristics missed.
    dishes: browse.dishes,
  };
}

function markdown(report) {
  const lines = [
    "# Oslo public dish-name review",
    "",
    `Generated: ${report.generatedAt}`,
    `Source: ${report.source}`,
    `Visible names: ${report.count}; review candidates: ${report.candidates.length}`,
    "",
    "Candidates are hints for manual source review. No dish was changed or hidden by this audit.",
    "",
    "| Reason | Count |",
    "|---|---:|",
    ...Object.entries(report.reasonCounts).map(([reason, count]) => `| ${reason} | ${count} |`),
  ];
  for (const reason of Object.keys(report.reasonCounts)) {
    lines.push("", `## ${reason}`, "");
    const candidates = report.candidates.filter((candidate) => candidate.reasons.includes(reason));
    for (const candidate of candidates.slice(0, 120)) {
      const restaurant = candidate.restaurantExamples?.[0]?.name ?? "unknown restaurant";
      lines.push(`- ${candidate.name.replaceAll("\n", " ")} — ${restaurant} (${candidate.id})`);
    }
    if (candidates.length > 120) lines.push(`- … ${candidates.length - 120} more in the JSON artifact`);
  }
  return `${lines.join("\n")}\n`;
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const response = await fetch(browseUrl, {
    headers: { accept: "application/json", "user-agent": "FysenPublicDishNameAudit/1.0" },
    signal: AbortSignal.timeout(60_000),
  });
  if (!response.ok) throw new Error(`Public Oslo browse returned HTTP ${response.status}`);
  const report = auditBrowse(await response.json());
  await mkdir(reportDirectory, { recursive: true });
  await Promise.all([
    writeFile(`${reportDirectory}/audit.json`, `${JSON.stringify(report, null, 2)}\n`),
    writeFile(`${reportDirectory}/audit.md`, markdown(report)),
  ]);
  process.stdout.write(`${JSON.stringify({ count: report.count, candidates: report.candidates.length,
    reasonCounts: report.reasonCounts, reportDirectory })}\n`);
}
