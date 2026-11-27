"use client";

import { usePreviewLocale } from "./language-preview";
import { normalizeNordicDishQuery } from "../lib/nordic-dish-search";

const labels = {
  "nb": [
    "Menyarkivet søker også etter tilsvarende rettnavn på andre språk.",
    "Søk også etter"
  ],
  "nn": [
    "Menyarkivet søkjer òg etter tilsvarande rettnamn på andre språk.",
    "Søk òg etter"
  ],
  "sv": [
    "Menyarkivet söker också efter motsvarande maträttsnamn på andra språk.",
    "Sök också efter"
  ],
  "da": [
    "Menuarkivet søger også efter tilsvarende retnavne på andre sprog.",
    "Søg også efter"
  ],
  "fi": [
    "Ruokalista-arkisto hakee myös vastaavia ruokalajien nimiä muilla kielillä.",
    "Hae myös nimellä"
  ],
  "is": [
    "Matseðlasafnið leitar einnig að samsvarandi heitum rétta á öðrum tungumálum.",
    "Leita einnig að"
  ],
  "en": [
    "The menu archive also searches equivalent dish names in other languages.",
    "Also search for"
  ]
} as const;

export function NordicSearchNotice({ canonicalQuery, query, alternatives, href, hasArchive }: {
  canonicalQuery: string; query: string; alternatives: readonly string[]; href: string; hasArchive: boolean;
}) {
  const locale = usePreviewLocale();
  const [explanation, alsoSearch] = labels[locale];
  const showLink = normalizeNordicDishQuery(query) !== normalizeNordicDishQuery(canonicalQuery);
  if (!showLink && (!hasArchive || !alternatives.length)) return null;
  return <aside className="dishKnowledgeNote" lang={locale}>
    {hasArchive && alternatives.length ? <p>{explanation}</p> : null}
    {showLink ? <p><a href={href}>{alsoSearch} «{canonicalQuery}»</a></p> : null}
  </aside>;
}
