import { load } from "cheerio";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";
import { extractHtmlMenu, type ExtractedHtmlMenu } from "./html-extractor.js";

export const HTML_SOURCE_EXTRACTOR_VERSION = "html-v9";

const HEADING_MARKER = "__FYSEN_HEADING_LEVEL_";
const BEVERAGE_SECTION_HEADING = /^(?:drikke(?:meny)?|drinks?(?:\s+menu)?|beverages?(?:\s+menu)?|bar(?:\s+menu)?|vinkart|vin(?:kart|liste|meny)?|wine(?:\s+(?:list|menu))?|cocktails?|champagne(?:\s+cocktails?)?|portvin|port\s+wine|bitter|cognac|armagnac|brandy|scotch\s+whisk(?:e)?y|irish\s+whisk(?:e)?y|american\s+whisk(?:e)?y|whisk(?:e)?y|calvados|aquavit|akevitt|liquor|likør|hetvin|fortified\s+wine|campari|grappa|vodka(?:\s*,\s*gin\s*,\s*tequila)?|gin|tequila|øl(?:\s*,?\s*cider.*)?|beer(?:s)?(?:\s*,?\s*cider.*)?|alkoholfritt|non[- ]alcoholic(?:\s+drinks?)?|kaffedrinker|coffee\s+drinks?|kaffe\/te.*|coffee\/tea.*)$/iu;
const BEVERAGE_ITEM_NAME = /^(?:kaffe(?:\b|[-/])|coffee(?:\b|[-/])|filterkaffe\b|iskaffe\b|iced\s+coffee\b|espresso\b|americano\b|cappuccino\b|latte\b|arabisk\s+kaffe\b|libanesisk\s+kaffe\b|te(?:\b|[-/])|tea(?:\b|[-/])|(?:grønn\s+|green\s+)?thai\s+(?:te|tea)\b)/iu;
const PRICE_TOKEN = "(?:(?:kr\\.?\\s*)?[1-9]\\d{1,3}(?:[.,]\\d{1,2})?(?:\\s*(?:,-|kr\\.?|nok))?)";
const PRICE_AT_END = new RegExp(`\\s+${PRICE_TOKEN}$`, "iu");
const STANDALONE_PRICE = new RegExp(`^${PRICE_TOKEN}$`, "iu");
const CARD_TITLE_BOUNDARY = /^(?:menu|meny|opening|åpning|hours|contact|kontakt|address|adresse|booking|drinks?|drikke|wine|vin|beer|øl|allerg|meet the dishes|see the whole menu)\b/iu;
const NUMBERED_DISH_TITLE = /^\d{1,3}\s*[.)]?\s+\p{L}/u;
const EXTRAS_TRIGGER = /^(?:ekstra\s+sulten\s*\??|extra\s+hungry\s*\??|extras?\s*\??|add[- ]?ons?\s*\??|tillegg\s*\??)$/iu;
const MORE_LABEL = /^(?:vis\s+mer|show\s+more)$/iu;

function normalizeVisibleLine(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}

function stripMenuNumber(value: string): string {
  return normalizeVisibleLine(value).replace(/^\d{1,3}\s*[.)]?\s+/u, "").trim();
}

function canonicalNumberedTitle(value: string): string {
  return stripMenuNumber(value).replace(PRICE_AT_END, "").trim();
}

function isBeverageSectionHeading(value: string): boolean {
  return BEVERAGE_SECTION_HEADING.test(normalizeVisibleLine(value));
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

function foodScopedVisibleText(lines: readonly string[]): string {
  const numberedMenu = isNumberedMenu(lines);
  const output: string[] = [];
  let blockedHeadingLevel: number | null = null;
  let skippingAddons = false;

  for (const line of lines) {
    const headingMatch = line.match(/^__FYSEN_HEADING_LEVEL_([1-6])__\s*(.*)$/u);
    if (headingMatch) {
      skippingAddons = false;
      const headingLevel = Number(headingMatch[1]);
      const headingText = normalizeVisibleLine(headingMatch[2] ?? "");

      if (blockedHeadingLevel !== null && headingLevel <= blockedHeadingLevel) {
        blockedHeadingLevel = null;
      }
      if (blockedHeadingLevel === null && isBeverageSectionHeading(headingText)) {
        blockedHeadingLevel = headingLevel;
      }
      if (blockedHeadingLevel === null && headingText) {
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
    output.push(line);
  }

  return output.join("\n");
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

function recoveredTitle(lines: readonly string[], titleIndex: number): string | null {
  const rawCurrent = lines[titleIndex]?.trim() ?? "";
  if (!plausibleCardTitle(rawCurrent)) return null;
  const current = canonicalNumberedTitle(rawCurrent);
  if (!current) return null;

  const rawPrevious = lines[titleIndex - 1]?.trim() ?? "";
  if (!plausibleCardTitle(rawPrevious) || looksLikeSectionHeading(rawPrevious)) return current;
  const previous = canonicalNumberedTitle(rawPrevious);
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

interface CardRecovery {
  readonly lineIndex: number;
  readonly title: string;
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

function recoveredDescription(item: MenuObservedItem): string | null {
  const parts = [item.name, item.description]
    .map((value) => value?.trim() ?? "")
    .filter(Boolean);
  if (parts.length === 0) return null;
  return [...new Set(parts)].join(" ");
}

function recoverRepeatedCardTitles(
  visibleText: string,
  items: readonly MenuObservedItem[],
): readonly MenuObservedItem[] {
  if (items.length < 2) return items;
  const lines = visibleText.split("\n");
  const recoveries = new Map<number, CardRecovery>();
  let searchFrom = 0;

  for (const [itemIndex, item] of items.entries()) {
    if (!looksLikeCardDescription(item)) continue;
    const recovery = cardRecoveryAtItemPosition(lines, item) ?? findFallbackCardRecovery(lines, item, searchFrom);
    if (!recovery) continue;
    searchFrom = recovery.lineIndex + 1;
    if (normalizeDishName(recovery.title) === item.normalizedName) continue;
    recoveries.set(itemIndex, recovery);
  }

  // Only reinterpret the layout when the same title→description→price pattern repeats.
  // This keeps isolated section headings from being promoted to dish names.
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
            description: recoveredDescription(item),
            confidence: Math.min(item.confidence, 0.74),
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

  const sourceLines = annotatedVisibleLines(html);
  const numberedNames = numberedDishNames(sourceLines);
  const addons = addonOptionNames(sourceLines);
  const visibleText = foodScopedVisibleText(sourceLines);
  const scoped = extractHtmlMenu(syntheticHtmlFromVisibleText(visibleText));
  const foodItems = scoped.items.filter(
    (item) =>
      !isBeverageItemName(item.name) &&
      !isObviousMetadataItem(item.name) &&
      !addons.has(item.normalizedName),
  );
  const recovered = recoverRepeatedCardTitles(visibleText, foodItems).map(normalizeNumberedItem);
  const items =
    numberedNames.size >= 2
      ? recovered.filter((item) => numberedNames.has(item.normalizedName))
      : recovered;
  return {
    ...scoped,
    items,
    visibleText,
  };
}
