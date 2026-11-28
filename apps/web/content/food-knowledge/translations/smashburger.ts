import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const smashburgerTranslations = {
  "nn": {
    "overview": "Smashburger er først og fremst ein steikjeteknikk. I staden for å forme ein tjukk burger på førehand blir kjøtet pressa hardt éin gong mot ei varm plate, slik at ei stor flate får direkte kontakt og kraftig Maillard-bruning.",
    "history": "Tynne diner- og steikeplateburgarar har lange amerikanske tradisjonar, medan omgrepet smashburger er blitt svært synleg gjennom moderne burgarkjeder og uavhengige restaurantar. Teknikken byggjer på høg varme, rask steiking og mykje skorpe.",
    "flavor": "Intens steikt kjøtsmak, salt, smelta ost og mjukt brød, ofte balansert med sylteagurk, lauk og syrleg burgarsaus.",
    "technique": "Bruk kaldt kjøt med nok feitt, form lause bollar og press straks mot ei nesten rykande varm stål- eller støypejernsflate. Ikkje press igjen etter at skorpa har sett seg – då pressar du berre ut saft.",
    "essentials": [
      "Kjøtdeig med nok feitt til å halde seg saftig.",
      "Svært varm, tung steikeflate.",
      "Eitt hardt press heilt i starten av steikinga.",
      "Mjukt burgarbrød, ost og få, tydelege garnityr."
    ],
    "recipe": {
      "label": "Dobbel smashburger",
      "yield": "4 burgarar",
      "time": "ca. 25 min",
      "ingredients": [
        "600 g kjøtdeig med ca. 20 % feitt",
        "8 skiver burgarost",
        "4 mjuke burgarbrød",
        "salt og pepar",
        "1 lauk i svært tynne skiver",
        "sylteagurk",
        "majones, sennep og ketchup etter smak",
        "litt smør til brøda"
      ],
      "steps": [
        "Del kjøtet laust i åtte bollar utan å komprimere dei.",
        "Rist snittflatene på burgarbrøda i litt smør og legg dei til side.",
        "Legg kjøtbollane på ei svært varm stål- eller støypejernsflate og press dei hardt flate dei første sekunda.",
        "Salt, lat ei mørk skorpe dannast, skrap burgaren laus, snu éin gong og legg på ost.",
        "Stable to burgarar per brød og server straks med lauk, sylteagurk og saus."
      ]
    },
    "variants": [
      "Dobbel smash med to svært tynne burgarar.",
      "Oklahoma onion burger der svært tynn lauk blir pressa inn i kjøtet.",
      "Single smash for ein lettare burgar."
    ],
    "serving": [
      "Server straks frå steikeflata; dei tynne burgarane kjølnar raskt.",
      "Sylteagurk og rå eller steikt lauk gjev syre og tekstur mot kjøt og ost."
    ],
    "commonMistakes": [
      "Å bruke ei slepplett-panne som ikkje toler eller held nok varme.",
      "Å forme burgaren på førehand og miste smash-effekten.",
      "Å presse burgaren fleire gonger og drive ut saft etter at skorpa er danna."
    ]
  },
  "sv": {
    "overview": "Smashburger är främst en stekteknik. I stället för att forma en tjock burgare i förväg pressas köttet hårt en gång mot en het platta så att en stor yta får direkt kontakt och kraftig Maillardbryning.",
    "history": "Tunna diner- och stekbordsburgare har långa amerikanska traditioner, medan begreppet smashburger blivit mycket synligt genom moderna burgarkedjor och oberoende restauranger. Tekniken bygger på hög värme, snabb stekning och mycket stekyta.",
    "flavor": "Intensiv stekt köttsmak, salt, smält ost och mjukt bröd, ofta balanserat med saltgurka, lök och syrlig burgarsås.",
    "technique": "Använd kallt kött med tillräckligt fett, forma lösa bollar och pressa omedelbart mot en nästan rykande het stål- eller gjutjärnsyta. Pressa inte igen när skorpan bildats – då pressas bara köttsaften ut.",
    "essentials": [
      "Köttfärs med tillräckligt fett för saftighet.",
      "Mycket het, tung stekyta.",
      "En hård pressning alldeles i början av stekningen.",
      "Mjukt hamburgerbröd, ost och få, tydliga tillbehör."
    ],
    "recipe": {
      "label": "Dubbel smashburger",
      "yield": "4 burgare",
      "time": "ca 25 min",
      "ingredients": [
        "600 g nötfärs med ca 20 % fett",
        "8 skivor hamburgerost",
        "4 mjuka hamburgerbröd",
        "salt och peppar",
        "1 lök i mycket tunna skivor",
        "saltgurka",
        "majonnäs, senap och ketchup efter smak",
        "lite smör till bröden"
      ],
      "steps": [
        "Dela köttet löst i åtta bollar utan att packa dem.",
        "Rosta brödens snittytor i lite smör och lägg åt sidan.",
        "Lägg köttbollarna på en mycket het stål- eller gjutjärnsyta och pressa dem hårt platta under de första sekunderna.",
        "Salta, låt en mörk skorpa bildas, skrapa loss burgaren, vänd en gång och lägg på ost.",
        "Stapla två burgare per bröd och servera genast med lök, saltgurka och sås."
      ]
    },
    "variants": [
      "Dubbel smash med två mycket tunna burgare.",
      "Oklahoma onion burger där mycket tunn lök pressas in i köttet.",
      "Single smash för en lättare burgare."
    ],
    "serving": [
      "Serveras direkt från stekytan; de tunna burgarna svalnar snabbt.",
      "Saltgurka och rå eller stekt lök ger syra och konsistens mot kött och ost."
    ],
    "commonMistakes": [
      "Att använda en non-stick-panna som inte tål eller håller tillräcklig värme.",
      "Att forma burgaren i förväg och förlora smash-effekten.",
      "Att pressa burgaren flera gånger och driva ut köttsaft efter att skorpan bildats."
    ]
  },
  "da": {
    "overview": "Smashburger er først og fremmest en stegeteknik. I stedet for at forme en tyk burger på forhånd presses kødet hårdt én gang mod en varm plade, så en stor flade får direkte kontakt og kraftig Maillardbruning.",
    "history": "Tynde diner- og stegepladeburgere har lange amerikanske traditioner, mens begrebet smashburger er blevet synligt gennem moderne burgerkæder og uafhængige restauranter. Teknikken bygger på høj varme, hurtig stegning og meget stegeskorpe.",
    "flavor": "Intens stegt kødsmag, salt, smeltet ost og blødt brød, ofte afbalanceret med syltede agurker, løg og syrlig burgersauce.",
    "technique": "Brug koldt kød med tilstrækkeligt fedt, form løse kugler og pres straks mod en næsten rygende varm stål- eller støbejernsflade. Pres ikke igen, når skorpen er dannet – så presses saften blot ud.",
    "essentials": [
      "Hakket kød med nok fedt til saftighed.",
      "Meget varm, tung stegeflade.",
      "Ét hårdt pres helt i starten af stegningen.",
      "Blød burgerbolle, ost og få, tydelige toppings."
    ],
    "recipe": {
      "label": "Dobbelt smashburger",
      "yield": "4 burgere",
      "time": "ca. 25 min",
      "ingredients": [
        "600 g hakket oksekød med ca. 20 % fedt",
        "8 skiver burgerost",
        "4 bløde burgerboller",
        "salt og peber",
        "1 løg i meget tynde skiver",
        "syltede agurker",
        "mayonnaise, sennep og ketchup efter smag",
        "lidt smør til bollerne"
      ],
      "steps": [
        "Del kødet løst i otte kugler uden at komprimere dem.",
        "Rist bollernes snitflader i lidt smør, og læg dem til side.",
        "Læg kødkugler på en meget varm stål- eller støbejernsflade, og pres dem hårdt flade i de første sekunder.",
        "Salt, lad en mørk skorpe dannes, skrab bøffen fri, vend én gang, og læg ost på.",
        "Stabl to bøffer pr. burger, og servér straks med løg, syltede agurker og sauce."
      ]
    },
    "variants": [
      "Dobbelt smash med to meget tynde bøffer.",
      "Oklahoma onion burger, hvor meget tynde løg presses ind i kødet.",
      "Single smash til en lettere burger."
    ],
    "serving": [
      "Serveres straks fra stegefladen; de tynde bøffer køler hurtigt.",
      "Syltede agurker og rå eller stegte løg giver syre og tekstur mod kød og ost."
    ],
    "commonMistakes": [
      "At bruge en non-stick-pande, som ikke tåler eller holder nok varme.",
      "At forme bøffen på forhånd og miste smash-effekten.",
      "At presse bøffen flere gange under stegning og drive saften ud efter skorpedannelse."
    ]
  },
  "fi": {
    "overview": "Smashburger on ennen kaikkea paistotekniikka. Paksun pihvin etukäteen muotoilemisen sijaan liha painetaan kerran kovaa kuumaa paistopintaa vasten, jolloin suuri pinta-ala koskettaa alustaa ja Maillard-reaktio ruskistaa pinnan voimakkaasti.",
    "history": "Ohuilla diner- ja parilapurilaisilla on pitkät amerikkalaiset perinteet, ja smashburger-nimi on tullut näkyväksi modernien ketjujen ja itsenäisten ravintoloiden kautta. Tekniikan ydin on korkea lämpö, nopea paisto ja runsas paistokuori.",
    "flavor": "Voimakas paistetun lihan maku, suola, sulanut juusto ja pehmeä sämpylä, joita pikkelöity kurkku, sipuli ja hapokas kastike usein tasapainottavat.",
    "technique": "Käytä kylmää, riittävän rasvaista lihaa, muotoile löysiä palloja ja paina heti lähes savuavan kuumaa teräs- tai valurautapintaa vasten. Älä paina uudelleen kuoren muodostuttua, sillä silloin puristat vain nesteet ulos.",
    "essentials": [
      "Riittävän rasvaista jauhelihaa mehukkuuden takaamiseksi.",
      "Erittäin kuuma, raskas paistopinta.",
      "Yksi voimakas painallus paiston alussa.",
      "Pehmeä hampurilaissämpylä, juusto ja muutama selkeä lisuke."
    ],
    "recipe": {
      "label": "Tuplasmashburger",
      "yield": "4 hampurilaista",
      "time": "n. 25 min",
      "ingredients": [
        "600 g naudan jauhelihaa, rasvaa n. 20 %",
        "8 viipaletta hampurilaisjuustoa",
        "4 pehmeää hampurilaissämpylää",
        "suolaa ja pippuria",
        "1 sipuli hyvin ohuina viipaleina",
        "suolakurkkua",
        "majoneesia, sinappia ja ketsuppia maun mukaan",
        "hieman voita sämpylöille"
      ],
      "steps": [
        "Jaa liha kahdeksaksi löysäksi palloksi puristamatta niitä tiiviiksi.",
        "Paahda sämpylöiden leikkauspinnat pienessä määrässä voita ja siirrä sivuun.",
        "Aseta lihapallot erittäin kuumalle teräs- tai valurautapinnalle ja paina voimakkaasti litteiksi ensimmäisten sekuntien aikana.",
        "Suolaa, anna tumman kuoren muodostua, irrota pihvi lastalla, käännä kerran ja lisää juusto.",
        "Pinoa kaksi pihviä hampurilaiseen ja tarjoile heti sipulin, suolakurkun ja kastikkeen kanssa."
      ]
    },
    "variants": [
      "Tuplasmash kahdella hyvin ohuella pihvillä.",
      "Oklahoma onion burger, jossa hyvin ohut sipuli painetaan lihaan.",
      "Single smash kevyemmäksi hampurilaiseksi."
    ],
    "serving": [
      "Tarjoillaan heti paistopinnalta, sillä ohuet pihvit jäähtyvät nopeasti.",
      "Suolakurkku ja raaka tai paistettu sipuli tuovat hapokkuutta ja rakennetta lihan ja juuston vastapainoksi."
    ],
    "commonMistakes": [
      "Tarttumattoman pannun käyttö, kun se ei kestä tai säilytä riittävää lämpöä.",
      "Pihvin muotoilu etukäteen, jolloin smash-vaikutus katoaa.",
      "Pihvin toistuva painaminen paiston aikana, jolloin nesteet puristuvat ulos kuoren muodostumisen jälkeen."
    ]
  },
  "is": {
    "overview": "Smashburger er fyrst og fremst steikingaraðferð. Í stað þess að móta þykkan borgara fyrirfram er kjötinu þrýst fast einu sinni á heita plötu svo stór flötur snerti hana beint og fái mikla Maillard-brúnun.",
    "history": "Þunnir hamborgarar á bandarískum matsölustöðum og steikingarplötum eiga sér langa hefð. Heitið smashburger hefur orðið áberandi hjá nútíma hamborgarakeðjum og sjálfstæðum veitingastöðum. Grunnhugmyndin er mikill hiti, hröð steiking og mikil skorpa.",
    "flavor": "Kraftmikið steikt kjötbragð, salt, bráðinn ostur og mjúkt brauð, oft í jafnvægi við súrsaðar gúrkur, lauk og súra hamborgarasósu.",
    "technique": "Notið kalt kjöt með nægri fitu, mótið lausar kúlur og þrýstið strax á næstum rjúkandi heitan stál- eða steypujárnsflöt. Þrýstið ekki aftur eftir að skorpan hefur myndast, því þá þrýstist safinn út.",
    "essentials": [
      "Hakk með nægri fitu til að halda safanum.",
      "Mjög heitur, þungur steikingarflötur.",
      "Einn fastur þrýstingur í upphafi steikingar.",
      "Mjúkt hamborgarabrauð, ostur og fátt, greinilegt meðlæti."
    ],
    "recipe": {
      "label": "Tvöfaldur smashburger",
      "yield": "4 hamborgarar",
      "time": "u.þ.b. 25 mín.",
      "ingredients": [
        "600 g nautahakk með u.þ.b. 20 % fitu",
        "8 sneiðar af hamborgaraosti",
        "4 mjúk hamborgarabrauð",
        "salt og pipar",
        "1 laukur í mjög þunnum sneiðum",
        "súrsaðar gúrkur",
        "majónes, sinnep og tómatsósa eftir smekk",
        "dálítið smjör á brauðin"
      ],
      "steps": [
        "Skiptið kjötinu í átta lausar kúlur án þess að þjappa þeim.",
        "Ristið skurðfleti brauðanna í dálitlu smjöri og leggið til hliðar.",
        "Setjið kjötkúlurnar á mjög heitan stál- eða steypujárnsflöt og þrýstið þeim fast flötum fyrstu sekúndurnar.",
        "Saltið, látið dökka skorpu myndast, skafið borgarann lausan, snúið einu sinni og setjið ost á.",
        "Setjið tvo kjötborgara í hvert brauð og berið strax fram með lauk, súrsuðum gúrkum og sósu."
      ]
    },
    "variants": [
      "Tvöfaldur smash með tveimur mjög þunnum kjötborgurum.",
      "Oklahoma onion burger þar sem mjög þunnum lauk er þrýst inn í kjötið.",
      "Single smash fyrir léttari hamborgara."
    ],
    "serving": [
      "Berið strax fram af steikingarfletinum; þunnir borgarar kólna hratt.",
      "Súrsaðar gúrkur og hrár eða steiktur laukur gefa sýru og áferð á móti kjöti og osti."
    ],
    "commonMistakes": [
      "Að nota viðloðunarfría pönnu sem þolir ekki eða heldur ekki nægum hita.",
      "Að móta kjötborgarann fyrirfram og missa smash-áhrifin.",
      "Að þrýsta borgaranum ítrekað við steikingu og þrýsta safanum út eftir að skorpan hefur myndast."
    ]
  },
  "en": {
    "overview": "A smashburger is primarily a cooking technique. Instead of shaping a thick burger beforehand, the meat is pressed firmly once against a hot griddle, creating a large contact surface and intense Maillard browning.",
    "history": "Thin diner and griddle burgers have long American traditions, while the term smashburger has become prominent through modern burger chains and independent restaurants. The technique relies on high heat, quick cooking and abundant crust.",
    "flavor": "Intense seared meat flavour, salt, melted cheese and soft bread, often balanced with pickles, onion and tangy burger sauce.",
    "technique": "Use cold meat with enough fat, form loose balls and immediately press them onto a nearly smoking-hot steel or cast-iron surface. Do not press again after the crust has formed, as that only squeezes out juices.",
    "essentials": [
      "Minced beef with enough fat for juiciness.",
      "Very hot, heavy cooking surface.",
      "One firm press right at the start of cooking.",
      "Soft burger bun, cheese and a few distinct garnishes."
    ],
    "recipe": {
      "label": "Double smashburger",
      "yield": "4 burgers",
      "time": "approx. 25 min",
      "ingredients": [
        "600 g minced beef with approx. 20 % fat",
        "8 slices of burger cheese",
        "4 soft burger buns",
        "salt and pepper",
        "1 onion, very thinly sliced",
        "pickles",
        "mayonnaise, mustard and ketchup to taste",
        "a little butter for the buns"
      ],
      "steps": [
        "Divide the meat loosely into eight balls without compressing them.",
        "Toast the cut sides of the buns in a little butter and set aside.",
        "Place the meatballs on a very hot steel or cast-iron surface and press them firmly flat in the first few seconds.",
        "Season with salt, let a dark crust form, scrape the patty free, flip once and add cheese.",
        "Stack two patties per burger and serve immediately with onion, pickles and sauce."
      ]
    },
    "variants": [
      "Double smash with two very thin patties.",
      "Oklahoma onion burger with very thin onion pressed into the meat.",
      "Single smash for a lighter burger."
    ],
    "serving": [
      "Serve straight from the griddle; thin patties cool quickly.",
      "Pickles and raw or fried onion provide acidity and texture against meat and cheese."
    ],
    "commonMistakes": [
      "Using a non-stick pan that cannot withstand or retain sufficient heat.",
      "Pre-shaping the patty and losing the smash effect.",
      "Pressing the burger repeatedly during cooking, squeezing out juices after the crust forms."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
