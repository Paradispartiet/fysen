/** Recover designed menu cards before plain-text reconstruction discards the
 * title/body distinction. The ordinary parser remains the fallback for every
 * span which cannot be proved to be one contiguous, single-column priced card. */
interface Span {
  readonly str: string;
  readonly fontName?: string;
  readonly transform?: readonly number[];
  readonly width?: number;
}
export interface TypographicPdfRow {
  readonly start: number;
  readonly end: number;
  readonly name: string;
  readonly price: string;
  readonly section: string | null;
  readonly description: string | null;
}
const foodHeading = /^(?:desserts?|forretter?|starters?|salat|salad|fisk|fish|sideretter|sides|barnemeny|children[’']s menu|only for lunch|lunch|lunsj|retter av svin|main pork dishes|hovedretter?|main courses?|ap[p]?etizers?|snacks)$/iu;
const price = /^(?:kr\.?|nok)\s*[1-9]\d{1,3}(?:\s*,-)?$/iu;
const clean = (text: string) => text.normalize("NFKC").replace(/\s+/gu, " ").trim();
const x = (span: Span) => Number(span.transform?.[4]);
const y = (span: Span) => Number(span.transform?.[5]);
const size = (span: Span) => Math.hypot(Number(span.transform?.[0]), Number(span.transform?.[1]));
function isSpan(value: unknown): value is Span {
  return typeof value === "object" && value !== null && "str" in value && typeof value.str === "string";
}

export function recoverTypographicPdfRows(rawItems: readonly unknown[]): readonly TypographicPdfRow[] {
  const spans = rawItems.flatMap((raw, index) => isSpan(raw) && clean(raw.str)
    ? [{ ...raw, str: clean(raw.str), index }] : []);
  if (!spans.some(span => foodHeading.test(span.str))) return [];
  if (spans.some(span => !Number.isFinite(x(span)) || !Number.isFinite(y(span)))) return [];
  const bodySizes = spans.filter(span => span.str.length >= 18 && /[a-zæøå]/u.test(span.str))
    .map(size).filter(Number.isFinite).sort((a,b) => a-b);
  const bodySize = bodySizes[Math.floor(bodySizes.length / 2)];
  if (!bodySize) return [];
  const titleFonts = new Map<string, number>();
  for (const span of spans) {
    if (span.fontName && size(span) >= bodySize * 1.18 && size(span) <= bodySize * 1.7
      && /^[A-ZÆØÅ]/u.test(span.str) && !price.test(span.str) && !foodHeading.test(span.str)) {
      titleFonts.set(span.fontName, (titleFonts.get(span.fontName) ?? 0) + 1);
    }
  }
  const font = [...titleFonts].sort((a,b) => b[1]-a[1])[0];
  if (!font || font[1] < 4) return [];
  if (spans.filter(span => span.fontName === font[0] && size(span) < bodySize * 1.1).length > font[1]) return [];
  const rows: TypographicPdfRow[] = [];
  const headings = spans.filter(span => foodHeading.test(span.str));
  for (let index = 0; index < spans.length; index++) {
    const first = spans[index]!;
    const poster = foodHeading.test(first.str) && /ap[p]?etizer/iu.test(first.str);
    if (!poster && (first.fontName !== font[0] || size(first) < bodySize * 1.18
      || price.test(first.str) || !/^[A-ZÆØÅ]/u.test(first.str) || /^\d/u.test(first.str))) continue;
    let title = poster ? "" : first.str;
    let lastTitle = first;
    let endIndex = -1;
    const descriptions: string[] = [];
    for (let next = index + 1; next < Math.min(spans.length, index + 28); next++) {
      const span = spans[next]!;
      if (price.test(span.str)) { endIndex = next; break; }
      if (foodHeading.test(span.str)) break;
      const continuation = poster
        ? /^[A-ZÆØÅ -]+$/u.test(span.str) && size(span) > bodySize * 2
        : span.fontName === font[0] && size(span) >= bodySize * 1.18;
      if (continuation) {
        if (descriptions.length || Math.abs(x(span) - x(lastTitle)) > (poster ? 25 : 4)
          || y(lastTitle) - y(span) < -2 || y(lastTitle) - y(span) > size(lastTitle) * 1.8) break;
        title = title.endsWith("-") ? title.slice(0,-1) + span.str : `${title} ${span.str}`.trim();
        lastTitle = span;
      } else {
        if (/^(?:øl\s*\/|vin\s*\/|alkoholfri:)/iu.test(span.str)) break;
        descriptions.push(span.str);
      }
    }
    if (endIndex < 0 || !title || /(?:\d\s*[- ]?(?:retter|courses?)|recommendation)/iu.test(title)) continue;
    const last = spans[endIndex]!;
    // A card's body/price must lie below its title and within the same column.
    // A new title from another column or several competing prices is ambiguous.
    const block = spans.slice(index + 1, endIndex + 1);
    const nextColumn = spans.filter(span => span.fontName === font[0]
      && size(span) >= bodySize * 1.18 && !price.test(span.str)
      && x(span) > x(first) + 70).map(x).sort((a,b) => a-b)[0] ?? Infinity;
    let competingPrice = false;
    for (let next = endIndex + 1; next < spans.length; next++) {
      const span = spans[next]!;
      if (foodHeading.test(span.str)
        || (span.fontName === font[0] && size(span) >= bodySize * 1.18 && !price.test(span.str))
        || /^(?:øl\s*\/|vin\s*\/|alkoholfri:)/iu.test(span.str)) break;
      if (price.test(span.str) && x(span) >= x(first) - (poster ? 30 : 4)
        && x(span) < nextColumn - 4 && y(span) <= y(first) + 2
        && y(first) - y(span) <= (poster ? size(first) * 5 : bodySize * 15)) {
        competingPrice = true;
        break;
      }
    }
    if (competingPrice) continue;
    if (block.some(span => x(span) < x(first) - (poster ? 30 : 4)
      || x(span) >= nextColumn - 4 || y(span) > y(first) + 2
      || y(first) - y(span) > (poster ? size(first) * 5 : bodySize * 15))) continue;
    const unit = descriptions.join(" ").match(/\(\s*\d+(?:[.,]\d+)?\s*(?:g|kg|stk\.?|pcs\.?)\s*\)/iu)?.[0];
    if (unit) title += ` ${unit}`;
    const sourceHeading = headings.filter(h => h.index < first.index).at(-1);
    const visualHeading = headings.filter(h => y(h) >= y(first) - 2
      && Math.abs(x(h)-x(first)) < 35).sort((a,b) => y(a)-y(b))[0];
    let section = poster ? first.str : sourceHeading?.str ?? visualHeading?.str ?? null;
    if (visualHeading && (!sourceHeading || /main|hoved|retter av/iu.test(visualHeading.str))) section = visualHeading.str;
    if (section && /children/iu.test(section)) section = "BARNEMENY";
    rows.push({ start: first.index, end: last.index, name: title, price: last.str, section, description: descriptions.join(" ") || null });
    index = endIndex;
  }
  return rows.length >= 3 ? rows : [];
}
