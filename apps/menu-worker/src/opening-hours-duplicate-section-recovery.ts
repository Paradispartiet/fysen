import type { RestaurantHoursIntervalInput } from "@fysen/database";
import {
  OpeningHoursExtractionError,
  extractKitchenOpeningHours,
  type ExtractedOpeningHours,
} from "./opening-hours-extractor.js";

export const OPENING_HOURS_DUPLICATE_SECTION_RECOVERY_VERSION = "scope-duplicates-v1";

const hoursMarkerPattern = /^(?:opening\s+hours|hours|åpningstider)(?:\s+([^:]{1,80}))?:?$/iu;
const hoursLikePattern = /(?:opening\s+hours|åpningstider|\bhours\b)/iu;

interface HoursMarker {
  readonly index: number;
  readonly label: string | null;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function syntheticHtml(lines: readonly string[]): string {
  return `<html><body>${lines.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}</body></html>`;
}

function normalizedScope(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLocaleLowerCase("nb-NO")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function markerMatchesHints(marker: HoursMarker, scopeHints: readonly string[]): boolean {
  if (!marker.label) return false;
  const label = normalizedScope(marker.label);
  return scopeHints.some((hint) => {
    const normalizedHint = normalizedScope(hint);
    return Boolean(normalizedHint) && (normalizedHint.includes(label) || label.includes(normalizedHint));
  });
}

function intervalSignature(intervals: readonly RestaurantHoursIntervalInput[]): string {
  return JSON.stringify(
    [...intervals]
      .map((item) => ({
        isoWeekday: item.isoWeekday,
        opensAt: item.opensAt,
        closesAt: item.closesAt,
        closesNextDay: item.closesNextDay,
      }))
      .sort(
        (left, right) =>
          left.isoWeekday - right.isoWeekday ||
          left.opensAt.localeCompare(right.opensAt) ||
          left.closesAt.localeCompare(right.closesAt) ||
          Number(left.closesNextDay) - Number(right.closesNextDay),
      ),
  );
}

function diagnostics(
  lines: readonly string[],
  markers: readonly HoursMarker[],
  scopeHints: readonly string[],
  parsedSectionCount: number,
): string {
  const hints = scopeHints.map(normalizedScope).filter(Boolean);
  const parsedMarkers = markers.map((marker) => ({
    index: marker.index,
    label: marker.label,
    normalizedLabel: marker.label ? normalizedScope(marker.label) : null,
    hinted: markerMatchesHints(marker, scopeHints),
  }));
  const hoursLikeLines = lines
    .map((line, index) => ({ index, line: line.trim().slice(0, 160) }))
    .filter((entry) => hoursLikePattern.test(entry.line))
    .slice(0, 12);
  return `hoursDiagnostics=${JSON.stringify({ hints, parsedMarkers, parsedSectionCount, hoursLikeLines })}`;
}

function rethrowWithDiagnostics(
  error: OpeningHoursExtractionError,
  lines: readonly string[],
  markers: readonly HoursMarker[],
  scopeHints: readonly string[],
  parsedSectionCount: number,
): never {
  throw new OpeningHoursExtractionError(
    error.code,
    `${error.message}; ${diagnostics(lines, markers, scopeHints, parsedSectionCount)}`,
  );
}

export function extractKitchenOpeningHoursWithIdenticalSectionRecovery(
  lines: readonly string[],
  scopeHints: readonly string[] = [],
): ExtractedOpeningHours {
  try {
    return extractKitchenOpeningHours(syntheticHtml(lines), scopeHints);
  } catch (error) {
    if (!(error instanceof OpeningHoursExtractionError) || error.code !== "AMBIGUOUS_HOURS_SECTION") {
      throw error;
    }

    const markers: HoursMarker[] = [];
    for (const [index, line] of lines.entries()) {
      const match = line.trim().match(hoursMarkerPattern);
      if (match) markers.push({ index, label: match[1]?.trim() || null });
    }
    if (markers.length < 2) rethrowWithDiagnostics(error, lines, markers, scopeHints, 0);

    const scopedMarkers = markers.filter((marker) => markerMatchesHints(marker, scopeHints));
    const recoveryMarkers = scopedMarkers.length >= 2 ? scopedMarkers : markers;
    const parsedSections: ExtractedOpeningHours[] = [];

    for (const marker of recoveryMarkers) {
      const nextGlobalMarker = markers.find((candidate) => candidate.index > marker.index);
      const end = nextGlobalMarker?.index ?? lines.length;
      const section = lines.slice(marker.index, end);
      try {
        const parsed = extractKitchenOpeningHours(syntheticHtml(section), scopeHints);
        if (parsed.intervals.length > 0) parsedSections.push(parsed);
      } catch {
        // Ignore malformed sibling sections; acceptance below still requires at least two
        // parseable copies with exactly the same canonical schedule.
      }
    }

    if (parsedSections.length < 2) {
      rethrowWithDiagnostics(error, lines, markers, scopeHints, parsedSections.length);
    }
    const signatures = new Set(parsedSections.map((section) => intervalSignature(section.intervals)));
    if (signatures.size !== 1) {
      rethrowWithDiagnostics(error, lines, markers, scopeHints, parsedSections.length);
    }

    const selected = parsedSections[0];
    if (!selected) rethrowWithDiagnostics(error, lines, markers, scopeHints, parsedSections.length);
    return {
      ...selected,
      visibleText: lines.join("\n"),
    };
  }
}
