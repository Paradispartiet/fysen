// Only re-use a foreground snapshot while it is recent.
// Menu data is still fetched live; this threshold controls when to force a new request.
export const MAX_FOREGROUND_AGE_MS = 15 * 60 * 1000;

export function shouldRefreshAfterResume(
  pausedAt: number | null,
  resumedAt: number,
): boolean {
  return (
    pausedAt !== null &&
    Number.isFinite(pausedAt) &&
    Number.isFinite(resumedAt) &&
    resumedAt >= pausedAt &&
    resumedAt - pausedAt >= MAX_FOREGROUND_AGE_MS
  );
}
