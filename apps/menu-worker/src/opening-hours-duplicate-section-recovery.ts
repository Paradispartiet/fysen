import type { RestaurantHoursIntervalInput } from "@fysen/database";
import {
  OpeningHoursExtractionError,
  extractKitchenOpeningHours,
  type ExtractedOpeningHours,
} from "./opening-hours-extractor.js";

const hoursMarkerPattern = /^(?:opening\s+hours|hours|åpningstider)(?:\s+([^:]{1,80}))?:?$/iu;

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

    const markerIndexes = lines
      .map((line, index) => (hoursMarkerPattern.test(line.trim()) ? index : -1))
      .filter((index) => index >= 0);
    if (markerIndexes.length < 2) throw error;

    const parsedSections: ExtractedOpeningHours[] = [];
    for (const [markerOffset, markerIndex] of markerIndexes.entries()) {
      const end = markerIndexes[markerOffset + 1] ?? lines.length;
      const section = lines.slice(markerIndex, end);
      try {
        const parsed = extractKitchenOpeningHours(syntheticHtml(section), scopeHints);
        if (parsed.intervals.length > 0) parsedSections.push(parsed);
      } catch {
        // The original extractor already proved that more than one section was parseable.
        // Ignore non-schedule or malformed sibling sections here; conflicts remain fail-closed below.
      }
    }

    if (parsedSections.length < 2) throw error;
    const signatures = new Set(parsedSections.map((section) => intervalSignature(section.intervals)));
    if (signatures.size !== 1) throw error;

    const selected = parsedSections[0];
    if (!selected) throw error;
    return {
      ...selected,
      visibleText: lines.join("\n"),
    };
  }
}
