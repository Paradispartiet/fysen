import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const cochinitaPibilTranslations = {
  "nn": {
    "overview": "Cochinita pibil får raudfargen frå annatto i achiote og friskheita frå syrleg sitrus. Kjøtet blir tillaga lenge og fuktig til det kan rivast, medan sylta raudlauk og sterk chili gjev kontrast.",
    "history": "Retten er tett knytt til Yucatán og pibil-teknikkar der innpakka mat blir tillaga i jordomn. Moderne variantar bruker ofte vanleg omn, men bevarer achiote, sitrus og langsam tillaging.",
    "flavor": "Jordleg og peparaktig achiote, sitrus, kvitlauk og varme krydder rundt rikt svinekjøt, balansert av svært syrleg raudlauk.",
    "technique": "Lat marinaden trekkje inn, og tillag kjøtet tett innpakka eller under lok slik at det braiserast i eiga væske. Høg varme kort mot slutten kan gje bruna kantar.",
    "essentials": [
      "Svinebog eller nakke med nok feitt og bindevev.",
      "Achiotepasta eller annattobasert recado rojo.",
      "Syrleg sitrus og kvitlauk.",
      "Sylta raudlauk og sterk chili som frisk topping."
    ],
    "recipe": {
      "label": "Cochinita pibil i omn",
      "yield": "6 porsjonar",
      "time": "ca. 4 timar + marinering",
      "ingredients": [
        "1,5 kg svinebog",
        "100 g achiotepasta",
        "1,5 dl appelsinjuice",
        "0,75 dl limejuice",
        "4 kvitlauksfedd",
        "1 ts oregano",
        "1/2 ts spisskummen",
        "2 raudlaukar",
        "1 dl eddik",
        "maistortillaer",
        "habanero etter smak"
      ],
      "steps": [
        "Bland achiote, sitrus, kvitlauk og krydder og gni marinaden godt inn i svinekjøtet.",
        "Mariner minst fire timar, gjerne over natta.",
        "Legg kjøtet i tett gryte eller pakk i bakepapir og folie og steik langsamt til det lett kan rivast.",
        "Skjer raudlauken tynt og sylt raskt i eddik, lime, salt og eventuelt litt habanero.",
        "Riv kjøtet i steikesjyen og server i varme maistortillaer med sylta lauk."
      ]
    },
    "variants": [
      "Tradisjonell pibil-tillaging i jordomn.",
      "Heimevariant i tett gryte eller omn.",
      "Tacos, tortas og tallerkenserveringar med same kjøtbase."
    ],
    "serving": [
      "Sylta raudlauk er meir enn pynt – syra balanserer det rike kjøtet.",
      "Maistortillaer og sterk salsa passar godt til."
    ],
    "commonMistakes": [
      "For magert kjøt som tørkar under lang tillaging.",
      "For lite syre i marinaden og tung, jordleg smak.",
      "Å helle bort steikesjyen i staden for å vende han inn i kjøtet."
    ]
  },
  "sv": {
    "overview": "Cochinita pibil får sin röda färg från annatto i achiote och sin friskhet från syrlig citrus. Köttet tillagas länge och fuktigt tills det kan dras isär, medan inlagd rödlök och stark chili ger kontrast.",
    "history": "Rätten är nära förknippad med Yucatán och pibil-tekniker där mat tillagas inlindad i en jordugn. Moderna versioner använder ofta vanlig ugn men behåller achiote, citrus och långsam tillagning.",
    "flavor": "Jordig och pepprig achiote, citrus, vitlök och värmande kryddor kring fylligt fläskkött, balanserat av mycket syrlig rödlök.",
    "technique": "Låt marinaden tränga in och tillaga köttet tätt inlindat eller under lock så att det bräseras i sin egen vätska. Kort hög värme mot slutet kan ge brynta kanter.",
    "essentials": [
      "Fläskbog eller karré med tillräckligt fett och bindväv.",
      "Achiotepasta eller annattobaserad recado rojo.",
      "Syrlig citrus och vitlök.",
      "Inlagd rödlök och stark chili som frisk topping."
    ],
    "recipe": {
      "label": "Cochinita pibil i ugn",
      "yield": "6 portioner",
      "time": "ca 4 timmar + marinering",
      "ingredients": [
        "1,5 kg fläskbog",
        "100 g achiotepasta",
        "1,5 dl apelsinjuice",
        "0,75 dl limejuice",
        "4 vitlöksklyftor",
        "1 tsk oregano",
        "1/2 tsk spiskummin",
        "2 rödlökar",
        "1 dl vinäger",
        "majstortillor",
        "habanero efter smak"
      ],
      "steps": [
        "Blanda achiote, citrus, vitlök och kryddor och gnid in marinaden ordentligt i fläskköttet.",
        "Marinera minst fyra timmar, gärna över natten.",
        "Lägg köttet i en tättslutande gryta eller slå in i bakplåtspapper och folie och tillaga långsamt tills det lätt kan dras isär.",
        "Skiva rödlöken tunt och lägg snabbt in i vinäger, lime, salt och eventuellt lite habanero.",
        "Dra isär köttet i stekskyn och servera i varma majstortillor med inlagd lök."
      ]
    },
    "variants": [
      "Traditionell pibil-tillagning i jordugn.",
      "Hemmavariant i tättslutande gryta eller ugn.",
      "Tacos, tortas och tallriksserveringar med samma köttbas."
    ],
    "serving": [
      "Inlagd rödlök är mer än dekoration – syran balanserar det rika köttet.",
      "Majstortillor och stark salsa passar naturligt till."
    ],
    "commonMistakes": [
      "För magert kött som torkar vid lång tillagning.",
      "För lite syra i marinaden och tung, jordig smak.",
      "Att hälla bort stekskyn i stället för att blanda tillbaka den i köttet."
    ]
  },
  "da": {
    "overview": "Cochinita pibil får sin røde farve fra annatto i achiote og friskhed fra syrlig citrus. Kødet tilberedes længe og fugtigt, til det kan rives fra hinanden, mens syltede rødløg og stærk chili giver kontrast.",
    "history": "Retten er tæt knyttet til Yucatán og pibil-teknikker, hvor indpakket mad tilberedes i en jordovn. Moderne versioner bruger ofte almindelig ovn, men bevarer achiote, citrus og langsom tilberedning.",
    "flavor": "Jordagtig og pebret achiote, citrus, hvidløg og varmende krydderier omkring fyldigt svinekød, afbalanceret af meget syrlige rødløg.",
    "technique": "Lad marinaden trænge ind, og tilbered kødet tæt indpakket eller under låg, så det braiseres i egen væske. Kort høj varme mod slutningen kan give brunede kanter.",
    "essentials": [
      "Svinebov eller nakke med nok fedt og bindevæv.",
      "Achiotepasta eller annattobaseret recado rojo.",
      "Syrlig citrus og hvidløg.",
      "Syltede rødløg og stærk chili som frisk topping."
    ],
    "recipe": {
      "label": "Cochinita pibil i ovn",
      "yield": "6 portioner",
      "time": "ca. 4 timer + marinering",
      "ingredients": [
        "1,5 kg svinebov",
        "100 g achiotepasta",
        "1,5 dl appelsinjuice",
        "0,75 dl limesaft",
        "4 fed hvidløg",
        "1 tsk oregano",
        "1/2 tsk spidskommen",
        "2 rødløg",
        "1 dl eddike",
        "majstortillaer",
        "habanero efter smag"
      ],
      "steps": [
        "Bland achiote, citrus, hvidløg og krydderier, og gnid marinaden godt ind i svinekødet.",
        "Marinér mindst fire timer, gerne natten over.",
        "Læg kødet i en tætsluttende gryde eller pak det i bagepapir og folie, og steg langsomt, til det let kan rives fra hinanden.",
        "Skær rødløgene tyndt, og sylt hurtigt i eddike, lime, salt og eventuelt lidt habanero.",
        "Riv kødet i stegeskyen, og servér i varme majstortillaer med syltede løg."
      ]
    },
    "variants": [
      "Traditionel pibil-tilberedning i jordovn.",
      "Hjemmevariant i tætsluttende gryde eller ovn.",
      "Tacos, tortas og tallerkenserveringer med samme kødbase."
    ],
    "serving": [
      "Syltede rødløg er mere end pynt – syren afbalancerer det fyldige kød.",
      "Majstortillaer og stærk salsa passer naturligt til."
    ],
    "commonMistakes": [
      "For magert kød, der tørrer ved lang tilberedning.",
      "For lidt syre i marinaden og tung, jordagtig smag.",
      "At hælde stegeskyen væk frem for at vende den tilbage i kødet."
    ]
  },
  "fi": {
    "overview": "Cochinita pibil saa punaisen värinsä achioten annattosta ja raikkautensa happamista sitrushedelmistä. Liha kypsennetään pitkään kosteissa oloissa revittäväksi, ja pikkelöity punasipuli sekä tulinen chili tuovat kontrastia.",
    "history": "Ruoka liittyy läheisesti Yucatániin ja pibil-menetelmään, jossa ruoka kypsennetään käärittynä maauunissa. Nykyversioissa käytetään usein tavallista uunia, mutta achiote, sitrus ja hidas kypsennys säilyvät keskeisinä.",
    "flavor": "Maanläheinen ja pippurinen achiote, sitrus, valkosipuli ja lämmittävät mausteet täyteläisen sianlihan ympärillä, vastapainona hyvin hapan punasipuli.",
    "technique": "Anna marinadin imeytyä ja kypsennä liha tiiviisti käärittynä tai kannen alla omassa nesteessään. Lyhyt kova lämpö lopuksi voi ruskistaa reunat.",
    "essentials": [
      "Sianlapaa tai -niskaa, jossa on riittävästi rasvaa ja sidekudosta.",
      "Achiotetahnaa tai annattopohjaista recado rojoa.",
      "Hapanta sitrusta ja valkosipulia.",
      "Pikkelöityä punasipulia ja tulista chiliä raikkaaksi päällysteeksi."
    ],
    "recipe": {
      "label": "Cochinita pibil uunissa",
      "yield": "6 annosta",
      "time": "n. 4 tuntia + marinointi",
      "ingredients": [
        "1,5 kg sianlapaa",
        "100 g achiotetahnaa",
        "1,5 dl appelsiinimehua",
        "0,75 dl limemehua",
        "4 valkosipulinkynttä",
        "1 tl oreganoa",
        "1/2 tl juustokuminaa",
        "2 punasipulia",
        "1 dl etikkaa",
        "maissitortilloja",
        "habaneroa maun mukaan"
      ],
      "steps": [
        "Sekoita achiote, sitrus, valkosipuli ja mausteet ja hiero marinadi hyvin sianlihaan.",
        "Marinoi vähintään neljä tuntia, mielellään yön yli.",
        "Laita liha tiiviiseen pataan tai kääri leivinpaperiin ja folioon ja kypsennä hitaasti, kunnes se irtoaa säikeiksi.",
        "Viipaloi punasipuli ohueksi ja pikkelöi nopeasti etikassa, limessä, suolassa ja halutessasi habanerossa.",
        "Revi liha paistoliemeen ja tarjoile lämpimissä maissitortilloissa pikkelöidyn sipulin kanssa."
      ]
    },
    "variants": [
      "Perinteinen pibil-kypsennys maauunissa.",
      "Kotiversio tiiviissä padassa tai uunissa.",
      "Tacot, tortat ja lautasannokset samalla lihapohjalla."
    ],
    "serving": [
      "Pikkelöity punasipuli ei ole pelkkä koriste – happamuus tasapainottaa täyteläistä lihaa.",
      "Maissitortillat ja tulinen salsa sopivat luontevasti lisukkeiksi."
    ],
    "commonMistakes": [
      "Liian vähärasvainen liha, joka kuivuu pitkään kypsennettäessä.",
      "Liian vähän happoa marinadissa ja raskas, maanläheinen maku.",
      "Paistoliemen kaataminen pois sen sijaan, että se sekoitetaan takaisin lihaan."
    ]
  },
  "is": {
    "overview": "Cochinita pibil fær rauða litinn frá annatto í achiote og ferskleika frá súrum sítrusávöxtum. Kjötið er eldað lengi í raka þar til hægt er að rífa það, en súrsaður rauðlaukur og sterkt chili gefa andstæðu.",
    "history": "Rétturinn tengist náið Yucatán og pibil-aðferðum þar sem innpakkaður matur er eldaður í jarðofni. Nútímaútgáfur nota oft venjulegan ofn en halda achiote, sítrus og hægri eldun sem kjarna.",
    "flavor": "Jarðbundið og piparkennt achiote, sítrus, hvítlaukur og hlý krydd með ríkulegu svínakjöti, í jafnvægi við mjög súran rauðlauk.",
    "technique": "Látið marineringuna smjúga inn og eldið kjötið þétt innpakkað eða undir loki svo það malli í eigin vökva. Stuttur hár hiti í lokin getur brúnað brúnirnar.",
    "essentials": [
      "Svínabógur eða hnakki með nægri fitu og bandvef.",
      "Achiote-mauk eða recado rojo úr annatto.",
      "Súr sítrus og hvítlaukur.",
      "Súrsaður rauðlaukur og sterkt chili sem ferskt álegg."
    ],
    "recipe": {
      "label": "Cochinita pibil í ofni",
      "yield": "6 skammtar",
      "time": "u.þ.b. 4 klst. + marinering",
      "ingredients": [
        "1,5 kg svínabógur",
        "100 g achiote-mauk",
        "1,5 dl appelsínusafi",
        "0,75 dl límónusafi",
        "4 hvítlauksrif",
        "1 tsk. oregano",
        "1/2 tsk. kúmín",
        "2 rauðlaukar",
        "1 dl edik",
        "maístortillur",
        "habanero eftir smekk"
      ],
      "steps": [
        "Blandið achiote, sítrus, hvítlauk og kryddi og nuddið marineringunni vel í svínakjötið.",
        "Marinerið í að minnsta kosti fjórar klukkustundir, helst yfir nótt.",
        "Setjið kjötið í þéttan pott eða pakkið í bökunarpappír og álpappír og eldið hægt þar til auðvelt er að rífa það.",
        "Skerið rauðlaukinn þunnt og súrsið hratt í ediki, límónu, salti og mögulega habanero.",
        "Rífið kjötið í steikingarsafanum og berið fram í heitum maístortillum með súrsuðum lauk."
      ]
    },
    "variants": [
      "Hefðbundin pibil-eldun í jarðofni.",
      "Heimaútgáfa í þéttum potti eða ofni.",
      "Taco, tortas og diskar með sama kjötgrunni."
    ],
    "serving": [
      "Súrsaður rauðlaukur er meira en skraut – sýran vegur upp á móti ríkulegu kjötinu.",
      "Maístortillur og sterk salsa passa vel með."
    ],
    "commonMistakes": [
      "Of magurt kjöt sem þornar við langa eldun.",
      "Of lítil sýra í marineringu og þungt, jarðbundið bragð.",
      "Að hella steikingarsafanum burt í stað þess að blanda honum aftur við kjötið."
    ]
  },
  "en": {
    "overview": "Cochinita pibil gets its red colour from annatto in achiote and its freshness from tart citrus. The meat is cooked slowly in moist conditions until shreddable, with pickled red onion and hot chilli providing contrast.",
    "history": "The dish is closely associated with Yucatán and pibil techniques in which wrapped food cooks in an earth oven. Modern versions often use a conventional oven while retaining achiote, citrus and slow cooking.",
    "flavor": "Earthy, peppery achiote, citrus, garlic and warming spices surround rich pork, balanced by very tangy red onion.",
    "technique": "Allow the marinade to penetrate and cook the meat tightly wrapped or covered so it braises in its own juices. Brief high heat at the end can brown the edges.",
    "essentials": [
      "Pork shoulder or neck with enough fat and connective tissue.",
      "Achiote paste or annatto-based recado rojo.",
      "Tart citrus and garlic.",
      "Pickled red onion and hot chilli as fresh toppings."
    ],
    "recipe": {
      "label": "Oven-cooked cochinita pibil",
      "yield": "6 servings",
      "time": "approx. 4 hours + marinating",
      "ingredients": [
        "1.5 kg pork shoulder",
        "100 g achiote paste",
        "1.5 dl orange juice",
        "0.75 dl lime juice",
        "4 garlic cloves",
        "1 tsp oregano",
        "1/2 tsp cumin",
        "2 red onions",
        "1 dl vinegar",
        "corn tortillas",
        "habanero to taste"
      ],
      "steps": [
        "Mix achiote, citrus, garlic and spices and rub the marinade well into the pork.",
        "Marinate for at least four hours, preferably overnight.",
        "Place the meat in a tightly covered pot or wrap it in baking paper and foil and cook slowly until it shreds easily.",
        "Thinly slice the red onion and quickly pickle in vinegar, lime, salt and optional habanero.",
        "Shred the meat in its cooking juices and serve in warm corn tortillas with pickled onion."
      ]
    },
    "variants": [
      "Traditional pibil cooking in an earth oven.",
      "Home version in a tightly covered pot or oven.",
      "Tacos, tortas and plated servings using the same meat base."
    ],
    "serving": [
      "Pickled red onion is more than decoration – its acidity balances the rich meat.",
      "Corn tortillas and hot salsa are natural accompaniments."
    ],
    "commonMistakes": [
      "Meat that is too lean and dries out during long cooking.",
      "Insufficient acidity in the marinade, producing a heavy, earthy flavour.",
      "Discarding the cooking juices instead of folding them back into the meat."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
