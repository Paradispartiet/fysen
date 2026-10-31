import { load, type CheerioAPI, type Cheerio } from "cheerio";
import { createMenuItemSourceKey, normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";

export const HTML_SEMANTIC_MENU_CARD_RECOVERY_VERSION = "semantic-menu-card-v1";
const ORDINARY_PANEL = /^(?:lunch|dinner|lunsj|middag)$/iu;
const BUNDLE_OR_DRINK = /\b(?:\d+\s*[- ]?\s*(?:courses?|retter|retters)|menu\s+[a-z0-9]|meny\s+[a-z0-9]|wine|vinpakke|wine\s+pairing)\b/iu;
const WEIGHT_UNIT = /\b(?:per|pr\.?)\s*(?:kg|kilo(?:gram)?)\b/iu;
const SIZE_OPTION = /^(?:small|big|large|liten|stor)(?:\s+size)?(?:\s*\((?:starter|main(?:\s+course)?|forrett|hovedrett)\))?$/iu;
const QUANTITY = /^([1-9]\d?)\s*(pcs?|pieces?|stk\.?)$/iu;
const AMOUNT = /^(?:(?:kr\.?|NOK)\s*)?([1-9]\d{1,4})(?:\s*,\s*-|\s*(?:kr\.?|NOK))(?=\s|$)/iu;

function text(value: string): string { return value.normalize("NFKC").replace(/\s+/gu, " ").trim(); }
interface Price { readonly amounts: readonly number[]; readonly qualification: string; }
function parsePrices(value: string): Price | null {
  const parts = value.split(/\s*\/\s*/u);
  if (parts.length > 1) {
    const amounts = parts.map((part) => parsePrices(part));
    if (amounts.some((price) => !price || price.amounts.length !== 1 || price.qualification)) return null;
    return { amounts: amounts.flatMap((price) => price!.amounts), qualification: "" };
  }
  const match = value.match(AMOUNT);
  if (!match?.[1]) return null;
  const amount = Number(match[1]) * 100;
  if (amount < 3000 || amount > 2_000_000) return null;
  const suffix = value.slice(match[0].length).trim();
  if (!suffix) return { amounts: [amount], qualification: "" };
  const person = suffix.match(/^(?:per|pr\.?)\s+(?:person|pers\.?|gjest)\b\.?\s*/iu);
  if (!person) return null;
  let remainder = suffix.slice(person[0].length).trim();
  let qualification = "per person";
  const minimum = remainder.match(/^(?:min\.?|minimum|minst)\s+([1-9]\d?)\s*(?:pers\.?|persons?|personer|gjester)\.?\s*/iu);
  if (minimum?.[1]) {
    qualification += `, minimum ${minimum[1]} persons`;
    remainder = remainder.slice(minimum[0].length).trim();
  }
  if (remainder) {
    const preorder = remainder.match(/^(?:Needs to be preordered at least|Må forhåndsbestilles minst)\s+([1-9]\d?)\s+(?:days?|dag(?:er)?)(?:\s+(?:in advance|i forveien))?\.?$/iu);
    if (!preorder?.[1]) return null;
    qualification += `; preorder at least ${preorder[1]} day${preorder[1] === "1" ? "" : "s"}`;
  }
  return { amounts: [amount], qualification };
}

type HtmlNode = ReturnType<CheerioAPI> extends Cheerio<infer Node> ? Node : never;
function explicitlyHidden($: CheerioAPI, node: HtmlNode, panel: HtmlNode): boolean {
  let current: HtmlNode | null = node;
  while (current && current.type !== "root") {
    if (current.type === "tag") {
      const element = $(current);
      if (element.attr("hidden") !== undefined || element.attr("aria-hidden") === "true") return true;
      // The inactive panel of an ordinary menu tab is still an available menu.
      if (current !== panel && /(?:display\s*:\s*none|visibility\s*:\s*hidden)/iu.test(element.attr("style") ?? "")) return true;
    }
    current = current.parent;
  }
  return false;
}
interface Candidate { readonly item: MenuObservedItem; readonly semanticKey: string; readonly size: string; }

/** Direct Squarespace menu cards in ordinary meal tabs only. Seasonal/group
 * tabs, ambiguous prices and unsupported weight units fail closed. */
export function recoverSemanticMenuCardHtmlItems(html: string): readonly MenuObservedItem[] {
  const $ = load(html);
  const candidates: Candidate[] = [];
  $(".sqs-block-menu .menu-wrapper .menu[role=tabpanel]").each((_, panelNode) => {
    const panel = $(panelNode);
    const panelName = text(panel.attr("aria-label") ?? "");
    if (!ORDINARY_PANEL.test(panelName) || explicitlyHidden($, panelNode, panelNode)) return;
    panel.find(".menu-item").each((_, cardNode) => {
      const card = $(cardNode);
      if (card.closest(".menu")[0] !== panelNode || explicitlyHidden($, cardNode, panelNode)) return;
      const titleNodes = card.children(".menu-item-title");
      const topNodes = card.children(".menu-item-price-top");
      const bottomNodes = card.children(".menu-item-price-bottom");
      if (titleNodes.length !== 1 || topNodes.length !== 1 || bottomNodes.length !== 1) return;
      const title = text(titleNodes.text());
      const description = text(card.children(".menu-item-description").text());
      const options = card.find("> .menu-item-options > .menu-item-option").map((__, node) => text($(node).text())).get().filter(Boolean);
      if (!title || BUNDLE_OR_DRINK.test(title) || WEIGHT_UNIT.test([title, description, ...options].join(" "))) return;
      const top = text(topNodes.text()), bottom = text(bottomNodes.text());
      const price = parsePrices(top), bottomPrice = parsePrices(bottom);
      if (!price || !bottomPrice || JSON.stringify(price) !== JSON.stringify(bottomPrice)) return;
      if (options.some((option) => /\b(?:price|pris)\s+(?:per|pr\.?)\b/iu.test(option) || /^(?:per|pr\.?)\s+/iu.test(option))) return;
      const section = text(card.closest(".menu-section").find("> .menu-section-header > .menu-section-title").text());
      const sectionName = [panelName, section].filter(Boolean).join(" / ");
      const quantities = description.split(/\s*\/\s*/u);
      const quantityMatches = quantities.map((part) => part.match(QUANTITY));
      if (price.amounts.length > 1 && (quantityMatches.length !== price.amounts.length || quantityMatches.some((match) => !match) || new Set(quantities.map((quantity) => quantity.toLocaleLowerCase("nb-NO"))).size !== quantities.length)) return;
      if (price.amounts.length === 1 && quantityMatches.some(Boolean)) return;
      const sizes = options.filter((option) => SIZE_OPTION.test(option));
      if (sizes.length > 1) return;
      price.amounts.forEach((priceMinor, index) => {
        const quantity = price.amounts.length > 1 ? quantities[index]! : "";
        const size = quantity || sizes[0] || "";
        const qualification = [size, price.qualification].filter(Boolean).join("; ");
        const name = qualification ? `${title} (${qualification})` : title;
        const position = candidates.length;
        candidates.push({ semanticKey: [normalizeDishName(title), priceMinor, quantity, price.qualification].join("|"), size, item: {
          name, normalizedName: normalizeDishName(name), sourceKey: createMenuItemSourceKey(name, sectionName),
          description: [description, ...options].filter(Boolean).join(". ") || null,
          sectionName, priceMinor, priceKind: "exact", priceMaxMinor: null, currency: "NOK", position,
          extractionMethod: "html_heuristic", confidence: 0.99,
          sourceExcerpt: [panelName, section, title, description, top, ...options].filter(Boolean).join(" — ").slice(0, 1000),
        } });
      });
    });
  });
  const groups = new Map<string, Candidate[]>();
  for (const candidate of candidates) {
    const group = groups.get(candidate.semanticKey) ?? [];
    group.push(candidate); groups.set(candidate.semanticKey, group);
  }
  const items: MenuObservedItem[] = [];
  for (const group of groups.values()) {
    const sized = group.filter((candidate) => candidate.size);
    const unique = new Map<string, MenuObservedItem>();
    for (const candidate of sized.length ? sized : group) {
      if (!unique.has(candidate.item.normalizedName)) unique.set(candidate.item.normalizedName, candidate.item);
    }
    items.push(...unique.values());
  }
  return items.sort((left, right) => left.position - right.position);
}

/** Isolated card recovery may replace only the component it understands.
 * Price-bearing content elsewhere requires the ordinary whole-page pipeline. */
export function hasPricesOutsideSemanticMenuBlocks(html: string): boolean {
  const $ = load(html);
  $("script, style, noscript, template, [hidden], .w-condition-invisible").remove();
  $(".sqs-block-menu").each((_, block) => {
    const hasOrdinaryPanel = $(block).find(".menu-wrapper .menu[role=tabpanel]")
      .toArray().some((panel) => ORDINARY_PANEL.test(text($(panel).attr("aria-label") ?? "")));
    if (hasOrdinaryPanel) $(block).remove();
  });
  const markedPrice = /\b(?:kr\.?|NOK)\s*\d|\b\d+(?:[.,]\d{1,2})?\s*(?:kr\.?|NOK)\b|\b\d+\s*,\s*[-–—]/iu;
  if (markedPrice.test($("body").text())) return true;
  return $("p, li, td, th, h1, h2, h3, h4, h5, h6, div").toArray().some((node) =>
    /^\d{2,4}(?:[.,]\d{1,2})?$/u.test(text($(node).text())),
  );
}
