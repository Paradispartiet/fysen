import { load } from "cheerio";
import { createMenuFingerprint } from "@fysen/menu-core";
import { verifyActionSource } from "./action-source-runtime.js";
import { HttpMenuClient } from "./http-client.js";
import {
  evaluateManifestMenuQuality,
  type ManifestMenuQualityResult,
} from "./manifest-quality.js";
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

function normalizeDiagnosticText(value: string): string {
  return value.normalize("NFKC").replace(/\s+/gu, " ").trim();
}

function exactProductTileContexts(
  body: string,
  assertions: readonly string[],
): readonly { assertion: string; found: boolean; tile: string | null }[] {
  const $ = load(body);
  const output: { assertion: string; found: boolean; tile: string | null }[] = [];
  const seen = new Set<string>();

  for (const assertion of assertions) {
    const expected = normalizeDiagnosticText(assertion).toLocaleLowerCase("nb-NO");
    if (!expected || seen.has(expected)) continue;
    seen.add(expected);

    const exactHeading = $("[data-testid='menu-product'] h1, [data-testid='menu-product'] h2, [data-testid='menu-product'] h3, [data-testid='menu-product'] h4, [data-testid='menu-product'] h5, [data-testid='menu-product'] h6")
      .filter((_, element) => normalizeDiagnosticText($(element).text()).toLocaleLowerCase("nb-NO") === expected)
      .first();
    const tile = exactHeading.closest("[data-testid='menu-product']");
    output.push({
      assertion,
      found: tile.length > 0,
      tile: tile.length > 0 ? normalizeDiagnosticText($.html(tile)).slice(0, 1400) : null,
    });
    if (output.length >= 20) break;
  }

  return output;
}

function categoryStateContexts(body: string): readonly string[] {
  const marker = "RestaurantMenuCategory:";
  const contexts: string[] = [];
  let offset = 0;
  while (contexts.length < 12) {
    const index = body.indexOf(marker, offset);
    if (index < 0) break;
    contexts.push(
      normalizeDiagnosticText(
        body.slice(Math.max(0, index - 80), Math.min(body.length, index + 700)),
      ).slice(0, 780),
    );
    offset = index + marker.length;
  }
  return contexts;
}

function logTemporaryHtmlDiagnostics(
  manifest: RestaurantOnboardingManifest,
  body: string,
): void {
  if (process.env.GITHUB_WORKFLOW !== "Validate Fysen restaurant candidates") return;
  const $ = load(body);
  const required = manifest.qualityAssertions.requiredDishNames;
  const forbidden = manifest.qualityAssertions.forbiddenDishNames ?? [];
  const sectionAssertions = forbidden.filter((value) =>
    /^(?:forretter|hovedretter|supper|barnemeny|sauser|dessert|drikke)$/iu.test(value.trim()),
  );
  const diagnosticAssertions = [
    ...required.slice(0, 8),
    ...sectionAssertions,
    ...forbidden.filter((value) => !sectionAssertions.includes(value)).slice(0, 5),
  ];

  const headingTexts = $("h1, h2, h3")
    .toArray()
    .map((element) => normalizeDiagnosticText($(element).text()))
    .filter(Boolean);
  const h2Texts = $("h2")
    .toArray()
    .map((element) => normalizeDiagnosticText($(element).text()))
    .filter(Boolean);
  const productLists = $("ul.dish-list-grid")
    .toArray()
    .slice(0, 20)
    .map((element, index) => {
      const list = $(element);
      const titles = list
        .find("[data-testid='menu-product'] h1, [data-testid='menu-product'] h2, [data-testid='menu-product'] h3, [data-testid='menu-product'] h4, [data-testid='menu-product'] h5, [data-testid='menu-product'] h6")
        .toArray()
        .map((title) => normalizeDiagnosticText($(title).text()))
        .filter(Boolean);
      const parent = list.parent();
      return {
        index,
        itemCount: list.find("[data-testid='menu-product']").length,
        firstTitles: titles.slice(0, 4),
        parentPrefix: normalizeDiagnosticText($.html(parent)).slice(0, 1000),
      };
    });

  console.error(
    JSON.stringify(
      {
        temporaryHtmlDiagnostics: {
          sourceUrl: manifest.menuSource.url,
          bodyLength: body.length,
          nativeHeadingTagCount: body.match(/<h[1-6]\b/giu)?.length ?? 0,
          h2Texts,
          headingTexts: headingTexts.slice(0, 80),
          productListCount: $("ul.dish-list-grid").length,
          productLists,
          exactProductTiles: exactProductTileContexts(body, diagnosticAssertions),
          categoryStateContexts: categoryStateContexts(body),
        },
      },
      null,
      2,
    ),
  );
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

    logTemporaryHtmlDiagnostics(manifest, fetched.body);
    const extracted = await extractMenuSource(manifest.menuSource.sourceType, fetched);
    const fingerprint = createMenuFingerprint(extracted.items);
    const quality = evaluateManifestMenuQuality(manifest, extracted.items);
    return {
      accepted: quality.accepted,
      url: manifest.menuSource.url,
      httpStatus: fetched.status,
      method: extracted.method,
      extractorVersion: extracted.extractorVersion,
      fingerprint,
      quality,
      observedDishNames: extracted.items.map((item) => item.name),
      observedDishVariants: extracted.items.map((item) => ({
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
