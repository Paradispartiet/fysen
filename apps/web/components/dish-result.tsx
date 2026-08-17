import type { DishSearchResult } from "@fysen/contracts";
import { DishComposition } from "./dish-composition";
import { FreshnessStatus } from "./freshness-status";
import styles from "./dish-result.module.css";
import { TrackedExternalLink } from "./tracked-external-link";

function formatNokAmount(priceMinor: number): string {
  return new Intl.NumberFormat("nb-NO", {
    maximumFractionDigits: priceMinor % 100 === 0 ? 0 : 2,
  }).format(priceMinor / 100);
}

function formatExactPrice(priceMinor: number, currency: string): string {
  if (currency === "NOK") return `${formatNokAmount(priceMinor)} kr`;

  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency,
    maximumFractionDigits: priceMinor % 100 === 0 ? 0 : 2,
  }).format(priceMinor / 100);
}

function formatPrice(dish: DishSearchResult["dish"]): string {
  if (dish.priceMinor === null) return "Pris ikke oppgitt";

  if (dish.priceKind === "from") {
    return `fra ${formatExactPrice(dish.priceMinor, dish.currency)}`;
  }

  if (dish.priceKind === "multiple" && dish.priceMaxMinor !== null) {
    if (dish.currency === "NOK") {
      return `${formatNokAmount(dish.priceMinor)}–${formatNokAmount(dish.priceMaxMinor)} kr`;
    }
    return `${formatExactPrice(dish.priceMinor, dish.currency)}–${formatExactPrice(dish.priceMaxMinor, dish.currency)}`;
  }

  return formatExactPrice(dish.priceMinor, dish.currency);
}

function formatDistance(distanceMeters: number): string {
  if (distanceMeters < 1_000) {
    const rounded = Math.max(10, Math.round(distanceMeters / 10) * 10);
    return `${new Intl.NumberFormat("nb-NO").format(rounded)} m unna`;
  }

  return `${new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 1 }).format(distanceMeters / 1_000)} km unna`;
}

function openingLabel(result: DishSearchResult): string {
  if (result.opening.state === "open") return "Kjøkkenet er åpent nå";
  if (result.opening.state === "closed") return "Kjøkkenet er stengt nå";
  return "Åpningstid ukjent";
}

function directionsUrl(latitude: number, longitude: number): string {
  const destination = encodeURIComponent(`${latitude},${longitude}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}

export function DishResult({ result }: { result: DishSearchResult }) {
  const actionsClassName = styles.actions ?? "";
  const primaryActionClassName = styles.primaryAction ?? "";

  return (
    <article className="dishResult">
      <div className="dishResultTopline">
        <div className="dishResultIdentity">
          <h2>{result.dish.name}</h2>
          <p className="restaurantName">{result.restaurant.name}</p>
        </div>
        <p className={result.dish.priceMinor === null ? "dishPrice isMissing" : "dishPrice"}>
          {formatPrice(result.dish)}
        </p>
      </div>

      {result.dish.description ? <p className="dishDescription">{result.dish.description}</p> : null}
      <DishComposition description={result.dish.description} />

      <div className="dishResultFacts">
        <span>{result.restaurant.address}, {result.restaurant.city}</span>
        {result.distanceMeters !== null ? <span>{formatDistance(result.distanceMeters)}</span> : null}
        <span>{openingLabel(result)}</span>
        {result.dish.sectionName ? <span>{result.dish.sectionName}</span> : null}
      </div>

      <div className="dishResultBottomline">
        <FreshnessStatus checkedAt={result.menu.lastCheckedAt} freshUntil={result.menu.freshUntil} />
        <div className={actionsClassName}>
          {result.actions.booking ? (
            <TrackedExternalLink
              className={primaryActionClassName}
              href={result.actions.booking.url}
              impressionId={result.impressionId}
              eventType="booking_clicked"
              target="_blank"
              rel="noreferrer"
            >
              Bestill bord
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
              Bestill mat
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
            Se meny <span aria-hidden="true">↗</span>
          </TrackedExternalLink>
          {result.opening.sourceUrl ? (
            <a className="evidenceLink" href={result.opening.sourceUrl} target="_blank" rel="noreferrer">
              Åpningstider <span aria-hidden="true">↗</span>
            </a>
          ) : null}
          {result.restaurant.websiteUrl ? (
            <TrackedExternalLink
              className="evidenceLink"
              href={result.restaurant.websiteUrl}
              impressionId={result.impressionId}
              eventType="restaurant_clicked"
              target="_blank"
              rel="noreferrer"
            >
              Restaurant <span aria-hidden="true">↗</span>
            </TrackedExternalLink>
          ) : null}
          <TrackedExternalLink
            className="evidenceLink"
            href={directionsUrl(result.restaurant.latitude, result.restaurant.longitude)}
            impressionId={result.impressionId}
            eventType="directions_clicked"
            target="_blank"
            rel="noreferrer"
          >
            Gå dit <span aria-hidden="true">↗</span>
          </TrackedExternalLink>
        </div>
      </div>
    </article>
  );
}
