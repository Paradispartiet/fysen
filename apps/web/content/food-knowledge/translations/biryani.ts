import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";

type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const biryaniTranslations = {
  "nn": {
    "overview": "Biryani er ein stor rettfamilie med monalege regionale skilnader. Mange variantar byggjer på delvis kokt basmatiris, eit konsentrert krydra fyll og ein avsluttande dum-prosess der gryta blir lukka slik at ris og fyll tek opp aroma frå kvarandre.",
    "history": "Biryani har ei samansett historie med både lokale sørasiatiske og persiskinspirerte mattradisjonar. Hyderabad, Lucknow, Kolkata og fleire andre stader har utvikla tydelege eigne stilar, så éi oppskrift kan ikkje representere heile retten.",
    "flavor": "Duftande og lagdelt heller enn berre sterk: kardemomme, kanel, urter, steikt lauk og safran kan liggje over ein djupare krydderbase.",
    "technique": "Risen skal vere delvis kokt før lagdelinga, elles blir han lett grautete. Ei tett gryte og låg varme lèt dampen koke risen ferdig utan kraftig omrøring.",
    "essentials": [
      "Langkorna basmatiris som blir skylja og ofte bløytt.",
      "Krydra kjøt-, fiske- eller grønsaksfyll.",
      "Steikt lauk, urter og heile, varme krydder.",
      "Lagdeling og roleg dum-damping under tett lok."
    ],
    "recipe": {
      "label": "Kyllingbiryani for heimekjøkkenet",
      "yield": "4–5 porsjonar",
      "time": "ca. 90 min",
      "ingredients": [
        "350 g basmatiris",
        "600 g kyllinglår i bitar",
        "150 g yoghurt",
        "2 store laukar i tynne skiver",
        "4 kvitlauksfedd",
        "30 g ingefær",
        "1 ts spisskummen",
        "1 ts koriander",
        "1 ts garam masala",
        "1 kanelstong og 4 kardemommekapslar",
        "mynte og koriander",
        "safranvatn, valfritt"
      ],
      "steps": [
        "Skyl risen godt og bløytlegg han i 20–30 minutt.",
        "Mariner kyllingen med yoghurt, ingefær, kvitlauk, krydder og salt.",
        "Steik lauken djupgyllen og ta av noko til topping før kyllingen blir tillaga i resten.",
        "Kok risen i salta vatn til han er om lag 70 prosent ferdig, og hell av vatnet.",
        "Legg ris, kylling, urter og steikt lauk lagvis, tett gryta og damp på svært låg varme i 20–25 minutt før kvile."
      ]
    },
    "variants": [
      "Hyderabadi: kraftig aromatisk og ofte tett knytt til dum-teknikken.",
      "Lucknowi/Awadhi: gjerne meir varsam krydring og svært presis lagdeling.",
      "Kolkata: ofte mildare og kjend for potet i mange versjonar.",
      "Vegetarbiryani med grønsaker, paneer eller belgvekstar."
    ],
    "serving": [
      "Blir ofte servert med raita, salat eller syrleg tilbehøyr.",
      "Risen blir løyst varsamt opp ved servering slik at dei lange korna og laga blir bevarte."
    ],
    "commonMistakes": [
      "Å koke risen heilt ferdig før dum-steget.",
      "For vått fyll som gjer botnen grautete.",
      "Å røre hardt etter damping og knuse riskorna."
    ]
  },
  "sv": {
    "overview": "Biryani är en stor familj av rätter med betydande regionala skillnader. Många varianter bygger på delvis kokt basmatiris, en koncentrerad kryddad fyllning och en avslutande dum-process där grytan försluts så att ris och fyllning tar upp aromer från varandra.",
    "history": "Biryani har en sammansatt historia med både lokala sydasiatiska och persiskt inspirerade mattraditioner. Hyderabad, Lucknow, Kolkata och flera andra platser har utvecklat tydliga egna stilar, så ett enda recept kan inte representera hela rätten.",
    "flavor": "Doftande och mångskiktad snarare än bara stark: kardemumma, kanel, örter, stekt lök och saffran kan ligga ovanpå en djupare kryddbas.",
    "technique": "Riset ska vara delvis kokt före varvningen, annars blir det lätt grötigt. En tättslutande gryta och låg värme låter ångan tillaga riset färdigt utan kraftig omrörning.",
    "essentials": [
      "Långkornigt basmatiris som sköljs och ofta blötläggs.",
      "Kryddad fyllning av kött, fisk eller grönsaker.",
      "Stekt lök, örter och hela värmande kryddor.",
      "Varvning och varsam dum-ångkokning under tättslutande lock."
    ],
    "recipe": {
      "label": "Kycklingbiryani för hemmaköket",
      "yield": "4–5 portioner",
      "time": "ca 90 min",
      "ingredients": [
        "350 g basmatiris",
        "600 g kycklinglår i bitar",
        "150 g yoghurt",
        "2 stora lökar i tunna skivor",
        "4 vitlöksklyftor",
        "30 g ingefära",
        "1 tsk spiskummin",
        "1 tsk koriander",
        "1 tsk garam masala",
        "1 kanelstång och 4 kardemummakapslar",
        "mynta och koriander",
        "saffransvatten, valfritt"
      ],
      "steps": [
        "Skölj riset noga och blötlägg det i 20–30 minuter.",
        "Marinera kycklingen med yoghurt, ingefära, vitlök, kryddor och salt.",
        "Stek löken djupt gyllene och lägg undan en del till topping innan kycklingen tillagas i resten.",
        "Koka riset i saltat vatten tills det är ungefär 70 procent färdigt och häll av vattnet.",
        "Varva ris, kyckling, örter och stekt lök, förslut grytan och ångkoka på mycket låg värme i 20–25 minuter före vila."
      ]
    },
    "variants": [
      "Hyderabadi: kraftigt aromatisk och ofta nära förknippad med dum-tekniken.",
      "Lucknowi/Awadhi: ofta mer återhållsam kryddning och mycket exakt varvning.",
      "Kolkata: ofta mildare och känd för potatis i många versioner.",
      "Vegetarisk biryani med grönsaker, paneer eller baljväxter."
    ],
    "serving": [
      "Serveras ofta med raita, sallad eller syrliga tillbehör.",
      "Lossa riset försiktigt vid servering så att de långa kornen och lagren bevaras."
    ],
    "commonMistakes": [
      "Att koka riset helt färdigt före dum-steget.",
      "För blöt fyllning som gör botten grötig.",
      "Att röra om kraftigt efter ångkokningen och krossa riskornen."
    ]
  },
  "da": {
    "overview": "Biryani er en stor familie af retter med betydelige regionale forskelle. Mange varianter bygger på delvist kogt basmatiris, et koncentreret krydret fyld og en afsluttende dum-proces, hvor gryden lukkes tæt, så ris og fyld optager aromaer fra hinanden.",
    "history": "Biryani har en sammensat historie med både lokale sydasiatiske og persiskinspirerede madtraditioner. Hyderabad, Lucknow, Kolkata og flere andre steder har udviklet tydelige egne stilarter, så én opskrift kan ikke repræsentere hele retten.",
    "flavor": "Duftende og lagdelt snarere end blot stærk: kardemomme, kanel, urter, stegte løg og safran kan ligge over en dybere krydderibase.",
    "technique": "Risene skal være delvist kogte inden lagdelingen, ellers bliver de let grødagtige. En tætsluttende gryde og lav varme lader dampen færdigtilberede risene uden kraftig omrøring.",
    "essentials": [
      "Langkornede basmatiris, som skylles og ofte udblødes.",
      "Krydret fyld af kød, fisk eller grøntsager.",
      "Stegte løg, urter og hele, varmende krydderier.",
      "Lagdeling og rolig dum-dampning under tætsluttende låg."
    ],
    "recipe": {
      "label": "Kyllingebiryani til hjemmekøkkenet",
      "yield": "4–5 portioner",
      "time": "ca. 90 min",
      "ingredients": [
        "350 g basmatiris",
        "600 g kyllingelår i stykker",
        "150 g yoghurt",
        "2 store løg i tynde skiver",
        "4 fed hvidløg",
        "30 g ingefær",
        "1 tsk spidskommen",
        "1 tsk koriander",
        "1 tsk garam masala",
        "1 kanelstang og 4 kardemommekapsler",
        "mynte og koriander",
        "safranvand, valgfrit"
      ],
      "steps": [
        "Skyl risene grundigt, og udblød dem i 20–30 minutter.",
        "Marinér kyllingen med yoghurt, ingefær, hvidløg, krydderier og salt.",
        "Steg løgene dybt gyldne, og tag nogle fra til topping, før kyllingen tilberedes i resten.",
        "Kog risene i saltet vand, til de er omkring 70 procent færdige, og hæld vandet fra.",
        "Læg ris, kylling, urter og stegte løg i lag, luk gryden tæt, og damp ved meget lav varme i 20–25 minutter inden hvile."
      ]
    },
    "variants": [
      "Hyderabadi: kraftigt aromatisk og ofte tæt knyttet til dum-teknikken.",
      "Lucknowi/Awadhi: gerne mere afdæmpet krydring og meget præcis lagdeling.",
      "Kolkata: ofte mildere og kendt for kartofler i mange versioner.",
      "Vegetarisk biryani med grøntsager, paneer eller bælgfrugter."
    ],
    "serving": [
      "Serveres ofte med raita, salat eller syrligt tilbehør.",
      "Risene løsnes forsigtigt ved servering, så de lange korn og lagene bevares."
    ],
    "commonMistakes": [
      "At koge risene helt færdige før dum-trinnet.",
      "For vådt fyld, som gør bunden grødagtig.",
      "At røre kraftigt efter dampningen og knuse riskornene."
    ]
  },
  "fi": {
    "overview": "Biryani on laaja ruokalajien perhe, jossa on merkittäviä alueellisia eroja. Monet muunnelmat perustuvat osittain kypsennettyyn basmatiriisiin, tiiviiseen mausteiseen täytteeseen ja lopuksi käytettävään dum-menetelmään, jossa kattila suljetaan tiiviisti, jotta riisi ja täyte imevät toistensa aromeja.",
    "history": "Biryanin historia on monisyinen, ja siinä yhdistyvät paikalliset eteläaasialaiset sekä persialaisvaikutteiset ruokaperinteet. Hyderabad, Lucknow, Kolkata ja monet muut paikat ovat kehittäneet omat tunnistettavat tyylinsä, joten yksi resepti ei edusta koko ruokalajia.",
    "flavor": "Tuoksuva ja moniulotteinen ennemmin kuin pelkästään tulinen: kardemumma, kaneli, yrtit, paistettu sipuli ja sahrami voivat täydentää syvempää maustepohjaa.",
    "technique": "Riisin tulee olla osittain kypsää ennen kerrosten kokoamista, muuten siitä tulee helposti puuromaista. Tiiviisti suljettu kattila ja matala lämpö antavat höyryn kypsentää riisin loppuun ilman voimakasta sekoittamista.",
    "essentials": [
      "Pitkäjyväistä basmatiriisiä, joka huuhdellaan ja usein liotetaan.",
      "Mausteinen liha-, kala- tai kasvistäyte.",
      "Paistettua sipulia, yrttejä ja kokonaisia lämmittäviä mausteita.",
      "Kerroksittain kokoaminen ja rauhallinen dum-höyrykypsennys tiiviin kannen alla."
    ],
    "recipe": {
      "label": "Kanabiryani kotikeittiöön",
      "yield": "4–5 annosta",
      "time": "n. 90 min",
      "ingredients": [
        "350 g basmatiriisiä",
        "600 g kanan reisilihaa paloina",
        "150 g jogurttia",
        "2 suurta sipulia ohuina viipaleina",
        "4 valkosipulinkynttä",
        "30 g inkivääriä",
        "1 tl juustokuminaa",
        "1 tl korianteria",
        "1 tl garam masalaa",
        "1 kanelitanko ja 4 kardemummakotaa",
        "minttua ja korianteria",
        "sahramivettä, halutessasi"
      ],
      "steps": [
        "Huuhtele riisi hyvin ja liota sitä 20–30 minuuttia.",
        "Marinoi kana jogurtilla, inkiväärillä, valkosipulilla, mausteilla ja suolalla.",
        "Paista sipulit syvän kullanruskeiksi ja ota osa sivuun päälle lisättäväksi ennen kuin kypsennät kanan lopuissa sipuleissa.",
        "Keitä riisiä suolatussa vedessä, kunnes se on noin 70 prosenttisesti kypsää, ja valuta vesi pois.",
        "Kokoa riisi, kana, yrtit ja paistetut sipulit kerroksiksi, sulje kattila tiiviisti ja höyrytä hyvin miedolla lämmöllä 20–25 minuuttia ennen vetäytymistä."
      ]
    },
    "variants": [
      "Hyderabadi: voimakkaan aromaattinen ja usein läheisesti yhteydessä dum-tekniikkaan.",
      "Lucknowi/Awadhi: usein hillitympi maustaminen ja erittäin tarkka kerrostaminen.",
      "Kolkata: usein miedompi ja tunnettu monissa versioissa käytettävästä perunasta.",
      "Kasvisbiryani, jossa on kasviksia, paneeria tai palkokasveja."
    ],
    "serving": [
      "Tarjoillaan usein raitan, salaatin tai happamien lisukkeiden kanssa.",
      "Irrota riisinjyvät varovasti tarjoiltaessa, jotta pitkät jyvät ja kerrokset säilyvät."
    ],
    "commonMistakes": [
      "Riisin keittäminen täysin kypsäksi ennen dum-vaihetta.",
      "Liian märkä täyte, joka tekee pohjasta puuromaisen.",
      "Voimakas sekoittaminen höyrykypsennyksen jälkeen, jolloin riisinjyvät rikkoutuvat."
    ]
  },
  "is": {
    "overview": "Biryani er stór fjölskylda rétta með verulegum svæðisbundnum mun. Margar útgáfur byggjast á hálfsoðnum basmatihrísgrjónum, bragðmikilli kryddaðri fyllingu og loks dum-aðferð þar sem pottinum er lokað þétt svo hrísgrjónin og fyllingin taki í sig ilm hvort af öðru.",
    "history": "Biryani á sér margþætta sögu með bæði staðbundnum suður-asískum og persneskum matarhefðum. Hyderabad, Lucknow, Kolkata og fleiri staðir hafa þróað sína eigin greinilegu stíla, svo ein uppskrift getur ekki staðið fyrir allan réttinn.",
    "flavor": "Ilmandi og marglaga fremur en einfaldlega sterkur: kardimommur, kanill, kryddjurtir, steiktur laukur og saffran geta legið ofan á dýpri kryddgrunni.",
    "technique": "Hrísgrjónin eiga að vera soðin að hluta áður en lögin eru sett saman, annars verða þau auðveldlega grautarkennd. Þétt lokaður pottur og lágur hiti leyfa gufunni að ljúka eldun grjónanna án kröftugrar hræringar.",
    "essentials": [
      "Langkorna basmatihrísgrjón sem eru skoluð og oft lögð í bleyti.",
      "Krydduð fylling úr kjöti, fiski eða grænmeti.",
      "Steiktur laukur, kryddjurtir og heil hlý krydd.",
      "Lagskipting og hæg dum-gufusuða undir þéttu loki."
    ],
    "recipe": {
      "label": "Kjúklingabiryani fyrir heimiliseldhúsið",
      "yield": "4–5 skammtar",
      "time": "u.þ.b. 90 mín.",
      "ingredients": [
        "350 g basmatihrísgrjón",
        "600 g kjúklingalæri í bitum",
        "150 g jógúrt",
        "2 stórir laukar í þunnum sneiðum",
        "4 hvítlauksrif",
        "30 g engifer",
        "1 tsk. kúmín",
        "1 tsk. kóríander",
        "1 tsk. garam masala",
        "1 kanilstöng og 4 kardimommuhylki",
        "mynta og kóríander",
        "saffranvatn, valfrjálst"
      ],
      "steps": [
        "Skolið hrísgrjónin vel og leggið þau í bleyti í 20–30 mínútur.",
        "Marinerið kjúklinginn með jógúrt, engifer, hvítlauk, kryddi og salti.",
        "Steikið laukinn þar til hann er dökkgylltur og takið hluta frá til að setja ofan á áður en kjúklingurinn er eldaður í afganginum.",
        "Sjóðið hrísgrjónin í söltu vatni þar til þau eru um það bil 70 prósent soðin og hellið vatninu af.",
        "Setjið hrísgrjón, kjúkling, kryddjurtir og steiktan lauk í lög, lokið pottinum þétt og gufusjóðið við mjög lágan hita í 20–25 mínútur áður en rétturinn fær að hvíla."
      ]
    },
    "variants": [
      "Hyderabadi: mjög ilmandi og oft nátengd dum-aðferðinni.",
      "Lucknowi/Awadhi: oft hófstilltara krydd og mjög nákvæm lagskipting.",
      "Kolkata: oft mildari og þekkt fyrir kartöflur í mörgum útgáfum.",
      "Grænmetisbiryani með grænmeti, paneer eða belgjurtum."
    ],
    "serving": [
      "Oft borið fram með raita, salati eða súru meðlæti.",
      "Losið varlega um hrísgrjónin við framreiðslu svo löngu kornin og lögin haldist."
    ],
    "commonMistakes": [
      "Að fullsjóða hrísgrjónin fyrir dum-skrefið.",
      "Of blaut fylling sem gerir botninn grautarkenndan.",
      "Að hræra kröftuglega eftir gufusuðu og brjóta hrísgrjónakornin."
    ]
  },
  "en": {
    "overview": "Biryani is a large family of dishes with substantial regional differences. Many variants use partially cooked basmati rice, a concentrated spiced filling and a final dum process in which the pot is sealed so that the rice and filling absorb each other's aromas.",
    "history": "Biryani has a complex history involving both local South Asian and Persian-inspired culinary traditions. Hyderabad, Lucknow, Kolkata and several other places have developed distinctive styles, so no single recipe can represent the whole dish.",
    "flavor": "Fragrant and layered rather than simply hot: cardamom, cinnamon, herbs, fried onions and saffron may sit above a deeper spice base.",
    "technique": "The rice should be partially cooked before layering, otherwise it easily turns mushy. A tightly sealed pot and low heat allow the steam to finish cooking the rice without vigorous stirring.",
    "essentials": [
      "Long-grain basmati rice, rinsed and often soaked.",
      "Spiced meat, fish or vegetable filling.",
      "Fried onions, herbs and whole warming spices.",
      "Layering and gentle dum steaming under a tight-fitting lid."
    ],
    "recipe": {
      "label": "Chicken biryani for the home kitchen",
      "yield": "4–5 servings",
      "time": "approx. 90 min",
      "ingredients": [
        "350 g basmati rice",
        "600 g chicken thighs, cut into pieces",
        "150 g yoghurt",
        "2 large onions, thinly sliced",
        "4 garlic cloves",
        "30 g ginger",
        "1 tsp cumin",
        "1 tsp coriander",
        "1 tsp garam masala",
        "1 cinnamon stick and 4 cardamom pods",
        "mint and coriander",
        "saffron water, optional"
      ],
      "steps": [
        "Rinse the rice thoroughly and soak it for 20–30 minutes.",
        "Marinate the chicken with yoghurt, ginger, garlic, spices and salt.",
        "Fry the onions until deep golden and reserve some for topping before cooking the chicken in the rest.",
        "Cook the rice in salted water until it is approximately 70 percent done, then drain.",
        "Layer the rice, chicken, herbs and fried onions, seal the pot and steam over very low heat for 20–25 minutes before resting."
      ]
    },
    "variants": [
      "Hyderabadi: intensely aromatic and often closely associated with dum cooking.",
      "Lucknowi/Awadhi: often more restrained seasoning and very precise layering.",
      "Kolkata: often milder and known for the use of potato in many versions.",
      "Vegetable biryani with vegetables, paneer or legumes."
    ],
    "serving": [
      "Often served with raita, salad or tangy accompaniments.",
      "Gently loosen the rice when serving to preserve the long grains and layers."
    ],
    "commonMistakes": [
      "Fully cooking the rice before the dum stage.",
      "A filling that is too wet, making the bottom mushy.",
      "Stirring vigorously after steaming and breaking the rice grains."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
