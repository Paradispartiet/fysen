import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const tandooriTranslations = {
  "nn": {
    "overview": "Tandoori skildrar først og fremst ein teknikk. Råvara blir gjerne marinert med yoghurt, syre og krydder før ho møter intens varme i ein tandoor, som gjev rask steiking, rista kantar og saftig innside.",
    "history": "Tandooromnar har lange tradisjonar i Sør- og Sentral-Asia. Tandoori chicken er særleg knytt til nordindisk og punjabisk restaurantmat og blei ein svært synleg del av moderne indisk matkultur gjennom 1900-talet.",
    "flavor": "Syrleg yoghurt, aromatiske krydder, røyk og brende kantar gjev intens, men ikkje nødvendigvis svært sterk smak. Sitron, lauk og chutney gjev frisk kontrast.",
    "technique": "Marinaden må få tid til å verke, men overflata bør ikkje vere våt når råvara møter høg varme. Heime fungerer svært varm omn, grill eller grillfunksjon best når råvara ligg luftig og får farge raskt.",
    "essentials": [
      "Yoghurt som ber krydder og bidreg til mørheit.",
      "Ingefær, kvitlauk og krydder som spisskummen, koriander og garam masala.",
      "Syre frå sitron eller lime.",
      "Høg, direkte varme som gjev rista kantar utan å tørke ut innsida."
    ],
    "recipe": {
      "label": "Tandoori-inspirert kylling heime",
      "yield": "4 porsjonar",
      "time": "45 min + marinering",
      "ingredients": [
        "700 g kyllinglår utan bein",
        "150 g naturell yoghurt",
        "2 ss sitronsaft",
        "3 kvitlauksfedd, rivne",
        "20 g ingefær, riven",
        "1 ts spisskummen",
        "1 ts malen koriander",
        "1 ts garam masala",
        "1 ts paprika eller kashmiri-chili",
        "salt",
        "1 ss nøytral olje"
      ],
      "steps": [
        "Bland yoghurt, sitron, ingefær, kvitlauk, krydder og salt.",
        "Vend kyllingen i marinaden og lat han stå minst 2 timar, gjerne over natta.",
        "Varm omnen så høgt han går, helst med grillfunksjon eller ein varm bakestein/stålplate.",
        "Legg kyllingen luftig på rist eller brett og steik til han har mørke kantar og er gjennomsteikt.",
        "Lat kjøtet kvile kort og server med sitron, lauk, koriander og chutney."
      ]
    },
    "variants": [
      "Tandoori chicken: klassisk restaurantvariant med kylling.",
      "Paneer tikka: paneer og grønsaker steikte med liknande marinade og høg varme.",
      "Fish tikka: fastare fisk marinert kortare og steikt raskt.",
      "Tandoori-grønsaker: blomkål, sopp eller paprika eignar seg godt til teknikken."
    ],
    "serving": [
      "Server gjerne med naan eller ris, rå lauk, sitron og grøn chutney.",
      "Tandoori kan vere hovudrett eller del av ei større samling rettar."
    ],
    "commonMistakes": [
      "For låg varme, slik at råvara kokar i marinaden i staden for å ristast.",
      "For mykje våt marinade på overflata.",
      "Å bruke magert kjøt og steikje det for lenge."
    ]
  },
  "sv": {
    "overview": "Tandoori beskriver främst en teknik. Råvaran marineras gärna med yoghurt, syra och kryddor innan den möter intensiv hetta i en tandoor, vilket ger snabb tillagning, rostade kanter och saftig insida.",
    "history": "Tandoorugnar har långa traditioner i Syd- och Centralasien. Tandoori chicken är särskilt förknippad med nordindisk och punjabisk restaurangmat och blev en framträdande del av modern indisk matkultur under 1900-talet.",
    "flavor": "Syrlig yoghurt, aromatiska kryddor, rök och brända kanter ger intensiv men inte nödvändigtvis mycket stark smak. Citron, lök och chutney ger frisk kontrast.",
    "technique": "Marinaden måste få tid att verka, men ytan bör inte vara blöt när råvaran möter hög värme. Hemma fungerar mycket het ugn, grill eller grillfunktion bäst när råvaran ligger luftigt och snabbt får färg.",
    "essentials": [
      "Yoghurt som bär kryddorna och bidrar till mörhet.",
      "Ingefära, vitlök och kryddor som spiskummin, koriander och garam masala.",
      "Syra från citron eller lime.",
      "Hög, direkt värme som ger rostade kanter utan att torka ut insidan."
    ],
    "recipe": {
      "label": "Tandoori-inspirerad kyckling hemma",
      "yield": "4 portioner",
      "time": "45 min + marinering",
      "ingredients": [
        "700 g benfria kycklinglår",
        "150 g naturell yoghurt",
        "2 msk citronsaft",
        "3 vitlöksklyftor, rivna",
        "20 g ingefära, riven",
        "1 tsk spiskummin",
        "1 tsk malen koriander",
        "1 tsk garam masala",
        "1 tsk paprikapulver eller kashmirichili",
        "salt",
        "1 msk neutral olja"
      ],
      "steps": [
        "Blanda yoghurt, citron, ingefära, vitlök, kryddor och salt.",
        "Vänd kycklingen i marinaden och låt stå minst 2 timmar, gärna över natten.",
        "Värm ugnen så högt det går, helst med grillfunktion eller en het baksten/stålplatta.",
        "Lägg kycklingen luftigt på galler eller plåt och stek tills den har mörka kanter och är genomstekt.",
        "Låt köttet vila kort och servera med citron, lök, koriander och chutney."
      ]
    },
    "variants": [
      "Tandoori chicken: klassisk restaurangvariant med kyckling.",
      "Paneer tikka: paneer och grönsaker tillagade med liknande marinad och hög värme.",
      "Fish tikka: fastare fisk marinerad kortare tid och snabbt tillagad.",
      "Tandoorigrönsaker: blomkål, svamp eller paprika passar bra för tekniken."
    ],
    "serving": [
      "Servera gärna med naan eller ris, rå lök, citron och grön chutney.",
      "Tandoori kan vara huvudrätt eller del av en större samling rätter."
    ],
    "commonMistakes": [
      "För låg värme, så att råvaran kokas i marinaden i stället för att rostas.",
      "För mycket blöt marinad på ytan.",
      "Att använda magert kött och tillaga det för länge."
    ]
  },
  "da": {
    "overview": "Tandoori beskriver først og fremmest en teknik. Råvaren marineres gerne med yoghurt, syre og krydderier, før den møder intens varme i en tandoor, som giver hurtig stegning, ristede kanter og saftig inderside.",
    "history": "Tandoorovne har lange traditioner i Syd- og Centralasien. Tandoori chicken er især knyttet til nordindisk og punjabisk restaurantmad og blev en meget synlig del af moderne indisk madkultur gennem 1900-tallet.",
    "flavor": "Syrlig yoghurt, aromatiske krydderier, røg og brændte kanter giver intens, men ikke nødvendigvis meget stærk smag. Citron, løg og chutney giver frisk kontrast.",
    "technique": "Marinaden skal have tid til at virke, men overfladen bør ikke være våd, når råvaren møder høj varme. Hjemme fungerer en meget varm ovn, grill eller grillfunktion bedst, når råvaren ligger med luft omkring sig og hurtigt får farve.",
    "essentials": [
      "Yoghurt, der bærer krydderierne og bidrager til mørhed.",
      "Ingefær, hvidløg og krydderier som spidskommen, koriander og garam masala.",
      "Syre fra citron eller lime.",
      "Høj, direkte varme, der giver ristede kanter uden at udtørre indersiden."
    ],
    "recipe": {
      "label": "Tandoori-inspireret kylling derhjemme",
      "yield": "4 portioner",
      "time": "45 min + marinering",
      "ingredients": [
        "700 g udbenede kyllingelår",
        "150 g naturel yoghurt",
        "2 spsk citronsaft",
        "3 fed hvidløg, revet",
        "20 g ingefær, revet",
        "1 tsk spidskommen",
        "1 tsk stødt koriander",
        "1 tsk garam masala",
        "1 tsk paprika eller kashmirichili",
        "salt",
        "1 spsk neutral olie"
      ],
      "steps": [
        "Bland yoghurt, citron, ingefær, hvidløg, krydderier og salt.",
        "Vend kyllingen i marinaden, og lad den stå mindst 2 timer, gerne natten over.",
        "Varm ovnen så højt som muligt, helst med grillfunktion eller en varm bagesten/stålplade.",
        "Læg kyllingen med luft omkring sig på rist eller plade, og steg, til den har mørke kanter og er gennemstegt.",
        "Lad kødet hvile kort, og servér med citron, løg, koriander og chutney."
      ]
    },
    "variants": [
      "Tandoori chicken: klassisk restaurantvariant med kylling.",
      "Paneer tikka: paneer og grøntsager tilberedt med lignende marinade og høj varme.",
      "Fish tikka: fastere fisk marineret kortere tid og stegt hurtigt.",
      "Tandoorigrøntsager: blomkål, svampe eller peberfrugt egner sig godt til teknikken."
    ],
    "serving": [
      "Servér gerne med naan eller ris, rå løg, citron og grøn chutney.",
      "Tandoori kan være hovedret eller del af et større udvalg af retter."
    ],
    "commonMistakes": [
      "For lav varme, så råvaren koger i marinaden frem for at blive ristet.",
      "For meget våd marinade på overfladen.",
      "At bruge magert kød og stege det for længe."
    ]
  },
  "fi": {
    "overview": "Tandoori tarkoittaa ensisijaisesti valmistustekniikkaa. Raaka-aine marinoidaan usein jogurtilla, hapolla ja mausteilla ennen voimakasta kuumuutta tandooriuunissa, jolloin se kypsyy nopeasti, saa paahtuneet reunat ja säilyy mehukkaana sisältä.",
    "history": "Tandooriuuneilla on pitkät perinteet Etelä- ja Keski-Aasiassa. Tandoori chicken yhdistetään erityisesti pohjoisintialaiseen ja punjabilaiseen ravintolaruokaan, ja siitä tuli näkyvä osa modernia intialaista ruokakulttuuria 1900-luvulla.",
    "flavor": "Hapan jogurtti, aromaattiset mausteet, savu ja hiiltyneet reunat antavat voimakkaan mutta eivät välttämättä hyvin tulisen maun. Sitruuna, sipuli ja chutney tuovat raikkaan vastapainon.",
    "technique": "Marinadin on annettava vaikuttaa, mutta pinta ei saisi olla märkä kovassa kuumuudessa. Kotona hyvin kuuma uuni, grilli tai grillivastus toimii parhaiten, kun raaka-aineen ympärillä on tilaa ja se ruskistuu nopeasti.",
    "essentials": [
      "Jogurttia mausteiden kantajaksi ja mureuttamiseen.",
      "Inkivääriä, valkosipulia ja mausteita, kuten juustokuminaa, korianteria ja garam masalaa.",
      "Hapokkuutta sitruunasta tai limestä.",
      "Korkea, suora lämpö, joka paahtaa reunat kuivattamatta sisusta."
    ],
    "recipe": {
      "label": "Tandoorityylinen kana kotona",
      "yield": "4 annosta",
      "time": "45 min + marinointi",
      "ingredients": [
        "700 g luutonta kanan reisilihaa",
        "150 g maustamatonta jogurttia",
        "2 rkl sitruunamehua",
        "3 valkosipulinkynttä, raastettuina",
        "20 g inkivääriä, raastettuna",
        "1 tl juustokuminaa",
        "1 tl jauhettua korianteria",
        "1 tl garam masalaa",
        "1 tl paprikajauhetta tai kashmirinchiliä",
        "suolaa",
        "1 rkl neutraalin makuista öljyä"
      ],
      "steps": [
        "Sekoita jogurtti, sitruuna, inkivääri, valkosipuli, mausteet ja suola.",
        "Kääntele kana marinadissa ja anna marinoitua vähintään 2 tuntia, mielellään yön yli.",
        "Kuumenna uuni mahdollisimman kuumaksi, mieluiten grillivastuksella tai kuumalla paistokivellä/teräslevyllä.",
        "Asettele kana väljästi ritilälle tai pellille ja paista, kunnes reunat ovat tummat ja kana täysin kypsää.",
        "Anna lihan levätä hetki ja tarjoile sitruunan, sipulin, korianterin ja chutneyn kanssa."
      ]
    },
    "variants": [
      "Tandoori chicken: klassinen ravintolaversio kanasta.",
      "Paneer tikka: paneeria ja kasviksia vastaavassa marinadissa korkealla lämmöllä kypsennettynä.",
      "Fish tikka: kiinteämpi kala, joka marinoidaan lyhyemmin ja kypsennetään nopeasti.",
      "Tandoorikasvikset: kukkakaali, sienet tai paprika sopivat tekniikkaan hyvin."
    ],
    "serving": [
      "Tarjoile naanin tai riisin, raa'an sipulin, sitruunan ja vihreän chutneyn kanssa.",
      "Tandoori voi olla pääruoka tai osa suurempaa ruokalajikokonaisuutta."
    ],
    "commonMistakes": [
      "Liian matala lämpö, jolloin raaka-aine hautuu marinadissa paahtumisen sijaan.",
      "Liikaa märkää marinadia pinnalla.",
      "Vähärasvaisen lihan liian pitkä kypsentäminen."
    ]
  },
  "is": {
    "overview": "Tandoori lýsir fyrst og fremst eldunaraðferð. Hráefnið er gjarnan marinerað með jógúrt, sýru og kryddi áður en það fer í mikinn hita í tandoor-ofni, sem gefur hraða eldun, ristaðar brúnir og safaríkt innra byrði.",
    "history": "Tandoor-ofnar eiga sér langa hefð í Suður- og Mið-Asíu. Tandoori chicken tengist einkum norður-indverskum og punjabískum veitingahúsamat og varð áberandi hluti af nútíma indverskri matarmenningu á 20. öld.",
    "flavor": "Súr jógúrt, ilmandi krydd, reykur og brenndar brúnir gefa kröftugt en ekki endilega mjög sterkt bragð. Sítróna, laukur og chutney gefa ferska andstæðu.",
    "technique": "Marineringin þarf tíma til að virka, en yfirborðið ætti ekki að vera blautt þegar hráefnið mætir miklum hita. Heima hentar mjög heitur ofn, grill eða grillstilling best þegar loft leikur um hráefnið og það brúnast hratt.",
    "essentials": [
      "Jógúrt sem ber kryddin og stuðlar að mýkt.",
      "Engifer, hvítlaukur og krydd eins og kúmín, kóríander og garam masala.",
      "Sýra úr sítrónu eða límónu.",
      "Mikill, beinn hiti sem gefur ristaðar brúnir án þess að þurrka innra byrðið."
    ],
    "recipe": {
      "label": "Tandoori-innblásinn kjúklingur heima",
      "yield": "4 skammtar",
      "time": "45 mín. + marinering",
      "ingredients": [
        "700 g beinlaus kjúklingalæri",
        "150 g óbragðbætt jógúrt",
        "2 msk. sítrónusafi",
        "3 hvítlauksrif, rifin",
        "20 g engifer, rifið",
        "1 tsk. kúmín",
        "1 tsk. malaður kóríander",
        "1 tsk. garam masala",
        "1 tsk. paprikuduft eða kashmiri-chili",
        "salt",
        "1 msk. bragðlítil olía"
      ],
      "steps": [
        "Blandið jógúrt, sítrónu, engifer, hvítlauk, kryddi og salti.",
        "Veltið kjúklingnum upp úr marineringunni og látið standa í að minnsta kosti 2 klukkustundir, helst yfir nótt.",
        "Hitið ofninn eins hátt og hægt er, helst með grillstillingu eða heitum bökunarsteini/stálplötu.",
        "Leggið kjúklinginn með góðu bili á grind eða plötu og eldið þar til hann hefur dökkar brúnir og er fulleldaður.",
        "Látið kjötið hvíla stutt og berið fram með sítrónu, lauk, kóríander og chutney."
      ]
    },
    "variants": [
      "Tandoori chicken: klassísk veitingahúsaútgáfa með kjúklingi.",
      "Paneer tikka: paneer og grænmeti eldað við mikinn hita með svipaðri marineringu.",
      "Fish tikka: stinnari fiskur marineraður skemur og eldaður hratt.",
      "Tandoori-grænmeti: blómkál, sveppir eða paprika henta vel fyrir aðferðina."
    ],
    "serving": [
      "Berið gjarnan fram með naan eða hrísgrjónum, hráum lauk, sítrónu og grænu chutney.",
      "Tandoori getur verið aðalréttur eða hluti af stærra úrvali rétta."
    ],
    "commonMistakes": [
      "Of lágur hiti sem veldur því að hráefnið sýður í marineringunni í stað þess að ristast.",
      "Of mikil blaut marinering á yfirborðinu.",
      "Að nota magurt kjöt og elda það of lengi."
    ]
  },
  "en": {
    "overview": "Tandoori primarily describes a technique. Ingredients are often marinated with yoghurt, acidity and spices before meeting intense heat in a tandoor, producing rapid cooking, roasted edges and a juicy interior.",
    "history": "Tandoor ovens have long traditions in South and Central Asia. Tandoori chicken is particularly associated with northern Indian and Punjabi restaurant food and became a prominent part of modern Indian culinary culture during the twentieth century.",
    "flavor": "Tangy yoghurt, aromatic spices, smoke and charred edges give an intense but not necessarily very hot flavour. Lemon, onion and chutney provide fresh contrast.",
    "technique": "The marinade needs time to work, but the surface should not be wet when exposed to high heat. At home, a very hot oven, grill or grill setting works best when ingredients have space around them and brown quickly.",
    "essentials": [
      "Yoghurt to carry the spices and help tenderise.",
      "Ginger, garlic and spices such as cumin, coriander and garam masala.",
      "Acidity from lemon or lime.",
      "High, direct heat to roast the edges without drying the inside."
    ],
    "recipe": {
      "label": "Homemade tandoori-inspired chicken",
      "yield": "4 servings",
      "time": "45 min + marinating",
      "ingredients": [
        "700 g boneless chicken thighs",
        "150 g plain yoghurt",
        "2 tbsp lemon juice",
        "3 garlic cloves, grated",
        "20 g ginger, grated",
        "1 tsp cumin",
        "1 tsp ground coriander",
        "1 tsp garam masala",
        "1 tsp paprika or Kashmiri chilli",
        "salt",
        "1 tbsp neutral oil"
      ],
      "steps": [
        "Mix yoghurt, lemon, ginger, garlic, spices and salt.",
        "Coat the chicken in the marinade and leave for at least 2 hours, preferably overnight.",
        "Heat the oven as high as it will go, ideally using the grill setting or a hot baking stone/steel plate.",
        "Space the chicken out on a rack or tray and cook until it has dark edges and is cooked through.",
        "Rest the meat briefly and serve with lemon, onion, coriander and chutney."
      ]
    },
    "variants": [
      "Tandoori chicken: classic restaurant version with chicken.",
      "Paneer tikka: paneer and vegetables cooked with a similar marinade and high heat.",
      "Fish tikka: firmer fish marinated for less time and cooked quickly.",
      "Tandoori vegetables: cauliflower, mushrooms or peppers work well with the technique."
    ],
    "serving": [
      "Serve with naan or rice, raw onion, lemon and green chutney.",
      "Tandoori can be a main course or part of a larger selection of dishes."
    ],
    "commonMistakes": [
      "Insufficient heat, causing the ingredients to simmer in the marinade rather than roast.",
      "Too much wet marinade on the surface.",
      "Using lean meat and cooking it for too long."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
