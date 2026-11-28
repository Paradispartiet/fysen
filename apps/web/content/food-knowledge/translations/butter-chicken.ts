import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const butterChickenTranslations = {
  "nn": {
    "overview": "Butter chicken kombinerer grilla eller hardt steikt marinert kylling med ein glatt saus av tomat, smør og ofte fløyte. Den beste versjonen er ikkje berre søt og kremete: tomatsyre, røykpreg frå kyllingen og aromatiske krydder må vere tydelege.",
    "history": "Retten er knytt til Delhi og restaurantmiljøet som voks fram etter delinga av India. Han er nær knytt til tandoorsteikt kylling og ideen om å vende restar eller ferdiggrilla kjøt i ein rik makhani-saus.",
    "flavor": "Fyldig, mildt krydra, tomatfrisk og smørprega, ofte med bukkehornkløver som karakteristisk aromatisk tone.",
    "technique": "Marinaden skal krydre og mørne kyllingen, medan høg varme gjev steikeflate før kjøtet møter sausen. Sausen blir kokt inn før smør og fløyte justerer teksturen mot slutten.",
    "essentials": [
      "Kylling marinert med yoghurt, ingefær, kvitlauk og krydder.",
      "Tomatbase som får koke inn til rå syre er borte.",
      "Smør og eventuelt fløyte for rundheit, ikkje for å skjule krydderet.",
      "Kasuri methi eller andre aromatiske krydder til slutt."
    ],
    "recipe": {
      "label": "Butter chicken for heimekjøkkenet",
      "yield": "4 porsjonar",
      "time": "ca. 75 min + marinering",
      "ingredients": [
        "700 g kyllinglår i bitar",
        "150 g yoghurt",
        "2 ss riven ingefær og kvitlauk",
        "1 ts garam masala",
        "1 ts malen spisskummen",
        "1 ts chilipulver etter smak",
        "500 g knuste tomatar",
        "50 g smør",
        "1 dl kremfløyte",
        "1 ts kasuri methi, valfritt",
        "salt og sitron"
      ],
      "steps": [
        "Mariner kyllingen med yoghurt, halvparten av ingefær-kvitlauken og krydder i minst 30 minutt.",
        "Steik eller grill kyllingen på høg varme i porsjonar til han får tydeleg farge.",
        "Kok tomat med resten av dei aromatiske ingrediensane og krydderet til sausen blir konsentrert og blank.",
        "Rør inn smør og fløyte, legg kyllingen tilbake og lat han trekkje ferdig i sausen.",
        "Smak til med salt, sitron og knust kasuri methi rett før servering."
      ]
    },
    "variants": [
      "Restaurantstil med ekstra glatt, sila saus.",
      "Lettare variant med mindre fløyte og meir tomat.",
      "Paneer eller tofu kan bruke same sausbase i ei vegetarisk tolking."
    ],
    "serving": [
      "Blir servert med basmatiris, naan eller roti.",
      "Ein frisk salat eller syrleg pickle balanserer den rike sausen."
    ],
    "commonMistakes": [
      "Å koke rå kylling direkte i sausen utan steikeflate.",
      "For mykje sukker som gjer retten dessertaktig.",
      "Å la fløyte dominere slik at tomat og krydder forsvinn."
    ]
  },
  "sv": {
    "overview": "Butter chicken kombinerar grillad eller hårt stekt marinerad kyckling med en slät sås av tomat, smör och ofta grädde. Den bästa versionen är inte bara söt och krämig: tomatens syra, kycklingens rökighet och aromatiska kryddor måste fortfarande framträda.",
    "history": "Rätten förknippas med Delhi och restaurangmiljön som växte fram efter Indiens delning. Den är nära knuten till tandoorgrillad kyckling och idén att vända rester eller färdiggrillat kött i en rik makhanisås.",
    "flavor": "Fyllig, milt kryddad, tomatfrisk och smörig, ofta med bockhornsklöver som karakteristisk aromatisk ton.",
    "technique": "Marinaden ska både krydda och möra kycklingen, medan hög värme ger stekyta innan köttet möter såsen. Såsen kokas ihop innan smör och grädde justerar konsistensen mot slutet.",
    "essentials": [
      "Kyckling marinerad med yoghurt, ingefära, vitlök och kryddor.",
      "Tomatbas som kokas ihop tills den råa syran försvinner.",
      "Smör och eventuellt grädde för rundhet, inte för att dölja kryddorna.",
      "Kasuri methi eller andra aromatiska kryddor som avslutning."
    ],
    "recipe": {
      "label": "Butter chicken för hemmaköket",
      "yield": "4 portioner",
      "time": "ca 75 min + marinering",
      "ingredients": [
        "700 g kycklinglår i bitar",
        "150 g yoghurt",
        "2 msk riven ingefära och vitlök",
        "1 tsk garam masala",
        "1 tsk malen spiskummin",
        "1 tsk chilipulver efter smak",
        "500 g krossade tomater",
        "50 g smör",
        "1 dl vispgrädde",
        "1 tsk kasuri methi, valfritt",
        "salt och citron"
      ],
      "steps": [
        "Marinera kycklingen med yoghurt, hälften av ingefäran och vitlöken samt kryddor i minst 30 minuter.",
        "Stek eller grilla kycklingen på hög värme i omgångar tills den får tydlig färg.",
        "Koka tomat med resten av de aromatiska ingredienserna och kryddorna tills såsen blir koncentrerad och blank.",
        "Rör ner smör och grädde, lägg tillbaka kycklingen och låt den tillagas färdigt i såsen.",
        "Smaka av med salt, citron och krossad kasuri methi precis före servering."
      ]
    },
    "variants": [
      "Restaurangstil med extra slät, silad sås.",
      "Lättare variant med mindre grädde och mer tomat.",
      "Paneer eller tofu kan använda samma såsbas i en vegetarisk tolkning."
    ],
    "serving": [
      "Serveras med basmatiris, naan eller roti.",
      "En frisk sallad eller syrliga pickles balanserar den rika såsen."
    ],
    "commonMistakes": [
      "Att koka rå kyckling direkt i såsen utan stekyta.",
      "För mycket socker som gör rätten dessertlik.",
      "Att låta grädden dominera så att tomat och kryddor försvinner."
    ]
  },
  "da": {
    "overview": "Butter chicken kombinerer grillet eller hårdt stegt marineret kylling med en glat sauce af tomat, smør og ofte fløde. Den bedste version er ikke blot sød og cremet: tomatens syre, kyllingens røgpræg og aromatiske krydderier skal stadig være tydelige.",
    "history": "Retten forbindes med Delhi og restaurantmiljøet, der voksede frem efter delingen af Indien. Den er tæt knyttet til tandoortilberedt kylling og idéen om at vende rester eller færdiggrillet kød i en fyldig makhanisauce.",
    "flavor": "Fyldig, mildt krydret, tomatfrisk og smørpræget, ofte med bukkehorn som karakteristisk aromatisk tone.",
    "technique": "Marinaden skal både krydre og mørne kyllingen, mens høj varme giver stegeflade, før kødet møder saucen. Saucen koges ind, før smør og fløde justerer teksturen mod slutningen.",
    "essentials": [
      "Kylling marineret med yoghurt, ingefær, hvidløg og krydderier.",
      "Tomatbase, der koges ind, til den rå syre forsvinder.",
      "Smør og eventuelt fløde for rundhed, ikke for at skjule krydderierne.",
      "Kasuri methi eller andre aromatiske krydderier til sidst."
    ],
    "recipe": {
      "label": "Butter chicken til hjemmekøkkenet",
      "yield": "4 portioner",
      "time": "ca. 75 min + marinering",
      "ingredients": [
        "700 g kyllingelår i stykker",
        "150 g yoghurt",
        "2 spsk revet ingefær og hvidløg",
        "1 tsk garam masala",
        "1 tsk stødt spidskommen",
        "1 tsk chilipulver efter smag",
        "500 g knuste tomater",
        "50 g smør",
        "1 dl piskefløde",
        "1 tsk kasuri methi, valgfrit",
        "salt og citron"
      ],
      "steps": [
        "Marinér kyllingen med yoghurt, halvdelen af ingefæren og hvidløget samt krydderier i mindst 30 minutter.",
        "Steg eller grill kyllingen ved høj varme i portioner, til den får tydelig farve.",
        "Kog tomat med resten af de aromatiske ingredienser og krydderierne, til saucen er koncentreret og blank.",
        "Rør smør og fløde i, læg kyllingen tilbage, og lad den simre færdig i saucen.",
        "Smag til med salt, citron og knust kasuri methi lige før servering."
      ]
    },
    "variants": [
      "Restaurantstil med ekstra glat, siet sauce.",
      "Lettere variant med mindre fløde og mere tomat.",
      "Paneer eller tofu kan bruge samme saucebase i en vegetarisk fortolkning."
    ],
    "serving": [
      "Serveres med basmatiris, naan eller roti.",
      "En frisk salat eller syrlige pickles afbalancerer den fyldige sauce."
    ],
    "commonMistakes": [
      "At koge rå kylling direkte i saucen uden stegeflade.",
      "For meget sukker, som gør retten dessertagtig.",
      "At lade fløden dominere, så tomat og krydderier forsvinder."
    ]
  },
  "fi": {
    "overview": "Butter chicken yhdistää grillatun tai kovalla lämmöllä paistetun marinoidun kanan sileään tomaatti-voikastikkeeseen, jossa on usein kermaa. Parhaassa versiossa makeuden ja kermaisuuden lisäksi erottuvat tomaatin hapokkuus, kanan savuisuus ja aromaattiset mausteet.",
    "history": "Ruokalaji yhdistetään Delhiin ja Intian jaon jälkeen syntyneeseen ravintolakulttuuriin. Se liittyy läheisesti tandooriuunissa kypsennettyyn kanaan ja ajatukseen tähteiden tai grillatun lihan yhdistämisestä täyteläiseen makhani-kastikkeeseen.",
    "flavor": "Täyteläinen, miedosti mausteinen, raikkaan tomaattinen ja voinen, usein tunnusomaisena aromina sarviapila.",
    "technique": "Marinadi maustaa ja mureuttaa kanan, ja kova lämpö antaa paistopinnan ennen kastikkeeseen lisäämistä. Kastike keitetään kokoon ennen kuin voi ja kerma viimeistelevät rakenteen.",
    "essentials": [
      "Jogurtilla, inkiväärillä, valkosipulilla ja mausteilla marinoitua kanaa.",
      "Tomaattipohja, joka keitetään kokoon, kunnes raaka hapokkuus häviää.",
      "Voita ja haluttaessa kermaa pyöristämään makua, ei peittämään mausteita.",
      "Kasuri methiä tai muita aromaattisia mausteita viimeistelyyn."
    ],
    "recipe": {
      "label": "Butter chicken kotikeittiöön",
      "yield": "4 annosta",
      "time": "n. 75 min + marinointi",
      "ingredients": [
        "700 g kanan reisilihaa paloina",
        "150 g jogurttia",
        "2 rkl raastettua inkivääriä ja valkosipulia",
        "1 tl garam masalaa",
        "1 tl jauhettua juustokuminaa",
        "1 tl chilijauhetta maun mukaan",
        "500 g tomaattimurskaa",
        "50 g voita",
        "1 dl kuohukermaa",
        "1 tl kasuri methiä, halutessasi",
        "suolaa ja sitruunaa"
      ],
      "steps": [
        "Marinoi kanaa jogurtilla, puolella inkivääristä ja valkosipulista sekä mausteilla vähintään 30 minuuttia.",
        "Paista tai grillaa kana kovalla lämmöllä erissä, kunnes se ruskistuu kunnolla.",
        "Keitä tomaattia jäljellä olevien aromaattisten ainesten ja mausteiden kanssa, kunnes kastike tiivistyy ja kiiltää.",
        "Sekoita joukkoon voi ja kerma, palauta kana ja hauduta täysin kypsäksi kastikkeessa.",
        "Mausta suolalla, sitruunalla ja murskatulla kasuri methillä juuri ennen tarjoilua."
      ]
    },
    "variants": [
      "Ravintolatyyli, jossa on erityisen sileä, siivilöity kastike.",
      "Kevyempi versio, jossa on vähemmän kermaa ja enemmän tomaattia.",
      "Paneer tai tofu sopii samaan kastikepohjaan kasvisversiossa."
    ],
    "serving": [
      "Tarjoillaan basmatiriisin, naanin tai rotin kanssa.",
      "Raikas salaatti tai hapan pikkelöity lisuke tasapainottaa täyteläistä kastiketta."
    ],
    "commonMistakes": [
      "Raa'an kanan keittäminen suoraan kastikkeessa ilman paistopintaa.",
      "Liian runsas sokeri, joka tekee ruoasta jälkiruokamaisen.",
      "Kerman hallitsevuus, jolloin tomaatin ja mausteiden maut katoavat."
    ]
  },
  "is": {
    "overview": "Butter chicken sameinar grillaðan eða vel steiktan marineraðan kjúkling og slétta sósu úr tómötum, smjöri og oft rjóma. Besta útgáfan er ekki aðeins sæt og rjómakennd: sýra tómatanna, reykbragð kjúklingsins og ilmandi krydd eiga enn að vera greinileg.",
    "history": "Rétturinn tengist Delí og veitingahúsamenningunni sem óx fram eftir skiptingu Indlands. Hann tengist náið kjúklingi úr tandoor-ofni og hugmyndinni um að blanda afgöngum eða grilluðu kjöti í ríkulega makhani-sósu.",
    "flavor": "Fyllt, mildilega kryddað, með fersku tómat- og smjörbragði, oft með einkennandi ilm af grikkjasmára.",
    "technique": "Marineringin á að krydda og meyra kjúklinginn en mikill hiti gefur brúnað yfirborð áður en kjötið fer í sósuna. Sósan er soðin niður áður en smjör og rjómi stilla áferðina í lokin.",
    "essentials": [
      "Kjúklingur marineraður með jógúrt, engifer, hvítlauk og kryddi.",
      "Tómatgrunnur soðinn niður þar til hrá sýran hverfur.",
      "Smjör og mögulega rjómi til að mýkja bragðið, ekki fela kryddin.",
      "Kasuri methi eða önnur ilmandi krydd til að ljúka réttinum."
    ],
    "recipe": {
      "label": "Butter chicken fyrir heimiliseldhúsið",
      "yield": "4 skammtar",
      "time": "u.þ.b. 75 mín. + marinering",
      "ingredients": [
        "700 g kjúklingalæri í bitum",
        "150 g jógúrt",
        "2 msk. rifið engifer og hvítlaukur",
        "1 tsk. garam masala",
        "1 tsk. malað kúmín",
        "1 tsk. chiliduft eftir smekk",
        "500 g muldir tómatar",
        "50 g smjör",
        "1 dl þeytirjómi",
        "1 tsk. kasuri methi, valfrjálst",
        "salt og sítróna"
      ],
      "steps": [
        "Marinerið kjúklinginn með jógúrt, helmingi engifersins og hvítlauksins og kryddi í að minnsta kosti 30 mínútur.",
        "Steikið eða grillið kjúklinginn við mikinn hita í skömmtum þar til hann brúnast vel.",
        "Sjóðið tómata með afganginum af ilmandi hráefnunum og kryddinu þar til sósan er þétt og gljáandi.",
        "Hrærið smjöri og rjóma saman við, setjið kjúklinginn aftur út í og látið hann eldast að fullu í sósunni.",
        "Smakkið til með salti, sítrónu og muldu kasuri methi rétt fyrir framreiðslu."
      ]
    },
    "variants": [
      "Veitingahúsastíll með sérstaklega sléttri, síaðri sósu.",
      "Léttari útgáfa með minni rjóma og meiri tómötum.",
      "Paneer eða tófú getur nýtt sama sósugrunn í grænmetisútgáfu."
    ],
    "serving": [
      "Borið fram með basmatihrísgrjónum, naan eða roti.",
      "Ferskt salat eða súrt meðlæti vegur upp á móti ríkulegri sósunni."
    ],
    "commonMistakes": [
      "Að sjóða hráan kjúkling beint í sósunni án brúnunar.",
      "Of mikill sykur sem gerir réttinn eins og eftirrétt.",
      "Að láta rjómann yfirgnæfa bragðið af tómötum og kryddi."
    ]
  },
  "en": {
    "overview": "Butter chicken combines grilled or hard-seared marinated chicken with a smooth sauce of tomato, butter and often cream. The best version is not simply sweet and creamy: the tomato's acidity, smokiness from the chicken and aromatic spices must still be distinct.",
    "history": "The dish is associated with Delhi and the restaurant culture that emerged after the partition of India. It is closely connected to tandoor-cooked chicken and the idea of folding leftovers or grilled meat into a rich makhani sauce.",
    "flavor": "Rich, mildly spiced, fresh with tomato and buttery, often with fenugreek as a characteristic aromatic note.",
    "technique": "The marinade seasons and tenderises the chicken, while high heat creates a seared surface before the meat meets the sauce. Reduce the sauce before butter and cream adjust its texture towards the end.",
    "essentials": [
      "Chicken marinated with yoghurt, ginger, garlic and spices.",
      "Tomato base reduced until the raw acidity disappears.",
      "Butter and optional cream for roundness, not to hide the spices.",
      "Kasuri methi or other aromatic spices to finish."
    ],
    "recipe": {
      "label": "Butter chicken for the home kitchen",
      "yield": "4 servings",
      "time": "approx. 75 min + marinating",
      "ingredients": [
        "700 g chicken thighs, cut into pieces",
        "150 g yoghurt",
        "2 tbsp grated ginger and garlic",
        "1 tsp garam masala",
        "1 tsp ground cumin",
        "1 tsp chilli powder to taste",
        "500 g crushed tomatoes",
        "50 g butter",
        "1 dl whipping cream",
        "1 tsp kasuri methi, optional",
        "salt and lemon"
      ],
      "steps": [
        "Marinate the chicken with yoghurt, half the ginger and garlic, and spices for at least 30 minutes.",
        "Sear or grill the chicken over high heat in batches until well browned.",
        "Cook the tomato with the remaining aromatics and spices until the sauce becomes concentrated and glossy.",
        "Stir in the butter and cream, return the chicken and simmer until cooked through in the sauce.",
        "Season with salt, lemon and crushed kasuri methi just before serving."
      ]
    },
    "variants": [
      "Restaurant style with an extra-smooth, strained sauce.",
      "Lighter version with less cream and more tomato.",
      "Paneer or tofu can use the same sauce base in a vegetarian interpretation."
    ],
    "serving": [
      "Serve with basmati rice, naan or roti.",
      "A fresh salad or tangy pickle balances the rich sauce."
    ],
    "commonMistakes": [
      "Cooking raw chicken directly in the sauce without searing it.",
      "Too much sugar, making the dish dessert-like.",
      "Allowing cream to dominate so the tomato and spices disappear."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
