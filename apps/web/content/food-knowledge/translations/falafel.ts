import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";

type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const falafelTranslations = {
  "nn": {
    "overview": "Falafel blir vanlegvis laga av ukokte, bløytte kikerter eller favabønner som blir malne med urter og aromatiske ingrediensar. Når massen er passe grov og tørr nok, utvidar han seg i frityren og får ein saftig og porøs kjerne i staden for ein kompakt kjerne.",
    "history": "Det nøyaktige opphavet er omdiskutert, men falafel har sterke historiske band til Egypt og Levanten. Råvarer, krydring, form og servering varierer mellom land, byar og familiar.",
    "flavor": "Nøtteaktige belgvekstar, spisskummen, koriander, kvitlauk og friske urter, med tydeleg rista smak frå friteringa.",
    "technique": "Tørre belgvekstar blir bløytte, men vanlegvis ikkje kokte før maling. Massen skal likne grove, fuktige smular og kvile før forming; for fin puré gjev tett falafel.",
    "essentials": [
      "Tørre kikerter eller favabønner som blir bløytte lenge.",
      "Persille, koriander, lauk og kvitlauk.",
      "Spisskummen og andre regionale krydder.",
      "Høg nok frityrtemperatur til at skorpa set seg raskt."
    ],
    "recipe": {
      "label": "Kikertfalafel",
      "yield": "18–20 stk.",
      "time": "ca. 35 min + 12–18 t bløytlegging",
      "ingredients": [
        "250 g tørre kikerter",
        "1 liten lauk",
        "3 kvitlauksfedd",
        "1 stor handfull persille",
        "1 liten handfull koriander",
        "1 ts spisskummen",
        "1 ts malen koriander",
        "1/2 ts bakepulver",
        "1–1,5 ts salt",
        "nøytral olje til fritering"
      ],
      "steps": [
        "Bløytlegg kikertene i rikeleg kaldt vatn i 12–18 timar og tørk dei godt.",
        "Køyr kikerter, lauk, kvitlauk og urter i korte pulsar til grove, fuktige smular.",
        "Bland inn krydder, bakepulver og salt og lat massen kvile minst 20 minutt.",
        "Form små bollar eller flate kaker og test éin i oljen før resten blir fritert.",
        "Friter til dei er mørkgyllne og sprø utanpå og gjennomvarme inni, og lat dei renne av på rist."
      ]
    },
    "variants": [
      "Levantinsk kikertfalafel.",
      "Egyptisk ta'ameya med favabønner og ofte svært grønt urtepreg.",
      "Sesamdekt falafel.",
      "Omnsbakte variantar finst, men får ein annan tekstur enn fritert falafel."
    ],
    "serving": [
      "Blir servert i pita eller som del av mezze med tahinisaus, salat og sylta grønsaker.",
      "Syrleg og friskt garnityr er viktig som kontrast til den friterte skorpa."
    ],
    "commonMistakes": [
      "Å bruke ferdigkokte kikerter og få ein laus eller grautete masse.",
      "Å køyre massen til hummuskonsistens.",
      "For kald olje som gjer falafelen tung og feit."
    ]
  },
  "sv": {
    "overview": "Falafel görs vanligen av okokta, blötlagda kikärter eller bondbönor som mals med örter och aromatiska ingredienser. När smeten är lagom grov och tillräckligt torr expanderar den i frityren och får en saftig och porös kärna i stället för en kompakt.",
    "history": "Det exakta ursprunget är omdiskuterat, men falafel har starka historiska kopplingar till Egypten och Levanten. Råvaror, kryddning, form och servering varierar mellan länder, städer och familjer.",
    "flavor": "Nötaktiga baljväxter, spiskummin, koriander, vitlök och färska örter, med tydlig rostad smak från friteringen.",
    "technique": "Torkade baljväxter blötläggs men kokas normalt inte före malning. Smeten ska likna grova, fuktiga smulor och vila före formning; en alltför fin puré ger kompakt falafel.",
    "essentials": [
      "Torkade kikärter eller bondbönor som blötläggs länge.",
      "Persilja, koriander, lök och vitlök.",
      "Spiskummin och andra regionala kryddor.",
      "Tillräckligt hög frityrtemperatur för att ytan snabbt ska stelna."
    ],
    "recipe": {
      "label": "Kikärtsfalafel",
      "yield": "18–20 st.",
      "time": "ca 35 min + 12–18 tim blötläggning",
      "ingredients": [
        "250 g torkade kikärter",
        "1 liten lök",
        "3 vitlöksklyftor",
        "1 stor näve persilja",
        "1 liten näve koriander",
        "1 tsk spiskummin",
        "1 tsk malen koriander",
        "1/2 tsk bakpulver",
        "1–1,5 tsk salt",
        "neutral olja till fritering"
      ],
      "steps": [
        "Blötlägg kikärterna i rikligt med kallt vatten i 12–18 timmar och torka dem väl.",
        "Mixa kikärter, lök, vitlök och örter med korta pulser till grova, fuktiga smulor.",
        "Blanda i kryddor, bakpulver och salt och låt smeten vila minst 20 minuter.",
        "Forma små bollar eller platta kakor och provfritera en innan resten friteras.",
        "Fritera tills de är mörkt gyllene och krispiga utanpå och genomvarma inuti, och låt dem rinna av på galler."
      ]
    },
    "variants": [
      "Levantinsk kikärtsfalafel.",
      "Egyptisk ta'ameya med bondbönor och ofta en mycket grön örtprofil.",
      "Sesamtäckt falafel.",
      "Ugnsbakade varianter finns, men de får en annan konsistens än friterad falafel."
    ],
    "serving": [
      "Serveras i pitabröd eller som en del av mezze med tahinisås, sallad och inlagda grönsaker.",
      "Syrliga och fräscha tillbehör är viktiga som kontrast till den friterade ytan."
    ],
    "commonMistakes": [
      "Att använda färdigkokta kikärter och få en lös eller grötig smet.",
      "Att mixa smeten till hummuskonsistens.",
      "För kall olja som gör falafeln tung och fet."
    ]
  },
  "da": {
    "overview": "Falafel laves normalt af ukogte, udblødte kikærter eller hestebønner, der males med urter og aromatiske ingredienser. Når massen er tilpas grov og tør nok, udvider den sig i frituren og får en saftig og porøs kerne frem for en kompakt kerne.",
    "history": "Den præcise oprindelse er omdiskuteret, men falafel har stærke historiske forbindelser til Egypten og Levanten. Råvarer, krydring, form og servering varierer mellem lande, byer og familier.",
    "flavor": "Nøddeagtige bælgfrugter, spidskommen, koriander, hvidløg og friske urter med en tydelig ristet smag fra friteringen.",
    "technique": "Tørrede bælgfrugter udblødes, men koges normalt ikke inden maling. Massen skal ligne grove, fugtige krummer og hvile inden formning; for fin puré giver kompakt falafel.",
    "essentials": [
      "Tørrede kikærter eller hestebønner, der udblødes længe.",
      "Persille, koriander, løg og hvidløg.",
      "Spidskommen og andre regionale krydderier.",
      "Tilstrækkeligt høj frituretemperatur til, at skorpen hurtigt sætter sig."
    ],
    "recipe": {
      "label": "Kikærtefalafel",
      "yield": "18–20 stk.",
      "time": "ca. 35 min + 12–18 t udblødning",
      "ingredients": [
        "250 g tørrede kikærter",
        "1 lille løg",
        "3 fed hvidløg",
        "1 stor håndfuld persille",
        "1 lille håndfuld koriander",
        "1 tsk spidskommen",
        "1 tsk stødt koriander",
        "1/2 tsk bagepulver",
        "1–1,5 tsk salt",
        "neutral olie til fritering"
      ],
      "steps": [
        "Udblød kikærterne i rigeligt koldt vand i 12–18 timer, og tør dem godt.",
        "Kør kikærter, løg, hvidløg og urter i korte pulser til grove, fugtige krummer.",
        "Bland krydderier, bagepulver og salt i, og lad massen hvile mindst 20 minutter.",
        "Form små kugler eller flade kager, og prøv én i olien, inden resten friteres.",
        "Fritér, til de er mørkgyldne og sprøde udenpå og gennemvarme indeni, og lad dem dryppe af på en rist."
      ]
    },
    "variants": [
      "Levantinsk kikærtefalafel.",
      "Egyptisk ta'ameya med hestebønner og ofte en meget grøn urteprofil.",
      "Sesamdækket falafel.",
      "Ovnbagte varianter findes, men får en anden tekstur end friteret falafel."
    ],
    "serving": [
      "Serveres i pita eller som del af mezze med tahinsauce, salat og syltede grøntsager.",
      "Syrligt og friskt tilbehør er vigtigt som kontrast til den friterede skorpe."
    ],
    "commonMistakes": [
      "At bruge færdigkogte kikærter og få en løs eller grødagtig masse.",
      "At køre massen til hummuskonsistens.",
      "For kold olie, som gør falaflen tung og fedtet."
    ]
  },
  "fi": {
    "overview": "Falafel valmistetaan yleensä kypsentämättömistä, liotetuista kikherneistä tai härkäpavuista, jotka jauhetaan yrttien ja aromaattisten ainesten kanssa. Kun massa on sopivan karkeaa ja riittävän kuivaa, se laajenee uppopaistettaessa ja saa tiiviin sisuksen sijaan mehukkaan ja huokoisen rakenteen.",
    "history": "Tarkasta alkuperästä kiistellään, mutta falafelilla on vahvat historialliset yhteydet Egyptiin ja Levanttiin. Raaka-aineet, maustaminen, muoto ja tarjoilu vaihtelevat maittain, kaupungeittain ja perheittäin.",
    "flavor": "Pähkinäisen makuisia palkokasveja, juustokuminaa, korianteria, valkosipulia ja tuoreita yrttejä sekä uppopaistamisesta syntyvä selvä paahteinen maku.",
    "technique": "Kuivat palkokasvit liotetaan, mutta niitä ei yleensä keitetä ennen jauhamista. Massan tulee muistuttaa karkeita, kosteita muruja, ja sen annetaan levätä ennen muotoilua; liian hienosta soseesta tulee tiivis falafel.",
    "essentials": [
      "Kuivia kikherneitä tai härkäpapuja, joita liotetaan pitkään.",
      "Persiljaa, korianteria, sipulia ja valkosipulia.",
      "Juustokuminaa ja muita alueellisia mausteita.",
      "Riittävän korkea uppopaistolämpötila, jotta kuori muodostuu nopeasti."
    ],
    "recipe": {
      "label": "Kikhernefalafel",
      "yield": "18–20 kpl",
      "time": "n. 35 min + 12–18 t liotus",
      "ingredients": [
        "250 g kuivattuja kikherneitä",
        "1 pieni sipuli",
        "3 valkosipulinkynttä",
        "1 iso kourallinen persiljaa",
        "1 pieni kourallinen korianteria",
        "1 tl juustokuminaa",
        "1 tl jauhettua korianteria",
        "1/2 tl leivinjauhetta",
        "1–1,5 tl suolaa",
        "neutraalin makuista öljyä uppopaistamiseen"
      ],
      "steps": [
        "Liota kikherneitä runsaassa kylmässä vedessä 12–18 tuntia ja kuivaa ne hyvin.",
        "Jauha kikherneet, sipuli, valkosipuli ja yrtit lyhyillä sykäyksillä karkeaksi, kosteaksi muruseokseksi.",
        "Sekoita joukkoon mausteet, leivinjauhe ja suola ja anna massan levätä vähintään 20 minuuttia.",
        "Muotoile pieniä pyöryköitä tai litteitä pihvejä ja kokeile yhden paistamista öljyssä ennen loppujen uppopaistamista.",
        "Uppopaista tumman kullanruskeiksi, ulkoa rapeiksi ja sisältä kauttaaltaan kuumiksi. Valuta ritilällä."
      ]
    },
    "variants": [
      "Levanttilainen kikhernefalafel.",
      "Egyptiläinen ta'ameya, jossa käytetään härkäpapuja ja usein runsaasti vihreitä yrttejä.",
      "Seesaminsiemenillä päällystetty falafel.",
      "Myös uunissa paistettuja muunnelmia on olemassa, mutta niiden rakenne eroaa uppopaistetusta falafelista."
    ],
    "serving": [
      "Tarjoillaan pitaleivässä tai osana mezze-ateriaa tahinikastikkeen, salaatin ja pikkelöityjen kasvisten kanssa.",
      "Hapokkaat ja raikkaat lisukkeet ovat tärkeä vastapaino uppopaistetulle kuorelle."
    ],
    "commonMistakes": [
      "Valmiiksi kypsien kikherneiden käyttäminen, jolloin massasta tulee löysää tai puuromaista.",
      "Massan jauhaminen hummuksen kaltaiseksi.",
      "Liian viileä öljy, joka tekee falafelista raskaan ja rasvaisen."
    ]
  },
  "is": {
    "overview": "Falafel er yfirleitt gert úr ósoðnum, bleyttum kjúklingabaunum eða breiðbaunum sem eru malaðar með kryddjurtum og ilmandi hráefni. Þegar blandan er hæfilega gróf og nógu þurr þenst hún út við djúpsteikingu og verður safarík og loftkennd að innan í stað þess að vera þétt.",
    "history": "Deilt er um nákvæman uppruna falafel, en rétturinn á sterk söguleg tengsl við Egyptaland og Levant. Hráefni, kryddun, lögun og framreiðsla eru breytileg milli landa, borga og fjölskyldna.",
    "flavor": "Hnetukennt bragð belgjurta, kúmín, kóríander, hvítlaukur og ferskar kryddjurtir ásamt greinilegu ristuðu bragði frá djúpsteikingunni.",
    "technique": "Þurrar belgjurtir eru lagðar í bleyti en yfirleitt ekki soðnar fyrir mölun. Blandan á að líkjast grófum, rökum mylsnum og hvíla áður en hún er mótuð; of fínt mauk gefur þétt falafel.",
    "essentials": [
      "Þurrar kjúklingabaunir eða breiðbaunir sem eru lagðar lengi í bleyti.",
      "Steinselja, kóríander, laukur og hvítlaukur.",
      "Kúmín og önnur svæðisbundin krydd.",
      "Nógu heit steikingarolía til að skorpan myndist hratt."
    ],
    "recipe": {
      "label": "Falafel úr kjúklingabaunum",
      "yield": "18–20 stk.",
      "time": "u.þ.b. 35 mín. + 12–18 klst. í bleyti",
      "ingredients": [
        "250 g þurrar kjúklingabaunir",
        "1 lítill laukur",
        "3 hvítlauksrif",
        "1 stór lúka af steinselju",
        "1 lítil lúka af kóríander",
        "1 tsk. kúmín",
        "1 tsk. malaður kóríander",
        "1/2 tsk. lyftiduft",
        "1–1,5 tsk. salt",
        "bragðlítil olía til djúpsteikingar"
      ],
      "steps": [
        "Leggið kjúklingabaunirnar í bleyti í miklu köldu vatni í 12–18 klukkustundir og þerrið þær vel.",
        "Malið kjúklingabaunir, lauk, hvítlauk og kryddjurtir í stuttum lotum þar til blandan verður að grófum, rökum mylsnum.",
        "Blandið kryddi, lyftidufti og salti saman við og látið blönduna hvíla í að minnsta kosti 20 mínútur.",
        "Mótið litlar kúlur eða flatar kökur og prófið eina í olíunni áður en afgangurinn er djúpsteiktur.",
        "Djúpsteikið þar til þær eru dökkgylltar og stökkar að utan og heitar í gegn. Látið renna af þeim á grind."
      ]
    },
    "variants": [
      "Falafel úr kjúklingabaunum að hætti Levant.",
      "Egypsk ta'ameya úr breiðbaunum, oft með miklu af grænum kryddjurtum.",
      "Falafel þakið sesamfræjum.",
      "Ofnbakaðar útgáfur eru til en hafa aðra áferð en djúpsteikt falafel."
    ],
    "serving": [
      "Borið fram í pítubrauði eða sem hluti af mezze með tahinisósu, salati og súrsuðu grænmeti.",
      "Súrt og ferskt meðlæti er mikilvæg andstæða við djúpsteiktu skorpuna."
    ],
    "commonMistakes": [
      "Að nota forsoðnar kjúklingabaunir þannig að blandan verði laus eða grautarkennd.",
      "Að mala blönduna þar til hún hefur áferð hummus.",
      "Of köld olía sem gerir falafel þungt og feitt."
    ]
  },
  "en": {
    "overview": "Falafel is usually made from uncooked, soaked chickpeas or fava beans ground with herbs and aromatics. When the mixture is sufficiently coarse and dry, it expands during frying, producing a moist, porous centre rather than a compact one.",
    "history": "Its exact origin is debated, but falafel has strong historical links to Egypt and the Levant. Ingredients, seasoning, shape and serving styles vary between countries, cities and families.",
    "flavor": "Nutty legumes, cumin, coriander, garlic and fresh herbs, with a distinctly toasted flavour from frying.",
    "technique": "Dried legumes are soaked but are not normally cooked before grinding. The mixture should resemble coarse, moist crumbs and rest before shaping; too fine a purée produces dense falafel.",
    "essentials": [
      "Dried chickpeas or fava beans, soaked for a long time.",
      "Parsley, coriander, onion and garlic.",
      "Cumin and other regional spices.",
      "A frying temperature high enough for the crust to set quickly."
    ],
    "recipe": {
      "label": "Chickpea falafel",
      "yield": "18–20 pieces",
      "time": "approx. 35 min + 12–18 hr soaking",
      "ingredients": [
        "250 g dried chickpeas",
        "1 small onion",
        "3 garlic cloves",
        "1 large handful of parsley",
        "1 small handful of coriander",
        "1 tsp cumin",
        "1 tsp ground coriander",
        "1/2 tsp baking powder",
        "1–1.5 tsp salt",
        "neutral oil for deep-frying"
      ],
      "steps": [
        "Soak the chickpeas in plenty of cold water for 12–18 hours and dry them well.",
        "Pulse the chickpeas, onion, garlic and herbs in short bursts until they form coarse, moist crumbs.",
        "Mix in the spices, baking powder and salt, and let the mixture rest for at least 20 minutes.",
        "Shape into small balls or flat patties and test one in the oil before frying the rest.",
        "Deep-fry until deep golden and crisp on the outside and hot throughout, then drain on a wire rack."
      ]
    },
    "variants": [
      "Levantine chickpea falafel.",
      "Egyptian ta'ameya made with fava beans and often a very green herb profile.",
      "Sesame-coated falafel.",
      "Oven-baked variants exist but have a different texture from deep-fried falafel."
    ],
    "serving": [
      "Served in pita or as part of mezze with tahini sauce, salad and pickles.",
      "Tangy, fresh garnishes are important as a contrast to the fried crust."
    ],
    "commonMistakes": [
      "Using cooked chickpeas, resulting in a loose or mushy mixture.",
      "Processing the mixture to the consistency of hummus.",
      "Oil that is too cool, making the falafel heavy and greasy."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
