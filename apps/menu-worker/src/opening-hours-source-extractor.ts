import { load } from "cheerio";
import type { RestaurantHoursIntervalInput } from "@fysen/database";
import {
  OpeningHoursExtractionError,
  type ExtractedOpeningHours,
} from "./opening-hours-extractor.js";
import { extractKitchenOpeningHoursWithIdenticalSectionRecovery } from "./opening-hours-duplicate-section-recovery.js";

export const OPENING_HOURS_SOURCE_EXTRACTOR_VERSION = "hours-visible-v13";

const relativeKitchenClosePattern = /(?:kjøkken(?:et)?\s+stenger|kitchen\s+closes)\s+(\d{1,3})\s*(?:min\.?|minutter?|minutes?)\s+(?:før\s+stengetid|before\s+(?:closing|close)(?:\s+time)?)/giu;
const relativeKitchenCloseLinePattern = /(?:kjøkken(?:et)?\s+stenger|kitchen\s+closes)\s+\d{1,3}\s*(?:min\.?|minutter?|minutes?)\s+(?:før\s+stengetid|before\s+(?:closing|close)(?:\s+time)?)/iu;
const absoluteKitchenClosePattern = /(?:kjøkken(?:et)?\s+(?:til|stenger)|kitchen\s+closes(?:\s+at)?)\s*(?:(?:kl\.?|klokka)\s*)?(?:2[0-3]|[01]?\d)(?:[.:][0-5]\d)?/iu;
const absoluteKitchenCloseCapturePattern = /(?:kjøkken(?:et)?\s+(?:til|stenger)|kitchen\s+closes(?:\s+at)?)\s*(?:(?:kl\.?|klokka)\s*)?((?:2[0-3]|[01]?\d)(?:[.:][0-5]\d)?)/giu;
const weekdayMentionPattern = /\b(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Mandag|Tirsdag|Onsdag|Torsdag|Fredag|Lørdag|Lordag|Søndag|Sondag|Man|Tir|Ons|Tor|Fre|Lør|Lor|Søn|Son|Mon|Tue|Tues|Wed|Weds|Thu|Thur|Thurs|Fri|Sat|Sun)\b/iu;

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
    .replace(/\bmon\b\.?/giu, "Monday")
    .replace(/\btues?\b\.?/giu, "Tuesday")
    .replace(/\bweds?\b\.?/giu, "Wednesday")
    .replace(/\bthurs?\b\.?/giu, "Thursday")
    .replace(/\bthu\b\.?/giu, "Thursday")
    .replace(/\bfri\b\.?/giu, "Friday")
    .replace(/\bsat\b\.?/giu, "Saturday")
    .replace(/\bsun\b\.?/giu, "Sunday");
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

function normalizeClock(value: string): string {
  const normalized = value.replace(".", ":");
  const [rawHour, rawMinute = "00"] = normalized.split(":");
  const hour = Number(rawHour);
  const minute = Number(rawMinute);
  if (!Number.isInteger(hour) || hour < 0 || hour > 23 || !Number.isInteger(minute) || minute < 0 || minute > 59) {
    throw new OpeningHoursExtractionError("INVALID_CLOCK", `Invalid clock value: ${value}`);
  }
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
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

function applyAbsoluteKitchenClose(
  item: RestaurantHoursIntervalInput,
  kitchenClosesAt: string,
): RestaurantHoursIntervalInput {
  const opens = clockToMinutes(item.opensAt);
  const closes = clockToMinutes(item.closesAt) + (item.closesNextDay ? 1440 : 0);
  const rawCutoff = clockToMinutes(kitchenClosesAt);

  if (!item.closesNextDay && rawCutoff <= opens) {
    throw new OpeningHoursExtractionError(
      "INVALID_GLOBAL_KITCHEN_CUTOFF",
      `Global kitchen close ${kitchenClosesAt} is not after opening time ${item.opensAt}`,
    );
  }

  let cutoff = rawCutoff;
  if (item.closesNextDay && cutoff <= opens) cutoff += 1440;
  if (item.closesNextDay && cutoff > closes && rawCutoff <= opens) {
    throw new OpeningHoursExtractionError(
      "INVALID_GLOBAL_KITCHEN_CUTOFF",
      `Global kitchen close ${kitchenClosesAt} does not fall inside overnight interval ${item.opensAt}-${item.closesAt}`,
    );
  }

  if (cutoff >= closes) return item;
  return {
    ...item,
    closesAt: minutesToClock(cutoff),
    closesNextDay: cutoff >= 1440,
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

interface AbsoluteGlobalKitchenClose {
  readonly closesAt: string;
  readonly excerpt: string;
}

function absoluteGlobalKitchenClose(lines: readonly string[]): AbsoluteGlobalKitchenClose | null {
  const values = new Set<string>();
  let excerpt: string | null = null;
  let hasWeekdaySpecificAbsolute = false;

  for (const line of lines) {
    const matches = [...line.matchAll(absoluteKitchenCloseCapturePattern)];
    if (matches.length === 0) continue;
    if (weekdayMentionPattern.test(line)) {
      hasWeekdaySpecificAbsolute = true;
      continue;
    }
    for (const match of matches) {
      const rawClock = match[1];
      if (!rawClock) continue;
      values.add(normalizeClock(rawClock));
      excerpt ??= line;
    }
  }

  if (values.size > 1) {
    throw new OpeningHoursExtractionError(
      "AMBIGUOUS_ABSOLUTE_KITCHEN_CUTOFF",
      "Multiple conflicting global kitchen-close times were present",
    );
  }
  if (values.size === 1 && hasWeekdaySpecificAbsolute) {
    throw new OpeningHoursExtractionError(
      "AMBIGUOUS_ABSOLUTE_KITCHEN_CUTOFF",
      "Global and weekday-specific absolute kitchen-close regimes were both present",
    );
  }

  const closesAt = values.values().next().value;
  return closesAt && excerpt ? { closesAt, excerpt } : null;
}

function sanitizedLines(lines: readonly string[]): readonly string[] {
  const output: string[] = [];
  for (const line of lines) {
    const withoutRelativeCutoff = line.replace(relativeKitchenClosePattern, "").replace(/\s+/g, " ").trim();
    if (withoutRelativeCutoff) output.push(normalizeWeekdayAliases(withoutRelativeCutoff));
  }
  return output;
}

function sanitizedAbsoluteLines(lines: readonly string[]): readonly string[] {
  const output: string[] = [];
  for (const line of lines) {
    const withoutAbsoluteCutoff = line
      .replace(absoluteKitchenCloseCapturePattern, "")
      .replace(/\s+/g, " ")
      .trim();
    if (withoutAbsoluteCutoff) output.push(normalizeWeekdayAliases(withoutAbsoluteCutoff));
  }
  return output;
}

export function extractCanonicalOpeningHours(
  html: string,
  scopeHints: readonly string[] = [],
): ExtractedOpeningHours {
  const originalLines = extractVisibleLines(html);
  const relativeMinutes = relativeCutoffMinutes(originalLines);
  const globalAbsolute = absoluteGlobalKitchenClose(originalLines);

  if (relativeMinutes !== null) {
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

    const base = extractKitchenOpeningHoursWithIdenticalSectionRecovery(sanitizedLines(originalLines), scopeHints);
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

  if (globalAbsolute) {
    const base = extractKitchenOpeningHoursWithIdenticalSectionRecovery(sanitizedAbsoluteLines(originalLines), scopeHints);
    const intervals = base.intervals.map((item) => applyAbsoluteKitchenClose(item, globalAbsolute.closesAt));
    return {
      intervals,
      sourceExcerpt: [base.sourceExcerpt, globalAbsolute.excerpt].join(" · ").slice(0, 2000),
      visibleText: originalLines.join("\n"),
    };
  }

  return extractKitchenOpeningHoursWithIdenticalSectionRecovery(
    originalLines.map(normalizeWeekdayAliases),
    scopeHints,
  );
}
