// Parse only a price field already paired with a dish by source-specific review.
// Do not use this on arbitrary menu text, where a number may be a date or weight.
export type NordicCurrency = "NOK" | "DKK" | "SEK" | "EUR" | "ISK";
export interface NordicPrice {
  readonly currency: NordicCurrency;
  readonly priceMinor: number;
  readonly priceKind: "exact" | "multiple";
  readonly priceMaxMinor: number | null;
}

function minorAmount(raw: string, currency: NordicCurrency): number | null {
  let text = raw.trim().normalize("NFKC");
  const explicit = text.match(/^(NOK|DKK|SEK|EUR|ISK|€|kr\.?)\s*/iu);
  if (explicit) text = text.slice(explicit[0].length).trim();
  const suffix = text.match(/\s*(NOK|DKK|SEK|EUR|ISK|€|kr\.?)$/iu);
  if (suffix) text = text.slice(0, -suffix[0].length).trim();
  for (const marker of [explicit?.[1], suffix?.[1]]) {
    if (!marker) continue;
    const normalized = marker.toUpperCase();
    if (normalized === "€" ? currency !== "EUR" :
      /^KR\.?$/u.test(normalized) ? currency === "EUR" : normalized !== currency) return null;
  }
  if (currency !== "EUR") text = text.replace(/(?:,-|:-)$/u, "").trim();
  // Archive fields use a fixed 100 scale for all currencies; ISK menus
  // are whole krónur, with a period or space as a thousands separator.
  if (currency === "ISK") {
    const whole = /^(?:\d{1,7}|\d{1,3}(?:\.\d{3})+|\d{1,3}(?: \d{3})+)$/u.test(text)
      ? Number(text.replace(/[. ]/gu, "")) : NaN;
    return Number.isSafeInteger(whole * 100) && whole > 0 && whole <= 9999999 ? whole * 100 : null;
  }
  const match = /^(\d{1,5})(?:[,.](\d{1,2}))?$/u.exec(text);
  if (!match || match[1] === undefined) return null;
  const value = Number(match[1]) * 100 + Number((match[2] ?? "").padEnd(2, "0"));
  return value > 0 && Number.isSafeInteger(value) ? value : null;
}

export function parseNordicMenuPrice(raw: string, currency: NordicCurrency): NordicPrice | null {
  // Slash denotes two actual menu prices; do not mistake "1/1" or per-person
  // /hlö for a second amount. Portion annotations need source-specific review.
  const tokens = raw.trim().split("/");
  if (tokens.length > 2) return null;
  const first = minorAmount(tokens[0] ?? "", currency);
  if (first === null) return null;
  if (tokens.length === 1) return { currency, priceMinor: first, priceKind: "exact", priceMaxMinor: null };
  const second = minorAmount(tokens[1] ?? "", currency);
  if (second === null || second <= first) return null;
  return { currency, priceMinor: first, priceKind: "multiple", priceMaxMinor: second };
}
