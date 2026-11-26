import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const baoTranslations = {
  "nn": {
    "overview": "Bao blir brukt internasjonalt som samleomgrep for fleire dampa bollar. Baozi er vanlegvis lukka rundt eit fyll, medan den opne, bretta varianten mange restaurantar kallar bao, ofte liknar gua bao.",
    "history": "Dampa kveitebollar har lange tradisjonar i Kina og finst i mange regionale former. Moderne restaurantmenyar utanfor Kina bruker ofte ordet bao breiare enn lokalt.",
    "flavor": "Deigen er mild, lett søtleg og luftig og gjev ein mjuk kontrast til salte, krydra eller syrlege fyll.",
    "technique": "Deigen treng god gjæring og varsam damping. Kondens som dryp på bollane, kan gje våte flekkar, så loket kan pakkast i eit reint kjøkkenhandkle.",
    "essentials": [
      "Kveitedeig med gjær og ofte litt sukker.",
      "Damping heller enn baking.",
      "Fyll med tydeleg salt, syre eller krydder.",
      "Friske innslag som agurk, urter eller sylta grønsaker."
    ],
    "recipe": {
      "label": "Enkle bretta bao",
      "yield": "10–12 stk.",
      "time": "ca. 2 timar",
      "ingredients": [
        "350 g kveitemjøl",
        "7 g tørrgjær",
        "2 ss sukker",
        "2 dl lunka vatn",
        "1 ss nøytral olje",
        "1/2 ts salt",
        "sesamolje til pensling",
        "valfritt fyll av tofu, svinekjøt eller sopp",
        "agurk og vårlauk",
        "hoisin eller chilisaus"
      ],
      "steps": [
        "Elt mjøl, gjær, sukker, vatn, olje og salt til ein glatt deig og hev til nesten dobbel storleik.",
        "Del deigen i emne, kjevle ovalt og pensle lett med olje før dei blir bretta.",
        "Etterhev i 20–30 minutt på små bitar bakepapir.",
        "Damp bollane i porsjonar til dei er oppblåsne og gjennomkokte.",
        "Fyll rett før servering slik at deigen held seg mjuk og lett."
      ]
    },
    "variants": [
      "Baozi: lukka bolle med fyll inni.",
      "Gua bao-liknande opne bollar med fyll etter damping.",
      "Søte bao med bønnepasta eller anna dessertfyll."
    ],
    "serving": [
      "Blir serverte varme direkte frå dampkorga.",
      "Sylta grønsaker og friske urter balanserer rikt fyll."
    ],
    "commonMistakes": [
      "Å overfylle dampkorga slik at bollane klebar saman.",
      "For kort hevetid som gjev kompakt deig.",
      "Å opne loket gjentekne gonger under damping og miste jamn varme."
    ]
  },
  "sv": {
    "overview": "Bao används internationellt som samlingsnamn för flera ångkokta bullar. Baozi är vanligtvis försluten kring en fyllning, medan den öppna, vikta variant som många restauranger kallar bao ofta påminner om gua bao.",
    "history": "Ångkokta vetebullar har långa traditioner i Kina och finns i många regionala former. Moderna restaurangmenyer utanför Kina använder ofta ordet bao bredare än lokalt.",
    "flavor": "Degen är mild, lätt söt och luftig och ger en mjuk kontrast till salta, kryddiga eller syrliga fyllningar.",
    "technique": "Degen behöver god jäsning och varsam ångkokning. Kondens som droppar ner på bullarna kan ge blöta fläckar, så locket kan lindas in i en ren kökshandduk.",
    "essentials": [
      "Vetedeg med jäst och ofta lite socker.",
      "Ångkokning i stället för bakning.",
      "Fyllning med tydlig sälta, syra eller kryddning.",
      "Friska inslag som gurka, örter eller inlagda grönsaker."
    ],
    "recipe": {
      "label": "Enkla vikta bao",
      "yield": "10–12 st.",
      "time": "ca 2 timmar",
      "ingredients": [
        "350 g vetemjöl",
        "7 g torrjäst",
        "2 msk socker",
        "2 dl ljummet vatten",
        "1 msk neutral olja",
        "1/2 tsk salt",
        "sesamolja till pensling",
        "valfri fyllning av tofu, fläskkött eller svamp",
        "gurka och salladslök",
        "hoisin eller chilisås"
      ],
      "steps": [
        "Knåda mjöl, jäst, socker, vatten, olja och salt till en slät deg och låt jäsa till nästan dubbel storlek.",
        "Dela degen i bitar, kavla ut ovalt och pensla lätt med olja innan de viks.",
        "Låt jäsa ytterligare 20–30 minuter på små bitar bakplåtspapper.",
        "Ångkoka bullarna i omgångar tills de är uppuffade och genomkokta.",
        "Fyll precis före servering så att degen förblir mjuk och lätt."
      ]
    },
    "variants": [
      "Baozi: försluten bulle med fyllning inuti.",
      "Gua bao-liknande öppna bullar med fyllning efter ångkokning.",
      "Söta bao med bönpasta eller annan dessertfyllning."
    ],
    "serving": [
      "Serveras varma direkt från ångkorgen.",
      "Inlagda grönsaker och färska örter balanserar rika fyllningar."
    ],
    "commonMistakes": [
      "Att överfylla ångkorgen så att bullarna fastnar i varandra.",
      "För kort jästid som ger kompakt deg.",
      "Att öppna locket upprepade gånger under ångkokningen och förlora jämn värme."
    ]
  },
  "da": {
    "overview": "Bao bruges internationalt som samlebetegnelse for flere dampede boller. Baozi er typisk lukket omkring et fyld, mens den åbne, foldede variant, som mange restauranter kalder bao, ofte minder om gua bao.",
    "history": "Dampede hvedeboller har lange traditioner i Kina og findes i mange regionale former. Moderne restaurantmenuer uden for Kina bruger ofte ordet bao bredere end lokalt.",
    "flavor": "Dejen er mild, let sødlig og luftig og giver en blød kontrast til salt, krydret eller syrligt fyld.",
    "technique": "Dejen kræver god hævning og skånsom dampning. Kondens, der drypper på bollerne, kan give våde pletter, så låget kan pakkes ind i et rent viskestykke.",
    "essentials": [
      "Hvededej med gær og ofte lidt sukker.",
      "Dampning frem for bagning.",
      "Fyld med tydelig salt, syre eller krydring.",
      "Friske elementer som agurk, urter eller syltede grøntsager."
    ],
    "recipe": {
      "label": "Enkle foldede bao",
      "yield": "10–12 stk.",
      "time": "ca. 2 timer",
      "ingredients": [
        "350 g hvedemel",
        "7 g tørgær",
        "2 spsk sukker",
        "2 dl lunkent vand",
        "1 spsk neutral olie",
        "1/2 tsk salt",
        "sesamolie til pensling",
        "valgfrit fyld af tofu, svinekød eller svampe",
        "agurk og forårsløg",
        "hoisin eller chilisauce"
      ],
      "steps": [
        "Ælt mel, gær, sukker, vand, olie og salt til en glat dej, og lad den hæve til næsten dobbelt størrelse.",
        "Del dejen i stykker, rul dem ovale, og pensl let med olie, inden de foldes.",
        "Efterhæv 20–30 minutter på små stykker bagepapir.",
        "Damp bollerne i portioner, til de er luftige og gennemkogte.",
        "Fyld lige før servering, så dejen forbliver blød og let."
      ]
    },
    "variants": [
      "Baozi: lukket bolle med fyld indeni.",
      "Gua bao-lignende åbne boller med fyld efter dampning.",
      "Søde bao med bønnepasta eller andet dessertfyld."
    ],
    "serving": [
      "Serveres varme direkte fra dampkurven.",
      "Syltede grøntsager og friske urter afbalancerer rigt fyld."
    ],
    "commonMistakes": [
      "At overfylde dampkurven, så bollerne klæber sammen.",
      "For kort hævetid, som giver kompakt dej.",
      "At åbne låget gentagne gange under dampningen og miste den jævne varme."
    ]
  },
  "fi": {
    "overview": "Bao on kansainvälinen yleisnimitys useille höyrytetyille sämpylöille. Baozi suljetaan tavallisesti täytteen ympärille, kun taas ravintoloiden avoin, taitettu bao muistuttaa usein gua baota.",
    "history": "Höyrytetyillä vehnäsämpylöillä on Kiinassa pitkät perinteet ja monia alueellisia muotoja. Kiinan ulkopuolella nykyiset ravintolat käyttävät bao-nimeä usein paikallista käyttöä laajemmin.",
    "flavor": "Taikina on mietoa, hieman makeaa ja ilmavaa ja tarjoaa pehmeän vastakohdan suolaisille, mausteisille tai happamille täytteille.",
    "technique": "Taikina tarvitsee hyvän kohotuksen ja hellävaraisen höyrytyksen. Sämpylöille tippuva tiivistynyt vesi voi tehdä märkiä kohtia, joten kannen voi kääriä puhtaaseen keittiöpyyhkeeseen.",
    "essentials": [
      "Vehnätaikinaa, jossa on hiivaa ja usein hieman sokeria.",
      "Höyrytys uunissa paistamisen sijaan.",
      "Selvästi suolaista, hapanta tai mausteista täytettä.",
      "Raikkaita aineksia, kuten kurkkua, yrttejä tai pikkelöityjä kasviksia."
    ],
    "recipe": {
      "label": "Helppoja taitettuja bao-sämpylöitä",
      "yield": "10–12 kpl",
      "time": "n. 2 tuntia",
      "ingredients": [
        "350 g vehnäjauhoja",
        "7 g kuivahiivaa",
        "2 rkl sokeria",
        "2 dl haaleaa vettä",
        "1 rkl neutraalin makuista öljyä",
        "1/2 tl suolaa",
        "seesamiöljyä voiteluun",
        "haluamaasi tofu-, sianliha- tai sienitäytettä",
        "kurkkua ja kevätsipulia",
        "hoisin- tai chilikastiketta"
      ],
      "steps": [
        "Vaivaa jauhot, hiiva, sokeri, vesi, öljy ja suola sileäksi taikinaksi ja kohota lähes kaksinkertaiseksi.",
        "Jaa taikina paloiksi, kauli soikeiksi ja voitele kevyesti öljyllä ennen taittamista.",
        "Kohota vielä 20–30 minuuttia pienillä leivinpaperipaloilla.",
        "Höyrytä sämpylät erissä, kunnes ne ovat kuohkeita ja täysin kypsiä.",
        "Täytä juuri ennen tarjoilua, jotta taikina säilyy pehmeänä ja kevyenä."
      ]
    },
    "variants": [
      "Baozi: suljettu sämpylä, jonka sisällä on täyte.",
      "Gua baota muistuttava avoin sämpylä, joka täytetään höyrytyksen jälkeen.",
      "Makeita bao-sämpylöitä paputahnalla tai muilla jälkiruokatäytteillä."
    ],
    "serving": [
      "Tarjoillaan lämpiminä suoraan höyrytyskorista.",
      "Pikkelöidyt kasvikset ja tuoreet yrtit tasapainottavat täyteläisiä täytteitä."
    ],
    "commonMistakes": [
      "Höyrytyskorin täyttäminen liian täyteen, jolloin sämpylät tarttuvat toisiinsa.",
      "Liian lyhyt kohotus, jolloin taikinasta tulee tiivistä.",
      "Kannen toistuva avaaminen höyrytyksen aikana, jolloin tasainen lämpö katoaa."
    ]
  },
  "is": {
    "overview": "Bao er alþjóðlegt samheiti yfir ýmsar gufusoðnar bollur. Baozi er yfirleitt lokuð utan um fyllingu, en opna, samanbrotna útgáfan sem margir veitingastaðir kalla bao líkist oft gua bao.",
    "history": "Gufusoðnar hveitibollur eiga sér langa hefð í Kína og eru til í mörgum svæðisbundnum gerðum. Nútíma matseðlar utan Kína nota orðið bao oft í víðari merkingu en þar tíðkast.",
    "flavor": "Deigið er milt, örlítið sætt og loftkennt og myndar mjúka andstæðu við salta, kryddaða eða súra fyllingu.",
    "technique": "Deigið þarf góða hefun og varlega gufusuðu. Vatnsdropar úr þéttingu geta valdið blautum blettum á bollunum, svo vefja má hreinu viskastykki um lokið.",
    "essentials": [
      "Hveitideig með geri og oft dálitlum sykri.",
      "Gufusuða í stað baksturs.",
      "Fylling með greinilegri seltu, sýru eða kryddi.",
      "Ferskt hráefni eins og gúrka, kryddjurtir eða súrsað grænmeti."
    ],
    "recipe": {
      "label": "Einfaldar samanbrotnar bao-bollur",
      "yield": "10–12 stk.",
      "time": "u.þ.b. 2 klst.",
      "ingredients": [
        "350 g hveiti",
        "7 g þurrger",
        "2 msk. sykur",
        "2 dl volgt vatn",
        "1 msk. bragðlítil olía",
        "1/2 tsk. salt",
        "sesamolía til penslunar",
        "fylling að eigin vali úr tófúi, svínakjöti eða sveppum",
        "gúrka og vorlaukur",
        "hoisin- eða chili-sósa"
      ],
      "steps": [
        "Hnoðið hveiti, ger, sykur, vatn, olíu og salt í slétt deig og látið hefast þar til það hefur næstum tvöfaldast.",
        "Skiptið deiginu í bita, fletjið út í sporöskjur og penslið létt með olíu áður en þær eru brotnar saman.",
        "Látið hefast aftur í 20–30 mínútur á litlum bökunarpappírsbútum.",
        "Gufusjóðið bollurnar í skömmtum þar til þær eru útblásnar og fulleldaðar.",
        "Fyllið rétt fyrir framreiðslu svo deigið haldist mjúkt og létt."
      ]
    },
    "variants": [
      "Baozi: lokuð bolla með fyllingu inni í.",
      "Opnar bollur á borð við gua bao sem eru fylltar eftir gufusuðu.",
      "Sætar bao-bollur með baunamauki eða annarri eftirréttafyllingu."
    ],
    "serving": [
      "Bornar fram heitar beint úr gufukörfunni.",
      "Súrsað grænmeti og ferskar kryddjurtir vega upp á móti ríkulegri fyllingu."
    ],
    "commonMistakes": [
      "Að yfirfylla gufukörfuna svo bollurnar festist saman.",
      "Of stutt hefun sem gefur þétt deig.",
      "Að opna lokið ítrekað meðan á gufusuðu stendur og missa jafnan hita."
    ]
  },
  "en": {
    "overview": "Bao is used internationally as an umbrella term for several steamed buns. Baozi are typically enclosed around a filling, while the open folded version many restaurants call bao often resembles gua bao.",
    "history": "Steamed wheat buns have long traditions in China and exist in many regional forms. Modern restaurant menus outside China often use the word bao more broadly than local usage.",
    "flavor": "The dough is mild, slightly sweet and airy, providing a soft contrast to salty, spicy or tangy fillings.",
    "technique": "The dough needs good proving and gentle steaming. Condensation dripping onto the buns can leave wet patches, so the lid can be wrapped in a clean kitchen towel.",
    "essentials": [
      "Wheat dough with yeast and often a little sugar.",
      "Steaming rather than baking.",
      "Fillings with distinct saltiness, acidity or seasoning.",
      "Fresh elements such as cucumber, herbs or pickled vegetables."
    ],
    "recipe": {
      "label": "Simple folded bao",
      "yield": "10–12 pieces",
      "time": "approx. 2 hours",
      "ingredients": [
        "350 g wheat flour",
        "7 g dried yeast",
        "2 tbsp sugar",
        "2 dl lukewarm water",
        "1 tbsp neutral oil",
        "1/2 tsp salt",
        "sesame oil for brushing",
        "filling of tofu, pork or mushrooms as desired",
        "cucumber and spring onions",
        "hoisin or chilli sauce"
      ],
      "steps": [
        "Knead the flour, yeast, sugar, water, oil and salt into a smooth dough and let it rise until almost doubled.",
        "Divide the dough into pieces, roll into ovals and brush lightly with oil before folding.",
        "Prove for another 20–30 minutes on small pieces of baking paper.",
        "Steam the buns in batches until puffed up and cooked through.",
        "Fill just before serving so the dough remains soft and light."
      ]
    },
    "variants": [
      "Baozi: enclosed bun with a filling inside.",
      "Gua bao-like open buns filled after steaming.",
      "Sweet bao with bean paste or other dessert fillings."
    ],
    "serving": [
      "Serve warm straight from the steamer basket.",
      "Pickled vegetables and fresh herbs balance rich fillings."
    ],
    "commonMistakes": [
      "Overfilling the steamer basket so the buns stick together.",
      "Insufficient proving time, resulting in dense dough.",
      "Repeatedly opening the lid while steaming and losing even heat."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
