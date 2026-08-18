import { CuisineExplorer } from "../components/cuisine-explorer";
import { DishLearningSection } from "../components/dish-learning-section";
import { DishSearch } from "../components/dish-search";
import { FoodHeroIllustration } from "../components/food-hero-illustration";
import { GlobalHeader } from "../components/global-header";

export default function HomePage() {
  return (
    <div className="homePage">
      <GlobalHeader />
      <main className="homeMain">
        <section className="homeHero" aria-labelledby="fysen-title">
          <div className="homeHeroTopline">
            <div className="homeHeroContent">
              <h1 id="fysen-title">
                <span>Hva har du</span>
                <span>lyst på?</span>
              </h1>
            </div>
            <FoodHeroIllustration />
          </div>
          <div className="homeSearchWrap">
            <DishSearch />
            <p className="searchProof">Søk etter en rett og se hvilke restauranter som har den på menyen nå.</p>
          </div>
        </section>
        <CuisineExplorer />
        <DishLearningSection />
      </main>
    </div>
  );
}
