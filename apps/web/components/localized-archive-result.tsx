"use client";

import { usePreviewLocale } from "./language-preview";
import { locales } from "../lib/locales";
import { priceLabels } from "../lib/dish-price";

const labels = {
  "nb": [
    "Menytreff",
    "{count} treff på «{query}»",
    "Ingen treff på denne retten. Prøv et annet søkeord.",
    "Meny sist registrert",
    "Se meny"
  ],
  "nn": [
    "Menytreff",
    "{count} treff på «{query}»",
    "Ingen treff på denne retten. Prøv eit anna søkjeord.",
    "Meny sist registrert",
    "Sjå meny"
  ],
  "sv": [
    "Menyträffar",
    "{count} träffar på «{query}»",
    "Inga träffar på den här maträtten. Prova ett annat sökord.",
    "Meny senast registrerad",
    "Visa meny"
  ],
  "da": [
    "Menutreff",
    "{count} resultater for «{query}»",
    "Ingen resultater for denne ret. Prøv et andet søgeord.",
    "Menu senest registreret",
    "Se menu"
  ],
  "fi": [
    "Ruokalistaosumat",
    "{count} osumaa haulle «{query}»",
    "Ei osumia tälle ruokalajille. Kokeile toista hakusanaa.",
    "Ruokalista viimeksi tallennettu",
    "Näytä ruokalista"
  ],
  "is": [
    "Niðurstöður á matseðlum",
    "{count} niðurstöður fyrir «{query}»",
    "Engar niðurstöður fyrir þennan rétt. Prófaðu annað leitarorð.",
    "Matseðill síðast skráður",
    "Sjá matseðil"
  ],
  "en": [
    "Menu matches",
    "{count} matches for «{query}»",
    "No matches for this dish. Try another search term.",
    "Menu last recorded",
    "View menu"
  ]
} as const;

export function ArchiveResultText({ kind, count = 0, query = "" }: { kind: "count" | "empty" | "recorded" | "menu"; count?: number; query?: string }) {
  const locale = usePreviewLocale();
  const label = labels[locale][({ count: 1, empty: 2, recorded: 3, menu: 4 } as const)[kind]];
  return <span lang={locale}>{label.replace("{count}", () => String(count)).replace("{query}", () => query)}</span>;
}

export function ArchivePrice({ priceMinor, priceMaxMinor, kind, currency }: { priceMinor: number | null; priceMaxMinor: number | null; kind: string; currency: string }) {
  const locale = usePreviewLocale();
  const [missing, from, multiple] = priceLabels[locale];
  const formatter = new Intl.NumberFormat(locales[locale].intl, { style: "currency", currency, maximumFractionDigits: 2 });
  const price = priceMinor === null ? null : formatter.format(priceMinor / 100);
  const max = priceMaxMinor === null ? null : formatter.format(priceMaxMinor / 100);
  const label = price === null ? missing : kind === "multiple" ? (max ? price + " – " + max : multiple + " " + price) : kind === "from" ? from.charAt(0).toLocaleUpperCase(locales[locale].intl) + from.slice(1) + " " + price : price;
  return <strong lang={locale}>{label}</strong>;
}
