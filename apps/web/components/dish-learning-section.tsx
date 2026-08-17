import { dishSearchHref } from "../lib/public-path";

const learningDishes = [
  {
    name: "Ramen",
    region: "Japan",
    summary: "Japansk nudelsuppe med røtter i kinesiske nudeltradisjoner, utviklet i mange regionale stiler.",
  },
  {
    name: "Biryani",
    region: "Sør-Asia",
    summary: "Aromatisk risrett med mange regionale varianter og ulike kombinasjoner av krydder, grønnsaker og proteiner.",
  },
  {
    name: "Falafel",
    region: "Midtøsten",
    summary: "Friterte boller av kikerter eller favabønner; råvaren og krydringen varierer mellom tradisjoner.",
  },
] as const;

export function DishLearningSection() {
  return (
    <section className="dishLearningSection" aria-labelledby="dish-learning-title">
      <div className="foodSectionHeading foodSectionHeadingLearning">
        <div>
          <p className="foodSectionEyebrow">Litt matkunnskap</p>
          <h2 id="dish-learning-title">Lær en ny rett</h2>
        </div>
        <p>Matnotatene er generell kunnskap. Restaurantfakta i Fysen kommer fortsatt fra sporbare menyer.</p>
      </div>

      <div className="dishLearningGrid">
        {learningDishes.map((dish) => (
          <article className="dishLearningCard" key={dish.name}>
            <span className="dishLearningRegion">{dish.region}</span>
            <h3>{dish.name}</h3>
            <p>{dish.summary}</p>
            <a href={dishSearchHref(dish.name.toLowerCase())}>Finn {dish.name.toLowerCase()} <span aria-hidden="true">→</span></a>
          </article>
        ))}
      </div>
    </section>
  );
}
