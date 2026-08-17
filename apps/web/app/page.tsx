import { DishSearch } from "../components/dish-search";
import { FoodSketches } from "../components/food-sketches";
import { GlobalHeader } from "../components/global-header";

export default function HomePage() {
  return (
    <div className="homePage">
      <GlobalHeader />
      <main className="homeMain">
        <section className="homeHero" aria-labelledby="fysen-title">
          <FoodSketches />
          <div className="homeHeroContent">
            <h1 id="fysen-title">
              <span>Hva har du</span>
              <span>lyst på?</span>
            </h1>
            <div className="homeSearchWrap">
              <DishSearch />
              <p className="searchProof">Søk i ferske, sporbare restaurantmenyer.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
