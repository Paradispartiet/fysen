// Language is independent of city, restaurant coverage, and currency.
// Registry entries are planned locales, not a claim of complete translation.
export const locales = {
  nb: { label: "Norsk bokmål", intl: "nb-NO" },
  nn: { label: "Norsk nynorsk", intl: "nn-NO" },
  sv: { label: "Svenska", intl: "sv-SE" },
  da: { label: "Dansk", intl: "da-DK" },
  fi: { label: "Suomi", intl: "fi-FI" },
  is: { label: "Íslenska", intl: "is-IS" },
  fo: { label: "Føroyskt", intl: "fo-FO" },
  kl: { label: "Kalaallisut", intl: "kl-GL" },
  se: { label: "Davvisámegiella", intl: "se" },
  en: { label: "English", intl: "en" },
} as const;

export type Locale = keyof typeof locales;
export const defaultLocale: Locale = "nb";

export function parseLocale(value: string | null | undefined): Locale | undefined {
  const primary = value?.trim().toLowerCase().split("-")[0];
  if (primary === "no") return "nb";
  if (primary && Object.hasOwn(locales, primary)) return primary as Locale;
  return undefined;
}

// Accept-Language preferences respect q weights; explicitly chosen locale wins.
export function resolveLocale(
  chosen?: string | null,
  acceptLanguage?: string | null,
): Locale {
  const explicit = parseLocale(chosen);
  if (explicit) return explicit;
  const candidates = (acceptLanguage ?? "").split(",").map((part, index) => {
    const [tag, ...params] = part.trim().split(";");
    const q = params.find((param) => /^q\s*=/i.test(param.trim()));
    const weight = q === undefined ? 1 : Number(q.split("=")[1]?.trim());
    return { locale: parseLocale(tag), weight, index };
  }).filter(({ locale, weight }) => locale && weight > 0 && weight <= 1)
    .sort((a, b) => b.weight - a.weight || a.index - b.index);
  return candidates[0]?.locale ?? defaultLocale;
}
