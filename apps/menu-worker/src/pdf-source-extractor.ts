import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";
import { extractPdfMenu, type ExtractedPdfMenu } from "./pdf-extractor.js";

export const PDF_SOURCE_EXTRACTOR_VERSION = "pdf-text-v29";

const LOW_PER_ITEM_PRICE =
  /^(?:(?:kr\.?|nok)\s*(3\d)|(3\d)\s*(?:kr\.?|nok))\s*(?:,-)?\s*\((?:pr\.?\s*stk\.?|per\s+(?:piece|item|stk\.?)|each)\)$/iu;
const LOW_EXPLICIT_PRICE =
  /^(3\d)\s*(?:,-|kr\.?|nok)$/iu;
const LEADING_MENU_NUMBER = /^\d{1,3}\s*[.)]\s*/u;
const SECTION_PRICE_SIGNAL =
  /(?:^|\s)(?:kr\.?|nok)?\s*[1-9]\d{1,3}(?:[.,]\d{1,2})?\s*(?:,-|kr\.?|nok)?$/iu;
const VARIANT_SECTION_KEYWORD =
  /\b(?:sashimi|nigiri|maki|uramaki|futomaki|temaki|sushi|tacos?|pizza(?:er|s)?|pasta|dessert(?:er|s)?|starters?|forretter?|mains?|hovedretter?|grill|bowls?|antipasti|primi|secondi|contorni|dolci)\b/iu;
const SERVICE_CONTEXT_HEADING =
  /^(?:lunsjmeny|lunch\s+menu|kveldsmeny|dinner\s+menu|all\s+day|evening)\b/iu;
const PDF_BEVERAGE_STYLE_ITEM =
  /\b(?:øl|ale|ipa|pils(?:ner)?|weissbier|hveteøl|radler|beer|cider|stout|lager|bayer)\b/iu;
const PDF_BEVERAGE_VOLUME_ITEM =
  /\b\d(?:[.,]\d{1,2})(?:\s*(?:l|cl|ml))?(?:\s*\/\s*\d(?:[.,]\d{1,2})(?:\s*(?:l|cl|ml))?)?\b/iu;
const PDF_ADDON_INSTRUCTION_ITEM =
  /^(?:add|legg\s+til)\b.{0,160}\b(?:to\s+any\s+dish|til\s+(?:enhver|alle)\s+rett(?:er)?|for)\b/iu;
const PDF_LOWERCASE_SENTENCE_FRAGMENT = /^[a-zæøå].{2,220}[.]$/u;
const PDF_PARENTHETICAL_ALLERGEN_ITEM =
  /^\(\s*(?:(?:fisk|fish|skalldyr|shellfish|bløtdyr|molluscs?|melk|milk|laktose|lactose|egg|eggs?|hvete|wheat|hvetegluten|gluten|soya?|soy|selleri|celery|sennep|mustard|sesam|sesame|sulfitt|sulphites?|nøtter?|nuts?|peanøtter?|peanuts?|lupin|citrus|sitrus)\s*[,/+&]?\s*)+\)$/iu;
const PDF_QUANTITY_PRICE_LABEL = /^\d{1,3}\s+(?:for|stk\.?|pieces?|pcs?\.?)$/iu;
const PDF_BEVERAGE_PAIRING_METADATA = /\b(?:wine\s+pairing|vinpakke|vinanbefaling|wine\s+recomm?endation)\b/iu;
const PDF_WINE_STYLE_ITEM =
  /\b(?:sauvignon\s+blanc|cabernet\s+sauvignon|pinot\s+(?:noir|grigio|gris)|chardonnay|riesling|barbera|zinfandel|chablis|sancerre|sauternes|moscatel|tokaji|madeira|meursault|montrachet|chambertin|saint[- ]emilion|cr[eé]mant|prosecco)\b/iu;
const PDF_FIXED_COURSE_MENU_ITEM =
  /^(?:\d{1,2}|two|three|four|five|six|seven|eight|nine|ten)\s*(?:retters?|course(?:s)?)\s*(?:middag(?:smeny)?|dinner(?:\s+menu)?|menu)?$/iu;
const PDF_GENERIC_SECTION_PRICE_LABEL = /^(?:specials?)$/iu;
const TRAILING_SHARING_TAGLINE =
  /\s+(?:perfekt\s+å\s+dele|perfect\s+for\s+sharing)!?$/iu;
const RECOVERY_ALLERGEN_CODES = new Set([
  "al",
  "b",
  "bl",
  "ca",
  "e",
  "f",
  "g",
  "h",
  "ha",
  "hne",
  "m",
  "ma",
  "mk",
  "n",
  "p",
  "pe",
  "pi",
  "r",
  "se",
  "sem",
  "sk",
  "sl",
  "sn",
  "so",
  "su",
  "sy",
  "va",
  "wa",
]);

const SPLIT_PDF_ALLERGEN_CODES = new Set([
  ...RECOVERY_ALLERGEN_CODES,
  "by",
  "c",
  "hn",
  "lu",
  "s",
  "sp",
  "vn",
]);

function looksLikeSplitPdfAllergenCodeFragment(value: string): boolean {
  const line = normalizeVisibleLine(value);
  if (!/[()]/u.test(line)) return false;
  const tokens = line
    .replace(/[(),/+&;:]+/gu, " ")
    .trim()
    .split(/\s+/u)
    .filter(Boolean);
  return (
    tokens.length > 0 &&
    tokens.every(
      (token) =>
        /^[A-ZÆØÅ]{1,3}$/u.test(token) &&
        SPLIT_PDF_ALLERGEN_CODES.has(token.toLocaleLowerCase("nb-NO")),
    )
  );
}

function normalizeScopeLine(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[Đđ]/gu, (letter) => (letter === "Đ" ? "D" : "d"))
    .replace(/\p{M}/gu, "")
    .toLocaleLowerCase("nb-NO")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .replace(/\b(?:\p{L}\s+){2,}\p{L}\b/gu, (match) =>
      match.replace(/\s+/g, ""),
    )
    .replace(/\b(?:\d\s+){1,3}\d\b/gu, (match) => match.replace(/\s+/g, ""))
    .trim();
}

function normalizeVisibleLine(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}

function isBeverageSectionHeading(value: string): boolean {
  const line = normalizeScopeLine(value);
  return /^(?:bia va ruou(?: beer spirits)?|beer(?: and)? spirits|giai khat(?: non alcohol(?:ic)?)?|non alcoholic(?: drinks?)?|alkoholfrie? alternativ(?: non alcoholic alternative)?(?: glass bottle)?|ruou pha(?: cocktails?)?|(?:[\p{L}\p{N}]+ )?cocktails?|khong con(?: mocktails?)?|mocktails?|pre ?drinks?(?: \d{2,4})?|do uong(?: drinks?)?|drikke(?:meny)?|drinks?|beverages?|soft drinks?|barnedrinker|barne drikker|kids drinks?|children s drinks?|vinkart|vin(?:kart|liste|meny)?|musserende(?: sparkling)?(?: glass bottle)?|sparkling(?: wine)?s?(?: glass bottle)?|hvitvin(?: white wines?)?(?: glass bottle)?|white wines?(?: glass bottle)?|rodvin(?: red wines?)?(?: glass bottle)?|red wines?(?: glass bottle)?|rosevin(?: rose wines?)?(?: glass bottle)?|rose wines?(?: glass bottle)?|wine(?: list| menu| by the glass)?|bubbles|champagne|ol(?: beer)?|beer(?:s)?|(?:single malt )?whisk(?:e)?y(?: bourbon)?|bourbon|brandy(?: cognac)?|cognac|bitters?|(?:various )?spirits?|brennevin|liquor|vodka|gin|rum|tequila(?: mezcal)?|mezcal|aquavit|akevitt|liqueurs?|calvados|armagnac|grappa|port(?: wine)?|sherry|vermouth|sake|coffee|kaffe|tea|te|varm drikke(?: hot beverages?)?)$/u.test(
    line,
  );
}

function isFoodSectionHeading(value: string): boolean {
  const line = normalizeScopeLine(value);
  return /^(?:do ngot(?: dessert)?|desserts?(?: dessert)?|dolci|mat|food|all day|evening|middagsmeny(?: dinner menu)?|dinner menu(?: middagsmeny)?|forrett(?: starter)?|forretter(?: starters?)?|starters?|mellomrett(?: middle course)?|middle course(?: mellomrett)?|smaretter|small plates?|snacks?|hovedrett(?: main course)?|hovedretter(?: main courses?)?|main courses?|mains?|sides?|burgers?|set menus?)$/u.test(
    line,
  );
}

function beverageBlockedLines(visibleText: string): readonly boolean[] {
  const lines = visibleText.split("\n");
  const blocked: boolean[] = [];
  let beverageSection = false;

  for (const [index, line] of lines.entries()) {
    if (isBeverageSectionHeading(line)) {
      beverageSection = true;
      blocked[index] = true;
      continue;
    }
    if (beverageSection && isFoodSectionHeading(line)) {
      beverageSection = false;
      blocked[index] = false;
      continue;
    }
    blocked[index] = beverageSection;
  }

  return blocked;
}

function lineStartsWithDishName(line: string, dishName: string): boolean {
  const normalizedLine = normalizeDishName(
    normalizeVisibleLine(line).replace(LEADING_MENU_NUMBER, ""),
  );
  const normalizedName = normalizeDishName(dishName);
  if (!normalizedName || !normalizedLine.startsWith(normalizedName))
    return false;
  if (normalizedLine.length === normalizedName.length) return true;
  const next = normalizedLine.slice(
    normalizedName.length,
    normalizedName.length + 1,
  );
  return next === " " || /\d/u.test(next);
}

function findNextDishLine(
  lines: readonly string[],
  dishName: string,
  startIndex: number,
): number | null {
  for (let index = Math.max(0, startIndex); index < lines.length; index += 1) {
    if (lineStartsWithDishName(lines[index] ?? "", dishName)) return index;
  }
  return null;
}

function looksLikeVariantSectionHeading(value: string): boolean {
  const line = normalizeVisibleLine(value);
  if (
    line.length < 3 ||
    line.length > 80 ||
    SECTION_PRICE_SIGNAL.test(line) ||
    !VARIANT_SECTION_KEYWORD.test(line)
  ) {
    return false;
  }
  return line.split(/\s+/u).filter(Boolean).length <= 6;
}

function nearestVariantSectionHeading(
  lines: readonly string[],
  dishLineIndex: number,
): string | null {
  for (
    let index = dishLineIndex - 1;
    index >= Math.max(0, dishLineIndex - 16);
    index -= 1
  ) {
    const line = normalizeVisibleLine(lines[index] ?? "");
    if (!line) continue;
    if (looksLikeVariantSectionHeading(line)) return line;
  }
  return null;
}

function nearestServiceContextHeading(
  lines: readonly string[],
  dishLineIndex: number,
): string | null {
  for (
    let index = dishLineIndex - 1;
    index >= Math.max(0, dishLineIndex - 160);
    index -= 1
  ) {
    const line = normalizeVisibleLine(lines[index] ?? "");
    if (!line) continue;
    if (SERVICE_CONTEXT_HEADING.test(line)) return line;
  }
  return null;
}

export function disambiguateConflictingPdfSourceKeys(
  visibleText: string,
  items: readonly MenuObservedItem[],
): readonly MenuObservedItem[] {
  const groups = new Map<string, MenuObservedItem[]>();
  for (const item of items) {
    const group = groups.get(item.sourceKey) ?? [];
    group.push(item);
    groups.set(item.sourceKey, group);
  }

  const conflictingKeys = new Set<string>();
  for (const [sourceKey, group] of groups) {
    if (group.length < 2) continue;
    const prices = new Set(
      group.map(
        (item) =>
          `${item.priceKind ?? "exact"}:${item.priceMinor ?? "null"}:${item.priceMaxMinor ?? "null"}`,
      ),
    );
    if (prices.size >= 2) conflictingKeys.add(sourceKey);
  }
  if (conflictingKeys.size === 0) return items;

  const lines = visibleText.split("\n").map(normalizeVisibleLine);
  const sectionByItem = new Map<MenuObservedItem, string>();
  let searchFrom = 0;
  for (const item of items) {
    const lineIndex = findNextDishLine(lines, item.name, searchFrom);
    if (lineIndex !== null) searchFrom = lineIndex + 1;
    if (lineIndex === null || !conflictingKeys.has(item.sourceKey)) continue;
    const serviceContext = nearestServiceContextHeading(lines, lineIndex);
    const section =
      serviceContext ?? nearestVariantSectionHeading(lines, lineIndex);
    if (section) sectionByItem.set(item, section);
  }

  const resolvedKeys = new Set<string>();
  for (const sourceKey of conflictingKeys) {
    const group = groups.get(sourceKey) ?? [];
    const sections = group
      .map((item) => sectionByItem.get(item) ?? null)
      .filter((value): value is string => Boolean(value));
    if (sections.length !== group.length) continue;
    const distinctSections = new Set(sections.map(normalizeDishName));
    if (distinctSections.size >= 2) resolvedKeys.add(sourceKey);
  }

  return items.map((item) => {
    if (!resolvedKeys.has(item.sourceKey)) return item;
    const sectionName = sectionByItem.get(item);
    if (!sectionName) return item;
    return {
      ...item,
      sectionName,
      sourceKey: createMenuItemSourceKey(item.name, sectionName),
    };
  });
}

function looksLikePdfBeverageItem(name: string): boolean {
  const normalized = normalizeVisibleLine(name);
  return (
    PDF_WINE_STYLE_ITEM.test(normalized) ||
    (PDF_BEVERAGE_STYLE_ITEM.test(normalized) &&
      PDF_BEVERAGE_VOLUME_ITEM.test(normalized))
  );
}

function looksLikePdfDescriptionFragment(name: string): boolean {
  const normalized = normalizeVisibleLine(name);
  return (
    PDF_LOWERCASE_SENTENCE_FRAGMENT.test(normalized) ||
    PDF_PARENTHETICAL_ALLERGEN_ITEM.test(normalized) ||
    looksLikeSplitPdfAllergenCodeFragment(normalized) ||
    PDF_ADDON_INSTRUCTION_ITEM.test(normalized)
  );
}

function looksLikePricingMetadata(name: string): boolean {
  const normalized = normalizeScopeLine(name);
  return (
    /^(?:minimum|min)\s+\d+\s+(?:personer|persons?|people)\b.*\b(?:pris|price)\s+(?:per|pr)\s+(?:person|personer)\b/u.test(
      normalized,
    ) ||
    PDF_QUANTITY_PRICE_LABEL.test(normalizeVisibleLine(name)) ||
    PDF_BEVERAGE_PAIRING_METADATA.test(name) ||
    PDF_FIXED_COURSE_MENU_ITEM.test(normalizeVisibleLine(name)) ||
    PDF_GENERIC_SECTION_PRICE_LABEL.test(normalizeVisibleLine(name))
  );
}

function cleanPdfOutputItemName(item: MenuObservedItem): MenuObservedItem {
  const name = normalizeVisibleLine(item.name)
    .replace(TRAILING_SHARING_TAGLINE, "")
    .trim();
  if (!name || name === item.name) return item;
  return {
    ...item,
    name,
    normalizedName: normalizeDishName(name),
    sourceKey: createMenuItemSourceKey(name, item.sectionName),
  };
}

function canonicalRecoveredDishName(value: string): string {
  const tokens = normalizeVisibleLine(value)
    .replace(LEADING_MENU_NUMBER, "")
    .split(/\s+/u);
  let end = tokens.length;
  while (end > 0) {
    const token = (tokens[end - 1] ?? "").replace(/[(),.;:]+$/gu, "");
    if (!/^[A-ZÆØÅ]{1,3}$/u.test(token)) break;
    if (!RECOVERY_ALLERGEN_CODES.has(token.toLocaleLowerCase("nb-NO"))) break;
    end -= 1;
  }
  return tokens.slice(0, end).join(" ").trim();
}

export function recoverExplicitLowPerItemPdfRows(
  visibleText: string,
  items: readonly MenuObservedItem[],
): readonly MenuObservedItem[] {
  const recovered = [...items];
  const known = new Set(
    items.map(
      (item) => `${item.normalizedName}\u0000${item.priceMinor ?? "null"}`,
    ),
  );
  const lines = visibleText.split("\n").map(normalizeVisibleLine);

  for (let index = 0; index + 1 < lines.length; index += 1) {
    const rawName = lines[index] ?? "";
    const rawPrice = lines[index + 1] ?? "";
    const match =
      rawPrice.match(LOW_PER_ITEM_PRICE) ?? rawPrice.match(LOW_EXPLICIT_PRICE);
    const kronerText = match?.[1] ?? match?.[2];
    if (!kronerText) continue;

    const name = canonicalRecoveredDishName(rawName);
    if (name.length < 2 || name.length > 220 || !/\p{L}/u.test(name)) continue;
    const priceMinor = Number(kronerText) * 100;
    const normalizedName = normalizeDishName(name);
    const key = `${normalizedName}\u0000${priceMinor}`;
    if (known.has(key)) continue;
    known.add(key);

    recovered.push({
      sourceKey: createMenuItemSourceKey(name),
      name,
      normalizedName,
      description: null,
      sectionName: null,
      priceMinor,
      priceKind: "exact",
      priceMaxMinor: null,
      currency: "NOK",
      position: recovered.length,
      extractionMethod: "pdf_text",
      confidence: 0.82,
      sourceExcerpt: `${rawName} — ${rawPrice}`.slice(0, 1000),
    });
  }

  return recovered;
}

export function filterPdfConflictMetadataItems(
  items: readonly MenuObservedItem[],
): readonly MenuObservedItem[] {
  return items.filter(
    (item) => !looksLikeSplitPdfAllergenCodeFragment(item.name),
  );
}

export function scopePdfMenuItems(
  visibleText: string,
  items: readonly MenuObservedItem[],
): readonly MenuObservedItem[] {
  const lines = visibleText.split("\n");
  console.error(
    "[TEMP pdf-scope-lines]",
    JSON.stringify(lines.map((line, index) => ({ index, line })).slice(45, 140)),
  );
  const blocked = beverageBlockedLines(visibleText);
  const scoped: MenuObservedItem[] = [];
  const debugDrops: Array<{ name: string; reason: string; lineIndex: number | null }> = [];
  let searchFrom = 0;

  for (const item of items) {
    if (looksLikePricingMetadata(item.name)) {
      debugDrops.push({ name: item.name, reason: "pricing-metadata", lineIndex: null });
      continue;
    }
    if (looksLikePdfBeverageItem(item.name)) {
      debugDrops.push({ name: item.name, reason: "beverage-name", lineIndex: null });
      continue;
    }
    if (looksLikePdfDescriptionFragment(item.name)) {
      debugDrops.push({ name: item.name, reason: "description-fragment", lineIndex: null });
      continue;
    }
    const lineIndex = findNextDishLine(lines, item.name, searchFrom);
    if (lineIndex !== null) searchFrom = lineIndex + 1;
    if (lineIndex !== null && blocked[lineIndex]) {
      debugDrops.push({ name: item.name, reason: "beverage-section", lineIndex });
      continue;
    }
    scoped.push(cleanPdfOutputItemName(item));
  }

  console.error("[TEMP pdf-scope-drops]", JSON.stringify(debugDrops));
  return scoped.map((item, position) => ({ ...item, position }));
}

export async function extractScopedPdfMenu(
  bytes: Uint8Array,
): Promise<ExtractedPdfMenu> {
  const extracted = await extractPdfMenu(bytes);
  const recoveredItems = recoverExplicitLowPerItemPdfRows(
    extracted.visibleText,
    extracted.items,
  );
  const conflictEligibleItems = filterPdfConflictMetadataItems(recoveredItems);
  const disambiguatedItems = disambiguateConflictingPdfSourceKeys(
    extracted.visibleText,
    conflictEligibleItems,
  );
  return {
    ...extracted,
    items: scopePdfMenuItems(extracted.visibleText, disambiguatedItems),
  };
}
