import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const banhMiTranslations = {
  "nn": {
    "overview": "Bánh mì er både namnet på brødet og på sandwichane som blir laga i det. Kjenneteiknet er kontrasten mellom eit lett, sprøtt brød og kraftig fyll balansert av syre, frisk koriander og chili.",
    "history": "Retten speglar kolonihistoria til Vietnam og lokal tilpassing av fransk baguette og paté til vietnamesiske smakar og råvarer. Han finst i mange regionale og personlege variantar.",
    "flavor": "Sprøtt, friskt, syrleg, salt og gjerne sterkt. Majones eller paté tilfører feitt som blir balansert av sylta grønsaker og urter.",
    "technique": "Brødet skal varmast kort slik at skorpa blir sprø utan at innmaten tørkar. Sylta grønsaker bør ha nok syre til å balansere rikt fyll.",
    "essentials": [
      "Lett baguette eller bánh mì-brød.",
      "Sylta gulrot og daikon eller reddik.",
      "Koriander, agurk og chili.",
      "Fyll som svinekjøt, kylling, paté, omelett eller tofu."
    ],
    "recipe": {
      "label": "Bánh mì med sitrongrastofu",
      "yield": "4 sandwichar",
      "time": "ca. 40 min",
      "ingredients": [
        "4 små baguettar",
        "400 g fast tofu",
        "1 stilk sitrongras, finhakka",
        "2 ss soyasaus",
        "1 ss sukker",
        "2 gulrøter",
        "150 g daikon eller reddik",
        "4 ss riseddik",
        "agurk og koriander",
        "majones og chili"
      ],
      "steps": [
        "Skjer gulrot og daikon tynt og lat dei trekkje i riseddik, litt sukker og salt.",
        "Press tofuen, skjer i skiver og mariner med sitrongras, soyasaus og litt sukker.",
        "Steik tofuen på høg varme til overflata er gyllen.",
        "Varm baguettane kort, del dei og smør med majones.",
        "Fyll med tofu, sylta grønsaker, agurk, koriander og chili og server med ein gong."
      ]
    },
    "variants": [
      "Bánh mì thịt med ulike svinekjøtprodukt.",
      "Kyllingvariant med sitrongras eller grilla kylling.",
      "Vegetarisk med tofu, sopp eller omelett."
    ],
    "serving": [
      "Blir eten fersk medan brødet framleis er sprøtt.",
      "Ekstra chili og frisk koriander gjev eit typisk løft."
    ],
    "commonMistakes": [
      "Tung, tett baguette som overdøyver fyllet.",
      "For søte sylta grønsaker utan tydeleg syre.",
      "Å fylle sandwichen lenge før servering slik at brødet blir mjukt."
    ]
  },
  "sv": {
    "overview": "Bánh mì är både namnet på brödet och på smörgåsarna som görs i det. Kännetecknet är kontrasten mellan ett lätt, frasigt bröd och smakrika fyllningar balanserade av syra, färsk koriander och chili.",
    "history": "Rätten speglar Vietnams kolonialhistoria och den lokala anpassningen av fransk baguette och paté till vietnamesiska smaker och råvaror. Den finns i många regionala och personliga varianter.",
    "flavor": "Frasigt, friskt, syrligt, salt och gärna starkt. Majonnäs eller paté tillför fett som balanseras av inlagda grönsaker och örter.",
    "technique": "Brödet ska värmas kort så att skorpan blir frasig utan att inkråmet torkar. Inlagda grönsaker bör ha tillräcklig syra för att balansera fylliga fyllningar.",
    "essentials": [
      "Lätt baguette eller bánh mì-bröd.",
      "Inlagd morot och daikon eller rädisa.",
      "Koriander, gurka och chili.",
      "Fyllning som fläskkött, kyckling, paté, omelett eller tofu."
    ],
    "recipe": {
      "label": "Bánh mì med citrongrästofu",
      "yield": "4 smörgåsar",
      "time": "ca 40 min",
      "ingredients": [
        "4 små baguetter",
        "400 g fast tofu",
        "1 stjälk citrongräs, finhackad",
        "2 msk sojasås",
        "1 msk socker",
        "2 morötter",
        "150 g daikon eller rädisa",
        "4 msk risvinäger",
        "gurka och koriander",
        "majonnäs och chili"
      ],
      "steps": [
        "Skiva morot och daikon tunt och låt dem dra i risvinäger, lite socker och salt.",
        "Pressa tofun, skär den i skivor och marinera med citrongräs, sojasås och lite socker.",
        "Stek tofun på hög värme tills ytan är gyllene.",
        "Värm baguetterna kort, dela dem och bred på majonnäs.",
        "Fyll med tofu, inlagda grönsaker, gurka, koriander och chili och servera genast."
      ]
    },
    "variants": [
      "Bánh mì thịt med olika fläskköttsprodukter.",
      "Kycklingvariant med citrongräs eller grillad kyckling.",
      "Vegetarisk med tofu, svamp eller omelett."
    ],
    "serving": [
      "Äts nygjord medan brödet fortfarande är frasigt.",
      "Extra chili och färsk koriander ger det typiska lyftet."
    ],
    "commonMistakes": [
      "Tung, kompakt baguette som överröstar fyllningen.",
      "För söta inlagda grönsaker utan tydlig syra.",
      "Att fylla smörgåsen långt före servering så att brödet blir mjukt."
    ]
  },
  "da": {
    "overview": "Bánh mì er både navnet på brødet og på de sandwich, der laves i det. Kendetegnet er kontrasten mellem et let, sprødt brød og kraftigt fyld afbalanceret af syre, frisk koriander og chili.",
    "history": "Retten afspejler Vietnams kolonihistorie og lokal tilpasning af fransk baguette og paté til vietnamesiske smage og råvarer. Den findes i mange regionale og personlige varianter.",
    "flavor": "Sprødt, friskt, syrligt, salt og gerne stærkt. Mayonnaise eller paté tilfører fedt, der afbalanceres af syltede grøntsager og urter.",
    "technique": "Brødet skal varmes kort, så skorpen bliver sprød, uden at krummen tørrer. Syltede grøntsager bør have tilstrækkelig syre til at afbalancere fyldigt fyld.",
    "essentials": [
      "Let baguette eller bánh mì-brød.",
      "Syltet gulerod og daikon eller radise.",
      "Koriander, agurk og chili.",
      "Fyld som svinekød, kylling, paté, omelet eller tofu."
    ],
    "recipe": {
      "label": "Bánh mì med citrongræstofu",
      "yield": "4 sandwich",
      "time": "ca. 40 min",
      "ingredients": [
        "4 små baguetter",
        "400 g fast tofu",
        "1 stilk citrongræs, finthakket",
        "2 spsk sojasauce",
        "1 spsk sukker",
        "2 gulerødder",
        "150 g daikon eller radise",
        "4 spsk riseddike",
        "agurk og koriander",
        "mayonnaise og chili"
      ],
      "steps": [
        "Skær gulerod og daikon tyndt, og lad dem trække i riseddike, lidt sukker og salt.",
        "Pres tofuen, skær den i skiver, og marinér med citrongræs, sojasauce og lidt sukker.",
        "Steg tofuen ved høj varme, til overfladen er gylden.",
        "Varm baguetterne kort, del dem, og smør med mayonnaise.",
        "Fyld med tofu, syltede grøntsager, agurk, koriander og chili, og servér straks."
      ]
    },
    "variants": [
      "Bánh mì thịt med forskellige svinekødsprodukter.",
      "Kyllingevariant med citrongræs eller grillet kylling.",
      "Vegetarisk med tofu, svampe eller omelet."
    ],
    "serving": [
      "Spises frisk, mens brødet stadig er sprødt.",
      "Ekstra chili og frisk koriander giver det karakteristiske løft."
    ],
    "commonMistakes": [
      "Tung, kompakt baguette, der overdøver fyldet.",
      "For søde syltede grøntsager uden tydelig syre.",
      "At fylde sandwichen længe før servering, så brødet bliver blødt."
    ]
  },
  "fi": {
    "overview": "Bánh mì tarkoittaa sekä leipää että siitä tehtyjä täytettyjä voileipiä. Tunnusomaista on kevyen, rapean leivän ja voimakkaiden täytteiden kontrasti, jota tasapainottavat hapokkuus, tuore korianteri ja chili.",
    "history": "Ruokalaji heijastaa Vietnamin siirtomaahistoriaa sekä ranskalaisen patongin ja pateen sovittamista paikallisiin makuihin ja raaka-aineisiin. Siitä on lukuisia alueellisia ja henkilökohtaisia muunnelmia.",
    "flavor": "Rapea, raikas, hapan, suolainen ja usein tulinen. Majoneesi tai patee tuo rasvaisuutta, jota pikkelöidyt kasvikset ja yrtit tasapainottavat.",
    "technique": "Leipää lämmitetään hetki, jotta kuori rapeutuu mutta sisus ei kuivu. Pikkelöityjen kasvisten tulee olla riittävän happamia tasapainottamaan täyteläisiä täytteitä.",
    "essentials": [
      "Kevyt patonki tai bánh mì -leipä.",
      "Pikkelöityä porkkanaa ja daikonia tai retiisiä.",
      "Korianteria, kurkkua ja chiliä.",
      "Täytteeksi esimerkiksi sianlihaa, kanaa, pateeta, munakasta tai tofua."
    ],
    "recipe": {
      "label": "Bánh mì sitruunaruohotofulla",
      "yield": "4 voileipää",
      "time": "n. 40 min",
      "ingredients": [
        "4 pientä patonkia",
        "400 g kiinteää tofua",
        "1 sitruunaruohon varsi, hienonnettuna",
        "2 rkl soijakastiketta",
        "1 rkl sokeria",
        "2 porkkanaa",
        "150 g daikonia tai retiisiä",
        "4 rkl riisiviinietikkaa",
        "kurkkua ja korianteria",
        "majoneesia ja chiliä"
      ],
      "steps": [
        "Leikkaa porkkana ja daikon ohuiksi ja anna niiden maustua riisiviinietikassa, pienessä määrässä sokeria ja suolaa.",
        "Purista tofusta ylimääräinen neste, viipaloi ja marinoi sitruunaruoholla, soijakastikkeella ja pienellä määrällä sokeria.",
        "Paista tofu kovalla lämmöllä, kunnes pinta on kullanruskea.",
        "Lämmitä patonkeja hetki, halkaise ne ja levitä majoneesia.",
        "Täytä tofulla, pikkelöidyillä kasviksilla, kurkulla, korianterilla ja chilillä ja tarjoile heti."
      ]
    },
    "variants": [
      "Bánh mì thịt erilaisilla sianlihatuotteilla.",
      "Kanaversio sitruunaruoholla tai grillatulla kanalla.",
      "Kasvisversio tofulla, sienillä tai munakkaalla."
    ],
    "serving": [
      "Syödään tuoreena, kun leipä on vielä rapeaa.",
      "Lisächili ja tuore korianteri antavat tunnusomaisen raikkaan säväyksen."
    ],
    "commonMistakes": [
      "Raskas ja tiivis patonki, joka peittää täytteen maun.",
      "Liian makeat pikkelöidyt kasvikset ilman selvää hapokkuutta.",
      "Voileivän täyttäminen kauan ennen tarjoilua, jolloin leipä pehmenee."
    ]
  },
  "is": {
    "overview": "Bánh mì er bæði heiti brauðsins og samlokanna sem eru gerðar úr því. Einkennið er andstæðan milli létts, stökks brauðs og bragðmikillar fyllingar sem er í jafnvægi við sýru, ferskan kóríander og chili.",
    "history": "Rétturinn endurspeglar nýlendusögu Víetnams og staðbundna aðlögun fransks baguette-brauðs og paté að víetnömskum bragði og hráefni. Hann er til í fjölmörgum svæðisbundnum og persónulegum útgáfum.",
    "flavor": "Stökkt, ferskt, súrt, salt og gjarnan sterkt. Majónes eða paté gefur fitu sem súrsað grænmeti og kryddjurtir vega upp á móti.",
    "technique": "Hitið brauðið stutt svo skorpan verði stökk án þess að brauðið þorni að innan. Súrsaða grænmetið þarf næga sýru til að vega upp á móti ríkulegri fyllingu.",
    "essentials": [
      "Létt baguette-brauð eða bánh mì-brauð.",
      "Súrsaðar gulrætur og daikon eða radísur.",
      "Kóríander, gúrka og chili.",
      "Fylling á borð við svínakjöt, kjúkling, paté, eggjaköku eða tófú."
    ],
    "recipe": {
      "label": "Bánh mì með sítrónugrasstófúi",
      "yield": "4 samlokur",
      "time": "u.þ.b. 40 mín.",
      "ingredients": [
        "4 lítil baguette-brauð",
        "400 g stíft tófú",
        "1 stöngull af sítrónugrasi, fínsaxaður",
        "2 msk. sojasósa",
        "1 msk. sykur",
        "2 gulrætur",
        "150 g daikon eða radísur",
        "4 msk. hrísgrjónaedik",
        "gúrka og kóríander",
        "majónes og chili"
      ],
      "steps": [
        "Skerið gulrætur og daikon þunnt og látið liggja í hrísgrjónaediki, dálitlum sykri og salti.",
        "Pressið vökva úr tófúinu, skerið í sneiðar og marinerið með sítrónugrasi, sojasósu og dálitlum sykri.",
        "Steikið tófúið við háan hita þar til yfirborðið er gyllt.",
        "Hitið brauðin stutt, skerið þau í sundur og smyrjið með majónesi.",
        "Fyllið með tófúi, súrsuðu grænmeti, gúrku, kóríander og chili og berið strax fram."
      ]
    },
    "variants": [
      "Bánh mì thịt með ýmsum svínakjötsafurðum.",
      "Kjúklingaútgáfa með sítrónugrasi eða grilluðum kjúklingi.",
      "Grænmetisútgáfa með tófúi, sveppum eða eggjaköku."
    ],
    "serving": [
      "Borðað nýlagað meðan brauðið er enn stökkt.",
      "Auka chili og ferskur kóríander gefa einkennandi ferskleika."
    ],
    "commonMistakes": [
      "Þungt, þétt baguette-brauð sem yfirgnæfir fyllinguna.",
      "Of sætt súrsað grænmeti án greinilegrar sýru.",
      "Að fylla samlokuna löngu fyrir framreiðslu svo brauðið verði lint."
    ]
  },
  "en": {
    "overview": "Bánh mì is both the name of the bread and of the sandwiches made with it. Its hallmark is the contrast between light, crisp bread and strongly flavoured fillings balanced by acidity, fresh coriander and chilli.",
    "history": "The dish reflects Vietnam's colonial history and the local adaptation of French baguettes and pâté to Vietnamese flavours and ingredients. It exists in a wide variety of regional and personal versions.",
    "flavor": "Crisp, fresh, tangy, salty and often hot. Mayonnaise or pâté adds richness balanced by pickles and herbs.",
    "technique": "Warm the bread briefly so the crust becomes crisp without drying out the inside. Pickles should have enough acidity to cut through rich fillings.",
    "essentials": [
      "Light baguette or bánh mì bread.",
      "Pickled carrot and daikon or radish.",
      "Coriander, cucumber and chilli.",
      "Fillings such as pork, chicken, pâté, omelette or tofu."
    ],
    "recipe": {
      "label": "Bánh mì with lemongrass tofu",
      "yield": "4 sandwiches",
      "time": "approx. 40 min",
      "ingredients": [
        "4 small baguettes",
        "400 g firm tofu",
        "1 stalk lemongrass, finely chopped",
        "2 tbsp soy sauce",
        "1 tbsp sugar",
        "2 carrots",
        "150 g daikon or radish",
        "4 tbsp rice vinegar",
        "cucumber and coriander",
        "mayonnaise and chilli"
      ],
      "steps": [
        "Thinly slice the carrot and daikon and let them steep in rice vinegar, a little sugar and salt.",
        "Press the tofu, slice it and marinate with lemongrass, soy sauce and a little sugar.",
        "Fry the tofu over high heat until the surface is golden.",
        "Briefly warm the baguettes, split them and spread with mayonnaise.",
        "Fill with tofu, pickles, cucumber, coriander and chilli and serve immediately."
      ]
    },
    "variants": [
      "Bánh mì thịt with various pork products.",
      "Chicken version with lemongrass or grilled chicken.",
      "Vegetarian with tofu, mushrooms or omelette."
    ],
    "serving": [
      "Eat freshly made while the bread is still crisp.",
      "Extra chilli and fresh coriander give the characteristic lift."
    ],
    "commonMistakes": [
      "Heavy, dense baguette that overwhelms the filling.",
      "Overly sweet pickles without distinct acidity.",
      "Filling the sandwich long before serving so that the bread becomes soft."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
