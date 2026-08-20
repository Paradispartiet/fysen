import { load } from "cheerio";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
  type MenuPriceKind,
} from "@fysen/menu-core";

export const HTML_ADJACENT_HEADING_PRICE_RECOVERY_VERSION = "heading-price-v7";

const HEADING_MARKER = "__FYSEN_ADJACENT_HEADING_LEVEL_";
const PRICE_LINE = /^(?:(fra|from)\s+)?(?:(?:NOK\s*)|(?:kr\.?\s*))?([1-9]\d{0,3})(?:([.,])(\d{1,3}))?(?:\s*(?:,-|kr\.?|NOK))?$/iu;
const SECTION_OR_UI_LABEL = /^(?:our\s+menu|menu|meny|single\s+meat|single\s+(?:vegetar|vegetarian)(?:\s*&\s*vegan)?|pdf\s+version|drinks?|drikke(?:meny)?|popular\s+dish|opening(?:\s+hours)?|åpningstider|contact|kontakt|address|adresse|booking|reservation(?:s)?|reservasjoner?|allergens?|allergener?)$/iu;
const BEVERAGE_SECTION_HEADING = /^(?:drikke(?:meny)?|drinks?(?:\s+menu)?|beverages?(?:\s+menu)?|andre\s+drikker?|other\s+drinks?|bar(?:\s+menu)?|mineralvann|soft\s+drinks?|sodas?|brus|vinkart|vin(?:kart|liste|meny)?|wine(?:\s+(?:list|menu))?|cocktails?|champagne(?:\s+cocktails?)?|øl(?:\s*,?\s*cider.*)?|beer(?:s)?(?:\s*,?\s*cider.*)?|alkoholfritt|non[- ]alcoholic(?:\s+drinks?)?|kaffedrinker|coffee\s+drinks?|kaffe\/te.*|coffee\/tea.*)$/iu;
const BOTTLED_WATER_TITLE = /\b(?:still|sparkling)\s+(?:water|naturell)\b/iu;
const LEADING_MENU_INDEX = /^(\d{1,3})\s*[.)]?\s+(.+)$/u;

interface ParsedPrice {
  readonly priceMinor: number;
  readonly priceKind: MenuPriceKind;
}

interface HeadingPriceCandidate {
  readonly item: MenuObservedItem;
  readonly sectionHint: string | null;
}

interface NumberedHeadingCandidate {
  readonly candidate: HeadingPriceCandidate;
  readonly menuIndex: number;
  readonly name: string;
}

function normalizeVisibleLine(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}

function parsePrice(value: string): ParsedPrice | null {
  const match = normalizeVisibleLine(value).match(PRICE_LINE);
  if (!match?.[2]) return null;

  const separator = match[3] ?? null;
  const trailingDigits = match[4] ?? "";
  let whole = Number(match[2]);
  let decimals = "";

  if (separator === "." && trailingDigits.length === 3) {
    whole = Number(`${match[2]}${trailingDigits}`);
  } else {
    if (trailingDigits.length > 2) return null;
    decimals = trailingDigits.padEnd(2, "0").slice(0, 2);
  }

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

  $("[role='heading'][aria-level]").each((_, element) => {
    if ($(element).is("h1, h2, h3, h4, h5, h6")) return;
    const level = Number($(element).attr("aria-level"));
    if (!Number.isInteger(level) || level < 1 || level > 6) return;
    $(element).prepend(`\n${HEADING_MARKER}${level}__ `);
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

function nearestSemanticSectionHeading(
  lines: readonly string[],
  position: number,
  dishHeadingLevel: number,
): string | null {
  for (let index = position - 1; index >= 0; index -= 1) {
    const heading = (lines[index] ?? "").match(
      /^__FYSEN_ADJACENT_HEADING_LEVEL_([1-6])__\s*(.*)$/u,
    );
    if (!heading?.[1]) continue;
    const level = Number(heading[1]);
    if (level >= dishHeadingLevel) continue;

    const title = normalizeVisibleLine(heading[2] ?? "");
    if (!title || SECTION_OR_UI_LABEL.test(title) || BEVERAGE_SECTION_HEADING.test(title)) continue;
    return title;
  }
  return null;
}

function parseNumberedCandidate(candidate: HeadingPriceCandidate): NumberedHeadingCandidate | null {
  const match = candidate.item.name.match(LEADING_MENU_INDEX);
  if (!match?.[1] || !match[2]) return null;
  const menuIndex = Number(match[1]);
  const name = normalizeVisibleLine(match[2]);
  if (!Number.isInteger(menuIndex) || menuIndex < 1 || menuIndex > 300) return null;
  if (!name || !/\p{L}/u.test(name)) return null;
  return { candidate, menuIndex, name };
}

function canonicalizeStrongNumberedHeadingMenu(
  candidates: readonly HeadingPriceCandidate[],
): readonly HeadingPriceCandidate[] | null {
  const ordered = [...candidates].sort((a, b) => a.item.position - b.item.position);
  const byIndex = new Map<number, NumberedHeadingCandidate>();

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
  if (indexSpan < 8 || numbered.length / indexSpan < 0.7) return null;

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

function applyDuplicateSectionIdentity(
  candidates: readonly HeadingPriceCandidate[],
): readonly MenuObservedItem[] {
  const byName = new Map<string, HeadingPriceCandidate[]>();
  for (const candidate of candidates) {
    const group = byName.get(candidate.item.normalizedName) ?? [];
    group.push(candidate);
    byName.set(candidate.item.normalizedName, group);
  }

  const sectionScopedNames = new Set<string>();
  for (const [normalizedName, group] of byName) {
    if (group.length < 2) continue;
    const sectionHints = group
      .map((candidate) => candidate.sectionHint)
      .filter((value): value is string => Boolean(value));
    if (sectionHints.length !== group.length) continue;
    const distinctSections = new Set(sectionHints.map(normalizeDishName));
    if (distinctSections.size >= 2) sectionScopedNames.add(normalizedName);
  }

  const unique = new Map<string, MenuObservedItem>();
  for (const candidate of candidates) {
    const sectionName = sectionScopedNames.has(candidate.item.normalizedName)
      ? candidate.sectionHint
      : null;
    const item = sectionName
      ? {
          ...candidate.item,
          sectionName,
          sourceKey: createMenuItemSourceKey(candidate.item.name, sectionName),
        }
      : candidate.item;
    unique.set(item.sourceKey, item);
  }

  return [...unique.values()].sort((a, b) => a.position - b.position);
}

export function recoverAdjacentHeadingPriceHtmlItems(html: string): readonly MenuObservedItem[] {
  const lines = annotatedLines(html);
  const byHeadingLevel = new Map<number, HeadingPriceCandidate[]>();
  let blockedSectionLevel: number | null = null;

  for (let position = 0; position < lines.length; position += 1) {
    const line = lines[position] ?? "";
    const heading = line.match(/^__FYSEN_ADJACENT_HEADING_LEVEL_([1-6])__\s*(.*)$/u);
    if (!heading?.[1]) continue;

    const headingLevel = Number(heading[1]);
    const title = normalizeVisibleLine(heading[2] ?? "");

    if (blockedSectionLevel !== null && headingLevel <= blockedSectionLevel) {
      blockedSectionLevel = null;
    }
    if (BEVERAGE_SECTION_HEADING.test(title)) {
      blockedSectionLevel = headingLevel;
      continue;
    }
    if (blockedSectionLevel !== null && headingLevel > blockedSectionLevel) continue;
    if (!looksLikeDishTitle(title)) continue;

    let price: ParsedPrice | null = null;
    let pricePosition: number | null = null;
    const scanEnd = Math.min(lines.length, position + 5);
    for (let index = position + 1; index < scanEnd; index += 1) {
      const candidate = lines[index] ?? "";
      const nestedHeading = candidate.match(/^__FYSEN_ADJACENT_HEADING_LEVEL_([1-6])__\s*(.*)$/u);
      if (nestedHeading?.[1]) {
        const nestedLevel = Number(nestedHeading[1]);
        const nestedTitle = normalizeVisibleLine(nestedHeading[2] ?? "");
        if (nestedLevel > headingLevel && SECTION_OR_UI_LABEL.test(nestedTitle)) continue;
        break;
      }
      const parsed = parsePrice(candidate);
      if (!parsed) continue;
      price = parsed;
      pricePosition = index;
      break;
    }
    if (!price || pricePosition === null) continue;

    const sourceKey = createMenuItemSourceKey(title);
    const item: MenuObservedItem = {
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
    };
    const items = byHeadingLevel.get(headingLevel) ?? [];
    items.push({
      item,
      sectionHint: nearestSemanticSectionHeading(lines, position, headingLevel),
    });
    byHeadingLevel.set(headingLevel, items);
  }

  const allCandidates = [...byHeadingLevel.values()]
    .flat()
    .sort((a, b) => a.item.position - b.item.position);
  const strongNumberedMenu = canonicalizeStrongNumberedHeadingMenu(allCandidates);
  if (strongNumberedMenu) return applyDuplicateSectionIdentity(strongNumberedMenu);

  const strongest = [...byHeadingLevel.values()].sort((a, b) => b.length - a.length)[0] ?? [];
  if (strongest.length < 4) return [];
  return applyDuplicateSectionIdentity(strongest);
}
