export const OPENING_HOURS_MARKER_NORMALIZER_VERSION = "hours-marker-v3";

const HOURS_MARKER = /^(?:opening\s+hours|hours|åpningstider)(?:\s+([^:]{1,80}))?:?$/iu;
const DECORATIVE_PREFIX = /^(?:(?:[*•·◦▪▫●○◆◇|])\s*){1,8}/u;
const WEEKDAY_OR_TIME = /\b(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday|mandag|tirsdag|onsdag|torsdag|fredag|lørdag|lordag|søndag|sondag|man|tir|ons|tor|fre|lør|lor|søn|son)\b|\d{1,2}[.:]\d{2}/iu;
const GLUED_WEEKDAY_SCHEDULE = /^(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday|mandag|tirsdag|onsdag|torsdag|fredag|lørdag|lordag|søndag|sondag|man|tir|ons|tor|fre|lør|lor|søn|son)(?:closed|open|stengt|åpen|apen|\d)/iu;
const NORWEGIAN_HALF_HOUR = /\b(?:en\s+)?halv\s*time\b/giu;
const ENGLISH_HALF_HOUR = /\b(?:a\s+)?half(?:\s+an)?\s+hour\b/giu;

function normalizeLine(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/[\u200B-\u200D\uFEFF]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(NORWEGIAN_HALF_HOUR, "30 min")
    .replace(ENGLISH_HALF_HOUR, "30 minutes");
}

function normalizedMarker(value: string): string | null {
  const line = normalizeLine(value);
  if (HOURS_MARKER.test(line)) return line;
  const withoutDecoration = line.replace(DECORATIVE_PREFIX, "").trim();
  return withoutDecoration !== line && HOURS_MARKER.test(withoutDecoration) ? withoutDecoration : null;
}

function isScopeLabelCandidate(value: string): boolean {
  const line = normalizeLine(value);
  if (
    !line ||
    line.length > 40 ||
    !/\p{L}/u.test(line) ||
    WEEKDAY_OR_TIME.test(line) ||
    GLUED_WEEKDAY_SCHEDULE.test(line)
  ) {
    return false;
  }
  if (HOURS_MARKER.test(line) || /[:|]/u.test(line)) return false;
  return line.split(/\s+/).length <= 4;
}

export function normalizeOpeningHoursMarkerLines(lines: readonly string[]): readonly string[] {
  const output: string[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const original = normalizeLine(lines[index] ?? "");
    if (!original) continue;
    const marker = normalizedMarker(original);
    if (!marker) {
      output.push(original);
      continue;
    }

    const match = marker.match(HOURS_MARKER);
    const hasInlineLabel = Boolean(match?.[1]?.trim());
    const next = normalizeLine(lines[index + 1] ?? "");
    if (!hasInlineLabel && next && isScopeLabelCandidate(next)) {
      output.push(`${marker} ${next}`);
      index += 1;
      continue;
    }

    output.push(marker);
  }

  return output;
}
