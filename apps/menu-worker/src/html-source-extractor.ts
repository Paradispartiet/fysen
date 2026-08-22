import { load } from "cheerio";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";
import {
  extractHtmlMenu,
  stripExplicitlyHiddenHtmlContent,
  type ExtractedHtmlMenu,
} from "./html-extractor.js";

export const HTML_SOURCE_EXTRACTOR_VERSION = "html-v19";

const HEADING_MARKER = "__FYSEN_HEADING_LEVEL_";
const BEVERAGE_SECTION_HEADING = /^(?:drikke(?:meny)?|drinks?(?:\s+menu)?|beverages?(?:\s+menu)?|andre\s+drikker?|other\s+drinks?|bar(?:\s+menu)?|mineralvann|soft\s+drinks?|sodas?|brus|vinkart|vin(?:kart|liste|meny)?|vin\s*(?:&|og)\s*musserende|wine(?:\s+(?:list|menu))?|wine\s*(?:&|and)\s*sparkling|cocktails?|champagne(?:\s+cocktails?)?|portvin|port\s+wine|bitter|cognac|armagnac|brandy|scotch\s+whisk(?:e)?y|irish\s+whisk(?:e)?y|american\s+whisk(?:e)?y|whisk(?:e)?y|calvados|aquavit|akevitt|liquor|likør|hetvin|fortified\s+wine|campari|grappa|vodka(?:\s*,\s*gin\s*,\s*tequila)?|gin|tequila|øl(?:\s*,?\s*cider.*)?|beer(?:s)?(?:\s*,?\s*cider.*)?|alkoholfritt|non[- ]alcoholic(?:\s+drinks?)?|kaffedrinker|coffee\s+drinks?|kaffe\/te.*|coffee\/tea.*)$/iu;
const MENU_END_SECTION_HEADING = /^(?:allergen(?:oversikt|er|s)?|reservasjoner?|reservations?|kontakt(?:\s+oss)?|contact(?:\s+us)?|booking|bordbestilling)$/iu;
const FOOD_SECTION_LABEL = /^(?:forretter?|starters?|appetizers?|small\s+plates?|small\s+dishes?\s*(?:&|and)\s*sharing\s+plates?|classics?|dumplings?|proteins?|hovedretter?|mains?|main\s+courses?|desserter?|desserts?|sushiruller?|sushi\s+rolls?|sushi|sides?|tilbehør|noodles?|nudler|curr(?:y|ies)|wok|soups?|supper?|salads?|salater?)$/iu;
const DUPLICATE_DISH_SECTION_LABEL = /^(?:forretter?|starters?|appetizers?|small\s+dishes?\s*(?:&|and)\s*sharing\s+plates?|classics?|småretter|hovedretter?|mains?|main\s+courses?|dessert(?:er|s)?|tilbehør|sides?|pizza(?:er|s)?|pizzeria|kylling\s+og\s+lam|mezah[- ]retter|salater?\s*(?:&|og)\s*suppe(?:r)?|kylling|kjøttretter?|fiskeretter?|salater?|supper?)$/iu;
const BEVERAGE_ITEM_NAME = /^(?:kaffe(?:\b|[-/])|coffee(?:\b|[-/])|filterkaffe\b|iskaffe\b|iced\s+coffee\b|espresso\b|americano\b|cappuccino\b|latte\b|arabisk\s+kaffe\b|libanesisk\s+kaffe\b|te(?:\b|[-/])|tea(?:\b|[-/])|(?:grønn\s+|green\s+)?thai\s+(?:te|tea)\b)/iu;
const PRICE_TOKEN = "(?:(?:kr\\.?\\s*)?[1-9]\\d{1,3}(?:[.,]\\d{1,2})?(?:\\s*(?:,-|kr\\.?|nok))?)";
const PRICE_AT_END = new RegExp(`\\s+${PRICE_TOKEN}$`, "iu");
const STANDALONE_PRICE = new RegExp(`^${PRICE_TOKEN}$`, "iu");
const PRICE_VALUE_AT_END = /(?:^|\s)(?:kr\.?\s*)?([1-9]\d{1,3})(?:[.,](\d{1,2}))?(?:\s*(?:,-|kr\.?|nok))?$/iu;
const CARD_TITLE_BOUNDARY = /^(?:menu|meny|opening|åpning|hours|contact|kontakt|address|adresse|booking|reservasjoner?|mineralvann|drinks?|drikke|wine|vin|beer|øl|allerg|meet the dishes|see the whole menu)\b/iu;
const NUMBERED_DISH_TITLE = /^(?!\d{1,4}\s*(?:kr\.?|nok)\b)(?:\d{1,3}\s*[.)]?\s+\p{L}|\d{1,3}\s*[.)]\s+\d+\s+\p{L})/iu;
const EXTRAS_TRIGGER = /^(?:ekstra\s+sulten\s*\??|extra\s+hungry\s*\??|extras?\s*\??|add[- ]?ons?\s*\??|tillegg\s*\??)$/iu;
const MORE_LABEL = /^(?:vis\s+mer|show\s+more)$/iu;
const TRAILING_ALLERGEN_CODES = /\s+\((?:[\p{L}\d]{1,5}\s*,?\s*){1,20}\)$/u;

const LEADING_QUANTITY_UNIT =
  /^\d{1,4}\s+(?:g|gram(?:s)?|kg|ml|cl|l|stk|st|pcs?|pieces?|biter|biter\s+av)\b/iu;

function normalizeVisibleLine(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}

function stripMenuNumber(value: string): string {
  const normalized = normalizeVisibleLine(value);
  if (LEADING_QUANTITY_UNIT.test(normalized)) return normalized;
  return normalized.replace(/^\d{1,3}\s*[.)]?\s+/u, "").trim();
}

function stripTrailingAllergenCodes(value: string): string {
  return value.replace(TRAILING_ALLERGEN_CODES, "").trim();
}

function canonicalNumberedTitle(value: string): string {
  return stripMenuNumber(value).replace(PRICE_AT_END, "").trim();
}

function canonicalCardTitle(value: string): string {
  return stripTrailingAllergenCodes(canonicalNumberedTitle(value));
}

function isBeverageSectionHeading(value: string): boolean {
  return BEVERAGE_SECTION_HEADING.test(normalizeVisibleLine(value));
}

function isPlainFoodSectionLabel(value: string): boolean {
  return FOOD_SECTION_LABEL.test(normalizeVisibleLine(value));
}

function isBeverageItemName(value: string): boolean {
  return BEVERAGE_ITEM_NAME.test(normalizeVisibleLine(value));
}

function isObviousMetadataItem(value: string): boolean {
  const name = normalizeVisibleLine(value);
  return /\b(?:since|est(?:ablished)?\.?)$/iu.test(name) || /^(?:©|™)/u.test(name);
}

function annotatedVisibleLines(html: string): readonly string[] {
  const $ = load(html);
  $("script, style, noscript, svg, template").remove();
  $("br").replaceWith("\n");
  $("td, th").each((_, element) => {
    $(element).append(" ");
  });

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

function numberedDishNames(lines: readonly string[]): ReadonlySet<string> {
  const names = new Set<string>();
  for (const line of lines) {
    if (!NUMBERED_DISH_TITLE.test(line)) continue;
    const name = canonicalNumberedTitle(line);
    if (name && /\p{L}/u.test(name)) names.add(normalizeDishName(name));
  }
  return names;
}

function isNumberedMenu(lines: readonly string[]): boolean {
  return numberedDishNames(lines).size >= 2;
}

function addonOptionNames(lines: readonly string[]): ReadonlySet<string> {
  const names = new Set<string>();
  if (!isNumberedMenu(lines)) return names;

  let insideAddons = false;
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]?.trim() ?? "";
    if (!line) continue;

    if (line.startsWith(HEADING_MARKER) || NUMBERED_DISH_TITLE.test(line) || MORE_LABEL.test(line)) {
      insideAddons = false;
      continue;
    }
    if (EXTRAS_TRIGGER.test(line)) {
      insideAddons = true;
      continue;
    }
    if (!insideAddons || STANDALONE_PRICE.test(line)) continue;

    const next = lines[index + 1]?.trim() ?? "";
    if (!next || !STANDALONE_PRICE.test(next)) continue;
    const candidate = stripMenuNumber(line);
    if (!candidate || !/\p{L}/u.test(candidate) || candidate.length > 120) continue;
    names.add(normalizeDishName(candidate));
  }

  return names;
}

interface FoodScopedText {
  readonly visibleText: string;
  readonly headingLevels: ReadonlyMap<number, number>;
}

function foodScopedText(lines: readonly string[]): FoodScopedText {
  const numberedMenu = isNumberedMenu(lines);
  const output: string[] = [];
  const headingLevels = new Map<number, number>();
  let blockedHeadingLevel: number | null = null;
  let skippingAddons = false;
  let sawFoodSignal = false;

  for (const line of lines) {
    const headingMatch = line.match(/^__FYSEN_HEADING_LEVEL_([1-6])__\s*(.*)$/u);
    if (headingMatch) {
      skippingAddons = false;
      const headingLevel = Number(headingMatch[1]);
      const headingText = normalizeVisibleLine(headingMatch[2] ?? "");

      if (blockedHeadingLevel !== null && headingLevel <= blockedHeadingLevel) {
        blockedHeadingLevel = null;
      }
      if (blockedHeadingLevel === null && sawFoodSignal && MENU_END_SECTION_HEADING.test(headingText)) {
        break;
      }
      if (blockedHeadingLevel === null && isBeverageSectionHeading(headingText)) {
        blockedHeadingLevel = headingLevel;
      }
      if (blockedHeadingLevel === null && headingText) {
        headingLevels.set(output.length, headingLevel);
        output.push(headingText);
      }
      continue;
    }

    if (blockedHeadingLevel !== null) continue;

    if (numberedMenu && EXTRAS_TRIGGER.test(line)) {
      skippingAddons = true;
      continue;
    }
    if (skippingAddons) {
      if (NUMBERED_DISH_TITLE.test(line)) {
        skippingAddons = false;
        output.push(line);
      }
      continue;
    }
    if (MORE_LABEL.test(line)) continue;
    if (STANDALONE_PRICE.test(line) || PRICE_AT_END.test(line)) sawFoodSignal = true;
    output.push(line);
  }

  return { visibleText: output.join("\n"), headingLevels };
}

function parsePriceMinorAtEnd(value: string): number | null {
  const match = normalizeVisibleLine(value).match(PRICE_VALUE_AT_END);
  if (!match?.[1]) return null;
  const whole = Number(match[1]);
  const decimals = (match[2] ?? "").padEnd(2, "0").slice(0, 2);
  const priceMinor = whole * 100 + Number(decimals || "0");
  return priceMinor >= 4_000 && priceMinor <= 1_000_000 ? priceMinor : null;
}

interface NumberedMenuExtraction {
  readonly items: readonly MenuObservedItem[];
  readonly titleCount: number;
}

function extractNumberedMenuItems(visibleText: string): NumberedMenuExtraction {
  const lines = visibleText.split("\n").map(normalizeVisibleLine).filter(Boolean);
  const titlePositions = lines
    .map((line, index) => (NUMBERED_DISH_TITLE.test(line) ? index : -1))
    .filter((index) => index >= 0);
  const titleNames = numberedDishNames(lines);
  if (titleNames.size < 2) return { items: [], titleCount: titleNames.size };

  const unique = new Map<string, MenuObservedItem>();
  for (const [titleOffset, position] of titlePositions.entries()) {
    const rawTitle = lines[position] ?? "";
    const name = canonicalNumberedTitle(rawTitle);
    if (!name || isBeverageItemName(name) || isObviousMetadataItem(name)) continue;

    const nextTitlePosition = titlePositions[titleOffset + 1] ?? lines.length;
    const scanEnd = Math.min(nextTitlePosition, position + 9);
    let priceMinor: number | null = null;
    let pricePosition: number | null = null;
    let pricedDescriptionTail: string | null = null;

    for (let index = position + 1; index < scanEnd; index += 1) {
      const line = lines[index] ?? "";
      if (!line || EXTRAS_TRIGGER.test(line)) break;
      const parsedPrice = parsePriceMinorAtEnd(line);
      if (parsedPrice === null) continue;
      priceMinor = parsedPrice;
      pricePosition = index;
      if (!STANDALONE_PRICE.test(line)) {
        pricedDescriptionTail = line.replace(PRICE_AT_END, "").trim() || null;
      }
      break;
    }
    if (priceMinor === null || pricePosition === null) continue;

    const descriptionParts = lines
      .slice(position + 1, pricePosition)
      .filter(
        (line) =>
          line &&
          !line.startsWith(HEADING_MARKER) &&
          !EXTRAS_TRIGGER.test(line) &&
          !MORE_LABEL.test(line) &&
          !STANDALONE_PRICE.test(line),
      );
    if (pricedDescriptionTail) descriptionParts.push(pricedDescriptionTail);
    const description = descriptionParts.join(" ").trim() || null;
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
      confidence: 0.92,
      sourceExcerpt: lines.slice(position, pricePosition + 1).join(" — ").slice(0, 1000),
    });
  }

  return { items: [...unique.values()].sort((a, b) => a.position - b.position), titleCount: titleNames.size };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function syntheticHtmlFromVisibleText(visibleText: string): string {
  const body = visibleText
    .split("\n")
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");
  return `<html><body>${body}</body></html>`;
}

function plausibleCardTitle(value: string): boolean {
  const title = normalizeVisibleLine(value);
  if (title.length < 2 || title.length > 180 || !/\p{L}/u.test(title)) return false;
  if (PRICE_AT_END.test(title) || STANDALONE_PRICE.test(title) || CARD_TITLE_BOUNDARY.test(title)) return false;
  if (/^[*+]/u.test(title) || /https?:\/\/|@/iu.test(title)) return false;
  return true;
}

function looksLikeSectionHeading(value: string): boolean {
  const title = normalizeVisibleLine(value);
  const letters = title.replace(/[^\p{L}]+/gu, "");
  return letters.length >= 3 && title === title.toLocaleUpperCase("nb-NO") && title.split(/\s+/).length <= 5;
}

type TitleScript = "latin" | "han" | "hangul" | "kana" | "cyrillic" | "arabic" | "devanagari";

function dominantTitleScript(value: string): TitleScript | null {
  const scripts: readonly [TitleScript, RegExp][] = [
    ["latin", /\p{Script=Latin}/gu],
    ["han", /\p{Script=Han}/gu],
    ["hangul", /\p{Script=Hangul}/gu],
    ["kana", /[\p{Script=Hiragana}\p{Script=Katakana}]/gu],
    ["cyrillic", /\p{Script=Cyrillic}/gu],
    ["arabic", /\p{Script=Arabic}/gu],
    ["devanagari", /\p{Script=Devanagari}/gu],
  ];
  let best: { script: TitleScript; count: number } | null = null;
  for (const [script, pattern] of scripts) {
    const count = value.match(pattern)?.length ?? 0;
    if (count > (best?.count ?? 0)) best = { script, count };
  }
  return best && best.count >= 2 ? best.script : null;
}

function recoveredTitle(
  lines: readonly string[],
  titleIndex: number,
  headingLevels?: ReadonlyMap<number, number>,
): string | null {
  const rawCurrent = lines[titleIndex]?.trim() ?? "";
  if (!plausibleCardTitle(rawCurrent)) return null;
  const current = canonicalCardTitle(rawCurrent);
  if (!current) return null;

  if (headingLevels && !headingLevels.has(titleIndex - 1)) return current;
  const rawPrevious = lines[titleIndex - 1]?.trim() ?? "";
  if (!plausibleCardTitle(rawPrevious) || looksLikeSectionHeading(rawPrevious)) return current;
  const previous = canonicalCardTitle(rawPrevious);
  if (!previous) return current;
  const previousScript = dominantTitleScript(previous);
  const currentScript = dominantTitleScript(current);
  if (!previousScript || !currentScript || previousScript === currentScript) return current;

  return normalizeVisibleLine(`${previous} ${current}`);
}

function looksLikeCardDescription(item: MenuObservedItem): boolean {
  const words = normalizeVisibleLine(item.name).split(/\s+/).filter(Boolean);
  return words.length >= 4 || /[.!?]$/u.test(item.name) || Boolean(item.description);
}

function looksLikeDescriptionLine(value: string): boolean {
  const line = normalizeVisibleLine(value);
  const words = line.split(/\s+/).filter(Boolean);
  return words.length >= 4 || /[.!?]$/u.test(line);
}

function looksLikeStrongDescriptionLine(value: string): boolean {
  const line = normalizeVisibleLine(value);
  const words = line.split(/\s+/).filter(Boolean);
  return /[.!?]$/u.test(line) || words.length >= 6;
}

function hasRepeatedHeadingLevel(headingLevels: ReadonlyMap<number, number>, position: number): boolean {
  const level = headingLevels.get(position);
  if (level === undefined) return false;
  let count = 0;
  for (const candidate of headingLevels.values()) {
    if (candidate !== level) continue;
    count += 1;
    if (count >= 2) return true;
  }
  return false;
}

function looksLikeStandaloneBlockTitle(value: string): boolean {
  const title = canonicalCardTitle(value);
  if (
    !plausibleCardTitle(title) ||
    isBeverageItemName(title) ||
    isObviousMetadataItem(title) ||
    isPlainFoodSectionLabel(title)
  ) {
    return false;
  }
  const words = title.split(/\s+/).filter(Boolean);
  if (words.length > 8) return false;
  if (/[.!?]$/u.test(title) || /[,;:]$/u.test(title)) return false;
  return !/^(?:with|served|topped|contains?|including|med|servert|toppet|inneholder|inkludert)\b/iu.test(title);
}

function looksLikeStandaloneHeadingTitle(value: string): boolean {
  const title = canonicalCardTitle(value);
  if (
    !plausibleCardTitle(title) ||
    isBeverageItemName(title) ||
    isObviousMetadataItem(title) ||
    isPlainFoodSectionLabel(title)
  ) {
    return false;
  }
  const words = title.split(/\s+/).filter(Boolean);
  if (words.length > 16 || /[,;:]$/u.test(title)) return false;
  return !/^(?:with|served|topped|contains?|including|med|servert|toppet|inneholder|inkludert)\b/iu.test(title);
}

function looksLikeImmediateUppercaseTitle(value: string): boolean {
  const title = canonicalCardTitle(value);
  if (!looksLikeStandaloneHeadingTitle(title)) return false;
  const letters = title.replace(/[^\p{L}]+/gu, "");
  return letters.length >= 3 && title === title.toLocaleUpperCase("nb-NO");
}

interface StandalonePriceBlockExtraction {
  readonly items: readonly MenuObservedItem[];
  readonly priceCount: number;
}

interface StandalonePriceBlockCandidate {
  readonly item: MenuObservedItem;
  readonly sectionHint: string | null;
}

function duplicateDishSectionHint(
  lines: readonly string[],
  headingLevels: ReadonlyMap<number, number>,
  titleIndex: number,
): string | null {
  const titleLevel = headingLevels.get(titleIndex);
  for (let index = titleIndex - 1; index >= 0; index -= 1) {
    const headingLevel = headingLevels.get(index);
    if (headingLevel === undefined) continue;
    if (titleLevel !== undefined && headingLevel >= titleLevel) continue;
    const heading = normalizeVisibleLine(lines[index] ?? "");
    if (DUPLICATE_DISH_SECTION_LABEL.test(heading)) return heading;
  }
  return null;
}

function extractStandalonePriceBlocks(
  visibleText: string,
  headingLevels: ReadonlyMap<number, number>,
): StandalonePriceBlockExtraction {
  const lines = visibleText.split("\n").map(normalizeVisibleLine).filter(Boolean);
  const pricePositions = lines
    .map((line, index) => (STANDALONE_PRICE.test(line) ? index : -1))
    .filter((index) => index >= 0);
  const candidates: StandalonePriceBlockCandidate[] = [];

  for (const [priceOffset, pricePosition] of pricePositions.entries()) {
    const priceMinor = parsePriceMinorAtEnd(lines[pricePosition] ?? "");
    if (priceMinor === null) continue;

    const previousPrice = pricePositions[priceOffset - 1] ?? -1;
    const blockStart = previousPrice + 1;
    if (blockStart >= pricePosition) continue;

    let lastHeading: number | null = null;
    for (let index = blockStart; index < pricePosition; index += 1) {
      if (headingLevels.has(index)) lastHeading = index;
    }

    let titleIndex: number | null = null;
    let name: string | null = null;

    const immediateTitleIndex = pricePosition - 1;
    const immediateTitle = lines[immediateTitleIndex]?.trim() ?? "";
    if (
      immediateTitleIndex >= blockStart &&
      looksLikeImmediateUppercaseTitle(immediateTitle)
    ) {
      titleIndex = immediateTitleIndex;
      name = canonicalCardTitle(immediateTitle);
    }

    if (titleIndex === null && lastHeading !== null) {
      const firstContentIndex = (() => {
        for (let index = lastHeading + 1; index < pricePosition; index += 1) {
          if (headingLevels.has(index)) continue;
          const line = lines[index]?.trim() ?? "";
          if (line) return index;
        }
        return null;
      })();
      const firstContent = firstContentIndex === null ? "" : lines[firstContentIndex] ?? "";
      const repeatedLevel = hasRepeatedHeadingLevel(headingLevels, lastHeading);
      const strongUniqueCard = !repeatedLevel && looksLikeStrongDescriptionLine(firstContent);
      const headingTitle = recoveredTitle(lines, lastHeading, headingLevels);
      const directRepeatedHeadingPrice = firstContentIndex === null && repeatedLevel;
      const firstContentIsPlausibleTitle =
        Boolean(firstContent) && looksLikeStandaloneBlockTitle(firstContent);
      const descriptionAnchoredHeading =
        Boolean(firstContent) &&
        !firstContentIsPlausibleTitle &&
        looksLikeDescriptionLine(firstContent) &&
        (repeatedLevel || strongUniqueCard);
      if (
        headingTitle &&
        ((directRepeatedHeadingPrice && looksLikeStandaloneHeadingTitle(headingTitle)) ||
          (descriptionAnchoredHeading && looksLikeStandaloneBlockTitle(headingTitle)))
      ) {
        titleIndex = lastHeading;
        name = headingTitle;
      }
    }

    if (titleIndex === null) {
      const scanFrom = lastHeading === null ? blockStart : lastHeading + 1;
      for (let index = scanFrom; index < pricePosition; index += 1) {
        if (headingLevels.has(index)) continue;
        const candidate = lines[index]?.trim() ?? "";
        if (!candidate || !looksLikeStandaloneBlockTitle(candidate)) continue;
        titleIndex = index;
        name = canonicalCardTitle(candidate);
        break;
      }
    }

    if (titleIndex === null || !name) continue;

    const descriptionLines = lines
      .slice(titleIndex + 1, pricePosition)
      .filter((line, offset) => {
        const absoluteIndex = titleIndex! + 1 + offset;
        return (
          line &&
          !headingLevels.has(absoluteIndex) &&
          !STANDALONE_PRICE.test(line) &&
          !PRICE_AT_END.test(line) &&
          !CARD_TITLE_BOUNDARY.test(line) &&
          !MORE_LABEL.test(line) &&
          !EXTRAS_TRIGGER.test(line)
        );
      });
    const description = descriptionLines.join(" ").trim() || null;
    const sourceKey = createMenuItemSourceKey(name);
    const item: MenuObservedItem = {
      sourceKey,
      name,
      normalizedName: normalizeDishName(name),
      description,
      sectionName: null,
      priceMinor,
      currency: "NOK",
      position: titleIndex,
      extractionMethod: "html_heuristic",
      confidence: 0.9,
      sourceExcerpt: lines.slice(titleIndex, pricePosition + 1).join(" — ").slice(0, 1000),
    };

    candidates.push({
      item,
      sectionHint: duplicateDishSectionHint(lines, headingLevels, titleIndex),
    });
  }

  const candidatesByName = new Map<string, StandalonePriceBlockCandidate[]>();
  for (const candidate of candidates) {
    const group = candidatesByName.get(candidate.item.normalizedName) ?? [];
    group.push(candidate);
    candidatesByName.set(candidate.item.normalizedName, group);
  }

  const sectionScopedNames = new Set<string>();
  for (const [normalizedName, group] of candidatesByName) {
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
    const next = sectionName
      ? {
          ...candidate.item,
          sectionName,
          sourceKey: createMenuItemSourceKey(candidate.item.name, sectionName),
        }
      : candidate.item;
    unique.set(next.sourceKey, next);
  }

  return {
    items: [...unique.values()].sort((a, b) => a.position - b.position),
    priceCount: pricePositions.length,
  };
}

interface CardRecovery {
  readonly lineIndex: number;
  readonly title: string;
  readonly description?: string | null;
}

function headingCardRecoveryAtItemPosition(
  lines: readonly string[],
  headingLevels: ReadonlyMap<number, number>,
  item: MenuObservedItem,
): CardRecovery | null {
  const position = item.position;
  if (!Number.isInteger(position) || position < 1 || position >= lines.length) return null;

  const scanStart = Math.max(0, position - 9);
  let headingIndex: number | null = null;
  for (let index = position - 1; index >= scanStart; index -= 1) {
    const line = lines[index]?.trim() ?? "";
    if (!line) continue;
    if (STANDALONE_PRICE.test(line) || PRICE_AT_END.test(line)) return null;
    if (headingLevels.has(index)) {
      headingIndex = index;
      break;
    }
  }
  if (headingIndex === null || !hasRepeatedHeadingLevel(headingLevels, headingIndex)) return null;

  const rawTitle = lines[headingIndex]?.trim() ?? "";
  if (looksLikeSectionHeading(rawTitle)) return null;
  const title = recoveredTitle(lines, headingIndex, headingLevels);
  if (!title) return null;

  const blockLines = lines.slice(headingIndex + 1, position);
  const pricedLine = lines[position]?.trim() ?? "";
  if (PRICE_AT_END.test(pricedLine) && !STANDALONE_PRICE.test(pricedLine)) {
    const inlineDescription = pricedLine.replace(PRICE_AT_END, "").trim();
    if (inlineDescription) blockLines.push(inlineDescription);
  }

  const normalizedBlock = normalizeDishName(blockLines.join(" "));
  if (!item.normalizedName || !normalizedBlock.includes(item.normalizedName)) return null;

  const descriptionLines = blockLines.filter(
    (line) =>
      line &&
      !STANDALONE_PRICE.test(line) &&
      !PRICE_AT_END.test(line) &&
      !CARD_TITLE_BOUNDARY.test(line),
  );
  if (!descriptionLines.some(looksLikeDescriptionLine)) return null;

  return {
    lineIndex: position,
    title,
    description: descriptionLines.join(" ").trim() || null,
  };
}

function cardRecoveryAtItemPosition(lines: readonly string[], item: MenuObservedItem): CardRecovery | null {
  const position = item.position;
  if (!Number.isInteger(position) || position < 0 || position >= lines.length) return null;
  const pricedLine = lines[position]?.trim() ?? "";

  if (PRICE_AT_END.test(pricedLine) && pricedLine.startsWith(item.name)) {
    const title = recoveredTitle(lines, position - 1);
    return title ? { lineIndex: position, title } : null;
  }

  if (STANDALONE_PRICE.test(pricedLine)) {
    const descriptionLine = lines[position - 1]?.trim() ?? "";
    if (!descriptionLine || !descriptionLine.startsWith(item.name)) return null;
    const title = recoveredTitle(lines, position - 2);
    return title ? { lineIndex: position, title } : null;
  }

  return null;
}

function findFallbackCardRecovery(
  lines: readonly string[],
  item: MenuObservedItem,
  startIndex: number,
): CardRecovery | null {
  for (let index = Math.max(0, startIndex); index < lines.length; index += 1) {
    const line = lines[index] ?? "";
    if (!PRICE_AT_END.test(line) || !line.startsWith(item.name)) continue;
    const title = recoveredTitle(lines, index - 1);
    if (title) return { lineIndex: index, title };
  }
  return null;
}

function recoveredDescription(item: MenuObservedItem, recovery: CardRecovery): string | null {
  if (recovery.description !== undefined) return recovery.description;
  const parts = [item.name, item.description]
    .map((value) => value?.trim() ?? "")
    .filter(Boolean);
  if (parts.length === 0) return null;
  return [...new Set(parts)].join(" ");
}

function recoverRepeatedCardTitles(
  visibleText: string,
  headingLevels: ReadonlyMap<number, number>,
  items: readonly MenuObservedItem[],
): readonly MenuObservedItem[] {
  if (items.length < 2) return items;
  const lines = visibleText.split("\n");
  const recoveries = new Map<number, CardRecovery>();
  let searchFrom = 0;

  for (const [itemIndex, item] of items.entries()) {
    if (!looksLikeCardDescription(item)) continue;
    const recovery =
      headingCardRecoveryAtItemPosition(lines, headingLevels, item) ??
      cardRecoveryAtItemPosition(lines, item) ??
      findFallbackCardRecovery(lines, item, searchFrom);
    if (!recovery) continue;
    searchFrom = recovery.lineIndex + 1;
    if (normalizeDishName(recovery.title) === item.normalizedName) continue;
    recoveries.set(itemIndex, recovery);
  }

  if (recoveries.size < 2 || recoveries.size * 2 < items.length) return items;

  const unique = new Map<string, MenuObservedItem>();
  for (const [itemIndex, item] of items.entries()) {
    const recovery = recoveries.get(itemIndex);
    const next = recovery
      ? (() => {
          const name = recovery.title;
          const sourceKey = createMenuItemSourceKey(name, item.sectionName);
          return {
            ...item,
            sourceKey,
            name,
            normalizedName: normalizeDishName(name),
            description: recoveredDescription(item, recovery),
            confidence: Math.min(item.confidence, recovery.description !== undefined ? 0.86 : 0.74),
            sourceExcerpt: `${name} — ${item.sourceExcerpt ?? lines[recovery.lineIndex] ?? ""}`.slice(0, 1000),
          };
        })()
      : item;
    unique.set(next.sourceKey, next);
  }
  return [...unique.values()].sort((a, b) => a.position - b.position);
}

function normalizeNumberedItem(item: MenuObservedItem): MenuObservedItem {
  if (!NUMBERED_DISH_TITLE.test(item.name)) return item;
  const name = canonicalNumberedTitle(item.name);
  if (!name || normalizeDishName(name) === item.normalizedName) return item;
  return {
    ...item,
    sourceKey: createMenuItemSourceKey(name, item.sectionName),
    name,
    normalizedName: normalizeDishName(name),
  };
}

export function extractScopedHtmlMenu(html: string): ExtractedHtmlMenu {
  const firstPass = extractHtmlMenu(html);
  if (firstPass.method === "json_ld") return firstPass;

  const visibleHtml = stripExplicitlyHiddenHtmlContent(html);
  const sourceLines = annotatedVisibleLines(visibleHtml);
  const addons = addonOptionNames(sourceLines);
  const scopedText = foodScopedText(sourceLines);
  const visibleText = scopedText.visibleText;
  const numbered = extractNumberedMenuItems(visibleText);
  if (
    numbered.titleCount >= 2 &&
    numbered.items.length >= 2 &&
    numbered.items.length * 2 >= numbered.titleCount
  ) {
    return {
      items: numbered.items,
      method: "html_heuristic",
      visibleText,
    };
  }

  const standalone = extractStandalonePriceBlocks(visibleText, scopedText.headingLevels);
  const standaloneQualifies =
    standalone.priceCount >= 3 &&
    standalone.items.length >= 3 &&
    standalone.items.length * 4 >= standalone.priceCount * 3;

  const scoped = extractHtmlMenu(syntheticHtmlFromVisibleText(visibleText));
  const foodItems = scoped.items.filter(
    (item) =>
      !isBeverageItemName(item.name) &&
      !isObviousMetadataItem(item.name) &&
      !isPlainFoodSectionLabel(item.name) &&
      !addons.has(item.normalizedName),
  );
  const recovered = recoverRepeatedCardTitles(
    visibleText,
    scopedText.headingLevels,
    foodItems,
  ).map(normalizeNumberedItem);
  if (standaloneQualifies && standalone.items.length >= recovered.length) {
    return {
      items: standalone.items,
      method: "html_heuristic",
      visibleText,
    };
  }
  return {
    ...scoped,
    items: recovered,
    visibleText,
  };
}
