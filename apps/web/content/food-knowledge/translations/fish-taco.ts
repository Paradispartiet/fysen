import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const fishTacoTranslations = {
  "nn": {
    "overview": "Fisketaco lever av kontrastar: varm fisk, mjuk tortilla, sprø kål, syrleg lime og ein saus som bind det saman. Fritert fisk er kjend frå Baja, men grilla sjømatvariantar er òg vanlege.",
    "history": "Fisketaco er særleg knytt til Baja California og tilgangen på fersk sjømat i kystbyane. Retten er blitt ein av dei mest internasjonalt synlege formene for nordvestmeksikansk gatemat.",
    "flavor": "Frisk, salt og syrleg, med rista eller fritert fisk, sprø kål, chili og kremete saus. Maisen i tortillaen skal framleis vere tydeleg.",
    "technique": "Fisk treng kort tillaging. Ved fritering må røra vere kald og oljen varm nok til ei tynn, sprø skorpe. Ved grilling må fisken tørkast godt og steikjast raskt.",
    "essentials": [
      "Fast kvit fisk eller annan sjømat.",
      "Små maistortillaer.",
      "Finsnitta kål og frisk salsa.",
      "Lime og ein kremete, syrleg saus."
    ],
    "recipe": {
      "label": "Baja-inspirerte fisketacos",
      "yield": "12 tacos",
      "time": "ca. 40 min",
      "ingredients": [
        "700 g torsk, sei eller annan fast kvit fisk",
        "150 g kveitemjøl",
        "1 ts bakepulver",
        "2 dl iskaldt kolsyrevatn eller øl",
        "salt og chili",
        "nøytral olje til fritering",
        "12 maistortillaer",
        "300 g finsnitta kål",
        "1 dl yoghurt eller majones",
        "lime, koriander og salsa"
      ],
      "steps": [
        "Skjer fisken i avlange bitar og tørk godt.",
        "Bland mjøl, bakepulver, krydder og iskald væske raskt til ei lett røre.",
        "Dypp fisken og friter i varm olje til skorpa er gyllen og fisken akkurat gjennomkokt.",
        "Bland ein enkel saus av yoghurt eller majones, lime og salt og varm tortillaene.",
        "Bygg tacos med fisk, kål, saus, salsa, koriander og rikeleg lime."
      ]
    },
    "variants": [
      "Sprøfritert Baja-stil.",
      "Grilla fisk med lettare salsa og kål.",
      "Shrimp tacos bruker same oppbygging med reker.",
      "Tostada-servering med sjømat og liknande garnityr."
    ],
    "serving": [
      "Server fisken straks så skorpa ikkje mjuknar.",
      "Kål og lime bør vere kalde og friske mot den varme fisken."
    ],
    "commonMistakes": [
      "Våt fisk som gjer frityrrøra laus og sprutande.",
      "For låg oljetemperatur og feit skorpe.",
      "For mykje saus som skjuler fisken og gjer tortillaen blaut."
    ]
  },
  "sv": {
    "overview": "Fisktacos bygger på kontraster: varm fisk, mjuk tortilla, krispig kål, syrlig lime och en sås som binder ihop allt. Friterad fisk är välkänd i Baja-stil, men grillade skaldjurs- och fiskvarianter är också vanliga.",
    "history": "Fisktacos förknippas särskilt med Baja California och kuststädernas tillgång till färsk fisk och skaldjur. Rätten har blivit en av de internationellt mest synliga formerna av nordvästmexikansk gatumat.",
    "flavor": "Frisk, salt och syrlig, med rostad eller friterad fisk, krispig kål, chili och krämig sås. Majssmaken i tortillan ska fortfarande framträda.",
    "technique": "Fisk behöver kort tillagning. Vid fritering ska smeten vara kall och oljan tillräckligt het för en tunn krispig skorpa; vid grillning ska fisken torkas väl och tillagas snabbt.",
    "essentials": [
      "Fast vit fisk eller andra skaldjur och fisk.",
      "Små majstortillor.",
      "Finstrimlad kål och färsk salsa.",
      "Lime och en krämig, syrlig sås."
    ],
    "recipe": {
      "label": "Baja-inspirerade fisktacos",
      "yield": "12 tacos",
      "time": "ca 40 min",
      "ingredients": [
        "700 g torsk, sej eller annan fast vit fisk",
        "150 g vetemjöl",
        "1 tsk bakpulver",
        "2 dl iskallt kolsyrat vatten eller öl",
        "salt och chili",
        "neutral olja till fritering",
        "12 majstortillor",
        "300 g finstrimlad kål",
        "1 dl yoghurt eller majonnäs",
        "lime, koriander och salsa"
      ],
      "steps": [
        "Skär fisken i avlånga bitar och torka den väl.",
        "Blanda mjöl, bakpulver, kryddor och iskall vätska snabbt till en lätt smet.",
        "Doppa fisken och fritera i het olja tills skorpan är gyllene och fisken precis genomkokt.",
        "Blanda en enkel sås av yoghurt eller majonnäs, lime och salt och värm tortillorna.",
        "Bygg tacos med fisk, kål, sås, salsa, koriander och rikligt med lime."
      ]
    },
    "variants": [
      "Krispigt friterad Baja-stil.",
      "Grillad fisk med lättare salsa och kål.",
      "Shrimp tacos har samma uppbyggnad med räkor.",
      "Tostadas med fisk eller skaldjur och liknande garnering."
    ],
    "serving": [
      "Servera fisken genast så att skorpan inte mjuknar.",
      "Kål och lime ska vara kalla och friska mot den varma fisken."
    ],
    "commonMistakes": [
      "Blöt fisk som gör frityrsmeten lös och stänkande.",
      "För låg oljetemperatur och fet skorpa.",
      "För mycket sås som döljer fisken och gör tortillan blöt."
    ]
  },
  "da": {
    "overview": "Fisketacos lever af kontraster: varm fisk, blød tortilla, sprød kål, syrlig lime og en sauce, der binder det sammen. Friteret fisk er kendt i Baja-stil, men grillede fisk- og skaldyrsvarianter er også almindelige.",
    "history": "Fisketacos forbindes især med Baja California og kystbyernes adgang til frisk fisk og skaldyr. Retten er blevet en af de mest internationalt synlige former for nordvestmexicansk gademad.",
    "flavor": "Frisk, salt og syrlig med ristet eller friteret fisk, sprød kål, chili og cremet sauce. Majsen i tortillaen skal stadig kunne smages.",
    "technique": "Fisk kræver kort tilberedning. Ved fritering skal dejen være kold og olien varm nok til en tynd sprød skorpe; ved grillning skal fisken tørres godt og steges hurtigt.",
    "essentials": [
      "Fast hvid fisk eller anden fisk og skaldyr.",
      "Små majstortillaer.",
      "Fintsnittet kål og frisk salsa.",
      "Lime og en cremet, syrlig sauce."
    ],
    "recipe": {
      "label": "Baja-inspirerede fisketacos",
      "yield": "12 tacos",
      "time": "ca. 40 min",
      "ingredients": [
        "700 g torsk, sej eller anden fast hvid fisk",
        "150 g hvedemel",
        "1 tsk bagepulver",
        "2 dl iskoldt danskvand eller øl",
        "salt og chili",
        "neutral olie til fritering",
        "12 majstortillaer",
        "300 g fintsnittet kål",
        "1 dl yoghurt eller mayonnaise",
        "lime, koriander og salsa"
      ],
      "steps": [
        "Skær fisken i aflange stykker, og tør den godt.",
        "Bland hurtigt mel, bagepulver, krydderier og iskold væske til en let dej.",
        "Dyp fisken, og fritér i varm olie, til skorpen er gylden, og fisken netop er gennemtilberedt.",
        "Bland en enkel sauce af yoghurt eller mayonnaise, lime og salt, og varm tortillaerne.",
        "Byg tacos med fisk, kål, sauce, salsa, koriander og rigeligt lime."
      ]
    },
    "variants": [
      "Sprødfriteret Baja-stil.",
      "Grillet fisk med lettere salsa og kål.",
      "Shrimp tacos bruger samme opbygning med rejer.",
      "Tostadas med fisk eller skaldyr og lignende pynt."
    ],
    "serving": [
      "Servér fisken straks, så skorpen ikke bliver blød.",
      "Kål og lime skal være kolde og friske mod den varme fisk."
    ],
    "commonMistakes": [
      "Våd fisk, som gør frituredejen løs og sprøjtende.",
      "For lav olietemperatur og fedtet skorpe.",
      "For meget sauce, som skjuler fisken og gør tortillaen blød."
    ]
  },
  "fi": {
    "overview": "Kalatacot perustuvat kontrasteihin: kuumaa kalaa, pehmeä tortilla, rapeaa kaalia, hapokasta limeä ja ainekset yhdistävä kastike. Baja-tyylissä uppopaistettu kala on tunnetuin, mutta grillatut merenelävät ovat myös yleisiä.",
    "history": "Kalatacot yhdistetään erityisesti Baja Californiaan ja rannikkokaupunkien tuoreisiin mereneläviin. Ruoasta on tullut yksi Luoteis-Meksikon kansainvälisesti tunnetuimmista katuruoista.",
    "flavor": "Raikas, suolainen ja hapan maku, paahdettua tai uppopaistettua kalaa, rapeaa kaalia, chiliä ja kermaista kastiketta. Tortillan maissin maun tulee edelleen erottua.",
    "technique": "Kala kypsyy nopeasti. Uppopaistossa taikinan tulee olla kylmää ja öljyn riittävän kuumaa ohutta, rapeaa kuorta varten. Grillattava kala kuivataan hyvin ja paistetaan nopeasti.",
    "essentials": [
      "Kiinteää valkoista kalaa tai muita mereneläviä.",
      "Pieniä maissitortilloja.",
      "Hienoksi suikaloitua kaalia ja tuoretta salsaa.",
      "Limeä ja kermaista, hapokasta kastiketta."
    ],
    "recipe": {
      "label": "Baja-tyyliset kalatacot",
      "yield": "12 tacoa",
      "time": "n. 40 min",
      "ingredients": [
        "700 g turskaa, seitiä tai muuta kiinteää valkoista kalaa",
        "150 g vehnäjauhoja",
        "1 tl leivinjauhetta",
        "2 dl jääkylmää kivennäisvettä tai olutta",
        "suolaa ja chiliä",
        "neutraalia öljyä uppopaistamiseen",
        "12 maissitortillaa",
        "300 g hienoksi suikaloitua kaalia",
        "1 dl jogurttia tai majoneesia",
        "limeä, korianteria ja salsaa"
      ],
      "steps": [
        "Leikkaa kala pitkänomaisiksi paloiksi ja kuivaa hyvin.",
        "Sekoita jauhot, leivinjauhe, mausteet ja jääkylmä neste nopeasti kevyeksi taikinaksi.",
        "Kasta kala taikinaan ja uppopaista kuumassa öljyssä, kunnes kuori on kullanruskea ja kala juuri kypsää.",
        "Sekoita yksinkertainen kastike jogurtista tai majoneesista, limestä ja suolasta ja lämmitä tortillat.",
        "Kokoa tacot kalasta, kaalista, kastikkeesta, salsasta, korianterista ja runsaasta limestä."
      ]
    },
    "variants": [
      "Rapeaksi uppopaistettu Baja-tyyli.",
      "Grillattu kala kevyemmällä salsalla ja kaalilla.",
      "Katkaraputacot noudattavat samaa rakennetta.",
      "Tostadat merenelävillä ja vastaavilla lisukkeilla."
    ],
    "serving": [
      "Tarjoile kala heti, jotta kuori ei pehmene.",
      "Kaalin ja limen tulee olla kylmiä ja raikkaita kuuman kalan vastapainona."
    ],
    "commonMistakes": [
      "Märkä kala, jolloin paistotaikina irtoaa ja roiskuu.",
      "Liian viileä öljy ja rasvainen kuori.",
      "Liikaa kastiketta, joka peittää kalan maun ja vetistää tortillan."
    ]
  },
  "is": {
    "overview": "Fiskitaco byggist á andstæðum: heitur fiskur, mjúk tortilla, stökkt kál, súr límóna og sósa sem bindur allt saman. Djúpsteiktur fiskur er þekktur í Baja-stíl en grillað sjávarfang er einnig algengt.",
    "history": "Fiskitaco tengist einkum Baja California og aðgengi strandborganna að fersku sjávarfangi. Rétturinn er orðinn ein alþjóðlega sýnilegasta gerð götumatargerðar í norðvesturhluta Mexíkó.",
    "flavor": "Ferskt, salt og súrt með ristuðum eða djúpsteiktum fiski, stökku káli, chili og rjómakenndri sósu. Maísbragðið í tortillunni á enn að vera greinilegt.",
    "technique": "Fiskur þarf stutta eldun. Við djúpsteikingu þarf deigið að vera kalt og olían nógu heit fyrir þunna, stökka skorpu; fyrir grillun er fiskurinn þerraður vel og eldaður hratt.",
    "essentials": [
      "Stinnur hvítur fiskur eða annað sjávarfang.",
      "Litlar maístortillur.",
      "Fínt skorið kál og fersk salsa.",
      "Límóna og rjómakennd, súr sósa."
    ],
    "recipe": {
      "label": "Baja-innblásin fiskitaco",
      "yield": "12 taco",
      "time": "u.þ.b. 40 mín.",
      "ingredients": [
        "700 g þorskur, ufsi eða annar stinnur hvítur fiskur",
        "150 g hveiti",
        "1 tsk. lyftiduft",
        "2 dl ískalt kolsýrt vatn eða bjór",
        "salt og chili",
        "bragðlítil olía til djúpsteikingar",
        "12 maístortillur",
        "300 g fínt skorið kál",
        "1 dl jógúrt eða majónes",
        "límóna, kóríander og salsa"
      ],
      "steps": [
        "Skerið fiskinn í aflanga bita og þerrið vel.",
        "Blandið hveiti, lyftidufti, kryddi og ísköldum vökva hratt í létt deig.",
        "Dýfið fiskinum í deigið og djúpsteikið í heitri olíu þar til skorpan er gyllt og fiskurinn rétt fulleldaður.",
        "Blandið einfaldri sósu úr jógúrt eða majónesi, límónu og salti og hitið tortillurnar.",
        "Setjið fisk, kál, sósu, salsa, kóríander og ríkulega límónu í taco."
      ]
    },
    "variants": [
      "Stökk djúpsteikt Baja-útgáfa.",
      "Grillaður fiskur með léttari salsa og káli.",
      "Rækjutaco fylgir sömu uppbyggingu með rækjum.",
      "Tostadas með sjávarfangi og svipuðu meðlæti."
    ],
    "serving": [
      "Berið fiskinn strax fram svo skorpan mýkist ekki.",
      "Kál og límóna eiga að vera köld og fersk á móti heitum fiskinum."
    ],
    "commonMistakes": [
      "Blautur fiskur sem gerir deigið laust og veldur slettum.",
      "Of lágur olíuhiti og feit skorpa.",
      "Of mikil sósa sem yfirgnæfir fiskinn og bleytir tortilluna."
    ]
  },
  "en": {
    "overview": "Fish tacos thrive on contrast: hot fish, soft tortilla, crisp cabbage, tangy lime and a sauce that ties everything together. Fried fish is well known in Baja styles, but grilled seafood versions are common too.",
    "history": "Fish tacos are particularly associated with Baja California and its coastal cities' access to fresh seafood. They have become one of the most internationally visible forms of northwestern Mexican street food.",
    "flavor": "Fresh, salty and tangy, with roasted or fried fish, crunchy cabbage, chilli and creamy sauce. The maize flavour of the tortilla should remain distinct.",
    "technique": "Fish needs brief cooking. For frying, the batter must be cold and the oil hot enough for a thin, crisp crust; for grilling, dry the fish well and cook quickly.",
    "essentials": [
      "Firm white fish or other seafood.",
      "Small corn tortillas.",
      "Finely shredded cabbage and fresh salsa.",
      "Lime and a creamy, tangy sauce."
    ],
    "recipe": {
      "label": "Baja-inspired fish tacos",
      "yield": "12 tacos",
      "time": "approx. 40 min",
      "ingredients": [
        "700 g cod, coley or other firm white fish",
        "150 g wheat flour",
        "1 tsp baking powder",
        "2 dl ice-cold sparkling water or beer",
        "salt and chilli",
        "neutral oil for deep-frying",
        "12 corn tortillas",
        "300 g finely shredded cabbage",
        "1 dl yoghurt or mayonnaise",
        "lime, coriander and salsa"
      ],
      "steps": [
        "Cut fish into elongated pieces and dry well.",
        "Quickly mix flour, baking powder, seasonings and ice-cold liquid into a light batter.",
        "Dip the fish and fry in hot oil until the crust is golden and the fish just cooked through.",
        "Mix a simple sauce of yoghurt or mayonnaise, lime and salt, and warm the tortillas.",
        "Build tacos with fish, cabbage, sauce, salsa, coriander and plenty of lime."
      ]
    },
    "variants": [
      "Crisp-fried Baja style.",
      "Grilled fish with lighter salsa and cabbage.",
      "Shrimp tacos follow the same structure using prawns.",
      "Seafood tostadas with similar garnishes."
    ],
    "serving": [
      "Serve the fish immediately so the crust does not soften.",
      "Cabbage and lime should be cold and fresh against the hot fish."
    ],
    "commonMistakes": [
      "Wet fish that makes the batter loose and causes splattering.",
      "Oil temperature too low, producing a greasy crust.",
      "Too much sauce, masking the fish and making the tortilla soggy."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
