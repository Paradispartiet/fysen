import { extractHtmlVisibleText } from "./html-extractor.js";
import { parseNordicMenuPrice, type NordicPrice } from "./nordic-menu-price.js";

export interface SchonnemannItem extends NordicPrice {
  readonly name: string;
  readonly sourceUrls: readonly string[];
}

const normalize = (value: string): string => value.normalize("NFKC").replace(/[“”]/gu, '"').replace(/\s+/gu, " ").trim().toLocaleLowerCase("da-DK");

export function extractSchonnemannCategory(text: string, names: readonly string[], sourceUrl: string): SchonnemannItem[] {
  const lines = text.split(/\r?\n/u).map((line) => line.trim()).filter(Boolean);
  const footer = lines.findIndex((line, i) => normalize(line) === "restaurant schønnemann" &&
    normalize(lines[i + 1] ?? "").startsWith("hauser plads 16"));
  if (footer < 0) throw new Error("Schønnemann restaurant identity/footer missing");
  const body = lines.slice(0, footer);
  const expected = new Map(names.map((name) => [normalize(name), name]));
  if (expected.size !== names.length) throw new Error("Duplicate reviewed category titles");
  const found = new Map<string, SchonnemannItem>();
  for (let i = 0; i < body.length; i++) {
    const field = body[i] ?? "";
    const price = parseNordicMenuPrice(field, "DKK");
    if (!price) continue;
    // The original page has the title immediately before the price or
    // separated by a single description. A hero illustration has no price.
    const candidates = [body[i - 1], body[i - 2]].filter((line): line is string => Boolean(line));
    const matched = candidates.map((line) => expected.get(normalize(line))).filter((name): name is string => Boolean(name));
    if (matched.length !== 1) throw new Error("Unmapped or ambiguous priced row: " + field);
    const name = matched[0]!;
    if (found.has(name)) throw new Error("Duplicate priced row: " + name);
    found.set(name, { ...price, name, sourceUrls: [sourceUrl] });
  }
  if (found.size !== names.length) throw new Error("Missing priced category rows: " + names.filter((name) => !found.has(name)).join(", "));
  // The empty category is a seasonal overview, not a dish. Guard against
  // accidentally treating a new separately priced category as the old overview.
  if (!names.length && !body.some((line) => normalize(line) === "julen er traditionernes tid")) {
    throw new Error("Seasonal overview changed");
  }
  return [...found.values()];
}

export function extractSchonnemannHtmlCategory(html: string, names: readonly string[], sourceUrl: string): SchonnemannItem[] {
  return extractSchonnemannCategory(extractHtmlVisibleText(html), names, sourceUrl);
}

export function mergeSchonnemannCategories(categories: readonly (readonly SchonnemannItem[])[]): SchonnemannItem[] {
  const unique = new Map<string, SchonnemannItem>();
  for (const item of categories.flat()) {
    const key = normalize(item.name);
    const prior = unique.get(key);
    if (prior && (prior.priceMinor !== item.priceMinor || prior.priceMaxMinor !== item.priceMaxMinor ||
      prior.currency !== item.currency || prior.priceKind !== item.priceKind)) {
      throw new Error("Conflicting cross-listed price: " + item.name);
    }
    unique.set(key, prior ? { ...prior, sourceUrls: [...new Set([...prior.sourceUrls, ...item.sourceUrls])] } : item);
  }
  return [...unique.values()];
}
