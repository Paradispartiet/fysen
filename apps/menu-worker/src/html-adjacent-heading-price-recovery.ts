import { load } from "cheerio";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
  type MenuPriceKind,
} from "@fysen/menu-core";

export const HTML_ADJACENT_HEADING_PRICE_RECOVERY_VERSION = "heading-price-v2";

const HEADING_MARKER = "__FYSEN_ADJACENT_HEADING_LEVEL_";
const PRICE_LINE = /^(?:(fra|from)\s+)?(?:(?:NOK\s*)|(?:kr\.?\s*))?([1-9]\d{1,3})(?:[.,](\d{1,2}))?(?:\s*(?:,-|kr\.?|NOK))?$/iu;
const SECTION_OR_UI_LABEL = /^(?:our\s+menu|menu|meny|single\s+meat|single\s+(?:vegetar|vegetarian)(?:\s*&\s*vegan)?|pdf\s+version|drinks?|drikke(?:meny)?|popular\s+dish|opening(?:\s+hours)?|åpningstider|contact|kontakt|address|adresse|booking|reservation(?:s)?|reservasjoner?|allergens?|allergener?)$/iu;
const BOTTLED_WATER_TITLE = /\b(?:still|sparkling)\s+(?:water|naturell)\b/iu;

interface ParsedPrice {
  readonly priceMinor: number;
  readonly priceKind: MenuPriceKind;
}

function normalizeVisibleLine(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}

function parsePrice(value: string): ParsedPrice | null {
  const match = normalizeVisibleLine(value).match(PRICE_LINE);
  if (!match?.[2]) return null;
  const whole = Number(match[2]);
  const decimals = (match[3] ?? "").padEnd(2, "0").slice(0, 2);
  const amount = whole * 100 + Number(decimals || "0");
  if (amount < 4_000 || amount > 1_000_000) return null;
  return {
    priceMinor: amount,
    priceKind: match[1] ? "from" : "exact",
  };
}

function looksLikeDishTitle(value: string): boolean {
  const title = normalizeVisibleLine(value);
  if (!title || title.length < 2 || title.length > 180 || !/\p{L}/u.test(title)) return false;
  if (SECTION_OR_UI_LABEL.test(title) || PRICE_LINE.test(title) || BOTTLED_WATER_TITLE.test(title)) return false;
  if (/^(?:©|™|https?:\/\/|www\.|phone\s*:|telefon\s*:)/iu.test(title)) return false;
  if (/[.!?]$/u.test(title)) return false;
  return title.split(/\s+/).filter(Boolean).length <= 12;
}

function annotatedLines(html: string): readonly string[] {
  const $ = load(html);
  $("script, style, noscript, svg, template").remove();
  $("br").replaceWith("\n");

  for (let level = 1; level <= 6; level += 1) {
    $(`h${level}`).each((_, element) => {
      $(element).prepend(`\n${HEADING_MARKER}${level}__ `);
      $(element).append("\n");
    });
  }

  $("p, li, tr, div, section, article").each((_, element) => {
    $(element).append("\n");
  });

  return $("body")
    .text()
    .split(/\n+/)
    .map(normalizeVisibleLine)
    .filter(Boolean);
}

export function recoverAdjacentHeadingPriceHtmlItems(html: string): readonly MenuObservedItem[] {
  const lines = annotatedLines(html);
  const byHeadingLevel = new Map<number, MenuObservedItem[]>();

  for (let position = 0; position < lines.length; position += 1) {
    const line = lines[position] ?? "";
    const heading = line.match(/^__FYSEN_ADJACENT_HEADING_LEVEL_([1-6])__\s*(.*)$/u);
    if (!heading?.[1]) continue;

    const headingLevel = Number(heading[1]);
    const title = normalizeVisibleLine(heading[2] ?? "");
    if (!looksLikeDishTitle(title)) continue;

    let price: ParsedPrice | null = null;
    let pricePosition: number | null = null;
    const scanEnd = Math.min(lines.length, position + 5);
    for (let index = position + 1; index < scanEnd; index += 1) {
      const candidate = lines[index] ?? "";
      if (candidate.startsWith(HEADING_MARKER)) break;
      const parsed = parsePrice(candidate);
      if (!parsed) continue;
      price = parsed;
      pricePosition = index;
      break;
    }
    if (!price || pricePosition === null) continue;

    const sourceKey = createMenuItemSourceKey(title);
    const items = byHeadingLevel.get(headingLevel) ?? [];
    items.push({
      sourceKey,
      name: title,
      normalizedName: normalizeDishName(title),
      description: null,
      sectionName: null,
      priceMinor: price.priceMinor,
      priceKind: price.priceKind,
      currency: "NOK",
      position,
      extractionMethod: "html_heuristic",
      confidence: 0.96,
      sourceExcerpt: `${title} — ${lines[pricePosition] ?? ""}`.slice(0, 1000),
    });
    byHeadingLevel.set(headingLevel, items);
  }

  const strongest = [...byHeadingLevel.values()].sort((a, b) => b.length - a.length)[0] ?? [];
  if (strongest.length < 4) return [];

  const unique = new Map<string, MenuObservedItem>();
  for (const item of strongest) unique.set(item.sourceKey, item);
  return [...unique.values()].sort((a, b) => a.position - b.position);
}
