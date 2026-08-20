import { load } from "cheerio";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
  type MenuPriceKind,
} from "@fysen/menu-core";
import { recoverSemanticCategoryCardHtmlItems } from "./html-category-card-recovery.js";

export const HTML_TRAILING_PRICE_CARD_RECOVERY_VERSION = "trailing-price-card-v6";

const HEADING_MARKER = "__FYSEN_TRAILING_PRICE_HEADING_LEVEL_";
const PURE_PRICE_LINE = /^(?:(fra|from)\s+)?(?:(?:NOK\s*)|(?:kr\.?\s*))?([1-9]\d{1,3})(?:[.,](\d{1,2}))?(?:\s*(?:,-|kr\.?|NOK))?$/iu;
const TRAILING_MARKED_PRICE = /(?:(fra|from)\s+)?([1-9]\d{1,3})(?:[.,](\d{1,2}))?\s*(?:,-|kr\.?|NOK)\s*$/iu;
const ADDITIONAL_MARKED_PRICE = /[1-9]\d{1,3}(?:[.,]\d{1,2})?\s*(?:,-|kr\.?|NOK)/iu;
const SECTION_OR_UI_LABEL = /^(?:top\s+of\s+page|bottom\s+of\s+page|home|hjem|menu|meny|more|om\s+oss|about(?:\s+us)?|contact(?:\s+us)?|kontakt(?:\s+oss)?|opening(?:\s+hours)?|åpning(?:s)?\s*tider|address|adresse|booking|reservation(?:s)?|reservasjoner?|gift\s*card|gavekort|delivery\s*fee|leveringsgebyr|allergens?|allergener?|drinks?|drikke(?:meny)?|beverages?)$/iu;
const UI_ACTION_LEAD = /^(?:choose|select|velg|bestill|order|book|reserve|click|trykk|tap)\b/iu;
const DESCRIPTION_LEAD = /^(?:serveres?|servert|served|with|med|marinert|marinated|grillet|grilled|bakt|baked|braisert|braised|toppet|topped|inneholder|contains?|inkludert|including|alle\s+retter)\b/iu;
const ALLERGEN_METADATA = /^\(?\s*(?:allergener?|allergens?)\s*:/iu;

interface ParsedTrailingPrice {
  readonly priceMinor: number;
  readonly priceKind: MenuPriceKind;
  readonly residual: string;
}

interface TrailingPriceCandidate {
  readonly item: MenuObservedItem;
  readonly sectionHint: string | null;
}

function normalizeVisibleLine(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}

function parsedAmount(wholeValue: string, decimalsValue: string | undefined): number | null {
  const whole = Number(wholeValue);
  const decimals = (decimalsValue ?? "").padEnd(2, "0").slice(0, 2);
  const amount = whole * 100 + Number(decimals || "0");
  return amount >= 4_000 && amount <= 1_000_000 ? amount : null;
}

function parseTrailingPrice(value: string): ParsedTrailingPrice | null {
  const normalized = normalizeVisibleLine(value);
  const pure = normalized.match(PURE_PRICE_LINE);
  if (pure?.[2]) {
    const priceMinor = parsedAmount(pure[2], pure[3]);
    if (priceMinor === null) return null;
    return {
      priceMinor,
      priceKind: pure[1] ? "from" : "exact",
      residual: "",
    };
  }

  const trailing = normalized.match(TRAILING_MARKED_PRICE);
  if (!trailing?.[2] || trailing.index === undefined) return null;
  const residual = normalized.slice(0, trailing.index).trim();
  if (ADDITIONAL_MARKED_PRICE.test(residual)) return null;
  const priceMinor = parsedAmount(trailing[2], trailing[3]);
  if (priceMinor === null) return null;
  return {
    priceMinor,
    priceKind: trailing[1] ? "from" : "exact",
    residual,
  };
}

function looksLikeTitle(value: string): boolean {
  const title = normalizeVisibleLine(value);
  if (!title || title.length < 2 || title.length > 160 || !/\p{L}/u.test(title)) return false;
  if (SECTION_OR_UI_LABEL.test(title) || UI_ACTION_LEAD.test(title) || DESCRIPTION_LEAD.test(title)) return false;
  if (/^(?:©|™|https?:\/\/|www\.|\d+(?:[.,]\d+)?\s*(?:l|cl|ml|kg)\b)/iu.test(title)) return false;
  if (/\b(?:liter|kilogram)\s*=/iu.test(title)) return false;
  const words = title.split(/\s+/).filter(Boolean);
  if (words.length > 14 || /[.!?]$/u.test(title)) return false;
  return true;
}

function looksLikeDescription(value: string): boolean {
  const description = normalizeVisibleLine(value);
  if (!description || description.length < 3 || description.length > 500) return false;
  if (SECTION_OR_UI_LABEL.test(description) || UI_ACTION_LEAD.test(description)) return false;
  return true;
}

function annotateHeadingText(html: string): string {
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
  return $("body").text();
}

function headingInfo(line: string): { level: number; text: string } | null {
  const match = line.match(/^__FYSEN_TRAILING_PRICE_HEADING_LEVEL_([1-6])__\s*(.*)$/u);
  if (!match?.[1]) return null;
  const level = Number(match[1]);
  const text = normalizeVisibleLine(match[2] ?? "");
  return Number.isInteger(level) && text ? { level, text } : null;
}

function likelySectionHeading(value: string): boolean {
  const text = normalizeVisibleLine(value);
  if (!text || text.length > 80 || SECTION_OR_UI_LABEL.test(text)) return false;
  if (/\b(?:kr\.?|nok|,-|\d)\b/iu.test(text)) return false;
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length > 7 || /[.!?]$/u.test(text)) return false;
  return /\p{L}/u.test(text);
}

function nearestSectionHint(
  headings: readonly { position: number; level: number; text: string }[],
  titlePosition: number,
): string | null {
  const before = headings.filter((heading) => heading.position < titlePosition);
  if (before.length === 0) return null;
  const nearest = before[before.length - 1];
  if (!nearest || !likelySectionHeading(nearest.text)) return null;
  return nearest.text;
}

export function recoverTrailingPriceCardHtmlItems(html: string): readonly MenuObservedItem[] {
  const semanticItems = recoverSemanticCategoryCardHtmlItems(html);
  if (semanticItems.length >= 4) return semanticItems;

  const lines = annotateHeadingText(html)
    .split(/\n+/)
    .map(normalizeVisibleLine)
    .filter(Boolean);
  const headings: { position: number; level: number; text: string }[] = [];
  const content: string[] = [];
  for (const line of lines) {
    const heading = headingInfo(line);
    if (heading) {
      headings.push({ position: content.length, ...heading });
      content.push(heading.text);
      continue;
    }
    content.push(line);
  }

  const candidates: TrailingPriceCandidate[] = [];
  for (let pricePosition = 0; pricePosition < content.length; pricePosition += 1) {
    const parsed = parseTrailingPrice(content[pricePosition] ?? "");
    if (!parsed) continue;

    let titlePosition: number | null = null;
    let title = "";
    const scanStart = Math.max(0, pricePosition - 4);
    for (let index = pricePosition - 1; index >= scanStart; index -= 1) {
      const line = content[index] ?? "";
      if (!line || parseTrailingPrice(line)) break;
      if (looksLikeTitle(line)) {
        titlePosition = index;
        title = line;
      }
    }
    if (titlePosition === null || !title) continue;

    const descriptionParts = content
      .slice(titlePosition + 1, pricePosition)
      .filter((line) => line && looksLikeDescription(line));
    if (parsed.residual && looksLikeDescription(parsed.residual)) {
      descriptionParts.push(parsed.residual);
    }
    const description = descriptionParts.join(" ").trim() || null;
    const sourceKey = createMenuItemSourceKey(title);
    const item: MenuObservedItem = {
      sourceKey,
      name: title,
      normalizedName: normalizeDishName(title),
      description,
      sectionName: null,
      priceMinor: parsed.priceMinor,
      priceKind: parsed.priceKind,
      priceMaxMinor: null,
      currency: "NOK",
      position: titlePosition,
      extractionMethod: "html_heuristic",
      confidence: 0.92,
      sourceExcerpt: content.slice(titlePosition, pricePosition + 1).join(" — ").slice(0, 1000),
    };
    candidates.push({
      item,
      sectionHint: nearestSectionHint(headings, titlePosition),
    });
  }

  const normalizedNameCounts = new Map<string, number>();
  const sectionHintsByName = new Map<string, Set<string>>();
  for (const candidate of candidates) {
    normalizedNameCounts.set(
      candidate.item.normalizedName,
      (normalizedNameCounts.get(candidate.item.normalizedName) ?? 0) + 1,
    );
    if (candidate.sectionHint) {
      const hints = sectionHintsByName.get(candidate.item.normalizedName) ?? new Set<string>();
      hints.add(normalizeDishName(candidate.sectionHint));
      sectionHintsByName.set(candidate.item.normalizedName, hints);
    }
  }

  const unique = new Map<string, MenuObservedItem>();
  for (const candidate of candidates) {
    const duplicateCount = normalizedNameCounts.get(candidate.item.normalizedName) ?? 0;
    const distinctHints = sectionHintsByName.get(candidate.item.normalizedName)?.size ?? 0;
    const shouldUseSectionIdentity =
      duplicateCount > 1 && candidate.sectionHint !== null && distinctHints >= 2;
    const item = shouldUseSectionIdentity
      ? {
          ...candidate.item,
          sectionName: candidate.sectionHint,
          sourceKey: createMenuItemSourceKey(candidate.item.name, candidate.sectionHint),
        }
      : candidate.item;
    unique.set(item.sourceKey, item);
  }

  return [...unique.values()].sort((a, b) => a.position - b.position);
}
