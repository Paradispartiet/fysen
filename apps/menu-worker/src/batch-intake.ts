import { writeFile, readFile } from "node:fs/promises";
import { isAbsolute, resolve, sep } from "node:path";
import { type MenuObservedItem } from "@fysen/menu-core";
import { z } from "zod";
import { HttpMenuClient } from "./http-client.js";
import {
  restaurantOnboardingManifestSchema,
  type RestaurantOnboardingManifest,
} from "./onboarding-manifest.js";
import { extractMenuSource, fetchMenuSource } from "./menu-source-runtime.js";

const manifestShape = restaurantOnboardingManifestSchema.shape;
const batchMenuSourceSchema = manifestShape.menuSource.omit({
  minimumExpectedItems: true,
});
const batchIntakeEntrySchema = z.object({
  version: z.literal(1),
  restaurant: manifestShape.restaurant,
  menuSource: batchMenuSourceSchema,
  hoursSource: manifestShape.hoursSource,
  verification: manifestShape.verification,
  actions: manifestShape.actions,
  assertionCount: z.number().int().min(3).max(20).default(8),
  forbiddenDishNames: z
    .array(z.string().trim().min(2).max(300))
    .max(20)
    .default([]),
});

const batchIntakePlanSchema = z
  .object({
    version: z.literal(1),
    outputDirectory: z.string().trim().min(1).max(200).default("candidates"),
    concurrency: z.number().int().min(1).max(8).default(4),
    restaurants: z.array(batchIntakeEntrySchema).min(1).max(100),
  })
  .superRefine((plan, context) => {
    const slugs = plan.restaurants.map((entry) => entry.restaurant.slug);
    if (new Set(slugs).size !== slugs.length) {
      context.addIssue({
        code: "custom",
        path: ["restaurants"],
        message: "Restaurant slugs must be unique in a batch",
      });
    }
    if (
      isAbsolute(plan.outputDirectory) ||
      plan.outputDirectory.split(/[\\/]/u).includes("..")
    ) {
      context.addIssue({
        code: "custom",
        path: ["outputDirectory"],
        message: "Output directory must stay inside apps/menu-worker",
      });
    }
  });

export type RestaurantBatchIntakeEntry = z.infer<typeof batchIntakeEntrySchema>;

export interface RestaurantBatchIntakeResult {
  readonly slug: string;
  readonly outcome: "generated" | "failed";
  readonly path: string | null;
  readonly observedItemCount: number | null;
  readonly assertionCount: number | null;
  readonly extractionMethod: string | null;
  readonly extractorVersion: string | null;
  readonly error: string | null;
}

export interface RestaurantBatchIntakeSummary {
  readonly requestedCount: number;
  readonly generatedCount: number;
  readonly failedCount: number;
  readonly concurrency: number;
  readonly outputDirectory: string;
  readonly results: readonly RestaurantBatchIntakeResult[];
}

function evenlySpacedItems(
  items: readonly MenuObservedItem[],
  requestedCount: number,
): readonly MenuObservedItem[] {
  const unique = new Map<string, MenuObservedItem>();
  for (const item of items) {
    if (item.priceMinor === null || unique.has(item.normalizedName)) continue;
    unique.set(item.normalizedName, item);
  }
  const eligible = [...unique.values()].sort(
    (left, right) => left.position - right.position,
  );
  if (eligible.length < 3) {
    throw new Error(
      `Live source exposed only ${eligible.length} unique priced dishes; at least 3 are required`,
    );
  }
  const count = Math.min(requestedCount, eligible.length);
  if (count === eligible.length) return eligible;

  const selected: MenuObservedItem[] = [];
  for (let index = 0; index < count; index += 1) {
    const position = Math.round((index * (eligible.length - 1)) / (count - 1));
    const item = eligible[position];
    if (item) selected.push(item);
  }
  return selected;
}

export function buildGeneratedRestaurantManifest(
  entry: RestaurantBatchIntakeEntry,
  items: readonly MenuObservedItem[],
): RestaurantOnboardingManifest {
  if (items.length === 0)
    throw new Error("Live source exposed no canonical menu items");
  const assertions = evenlySpacedItems(items, entry.assertionCount);
  const manifest = restaurantOnboardingManifestSchema.parse({
    version: 1,
    restaurant: entry.restaurant,
    menuSource: {
      ...entry.menuSource,
      minimumExpectedItems: items.length,
    },
    hoursSource: entry.hoursSource,
    verification: entry.verification,
    actions: entry.actions,
    qualityAssertions: {
      requiredDishNames: assertions.map((item) => item.name),
      requiredDishVariants: assertions.map((item) => ({
        name: item.name,
        priceMinor: item.priceMinor ?? undefined,
        ...((item.priceKind ?? "exact") !== "exact"
          ? { priceKind: item.priceKind }
          : {}),
        ...(item.priceMaxMinor !== null && item.priceMaxMinor !== undefined
          ? { priceMaxMinor: item.priceMaxMinor }
          : {}),
      })),
      forbiddenDishNames: entry.forbiddenDishNames,
    },
  });
  return manifest;
}

async function mapConcurrent<T, R>(
  values: readonly T[],
  concurrency: number,
  worker: (value: T, index: number) => Promise<R>,
): Promise<readonly R[]> {
  const results = new Array<R>(values.length);
  let nextIndex = 0;
  async function runWorker(): Promise<void> {
    while (nextIndex < values.length) {
      const index = nextIndex;
      nextIndex += 1;
      const value = values[index];
      if (value !== undefined) results[index] = await worker(value, index);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(concurrency, values.length) }, () =>
      runWorker(),
    ),
  );
  return results;
}

function safeOutputDirectory(relativeDirectory: string): string {
  const workerRoot = resolve(process.cwd());
  const outputDirectory = resolve(workerRoot, relativeDirectory);
  if (
    outputDirectory !== workerRoot &&
    !outputDirectory.startsWith(`${workerRoot}${sep}`)
  ) {
    throw new Error("Output directory must stay inside apps/menu-worker");
  }
  return outputDirectory;
}

export async function generateRestaurantCandidateBatch(
  path: string,
): Promise<RestaurantBatchIntakeSummary> {
  const plan = batchIntakePlanSchema.parse(
    JSON.parse(await readFile(path, "utf8")) as unknown,
  );
  const outputDirectory = safeOutputDirectory(plan.outputDirectory);
  const results = await mapConcurrent(
    plan.restaurants,
    plan.concurrency,
    async (entry) => {
      let observedItemCount: number | null = null;
      let extractionMethod: string | null = null;
      let extractorVersion: string | null = null;
      try {
        const client = new HttpMenuClient();
        const fetched = await fetchMenuSource(
          {
            ...entry.menuSource,
            etag: null,
            lastModified: null,
          },
          client,
        );
        if (fetched.kind === "not_modified") {
          throw new Error(
            "Batch intake unexpectedly received HTTP 304 without cache validators",
          );
        }
        const extracted = await extractMenuSource(
          entry.menuSource.sourceType,
          fetched,
        );
        observedItemCount = extracted.items.length;
        extractionMethod = extracted.method;
        extractorVersion = extracted.extractorVersion;
        const manifest = buildGeneratedRestaurantManifest(
          entry,
          extracted.items,
        );
        const outputPath = resolve(
          outputDirectory,
          `${entry.restaurant.slug}.json`,
        );
        await writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, {
          flag: "wx",
        });
        return {
          slug: entry.restaurant.slug,
          outcome: "generated",
          path: outputPath,
          observedItemCount,
          assertionCount: manifest.qualityAssertions.requiredDishNames.length,
          extractionMethod,
          extractorVersion,
          error: null,
        } satisfies RestaurantBatchIntakeResult;
      } catch (error) {
        return {
          slug: entry.restaurant.slug,
          outcome: "failed",
          path: null,
          observedItemCount,
          assertionCount: null,
          extractionMethod,
          extractorVersion,
          error: error instanceof Error ? error.message : String(error),
        } satisfies RestaurantBatchIntakeResult;
      }
    },
  );

  return {
    requestedCount: results.length,
    generatedCount: results.filter((result) => result.outcome === "generated")
      .length,
    failedCount: results.filter((result) => result.outcome === "failed").length,
    concurrency: plan.concurrency,
    outputDirectory,
    results,
  };
}
