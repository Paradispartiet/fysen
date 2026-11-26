import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const manakishTranslations = {
  "nn": {
    "overview": "Manakish ligg mellom brød og ferdig rett: ein mjuk, lett seig deig blir forma flatt og toppa før baking. Za'atar med urter, sesam og sumak er ein av dei mest karakteristiske variantane.",
    "history": "Flatbrød med topping har lange tradisjonar i Levanten. Manakish eller manoushe er nært knytt til bakeri og kvardagsfrukost i mellom anna Libanon og nabolanda. Topping og deig varierer lokalt.",
    "flavor": "Rista brød, urteprega za'atar, nøtteaktig sesam og frisk syre frå sumak. Ostevariantar er saltare og rikare.",
    "technique": "Deigen treng nok gjæring til å bli smidig og luftig, men skal formast tynnare enn ein høg pizza. Bland za'atar og olivenolje til ein smørbar pasta som ikkje druknar deigen.",
    "essentials": [
      "Mjuk kveitedeig med gjær.",
      "Za'atar og olivenolje som klassisk topping.",
      "Høg steiketemperatur for rask heving og bruna botn.",
      "Friske grønsaker, labneh eller sylta grønsaker som tilbehøyr."
    ],
    "recipe": {
      "label": "Manakish med za'atar",
      "yield": "6 små brød",
      "time": "ca. 90 min",
      "ingredients": [
        "500 g kveitemjøl",
        "7 g tørrgjær",
        "3 dl lunka vatn",
        "1 ts sukker",
        "1,5 ts salt",
        "2 ss olivenolje",
        "5 ss za'atar",
        "5 ss olivenolje til topping"
      ],
      "steps": [
        "Elt mjøl, gjær, vatn, sukker, salt og olje til ein mjuk deig og hev til nesten dobbel storleik.",
        "Bland za'atar og olivenolje til ein tjukk, smørbar topping.",
        "Del deigen i seks emne og kjevle eller trykk dei til flate brød.",
        "Fordel za'atarblandinga i eit tynt lag og lat ein liten kant stå fri.",
        "Bak på godt førehandsvarma steikeflate ved høg varme til botnen er gyllen og kanten luftig."
      ]
    },
    "variants": [
      "Za'atar manakish.",
      "Ostemanakish med salte, godt smeltande ostar.",
      "Kjøttoppa variantar i slekt med andre levantinske flatbrød.",
      "Kombinasjonar av ost og za'atar."
    ],
    "serving": [
      "Blir servert varmt, gjerne bretta rundt tomat, agurk og urter.",
      "Labneh og oliven er klassisk frukostfølgje."
    ],
    "commonMistakes": [
      "For mykje topping som gjer midten tung og oljete.",
      "For tjukk deig som blir brødaktig og tørr før botnen brunast.",
      "For låg omnstemperatur som gjev lang steiketid og tørr skorpe."
    ]
  },
  "sv": {
    "overview": "Manakish ligger mellan bröd och färdig rätt: en mjuk, lätt seg deg formas platt och toppas före gräddning. Za'atar med örter, sesam och sumak är en av de mest karakteristiska varianterna.",
    "history": "Flatbröd med topping har långa traditioner i Levanten. Manakish eller manoushe är nära förknippat med bagerier och vardagsfrukost i bland annat Libanon och grannländerna. Topping och deg varierar lokalt.",
    "flavor": "Rostat bröd, örtig za'atar, nötig sesam och frisk syra från sumak. Ostvarianterna är saltare och fylligare.",
    "technique": "Degen behöver tillräcklig jäsning för att bli smidig och luftig men formas tunnare än en tjock pizza. Blanda za'atar med olivolja till en bredbar pasta som inte dränker degen.",
    "essentials": [
      "Mjuk vetedeg med jäst.",
      "Za'atar och olivolja som klassisk topping.",
      "Hög gräddningstemperatur för snabb jäsning och brynt botten.",
      "Färska grönsaker, labneh eller inlagda grönsaker som tillbehör."
    ],
    "recipe": {
      "label": "Manakish med za'atar",
      "yield": "6 små bröd",
      "time": "ca 90 min",
      "ingredients": [
        "500 g vetemjöl",
        "7 g torrjäst",
        "3 dl ljummet vatten",
        "1 tsk socker",
        "1,5 tsk salt",
        "2 msk olivolja",
        "5 msk za'atar",
        "5 msk olivolja till topping"
      ],
      "steps": [
        "Knåda mjöl, jäst, vatten, socker, salt och olja till en mjuk deg och jäs till nästan dubbel storlek.",
        "Blanda za'atar och olivolja till en tjock, bredbar topping.",
        "Dela degen i sex bitar och kavla eller tryck ut till flatbröd.",
        "Fördela za'atarblandningen i ett tunt lager och lämna en liten kant fri.",
        "Grädda på väl förvärmd yta vid hög värme tills botten är gyllene och kanten luftig."
      ]
    },
    "variants": [
      "Za'atar manakish.",
      "Ostmanakish med salta, lättsmälta ostar.",
      "Köttoppade varianter besläktade med andra levantinska flatbröd.",
      "Kombinationer av ost och za'atar."
    ],
    "serving": [
      "Serveras varmt, gärna vikt kring tomat, gurka och örter.",
      "Labneh och oliver är klassiska frukosttillbehör."
    ],
    "commonMistakes": [
      "För mycket topping som gör mitten tung och oljig.",
      "För tjock deg som blir brödig och torr innan botten bryns.",
      "För låg ugnstemperatur som ger lång gräddningstid och torr skorpa."
    ]
  },
  "da": {
    "overview": "Manakish ligger mellem brød og færdig ret: en blød, let sej dej formes fladt og toppes før bagning. Za'atar med urter, sesam og sumak er en af de mest karakteristiske varianter.",
    "history": "Fladbrød med topping har lange traditioner i Levanten. Manakish eller manoushe er tæt knyttet til bagerier og hverdagsmorgenmad i blandt andet Libanon og nabolandene. Topping og dej varierer lokalt.",
    "flavor": "Ristet brød, urtepræget za'atar, nøddeagtig sesam og frisk syre fra sumak. Ostevarianter er saltere og fyldigere.",
    "technique": "Dejen skal hæve nok til at blive smidig og luftig, men formes tyndere end en høj pizza. Bland za'atar med olivenolie til en smørbar pasta, der ikke drukner dejen.",
    "essentials": [
      "Blød hvededej med gær.",
      "Za'atar og olivenolie som klassisk topping.",
      "Høj bagetemperatur for hurtig hævning og brunet bund.",
      "Friske grøntsager, labneh eller syltede grøntsager som tilbehør."
    ],
    "recipe": {
      "label": "Manakish med za'atar",
      "yield": "6 små brød",
      "time": "ca. 90 min",
      "ingredients": [
        "500 g hvedemel",
        "7 g tørgær",
        "3 dl lunkent vand",
        "1 tsk sukker",
        "1,5 tsk salt",
        "2 spsk olivenolie",
        "5 spsk za'atar",
        "5 spsk olivenolie til topping"
      ],
      "steps": [
        "Ælt mel, gær, vand, sukker, salt og olie til en blød dej, og lad den hæve til næsten dobbelt størrelse.",
        "Bland za'atar og olivenolie til en tyk, smørbar topping.",
        "Del dejen i seks stykker, og rul eller tryk dem til flade brød.",
        "Fordel za'atarblandingen i et tyndt lag, og lad en lille kant være fri.",
        "Bag på en godt forvarmet flade ved høj varme, til bunden er gylden og kanten luftig."
      ]
    },
    "variants": [
      "Za'atar manakish.",
      "Ostemanakish med salte oste, der smelter godt.",
      "Varianter med kødtopping beslægtet med andre levantinske fladbrød.",
      "Kombinationer af ost og za'atar."
    ],
    "serving": [
      "Serveres varmt, gerne foldet om tomat, agurk og urter.",
      "Labneh og oliven er klassisk morgenmadstilbehør."
    ],
    "commonMistakes": [
      "For meget topping, som gør midten tung og olieret.",
      "For tyk dej, som bliver brødagtig og tør, før bunden brunes.",
      "For lav ovntemperatur, som giver lang bagetid og tør skorpe."
    ]
  },
  "fi": {
    "overview": "Manakish on leivän ja valmiin ruokalajin välimuoto: pehmeä, hieman sitkeä taikina muotoillaan litteäksi ja päällystetään ennen paistamista. Yrteistä, seesamista ja sumakista koostuva za'atar on tunnusomaisimpia päällysteitä.",
    "history": "Päällystetyillä litteillä leivillä on pitkät perinteet Levantissa. Manakish eli manoushe liittyy läheisesti leipomoihin ja arkiaamiaiseen muun muassa Libanonissa ja naapurimaissa. Päällysteet ja taikina vaihtelevat paikallisesti.",
    "flavor": "Paahteista leipää, yrttistä za'ataria, pähkinäistä seesamia ja sumakin raikasta hapokkuutta. Juustoversiot ovat suolaisempia ja täyteläisempiä.",
    "technique": "Taikina tarvitsee riittävän kohotuksen tullakseen notkeaksi ja ilmavaksi, mutta se muotoillaan paksua pizzaa ohuemmaksi. Sekoita za'atar ja oliiviöljy levitettäväksi tahnaksi, joka ei kastele taikinaa liikaa.",
    "essentials": [
      "Pehmeää hiivalla kohotettua vehnätaikinaa.",
      "Za'ataria ja oliiviöljyä klassisena päällysteenä.",
      "Korkea paistolämpötila nopeaan kohoamiseen ja pohjan ruskistumiseen.",
      "Tuoreita kasviksia, labnehia tai pikkelöityjä kasviksia lisukkeeksi."
    ],
    "recipe": {
      "label": "Manakish za'atarilla",
      "yield": "6 pientä leipää",
      "time": "n. 90 min",
      "ingredients": [
        "500 g vehnäjauhoja",
        "7 g kuivahiivaa",
        "3 dl haaleaa vettä",
        "1 tl sokeria",
        "1,5 tl suolaa",
        "2 rkl oliiviöljyä",
        "5 rkl za'ataria",
        "5 rkl oliiviöljyä päällysteeseen"
      ],
      "steps": [
        "Vaivaa jauhot, hiiva, vesi, sokeri, suola ja öljy pehmeäksi taikinaksi ja kohota lähes kaksinkertaiseksi.",
        "Sekoita za'atar ja oliiviöljy paksuksi, levitettäväksi tahnaksi.",
        "Jaa taikina kuuteen palaan ja kauli tai painele litteiksi leiviksi.",
        "Levitä za'atarseos ohueksi kerrokseksi ja jätä pieni reuna vapaaksi.",
        "Paista hyvin esikuumennetulla alustalla kovassa lämmössä, kunnes pohja on kullanruskea ja reuna ilmava."
      ]
    },
    "variants": [
      "Za'atar-manakish.",
      "Juustomanakish suolaisilla, hyvin sulavilla juustoilla.",
      "Lihapäällysteiset versiot, jotka muistuttavat muita levanttilaisia litteitä leipiä.",
      "Juuston ja za'atarin yhdistelmät."
    ],
    "serving": [
      "Tarjoillaan lämpimänä, usein tomaatin, kurkun ja yrttien ympärille taitettuna.",
      "Labneh ja oliivit ovat klassisia aamiaislisukkeita."
    ],
    "commonMistakes": [
      "Liikaa päällystettä, jolloin keskusta on raskas ja öljyinen.",
      "Liian paksu taikina, joka kuivuu leipämäiseksi ennen pohjan ruskistumista.",
      "Liian matala uunin lämpötila, joka pidentää paistoa ja kuivattaa kuoren."
    ]
  },
  "is": {
    "overview": "Manakish er mitt á milli brauðs og tilbúins réttar: mjúkt, örlítið seigt deig er flatt út og álegg sett á fyrir bakstur. Za'atar með kryddjurtum, sesam og sumak er ein einkennandi útgáfan.",
    "history": "Flatbrauð með áleggi eiga sér langa hefð á Levant-svæðinu. Manakish eða manoushe tengist náið bakaríum og hversdagsmorgunverði í Líbanon og nágrannalöndunum. Álegg og deig eru breytileg eftir stöðum.",
    "flavor": "Ristað brauð, kryddjurtakennt za'atar, hnetukeimur af sesam og fersk sýra frá sumak. Ostaútgáfur eru saltari og ríkulegri.",
    "technique": "Deigið þarf næga hefun til að verða mjúkt og loftkennt en er mótað þynnra en þykk pítsa. Blandið za'atar og ólífuolíu í smyrjanlegt mauk sem drekkir ekki deiginu.",
    "essentials": [
      "Mjúkt hveitideig með geri.",
      "Za'atar og ólífuolía sem klassískt álegg.",
      "Hár bökunarhiti fyrir hraða hefun og brúnaðan botn.",
      "Ferskt grænmeti, labneh eða súrsað grænmeti sem meðlæti."
    ],
    "recipe": {
      "label": "Manakish með za'atar",
      "yield": "6 lítil brauð",
      "time": "u.þ.b. 90 mín.",
      "ingredients": [
        "500 g hveiti",
        "7 g þurrger",
        "3 dl volgt vatn",
        "1 tsk. sykur",
        "1,5 tsk. salt",
        "2 msk. ólífuolía",
        "5 msk. za'atar",
        "5 msk. ólífuolía í áleggið"
      ],
      "steps": [
        "Hnoðið hveiti, ger, vatn, sykur, salt og olíu í mjúkt deig og látið hefast þar til það hefur næstum tvöfaldast.",
        "Blandið za'atar og ólífuolíu í þykkt, smyrjanlegt álegg.",
        "Skiptið deiginu í sex bita og fletjið eða þrýstið þeim í flatbrauð.",
        "Dreifið za'atar-blöndunni í þunnt lag og skiljið litla brún eftir auða.",
        "Bakið á vel forhituðum fleti við háan hita þar til botninn er gylltur og brúnin loftkennd."
      ]
    },
    "variants": [
      "Za'atar manakish.",
      "Ostamanakish með söltum ostum sem bráðna vel.",
      "Kjötútgáfur skyldar öðrum flatbrauðum frá Levant.",
      "Samsetningar af osti og za'atar."
    ],
    "serving": [
      "Borið fram heitt, gjarnan brotið utan um tómata, gúrku og kryddjurtir.",
      "Labneh og ólífur eru klassískt morgunverðarmeðlæti."
    ],
    "commonMistakes": [
      "Of mikið álegg sem gerir miðjuna þunga og olíukennda.",
      "Of þykkt deig sem verður brauðkennt og þurrt áður en botninn brúnast.",
      "Of lágur ofnhiti sem lengir bökun og þurrkar skorpuna."
    ]
  },
  "en": {
    "overview": "Manakish sits between bread and a complete dish: soft, slightly chewy dough is flattened and topped before baking. Za'atar with herbs, sesame and sumac is one of the most characteristic versions.",
    "history": "Topped flatbreads have long traditions in the Levant. Manakish or manoushe is closely associated with bakeries and everyday breakfasts in Lebanon and neighbouring countries. Toppings and dough vary locally.",
    "flavor": "Toasted bread, herby za'atar, nutty sesame and fresh acidity from sumac. Cheese versions are saltier and richer.",
    "technique": "The dough needs sufficient fermentation to become supple and airy, but is shaped thinner than a thick pizza. Mix za'atar with olive oil into a spreadable paste that does not saturate the dough.",
    "essentials": [
      "Soft yeasted wheat dough.",
      "Za'atar and olive oil as a classic topping.",
      "High baking temperature for rapid rise and a browned base.",
      "Fresh vegetables, labneh or pickles as accompaniments."
    ],
    "recipe": {
      "label": "Manakish with za'atar",
      "yield": "6 small flatbreads",
      "time": "approx. 90 min",
      "ingredients": [
        "500 g wheat flour",
        "7 g dried yeast",
        "3 dl lukewarm water",
        "1 tsp sugar",
        "1.5 tsp salt",
        "2 tbsp olive oil",
        "5 tbsp za'atar",
        "5 tbsp olive oil for topping"
      ],
      "steps": [
        "Knead flour, yeast, water, sugar, salt and oil into a soft dough and let rise until almost doubled.",
        "Mix za'atar and olive oil into a thick, spreadable topping.",
        "Divide the dough into six pieces and roll or press into flatbreads.",
        "Spread the za'atar mixture thinly, leaving a small border.",
        "Bake on a well-preheated surface at high heat until the base is golden and the rim airy."
      ]
    },
    "variants": [
      "Za'atar manakish.",
      "Cheese manakish with salty, good-melting cheeses.",
      "Meat-topped versions related to other Levantine flatbreads.",
      "Combinations of cheese and za'atar."
    ],
    "serving": [
      "Serve warm, preferably folded around tomato, cucumber and herbs.",
      "Labneh and olives are classic breakfast accompaniments."
    ],
    "commonMistakes": [
      "Too much topping, making the centre heavy and oily.",
      "Dough too thick, becoming bread-like and dry before the base browns.",
      "Oven temperature too low, prolonging baking and drying the crust."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
