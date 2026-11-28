"use client";

import { useEffect, useState } from "react";
import { RestaurantMap } from "./restaurant-map";
import { restaurantCoordinateRows } from "../lib/restaurant-coordinate-data";
import { loadStaticMapIndex, searchStaticMap } from "../lib/static-map-menu";
import type { MapEvidenceBySlug } from "../lib/map-menu-evidence";
import { withPublicBasePath } from "../lib/public-path";

export function StaticMapDishSearch({ query }: { query: string }) {
  const [evidence, setEvidence] = useState<MapEvidenceBySlug | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let disposed = false;
    loadStaticMapIndex().then(index => {
      if (!disposed) setEvidence(searchStaticMap(index, query));
    }).catch(() => { if (!disposed) setFailed(true); });
    return () => { disposed = true; };
  }, [query]);

  if (failed) return <section><p role="status">Kunne ikke hente registrerte menyer. Prøv igjen eller åpne alle spisesteder.</p><a href={withPublicBasePath("/kart")}>Alle spisesteder</a></section>;
  if (!evidence) return <p role="status">Søker i registrerte menyer …</p>;
  const rows = restaurantCoordinateRows.filter(row => Object.hasOwn(evidence, row[0]));
  return <>
    <p>{rows.length} spisesteder med registrerte menytreff. Menyene er fra dokumenterte kilder, ikke sanntid.</p>
    <RestaurantMap key={query} rows={rows} dishQuery={query} evidence={evidence} />
  </>;
}
