import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const tomYumTranslations = {
  "nn": {
    "overview": "Tom yum er ei aromatisk suppe der krafta ber ein intens duft av urter og sitrus. Ho skal vere skarp og frisk heller enn tung, sjølv når ein kremete variant får chilipasta eller mjølk.",
    "history": "Tom yum er tett knytt til sentralthailandsk mat og finst i mange variantar. Tom yum goong med reker er den mest kjende internasjonalt.",
    "flavor": "Syrleg, sterk, salt og sitrusduftande, med sødme frå råvarene heller enn eit tungt sukkerpreg.",
    "technique": "Dei aromatiske ingrediensane blir lett knuste og får trekkje i krafta, men blir vanlegvis ikkje etne. Limejuice blir tilsett mot slutten slik at friskheita ikkje blir kokt bort.",
    "essentials": [
      "Sitrongras, galangal og makrutlimeblad.",
      "Chili og fiskesaus.",
      "Limejuice som frisk syre.",
      "Reker, sopp eller andre råvarer som blir raskt tillaga."
    ],
    "recipe": {
      "label": "Tom yum goong-inspirert suppe",
      "yield": "4 porsjonar",
      "time": "ca. 30 min",
      "ingredients": [
        "1,2 l kylling- eller sjømatkraft",
        "2 stilkar sitrongras",
        "30 g galangal eller ingefær",
        "4 makrutlimeblad",
        "2–4 thai-chiliar",
        "250 g sopp",
        "300 g rå reker",
        "2 ss fiskesaus",
        "3 ss limejuice",
        "koriander"
      ],
      "steps": [
        "Knus sitrongras og galangal lett og lat dei trekkje med limeblad og chili i krafta i 10 minutt.",
        "Tilset sopp og lat han bli mør.",
        "Ha i rekene og lat dei trekkje berre til dei er gjennomkokte.",
        "Ta gryta av varmen og smak til med fiskesaus og limejuice.",
        "Server straks med koriander; dei aromatiske ingrediensane kan silast av eller liggje att for dufta si skuld."
      ]
    },
    "variants": [
      "Tom yum goong med reker.",
      "Tom yum gai med kylling.",
      "Nam khon: kremete stil med chilipasta.",
      "Klar nam sai utan kremete innslag."
    ],
    "serving": [
      "Blir servert rykande varm som suppe eller del av eit større måltid.",
      "Ris ved sida av dempar hete og syre."
    ],
    "commonMistakes": [
      "Å koke limejuice lenge og miste frisk aroma.",
      "Å bruke store mengder sukker for å runde av syra.",
      "Å koke reker eller sopp for lenge."
    ]
  },
  "sv": {
    "overview": "Tom yum är en aromatisk soppa där buljongen bär en intensiv doft av örter och citrus. Den ska vara skarp och frisk snarare än tung, även när en krämig variant innehåller chilipasta eller mjölk.",
    "history": "Tom yum är nära förknippad med centralthailändsk mat och finns i många varianter. Tom yum goong med räkor är den internationellt mest kända.",
    "flavor": "Syrlig, stark, salt och citrusdoftande, med sötma från råvarorna snarare än en tung sockerprofil.",
    "technique": "De aromatiska ingredienserna krossas lätt och får dra i buljongen, men äts normalt inte. Limejuice tillsätts mot slutet så att friskheten inte kokas bort.",
    "essentials": [
      "Citrongräs, galangal och makrutlimeblad.",
      "Chili och fisksås.",
      "Limejuice som frisk syra.",
      "Räkor, svamp eller andra råvaror som tillagas snabbt."
    ],
    "recipe": {
      "label": "Tom yum goong-inspirerad soppa",
      "yield": "4 portioner",
      "time": "ca 30 min",
      "ingredients": [
        "1,2 l kyckling- eller skaldjursbuljong",
        "2 stjälkar citrongräs",
        "30 g galangal eller ingefära",
        "4 makrutlimeblad",
        "2–4 thaichili",
        "250 g svamp",
        "300 g råa räkor",
        "2 msk fisksås",
        "3 msk limejuice",
        "koriander"
      ],
      "steps": [
        "Krossa citrongräs och galangal lätt och låt dem dra med limeblad och chili i buljongen i 10 minuter.",
        "Tillsätt svamp och låt den bli mjuk.",
        "Lägg i räkorna och låt dem sjuda bara tills de är genomkokta.",
        "Ta grytan från värmen och smaka av med fisksås och limejuice.",
        "Servera genast med koriander; de aromatiska ingredienserna kan silas bort eller ligga kvar för doftens skull."
      ]
    },
    "variants": [
      "Tom yum goong med räkor.",
      "Tom yum gai med kyckling.",
      "Nam khon: krämig stil med chilipasta.",
      "Klar nam sai utan krämiga inslag."
    ],
    "serving": [
      "Serveras rykande varm som soppa eller del av en större måltid.",
      "Ris vid sidan av dämpar hetta och syra."
    ],
    "commonMistakes": [
      "Att koka limejuice länge och förlora den friska aromen.",
      "Att använda stora mängder socker för att runda av syran.",
      "Att överkoka räkor eller svamp."
    ]
  },
  "da": {
    "overview": "Tom yum er en aromatisk suppe, hvor bouillonen bærer en intens duft af urter og citrus. Den skal være skarp og frisk frem for tung, også når en cremet variant indeholder chilipasta eller mælk.",
    "history": "Tom yum er tæt knyttet til det centralthailandske køkken og findes i mange varianter. Tom yum goong med rejer er den internationalt mest kendte.",
    "flavor": "Syrlig, stærk, salt og citrusduftende, med sødme fra råvarerne snarere end en tung sukkerprofil.",
    "technique": "De aromatiske ingredienser knuses let og trækker i bouillonen, men spises normalt ikke. Limesaft tilsættes mod slutningen, så friskheden ikke koges væk.",
    "essentials": [
      "Citrongræs, galanga og makrutlimeblade.",
      "Chili og fiskesauce.",
      "Limesaft som frisk syre.",
      "Rejer, svampe eller andre råvarer, der tilberedes hurtigt."
    ],
    "recipe": {
      "label": "Tom yum goong-inspireret suppe",
      "yield": "4 portioner",
      "time": "ca. 30 min",
      "ingredients": [
        "1,2 l kyllinge- eller skaldyrsbouillon",
        "2 stilke citrongræs",
        "30 g galanga eller ingefær",
        "4 makrutlimeblade",
        "2–4 thaichilier",
        "250 g svampe",
        "300 g rå rejer",
        "2 spsk fiskesauce",
        "3 spsk limesaft",
        "koriander"
      ],
      "steps": [
        "Knus citrongræs og galanga let, og lad dem trække med limeblade og chili i bouillonen i 10 minutter.",
        "Tilsæt svampe, og lad dem blive møre.",
        "Tilsæt rejerne, og lad dem kun simre, til de er gennemkogte.",
        "Tag gryden af varmen, og smag til med fiskesauce og limesaft.",
        "Servér straks med koriander; de aromatiske ingredienser kan sies fra eller blive i suppen for duftens skyld."
      ]
    },
    "variants": [
      "Tom yum goong med rejer.",
      "Tom yum gai med kylling.",
      "Nam khon: cremet stil med chilipasta.",
      "Klar nam sai uden cremede elementer."
    ],
    "serving": [
      "Serveres rygende varm som suppe eller del af et større måltid.",
      "Ris ved siden af dæmper styrke og syre."
    ],
    "commonMistakes": [
      "At koge limesaft længe og miste den friske aroma.",
      "At bruge store mængder sukker til at afrunde syren.",
      "At koge rejer eller svampe for længe."
    ]
  },
  "fi": {
    "overview": "Tom yum on aromaattinen keitto, jonka liemessä tuoksuvat voimakkaasti yrtit ja sitrushedelmät. Sen tulee olla terävä ja raikas eikä raskas, vaikka kermaiseen muunnelmaan lisättäisiin chilitahnaa tai maitoa.",
    "history": "Tom yum liittyy läheisesti Keski-Thaimaan ruokaperinteeseen, ja siitä on monia muunnelmia. Katkarapuja sisältävä tom yum goong on kansainvälisesti tunnetuin.",
    "flavor": "Hapan, tulinen, suolainen ja sitruksinen; makeus tulee raaka-aineista eikä runsaasta sokerista.",
    "technique": "Aromaattiset ainekset murskataan kevyesti ja haudutetaan liemessä, mutta niitä ei yleensä syödä. Limemehu lisätään lopuksi, jotta raikkaus ei katoa keitettäessä.",
    "essentials": [
      "Sitruunaruohoa, galangalia ja makrutlimen lehtiä.",
      "Chiliä ja kalakastiketta.",
      "Limemehua raikkaaksi hapoksi.",
      "Katkarapuja, sieniä tai muita nopeasti kypsyviä aineksia."
    ],
    "recipe": {
      "label": "Tom yum goong -tyylinen keitto",
      "yield": "4 annosta",
      "time": "n. 30 min",
      "ingredients": [
        "1,2 l kana- tai merenelävä­lientä",
        "2 sitruunaruohon vartta",
        "30 g galangalia tai inkivääriä",
        "4 makrutlimen lehteä",
        "2–4 thaichiliä",
        "250 g sieniä",
        "300 g raakoja katkarapuja",
        "2 rkl kalakastiketta",
        "3 rkl limemehua",
        "korianteria"
      ],
      "steps": [
        "Murskaa sitruunaruoho ja galangal kevyesti ja hauduta niitä limenlehtien ja chilin kanssa liemessä 10 minuuttia.",
        "Lisää sienet ja anna niiden kypsyä pehmeiksi.",
        "Lisää katkaravut ja hauduta vain, kunnes ne ovat täysin kypsiä.",
        "Nosta kattila liedeltä ja mausta kalakastikkeella ja limemehulla.",
        "Tarjoile heti korianterin kanssa; aromaattiset ainekset voi siivilöidä pois tai jättää antamaan tuoksua."
      ]
    },
    "variants": [
      "Tom yum goong katkaravuilla.",
      "Tom yum gai kanalla.",
      "Nam khon: kermainen tyyli, jossa on chilitahnaa.",
      "Kirkas nam sai ilman kermaisuutta lisääviä aineksia."
    ],
    "serving": [
      "Tarjoillaan höyryävän kuumana keittona tai osana suurempaa ateriaa.",
      "Riisi lisukkeena lieventää tulisuutta ja hapokkuutta."
    ],
    "commonMistakes": [
      "Limemehun pitkä keittäminen, jolloin raikas aromi katoaa.",
      "Runsaan sokerin käyttäminen happamuuden pehmentämiseen.",
      "Katkarapujen tai sienten ylikypsentäminen."
    ]
  },
  "is": {
    "overview": "Tom yum er ilmandi súpa þar sem soðið ber sterkan ilm af kryddjurtum og sítrusávöxtum. Hún á að vera skörp og fersk fremur en þung, jafnvel þegar chili-mauki eða mjólk er bætt í rjómakennda útgáfu.",
    "history": "Tom yum tengist náið matargerð Mið-Taílands og er til í mörgum útgáfum. Tom yum goong með rækjum er þekktust á alþjóðavísu.",
    "flavor": "Súrt, sterkt, salt og ilmandi af sítrus, með sætu frá hráefnunum fremur en miklu sykurbragði.",
    "technique": "Ilmandi hráefnin eru marin lítillega og látin liggja í heitu soðinu en eru yfirleitt ekki borðuð. Límónusafa er bætt við undir lokin svo ferskleikinn sjóði ekki burt.",
    "essentials": [
      "Sítrónugras, galangal og makrut-límónulauf.",
      "Chili og fiskisósa.",
      "Límónusafi til að gefa ferska sýru.",
      "Rækjur, sveppir eða annað hráefni sem eldast hratt."
    ],
    "recipe": {
      "label": "Tom yum goong-innblásin súpa",
      "yield": "4 skammtar",
      "time": "u.þ.b. 30 mín.",
      "ingredients": [
        "1,2 l kjúklinga- eða sjávarfangssoð",
        "2 stönglar af sítrónugrasi",
        "30 g galangal eða engifer",
        "4 makrut-límónulauf",
        "2–4 taílensk chili",
        "250 g sveppir",
        "300 g hráar rækjur",
        "2 msk. fiskisósa",
        "3 msk. límónusafi",
        "kóríander"
      ],
      "steps": [
        "Merjið sítrónugras og galangal lítillega og látið liggja í heitu soðinu með límónulaufum og chili í 10 mínútur.",
        "Bætið sveppum út í og eldið þar til þeir eru mjúkir.",
        "Bætið rækjunum við og eldið aðeins þar til þær eru fulleldaðar.",
        "Takið pottinn af hitanum og smakkið til með fiskisósu og límónusafa.",
        "Berið strax fram með kóríander; sía má ilmandi hráefnin frá eða skilja þau eftir til að gefa ilm."
      ]
    },
    "variants": [
      "Tom yum goong með rækjum.",
      "Tom yum gai með kjúklingi.",
      "Nam khon: rjómakennd útgáfa með chili-mauki.",
      "Tær nam sai án hráefna sem gefa rjómakennda áferð."
    ],
    "serving": [
      "Borið fram rjúkandi heitt sem súpa eða hluti af stærri máltíð.",
      "Hrísgrjón til hliðar milda styrk og sýru."
    ],
    "commonMistakes": [
      "Að sjóða límónusafa lengi og missa ferskan ilm.",
      "Að nota mikið af sykri til að milda sýruna.",
      "Að ofsjóða rækjur eða sveppi."
    ]
  },
  "en": {
    "overview": "Tom yum is an aromatic soup in which the broth carries an intense fragrance of herbs and citrus. It should be sharp and fresh rather than heavy, even when chilli paste or milk is added to a creamy version.",
    "history": "Tom yum is closely associated with central Thai cuisine and comes in many variants. Tom yum goong with prawns is the best known internationally.",
    "flavor": "Sour, hot, salty and fragrant with citrus, with sweetness from the ingredients rather than a heavy sugar profile.",
    "technique": "The aromatics are lightly crushed and steeped in the broth but are not normally eaten. Lime juice is added towards the end to prevent its freshness from cooking away.",
    "essentials": [
      "Lemongrass, galangal and makrut lime leaves.",
      "Chilli and fish sauce.",
      "Lime juice for fresh acidity.",
      "Prawns, mushrooms or other ingredients that cook quickly."
    ],
    "recipe": {
      "label": "Tom yum goong-inspired soup",
      "yield": "4 servings",
      "time": "approx. 30 min",
      "ingredients": [
        "1.2 l chicken or seafood stock",
        "2 stalks lemongrass",
        "30 g galangal or ginger",
        "4 makrut lime leaves",
        "2–4 Thai chillies",
        "250 g mushrooms",
        "300 g raw prawns",
        "2 tbsp fish sauce",
        "3 tbsp lime juice",
        "coriander"
      ],
      "steps": [
        "Lightly crush the lemongrass and galangal and steep them with lime leaves and chilli in the stock for 10 minutes.",
        "Add the mushrooms and cook until tender.",
        "Add the prawns and simmer only until cooked through.",
        "Remove the pot from the heat and season with fish sauce and lime juice.",
        "Serve immediately with coriander; the aromatics may be strained out or left in for fragrance."
      ]
    },
    "variants": [
      "Tom yum goong with prawns.",
      "Tom yum gai with chicken.",
      "Nam khon: creamy style with chilli paste.",
      "Clear nam sai without creamy elements."
    ],
    "serving": [
      "Serve piping hot as a soup or part of a larger meal.",
      "Rice on the side moderates the heat and acidity."
    ],
    "commonMistakes": [
      "Boiling lime juice for too long and losing its fresh aroma.",
      "Using large amounts of sugar to soften the acidity.",
      "Overcooking prawns or mushrooms."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
