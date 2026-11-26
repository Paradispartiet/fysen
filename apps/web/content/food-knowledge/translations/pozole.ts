import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const pozoleTranslations = {
  "nn": {
    "overview": "Pozole handlar like mykje om maisen som om krafta. Store hominy-korn har ein tydeleg, nesten blomsteraktig maisaroma og fast tekstur, medan den varme gryta blir balansert ved bordet med kål, reddik, lauk, lime, chili og oregano.",
    "history": "Pozole har djupe røter i førkolumbianske maistradisjonar og finst i mange regionale former i Mexico. Raud, grøn og kvit pozole viser korleis same grunnidé blir endra med lokale chiliar, urter og teknikkar.",
    "flavor": "Djup og varm kraft med tydeleg maissmak, lyfta av frisk syre og tekstur frå rå grønsaker ved servering.",
    "technique": "Hominy må vere heilt mør utan å gå i oppløysing, og kjøtet blir trekt varsamt slik at krafta held seg rein. Toppingane blir lagde på ved bordet, ikkje kokte inn i gryta.",
    "essentials": [
      "Hominy eller pozolemais.",
      "Kraft og ofte svinekjøt eller kylling.",
      "Chili- eller urtebase etter regional stil.",
      "Rikeleg frisk topping: kål, reddik, lauk, lime og oregano."
    ],
    "recipe": {
      "label": "Pozole rojo-inspirert gryte",
      "yield": "6 porsjonar",
      "time": "ca. 2,5 timar",
      "ingredients": [
        "1,2 kg svinebog i store bitar",
        "2 store boksar hominy, skylja",
        "4 guajillo-chiliar",
        "2 ancho-chiliar",
        "1 lauk",
        "4 kvitlauksfedd",
        "2 l vatn eller kraft",
        "oregano",
        "kål og reddik",
        "lime og tostadas til servering"
      ],
      "steps": [
        "Trekk svinekjøt, ein halv lauk og kvitlauk roleg i kraft til kjøtet er mørt.",
        "Rist og bløytlegg chiliane og køyr dei med litt kraft til ein glatt saus.",
        "Sil chilisausen inn i gryta og tilset hominy.",
        "Lat alt småkoke til maisen er mør og krafta godt samla, og riv eller del kjøtet.",
        "Server med skåler med finsnitta kål, reddik, lauk, oregano, lime og sprø tostadas."
      ]
    },
    "variants": [
      "Pozole blanco utan dominerande chili- eller urtefarge.",
      "Pozole rojo med raude tørka chiliar.",
      "Pozole verde med grøne chiliar, urter og regionale ingrediensar."
    ],
    "serving": [
      "Kvar gjest finn sin eigen balanse mellom varme, syre og sprøheit ved bordet.",
      "Tostadas eller andre sprø maisprodukt gjev ekstra tekstur."
    ],
    "commonMistakes": [
      "Å bruke vanleg mais i staden for hominy og miste kjernen i retten.",
      "Å koke toppingen i gryta slik at friskheita forsvinn.",
      "For hard koking som gjer kjøtet tørt og krafta uklar."
    ]
  },
  "sv": {
    "overview": "Pozole handlar lika mycket om majsen som om buljongen. Stora hominykorn får en tydlig, nästan blommig majsarom och fast konsistens, medan den varma grytan balanseras vid bordet med kål, rädisa, lök, lime, chili och oregano.",
    "history": "Pozole har djupa rötter i förcolumbianska majstraditioner och finns i många regionala former i Mexiko. Röd, grön och vit pozole visar hur samma grundidé förändras med lokala chilifrukter, örter och tillagningssätt.",
    "flavor": "Djup och värmande buljong med tydlig majssmak, lyft av frisk syra och råa grönsakers konsistens vid servering.",
    "technique": "Hominy ska vara helt mjuk utan att falla sönder, och köttet sjuds försiktigt så att buljongen förblir klar. Toppingen läggs på vid bordet, inte i grytan under kokning.",
    "essentials": [
      "Hominy eller pozolemajs.",
      "Buljong och ofta fläskkött eller kyckling.",
      "Chili- eller örtbas efter regional stil.",
      "Rikligt med färsk topping: kål, rädisa, lök, lime och oregano."
    ],
    "recipe": {
      "label": "Pozole rojo-inspirerad gryta",
      "yield": "6 portioner",
      "time": "ca 2,5 timmar",
      "ingredients": [
        "1,2 kg fläskbog i stora bitar",
        "2 stora burkar hominy, sköljd",
        "4 guajillochili",
        "2 anchochili",
        "1 lök",
        "4 vitlöksklyftor",
        "2 l vatten eller buljong",
        "oregano",
        "kål och rädisa",
        "lime och tostadas till servering"
      ],
      "steps": [
        "Sjud fläskkött, en halv lök och vitlök försiktigt i buljong tills köttet är mört.",
        "Rosta och blötlägg chilin och mixa med lite buljong till en slät sås.",
        "Sila chilisåsen ner i grytan och tillsätt hominy.",
        "Låt sjuda tills majsen är mjuk och smakerna i buljongen förenats, och dra isär eller dela köttet.",
        "Servera med skålar av finstrimlad kål, rädisa, lök, oregano, lime och krispiga tostadas."
      ]
    },
    "variants": [
      "Pozole blanco utan dominerande chili- eller örtfärg.",
      "Pozole rojo med röda torkade chilifrukter.",
      "Pozole verde med grön chili, örter och regionala ingredienser."
    ],
    "serving": [
      "Varje gäst skapar sin egen balans mellan hetta, syra och krispighet vid bordet.",
      "Tostadas eller andra krispiga majsprodukter ger extra konsistens."
    ],
    "commonMistakes": [
      "Att använda vanlig majs i stället för hominy och förlora rättens kärna.",
      "Att koka toppingen i grytan så att friskheten försvinner.",
      "För kraftig kokning som gör köttet torrt och buljongen grumlig."
    ]
  },
  "da": {
    "overview": "Pozole handler lige så meget om majsen som om bouillonen. Store hominykorn får en tydelig, næsten blomsteragtig majsaroma og fast tekstur, mens den varme gryde afbalanceres ved bordet med kål, radise, løg, lime, chili og oregano.",
    "history": "Pozole har dybe rødder i præcolumbianske majstraditioner og findes i mange regionale former i Mexico. Rød, grøn og hvid pozole viser, hvordan samme grundidé ændres med lokale chilier, urter og tilberedningsmetoder.",
    "flavor": "Dyb og varm bouillon med tydelig majssmag, løftet af frisk syre og rå grøntsagers tekstur ved servering.",
    "technique": "Hominy skal være helt mør uden at gå i opløsning, og kødet simrer skånsomt, så bouillonen forbliver klar. Toppings tilsættes ved bordet, ikke under kogningen.",
    "essentials": [
      "Hominy eller pozolemajs.",
      "Bouillon og ofte svinekød eller kylling.",
      "Chili- eller urtebase efter regional stil.",
      "Rigeligt frisk topping: kål, radise, løg, lime og oregano."
    ],
    "recipe": {
      "label": "Pozole rojo-inspireret gryde",
      "yield": "6 portioner",
      "time": "ca. 2,5 timer",
      "ingredients": [
        "1,2 kg svinebov i store stykker",
        "2 store dåser hominy, skyllet",
        "4 guajillochilier",
        "2 anchochilier",
        "1 løg",
        "4 fed hvidløg",
        "2 l vand eller bouillon",
        "oregano",
        "kål og radise",
        "lime og tostadas til servering"
      ],
      "steps": [
        "Lad svinekød, et halvt løg og hvidløg simre roligt i bouillon, til kødet er mørt.",
        "Rist og udblød chilierne, og blend dem med lidt bouillon til en glat sauce.",
        "Si chilisaucen i gryden, og tilsæt hominy.",
        "Lad det simre, til majsen er mør og bouillonen har samlet smag, og riv eller del kødet.",
        "Servér med skåle med fintsnittet kål, radise, løg, oregano, lime og sprøde tostadas."
      ]
    },
    "variants": [
      "Pozole blanco uden dominerende chili- eller urtefarve.",
      "Pozole rojo med røde tørrede chilier.",
      "Pozole verde med grønne chilier, urter og regionale ingredienser."
    ],
    "serving": [
      "Hver gæst skaber sin egen balance mellem styrke, syre og sprødhed ved bordet.",
      "Tostadas eller andre sprøde majsprodukter giver ekstra tekstur."
    ],
    "commonMistakes": [
      "At bruge almindelige majs i stedet for hominy og miste rettens kerne.",
      "At koge toppingen i gryden, så friskheden forsvinder.",
      "For hård kogning, som gør kødet tørt og bouillonen uklar."
    ]
  },
  "fi": {
    "overview": "Pozolessa maissi on yhtä tärkeää kuin liemi. Suurissa hominy-maissinjyvissä on selkeä, lähes kukkainen maissin aromi ja kiinteä rakenne. Kuumaa pataa tasapainotetaan pöydässä kaalilla, retiisillä, sipulilla, limellä, chilillä ja oreganolla.",
    "history": "Pozolella on syvät juuret esikolumbiaanisissa maissiperinteissä ja monia alueellisia muotoja Meksikossa. Punainen, vihreä ja valkoinen pozole osoittavat, kuinka sama perusajatus muuntuu paikallisten chilien, yrttien ja tekniikoiden mukaan.",
    "flavor": "Syvä, lämmittävä liemi, jossa maissi maistuu selvästi ja jota raikas hapokkuus ja raakojen kasvisten rakenne täydentävät tarjoiltaessa.",
    "technique": "Hominy-maissin tulee olla täysin kypsää mutta ehjää. Lihaa haudutetaan varovasti, jotta liemi pysyy kirkkaana. Päällysteet lisätään pöydässä, ei keitetä pataan.",
    "essentials": [
      "Hominy- eli pozolemaissia.",
      "Lientä ja usein sianlihaa tai kanaa.",
      "Chili- tai yrttipohja alueellisen tyylin mukaan.",
      "Runsaasti tuoreita lisukkeita: kaalia, retiisiä, sipulia, limeä ja oreganoa."
    ],
    "recipe": {
      "label": "Pozole rojo -tyylinen pata",
      "yield": "6 annosta",
      "time": "n. 2,5 tuntia",
      "ingredients": [
        "1,2 kg sianlapaa suurina paloina",
        "2 suurta tölkkiä hominy-maissia, huuhdeltuna",
        "4 guajillochiliä",
        "2 anchochiliä",
        "1 sipuli",
        "4 valkosipulinkynttä",
        "2 l vettä tai lientä",
        "oregonoa",
        "kaalia ja retiisiä",
        "limeä ja tostadoja tarjoiluun"
      ],
      "steps": [
        "Hauduta sianlihaa, puolikasta sipulia ja valkosipulia liemessä hiljalleen, kunnes liha on mureaa.",
        "Paahda ja liota chilit ja soseuta pienen liemimäärän kanssa sileäksi kastikkeeksi.",
        "Siivilöi chilikastike pataan ja lisää hominy-maissi.",
        "Hauduta, kunnes maissi on kypsää ja liemen maut yhdistyneet, ja revi tai pilko liha.",
        "Tarjoile kulhojen kanssa, joissa on hienoksi suikaloitua kaalia, retiisiä, sipulia, oreganoa, limeä ja rapeita tostadoja."
      ]
    },
    "variants": [
      "Pozole blanco ilman hallitsevaa chili- tai yrttiväriä.",
      "Pozole rojo kuivatuilla punaisilla chileillä.",
      "Pozole verde vihreillä chileillä, yrteillä ja alueellisilla aineksilla."
    ],
    "serving": [
      "Jokainen ruokailija tasapainottaa tulisuuden, hapokkuuden ja rapeuden pöydässä.",
      "Tostadat tai muut rapeat maissituotteet tuovat lisää rakennetta."
    ],
    "commonMistakes": [
      "Tavallisen maissin käyttö hominyn sijasta, jolloin ruoan ydin katoaa.",
      "Lisukkeiden keittäminen padassa, jolloin raikkaus menetetään.",
      "Liian voimakas keittäminen, joka kuivattaa lihan ja samentaa liemen."
    ]
  },
  "is": {
    "overview": "Pozole snýst jafn mikið um maísinn og soðið. Stór hominy-korn hafa greinilegan, næstum blómlegan maísilm og stinna áferð. Heitur pottrétturinn er í jafnvægi við kál, radísur, lauk, límónu, chili og oregano við borðið.",
    "history": "Pozole á sér djúpar rætur í maíshefðum fyrir komu Kólumbusar og margar svæðisbundnar gerðir í Mexíkó. Rautt, grænt og hvítt pozole sýnir hvernig sama grunnhugmynd breytist með staðbundnu chili, kryddjurtum og aðferðum.",
    "flavor": "Djúpt og hlýtt soð með greinilegu maísbragði, ferskri sýru og áferð hrás grænmetis við framreiðslu.",
    "technique": "Hominy þarf að vera alveg mjúkt án þess að falla í sundur og kjötið er látið malla varlega svo soðið haldist tært. Álegg er sett á við borðið en ekki soðið með réttinum.",
    "essentials": [
      "Hominy eða pozole-maís.",
      "Soð og oft svínakjöt eða kjúklingur.",
      "Chili- eða kryddjurtagrunnur eftir svæðisbundnum stíl.",
      "Ríkulegt ferskt álegg: kál, radísur, laukur, límóna og oregano."
    ],
    "recipe": {
      "label": "Pozole rojo-innblásinn pottréttur",
      "yield": "6 skammtar",
      "time": "u.þ.b. 2,5 klst.",
      "ingredients": [
        "1,2 kg svínabógur í stórum bitum",
        "2 stórar dósir af hominy, skolað",
        "4 guajillo-chili",
        "2 ancho-chili",
        "1 laukur",
        "4 hvítlauksrif",
        "2 l vatn eða soð",
        "oregano",
        "kál og radísur",
        "límóna og tostadas til framreiðslu"
      ],
      "steps": [
        "Látið svínakjöt, hálfan lauk og hvítlauk malla rólega í soði þar til kjötið er meyrt.",
        "Ristið chilið, leggið í bleyti og maukið með dálitlu soði í slétta sósu.",
        "Síið chili-sósuna í pottinn og bætið hominy við.",
        "Látið malla þar til maísinn er mjúkur og soðið hefur tekið saman bragðið, og rífið eða skiptið kjötinu.",
        "Berið fram með skálum af fínt skornu káli, radísum, lauk, oregano, límónu og stökkum tostadas."
      ]
    },
    "variants": [
      "Pozole blanco án ríkjandi chili- eða kryddjurtalitar.",
      "Pozole rojo með rauðu þurrkuðu chili.",
      "Pozole verde með grænu chili, kryddjurtum og svæðisbundnu hráefni."
    ],
    "serving": [
      "Hver gestur finnur sitt jafnvægi milli styrks, sýru og stökkleika við borðið.",
      "Tostadas eða aðrar stökkar maísvörur gefa aukna áferð."
    ],
    "commonMistakes": [
      "Að nota venjulegan maís í stað hominy og missa kjarna réttarins.",
      "Að sjóða áleggið með réttinum svo ferskleikinn hverfi.",
      "Of kröftug suða sem þurrkar kjötið og gerir soðið gruggugt."
    ]
  },
  "en": {
    "overview": "Pozole is as much about the maize as the broth. Large hominy kernels have a distinctive, almost floral maize aroma and firm texture, while the hot stew is balanced at the table with cabbage, radish, onion, lime, chilli and oregano.",
    "history": "Pozole has deep roots in pre-Columbian maize traditions and exists in many regional forms in Mexico. Red, green and white pozole show how the same basic idea changes with local chillies, herbs and cooking methods.",
    "flavor": "Deep, warming broth with distinct maize flavour, lifted by fresh acidity and raw vegetable texture at serving.",
    "technique": "Hominy must be fully tender without falling apart, and meat is simmered gently to keep the broth clear. Add toppings at the table, not during cooking.",
    "essentials": [
      "Hominy or pozole maize.",
      "Stock and often pork or chicken.",
      "Chilli or herb base according to regional style.",
      "Plenty of fresh toppings: cabbage, radish, onion, lime and oregano."
    ],
    "recipe": {
      "label": "Pozole rojo-inspired stew",
      "yield": "6 servings",
      "time": "approx. 2.5 hours",
      "ingredients": [
        "1.2 kg pork shoulder in large pieces",
        "2 large tins hominy, rinsed",
        "4 guajillo chillies",
        "2 ancho chillies",
        "1 onion",
        "4 garlic cloves",
        "2 l water or stock",
        "oregano",
        "cabbage and radish",
        "lime and tostadas to serve"
      ],
      "steps": [
        "Gently simmer pork, half an onion and garlic in stock until the meat is tender.",
        "Toast and soak the chillies and blend with a little stock into a smooth sauce.",
        "Strain the chilli sauce into the pot and add hominy.",
        "Simmer until the maize is tender and the broth flavours have melded, then shred or divide the meat.",
        "Serve with bowls of finely shredded cabbage, radish, onion, oregano, lime and crisp tostadas."
      ]
    },
    "variants": [
      "Pozole blanco without a dominant chilli or herb colour.",
      "Pozole rojo with dried red chillies.",
      "Pozole verde with green chillies, herbs and regional ingredients."
    ],
    "serving": [
      "Each diner creates their own balance of heat, acidity and crunch at the table.",
      "Tostadas or other crisp maize products provide extra texture."
    ],
    "commonMistakes": [
      "Using ordinary maize instead of hominy and losing the dish's essence.",
      "Cooking the toppings in the stew and losing their freshness.",
      "Boiling too vigorously, making the meat dry and the broth cloudy."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
