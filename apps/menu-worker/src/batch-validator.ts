import { readdir } from "node:fs/promises";
import { resolve } from "node:path";
import {
  validateRestaurantManifestPath,
  type RestaurantManifestValidationResult,
} from "./manifest-validator.js";

export type RestaurantValidationFailureFamily =
  | "manifest"
  | "transport"
  | "extraction"
  | "menu_assertions"
  | "hours"
  | "action"
  | "unknown";

export interface RestaurantBatchValidationResult {
  readonly path: string;
  readonly slug: string | null;
  readonly accepted: boolean;
  readonly failureFamilies: readonly RestaurantValidationFailureFamily[];
  readonly validation: RestaurantManifestValidationResult | null;
  readonly error: string | null;
}

export interface RestaurantBatchValidationSummary {
  readonly manifestCount: number;
  readonly acceptedCount: number;
  readonly failedCount: number;
  readonly concurrency: number;
  readonly maxAttempts: number;
  readonly failureFamilyCounts: Readonly<
    Record<RestaurantValidationFailureFamily, number>
  >;
  readonly results: readonly RestaurantBatchValidationResult[];
}

interface RestaurantBatchValidationOptions {
  readonly concurrency?: number;
  readonly maxAttempts?: number;
  readonly validatePath?: (
    path: string,
  ) => Promise<RestaurantManifestValidationResult>;
  readonly retryDelayMs?: number;
}

const TRANSPORT_FAILURE =
  /(?:http\s+(?:4\d\d|5\d\d)|fetch|network|socket|timeout|timed out|aborted due to timeout|econn|enotfound|dns|tls|certificate|redirect)/iu;
const EXTRACTION_FAILURE =
  /(?:extract|no menu|empty menu|source declared|unsupported source)/iu;
const RETRYABLE_UNKNOWN_FAILURE =
  /(?:pdf source did not start with a pdf signature|unexpectedly returned http 304|temporary|temporarily unavailable|connection reset|aborted due to timeout)/iu;
const MAX_VALIDATION_ATTEMPTS = 3;
const DEFAULT_RETRY_DELAY_MS = 1_000;

function boundedConcurrency(value: number | undefined): number {
  if (value === undefined) return 4;
  if (!Number.isInteger(value) || value < 1 || value > 12) {
    throw new Error(
      "Batch validation concurrency must be an integer between 1 and 12",
    );
  }
  return value;
}

function boundedMaxAttempts(value: number | undefined): number {
  if (value === undefined) return MAX_VALIDATION_ATTEMPTS;
  if (!Number.isInteger(value) || value < 1 || value > MAX_VALIDATION_ATTEMPTS) {
    throw new Error(
      `Batch validation max attempts must be an integer between 1 and ${MAX_VALIDATION_ATTEMPTS}`,
    );
  }
  return value;
}

function boundedRetryDelayMs(value: number | undefined): number {
  if (value === undefined) return DEFAULT_RETRY_DELAY_MS;
  if (!Number.isInteger(value) || value < 0 || value > 10_000) {
    throw new Error(
      "Batch validation retry delay must be an integer between 0 and 10000 milliseconds",
    );
  }
  return value;
}

function emptyFailureFamilyCounts(): Record<
  RestaurantValidationFailureFamily,
  number
> {
  return {
    manifest: 0,
    transport: 0,
    extraction: 0,
    menu_assertions: 0,
    hours: 0,
    action: 0,
    unknown: 0,
  };
}

export function classifyRestaurantValidationFailure(
  validation: RestaurantManifestValidationResult,
): readonly RestaurantValidationFailureFamily[] {
  if (validation.accepted) return [];

  const families = new Set<RestaurantValidationFailureFamily>();
  const menuError = validation.menu.error ?? "";
  if (!validation.menu.accepted) {
    if (validation.menu.quality !== null) families.add("menu_assertions");
    else if (TRANSPORT_FAILURE.test(menuError)) families.add("transport");
    else if (EXTRACTION_FAILURE.test(menuError)) families.add("extraction");
    else families.add("unknown");
  }
  if (validation.hours?.blocking && !validation.hours.accepted) {
    families.add(
      TRANSPORT_FAILURE.test(validation.hours.error ?? "")
        ? "transport"
        : "hours",
    );
  }
  if (validation.actions.some((action) => !action.accepted)) {
    families.add("action");
  }
  if (families.size === 0) families.add("unknown");
  return [...families];
}

export function isRetryableRestaurantValidationFailure(
  validation: RestaurantManifestValidationResult,
): boolean {
  if (validation.accepted) return false;
  const families = classifyRestaurantValidationFailure(validation);

  // Never retry deterministic content/quality failures merely to make a gate green.
  if (
    families.includes("menu_assertions") ||
    families.includes("hours") ||
    families.includes("extraction")
  ) {
    return false;
  }

  if (families.includes("transport") || families.includes("action")) {
    return true;
  }

  if (!families.includes("unknown")) return false;
  const errors = [
    validation.menu.error,
    validation.hours?.blocking ? validation.hours.error : null,
    ...validation.actions.map((action) => action.error),
  ]
    .filter((value): value is string => Boolean(value))
    .join(" | ");
  return RETRYABLE_UNKNOWN_FAILURE.test(errors);
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

async function validatePathWithTransientRetry(
  path: string,
  validatePath: (
    path: string,
  ) => Promise<RestaurantManifestValidationResult>,
  retryDelayMs: number,
  maxAttempts: number,
): Promise<RestaurantManifestValidationResult> {
  let validation = await validatePath(path);
  for (
    let attempt = 2;
    attempt <= maxAttempts &&
    isRetryableRestaurantValidationFailure(validation);
    attempt += 1
  ) {
    if (retryDelayMs > 0) {
      await new Promise((resolve) =>
        setTimeout(resolve, retryDelayMs * (attempt - 1)),
      );
    }
    validation = await validatePath(path);
  }
  return validation;
}

export async function validateRestaurantManifestBatch(
  directory: string,
  options: RestaurantBatchValidationOptions = {},
): Promise<RestaurantBatchValidationSummary> {
  const concurrency = boundedConcurrency(options.concurrency);
  const maxAttempts = boundedMaxAttempts(options.maxAttempts);
  const retryDelayMs = boundedRetryDelayMs(options.retryDelayMs);
  const validatePath = options.validatePath ?? validateRestaurantManifestPath;
  const fileNames = (await readdir(directory))
    .filter((fileName) => fileName.endsWith(".json"))
    .sort();
  const paths = fileNames.map((fileName) => resolve(directory, fileName));
  const results = await mapConcurrent(paths, concurrency, async (path) => {
    try {
      const validation = await validatePathWithTransientRetry(
        path,
        validatePath,
        retryDelayMs,
        maxAttempts,
      );
      return {
        path,
        slug: validation.slug,
        accepted: validation.accepted,
        failureFamilies: classifyRestaurantValidationFailure(validation),
        validation,
        error: null,
      } satisfies RestaurantBatchValidationResult;
    } catch (error) {
      return {
        path,
        slug: null,
        accepted: false,
        failureFamilies: ["manifest"],
        validation: null,
        error: error instanceof Error ? error.message : String(error),
      } satisfies RestaurantBatchValidationResult;
    }
  });

  const failureFamilyCounts = emptyFailureFamilyCounts();
  for (const result of results) {
    for (const family of result.failureFamilies)
      failureFamilyCounts[family] += 1;
  }

  return {
    manifestCount: results.length,
    acceptedCount: results.filter((result) => result.accepted).length,
    failedCount: results.filter((result) => !result.accepted).length,
    concurrency,
    maxAttempts,
    failureFamilyCounts,
    results,
  };
}
