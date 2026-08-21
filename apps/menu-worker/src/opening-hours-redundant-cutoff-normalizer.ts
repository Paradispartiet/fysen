import { load } from "cheerio";

export const OPENING_HOURS_REDUNDANT_CUTOFF_NORMALIZER_VERSION =
  "redundant-absolute-v1";

const absoluteKitchenClosePattern =
  /(?:kjøkken(?:et)?\s+(?:til|stenger)|kitchen\s+closes(?:\s+at)?)\s*(?:(?:kl\.?|klokka)\s*)?((?:2[0-3]|[01]?\d)(?:[.:][0-5]\d)?)/giu;
const weekdayMentionPattern =
  /\b(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Mandag|Tirsdag|Onsdag|Torsdag|Fredag|Lørdag|Lordag|Søndag|Sondag|Man|Tir|Ons|Tor|Fre|Lør|Lor|Søn|Son|Mon|Tue|Tues|Wed|Weds|Thu|Thur|Thurs|Fri|Sat|Sun)\b/iu;
const candidateSelector = "p, li, h1, h2, h3, h4, h5, h6, td, th";

function normalizeClock(value: string): string {
  const normalized = value.replace(".", ":");
  const [rawHour = "0", rawMinute = "00"] = normalized.split(":");
  return `${String(Number(rawHour)).padStart(2, "0")}:${String(
    Number(rawMinute),
  ).padStart(2, "0")}`;
}

interface CutoffElement {
  readonly element: unknown;
  readonly text: string;
  readonly values: readonly string[];
  readonly weekdaySpecific: boolean;
}

export function normalizeRedundantAbsoluteKitchenCloseHtml(html: string): string {
  const $ = load(html);
  const elements: CutoffElement[] = [];

  $(candidateSelector).each((_, element) => {
    const text = $(element).text().normalize("NFKC").replace(/\s+/g, " ").trim();
    const values = [...text.matchAll(absoluteKitchenClosePattern)]
      .map((match) => match[1])
      .filter((value): value is string => Boolean(value))
      .map(normalizeClock);
    if (values.length === 0) return;
    elements.push({
      element,
      text,
      values,
      weekdaySpecific: weekdayMentionPattern.test(text),
    });
  });

  const weekdaySpecific = elements.filter((entry) => entry.weekdaySpecific);
  const global = elements.filter((entry) => !entry.weekdaySpecific);
  if (weekdaySpecific.length === 0 || global.length === 0) return html;

  const allValues = new Set(
    elements.flatMap((entry) => [...entry.values]),
  );
  if (allValues.size !== 1) return html;

  for (const entry of weekdaySpecific) {
    const cleaned = entry.text
      .replace(absoluteKitchenClosePattern, "")
      .replace(/\(\s*\)/gu, "")
      .replace(/\s+/gu, " ")
      .trim();
    $(entry.element as Parameters<typeof $>[0]).text(cleaned);
  }

  return $.html();
}
