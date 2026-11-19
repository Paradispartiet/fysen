/**
 * Render a country/territory's actual flag artwork rather than the OS emoji.
 *
 * A Unicode regional-indicator pair contains exactly two ISO-like letters.
 * Invalid values return null; never substitute a generic flag icon.
 *
 * Source: https://flagcdn.com/ (Flagpedia; SVG based on Wikimedia Commons).
 * Aspect ratios are retained by the image styles using object-fit: contain.
 */
export function countryFlagUrl(flagEmoji: string): string | null {
  const parts = Array.from(flagEmoji);
  if (parts.length !== 2) return null;

  const regionalIndicatorA = 0x1f1e6;
  const regionalIndicatorZ = regionalIndicatorA + 25;
  const letters = parts.map((part) => part.codePointAt(0) ?? -1);
  if (letters.some((value) => value < regionalIndicatorA || value > regionalIndicatorZ)) return null;

  const countryCode = letters
    .map((value) => String.fromCharCode(value - regionalIndicatorA + 97))
    .join("");
  return `https://flagcdn.com/${countryCode}.svg`;
}
