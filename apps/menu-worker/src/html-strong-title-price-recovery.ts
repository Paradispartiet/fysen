import { load } from "cheerio";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
  type MenuPriceKind,
} from "@fysen/menu-core";

export const HTML_STRONG_TITLE_PRICE_RECOVERY_VERSION = "strong-title-price-v1";

const PRICE_LINE = /^(?:(fra|from)\s+)?(?:(?:NOK|kr\.?)\s*)?([1-9]\d{0,3})(?:([.,])(\d{1,3}))?\s*(?:,?[-–—]|,-|kr\.?|NOK)?(?:\s+per\s+(?:person|personer?|persons?))?(?:\s+minimum\s+\d+\s+(?:personer?|persons?))?$/iu;
const SEPARATOR_LINE = /^(?:[-–—•·]\s*)+$/u;
const ROOT_OR_UI_HEADING = /^(?:menu|meny|our\s+menu|vår\s+meny|opening(?:\s+hours)?|åpningstider|contact|kontakt|booking|reservation(?:s)?|reservasjoner?)$/iu;

interface ParsedPrice {
  readonly priceMinor: number;
  readonly priceKind: MenuPriceKind;
}

function normalizeText(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/[\u200B-\u200D\uFEFF]/gu, "")
    .replace(/\s+/gu, " ")
    .trim();
}

function parsePrice(value: string): ParsedPrice | null {
  const match = normalizeText(value).match(PRICE_LINE);
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

  const priceMinor = whole * 100 + Number(decimals || "0");
  if (priceMinor < 4_000 || priceMinor > 1_000_000) return null;
  return {
    priceMinor,
    priceKind: match[1] ? "from" : "exact",
  };
}

function looksLikeTitle(value: string): boolean {
  const title = normalizeText(value);
  if (!title || title.length < 2 || title.length > 180 || !/\p{L}/u.test(title)) return false;
  if (PRICE_LINE.test(title) || SEPARATOR_LINE.test(title)) return false;
  if (/^(?:©|™|https?:\/\/|www\.|phone\s*:|telefon\s*:)/iu.test(title)) return false;
  return title.split(/\s+/u).filter(Boolean).length <= 16;
}

export function recoverStrongTitlePriceHtmlItems(html: string): readonly MenuObservedItem[] {
  const $ = load(html);
  $("script, style, noscript, svg, template").remove();

  const recovered: MenuObservedItem[] = [];
  let position = 0;

  $("p, li").each((_, element) => {
    const block = $(element);
    const fullText = normalizeText(block.text());
    if (!fullText) return;

    const strongTexts = block
      .find("strong")
      .toArray()
      .map((strong) => normalizeText($(strong).text()))
      .filter(Boolean);
    if (strongTexts.length === 0) return;

    const firstStrong = strongTexts[0] ?? "";
    if (!firstStrong || !fullText.toLocaleLowerCase().startsWith(firstStrong.toLocaleLowerCase())) return;

    const combinedStrong = normalizeText(strongTexts.join(" "));
    const title =
      combinedStrong && fullText.toLocaleLowerCase() === combinedStrong.toLocaleLowerCase()
        ? combinedStrong
        : firstStrong;
    if (!looksLikeTitle(title)) return;

    const inlineDescription = normalizeText(fullText.slice(title.length)) || null;
    let sibling = block.next();
    let standaloneDescription: string | null = null;
    let price: ParsedPrice | null = null;
    let priceText: string | null = null;

    for (let step = 0; step < 5 && sibling.length > 0; step += 1) {
      const siblingText = normalizeText(sibling.text());
      if (!siblingText || SEPARATOR_LINE.test(siblingText)) {
        sibling = sibling.next();
        continue;
      }
      if (sibling.is("h1, h2, h3, h4, h5, h6")) break;

      if (sibling.is("p, li")) {
        const nextStrong = normalizeText(sibling.find("strong").first().text());
        if (
          nextStrong &&
          siblingText.toLocaleLowerCase().startsWith(nextStrong.toLocaleLowerCase())
        ) {
          break;
        }
      }

      const parsed = parsePrice(siblingText);
      if (parsed) {
        price = parsed;
        priceText = siblingText;
        break;
      }

      const canUseStandaloneDescription =
        inlineDescription === null &&
        standaloneDescription === null &&
        sibling.find("strong").length === 0 &&
        siblingText.length <= 420;
      if (!canUseStandaloneDescription) break;
      standaloneDescription = siblingText;
      sibling = sibling.next();
    }

    if (!price || !priceText) return;

    const rawSectionName = normalizeText(
      block.prevAll("h1, h2, h3, h4, h5, h6").first().text(),
    );
    const sectionName =
      rawSectionName && !ROOT_OR_UI_HEADING.test(rawSectionName)
        ? rawSectionName
        : null;
    const description = inlineDescription ?? standaloneDescription;
    const sourceKey = createMenuItemSourceKey(title, sectionName);
    recovered.push({
      sourceKey,
      name: title,
      normalizedName: normalizeDishName(title),
      description,
      sectionName,
      priceMinor: price.priceMinor,
      priceKind: price.priceKind,
      priceMaxMinor: null,
      currency: "NOK",
      position,
      extractionMethod: "html_heuristic",
      confidence: 0.995,
      sourceExcerpt: `${sectionName ? `${sectionName} — ` : ""}${fullText}${standaloneDescription ? ` — ${standaloneDescription}` : ""} — ${priceText}`.slice(0, 1000),
    });
    position += 1;
  });

  if (recovered.length < 6) return [];

  const unique = new Map<string, MenuObservedItem>();
  for (const item of recovered) {
    const key = `${item.sourceKey}\u0000${item.priceMinor}\u0000${item.priceKind}`;
    if (!unique.has(key)) unique.set(key, item);
  }
  const items = [...unique.values()];
  if (items.length < 6) return [];
  return items.map((item, index) => ({ ...item, position: index }));
}
