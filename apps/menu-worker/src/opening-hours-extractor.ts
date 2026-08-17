import { load } from "cheerio";
import type { RestaurantHoursIntervalInput } from "@fysen/database";

export const OPENING_HOURS_EXTRACTOR_VERSION = "hours-visible-v1";

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
const timeToken = "[0-2]?\\d[.:][0-5]\\d";

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
  const [hourText, minuteText] = normalized.split(":");
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

export function extractKitchenOpeningHours(html: string): ExtractedOpeningHours {
  const visibleText = extractVisibleText(html);
  const compact = visibleText.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
  const range = new RegExp(
    `\\bDinner\\s+(${dayToken})\\s*[-–]\\s*(${dayToken})\\s+(${timeToken})\\s*[-–]\\s*(late|${timeToken})`,
    "iu",
  ).exec(compact);

  if (!range) {
    throw new OpeningHoursExtractionError(
      "DINNER_HOURS_NOT_FOUND",
      "Could not find an explicit dinner weekday range with a start time",
    );
  }

  const startDayText = range[1];
  const endDayText = range[2];
  const opensText = range[3];
  const advertisedCloseText = range[4];
  if (!startDayText || !endDayText || !opensText || !advertisedCloseText) {
    throw new OpeningHoursExtractionError("INCOMPLETE_HOURS_MATCH", "Dinner hours match was incomplete");
  }

  const excerptStart = Math.max(0, range.index - 40);
  const excerptEnd = Math.min(compact.length, range.index + range[0].length + 180);
  const sourceExcerpt = compact.slice(excerptStart, excerptEnd);
  const kitchenClose = new RegExp(`kitchen\\s+closes\\s+at\\s+(${timeToken})`, "iu").exec(sourceExcerpt)?.[1] ?? null;

  if (advertisedCloseText.toLocaleLowerCase("en-US") === "late" && !kitchenClose) {
    throw new OpeningHoursExtractionError(
      "AMBIGUOUS_CLOSE_TIME",
      "Dinner closes at an ambiguous time and no explicit kitchen close was found",
    );
  }

  const opensAt = parseClock(opensText);
  const closesAt = parseClock(kitchenClose ?? advertisedCloseText);
  const closesNextDay = closesAt <= opensAt;
  const days = expandWeekdayRange(weekday(startDayText), weekday(endDayText));
  const intervals = days.map((isoWeekday) => ({
    isoWeekday,
    opensAt,
    closesAt,
    closesNextDay,
  }));

  return {
    intervals,
    sourceExcerpt: sourceExcerpt.slice(0, 2000),
    visibleText,
  };
}
