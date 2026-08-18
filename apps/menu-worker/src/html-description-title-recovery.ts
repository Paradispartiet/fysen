import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";

export const HTML_DESCRIPTION_TITLE_RECOVERY_VERSION = "titles-v1";

const PRICE_LINE = /^(?:(?:kr\.?\s*)?[1-9]\d{1,3}(?:[.,]\d{1,2})?(?:\s*(?:,-|kr\.?|nok))?)$/iu;
const DESCRIPTION_LEAD = /^(?:serveres?|servert|served|with|kan\s+fås|can\s+be|blandet|mixed|godt\s+krydret|well\s+seasoned|marinert|marinated|grillet|grilled|bakt|baked|braisert|braised|tilberedt|prepared|toppet|topped|inneholder|contains?|inkludert|including|ekstra|extra|pr\.?\s*person|per\s+person)\b/iu;
const SECTION_LABEL = /^(?:meny|menu|à\s+la\s+carte|a\s+la\s+carte|forretter?|starters?|appetizers?|småretter|hovedretter?|mains?|main\s+courses?|dessert(?:er|s)?|tilbehør|sides?|kylling\s+og\s+lam|mezah[- ]retter)$/iu;

function normalizeVisibleLine(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}

function looksLikeDescription(value: string): boolean {
  const line = normalizeVisibleLine(value);
  if (!line) return false;
  const words = line.split(/\s+/).filter(Boolean);
  return DESCRIPTION_LEAD.test(line) || words.length >= 9 || /[.!?]$/u.test(line);
}

function looksLikeRecoveredTitle(value: string): boolean {
  const line = normalizeVisibleLine(value);
  if (!line || line.length > 160 || !/\p{L}/u.test(line)) return false;
  if (PRICE_LINE.test(line) || SECTION_LABEL.test(line) || looksLikeDescription(line)) return false;
  if (/^(?:©|™|https?:\/\/|www\.)/iu.test(line)) return false;
  const words = line.split(/\s+/).filter(Boolean);
  return words.length <= 10;
}

function recoverTitle(lines: readonly string[], position: number): string | null {
  for (let index = position - 1; index >= Math.max(0, position - 3); index -= 1) {
    const candidate = normalizeVisibleLine(lines[index] ?? "");
    if (!candidate) continue;
    if (PRICE_LINE.test(candidate)) break;
    if (looksLikeRecoveredTitle(candidate)) return candidate;
  }
  return null;
}

function recoveredDescription(item: MenuObservedItem): string | null {
  const parts = [item.name, item.description]
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
    const title =
      looksLikeDescription(item.name) && Number.isInteger(position) && position >= 1
        ? recoverTitle(lines, position)
        : null;

    const next = title
      ? (() => {
          const sourceKey = createMenuItemSourceKey(title, item.sectionName);
          return {
            ...item,
            sourceKey,
            name: title,
            normalizedName: normalizeDishName(title),
            description: recoveredDescription(item),
            confidence: Math.min(item.confidence, 0.84),
            sourceExcerpt: `${title} — ${item.sourceExcerpt ?? item.name}`.slice(0, 1000),
          };
        })()
      : item;

    unique.set(next.sourceKey, next);
  }

  return [...unique.values()].sort((a, b) => a.position - b.position);
}
