const maxMenuSourceAgeMs = 365 * 24 * 60 * 60 * 1000;

export function getProductionMenuFreshnessIssue(lastCheckedAt, checkIntervalMinutes, now) {
  const checkedAtMs = lastCheckedAt ? new Date(lastCheckedAt).getTime() : NaN;
  if (!Number.isFinite(checkedAtMs)) return "canonical menu source has never been checked";

  const interval = Number(checkIntervalMinutes ?? 0);
  if (!Number.isFinite(interval) || interval <= 0) {
    return "canonical menu source has an invalid check interval";
  }

  const freshUntil = checkedAtMs + maxMenuSourceAgeMs;
  return now > freshUntil ? `canonical menu source is stale since ${new Date(freshUntil).toISOString()}` : null;
}
