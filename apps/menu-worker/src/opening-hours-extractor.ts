import { load } from "cheerio";
import type { RestaurantHoursIntervalInput } from "@fysen/database";

export const OPENING_HOURS_EXTRACTOR_VERSION = "hours-visible-v3";

const weekdayByName: Readonly<Record<string, number>> = {
  monday: 1,
  mandag: 1,
  tuesday: 2,
  tirsdag: 2,
  wednesday: 3,
  onsdag: 3,
  thursday: 4,
  torsdag: 4,
  friday: 5,
  fredag: 5,
  saturday: 6,
  lørdag: 6,
  lordag: 6,
  sunday: 7,
  søndag: 7,
  sondag: 7,
};

const dayToken = "(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Mandag|Tirsdag|Onsdag|Torsdag|Fredag|Lørdag|Lordag|Søndag|Sondag)";
const timeToken = "(?:2[0-3]|[01]?\\d)(?:[.:][0-5]\\d)?";
const dayRangeConnector = "(?:[-–]|til|to)";

export class OpeningHoursExtractionError extends Error {
  constructor(readonly code: string, message: string) {
    super(message);
    this.name = "OpeningHoursExtractionError";
  }
}

export interface ExtractedOpeningHours {
  readonly intervals: readonly RestaurantHoursIntervalInput[];
  readonly sourceExcerpt: string;
  readonly visibleText: string;
}

function extractVisibleText(html: string): string {
  const $ = load(html);
  $("script, style, noscript, svg, template").remove();
  $("br").replaceWith("\n");
  $("p, li, h1, h2, h3, h4, h5, h6, tr, div, section, article").each((_, element) => {
    $(element).append("\n");
  });
  return $("body")
    .text()
    .split(/\n+/)
    .map((line) => line.normalize("NFKC").replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n");
}

function parseClock(value: string): string {
  const normalized = value.replace(".", ":");
  const [hourText, minuteText = "0"] = normalized.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);
  if (!Number.isInteger(hour) || hour < 0 || hour > 23 || !Number.isInteger(minute) || minute < 0 || minute > 59) {
    throw new OpeningHoursExtractionError("INVALID_CLOCK", `Invalid opening-hours clock value: ${value}`);
  }
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function weekday(value: string): number {
  const resolved = weekdayByName[value.toLocaleLowerCase("nb-NO")];
  if (!resolved) throw new OpeningHoursExtractionError("INVALID_WEEKDAY", `Unknown weekday: ${value}`);
  return resolved;
}

function expandWeekdayRange(start: number, end: number): readonly number[] {
  const days: number[] = [];
  let current = start;
  for (let guard = 0; guard < 7; guard += 1) {
    days.push(current);
    if (current === end) return days;
    current = current === 7 ? 1 : current + 1;
  }
  throw new OpeningHoursExtractionError("INVALID_DAY_RANGE", `Could not expand weekday range ${start}-${end}`);
}

function interval(isoWeekday: number, opensText: string, closesText: string): RestaurantHoursIntervalInput {
  const opensAt = parseClock(opensText);
  const closesAt = parseClock(closesText);
  return {
    isoWeekday,
    opensAt,
    closesAt,
    closesNextDay: closesAt <= opensAt,
  };
}

function extractDinnerHours(compact: string): { intervals: readonly RestaurantHoursIntervalInput[]; excerpt: string } | null {
  const range = new RegExp(
    `\\bDinner\\s+(${dayToken})\\s*${dayRangeConnector}\\s*(${dayToken})\\s+(${timeToken})\\s*[-–]\\s*(late|${timeToken})`,
    "iu",
  ).exec(compact);
  if (!range) return null;

  const startDayText = range[1];
  const endDayText = range[2];
  const opensText = range[3];
  const advertisedCloseText = range[4];
  if (!startDayText || !endDayText || !opensText || !advertisedCloseText) {
    throw new OpeningHoursExtractionError("INCOMPLETE_HOURS_MATCH", "Dinner hours match was incomplete");
  }

  const excerptStart = Math.max(0, range.index - 40);
  const excerptEnd = Math.min(compact.length, range.index + range[0].length + 180);
  const excerpt = compact.slice(excerptStart, excerptEnd);
  const kitchenClose = new RegExp(`kitchen\\s+closes\\s+at\\s+(${timeToken})`, "iu").exec(excerpt)?.[1] ?? null;

  if (advertisedCloseText.toLocaleLowerCase("en-US") === "late" && !kitchenClose) {
    throw new OpeningHoursExtractionError(
      "AMBIGUOUS_CLOSE_TIME",
      "Dinner closes at an ambiguous time and no explicit kitchen close was found",
    );
  }

  const closeText = kitchenClose ?? advertisedCloseText;
  return {
    intervals: expandWeekdayRange(weekday(startDayText), weekday(endDayText)).map((isoWeekday) =>
      interval(isoWeekday, opensText, closeText),
    ),
    excerpt,
  };
}

interface HoursMarker {
  readonly index: number;
  readonly label: string | null;
}

function selectStandardHoursCandidate(visibleText: string): string {
  const lines = visibleText.split("\n");
  const markerPattern = /^(?:opening\s+hours|hours|åpningstider)(?:\s+([^:]{1,80}))?:?$/iu;
  const markers: HoursMarker[] = [];
  for (const [index, line] of lines.entries()) {
    const match = line.trim().match(markerPattern);
    if (match) markers.push({ index, label: match[1]?.trim() || null });
  }

  if (markers.length === 0) return visibleText;
  if (markers.length === 1) {
    return lines.slice(markers[0]?.index ?? 0).join(" ");
  }

  const firstMarkerIndex = markers[0]?.index ?? lines.length;
  const pageIdentity = lines.slice(0, firstMarkerIndex).join(" ").toLocaleLowerCase("nb-NO");
  const matching = markers.filter(
    (marker) => marker.label && pageIdentity.includes(marker.label.toLocaleLowerCase("nb-NO")),
  );
  if (matching.length !== 1) {
    throw new OpeningHoursExtractionError(
      "AMBIGUOUS_HOURS_SECTION",
      `Found ${markers.length} opening-hours sections and could not resolve exactly one from the page identity`,
    );
  }

  const selected = matching[0];
  if (!selected) throw new OpeningHoursExtractionError("AMBIGUOUS_HOURS_SECTION", "Missing selected hours marker");
  const nextMarker = markers.find((marker) => marker.index > selected.index);
  const end = nextMarker?.index ?? lines.length;
  return lines.slice(selected.index, end).join(" ");
}

function kitchenCutoffFromSuffix(suffix: string | undefined): string | null {
  if (!suffix) return null;
  return new RegExp(
    `(?:kitchen(?:\\s+closes)?(?:\\s+at)?|kjøkken(?:et)?\\s+(?:til|stenger(?:\\s+kl\\.?)?))\\s*(${timeToken})`,
    "iu",
  ).exec(suffix)?.[1] ?? null;
}

function extractStandardHours(visibleText: string): { intervals: readonly RestaurantHoursIntervalInput[]; excerpt: string } | null {
  const candidate = selectStandardHoursCandidate(visibleText).replace(/\s+/g, " ").trim();
  const pattern = new RegExp(
    `(${dayToken})(?:\\s*${dayRangeConnector}\\s*(${dayToken}))?\\s*:\\s*(${timeToken})\\s*[-–]\\s*(${timeToken})(?:\\s*\\(([^)]{1,120})\\))?`,
    "giu",
  );
  const intervals: RestaurantHoursIntervalInput[] = [];
  const excerptParts: string[] = [];

  for (const match of candidate.matchAll(pattern)) {
    const startText = match[1];
    const endText = match[2] ?? startText;
    const opensText = match[3];
    const venueClosesText = match[4];
    const suffix = match[5];
    if (!startText || !endText || !opensText || !venueClosesText) continue;
    const kitchenClose = kitchenCutoffFromSuffix(suffix);
    const closesText = kitchenClose ?? venueClosesText;
    const days = expandWeekdayRange(weekday(startText), weekday(endText));
    intervals.push(...days.map((isoWeekday) => interval(isoWeekday, opensText, closesText)));
    excerptParts.push(match[0]);
  }

  if (intervals.length === 0) return null;
  const unique = new Map<string, RestaurantHoursIntervalInput>();
  for (const item of intervals) {
    unique.set(`${item.isoWeekday}|${item.opensAt}|${item.closesAt}|${item.closesNextDay}`, item);
  }
  return {
    intervals: [...unique.values()].sort((a, b) => a.isoWeekday - b.isoWeekday || a.opensAt.localeCompare(b.opensAt)),
    excerpt: excerptParts.join(" · "),
  };
}

export function extractKitchenOpeningHours(html: string): ExtractedOpeningHours {
  const visibleText = extractVisibleText(html);
  const compact = visibleText.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
  const dinner = extractDinnerHours(compact);
  if (dinner) {
    return {
      intervals: dinner.intervals,
      sourceExcerpt: dinner.excerpt.slice(0, 2000),
      visibleText,
    };
  }

  const standard = extractStandardHours(visibleText);
  if (standard) {
    return {
      intervals: standard.intervals,
      sourceExcerpt: standard.excerpt.slice(0, 2000),
      visibleText,
    };
  }

  throw new OpeningHoursExtractionError(
    "KITCHEN_HOURS_NOT_FOUND",
    "Could not find an explicit source-backed kitchen opening-hours schedule",
  );
}
