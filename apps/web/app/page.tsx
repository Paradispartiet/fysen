import { DishSearch } from "../components/dish-search";
import { FoodHeroIllustration } from "../components/food-hero-illustration";
import { GlobalHeader } from "../components/global-header";
import { SuggestionRail } from "../components/suggestion-rail";

export default function HomePage() {
  return (
    <div className="homePage">
      <GlobalHeader />
      <main className="homeMain">
        <section className="homeHero" aria-labelledby="fysen-title">
          <FoodHeroIllustration />
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
        <SuggestionRail />
      </main>
    </div>
  );
}
