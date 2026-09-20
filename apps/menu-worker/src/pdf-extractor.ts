import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
  type MenuPriceKind,
} from "@fysen/menu-core";

export const PDF_EXTRACTOR_VERSION = "pdf-text-v17";

export interface ExtractedPdfMenu {
  readonly items: readonly MenuObservedItem[];
  readonly visibleText: string;
  readonly pageCount: number;
  readonly method: "pdf_text";
}

interface TextItemLike {
  readonly str: string;
  readonly transform?: readonly number[];
  readonly width?: number;
  readonly hasEOL?: boolean;
}

interface PdfLine {
  readonly text: string;
  readonly page: number;
}

interface PositionedTextItem {
  readonly text: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly originalIndex: number;
}

interface VisualPdfLine {
  readonly text: string;
  readonly xStart: number;
  readonly xEnd: number;
  readonly y: number;
  readonly originalIndex: number;
}

interface ParsedPrice {
  readonly priceKind: MenuPriceKind;
  readonly priceKroner: number;
  readonly priceMaxKroner: number | null;
}

interface ParsedInlineDish extends ParsedPrice {
  readonly rawName: string;
}

interface ItemCandidate extends ParsedPrice {
  readonly nameLineIndex: number;
  readonly nameContinuationLineIndex: number | null;
  readonly priceLineIndex: number;
  readonly page: number;
  readonly sectionName: string | null;
  readonly rawName: string;
}

const PDF_DOT_LEADER_SUFFIX = /\s*(?:\.\s*){2,}$/u;
const PDF_LEADING_MENU_NUMBER = /^\d{1,3}\s*[.)]\s*/u;
const PDF_NUMBERED_ROW_MARKER = /(?:^|\s)(\d{1,3}\s*[.)]\s+)(?=\p{L})/gu;
const PDF_QUANTITY = /\b\d+(?:[.,]\d+)?\s*(?:kg|gr|g|ml|cl|l)\b/giu;
const PDF_NON_DISH_METADATA = /^(?:set\s+menu|tasting\s+menu|course\s+menu)\b/iu;
const TRAILING_SHARING_TAGLINE =
  /\s+(?:perfekt\s+å\s+dele|perfect\s+for\s+sharing)!?$/iu;
const allergenCodeTokens = new Set([
  "al",
  "b",
  "bl",
  "ca",
  "e",
  "f",
  "g",
  "h",
  "ha",
  "hne",
  "m",
  "ma",
  "mk",
  "n",
  "p",
  "pe",
  "pi",
  "r",
  "se",
  "sem",
  "sk",
  "sl",
  "sn",
  "so",
  "su",
  "sy",
  "va",
  "wa",
]);

const pdfAllergenMetadataCodes = new Set([
  ...allergenCodeTokens,
  "by",
  "c",
  "hn",
  "lu",
  "s",
  "sp",
  "vn",
]);

function normalizeLine(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}

function isTextItem(value: unknown): value is TextItemLike {
  return (
    typeof value === "object" &&
    value !== null &&
    "str" in value &&
    typeof (value as { str?: unknown }).str === "string"
  );
}

function reconstructSequentialLines(
  items: readonly unknown[],
  page: number,
): readonly PdfLine[] {
  const lines: PdfLine[] = [];
  let buffer = "";
  let lastY: number | null = null;
  let lastRight: number | null = null;

  const flush = (): void => {
    const text = normalizeLine(buffer);
    if (text) lines.push({ text, page });
    buffer = "";
    lastY = null;
    lastRight = null;
  };

  for (const rawItem of items) {
    if (!isTextItem(rawItem)) continue;
    const text = normalizeLine(rawItem.str);
    if (!text) {
      if (rawItem.hasEOL) flush();
      continue;
    }

    const transform = rawItem.transform;
    const x = transform && transform.length >= 6 ? Number(transform[4]) : null;
    const y = transform && transform.length >= 6 ? Number(transform[5]) : null;
    const width = Number(rawItem.width ?? 0);
    const movedLine = y !== null && lastY !== null && Math.abs(y - lastY) > 2;
    const movedBack = x !== null && lastRight !== null && x + 4 < lastRight - 24;
    const interFragmentGap =
      x !== null && lastRight !== null ? x - lastRight : null;
    const largeGap = interFragmentGap !== null && interFragmentGap > 140;

    if (buffer && (movedLine || movedBack || largeGap)) flush();
    if (
      buffer &&
      !buffer.endsWith(" ") &&
      (interFragmentGap === null || interFragmentGap > 2)
    ) {
      buffer += " ";
    }
    buffer += text;
    if (y !== null) lastY = y;
    if (x !== null) lastRight = x + Math.max(width, 0);
    if (rawItem.hasEOL) flush();
  }
  flush();
  return lines;
}

function percentile(values: readonly number[], ratio: number): number {
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.max(
    0,
    Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * ratio)),
  );
  return sorted[index] ?? 0;
}

function robustSpread(values: readonly number[]): number {
  if (values.length < 2) return 0;
  return percentile(values, 0.9) - percentile(values, 0.1);
}

function positionedTextItems(items: readonly unknown[]): readonly PositionedTextItem[] | null {
  const textItems = items.filter(isTextItem).filter((item) => normalizeLine(item.str));
  const positioned: PositionedTextItem[] = [];

  for (const [originalIndex, item] of textItems.entries()) {
    const transform = item.transform;
    if (!transform || transform.length < 6) return null;
    const x = Number(transform[4]);
    const y = Number(transform[5]);
    const width = Number(item.width ?? 0);
    if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(width))
      return null;
    positioned.push({
      text: normalizeLine(item.str),
      x,
      y,
      width: Math.max(width, 0),
      originalIndex,
    });
  }

  return positioned.length >= 4 ? positioned : null;
}

function visualPdfLines(items: readonly PositionedTextItem[]): readonly VisualPdfLine[] {
  const sorted = [...items].sort((left, right) => {
    const yDelta = right.y - left.y;
    if (Math.abs(yDelta) > 2) return yDelta;
    if (left.x !== right.x) return left.x - right.x;
    return left.originalIndex - right.originalIndex;
  });
  const lines: VisualPdfLine[] = [];
  let current: PositionedTextItem[] = [];

  const flush = (): void => {
    if (current.length === 0) return;
    const row = [...current].sort(
      (left, right) => left.x - right.x || left.originalIndex - right.originalIndex,
    );
    let segment: PositionedTextItem[] = [];

    const flushSegment = (): void => {
      if (segment.length === 0) return;
      let text = "";
      let lastRight: number | null = null;
      for (const item of segment) {
        if (
          text &&
          lastRight !== null &&
          item.x - lastRight > 2 &&
          !text.endsWith(" ")
        ) {
          text += " ";
        }
        text += item.text;
        lastRight = item.x + item.width;
      }
      const normalized = normalizeLine(text);
      if (normalized) {
        lines.push({
          text: normalized,
          xStart: Math.min(...segment.map((item) => item.x)),
          xEnd: Math.max(...segment.map((item) => item.x + item.width)),
          y: segment.reduce((sum, item) => sum + item.y, 0) / segment.length,
          originalIndex: Math.min(...segment.map((item) => item.originalIndex)),
        });
      }
      segment = [];
    };

    for (const item of row) {
      const previous = segment[segment.length - 1];
      if (previous && item.x - (previous.x + previous.width) > 140)
        flushSegment();
      segment.push(item);
    }
    flushSegment();
    current = [];
  };

  for (const item of sorted) {
    const anchor = current[0];
    if (anchor && Math.abs(item.y - anchor.y) > 2) flush();
    current.push(item);
  }
  flush();
  return lines;
}

function shouldUseVisualReadingOrder(lines: readonly VisualPdfLine[]): boolean {
  if (lines.length < 4) return false;
  const xStarts = lines.map((line) => line.xStart);
  const centers = lines.map((line) => (line.xStart + line.xEnd) / 2);
  const singleColumn =
    robustSpread(xStarts) <= 90 || robustSpread(centers) <= 110;
  if (!singleColumn) return false;

  const originalOrder = [...lines].sort(
    (left, right) => left.originalIndex - right.originalIndex,
  );
  let upwardTransitions = 0;
  for (let index = 1; index < originalOrder.length; index += 1) {
    const previous = originalOrder[index - 1];
    const current = originalOrder[index];
    if (previous && current && current.y > previous.y + 4)
      upwardTransitions += 1;
  }
  const transitions = Math.max(1, originalOrder.length - 1);
  return upwardTransitions >= 2 && upwardTransitions / transitions >= 0.2;
}

function reconstructLines(items: readonly unknown[], page: number): readonly PdfLine[] {
  const sequential = reconstructSequentialLines(items, page);
  const positioned = positionedTextItems(items);
  if (!positioned) return sequential;
  const visual = visualPdfLines(positioned);
  if (!shouldUseVisualReadingOrder(visual)) return sequential;
  return visual.map((line) => ({ text: line.text, page }));
}

function sectionHeading(line: string): string | null {
  const normalized = normalizeLine(line);
  if (
    !normalized ||
    /[&/]$/u.test(normalized) ||
    /\d{1,4}\s*(?:,-|kr\.?|nok)?\s*$/iu.test(normalized)
  )
    return null;

  const bilingual = normalized.split(/\s*\/\/\s*/u);
  if (bilingual.length === 2) {
    const left = bilingual[0]?.trim() ?? "";
    const right = bilingual[1]?.trim() ?? "";
    if (
      left.length >= 2 &&
      left.length <= 80 &&
      right.length >= 2 &&
      right.length <= 80 &&
      /\p{L}/u.test(left) &&
      /\p{L}/u.test(right)
    ) {
      return left.replace(/[ .-]+$/u, "");
    }
  }

  const match = normalized.match(/^([A-ZÆØÅÀÈÉÌÒÙÜ][A-ZÆØÅÀÈÉÌÒÙÜ &'’.-]{2,80})(?:\s+[A-ZÆØÅ]?[a-zæøåàèéìòùü].*)?$/u);
  if (!match?.[1]) return null;
  const section = match[1].trim().replace(/[ .-]+$/u, "");
  const letters = section.replace(/[^A-ZÆØÅÀÈÉÌÒÙÜ]/gu, "");
  if (letters.length < 3) return null;
  if (/^(OLIVIA|MENY|MENU|ALLERGENER|ALLERGENS|DRIKKE|BEVERAGES)$/u.test(section)) return null;
  return section;
}

function validPriceKroner(value: string, minimum = 40): number | null {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= minimum && parsed <= 10_000 ? parsed : null;
}

function parsedPrice(first: string, second?: string, minimum = 40): ParsedPrice | null {
  const firstPrice = validPriceKroner(first, minimum);
  if (firstPrice === null) return null;
  if (!second) {
    return { priceKind: "exact", priceKroner: firstPrice, priceMaxKroner: null };
  }
  const secondPrice = validPriceKroner(second, minimum);
  if (secondPrice === null) return null;
  const low = Math.min(firstPrice, secondPrice);
  const high = Math.max(firstPrice, secondPrice);
  if (low === high) {
    return { priceKind: "exact", priceKroner: low, priceMaxKroner: null };
  }
  return { priceKind: "multiple", priceKroner: low, priceMaxKroner: high };
}

function stripAllergenSuffix(value: string): string {
  const normalized = normalizeLine(value)
    .replace(/\s+(?:[a-zæøå]{1,3}\s*,\s*){1,12}[a-zæøå]{1,3}$/iu, "")
    .replace(/\s+(?:vegetariano|vegano)$/iu, "")
    .trim();
  const tokens = normalized.split(/\s+/u);
  let end = tokens.length;
  while (end > 0) {
    const rawToken = tokens[end - 1] ?? "";
    const token = rawToken.replace(/[(),.;:]+$/gu, "");
    if (!/^[A-ZÆØÅ]{1,3}$/u.test(token)) break;
    if (!allergenCodeTokens.has(token.toLocaleLowerCase("nb-NO"))) break;
    end -= 1;
  }
  if (end === 0 || end === tokens.length) return normalized;
  return tokens.slice(0, end).join(" ").trim();
}

function stripDotLeaderSuffix(value: string): string {
  return normalizeLine(value).replace(PDF_DOT_LEADER_SUFFIX, "").trim();
}

function canonicalPdfDishName(value: string): string {
  return stripDotLeaderSuffix(stripAllergenSuffix(value))
    .replace(PDF_LEADING_MENU_NUMBER, "")
    .trim();
}

function looksLikeParentheticalAllergenMetadata(value: string): boolean {
  const normalized = normalizeLine(value);
  const match = normalized.match(/^\(([^)]{1,120})\)(?:\s*-\s*.*)?$/u);
  if (!match?.[1]) return false;
  const tokens = match[1]
    .replace(/[.,;/+&]+/gu, " ")
    .split(/\s+/u)
    .map((token) => token.toLocaleLowerCase("nb-NO"))
    .filter(Boolean);
  return (
    tokens.length > 0 &&
    tokens.length <= 12 &&
    tokens.every((token) => pdfAllergenMetadataCodes.has(token))
  );
}

function looksLikeLabeledAllergenMetadata(value: string): boolean {
  return /^(?:allergener?|allergens?)\s*:/iu.test(normalizeLine(value));
}

function looksLikeAllergenMetadata(value: string): boolean {
  return (
    looksLikeParentheticalAllergenMetadata(value) ||
    looksLikeLabeledAllergenMetadata(value)
  );
}

function looksLikeAllergenCodeOnly(value: string): boolean {
  if (looksLikeParentheticalAllergenMetadata(value)) return true;
  const tokens = normalizeLine(value)
    .replace(/[.,;:]+$/u, "")
    .split(/[\s,/+]+/u)
    .map((token) => token.toLocaleLowerCase("nb-NO"))
    .filter(Boolean);
  return (
    tokens.length > 0 &&
    tokens.length <= 12 &&
    tokens.every((token) => allergenCodeTokens.has(token))
  );
}

function looksLikeQuantityPricingMetadata(value: string): boolean {
  const normalized = normalizeLine(value);
  if (/^\d{1,3}\s*(?:stk\.?|pieces?|pcs?\.?)\s*\/?$/iu.test(normalized))
    return true;
  const quantities = normalized.match(PDF_QUANTITY) ?? [];
  return quantities.length >= 2;
}

function looksLikeDishName(value: string): boolean {
  const text = normalizeLine(value);
  if (text.length < 2 || text.length > 220 || !/\p{L}/u.test(text)) return false;
  if (/https?:\/\/|www\.|@/iu.test(text)) return false;
  if (/©|™|\bcopyright\b|\ball rights reserved\b/iu.test(text)) return false;
  if (PDF_NON_DISH_METADATA.test(text)) return false;
  if (looksLikeAllergenCodeOnly(text) || looksLikeQuantityPricingMetadata(text)) return false;
  if (/^(allerg|contains|inneholder|priser|prices|kjøkken|opening|åpning|mandag|tirsdag|onsdag|torsdag|fredag|lørdag|søndag)\b/iu.test(text)) return false;
  return true;
}

const wrappedDishQualifiers = new Set([
  "spicy",
  "vegetar",
  "vegetarian",
  "vegansk",
  "vegan",
  "crispy",
  "fritert",
  "fried",
  "grillet",
  "grilled",
]);

function isWrappedDishQualifier(value: string): boolean {
  return wrappedDishQualifiers.has(normalizeDishName(canonicalPdfDishName(value)));
}

const pricePrefix = "(?:(?:kr\\.?|nok)\\s*)?";
const priceSuffix = "(?:\\s*(?:,-|kr\\.?|nok))?";
const perItemPriceSuffix =
  "(?:\\s*\\((?:pr\\.?\\s*stk\\.?|per\\s+(?:piece|item|stk\\.?)|each)\\))?";
const standalonePrice = new RegExp(
  `^${pricePrefix}([1-9]\\d{1,3})${priceSuffix}(?:\\s*\\/\\s*${pricePrefix}([1-9]\\d{1,3})${priceSuffix})?$`,
  "iu",
);
const trailingPrice = new RegExp(
  `\\s+${pricePrefix}([1-9]\\d{1,3})${priceSuffix}(?:\\s*\\/\\s*${pricePrefix}([1-9]\\d{1,3})${priceSuffix})?${perItemPriceSuffix}$`,
  "iu",
);

const PRICE_CARRYING_METADATA_PREFIX =
  /^(?:(?:allergener?|allergens?)\s*:|served\s+per\s+\d+(?:[.,]\d+)?\s*g\b|(?:halv|half)(?:\s+\d+(?:[.,]\d+)?\s*g)?\s*\/\s*(?:hel|whole)(?:\s+\d+(?:[.,]\d+)?\s*g)?\b|\d+\s*(?:pcs?|psc|pieces?|stk\.?)\s*\/\s*\d+\s*(?:pcs?|psc|pieces?|stk\.?)\b)/iu;

function normalizeSplitPerKilogramPrice(line: string): string {
  const match = /^(.*\b(?:per|pr\.?)\s+kg\s+)([1-9]\d{0,2})\s+(\d{2,3})$/iu.exec(line);
  if (!match?.[1] || !match[2] || !match[3]) return line;
  const combined = `${match[2]}${match[3]}`;
  return validPriceKroner(combined) === null ? line : `${match[1]}${combined}`;
}

function parsePriceCarryingMetadataLine(line: string): ParsedPrice | null {
  const normalizedPriceLine = normalizeSplitPerKilogramPrice(line);
  const match = trailingPrice.exec(normalizedPriceLine);
  if (!match?.[1] || match.index <= 0) return null;
  const prefix = normalizeLine(normalizedPriceLine.slice(0, match.index))
    .replace(/[_–—-]+$/gu, "")
    .trim();
  if (!PRICE_CARRYING_METADATA_PREFIX.test(prefix)) return null;
  const explicitPriceMarker = /(?:kr\.?|nok|,-)/iu.test(match[0]);
  return parsedPrice(match[1], match[2], explicitPriceMarker ? 30 : 40);
}

function parseInlineDish(line: string): ParsedInlineDish | null {
  const match = trailingPrice.exec(line);
  if (!match?.[1] || match.index <= 0) return null;
  const explicitPriceMarker = /(?:kr\.?|nok|,-)/iu.test(match[0]);
  const price = parsedPrice(match[1], match[2], explicitPriceMarker ? 30 : 40);
  if (!price) return null;
  const rawName = canonicalPdfDishName(line.slice(0, match.index));
  if (!looksLikeDishName(rawName)) return null;
  return { rawName, ...price };
}

function precedingConjunctionDishName(
  lines: readonly PdfLine[],
  lineIndex: number,
  inlineName: string,
): string | null {
  if (lineIndex <= 0) return null;
  const previousLine = lines[lineIndex - 1];
  const currentLine = lines[lineIndex];
  if (!previousLine || !currentLine || previousLine.page !== currentLine.page)
    return null;
  const previous = normalizeLine(previousLine.text);
  if (!/&$/u.test(previous)) return null;
  const prefix = canonicalPdfDishName(previous);
  if (!looksLikeDishName(prefix)) return null;
  const combined = normalizeLine(`${prefix} ${inlineName}`);
  return looksLikeDishName(combined) ? combined : null;
}

function splitNumberedInlineDishes(line: string): readonly ParsedInlineDish[] | null {
  const positions: number[] = [];
  for (const match of line.matchAll(PDF_NUMBERED_ROW_MARKER)) {
    const offset = match[0].startsWith(" ") ? 1 : 0;
    positions.push(match.index + offset);
  }
  if (positions.length < 2 || positions[0] !== 0) return null;

  const segments = positions.map((start, index) =>
    line.slice(start, positions[index + 1] ?? line.length).trim(),
  );
  const parsed = segments.map(parseInlineDish);
  if (parsed.some((entry) => entry === null)) return null;
  return parsed as readonly ParsedInlineDish[];
}

function wrappedName(
  prefix: string,
  lines: readonly PdfLine[],
  prefixLineIndex: number,
): { readonly name: string; readonly continuationLineIndex: number } | null {
  if (!isWrappedDishQualifier(prefix)) return null;
  const continuationIndex = prefixLineIndex + 1;
  const continuation = lines[continuationIndex]?.text ?? "";
  if (!continuation || standalonePrice.test(continuation) || parseInlineDish(continuation)) return null;
  if (!looksLikeDishName(continuation)) return null;
  if (lines[continuationIndex]?.page !== lines[prefixLineIndex]?.page) return null;
  return {
    name: normalizeLine(`${canonicalPdfDishName(prefix)} ${canonicalPdfDishName(continuation)}`),
    continuationLineIndex: continuationIndex,
  };
}

function commaContinuedDishName(
  prefix: string,
  lines: readonly PdfLine[],
  prefixLineIndex: number,
): { readonly name: string; readonly continuationLineIndex: number } | null {
  const canonicalPrefix = canonicalPdfDishName(prefix);
  if (!/,$/u.test(canonicalPrefix)) return null;

  const continuationIndex = prefixLineIndex + 1;
  const continuationLine = lines[continuationIndex];
  const prefixLine = lines[prefixLineIndex];
  if (
    !continuationLine ||
    !prefixLine ||
    continuationLine.page !== prefixLine.page
  )
    return null;

  const continuation = normalizeLine(continuationLine.text);
  if (
    !/^[a-zæøå]/u.test(continuation) ||
    standalonePrice.test(continuation) ||
    parseInlineDish(continuation) ||
    looksLikeParentheticalAllergenMetadata(continuation) ||
    sectionHeading(continuation)
  )
    return null;

  const canonicalContinuation = canonicalPdfDishName(continuation);
  if (!looksLikeDishName(canonicalContinuation)) return null;

  return {
    name: normalizeLine(`${canonicalPrefix} ${canonicalContinuation}`),
    continuationLineIndex: continuationIndex,
  };
}

function looksLikeSharingTaggedDishTitle(value: string): boolean {
  const text = normalizeLine(value);
  if (!TRAILING_SHARING_TAGLINE.test(text)) return false;
  const title = text.replace(TRAILING_SHARING_TAGLINE, "").trim();
  return /^[A-ZÆØÅÀÈÉÌÒÙÜ]/u.test(title) && looksLikeDishName(title);
}

function looksLikeStandaloneDescriptionLine(value: string): boolean {
  const text = normalizeLine(value);
  if (!text || !/\p{L}/u.test(text)) return false;
  if (looksLikeSharingTaggedDishTitle(text)) return false;
  const words = text.split(/\s+/u).filter(Boolean);
  return (
    /^[a-zæøå]/u.test(text) ||
    /[.!?]$/u.test(text) ||
    (words.length >= 7 && /[,;]/u.test(text))
  );
}

function previousStandaloneDishNameLineIndex(
  lines: readonly PdfLine[],
  priceLineIndex: number,
): number | null {
  const priceLine = lines[priceLineIndex];
  if (!priceLine) return null;
  let crossedAllergenMetadata = false;

  for (
    let index = priceLineIndex - 1;
    index >= Math.max(0, priceLineIndex - 6);
    index -= 1
  ) {
    const candidateLine = lines[index];
    if (!candidateLine || candidateLine.page !== priceLine.page) break;
    const text = normalizeLine(candidateLine.text);
    if (!text) continue;
    if (standalonePrice.test(text) || parseInlineDish(text)) return null;
    if (looksLikeAllergenMetadata(text)) {
      crossedAllergenMetadata = true;
      continue;
    }
    if (!crossedAllergenMetadata && looksLikeStandaloneDescriptionLine(text))
      continue;

    const rawName = canonicalPdfDishName(text);
    if (/^[a-zæøå]/u.test(rawName)) continue;
    if (!looksLikeDishName(rawName)) return null;
    return index;
  }
  return null;
}

function hasDescriptionWrappedStandalonePrice(
  lines: readonly PdfLine[],
  titleLineIndex: number,
): boolean {
  const titleLine = lines[titleLineIndex];
  if (!titleLine) return false;
  const title = canonicalPdfDishName(titleLine.text);
  if (!looksLikeDishName(title)) return false;

  let sawDescription = false;
  for (
    let index = titleLineIndex + 1;
    index <= Math.min(lines.length - 1, titleLineIndex + 5);
    index += 1
  ) {
    const candidate = lines[index];
    if (!candidate || candidate.page !== titleLine.page) return false;
    const text = normalizeLine(candidate.text);
    if (!text) continue;
    if (standalonePrice.test(text)) return sawDescription;
    if (parseInlineDish(text)) return false;
    if (looksLikeAllergenMetadata(text)) continue;
    if (!looksLikeStandaloneDescriptionLine(text)) return false;
    sawDescription = true;
  }
  return false;
}

function collectCandidates(lines: readonly PdfLine[]): readonly ItemCandidate[] {
  const candidates: ItemCandidate[] = [];
  const consumedWrappedNameLines = new Set<number>();
  let currentSection: string | null = null;

  for (let index = 0; index < lines.length; index += 1) {
    if (consumedWrappedNameLines.has(index)) continue;

    const line = lines[index]?.text ?? "";
    const nextLine = lines[index + 1]?.text ?? "";
    const metadataPrice = parsePriceCarryingMetadataLine(line);
    const splitInline = metadataPrice ? null : splitNumberedInlineDishes(line);
    const inline = metadataPrice || splitInline ? null : parseInlineDish(line);
    const standaloneName = canonicalPdfDishName(line);
    const nextLineIsSamePage =
      lines[index]?.page !== undefined &&
      lines[index + 1]?.page === lines[index]?.page;
    const isStandalonePricedDishName =
      looksLikeDishName(standaloneName) &&
      ((nextLineIsSamePage && standalonePrice.test(nextLine)) ||
        hasDescriptionWrappedStandalonePrice(lines, index));
    const section =
      isStandalonePricedDishName || metadataPrice || inline || splitInline
        ? null
        : sectionHeading(line);
    if (section) {
      currentSection = section;
      continue;
    }

    if (metadataPrice) {
      const previousIndex = previousStandaloneDishNameLineIndex(lines, index);
      if (previousIndex !== null) {
        const previous = lines[previousIndex]?.text ?? "";
        const rawName = canonicalPdfDishName(previous);
        if (looksLikeDishName(rawName)) {
          candidates.push({
            nameLineIndex: previousIndex,
            nameContinuationLineIndex: null,
            priceLineIndex: index,
            page: lines[previousIndex]?.page ?? lines[index]?.page ?? 1,
            sectionName: currentSection,
            rawName,
            ...metadataPrice,
          });
        }
      }
      continue;
    }

    if (splitInline) {
      for (const split of splitInline) {
        candidates.push({
          nameLineIndex: index,
          nameContinuationLineIndex: null,
          priceLineIndex: index,
          page: lines[index]?.page ?? 1,
          sectionName: currentSection,
          rawName: split.rawName,
          priceKind: split.priceKind,
          priceKroner: split.priceKroner,
          priceMaxKroner: split.priceMaxKroner,
        });
      }
      continue;
    }

    const standalone = line.match(standalonePrice);
    if (standalone?.[1]) {
      const price = parsedPrice(standalone[1], standalone[2]);
      if (price && index > 0) {
        const previousIndex = previousStandaloneDishNameLineIndex(lines, index);
        if (previousIndex === null) continue;
        const previous = lines[previousIndex]?.text ?? "";
        const rawName = canonicalPdfDishName(previous);
        if (looksLikeDishName(rawName)) {
          const continuation =
            wrappedName(rawName, lines, previousIndex) ??
            commaContinuedDishName(rawName, lines, previousIndex);
          if (isWrappedDishQualifier(rawName) && !continuation) continue;
          if (continuation)
            consumedWrappedNameLines.add(continuation.continuationLineIndex);
          candidates.push({
            nameLineIndex: previousIndex,
            nameContinuationLineIndex: continuation?.continuationLineIndex ?? null,
            priceLineIndex: index,
            page: lines[previousIndex]?.page ?? lines[index]?.page ?? 1,
            sectionName: currentSection,
            rawName: continuation?.name ?? rawName,
            ...price,
          });
        }
      }
      continue;
    }

    if (inline) {
      const conjunctionName = precedingConjunctionDishName(
        lines,
        index,
        inline.rawName,
      );
      const continuation = conjunctionName
        ? null
        : wrappedName(inline.rawName, lines, index);
      if (isWrappedDishQualifier(inline.rawName) && !continuation) continue;
      if (continuation)
        consumedWrappedNameLines.add(continuation.continuationLineIndex);
      candidates.push({
        nameLineIndex: conjunctionName ? index - 1 : index,
        nameContinuationLineIndex: continuation?.continuationLineIndex ?? null,
        priceLineIndex: index,
        page: lines[index]?.page ?? 1,
        sectionName: currentSection,
        rawName: conjunctionName ?? continuation?.name ?? inline.rawName,
        priceKind: inline.priceKind,
        priceKroner: inline.priceKroner,
        priceMaxKroner: inline.priceMaxKroner,
      });
    }
  }

  return candidates;
}

function descriptionForCandidate(
  lines: readonly PdfLine[],
  candidate: ItemCandidate,
  nextCandidateLine: number,
): string | null {
  const parts: string[] = [];
  const nameEnd = candidate.nameContinuationLineIndex ?? candidate.nameLineIndex;
  for (let index = nameEnd + 1; index < candidate.priceLineIndex; index += 1) {
    const text = lines[index]?.text ?? "";
    if (!text || looksLikeAllergenMetadata(text)) continue;
    if (!looksLikeStandaloneDescriptionLine(text)) continue;
    parts.push(text);
  }

  const contentStart =
    Math.max(
      candidate.priceLineIndex,
      candidate.nameContinuationLineIndex ?? candidate.priceLineIndex,
    ) + 1;
  for (let index = contentStart; index < Math.min(nextCandidateLine, contentStart + 6); index += 1) {
    const text = lines[index]?.text ?? "";
    if (!text || sectionHeading(text)) break;
    if (standalonePrice.test(text)) break;
    if (parseInlineDish(text)) break;
    if (/^(allergener|allergens|vegetariano|vegano)\b/iu.test(text)) break;
    if (/https?:\/\/|www\.|@/iu.test(text)) break;
    parts.push(text);
  }
  const description = normalizeLine(parts.join(" "));
  return description || null;
}

export function extractMenuItemsFromPdfPages(
  pages: readonly (readonly string[])[],
): readonly MenuObservedItem[] {
  const pdfLines = pages.flatMap((lines, pageIndex) =>
    lines
      .map(normalizeLine)
      .filter(Boolean)
      .map((text) => ({ text, page: pageIndex + 1 })),
  );
  return buildItems(pdfLines);
}

export function extractMenuItemsFromPdfLines(
  lines: readonly string[],
): readonly MenuObservedItem[] {
  return extractMenuItemsFromPdfPages([lines]);
}

function buildItems(lines: readonly PdfLine[]): readonly MenuObservedItem[] {
  const candidates = collectCandidates(lines);
  const items: MenuObservedItem[] = [];

  for (const [position, candidate] of candidates.entries()) {
    const nextCandidateLine = candidates[position + 1]?.nameLineIndex ?? lines.length;
    const name = canonicalPdfDishName(candidate.rawName);
    if (!looksLikeDishName(name)) continue;
    const sourceKey = createMenuItemSourceKey(name, candidate.sectionName);
    const description = descriptionForCandidate(lines, candidate, nextCandidateLine);
    const observedPrice = candidate.priceMaxKroner === null
      ? `${candidate.priceKroner} NOK`
      : `${candidate.priceKroner} / ${candidate.priceMaxKroner} NOK`;
    const excerpt = [candidate.sectionName, name, observedPrice, description]
      .filter((value): value is string => Boolean(value))
      .join(" — ")
      .slice(0, 1000);

    items.push({
      sourceKey,
      name,
      normalizedName: normalizeDishName(name),
      description,
      sectionName: candidate.sectionName,
      priceMinor: candidate.priceKroner * 100,
      priceKind: candidate.priceKind,
      priceMaxMinor: candidate.priceMaxKroner === null ? null : candidate.priceMaxKroner * 100,
      currency: "NOK",
      position,
      extractionMethod: "pdf_text",
      confidence: candidate.priceKind === "multiple" ? 0.84 : 0.86,
      sourceExcerpt: `page ${candidate.page}: ${excerpt}`,
    });
  }
  return items;
}

export async function extractPdfMenu(bytes: Uint8Array): Promise<ExtractedPdfMenu> {
  if (bytes.length < 5 || Buffer.from(bytes.subarray(0, 5)).toString("ascii") !== "%PDF-") {
    throw new Error("PDF source did not start with a PDF signature");
  }

  const loadingTask = getDocument({ data: bytes, useSystemFonts: true });
  const document = await loadingTask.promise;
  const pageCount = document.numPages;
  const lines: PdfLine[] = [];
  try {
    for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
      const page = await document.getPage(pageNumber);
      const content = await page.getTextContent();
      for (const rawItem of content.items) {
        if (
          isTextItem(rawItem) &&
          /(?:BO|EUF|CHAMPAG|IJON|PROFI|ÉARNAISE|BÉARNAISE|BEARNAISE|ARNAISE)/iu.test(
            rawItem.str,
          )
        ) {
          console.log(
            "[pdf-fragment-diagnostic]",
            JSON.stringify({
              page: pageNumber,
              str: rawItem.str,
              transform: rawItem.transform ?? null,
              width: rawItem.width ?? null,
              hasEOL: rawItem.hasEOL ?? null,
            }),
          );
        }
      }
      lines.push(...reconstructLines(content.items, pageNumber));
      page.cleanup();
    }
  } finally {
    await loadingTask.destroy();
  }

  const items = buildItems(lines);
  return {
    items,
    visibleText: lines.map((line) => line.text).join("\n").slice(0, 200_000),
    pageCount,
    method: "pdf_text",
  };
}
