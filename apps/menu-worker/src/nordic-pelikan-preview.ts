import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { parseNordicMenuPrice, type NordicPrice } from "./nordic-menu-price.js";

export type PelikanSection = "Förrätter" | "Huvudrätter" | "Efterrätter";
export interface PelikanReviewRow { readonly name: string; readonly section: string }
export interface PelikanItem extends NordicPrice {
  readonly name: string;
  readonly section: PelikanSection;
  readonly page: 1;
}
export interface PelikanFragment {
  readonly text: string;
  readonly x: number;
  readonly y: number;
}
const normalize = (s: string): string => s.normalize("NFKC").replace(/\s+/gu, " ").trim().toLocaleLowerCase("sv-SE");
const sections = ["Förrätter", "Huvudrätter", "Efterrätter"] as const;
const stops = ["aperitif", "grosshandlarmiddag", "brännvin per cl"];

// Coordinates are fractions of page width/height, origin at bottom left.
// This layout is deliberately scoped to the reviewed three-column food page.
export function pelikanColumnLines(fragments: readonly PelikanFragment[]): string[][] {
  const columns: PelikanFragment[][] = [[], [], []];
  for (const f of fragments) {
    if (!f.text.trim() || !Number.isFinite(f.x) || !Number.isFinite(f.y)) continue;
    // Skip the page-wide masthead and bottom illustration credit.
    if (f.y > 0.81 || f.y < 0.07) continue;
    const column = f.x < 0.34 ? 0 : f.x < 0.665 ? 1 : 2;
    columns[column]!.push(f);
  }
  return columns.map((column) => {
    const rows: { y: number; parts: PelikanFragment[] }[] = [];
    for (const f of [...column].sort((a,b) => b.y-a.y || a.x-b.x)) {
      const row = rows.find((r) => Math.abs(r.y-f.y) <= 0.0025);
      if (row) row.parts.push(f);
      else rows.push({ y: f.y, parts: [f] });
    }
    return rows.map((row) => row.parts.sort((a,b) => a.x-b.x).map((p) => p.text).join(" ").replace(/\s+/gu, " ").trim());
  });
}

export function extractPelikanColumns(columns: readonly (readonly string[])[], expected: readonly PelikanReviewRow[]): PelikanItem[] {
  if (columns.length !== 3 || !expected.length || new Set(expected.map((r) => normalize(r.name))).size !== expected.length) {
    throw new Error("Pelikan review scope invalid");
  }
  const results: PelikanItem[] = [];
  for (const [index, section] of sections.entries()) {
    const lines = columns[index]!.map(normalize);
    const start = lines.indexOf(normalize(section));
    const end = lines.findIndex((l,i) => i > start && l.startsWith(stops[index]!));
    if (start < 0 || end <= start) throw new Error("Pelikan section boundaries missing: " + section);
    const rows = expected.filter((row) => row.section === section);
    const names = new Map(rows.map((row) => [normalize(row.name), row.name]));
    const found = new Set<string>();
    for (const line of lines.slice(start + 1, end)) {
      const match = /^(.*?)\s+(\d{2,4})(?:,\s*1\s*\/\s*1\s+(\d{2,4}))?$/u.exec(line);
      if (!match?.[1] || !match[2]) continue;
      const rawName = match[1].replace(/\s+\(tryffel & kaka\)$/u, "");
      const name = names.get(rawName);
      if (!name) throw new Error("Unreviewed priced Pelikan row: " + rawName);
      const price = parseNordicMenuPrice(match[3] ? match[2] + "/" + match[3] : match[2], "SEK");
      if (!price || found.has(name)) throw new Error("Duplicate or invalid Pelikan row: " + name);
      found.add(name);
      results.push({ ...price, name, section, page: 1 });
    }
    if (found.size !== rows.length) throw new Error("Missing Pelikan rows: " + rows.filter((r) => !found.has(r.name)).map((r) => r.name).join(", "));
  }
  if (results.length !== expected.length) throw new Error("Pelikan review coverage mismatch");
  return results;
}

export async function extractPelikanPdfPreview(bytes: Uint8Array, expected: readonly PelikanReviewRow[]): Promise<PelikanItem[]> {
  if (Buffer.from(bytes.subarray(0,5)).toString("ascii") !== "%PDF-") throw new Error("Pelikan PDF signature missing");
  const task = getDocument({ data: bytes, useSystemFonts: true });
  try {
    const doc = await task.promise;
    if (doc.numPages !== 2) throw new Error("Pelikan PDF page count changed");
    const page = await doc.getPage(1);
    const viewport = page.getViewport({ scale: 1 });
    if (page.rotate !== 0 || viewport.width / viewport.height < 0.65 || viewport.width / viewport.height > 0.75) {
      throw new Error("Pelikan PDF layout changed");
    }
    const content = await page.getTextContent();
    const fragments: PelikanFragment[] = [];
    for (const item of content.items) {
      if (!("str" in item)) continue;
      const x = item.transform[4], y = item.transform[5];
      if (x === undefined || y === undefined) continue;
      fragments.push({ text: item.str, x: x / viewport.width, y: y / viewport.height });
    }
    return extractPelikanColumns(pelikanColumnLines(fragments), expected);
  } finally { await task.destroy(); }
}
