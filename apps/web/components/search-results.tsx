"use client";

import type { DishSearchResult } from "@fysen/contracts";
import { useEffect, useState } from "react";
import { filterSearchResults, oneResultPerRestaurant } from "../lib/search-result-filters";
import { DishResult } from "./dish-result";
import { TrackedExternalLink } from "./tracked-external-link";
import styles from "./search-results.module.css";

function osmEmbedUrl(latitude: number, longitude: number): string {
  const deltaLatitude = 0.006;
  const deltaLongitude = 0.012;
  const bounds = [
    longitude - deltaLongitude,
    latitude - deltaLatitude,
    longitude + deltaLongitude,
    latitude + deltaLatitude,
  ].join(",");
  const params = new URLSearchParams({
    bbox: bounds,
    layer: "mapnik",
    marker: [latitude, longitude].join(","),
  });
  return "https://www.openstreetmap.org/export/embed.html?" + params.toString();
}

function osmPageUrl(latitude: number, longitude: number): string {
  const params = new URLSearchParams({ mlat: String(latitude), mlon: String(longitude) });
  return "https://www.openstreetmap.org/?" + params.toString() +
    "#map=16/" + latitude + "/" + longitude;
}

function directionsUrl(latitude: number, longitude: number): string {
  return "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(latitude + "," + longitude);
}

interface SearchResultsProps {
  readonly primaryResults: DishSearchResult[];
  readonly nearResults: DishSearchResult[];
  readonly hasLocation: boolean;
  readonly searchLimitReached: boolean;
}

export function SearchResults({ primaryResults, nearResults, hasLocation, searchLimitReached }: SearchResultsProps) {
  const [openNow, setOpenNow] = useState(false);
  const [priceCap, setPriceCap] = useState("");
  const [distanceCap, setDistanceCap] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  // Only card-initiated map navigation scrolls the viewport; filter changes
  // and map-marker selection must not unexpectedly move the user's position.
  const [mapNavigationRequest, setMapNavigationRequest] = useState(0);
  useEffect(() => {
    if (mapNavigationRequest === 0) return;
    document.getElementById("fysen-search-map")?.scrollIntoView({ block: "start" });
  }, [mapNavigationRequest]);

  function showRestaurantOnMap(restaurantSlug: string): void {
    setSelectedSlug(restaurantSlug);
    setShowMap(true);
    setMapNavigationRequest((request) => request + 1);
  }

  const filters = {
    openNow,
    maxPriceMinor: priceCap ? Number(priceCap) : null,
    maxDistanceMeters: hasLocation && distanceCap ? Number(distanceCap) : null,
  };
  const filteredPrimary = filterSearchResults(primaryResults, filters);
  const filteredNear = filterSearchResults(nearResults, filters);
  const visibleResults = [...filteredPrimary, ...filteredNear];
  const restaurants = oneResultPerRestaurant(visibleResults);
  const selected = restaurants.find((result) => result.restaurant.slug === selectedSlug) ?? restaurants[0] ?? null;
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
          <button
            className={styles.mapToggle}
            type="button"
            aria-expanded={showMap}
            aria-controls="fysen-search-map"
            onClick={() => setShowMap((value) => !value)}
          >
            {showMap ? "Skjul kart" : "Vis kart"}
          </button>
        </div>
        <p className={styles.limitNote}>
          Filtrene gjelder kun treffene som allerede er hentet
          {searchLimitReached ? " (maksimalt 20). Flere restauranter kan finnes." : "."}
          {" "}Ukjent pris, avstand eller åpningstid regnes ikke som et bekreftet filtertreff.
        </p>
      </div>

      {showMap ? (
        <section className={styles.mapPanel} id="fysen-search-map" aria-label="Kart over restauranter i de viste treffene">
          {selected ? (
            <>
              <div className={styles.mapChoices} role="group" aria-label="Velg restaurant på kartet">
                {restaurants.map((result) => (
                  <button
                    type="button"
                    key={result.restaurant.slug}
                    className={selected.restaurant.slug === result.restaurant.slug ? styles.selectedRestaurant : styles.restaurantChoice}
                    aria-pressed={selected.restaurant.slug === result.restaurant.slug}
                    onClick={() => setSelectedSlug(result.restaurant.slug)}
                  >
                    <strong>{result.restaurant.name}</strong>
                    <span>{result.match.type === "fuzzy" ? "Lignende rett – kontroller menyen" : "Sikkert menytreff"}</span>
                  </button>
                ))}
              </div>
              <div className={styles.mapArea}>
                <iframe
                  key={selected.restaurant.slug}
                  title={"Kart: " + selected.restaurant.name}
                  src={osmEmbedUrl(selected.restaurant.latitude, selected.restaurant.longitude)}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className={styles.mapFooter}>
                  <strong>{selected.restaurant.name}</strong>
                  <span>{selected.restaurant.address}, {selected.restaurant.city}</span>
                  <div className={styles.mapLinks}>
                    <a href={`#dish-${selected.menuItemId}`}>Til rettetreffet</a>
                    <a href={osmPageUrl(selected.restaurant.latitude, selected.restaurant.longitude)} target="_blank" rel="noreferrer">
                      Stort kart ↗
                    </a>
                    <TrackedExternalLink
                      href={directionsUrl(selected.restaurant.latitude, selected.restaurant.longitude)}
                      impressionId={selected.impressionId}
                      eventType="directions_clicked"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Veibeskrivelse ↗
                    </TrackedExternalLink>
                  </div>
                </div>
              </div>
            </>
          ) : <p className={styles.empty}>Ingen restauranter matcher filtrene. Nullstill et filter for å se kartet.</p>}
          <p className={styles.mapNote}>
            Kartet viser én valgt restaurant om gangen. Kartdata lastes fra OpenStreetMap først når du åpner kartet.
          </p>
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
          {filteredPrimary.map((result) => <DishResult result={result} onShowOnMap={showRestaurantOnMap} key={result.menuItemId} />)}
        </div>
      ) : null}

      {filteredNear.length > 0 ? (
        <section className="nearResults" aria-labelledby="near-results-title">
          <h2 id="near-results-title">Lignende retter</h2>
          <p className="nearResultsLead">
            Dette er bare navnelignende oppføringer, ikke sikre bevis på at den søkte retten serveres.
          </p>
          <div className="resultList">
            {filteredNear.map((result) => <DishResult result={result} onShowOnMap={showRestaurantOnMap} key={result.menuItemId} />)}
          </div>
        </section>
      ) : null}
    </section>
  );
}
