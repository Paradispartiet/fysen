"use client";
import { useState, useEffect } from "react";
import { safeMapMenuUrl } from "../lib/map-menu-evidence";
import { withPublicBasePath } from "../lib/public-path";
import styles from "./restaurant-map.module.css";
import { loadStaticMapIndex, staticRestaurantMenu } from "../lib/static-map-menu";

type Item = { name: string; price: string; sourceUrl: string; date: string };
function isItem(value: unknown): value is Item {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return typeof v.name === "string" && typeof v.price === "string" &&
    typeof v.date === "string" && typeof v.sourceUrl === "string" && safeMapMenuUrl(v.sourceUrl);
}

export function MapRestaurantMenu({ slug }: { slug: string }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Item[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState("");
  const [attempt, setAttempt] = useState(0);
  // Pages uses the build-time verified public index rather than a missing server route.
  const staticPreview = withPublicBasePath("/") !== "/";
  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    if (staticPreview) {
      loadStaticMapIndex().then(index => { if (!controller.signal.aborted) setItems(staticRestaurantMenu(index, slug)); })
        .catch(() => { if (!controller.signal.aborted) setFailed(true); });
      return () => controller.abort();
    }
    fetch(withPublicBasePath("/api/restaurants/menu") + "?" + new URLSearchParams({ restaurant: slug }), {
      signal: controller.signal, headers: { accept: "application/json" },
    }).then(async response => {
      if (!response.ok) throw new Error("Menu unavailable");
      const payload: unknown = await response.json();
      if (!payload || typeof payload !== "object") throw new Error("Invalid menu response");
      const value = payload as Record<string, unknown>;
      if (value.restaurant !== slug || value.realtime !== false || !Array.isArray(value.items) || !value.items.every(isItem)) throw new Error("Invalid menu response");
      if (!controller.signal.aborted) setItems(value.items);
    }).catch(() => { if (!controller.signal.aborted) setFailed(true); });
    return () => controller.abort();
  }, [open, slug, staticPreview, attempt]);
  const filtered = items?.filter(item => item.name.toLocaleLowerCase("nb-NO").includes(query.trim().toLocaleLowerCase("nb-NO")));
  return <section className={styles.fullMenu} aria-label="Registrerte retter">
    <button className={styles.more} type="button" aria-expanded={open} onClick={() => setOpen(value => !value)}>{open ? "Skjul registrert meny" : "Vis registrert meny"}</button>
    {open && <>
      {failed ? <p role="status">Kunne ikke hente menyen. Bruk menykilden eller <button type="button" onClick={() => { setFailed(false); setItems(null); setAttempt(n => n + 1); }}>prøv igjen</button>.</p> : items === null ? <p role="status">Henter meny…</p> : items.length === 0 ? <p>Ingen registrerte retter for dette spisestedet. Se menykilden hvis tilgjengelig.</p> : <>
        <p>{items.length} registrerte retter. Kontroller aktuell meny hos restauranten.</p>
        <label className={styles.search}>Finn i menyen<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Søk etter rett" /></label>
        <ul>{filtered?.map((item, index) => <li key={item.sourceUrl + item.name + index}><strong>{item.name}</strong><span>{item.price}</span><small><time dateTime={item.date}>{item.date.slice(0, 10)}</time> · <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">Menykilde ↗</a></small></li>)}</ul>
        {filtered?.length === 0 && <p>Ingen retter passer søket.</p>}
      </>}
    </>}
  </section>;
}
