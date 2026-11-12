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
  { id: "pizza-marinara", label: "Pizza marinara", query: "pizza marinara" },
  { id: "cacio-e-pepe", label: "Cacio e pepe", query: "cacio e pepe" },
  { id: "gyoza", label: "Gyoza", query: "gyoza" },
  { id: "pho", label: "Phở bò", query: "pho" },
  { id: "bibimbap", label: "Bibimbap", query: "bibimbap" },
  { id: "falafel", label: "Falafel med hummus", query: "falafel" },
  { id: "tacos-al-pastor", label: "Tacos al pastor", query: "tacos al pastor" },
  { id: "chana-masala", label: "Chana masala", query: "chana masala" },
  { id: "dosa", label: "Masala dosa", query: "dosa" },
  { id: "katsu", label: "Chicken katsu", query: "chicken katsu" },
  { id: "yakitori", label: "Yakitori – kyllingspyd", query: "yakitori" },
  { id: "udon", label: "Udon med tempura", query: "udon" },
  { id: "bao", label: "Bao med braisert kjøtt", query: "bao" },
  { id: "dumplings", label: "Dumplings", query: "dumplings" },
  { id: "mapo-tofu", label: "Mapo tofu med kjøtt", query: "mapo tofu" },
  { id: "peking-duck", label: "Pekingand", query: "peking duck" },
  { id: "dan-dan-noodles", label: "Dan dan-nudler med kjøtt", query: "dan dan noodles" },
  { id: "green-curry", label: "Grønn curry med kylling", query: "green curry" },
  { id: "tom-yum", label: "Tom yum med reker", query: "tom yum" },
  { id: "pad-kra-pao", label: "Pad kra pao med speilegg", query: "pad kra pao" },
  { id: "banh-mi", label: "Bánh mì med kjøtt og syltede grønnsaker", query: "banh mi" },
  { id: "bun-cha", label: "Bún chả med grillet svinekjøtt", query: "bun cha" },
] as const;

// The first atlas holds 24 illustrations in 6 columns × 4 rows.
// The second atlas (series 04) holds nine in 3 × 3, at indices 24–32.
// Pizza margherita (0), Tom yum (33), Pad kra pao (34), Bánh mì (35), and Bún chả (36) use separate sharp AVIF files.
// All are representative AI illustrations, not restaurant photographs.
// Keep individual restaurant listings separate from these editorial images.
export function DishPhotoGallery() {
  return (
    <details className="dishPhotos" aria-labelledby="dish-photos-title">
      <summary className="dishPhotosPreview">
        <span className="dishPhotosIntro">
          <span className="dishPhotosKicker">Matlyst · Litt inspirasjon</span>
          <span className="dishPhotosTitle" id="dish-photos-title">Hva frister?</span>
          <span className="dishPhotosDescription">
            Oppdag retter i ditt eget tempo. Hele bildegalleriet er her når du vil se mer.
          </span>
          <span className="dishPhotosOpen">
            Utforsk 37 retter <span aria-hidden="true">↗</span>
          </span>
        </span>
        <span
          className="dishPhotosCover"
          role="img"
          aria-label="KI-illustrasjon av tom yum med reker, ikke restaurantfoto"
        />
      </summary>
      <div className="dishPhotosInside">
        <div className="dishPhotosHeading">
          <div>
            <p>Matlyst · Bildegalleri</p>
            <h3>Finn noe godt</h3>
          </div>
          <span>Illustrasjoner av rettetyper, ikke restaurantbilder.</span>
        </div>
        <div className="dishPhotosGrid">
          {illustratedDishes.map((dish, index) => {
          const isPizzaMargherita = index === 0;
          const isTomYum = index === 33;
          const isPadKraPao = index === 34;
          const isBanhMi = index === 35;
          const isBunCha = index === 36;
          const isSeries04 = index >= 24 && index < 33;
          const localIndex = isSeries04 ? index - 24 : index;
          const column = isSeries04 ? localIndex % 3 : index % 6;
          const row = isSeries04 ? Math.floor(localIndex / 3) : Math.floor(index / 6);
          const position = (isPizzaMargherita || isTomYum || isPadKraPao || isBanhMi || isBunCha)
            ? "center"
            : isSeries04
              ? `${column * 50}% ${row * 50}%`
              : `${column * 20}% ${(row * 100) / 3}%`;
          return (
            <a href={dishSearchHref(dish.query)} key={dish.id} className="dishPhotoCard">
              <span
                className={isPizzaMargherita ? "dishPhotoThumb dishPhotoPizzaMargherita" : isBunCha ? "dishPhotoThumb dishPhotoBunCha" : isBanhMi ? "dishPhotoThumb dishPhotoBanhMi" : isPadKraPao ? "dishPhotoThumb dishPhotoPadKraPao" : isTomYum ? "dishPhotoThumb dishPhotoTomYum" : isSeries04 ? "dishPhotoThumb dishPhotoSeries04" : "dishPhotoThumb"}
                aria-hidden="true"
                style={{ backgroundPosition: position }}
              />
              <strong>{dish.label}</strong>
              <span className="dishPhotoAction">Se menytreff <span aria-hidden="true">→</span></span>
            </a>
          );
          })}
        </div>
      </div>
    </details>
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
  "pad-thai": 12,
  "pizza-marinara": 15,
  "cacio-e-pepe": 16,
  gyoza: 17,
  pho: 18,
  falafel: 20,
  "tacos-al-pastor": 21,
  "chana-masala": 22,
  dosa: 23,
  katsu: 24,
  yakitori: 25,
  udon: 26,
  bao: 27,
  dumplings: 28,
  "mapo-tofu": 29,
  "peking-duck": 30,
  "dan-dan-noodles": 31,
  "green-curry": 32,
  "tom-yum": 33,
  "pad-kra-pao": 34,
  "banh-mi": 35,
  "bun-cha": 36,
};

// Specify visible variants for general catalog IDs: the illustrations are
// examples of each dish family, never proof of a restaurant's ingredients.
const illustratedVariants: Readonly<Record<string, string>> = {
  katsu: "chicken katsu, med kylling",
  yakitori: "yakitori med kylling",
  udon: "udon med reketempura",
  bao: "bao med braisert kjøtt",
  dumplings: "dumplings med uspesifisert fyll",
  "mapo-tofu": "mapo tofu med kjøtt",
  "peking-duck": "pekingand",
  "dan-dan-noodles": "dan dan-nudler med kjøtt og peanøtter",
  "green-curry": "grønn curry med kylling",
  "pad-thai": "pad thai med reker",
  "tom-yum": "tom yum med reker, sopp og sitrongress",
  "pad-kra-pao": "pad kra pao med woket kjøtt, thaibasilikum, ris og speilegg",
  "banh-mi": "bánh mì med kjøtt, pâté, syltede grønnsaker, agurk og koriander",
  "bun-cha": "bún chả med grillet svinekjøtt, risvermicelli, urter og dipping-saus",
};

export function DishPhotoThumbnail({ dishId, label }: { dishId: string; label: string }) {
  const index = editorialPhotoIndex[dishId];
  if (index === undefined) return null;
  const isPizzaMargherita = index === 0;
  const isTomYum = index === 33;
  const isPadKraPao = index === 34;
  const isBanhMi = index === 35;
  const isBunCha = index === 36;
  const isSeries04 = index >= 24 && index < 33;
  const localIndex = isSeries04 ? index - 24 : index;
  const position = (isPizzaMargherita || isTomYum || isPadKraPao || isBanhMi || isBunCha)
    ? "center"
    : isSeries04
      ? `${(localIndex % 3) * 50}% ${Math.floor(localIndex / 3) * 50}%`
      : `${(index % 6) * 20}% ${(Math.floor(index / 6) * 100) / 3}%`;
  const illustratedVariant = illustratedVariants[dishId] ?? label;
  return (
    <span
      role="img"
      aria-label={`KI-illustrasjon av ${illustratedVariant}, ikke restaurantfoto`}
      className={isPizzaMargherita ? "dishPhotoSmall dishPhotoPizzaMargherita" : isBunCha ? "dishPhotoSmall dishPhotoBunCha" : isBanhMi ? "dishPhotoSmall dishPhotoBanhMi" : isPadKraPao ? "dishPhotoSmall dishPhotoPadKraPao" : isTomYum ? "dishPhotoSmall dishPhotoTomYum" : isSeries04 ? "dishPhotoSmall dishPhotoSeries04" : "dishPhotoSmall"}
      style={{ backgroundPosition: position }}
    />
  );
}
