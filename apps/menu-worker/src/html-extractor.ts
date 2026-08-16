import { load } from "cheerio";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";

export const HTML_EXTRACTOR_VERSION = "html-v1";

export interface ExtractedHtmlMenu {
  readonly items: readonly MenuObservedItem[];
  readonly method: "json_ld" | "html_heuristic";
  readonly visibleText: string;
}

type JsonRecord = Record<string, unknown>;

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
    const name = node.name.trim();
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
    /^(hours|opening|åpning|booking|contact|kontakt|address|adresse|where to find|allerg)/i.test(name) ||
    /^(monday|tuesday|wednesday|thursday|friday|saturday|sunday|mandag|tirsdag|onsdag|torsdag|fredag|lørdag|søndag)\b/i.test(
      normalized,
    )
  );
}

function splitHeuristicName(value: string): { readonly name: string; readonly description: string | null } {
  const withoutAllergens = value
    .replace(/\s+\((?:[\p{L}\d]{1,5}\s*,?\s*){1,20}\)$/u, "")
    .trim();
  const commaIndex = withoutAllergens.indexOf(",");
  if (commaIndex >= 3 && commaIndex <= 120) {
    const name = withoutAllergens.slice(0, commaIndex).trim();
    const description = withoutAllergens.slice(commaIndex + 1).trim();
    return { name, description: description || null };
  }
  return { name: withoutAllergens, description: null };
}

function extractHeuristicItems(visibleText: string): readonly MenuObservedItem[] {
  const unique = new Map<string, MenuObservedItem>();
  const priceLine = /^(.{2,280}?)\s+([1-9]\d{1,3})(?:\s*(?:,-|kr\.?|nok))?$/iu;

  for (const [position, line] of visibleText.split("\n").entries()) {
    const match = line.match(priceLine);
    if (!match) continue;
    const rawName = match[1]?.trim();
    const rawPrice = match[2];
    if (!rawName || !rawPrice || looksLikeNonDish(rawName)) continue;

    const { name, description } = splitHeuristicName(rawName.replace(/^\*+/, "").trim());
    if (name.length < 2 || name.length > 300) continue;
    const priceKroner = Number(rawPrice);
    if (!Number.isInteger(priceKroner) || priceKroner < 40 || priceKroner > 10_000) continue;

    const sourceKey = createMenuItemSourceKey(name);
    unique.set(sourceKey, {
      sourceKey,
      name,
      normalizedName: normalizeDishName(name),
      description,
      sectionName: null,
      priceMinor: priceKroner * 100,
      currency: "NOK",
      position,
      extractionMethod: "html_heuristic",
      confidence: 0.78,
      sourceExcerpt: line.slice(0, 1000),
    });
  }

  return [...unique.values()];
}

export function extractHtmlMenu(html: string): ExtractedHtmlMenu {
  const structured = extractJsonLdItems(html);
  const visibleText = extractVisibleText(html);
  if (structured.length > 0) {
    return { items: structured, method: "json_ld", visibleText };
  }
  return { items: extractHeuristicItems(visibleText), method: "html_heuristic", visibleText };
}
