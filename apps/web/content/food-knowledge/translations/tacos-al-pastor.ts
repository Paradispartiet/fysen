import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";

type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const tacosAlPastorTranslations = {
  "nn": {
    "overview": "Al pastor kombinerer meksikanske chili- og maistradisjonar med ein teknikk for loddrett spiddsteiking som kom gjennom innvandring frå det austlege Middelhavet. Kjøtet får mørke, karamelliserte kantar medan innsida held seg saftig.",
    "history": "Retten utvikla seg i Mexico på 1900-talet i møtet mellom lokale taco-tradisjonar og loddrett spiddsteiking i slekt med shawarma. Han er særleg knytt til Mexico by og sentrale delar av landet.",
    "flavor": "Rista og saftig svinekjøt med tørka chili, achiote, syre og krydder, balansert av rå lauk, koriander og salsa. Ananas er vanleg i mange serveringar, men ikkje i alle.",
    "technique": "Heime kan ein etterlikne trompo-effekten ved å marinere tynt skore svinekjøt og steikje det på svært høg varme i porsjonar før det blir hakka. Målet er mange bruna kantar utan tørt kjøt.",
    "essentials": [
      "Svinekjøt i tynne skiver.",
      "Marinade med tørka chili, achiote og syre.",
      "Små maistortillaer.",
      "Lauk, koriander, salsa og lime som frisk avslutning."
    ],
    "recipe": {
      "label": "Al pastor-inspirerte tacos i panne",
      "yield": "12 tacos",
      "time": "ca. 45 min + marinering",
      "ingredients": [
        "700 g svinenakke i tynne skiver",
        "2 ss achiotepasta",
        "2 tørka guajillo-chiliar, bløytte",
        "2 ss eddik",
        "1 dl appelsinjuice",
        "2 kvitlauksfedd",
        "1 ts oregano",
        "12 små maistortillaer",
        "lauk og koriander",
        "lime, salsa og ananas etter ønske"
      ],
      "steps": [
        "Køyr achiote, chili, eddik, appelsin, kvitlauk og krydder til ein glatt marinade.",
        "Mariner svinekjøtet i minst to timar, gjerne over natta.",
        "Steik kjøtet i svært varm panne i små porsjonar slik at kantane får kraftig farge.",
        "Lat kjøtet kvile kort og hakk det i små bitar; gje det eventuelt ei siste rask steiking.",
        "Varm tortillaene og fyll med kjøt, lauk, koriander, salsa, lime og eventuelt ananas."
      ]
    },
    "variants": [
      "Taquería-variant steikt på trompo.",
      "Heimevariant steikt i panne eller under grill.",
      "Nokre stader serverer ananas frå toppen av trompoen, andre gjer det ikkje."
    ],
    "serving": [
      "Blir serverte som små tacos, vanlegvis fleire per person.",
      "Salsa og lime bør vere tydelege nok til å balansere det feite kjøtet."
    ],
    "commonMistakes": [
      "For tjukke kjøtstykke utan karamelliserte kantar.",
      "For søt marinade som brenn før kjøtet er ferdig.",
      "Kalde, tørre tortillaer som sprekk rundt fyllet."
    ]
  },
  "sv": {
    "overview": "Al pastor förenar mexikanska chili- och majstraditioner med en teknik för vertikal spettstekning som kom genom invandring från östra Medelhavsområdet. Köttet får mörka, karamelliserade kanter medan insidan förblir saftig.",
    "history": "Rätten utvecklades i Mexiko under 1900-talet i mötet mellan lokala tacotraditioner och vertikal spettstekning besläktad med shawarma. Den förknippas särskilt med Mexico City och landets centrala delar.",
    "flavor": "Rostat och saftigt fläskkött med torkad chili, achiote, syra och kryddor, balanserat av rå lök, koriander och salsa. Ananas är vanligt i många serveringar, men inte i alla.",
    "technique": "Hemma kan man efterlikna trompo-effekten genom att marinera tunt skivat fläskkött och steka det på mycket hög värme i omgångar innan det hackas. Målet är många brynta kanter utan att köttet blir torrt.",
    "essentials": [
      "Fläskkött i tunna skivor.",
      "Marinad med torkad chili, achiote och syra.",
      "Små majstortillor.",
      "Lök, koriander, salsa och lime som frisk avslutning."
    ],
    "recipe": {
      "label": "Al pastor-inspirerade tacos i stekpanna",
      "yield": "12 tacos",
      "time": "ca 45 min + marinering",
      "ingredients": [
        "700 g fläskkarré i tunna skivor",
        "2 msk achiotepasta",
        "2 torkade guajillochili, blötlagda",
        "2 msk vinäger",
        "1 dl apelsinjuice",
        "2 vitlöksklyftor",
        "1 tsk oregano",
        "12 små majstortillor",
        "lök och koriander",
        "lime, salsa och ananas efter önskemål"
      ],
      "steps": [
        "Mixa achiote, chili, vinäger, apelsin, vitlök och kryddor till en slät marinad.",
        "Marinera fläskköttet i minst två timmar, gärna över natten.",
        "Stek köttet i en mycket het panna i små omgångar så att kanterna får ordentlig färg.",
        "Låt köttet vila kort och hacka det i små bitar; ge det eventuellt en sista snabb stekning.",
        "Värm tortillorna och fyll dem med kött, lök, koriander, salsa, lime och eventuellt ananas."
      ]
    },
    "variants": [
      "Taquería-variant stekt på trompo.",
      "Hemmavariant stekt i panna eller under grill.",
      "På vissa ställen serveras ananas från toppen av trompon, på andra inte."
    ],
    "serving": [
      "Serveras som små tacos, vanligtvis flera per person.",
      "Salsa och lime bör vara tillräckligt framträdande för att balansera det feta köttet."
    ],
    "commonMistakes": [
      "För tjocka köttbitar utan karamelliserade kanter.",
      "För söt marinad som bränns innan köttet är färdigt.",
      "Kalla, torra tortillor som spricker runt fyllningen."
    ]
  },
  "da": {
    "overview": "Al pastor kombinerer mexicanske chili- og majstraditioner med en teknik til lodret spydstegning, som kom gennem indvandring fra det østlige Middelhavsområde. Kødet får mørke, karamelliserede kanter, mens indersiden forbliver saftig.",
    "history": "Retten udviklede sig i Mexico i 1900-tallet i mødet mellem lokale tacotraditioner og lodret spydstegning beslægtet med shawarma. Den forbindes især med Mexico City og landets centrale dele.",
    "flavor": "Ristet og saftigt svinekød med tørret chili, achiote, syre og krydderier, afbalanceret af rå løg, koriander og salsa. Ananas er almindeligt i mange serveringer, men ikke alle.",
    "technique": "Hjemme kan man efterligne trompo-effekten ved at marinere tyndtskåret svinekød og stege det ved meget høj varme i små portioner, før det hakkes. Målet er mange brunede kanter uden tørt kød.",
    "essentials": [
      "Svinekød i tynde skiver.",
      "Marinade med tørret chili, achiote og syre.",
      "Små majstortillaer.",
      "Løg, koriander, salsa og lime som frisk afslutning."
    ],
    "recipe": {
      "label": "Al pastor-inspirerede tacos på pande",
      "yield": "12 tacos",
      "time": "ca. 45 min + marinering",
      "ingredients": [
        "700 g svinenakke i tynde skiver",
        "2 spsk achiotepasta",
        "2 tørrede guajillochilier, udblødte",
        "2 spsk eddike",
        "1 dl appelsinjuice",
        "2 fed hvidløg",
        "1 tsk oregano",
        "12 små majstortillaer",
        "løg og koriander",
        "lime, salsa og ananas efter ønske"
      ],
      "steps": [
        "Blend achiote, chili, eddike, appelsin, hvidløg og krydderier til en glat marinade.",
        "Marinér svinekødet i mindst to timer, gerne natten over.",
        "Steg kødet på en meget varm pande i små portioner, så kanterne får kraftig farve.",
        "Lad kødet hvile kort, og hak det i små stykker; giv det eventuelt en sidste hurtig stegning.",
        "Varm tortillaerne, og fyld dem med kød, løg, koriander, salsa, lime og eventuelt ananas."
      ]
    },
    "variants": [
      "Taquería-version stegt på trompo.",
      "Hjemmevariant stegt på pande eller under grill.",
      "Nogle steder serveres ananas fra toppen af trompoen, andre gør det ikke."
    ],
    "serving": [
      "Serveres som små tacos, normalt flere pr. person.",
      "Salsa og lime bør være tydelige nok til at afbalancere det fede kød."
    ],
    "commonMistakes": [
      "For tykke kødstykker uden karamelliserede kanter.",
      "For sød marinade, der brænder på, før kødet er færdigt.",
      "Kolde, tørre tortillaer, som revner omkring fyldet."
    ]
  },
  "fi": {
    "overview": "Al pastor yhdistää meksikolaiset chili- ja maissiperinteet pystysuoran vartaan paistotekniikkaan, joka saapui itäisen Välimeren alueelta muuttaneiden ihmisten mukana. Liha saa tummat, karamellisoituneet reunat ja säilyy sisältä mehukkaana.",
    "history": "Ruokalaji kehittyi Meksikossa 1900-luvulla, kun paikalliset tacoperinteet kohtasivat shawarmaa muistuttavan pystysuoran vartaassa paistamisen. Se yhdistetään erityisesti Méxicon kaupunkiin ja maan keskiosiin.",
    "flavor": "Paahteista ja mehukasta sianlihaa, kuivattua chiliä, achiotea, hapokkuutta ja mausteita, joita raaka sipuli, korianteri ja salsa tasapainottavat. Ananas on yleinen monissa tarjoiluissa, mutta ei kaikissa.",
    "technique": "Kotona trompo-vartaan vaikutusta voi jäljitellä marinoimalla ohueksi viipaloitua sianlihaa ja paistamalla sen erittäin kuumalla pannulla erissä ennen pilkkomista. Tavoitteena ovat runsaat ruskistuneet reunat ilman, että liha kuivuu.",
    "essentials": [
      "Sianlihaa ohuina viipaleina.",
      "Marinadi, jossa on kuivattua chiliä, achiotea ja hapokkuutta.",
      "Pieniä maissitortilloja.",
      "Sipulia, korianteria, salsaa ja limeä raikkaaksi viimeistelyksi."
    ],
    "recipe": {
      "label": "Al pastor -tyyliset pannulla paistetut tacot",
      "yield": "12 tacoa",
      "time": "n. 45 min + marinointi",
      "ingredients": [
        "700 g sianniskaa ohuina viipaleina",
        "2 rkl achiotetahnaa",
        "2 kuivattua guajillochiliä, liotettuina",
        "2 rkl etikkaa",
        "1 dl appelsiinimehua",
        "2 valkosipulinkynttä",
        "1 tl oreganoa",
        "12 pientä maissitortillaa",
        "sipulia ja korianteria",
        "limeä, salsaa ja ananasta halutessasi"
      ],
      "steps": [
        "Soseuta achiote, chili, etikka, appelsiini, valkosipuli ja mausteet tasaiseksi marinadiksi.",
        "Marinoi sianlihaa vähintään kaksi tuntia, mielellään yön yli.",
        "Paista liha erittäin kuumalla pannulla pienissä erissä, jotta reunat ruskistuvat kunnolla.",
        "Anna lihan levätä hetki ja pilko se pieniksi paloiksi; paista halutessasi vielä nopeasti.",
        "Lämmitä tortillat ja täytä ne lihalla, sipulilla, korianterilla, salsalla, limellä ja halutessasi ananaksella."
      ]
    },
    "variants": [
      "Taquerían trompo-vartaassa paistettu versio.",
      "Kotiversio pannulla tai grillivastuksen alla paistettuna.",
      "Joissakin paikoissa tarjoillaan ananasta trompo-vartaan päältä, toisissa ei."
    ],
    "serving": [
      "Tarjoillaan pieninä tacoina, yleensä useita henkilöä kohti.",
      "Salsan ja limen tulisi maistua selvästi tasapainottaakseen rasvaista lihaa."
    ],
    "commonMistakes": [
      "Liian paksut lihapalat, joiden reunat eivät karamellisoidu.",
      "Liian makea marinadi, joka palaa ennen lihan kypsymistä.",
      "Kylmät, kuivat tortillat, jotka halkeavat täytteen ympäriltä."
    ]
  },
  "is": {
    "overview": "Al pastor sameinar mexíkóskar chili- og maíshefðir við lóðrétta teinsteikingu sem barst með innflytjendum frá austanverðu Miðjarðarhafssvæðinu. Kjötið fær dökkar, karamellíseraðar brúnir en helst safaríkt að innan.",
    "history": "Rétturinn þróaðist í Mexíkó á 20. öld þegar staðbundnar taco-hefðir mættu lóðréttri teinsteikingu sem er skyld shawarma. Hann tengist sérstaklega Mexíkóborg og miðhluta landsins.",
    "flavor": "Ristað og safaríkt svínakjöt með þurrkuðu chili, achiote, sýru og kryddi, í jafnvægi við hráan lauk, kóríander og salsa. Ananas er algengur í mörgum útgáfum en ekki öllum.",
    "technique": "Heima má líkja eftir trompo-aðferðinni með því að marinera þunnt skorið svínakjöt og steikja það við mjög mikinn hita í litlum skömmtum áður en það er saxað. Markmiðið er að fá margar brúnaðar brúnir án þess að kjötið þorni.",
    "essentials": [
      "Svínakjöt í þunnum sneiðum.",
      "Marinering með þurrkuðu chili, achiote og sýru.",
      "Litlar maístortillur.",
      "Laukur, kóríander, salsa og límóna til að gefa ferskt lokabragð."
    ],
    "recipe": {
      "label": "Al pastor-innblásin taco á pönnu",
      "yield": "12 taco",
      "time": "u.þ.b. 45 mín. + marinering",
      "ingredients": [
        "700 g svínahnakki í þunnum sneiðum",
        "2 msk. achiote-mauk",
        "2 þurrkuð guajillo-chili, lögð í bleyti",
        "2 msk. edik",
        "1 dl appelsínusafi",
        "2 hvítlauksrif",
        "1 tsk. oregano",
        "12 litlar maístortillur",
        "laukur og kóríander",
        "límóna, salsa og ananas eftir smekk"
      ],
      "steps": [
        "Maukið achiote, chili, edik, appelsínu, hvítlauk og krydd í slétta marineringu.",
        "Marinerið svínakjötið í að minnsta kosti tvær klukkustundir, helst yfir nótt.",
        "Steikið kjötið á mjög heitri pönnu í litlum skömmtum svo brúnirnar fái mikinn lit.",
        "Látið kjötið hvíla stutt og saxið það í litla bita; steikið það aftur stutt ef vill.",
        "Hitið tortillurnar og fyllið þær með kjöti, lauk, kóríander, salsa, límónu og ananas ef vill."
      ]
    },
    "variants": [
      "Taquería-útgáfa steikt á trompo-teini.",
      "Heimaútgáfa steikt á pönnu eða undir grilli.",
      "Sumir staðir bera fram ananas af toppi trompo-teinsins, aðrir ekki."
    ],
    "serving": [
      "Borið fram sem lítil taco, yfirleitt nokkur á mann.",
      "Salsa og límóna þurfa að vera nógu áberandi til að vega upp á móti feitu kjötinu."
    ],
    "commonMistakes": [
      "Of þykkir kjötbitar án karamellíseraðra brúna.",
      "Of sæt marinering sem brennur áður en kjötið er fulleldað.",
      "Kaldar, þurrar tortillur sem springa utan um fyllinguna."
    ]
  },
  "en": {
    "overview": "Al pastor combines Mexican chilli and maize traditions with a vertical spit-roasting technique introduced through immigration from the eastern Mediterranean. The meat develops dark, caramelised edges while the inside remains juicy.",
    "history": "The dish developed in Mexico in the 1900s through the meeting of local taco traditions and vertical spit-roasting related to shawarma. It is particularly associated with Mexico City and central parts of the country.",
    "flavor": "Roasted, juicy pork with dried chilli, achiote, acidity and spices, balanced by raw onion, coriander and salsa. Pineapple is common in many servings, but not universal.",
    "technique": "At home, the trompo effect can be imitated by marinating thinly sliced pork and frying it over very high heat in batches before chopping. The aim is plenty of browned edges without drying out the meat.",
    "essentials": [
      "Thinly sliced pork.",
      "Marinade with dried chilli, achiote and acidity.",
      "Small corn tortillas.",
      "Onion, coriander, salsa and lime for a fresh finish."
    ],
    "recipe": {
      "label": "Al pastor-inspired pan-fried tacos",
      "yield": "12 tacos",
      "time": "approx. 45 min + marinating",
      "ingredients": [
        "700 g pork neck, thinly sliced",
        "2 tbsp achiote paste",
        "2 dried guajillo chillies, soaked",
        "2 tbsp vinegar",
        "1 dl orange juice",
        "2 garlic cloves",
        "1 tsp oregano",
        "12 small corn tortillas",
        "onion and coriander",
        "lime, salsa and pineapple as desired"
      ],
      "steps": [
        "Blend achiote, chilli, vinegar, orange, garlic and spices into a smooth marinade.",
        "Marinate the pork for at least two hours, preferably overnight.",
        "Fry the meat in a very hot pan in small batches so the edges develop a deep colour.",
        "Let the meat rest briefly and chop it into small pieces; give it a final quick fry if desired.",
        "Warm the tortillas and fill them with meat, onion, coriander, salsa, lime and optional pineapple."
      ]
    },
    "variants": [
      "Taquería version cooked on a trompo.",
      "Home version cooked in a pan or under a grill.",
      "Some places serve pineapple from the top of the trompo; others do not."
    ],
    "serving": [
      "Served as small tacos, usually several per person.",
      "Salsa and lime should be prominent enough to balance the fatty meat."
    ],
    "commonMistakes": [
      "Meat pieces that are too thick, without caramelised edges.",
      "An overly sweet marinade that burns before the meat is cooked.",
      "Cold, dry tortillas that crack around the filling."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
