import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createDatabasePool } from "./client.js";
import { buildDemandLoop } from "./demand-loop.js";
import { renderDemandLoopMarkdown } from "./demand-loop-markdown.js";

function outputDirectoryArgument(argv: readonly string[]): string {
  return argv.find((value) => value !== "--" && !value.startsWith("-")) ?? "reports";
}

async function main(): Promise<void> {
  const outputDirectory = resolve(outputDirectoryArgument(process.argv.slice(2)));
  await mkdir(outputDirectory, { recursive: true });

  const pool = createDatabasePool({ maxConnections: 2 });
  try {
    const report = await buildDemandLoop(pool);
    await Promise.all([
      writeFile(resolve(outputDirectory, "demand-loop.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8"),
      writeFile(resolve(outputDirectory, "demand-loop.md"), renderDemandLoopMarkdown(report), "utf8"),
    ]);
    process.stdout.write(
      `${JSON.stringify({
        status: "written",
        outputDirectory,
        explicitSignalSearches7d: report.totals.explicitSignalSearches7d,
        unresolvedSignalSearches7d: report.totals.unresolvedSignalSearches7d,
        queueSize: report.totals.queueSize,
        legacyUnclassifiedSignalSearches7d: report.totals.legacyUnclassifiedSignalSearches7d,
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
