import { load } from "cheerio";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";

export const HTML_EXTRACTOR_VERSION = "html-v7";

export interface ExtractedHtmlMenu {
  readonly items: readonly MenuObservedItem[];
  readonly method: "json_ld" | "html_heuristic";
  readonly visibleText: string;
}

type JsonRecord = Record<string, unknown>;

const SHORT_ALLERGEN_SUFFIX = /\s+\((?:[\p{L}\d]{1,5}\s*(?:[,/+ ]\s*)?){1,20}\)$/u;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasMenuItemType(value: unknown): boolean {
  if (typeof value === "string") return value === "MenuItem" || value.endsWith("/MenuItem");
  return Array.isArray(value) && value.some(hasMenuItemType);
}

function collectMenuItemNodes(value: unknown, output: JsonRecord[]): void {
  if (Array.isArray(value)) {
    for (const item of value) collectMenuItemNodes(item, output);
    return;
  }
  if (!isRecord(value)) return;
  if (hasMenuItemType(value["@type"])) output.push(value);
  for (const child of Object.values(value)) collectMenuItemNodes(child, output);
}

function parsePriceMinor(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
    return Math.round(value * 100);
  }
  if (typeof value !== "string") return null;

  const compact = value.trim().replace(/\s+/g, "").replace(/(?:NOK|kr\.?)/giu, "").replace(/,-$/, "");
  const match = compact.match(/^(\d{1,5})(?:[.,](\d{1,2}))?$/);
  if (!match) return null;
  const whole = Number(match[1]);
  const decimals = (match[2] ?? "").padEnd(2, "0").slice(0, 2);
  return whole * 100 + Number(decimals || "0");
}

function firstOffer(record: JsonRecord): JsonRecord | null {
  const offers = record.offers;
  if (isRecord(offers)) return offers;
  if (Array.isArray(offers)) return offers.find(isRecord) ?? null;
  return null;
}

function canonicalJsonLdName(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim().replace(/^\d{1,3}\s*[.)]?\s+/u, "").trim();
}

function extractJsonLdItems(html: string): readonly MenuObservedItem[] {
  const $ = load(html);
  const nodes: JsonRecord[] = [];

  $("script[type='application/ld+json']").each((_, element) => {
    const source = $(element).text().trim();
    if (!source) return;
    try {
      collectMenuItemNodes(JSON.parse(source) as unknown, nodes);
    } catch {
      // One malformed JSON-LD block must not suppress other valid blocks.
    }
  });

  const unique = new Map<string, MenuObservedItem>();
  for (const [position, node] of nodes.entries()) {
    if (typeof node.name !== "string" || !node.name.trim()) continue;
    const name = canonicalJsonLdName(node.name);
    if (!name || looksLikeNonDish(name)) continue;
    const description = typeof node.description === "string" ? node.description.trim() || null : null;
    const offer = firstOffer(node);
    const priceMinor = parsePriceMinor(offer?.price ?? null);
    const currency =
      typeof offer?.priceCurrency === "string" && /^[A-Za-z]{3}$/.test(offer.priceCurrency)
        ? offer.priceCurrency.toUpperCase()
        : "NOK";
    const sourceKey = createMenuItemSourceKey(name);

    unique.set(sourceKey, {
      sourceKey,
      name,
      normalizedName: normalizeDishName(name),
      description,
      sectionName: null,
      priceMinor,
      currency,
      position,
      extractionMethod: "json_ld",
      confidence: 0.99,
      sourceExcerpt: description ? `${name} — ${description}` : name,
    });
  }

  return [...unique.values()];
}

function extractVisibleText(html: string): string {
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
    .filter(Boolean)
    .join("\n");
}

function looksLikeNonDish(name: string): boolean {
  const normalized = normalizeDishName(name);
  return (
    name.startsWith("+") ||
    name.includes("@") ||
    /https?:\/\//i.test(name) ||
    /^(hours|opening|åpning|booking|contact|kontakt|address|adresse|where to find|allerg|drinks?|drikke|beverages?|mineralvann|soft\s+drinks?|sodas?|brus(?:\s*\/\s*mineralvann)?|wine|vin|beer|øl|sake|alkoholfritt)/iu.test(
      name,
    ) ||
    /^(?:menu|meny|take\s*away|takeaway|småretter(?:\s+og\s+forretter)?|forretter?|starters?|appetizers?|varmretter|hovedretter?|mains?|main\s+courses?|salater?|salads?|barnemeny|kids?\s+menu|mexikanske\s+retter|mexican(?:\s+dishes)?|grillretter|pizza|dessert(?:er)?|snacks?(?:\s*&\s*dip)?|sides?|tilbehør|tillegg\s+for\s+ekstra\s+tilbehør)$/iu.test(
      name,
    ) ||
    /^(monday|tuesday|wednesday|thursday|friday|saturday|sunday|mandag|tirsdag|onsdag|torsdag|fredag|lørdag|søndag)\b/i.test(
      normalized,
    )
  );
}

function looksLikeDescriptor(line: string): boolean {
  const trimmed = line.trim();
  const words = trimmed.split(/\s+/).filter(Boolean);
  return (
    /^(allergens?|allergener|with|topped|served|ask for|choose|velg|med|contains?|including|inkludert|accompanied)\b/iu.test(
      trimmed,
    ) ||
    (words.length >= 4 && /\b(?:served|serveres|comes\s+with|serveres\s+med|inkluderer)\b/iu.test(trimmed))
  );
}

function looksLikeStandaloneDescription(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed || SHORT_ALLERGEN_SUFFIX.test(trimmed)) return false;
  const withoutMenuNumber = trimmed.replace(/^\d{1,3}\s*[.)]\s*/u, "").trim();
  const words = withoutMenuNumber.split(/\s+/).filter(Boolean);
  return (
    looksLikeDescriptor(withoutMenuNumber) ||
    /[,;]/u.test(withoutMenuNumber) ||
    /[.!?](?:\s|$)/u.test(withoutMenuNumber) ||
    (words.length >= 7 && /\b(?:eller|or)\b/iu.test(withoutMenuNumber)) ||
    (words.length >= 7 && /\b(?:med|with)\b/iu.test(withoutMenuNumber))
  );
}

function looksLikeMetadataBoundary(line: string): boolean {
  return /^(menyforklaring|menu explanation|drikke|drinks?|kontakt|contact|opening|åpning|booking|adresse|address|jobb|job|gavekort|gift card)\b/iu.test(
    line.trim(),
  );
}

function looksLikeSharedChildHeading(line: string): boolean {
  const trimmed = line.trim();
  if (
    trimmed.startsWith("*") ||
    trimmed.length < 3 ||
    trimmed.length > 140 ||
    looksLikeNonDish(trimmed) ||
    looksLikeDescriptor(trimmed) ||
    looksLikeMetadataBoundary(trimmed) ||
    !/\p{L}/u.test(trimmed)
  ) {
    return false;
  }

  const lettersOnly = trimmed.replace(/[^\p{L}]+/gu, "");
  return lettersOnly.length >= 3 && trimmed === trimmed.toLocaleUpperCase("nb-NO");
}

function splitHeuristicName(value: string): { readonly name: string; readonly description: string | null } {
  const withoutAllergens = value.replace(SHORT_ALLERGEN_SUFFIX, "").trim();
  const withoutMenuNumber = withoutAllergens.replace(/^\d{1,3}\s*[.)]\s*/u, "").trim();
  const commaIndex = withoutMenuNumber.indexOf(",");
  if (commaIndex >= 3 && commaIndex <= 120) {
    const name = withoutMenuNumber.slice(0, commaIndex).trim();
    const description = withoutMenuNumber.slice(commaIndex + 1).trim();
    return { name, description: description || null };
  }
  return { name: withoutMenuNumber, description: null };
}

function validHeuristicPriceMinor(rawPrice: string): number | null {
  const priceMinor = parsePriceMinor(rawPrice);
  return priceMinor !== null && priceMinor >= 4_000 && priceMinor <= 1_000_000 ? priceMinor : null;
}

interface SharedPriceSection {
  readonly headerPosition: number;
  readonly sectionName: string;
  readonly priceMinor: number;
  readonly childPositions: readonly number[];
  readonly boundaryPosition: number;
}

function detectSharedPriceSections(
  lines: readonly string[],
  inlinePriceLine: RegExp,
  standalonePriceLine: RegExp,
): readonly SharedPriceSection[] {
  const sections: SharedPriceSection[] = [];

  for (const [headerPosition, line] of lines.entries()) {
    if (standalonePriceLine.test(line)) continue;
    const match = line.match(inlinePriceLine);
    const rawSectionName = match?.[1]?.trim();
    const rawPrice = match?.[2];
    if (!rawSectionName || !rawPrice || looksLikeNonDish(rawSectionName)) continue;

    const parsedSection = splitHeuristicName(rawSectionName);
    const sectionName = parsedSection.name;
    const priceMinor = validHeuristicPriceMinor(rawPrice);
    if (
      priceMinor === null ||
      parsedSection.description !== null ||
      sectionName.length > 60 ||
      sectionName.split(/\s+/).length > 5 ||
      /[,;:]/.test(sectionName)
    ) {
      continue;
    }

    const childPositions: number[] = [];
    let boundaryPosition = Math.min(lines.length, headerPosition + 31);
    const scanEnd = Math.min(lines.length, headerPosition + 31);
    for (let index = headerPosition + 1; index < scanEnd; index += 1) {
      const candidate = lines[index]?.trim();
      if (!candidate) continue;
      if (
        candidate.startsWith("*") ||
        looksLikeMetadataBoundary(candidate) ||
        inlinePriceLine.test(candidate) ||
        standalonePriceLine.test(candidate)
      ) {
        boundaryPosition = index;
        break;
      }
      if (looksLikeSharedChildHeading(candidate)) childPositions.push(index);
    }

    if (childPositions.length < 2) continue;
    sections.push({
      headerPosition,
      sectionName,
      priceMinor,
      childPositions,
      boundaryPosition,
    });
  }

  return sections;
}

function sharedSectionItems(
  lines: readonly string[],
  section: SharedPriceSection,
): readonly MenuObservedItem[] {
  return section.childPositions.map((position, childIndex) => {
    const name = lines[position]?.trim() ?? "";
    const nextChild = section.childPositions[childIndex + 1] ?? section.boundaryPosition;
    const description = lines
      .slice(position + 1, nextChild)
      .filter(
        (value) =>
          !value.startsWith("*") &&
          !/^allergens?:/iu.test(value) &&
          !/^allergener:/iu.test(value) &&
          !looksLikeMetadataBoundary(value),
      )
      .join(" ")
      .trim() || null;
    const sourceKey = createMenuItemSourceKey(name);
    const excerpt = [
      `${section.sectionName} ${section.priceMinor / 100}`,
      name,
      description,
    ]
      .filter((value): value is string => Boolean(value))
      .join(" — ")
      .slice(0, 1000);

    return {
      sourceKey,
      name,
      normalizedName: normalizeDishName(name),
      description,
      sectionName: section.sectionName,
      priceMinor: section.priceMinor,
      currency: "NOK",
      position,
      extractionMethod: "html_heuristic" as const,
      confidence: 0.76,
      sourceExcerpt: excerpt,
    };
  });
}

function extractHeuristicItems(visibleText: string): readonly MenuObservedItem[] {
  const unique = new Map<string, MenuObservedItem>();
  const lines = visibleText.split("\n");
  const priceToken = "(?:kr\\.?\\s*)?[1-9]\\d{1,3}(?:[.,]\\d{1,2})?(?:\\s*(?:,-|kr\\.?|nok))?";
  const inlinePriceLine = new RegExp(`^(.{2,280}?)\\s+(${priceToken})$`, "iu");
  const standalonePriceLine = new RegExp(`^(${priceToken})$`, "iu");
  const sharedSections = detectSharedPriceSections(lines, inlinePriceLine, standalonePriceLine);
  const sharedHeaderPositions = new Set(sharedSections.map((section) => section.headerPosition));

  for (const section of sharedSections) {
    for (const item of sharedSectionItems(lines, section)) {
      unique.set(item.sourceKey, item);
    }
  }

  for (const [position, line] of lines.entries()) {
    if (sharedHeaderPositions.has(position) || standalonePriceLine.test(line)) continue;
    const match = line.match(inlinePriceLine);
    if (!match) continue;
    const rawName = match[1]?.trim();
    const rawPrice = match[2];
    if (!rawName || !rawPrice || looksLikeNonDish(rawName)) continue;

    const { name, description } = splitHeuristicName(rawName.replace(/^\*+/, "").trim());
    if (name.length < 2 || name.length > 300) continue;
    const priceMinor = validHeuristicPriceMinor(rawPrice);
    if (priceMinor === null) continue;

    const sourceKey = createMenuItemSourceKey(name);
    unique.set(sourceKey, {
      sourceKey,
      name,
      normalizedName: normalizeDishName(name),
      description,
      sectionName: null,
      priceMinor,
      currency: "NOK",
      position,
      extractionMethod: "html_heuristic",
      confidence: 0.78,
      sourceExcerpt: line.slice(0, 1000),
    });
  }

  for (const [position, line] of lines.entries()) {
    const priceMatch = line.match(standalonePriceLine);
    const rawPrice = priceMatch?.[1];
    if (!rawPrice) continue;
    const priceMinor = validHeuristicPriceMinor(rawPrice);
    if (priceMinor === null) continue;

    let nameIndex: number | null = null;
    for (let offset = 1; offset <= 8; offset += 1) {
      const candidateIndex = position - offset;
      if (candidateIndex < 0) break;
      const candidate = lines[candidateIndex]?.trim();
      if (!candidate) continue;
      if (standalonePriceLine.test(candidate) || inlinePriceLine.test(candidate)) break;
      if (
        looksLikeNonDish(candidate) ||
        looksLikeStandaloneDescription(candidate) ||
        looksLikeMetadataBoundary(candidate)
      ) {
        continue;
      }
      const parsed = splitHeuristicName(candidate.replace(/^\*+/, "").trim());
      if (!parsed.name || parsed.name.length < 2 || parsed.name.length > 180 || !/\p{L}/u.test(parsed.name)) continue;
      nameIndex = candidateIndex;
      break;
    }
    if (nameIndex === null) continue;

    const rawName = lines[nameIndex]?.replace(/^\*+/, "").trim();
    if (!rawName) continue;
    const { name } = splitHeuristicName(rawName);
    if (looksLikeNonDish(name) || name.length < 2 || name.length > 300) continue;
    const sourceKey = createMenuItemSourceKey(name);
    if (unique.has(sourceKey)) continue;

    const descriptionLines = lines
      .slice(nameIndex + 1, position)
      .filter((value) => !/^allergens?:/iu.test(value) && !/^allergener:/iu.test(value));
    const description = descriptionLines.join(" ").trim() || null;
    const sourceExcerpt = lines.slice(nameIndex, position + 1).join(" — ").slice(0, 1000);

    unique.set(sourceKey, {
      sourceKey,
      name,
      normalizedName: normalizeDishName(name),
      description,
      sectionName: null,
      priceMinor,
      currency: "NOK",
      position: nameIndex,
      extractionMethod: "html_heuristic",
      confidence: 0.72,
      sourceExcerpt,
    });
  }

  return [...unique.values()].sort((a, b) => a.position - b.position);
}

export function extractHtmlMenu(html: string): ExtractedHtmlMenu {
  const structured = extractJsonLdItems(html);
  const visibleText = extractVisibleText(html);
  if (structured.length > 0) {
    return { items: structured, method: "json_ld", visibleText };
  }
  return { items: extractHeuristicItems(visibleText), method: "html_heuristic", visibleText };
}