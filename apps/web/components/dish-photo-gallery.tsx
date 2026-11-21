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
// Editorial photos are clearly labelled; all other images are representative AI illustrations, never restaurant photographs.
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
          <span>Illustrasjoner og foto av rettetyper, ikke restaurantbilder.</span>
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
          const isWhiteFish = index === 13;
          const isTiramisu = index === 14;
          const isGyoza = index === 17;
          const isPizzaMarinara = index === 15;
          const isCacioEPepe = index === 16;
          const isFalafel = index === 20;
          const isBibimbap = index === 19;
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
          const position = (isPizzaMargherita || isCheeseburger || isGrilledSalmon || isGrilledSteak || isShrimpOpenSandwich || isSushi || isRamen || isBolognese || isProsciutto || isKebabPita || isCarbonara || isButterChicken || isShrimpPadThai || isWhiteFish || isTiramisu || isGyoza || isPizzaMarinara || isCacioEPepe || isFalafel || isBibimbap || isTacosAlPastor || isChanaMasala || isMasalaDosa || isChickenKatsu || isYakitori || isUdonTempura || isBao || isDumplings || isMapoTofu || isPekingDuck || isDanDanNoodles || isGreenCurry || isPho || isTomYum || isPadKraPao || isBanhMi || isBunCha || isGoiCuon || isTandoori || isNaan || isDalMakhani || isIdli || isSambar || isVada)
            ? "center"
            : isSeries04
              ? `${column * 50}% ${row * 50}%`
              : `${column * 20}% ${(row * 100) / 3}%`;
          return (
            <a href={dishSearchHref(dish.query)} key={dish.id} className="dishPhotoCard">
              <span
                className={isPizzaMargherita ? "dishPhotoThumb dishPhotoPizzaMargherita" : isCheeseburger ? "dishPhotoThumb dishPhotoCheeseburger" : isGrilledSalmon ? "dishPhotoThumb dishPhotoGrilledSalmon" : isGrilledSteak ? "dishPhotoThumb dishPhotoGrilledSteak" : isShrimpOpenSandwich ? "dishPhotoThumb dishPhotoShrimpOpenSandwich" : isSushi ? "dishPhotoThumb dishPhotoSushi" : isRamen ? "dishPhotoThumb dishPhotoRamen" : isBolognese ? "dishPhotoThumb dishPhotoBolognese" : isProsciutto ? "dishPhotoThumb dishPhotoProsciutto" : isKebabPita ? "dishPhotoThumb dishPhotoKebabPita" : isCarbonara ? "dishPhotoThumb dishPhotoCarbonara" : isShrimpPadThai ? "dishPhotoThumb dishPhotoShrimpPadThai" : isWhiteFish ? "dishPhotoThumb dishPhotoWhiteFish" : isTiramisu ? "dishPhotoThumb dishPhotoTiramisu" : isGyoza ? "dishPhotoThumb dishPhotoGyoza" : isPizzaMarinara ? "dishPhotoThumb dishPhotoPizzaMarinara" : isFalafel ? "dishPhotoThumb dishPhotoFalafel" : isBibimbap ? "dishPhotoThumb dishPhotoBibimbap" : isTacosAlPastor ? "dishPhotoThumb dishPhotoTacosAlPastor" : isCacioEPepe ? "dishPhotoThumb dishPhotoCacioEPepe" : isChanaMasala ? "dishPhotoThumb dishPhotoChanaMasala" : isMasalaDosa ? "dishPhotoThumb dishPhotoMasalaDosa" : isChickenKatsu ? "dishPhotoThumb dishPhotoChickenKatsu" : isYakitori ? "dishPhotoThumb dishPhotoYakitori" : isUdonTempura ? "dishPhotoThumb dishPhotoUdonTempura" : isBao ? "dishPhotoThumb dishPhotoBao" : isDumplings ? "dishPhotoThumb dishPhotoDumplings" : isMapoTofu ? "dishPhotoThumb dishPhotoMapoTofu" : isPekingDuck ? "dishPhotoThumb dishPhotoPekingDuck" : isDanDanNoodles ? "dishPhotoThumb dishPhotoDanDanNoodles" : isGreenCurry ? "dishPhotoThumb dishPhotoGreenCurry" : isButterChicken ? "dishPhotoThumb dishPhotoButterChicken" : isPho ? "dishPhotoThumb dishPhotoPho" : isBunCha ? "dishPhotoThumb dishPhotoBunCha" : isGoiCuon ? "dishPhotoThumb dishPhotoGoiCuon" : isTandoori ? "dishPhotoThumb dishPhotoTandoori" : isNaan ? "dishPhotoThumb dishPhotoNaan" : isDalMakhani ? "dishPhotoThumb dishPhotoDalMakhani" : isIdli ? "dishPhotoThumb dishPhotoIdli" : isSambar ? "dishPhotoThumb dishPhotoSambar" : isVada ? "dishPhotoThumb dishPhotoVada" : isBanhMi ? "dishPhotoThumb dishPhotoBanhMi" : isPadKraPao ? "dishPhotoThumb dishPhotoPadKraPao" : isTomYum ? "dishPhotoThumb dishPhotoTomYum" : isSeries04 ? "dishPhotoThumb dishPhotoSeries04" : "dishPhotoThumb"}
                aria-hidden="true"
                style={{ backgroundPosition: position }}
              />
              <strong>{dish.label}</strong>
              <span className="dishPhotoAction">Se menytreff <span aria-hidden="true">→</span></span>
            </a>
          );
          })}
        </div>
        {/* Only reviewed largeSource assets are linked here. Cards stay compact and keep their menu-search action. */}
        <nav className="dishPhotosLargeLinks" aria-label="Godkjente rettbilder i full størrelse">
          <span>Se skarpe originalbilder:</span>
          <a href="/dish-images/pizza-margherita-master-3000.avif" target="_blank" rel="noopener noreferrer">
            Pizza margherita <span aria-hidden="true">↗</span>
          </a>
          <a href="/dish-images/cheeseburger-master-2185.avif" target="_blank" rel="noopener noreferrer">
            Cheeseburger med bacon <span aria-hidden="true">↗</span>
          </a>
          <a href="/dish-images/grillet-laks-master-3489.avif" target="_blank" rel="noopener noreferrer">
            Grillet laks <span aria-hidden="true">↗</span>
          </a>
          <a href="/dish-images/grillet-biff-master-6000.avif" target="_blank" rel="noopener noreferrer">
            Grillet biff <span aria-hidden="true">↗</span>
          </a>
          <a href="/dish-images/rekesmorbrod-master-5899.avif" target="_blank" rel="noopener noreferrer">
            Rekesmørbrød <span aria-hidden="true">↗</span>
          </a>
          <small>Rekesmørbrød-foto: Susanne Nilsson, <a href="/dish-images/rekesmorbrod-LICENSE.txt" target="_blank" rel="noopener noreferrer">CC BY-SA 2.0 (bearbeidet, kilde og lisens)</a>.</small>
          <a href="/dish-images/sushi-master-2100.avif" target="_blank" rel="noopener noreferrer">
            Sushi assortert <span aria-hidden="true">↗</span>
          </a>
          <a href="/dish-images/ramen-master-7364.avif" target="_blank" rel="noopener noreferrer">
            Ramen med svin og egg <span aria-hidden="true">↗</span>
          </a>
          <a href="/dish-images/pasta-bolognese-master-4000.avif" target="_blank" rel="noopener noreferrer">
            Tagliatelle bolognese <span aria-hidden="true">↗</span>
          </a>
          <small>Tagliatelle-foto: Alex Sirac, <a href="/dish-images/pasta-bolognese-LICENSE.txt" target="_blank" rel="noopener noreferrer">CC BY 4.0 (bearbeidet, kilde og lisens)</a>.</small>
          <a href="/dish-images/pizza-prosciutto-master-3949.avif" target="_blank" rel="noopener noreferrer">
            Pizza med prosciutto <span aria-hidden="true">↗</span>
          </a>
          <small>Prosciutto-foto: Amin, <a href="/dish-images/pizza-prosciutto-LICENSE.txt" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0 (bearbeidet, kilde og lisens)</a>.</small>
          <a href="/dish-images/pasta-carbonara-master-2600.avif" target="_blank" rel="noopener noreferrer>
            Pasta carbonara <span aria-hidden="true">↗</span>
          </a>
          <a href="/dish-images/butter-chicken-master-3000.avif" target="_blank" rel="noopener noreferrer">
            Butter chicken <span aria-hidden="true">↗</span>
          </a>
          <a href="/dish-images/pad-thai-reker-master-5472.avif" target="_blank" rel="noopener noreferrer">
            Pad thai med reker <span aria-hidden="true">↗</span>
          </a>
          <small>Pad thai-foto: UNDO KIM / Pexels, <a href="/dish-images/pad-thai-reker-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>
          <a href="/dish-images/stekt-hvit-fisk-master-5464.avif" target="_blank" rel="noopener noreferrer">
            Stekt hvit fisk <span aria-hidden="true">↗</span>
          </a>
          <small>Hvit fisk-foto: Valeria Boltneva / Pexels, <a href="/dish-images/stekt-hvit-fisk-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>
          <a href="/dish-images/tiramisu-master-6240.avif" target="_blank" rel="noopener noreferrer">
            Tiramisu <span aria-hidden="true">↗</span>
          </a>
          <small>Tiramisu-foto: Arian Fernandez / Pexels, <a href="/dish-images/tiramisu-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>
          <a href="/dish-images/pizza-marinara-master-2848.avif" target="_blank" rel="noopener noreferrer">
            Pizza marinara <span aria-hidden="true">↗</span>
          </a>
          <small>Pizza marinara-foto: Peter Van den Bossche / Wikimedia Commons, <a href="/dish-images/pizza-marinara-LICENSE.txt" target="_blank" rel="noopener noreferrer">CC BY-SA 2.0 og kilde</a>.</small>
          <a href="/dish-images/cacio-e-pepe-master-4577.avif" target="_blank" rel="noopener noreferrer">
            Cacio e pepe <span aria-hidden="true">↗</span>
          </a>
          <small>Cacio e pepe-foto: DC (DocteurCosmos) / Wikimedia Commons, <a href="/dish-images/cacio-e-pepe-LICENSE.txt" target="_blank" rel="noopener noreferrer">CC BY-SA 3.0 og kilde</a>.</small>
          <a href="/dish-images/gyoza-master-4937.avif" target="_blank" rel="noopener noreferrer">
            Gyoza <span aria-hidden="true">↗</span>
          </a>
          <small>Gyoza-foto: Lara Bellens / Pexels, <a href="/dish-images/gyoza-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>
          <a href="/dish-images/pho-bo-master-5472.avif" target="_blank" rel="noopener noreferrer">
            Phở bò <span aria-hidden="true">↗</span>
          </a>
          <small>Phở bò-foto: UNDO KIM / Pexels, <a href="/dish-images/pho-bo-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>
          <a href="/dish-images/bibimbap-master-8160.avif" target="_blank" rel="noopener noreferrer">
            Bibimbap med storfekjøtt <span aria-hidden="true">↗</span>
          </a>
          <small>Bibimbap-foto: Andy Li / Wikimedia Commons, <a href="/dish-images/bibimbap-LICENSE.txt" target="_blank" rel="noopener noreferrer">CC0 1.0, kilde</a>.</small>
          <a href="/dish-images/falafel-master-4284.avif" target="_blank" rel="noopener noreferrer">
            Falafel med hummus <span aria-hidden="true">↗</span>
          </a>
          <small>Falafel-foto: Saya P / Pexels, <a href="/dish-images/falafel-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>
          <a href="/dish-images/tacos-al-pastor-master-7008.avif" target="_blank" rel="noopener noreferrer">
            Tacos al pastor <span aria-hidden="true">↗</span>
          </a>
          <small>Tacos al pastor-foto: Abner Velázquez / Pexels, <a href="/dish-images/tacos-al-pastor-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>
          <a href="/dish-images/chana-masala-master-3814.avif" target="_blank" rel="noopener noreferrer">
            Chana masala <span aria-hidden="true">↗</span>
          </a>
          <small>Chana masala-foto: Muhammad Khawar Nazir / Pexels, <a href="/dish-images/chana-masala-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>
          <a href="/dish-images/masala-dosa-master-9504.avif" target="_blank" rel="noopener noreferrer">
            Masala dosa <span aria-hidden="true">↗</span>
          </a>
          <small>Masala dosa-foto: Jack Baghel / Pexels, <a href="/dish-images/masala-dosa-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>
          <a href="/dish-images/chicken-katsu-master-5472.avif" target="_blank" rel="noopener noreferrer">
            Chicken katsu <span aria-hidden="true">↗</span>
          </a>
          <small>Chicken katsu-foto: Cohesion Singapore / Pexels, <a href="/dish-images/chicken-katsu-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>
          <a href="/dish-images/yakitori-master-4000.avif" target="_blank" rel="noopener noreferrer">
            Yakitori <span aria-hidden="true">↗</span>
          </a>
          <small>Yakitori-foto: Airam Dato-on / Pexels, <a href="/dish-images/yakitori-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>
          <a href="/dish-images/udon-tempura-master-2900.avif" target="_blank" rel="noopener noreferrer">
            Udon med reketempura <span aria-hidden="true">↗</span>
          </a>
          <small>Udon-foto: Immanuelle / Wikimedia Commons, CC BY 4.0, <a href="/dish-images/udon-tempura-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og endringer</a>.</small>
          <a href="/dish-images/bao-braised-pork-master-5160.avif" target="_blank" rel="noopener noreferrer">
            Bao med braisert kjøtt <span aria-hidden="true">↗</span>
          </a>
          <small>Bao-foto: Andy Li / Wikimedia Commons, CC0 1.0, <a href="/dish-images/bao-braised-pork-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og bearbeiding</a>.</small>
          <a href="/dish-images/dumplings-master-4100.avif" target="_blank" rel="noopener noreferrer">
            Dumplings <span aria-hidden="true">↗</span>
          </a>
          <small>Dumplings-foto: Charles Deluvio / Wikimedia Commons, CC0 1.0, <a href="/dish-images/dumplings-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>
          <a href="/dish-images/mapo-tofu-master-3825.avif" target="_blank" rel="noopener noreferrer">
            Mapo tofu med kjøtt <span aria-hidden="true">↗</span>
          </a>
          <small>Mapo tofu-foto: ZhengZhou / Wikimedia Commons, CC BY-SA 4.0, <a href="/dish-images/mapo-tofu-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>
          <a href="/dish-images/peking-duck-master-4800.avif" target="_blank" rel="noopener noreferrer">
            Pekingand <span aria-hidden="true">↗</span>
          </a>
          <small>Pekingand-foto: Peachyeung316 / Wikimedia Commons, CC BY-SA 4.0, <a href="/dish-images/peking-duck-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>
        </nav>
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
      aria-label={isSushi ? "Redaksjonelt foto av sushi assortert, ikke restaurantfoto" : isRamen ? "Redaksjonelt foto av ramen med svin og egg, ikke restaurantfoto" : isCarbonara ? "Redaksjonelt foto av carbonara med bacon og ost, ikke restaurantfoto" : isButterChicken ? "Redaksjonelt foto av butter chicken med kyllinglår i kremet saus, ikke restaurantfoto" : isPizzaMarinara ? "Redaksjonelt foto av pizza marinara uten ost, ikke restaurantfoto" : isCacioEPepe ? "Redaksjonelt foto av cacio e pepe med pecorino og sort pepper, ikke restaurantfoto" : isGyoza ? "Redaksjonelt foto av seks pannestekte gyoza med soyadipp, ikke restaurantfoto" : isChickenKatsu ? "Redaksjonelt foto av panert kyllingkatsu med ris og nori, ikke restaurantfoto" : isYakitori ? "Redaksjonelt foto av to grillede yakitori-kyllingspyd med sitron, ikke restaurantfoto" : isUdonTempura ? "Redaksjonelt foto av udon med reketempura i blåhvit skål, ikke restaurantfoto" : isBao ? "Redaksjonelt foto av bao med rødbraisert svinekjøtt og grønt på hel tallerken, ikke restaurantfoto fra Fysen" : isDumplings ? "Redaksjonelt foto av tre dampede dumplings med sesam i treskål og spisepinner, ikke restaurantfoto" : isMapoTofu ? "Redaksjonelt foto av mapo tofu i svart skål, ikke restaurantfoto" : isPekingDuck ? "Redaksjonelt foto av pekingand med pannekaker og tilbehør" : isPho ? "Redaksjonelt foto av phở bò med storfekjøtt, nudler og kraft, ikke restaurantfoto" : `KI-illustrasjon av ${illustratedVariant}, ikke restaurantfoto`}
      className={isPizzaMargherita ? "dishPhotoSmall dishPhotoPizzaMargherita" : isSushi ? "dishPhotoSmall dishPhotoSushi" : isRamen ? "dishPhotoSmall dishPhotoRamen" : isCarbonara ? "dishPhotoSmall dishPhotoCarbonara" : isButterChicken ? "dishPhotoSmall dishPhotoButterChicken" : isPizzaMarinara ? "dishPhotoSmall dishPhotoPizzaMarinara" : isFalafel ? "dishPhotoSmall dishPhotoFalafel" : isTacosAlPastor ? "dishPhotoSmall dishPhotoTacosAlPastor" : isCacioEPepe ? "dishPhotoSmall dishPhotoCacioEPepe" : isChanaMasala ? "dishPhotoSmall dishPhotoChanaMasala" : isMasalaDosa ? "dishPhotoSmall dishPhotoMasalaDosa" : isChickenKatsu ? "dishPhotoSmall dishPhotoChickenKatsu" : isYakitori ? "dishPhotoSmall dishPhotoYakitori" : isUdonTempura ? "dishPhotoSmall dishPhotoUdonTempura" : isBao ? "dishPhotoSmall dishPhotoBao" : isDumplings ? "dishPhotoSmall dishPhotoDumplings" : isMapoTofu ? "dishPhotoSmall dishPhotoMapoTofu" : isPekingDuck ? "dishPhotoSmall dishPhotoPekingDuck" : isDanDanNoodles ? "dishPhotoSmall dishPhotoDanDanNoodles" : isGreenCurry ? "dishPhotoSmall dishPhotoGreenCurry" : isPho ? "dishPhotoSmall dishPhotoPho" : isBunCha ? "dishPhotoSmall dishPhotoBunCha" : isGoiCuon ? "dishPhotoSmall dishPhotoGoiCuon" : isTandoori ? "dishPhotoSmall dishPhotoTandoori" : isNaan ? "dishPhotoSmall dishPhotoNaan" : isDalMakhani ? "dishPhotoSmall dishPhotoDalMakhani" : isIdli ? "dishPhotoSmall dishPhotoIdli" : isSambar ? "dishPhotoSmall dishPhotoSambar" : isVada ? "dishPhotoSmall dishPhotoVada" : isBanhMi ? "dishPhotoSmall dishPhotoBanhMi" : isPadKraPao ? "dishPhotoSmall dishPhotoPadKraPao" : isTomYum ? "dishPhotoSmall dishPhotoTomYum" : isSeries04 ? "dishPhotoSmall dishPhotoSeries04" : "dishPhotoSmall"}
      style={{ backgroundPosition: position }}
    />
  );
}
