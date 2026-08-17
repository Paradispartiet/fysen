import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createDatabasePool } from "./client.js";
import { buildQualityDashboard } from "./quality-dashboard.js";
import { renderQualityDashboardMarkdown } from "./quality-dashboard-markdown.js";

async function main(): Promise<void> {
  const outputDirectory = resolve(process.argv[2] ?? "reports");
  await mkdir(outputDirectory, { recursive: true });

  const pool = createDatabasePool({ maxConnections: 2 });
  try {
    const report = await buildQualityDashboard(pool);
    await Promise.all([
      writeFile(resolve(outputDirectory, "quality-dashboard.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8"),
      writeFile(resolve(outputDirectory, "quality-dashboard.md"), renderQualityDashboardMarkdown(report), "utf8"),
    ]);
    process.stdout.write(
      `${JSON.stringify({
        status: "written",
        outputDirectory,
        activeRestaurants: report.totals.activeRestaurants,
        currentMenuItems: report.totals.currentMenuItems,
        degradedMenuSources: report.totals.degradedMenuSources,
        zeroResultSearches7d: report.totals.zeroResultSearches7d,
      })}\n`,
    );
  } finally {
    await pool.end();
  }
}

void main().catch((error: unknown) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
