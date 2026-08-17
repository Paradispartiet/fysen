import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
  type MenuPriceKind,
} from "@fysen/menu-core";

export const PDF_EXTRACTOR_VERSION = "pdf-text-v3";

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

interface ItemCandidate extends ParsedPrice {
  readonly nameLineIndex: number;
  readonly priceLineIndex: number;
  readonly page: number;
  readonly sectionName: string | null;
  readonly rawName: string;
}

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
  const match = normalized.match(/^([A-ZÆØÅÀÈÉÌÒÙÜ][A-ZÆØÅÀÈÉÌÒÙÜ &'’.-]{2,80})(?:\s+[A-ZÆØÅ]?[a-zæøåàèéìòùü].*)?$/u);
  if (!match?.[1]) return null;
  const section = match[1].trim().replace(/[ .-]+$/u, "");
  const letters = section.replace(/[^A-ZÆØÅÀÈÉÌÒÙÜ]/gu, "");
  if (letters.length < 3) return null;
  if (/^(OLIVIA|MENY|MENU|ALLERGENER|ALLERGENS|DRIKKE|BEVERAGES)$/u.test(section)) return null;
  return section;
}

function validPriceKroner(value: string): number | null {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 40 && parsed <= 10_000 ? parsed : null;
}

function parsedPrice(first: string, second?: string): ParsedPrice | null {
  const firstPrice = validPriceKroner(first);
  if (firstPrice === null) return null;
  if (!second) {
    return { priceKind: "exact", priceKroner: firstPrice, priceMaxKroner: null };
  }
  const secondPrice = validPriceKroner(second);
  if (secondPrice === null) return null;
  const minimum = Math.min(firstPrice, secondPrice);
  const maximum = Math.max(firstPrice, secondPrice);
  if (minimum === maximum) {
    return { priceKind: "exact", priceKroner: minimum, priceMaxKroner: null };
  }
  return { priceKind: "multiple", priceKroner: minimum, priceMaxKroner: maximum };
}

function stripAllergenSuffix(value: string): string {
  return value
    .replace(/\s+(?:[a-zæøå]{1,3}\s*,\s*){1,12}[a-zæøå]{1,3}$/iu, "")
    .replace(/\s+(?:vegetariano|vegano)$/iu, "")
    .trim();
}

function looksLikeDishName(value: string): boolean {
  const text = normalizeLine(value);
  if (text.length < 2 || text.length > 220 || !/\p{L}/u.test(text)) return false;
  if (/https?:\/\/|www\.|@/iu.test(text)) return false;
  if (/^(allerg|contains|inneholder|priser|prices|kjøkken|opening|åpning|mandag|tirsdag|onsdag|torsdag|fredag|lørdag|søndag)\b/iu.test(text)) return false;
  return true;
}

const priceSuffix = "(?:\\s*(?:,-|kr\\.?|nok))?";
const inlinePrice = new RegExp(
  `^(.{2,260}?)\\s+([1-9]\\d{1,3})(?:\\s*\\/\\s*([1-9]\\d{1,3}))?${priceSuffix}$`,
  "iu",
);
const standalonePrice = new RegExp(
  `^([1-9]\\d{1,3})(?:\\s*\\/\\s*([1-9]\\d{1,3}))?${priceSuffix}$`,
  "iu",
);

function collectCandidates(lines: readonly PdfLine[]): readonly ItemCandidate[] {
  const candidates: ItemCandidate[] = [];
  let currentSection: string | null = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]?.text ?? "";
    const section = sectionHeading(line);
    if (section) {
      currentSection = section;
      continue;
    }

    const inline = line.match(inlinePrice);
    if (inline?.[1] && inline[2]) {
      const price = parsedPrice(inline[2], inline[3]);
      const rawName = stripAllergenSuffix(inline[1]);
      if (price && looksLikeDishName(rawName)) {
        candidates.push({
          nameLineIndex: index,
          priceLineIndex: index,
          page: lines[index]?.page ?? 1,
          sectionName: currentSection,
          rawName,
          ...price,
        });
      }
      continue;
    }

    const standalone = line.match(standalonePrice);
    if (!standalone?.[1]) continue;
    const price = parsedPrice(standalone[1], standalone[2]);
    if (!price || index === 0) continue;
    const previous = lines[index - 1]?.text ?? "";
    if (sectionHeading(previous) || !looksLikeDishName(previous)) continue;
    const rawName = stripAllergenSuffix(previous);
    if (!looksLikeDishName(rawName)) continue;
    candidates.push({
      nameLineIndex: index - 1,
      priceLineIndex: index,
      page: lines[index - 1]?.page ?? lines[index]?.page ?? 1,
      sectionName: currentSection,
      rawName,
      ...price,
    });
  }

  return candidates;
}

function descriptionForCandidate(
  lines: readonly PdfLine[],
  candidate: ItemCandidate,
  nextCandidateLine: number,
): string | null {
  const parts: string[] = [];
  for (let index = candidate.priceLineIndex + 1; index < Math.min(nextCandidateLine, candidate.priceLineIndex + 7); index += 1) {
    const text = lines[index]?.text ?? "";
    if (!text || sectionHeading(text)) break;
    if (standalonePrice.test(text)) break;
    if (inlinePrice.test(text)) break;
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
  const seen = new Set<string>();

  for (const [position, candidate] of candidates.entries()) {
    const nextCandidateLine = candidates[position + 1]?.nameLineIndex ?? lines.length;
    const name = normalizeLine(candidate.rawName);
    const sourceKey = createMenuItemSourceKey(name, candidate.sectionName);
    if (seen.has(sourceKey)) continue;
    seen.add(sourceKey);
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
