import { load } from "cheerio";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";
import { extractHtmlMenu, type ExtractedHtmlMenu } from "./html-extractor.js";

export const HTML_SOURCE_EXTRACTOR_VERSION = "html-v6";

const HEADING_MARKER = "__FYSEN_HEADING_LEVEL_";
const BEVERAGE_SECTION_HEADING = /^(?:drikke(?:meny)?|drinks?(?:\s+menu)?|beverages?(?:\s+menu)?|bar(?:\s+menu)?|vinkart|vin(?:kart|liste|meny)?|wine(?:\s+(?:list|menu))?|cocktails?|champagne(?:\s+cocktails?)?|portvin|port\s+wine|bitter|cognac|armagnac|brandy|scotch\s+whisk(?:e)?y|irish\s+whisk(?:e)?y|american\s+whisk(?:e)?y|whisk(?:e)?y|calvados|aquavit|akevitt|liquor|likør|hetvin|fortified\s+wine|campari|grappa|vodka(?:\s*,\s*gin\s*,\s*tequila)?|gin|tequila|øl(?:\s*,?\s*cider.*)?|beer(?:s)?(?:\s*,?\s*cider.*)?|alkoholfritt|non[- ]alcoholic(?:\s+drinks?)?|kaffedrinker|coffee\s+drinks?|kaffe\/te.*|coffee\/tea.*)$/iu;
const BEVERAGE_ITEM_NAME = /^(?:kaffe(?:\b|[-/])|coffee(?:\b|[-/])|filterkaffe\b|espresso\b|americano\b|cappuccino\b|latte\b|arabisk\s+kaffe\b|libanesisk\s+kaffe\b|te(?:\b|[-/])|tea(?:\b|[-/]))/iu;
const PRICE_AT_END = /\s+(?:(?:kr\.?\s*)?[1-9]\d{1,3}(?:[.,]\d{1,2})?(?:\s*(?:,-|kr\.?|nok))?)$/iu;
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
  if (PRICE_AT_END.test(title) || CARD_TITLE_BOUNDARY.test(title)) return false;
  if (/^[*+]/u.test(title) || /https?:\/\/|@/iu.test(title)) return false;
  return true;
}

function looksLikeCardDescription(item: MenuObservedItem): boolean {
  const words = normalizeVisibleLine(item.name).split(/\s+/).filter(Boolean);
  return words.length >= 4 || /[.!?]$/u.test(item.name) || Boolean(item.description);
}

function findPricedSourceLine(lines: readonly string[], item: MenuObservedItem, startIndex: number): number | null {
  for (let index = Math.max(0, startIndex); index < lines.length; index += 1) {
    const line = lines[index] ?? "";
    if (!PRICE_AT_END.test(line)) continue;
    if (line.startsWith(item.name)) return index;
    if (item.sourceExcerpt && item.sourceExcerpt.startsWith(line.slice(0, Math.min(line.length, 180)))) return index;
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
  const recoveries = new Map<number, { readonly lineIndex: number; readonly title: string }>();
  let searchFrom = 0;

  for (const [itemIndex, item] of items.entries()) {
    if (!looksLikeCardDescription(item)) continue;
    const lineIndex = findPricedSourceLine(lines, item, searchFrom);
    if (lineIndex === null) continue;
    searchFrom = lineIndex + 1;
    const titleIndex = lineIndex - 1;
    const title = lines[titleIndex]?.trim() ?? "";
    if (!plausibleCardTitle(title)) continue;
    if (normalizeDishName(title) === item.normalizedName) continue;
    recoveries.set(itemIndex, { lineIndex, title });
  }

  // Only reinterpret the layout when the same title→description+price pattern repeats.
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
