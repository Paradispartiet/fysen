import type { PopularDishItem } from "@fysen/contracts/dish-browse";
import { browseDishDisplayName } from "../lib/dish-browse-display";
import { dishSearchHref } from "../lib/public-path";

export function PopularDishes({ dishes }: { readonly dishes: readonly PopularDishItem[] }) {
  if (dishes.length === 0) return null;

  return (
    <section className="matlystFeaturedBlock" aria-labelledby="matlyst-popular-title">
      <div className="matlystFeaturedHeading">
        <div>
          <h3 id="matlyst-popular-title">Mest søkt</h3>
          <p>Rettene folk har søkt mest etter i Oslo de siste 30 dagene, med ferske menytreff.</p>
        </div>
      </div>
      <div className="matlystPopularGrid">
        {dishes.map((dish, index) => (
          <a className="matlystPopularCard" href={dishSearchHref(dish.query)} key={dish.id}>
            <span className="matlystPopularRank">{index + 1}</span>
            <span className="matlystPopularIdentity">
              <strong>{browseDishDisplayName(dish.name) || dish.name}</strong>
              <small>{dish.restaurantCount} {dish.restaurantCount === 1 ? "restaurant" : "restauranter"} med retten nå</small>
            </span>
            <span className="matlystPopularAction" aria-hidden="true">→</span>
          </a>
        ))}
      </div>
    </section>
  );
}
