import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";

export const HTML_DESCRIPTION_TITLE_RECOVERY_VERSION = "titles-v3";

const PRICE_LINE = /^(?:(?:kr\.?\s*)?[1-9]\d{1,3}(?:[.,]\d{1,2})?(?:\s*(?:,-|kr\.?|nok))?)$/iu;
const DESCRIPTION_LEAD = /^(?:serveres?|servert|served|with|kan\s+fås|can\s+be|blandet|mixed|godt\s+krydret|well\s+seasoned|marinert|marinated|grillet|grilled|bakt|baked|braisert|braised|tilberedt|prepared|toppet|topped|inneholder|contains?|inkludert|including|ekstra|extra|pr\.?\s*person|per\s+person)\b/iu;
const PRICE_METADATA_LEAD = /^(?:pr\.?\s*person|per\s+person)\b/iu;
const SPLIT_PARENTHETICAL_CONTINUATION = /^(?:med|with)\b.*\)$/iu;
const SECTION_LABEL = /^(?:meny|menu|à\s+la\s+carte|a\s+la\s+carte|forretter?|starters?|appetizers?|småretter|hovedretter?|mains?|main\s+courses?|dessert(?:er|s)?|tilbehør|sides?|kylling\s+og\s+lam|mezah[- ]retter)$/iu;
const ALLERGEN_PREFIX = /^(?:allergener?|allergens?)\s*:\s*/iu;
const ALLERGEN_SEPARATOR = /\s*(?:,|\/|\+|;|\bog\b|\band\b)\s*/iu;
const SHORT_ALLERGEN_CODE_LIST = /^(?:[A-Z0-9]{1,3})(?:\s*[,/+;]\s*[A-Z0-9]{1,3})*$/u;
const PARENTHETICAL_QUALIFIER = /^\(([^()]{1,60})\)$/u;

const ALLERGEN_TERMS = new Set([
  "gluten",
  "hvete",
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

function looksLikeDescription(value: string): boolean {
  const line = normalizeVisibleLine(value);
  if (!line) return false;
  const words = line.split(/\s+/).filter(Boolean);
  return (
    looksLikeAllergenMetadata(line) ||
    DESCRIPTION_LEAD.test(line) ||
    SPLIT_PARENTHETICAL_CONTINUATION.test(line) ||
    words.length >= 9 ||
    /[.!?]$/u.test(line)
  );
}

function looksLikeRecoveredTitle(value: string): boolean {
  const line = normalizeVisibleLine(value);
  if (!line || line.length > 160 || !/\p{L}/u.test(line)) return false;
  if (
    PRICE_LINE.test(line) ||
    SECTION_LABEL.test(line) ||
    looksLikeDescription(line) ||
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

function recoverSplitParentheticalTitle(candidate: string, continuation: string): string | null {
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
  return parenthesisBalance(combined) === 0 && looksLikeRecoveredTitle(combined) ? combined : null;
}

function recoverTitle(
  lines: readonly string[],
  position: number,
  observedName: string,
): DescriptionTitleRecovery | null {
  const continuation = normalizeVisibleLine(observedName);
  for (let index = position - 1; index >= Math.max(0, position - 8); index -= 1) {
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
  const position = item.position;
  if (!Number.isInteger(position) || position < 0 || lines.length === 0) return null;

  const current = normalizeVisibleLine(item.name);
  const foldedCurrent = current.toLocaleLowerCase("nb-NO");
  const scanStart = Math.max(0, position - 1);
  const scanEnd = Math.min(lines.length - 1, position + 1);

  for (let index = scanStart; index <= scanEnd; index += 1) {
    const candidate = normalizeVisibleLine(lines[index] ?? "");
    const foldedCandidate = candidate.toLocaleLowerCase("nb-NO");
    if (!candidate || PRICE_LINE.test(candidate)) continue;

    if (foldedCandidate.startsWith(`${foldedCurrent} (`) && candidate.endsWith(")")) {
      const suffix = candidate.slice(current.length).trim();
      const match = suffix.match(PARENTHETICAL_QUALIFIER);
      if (match?.[1] && !looksLikeAllergenQualifier(match[1])) return candidate;
    }

    if (foldedCandidate !== foldedCurrent || index >= lines.length - 1) continue;
    const next = normalizeVisibleLine(lines[index + 1] ?? "");
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
  const parts = [includeObservedName && !PRICE_METADATA_LEAD.test(item.name) ? item.name : null, item.description]
    .map((value) => value?.trim() ?? "")
    .filter(Boolean);
  return parts.length > 0 ? [...new Set(parts)].join(" ") : null;
}

export function recoverDescriptionNamedHtmlItems(
  items: readonly MenuObservedItem[],
  visibleText: string,
): readonly MenuObservedItem[] {
  const lines = visibleText.split("\n").map(normalizeVisibleLine);
  const unique = new Map<string, MenuObservedItem>();

  for (const item of items) {
    const position = item.position;
    const descriptionRecovery =
      looksLikeDescription(item.name) && Number.isInteger(position) && position >= 1
        ? recoverTitle(lines, position, item.name)
        : null;
    const descriptionTitle = descriptionRecovery?.title ?? null;
    const qualifiedTitle = descriptionTitle ? null : recoverParentheticalQualifiedTitle(lines, item);
    const title = descriptionTitle ?? qualifiedTitle;

    const next = title
      ? (() => {
          const sourceKey = createMenuItemSourceKey(title, item.sectionName);
          return {
            ...item,
            sourceKey,
            name: title,
            normalizedName: normalizeDishName(title),
            description: descriptionRecovery
              ? recoveredDescription(item, !descriptionRecovery.observedNameIsTitleContinuation)
              : item.description,
            confidence: descriptionRecovery ? Math.min(item.confidence, 0.84) : item.confidence,
            sourceExcerpt: descriptionRecovery
              ? `${title} — ${item.sourceExcerpt ?? item.name}`.slice(0, 1000)
              : item.sourceExcerpt,
          };
        })()
      : item;

    unique.set(next.sourceKey, next);
  }

  return [...unique.values()].sort((a, b) => a.position - b.position);
}
