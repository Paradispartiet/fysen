import { createMenuFingerprint } from "@fysen/menu-core";
import { verifyActionSource } from "./action-source-runtime.js";
import { HttpMenuClient } from "./http-client.js";
import {
  evaluateManifestMenuQuality,
  type ManifestMenuQualityResult,
} from "./manifest-quality.js";
import { canonicalizeUniqueMenuSourceKeys } from "./menu-source-key-canonicalizer.js";
import {
  getHoursVerificationStatus,
  isHoursVerificationBlocking,
  listRestaurantOnboardingManifests,
  readRestaurantOnboardingManifest,
  type HoursVerificationStatus,
  type RestaurantOnboardingManifest,
} from "./onboarding-manifest.js";
import { resolveOpeningHoursSource } from "./opening-hours-source-runtime.js";
import { extractMenuSource, fetchMenuSource } from "./menu-source-runtime.js";

export interface ManifestObservedDishVariant {
  readonly name: string;
  readonly priceMinor: number | null;
}

export interface ManifestMenuValidationResult {
  readonly accepted: boolean;
  readonly url: string;
  readonly httpStatus: number | null;
  readonly method: string | null;
  readonly extractorVersion: string | null;
  readonly fingerprint: string | null;
  readonly quality: ManifestMenuQualityResult | null;
  readonly observedDishNames: readonly string[];
  readonly observedDishVariants: readonly ManifestObservedDishVariant[];
  readonly error: string | null;
}

export interface ManifestHoursValidationResult {
  readonly accepted: boolean;
  readonly blocking: boolean;
  readonly verificationStatus: HoursVerificationStatus;
  readonly url: string;
  readonly httpStatus: number | null;
  readonly intervalCount: number | null;
  readonly minimumExpectedIntervals: number;
  readonly extractorVersion: string | null;
  readonly error: string | null;
}

export interface ManifestActionValidationResult {
  readonly type: RestaurantOnboardingManifest["actions"][number]["type"];
  readonly url: string;
  readonly accepted: boolean;
  readonly httpStatus: number | null;
  readonly error: string | null;
}

export interface RestaurantManifestValidationResult {
  readonly slug: string;
  readonly accepted: boolean;
  readonly menu: ManifestMenuValidationResult;
  readonly hours: ManifestHoursValidationResult | null;
  readonly actions: readonly ManifestActionValidationResult[];
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
}

export interface RestaurantManifestCatalogValidationSummary {
  readonly manifestCount: number;
  readonly acceptedCount: number;
  readonly failedCount: number;
  readonly results: readonly RestaurantManifestValidationResult[];
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

async function validateMenu(
  manifest: RestaurantOnboardingManifest,
  client: HttpMenuClient,
): Promise<ManifestMenuValidationResult> {
  try {
    const fetched = await fetchMenuSource(
      {
        url: manifest.menuSource.url,
        sourceType: manifest.menuSource.sourceType,
        fetchMode: manifest.menuSource.fetchMode,
        userAgent: manifest.menuSource.userAgent,
        etag: null,
        lastModified: null,
        sourceSupport: manifest.menuSource.sourceSupport,
      },
      client,
    );
    if (fetched.kind === "not_modified") {
      throw new Error(`Manifest validation unexpectedly returned HTTP 304 for ${manifest.menuSource.url}`);
    }

    const extracted = await extractMenuSource(manifest.menuSource.sourceType, fetched);
    const canonicalItems = canonicalizeUniqueMenuSourceKeys(extracted.items);
    const fingerprint = createMenuFingerprint(canonicalItems);
    const quality = evaluateManifestMenuQuality(manifest, canonicalItems);
    return {
      accepted: quality.accepted,
      url: manifest.menuSource.url,
      httpStatus: fetched.status,
      method: extracted.method,
      extractorVersion: extracted.extractorVersion,
      fingerprint,
      quality,
      observedDishNames: canonicalItems.map((item) => item.name),
      observedDishVariants: canonicalItems.map((item) => ({
        name: item.name,
        priceMinor: item.priceMinor,
      })),
      error: quality.accepted
        ? null
        : `Menu assertions failed: items=${quality.itemCount}/${quality.minimumExpectedItems}, missing=${quality.missingRequiredDishes.join(",") || "none"}, forbidden=${quality.forbiddenDishesPresent.join(",") || "none"}`,
    };
  } catch (error) {
    return {
      accepted: false,
      url: manifest.menuSource.url,
      httpStatus: null,
      method: null,
      extractorVersion: null,
      fingerprint: null,
      quality: null,
      observedDishNames: [],
      observedDishVariants: [],
      error: errorMessage(error),
    };
  }
}

async function validateHours(
  manifest: RestaurantOnboardingManifest,
  client: HttpMenuClient,
): Promise<ManifestHoursValidationResult | null> {
  const hours = manifest.hoursSource;
  if (!hours) return null;
  const blocking = isHoursVerificationBlocking(manifest);
  const verificationStatus = getHoursVerificationStatus(manifest);

  try {
    const resolved = await resolveOpeningHoursSource(
      {
        url: hours.url,
        userAgent: manifest.menuSource.userAgent,
        etag: null,
        lastModified: null,
        scopeHints: hours.scopeHints,
        fallbackScopeHints: [
          hours.url,
          manifest.restaurant.slug,
          manifest.restaurant.name,
        ],
      },
      client,
    );
    if (resolved.kind === "not_modified") {
      throw new Error(`Manifest validation unexpectedly returned HTTP 304 for ${hours.url}`);
    }
    const intervalCount = resolved.extracted.intervals.length;
    const accepted = intervalCount >= hours.minimumExpectedIntervals;
    return {
      accepted,
      blocking,
      verificationStatus,
      url: hours.url,
      httpStatus: resolved.fetched.status,
      intervalCount,
      minimumExpectedIntervals: hours.minimumExpectedIntervals,
      extractorVersion: resolved.extractorVersion,
      error: accepted
        ? null
        : `Opening-hours assertions failed: intervals=${intervalCount}/${hours.minimumExpectedIntervals}`,
    };
  } catch (error) {
    return {
      accepted: false,
      blocking,
      verificationStatus,
      url: hours.url,
      httpStatus: null,
      intervalCount: null,
      minimumExpectedIntervals: hours.minimumExpectedIntervals,
      extractorVersion: null,
      error: errorMessage(error),
    };
  }
}

async function validateActions(
  manifest: RestaurantOnboardingManifest,
  client: HttpMenuClient,
): Promise<readonly ManifestActionValidationResult[]> {
  const results: ManifestActionValidationResult[] = [];
  for (const action of manifest.actions) {
    try {
      const verified = await verifyActionSource(
        { url: action.url, userAgent: manifest.menuSource.userAgent },
        client,
      );
      results.push({
        type: action.type,
        url: action.url,
        accepted: true,
        httpStatus: verified.httpStatus,
        error: null,
      });
    } catch (error) {
      results.push({
        type: action.type,
        url: action.url,
        accepted: false,
        httpStatus: null,
        error: errorMessage(error),
      });
    }
  }
  return results;
}

export async function validateRestaurantManifest(
  manifest: RestaurantOnboardingManifest,
): Promise<RestaurantManifestValidationResult> {
  const client = new HttpMenuClient();
  const menu = await validateMenu(manifest, client);
  const hours = await validateHours(manifest, client);
  const actions = await validateActions(manifest, client);
  const hoursBlocking = isHoursVerificationBlocking(manifest);
  const hoursAudit = manifest.verification.hours;

  const errors = [
    menu.error ? `menu: ${menu.error}` : null,
    hoursBlocking && hours?.error ? `hours: ${hours.error}` : null,
    ...actions.filter((action) => action.error).map((action) => `${action.type}: ${action.error}`),
  ].filter((value): value is string => value !== null);

  const warnings = [
    hoursAudit ? `hours ${hoursAudit.status}: ${hoursAudit.note} (checked ${hoursAudit.checkedAt})` : null,
    !hoursBlocking && hours?.error ? `hours source validation: ${hours.error}` : null,
  ].filter((value): value is string => value !== null);

  return {
    slug: manifest.restaurant.slug,
    accepted:
      menu.accepted &&
      (!hoursBlocking || (hours?.accepted ?? true)) &&
      actions.every((action) => action.accepted),
    menu,
    hours,
    actions,
    errors,
    warnings,
  };
}

export async function validateRestaurantManifestPath(
  path: string,
): Promise<RestaurantManifestValidationResult> {
  return validateRestaurantManifest(await readRestaurantOnboardingManifest(path));
}

export async function validateRestaurantManifestDirectory(
  directory: string,
): Promise<RestaurantManifestCatalogValidationSummary> {
  const entries = await listRestaurantOnboardingManifests(directory);
  const results: RestaurantManifestValidationResult[] = [];
  for (const entry of entries) {
    results.push(await validateRestaurantManifest(entry.manifest));
  }
  return {
    manifestCount: entries.length,
    acceptedCount: results.filter((result) => result.accepted).length,
    failedCount: results.filter((result) => !result.accepted).length,
    results,
  };
}
