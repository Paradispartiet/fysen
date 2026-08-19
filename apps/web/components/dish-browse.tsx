import type { DishBrowseResponse } from "@fysen/contracts/dish-browse";
import { dishSearchHref } from "../lib/public-path";
import { SearchState } from "./search-state";

export function DishBrowse({
  city,
  data,
  loading = false,
  error = null,
}: {
  city: string;
  data: DishBrowseResponse | null;
  loading?: boolean;
  error?: string | null;
}) {
  return (
    <section className="dishBrowse" aria-labelledby="dish-browse-title">
      <header className="dishBrowseHeader">
        <p className="eyebrow">{city}</p>
        <h1 id="dish-browse-title">Alle retter i {city}</h1>
        <p>
          Retter Fysen finner på ferske restaurantmenyer nå. Velg en rett for å se de samme restauranttreffene som i søket.
        </p>
      </header>

      {loading ? <p className="dishBrowseStatus">Henter retter fra ferske menyer …</p> : null}

      {!loading && error ? (
        <SearchState title="Kunne ikke hente rettene akkurat nå." body={error} />
      ) : null}

      {!loading && !error && data && data.dishes.length === 0 ? (
        <SearchState
          title={`Ingen ferske retter i ${city} akkurat nå.`}
          body="Når Fysen har ferske menydata i byen, vises rettene her."
        />
      ) : null}

      {!loading && !error && data && data.dishes.length > 0 ? (
        <>
          <p className="dishBrowseCount">{data.count} retter</p>
          <div className="dishBrowseList">
            {data.dishes.map((dish) => (
              <a className="dishBrowseItem" href={dishSearchHref(dish.query, data.city)} key={dish.id}>
                <strong>{dish.name}</strong>
                <span>
                  {dish.restaurantCount} {dish.restaurantCount === 1 ? "restaurant" : "restauranter"}
                </span>
              </a>
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
