import { dishSearchHref } from "../lib/public-path";

const illustratedDishes = [
  { id: "pizza-margherita", label: "Pizza margherita", query: "pizza margherita" },
  { id: "cheeseburger", label: "Cheeseburger med bacon", query: "bacon cheeseburger" },
  { id: "grillet-laks", label: "Grillet laks", query: "grillet laks" },
  { id: "grillet-biff", label: "Grillet biff", query: "grillet biff" },
  { id: "rekesmorbrod", label: "Rekesmørbrød", query: "rekesmørbrød" },
  { id: "sushi", label: "Sushi assortert", query: "sushi" },
  { id: "ramen", label: "Ramen med svin og egg", query: "ramen" },
  { id: "pasta-bolognese", label: "Tagliatelle bolognese", query: "bolognese" },
  { id: "pizza-prosciutto", label: "Pizza med prosciutto", query: "pizza prosciutto" },
  { id: "kebab-pita", label: "Kebab i pita", query: "kebab pita" },
  { id: "pasta-carbonara", label: "Pasta carbonara", query: "carbonara" },
  { id: "butter-chicken", label: "Butter chicken", query: "butter chicken" },
  { id: "pad-thai-reker", label: "Pad thai med reker", query: "pad thai" },
  { id: "stekt-hvit-fisk", label: "Stekt hvit fisk", query: "stekt fisk" },
  { id: "tiramisu", label: "Tiramisu", query: "tiramisu" },
] as const;

// The background sprite contains exactly 5 columns and 3 rows, in this order.
// Photographs are representative AI illustrations, never evidence of a
// restaurant's menu item or preparation; keep them out of restaurant listings.
export function DishPhotoGallery() {
  return (
    <section className="dishPhotos" aria-labelledby="dish-photos-title">
      <div className="dishPhotosHeading">
        <div>
          <p>Matlyst · Bildegalleri</p>
          <h3 id="dish-photos-title">Hva frister?</h3>
        </div>
        <span>Illustrasjoner av rettetyper, ikke restaurantbilder.</span>
      </div>
      <div className="dishPhotosGrid">
        {illustratedDishes.map((dish, index) => {
          const column = index % 5;
          const row = Math.floor(index / 5);
          return (
            <a href={dishSearchHref(dish.query)} key={dish.id} className="dishPhotoCard">
              <span
                className="dishPhotoThumb"
                aria-hidden="true"
                style={{ backgroundPosition: `${column * 25}% ${row * 50}%` }}
              />
              <strong>{dish.label}</strong>
              <span className="dishPhotoAction">Se menytreff <span aria-hidden="true">→</span></span>
            </a>
          );
        })}
      </div>
    </section>
  );
}


// Only exact editorial dish identifiers are allowed in existing Matlyst
// catalog cards. Generic menu searches and restaurant-specific items never
// receive an illustrative photo through fuzzy matching.
const editorialPhotoIndex: Readonly<Record<string, number>> = {
  "pizza-margherita": 0,
  sushi: 5,
  ramen: 6,
  carbonara: 10,
  "butter-chicken": 11,
};

export function DishPhotoThumbnail({ dishId, label }: { dishId: string; label: string }) {
  const index = editorialPhotoIndex[dishId];
  if (index === undefined) return null;
  return (
    <span
      role="img"
      aria-label={`KI-illustrasjon av ${label}, ikke restaurantfoto`}
      className="dishPhotoSmall"
      style={{ backgroundPosition: `${(index % 5) * 25}% ${Math.floor(index / 5) * 50}%` }}
    />
  );
}
