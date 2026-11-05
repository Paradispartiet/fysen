import { createMenuItemSourceKey, normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";
import { extractHtmlVisibleText } from "./html-extractor.js";

// Festningen's Squarespace dinner menu displays an English title, Norwegian
// translation, description, repeated English title, English description, price.
// The generic flat text parser sometimes mistakes the last description or
// portion marker for a dish and misses priced SPEKEMAT/CHEESECAKE.
// Never invent prices: each result must be tied to an explicit nearby price.
// This is deliberately opt-in for the identifiable first-party dinner layout.
export const FESTNINGEN_BILINGUAL_VERSION = "festningen-bilingual-v1";

const SECTION_OR_NON_DISH = /^(?:CHEF['’]?S?\s+MENU|SNACKS|DAGENS RETT|DAILY COURSE|FORRETTER|STARTERS|HOVEDRETTER|MAINS|DESSERT(?:ER)?(?:\s+OG\s+OST)?|DESSERT\s*&\s*CHEESE|SELECTION\s+OF\s+DISHES|MIDDAG|DINNER)\b/iu;
const HEADER_TITLE = /^[\p{Lu}][\p{Lu}\p{N}\s/&'’.,()+-]{2,130}$/u;
const END_PRICE = /(?:^|[\s/+])(?:kr\.?\s*)?([1-9]\d{1,3})\s*,?\s*-?\s*$/iu;
const TWO_PRICE_OFFERS = /(?:kr\.?\s*)?[1-9]\d{1,3}\s*,?\s*-\s*\/\s*(?:kr\.?\s*)?[1-9]\d{1,3}/iu;

function asDatedSourcePrice(line: string): number | null {
  // Multi-size displays cannot be silently collapsed to one arbitrary price.
  if (TWO_PRICE_OFFERS.test(line) || /\bper\s+(?:person|pers\.?)\b/iu.test(line)) return null;
  const match = END_PRICE.exec(line);
  if (!match?.[1]) return null;
  const amount = Number(match[1]) * 100;
  return amount >= 4_000 && amount <= 1_000_000 ? amount : null;
}

function isDishHeading(value: string): boolean {
  return value.length <= 130 &&
    HEADER_TITLE.test(value) &&
    /\p{L}/u.test(value) &&
    !value.includes("//") &&
    !SECTION_OR_NON_DISH.test(value) &&
    !/^\d/u.test(value);
}

export function recoverFestningenBilingualDinner(
  html: string,
): readonly MenuObservedItem[] | null {
  const allText = extractHtmlVisibleText(html);
  // A branded + specifically sectioned dinner menu only. Unrelated Norwegian
  // menus, mirrors, and ordinary single-language cards keep the main parser.
  if (!/FESTNINGEN\s+RESTAURANT/iu.test(allText) ||
      !/MIDDAG\s*\/\/\s*DINNER/iu.test(allText) ||
      !/FORRETTER\s*\/\/\s*STARTERS/iu.test(allText) ||
      !/HOVEDRETTER\s*\/\/\s*MAINS/iu.test(allText) ||
      !/DESSERT\s+OG\s+OST/iu.test(allText)) return null;
  const lines = allText.split("\n").map((value) =>
    value.normalize("NFKC").replace(/\s+/gu, " ").trim(),
  ).filter(Boolean);
  const start = lines.findIndex((line) => /MIDDAG\s*\/\/\s*DINNER/iu.test(line));
  if (start < 0) return null;
  const endCandidate = lines.findIndex((line, i) => i > start + 20 &&
    /^(?:GAVEKORT|NYHETSBREV|Klikk her for å reservere bord)/iu.test(line));
  const end = endCandidate > start ? endCandidate : Math.min(lines.length, start + 450);
  const menuLines = lines.slice(start, end);
  const recovered = new Map<string, MenuObservedItem>();
  let previousPriceLine = -1;

  for (let i = 0; i < menuLines.length; i += 1) {
    const line = menuLines[i]!;
    const isPriceBoundary = /\bkr\.?\s*[1-9]\d{1,3}\b|^[1-9]\d{1,3}\s*,\s*-/iu.test(line);
    if (!isPriceBoundary) continue;
    const priceMinor = asDatedSourcePrice(line);
    const startOfCard = Math.max(previousPriceLine + 1, i - 11);
    previousPriceLine = i;
    if (priceMinor === null) continue;
    const block = menuLines.slice(startOfCard, i);
    const headings = block.filter(isDishHeading);
    if (!headings.length) continue;
    const counts = new Map<string, number>();
    for (const heading of headings) {
      counts.set(heading, (counts.get(heading) ?? 0) + 1);
    }
    // Prefer the identical English heading repeated before and after the
    // translation; accept a short, unambiguous two-line bilingual card too.
    const repeatedTitle = headings.find((heading) => (counts.get(heading) ?? 0) >= 2);
    const title = repeatedTitle ??
      (block.length <= 6 ? headings[0] : null);
    if (!title || !isDishHeading(title)) continue;
    const sourceKey = createMenuItemSourceKey(title);
    // A second ambiguous price may not overwrite a previously trusted card.
    if (recovered.has(sourceKey)) continue;
    recovered.set(sourceKey, {
      sourceKey,
      name: title,
      normalizedName: normalizeDishName(title),
      description: null,
      sectionName: null,
      priceMinor,
      currency: "NOK",
      position: start + startOfCard,
      extractionMethod: "html_heuristic",
      confidence: repeatedTitle ? 0.96 : 0.85,
      sourceExcerpt: menuLines.slice(startOfCard, i + 1).join(" — ").slice(0, 1000),
    });
  }
  // Do not treat a short or unrecognizable layout as a complete menu.
  return recovered.size >= 10 ? [...recovered.values()] : null;
}
