"use client";

import type { DishSearchResult } from "@fysen/contracts";
import { useState } from "react";
import { usePreviewLocale } from "./language-preview";
import { resultText, type ResultMessageKey } from "../lib/result-messages";
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
  const locale = usePreviewLocale();
  const t = (key: ResultMessageKey, values?: Record<string, string | number>) => resultText(locale, key, values);
  const [openNow, setOpenNow] = useState(false);
  const [priceCap, setPriceCap] = useState("");
  const [distanceCap, setDistanceCap] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

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
    <section lang={locale} className={styles.surface} aria-label={t("results")}>
      <div className={styles.filterPanel}>
        <div className={styles.filters} role="group" aria-label={t("filters")}>
          <label className={styles.checkbox}>
            <input type="checkbox" checked={openNow} onChange={(event) => setOpenNow(event.target.checked)} />
            {t("openNow")}
          </label>
          <label className={styles.filterField}>
            {t("maxPrice")}
            <select value={priceCap} onChange={(event) => setPriceCap(event.target.value)}>
              <option value="">{t("allPrices")}</option>
              <option value="15000">150 kr</option>
              <option value="25000">250 kr</option>
              <option value="35000">350 kr</option>
            </select>
          </label>
          {hasLocation ? (
            <label className={styles.filterField}>
              {t("distance")}
              <select value={distanceCap} onChange={(event) => setDistanceCap(event.target.value)}>
                <option value="">{t("allDistances")}</option>
                <option value="1000">{t("within", { km: 1 })}</option>
                <option value="3000">{t("within", { km: 3 })}</option>
                <option value="5000">{t("within", { km: 5 })}</option>
              </select>
            </label>
          ) : null}
          {filterActive ? (
            <button className={styles.reset} type="button" onClick={resetFilters}>{t("reset")}</button>
          ) : null}
        </div>
        <div className={styles.viewControls}>
          <p className={styles.count} role="status" aria-live="polite">
            {t("count", { visible: visibleResults.length, total })}
          </p>
          <button
            className={styles.mapToggle}
            type="button"
            aria-expanded={showMap}
            aria-controls="fysen-search-map"
            onClick={() => setShowMap((value) => !value)}
          >
            {showMap ? t("hideMap") : t("showMap")}
          </button>
        </div>
        <p className={styles.limitNote}>
          {t("filterScope")}
          {searchLimitReached ? t("limit") : "."}
          {" "}{t("unknownFilter")}
        </p>
      </div>

      {showMap ? (
        <section className={styles.mapPanel} id="fysen-search-map" aria-label={t("mapRegion")}>
          {selected ? (
            <>
              <div className={styles.mapChoices} role="group" aria-label={t("chooseRestaurant")}>
                {restaurants.map((result) => (
                  <button
                    type="button"
                    key={result.restaurant.slug}
                    className={selected.restaurant.slug === result.restaurant.slug ? styles.selectedRestaurant : styles.restaurantChoice}
                    aria-pressed={selected.restaurant.slug === result.restaurant.slug}
                    onClick={() => setSelectedSlug(result.restaurant.slug)}
                  >
                    <strong>{result.restaurant.name}</strong>
                    <span>{result.match.type === "fuzzy" ? t("similar") : t("verified")}</span>
                  </button>
                ))}
              </div>
              <div className={styles.mapArea}>
                <iframe
                  key={selected.restaurant.slug}
                  title={t("mapTitle", { name: selected.restaurant.name })}
                  src={osmEmbedUrl(selected.restaurant.latitude, selected.restaurant.longitude)}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className={styles.mapFooter}>
                  <strong>{selected.restaurant.name}</strong>
                  <span>{selected.restaurant.address}, {selected.restaurant.city}</span>
                  <div className={styles.mapLinks}>
                    <a href={osmPageUrl(selected.restaurant.latitude, selected.restaurant.longitude)} target="_blank" rel="noreferrer">
                      {t("largeMap")} ↗
                    </a>
                    <TrackedExternalLink
                      href={directionsUrl(selected.restaurant.latitude, selected.restaurant.longitude)}
                      impressionId={selected.impressionId}
                      eventType="directions_clicked"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t("directions")} ↗
                    </TrackedExternalLink>
                  </div>
                </div>
              </div>
            </>
          ) : <p className={styles.empty}>{t("emptyMap")}</p>}
          <p className={styles.mapNote}>
            {t("mapNote")}
          </p>
        </section>
      ) : null}

      {visibleResults.length === 0 ? (
        <div className={styles.empty} role="status">
          {t("emptyFilter")}
          {filterActive ? <button type="button" onClick={resetFilters}>{t("allFetched")}</button> : null}
        </div>
      ) : null}

      {filteredPrimary.length > 0 ? (
        <div className="resultList">
          {filteredPrimary.map((result) => <DishResult result={result} key={result.menuItemId} />)}
        </div>
      ) : null}

      {filteredNear.length > 0 ? (
        <section className="nearResults" aria-labelledby="near-results-title">
          <h2 id="near-results-title">{t("nearTitle")}</h2>
          <p className="nearResultsLead">
            {t("nearNote")}
          </p>
          <div className="resultList">
            {filteredNear.map((result) => <DishResult result={result} key={result.menuItemId} />)}
          </div>
        </section>
      ) : null}
    </section>
  );
}
