import { createHash } from "node:crypto";

export function normalizeDishName(value: string): string {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("nb-NO")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export interface MenuFingerprintItem {
  readonly name: string;
  readonly priceMinor: number | null;
  readonly currency: string;
}

export function createMenuFingerprint(items: readonly MenuFingerprintItem[]): string {
  const canonical = items
    .map((item) => ({
      name: normalizeDishName(item.name),
      priceMinor: item.priceMinor,
      currency: item.currency.toUpperCase(),
    }))
    .sort((left, right) => {
      const byName = left.name.localeCompare(right.name, "nb-NO");
      if (byName !== 0) return byName;
      return (left.priceMinor ?? -1) - (right.priceMinor ?? -1);
    });

  return createHash("sha256").update(JSON.stringify(canonical)).digest("hex");
}
