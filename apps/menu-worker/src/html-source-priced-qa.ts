import { createMenuItemSourceKey, normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";

/**
 * Source-backed HTML price reconciliation. Never choose a neighboring price,
 * infer a serving unit or convert a per-person quote to a dish price.
 * This layer applies only after the ordinary HTML parser has finished.
 */
export const HTML_SOURCE_PRICED_QA_VERSION = "source-priced-v6";

const CURRENCY_PRICE = /\bkr\.?\s*([1-9]\d{1,3})\b/giu;
const TRAILING_PRICE = /\bkr\.?\s*([1-9]\d{1,3})(?:\s*,-)?\s*$/iu;
const PRICE_PER_PERSON = /\bkr\.?\s*[1-9]\d{1,3}\s*(?:pp|p\.p\.|per\s+(?:person|pers\.?)|pr\.?\s*(?:person|pers\.?))\b/iu;
const PAIR_OF_SIZES = /\b(liten|small)\s*\(\s*(\d{1,2})\s*\)\s*kr\.?\s*([1-9]\d{1,3})\s+(stor|large)\s*\(\s*(\d{1,2})\s*\)\s*kr\.?\s*([1-9]\d{1,3})\b/iu;
const SAUCE_ONLY = /^(?:[\p{L}-]{2,20}saus|b[eé]arnaise)(?:\s*\([^)]{2,40}\))?$/iu;
const SAUCE_SECTION = /^(?:saus(?:er)?|sauces?)$/iu;
const OTHER_MENU_SECTION = /^(?:forretter?|starters?|hovedretter?|main(?:\s+courses?)?|desserter?|desserts?|sideretter|tilbehør|sides?|klassiske viner|wine(?:\s+list)?|drikke(?:meny)?|drinks?)$/iu;
const STANDALONE_MARKED_PRICE = /^(?:kr\.?\s*)?([1-9]\d{1,3})(?:\s*(?:kr\.?|,-))?$/iu;
const ALLERGEN_NOTE = /^\(?\s*(?:inneholder|allergener?|allergens?)\s*:/iu;

/**
 * A published side sauce can be a genuine separately priced menu option.
 * Only keep it when its own title and price appear within a dedicated sauce
 * section; do not promote sauce names in meal descriptions or unpriced add-ons.
 */
function isIndividuallyPricedSauceInSection(
  item: MenuObservedItem,
  lines: readonly string[],
): boolean {
  if (item.priceMinor === null) return false;
  for (let titleIndex = 0; titleIndex < lines.length; titleIndex += 1) {
    if (normalizeDishName(lines[titleIndex] ?? "") !== item.normalizedName) continue;
    let inSauceSection = false;
    for (let index = titleIndex - 1; index >= Math.max(0, titleIndex - 32); index -= 1) {
      const previous = lines[index] ?? "";
      if (SAUCE_SECTION.test(previous)) {
        inSauceSection = true;
        break;
      }
      if (OTHER_MENU_SECTION.test(previous)) break;
    }
    if (!inSauceSection) continue;

    for (let index = titleIndex + 1; index < Math.min(lines.length, titleIndex + 4); index += 1) {
      const next = lines[index] ?? "";
      if (ALLERGEN_NOTE.test(next)) continue;
      const price = next.match(STANDALONE_MARKED_PRICE);
      if (price?.[1] && Number(price[1]) * 100 === item.priceMinor) return true;
      break;
    }
  }
  return false;
}
const TITLE_THEN_DESCRIPTION = /^([\p{Lu}][\p{L}\s()\-–]{5,79}?)\.\s+(?=[\p{Lu}])/u;

function visibleLines(text: string): string[] {
  return text.split("\n")
    .map((line) => line.normalize("NFKC").replace(/\s+/gu, " ").trim())
    .filter(Boolean);
}

function anchorMatches(line: string, normalizedName: string): boolean {
  const lineName = normalizeDishName(line);
  return lineName === normalizedName || lineName.startsWith(normalizedName + " ");
}

function anchoredSourceLines(item: MenuObservedItem, lines: readonly string[]): string[] {
  const result: string[] = [];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]!;
    if (!anchorMatches(line, item.normalizedName)) continue;
    result.push(line);
    if (normalizeDishName(line) === item.normalizedName && lines[i + 1]) {
      result.push(lines[i + 1]!);
    }
  }
  return result;
}

function withExactPrice(item: MenuObservedItem, kroner: number): MenuObservedItem {
  const priceMinor = kroner * 100;
  if (item.priceMinor === priceMinor) return item;
  return {
    ...item,
    priceMinor,
    priceKind: "exact",
    priceMaxMinor: null,
    confidence: Math.min(item.confidence, 0.8),
    sourceExcerpt: [item.sourceExcerpt, "Exact price at source heading: kr " + kroner]
      .filter(Boolean).join(" — ").slice(0, 1000),
  };
}

function explicitlyPricedPerPerson(
  item: MenuObservedItem,
  sourceLines: readonly string[],
): MenuObservedItem[] {
  const explicit = /\bkr\.?\s*([1-9]\d{1,3})\s*(?:pp|p\.p\.|per\s+(?:person|pers\.?)|pr\.?\s*(?:person|pers\.?))\b/giu;
  const kroner = new Set<number>();
  for (const line of sourceLines) {
    for (const match of line.matchAll(explicit)) {
      kroner.add(Number(match[1]));
    }
  }
  // Never substitute an adjacent ordinary dish's exact price.
  if (kroner.size !== 1) return [];
  const amount = [...kroner][0]!;
  if (amount < 40 || amount > 10_000) return [];
  const minGuestMatches = sourceLines.join(" ").match(/\b(?:minimum|minst|min\.?)\s*(\d{1,2})\s*(?:pers\.?|personer?)\b/iu);
  const minimumGuests = minGuestMatches ? Number(minGuestMatches[1]) : null;
  const qualifier = minimumGuests !== null
    ? "per person, minst " + minimumGuests
    : "per person";
  const name = item.name + " (" + qualifier + ")";
  return [{
    ...item,
    name,
    normalizedName: normalizeDishName(name),
    sourceKey: createMenuItemSourceKey(name, item.sectionName),
    priceMinor: amount * 100,
    priceKind: "exact",
    priceMaxMinor: null,
    description: ["Kildepris kr " + amount + " per person", minimumGuests !== null
      ? "minimum " + minimumGuests + " personer"
      : null, item.description].filter(Boolean).join(". "),
    confidence: Math.min(item.confidence, 0.80),
    sourceExcerpt: [item.sourceExcerpt, ...sourceLines.filter((line) => PRICE_PER_PERSON.test(line))]
      .filter(Boolean).join(" — ").slice(0, 1000),
  }];
}

function explicitlyLinkedPrice(item: MenuObservedItem, lines: readonly string[]): number | null {
  const candidates = new Set<number>();
  for (const line of anchoredSourceLines(item, lines)) {
    if (PRICE_PER_PERSON.test(line)) continue;
    const prices = [...line.matchAll(CURRENCY_PRICE)].map((m) => Number(m[1]));
    if (prices.length !== 1 || !TRAILING_PRICE.test(line)) continue;
    const kroner = prices[0]!;
    if (kroner >= 40 && kroner <= 10_000) candidates.add(kroner);
  }
  return candidates.size === 1 ? [...candidates][0]! : null;
}

function explicitSizes(item: MenuObservedItem, lines: readonly string[]): MenuObservedItem[] | null {
  const pairs = anchoredSourceLines(item, lines)
    .map((line) => line.match(PAIR_OF_SIZES))
    .filter((pair): pair is RegExpMatchArray => pair !== null);
  if (pairs.length === 0) return null;
  const signatures = new Set(pairs.map((p) => [p[2], p[3], p[5], p[6]].join(":")));
  if (signatures.size !== 1) return null;
  const p = pairs[0]!;
  const small = Number(p[3]), large = Number(p[6]);
  if (small < 40 || large <= small || large > 10_000) return null;
  if (item.priceMinor !== small * 100 && item.priceMinor !== large * 100) return null;
  return [
    { label: "liten", pieces: Number(p[2]), kroner: small },
    { label: "stor", pieces: Number(p[5]), kroner: large },
  ].map(({ label, pieces, kroner }) => {
    const name = item.name + " (" + label + ", " + pieces + " biter)";
    return {
      ...item,
      name,
      normalizedName: normalizeDishName(name),
      sourceKey: createMenuItemSourceKey(name, item.sectionName),
      priceMinor: kroner * 100,
      priceKind: "exact" as const,
      priceMaxMinor: null,
      description: [label + " porsjon, " + pieces + " biter", item.description]
        .filter(Boolean).join(". "),
      confidence: Math.min(item.confidence, 0.8),
      sourceExcerpt: [item.sourceExcerpt, label + " (" + pieces + ") kr " + kroner]
        .filter(Boolean).join(" — ").slice(0, 1000),
    };
  });
}

function isAdjacentDescriptionFragment(
  item: MenuObservedItem,
  items: readonly MenuObservedItem[],
  lines: readonly string[],
): boolean {
  if (!/^(?:med|fra|with|from)\s+\p{L}/iu.test(item.name)) return false;
  return lines.some((line, index) => {
    if (!anchorMatches(line, item.normalizedName) || index === 0) return false;
    const parentName = normalizeDishName(lines[index - 1]!);
    return items.some((parent) =>
      parent !== item &&
      parent.normalizedName === parentName &&
      parent.priceMinor === item.priceMinor
    );
  });
}

function missingInlineDishes(lines: readonly string[], existing: ReadonlySet<string>): MenuObservedItem[] {
  const added: MenuObservedItem[] = [];
  for (const [position, line] of lines.entries()) {
    // A layout may put the title ("Steinsopp- ...suppe.") on its own line
    // and the priced allergen description on the immediately next line.
    const inlineTitle = line.match(TITLE_THEN_DESCRIPTION)?.[1]?.trim();
    const splitTitle = line.match(/^([\p{Lu}][\p{L}\s()\-–]{5,79})\.$/u)?.[1]?.trim();
    // The line immediately after a stand-alone dish title is that dish's
    // description, even when its first clause looks like another title.
    const priorSplitTitle = (lines[position - 1] ?? "")
      .match(/^([\p{Lu}][\p{L}\s()\-–]{5,79})\.$/u)?.[1]?.trim();
    if (inlineTitle && priorSplitTitle) continue;
    const title = inlineTitle ?? splitTitle;
    if (!title || /^(?:med|fra|with|from)\s/u.test(title.toLowerCase()) ||
        title.split(/\s+/u).length < 2 || title.length > 80) continue;
    const priceLine = inlineTitle ? line : (lines[position + 1] ?? "");
    if (!/\b(?:ALL|allergener?|allergens?)\s*:/iu.test(priceLine)) continue;
    const name = normalizeDishName(title);
    if (existing.has(name)) continue;
    // The beginning of a description ("Brimsoll Fra Sogn.") may look like
    // a separate punctuated title. If its actual food heading is already
    // captured, never add a second dish from the descriptive suffix.
    const existingParent = /^(.+?)\s+(?:Fra|Med)\s+\p{L}/u.exec(title)?.[1];
    if (existingParent && existing.has(normalizeDishName(existingParent)))
      continue;
    const prices = [...priceLine.matchAll(CURRENCY_PRICE)];
    if (prices.length !== 1 || !TRAILING_PRICE.test(priceLine) || PRICE_PER_PERSON.test(priceLine))
      continue;
    const priceMinor = Number(prices[0]?.[1]) * 100;
    if (!Number.isSafeInteger(priceMinor) || priceMinor < 4000 || priceMinor > 1_000_000) continue;
    added.push({
      name: title,
      normalizedName: name,
      sourceKey: createMenuItemSourceKey(title),
      description: priceLine.replace(/\bkr\.?\s*[1-9]\d{1,3}(?:\s*,-)?\s*$/iu, "").trim() || null,
      sectionName: null,
      priceMinor,
      priceKind: "exact",
      priceMaxMinor: null,
      currency: "NOK",
      position,
      extractionMethod: "html_heuristic",
      confidence: 0.75,
      sourceExcerpt: [line, priceLine].filter(Boolean).join(" — ").slice(0, 1000),
    });
    existing = new Set([...existing, name]);
  }
  return added;
}

/**
 * A priced weight option can belong to an unpriced named dish. Restore the
 * heading only when BOTH exact-size prices are printed immediately under the
 * independently present "Biff med løk" heading; never turn the heading into
 * another priced item.
 */
function restoreSourceBackedSteakParent(
  item: MenuObservedItem,
  lines: readonly string[],
): MenuObservedItem {
  const size = /^Indrefilet\s+(150|220)\s*g$/iu.exec(item.name.trim())?.[1];
  if (!size || item.priceMinor === null || (item.priceKind ?? "exact") !== "exact")
    return item;
  // HTML visible text may fuse a heading with descriptive text, or put
  // several empty/presentational rows between the heading and its prices.
  // Search only the source's following main-course block, not the whole menu.
  const visible = lines.join(" ");
  const parent = /(?:^|\s)Biff\s+med\s+løk(?=\s|$)/iu.exec(visible);
  if (!parent) return item;
  const remainder = visible.slice(parent.index + parent[0].length, parent.index + 1800);
  const courseBlock = remainder.split(/\b(?:Gulsaus|Dessert)\b/iu)[0] ?? "";
  const options = new Map<string, number>();
  for (const match of courseBlock.matchAll(/\bIndrefilet\s+(150|220)\s*g\s*kr\.?\s*([1-9]\d{1,3})\b/giu)) {
    options.set(match[1]!, Number(match[2]) * 100);
  }
  if (options.size !== 2 || options.get(size) !== item.priceMinor) return item;
  const name = "Biff med løk (indrefilet " + size + " g)";
  return {
    ...item,
    name,
    normalizedName: normalizeDishName(name),
    sourceKey: createMenuItemSourceKey(name, item.sectionName),
    description: ["Kildeoverskrift: Biff med løk", item.description]
      .filter(Boolean).join(". "),
    sourceExcerpt: [item.sourceExcerpt, "Biff med løk", "Indrefilet " + size + " g kr " + (item.priceMinor / 100)]
      .filter(Boolean).join(" — ").slice(0, 1000),
    confidence: Math.min(item.confidence, 0.8),
  };
}

/**
 * A listed dessert that explicitly includes a serving of fortified wine is
 * not a food-only dish. Do not expose it as one until a mixed food/drink
 * product type exists in the search catalog.
 */
function isSourceConfirmedAlcoholCombination(
  item: MenuObservedItem,
  lines: readonly string[],
): boolean {
  if (!/^Efter maten\s*[–—-]\s*kombinasjon$/iu.test(item.name.trim()))
    return false;
  // Source headings and their priced descriptions may occupy separate text
  // nodes. Only inspect a short span after this exact menu heading.
  const visible = lines.join(" ");
  const heading = /(?:^|\s)Efter\s+maten\s*[–—-]\s*kombinasjon(?=\s|$)/iu.exec(visible);
  if (!heading) return false;
  const nearby = visible.slice(heading.index + heading[0].length, heading.index + 850);
  return /\bbrunost(?:en)?\b/iu.test(nearby) &&
    /\bet lite glass\b[\s\S]*?\bportvin\b/iu.test(nearby) &&
    /\b2\s*cl\b/iu.test(nearby);
}

export function reconcileSourcePricedHtmlDishes(
  items: readonly MenuObservedItem[],
  fullVisibleText: string,
): readonly MenuObservedItem[] {
  if (!fullVisibleText) return items;
  const lines = visibleLines(fullVisibleText);
  const corrected = items.flatMap((item) => {
    if (isAdjacentDescriptionFragment(item, items, lines)) return [];
    if (isSourceConfirmedAlcoholCombination(item, lines)) return [];
    // Generic food-scope guard: a sauce-only option is not a main dish.
    if (SAUCE_ONLY.test(item.name) && item.priceMinor !== null && item.priceMinor <= 15_000 &&
        !isIndividuallyPricedSauceInSection(item, lines))
      return [];
    const source = anchoredSourceLines(item, lines);
    // Expose the unit and minimum-party requirement directly in the title;
    // a scalar NOK amount must never masquerade as the total party price.
    if (source.some((line) => PRICE_PER_PERSON.test(line)))
      return explicitlyPricedPerPerson(item, source);
    const sizes = explicitSizes(item, lines);
    if (sizes) return sizes;
    const directlyPriced = explicitlyLinkedPrice(item, lines);
    return [restoreSourceBackedSteakParent(
      directlyPriced !== null ? withExactPrice(item, directlyPriced) : item,
      lines,
    )];
  });
  const existing = new Set(corrected.map((item) => item.normalizedName));
  const recovered = missingInlineDishes(lines, existing);
  return [...corrected, ...recovered].sort((a, b) => a.position - b.position);
}
