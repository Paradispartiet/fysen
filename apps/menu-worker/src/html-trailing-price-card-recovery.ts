import { load } from "cheerio";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
  type MenuPriceKind,
} from "@fysen/menu-core";
import { recoverSemanticCategoryCardHtmlItems } from "./html-category-card-recovery.js";

export const HTML_TRAILING_PRICE_CARD_RECOVERY_VERSION = "trailing-price-card-v7";

const HEADING_MARKER = "__FYSEN_TRAILING_PRICE_HEADING_LEVEL_";
const PURE_PRICE_LINE = /^(?:(fra|from)\s+)?(?:(?:NOK\s*)|(?:kr\.?\s*))?([1-9]\d{1,3})(?:[.,](\d{1,2}))?(?:\s*(?:,-|kr\.?|NOK))?$/iu;
const TRAILING_MARKED_PRICE = /(?:(fra|from)\s+)?([1-9]\d{1,3})(?:[.,](\d{1,2}))?\s*(?:,-|kr\.?|NOK)\s*$/iu;
const ADDITIONAL_MARKED_PRICE = /[1-9]\d{1,3}(?:[.,]\d{1,2})?\s*(?:,-|kr\.?|NOK)/iu;
const SECTION_OR_UI_LABEL = /^(?:top\s+of\s+page|bottom\s+of\s+page|home|hjem|menu|meny|more|om\s+oss|about(?:\s+us)?|contact(?:\s+us)?|kontakt(?:\s+oss)?|opening(?:\s+hours)?|åpning(?:s)?\s*tider|address|adresse|booking|reservation(?:s)?|reservasjoner?|gift\s*card|gavekort|delivery\s*fee|leveringsgebyr|allergens?|allergener?|drinks?|drikke(?:meny)?|beverages?)$/iu;
const UI_ACTION_LEAD = /^(?:choose|select|velg|bestill|order|book|reserve|click|trykk|tap)\b/iu;
const DESCRIPTION_LEAD = /^(?:serveres?|servert|served|with|med|marinert|marinated|grillet|grilled|bakt|baked|braisert|braised|toppet|topped|inneholder|contains?|inkludert|including|alle\s+retter)\b/iu;
const ALLERGEN_METADATA = /^\(?\s*(?:allergener?|allergens?)\s*:/iu;
const PARENTHETICAL_METADATA_ONLY = /^\([^()]{1,120}\)$/u;
const LEADING_MENU_INDEX = /^(\d{1,3})\s*[.)]?\s+(.+)$/u;
const EXPLICIT_A_LA_CARTE_SCOPE = /^(?:a\s+la\s+carta|a\s+la\s+carte|à\s+la\s+carte)$/iu;
const NEXT_MENU_SCOPE = /^(?:breakfast|frokost|brunch|lunch|lunsj|tasting\s+menu|set\s+menu|drinks?|drikke(?:meny)?|bar\s+menu)$/iu;
const EXPLICIT_A_LA_CARTE_SECTION = "A LA CARTA";
const MAX_PRECEDING_TITLE_DISTANCE = 12;

interface ParsedTrailingPrice {
  readonly priceMinor: number;
  readonly priceKind: MenuPriceKind;
  readonly residual: string;
}

interface TrailingPriceCandidate {
  readonly item: MenuObservedItem;
  readonly sectionHint: string | null;
}

interface NumberedTrailingPriceCandidate {
  readonly candidate: TrailingPriceCandidate;
  readonly menuIndex: number;
  readonly name: string;
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
    PARENTHETICAL_METADATA_ONLY.test(line) ||
    DESCRIPTION_LEAD.test(line) ||
    (commaCount >= 3 && words.length >= 5) ||
    words.length >= 13 ||
    /[.!?]$/u.test(line)
  );
}

function looksLikeDishTitle(value: string): boolean {
  const title = normalizeVisibleLine(value);
  if (!title || title.length < 2 || title.length > 160 || !/\p{L}/u.test(title)) return false;
  if (title.startsWith(HEADING_MARKER)) return false;
  if (parseTrailingPrice(title) || SECTION_OR_UI_LABEL.test(title) || UI_ACTION_LEAD.test(title)) return false;
  if (looksLikeDescription(title) || /^(?:©|™|https?:\/\/|www\.)/iu.test(title)) return false;
  return title.split(/\s+/).filter(Boolean).length <= 12;
}

function annotatedLines(html: string): readonly string[] {
  const $ = load(html);
  $("script, style, noscript, svg, template").remove();
  $("br").replaceWith("\n");

  for (let level = 1; level <= 6; level += 1) {
    $(`h${level}`).each((_, element) => {
      $(element).prepend(`\n${HEADING_MARKER}${level}__\n`);
      $(element).append("\n");
    });
  }

  $("[role='heading'][aria-level]").each((_, element) => {
    if ($(element).is("h1, h2, h3, h4, h5, h6")) return;
    const level = Number($(element).attr("aria-level"));
    if (!Number.isInteger(level) || level < 1 || level > 6) return;
    $(element).prepend(`\n${HEADING_MARKER}${level}__\n`);
    $(element).append("\n");
  });

  $("p, li, tr, div, section, article").each((_, element) => {
    $(element).append("\n");
  });
  return $("body")
    .text()
    .split(/\n+/)
    .map(normalizeVisibleLine)
    .filter(Boolean);
}

function sectionHintBeforeTitle(lines: readonly string[], titlePosition: number): string | null {
  for (let index = titlePosition - 1; index >= 0; index -= 1) {
    const marker = lines[index]?.match(/^__FYSEN_TRAILING_PRICE_HEADING_LEVEL_([1-6])__$/u);
    if (!marker) continue;

    // A marker immediately before the selected title belongs to the title itself,
    // not to its menu section. Continue to the preceding heading in that case.
    if (index + 1 === titlePosition) continue;

    const headingTitle = normalizeVisibleLine(lines[index + 1] ?? "");
    if (!looksLikeDishTitle(headingTitle)) continue;
    return headingTitle;
  }
  return null;
}

function preserveDocumentedDuplicateSections(
  candidates: readonly TrailingPriceCandidate[],
): readonly MenuObservedItem[] {
  const titleCounts = new Map<string, number>();
  const hintCounts = new Map<string, number>();
  const distinctHints = new Map<string, Set<string>>();

  for (const candidate of candidates) {
    const name = candidate.item.normalizedName;
    titleCounts.set(name, (titleCounts.get(name) ?? 0) + 1);
    if (!candidate.sectionHint) continue;
    hintCounts.set(name, (hintCounts.get(name) ?? 0) + 1);
    const hints = distinctHints.get(name) ?? new Set<string>();
    hints.add(normalizeDishName(candidate.sectionHint));
    distinctHints.set(name, hints);
  }

  const unique = new Map<string, MenuObservedItem>();
  for (const candidate of candidates) {
    const name = candidate.item.normalizedName;
    const count = titleCounts.get(name) ?? 0;
    const hasCompleteSectionEvidence =
      count > 1 &&
      (hintCounts.get(name) ?? 0) === count &&
      (distinctHints.get(name)?.size ?? 0) >= 2 &&
      candidate.sectionHint !== null;
    const next = hasCompleteSectionEvidence
      ? {
          ...candidate.item,
          sectionName: candidate.sectionHint,
          sourceKey: createMenuItemSourceKey(candidate.item.name, candidate.sectionHint),
        }
      : candidate.item;
    unique.set(next.sourceKey, next);
  }

  return [...unique.values()].sort((a, b) => a.position - b.position);
}

function candidatesInExplicitAlaCarteScope(
  lines: readonly string[],
  candidates: readonly TrailingPriceCandidate[],
): readonly TrailingPriceCandidate[] {
  const scopeStart = lines.findIndex((line) => EXPLICIT_A_LA_CARTE_SCOPE.test(line));
  if (scopeStart < 0) return candidates;

  const relativeScopeEnd = lines.slice(scopeStart + 1).findIndex((line) => NEXT_MENU_SCOPE.test(line));
  const scopeEnd = relativeScopeEnd < 0 ? lines.length : scopeStart + 1 + relativeScopeEnd;
  const scoped = candidates.filter(
    ({ item }) => item.position > scopeStart && item.position < scopeEnd,
  );
  if (scoped.length < 4) return candidates;
  return scoped.map((candidate) => ({
    ...candidate,
    item: {
      ...candidate.item,
      sectionName: EXPLICIT_A_LA_CARTE_SECTION,
      sourceKey: createMenuItemSourceKey(candidate.item.name, EXPLICIT_A_LA_CARTE_SECTION),
      confidence: 0.99,
    },
  }));
}

function parseNumberedCandidate(
  candidate: TrailingPriceCandidate,
): NumberedTrailingPriceCandidate | null {
  const match = candidate.item.name.match(LEADING_MENU_INDEX);
  if (!match?.[1] || !match[2]) return null;
  const menuIndex = Number(match[1]);
  const name = normalizeVisibleLine(match[2]);
  if (!Number.isInteger(menuIndex) || menuIndex < 1 || menuIndex > 300) return null;
  if (!name || !/\p{L}/u.test(name)) return null;
  return { candidate, menuIndex, name };
}

function precedingNumberedTitle(
  lines: readonly string[],
  pricePosition: number,
): { readonly position: number; readonly title: string } | null {
  for (
    let index = pricePosition - 1;
    index >= Math.max(0, pricePosition - MAX_PRECEDING_TITLE_DISTANCE);
    index -= 1
  ) {
    const candidate = lines[index] ?? "";
    if (candidate.startsWith(HEADING_MARKER)) continue;
    if (parseTrailingPrice(candidate)) break;
    if (!LEADING_MENU_INDEX.test(candidate) || !looksLikeDishTitle(candidate)) continue;
    return { position: index, title: normalizeVisibleLine(candidate) };
  }
  return null;
}

function canonicalizeStrongNumberedMenu(
  candidates: readonly TrailingPriceCandidate[],
): readonly TrailingPriceCandidate[] | null {
  const ordered = [...candidates].sort((a, b) => a.item.position - b.item.position);
  const byIndex = new Map<number, NumberedTrailingPriceCandidate>();

  for (const candidate of ordered) {
    const numbered = parseNumberedCandidate(candidate);
    if (!numbered) continue;
    const existing = byIndex.get(numbered.menuIndex);
    if (existing) {
      const sameName = normalizeDishName(existing.name) === normalizeDishName(numbered.name);
      const samePrice = existing.candidate.item.priceMinor === numbered.candidate.item.priceMinor;
      const samePriceKind = existing.candidate.item.priceKind === numbered.candidate.item.priceKind;
      if (!sameName || !samePrice || !samePriceKind) return null;
      continue;
    }
    byIndex.set(numbered.menuIndex, numbered);
  }

  const numbered = [...byIndex.values()].sort(
    (a, b) => a.candidate.item.position - b.candidate.item.position,
  );
  if (numbered.length < 8) return null;

  for (let index = 1; index < numbered.length; index += 1) {
    if ((numbered[index]?.menuIndex ?? 0) <= (numbered[index - 1]?.menuIndex ?? 0)) return null;
  }

  const firstIndex = numbered[0]?.menuIndex ?? 0;
  const lastIndex = numbered[numbered.length - 1]?.menuIndex ?? 0;
  const indexSpan = lastIndex - firstIndex + 1;
  if (firstIndex > 5 || indexSpan < 8 || numbered.length / indexSpan < 0.7) return null;

  return numbered.map(({ candidate, name }) => ({
    ...candidate,
    item: {
      ...candidate.item,
      name,
      normalizedName: normalizeDishName(name),
      sourceKey: createMenuItemSourceKey(name),
    },
  }));
}

export function isStrongNumberedTrailingPriceCardRecovery(
  items: readonly MenuObservedItem[],
): boolean {
  return (
    items.length >= 8 &&
    items.every((item) => {
      const excerpt = item.sourceExcerpt?.trim() ?? "";
      return LEADING_MENU_INDEX.test(excerpt);
    })
  );
}

export function recoverTrailingPriceCardHtmlItems(html: string): readonly MenuObservedItem[] {
  const semanticCategoryItems = recoverSemanticCategoryCardHtmlItems(html);
  if (semanticCategoryItems.length >= 4) return semanticCategoryItems;

  const lines = annotatedLines(html);
  const candidates: TrailingPriceCandidate[] = [];

  for (let pricePosition = 0; pricePosition < lines.length; pricePosition += 1) {
    const endpoint = parseTrailingPrice(lines[pricePosition] ?? "");
    if (!endpoint) continue;

    let titlePosition: number | null = null;
    let title: string | null = null;
    const numberedTitle = precedingNumberedTitle(lines, pricePosition);
    if (numberedTitle) {
      titlePosition = numberedTitle.position;
      title = numberedTitle.title;
    } else if (endpoint.residual && looksLikeDishTitle(endpoint.residual)) {
      titlePosition = pricePosition;
      title = normalizeVisibleLine(endpoint.residual);
    } else {
      for (
        let index = pricePosition - 1;
        index >= Math.max(0, pricePosition - MAX_PRECEDING_TITLE_DISTANCE);
        index -= 1
      ) {
        const candidate = lines[index] ?? "";
        if (candidate.startsWith(HEADING_MARKER)) continue;
        if (parseTrailingPrice(candidate)) break;
        if (!looksLikeDishTitle(candidate)) continue;
        titlePosition = index;
        title = normalizeVisibleLine(candidate);
        break;
      }
    }
    if (titlePosition === null || !title) continue;

    const descriptionParts = lines
      .slice(titlePosition + 1, pricePosition)
      .map(normalizeVisibleLine)
      .filter((line) => Boolean(line) && !line.startsWith(HEADING_MARKER));
    if (endpoint.residual && titlePosition !== pricePosition) descriptionParts.push(endpoint.residual);
    const description = descriptionParts.length > 0 ? [...new Set(descriptionParts)].join(" ") : null;
    const sourceKey = createMenuItemSourceKey(title);

    candidates.push({
      item: {
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
        sourceExcerpt: lines
          .slice(titlePosition, pricePosition + 1)
          .filter((line) => !line.startsWith(HEADING_MARKER))
          .join(" — ")
          .slice(0, 1000),
      },
      sectionHint: sectionHintBeforeTitle(lines, titlePosition),
    });
  }

  const scopedCandidates = candidatesInExplicitAlaCarteScope(lines, candidates);
  const deduplicatedCandidates = preserveDocumentedDuplicateSections(scopedCandidates).map((item) => ({
    item,
    sectionHint: item.sectionName,
  }));
  const numberedCandidates = canonicalizeStrongNumberedMenu(deduplicatedCandidates);
  const items = numberedCandidates
    ? preserveDocumentedDuplicateSections(numberedCandidates)
    : deduplicatedCandidates.map(({ item }) => item);
  if (items.length < 4) return [];
  return items;
}
