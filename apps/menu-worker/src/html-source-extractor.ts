import { load } from "cheerio";
import { extractHtmlMenu, type ExtractedHtmlMenu } from "./html-extractor.js";

export const HTML_SOURCE_EXTRACTOR_VERSION = "html-v5";

const HEADING_MARKER = "__FYSEN_HEADING_LEVEL_";

function normalizeVisibleLine(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}

function isBeverageSectionHeading(value: string): boolean {
  const heading = normalizeVisibleLine(value);
  return /^(?:
    drikke(?:meny)?|drinks?(?:\s+menu)?|beverages?(?:\s+menu)?|bar(?:\s+menu)?|
    vinkart|vin(?:kart|liste|meny)?|wine(?:\s+(?:list|menu))?|
    cocktails?|champagne(?:\s+cocktails?)?|portvin|port\s+wine|bitter|cognac|armagnac|brandy|
    scotch\s+whisk(?:e)?y|irish\s+whisk(?:e)?y|american\s+whisk(?:e)?y|whisk(?:e)?y|
    calvados|aquavit|akevitt|liquor|likør|hetvin|fortified\s+wine|campari|grappa|
    vodka(?:\s*,\s*gin\s*,\s*tequila)?|gin|tequila|
    øl(?:\s*,?\s*cider.*)?|beer(?:s)?(?:\s*,?\s*cider.*)?|alkoholfritt|non[- ]alcoholic(?:\s+drinks?)?|
    kaffedrinker|coffee\s+drinks?|kaffe\/te.*|coffee\/tea.*
  )$/iux.test(heading);
}

function isBeverageItemName(value: string): boolean {
  const name = normalizeVisibleLine(value);
  return /^(?:
    kaffe(?:\b|[-/])|coffee(?:\b|[-/])|filterkaffe\b|espresso\b|americano\b|cappuccino\b|latte\b|
    arabisk\s+kaffe\b|libanesisk\s+kaffe\b|te(?:\b|[-/])|tea(?:\b|[-/])
  )/iux.test(name);
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

export function extractScopedHtmlMenu(html: string): ExtractedHtmlMenu {
  const firstPass = extractHtmlMenu(html);
  if (firstPass.method === "json_ld") return firstPass;

  const visibleText = foodScopedVisibleText(html);
  const scoped = extractHtmlMenu(syntheticHtmlFromVisibleText(visibleText));
  return {
    ...scoped,
    items: scoped.items.filter((item) => !isBeverageItemName(item.name)),
    visibleText,
  };
}
