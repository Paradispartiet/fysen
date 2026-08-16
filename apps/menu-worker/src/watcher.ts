import type { MenuIndexRepository, StoredMenuItem, WatchOutcome } from "@fysen/database";
import {
  assessExtraction,
  createMenuFingerprint,
  diffMenuItems,
  type MenuObservedItem,
} from "@fysen/menu-core";
import { extractHtmlMenu, HTML_EXTRACTOR_VERSION } from "./html-extractor.js";
import { HttpMenuClient, MenuFetchError } from "./http-client.js";

export interface MenuWatchSummary {
  readonly menuSourceId: string;
  readonly outcome: WatchOutcome;
  readonly itemCount: number | null;
  readonly changeCount: number;
  readonly snapshotId: string | null;
}

function storedToObserved(item: StoredMenuItem): MenuObservedItem {
  return { ...item };
}

function evidenceText(items: readonly MenuObservedItem[]): string {
  return items.map((item) => item.sourceExcerpt ?? item.name).join("\n");
}

export async function watchMenuSourceOnce(
  repository: MenuIndexRepository,
  menuSourceId: string,
  httpClient = new HttpMenuClient(),
): Promise<MenuWatchSummary> {
  const startedAt = new Date().toISOString();
  const source = await repository.getMenuSourceById(menuSourceId);
  if (!source) throw new Error(`Unknown menu source: ${menuSourceId}`);
  if (!source.enabled) throw new Error(`Menu source is disabled: ${menuSourceId}`);

  let fetched;
  try {
    fetched = await httpClient.fetchSource(source);
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
      details: { url: source.url },
    });
    throw error;
  }

  if (fetched.kind === "not_modified") {
    await repository.recordSuccessfulCheck(
      {
        menuSourceId,
        startedAt,
        completedAt: fetched.fetchedAt,
        httpStatus: fetched.status,
        etag: fetched.etag,
        lastModified: fetched.lastModified,
        extractedItemCount: null,
        details: { durationMs: fetched.durationMs },
      },
      "not_modified",
    );
    return { menuSourceId, outcome: "not_modified", itemCount: null, changeCount: 0, snapshotId: null };
  }

  if (source.sourceType !== "html" && source.sourceType !== "json_ld") {
    const message = `HTTP watcher v1 does not extract source type ${source.sourceType}`;
    await repository.recordFailure({
      menuSourceId,
      outcome: "extraction_error",
      startedAt,
      completedAt: fetched.fetchedAt,
      httpStatus: fetched.status,
      etag: fetched.etag,
      lastModified: fetched.lastModified,
      extractedItemCount: null,
      errorCode: "UNSUPPORTED_SOURCE_TYPE",
      errorMessage: message,
    });
    throw new Error(message);
  }

  const extracted = extractHtmlMenu(fetched.body);
  const previous = await repository.getLatestSnapshotWithItems(menuSourceId);
  const previousItems = previous?.items.map(storedToObserved) ?? [];
  const assessment = assessExtraction(
    previousItems.length,
    extracted.items.length,
    source.minimumExpectedItems,
  );

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
      details: { previousItemCount: previousItems.length, method: extracted.method },
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
  if (fingerprint === source.lastMenuFingerprint || fingerprint === previous?.normalizedSha256) {
    await repository.recordSuccessfulCheck(
      {
        menuSourceId,
        startedAt,
        completedAt: fetched.fetchedAt,
        httpStatus: fetched.status,
        etag: fetched.etag,
        lastModified: fetched.lastModified,
        extractedItemCount: extracted.items.length,
        details: { durationMs: fetched.durationMs, method: extracted.method },
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
    extractorVersion: HTML_EXTRACTOR_VERSION,
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
