import { load } from "cheerio";
import type { RestaurantHoursIntervalInput } from "@fysen/database";
import {
  OpeningHoursExtractionError,
  extractKitchenOpeningHours,
  type ExtractedOpeningHours,
} from "./opening-hours-extractor.js";

export const OPENING_HOURS_SOURCE_EXTRACTOR_VERSION = "hours-visible-v11";

const relativeKitchenClosePattern = /(?:kjøkken(?:et)?\s+stenger|kitchen\s+closes)\s+(\d{1,3})\s*(?:min\.?|minutter?|minutes?)\s+(?:før\s+stengetid|before\s+(?:closing|close)(?:\s+time)?)/giu;
const relativeKitchenCloseLinePattern = /(?:kjøkken(?:et)?\s+stenger|kitchen\s+closes)\s+\d{1,3}\s*(?:min\.?|minutter?|minutes?)\s+(?:før\s+stengetid|before\s+(?:closing|close)(?:\s+time)?)/iu;
const absoluteKitchenClosePattern = /(?:kjøkken(?:et)?\s+(?:til|stenger)|kitchen\s+closes(?:\s+at)?)\s*(?:(?:kl\.?|klokka)\s*)?(?:2[0-3]|[01]?\d)(?:[.:][0-5]\d)?/iu;

function extractVisibleLines(html: string): readonly string[] {
  const $ = load(html);
  $("script, style, noscript, svg, template").remove();
  $("br").replaceWith("\n");
  $("td, th").each((_, element) => {
    $(element).append(" ");
  });
  $("p, li, h1, h2, h3, h4, h5, h6, tr, div, section, article").each((_, element) => {
    $(element).append("\n");
  });
  return $("body")
    .text()
    .split(/\n+/)
    .map((line) => line.normalize("NFKC").replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function normalizeWeekdayAliases(value: string): string {
  return value
    .replace(/\bmandager\b/giu, "mandag")
    .replace(/\btirsdager\b/giu, "tirsdag")
    .replace(/\bonsdager\b/giu, "onsdag")
    .replace(/\btorsdager\b/giu, "torsdag")
    .replace(/\btors\b/giu, "tor")
    .replace(/\bfredager\b/giu, "fredag")
    .replace(/\blørdager\b/giu, "lørdag")
    .replace(/\blordager\b/giu, "lordag")
    .replace(/\bsøndager\b/giu, "søndag")
    .replace(/\bsondager\b/giu, "sondag")
    .replace(/\bmon\.?\b/giu, "Monday")
    .replace(/\btues?\.?\b/giu, "Tuesday")
    .replace(/\bweds?\.?\b/giu, "Wednesday")
    .replace(/\bthurs?\.?\b/giu, "Thursday")
    .replace(/\bthu\.?\b/giu, "Thursday")
    .replace(/\bfri\.?\b/giu, "Friday")
    .replace(/\bsat\.?\b/giu, "Saturday")
    .replace(/\bsun\.?\b/giu, "Sunday");
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

function clockToMinutes(value: string): number {
  const match = value.match(/^(\d{2}):(\d{2})$/u);
  if (!match?.[1] || !match[2]) {
    throw new OpeningHoursExtractionError("INVALID_CLOCK", `Invalid normalized clock value: ${value}`);
  }
  return Number(match[1]) * 60 + Number(match[2]);
}

function minutesToClock(value: number): string {
  const normalized = ((value % 1440) + 1440) % 1440;
  return `${String(Math.floor(normalized / 60)).padStart(2, "0")}:${String(normalized % 60).padStart(2, "0")}`;
}

function subtractKitchenCutoff(
  item: RestaurantHoursIntervalInput,
  minutesBeforeClose: number,
): RestaurantHoursIntervalInput {
  const closesAt = minutesToClock(clockToMinutes(item.closesAt) - minutesBeforeClose);
  return {
    ...item,
    closesAt,
    closesNextDay: closesAt <= item.opensAt,
  };
}

function relativeCutoffMinutes(lines: readonly string[]): number | null {
  const values = new Set<number>();
  for (const line of lines) {
    for (const match of line.matchAll(relativeKitchenClosePattern)) {
      const raw = match[1];
      if (!raw) continue;
      const minutes = Number(raw);
      if (!Number.isInteger(minutes) || minutes <= 0 || minutes > 180) {
        throw new OpeningHoursExtractionError(
          "INVALID_RELATIVE_KITCHEN_CUTOFF",
          `Relative kitchen-close offset must be between 1 and 180 minutes, got ${raw}`,
        );
      }
      values.add(minutes);
    }
  }
  if (values.size > 1) {
    throw new OpeningHoursExtractionError(
      "AMBIGUOUS_RELATIVE_KITCHEN_CUTOFF",
      "Multiple conflicting relative kitchen-close offsets were present",
    );
  }
  return values.values().next().value ?? null;
}

function sanitizedLines(lines: readonly string[]): readonly string[] {
  const output: string[] = [];
  for (const line of lines) {
    const withoutRelativeCutoff = line.replace(relativeKitchenClosePattern, "").replace(/\s+/g, " ").trim();
    if (withoutRelativeCutoff) output.push(normalizeWeekdayAliases(withoutRelativeCutoff));
  }
  return output;
}

export function extractCanonicalOpeningHours(
  html: string,
  scopeHints: readonly string[] = [],
): ExtractedOpeningHours {
  const originalLines = extractVisibleLines(html);
  const relativeMinutes = relativeCutoffMinutes(originalLines);
  if (relativeMinutes === null) {
    return extractKitchenOpeningHours(syntheticHtml(originalLines.map(normalizeWeekdayAliases)), scopeHints);
  }

  const textWithoutRelative = originalLines
    .map((line) => line.replace(relativeKitchenClosePattern, "").trim())
    .filter(Boolean)
    .join(" ");
  if (absoluteKitchenClosePattern.test(textWithoutRelative)) {
    throw new OpeningHoursExtractionError(
      "AMBIGUOUS_RELATIVE_KITCHEN_CUTOFF",
      "Relative and absolute kitchen-close regimes were both present",
    );
  }

  const base = extractKitchenOpeningHours(syntheticHtml(sanitizedLines(originalLines)), scopeHints);
  const intervals = base.intervals.map((item) => subtractKitchenCutoff(item, relativeMinutes));
  const relativeExcerpt = originalLines.find((line) => relativeKitchenCloseLinePattern.test(line)) ?? null;

  return {
    intervals,
    sourceExcerpt: [base.sourceExcerpt, relativeExcerpt]
      .filter((value): value is string => Boolean(value))
      .join(" · ")
      .slice(0, 2000),
    visibleText: originalLines.join("\n"),
  };
}
