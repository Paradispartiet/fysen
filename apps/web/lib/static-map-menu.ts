import { archivedMenuPriceLabel } from "./archived-menu-price";
import { safeMapMenuUrl, type MapEvidenceBySlug, type MapMenuEvidence } from "./map-menu-evidence";
import { withPublicBasePath } from "./public-path";

type Row = [string, string, number | null, string, number | null];
type Group = { slug: string; source: string; date: string; items: Row[] };
type Index = { version: 1; source: "verified-menu-archive"; realtime: false; archiveDate: string; groups: Group[] };

export function normalizeStaticMapQuery(value: string): string {
  return value.normalize("NFKC").toLocaleLowerCase("nb-NO").replace(/[^\p{L}\p{N}]+/gu, " ").trim().replace(/\s+/gu, " ");
}
function isPrice(value: unknown): value is number | null {
  return value === null || (typeof value === "number" && Number.isSafeInteger(value) && value >= 0);
}
function isRow(value: unknown): value is Row {
  return Array.isArray(value) && value.length === 5 && typeof value[0] === "string" &&
    typeof value[1] === "string" && isPrice(value[2]) && typeof value[3] === "string" && isPrice(value[4]);
}
function isGroup(value: unknown): value is Group {
  if (!value || typeof value !== "object") return false;
  const group = value as Partial<Group>;
  return typeof group.slug === "string" && /^[a-z0-9][a-z0-9-]{0,159}$/u.test(group.slug) &&
    typeof group.source === "string" && safeMapMenuUrl(group.source) &&
    typeof group.date === "string" && Number.isFinite(Date.parse(group.date)) &&
    Array.isArray(group.items) && group.items.every(isRow);
}
export function parseStaticMapIndex(value: unknown): Index {
  if (!value || typeof value !== "object") throw new Error("Invalid menu index");
  const index = value as Partial<Index>;
  if (index.version !== 1 || index.source !== "verified-menu-archive" || index.realtime !== false ||
      typeof index.archiveDate !== "string" || !Number.isFinite(Date.parse(index.archiveDate)) ||
      !Array.isArray(index.groups) || index.groups.length > 10000 || !index.groups.every(isGroup)) throw new Error("Invalid menu index");
  return index as Index;
}
let pending: Promise<Index> | null = null;
export function loadStaticMapIndex(): Promise<Index> {
  if (!pending) {
    const request = fetch(withPublicBasePath("/map-data/menus.json"), { headers: { accept: "application/json" }, signal: AbortSignal.timeout(20000) })
      .then(async response => {
        if (!response.ok) throw new Error("Menu index unavailable");
        return parseStaticMapIndex(await response.json());
      });
    pending = request;
    void request.catch(() => { if (pending === request) pending = null; });
  }
  return pending;
}
function evidence(group: Group, row: Row): MapMenuEvidence {
  return { name: row[0], sourceUrl: group.source, date: group.date, origin: "archive",
    price: archivedMenuPriceLabel(row[2], row[4], row[3], "NOK") };
}
export function searchStaticMap(index: Index, query: string): MapEvidenceBySlug {
  const term = normalizeStaticMapQuery(query);
  const groups = new Map<string, MapMenuEvidence[]>();
  if (term.length < 2) return {};
  for (const group of index.groups) {
    for (const row of group.items) {
      if (!row[1].includes(term)) continue;
      const entries = groups.get(group.slug) ?? [];
      if (!entries.some(entry => entry.name === row[0] && entry.sourceUrl === group.source)) entries.push(evidence(group, row));
      groups.set(group.slug, entries);
    }
  }
  return Object.fromEntries(groups);
}
export function staticRestaurantMenu(index: Index, slug: string) {
  return index.groups.filter(group => group.slug === slug).flatMap(group => group.items.map(row => ({
    ...evidence(group, row), price: archivedMenuPriceLabel(row[2], row[4], row[3], "NOK"),
  })));
}
