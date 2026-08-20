import { load } from "cheerio";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
  type MenuPriceKind,
} from "@fysen/menu-core";
import { recoverSemanticCategoryCardHtmlItems } from "./html-category-card-recovery.js";

export const HTML_TRAILING_PRICE_CARD_RECOVERY_VERSION = "trailing-price-card-v3";

const PURE_PRICE_LINE = /^(?:(fra|from)\s+)?(?:(?:NOK\s*)|(?:kr\.?\s*))?([1-9]\d{1,3})(?:[.,](\d{1,2}))?(?:\s*(?:,-|kr\.?|NOK))?$/iu;
const TRAILING_MARKED_PRICE = /(?:(fra|from)\s+)?([1-9]\d{1,3})(?:[.,](\d{1,2}))?\s*(?:,-|kr\.?|NOK)\s*$/iu;
const ADDITIONAL_MARKED_PRICE = /[1-9]\d{1,3}(?:[.,]\d{1,2})?\s*(?:,-|kr\.?|NOK)/iu;
const SECTION_OR_UI_LABEL = /^(?:top\s+of\s+page|bottom\s+of\s+page|home|hjem|menu|meny|more|om\s+oss|about(?:\s+us)?|contact(?:\s+us)?|kontakt(?:\s+oss)?|opening(?:\s+hours)?|åpning(?:s)?\s*tider|address|adresse|booking|reservation(?:s)?|reservasjoner?|gift\s*card|gavekort|delivery\s*fee|leveringsgebyr|allergens?|allergener?)$/iu;
const UI_ACTION_LEAD = /^(?:choose|select|velg|bestill|order|book|reserve|click|trykk|tap)\b/iu;
const DESCRIPTION_LEAD = /^(?:serveres?|servert|served|with|med|marinert|marinated|grillet|grilled|bakt|baked|braisert|braised|toppet|topped|inneholder|contains?|inkludert|including|alle\s+retter)\b/iu;
const ALLERGEN_METADATA = /^\(?\s*(?:allergener?|allergens?)\s*:/iu;

interface ParsedTrailingPrice {
  readonly priceMinor: number;
  readonly priceKind: MenuPriceKind;
  readonly residual: string;
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
  const line = normalizeVisibleLine(value);
  const pure = line.match(PURE_PRICE_LINE);
  if (pure?.[2]) {
    const priceMinor = parsedAmount(pure[2], pure[3]);
    if (priceMinor === null) return null;
    return { priceMinor, priceKind: pure[1] ? "from" : "exact", residual: "" };
  }

  const trailing = line.match(TRAILING_MARKED_PRICE);
  if (!trailing?.[2] || trailing.index === undefined) return null;
  const residual = line.slice(0, trailing.index).trim();
  if (!residual || ADDITIONAL_MARKED_PRICE.test(residual)) return null;
  const priceMinor = parsedAmount(trailing[2], trailing[3]);
  if (priceMinor === null) return null;
  return {
    priceMinor,
    priceKind: trailing[1] ? "from" : "exact",
    residual,
  };
}

function looksLikeDescription(value: string): boolean {
  const line = normalizeVisibleLine(value);
  if (!line) return false;
  const words = line.split(/\s+/).filter(Boolean);
  const commaCount = line.match(/,/gu)?.length ?? 0;
  return (
    ALLERGEN_METADATA.test(line) ||
    DESCRIPTION_LEAD.test(line) ||
    (commaCount >= 3 && words.length >= 5) ||
    words.length >= 13 ||
    /[.!?]$/u.test(line)
  );
}

function looksLikeDishTitle(value: string): boolean {
  const title = normalizeVisibleLine(value);
  if (!title || title.length < 2 || title.length > 160 || !/\p{L}/u.test(title)) return false;
  if (parseTrailingPrice(title) || SECTION_OR_UI_LABEL.test(title) || UI_ACTION_LEAD.test(title)) return false;
  if (looksLikeDescription(title) || /^(?:©|™|https?:\/\/|www\.)/iu.test(title)) return false;
  return title.split(/\s+/).filter(Boolean).length <= 12;
}

function visibleLines(html: string): readonly string[] {
  const $ = load(html);
  $("script, style, noscript, svg, template").remove();
  $("br").replaceWith("\n");
  $("p, li, tr, div, section, article, h1, h2, h3, h4, h5, h6").each((_, element) => {
    $(element).append("\n");
  });
  return $("body")
    .text()
    .split(/\n+/)
    .map(normalizeVisibleLine)
    .filter(Boolean);
}

export function recoverTrailingPriceCardHtmlItems(html: string): readonly MenuObservedItem[] {
  const semanticCategoryItems = recoverSemanticCategoryCardHtmlItems(html);
  if (semanticCategoryItems.length >= 4) return semanticCategoryItems;

  const lines = visibleLines(html);
  const unique = new Map<string, MenuObservedItem>();

  for (let pricePosition = 0; pricePosition < lines.length; pricePosition += 1) {
    const endpoint = parseTrailingPrice(lines[pricePosition] ?? "");
    if (!endpoint) continue;

    let titlePosition: number | null = null;
    for (let index = pricePosition - 1; index >= Math.max(0, pricePosition - 6); index -= 1) {
      const candidate = lines[index] ?? "";
      if (parseTrailingPrice(candidate)) break;
      if (!looksLikeDishTitle(candidate)) continue;
      titlePosition = index;
      break;
    }
    if (titlePosition === null) continue;

    const title = normalizeVisibleLine(lines[titlePosition] ?? "");
    const descriptionParts = lines
      .slice(titlePosition + 1, pricePosition)
      .map(normalizeVisibleLine)
      .filter(Boolean);
    if (endpoint.residual) descriptionParts.push(endpoint.residual);
    const description = descriptionParts.length > 0 ? [...new Set(descriptionParts)].join(" ") : null;
    const sourceKey = createMenuItemSourceKey(title);

    unique.set(sourceKey, {
      sourceKey,
      name: title,
      normalizedName: normalizeDishName(title),
      description,
      sectionName: null,
      priceMinor: endpoint.priceMinor,
      priceKind: endpoint.priceKind,
      currency: "NOK",
      position: titlePosition,
      extractionMethod: "html_heuristic",
      confidence: 0.95,
      sourceExcerpt: lines.slice(titlePosition, pricePosition + 1).join(" — ").slice(0, 1000),
    });
  }

  if (unique.size < 4) return [];
  return [...unique.values()].sort((a, b) => a.position - b.position);
}
