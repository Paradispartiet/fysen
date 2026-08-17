import { DishSearch } from "../components/dish-search";
import { GlobalHeader } from "../components/global-header";

export default function HomePage() {
  return (
    <div className="homePage">
      <GlobalHeader />
      <main className="homeMain">
        <section className="homeHero" aria-labelledby="fysen-title">
          <h1 id="fysen-title">Hva har du<br className="desktopBreak" /> lyst på?</h1>
          <div className="homeSearchWrap">
            <DishSearch />
            <p className="searchProof">Søk i ferske, sporbare restaurantmenyer.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
