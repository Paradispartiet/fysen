import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const pideTranslations = {
  "nn": {
    "overview": "Pide kombinerer mjuk, seig gjærdeig med topping som blir bakt samtidig. Kantane blir bretta over fyllet til ei båtform som held på saft og smelta ost utan å lukke retten som ein pai.",
    "history": "Pide finst i mange regionale tyrkiske former og er viktig i bakeri- og restaurantmat. Namnet kan òg vise til brød generelt, men internasjonalt særleg til dei avlange variantane med topping.",
    "flavor": "Rista deig og bruna kantar møter salt ost, krydra kjøt eller grønsaker. Smør og egg gjev ekstra fylde i nokre variantar.",
    "technique": "Deigen må kunne strekkjast tynt i midten medan kanten er tjukkare. Ei svært varm steikeflate brunast raskt før toppingen tørkar.",
    "essentials": [
      "Gjærdeig med god strekkbarheit.",
      "Avlang eller båtforma utforming.",
      "Topping av ost, kjøt, grønsaker eller kombinasjonar.",
      "Høg omnstemperatur og varm steikeflate."
    ],
    "recipe": {
      "label": "Pide med ost og urter",
      "yield": "4 pide",
      "time": "ca. 90 min",
      "ingredients": [
        "500 g kveitemjøl",
        "7 g tørrgjær",
        "3 dl lunka vatn",
        "1 ts sukker",
        "1,5 ts salt",
        "2 ss olivenolje",
        "300 g riven mozzarella eller mild kvitost",
        "150 g feta",
        "persille",
        "1 egg til pensling, valfritt"
      ],
      "steps": [
        "Elt deigen glatt og smidig og hev til nesten dobbel storleik.",
        "Del i fire emne og strekk kvart til ein lang oval.",
        "Fordel ost og urter i midten og lat 2–3 cm kant stå fri.",
        "Brett kantane inn og klem endane saman til båtform.",
        "Bak på svært varm stein eller plate til botnen er brun og osten boblar; pensle eventuelt kanten lett etter steiking."
      ]
    },
    "variants": [
      "Kaşarlı pide med ost.",
      "Kıymalı pide med krydra kjøtdeig.",
      "Kuşbaşılı pide med små kjøtbitar.",
      "Egg kan knekkast over nokre variantar mot slutten."
    ],
    "serving": [
      "Blir ofte skoren i tverrgåande bitar og servert varm.",
      "Frisk salat, sitron eller ayran passar til rike kjøt- og ostevariantar."
    ],
    "commonMistakes": [
      "For mykje topping som gjer botnen våt.",
      "For låg steiketemperatur som tørkar deigen før han får farge.",
      "For tjukk kant som blir tung og brødaktig."
    ]
  },
  "sv": {
    "overview": "Pide kombinerar en mjuk, seg jästdeg med topping som gräddas samtidigt. Kanterna viks över fyllningen till en båtform som håller kvar saft och smält ost utan att bli en sluten paj.",
    "history": "Pide finns i många regionala turkiska former och är viktig inom bageri- och restaurangmat. Namnet kan också avse bröd i vidare mening, men internationellt främst de avlånga toppade varianterna.",
    "flavor": "Rostad deg och brynta kanter möter salt ost, kryddat kött eller grönsaker. Smör och ägg ger extra fyllighet i vissa varianter.",
    "technique": "Degen ska kunna sträckas tunt i mitten medan kanten förblir tjockare. En mycket het gräddningsyta ger snabb färg innan toppingen torkar.",
    "essentials": [
      "Jästdeg med god töjbarhet.",
      "Avlång eller båtformad utformning.",
      "Topping av ost, kött, grönsaker eller kombinationer.",
      "Hög ugnstemperatur och het gräddningsyta."
    ],
    "recipe": {
      "label": "Pide med ost och örter",
      "yield": "4 pide",
      "time": "ca 90 min",
      "ingredients": [
        "500 g vetemjöl",
        "7 g torrjäst",
        "3 dl ljummet vatten",
        "1 tsk socker",
        "1,5 tsk salt",
        "2 msk olivolja",
        "300 g riven mozzarella eller mild vitost",
        "150 g feta",
        "persilja",
        "1 ägg till pensling, valfritt"
      ],
      "steps": [
        "Knåda degen slät och smidig och jäs till nästan dubbel storlek.",
        "Dela i fyra bitar och sträck varje bit till en lång oval.",
        "Fördela ost och örter i mitten och lämna 2–3 cm kant fri.",
        "Vik in kanterna och nyp ihop ändarna till en båtform.",
        "Grädda på mycket het sten eller plåt tills botten är brun och osten bubblar; pensla eventuellt kanten lätt efteråt."
      ]
    },
    "variants": [
      "Kaşarlı pide med ost.",
      "Kıymalı pide med kryddad köttfärs.",
      "Kuşbaşılı pide med små köttbitar.",
      "Ägg kan knäckas över vissa varianter mot slutet."
    ],
    "serving": [
      "Skärs ofta i tvärgående bitar och serveras varm.",
      "Frisk sallad, citron eller ayran passar till fylliga kött- och ostvarianter."
    ],
    "commonMistakes": [
      "För mycket topping som gör botten blöt.",
      "För låg gräddningstemperatur som torkar degen före bryning.",
      "En för tjock kant som blir tung och brödig."
    ]
  },
  "da": {
    "overview": "Pide kombinerer en blød, sej gærdej med topping, der bages samtidig. Kanterne foldes ind over fyldet til en bådform, som holder saft og smeltet ost på plads uden at blive en lukket tærte.",
    "history": "Pide findes i mange regionale tyrkiske former og er vigtig i bageri- og restaurantmad. Navnet kan også betegne brød bredere, men internationalt især de aflange varianter med topping.",
    "flavor": "Ristet dej og brunede kanter møder salt ost, krydret kød eller grøntsager. Smør og æg giver ekstra fylde i nogle varianter.",
    "technique": "Dejen skal kunne strækkes tyndt i midten, mens kanten bevares tykkere. En meget varm bageflade giver hurtigt farve, før toppingen tørrer ud.",
    "essentials": [
      "Gærdej med god strækbarhed.",
      "Aflang eller bådformet udformning.",
      "Topping af ost, kød, grøntsager eller kombinationer.",
      "Høj ovntemperatur og varm bageflade."
    ],
    "recipe": {
      "label": "Pide med ost og urter",
      "yield": "4 pide",
      "time": "ca. 90 min",
      "ingredients": [
        "500 g hvedemel",
        "7 g tørgær",
        "3 dl lunkent vand",
        "1 tsk sukker",
        "1,5 tsk salt",
        "2 spsk olivenolie",
        "300 g revet mozzarella eller mild hvid ost",
        "150 g feta",
        "persille",
        "1 æg til pensling, valgfrit"
      ],
      "steps": [
        "Ælt dejen glat og smidig, og lad den hæve til næsten dobbelt størrelse.",
        "Del i fire stykker, og stræk hvert til en lang oval.",
        "Fordel ost og urter i midten, og lad 2–3 cm kant stå fri.",
        "Fold kanterne ind, og klem enderne sammen til en bådform.",
        "Bag på meget varm sten eller plade, til bunden er brun og osten bobler; pensl eventuelt kanten let bagefter."
      ]
    },
    "variants": [
      "Kaşarlı pide med ost.",
      "Kıymalı pide med krydret hakket kød.",
      "Kuşbaşılı pide med små kødstykker.",
      "Æg kan slås ud over nogle varianter mod slutningen."
    ],
    "serving": [
      "Skæres ofte på tværs og serveres varm.",
      "Frisk salat, citron eller ayran passer til fyldige kød- og ostevarianter."
    ],
    "commonMistakes": [
      "For meget topping, som gør bunden våd.",
      "For lav bagetemperatur, som tørrer dejen før bruning.",
      "For tyk kant, som bliver tung og brødagtig."
    ]
  },
  "fi": {
    "overview": "Pidessä yhdistyvät pehmeä, sitkeä hiivataikina ja samalla paistettavat täytteet. Reunat taitetaan täytteen päälle veneen muotoon, jolloin nesteet ja sulanut juusto pysyvät paikoillaan ilman suljettua piirasta.",
    "history": "Pidellä on monia alueellisia muotoja Turkissa, ja se on tärkeä leipomo- ja ravintolaruoka. Nimi voi tarkoittaa laajemminkin leipää, mutta kansainvälisesti etenkin pitkulaisia täytettyjä versioita.",
    "flavor": "Paahteinen taikina ja ruskistuneet reunat kohtaavat suolaisen juuston, mausteisen lihan tai kasvikset. Voi ja kananmuna tuovat joihinkin versioihin täyteläisyyttä.",
    "technique": "Taikinan tulee venyä keskeltä ohueksi reunojen jäädessä paksummiksi. Hyvin kuuma paistoalusta ruskistaa pohjan nopeasti ennen täytteiden kuivumista.",
    "essentials": [
      "Hyvin venyvää hiivataikinaa.",
      "Pitkulainen tai veneen muotoinen leipä.",
      "Juusto-, liha- tai kasvistäyte tai niiden yhdistelmä.",
      "Korkea uunin lämpötila ja kuuma paistoalusta."
    ],
    "recipe": {
      "label": "Pide juustolla ja yrteillä",
      "yield": "4 pideä",
      "time": "n. 90 min",
      "ingredients": [
        "500 g vehnäjauhoja",
        "7 g kuivahiivaa",
        "3 dl haaleaa vettä",
        "1 tl sokeria",
        "1,5 tl suolaa",
        "2 rkl oliiviöljyä",
        "300 g raastettua mozzarellaa tai mietoa vaaleaa juustoa",
        "150 g fetaa",
        "persiljaa",
        "1 kananmuna voiteluun, halutessasi"
      ],
      "steps": [
        "Vaivaa taikina sileäksi ja notkeaksi ja kohota lähes kaksinkertaiseksi.",
        "Jaa neljään palaan ja venytä kukin pitkäksi soikioksi.",
        "Levitä juusto ja yrtit keskelle ja jätä 2–3 cm reunaa vapaaksi.",
        "Taita reunat sisään ja nipistä päät yhteen veneen muotoon.",
        "Paista hyvin kuumalla kivellä tai pellillä, kunnes pohja ruskistuu ja juusto kuplii; voitele reunat halutessasi paiston jälkeen."
      ]
    },
    "variants": [
      "Kaşarlı pide juustolla.",
      "Kıymalı pide mausteisella jauhelihalla.",
      "Kuşbaşılı pide pienillä lihapaloilla.",
      "Joidenkin versioiden päälle rikotaan kananmuna paiston loppupuolella."
    ],
    "serving": [
      "Leikataan usein poikittaisiksi paloiksi ja tarjoillaan lämpimänä.",
      "Raikas salaatti, sitruuna tai ayran sopii täyteläisiin liha- ja juustoversioihin."
    ],
    "commonMistakes": [
      "Liikaa täytettä, jolloin pohja vettyy.",
      "Liian matala paistolämpötila, jolloin taikina kuivuu ennen ruskistumista.",
      "Liian paksu reuna, josta tulee raskas ja leipämäinen."
    ]
  },
  "is": {
    "overview": "Pide sameinar mjúkt, seigt gerdeig og álegg sem bakast samtímis. Brúnirnar eru brotnar yfir fyllinguna í bátslögun sem heldur safa og bráðnum osti á sínum stað án þess að loka réttinum eins og böku.",
    "history": "Pide er til í mörgum svæðisbundnum gerðum í Tyrklandi og er mikilvægur bakarís- og veitingahúsamatur. Heitið getur einnig átt við brauð almennt en alþjóðlega einkum aflöngu útgáfurnar með áleggi.",
    "flavor": "Ristað deig og brúnaðar brúnir mæta söltum osti, krydduðu kjöti eða grænmeti. Smjör og egg gefa meiri fyllingu í sumum útgáfum.",
    "technique": "Deigið þarf að teygjast þunnt í miðjunni en brúnirnar haldast þykkari. Mjög heitur bökunarflötur brúnar botninn hratt áður en áleggið þornar.",
    "essentials": [
      "Teygjanlegt gerdeig.",
      "Aflöng eða bátslaga útfærsla.",
      "Álegg úr osti, kjöti, grænmeti eða samsetningum.",
      "Hár ofnhiti og heitur bökunarflötur."
    ],
    "recipe": {
      "label": "Pide með osti og kryddjurtum",
      "yield": "4 pide",
      "time": "u.þ.b. 90 mín.",
      "ingredients": [
        "500 g hveiti",
        "7 g þurrger",
        "3 dl volgt vatn",
        "1 tsk. sykur",
        "1,5 tsk. salt",
        "2 msk. ólífuolía",
        "300 g rifinn mozzarella eða mildur hvítur ostur",
        "150 g fetaostur",
        "steinselja",
        "1 egg til penslunar, valfrjálst"
      ],
      "steps": [
        "Hnoðið deigið slétt og mjúkt og látið hefast þar til það hefur næstum tvöfaldast.",
        "Skiptið í fjóra bita og teygið hvern í langa sporöskju.",
        "Dreifið osti og kryddjurtum í miðjuna og skiljið 2–3 cm brún eftir auða.",
        "Brjótið brúnirnar inn og klemmdu endana saman í bátslögun.",
        "Bakið á mjög heitum steini eða plötu þar til botninn er brúnn og osturinn bubblar; penslið brúnina létt eftir bakstur ef vill."
      ]
    },
    "variants": [
      "Kaşarlı pide með osti.",
      "Kıymalı pide með krydduðu hakki.",
      "Kuşbaşılı pide með litlum kjötbitum.",
      "Brjóta má egg yfir sumar útgáfur undir lok bökunar."
    ],
    "serving": [
      "Oft skorið þversum og borið fram heitt.",
      "Ferskt salat, sítróna eða ayran hentar ríkulegum kjöt- og ostaútgáfum."
    ],
    "commonMistakes": [
      "Of mikið álegg sem gerir botninn blautan.",
      "Of lágur bökunarhiti sem þurrkar deigið áður en það brúnast.",
      "Of þykk brún sem verður þung og brauðkennd."
    ]
  },
  "en": {
    "overview": "Pide combines soft, chewy yeasted dough with toppings baked together. The edges fold over the filling into a boat shape, keeping juices and melted cheese in place without making a closed pie.",
    "history": "Pide exists in many regional Turkish forms and is important in bakeries and restaurants. The name can also refer more broadly to bread, but internationally it often means the elongated topped versions.",
    "flavor": "Toasted dough and browned edges meet salty cheese, spiced meat or vegetables. Butter and egg add richness in some versions.",
    "technique": "The dough must stretch thinly in the centre while retaining thicker edges. A very hot baking surface browns the base quickly before the topping dries out.",
    "essentials": [
      "Stretchy yeasted dough.",
      "Elongated or boat-shaped form.",
      "Toppings of cheese, meat, vegetables or combinations.",
      "High oven temperature and hot baking surface."
    ],
    "recipe": {
      "label": "Pide with cheese and herbs",
      "yield": "4 pide",
      "time": "approx. 90 min",
      "ingredients": [
        "500 g wheat flour",
        "7 g dried yeast",
        "3 dl lukewarm water",
        "1 tsp sugar",
        "1.5 tsp salt",
        "2 tbsp olive oil",
        "300 g grated mozzarella or mild white cheese",
        "150 g feta",
        "parsley",
        "1 egg for brushing, optional"
      ],
      "steps": [
        "Knead the dough until smooth and supple and let it rise until almost doubled.",
        "Divide into four pieces and stretch each into a long oval.",
        "Spread cheese and herbs in the centre, leaving a 2–3 cm border.",
        "Fold in the edges and pinch the ends together into a boat shape.",
        "Bake on a very hot stone or tray until the base browns and the cheese bubbles; optionally brush the rim lightly after baking."
      ]
    },
    "variants": [
      "Kaşarlı pide with cheese.",
      "Kıymalı pide with spiced minced meat.",
      "Kuşbaşılı pide with small pieces of meat.",
      "An egg may be cracked over some versions towards the end of baking."
    ],
    "serving": [
      "Often sliced crosswise and served hot.",
      "Fresh salad, lemon or ayran suit rich meat and cheese versions."
    ],
    "commonMistakes": [
      "Too much topping, making the base wet.",
      "Baking temperature too low, drying the dough before it browns.",
      "An overly thick rim that becomes heavy and bread-like."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
