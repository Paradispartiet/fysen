import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";

export const HTML_TEXT_SECTION_SCOPE_VERSION = "text-section-scope-v15";

const SECTION_COUNT_SUFFIX = /\s*\(\s*\d{1,3}\s*\)\s*$/u;
const BEVERAGE_SECTION_LABEL =
  /^(?:drikke(?:meny)?|drinks?(?:\s+menu)?|beverages?(?:\s+menu)?|andre\s+drikker?|other\s+drinks?|mineralvann|mineral\s+water|soft\s+drinks?|sodas?|brus|milkshakes?|coffee(?:\s+and\s+tea|\s+drinks?)?|tea|kaffe\s*[/|]\s*coffee|vinkart|vin(?:kart|liste|meny)?|wine(?:\s+(?:list|menu))?|vin\s+glass\s*[/|]\s*wine\s+glass(?:\s*\(\s*\d+\s*cl\s*\))?|hvitvin\s*[/|]\s*white\s+wine|rødvin\s*[/|]\s*red\s+wine|cocktails?|mocktails?|aperitifs?|draught\s+beer|draft\s+beer|beer\s+on\s+tap|fat\s+øl\s*[/|]\s*tap\s+beer|flaske\s+øl\s*[/|]\s*bottle\s+beer|musserende\s*[/|]\s*sparkling\s+wine|øl\s*[/|]\s*beer|øl(?:\s*,?\s*cider.*)?|beer(?:s)?(?:\s*,?\s*cider.*)?|cider|alkoholfritt|non[- ]alcoholic(?:\s+drinks?)?)$/iu;
const FOOD_SECTION_LABEL =
  /^(?:food|mat|à\s+la\s+carte|forretter?|starters?|appetizers?|small\s+plates?|small\s+dishes?\s*(?:&|and)\s*sharing\s+plates?|classics?|dumplings?|proteins?|småretter|burgers?|hovedretter?|mains?|main\s+courses?|supper?|soups?|barnemeny|children'?s\s+menu|kids?\s+menu|sauser?|sauces?|desserter?|desserts?|sides?|tilbehør|salater?|salads?|pizza(?:er|s)?|noodles?|nudler|curr(?:y|ies)|wok|grillretter?|grill(?:retter)?|grilled\s+dishes?|snacks?(?:\s+menu)?|fries|kylling|chicken|lam|lamb|kebab|gaza[- ]kebab|kylling\s+og\s+lam|chicken\s+(?:&|and)\s+lamb|mezah[- ]retter|mezeh?[- ]dishes?|mezze[- ]dishes?|vegetar|vegetarian|spesial|special|nan|naan|entr[ée]es?|entr[ée]es?\s+et\s+plats?\s+pour\s+une\s+petite\s+faim|plats?\s+principaux|plats?\s+v[ée]g[ée]tariens?|fromages?\s+et\s+desserts?|coquillages?\s+et\s+crustac[ée]s)$/iu;
const PREFIXED_MAIN_COURSE_SECTION_LABEL =
  /^(?:[\p{L}][\p{L}'’.-]*\s+){1,4}main\s+courses?$/iu;
const MENU_ROOT_SECTION_LABEL = /^(?:menu|meny|our\s+menu|vår\s+meny)$/iu;
const MENU_END_SECTION_LABEL =
  /^(?:product\s+information|restaurant\s+information|restaurantinformasjon|allergen(?:oversikt|er|s)?|reservasjoner?|reservations?|kontakt(?:\s+oss)?|contact(?:\s+us)?|booking|bordbestilling)$/iu;
const MENU_PRICE_SIGNAL =
  /(?:^|\s)(?:(?:fra|from)\s*)?(?:(?:NOK|kr\.?)\s*)?[1-9]\d{0,3}(?:[.,]\d{1,3})?\s*(?:,-|kr\.?|NOK)?$/iu;
const ALLERGEN_CODE_ONLY =
  /^\(\s*[a-z]{1,4}\+?(?:\s*[,/]\s*[a-z]{1,4}\+?)*\s*\)\.?$/iu;
const QUANTITY_OPTION_ONLY =
  /^(?:(?:\d+\s+)?(?:kule(?:r)?|scoops?)|\d+\s+(?:per|pers?\.?|personer?|persons?|people))(?:\s*[_-]{2,})?$/iu;
const OUTPUT_QUANTITY_FRAGMENT =
  /^\d{1,2}\s+(?:slices?|pieces?|biter)\s*[•·|]?$/iu;
const OUTPUT_TRAILING_LAYOUT_BULLET = /[•·]\s*$/u;
const CONTACT_METADATA =
  /^(?:ring\s+oss\s+på|call\s+us(?:\s+(?:at|on))?|tel(?:efon)?|tlf|phone)\s*:?\s*\+?\d[\d\s()+.-]{4,}$/iu;
const PER_PERSON_PRICE_METADATA =
  /^(?:(?:nok|kr\.?)\s*)?[1-9]\d{1,3}(?:[.,]\d{1,2})?\s*(?:,-|kr\.?|nok)?\s*(?:per|pr)\s+(?:person|personer|persons?|people)$/iu;
const OUTPUT_METADATA =
  /^(?:our\s+menu|all\s+dishes\s+are\s+served\s+with\s+rice|contents?\s*:.*|druer\s*:.*|grapes?\s*:.*)$/iu;
const OUTPUT_ROLE_SIGNATURE =
  /^(?:[-–—]\s*)?(?:(?:head|executive|sous|pastry)\s+chef|kjøkkensjef)$/iu;
const OUTPUT_SECTION_LABEL =
  /^(?:zensai|izakaya\s+style(?:\s*[-–—]\s*japanske\s+småretter)?|robata(?:grill|\s+grill)|fra\s+sushibaren|supper|soups|salater|salads|ekstra|extra|barnemeny|children'?s\s+menu|kids?\s+menu|(?:[\p{L}][\p{L}'’.-]*\s+)?(?:spesialiteter|specialties|spesialnigiri|spesialsashimi)|(?:nigiri|sashimi|gunkan(?:\s+maki)?|hoso(?:\s+maki)?|tempura(?:\s+maki)?|maki)\s*[-–—]?\s*\d{1,2}\s*(?:biter|pieces?))$/iu;
const DESCRIPTION_FRAGMENT =
  /^(?:pieces?\s+of\b|served\s+with\b|topped\s+with\b|glazed\s+with\b|all\s+dishes\s+are\s+served\b|can\s+be\s+made\b|homemade\s+.+\s+cooked\s+in\b|chicken\s+cooked\s+in\b|grilled\s+chicken\s+in\b|traditional\s+.+\s+dessert\s+with\b)/iu;
const DESCRIPTION_PHRASE =
  /\b(?:served\s+with|topped\s+with|glazed\s+with|comes\s+with|cooked\s+in|prepared\s+(?:in|with)|serveres(?:\s+med)?|servert(?:\s+med)?|laget\s+for\s+å\s+deles)\b/iu;
const BILINGUAL_SECTION_PART =
  /^(?:forretter?|ap+etizers?|starters?|kjøtt\s+curries|non[- ]veg\s+curries|vegetar\s+curries|vegetarian\s+curries|nanbrød|nanbread|fat\s+øl|tap\s+beer|flaske\s+øl|bottle\s+beer|musserende|sparkling\s+wine|soft\s+drinks?)$/iu;
const EXPLICIT_TRAILING_PRICE =
  /\s+(?:(?:nok|kr\.?)\s*)?[1-9]\d{1,3}(?:[.,]\d{1,2})?\s*(?:,-|kr\.?|nok)\s*$/iu;
const BARE_DASH_TRAILING_PRICE = /\s+[-–—]\s*([1-9]\d{1,3})\s*$/u;
const TRAILING_DASH_ALLERGEN_CODES =
  /\s+[-–—]\s*[A-Z]{1,3}(?:\s*,\s*[A-Z]{1,3}){1,9}$/u;
const TRAILING_SINGLE_KNOWN_ALLERGEN_CODE =
  /\s+[-–—]\s*(?:AL|B|BL|CA|E|F|G|H|HA|HN|HNE|LU|M|MA|MK|MO|MU|N|P|PE|PI|R|SE|SEM|SEN|SF|SK|SL|SN|SO|SU|SY|VA|W|WA)$/u;
const TRAILING_BARE_ALLERGEN_CODES =
  /\s+[A-Z]{1,3}(?:\s*,\s*[A-Z]{1,3}){2,9}$/u;
const TRAILING_ALLERGEN_NOTE =
  /\s+[-–—]\s*\((?:spør|ask)\b[^)]*\ballerg(?:en|ener|ens)\b[^)]*\)$/iu;
const TRAILING_LEADER = /\s*_{3,}\s*$/u;
const TRAILING_ITEM_ALLERGEN_CODES =
  /\s+\((?:[\p{L}]{1,2}|\d{1,2})(?:\s*[,/+ ]\s*(?:[\p{L}]{1,2}|\d{1,2}))*\)$/u;
const SOURCE_EXCERPT_SEPARATOR = /\s+—\s+/u;
const DIRECT_SOURCE_PRICE =
  /^(?:(?:fra|from)\s*)?(?:(?:NOK|kr\.?)\s*)?[1-9]\d{0,3}(?:[.,]\d{1,2})?\s*(?:,-|kr\.?|NOK)?$/iu;
const REPEATED_TRANSLATION_PRICE_AT_END =
  /(?:^|\s)(?:(?:NOK|kr\.?)\s*)?([1-9]\d{1,3})(?:[.,](\d{1,2}))?\s*(?:,-|kr\.?|NOK)?$/iu;
const NAMED_MENU_SECTION_BOUNDARY = /^(?:meny|menu)\s+\p{L}/iu;
const TRANSLATED_STARTER_PART =
  /^(?:forretter?|starters?|appetizers?|entr[ée]es?)$/iu;
const TRANSLATED_MAIN_PART =
  /^(?:hovedretter?|mains?|main\s+courses?|plats?\s+principaux)$/iu;
const TRANSLATED_DESSERT_PART =
  /^(?:desserter?|desserts?|dessert(?:er)?\s+(?:og|&|and)\s+ost|ost\s+(?:og|&|and)\s+desserter?|desserts?\s+(?:&|and)\s+cheese|cheese\s+(?:&|and)\s+desserts?)$/iu;

type MenuSectionState = "unknown" | "food" | "beverage";
type TranslatedFoodSectionFamily = "starter" | "main" | "dessert";

interface RepeatedTranslatedPriceEntry {
  readonly titlePosition: number;
  readonly priceMinor: number;
  readonly normalizedTitle: string;
}

interface RepeatedTranslatedSectionEvidence {
  readonly pricedEntries: readonly RepeatedTranslatedPriceEntry[];
  readonly secondBlockEntries: readonly RepeatedTranslatedPriceEntry[];
}

interface InterleavedBilingualCardEvidence {
  readonly startPosition: number;
  readonly endPosition: number;
  readonly priceMinor: number;
  readonly canonicalTitle: string;
  readonly canonicalNormalizedTitle: string;
  readonly alternateNormalizedTitles: readonly string[];
  readonly parentheticalMetadata: readonly string[];
}

function normalizeLine(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/\p{Cf}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizedSectionLabel(value: string): string {
  return normalizeLine(value).replace(SECTION_COUNT_SUFFIX, "").trim();
}

function translatedFoodSectionFamily(
  value: string,
): TranslatedFoodSectionFamily | null {
  const parts = normalizeLine(value)
    .split(/\s*(?:\/|\|)\s*/u)
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length < 2) return null;

  const families = parts
    .map((part): TranslatedFoodSectionFamily | null => {
      if (TRANSLATED_STARTER_PART.test(part)) return "starter";
      if (TRANSLATED_MAIN_PART.test(part)) return "main";
      if (TRANSLATED_DESSERT_PART.test(part)) return "dessert";
      return null;
    })
    .filter(
      (family): family is TranslatedFoodSectionFamily => family !== null,
    );
  if (families.length < 2) return null;
  const distinct = new Set(families);
  return distinct.size === 1 ? (families[0] ?? null) : null;
}

function parseRepeatedTranslationPriceMinor(
  value: string,
): { readonly priceMinor: number; readonly matchIndex: number } | null {
  const line = normalizeLine(value);
  const match = line.match(REPEATED_TRANSLATION_PRICE_AT_END);
  if (!match?.[1]) return null;
  const whole = Number(match[1]);
  const decimals = (match[2] ?? "").padEnd(2, "0").slice(0, 2);
  const priceMinor = whole * 100 + Number(decimals || "0");
  if (priceMinor < 4_000 || priceMinor > 1_000_000) return null;
  return {
    priceMinor,
    matchIndex: match.index ?? 0,
  };
}

function repeatedTranslatedPricedEntry(
  lines: readonly string[],
  position: number,
): RepeatedTranslatedPriceEntry | null {
  const line = lines[position] ?? "";
  const parsed = parseRepeatedTranslationPriceMinor(line);
  if (!parsed) return null;

  let title = line.slice(0, parsed.matchIndex).trim();
  let titlePosition = position;
  if (!title) {
    for (let index = position - 1; index >= Math.max(0, position - 2); index -= 1) {
      const candidate = normalizeLine(lines[index] ?? "");
      if (!candidate) continue;
      if (
        translatedFoodSectionFamily(candidate) ||
        FOOD_SECTION_LABEL.test(normalizedSectionLabel(candidate)) ||
        BEVERAGE_SECTION_LABEL.test(normalizedSectionLabel(candidate))
      ) {
        return null;
      }
      title = candidate;
      titlePosition = index;
      break;
    }
  }

  const normalizedTitle = normalizeDishName(title);
  if (!normalizedTitle || !/\p{L}/u.test(title)) return null;
  return {
    titlePosition,
    priceMinor: parsed.priceMinor,
    normalizedTitle,
  };
}

function isRepeatedTranslationSectionBoundary(value: string): boolean {
  const sectionLabel = normalizedSectionLabel(value);
  return (
    translatedFoodSectionFamily(sectionLabel) !== null ||
    FOOD_SECTION_LABEL.test(sectionLabel) ||
    PREFIXED_MAIN_COURSE_SECTION_LABEL.test(sectionLabel) ||
    BEVERAGE_SECTION_LABEL.test(sectionLabel) ||
    MENU_ROOT_SECTION_LABEL.test(sectionLabel) ||
    MENU_END_SECTION_LABEL.test(sectionLabel) ||
    NAMED_MENU_SECTION_BOUNDARY.test(sectionLabel)
  );
}

function repeatedTranslatedSectionEvidence(
  lines: readonly string[],
): RepeatedTranslatedSectionEvidence {
  const sectionPricedEntries: RepeatedTranslatedPriceEntry[] = [];
  const secondBlockEntries: RepeatedTranslatedPriceEntry[] = [];

  for (let headingPosition = 0; headingPosition < lines.length; headingPosition += 1) {
    if (!translatedFoodSectionFamily(lines[headingPosition] ?? "")) continue;

    let sectionEnd = lines.length;
    for (let index = headingPosition + 1; index < lines.length; index += 1) {
      if (!isRepeatedTranslationSectionBoundary(lines[index] ?? "")) continue;
      sectionEnd = index;
      break;
    }

    const pricedEntries: RepeatedTranslatedPriceEntry[] = [];
    for (let index = headingPosition + 1; index < sectionEnd; index += 1) {
      const entry = repeatedTranslatedPricedEntry(lines, index);
      if (!entry) continue;
      if (
        pricedEntries.some(
          (candidate) => candidate.titlePosition === entry.titlePosition,
        )
      ) {
        continue;
      }
      pricedEntries.push(entry);
    }
    if (pricedEntries.length < 4) continue;

    let best:
      | {
          readonly start: number;
          readonly halfLength: number;
          readonly priceMatches: number;
        }
      | null = null;

    for (let start = 0; start <= pricedEntries.length - 4; start += 1) {
      const maxHalfLength = Math.floor((pricedEntries.length - start) / 2);
      for (let halfLength = 2; halfLength <= maxHalfLength; halfLength += 1) {
        let priceMatches = 0;
        let titleDifferences = 0;
        for (let offset = 0; offset < halfLength; offset += 1) {
          const first = pricedEntries[start + offset];
          const second = pricedEntries[start + halfLength + offset];
          if (!first || !second) continue;
          if (first.priceMinor === second.priceMinor) priceMatches += 1;
          if (first.normalizedTitle !== second.normalizedTitle)
            titleDifferences += 1;
        }

        const allowedPriceMismatches = halfLength >= 5 ? 1 : 0;
        if (priceMatches < halfLength - allowedPriceMismatches) continue;
        if (
          titleDifferences <
          Math.max(2, Math.ceil(halfLength / 2))
        ) {
          continue;
        }

        if (
          !best ||
          halfLength > best.halfLength ||
          (halfLength === best.halfLength &&
            priceMatches > best.priceMatches) ||
          (halfLength === best.halfLength &&
            priceMatches === best.priceMatches &&
            start < best.start)
        ) {
          best = { start, halfLength, priceMatches };
        }
      }
    }
    if (!best) continue;

    sectionPricedEntries.push(...pricedEntries);
    for (let offset = 0; offset < best.halfLength; offset += 1) {
      const first = pricedEntries[best.start + offset];
      const second =
        pricedEntries[best.start + best.halfLength + offset];
      if (!first || !second) continue;
      if (first.normalizedTitle === second.normalizedTitle) continue;
      secondBlockEntries.push(second);
    }
  }

  return {
    pricedEntries: sectionPricedEntries,
    secondBlockEntries,
  };
}


function directCardPriceMinor(value: string): number | null {
  const line = normalizeLine(value);
  if (!DIRECT_SOURCE_PRICE.test(line)) return null;
  return parseRepeatedTranslationPriceMinor(line)?.priceMinor ?? null;
}

function isUppercaseDishTitleLine(value: string): boolean {
  const line = normalizeLine(value);
  if (!line || !/\p{L}/u.test(line)) return false;
  if (/^\([^)]{1,180}\)$/u.test(line)) return false;
  if (DIRECT_SOURCE_PRICE.test(line)) return false;
  if (
    isRepeatedTranslationSectionBoundary(line) ||
    isBilingualMenuSection(line)
  ) {
    return false;
  }
  const letters = line.replace(/[^\p{L}]/gu, "");
  return Boolean(letters) && letters === letters.toUpperCase();
}

function interleavedBilingualCardEvidence(
  lines: readonly string[],
  states: readonly MenuSectionState[],
): readonly InterleavedBilingualCardEvidence[] {
  const rawCards: {
    startPosition: number;
    endPosition: number;
    priceMinor: number;
    titleLines: { position: number; title: string; normalizedTitle: string }[];
    parentheticalMetadata: string[];
  }[] = [];

  let cardStart = 0;
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? "";
    if (
      isRepeatedTranslationSectionBoundary(line) ||
      isBilingualMenuSection(line)
    ) {
      cardStart = index + 1;
      continue;
    }

    const priceMinor = directCardPriceMinor(line);
    if (priceMinor === null) continue;

    if ((states[index] ?? "unknown") === "food" && cardStart < index) {
      const titleLines: {
        position: number;
        title: string;
        normalizedTitle: string;
      }[] = [];
      const parentheticalMetadata: string[] = [];
      for (let position = cardStart; position < index; position += 1) {
        const candidate = normalizeLine(lines[position] ?? "");
        if (!candidate) continue;
        if (/^\([^)]{1,180}\)$/u.test(candidate)) {
          parentheticalMetadata.push(candidate);
          continue;
        }
        if (!isUppercaseDishTitleLine(candidate)) continue;
        const normalizedTitle = normalizeDishName(candidate);
        if (!normalizedTitle) continue;
        titleLines.push({ position, title: candidate, normalizedTitle });
      }
      if (titleLines.length > 0) {
        rawCards.push({
          startPosition: cardStart,
          endPosition: index,
          priceMinor,
          titleLines,
          parentheticalMetadata,
        });
      }
    }
    cardStart = index + 1;
  }

  const analyzed = rawCards.map((card) => {
    const counts = new Map<string, number>();
    const orderedDistinct: string[] = [];
    for (const title of card.titleLines) {
      if (!counts.has(title.normalizedTitle))
        orderedDistinct.push(title.normalizedTitle);
      counts.set(
        title.normalizedTitle,
        (counts.get(title.normalizedTitle) ?? 0) + 1,
      );
    }
    const repeated = orderedDistinct.filter(
      (title) => (counts.get(title) ?? 0) >= 2,
    );
    return { card, counts, orderedDistinct, repeated };
  });

  const strongCards = analyzed.filter(
    ({ orderedDistinct, repeated }) =>
      orderedDistinct.length === 2 && repeated.length === 1,
  );
  if (strongCards.length < 2) return [];

  const evidence: InterleavedBilingualCardEvidence[] = [];
  for (const { card, orderedDistinct, repeated } of analyzed) {
    let canonicalNormalizedTitle: string | null = null;
    let alternateNormalizedTitles: string[] = [];

    if (orderedDistinct.length === 2 && repeated.length === 1) {
      canonicalNormalizedTitle = repeated[0] ?? null;
      alternateNormalizedTitles = orderedDistinct.filter(
        (title) => title !== canonicalNormalizedTitle,
      );
    } else if (
      orderedDistinct.length === 2 &&
      repeated.length === 0 &&
      card.titleLines.length === 2
    ) {
      canonicalNormalizedTitle = orderedDistinct[0] ?? null;
      alternateNormalizedTitles = orderedDistinct.slice(1);
    }

    if (!canonicalNormalizedTitle) continue;
    const canonical = card.titleLines.find(
      (title) => title.normalizedTitle === canonicalNormalizedTitle,
    );
    if (!canonical) continue;

    evidence.push({
      startPosition: card.startPosition,
      endPosition: card.endPosition,
      priceMinor: card.priceMinor,
      canonicalTitle: canonical.title,
      canonicalNormalizedTitle,
      alternateNormalizedTitles,
      parentheticalMetadata: card.parentheticalMetadata,
    });
  }

  return evidence;
}

function itemMatchesInterleavedCard(
  item: MenuObservedItem,
  card: InterleavedBilingualCardEvidence,
): boolean {
  if (item.priceMinor !== card.priceMinor) return false;
  const titles = [
    card.canonicalNormalizedTitle,
    ...card.alternateNormalizedTitles,
  ];
  const nameMatches = titles.some(
    (title) =>
      item.normalizedName === title ||
      item.normalizedName.startsWith(`${title} `),
  );
  if (!nameMatches) return false;

  const positionMatches =
    item.position >= card.startPosition && item.position <= card.endPosition;
  const excerpt = normalizeDishName(item.sourceExcerpt ?? "");
  const excerptMatches =
    Boolean(excerpt) &&
    titles.some(
      (title) =>
        excerpt === title ||
        excerpt.startsWith(`${title} `) ||
        excerpt.includes(title),
    );
  return positionMatches || excerptMatches;
}

function canonicalizeInterleavedBilingualItems(
  items: readonly MenuObservedItem[],
  cards: readonly InterleavedBilingualCardEvidence[],
): readonly MenuObservedItem[] {
  if (cards.length === 0) return items;

  const result: MenuObservedItem[] = [];
  for (const item of items) {
    let current = item;
    let drop = false;

    for (const card of cards) {
      if (!itemMatchesInterleavedCard(current, card)) continue;

      if (card.alternateNormalizedTitles.includes(current.normalizedName)) {
        drop = true;
        break;
      }

      if (current.normalizedName !== card.canonicalNormalizedTitle) {
        const metadataMatch = card.parentheticalMetadata.some(
          (metadata) =>
            normalizeDishName(`${card.canonicalTitle} ${metadata}`) ===
            current.normalizedName,
        );
        if (metadataMatch) {
          current = {
            ...current,
            name: card.canonicalTitle,
            normalizedName: card.canonicalNormalizedTitle,
            sourceKey: createMenuItemSourceKey(
              card.canonicalTitle,
              current.sectionName,
            ),
          };
        }
      }
      break;
    }

    if (!drop) result.push(current);
  }
  return result;
}

function itemNameMatchesRepeatedTranslatedEntry(
  item: MenuObservedItem,
  entry: RepeatedTranslatedPriceEntry,
): boolean {
  const itemName = item.normalizedName;
  const rawName = entry.normalizedTitle;
  return (
    itemName === rawName ||
    rawName.startsWith(`${itemName} `) ||
    itemName.startsWith(`${rawName} `)
  );
}

function itemMatchesRepeatedTranslatedEntry(
  item: MenuObservedItem,
  entry: RepeatedTranslatedPriceEntry,
): boolean {
  if (item.priceMinor !== entry.priceMinor) return false;
  if (!itemNameMatchesRepeatedTranslatedEntry(item, entry)) return false;

  const rawName = entry.normalizedTitle;
  const excerpt = normalizeDishName(item.sourceExcerpt ?? "");
  const excerptMatches =
    Boolean(excerpt) &&
    (excerpt.includes(rawName) || rawName.includes(excerpt));
  return item.position === entry.titlePosition || excerptMatches;
}

function sectionStateByPosition(
  lines: readonly string[],
): readonly MenuSectionState[] {
  const states: MenuSectionState[] = [];
  let state: MenuSectionState = "unknown";
  let sawPrice = false;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? "";
    const sectionLabel = normalizedSectionLabel(line);
    const countedSection = SECTION_COUNT_SUFFIX.test(line);

    if (!countedSection && !sawPrice && MENU_ROOT_SECTION_LABEL.test(sectionLabel)) {
      state = "unknown";
      states[index] = "unknown";
      continue;
    }
    if (
      !countedSection &&
      translatedFoodSectionFamily(sectionLabel) !== null
    ) {
      state = "food";
      states[index] = "unknown";
      continue;
    }
    if (!countedSection && BEVERAGE_SECTION_LABEL.test(sectionLabel)) {
      state = "beverage";
      states[index] = "unknown";
      continue;
    }
    if (
      !countedSection &&
      (FOOD_SECTION_LABEL.test(sectionLabel) ||
        PREFIXED_MAIN_COURSE_SECTION_LABEL.test(sectionLabel))
    ) {
      state = "food";
      states[index] = "unknown";
      continue;
    }
    if (sawPrice && MENU_END_SECTION_LABEL.test(sectionLabel)) {
      state = "unknown";
      states[index] = "unknown";
      continue;
    }

    states[index] = state;
    if (MENU_PRICE_SIGNAL.test(line)) sawPrice = true;
  }

  return states;
}

interface ItemSectionEvidence {
  hasFoodOccurrence: boolean;
  hasBeverageOccurrence: boolean;
}

function stripOuterParentheses(value: string): string {
  const trimmed = value.trim();
  if (trimmed.startsWith("(") && trimmed.endsWith(")")) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

function isBilingualMenuSection(value: string): boolean {
  const parts = value
    .split(/[|/]/u)
    .map((part) => part.trim())
    .filter(Boolean);
  return (
    translatedFoodSectionFamily(value) !== null ||
    (parts.length >= 2 &&
      parts.every((part) => BILINGUAL_SECTION_PART.test(part)))
  );
}

function looksLikeDescriptionFragment(value: string): boolean {
  const normalized = normalizeLine(value);
  if (DESCRIPTION_FRAGMENT.test(normalized)) return true;
  const wordCount = normalized.split(/\s+/u).filter(Boolean).length;
  return wordCount >= 8 && DESCRIPTION_PHRASE.test(normalized);
}

function isObviousOutputNoise(
  value: string,
  allowDirectPricedFoodDescription = false,
): boolean {
  const normalized = normalizeLine(value);
  const unwrapped = stripOuterParentheses(normalized);
  const withoutLeadingDelimiter = unwrapped.replace(/^[/|•]+\s*/u, "").trim();
  return (
    ALLERGEN_CODE_ONLY.test(normalized) ||
    QUANTITY_OPTION_ONLY.test(normalized) ||
    OUTPUT_QUANTITY_FRAGMENT.test(normalized) ||
    OUTPUT_TRAILING_LAYOUT_BULLET.test(normalized) ||
    CONTACT_METADATA.test(normalized) ||
    PER_PERSON_PRICE_METADATA.test(normalized) ||
    OUTPUT_METADATA.test(withoutLeadingDelimiter) ||
    OUTPUT_ROLE_SIGNATURE.test(withoutLeadingDelimiter) ||
    OUTPUT_SECTION_LABEL.test(withoutLeadingDelimiter) ||
    (!allowDirectPricedFoodDescription &&
      looksLikeDescriptionFragment(withoutLeadingDelimiter)) ||
    isBilingualMenuSection(withoutLeadingDelimiter) ||
    BEVERAGE_SECTION_LABEL.test(normalizedSectionLabel(withoutLeadingDelimiter)) ||
    /^(?:gluten[- ]?fri|gluten[- ]?free)$/iu.test(withoutLeadingDelimiter)
  );
}

function hasConflictingExplicitNamePrice(
  item: MenuObservedItem,
  repeatedEntries: readonly RepeatedTranslatedPriceEntry[],
): boolean {
  if (item.priceMinor === null) return false;
  const normalizedName = normalizeLine(item.name);
  const match = normalizedName.match(
    /\s+(?:(?:nok|kr\.?)\s*)?([1-9]\d{1,3})(?:[.,]\d{1,2})?\s*(?:,-|kr\.?|nok)\s*$/iu,
  );
  if (!match?.[1] || match.index === undefined) return false;
  const embeddedPriceMinor = Number(match[1]) * 100;
  if (embeddedPriceMinor === item.priceMinor) return false;

  const baseName = normalizeDishName(
    normalizedName.slice(0, match.index).trim(),
  );
  if (!baseName) return false;
  return repeatedEntries.some(
    (entry) =>
      entry.priceMinor === embeddedPriceMinor &&
      (entry.normalizedTitle === baseName ||
        entry.normalizedTitle.startsWith(`${baseName} `) ||
        baseName.startsWith(`${entry.normalizedTitle} `)),
  );
}

function cleanOutputArtifactName(item: MenuObservedItem): MenuObservedItem {
  let name = normalizeLine(item.name).replace(TRAILING_LEADER, "").trim();
  name = name.replace(EXPLICIT_TRAILING_PRICE, "").trim();
  name = name.replace(TRAILING_ALLERGEN_NOTE, "").trim();
  name = name.replace(TRAILING_DASH_ALLERGEN_CODES, "").trim();
  name = name.replace(TRAILING_SINGLE_KNOWN_ALLERGEN_CODE, "").trim();
  name = name.replace(TRAILING_BARE_ALLERGEN_CODES, "").trim();
  const barePrice = name.match(BARE_DASH_TRAILING_PRICE);
  if (barePrice?.[1] && Number(barePrice[1]) >= 40 && item.priceMinor === Number(barePrice[1]) * 100) {
    name = name.replace(BARE_DASH_TRAILING_PRICE, "").trim();
  }
  name = name.replace(/[-–—]\s*$/u, "").trim();
  if (!name || name === item.name) return item;
  return {
    ...item,
    name,
    normalizedName: normalizeDishName(name),
    sourceKey: createMenuItemSourceKey(name, item.sectionName),
  };
}

function hasDirectPriceSourceProvenance(item: MenuObservedItem): boolean {
  const sourceExcerpt = item.sourceExcerpt?.trim() ?? "";
  if (!sourceExcerpt) return false;
  const segments = sourceExcerpt
    .split(SOURCE_EXCERPT_SEPARATOR)
    .map(normalizeLine)
    .filter(Boolean);
  if (segments.length < 2) return false;
  if (normalizeDishName(segments[0] ?? "") !== item.normalizedName) return false;
  return DIRECT_SOURCE_PRICE.test(segments[1] ?? "");
}

function lineReferencesItem(
  line: string,
  itemName: string,
  matchTrailingAllergenCodes = false,
): boolean {
  const normalizedEvidenceLine = normalizeLine(line);
  const evidenceLine = matchTrailingAllergenCodes
    ? normalizedEvidenceLine.replace(TRAILING_ITEM_ALLERGEN_CODES, "").trim()
    : normalizedEvidenceLine;
  const normalizedLine = normalizeDishName(evidenceLine);
  const normalizedName = normalizeDishName(itemName);
  if (!normalizedName || !normalizedLine.startsWith(normalizedName)) return false;
  if (normalizedLine.length === normalizedName.length) return true;
  const remainder = normalizedLine.slice(normalizedName.length).trim();
  return /^(?:\d|nok\b|kr\b)/iu.test(remainder);
}

function sectionEvidenceForItem(
  item: MenuObservedItem,
  lines: readonly string[],
  states: readonly MenuSectionState[],
  matchTrailingAllergenCodes = false,
): ItemSectionEvidence {
  const evidence: ItemSectionEvidence = {
    hasFoodOccurrence: false,
    hasBeverageOccurrence: false,
  };
  for (let index = 0; index < lines.length; index += 1) {
    const state = states[index] ?? "unknown";
    if (state === "unknown") continue;
    const line = lines[index] ?? "";
    if (!lineReferencesItem(line, item.name, matchTrailingAllergenCodes))
      continue;
    if (state === "food") evidence.hasFoodOccurrence = true;
    if (state === "beverage") evidence.hasBeverageOccurrence = true;
    if (evidence.hasFoodOccurrence && evidence.hasBeverageOccurrence) break;
  }
  return evidence;
}

interface BeverageSectionFilterOptions {
  readonly matchTrailingAllergenCodes?: boolean;
}

export function filterPlainTextBeverageSectionItems(
  items: readonly MenuObservedItem[],
  visibleText: string,
  options: BeverageSectionFilterOptions = {},
): readonly MenuObservedItem[] {
  if (items.length === 0) return items;
  const lines = visibleText.split("\n").map(normalizeLine).filter(Boolean);
  const hasBeverageSection = lines.some((line) =>
    BEVERAGE_SECTION_LABEL.test(normalizedSectionLabel(line)),
  );
  const states = sectionStateByPosition(lines);
  const repeatedTranslatedEvidence =
    repeatedTranslatedSectionEvidence(lines);
  const interleavedEvidence = interleavedBilingualCardEvidence(
    lines,
    states,
  );
  const cleanedItems = canonicalizeInterleavedBilingualItems(
    items
      .filter(
        (item) =>
          !hasConflictingExplicitNamePrice(
            item,
            repeatedTranslatedEvidence.pricedEntries,
          ),
      )
      .map(cleanOutputArtifactName),
    interleavedEvidence,
  );

  return cleanedItems.filter((item) => {
    if (
      repeatedTranslatedEvidence.secondBlockEntries.some((entry) =>
        itemMatchesRepeatedTranslatedEntry(item, entry),
      )
    ) {
      return false;
    }
    const evidence = sectionEvidenceForItem(
      item,
      lines,
      states,
      options.matchTrailingAllergenCodes ?? false,
    );
    const allowDirectPricedFoodDescription =
      looksLikeDescriptionFragment(item.name) &&
      hasDirectPriceSourceProvenance(item) &&
      evidence.hasFoodOccurrence &&
      !evidence.hasBeverageOccurrence;
    if (isObviousOutputNoise(item.name, allowDirectPricedFoodDescription))
      return false;
    if (!hasBeverageSection || !evidence.hasBeverageOccurrence) return true;
    return evidence.hasFoodOccurrence;
  });
}

export function filterHtmlBeverageSectionItemsWithScopedProvenance(
  items: readonly MenuObservedItem[],
  scopedVisibleText: string,
  fullVisibleText: string,
): readonly MenuObservedItem[] {
  if (items.length === 0) return items;

  const scopedLines = scopedVisibleText
    .split("\n")
    .map(normalizeLine)
    .filter(Boolean);
  const scopedItems: MenuObservedItem[] = [];
  const fullPageRecoveryItems: MenuObservedItem[] = [];

  for (const item of items) {
    if (
      scopedLines.some((line) => lineReferencesItem(line, item.name, true))
    ) {
      scopedItems.push(item);
    } else {
      fullPageRecoveryItems.push(item);
    }
  }

  const scopedFiltered = filterPlainTextBeverageSectionItems(
    scopedItems,
    scopedVisibleText,
  );
  const scopedFullPageFiltered = filterPlainTextBeverageSectionItems(
    scopedFiltered,
    fullVisibleText,
    { matchTrailingAllergenCodes: true },
  );
  const fullPageFiltered = filterPlainTextBeverageSectionItems(
    fullPageRecoveryItems,
    fullVisibleText,
    { matchTrailingAllergenCodes: true },
  );

  const unique = new Map<string, MenuObservedItem>();
  for (const item of fullPageFiltered) unique.set(item.sourceKey, item);
  for (const item of scopedFullPageFiltered) unique.set(item.sourceKey, item);
  return [...unique.values()].sort((left, right) => left.position - right.position);
}
