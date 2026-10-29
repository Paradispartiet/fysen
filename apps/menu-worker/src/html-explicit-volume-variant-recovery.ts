import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";

// Recover only independently source-priced servings with an explicit volume.
// A duplicate item title by itself is not evidence of another food option.
export const HTML_EXPLICIT_VOLUME_VARIANT_VERSION = "volume-variant-v1";

type SizedPrice = { volumeMl: number; priceMinor: number; sourceLine: string };
const sourcePrice = /^(?:(?:NOK|kr\.?)\s*)?([1-9]\d{0,3})[.,](\d{2})(?:\s*(?:kr\.?|NOK))?$/iu;
const volume = /\b(\d{2,4})\s*ml\b/iu;

export function restoreIndependentlyPricedVolumeVariants(
  items: readonly MenuObservedItem[],
  visibleText: string,
): readonly MenuObservedItem[] {
  if (!visibleText || items.length === 0) return items;
  const lines = visibleText.split("\n").map((line) =>
    line.normalize("NFKC").replace(/\s+/gu, " ").trim(),
  ).filter(Boolean);
  const occurrences = new Map<string, SizedPrice[]>();
  const existingNames = new Map<string, number>();
  for (const item of items) {
    const key = normalizeDishName(item.name);
    existingNames.set(key, (existingNames.get(key) ?? 0) + 1);
  }

  for (let i = 0; i < lines.length - 2; i += 1) {
    const key = normalizeDishName(lines[i] ?? "");
    if (!existingNames.has(key)) continue;
    const description = lines[i + 1] ?? "";
    const size = description.match(volume);
    if (!size?.[1] || description.length > 500) continue;
    const pricedLine = lines[i + 2] ?? "";
    const priced = pricedLine.match(sourcePrice);
    if (!priced?.[1] || !priced[2]) continue;
    const volumeMl = Number(size[1]);
    const priceMinor = Number(priced[1]) * 100 + Number(priced[2]);
    if (!Number.isSafeInteger(priceMinor) || volumeMl < 30 || volumeMl > 3000) continue;
    const found = occurrences.get(key) ?? [];
    found.push({ volumeMl, priceMinor, sourceLine: pricedLine });
    occurrences.set(key, found);
  }

  return items.flatMap((item) => {
    const key = normalizeDishName(item.name);
    const candidates = occurrences.get(key) ?? [];
    if (existingNames.get(key) !== 1 || item.priceMinor === null ||
        candidates.length < 2 || candidates.length > 8) return [item];
    const distinct = new Map<number, SizedPrice>();
    for (const candidate of candidates) {
      const old = distinct.get(candidate.volumeMl);
      if (old && old.priceMinor !== candidate.priceMinor) return [item];
      distinct.set(candidate.volumeMl, candidate);
    }
    if (distinct.size < 2 || distinct.size > 4 ||
        new Set([...distinct.values()].map((value) => value.priceMinor)).size !== distinct.size ||
        ![...distinct.values()].some((value) => value.priceMinor === item.priceMinor)) {
      return [item];
    }
    return [...distinct.values()]
      .sort((a, b) => a.volumeMl - b.volumeMl)
      .map((candidate) => {
        const name = `${item.name} (${candidate.volumeMl} ml)`;
        return {
          ...item,
          name,
          normalizedName: normalizeDishName(name),
          sourceKey: createMenuItemSourceKey(name, item.sectionName),
          priceMinor: candidate.priceMinor,
          priceKind: "exact" as const,
          priceMaxMinor: null,
          confidence: Math.min(item.confidence, 0.85),
          sourceExcerpt: `${item.name} — ${candidate.volumeMl} ml — ${candidate.sourceLine}`.slice(0, 1000),
        };
      });
  });
}
