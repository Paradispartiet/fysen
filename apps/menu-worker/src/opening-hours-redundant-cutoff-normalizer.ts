import { load } from "cheerio";

export const OPENING_HOURS_REDUNDANT_CUTOFF_NORMALIZER_VERSION =
  "redundant-absolute-v2";

const absoluteKitchenClosePattern =
  /(?:kjøkken(?:et)?\s+(?:til|stenger)|kitchen\s+closes(?:\s+at)?)\s*(?:(?:kl\.?|klokka)\s*)?((?:2[0-3]|[01]?\d)(?:[.:][0-5]\d)?)/giu;
const weekdayMentionPattern =
  /\b(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Mandag|Tirsdag|Onsdag|Torsdag|Fredag|Lørdag|Lordag|Søndag|Sondag|Man|Tir|Ons|Tor|Fre|Lør|Lor|Søn|Son|Mon|Tue|Tues|Wed|Weds|Thu|Thur|Thurs|Fri|Sat|Sun)\b/iu;
const hoursMarkerPattern =
  /^(?:opening\s+hours|hours|åpningstider)(?:\s+([^:]{1,80}))?:?$/iu;
const candidateSelector = "p, li, h1, h2, h3, h4, h5, h6, td, th";

function normalizeClock(value: string): string {
  const normalized = value.replace(".", ":");
  const [rawHour = "0", rawMinute = "00"] = normalized.split(":");
  return `${String(Number(rawHour)).padStart(2, "0")}:${String(
    Number(rawMinute),
  ).padStart(2, "0")}`;
}

function normalizedScope(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLocaleLowerCase("nb-NO")
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-+|-+$/gu, "");
}

interface TextElement {
  readonly element: unknown;
  readonly text: string;
}

interface ScopeMarker {
  readonly index: number;
  readonly label: string | null;
}

interface CutoffElement extends TextElement {
  readonly values: readonly string[];
  readonly weekdaySpecific: boolean;
}

function markerMatchesScopeHints(
  marker: ScopeMarker,
  scopeHints: readonly string[],
): boolean {
  if (!marker.label) return false;
  const label = normalizedScope(marker.label);
  return scopeHints.some((hint) => {
    const normalizedHint = normalizedScope(hint);
    return (
      Boolean(normalizedHint) &&
      (normalizedHint.includes(label) || label.includes(normalizedHint))
    );
  });
}

function scopedElements(
  elements: readonly TextElement[],
  scopeHints: readonly string[],
): readonly TextElement[] {
  if (scopeHints.length === 0) return elements;

  const markers: ScopeMarker[] = [];
  for (const [index, entry] of elements.entries()) {
    const match = entry.text.match(hoursMarkerPattern);
    if (!match) continue;
    let label = match[1]?.trim() || null;
    if (!label) {
      const next = elements[index + 1]?.text.trim() ?? "";
      if (
        next &&
        next.length <= 80 &&
        !weekdayMentionPattern.test(next) &&
        !/\d{1,2}[.:]\d{2}/u.test(next)
      ) {
        label = next.replace(/:$/u, "").trim() || null;
      }
    }
    markers.push({ index, label });
  }
  if (markers.length < 2) return elements;

  const hinted = markers.filter((marker) =>
    markerMatchesScopeHints(marker, scopeHints),
  );
  if (hinted.length !== 1) return elements;

  const selected = hinted[0];
  if (!selected) return elements;
  const nextMarker = markers.find((marker) => marker.index > selected.index);
  return elements.slice(selected.index, nextMarker?.index ?? elements.length);
}

export function normalizeRedundantAbsoluteKitchenCloseHtml(
  html: string,
  scopeHints: readonly string[] = [],
): string {
  const $ = load(html);
  const textElements: TextElement[] = [];

  $(candidateSelector).each((_, element) => {
    const text = $(element)
      .text()
      .normalize("NFKC")
      .replace(/\s+/gu, " ")
      .trim();
    if (text) textElements.push({ element, text });
  });

  const scoped = scopedElements(textElements, scopeHints);
  const cutoffs: CutoffElement[] = [];
  for (const entry of scoped) {
    const values = [...entry.text.matchAll(absoluteKitchenClosePattern)]
      .map((match) => match[1])
      .filter((value): value is string => Boolean(value))
      .map(normalizeClock);
    if (values.length === 0) continue;
    cutoffs.push({
      ...entry,
      values,
      weekdaySpecific: weekdayMentionPattern.test(entry.text),
    });
  }

  const weekdaySpecific = cutoffs.filter((entry) => entry.weekdaySpecific);
  const global = cutoffs.filter((entry) => !entry.weekdaySpecific);
  if (weekdaySpecific.length === 0 || global.length === 0) return html;

  const allValues = new Set(cutoffs.flatMap((entry) => [...entry.values]));
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
