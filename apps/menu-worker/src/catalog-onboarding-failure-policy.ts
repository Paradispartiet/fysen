export interface CatalogOnboardingFailureSignal {
  readonly outcome: "published" | "already_published" | "failed";
  readonly warnings: readonly string[];
  readonly error: string | null;
}

const SAFE_PUBLISHED_REFRESH_FALLBACK_WARNING =
  "published coverage restored after extractor refresh failure; latest known snapshot remains manifest-valid";

const RECOVERABLE_REFRESH_WATCH_FAILURE_PREFIXES = [
  "First extractor refresh watch was ",
  "Second extractor refresh watch was ",
] as const;

/**
 * Catalog materialization should remain fail-closed for new/unpublished
 * restaurants, failed manifest quality, metadata failures, and any refresh
 * failure where safe published coverage was not restored.
 *
 * A published restaurant is different when an extractor refresh itself
 * returns a non-accepted watch outcome but onboarding successfully restores a
 * previously manifest-valid snapshot. That is an operational source-health
 * degradation, not a catalog-materialization failure. The hourly menu watcher
 * retains the independent failure signal for the degraded source.
 */
export function isBlockingCatalogOnboardingFailure(
  result: CatalogOnboardingFailureSignal,
): boolean {
  if (result.outcome !== "failed") return false;

  const safePublishedFallbackRestored = result.warnings.includes(
    SAFE_PUBLISHED_REFRESH_FALLBACK_WARNING,
  );
  const refreshWatchFailure = RECOVERABLE_REFRESH_WATCH_FAILURE_PREFIXES.some(
    (prefix) => result.error?.startsWith(prefix) ?? false,
  );

  return !(safePublishedFallbackRestored && refreshWatchFailure);
}

export function countBlockingCatalogOnboardingFailures(
  results: readonly CatalogOnboardingFailureSignal[],
): number {
  return results.filter(isBlockingCatalogOnboardingFailure).length;
}
