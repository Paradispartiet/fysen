import { DishSearch } from "../../components/dish-search";
import { GlobalHeader } from "../../components/global-header";

export default function SearchLoading() {
  return (
    <div className="resultsPage">
      <GlobalHeader results>
        <DishSearch compact buttonLabel="Søk" inputId="loading-dish-query" />
      </GlobalHeader>
      <main className="resultsMain">
        <section className="resultsContent" aria-busy="true" aria-label="Laster søkeresultater">
          <div className="resultsIntro">
            <p className="eyebrow">Oslo</p>
            <div className="skeletonLine skeletonTitle" />
            <div className="skeletonLine skeletonRestaurant" />
          </div>
          <div className="loadingResults">
            {[0, 1, 2].map((item) => (
              <div className="loadingResult" key={item}>
                <div className="skeletonLine skeletonTitle" />
                <div className="skeletonLine skeletonRestaurant" />
                <div className="skeletonLine skeletonBody" />
                <div className="skeletonLine skeletonMeta" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
