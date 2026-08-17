import type { MenuIndexRepository, StoredMenuItem, WatchOutcome } from "@fysen/database";
import {
  assessExtraction,
  createMenuFingerprint,
  diffMenuItems,
  type MenuObservedItem,
} from "@fysen/menu-core";
import { extractHtmlMenu, HTML_EXTRACTOR_VERSION } from "./html-extractor.js";
import { HttpMenuClient, MenuFetchError } from "./http-client.js";
import { extractPdfMenu, PDF_EXTRACTOR_VERSION } from "./pdf-extractor.js";

const DEFAULT_MAX_PDF_RESPONSE_BYTES = 8 * 1024 * 1024;
const MAX_PDF_RESPONSE_BYTES = 25 * 1024 * 1024;

export interface MenuWatchSummary {
  readonly menuSourceId: string;
  readonly outcome: WatchOutcome;
  readonly itemCount: number | null;
  readonly changeCount: number;
  readonly snapshotId: string | null;
}

interface ExtractedMenu {
  readonly items: readonly MenuObservedItem[];
  readonly method: string;
  readonly extractorVersion: string;
}

function storedToObserved(item: StoredMenuItem): MenuObservedItem {
  return { ...item };
}

function evidenceText(items: readonly MenuObservedItem[]): string {
  return items.map((item) => item.sourceExcerpt ?? item.name).join("\n");
}

function pdfResponseByteLimit(): number {
  const configured = Number(process.env.FYSEN_MAX_PDF_RESPONSE_BYTES);
  if (!Number.isInteger(configured) || configured <= 0) return DEFAULT_MAX_PDF_RESPONSE_BYTES;
  return Math.min(configured, MAX_PDF_RESPONSE_BYTES);
}

async function extractSource(
  sourceType: string,
  body: string,
  bodyBytes: Uint8Array,
): Promise<ExtractedMenu> {
  if (sourceType === "html" || sourceType === "json_ld") {
    const extracted = extractHtmlMenu(body);
    return { items: extracted.items, method: extracted.method, extractorVersion: HTML_EXTRACTOR_VERSION };
  }
  if (sourceType === "pdf") {
    const extracted = await extractPdfMenu(bodyBytes);
    return { items: extracted.items, method: extracted.method, extractorVersion: PDF_EXTRACTOR_VERSION };
  }
  throw new Error(`HTTP watcher does not extract source type ${sourceType}`);
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
    fetched = await httpClient.fetchSource(
      source,
      source.sourceType === "pdf" ? { maxResponseBytes: pdfResponseByteLimit() } : {},
    );
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
        maxResponseBytes: source.sourceType === "pdf" ? pdfResponseByteLimit() : null,
      },
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

  let extracted: ExtractedMenu;
  try {
    extracted = await extractSource(source.sourceType, fetched.body, fetched.bodyBytes);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const errorCode = source.sourceType === "pdf" ? "PDF_EXTRACTION_ERROR" : "UNSUPPORTED_SOURCE_TYPE";
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
      details: { sourceType: source.sourceType },
    });
    throw error;
  }

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
    extractorVersion: extracted.extractorVersion,
    items: extracted.items as unknown as readonly StoredMenuItem[],
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
