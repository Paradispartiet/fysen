import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { gzipSync, gunzipSync } from "node:zlib";
import { assessExtraction } from "@fysen/menu-core";
import { evaluateManifestMenuQuality } from "./manifest-quality.js";
import { canonicalizeUniqueMenuSourceKeys } from "./menu-source-key-canonicalizer.js";
import { readRestaurantOnboardingManifest, type RestaurantOnboardingManifest } from "./onboarding-manifest.js";
import { extractMenuSource, fetchMenuSource } from "./menu-source-runtime.js";
import { replaceOneSource, type FreeIndex, type FreeManifest } from "./free-static-refresh-core.js";

async function main(): Promise<void> {
  const [archiveDir, catalogDir, countArg] = process.argv.slice(2);
  if (!archiveDir || !catalogDir) {
    throw new Error("Usage: node free-static-refresh.js <public-index-dir> <catalog-dir> [max-attempts]");
  }
  const maxAttempts = Number(countArg ?? "12");
  if (!Number.isInteger(maxAttempts) || maxAttempts < 1 || maxAttempts > 24) {
    throw new Error("Refusing unbounded source refresh: maximum 24 per invocation");
  }
  const indexPath = join(archiveDir, "index.json.gz");
  const manifestPath = join(archiveDir, "manifest.json");
  const [compressed, manifestRaw] = await Promise.all([
    readFile(indexPath), readFile(manifestPath, "utf8"),
  ]);
  const manifest = JSON.parse(manifestRaw) as FreeManifest;
  if (createHash("sha256").update(compressed).digest("hex") !== manifest.sha256) {
    throw new Error("Existing public index failed SHA-256 checksum");
  }
  const index = JSON.parse(gunzipSync(compressed).toString("utf8")) as FreeIndex;
  if (index.version !== 1 || manifest.version !== 1 || index.archiveDate !== manifest.archiveDate ||
    index.restaurants.length !== manifest.restaurants || index.sources.length !== manifest.sources ||
    index.items.length !== manifest.dishes) {
    throw new Error("Existing public index and manifest disagree; refusing refresh");
  }
  const counts = index.items.reduce((acc, row) => {
    if (!Number.isInteger(row[0]) || row[0] < 0 || row[0] >= index.sources.length) {
      throw new Error("Corrupted source reference in published index");
    }
    acc[row[0]] = (acc[row[0]] ?? 0) + 1;
    return acc;
  }, {} as Record<number, number>);
  const catalogFiles = (await readdir(catalogDir)).filter((name) => name.endsWith(".json"));
  const matching = new Map<number, RestaurantOnboardingManifest>();
  const sourceBySlugAndUrl = new Map(index.sources.map((src, i) => {
    const r = index.restaurants[src[0]];
    if (!r) throw new Error("Corrupted restaurant reference in published index");
    return [JSON.stringify([r[1], src[1]]), i] as const;
  }));
  for (const file of catalogFiles) {
    let entry: RestaurantOnboardingManifest;
    try {
      entry = await readRestaurantOnboardingManifest(join(catalogDir, file));
    } catch {
      // Historical catalog manifests may not belong to the public snapshot.
      continue;
    }
    const sourceIndex = sourceBySlugAndUrl.get(JSON.stringify([
      entry.restaurant.slug, entry.menuSource.url,
    ]));
    if (sourceIndex === undefined || entry.menuSource.fetchMode !== "http") continue;
    matching.set(sourceIndex, entry);
  }
  if (!matching.size) throw new Error("No public sources matched existing catalog manifests");
  const attempts = { ...(manifest.sourceAttempts ?? {}) };
  const sorted = [...matching.entries()].sort(([i], [j]) => {
    const ageI = Date.parse(attempts[String(i)] ?? index.sources[i]![2]) || 0;
    const ageJ = Date.parse(attempts[String(j)] ?? index.sources[j]![2]) || 0;
    return ageI - ageJ || i - j;
  }).slice(0, maxAttempts);
  let nextIndex = index;
  const refreshed = new Set(manifest.refreshedSourceIndices ?? []);
  let accepted = 0;
  let rejected = 0;
  for (const [sourceIndex, restaurant] of sorted) {
    attempts[String(sourceIndex)] = new Date().toISOString();
    try {
      const fetched = await fetchMenuSource({
        url: restaurant.menuSource.url,
        sourceType: restaurant.menuSource.sourceType,
        fetchMode: restaurant.menuSource.fetchMode,
        userAgent: restaurant.menuSource.userAgent,
        etag: null, lastModified: null,
        maxResponseBytes: restaurant.menuSource.maxResponseBytes ?? null,
        sourceSupport: restaurant.menuSource.sourceSupport,
      });
      if (fetched.kind !== "content") {
        throw new Error("Source returned no content; old menu retained");
      }
      const extracted = await extractMenuSource(restaurant.menuSource.sourceType, fetched);
      const observations = canonicalizeUniqueMenuSourceKeys(extracted.items);
      // Source-backed prices are allowed to change. Do not require historical prices
      // to remain identical, but preserve mandatory names/variants, food filters,
      // source-specific item floor, and the original suspicious-drop safeguard.
      const unchangedPriceAssertions = {
        ...restaurant,
        qualityAssertions: {
          ...restaurant.qualityAssertions,
          requiredDishVariants: restaurant.qualityAssertions.requiredDishVariants.map(
            (variant) => ({
              name: variant.name,
              ...(variant.sectionName ? { sectionName: variant.sectionName } : {}),
            }),
          ),
        },
      };
      const quality = evaluateManifestMenuQuality(unchangedPriceAssertions, observations);
      const assessment = assessExtraction(
        counts[sourceIndex] ?? 0, observations.length,
        restaurant.menuSource.minimumExpectedItems,
      );
      if (!quality.accepted || !assessment.accepted) {
        throw new Error(
          "Quality check rejected updated menu: " +
          (quality.missingRequiredDishes.length ? "mandatory dishes missing" : "") +
          (quality.forbiddenDishesPresent.length ? " forbidden metadata" : "") +
          (!assessment.accepted ? " " + assessment.code : ""),
        );
      }
      nextIndex = replaceOneSource(nextIndex, sourceIndex, fetched.fetchedAt, observations);
      refreshed.add(sourceIndex);
      accepted++;
      console.log("approved", restaurant.restaurant.slug, "items", observations.length);
    } catch (error) {
      rejected++;
      console.log("preserved-old", restaurant.restaurant.slug,
        error instanceof Error ? error.message.slice(0, 230) : "unknown failure");
    }
  }
  // Even when all external providers fail, remember attempted times so a failing
  // oldest source does not starve all other restaurants on every scheduled run.
  if (accepted > 0) {
    const output = gzipSync(Buffer.from(JSON.stringify(nextIndex), "utf8"), { level: 9 });
    await writeFile(indexPath, output);
    manifest.bytes = output.byteLength;
    manifest.sha256 = createHash("sha256").update(output).digest("hex");
    manifest.dishes = nextIndex.items.length;
    manifest.lastRefreshAt = new Date().toISOString();
  }
  manifest.refreshedSourceIndices = [...refreshed].sort((a, b) => a - b);
  manifest.sourceAttempts = attempts;
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  console.log(JSON.stringify({
    attempted: sorted.length,
    accepted, preservedPrevious: rejected,
    publicRestaurants: nextIndex.restaurants.length,
    publicSources: nextIndex.sources.length,
    publishedDishes: nextIndex.items.length,
    cumulativeRefreshedSources: refreshed.size,
    baseArchiveDate: manifest.archiveDate,
  }));
}
void main().catch((e: unknown) => {
  console.error("Fysen Free incremental refresh failed:", e instanceof Error ? e.message : String(e));
  process.exitCode = 1;
});
