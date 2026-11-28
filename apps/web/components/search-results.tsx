"use client";

import type { DishSearchResult } from "@fysen/contracts";
import { useState } from "react";
import { filterSearchResults } from "../lib/search-result-filters";
import { DishResult } from "./dish-result";
import { RestaurantMap } from "./restaurant-map";
import { restaurantCoordinateRows } from "../lib/restaurant-coordinate-data";
import { formatDishPrice } from "../lib/dish-price";
import { safeMapMenuUrl, type MapEvidenceBySlug } from "../lib/map-menu-evidence";
import styles from "./search-results.module.css";

interface SearchResultsProps {
  readonly primaryResults: DishSearchResult[];
  readonly nearResults: DishSearchResult[];
  readonly hasLocation: boolean;
  readonly searchLimitReached: boolean;
  readonly city?: string;
  readonly query?: string;
  readonly mapAlreadyVisible?: boolean;
}

export function SearchResults({ primaryResults, nearResults, hasLocation, searchLimitReached, city = "Oslo", query = "", mapAlreadyVisible = false }: SearchResultsProps) {
  const [openNow, setOpenNow] = useState(false);
  const [priceCap, setPriceCap] = useState("");
  const [distanceCap, setDistanceCap] = useState("");
  const [showMap, setShowMap] = useState(false);

  const filters = {
    openNow,
    maxPriceMinor: priceCap ? Number(priceCap) : null,
    maxDistanceMeters: hasLocation && distanceCap ? Number(distanceCap) : null,
  };
  const filteredPrimary = filterSearchResults(primaryResults, filters);
  const filteredNear = filterSearchResults(nearResults, filters);
  const visibleResults = [...filteredPrimary, ...filteredNear];
  const showOsloMap = city.toLocaleLowerCase("nb-NO") === "oslo" && !mapAlreadyVisible;
  const menuEvidence = new Map<string, MapEvidenceBySlug[string]>();
  for (const result of filteredPrimary) {
    if (!safeMapMenuUrl(result.menu.sourceUrl)) continue;
    const entries = menuEvidence.get(result.restaurant.slug) ?? [];
    entries.push({ name: result.dish.name, sourceUrl: result.menu.sourceUrl, date: result.menu.lastCheckedAt,
      price: formatDishPrice(result.dish), origin: "live", menuItemId: result.menuItemId });
    menuEvidence.set(result.restaurant.slug, entries);
  }
  const evidence = Object.fromEntries(menuEvidence);
  const mappedRows = restaurantCoordinateRows.filter(row => menuEvidence.has(row[0]));
  const filterActive = openNow || priceCap !== "" || (hasLocation && distanceCap !== "");
  const total = primaryResults.length + nearResults.length;

  function resetFilters() {
    setOpenNow(false);
    setPriceCap("");
    setDistanceCap("");
  }

  return (
    <section className={styles.surface} aria-label="Søkeresultater og filtre">
      <div className={styles.filterPanel}>
        <div className={styles.filters} role="group" aria-label="Filtrer viste treff">
          <label className={styles.checkbox}>
            <input type="checkbox" checked={openNow} onChange={(event) => setOpenNow(event.target.checked)} />
            Kjøkken åpent nå
          </label>
          <label className={styles.filterField}>
            Makspris
            <select value={priceCap} onChange={(event) => setPriceCap(event.target.value)}>
              <option value="">Alle priser</option>
              <option value="15000">150 kr</option>
              <option value="25000">250 kr</option>
              <option value="35000">350 kr</option>
            </select>
          </label>
          {hasLocation ? (
            <label className={styles.filterField}>
              Avstand
              <select value={distanceCap} onChange={(event) => setDistanceCap(event.target.value)}>
                <option value="">Alle avstander</option>
                <option value="1000">Innen 1 km</option>
                <option value="3000">Innen 3 km</option>
                <option value="5000">Innen 5 km</option>
              </select>
            </label>
          ) : null}
          {filterActive ? (
            <button className={styles.reset} type="button" onClick={resetFilters}>Nullstill filtre</button>
          ) : null}
        </div>
        <div className={styles.viewControls}>
          <p className={styles.count} role="status" aria-live="polite">
            Viser {visibleResults.length} av {total} hentede rettetreff
          </p>
          {showOsloMap ? <button
            className={styles.mapToggle}
            type="button"
            aria-expanded={showMap}
            aria-controls="fysen-search-map"
            onClick={() => setShowMap((value) => !value)}
          >
            {showMap ? "Skjul kart" : "Vis kart"}
          </button> : null}
        </div>
        <p className={styles.limitNote}>
          Filtrene gjelder kun treffene som allerede er hentet
          {searchLimitReached ? " (API-et har ikke bekreftet fullstendig dekning). Flere restauranter kan finnes." : "."}
          {" "}Ukjent pris, avstand eller åpningstid regnes ikke som et bekreftet filtertreff.
        </p>
      </div>

      {showMap && showOsloMap ? (
        <section className={styles.mapPanel} id="fysen-search-map" aria-label="Kart over restauranter i de viste treffene">
          {mappedRows.length ? <RestaurantMap rows={mappedRows} dishQuery={query} evidence={evidence} /> :
            <p className={styles.empty}>Ingen sikre menytreff med katalogposisjon matcher filtrene.</p>}
          <p className={styles.mapNote}>Kartet viser sikre menytreff som passer filtrene. Lignende retter vises ikke på kartet.</p>
        </section>
      ) : null}

      {visibleResults.length === 0 ? (
        <div className={styles.empty} role="status">
          Ingen av de hentede treffene matcher filtrene.
          {filterActive ? <button type="button" onClick={resetFilters}>Vis alle hentede treff</button> : null}
        </div>
      ) : null}

      {filteredPrimary.length > 0 ? (
        <div className="resultList">
          {filteredPrimary.map((result) => <DishResult result={result} key={result.menuItemId} />)}
        </div>
      ) : null}

      {filteredNear.length > 0 ? (
        <section className="nearResults" aria-labelledby="near-results-title">
          <h2 id="near-results-title">Lignende retter</h2>
          <p className="nearResultsLead">
            Dette er bare navnelignende oppføringer, ikke sikre bevis på at den søkte retten serveres.
          </p>
          <div className="resultList">
            {filteredNear.map((result) => <DishResult result={result} key={result.menuItemId} />)}
          </div>
        </section>
      ) : null}
    </section>
  );
}
