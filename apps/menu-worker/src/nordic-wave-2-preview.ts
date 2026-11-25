import { extractHtmlVisibleText } from "./html-extractor.js";
import { parseNordicMenuPrice, type NordicCurrency, type NordicPrice } from "./nordic-menu-price.js";

export interface ReviewedRow { readonly name: string; readonly priceField: string; readonly section: string; readonly note?: string; readonly publishEligible: boolean }
export interface CheckedRow extends NordicPrice { readonly name: string; readonly section: string; readonly note?: string; readonly service: string }
const norm = (s: string) => s.normalize("NFKC").replace(/[\u2018\u2019]/gu, "'").replace(/\s+/gu, " ").trim().toLowerCase();
const linesFor = (html: string) => extractHtmlVisibleText(html).split(/\r?\n/u).map(norm).filter(Boolean);
function priceAt(line: string, currency: NordicCurrency): NordicPrice | null {
  return parseNordicMenuPrice(line, currency);
}
function equalPrice(a: NordicPrice, b: NordicPrice): boolean {
  return a.currency === b.currency && a.priceMinor === b.priceMinor && a.priceMaxMinor === b.priceMaxMinor;
}
function titlePrefix(line: string, name: string): boolean {
  const title = norm(name);
  return line === title || line.startsWith(title + " ") || line.startsWith(title + " -");
}
function sections(lines: string[], allowed: readonly string[], boundaries: readonly string[]) {
  const result = new Map<string, string[]>();
  let active: string | undefined;
  for (const line of lines) {
    if (boundaries.some(s => line === norm(s) || line.startsWith(norm(s) + " ("))) {
      active = allowed.find(s => line === norm(s) || line.startsWith(norm(s) + " ("));
      if (active && !result.has(active)) result.set(active, []);
      else if (active) active = undefined; // repeated navigation/summary is not menu evidence
      continue;
    }
    if (active) result.get(active)!.push(line);
  }
  return result;
}
export function verifyWave2Text(html: string, service: string, currency: NordicCurrency, rows: readonly ReviewedRow[], restaurant: "puk" | "kvarnen" | "taulu"): CheckedRow[] {
  const lines = linesFor(html);
  const allowed = [...new Set(rows.map(r => r.section))];
  const boundaries = [...allowed, "Traditional Danish Favourites Menu", "PUK’s Selection of Traditional Christmas Favorites", "Höstmeny 3-rätters", "Kvarnens sittande julbord", "Dryck", "Kontakt"];
  let scopes = sections(lines, allowed, boundaries);
  if (restaurant === "taulu") {
    const start = lines.findIndex(l => l === "starters");
    const end = lines.findIndex((l,i) => i > start && /prices (?:last )?checked|price check|prices updated/u.test(l));
    if (start < 0 || end < 0) throw new Error("Taulu primary menu or price check marker missing");
    const body = lines.slice(start, end);
    scopes = new Map(allowed.map(s => [s, body]));
    if (!lines.some(l => /19[./]10[./]2026/u.test(l))) throw new Error("Taulu source-declared price-check date changed");
  }
  const used = new Set<string>();
  return rows.map(row => {
    if (row.publishEligible !== false) throw new Error("Unexpected review status");
    const expected = parseNordicMenuPrice(row.priceField, currency);
    const scope = scopes.get(row.section);
    if (!scope || !expected) throw new Error("Missing reviewed section or price: " + row.name);
    const candidates: { price: NordicPrice; index: number }[] = [];
    for (let i=0; i<scope.length; i++) {
      const line = scope[i]!;
      if (!titlePrefix(line,row.name)) continue;
      const tail = line.slice(norm(row.name).length).trim();
      const inline = priceAt(tail,currency);
      if (inline) candidates.push({price:inline,index:i});
      // Only the title and its following description/price block; never cross
      // another reviewed title or accept an unlabelled arbitrary number.
      const next: NordicPrice[] = [];
      for (let j=i+1;j<Math.min(scope.length,i+5);j++) {
        const candidate = scope[j]!;
        if (rows.some(r => titlePrefix(candidate,r.name))) break;
        const direct = priceAt(candidate,currency);
        if (direct) { next.push(direct); break; }
        if (restaurant === "taulu") {
          const p = candidate.match(/^(?:as a starter|as a main course|one scoop|two scoops|1 scoop|2 scoops)\s+(\d+,\d{2})(?:\s*\/\s*\d+g)?$/u);
          const parsed = p && priceAt(p[1]!,currency);
          if (parsed) next.push(parsed);
        }
      }
      if (next.length === 1) candidates.push({price:next[0]!,index:i});
      if (next.length === 2 && next[0]!.priceMinor < next[1]!.priceMinor) {
        candidates.push({price:{currency,priceKind:"multiple",priceMinor:next[0]!.priceMinor,priceMaxMinor:next[1]!.priceMinor},index:i});
      }
    }
    // Taulu's soup is listed under two separate service headings.
    if (restaurant === "taulu" && expected.priceKind === "multiple" && row.name === "Salmon soup") {
      const a = candidates.find(c=>c.price.priceMinor===expected.priceMinor);
      const b = candidates.find(c=>c.price.priceMinor===expected.priceMaxMinor);
      if (a && b && a.index!==b.index) return {...expected,name:row.name,section:row.section,service,...(row.note?{note:row.note}:{})};
    }
    const matches = candidates.filter(c=>equalPrice(c.price,expected) && !used.has(row.section+":"+c.index));
    if (matches.length!==1) throw new Error("Missing, changed or ambiguous reviewed price: "+service+" / "+row.name+" / "+row.priceField);
    const matched=matches[0]!;
    used.add(row.section+":"+matched.index);
    return {...matched.price,name:row.name,section:row.section,service,...(row.note?{note:row.note}:{})};
  });
}
