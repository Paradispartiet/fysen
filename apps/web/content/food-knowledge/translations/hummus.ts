import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const hummusTranslations = {
  "nn": {
    "overview": "Hummus ser enkel ut, men teksturen er avhengig av korleis kikertene blir kokte og bearbeidde. Tahini gjev nøttepreg, bitterheit og fylde, medan sitron og salt balanserer den milde kikerten.",
    "history": "Kombinasjonen av kikerter og sesam har lange røter i regionen, og hummus er sentral i matkulturen i fleire land i Levanten og Midtausten. Eigarskap og opphav blir ofte diskuterte, så det er meir presist å sjå retten som regional enn å gje han eitt nasjonalt opphav.",
    "flavor": "Kremete, nøtteaktig, sitrusfrisk og mildt kvitlauksprega, med olivenolje og krydder til slutt.",
    "technique": "Svært møre kikerter og god tahini er viktigast. Å vispe tahini med sitron og iskaldt vatn før kikertene blir tilsette, kan gje lettare og glattare tekstur.",
    "essentials": [
      "Godt kokte kikerter.",
      "Tahini av sesamfrø.",
      "Sitron, kvitlauk og salt.",
      "Olivenolje og garnityr som paprika, spisskummen eller heile kikerter."
    ],
    "recipe": {
      "label": "Ekstra kremete hummus",
      "yield": "1 stor bolle",
      "time": "ca. 20 min",
      "ingredients": [
        "500 g svært møre kokte kikerter",
        "120 g tahini",
        "1 stor sitron",
        "1–2 kvitlauksfedd",
        "1 ts salt",
        "0,5–1 dl iskaldt vatn",
        "2 ss olivenolje",
        "paprika eller spisskummen til topping"
      ],
      "steps": [
        "Køyr tahini, sitron, kvitlauk og salt nokre sekund til blandinga tjuknar.",
        "Tilset iskaldt vatn litt etter litt til tahinien blir lys og luftig.",
        "Ha i varme eller romtempererte, svært møre kikerter og køyr lenge til massen er heilt glatt.",
        "Juster med vatn, sitron og salt til konsistensen er mjuk og smaken balansert.",
        "Fordel i ein grunn bolle og avslutt med olivenolje og ønskt krydder."
      ]
    },
    "variants": [
      "Hummus med ekstra tahini og svært glatt tekstur.",
      "Topping med krydra kjøt, sopp eller heile kikerter.",
      "Hummus fatteh kombinerer hummusrelaterte element med brød og andre lag."
    ],
    "serving": [
      "Blir servert som frukost, mezze, tilbehøyr eller del av eit måltid.",
      "Varmt brød, rå grønsaker og sylta grønsaker gjev kontrast."
    ],
    "commonMistakes": [
      "For lite kokte kikerter som gjev kornete tekstur.",
      "For lite tahini eller syre, som gjev flat smak.",
      "Å servere hummus iskald rett frå kjøleskapet når aromaen er dempa."
    ]
  },
  "sv": {
    "overview": "Hummus ser enkel ut, men konsistensen beror på hur kikärterna kokas och bearbetas. Tahini ger nötighet, beska och fyllighet, medan citron och salt balanserar den milda kikärtan.",
    "history": "Kombinationen av kikärter och sesam har långa rötter i regionen, och hummus är en central del av matkulturen i flera länder i Levanten och Mellanöstern. Ägarskap och ursprung diskuteras ofta, så det är mer korrekt att betrakta rätten som regional än att tillskriva den ett nationellt ursprung.",
    "flavor": "Krämig, nötig och citrusfrisk med mild vitlökssmak, avslutad med olivolja och aromatiska kryddor.",
    "technique": "Mycket mjuka kikärter och bra tahini är viktigast. Att vispa tahini med citron och iskallt vatten innan kikärterna tillsätts kan ge lättare och slätare konsistens.",
    "essentials": [
      "Välkokta kikärter.",
      "Tahini av sesamfrön.",
      "Citron, vitlök och salt.",
      "Olivolja och garnering som paprika, spiskummin eller hela kikärter."
    ],
    "recipe": {
      "label": "Extra krämig hummus",
      "yield": "1 stor skål",
      "time": "ca 20 min",
      "ingredients": [
        "500 g mycket mjuka kokta kikärter",
        "120 g tahini",
        "1 stor citron",
        "1–2 vitlöksklyftor",
        "1 tsk salt",
        "0,5–1 dl iskallt vatten",
        "2 msk olivolja",
        "paprika eller spiskummin till topping"
      ],
      "steps": [
        "Mixa tahini, citron, vitlök och salt några sekunder tills blandningen tjocknar.",
        "Tillsätt iskallt vatten lite i taget tills tahinin blir ljus och luftig.",
        "Tillsätt varma eller rumstempererade, mycket mjuka kikärter och mixa länge tills massan är helt slät.",
        "Justera med vatten, citron och salt tills konsistensen är mjuk och smaken balanserad.",
        "Fördela i en grund skål och avsluta med olivolja och önskad krydda."
      ]
    },
    "variants": [
      "Hummus med extra tahini och mycket slät konsistens.",
      "Topping med kryddat kött, svamp eller hela kikärter.",
      "Hummus fatteh kombinerar hummusrelaterade delar med bröd och andra lager."
    ],
    "serving": [
      "Serveras som frukost, mezze, tillbehör eller del av en måltid.",
      "Varmt bröd, råa grönsaker och inlagda grönsaker ger kontrast."
    ],
    "commonMistakes": [
      "Otillräckligt kokta kikärter som ger grynig konsistens.",
      "För lite tahini eller syra, vilket ger platt smak.",
      "Att servera hummus iskall direkt från kylen när aromen är dämpad."
    ]
  },
  "da": {
    "overview": "Hummus ser enkel ud, men teksturen afhænger af, hvordan kikærterne koges og bearbejdes. Tahini giver nøddepræg, bitterhed og fylde, mens citron og salt afbalancerer den milde kikært.",
    "history": "Kombinationen af kikærter og sesam har lange rødder i regionen, og hummus er en central del af madkulturen i flere lande i Levanten og Mellemøsten. Ejerskab og oprindelse diskuteres ofte, så det er mere præcist at betragte retten som regional end at tilskrive den én national oprindelse.",
    "flavor": "Cremet, nøddeagtig, citrusfrisk og mildt hvidløgspræget med olivenolie og aromatiske krydderier til sidst.",
    "technique": "Meget møre kikærter og god tahini er vigtigst. At piske tahini med citron og iskoldt vand, før kikærterne tilsættes, kan give en lettere og glattere tekstur.",
    "essentials": [
      "Godt kogte kikærter.",
      "Tahini af sesamfrø.",
      "Citron, hvidløg og salt.",
      "Olivenolie og pynt som paprika, spidskommen eller hele kikærter."
    ],
    "recipe": {
      "label": "Ekstra cremet hummus",
      "yield": "1 stor skål",
      "time": "ca. 20 min",
      "ingredients": [
        "500 g meget møre kogte kikærter",
        "120 g tahini",
        "1 stor citron",
        "1–2 fed hvidløg",
        "1 tsk salt",
        "0,5–1 dl iskoldt vand",
        "2 spsk olivenolie",
        "paprika eller spidskommen til topping"
      ],
      "steps": [
        "Blend tahini, citron, hvidløg og salt nogle sekunder, til blandingen tykner.",
        "Tilsæt iskoldt vand lidt ad gangen, til tahinien bliver lys og luftig.",
        "Tilsæt varme eller stuetempererede, meget møre kikærter, og blend længe, til massen er helt glat.",
        "Justér med vand, citron og salt, til konsistensen er blød og smagen afbalanceret.",
        "Fordel i en lav skål, og afslut med olivenolie og ønsket krydderi."
      ]
    },
    "variants": [
      "Hummus med ekstra tahini og meget glat tekstur.",
      "Topping med krydret kød, svampe eller hele kikærter.",
      "Hummus fatteh kombinerer hummusrelaterede elementer med brød og andre lag."
    ],
    "serving": [
      "Serveres som morgenmad, mezze, tilbehør eller del af et måltid.",
      "Varmt brød, rå grøntsager og syltede grøntsager giver kontrast."
    ],
    "commonMistakes": [
      "Utilstrækkeligt kogte kikærter, som giver grynet tekstur.",
      "For lidt tahini eller syre, som giver flad smag.",
      "At servere hummus iskold direkte fra køleskabet, hvor aromaen er dæmpet."
    ]
  },
  "fi": {
    "overview": "Hummus näyttää yksinkertaiselta, mutta rakenne riippuu kikherneiden kypsennyksestä ja käsittelystä. Tahini tuo pähkinäisyyttä, karvautta ja täyteläisyyttä, ja sitruuna sekä suola tasapainottavat mietoa kikhernettä.",
    "history": "Kikherneiden ja seesamin yhdistelmällä on alueella pitkät juuret, ja hummus on keskeinen osa useiden Levantin ja Lähi-idän maiden ruokakulttuuria. Omistajuudesta ja alkuperästä keskustellaan usein, joten on täsmällisempää pitää ruokaa alueellisena kuin nimetä sille yksi kansallinen alkuperä.",
    "flavor": "Kermainen, pähkinäinen, sitruksisen raikas ja miedosti valkosipulinen, viimeisteltynä oliiviöljyllä ja aromaattisilla mausteilla.",
    "technique": "Hyvin pehmeät kikherneet ja hyvä tahini ovat tärkeimmät. Tahinin vatkaaminen sitruunan ja jääkylmän veden kanssa ennen kikherneiden lisäämistä voi tehdä rakenteesta kevyemmän ja sileämmän.",
    "essentials": [
      "Hyvin kypsennettyjä kikherneitä.",
      "Seesaminsiemenistä valmistettua tahinia.",
      "Sitruunaa, valkosipulia ja suolaa.",
      "Oliiviöljyä ja koristeita, kuten paprikajauhetta, juustokuminaa tai kokonaisia kikherneitä."
    ],
    "recipe": {
      "label": "Erityisen kermainen hummus",
      "yield": "1 suuri kulhollinen",
      "time": "n. 20 min",
      "ingredients": [
        "500 g hyvin pehmeiksi keitettyjä kikherneitä",
        "120 g tahinia",
        "1 suuri sitruuna",
        "1–2 valkosipulinkynttä",
        "1 tl suolaa",
        "0,5–1 dl jääkylmää vettä",
        "2 rkl oliiviöljyä",
        "paprikajauhetta tai juustokuminaa pinnalle"
      ],
      "steps": [
        "Soseuta tahinia, sitruunaa, valkosipulia ja suolaa muutama sekunti, kunnes seos sakenee.",
        "Lisää jääkylmää vettä vähitellen, kunnes tahini vaalenee ja kuohkeutuu.",
        "Lisää lämpimät tai huoneenlämpöiset, hyvin pehmeät kikherneet ja soseuta pitkään täysin sileäksi.",
        "Säädä vedellä, sitruunalla ja suolalla, kunnes rakenne on pehmeä ja maku tasapainoinen.",
        "Levitä matalaan kulhoon ja viimeistele oliiviöljyllä ja haluamallasi mausteella."
      ]
    },
    "variants": [
      "Hummus, jossa on runsaasti tahinia ja erittäin sileä rakenne.",
      "Pinnalla maustettua lihaa, sieniä tai kokonaisia kikherneitä.",
      "Hummus fatteh yhdistää hummukseen liittyviä aineksia leipään ja muihin kerroksiin."
    ],
    "serving": [
      "Tarjoillaan aamiaisena, mezzena, lisukkeena tai aterian osana.",
      "Lämmin leipä, raa'at kasvikset ja pikkelöidyt kasvikset tuovat kontrastia."
    ],
    "commonMistakes": [
      "Liian vähän kypsennetyt kikherneet, jolloin rakenne jää rakeiseksi.",
      "Liian vähän tahinia tai happoa, jolloin maku jää latteaksi.",
      "Hummuksen tarjoaminen jääkylmänä suoraan jääkaapista, jolloin aromi on vaimea."
    ]
  },
  "is": {
    "overview": "Hummus virðist einfalt en áferðin ræðst af því hvernig kjúklingabaunirnar eru soðnar og unnar. Tahini gefur hnetukeim, beiskju og fyllingu en sítróna og salt vega upp á móti mildu bragði baunanna.",
    "history": "Samsetning kjúklingabauna og sesams á sér langar rætur á svæðinu og hummus er mikilvægur hluti matarmenningar í mörgum löndum Levant og Mið-Austurlanda. Oft er deilt um eignarhald og uppruna, svo réttara er að líta á réttinn sem svæðisbundinn en að eigna honum einn þjóðlegan uppruna.",
    "flavor": "Rjómakennt, hnetukennt og ferskt af sítrus með mildu hvítlauksbragði, ólífuolíu og ilmandi kryddi í lokin.",
    "technique": "Mjög mjúkar kjúklingabaunir og gott tahini skipta mestu. Að þeyta tahini með sítrónu og ísköldu vatni áður en baununum er bætt við getur gefið léttari og sléttari áferð.",
    "essentials": [
      "Vel soðnar kjúklingabaunir.",
      "Tahini úr sesamfræjum.",
      "Sítróna, hvítlaukur og salt.",
      "Ólífuolía og skraut eins og paprikuduft, kúmín eða heilar kjúklingabaunir."
    ],
    "recipe": {
      "label": "Sérlega rjómakennt hummus",
      "yield": "1 stór skál",
      "time": "u.þ.b. 20 mín.",
      "ingredients": [
        "500 g mjög mjúkar soðnar kjúklingabaunir",
        "120 g tahini",
        "1 stór sítróna",
        "1–2 hvítlauksrif",
        "1 tsk. salt",
        "0,5–1 dl ískalt vatn",
        "2 msk. ólífuolía",
        "paprikuduft eða kúmín ofan á"
      ],
      "steps": [
        "Maukið tahini, sítrónu, hvítlauk og salt í nokkrar sekúndur þar til blandan þykknar.",
        "Bætið ísköldu vatni við smám saman þar til tahinið verður ljóst og loftkennt.",
        "Bætið heitum eða stofuheitum, mjög mjúkum kjúklingabaunum við og maukið lengi þar til blandan er alveg slétt.",
        "Stillið með vatni, sítrónu og salti þar til áferðin er mjúk og bragðið í jafnvægi.",
        "Dreifið í grunna skál og ljúkið með ólífuolíu og kryddi að eigin vali."
      ]
    },
    "variants": [
      "Hummus með meira tahini og mjög sléttri áferð.",
      "Álegg úr krydduðu kjöti, sveppum eða heilum kjúklingabaunum.",
      "Hummus fatteh sameinar hummus-tengd hráefni með brauði og öðrum lögum."
    ],
    "serving": [
      "Borið fram sem morgunmatur, mezze, meðlæti eða hluti máltíðar.",
      "Heitt brauð, hrátt grænmeti og súrsað grænmeti gefa andstæðu."
    ],
    "commonMistakes": [
      "Of lítið soðnar kjúklingabaunir sem gefa kornótta áferð.",
      "Of lítið tahini eða sýra sem gefur flatt bragð.",
      "Að bera hummus fram ískalt beint úr ísskápnum þegar ilmurinn er daufur."
    ]
  },
  "en": {
    "overview": "Hummus looks simple, but its texture depends on how the chickpeas are cooked and processed. Tahini provides nuttiness, bitterness and body, while lemon and salt balance the mild chickpeas.",
    "history": "The combination of chickpeas and sesame has long roots in the region, and hummus is central to the food cultures of several countries in the Levant and Middle East. Ownership and origins are often debated, so it is more accurate to treat the dish as regional than assign it one national origin.",
    "flavor": "Creamy, nutty and citrus-fresh with mild garlic notes, finished with olive oil and aromatic spices.",
    "technique": "Very tender chickpeas and good tahini are most important. Whisking tahini with lemon and ice-cold water before adding the chickpeas can produce a lighter, smoother texture.",
    "essentials": [
      "Well-cooked chickpeas.",
      "Tahini made from sesame seeds.",
      "Lemon, garlic and salt.",
      "Olive oil and garnishes such as paprika, cumin or whole chickpeas."
    ],
    "recipe": {
      "label": "Extra-creamy hummus",
      "yield": "1 large bowl",
      "time": "approx. 20 min",
      "ingredients": [
        "500 g very tender cooked chickpeas",
        "120 g tahini",
        "1 large lemon",
        "1–2 garlic cloves",
        "1 tsp salt",
        "0.5–1 dl ice-cold water",
        "2 tbsp olive oil",
        "paprika or cumin for topping"
      ],
      "steps": [
        "Blend the tahini, lemon, garlic and salt for a few seconds until the mixture thickens.",
        "Add ice-cold water little by little until the tahini becomes pale and airy.",
        "Add warm or room-temperature, very tender chickpeas and blend thoroughly until completely smooth.",
        "Adjust with water, lemon and salt until the texture is soft and the flavour balanced.",
        "Spread in a shallow bowl and finish with olive oil and your choice of spice."
      ]
    },
    "variants": [
      "Hummus with extra tahini and a very smooth texture.",
      "Toppings of spiced meat, mushrooms or whole chickpeas.",
      "Hummus fatteh combines hummus-related elements with bread and other layers."
    ],
    "serving": [
      "Serve as breakfast, mezze, a side dish or a component of a meal.",
      "Warm bread, raw vegetables and pickles provide contrast."
    ],
    "commonMistakes": [
      "Undercooked chickpeas that produce a grainy texture.",
      "Too little tahini or acidity, resulting in a flat flavour.",
      "Serving hummus ice-cold straight from the fridge when its aroma is muted."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
