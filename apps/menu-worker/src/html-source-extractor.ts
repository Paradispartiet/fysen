import { load } from "cheerio";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";
import { extractHtmlMenu, type ExtractedHtmlMenu } from "./html-extractor.js";

export const HTML_SOURCE_EXTRACTOR_VERSION = "html-v7";

const HEADING_MARKER = "__FYSEN_HEADING_LEVEL_";
const BEVERAGE_SECTION_HEADING = /^(?:drikke(?:meny)?|drinks?(?:\s+menu)?|beverages?(?:\s+menu)?|bar(?:\s+menu)?|vinkart|vin(?:kart|liste|meny)?|wine(?:\s+(?:list|menu))?|cocktails?|champagne(?:\s+cocktails?)?|portvin|port\s+wine|bitter|cognac|armagnac|brandy|scotch\s+whisk(?:e)?y|irish\s+whisk(?:e)?y|american\s+whisk(?:e)?y|whisk(?:e)?y|calvados|aquavit|akevitt|liquor|likør|hetvin|fortified\s+wine|campari|grappa|vodka(?:\s*,\s*gin\s*,\s*tequila)?|gin|tequila|øl(?:\s*,?\s*cider.*)?|beer(?:s)?(?:\s*,?\s*cider.*)?|alkoholfritt|non[- ]alcoholic(?:\s+drinks?)?|kaffedrinker|coffee\s+drinks?|kaffe\/te.*|coffee\/tea.*)$/iu;
const BEVERAGE_ITEM_NAME = /^(?:kaffe(?:\b|[-/])|coffee(?:\b|[-/])|filterkaffe\b|espresso\b|americano\b|cappuccino\b|latte\b|arabisk\s+kaffe\b|libanesisk\s+kaffe\b|te(?:\b|[-/])|tea(?:\b|[-/]))/iu;
const PRICE_TOKEN = "(?:(?:kr\\.?\\s*)?[1-9]\\d{1,3}(?:[.,]\\d{1,2})?(?:\\s*(?:,-|kr\\.?|nok))?)";
const PRICE_AT_END = new RegExp(`\\s+${PRICE_TOKEN}$`, "iu");
const STANDALONE_PRICE = new RegExp(`^${PRICE_TOKEN}$`, "iu");
const CARD_TITLE_BOUNDARY = /^(?:menu|meny|opening|åpning|hours|contact|kontakt|address|adresse|booking|drinks?|drikke|wine|vin|beer|øl|allerg|meet the dishes|see the whole menu)\b/iu;

function normalizeVisibleLine(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}

function isBeverageSectionHeading(value: string): boolean {
  return BEVERAGE_SECTION_HEADING.test(normalizeVisibleLine(value));
}

function isBeverageItemName(value: string): boolean {
  return BEVERAGE_ITEM_NAME.test(normalizeVisibleLine(value));
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

function foodScopedVisibleText(html: string): string {
  const output: string[] = [];
  let blockedHeadingLevel: number | null = null;

  for (const line of annotatedVisibleLines(html)) {
    const headingMatch = line.match(/^__FYSEN_HEADING_LEVEL_([1-6])__\s*(.*)$/u);
    if (headingMatch) {
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

    if (blockedHeadingLevel === null) output.push(line);
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
    const title = lines[position - 1]?.trim() ?? "";
    return plausibleCardTitle(title) ? { lineIndex: position, title } : null;
  }

  if (STANDALONE_PRICE.test(pricedLine)) {
    const descriptionLine = lines[position - 1]?.trim() ?? "";
    if (!descriptionLine || !descriptionLine.startsWith(item.name)) return null;
    const title = lines[position - 2]?.trim() ?? "";
    return plausibleCardTitle(title) ? { lineIndex: position, title } : null;
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
    const title = lines[index - 1]?.trim() ?? "";
    if (plausibleCardTitle(title)) return { lineIndex: index, title };
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

export function extractScopedHtmlMenu(html: string): ExtractedHtmlMenu {
  const firstPass = extractHtmlMenu(html);
  if (firstPass.method === "json_ld") return firstPass;

  const visibleText = foodScopedVisibleText(html);
  const scoped = extractHtmlMenu(syntheticHtmlFromVisibleText(visibleText));
  const foodItems = scoped.items.filter((item) => !isBeverageItemName(item.name));
  return {
    ...scoped,
    items: recoverRepeatedCardTitles(visibleText, foodItems),
    visibleText,
  };
}
