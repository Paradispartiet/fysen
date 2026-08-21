import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
  type MenuPriceKind,
} from "@fysen/menu-core";

export const PDF_EXTRACTOR_VERSION = "pdf-text-v8";

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

function reconstructLines(items: readonly unknown[], page: number): readonly PdfLine[] {
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
    const largeGap = x !== null && lastRight !== null && x - lastRight > 140;

    if (buffer && (movedLine || movedBack || largeGap)) flush();
    if (buffer && !buffer.endsWith(" ")) buffer += " ";
    buffer += text;
    if (y !== null) lastY = y;
    if (x !== null) lastRight = x + Math.max(width, 0);
    if (rawItem.hasEOL) flush();
  }
  flush();
  return lines;
}

function sectionHeading(line: string): string | null {
  const normalized = normalizeLine(line);
  if (!normalized || /\d{1,4}\s*(?:,-|kr\.?|nok)?\s*$/iu.test(normalized)) return null;

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

function looksLikeAllergenCodeOnly(value: string): boolean {
  const tokens = normalizeLine(value)
    .replace(/[.,;:]+$/u, "")
    .split(/[\s,/+]+/u)
    .map((token) => token.toLocaleLowerCase("nb-NO"))
    .filter(Boolean);
  return tokens.length > 0 && tokens.length <= 12 && tokens.every((token) => allergenCodeTokens.has(token));
}

function looksLikeQuantityPricingMetadata(value: string): boolean {
  const quantities = normalizeLine(value).match(PDF_QUANTITY) ?? [];
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
const standalonePrice = new RegExp(
  `^${pricePrefix}([1-9]\\d{1,3})(?:\\s*\\/\\s*([1-9]\\d{1,3}))?${priceSuffix}$`,
  "iu",
);
const trailingPrice = new RegExp(
  `\\s+${pricePrefix}([1-9]\\d{1,3})(?:\\s*\\/\\s*([1-9]\\d{1,3}))?${priceSuffix}$`,
  "iu",
);

function parseInlineDish(line: string): ParsedInlineDish | null {
  const match = trailingPrice.exec(line);
  if (!match?.[1] || match.index <= 0) return null;
  const explicitCurrency = /(?:kr\.?|nok)/iu.test(match[0]);
  const price = parsedPrice(match[1], match[2], explicitCurrency ? 30 : 40);
  if (!price) return null;
  const rawName = canonicalPdfDishName(line.slice(0, match.index));
  if (!looksLikeDishName(rawName)) return null;
  return { rawName, ...price };
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

function collectCandidates(lines: readonly PdfLine[]): readonly ItemCandidate[] {
  const candidates: ItemCandidate[] = [];
  const consumedWrappedNameLines = new Set<number>();
  let currentSection: string | null = null;

  for (let index = 0; index < lines.length; index += 1) {
    if (consumedWrappedNameLines.has(index)) continue;

    const line = lines[index]?.text ?? "";
    const nextLine = lines[index + 1]?.text ?? "";
    const splitInline = splitNumberedInlineDishes(line);
    const inline = splitInline ? null : parseInlineDish(line);
    const standaloneName = canonicalPdfDishName(line);
    const isStandalonePricedDishName = looksLikeDishName(standaloneName) && standalonePrice.test(nextLine);
    const section = isStandalonePricedDishName || inline || splitInline ? null : sectionHeading(line);
    if (section) {
      currentSection = section;
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
        const previousIndex = index - 1;
        const previous = lines[previousIndex]?.text ?? "";
        const rawName = canonicalPdfDishName(previous);
        if (looksLikeDishName(rawName)) {
          const continuation = wrappedName(rawName, lines, index);
          if (isWrappedDishQualifier(rawName) && !continuation) continue;
          if (continuation) consumedWrappedNameLines.add(continuation.continuationLineIndex);
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
      const continuation = wrappedName(inline.rawName, lines, index);
      if (isWrappedDishQualifier(inline.rawName) && !continuation) continue;
      if (continuation) consumedWrappedNameLines.add(continuation.continuationLineIndex);
      candidates.push({
        nameLineIndex: index,
        nameContinuationLineIndex: continuation?.continuationLineIndex ?? null,
        priceLineIndex: index,
        page: lines[index]?.page ?? 1,
        sectionName: currentSection,
        rawName: continuation?.name ?? inline.rawName,
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
  const contentStart = Math.max(candidate.priceLineIndex, candidate.nameContinuationLineIndex ?? candidate.priceLineIndex) + 1;
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

export function extractMenuItemsFromPdfLines(lines: readonly string[]): readonly MenuObservedItem[] {
  const pdfLines = lines
    .map(normalizeLine)
    .filter(Boolean)
    .map((text) => ({ text, page: 1 }));
  return buildItems(pdfLines);
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
