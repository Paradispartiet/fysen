import { load } from "cheerio";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";

export const HTML_SIBLING_PRICE_CARD_RECOVERY_VERSION = "sibling-priced-card-v1";

// A numbered, first-party title is only restored when its own price is an
// immediately adjacent sibling of the title/allergen wrapper. This layout is
// materially different from a loose "find the preceding line" heuristic,
// which can accidentally classify allergens as paid dishes.
const NUMBERED_DISH = /^No\.\s*\d{1,3}\b/iu;
const EXACT_PRICE = /^(?:kr\.?\s*|NOK\s*)?([1-9]\d{0,3})(?:[.,](\d{1,2}))?\s*(?:,-|kr\.?|NOK)?$/iu;

export function recoverSiblingPricedNumberedHtmlCards(html: string): readonly MenuObservedItem[] {
  const $ = load(html);
  $("script, style, noscript, svg, template").remove();

  const recovered: MenuObservedItem[] = [];
  const seen = new Set<string>();
  $("h2.rett-tittel, h3.rett-tittel, h4.rett-tittel, h5.rett-tittel").each((_, node) => {
    const name = $(node).text().normalize("NFKC").replace(/\s+/gu, " ").trim();
    if (!NUMBERED_DISH.test(name)) return;

    const content = $(node).closest(".rett-innhold");
    if (content.length !== 1) return;
    const priceNode = content.next();
    if (!priceNode.is(".pris")) return;
    const priceText = priceNode.text().normalize("NFKC").replace(/\s+/gu, " ").trim();
    const priceMatch = priceText.match(EXACT_PRICE);
    if (!priceMatch?.[1]) return;

    const whole = Number(priceMatch[1]);
    const fraction = (priceMatch[2] ?? "").padEnd(2, "0").slice(0, 2);
    const priceMinor = whole * 100 + Number(fraction || "0");
    if (priceMinor < 4_000 || priceMinor > 1_000_000) return;

    const normalizedName = normalizeDishName(name);
    if (seen.has(normalizedName)) return;
    seen.add(normalizedName);
    const sourceKey = createMenuItemSourceKey(name);
    recovered.push({
      name,
      normalizedName,
      sourceKey,
      description: null,
      sectionName: null,
      priceMinor,
      currency: "NOK",
      position: recovered.length,
      extractionMethod: "html_heuristic",
      confidence: 0.995,
      sourceExcerpt: `${name} — ${priceText}`,
    });
  });

  return recovered;
}
