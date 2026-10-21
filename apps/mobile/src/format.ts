export type Price = {
  priceMinor: number | null;
  priceMaxMinor?: number | null;
  priceKind: "exact" | "from" | "multiple";
  currency: string;
};

export function formatPrice(price: Price): string {
  if (price.priceMinor === null) return "Pris ikke oppgitt";
  const amount = (price.priceMinor / 100).toLocaleString("nb-NO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  const prefix = price.priceKind === "from" ? "Fra " : "";
  if (price.priceKind === "multiple" && price.priceMaxMinor !== null && price.priceMaxMinor !== undefined) {
    const max = (price.priceMaxMinor / 100).toLocaleString("nb-NO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    return amount + "–" + max + " kr";
  }
  return prefix + amount + " kr";
}

export function cleanDishName(name: string): string {
  return name.replace(/^\s*(?:\d{1,3}[\s.)-]+|[^\p{L}\p{N}"'«‘]+)+/gu, "").trim() || name;
}

export function validateSearchTerm(term: string): string | null {
  const normalized = term.trim();
  return normalized.length >= 2 && normalized.length <= 80 ? normalized : null;
}

export function safeHttpsUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}
