import { dishSearchHref, withPublicBasePath } from "../lib/public-path";
import manifest from "../public/dish-images/manifest.json";
import { DishEditorialImage } from "./dish-editorial-image";

const originalIllustratedDishes = [
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
  { id: "vietnamese-spring-rolls", label: "Gỏi cuốn med reker", query: "vietnamese spring rolls" },
  { id: "tandoori", label: "Tandoorikylling", query: "tandoori chicken" },
  { id: "naan", label: "Naan med smør og urter", query: "naan" },
  { id: "dal-makhani", label: "Dal makhani med smør og fløte", query: "dal makhani" },
  { id: "idli", label: "Idli med sambar og chutney", query: "idli" },
  { id: "sambar", label: "Sambar med linser og grønnsaker", query: "sambar" },
  { id: "vada", label: "Medu vada med sambar og chutney", query: "vada" },
] as const;

// Existing gallery slots retain their original labels and search links.
// Additional reviewed images are appended directly from the shared register.
const additionalIllustratedDishes = manifest.images.slice(originalIllustratedDishes.length);
const illustratedDishes = [...originalIllustratedDishes, ...additionalIllustratedDishes];
function findAdditionalThumbnail(dishId: string) {
  return additionalIllustratedDishes.find(image => image.catalogId === dishId && image.id === dishId);
}

// The first atlas holds 24 illustrations in 6 columns × 4 rows.
// The second atlas (series 04) holds nine in 3 × 3, at indices 24–32.
// Pizza margherita (0), Cheeseburger (1), Sushi (5), Ramen (6), Carbonara (10), Butter chicken (11), Pad thai med reker (12), Tiramisu (14), Gyoza (17), Tom yum (33), Pad kra pao (34), Bánh mì (35), Bún chả (36), Gỏi cuốn (37), Tandoorikylling (38), Naan (39), Dal makhani (40), Idli (41), Sambar (42), and Medu vada (43) use separate sharp AVIF files.
// Editorial photos are clearly labelled; all other images are representative AI illustrations, never restaurant photographs.
// Keep individual restaurant listings separate from these editorial images.
export function DishPhotoGallery() {
  return (
    <details className="dishPhotos" aria-labelledby="dish-photos-title">
      <summary className="dishPhotosPreview">
        <span className="dishPhotosIntro">
          <span className="dishPhotosKicker">Matlyst · Til inspirasjon</span>
          <span className="dishPhotosTitle" id="dish-photos-title">Hva frister?</span>
          <span className="dishPhotosOpen">
            Utforsk {illustratedDishes.length} retter <span aria-hidden="true">↗</span>
          </span>
        </span>
        <span
          className="dishPhotosCover"
          role="img"
          aria-label="Redaksjonelt foto av tom yum med reker og sopp, ikke restaurantfoto"
        />
      </summary>
      <div className="dishPhotosInside">
        <div className="dishPhotosHeading">
          <div>
            <p>Matlyst · Bildegalleri</p>
            <h3>Finn noe godt</h3>
          </div>
          <span>Illustrasjoner og foto av rettetyper, ikke restaurantbilder.</span>
        </div>
        <div className="dishPhotosGrid">
          {illustratedDishes.map((dish) => (
            <div key={dish.id} className="dishPhotoCard">
              <DishEditorialImage dishId={dish.id} className="dishPhotoThumb" />
              <div className="dishPhotoCardContent">
                <a href={dishSearchHref(dish.query)} className="dishPhotoSearch">
                  <strong>{dish.label}</strong>
                  <span className="dishPhotoAction">Se menytreff <span aria-hidden="true">→</span></span>
                </a>
              </div>
            </div>
          ))}
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
  "vietnamese-spring-rolls": 37,
  tandoori: 38,
  naan: 39,
  "dal-makhani": 40,
  idli: 41,
  sambar: 42,
  vada: 43,
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
  sushi: "assortert sushi med laks, tunfisk, ris, nori og avokado",
  ramen: "ramen med chashu-svinekjøtt, egg, nudler, nori og vårløk",
  carbonara: "spaghetti carbonara med bacon, egg, ost og pepper",
  "cacio-e-pepe": "cacio e pepe med pecorino og sort pepper",
  "chana-masala": "chana masala med kikerter og tomat",
  dosa: "masala dosa med potetfyll, sambar og kokoschutney",
  "butter-chicken": "butter chicken med kyllinglår i kremet tomatsaus",
  "pizza-marinara": "pizza marinara uten ost, med tomat, hvitløk og oregano",
  falafel: "falafel med kikerter, hummus, grønnsaker og urter",
  "tacos-al-pastor": "tacos al pastor med marinert svinekjøtt, ananas, løk, koriander og maislefser",
  pho: "phở bò med storfekjøtt, risnudler, urter og lime",
  "pad-thai": "pad thai med reker",
  "tom-yum": "tom yum med reker, sopp og sitrongress",
  "pad-kra-pao": "pad kra pao med woket kjøtt, thaibasilikum, ris og speilegg",
  "banh-mi": "bánh mì med kjøtt, pâté, syltede grønnsaker, agurk og koriander",
  "bun-cha": "bún chả med grillet svinekjøtt, risvermicelli, urter og dipping-saus",
  "vietnamese-spring-rolls": "gỏi cuốn med reker, risnudler, friske urter og peanøttsaus",
  tandoori: "tandoorigrillet kylling med kryddermarinade, løk og sitron",
  naan: "tandoorstekt naanbrød med brunede bobler, smør og friske urter",
  "dal-makhani": "dal makhani av svarte linser i kremet saus med smør og fløte",
  idli: "dampede ris- og linsekaker servert med sambar, kokoschutney og chilichutney",
  sambar: "sørindisk linse- og grønnsaksgryte med tamarind, karriblader og sennepsfrø",
  vada: "sprø medu vada av linser servert med sambar, kokoschutney og rød chutney",
};

export function hasDishPhotoThumbnail(dishId: string): boolean {
  return Object.hasOwn(editorialPhotoIndex, dishId) || Boolean(findAdditionalThumbnail(dishId));
}

export function DishPhotoThumbnail({ dishId, label }: { dishId: string; label: string }) {
  const additional = findAdditionalThumbnail(dishId);
  if (additional) return (
    <span role="img" aria-label={`${additional.kind} av ${additional.label}, ikke restaurantfoto`}
      className="dishPhotoSmall dishPhotoRegistered"
      style={{ backgroundImage: `url("${withPublicBasePath(`/dish-images/${additional.atlas}`)}")` }} />
  );
  const index = editorialPhotoIndex[dishId];
  if (index === undefined) return null;
  const isPizzaMargherita = index === 0;
  const isSushi = index === 5;
  const isRamen = index === 6;
  const isCarbonara = index === 10;
  const isButterChicken = index === 11;
  const isPizzaMarinara = index === 15;
  const isCacioEPepe = index === 16;
  const isGyoza = index === 17;
  const isFalafel = index === 20;
  const isTacosAlPastor = index === 21;
  const isChanaMasala = index === 22;
  const isMasalaDosa = index === 23;
  const isChickenKatsu = index === 24;
  const isYakitori = index === 25;
  const isUdonTempura = index === 26;
          const isBao = index === 27;
          const isDumplings = index === 28;
          const isMapoTofu = index === 29;
          const isPekingDuck = index === 30;
          const isDanDanNoodles = index === 31;
          const isGreenCurry = index === 32;
  const isPho = index === 18;
  const isTomYum = index === 33;
  const isPadKraPao = index === 34;
  const isBanhMi = index === 35;
  const isBunCha = index === 36;
  const isGoiCuon = index === 37;
  const isTandoori = index === 38;
  const isNaan = index === 39;
  const isDalMakhani = index === 40;
  const isIdli = index === 41;
  const isSambar = index === 42;
  const isVada = index === 43;
  const isSeries04 = index >= 24 && index < 33;
  const localIndex = isSeries04 ? index - 24 : index;
  const position = (isPizzaMargherita || isSushi || isRamen || isCarbonara || isButterChicken || isPizzaMarinara || isCacioEPepe || isFalafel || isTacosAlPastor || isChanaMasala || isMasalaDosa || isChickenKatsu || isYakitori || isUdonTempura || isBao || isDumplings || isMapoTofu || isPekingDuck || isDanDanNoodles || isGreenCurry || isPho || isTomYum || isPadKraPao || isBanhMi || isBunCha || isGoiCuon || isTandoori || isNaan || isDalMakhani || isIdli || isSambar || isVada)
    ? "center"
    : isSeries04
      ? `${(localIndex % 3) * 50}% ${Math.floor(localIndex / 3) * 50}%`
      : `${(index % 6) * 20}% ${(Math.floor(index / 6) * 100) / 3}%`;
  const illustratedVariant = illustratedVariants[dishId] ?? label;
  return (
    <span
      role="img"
      aria-label={isSushi ? "Redaksjonelt foto av sushi assortert, ikke restaurantfoto" : isRamen ? "Redaksjonelt foto av ramen med svin og egg, ikke restaurantfoto" : isCarbonara ? "Redaksjonelt foto av carbonara med bacon og ost, ikke restaurantfoto" : isButterChicken ? "Redaksjonelt foto av butter chicken med kyllinglår i kremet saus, ikke restaurantfoto" : isPizzaMarinara ? "Redaksjonelt foto av pizza marinara uten ost, ikke restaurantfoto" : isCacioEPepe ? "Redaksjonelt foto av cacio e pepe med pecorino og sort pepper, ikke restaurantfoto" : isGyoza ? "Redaksjonelt foto av seks pannestekte gyoza med soyadipp, ikke restaurantfoto" : isChickenKatsu ? "Redaksjonelt foto av panert kyllingkatsu med ris og nori, ikke restaurantfoto" : isYakitori ? "Redaksjonelt foto av to grillede yakitori-kyllingspyd med sitron, ikke restaurantfoto" : isUdonTempura ? "Redaksjonelt foto av udon med reketempura i blåhvit skål, ikke restaurantfoto" : isPho ? "Redaksjonelt foto av phở bò med storfekjøtt, nudler og kraft, ikke restaurantfoto" : isTomYum ? "Redaksjonelt foto av tom yum med reker, sopp og koriander, ikke restaurantfoto" : isYakitori ? "Redaksjonelt foto av yakitori med kyllingspyd, ikke restaurantfoto" : isUdonTempura ? "Redaksjonelt foto av udonnudler med reketempura, ikke restaurantfoto" : `KI-illustrasjon av ${illustratedVariant}, ikke restaurantfoto`}
      className={isPizzaMargherita ? "dishPhotoSmall dishPhotoPizzaMargherita" : isSushi ? "dishPhotoSmall dishPhotoSushi" : isRamen ? "dishPhotoSmall dishPhotoRamen" : isCarbonara ? "dishPhotoSmall dishPhotoCarbonara" : isButterChicken ? "dishPhotoSmall dishPhotoButterChicken" : isPizzaMarinara ? "dishPhotoSmall dishPhotoPizzaMarinara" : isFalafel ? "dishPhotoSmall dishPhotoFalafel" : isTacosAlPastor ? "dishPhotoSmall dishPhotoTacosAlPastor" : isCacioEPepe ? "dishPhotoSmall dishPhotoCacioEPepe" : isChanaMasala ? "dishPhotoSmall dishPhotoChanaMasala" : isMasalaDosa ? "dishPhotoSmall dishPhotoMasalaDosa" : isChickenKatsu ? "dishPhotoSmall dishPhotoChickenKatsu" : isYakitori ? "dishPhotoSmall dishPhotoYakitori" : isUdonTempura ? "dishPhotoSmall dishPhotoUdonTempura" : isBao ? "dishPhotoSmall dishPhotoBao" : isDumplings ? "dishPhotoSmall dishPhotoDumplings" : isMapoTofu ? "dishPhotoSmall dishPhotoMapoTofu" : isPekingDuck ? "dishPhotoSmall dishPhotoPekingDuck" : isDanDanNoodles ? "dishPhotoSmall dishPhotoDanDanNoodles" : isGreenCurry ? "dishPhotoSmall dishPhotoGreenCurry" : isPho ? "dishPhotoSmall dishPhotoPho" : isBunCha ? "dishPhotoSmall dishPhotoBunCha" : isGoiCuon ? "dishPhotoSmall dishPhotoGoiCuon" : isTandoori ? "dishPhotoSmall dishPhotoTandoori" : isNaan ? "dishPhotoSmall dishPhotoNaan" : isDalMakhani ? "dishPhotoSmall dishPhotoDalMakhani" : isIdli ? "dishPhotoSmall dishPhotoIdli" : isSambar ? "dishPhotoSmall dishPhotoSambar" : isVada ? "dishPhotoSmall dishPhotoVada" : isBanhMi ? "dishPhotoSmall dishPhotoBanhMi" : isPadKraPao ? "dishPhotoSmall dishPhotoPadKraPao" : isTomYum ? "dishPhotoSmall dishPhotoTomYum" : isSeries04 ? "dishPhotoSmall dishPhotoSeries04" : "dishPhotoSmall"}
      style={{ backgroundPosition: position }}
    />
  );
}
