import { extractHtmlVisibleText } from "./html-extractor.js";
import { parseNordicMenuPrice, type NordicPrice } from "./nordic-menu-price.js";

export interface SavottaPreviewItem extends NordicPrice {
  readonly name: string;
  readonly section: string;
  readonly perPerson: boolean;
  readonly requiresAvailabilityConfirmation: boolean;
}
export interface SavottaPreview {
  readonly status: "review-required";
  readonly items: readonly SavottaPreviewItem[];
}

// The known ordinary à la carte scope is deliberately isolated from the
// preamble, set menus, seasonal link and drinks. Do not publish this preview.
export function extractSavottaPreview(text: string, expectedNames: readonly string[]): SavottaPreview {
  const lines = text.normalize("NFKC").split(/\r?\n/u).map((line) => line.replace(/\s+/gu, " ").trim()).filter(Boolean);
  const start = lines.findIndex((line) => /^Savotan Ruokalista$/iu.test(line));
  const end = lines.findIndex((line, i) => i > start && /^(?:A la carte\b|L=laktoositon|Oikeudet muutoksiin)/iu.test(line));
  if (start < 0 || end <= start || !expectedNames.length || new Set(expectedNames).size !== expectedNames.length) {
    throw new Error("Savotta ordinary menu scope or review list missing");
  }
  const sections = new Set(["Eturuuat", "Väliruokia", "Varsinaiset", "Jälkimakiat"]);
  const items = new Map<string, SavottaPreviewItem>();
  let section = "";
  let pendingName: string | null = null;
  const names = [...expectedNames].sort((a, b) => b.length - a.length);
  const tailPattern = /^(?:(?:\(?L\)?|\(?G\)?|\(?VE\)?)[,\s]*)*(\d{1,4},\d{2}(?:\/\d{1,4},\d{2})?)(\/hlö)?$/u;
  for (const line of lines.slice(start + 1, end)) {
    if (sections.has(line)) { section = line; pendingName = null; continue; }
    if (!section) continue;
    const name = names.find((candidate) => line === candidate || line.startsWith(candidate + " "));
    if (!name) {
      if (pendingName && /tarkista saatavuus henkilökunnalta/iu.test(line)) {
        const item = items.get(pendingName);
        if (item) items.set(pendingName, { ...item, requiresAvailabilityConfirmation: true });
      }
      continue;
    }
    const tail = line.slice(name.length).trim();
    const match = tailPattern.exec(tail);
    // The actual source must contain the title and price together; a name
    // without a price cannot be silently filled from an older observation.
    if (!match?.[1]) { pendingName = null; continue; }
    const price = parseNordicMenuPrice(match[1], "EUR");
    if (!price || items.has(name)) throw new Error("Savotta duplicate or invalid price: " + name);
    items.set(name, { ...price, name, section, perPerson: Boolean(match[2]), requiresAvailabilityConfirmation: false });
    pendingName = name;
  }
  const missing = expectedNames.filter((name) => !items.has(name));
  if (missing.length) throw new Error("Savotta review required; missing priced rows: " + missing.join(", "));
  return { status: "review-required", items: [...items.values()] };
}

export function extractSavottaHtmlPreview(html: string, expectedNames: readonly string[]): SavottaPreview {
  return extractSavottaPreview(extractHtmlVisibleText(html), expectedNames);
}
