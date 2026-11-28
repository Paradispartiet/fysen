"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FYSEN_MAP_STYLE_URL, fysenBaseStyle, restaurantMapFeatures, nearestMapFeatures, type CoordinateRow, type MapFeature } from "../lib/fysen-map-foundation.mjs";
import { fysenMapFrame } from "../lib/fysen-map-frame";
import { withPublicBasePath } from "../lib/public-path";
import type { MapEvidenceBySlug } from "../lib/map-menu-evidence";
import styles from "./restaurant-map.module.css";
import { GlobalHeader } from "./global-header";
import { MapRestaurantArtwork } from "./map-restaurant-artwork";
import { MapRestaurantMenu } from "./map-restaurant-menu";
import { ahaMinMatPilotEnabled } from "../lib/aha-min-mat-pilot";
import { SaveMinMatButton } from "./save-min-mat-button";
import { restaurantFavoritesKey, parseRestaurantFavorites, toggleRestaurantFavorite } from "../lib/map-favorites.mjs";

export function RestaurantMap({ rows, dishQuery = "", evidence = {}, initialMode = "map", standalone = false }: { rows: readonly CoordinateRow[]; dishQuery?: string; evidence?: MapEvidenceBySlug; initialMode?: "map" | "list"; standalone?: boolean }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [immersive, setImmersive] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mapAttempt, setMapAttempt] = useState(0);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [limit, setLimit] = useState(30);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favoritesNotice, setFavoritesNotice] = useState("");
  useEffect(() => {
    try { setFavorites(parseRestaurantFavorites(window.localStorage.getItem(restaurantFavoritesKey))); }
    catch { setFavoritesNotice("Favoritter kan ikke lagres på denne enheten."); }
  }, []);
  function toggleFavorite(slug: string) {
    const next = toggleRestaurantFavorite(favorites, slug);
    setFavorites(next);
    try { window.localStorage.setItem(restaurantFavoritesKey, JSON.stringify(next)); setFavoritesNotice(""); }
    catch { setFavoritesNotice("Favoritten er bare tilgjengelig i denne økten."); }
  }
  const [mode, setMode] = useState<"map" | "list">(initialMode);
  const [mapActivated, setMapActivated] = useState(initialMode === "map");
  function toggleImmersive() {
    setMapActivated(true);
    setMode("map");
    setExploreOpen(false);
    setSelected(null);
    setImmersive(value => !value);
  }
  useEffect(() => {
    if (standalone && new URLSearchParams(window.location.search).get("mode") === "map") setImmersive(true);
  }, [standalone]);
  useEffect(() => {
    if (!immersive) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") { setExploreOpen(false); setSelected(null); setImmersive(false); }
    }
    window.addEventListener("keydown", escape);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", escape); };
  }, [immersive]);
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "unavailable">("idle");
  const locationRequest = useRef(0);
  const [frameReady, setFrameReady] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [baseStyle, setBaseStyle] = useState<unknown>(null);
  const all = useMemo(() => restaurantMapFeatures(rows), [rows]);
  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase("nb-NO");
    return { ...all, features: all.features.filter(f => (!favoritesOnly || favorites.includes(f.id)) && (!term || (f.properties.name + " " + f.properties.address).toLocaleLowerCase("nb-NO").includes(term))) };
  }, [all, query, favorites, favoritesOnly]);
  const nearest = useMemo(() => location ? nearestMapFeatures(filtered.features, location, 4) : [], [filtered, location]);
  const current = filtered.features.find(f => f.id === selected);
  const currentEvidence = current && Object.hasOwn(evidence, current.id) ? evidence[current.id] ?? [] : [];

  useEffect(() => {
    if (!mapActivated) return;
    const controller = new AbortController();
    fetch(FYSEN_MAP_STYLE_URL, { signal: controller.signal, credentials: "omit" })
      .then(response => { if (!response.ok) throw new Error("Kartstil utilgjengelig"); return response.json(); })
      .then(style => setBaseStyle(fysenBaseStyle(style)))
      .catch(() => { if (!controller.signal.aborted) setStatus("error"); });
    return () => controller.abort();
  }, [mapActivated, mapAttempt]);

  useEffect(() => {
    function receive(event: MessageEvent) {
      if (event.source !== frame.current?.contentWindow || event.origin !== "null" || !event.data) return;
      if (event.data.type === "fysen-map-ready") setFrameReady(value => value + 1);
      if (event.data.type === "fysen-map-loaded") setStatus("ready");
      if (event.data.type === "fysen-map-error") setStatus("error");
      if (event.data.type === "fysen-map-select" && typeof event.data.slug === "string") { setSelected(event.data.slug); setExploreOpen(false); }
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
    if (!mapActivated || status !== "loading") return;
    const timer = window.setTimeout(() => setStatus("error"), 20000);
    return () => window.clearTimeout(timer);
  }, [status, mapActivated, mapAttempt]);

  useEffect(() => {
    if (mode !== "map" || !frameReady || !frame.current) return;
    const element = frame.current;
    const resize = () => element.contentWindow?.postMessage({ type: "fysen-map-resize" }, "*");
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    const id = window.requestAnimationFrame(resize);
    return () => { observer.disconnect(); window.cancelAnimationFrame(id); };
  }, [mode, frameReady, immersive]);

  useEffect(() => {
    if (status !== "ready" || mode !== "map" || !current) return;
    frame.current?.contentWindow?.postMessage({ type: "fysen-map-focus", coordinates: current.geometry.coordinates }, "*");
  }, [status, mode, current]);

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
    if (mode === "map") setExploreOpen(false);
  }

  function retryMap() {
    setFrameReady(0);
    setBaseStyle(null);
    setStatus("loading");
    setMapAttempt(value => value + 1);
  }

  return <div className={styles.workspace} data-immersive={immersive} data-standalone={standalone}>
    {standalone && <GlobalHeader city="Oslo" mapAction={<button className="fysenHeaderMapMode" type="button" aria-pressed={immersive} onClick={toggleImmersive}>{immersive ? "Avslutt kartmodus" : "Kartmodus"}</button>} />}
    <section className={styles.shell} aria-labelledby="restaurant-map-title" data-immersive={immersive}>
    <div className={styles.heading}>
      <div className={styles.titleRow}><h1 id="restaurant-map-title">{dishQuery ? "Menytreff på kartet" : "Kart · Oslo"}</h1><span>{filtered.features.length} spisesteder</span></div>
      <form className={styles.search} action={withPublicBasePath("/search")} method="get">
        <label htmlFor="map-dish-query">Hva har du lyst på?</label>
        <input id="map-dish-query" type="search" name="q" defaultValue={dishQuery} placeholder="Ramen, pizza, biff…" minLength={2} maxLength={80} required />
        <input type="hidden" name="city" value="Oslo" />
        <input type="hidden" name="view" value="map" />
        <button className={styles.more} type="submit">Finn retten på kartet</button>
        {dishQuery && <a href={withPublicBasePath("/kart")}>Alle spisesteder</a>}
      </form>
    </div>
    <div className={styles.mapMenus}>
      <nav className={styles.shortcuts} aria-label="Snarveier til rettsøk">
      {["Pizza", "Sushi", "Ramen", "Burger", "Taco", "Pasta"].map(dish => <a key={dish} href={withPublicBasePath("/search") + "?" + new URLSearchParams({ q: dish, city: "Oslo", view: "map" })} aria-current={dishQuery.toLocaleLowerCase("nb-NO") === dish.toLocaleLowerCase("nb-NO") ? "page" : undefined}>{dish}</a>)}
    </nav>
      <div className={styles.quickActions}>
        <button type="button" className={styles.more} onClick={() => setExploreOpen(value => !value)} aria-expanded={exploreOpen} aria-controls="fysen-map-explore">Utforsk {exploreOpen ? "▾" : "▴"}</button>
        <button type="button" className={styles.more} onClick={requestLocation} disabled={locationStatus === "loading"}>{locationStatus === "loading" ? "Henter…" : "Nær meg"}</button>
        <button type="button" className={styles.more} aria-pressed={favoritesOnly} onClick={() => { setFavoritesOnly(value => !value); setLimit(30); }}>♡ Favoritter</button>
        {!immersive && <button type="button" className={styles.more} onClick={() => { if (mode === "map") setMode("list"); else { setMapActivated(true); setMode("map"); } }}>{mode === "map" ? "Liste" : "Kart"}</button>}
        {!standalone && <button type="button" className={styles.more} onClick={toggleImmersive} aria-pressed={immersive}>{immersive ? "Avslutt kartmodus" : "Kartmodus"}</button>}
      </div>
    </div>
    <div className={styles.layout} data-mode={mode} data-explore={exploreOpen}>
      <div className={styles.mapColumn}>
        {mapActivated && <iframe key={mapAttempt} ref={frame} title="Fysens restaurantkart" sandbox="allow-scripts" srcDoc={fysenMapFrame} className={styles.map} hidden={mode === "list"} />}
        {mode === "map" && status === "error" && <p className={styles.notice} role="status">Bakgrunnskartet er ikke tilgjengelig akkurat nå. Restaurantlisten fungerer fortsatt. <button type="button" className={styles.more} onClick={retryMap}>Prøv kartet igjen</button> <button type="button" className={styles.more} onClick={() => { setImmersive(false); setMode("list"); }}>Vis liste</button></p>}
        {current && <article className={styles.selected} aria-live="polite">
          <div><h2>{current.properties.name}</h2><p>{current.properties.address}</p></div>
          <button type="button" onClick={() => setSelected(null)} aria-label="Lukk restaurantkort">Lukk</button>
          <button type="button" aria-pressed={favorites.includes(current.id)} onClick={() => toggleFavorite(current.id)}>{favorites.includes(current.id) ? "♥ Fjern favoritt" : "♡ Lagre restaurant"}</button>
          <MapRestaurantArtwork key={current.id} restaurant={current.properties} />
          <MapRestaurantMenu key={current.id + "-menu"} slug={current.id} />
          {currentEvidence.length > 0 && <ul className={styles.evidence}>
            {currentEvidence.map((entry, index) => <li key={entry.sourceUrl + entry.name + index}>
              {entry.origin !== "catalog" && <strong>{entry.name}{entry.price ? " · " + entry.price : ""}</strong>}
              {entry.date && <span>{entry.origin === "archive" ? "Meny sist registrert" : "Meny sist kontrollert"} <time dateTime={entry.date}>{entry.date.slice(0, 10)}</time></span>}
              <a href={entry.sourceUrl} target="_blank" rel="noreferrer">Se meny ↗</a>
              {ahaMinMatPilotEnabled && withPublicBasePath("/") === "/" && entry.origin === "live" && entry.menuItemId ? <SaveMinMatButton key={entry.menuItemId} menuItemId={entry.menuItemId} /> : null}
            </li>)}
          </ul>}
          <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(current.geometry.coordinates.slice().reverse().join(","))}`} target="_blank" rel="noreferrer">Veibeskrivelse ↗</a>
        </article>}
      </div>
      <aside id="fysen-map-explore" className={styles.explore} hidden={!exploreOpen && mode !== "list"} aria-label="Utforsk spisesteder">
        <div className={styles.exploreHeading}><h2>Utforsk</h2>{mode === "map" && <button className={styles.more} type="button" onClick={() => setExploreOpen(false)}>Lukk</button>}</div>
        <label className={styles.search}>Finn spisested
        <input type="search" value={query} placeholder="Navn eller gate" onChange={event => { setQuery(event.target.value); setSelected(null); setLimit(30); }} />
      </label>
        {location && <button className={styles.more} type="button" onClick={clearLocation}>Slå av posisjon</button>}
        {favoritesOnly && <p>Viser restaurantfavoritter lagret på denne enheten, ikke i AHA.</p>}
    {favoritesNotice && <p role="status">{favoritesNotice}</p>}
    {locationStatus === "unavailable" && <p role="status">Posisjon er ikke tilgjengelig. Du kan fortsatt utforske kartet.</p>}
        {location && <section className={styles.nearest} aria-label="Fire nærmeste spisesteder">
      <div className={styles.nearestTitle}><h2>{dishQuery ? "Nærmeste menytreff" : "Nærmeste spisesteder"}</h2><button className={styles.more} type="button" onClick={() => { setImmersive(false); setMode("list"); setLimit(filtered.features.length); }}>Se mer →</button></div>
      <p>Omtrentlig avstand i luftlinje. Posisjonen brukes bare på denne enheten.</p>
      {nearest.length ? <ul>{nearest.map(({ feature }) => <li key={feature.id}><button type="button" onClick={() => select(feature)}>{feature.properties.name}</button></li>)}</ul> : <p>Ingen spisesteder i dette søket.</p>}
    </section>}
        <div className={styles.list} aria-label="Spisesteder">
        <h2>Spisesteder</h2>
        {filtered.features.length === 0 && <p>Ingen spisesteder passer søket.</p>}
        <ul>{(location ? nearestMapFeatures(filtered.features, location, limit).map(item => item.feature) : filtered.features.slice(0, limit)).map(f => <li key={f.id}><button type="button" aria-pressed={current?.id === f.id} onClick={() => select(f)}><strong>{f.properties.name}</strong><span>{f.properties.address}</span>{dishQuery && mode === "list" && Object.hasOwn(evidence, f.id) && evidence[f.id]?.slice(0, 2).map((entry, i) => <span key={i}>{entry.name}{entry.price ? " · " + entry.price : ""}</span>)}</button></li>)}</ul>
        {limit < filtered.features.length && <button className={styles.more} type="button" onClick={() => setLimit(n => n + 30)}>Vis flere</button>}
        </div>
      </aside>
    </div>
    <p className={styles.credit}>Restaurantposisjoner fra Fysens katalog. Kart: <a href="https://openfreemap.org/">OpenFreeMap</a> © <a href="https://openmaptiles.org/">OpenMapTiles</a> · data fra <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>. {dishQuery ? "Menytreff er basert på registrerte kilder, ikke sanntidsbekreftelse av tilgjengelighet. Lignende retter vises ikke på kartet." : "Kartprikker bekrefter ikke åpningstid eller tilgjengelige retter."}</p>
  </section>
  </div>;
}
