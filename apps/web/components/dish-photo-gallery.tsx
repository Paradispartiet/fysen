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
  { id: "vietnamese-spring-rolls", label: "Gỏi cuốn med reker", query: "vietnamese spring rolls" },
  { id: "tandoori", label: "Tandoorikylling", query: "tandoori chicken" },
  { id: "naan", label: "Naan med smør og urter", query: "naan" },
  { id: "dal-makhani", label: "Dal makhani med smør og fløte", query: "dal makhani" },
  { id: "idli", label: "Idli med sambar og chutney", query: "idli" },
  { id: "sambar", label: "Sambar med linser og grønnsaker", query: "sambar" },
  { id: "vada", label: "Medu vada med sambar og chutney", query: "vada" },
] as const;

// The first atlas holds 24 illustrations in 6 columns × 4 rows.
// The second atlas (series 04) holds nine in 3 × 3, at indices 24–32.
// Pizza margherita (0), Cheeseburger (1), Sushi (5), Ramen (6), Carbonara (10), Butter chicken (11), Pad thai med reker (12), Tiramisu (14), Gyoza (17), Tom yum (33), Pad kra pao (34), Bánh mì (35), Bún chả (36), Gỏi cuốn (37), Tandoorikylling (38), Naan (39), Dal makhani (40), Idli (41), Sambar (42), and Medu vada (43) use separate sharp AVIF files.
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
            Utforsk 44 retter <span aria-hidden="true">↗</span>
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
          const isCheeseburger = index === 1;
          const isPho = index === 18;
          const isGrilledSalmon = index === 2;
          const isGrilledSteak = index === 3;
          const isShrimpOpenSandwich = index === 4;
          const isSushi = index === 5;
          const isRamen = index === 6;
          const isBolognese = index === 7;
          const isProsciutto = index === 8;
          const isKebabPita = index === 9;
          const isCarbonara = index === 10;
          const isShrimpPadThai = index === 12;
          const isTiramisu = index === 14;
          const isGyoza = index === 17;
          const isPizzaMarinara = index === 15;
          const isCacioEPepe = index === 16;
          const isFalafel = index === 20;
          const isChanaMasala = index === 22;
          const isMasalaDosa = index === 23;
          const isButterChicken = index === 11;
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
          const column = isSeries04 ? localIndex % 3 : index % 6;
          const row = isSeries04 ? Math.floor(localIndex / 3) : Math.floor(index / 6);
          const position = (isPizzaMargherita || isCheeseburger || isGrilledSalmon || isGrilledSteak || isShrimpOpenSandwich || isSushi || isRamen || isBolognese || isProsciutto || isKebabPita || isCarbonara || isButterChicken || isShrimpPadThai || isTiramisu || isGyoza || isPizzaMarinara || isCacioEPepe || isFalafel || isChanaMasala || isMasalaDosa || isPho || isTomYum || isPadKraPao || isBanhMi || isBunCha || isGoiCuon || isTandoori || isNaan || isDalMakhani || isIdli || isSambar || isVada)
            ? "center"
            : isSeries04
              ? `${column * 50}% ${row * 50}%`
              : `${column * 20}% ${(row * 100) / 3}%`;
          return (
            <a href={dishSearchHref(dish.query)} key={dish.id} className="dishPhotoCard">
              <span
                className={isPizzaMargherita ? "dishPhotoThumb dishPhotoPizzaMargherita" : isCheeseburger ? "dishPhotoThumb dishPhotoCheeseburger" : isGrilledSalmon ? "dishPhotoThumb dishPhotoGrilledSalmon" : isGrilledSteak ? "dishPhotoThumb dishPhotoGrilledSteak" : isShrimpOpenSandwich ? "dishPhotoThumb dishPhotoShrimpOpenSandwich" : isSushi ? "dishPhotoThumb dishPhotoSushi" : isRamen ? "dishPhotoThumb dishPhotoRamen" : isBolognese ? "dishPhotoThumb dishPhotoBolognese" : isProsciutto ? "dishPhotoThumb dishPhotoProsciutto" : isKebabPita ? "dishPhotoThumb dishPhotoKebabPita" : isCarbonara ? "dishPhotoThumb dishPhotoCarbonara" : isShrimpPadThai ? "dishPhotoThumb dishPhotoShrimpPadThai" : isTiramisu ? "dishPhotoThumb dishPhotoTiramisu" : isGyoza ? "dishPhotoThumb dishPhotoGyoza" : isPizzaMarinara ? "dishPhotoThumb dishPhotoPizzaMarinara" : isFalafel ? "dishPhotoThumb dishPhotoFalafel" : isCacioEPepe ? "dishPhotoThumb dishPhotoCacioEPepe" : isChanaMasala ? "dishPhotoThumb dishPhotoChanaMasala" : isMasalaDosa ? "dishPhotoThumb dishPhotoMasalaDosa" : isButterChicken ? "dishPhotoThumb dishPhotoButterChicken" : isPho ? "dishPhotoThumb dishPhotoPho" : isBunCha ? "dishPhotoThumb dishPhotoBunCha" : isGoiCuon ? "dishPhotoThumb dishPhotoGoiCuon" : isTandoori ? "dishPhotoThumb dishPhotoTandoori" : isNaan ? "dishPhotoThumb dishPhotoNaan" : isDalMakhani ? "dishPhotoThumb dishPhotoDalMakhani" : isIdli ? "dishPhotoThumb dishPhotoIdli" : isSambar ? "dishPhotoThumb dishPhotoSambar" : isVada ? "dishPhotoThumb dishPhotoVada" : isBanhMi ? "dishPhotoThumb dishPhotoBanhMi" : isPadKraPao ? "dishPhotoThumb dishPhotoPadKraPao" : isTomYum ? "dishPhotoThumb dishPhotoTomYum" : isSeries04 ? "dishPhotoThumb dishPhotoSeries04" : "dishPhotoThumb"}
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
  carbonara: "spaghetti carbonara med speket svinekjøtt, ost, egg og pepper",
  "cacio-e-pepe": "cacio e pepe med pecorino og sort pepper",
  "chana-masala": "chana masala med kikerter og tomat",
  dosa: "masala dosa med potetfyll, sambar og kokoschutney",
  "butter-chicken": "butter chicken i kremet tomatsaus med naanbrød",
  "pizza-marinara": "pizza marinara uten ost, med tomat, hvitløk og oregano",
  falafel: "falafel med kikerter, hummus, grønnsaker og urter",
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

export function DishPhotoThumbnail({ dishId, label }: { dishId: string; label: string }) {
  const index = editorialPhotoIndex[dishId];
  if (index === undefined) return null;
  const isPizzaMargherita = index === 0;
  const isSushi = index === 5;
  const isRamen = index === 6;
  const isCarbonara = index === 10;
  const isButterChicken = index === 11;
  const isPizzaMarinara = index === 15;
  const isCacioEPepe = index === 16;
  const isFalafel = index === 20;
  const isChanaMasala = index === 22;
  const isMasalaDosa = index === 23;
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
  const position = (isPizzaMargherita || isSushi || isRamen || isCarbonara || isButterChicken || isPizzaMarinara || isCacioEPepe || isFalafel || isChanaMasala || isMasalaDosa || isPho || isTomYum || isPadKraPao || isBanhMi || isBunCha || isGoiCuon || isTandoori || isNaan || isDalMakhani || isIdli || isSambar || isVada)
    ? "center"
    : isSeries04
      ? `${(localIndex % 3) * 50}% ${Math.floor(localIndex / 3) * 50}%`
      : `${(index % 6) * 20}% ${(Math.floor(index / 6) * 100) / 3}%`;
  const illustratedVariant = illustratedVariants[dishId] ?? label;
  return (
    <span
      role="img"
      aria-label={`KI-illustrasjon av ${illustratedVariant}, ikke restaurantfoto`}
      className={isPizzaMargherita ? "dishPhotoSmall dishPhotoPizzaMargherita" : isSushi ? "dishPhotoSmall dishPhotoSushi" : isRamen ? "dishPhotoSmall dishPhotoRamen" : isCarbonara ? "dishPhotoSmall dishPhotoCarbonara" : isButterChicken ? "dishPhotoSmall dishPhotoButterChicken" : isPizzaMarinara ? "dishPhotoSmall dishPhotoPizzaMarinara" : isFalafel ? "dishPhotoSmall dishPhotoFalafel" : isCacioEPepe ? "dishPhotoSmall dishPhotoCacioEPepe" : isChanaMasala ? "dishPhotoSmall dishPhotoChanaMasala" : isMasalaDosa ? "dishPhotoSmall dishPhotoMasalaDosa" : isPho ? "dishPhotoSmall dishPhotoPho" : isBunCha ? "dishPhotoSmall dishPhotoBunCha" : isGoiCuon ? "dishPhotoSmall dishPhotoGoiCuon" : isTandoori ? "dishPhotoSmall dishPhotoTandoori" : isNaan ? "dishPhotoSmall dishPhotoNaan" : isDalMakhani ? "dishPhotoSmall dishPhotoDalMakhani" : isIdli ? "dishPhotoSmall dishPhotoIdli" : isSambar ? "dishPhotoSmall dishPhotoSambar" : isVada ? "dishPhotoSmall dishPhotoVada" : isBanhMi ? "dishPhotoSmall dishPhotoBanhMi" : isPadKraPao ? "dishPhotoSmall dishPhotoPadKraPao" : isTomYum ? "dishPhotoSmall dishPhotoTomYum" : isSeries04 ? "dishPhotoSmall dishPhotoSeries04" : "dishPhotoSmall"}
      style={{ backgroundPosition: position }}
    />
  );
}
