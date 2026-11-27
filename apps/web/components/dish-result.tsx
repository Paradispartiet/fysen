"use client";

import { usePreviewLocale } from "./language-preview";
import { resultText, type ResultMessageKey } from "../lib/result-messages";
import type { PreviewLocale } from "../lib/locale-messages";
import { translate } from "../lib/locale-messages";
import { locales } from "../lib/locales";
import type { DishSearchResult } from "@fysen/contracts";
import { ahaMinMatPilotEnabled } from "../lib/aha-min-mat-pilot";
import { formatDishPrice } from "../lib/dish-price";
import { priceProvenanceLabel } from "../lib/price-provenance";
import { restaurantClaimHref } from "../lib/public-path";
import { DishComposition } from "./dish-composition";
import { FoodIllustration } from "./food-illustration";
import { illustrationForDishName } from "./food-illustration-match";
import { SaveMinMatButton } from "./save-min-mat-button";
import styles from "./dish-result.module.css";
import { TrackedExternalLink } from "./tracked-external-link";

function formatDistance(distanceMeters: number, locale: PreviewLocale): string {
  if (distanceMeters < 1_000) {
    const rounded = Math.max(10, Math.round(distanceMeters / 10) * 10);
    return resultText(locale, "away", { distance: `${new Intl.NumberFormat(locales[locale].intl).format(rounded)} m` });
  }

  return resultText(locale, "away", { distance: `${new Intl.NumberFormat(locales[locale].intl, { maximumFractionDigits: 1 }).format(distanceMeters / 1_000)} km` });
}

function openingLabel(result: DishSearchResult, locale: PreviewLocale): string {
  if (result.opening.state === "open") return resultText(locale, "open");
  if (result.opening.state === "closed") return resultText(locale, "closed");
  return resultText(locale, "unknownOpening");
}

function directionsUrl(latitude: number, longitude: number): string {
  const destination = encodeURIComponent(`${latitude},${longitude}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}

export function DishResult({ result }: { result: DishSearchResult }) {
  const locale = usePreviewLocale();
  const t = (key: ResultMessageKey, values?: Record<string, string | number>) => resultText(locale, key, values);
  const actionsClassName = styles.actions ?? "";
  const primaryActionClassName = styles.primaryAction ?? "";
  const claimLinkClassName = styles.claimLink ?? "";

  return (
    <article className="dishResult">
      <div className="dishResultTopline">
        <div className="dishResultIdentity">
          <div className={styles.dishNameWithArtwork}>
            {illustrationForDishName(result.dish.name) ? (
              <FoodIllustration
                name={illustrationForDishName(result.dish.name)!}
                className={styles.dishArtwork ?? ""}
                size={48}
              />
            ) : null}
            <h2>{result.dish.name}</h2>
          </div>
          {result.match.type === "fuzzy" ? (
            <p className={styles.fuzzyNotice ?? ""}>{t("similar")}</p>
          ) : null}
          <p className="restaurantName">
            {result.restaurant.websiteUrl ? (
              <TrackedExternalLink
                className="restaurantLink"
                href={result.restaurant.websiteUrl}
                impressionId={result.impressionId}
                eventType="restaurant_clicked"
                target="_blank"
                rel="noreferrer"
              >
                {result.restaurant.name} <span aria-hidden="true">↗</span>
              </TrackedExternalLink>
            ) : (
              result.restaurant.name
            )}
          </p>
          <a className={claimLinkClassName} href={restaurantClaimHref(result.restaurant.slug)}>
            {t("claim", { name: result.restaurant.name })}
          </a>
        </div>
        <div className={styles.priceBlock ?? ""}>
          <p className={result.dish.priceMinor === null ? "dishPrice isMissing" : "dishPrice"}>
            {formatDishPrice(result.dish, locale)}
          </p>
          {result.dish.priceMinor !== null ? (
            <span className={styles.priceEvidence ?? ""}>{priceProvenanceLabel(result.menu.sourceUrl)}</span>
          ) : null}
        </div>
      </div>

      {result.dish.description ? <p className="dishDescription">{result.dish.description}</p> : null}
      <DishComposition description={result.dish.description} />

      <div className="dishResultFacts">
        <span>{result.restaurant.address}, {result.restaurant.city}</span>
        {result.distanceMeters !== null ? <span>{formatDistance(result.distanceMeters, locale)}</span> : null}
        {result.dish.sectionName ? <span>{result.dish.sectionName}</span> : null}
      </div>

      <div className="dishResultBottomline">
        <div className="dishResultSignals">
          <span className="openingStatus" data-state={result.opening.state}>{openingLabel(result, locale)}</span>
          <span>{t("checked")} <time dateTime={result.menu.lastCheckedAt}>{result.menu.lastCheckedAt.slice(0, 10)}</time></span>
        </div>
        <div className={actionsClassName}>
          {ahaMinMatPilotEnabled ? <SaveMinMatButton menuItemId={result.menuItemId} /> : null}
          {result.actions.booking ? (
            <TrackedExternalLink
              className={primaryActionClassName}
              href={result.actions.booking.url}
              impressionId={result.impressionId}
              eventType="booking_clicked"
              target="_blank"
              rel="noreferrer"
            >
              {t("book")}
            </TrackedExternalLink>
          ) : null}
          {result.actions.order ? (
            <TrackedExternalLink
              className={primaryActionClassName}
              href={result.actions.order.url}
              impressionId={result.impressionId}
              eventType="order_clicked"
              target="_blank"
              rel="noreferrer"
            >
              {t("order")}
            </TrackedExternalLink>
          ) : null}
          <TrackedExternalLink
            className="evidenceLink"
            href={result.menu.sourceUrl}
            impressionId={result.impressionId}
            eventType="menu_clicked"
            target="_blank"
            rel="noreferrer"
          >
            {translate(locale, "menu")} <span aria-hidden="true">↗</span>
          </TrackedExternalLink>
          {result.opening.sourceUrl ? (
            <a className="evidenceLink" href={result.opening.sourceUrl} target="_blank" rel="noreferrer">
              {t("hours")} <span aria-hidden="true">↗</span>
            </a>
          ) : null}
          <TrackedExternalLink
            className="evidenceLink"
            href={directionsUrl(result.restaurant.latitude, result.restaurant.longitude)}
            impressionId={result.impressionId}
            eventType="directions_clicked"
            target="_blank"
            rel="noreferrer"
          >
            {t("go")} <span aria-hidden="true">↗</span>
          </TrackedExternalLink>
        </div>
      </div>
    </article>
  );
}
