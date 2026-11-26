import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const birriaTranslations = {
  "nn": {
    "overview": "Birria handlar om langsam tillaging og saus eller kraft av tørka chili, krydder og gelatin frå kjøtet. Den internasjonalt populære quesabirria-stilen er éi serveringsform, ikkje heile definisjonen.",
    "history": "Birria er særleg knytt til Jalisco og har tradisjonelt ofte vore laga med geit, men storfe og andre kjøtslag er òg vanlege. Retten blir servert ved feiringar og som spesialisert restaurant- og gatemat.",
    "flavor": "Djup, varm og chiliprega med syre, tørka fruktpreg frå chiliane og rik umami frå langkokt kjøt og kraft.",
    "technique": "Rist og bløytlegg tørka chili før dei blir malne til marinade. Kjøtet skal kokast langsamt til det kan rivast, medan krafta blir avfeitta og justert separat til ho er intens utan å vere tung.",
    "essentials": [
      "Kjøt som toler lang tillaging, som bog, høgrygg eller geit.",
      "Tørka meksikanske chiliar som guajillo og ancho.",
      "Krydder, eddik og aromatiske ingrediensar i marinaden.",
      "Consomé eller kokekraft servert saman med kjøtet."
    ],
    "recipe": {
      "label": "Birria-inspirert storfegryte",
      "yield": "6 porsjonar",
      "time": "ca. 4 timar",
      "ingredients": [
        "1,5 kg høgrygg eller bog",
        "4 guajillo-chiliar",
        "2 ancho-chiliar",
        "3 kvitlauksfedd",
        "1 lauk",
        "2 ss eddik",
        "1 ts spisskummen",
        "1/2 ts kanel",
        "1 ts oregano",
        "1 l oksekraft",
        "lime, lauk og koriander"
      ],
      "steps": [
        "Rist dei tørka chiliane kort, fjern frøa og bløytlegg i varmt vatn.",
        "Køyr chili med kvitlauk, lauk, eddik og krydder til ein glatt marinade.",
        "Brun kjøtet, dekk med marinade og kraft og braiser svært roleg til det fell frå kvarandre.",
        "Ta ut kjøtet, sil eller juster krafta og fjern overflødig feitt etter smak.",
        "Riv kjøtet og server i krafta eller i varme tortillaer med lauk, koriander og lime."
      ]
    },
    "variants": [
      "Tradisjonelle geitevariantar.",
      "Storfe-birria, svært vanleg i moderne serveringar.",
      "Quesabirria-tacos med ost, steikte i feitt frå krafta.",
      "Birria som suppe eller gryte med consomé."
    ],
    "serving": [
      "Lime, hakka lauk og koriander gjev friskheit.",
      "Consomé kan serverast i eigen kopp som dipp til tacos."
    ],
    "commonMistakes": [
      "For kort koketid som gjev seigt kjøt.",
      "Bitter chilisaus etter hard brenning av tørka chili.",
      "For mykje feitt i consoméen utan nok syre og krydderbalanse."
    ]
  },
  "sv": {
    "overview": "Birria handlar om långsam tillagning och en sås eller buljong byggd på torkad chili, kryddor och köttets eget gelatin. Den internationellt populära quesabirria-stilen är ett serveringssätt, inte hela definitionen.",
    "history": "Birria förknippas främst med Jalisco och har traditionellt ofta lagats med get, men nötkött och andra köttslag är också vanliga. Rätten serveras vid festligheter och som specialiserad restaurang- och gatumat.",
    "flavor": "Djup, varm och chilipräglad med syra, toner av torkad frukt från chilin och rik umami från långkokt kött och buljong.",
    "technique": "Rosta och blötlägg torkad chili innan den mixas till marinad. Tillaga köttet långsamt tills det kan dras isär, och avfetta och justera buljongen separat så att den blir intensiv utan att vara tung.",
    "essentials": [
      "Kött som tål lång tillagning, som bog, högrev eller get.",
      "Torkad mexikansk chili som guajillo och ancho.",
      "Kryddor, vinäger och aromatiska ingredienser i marinaden.",
      "Consomé eller kokbuljong som serveras med köttet."
    ],
    "recipe": {
      "label": "Birria-inspirerad nötgryta",
      "yield": "6 portioner",
      "time": "ca 4 timmar",
      "ingredients": [
        "1,5 kg högrev eller bog",
        "4 guajillochili",
        "2 anchochili",
        "3 vitlöksklyftor",
        "1 lök",
        "2 msk vinäger",
        "1 tsk spiskummin",
        "1/2 tsk kanel",
        "1 tsk oregano",
        "1 l nötbuljong",
        "lime, lök och koriander"
      ],
      "steps": [
        "Rosta den torkade chilin kort, ta bort fröna och blötlägg i varmt vatten.",
        "Mixa chili med vitlök, lök, vinäger och kryddor till en slät marinad.",
        "Bryn köttet, täck med marinad och buljong och bräsera mycket försiktigt tills det faller isär.",
        "Ta upp köttet, sila eller justera buljongen och ta bort överflödigt fett efter smak.",
        "Dra isär köttet och servera i buljongen eller i varma tortillor med lök, koriander och lime."
      ]
    },
    "variants": [
      "Traditionella getköttsvarianter.",
      "Nötbirria, mycket vanlig i moderna serveringar.",
      "Quesabirria-tacos med ost, stekta i fett från buljongen.",
      "Birria som soppa eller gryta med consomé."
    ],
    "serving": [
      "Lime, hackad lök och koriander ger friskhet.",
      "Consomé kan serveras i en egen kopp att doppa tacos i."
    ],
    "commonMistakes": [
      "För kort koktid som ger segt kött.",
      "Besk chilisås efter att den torkade chilin bränts för hårt.",
      "För mycket fett i consomén utan tillräcklig syra och kryddbalans."
    ]
  },
  "da": {
    "overview": "Birria handler om langsom tilberedning og en sauce eller bouillon af tørrede chilier, krydderier og kødets egen gelatine. Den internationalt populære quesabirria-stil er én serveringsform, ikke hele definitionen.",
    "history": "Birria forbindes især med Jalisco og er traditionelt ofte lavet med ged, men oksekød og andre kødtyper er også udbredte. Retten serveres ved festligheder og som specialiseret restaurant- og gademad.",
    "flavor": "Dyb, varm og chilipræget med syre, tørret frugtkarakter fra chilierne og rig umami fra langtidskogt kød og bouillon.",
    "technique": "Rist og udblød tørrede chilier, før de blendes til marinade. Tilbered kødet langsomt, til det kan trækkes fra hinanden, og affedt og justér bouillonen separat, så den er intens uden at være tung.",
    "essentials": [
      "Kød, der tåler lang tilberedning, som bov, højreb eller ged.",
      "Tørrede mexicanske chilier som guajillo og ancho.",
      "Krydderier, eddike og aromatiske ingredienser i marinaden.",
      "Consomé eller kogebouillon serveret sammen med kødet."
    ],
    "recipe": {
      "label": "Birria-inspireret oksegryde",
      "yield": "6 portioner",
      "time": "ca. 4 timer",
      "ingredients": [
        "1,5 kg højreb eller bov",
        "4 guajillochilier",
        "2 anchochilier",
        "3 fed hvidløg",
        "1 løg",
        "2 spsk eddike",
        "1 tsk spidskommen",
        "1/2 tsk kanel",
        "1 tsk oregano",
        "1 l oksebouillon",
        "lime, løg og koriander"
      ],
      "steps": [
        "Rist de tørrede chilier kort, fjern kernerne, og udblød i varmt vand.",
        "Blend chili med hvidløg, løg, eddike og krydderier til en glat marinade.",
        "Brun kødet, dæk med marinade og bouillon, og braisér meget roligt, til det falder fra hinanden.",
        "Tag kødet op, si eller justér bouillonen, og fjern overskydende fedt efter smag.",
        "Riv kødet, og servér i bouillonen eller i varme tortillaer med løg, koriander og lime."
      ]
    },
    "variants": [
      "Traditionelle gedevarianter.",
      "Oksebirria, meget almindelig i moderne serveringer.",
      "Quesabirria-tacos med ost, stegt i fedt fra bouillonen.",
      "Birria som suppe eller gryde med consomé."
    ],
    "serving": [
      "Lime, hakket løg og koriander giver friskhed.",
      "Consomé kan serveres i en separat kop til at dyppe tacos i."
    ],
    "commonMistakes": [
      "For kort kogetid, som giver sejt kød.",
      "Bitter chilisauce efter for hård brænding af tørret chili.",
      "For meget fedt i consoméen uden tilstrækkelig syre og krydderibalance."
    ]
  },
  "fi": {
    "overview": "Birriassa keskeistä on hidas kypsennys sekä kuivatuista chileistä, mausteista ja lihan omasta gelatiinista rakennettu kastike tai liemi. Kansainvälisesti suosittu quesabirria on yksi tarjoilutapa, ei koko ruokalajin määritelmä.",
    "history": "Birria yhdistetään erityisesti Jaliscoon. Perinteisesti käytettiin usein vuohenlihaa, mutta myös naudanliha ja muut lihat ovat yleisiä. Ruokaa tarjoillaan juhlissa sekä siihen erikoistuneissa ravintoloissa ja katuruokapaikoissa.",
    "flavor": "Syvä, lämmin ja chilinen maku, hapokkuutta, kuivattujen hedelmien sävyjä chileistä ja pitkään kypsennetyn lihan sekä liemen runsasta umamia.",
    "technique": "Paahda ja liota kuivatut chilit ennen marinadiksi soseuttamista. Kypsennä lihaa hitaasti, kunnes se hajoaa säikeiksi, ja poista liemestä rasvaa sekä säädä makua erikseen niin, että se on voimakas mutta ei raskas.",
    "essentials": [
      "Pitkää kypsennystä kestävää lihaa, kuten lapaa, etuselkää tai vuohenlihaa.",
      "Kuivattuja meksikolaisia chilejä, kuten guajilloa ja anchoa.",
      "Mausteita, etikkaa ja aromaattisia aineksia marinadiin.",
      "Lihan kanssa tarjottavaa consomé-lientä tai keitinlientä."
    ],
    "recipe": {
      "label": "Birriatyylinen naudanlihapata",
      "yield": "6 annosta",
      "time": "n. 4 tuntia",
      "ingredients": [
        "1,5 kg naudan etuselkää tai lapaa",
        "4 guajillochiliä",
        "2 anchochiliä",
        "3 valkosipulinkynttä",
        "1 sipuli",
        "2 rkl etikkaa",
        "1 tl juustokuminaa",
        "1/2 tl kanelia",
        "1 tl oreganoa",
        "1 l naudanlihalientä",
        "limeä, sipulia ja korianteria"
      ],
      "steps": [
        "Paahda kuivattuja chilejä hetki, poista siemenet ja liota kuumassa vedessä.",
        "Soseuta chilit, valkosipuli, sipuli, etikka ja mausteet sileäksi marinadiksi.",
        "Ruskista liha, peitä marinadilla ja liemellä ja hauduta hyvin miedolla lämmöllä, kunnes liha hajoaa.",
        "Nosta liha pois, siivilöi tai säädä liemi ja poista ylimääräistä rasvaa maun mukaan.",
        "Revi liha säikeiksi ja tarjoile liemessä tai lämpimissä tortilloissa sipulin, korianterin ja limen kanssa."
      ]
    },
    "variants": [
      "Perinteiset vuohenlihaversiot.",
      "Naudanlihabirria, hyvin yleinen nykyisin.",
      "Quesabirria-tacot juustolla, liemen rasvassa paistettuina.",
      "Birria keittona tai patana consomé-liemen kanssa."
    ],
    "serving": [
      "Lime, hienonnettu sipuli ja korianteri tuovat raikkautta.",
      "Consomén voi tarjoilla erillisessä kupissa tacojen dippaamiseen."
    ],
    "commonMistakes": [
      "Liian lyhyt kypsennys, jolloin liha jää sitkeäksi.",
      "Karvas chilikastike, kun kuivatut chilit ovat palaneet.",
      "Liikaa rasvaa consoméssa ilman riittävää hapokkuutta ja mausteiden tasapainoa."
    ]
  },
  "is": {
    "overview": "Birria snýst um hæga eldun og sósu eða soð úr þurrkuðu chili, kryddi og gelatíni úr kjötinu. Quesabirria, sem nýtur alþjóðlegra vinsælda, er ein framreiðsluaðferð en ekki öll skilgreining réttarins.",
    "history": "Birria tengist einkum Jalisco og hefur oft verið gert úr geitakjöti, en nautakjöt og annað kjöt er einnig algengt. Rétturinn er borinn fram við hátíðir og á sérhæfðum veitingastöðum og götumatarsölum.",
    "flavor": "Djúpt, hlýtt chili-bragð með sýru, keim af þurrkuðum ávöxtum úr chilinu og ríkulegu umami úr hægelduðu kjöti og soði.",
    "technique": "Ristið og leggið þurrkað chili í bleyti áður en það er maukað í marineringu. Eldið kjötið hægt þar til hægt er að rífa það í sundur og fituhreinsið og stillið soðið sérstaklega svo það verði kraftmikið en ekki þungt.",
    "essentials": [
      "Kjöt sem þolir langa eldun, svo sem bógur, nauthryggur eða geitakjöt.",
      "Þurrkað mexíkóskt chili, svo sem guajillo og ancho.",
      "Krydd, edik og ilmandi hráefni í marineringu.",
      "Consomé eða soð sem borið er fram með kjötinu."
    ],
    "recipe": {
      "label": "Birria-innblásinn nautakjötsréttur",
      "yield": "6 skammtar",
      "time": "u.þ.b. 4 klst.",
      "ingredients": [
        "1,5 kg nautaháryggur eða bógur",
        "4 guajillo-chili",
        "2 ancho-chili",
        "3 hvítlauksrif",
        "1 laukur",
        "2 msk. edik",
        "1 tsk. kúmín",
        "1/2 tsk. kanill",
        "1 tsk. oregano",
        "1 l nautasoð",
        "límóna, laukur og kóríander"
      ],
      "steps": [
        "Ristið þurrkaða chilið stutt, fjarlægið fræin og leggið í bleyti í heitu vatni.",
        "Maukið chili með hvítlauk, lauk, ediki og kryddi í slétta marineringu.",
        "Brúnið kjötið, þekið með marineringu og soði og látið malla rólega þar til það fellur í sundur.",
        "Takið kjötið upp, síið eða stillið soðið og fjarlægið umframfitu eftir smekk.",
        "Rífið kjötið og berið fram í soðinu eða heitum tortillum með lauk, kóríander og límónu."
      ]
    },
    "variants": [
      "Hefðbundnar geitakjötsútgáfur.",
      "Nautakjötsbirria sem er mjög algengt í nútíma framreiðslu.",
      "Quesabirria-taco með osti, steikt í fitu úr soðinu.",
      "Birria sem súpa eða pottréttur með consomé."
    ],
    "serving": [
      "Límóna, saxaður laukur og kóríander gefa ferskleika.",
      "Consomé má bera fram í sérstökum bolla til að dýfa taco í."
    ],
    "commonMistakes": [
      "Of stuttur eldunartími sem gefur seigt kjöt.",
      "Beisk chili-sósa vegna brennds þurrkaðs chili.",
      "Of mikil fita í consomé án nægrar sýru og jafnvægis krydds."
    ]
  },
  "en": {
    "overview": "Birria is about slow cooking and a sauce or broth built from dried chillies, spices and the meat's own gelatin. The internationally popular modern quesabirria style is one serving format, not the entire definition.",
    "history": "Birria is particularly associated with Jalisco and traditionally often made with goat, although beef and other meats are widespread. It is served at celebrations and in specialist restaurants and street-food stalls.",
    "flavor": "Deep, warming and chilli-led, with acidity, dried-fruit notes from the chillies and rich umami from slow-cooked meat and broth.",
    "technique": "Toast and soak dried chillies before blending into a marinade. Cook the meat slowly until it pulls apart, then skim and adjust the broth separately so it is intense without being heavy.",
    "essentials": [
      "Meat suited to long cooking, such as shoulder, chuck or goat.",
      "Dried Mexican chillies such as guajillo and ancho.",
      "Spices, vinegar and aromatics in the marinade.",
      "Consomé or cooking broth served with the meat."
    ],
    "recipe": {
      "label": "Birria-inspired beef stew",
      "yield": "6 servings",
      "time": "approx. 4 hours",
      "ingredients": [
        "1.5 kg beef chuck or shoulder",
        "4 guajillo chillies",
        "2 ancho chillies",
        "3 garlic cloves",
        "1 onion",
        "2 tbsp vinegar",
        "1 tsp cumin",
        "1/2 tsp cinnamon",
        "1 tsp oregano",
        "1 l beef stock",
        "lime, onion and coriander"
      ],
      "steps": [
        "Toast the dried chillies briefly, remove the seeds and soak in hot water.",
        "Blend chillies with garlic, onion, vinegar and spices into a smooth marinade.",
        "Brown the meat, cover with marinade and stock and braise very gently until it falls apart.",
        "Remove the meat, strain or adjust the broth and remove excess fat to taste.",
        "Shred the meat and serve in the broth or warm tortillas with onion, coriander and lime."
      ]
    },
    "variants": [
      "Traditional goat versions.",
      "Beef birria, very common in modern servings.",
      "Quesabirria tacos with cheese, fried in fat from the broth.",
      "Birria served as soup or stew with consomé."
    ],
    "serving": [
      "Lime, chopped onion and coriander provide freshness.",
      "Consomé may be served in a separate cup for dipping tacos."
    ],
    "commonMistakes": [
      "Insufficient cooking time, resulting in tough meat.",
      "Bitter chilli sauce from heavily burning dried chillies.",
      "Too much fat in the consomé without enough acidity and spice balance."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
