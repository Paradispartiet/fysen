import { load } from "cheerio";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";

export const HTML_EMBEDDED_MENU_JSON_RECOVERY_VERSION = "embedded-menu-json-v1";

const MIN_CATEGORIES = 2;
const MIN_ITEMS = 4;
const MIN_BOUND_RATIO = 0.7;
const GENERIC_CATEGORY = /^(?:popular|populært|populaert|most\s+ordered|mest\s+bestilt|recommended|anbefalt)$/iu;
const BEVERAGE_CATEGORY = /^(?:drikke(?:meny)?|drinks?(?:\s+menu)?|beverages?|alkoholfritt|non[- ]alcoholic(?:\s+drinks?)?|soft\s+drinks?|mineralvann|sodas?|brus|juice|juices|beer|beers|øl|ol|cider|wine|vin|vinkart|cocktails?|mocktails?|coffee|kaffe|tea|te|spirits?|brennevin)$/iu;

interface EmbeddedCategory {
  readonly name: string;
  readonly itemIds: readonly string[];
}

interface EmbeddedItem {
  readonly id: string;
  readonly name: string;
  readonly description: string | null;
  readonly priceMinor: number;
}

interface Candidate {
  readonly categories: readonly EmbeddedCategory[];
  readonly items: readonly EmbeddedItem[];
  readonly score: number;
}

function normalizeText(value: unknown): string {
  return typeof value === "string"
    ? value.normalize("NFKC").replace(/\s+/gu, " ").trim()
    : "";
}

function integerPriceMinor(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isInteger(value)) return null;
  if (value < 3_000 || value > 2_000_000) return null;
  return value;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function parseCategory(value: unknown): EmbeddedCategory | null {
  const record = asRecord(value);
  if (!record) return null;
  const name = normalizeText(record.name);
  const rawIds = record.item_ids;
  if (!name || !Array.isArray(rawIds)) return null;
  const itemIds = rawIds
    .map((id) => (typeof id === "string" || typeof id === "number" ? String(id) : ""))
    .filter(Boolean);
  return itemIds.length > 0 ? { name, itemIds } : null;
}

function parseItem(value: unknown): EmbeddedItem | null {
  const record = asRecord(value);
  if (!record) return null;
  const id =
    typeof record.id === "string" || typeof record.id === "number"
      ? String(record.id)
      : "";
  const name = normalizeText(record.name);
  const priceMinor = integerPriceMinor(record.price);
  if (!id || !name || priceMinor === null) return null;
  const description = normalizeText(record.description) || null;
  return { id, name, description, priceMinor };
}

function candidateFromRecord(record: Record<string, unknown>): Candidate | null {
  if (!Array.isArray(record.categories) || !Array.isArray(record.items)) return null;

  const categories = record.categories
    .map(parseCategory)
    .filter((value): value is EmbeddedCategory => Boolean(value));
  const items = record.items
    .map(parseItem)
    .filter((value): value is EmbeddedItem => Boolean(value));
  if (categories.length < MIN_CATEGORIES || items.length < MIN_ITEMS) return null;

  const itemIds = new Set(items.map((item) => item.id));
  const referenced = new Set<string>();
  for (const category of categories) {
    for (const id of category.itemIds) {
      if (itemIds.has(id)) referenced.add(id);
    }
  }
  if (referenced.size < MIN_ITEMS) return null;
  if (referenced.size / items.length < MIN_BOUND_RATIO) return null;

  return {
    categories,
    items,
    score: referenced.size * 100 + categories.length,
  };
}

function collectCandidates(value: unknown): Candidate[] {
  const candidates: Candidate[] = [];
  const seen = new Set<object>();

  const visit = (current: unknown, depth: number): void => {
    if (depth > 10 || current === null || typeof current !== "object") return;
    const object = current as object;
    if (seen.has(object)) return;
    seen.add(object);

    if (!Array.isArray(current)) {
      const record = current as Record<string, unknown>;
      const candidate = candidateFromRecord(record);
      if (candidate) candidates.push(candidate);
      for (const child of Object.values(record)) visit(child, depth + 1);
      return;
    }

    for (const child of current) visit(child, depth + 1);
  };

  visit(value, 0);
  return candidates;
}

function categoryIdentity(value: string): string {
  return normalizeDishName(value);
}

function usableCategory(name: string): boolean {
  return !GENERIC_CATEGORY.test(name) && !BEVERAGE_CATEGORY.test(name);
}

function recoverFromCandidate(candidate: Candidate): readonly MenuObservedItem[] {
  const categoryNamesByItemId = new Map<string, string[]>();
  for (const category of candidate.categories) {
    if (!usableCategory(category.name)) continue;
    for (const itemId of category.itemIds) {
      const names = categoryNamesByItemId.get(itemId) ?? [];
      if (!names.some((name) => categoryIdentity(name) === categoryIdentity(category.name))) {
        names.push(category.name);
      }
      categoryNamesByItemId.set(itemId, names);
    }
  }

  const recovered: MenuObservedItem[] = [];
  const sourceKeys = new Set<string>();
  for (const item of candidate.items) {
    const sections = categoryNamesByItemId.get(item.id) ?? [];
    if (sections.length === 0) continue;
    const sectionName = sections[0] ?? null;
    if (!sectionName) continue;
    const sourceKey = createMenuItemSourceKey(item.name, sectionName);
    if (sourceKeys.has(sourceKey)) continue;
    sourceKeys.add(sourceKey);
    recovered.push({
      sourceKey,
      name: item.name,
      normalizedName: normalizeDishName(item.name),
      description: item.description,
      sectionName,
      priceMinor: item.priceMinor,
      priceKind: "exact",
      priceMaxMinor: null,
      currency: "NOK",
      position: recovered.length,
      extractionMethod: "api",
      confidence: 0.99,
      sourceExcerpt: `${sectionName} — ${item.name} — ${item.priceMinor / 100} NOK`.slice(
        0,
        1000,
      ),
    });
  }

  return recovered.length >= MIN_ITEMS ? recovered : [];
}

export function recoverEmbeddedStructuredMenuJson(
  html: string,
): readonly MenuObservedItem[] {
  const $ = load(html);
  const candidates: Candidate[] = [];

  $("script[type='application/json'], script[type='application/ld+json']").each(
    (_, element) => {
      const text = $(element).html()?.trim() ?? "";
      if (!text) return;
      try {
        candidates.push(...collectCandidates(JSON.parse(text)));
      } catch {
        // Ignore malformed or non-JSON script payloads and fail closed.
      }
    },
  );

  const ordered = candidates.sort((a, b) => b.score - a.score);
  for (const candidate of ordered) {
    const recovered = recoverFromCandidate(candidate);
    if (recovered.length >= MIN_ITEMS) return recovered;
  }
  return [];
}
