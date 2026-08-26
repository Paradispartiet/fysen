import type { MenuIndexRepository, WatchOutcome } from "@fysen/database";
import {
  assessExtraction,
  createMenuFingerprint,
  diffMenuItems,
  type ExtractionAssessment,
  type MenuObservedItem,
} from "@fysen/menu-core";
import { HttpMenuClient, MenuFetchError } from "./http-client.js";
import {
  ConflictingMenuSourceKeyError,
  canonicalizeUniqueMenuSourceKeys,
} from "./menu-source-key-canonicalizer.js";
import {
  extractMenuSource,
  extractorVersionForSourceType,
  fetchMenuSource,
  pdfResponseByteLimit,
  shouldForceReextract,
  type MenuSourceSupportInput,
} from "./menu-source-runtime.js";

export interface MenuWatchSummary {
  readonly menuSourceId: string;
  readonly outcome: WatchOutcome;
  readonly itemCount: number | null;
  readonly changeCount: number;
  readonly snapshotId: string | null;
}

export interface MenuWatchOptions {
  readonly allowDisabled?: boolean;
}

function evidenceText(items: readonly MenuObservedItem[]): string {
  return items.map((item) => item.sourceExcerpt ?? item.name).join("\n");
}

export function shouldConfirmRejectedExtraction(
  assessment: ExtractionAssessment,
): boolean {
  return (
    !assessment.accepted &&
    (assessment.code === "below_minimum" || assessment.code === "suspicious_drop")
  );
}

export { extractorVersionForSourceType, shouldForceReextract } from "./menu-source-runtime.js";

export async function watchMenuSourceOnce(
  repository: MenuIndexRepository,
  menuSourceId: string,
  httpClient = new HttpMenuClient(),
  sourceSupport: MenuSourceSupportInput = { redirectOrigins: [], browserDataOrigins: [] },
  options: MenuWatchOptions = {},
): Promise<MenuWatchSummary> {
  const startedAt = new Date().toISOString();
  const source = await repository.getMenuSourceById(menuSourceId);
  if (!source) throw new Error(`Unknown menu source: ${menuSourceId}`);
  if (!source.enabled && !options.allowDisabled) throw new Error(`Menu source is disabled: ${menuSourceId}`);

  const previous = await repository.getLatestSnapshotWithItems(menuSourceId);
  const forceReextract = shouldForceReextract(source.sourceType, previous?.extractorVersion ?? null);
  const fetchInput = {
    url: source.url,
    sourceType: source.sourceType,
    fetchMode: source.fetchMode,
    userAgent: source.userAgent,
    etag: forceReextract ? null : source.etag,
    lastModified: forceReextract ? null : source.lastModified,
    maxResponseBytes: source.maxResponseBytes,
    sourceSupport,
  } as const;

  let fetched;
  try {
    fetched = await fetchMenuSource(fetchInput, httpClient);
  } catch (error) {
    const completedAt = new Date().toISOString();
    const fetchError = error instanceof MenuFetchError ? error : null;
    const outcome: "blocked_by_robots" | "fetch_error" =
      fetchError?.code === "ROBOTS_DISALLOWED" ? "blocked_by_robots" : "fetch_error";
    await repository.recordFailure({
      menuSourceId,
      outcome,
      startedAt,
      completedAt,
      httpStatus: fetchError?.httpStatus ?? null,
      etag: null,
      lastModified: null,
      extractedItemCount: null,
      errorCode: fetchError?.code ?? "UNKNOWN_FETCH_ERROR",
      errorMessage: error instanceof Error ? error.message : String(error),
      details: {
        url: source.url,
        fetchMode: source.fetchMode,
        maxResponseBytes: source.sourceType === "pdf" ? pdfResponseByteLimit() : source.maxResponseBytes,
        forceReextract,
        redirectOrigins: sourceSupport.redirectOrigins,
        browserDataOrigins: sourceSupport.browserDataOrigins,
      },
    });
    throw error;
  }

  if (fetched.kind === "not_modified") {
    if (forceReextract) {
      const message = "Source returned HTTP 304 while a newer extractor version required a full re-extraction";
      await repository.recordFailure({
        menuSourceId,
        outcome: "fetch_error",
        startedAt,
        completedAt: fetched.fetchedAt,
        httpStatus: fetched.status,
        etag: fetched.etag,
        lastModified: fetched.lastModified,
        extractedItemCount: null,
        errorCode: "FORCED_REEXTRACT_NOT_MODIFIED",
        errorMessage: message,
        details: {
          previousExtractorVersion: previous?.extractorVersion ?? null,
          currentExtractorVersion: extractorVersionForSourceType(source.sourceType),
          fetchMode: source.fetchMode,
        },
      });
      throw new MenuFetchError("FORCED_REEXTRACT_NOT_MODIFIED", message, fetched.status);
    }

    await repository.recordSuccessfulCheck(
      {
        menuSourceId,
        startedAt,
        completedAt: fetched.fetchedAt,
        httpStatus: fetched.status,
        etag: fetched.etag,
        lastModified: fetched.lastModified,
        extractedItemCount: null,
        details: { durationMs: fetched.durationMs, fetchMode: source.fetchMode },
      },
      "not_modified",
    );
    return { menuSourceId, outcome: "not_modified", itemCount: null, changeCount: 0, snapshotId: null };
  }

  let extracted;
  try {
    const rawExtracted = await extractMenuSource(source.sourceType, fetched);
    extracted = {
      ...rawExtracted,
      items: canonicalizeUniqueMenuSourceKeys(rawExtracted.items),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const errorCode =
      error instanceof ConflictingMenuSourceKeyError
        ? "DUPLICATE_SOURCE_KEY_CONFLICT"
        : source.sourceType === "pdf"
          ? "PDF_EXTRACTION_ERROR"
          : source.sourceType === "json_ld"
            ? "JSON_LD_EXTRACTION_REQUIRED"
            : "HTML_EXTRACTION_ERROR";
    await repository.recordFailure({
      menuSourceId,
      outcome: "extraction_error",
      startedAt,
      completedAt: fetched.fetchedAt,
      httpStatus: fetched.status,
      etag: fetched.etag,
      lastModified: fetched.lastModified,
      extractedItemCount: null,
      errorCode,
      errorMessage: message,
      details: { sourceType: source.sourceType, fetchMode: source.fetchMode },
    });
    throw error;
  }

  const previousItems: readonly MenuObservedItem[] = previous?.items ?? [];
  let assessment = assessExtraction(
    previousItems.length,
    extracted.items.length,
    source.minimumExpectedItems,
  );
  let confirmationAttempted = false;
  let firstRejectedItemCount: number | null = null;
  let firstRejectedCode: ExtractionAssessment["code"] | null = null;
  let confirmationError: string | null = null;

  if (shouldConfirmRejectedExtraction(assessment)) {
    confirmationAttempted = true;
    firstRejectedItemCount = extracted.items.length;
    firstRejectedCode = assessment.code;
    try {
      const confirmationFetched = await fetchMenuSource(
        {
          ...fetchInput,
          etag: null,
          lastModified: null,
        },
        httpClient,
      );
      if (confirmationFetched.kind === "not_modified") {
        confirmationError =
          "Unconditional extraction confirmation unexpectedly returned HTTP 304";
      } else {
        const rawConfirmationExtracted = await extractMenuSource(
          source.sourceType,
          confirmationFetched,
        );
        const confirmationExtracted = {
          ...rawConfirmationExtracted,
          items: canonicalizeUniqueMenuSourceKeys(rawConfirmationExtracted.items),
        };
        const confirmationAssessment = assessExtraction(
          previousItems.length,
          confirmationExtracted.items.length,
          source.minimumExpectedItems,
        );
        fetched = confirmationFetched;
        extracted = confirmationExtracted;
        assessment = confirmationAssessment;
      }
    } catch (error) {
      confirmationError = error instanceof Error ? error.message : String(error);
    }
  }

  if (!assessment.accepted) {
    const outcome = assessment.code === "suspicious_drop" ? "quarantined" : "extraction_error";
    await repository.recordFailure({
      menuSourceId,
      outcome,
      startedAt,
      completedAt: fetched.fetchedAt,
      httpStatus: fetched.status,
      etag: fetched.etag,
      lastModified: fetched.lastModified,
      extractedItemCount: extracted.items.length,
      errorCode: assessment.code.toUpperCase(),
      errorMessage: assessment.message,
      details: {
        previousItemCount: previousItems.length,
        method: extracted.method,
        fetchMode: source.fetchMode,
        confirmationAttempted,
        firstRejectedItemCount,
        firstRejectedCode,
        confirmationError,
      },
    });
    return {
      menuSourceId,
      outcome,
      itemCount: extracted.items.length,
      changeCount: 0,
      snapshotId: null,
    };
  }

  const fingerprint = createMenuFingerprint(extracted.items);
  if (!forceReextract && (fingerprint === source.lastMenuFingerprint || fingerprint === previous?.normalizedSha256)) {
    await repository.recordSuccessfulCheck(
      {
        menuSourceId,
        startedAt,
        completedAt: fetched.fetchedAt,
        httpStatus: fetched.status,
        etag: fetched.etag,
        lastModified: fetched.lastModified,
        extractedItemCount: extracted.items.length,
        details: {
          durationMs: fetched.durationMs,
          method: extracted.method,
          fetchMode: source.fetchMode,
          confirmationAttempted,
          firstRejectedItemCount,
          firstRejectedCode,
        },
      },
      "unchanged",
    );
    return {
      menuSourceId,
      outcome: "unchanged",
      itemCount: extracted.items.length,
      changeCount: 0,
      snapshotId: null,
    };
  }

  const changes = diffMenuItems(previousItems, extracted.items);
  const snapshotId = await repository.recordSnapshot({
    menuSourceId,
    expectedPreviousSnapshotId: previous?.id ?? null,
    startedAt,
    fetchedAt: fetched.fetchedAt,
    httpStatus: fetched.status,
    responseContentType: fetched.contentType,
    rawSha256: fetched.rawSha256,
    normalizedSha256: fingerprint,
    normalizedText: evidenceText(extracted.items),
    etag: fetched.etag,
    lastModified: fetched.lastModified,
    robotsAllowed: fetched.robotsAllowed,
    fetchDurationMs: fetched.durationMs,
    extractorVersion: extracted.extractorVersion,
    items: extracted.items,
    changes: changes.map((change) => ({
      itemSourceKey: change.sourceKey,
      kind: change.kind,
      before: change.before,
      after: change.after,
    })),
  });

  return {
    menuSourceId,
    outcome: "changed",
    itemCount: extracted.items.length,
    changeCount: changes.length,
    snapshotId,
  };
}
