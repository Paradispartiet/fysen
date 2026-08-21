import { load } from "cheerio";

export const OPENING_HOURS_REDUNDANT_CUTOFF_NORMALIZER_VERSION =
  "redundant-absolute-v4";

const absoluteKitchenClosePattern =
  /(?:kjøkken(?:et)?\s+(?:til|stenger)|kitchen\s+closes(?:\s+at)?)\s*(?:(?:kl\.?|klokka)\s*)?((?:2[0-3]|[01]?\d)(?:[.:][0-5]\d)?)/giu;
const weekdayMentionPattern =
  /\b(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Mandag|Tirsdag|Onsdag|Torsdag|Fredag|Lørdag|Lordag|Søndag|Sondag|Man|Tir|Ons|Tor|Fre|Lør|Lor|Søn|Son|Mon|Tue|Tues|Wed|Weds|Thu|Thur|Thurs|Fri|Sat|Sun)\b/iu;
const hoursMarkerPattern =
  /^(?:opening\s+hours|hours|åpningstider)(?:\s+([^:]{1,80}))?:/iu;
const exactHoursMarkerPattern =
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

interface ScopedTextElements {
  readonly elements: readonly TextElement[];
  readonly markerElement: unknown | null;
}

interface CutoffElement extends TextElement {
  readonly values: readonly string[];
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

function markerForText(text: string, index: number): ScopeMarker | null {
  const prefix = text.match(hoursMarkerPattern);
  if (prefix) return { index, label: prefix[1]?.trim() || null };
  const exact = text.match(exactHoursMarkerPattern);
  return exact ? { index, label: exact[1]?.trim() || null } : null;
}

function scopedElements(
  elements: readonly TextElement[],
  scopeHints: readonly string[],
): ScopedTextElements {
  if (scopeHints.length === 0) {
    return { elements, markerElement: null };
  }

  const markers: ScopeMarker[] = [];
  for (const [index, entry] of elements.entries()) {
    const marker = markerForText(entry.text, index);
    if (!marker) continue;
    let label = marker.label;
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
  if (markers.length < 2) {
    return { elements, markerElement: null };
  }

  const hinted = markers.filter((marker) =>
    markerMatchesScopeHints(marker, scopeHints),
  );
  if (hinted.length !== 1) {
    return { elements, markerElement: null };
  }

  const selected = hinted[0];
  if (!selected) return { elements, markerElement: null };
  const nextMarker = markers.find((marker) => marker.index > selected.index);
  return {
    elements: elements.slice(selected.index, nextMarker?.index ?? elements.length),
    markerElement: elements[selected.index]?.element ?? null,
  };
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
  for (const entry of scoped.elements) {
    const values = [...entry.text.matchAll(absoluteKitchenClosePattern)]
      .map((match) => match[1])
      .filter((value): value is string => Boolean(value))
      .map(normalizeClock);
    if (values.length === 0) continue;
    cutoffs.push({ ...entry, values });
  }

  const occurrenceCount = cutoffs.reduce(
    (sum, entry) => sum + entry.values.length,
    0,
  );
  if (occurrenceCount < 2 || !scoped.markerElement) return html;

  const allValues = new Set(cutoffs.flatMap((entry) => [...entry.values]));
  if (allValues.size !== 1) return html;
  const cutoff = allValues.values().next().value;
  if (!cutoff) return html;

  for (const entry of cutoffs) {
    const cleaned = entry.text
      .replace(absoluteKitchenClosePattern, "")
      .replace(/\(\s*\)/gu, "")
      .replace(/\s+/gu, " ")
      .trim();
    $(entry.element as Parameters<typeof $>[0]).text(cleaned);
  }

  $(scoped.markerElement as Parameters<typeof $>[0]).after(
    `<p>Kjøkken til ${cutoff}</p>`,
  );
  return $.html();
}
