import type { RecentlyAddedDishItem } from "@fysen/contracts/dish-browse";
import { browseDishDisplayName } from "../lib/dish-browse-display";
import { formatDishPrice } from "../lib/dish-price";
import { priceProvenanceLabel } from "../lib/price-provenance";
import { dishSearchHref } from "../lib/public-path";

export function RecentDishes({ dishes }: { readonly dishes: readonly RecentlyAddedDishItem[] }) {
  if (dishes.length === 0) return null;

  return (
    <section className="matlystFeaturedBlock" aria-labelledby="matlyst-recent-title">
      <div className="matlystFeaturedHeading">
        <div>
          <h3 id="matlyst-recent-title">Nye retter i Fysen</h3>
          <p>Registrert i Fysen de siste 14 dagene – ikke nødvendigvis nytt på restaurantens meny.</p>
        </div>
      </div>
      <div className="matlystFeaturedGrid">
        {dishes.map((dish) => (
          <article className="matlystFeaturedCard" key={dish.id}>
            <div className="matlystFeaturedTopline">
              <span>Ny i Fysen</span>
              <time dateTime={dish.detectedAt}>
                {new Intl.DateTimeFormat("nb-NO", { day: "numeric", month: "short", timeZone: "Europe/Oslo" }).format(new Date(dish.detectedAt))}
              </time>
            </div>
            <h4>{browseDishDisplayName(dish.name) || dish.name}</h4>
            <p className="matlystFeaturedRestaurant">{dish.restaurantName}</p>
            <p className="matlystFeaturedMuted">{dish.restaurantAddress}</p>
            <p className="matlystFeaturedPrice">{formatDishPrice(dish)}</p>
            {dish.priceMinor !== null ? (
              <p className="matlystFeaturedMuted">{priceProvenanceLabel(dish.sourceUrl)}</p>
            ) : null}
            <div className="matlystFeaturedLinks">
              <a href={dishSearchHref(dish.query)}>Finn retten <span aria-hidden="true">→</span></a>
              <a href={dish.sourceUrl} target="_blank" rel="noopener noreferrer">Se meny <span aria-hidden="true">↗</span></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
