"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FYSEN_MAP_STYLE_URL, fysenBaseStyle, restaurantMapFeatures, nearestMapFeatures, type CoordinateRow, type MapFeature } from "../lib/fysen-map-foundation.mjs";
import { fysenMapFrame } from "../lib/fysen-map-frame";
import { withPublicBasePath } from "../lib/public-path";
import type { MapEvidenceBySlug } from "../lib/map-menu-evidence";
import styles from "./restaurant-map.module.css";
import { MapRestaurantArtwork } from "./map-restaurant-artwork";

export function RestaurantMap({ rows, dishQuery = "", evidence = {} }: { rows: readonly CoordinateRow[]; dishQuery?: string; evidence?: MapEvidenceBySlug }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [limit, setLimit] = useState(30);
  const [mode, setMode] = useState<"map" | "list">("map");
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "unavailable">("idle");
  const locationRequest = useRef(0);
  const [frameReady, setFrameReady] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [baseStyle, setBaseStyle] = useState<unknown>(null);
  const all = useMemo(() => restaurantMapFeatures(rows), [rows]);
  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase("nb-NO");
    return { ...all, features: all.features.filter(f => !term || (f.properties.name + " " + f.properties.address).toLocaleLowerCase("nb-NO").includes(term)) };
  }, [all, query]);
  const nearest = useMemo(() => location ? nearestMapFeatures(filtered.features, location, 4) : [], [filtered, location]);
  const current = filtered.features.find(f => f.id === selected);
  const currentEvidence = current && Object.hasOwn(evidence, current.id) ? evidence[current.id] ?? [] : [];

  useEffect(() => {
    const controller = new AbortController();
    fetch(FYSEN_MAP_STYLE_URL, { signal: controller.signal, credentials: "omit" })
      .then(response => { if (!response.ok) throw new Error("Kartstil utilgjengelig"); return response.json(); })
      .then(style => setBaseStyle(fysenBaseStyle(style)))
      .catch(() => { if (!controller.signal.aborted) setStatus("error"); });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    function receive(event: MessageEvent) {
      if (event.source !== frame.current?.contentWindow || event.origin !== "null" || !event.data) return;
      if (event.data.type === "fysen-map-ready") setFrameReady(true);
      if (event.data.type === "fysen-map-loaded") setStatus("ready");
      if (event.data.type === "fysen-map-error") setStatus("error");
      if (event.data.type === "fysen-map-select" && typeof event.data.slug === "string") setSelected(event.data.slug);
    }
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, []);

  useEffect(() => {
    if (frameReady && baseStyle) frame.current?.contentWindow?.postMessage({
      type: "fysen-map-data", style: baseStyle, features: filtered,
    }, "*");
  }, [frameReady, baseStyle, filtered]);

  useEffect(() => {
    if (status !== "loading") return;
    const timer = window.setTimeout(() => setStatus("error"), 20000);
    return () => window.clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    if (mode !== "map" || !frameReady) return;
    const id = window.requestAnimationFrame(() => frame.current?.contentWindow?.postMessage({ type: "fysen-map-resize" }, "*"));
    return () => window.cancelAnimationFrame(id);
  }, [mode, frameReady]);

  function requestLocation() {
    if (!navigator.geolocation) { setLocationStatus("unavailable"); return; }
    const request = ++locationRequest.current;
    setLocationStatus("loading");
    navigator.geolocation.getCurrentPosition(position => {
      if (request !== locationRequest.current) return;
      const { longitude, latitude } = position.coords;
      if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) { setLocationStatus("unavailable"); return; }
      setLocation([longitude, latitude]);
      setLocationStatus("idle");
    }, () => {
      if (request !== locationRequest.current) return;
      setLocationStatus("unavailable");
    }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 });
  }

  function clearLocation() {
    ++locationRequest.current;
    setLocation(null);
    setLocationStatus("idle");
  }

  useEffect(() => () => { ++locationRequest.current; }, []);

  function select(feature: MapFeature) {
    setSelected(feature.id);
    frame.current?.contentWindow?.postMessage({ type: "fysen-map-focus", coordinates: feature.geometry.coordinates }, "*");
  }

  return <section className={styles.shell} aria-labelledby="restaurant-map-title">
    <div className={styles.heading}>
      <div><h1 id="restaurant-map-title">{dishQuery ? "Menytreff på kartet" : "Kart"}</h1><p>{filtered.features.length} av {all.features.length} spisesteder med kartposisjon i Oslo</p></div>
      <form className={styles.search} action={withPublicBasePath("/search")} method="get">
        <label htmlFor="map-dish-query">Hva har du lyst på?</label>
        <input id="map-dish-query" type="search" name="q" defaultValue={dishQuery} placeholder="Ramen, pizza, biff…" minLength={2} maxLength={80} required />
        <input type="hidden" name="city" value="Oslo" />
        <input type="hidden" name="view" value="map" />
        <button className={styles.more} type="submit">Finn retten på kartet</button>
        {dishQuery && <a href={withPublicBasePath("/kart")}>Alle spisesteder</a>}
      </form>
      <label className={styles.search}>Finn spisested
        <input type="search" value={query} placeholder="Navn eller gate" onChange={event => { setQuery(event.target.value); setSelected(null); setLimit(30); }} />
      </label>
    </div>
    <nav className={styles.shortcuts} aria-label="Snarveier til rettsøk">
      {["Pizza", "Sushi", "Ramen", "Burger", "Taco", "Pasta"].map(dish => <a key={dish} href={withPublicBasePath("/search") + "?" + new URLSearchParams({ q: dish, city: "Oslo", view: "map" })} aria-current={dishQuery.toLocaleLowerCase("nb-NO") === dish.toLocaleLowerCase("nb-NO") ? "page" : undefined}>{dish}</a>)}
    </nav>
    <div className={styles.toolbar}>
      <div className={styles.switcher} role="group" aria-label="Kartvisning">
        <button type="button" aria-pressed={mode === "map"} onClick={() => setMode("map")}>Kart</button>
        <button type="button" aria-pressed={mode === "list"} onClick={() => setMode("list")}>Liste</button>
      </div>
      <button className={styles.more} type="button" disabled={locationStatus === "loading"} onClick={requestLocation}>{locationStatus === "loading" ? "Henter posisjon…" : location ? "Oppdater posisjon" : "Nær meg"}</button>
      {location && <button className={styles.more} type="button" onClick={clearLocation}>Slå av posisjon</button>}
    </div>
    {locationStatus === "unavailable" && <p role="status">Posisjon er ikke tilgjengelig. Du kan fortsatt utforske kartet.</p>}
    {location && <section className={styles.nearest} aria-label="Fire nærmeste spisesteder">
      <div className={styles.nearestTitle}><h2>{dishQuery ? "Nærmeste menytreff" : "Nærmeste spisesteder"}</h2><button className={styles.more} type="button" onClick={() => { setMode("list"); setLimit(filtered.features.length); }}>Se mer →</button></div>
      <p>Omtrentlig avstand i luftlinje. Posisjonen brukes bare på denne enheten.</p>
      {nearest.length ? <ul>{nearest.map(({ feature }) => <li key={feature.id}><button type="button" onClick={() => select(feature)}>{feature.properties.name}</button></li>)}</ul> : <p>Ingen spisesteder i dette søket.</p>}
    </section>}
    <div className={styles.layout} data-mode={mode}>
      <div className={styles.mapColumn}>
        <iframe ref={frame} title="Fysens restaurantkart" sandbox="allow-scripts" srcDoc={fysenMapFrame} className={styles.map} hidden={mode === "list"} onLoad={() => setFrameReady(true)} />
        {mode === "map" && status === "error" && <p className={styles.notice} role="status">Bakgrunnskartet er ikke tilgjengelig akkurat nå. Restaurantlisten fungerer fortsatt.</p>}
        {current && <article className={styles.selected} aria-live="polite">
          <div><h2>{current.properties.name}</h2><p>{current.properties.address}</p></div>
          <button type="button" onClick={() => setSelected(null)} aria-label="Lukk restaurantkort">Lukk</button>
          <MapRestaurantArtwork key={current.id} restaurant={current.properties} />
          {currentEvidence.length > 0 && <ul className={styles.evidence}>
            {currentEvidence.map((entry, index) => <li key={entry.sourceUrl + entry.name + index}>
              {entry.origin !== "catalog" && <strong>{entry.name}{entry.price ? " · " + entry.price : ""}</strong>}
              {entry.date && <span>{entry.origin === "archive" ? "Meny sist registrert" : "Meny sist kontrollert"} <time dateTime={entry.date}>{entry.date.slice(0, 10)}</time></span>}
              <a href={entry.sourceUrl} target="_blank" rel="noreferrer">{"Se meny"} ↗</a>
            </li>)}
          </ul>}
          <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(current.geometry.coordinates.slice().reverse().join(","))}`} target="_blank" rel="noreferrer">Veibeskrivelse ↗</a>
        </article>}
      </div>
      <aside className={styles.list} aria-label="Spisesteder">
        <h2>Spisesteder</h2>
        {filtered.features.length === 0 && <p>Ingen spisesteder passer søket.</p>}
        <ul>{(location ? nearestMapFeatures(filtered.features, location, limit).map(item => item.feature) : filtered.features.slice(0, limit)).map(f => <li key={f.id}><button type="button" aria-pressed={current?.id === f.id} onClick={() => select(f)}><strong>{f.properties.name}</strong><span>{f.properties.address}</span></button></li>)}</ul>
        {limit < filtered.features.length && <button className={styles.more} type="button" onClick={() => setLimit(n => n + 30)}>Vis flere</button>}
      </aside>
    </div>
    <p className={styles.credit}>Restaurantposisjoner fra Fysens katalog. Kart: <a href="https://openfreemap.org/">OpenFreeMap</a> © <a href="https://openmaptiles.org/">OpenMapTiles</a> · data fra <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>. {dishQuery ? "Menytreff er basert på registrerte kilder, ikke sanntidsbekreftelse av tilgjengelighet. Lignende retter vises ikke på kartet." : "Kartprikker bekrefter ikke åpningstid eller tilgjengelige retter."}</p>
  </section>;
}
