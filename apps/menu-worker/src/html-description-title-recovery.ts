import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";

export const HTML_DESCRIPTION_TITLE_RECOVERY_VERSION = "titles-v12";

const PRICE_LINE =
  /^(?:(?:kr\.?\s*)?[1-9]\d{1,3}(?:[.,]\d{1,2})?(?:\s*(?:,-|kr\.?|nok))?)$/iu;
const DESCRIPTION_LEAD =
  /^(?:serveres?|servert|served|with|kan\s+fås|can\s+be|blandet|mixed|godt\s+krydret|well\s+seasoned|marinert|marinated|grillet|grilled|bakt|baked|braisert|braised|tilberedt|prepared|toppet|topped|inneholder|contains?|inkludert|including|(?:hel|gylden)?fritert|sprøstekt|woket|dampet|mini[- ]mezah|ekstra|extra|pr\.?\s*person|per\s+person)\b/iu;
const PRICE_METADATA_LEAD = /^(?:pr\.?\s*person|per\s+person)\b/iu;
const SPLIT_PARENTHETICAL_CONTINUATION = /^(?:med|with)\b.*\)$/iu;
const SOURCE_EXCERPT_SEPARATOR = /\s+—\s+/u;
const SECTION_LABEL =
  /^(?:meny|menu|à\s+la\s+carte|a\s+la\s+carte|forretter?|starters?|appetizers?|småretter|hovedretter?|mains?|main\s+courses?|dessert(?:er|s)?|tilbehør|sides?|pizza(?:er|s)?|pizzeria|kylling\s+og\s+lam|mezah[- ]retter)$/iu;
const SEMANTIC_SECTION_LABEL =
  /^(?:salater?\s*(?:&|og)\s*suppe(?:r)?|kylling|kjøttretter?|fiskeretter?|salater?|supper?)$/iu;
const ALLERGEN_PREFIX = /^(?:allergener?|allergens?)\s*:\s*/iu;
const ALLERGEN_SEPARATOR = /\s*(?:,|\/|\+|;|\bog\b|\band\b)\s*/iu;
const SHORT_ALLERGEN_CODE_LIST =
  /^(?:[A-Z0-9]{1,3})(?:\s*[,/+;]\s*[A-Z0-9]{1,3})*$/u;
const SHORT_ALLERGEN_CODE_SEPARATOR = /[,/+;]/u;
const PARENTHETICAL_QUALIFIER = /^\(([^()]{1,60})\)$/u;

const ALLERGEN_TERMS = new Set([
  "gluten",
  "hvete",
  "hvetegluten",
  "rug",
  "bygg",
  "havre",
  "skalldyr",
  "egg",
  "fisk",
  "peanøtt",
  "peanøtter",
  "soya",
  "soyabønner",
  "melk",
  "laktose",
  "nøtt",
  "nøtter",
  "mandel",
  "mandler",
  "hasselnøtt",
  "hasselnøtter",
  "valnøtt",
  "valnøtter",
  "cashew",
  "pekannøtt",
  "pekannøtter",
  "pistasj",
  "pistasjnøtt",
  "pistasjnøtter",
  "macadamia",
  "selleri",
  "sennep",
  "sesam",
  "sesamfrø",
  "sulfitt",
  "sulfitter",
  "svoveldioksid",
  "lupin",
  "bløtdyr",
  "wheat",
  "wheatgluten",
  "rye",
  "barley",
  "oats",
  "crustaceans",
  "fish",
  "peanut",
  "peanuts",
  "soy",
  "soya",
  "milk",
  "lactose",
  "nuts",
  "almond",
  "hazelnut",
  "walnut",
  "pecan",
  "pistachio",
  "celery",
  "mustard",
  "sesame",
  "sulphite",
  "sulphites",
  "sulfite",
  "sulfites",
  "lupin",
  "molluscs",
]);

interface DescriptionTitleRecovery {
  readonly title: string;
  readonly observedNameIsTitleContinuation: boolean;
}

interface SourceExcerptTitleRecovery {
  readonly title: string;
  readonly sectionHint: string | null;
}

function normalizeVisibleLine(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}

function normalizeAllergenToken(value: string): string {
  return normalizeVisibleLine(value)
    .toLocaleLowerCase("nb-NO")
    .replace(/^[*•·\-–—]+|[*•·.,:;\-–—]+$/gu, "")
    .trim();
}

function allergenParts(value: string): readonly string[] {
  return normalizeVisibleLine(value)
    .replace(ALLERGEN_PREFIX, "")
    .split(ALLERGEN_SEPARATOR)
    .map(normalizeAllergenToken)
    .filter(Boolean);
}

function looksLikeAllergenMetadata(value: string): boolean {
  const line = normalizeVisibleLine(value);
  if (!line) return false;
  if (
    SHORT_ALLERGEN_CODE_LIST.test(line) &&
    SHORT_ALLERGEN_CODE_SEPARATOR.test(line)
  )
    return true;
  const hasPrefix = ALLERGEN_PREFIX.test(line);
  const parts = allergenParts(line);
  if (parts.length === 0 || (!hasPrefix && parts.length < 2)) return false;
  return parts.every((part) => ALLERGEN_TERMS.has(part));
}

function looksLikeAllergenQualifier(value: string): boolean {
  const qualifier = normalizeVisibleLine(value);
  if (!qualifier) return false;
  if (SHORT_ALLERGEN_CODE_LIST.test(qualifier)) return true;
  const parts = allergenParts(qualifier);
  return parts.length > 0 && parts.every((part) => ALLERGEN_TERMS.has(part));
}

export function looksLikeHtmlDescription(value: string): boolean {
  const line = normalizeVisibleLine(value);
  if (!line) return false;
  const words = line.split(/\s+/).filter(Boolean);
  const commaCount = line.match(/,/gu)?.length ?? 0;
  const longQuestion = /\?$/u.test(line) && words.length >= 5;
  return (
    looksLikeAllergenMetadata(line) ||
    DESCRIPTION_LEAD.test(line) ||
    SPLIT_PARENTHETICAL_CONTINUATION.test(line) ||
    (commaCount >= 3 && words.length >= 5) ||
    words.length >= 9 ||
    /[.!]$/u.test(line) ||
    (/:$/u.test(line) && words.length >= 4) ||
    longQuestion
  );
}

function isSectionLabel(value: string): boolean {
  const line = normalizeVisibleLine(value);
  return SECTION_LABEL.test(line) || SEMANTIC_SECTION_LABEL.test(line);
}

function looksLikeRecoveredTitle(value: string): boolean {
  const line = normalizeVisibleLine(value);
  if (!line || line.length > 160 || !/\p{L}/u.test(line)) return false;
  if (
    PRICE_LINE.test(line) ||
    isSectionLabel(line) ||
    looksLikeHtmlDescription(line) ||
    ALLERGEN_PREFIX.test(line) ||
    looksLikeAllergenMetadata(line)
  ) {
    return false;
  }
  if (/^(?:©|™|https?:\/\/|www\.)/iu.test(line)) return false;
  const words = line.split(/\s+/).filter(Boolean);
  return words.length <= 10;
}

function parenthesisBalance(value: string): number {
  let balance = 0;
  for (const character of value) {
    if (character === "(") balance += 1;
    if (character === ")") balance -= 1;
  }
  return balance;
}

function recoverSplitParentheticalTitle(
  candidate: string,
  continuation: string,
): string | null {
  const head = normalizeVisibleLine(candidate);
  const tail = normalizeVisibleLine(continuation);
  if (
    parenthesisBalance(head) !== 1 ||
    parenthesisBalance(tail) !== -1 ||
    !SPLIT_PARENTHETICAL_CONTINUATION.test(tail)
  ) {
    return null;
  }

  const combined = normalizeVisibleLine(`${head} ${tail}`);
  return parenthesisBalance(combined) === 0 && looksLikeRecoveredTitle(combined)
    ? combined
    : null;
}

function recoverForwardTitleFromSourceExcerpt(
  item: MenuObservedItem,
): SourceExcerptTitleRecovery | null {
  const current = normalizeVisibleLine(item.name);
  const sourceExcerpt = item.sourceExcerpt?.trim() ?? "";
  const currentIsSection = isSectionLabel(current);
  const currentIsNonTitle =
    currentIsSection ||
    looksLikeHtmlDescription(current) ||
    ALLERGEN_PREFIX.test(current);
  if (!sourceExcerpt || !currentIsNonTitle) return null;

  const segments = sourceExcerpt
    .split(SOURCE_EXCERPT_SEPARATOR)
    .map(normalizeVisibleLine)
    .filter(Boolean);
  const foldedCurrent = current.toLocaleLowerCase("nb-NO");
  const fallbackCandidates = new Set<string>();
  const structuredCandidates = new Set<string>();

  for (let index = 0; index < segments.length; index += 1) {
    const segment = segments[index] ?? "";
    if (segment.toLocaleLowerCase("nb-NO") !== foldedCurrent) continue;

    for (let offset = 1; index + offset < segments.length; offset += 1) {
      const candidate = segments[index + offset] ?? "";
      if (!candidate) continue;
      if (PRICE_LINE.test(candidate)) break;
      if (!looksLikeRecoveredTitle(candidate)) continue;

      fallbackCandidates.add(candidate);
      const following = segments[index + offset + 1] ?? "";
      if (
        following &&
        !PRICE_LINE.test(following) &&
        looksLikeHtmlDescription(following)
      ) {
        structuredCandidates.add(candidate);
      }
    }
  }

  const title =
    structuredCandidates.size === 1
      ? ([...structuredCandidates][0] ?? null)
      : structuredCandidates.size > 1
        ? null
        : fallbackCandidates.size === 1
          ? ([...fallbackCandidates][0] ?? null)
          : null;
  if (!title) return null;

  return {
    title,
    sectionHint: currentIsSection ? current : null,
  };
}

function recoverForwardSplitParentheticalTitleFromSourceExcerpt(
  item: MenuObservedItem,
): string | null {
  const current = normalizeVisibleLine(item.name);
  const sourceExcerpt = item.sourceExcerpt?.trim() ?? "";
  if (
    !sourceExcerpt ||
    parenthesisBalance(current) !== 1 ||
    !looksLikeRecoveredTitle(current)
  ) {
    return null;
  }

  const segments = sourceExcerpt
    .split(SOURCE_EXCERPT_SEPARATOR)
    .map(normalizeVisibleLine)
    .filter(Boolean);
  const foldedCurrent = current.toLocaleLowerCase("nb-NO");
  const candidates = new Set<string>();

  for (let index = 0; index < segments.length; index += 1) {
    const segment = segments[index] ?? "";
    const foldedSegment = segment.toLocaleLowerCase("nb-NO");

    if (
      foldedSegment.startsWith(`${foldedCurrent} `) &&
      parenthesisBalance(segment) === 0 &&
      looksLikeRecoveredTitle(segment)
    ) {
      candidates.add(segment);
      continue;
    }

    if (foldedSegment !== foldedCurrent) continue;
    for (let offset = 1; offset <= 2; offset += 1) {
      const next = segments[index + offset] ?? "";
      if (!next) continue;
      if (PRICE_LINE.test(next)) break;
      const recovered = recoverSplitParentheticalTitle(segment, next);
      if (recovered) {
        candidates.add(recovered);
        break;
      }
    }
  }

  return candidates.size === 1 ? ([...candidates][0] ?? null) : null;
}

function recoverForwardSplitParentheticalTitle(
  lines: readonly string[],
  observedName: string,
): string | null {
  const current = normalizeVisibleLine(observedName);
  if (parenthesisBalance(current) !== 1 || !looksLikeRecoveredTitle(current))
    return null;

  const foldedCurrent = current.toLocaleLowerCase("nb-NO");
  const candidates = new Set<string>();

  for (let index = 0; index < lines.length; index += 1) {
    const line = normalizeVisibleLine(lines[index] ?? "");
    if (!line) continue;
    const foldedLine = line.toLocaleLowerCase("nb-NO");

    if (
      foldedLine.startsWith(`${foldedCurrent} `) &&
      parenthesisBalance(line) === 0 &&
      looksLikeRecoveredTitle(line)
    ) {
      candidates.add(line);
      continue;
    }

    if (foldedLine !== foldedCurrent) continue;
    for (let offset = 1; offset <= 2; offset += 1) {
      const next = normalizeVisibleLine(lines[index + offset] ?? "");
      if (!next) continue;
      if (PRICE_LINE.test(next)) break;
      const recovered = recoverSplitParentheticalTitle(line, next);
      if (recovered) {
        candidates.add(recovered);
        break;
      }
    }
  }

  return candidates.size === 1 ? ([...candidates][0] ?? null) : null;
}

function recoverTitle(
  lines: readonly string[],
  position: number,
  observedName: string,
): DescriptionTitleRecovery | null {
  const continuation = normalizeVisibleLine(observedName);
  for (
    let index = position - 1;
    index >= Math.max(0, position - 8);
    index -= 1
  ) {
    const candidate = normalizeVisibleLine(lines[index] ?? "");
    if (!candidate) continue;
    if (PRICE_LINE.test(candidate)) break;

    const splitTitle = recoverSplitParentheticalTitle(candidate, continuation);
    if (splitTitle) {
      return { title: splitTitle, observedNameIsTitleContinuation: true };
    }
    if (looksLikeRecoveredTitle(candidate)) {
      return { title: candidate, observedNameIsTitleContinuation: false };
    }
  }
  return null;
}

function recoverParentheticalQualifiedTitle(
  lines: readonly string[],
  item: MenuObservedItem,
): string | null {
  const sourceExcerptTitle =
    recoverForwardSplitParentheticalTitleFromSourceExcerpt(item);
  if (sourceExcerptTitle) return sourceExcerptTitle;

  const current = normalizeVisibleLine(item.name);
  const forwardSplitTitle = recoverForwardSplitParentheticalTitle(
    lines,
    current,
  );
  if (forwardSplitTitle) return forwardSplitTitle;

  const position = item.position;
  if (!Number.isInteger(position) || position < 0 || lines.length === 0)
    return null;

  const foldedCurrent = current.toLocaleLowerCase("nb-NO");
  const scanStart = Math.max(0, position - 1);
  const scanEnd = Math.min(lines.length - 1, position + 2);

  for (let index = scanStart; index <= scanEnd; index += 1) {
    const candidate = normalizeVisibleLine(lines[index] ?? "");
    const foldedCandidate = candidate.toLocaleLowerCase("nb-NO");
    if (!candidate || PRICE_LINE.test(candidate)) continue;

    if (
      foldedCandidate.startsWith(`${foldedCurrent} (`) &&
      candidate.endsWith(")")
    ) {
      const suffix = candidate.slice(current.length).trim();
      const match = suffix.match(PARENTHETICAL_QUALIFIER);
      if (match?.[1] && !looksLikeAllergenQualifier(match[1])) return candidate;
    }

    if (foldedCandidate !== foldedCurrent || index >= lines.length - 1)
      continue;
    const next = normalizeVisibleLine(lines[index + 1] ?? "");
    const splitTitle = recoverSplitParentheticalTitle(candidate, next);
    if (splitTitle) return splitTitle;

    const nextMatch = next.match(PARENTHETICAL_QUALIFIER);
    if (nextMatch?.[1] && !looksLikeAllergenQualifier(nextMatch[1])) {
      return `${candidate} ${next}`;
    }
  }

  return null;
}

function recoveredDescription(
  item: MenuObservedItem,
  includeObservedName: boolean,
): string | null {
  const parts = [
    includeObservedName && !PRICE_METADATA_LEAD.test(item.name)
      ? item.name
      : null,
    item.description,
  ]
    .map((value) => value?.trim() ?? "")
    .filter(Boolean);
  return parts.length > 0 ? [...new Set(parts)].join(" ") : null;
}

function recoveredSectionLabelDescription(
  item: MenuObservedItem,
  title: string,
): string | null {
  const description = normalizeVisibleLine(item.description ?? "");
  if (!description) return null;
  const normalizedTitle = normalizeVisibleLine(title);
  const foldedDescription = description.toLocaleLowerCase("nb-NO");
  const foldedTitle = normalizedTitle.toLocaleLowerCase("nb-NO");
  if (foldedDescription === foldedTitle) return null;
  if (foldedDescription.startsWith(`${foldedTitle} `)) {
    return description.slice(normalizedTitle.length).trim() || null;
  }
  return description;
}

export function recoverDescriptionNamedHtmlItems(
  items: readonly MenuObservedItem[],
  visibleText: string,
): readonly MenuObservedItem[] {
  const lines = visibleText.split("\n").map(normalizeVisibleLine);
  const recovered = items.map((item) => {
    const position = item.position;
    const forwardRecovery = recoverForwardTitleFromSourceExcerpt(item);
    const descriptionRecovery =
      !forwardRecovery &&
      looksLikeHtmlDescription(item.name) &&
      Number.isInteger(position) &&
      position >= 1
        ? recoverTitle(lines, position, item.name)
        : null;
    const descriptionTitle = descriptionRecovery?.title ?? null;
    const qualifiedTitle =
      forwardRecovery || descriptionTitle
        ? null
        : recoverParentheticalQualifiedTitle(lines, item);
    const title = forwardRecovery?.title ?? descriptionTitle ?? qualifiedTitle;

    const next = title
      ? (() => {
          const sourceKey = createMenuItemSourceKey(title, item.sectionName);
          return {
            ...item,
            sourceKey,
            name: title,
            normalizedName: normalizeDishName(title),
            description: forwardRecovery
              ? recoveredSectionLabelDescription(item, forwardRecovery.title)
              : descriptionRecovery
                ? recoveredDescription(
                    item,
                    !descriptionRecovery.observedNameIsTitleContinuation,
                  )
                : item.description,
            confidence: forwardRecovery
              ? Math.min(item.confidence, 0.82)
              : descriptionRecovery
                ? Math.min(item.confidence, 0.84)
                : item.confidence,
            sourceExcerpt:
              forwardRecovery || descriptionRecovery
                ? `${title} — ${item.sourceExcerpt ?? item.name}`.slice(0, 1000)
                : item.sourceExcerpt,
          };
        })()
      : item;

    return {
      item: next,
      sectionHint: forwardRecovery?.sectionHint ?? null,
    };
  });

  const titleCounts = new Map<string, number>();
  for (const entry of recovered) {
    titleCounts.set(
      entry.item.normalizedName,
      (titleCounts.get(entry.item.normalizedName) ?? 0) + 1,
    );
  }

  const unique = new Map<string, MenuObservedItem>();
  for (const entry of recovered) {
    const count = titleCounts.get(entry.item.normalizedName) ?? 0;
    const sectionName =
      count > 1 && entry.sectionHint
        ? entry.sectionHint
        : entry.item.sectionName;
    const next =
      sectionName !== entry.item.sectionName
        ? {
            ...entry.item,
            sectionName,
            sourceKey: createMenuItemSourceKey(entry.item.name, sectionName),
          }
        : entry.item;
    unique.set(next.sourceKey, next);
  }

  return [...unique.values()].sort((a, b) => a.position - b.position);
}
