import { dishSearchHref } from "../lib/public-path";

type DishSuggestion = {
  label: string;
  query: string;
};

type Cuisine = {
  name: string;
  context: string;
  fact: string;
  dishes: DishSuggestion[];
};

const cuisines: Cuisine[] = [
  {
    name: "Asiatisk",
    context: "Japan · Kina · Thailand · Vietnam",
    fact: "En bred samlebetegnelse: ramen, bao, pad thai og pho kommer fra ulike kjøkkentradisjoner.",
    dishes: [
      { label: "Ramen", query: "ramen" },
      { label: "Bao", query: "bao" },
      { label: "Pad thai", query: "pad thai" },
      { label: "Pho", query: "pho" },
    ],
  },
  {
    name: "Indisk",
    context: "Mange regionale kjøkken",
    fact: "Biryani finnes i mange regionale varianter i Sør-Asia, med ulike krydder, råvarer og tilberedninger.",
    dishes: [
      { label: "Butter chicken", query: "butter chicken" },
      { label: "Biryani", query: "biryani" },
      { label: "Dosa", query: "dosa" },
      { label: "Samosa", query: "samosa" },
    ],
  },
  {
    name: "Fast food",
    context: "Rask servering · mange tradisjoner",
    fact: "Fast food beskriver først og fremst serveringsform, ikke ett bestemt kjøkken.",
    dishes: [
      { label: "Burger", query: "burger" },
      { label: "Fried chicken", query: "fried chicken" },
      { label: "Fries", query: "fries" },
      { label: "Hot dog", query: "hot dog" },
    ],
  },
  {
    name: "Italiensk",
    context: "Roma · Napoli · regionale tradisjoner",
    fact: "Carbonara forbindes særlig med Roma, mens pizza har sterke røtter i Napoli.",
    dishes: [
      { label: "Carbonara", query: "carbonara" },
      { label: "Pizza", query: "pizza" },
      { label: "Risotto", query: "risotto" },
      { label: "Tiramisù", query: "tiramisu" },
    ],
  },
  {
    name: "Midtøsten",
    context: "Levant · Egypt · naboregioner",
    fact: "Falafel lages ofte av kikerter eller favabønner; råvaren varierer mellom tradisjoner.",
    dishes: [
      { label: "Falafel", query: "falafel" },
      { label: "Shawarma", query: "shawarma" },
      { label: "Hummus", query: "hummus" },
      { label: "Manakish", query: "manakish" },
    ],
  },
  {
    name: "Mexicansk",
    context: "Mange regionale kjøkken",
    fact: "Taco er en matform med mange regionale varianter, ikke én enkelt oppskrift.",
    dishes: [
      { label: "Tacos", query: "tacos" },
      { label: "Quesadilla", query: "quesadilla" },
      { label: "Birria", query: "birria" },
      { label: "Tamales", query: "tamales" },
    ],
  },
];

export function CuisineExplorer() {
  return (
    <section className="cuisineExplorer" aria-labelledby="cuisine-explorer-title">
      <div className="foodSectionHeading">
        <div>
          <p className="foodSectionEyebrow">Matlyst</p>
          <h2 id="cuisine-explorer-title">Utforsk kjøkken</h2>
        </div>
        <p>Velg en rett, lær litt om tradisjonen, og se hvem som faktisk har den på menyen.</p>
      </div>

      <div className="cuisineGrid">
        {cuisines.map((cuisine) => (
          <article className="cuisineCard" key={cuisine.name}>
            <div className="cuisineCardHeading">
              <h3>{cuisine.name}</h3>
              <p>{cuisine.context}</p>
            </div>
            <div className="cuisineDishList" aria-label={`Retter i ${cuisine.name}`}>
              {cuisine.dishes.map((dish) => (
                <a href={dishSearchHref(dish.query)} key={dish.query}>{dish.label}</a>
              ))}
            </div>
            <div className="cuisineFact">
              <span>Visste du?</span>
              <p>{cuisine.fact}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
