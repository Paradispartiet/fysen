import { createHash } from "node:crypto";

export type MenuExtractionMethod = "json_ld" | "html_heuristic" | "pdf_text" | "manual" | "api";
export type MenuPriceKind = "exact" | "from" | "multiple";

export interface MenuObservedItem {
  readonly sourceKey: string;
  readonly name: string;
  readonly normalizedName: string;
  readonly description: string | null;
  readonly sectionName: string | null;
  readonly priceMinor: number | null;
  readonly priceKind?: MenuPriceKind;
  readonly priceMaxMinor?: number | null;
  readonly currency: string;
  readonly position: number;
  readonly extractionMethod: MenuExtractionMethod;
  readonly confidence: number;
  readonly sourceExcerpt: string | null;
}

export interface MenuFingerprintItem {
  readonly name: string;
  readonly description?: string | null;
  readonly sectionName?: string | null;
  readonly priceMinor: number | null;
  readonly priceKind?: MenuPriceKind;
  readonly priceMaxMinor?: number | null;
  readonly currency: string;
}

export interface MenuItemChange {
  readonly kind: "added" | "removed" | "price_changed" | "content_changed";
  readonly sourceKey: string;
  readonly before: MenuObservedItem | null;
  readonly after: MenuObservedItem | null;
}

export interface ExtractionAssessment {
  readonly accepted: boolean;
  readonly code: "ok" | "below_minimum" | "suspicious_drop";
  readonly message: string;
}

export function sha256(value: string | Uint8Array): string {
  return createHash("sha256").update(value).digest("hex");
}

export function normalizeDishName(value: string): string {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("nb-NO")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function normalizeOptionalText(value: string | null | undefined): string | null {
  if (!value) return null;
  const normalized = value.normalize("NFKC").trim().replace(/\s+/g, " ");
  return normalized.length > 0 ? normalized : null;
}

export function menuPriceKind(item: Pick<MenuObservedItem, "priceKind">): MenuPriceKind {
  return item.priceKind ?? "exact";
}

export function menuPriceMaxMinor(
  item: Pick<MenuObservedItem, "priceMaxMinor">,
): number | null {
  return item.priceMaxMinor ?? null;
}

export function createMenuItemSourceKey(name: string, sectionName: string | null = null): string {
  return sha256(`${normalizeDishName(sectionName ?? "")}\u0000${normalizeDishName(name)}`);
}

export function createMenuFingerprint(items: readonly MenuFingerprintItem[]): string {
  const canonical = items
    .map((item) => {
      const priceKind = item.priceKind ?? "exact";
      const priceMaxMinor = item.priceMaxMinor ?? null;
      return {
        name: normalizeDishName(item.name),
        description: normalizeOptionalText(item.description),
        sectionName: normalizeOptionalText(item.sectionName),
        priceMinor: item.priceMinor,
        currency: item.currency.toUpperCase(),
        ...(priceKind !== "exact" ? { priceKind } : {}),
        ...(priceMaxMinor !== null ? { priceMaxMinor } : {}),
      };
    })
    .sort((left, right) => {
      const byName = left.name.localeCompare(right.name, "nb-NO");
      if (byName !== 0) return byName;
      const bySection = (left.sectionName ?? "").localeCompare(right.sectionName ?? "", "nb-NO");
      if (bySection !== 0) return bySection;
      const byPrice = (left.priceMinor ?? -1) - (right.priceMinor ?? -1);
      if (byPrice !== 0) return byPrice;
      return ("priceMaxMinor" in left ? left.priceMaxMinor ?? -1 : -1)
        - ("priceMaxMinor" in right ? right.priceMaxMinor ?? -1 : -1);
    });

  return sha256(JSON.stringify(canonical));
}

export function diffMenuItems(
  previousItems: readonly MenuObservedItem[],
  currentItems: readonly MenuObservedItem[],
): readonly MenuItemChange[] {
  const previous = new Map(previousItems.map((item) => [item.sourceKey, item]));
  const current = new Map(currentItems.map((item) => [item.sourceKey, item]));
  const changes: MenuItemChange[] = [];

  for (const item of currentItems) {
    const before = previous.get(item.sourceKey);
    if (!before) {
      changes.push({ kind: "added", sourceKey: item.sourceKey, before: null, after: item });
      continue;
    }

    if (
      before.priceMinor !== item.priceMinor ||
      before.currency !== item.currency ||
      menuPriceKind(before) !== menuPriceKind(item) ||
      menuPriceMaxMinor(before) !== menuPriceMaxMinor(item)
    ) {
      changes.push({ kind: "price_changed", sourceKey: item.sourceKey, before, after: item });
    }

    const beforeContent = JSON.stringify({
      name: before.name,
      description: normalizeOptionalText(before.description),
      sectionName: normalizeOptionalText(before.sectionName),
    });
    const afterContent = JSON.stringify({
      name: item.name,
      description: normalizeOptionalText(item.description),
      sectionName: normalizeOptionalText(item.sectionName),
    });
    if (beforeContent !== afterContent) {
      changes.push({ kind: "content_changed", sourceKey: item.sourceKey, before, after: item });
    }
  }

  for (const item of previousItems) {
    if (!current.has(item.sourceKey)) {
      changes.push({ kind: "removed", sourceKey: item.sourceKey, before: item, after: null });
    }
  }

  return changes;
}

export function assessExtraction(
  previousItemCount: number,
  currentItemCount: number,
  minimumExpectedItems: number,
): ExtractionAssessment {
  if (currentItemCount < minimumExpectedItems) {
    return {
      accepted: false,
      code: "below_minimum",
      message: `Extracted ${currentItemCount} items; source requires at least ${minimumExpectedItems}.`,
    };
  }

  if (previousItemCount >= 8 && currentItemCount < Math.ceil(previousItemCount * 0.5)) {
    return {
      accepted: false,
      code: "suspicious_drop",
      message: `Menu item count dropped from ${previousItemCount} to ${currentItemCount}; publication is quarantined.`,
    };
  }

  return { accepted: true, code: "ok", message: "Extraction accepted." };
}
