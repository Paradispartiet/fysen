import { load } from "cheerio";
import { createMenuItemSourceKey, normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";

// Some menus expose only a tiny JSON-LD sample. Supplement it only when a
// repeated BEM name/price card layout independently confirms every sample.
export function supplementPartialStructuredMenu(
  html: string,
  structured: readonly MenuObservedItem[],
): readonly MenuObservedItem[] {
  if (structured.length < 2 || structured.length > 3 ||
      structured.some((item) => item.priceMinor === null || item.currency !== "NOK")) return structured;
  const $ = load(html);
  $("script, style, noscript, template, .w-condition-invisible, [hidden]").remove();
  $("[style]").each((_, element) => {
    if (/(?:^|;)\s*(?:display\s*:\s*none|visibility\s*:\s*hidden)\s*(?:!important)?\s*(?:;|$)/iu.test($(element).attr("style") ?? "")) {
      $(element).remove();
    }
  });
  const groups = new Map<string, { items: MenuObservedItem[]; invalid: boolean }>();
  $("[class]").each((_, element) => {
    for (const className of ($(element).attr("class") ?? "").split(/\s+/u)) {
      const prefix = className.match(/^([a-zA-Z][\w-]*)__name$/u)?.[1];
      if (!prefix) continue;
      const card = $(element).closest(`.${prefix}`);
      const names = card.find(`.${prefix}__name`);
      const prices = card.find(`.${prefix}__price`);
      if (card.length !== 1 || names.length !== 1 || prices.length !== 1) continue;
      const name = names.text().normalize("NFKC").replace(/\s+/gu, " ").trim();
      const priceText = prices.text().normalize("NFKC").replace(/\s+/gu, " ").trim();
      const match = priceText.match(/^(?:(?:NOK|kr\.?)\s*)?([1-9]\d{0,3})(?:[.,](\d{1,2}))?\s*(?:kr\.?|NOK)$/iu);
      if (!match?.[1] || name.length < 2 || name.length > 220 || !/\p{L}/u.test(name)) continue;
      const priceMinor = Number(match[1]) * 100 + Number((match[2] ?? "").padEnd(2, "0"));
      const normalizedName = normalizeDishName(name);
      const group = groups.get(prefix) ?? { items: [], invalid: false };
      if (group.items.some((item) => item.normalizedName === normalizedName)) group.invalid = true;
      const description = card.find(`.${prefix}__desc`).first().text().trim() || null;
      group.items.push({
        name, normalizedName, priceMinor, description, currency: "NOK", sectionName: null,
        sourceKey: createMenuItemSourceKey(name), position: group.items.length,
        extractionMethod: "html_heuristic", confidence: 0.99,
        sourceExcerpt: `${name} — ${priceText}`,
      });
      groups.set(prefix, group);
    }
  });
  const matching = [...groups.values()].filter((group) =>
    !group.invalid && group.items.length >= structured.length * 2 &&
    structured.every((sample) => group.items.some((item) =>
      item.normalizedName === sample.normalizedName && item.priceMinor === sample.priceMinor,
    )),
  );
  if (matching.length !== 1) return structured;
  return matching[0]!.items.map((item) => {
    const sample = structured.find((entry) => entry.normalizedName === item.normalizedName);
    return sample ? { ...sample, position: item.position } : item;
  });
}
