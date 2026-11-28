import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const koshariTranslations = {
  "nn": {
    "overview": "Koshari er eit lagdelt måltid der rimelege basisvarer får kontrast gjennom saus og topping. Ris, linser og pasta er milde og mettande, medan krydra tomatsaus, syrleg kvitlaukseddik og mørk sprølauk gjev karakter.",
    "history": "Koshari blir rekna som ein av dei mest kjende nasjonalrettane i Egypt og er nært knytt til rimeleg gatemat og spesialiserte koshari-stader. Retten speglar òg korleis ris, linser og pasta er kombinerte i moderne egyptisk bymat.",
    "flavor": "Mettande og jordleg base med frisk tomatsyre, kvitlauk, chili og søtleg, nesten nøtteaktig sprølauk.",
    "technique": "Komponentane blir kokte separat slik at ris, linser og pasta held rett tekstur. Lauken må steikjast til han er skikkeleg sprø, og sausen må vere konsentrert nok til å krydre heile bollen.",
    "essentials": [
      "Ris, brune linser og små pastatypar.",
      "Kikerter for ekstra tekstur og protein.",
      "Krydra tomatsaus.",
      "Kvitlaukseddik og sprølauk som avgjerande topping."
    ],
    "recipe": {
      "label": "Koshari heime",
      "yield": "6 porsjonar",
      "time": "ca. 70 min",
      "ingredients": [
        "250 g ris",
        "200 g brune linser",
        "200 g små pastaformer eller makaroni",
        "1 boks kikerter",
        "4 store laukar i tynne skiver",
        "1 boks hakka tomatar",
        "4 kvitlauksfedd",
        "2 ss eddik",
        "spisskummen og chili",
        "nøytral olje"
      ],
      "steps": [
        "Kok linsene til dei er nesten møre og kok risen separat eller saman etter ønskt metode.",
        "Kok pasta al dente og varm kikertene.",
        "Steik lauken i porsjonar til han er djupgyllen og sprø og lat han renne av på rist.",
        "Kok tomat med kvitlauk, spisskummen og chili til ein konsentrert saus; bland litt kvitlauk og eddik som syrleg dressing.",
        "Bygg bollar med ris, linser, pasta og kikerter, deretter tomatsaus, eddik og rikeleg sprølauk."
      ]
    },
    "variants": [
      "Forholdet mellom ris, linser og pasta varierer frå stad til stad.",
      "Chilisaus kan serverast separat for justerbar styrke.",
      "Nokre serveringar bruker vermicelli saman med risen."
    ],
    "serving": [
      "Blir servert varmt i lag slik at sprølauken held på teksturen.",
      "Ekstra eddik- og chilisaus står ofte på bordet."
    ],
    "commonMistakes": [
      "Å koke alle stivelsesråvarene saman og få ujamn tekstur.",
      "Lauk som berre er mjuk og brun, ikkje skikkeleg sprø.",
      "For mild tomatsaus som forsvinn i den store mengda ris og pasta."
    ]
  },
  "sv": {
    "overview": "Koshari är en rätt i lager där billiga basvaror får kontrast genom sås och topping. Ris, linser och pasta är milda och mättande, medan kryddig tomatsås, syrlig vitlöksvinäger och mörk krispig lök ger karaktär.",
    "history": "Koshari räknas allmänt som en av Egyptens mest kända nationalrätter och förknippas med billig gatumat och specialiserade koshariställen. Rätten speglar också hur ris, linser och pasta kombinerats i modern egyptisk stadsmat.",
    "flavor": "Mättande och jordig bas med frisk tomatsyra, vitlök, chili och sötaktig, nästan nötig krispig lök.",
    "technique": "Komponenterna kokas separat så att ris, linser och pasta behåller rätt konsistens. Löken måste stekas ordentligt krispig och såsen vara tillräckligt koncentrerad för att smaksätta hela skålen.",
    "essentials": [
      "Ris, bruna linser och små pastasorter.",
      "Kikärter för extra konsistens och protein.",
      "Kryddig tomatsås.",
      "Vitlöksvinäger och krispig lök som avgörande topping."
    ],
    "recipe": {
      "label": "Koshari hemma",
      "yield": "6 portioner",
      "time": "ca 70 min",
      "ingredients": [
        "250 g ris",
        "200 g bruna linser",
        "200 g små pastasorter eller makaroner",
        "1 burk kikärter",
        "4 stora lökar i tunna skivor",
        "1 burk hackade tomater",
        "4 vitlöksklyftor",
        "2 msk vinäger",
        "spiskummin och chili",
        "neutral olja"
      ],
      "steps": [
        "Koka linserna tills de är nästan mjuka och koka riset separat eller tillsammans enligt önskad metod.",
        "Koka pastan al dente och värm kikärterna.",
        "Stek löken i omgångar tills den är djupt gyllene och krispig och låt rinna av på galler.",
        "Koka tomat med vitlök, spiskummin och chili till en koncentrerad sås; blanda lite vitlök och vinäger till en syrlig dressing.",
        "Bygg skålar med ris, linser, pasta och kikärter, sedan tomatsås, vinäger och rikligt med krispig lök."
      ]
    },
    "variants": [
      "Förhållandet mellan ris, linser och pasta varierar mellan olika ställen.",
      "Chilisås kan serveras separat för justerbar hetta.",
      "Vissa serveringar använder vermicelli tillsammans med riset."
    ],
    "serving": [
      "Serveras varmt i lager så att löken behåller sin krispighet.",
      "Extra vinäger- och chilisås står ofta på bordet."
    ],
    "commonMistakes": [
      "Att koka alla stärkelserika ingredienser tillsammans så att konsistensen blir ojämn.",
      "Lök som bara är mjuk och brun, inte riktigt krispig.",
      "För mild tomatsås som försvinner i mängden ris och pasta."
    ]
  },
  "da": {
    "overview": "Koshari er et måltid i lag, hvor billige basisvarer får kontrast gennem sauce og topping. Ris, linser og pasta er milde og mættende, mens krydret tomatsauce, syrlig hvidløgseddike og mørke sprøde løg giver karakter.",
    "history": "Koshari regnes som en af Egyptens mest kendte nationalretter og forbindes tæt med billig gademad og specialiserede kosharisteder. Retten afspejler også kombinationen af ris, linser og pasta i moderne egyptisk bymad.",
    "flavor": "Mættende og jordagtig base med frisk tomatsyre, hvidløg, chili og sødlige, næsten nøddeagtige sprødstegte løg.",
    "technique": "Komponenterne koges separat, så ris, linser og pasta bevarer den rette tekstur. Løgene skal steges ordentligt sprøde, og saucen skal være koncentreret nok til at krydre hele skålen.",
    "essentials": [
      "Ris, brune linser og små pastatyper.",
      "Kikærter for ekstra tekstur og protein.",
      "Krydret tomatsauce.",
      "Hvidløgseddike og sprødstegte løg som afgørende topping."
    ],
    "recipe": {
      "label": "Koshari derhjemme",
      "yield": "6 portioner",
      "time": "ca. 70 min",
      "ingredients": [
        "250 g ris",
        "200 g brune linser",
        "200 g små pastatyper eller makaroni",
        "1 dåse kikærter",
        "4 store løg i tynde skiver",
        "1 dåse hakkede tomater",
        "4 fed hvidløg",
        "2 spsk eddike",
        "spidskommen og chili",
        "neutral olie"
      ],
      "steps": [
        "Kog linserne, til de er næsten møre, og kog risene separat eller sammen efter ønsket metode.",
        "Kog pastaen al dente, og varm kikærterne.",
        "Steg løgene i portioner, til de er dybt gyldne og sprøde, og lad dem dryppe af på en rist.",
        "Kog tomat med hvidløg, spidskommen og chili til en koncentreret sauce; bland lidt hvidløg og eddike som syrlig dressing.",
        "Byg skåle med ris, linser, pasta og kikærter, derefter tomatsauce, eddike og rigeligt sprøde løg."
      ]
    },
    "variants": [
      "Forholdet mellem ris, linser og pasta varierer fra sted til sted.",
      "Chilisauce kan serveres separat, så styrken kan justeres.",
      "Nogle serveringer bruger vermicelli sammen med risene."
    ],
    "serving": [
      "Serveres varmt i lag, så løgene bevarer sprødheden.",
      "Ekstra eddike- og chilisauce står ofte på bordet."
    ],
    "commonMistakes": [
      "At koge alle stivelsesholdige ingredienser sammen og få ujævn tekstur.",
      "Løg, der blot er bløde og brune, ikke ordentligt sprøde.",
      "For mild tomatsauce, der forsvinder i mængden af ris og pasta."
    ]
  },
  "fi": {
    "overview": "Koshari on kerroksittainen ateria, jossa edulliset perusaineet saavat vastapainoa kastikkeista ja päällysteistä. Riisi, linssit ja pasta ovat mietoja ja täyttäviä, kun taas mausteinen tomaattikastike, hapan valkosipulietikka ja tumma rapea sipuli antavat luonnetta.",
    "history": "Kosharia pidetään yleisesti yhtenä Egyptin tunnetuimmista kansallisruoista, ja se liittyy edulliseen katuruokaan ja koshariin erikoistuneisiin ruokapaikkoihin. Ruoka heijastaa myös riisin, linssien ja pastan yhdistämistä modernissa egyptiläisessä kaupunkiruoassa.",
    "flavor": "Täyttävä, maanläheinen pohja, raikasta tomaatin hapokkuutta, valkosipulia, chiliä ja makeahkoa, lähes pähkinäistä rapeaa sipulia.",
    "technique": "Osat keitetään erikseen, jotta riisin, linssien ja pastan rakenne säilyy. Sipuli paistetaan kunnolla rapeaksi, ja kastikkeen tulee olla riittävän tiivistä maustamaan koko annos.",
    "essentials": [
      "Riisiä, ruskeita linssejä ja pieniä pastamuotoja.",
      "Kikherneitä lisärakenteeksi ja proteiiniksi.",
      "Mausteista tomaattikastiketta.",
      "Valkosipulietikkaa ja rapeaksi paistettua sipulia tärkeinä päällysteinä."
    ],
    "recipe": {
      "label": "Koshari kotona",
      "yield": "6 annosta",
      "time": "n. 70 min",
      "ingredients": [
        "250 g riisiä",
        "200 g ruskeita linssejä",
        "200 g pientä pastaa tai makaronia",
        "1 tölkki kikherneitä",
        "4 suurta sipulia ohuina viipaleina",
        "1 tölkki pilkottuja tomaatteja",
        "4 valkosipulinkynttä",
        "2 rkl etikkaa",
        "juustokuminaa ja chiliä",
        "neutraalin makuista öljyä"
      ],
      "steps": [
        "Keitä linssit lähes pehmeiksi ja riisi erikseen tai yhdessä linssien kanssa haluamallasi tavalla.",
        "Keitä pasta al dente ja lämmitä kikherneet.",
        "Paista sipulit erissä tumman kullanruskeiksi ja rapeiksi ja valuta ritilällä.",
        "Keitä tomaatti, valkosipuli, juustokumina ja chili tiiviiksi kastikkeeksi; sekoita hieman valkosipulia ja etikkaa happamaksi kastikkeeksi.",
        "Kokoa kulhoihin riisiä, linssejä, pastaa ja kikherneitä, sitten tomaattikastiketta, etikkaa ja runsaasti rapeaa sipulia."
      ]
    },
    "variants": [
      "Riisin, linssien ja pastan suhteet vaihtelevat eri paikoissa.",
      "Chilikastikkeen voi tarjota erikseen tulisuuden säätämiseksi.",
      "Joissakin versioissa riisin kanssa käytetään vermicellipastaa."
    ],
    "serving": [
      "Tarjoillaan lämpimänä kerroksittain, jotta sipuli säilyy rapeana.",
      "Pöydässä on usein ylimääräistä etikka- ja chilikastiketta."
    ],
    "commonMistakes": [
      "Kaikkien tärkkelyspitoisten ainesten keittäminen yhdessä, jolloin rakenne on epätasainen.",
      "Sipuli, joka jää pehmeäksi ja ruskeaksi eikä rapeutuneeksi.",
      "Liian mieto tomaattikastike, jonka maku katoaa riisin ja pastan joukkoon."
    ]
  },
  "is": {
    "overview": "Koshari er lagskipt máltíð þar sem ódýrt grunnhráefni fær andstæðu með sósu og áleggi. Hrísgrjón, linsubaunir og pasta eru mild og mettandi en krydduð tómatsósa, súrt hvítlauksedik og dökkur stökkur laukur gefa réttinum sérkenni.",
    "history": "Koshari er almennt talinn einn þekktasti þjóðarréttur Egyptalands og tengist ódýrum götumat og sérhæfðum koshari-stöðum. Rétturinn endurspeglar einnig samsetningu hrísgrjóna, linsubauna og pasta í nútíma egypskum borgarmat.",
    "flavor": "Mettandi og jarðbundinn grunnur með ferskri tómatsýru, hvítlauk, chili og sætum, næstum hnetukenndum stökkum lauk.",
    "technique": "Hráefnin eru soðin hvert í sínu lagi svo hrísgrjón, linsubaunir og pasta haldi réttri áferð. Laukurinn þarf að steikjast þar til hann er stökkur og sósan að vera nógu þétt til að krydda alla skálina.",
    "essentials": [
      "Hrísgrjón, brúnar linsubaunir og smáar pastagerðir.",
      "Kjúklingabaunir fyrir aukna áferð og prótein.",
      "Krydduð tómatsósa.",
      "Hvítlauksedik og stökkur steiktur laukur sem mikilvægt álegg."
    ],
    "recipe": {
      "label": "Koshari heima",
      "yield": "6 skammtar",
      "time": "u.þ.b. 70 mín.",
      "ingredients": [
        "250 g hrísgrjón",
        "200 g brúnar linsubaunir",
        "200 g smátt pasta eða makkarónur",
        "1 dós af kjúklingabaunum",
        "4 stórir laukar í þunnum sneiðum",
        "1 dós af söxuðum tómötum",
        "4 hvítlauksrif",
        "2 msk. edik",
        "kúmín og chili",
        "bragðlítil olía"
      ],
      "steps": [
        "Sjóðið linsubaunirnar þar til þær eru næstum mjúkar og hrísgrjónin sér eða með þeim eftir aðferð að eigin vali.",
        "Sjóðið pastað al dente og hitið kjúklingabaunirnar.",
        "Steikið laukinn í skömmtum þar til hann er dökkgylltur og stökkur og látið renna af á grind.",
        "Sjóðið tómata með hvítlauk, kúmíni og chili í þétta sósu; blandið dálitlum hvítlauk og ediki í súra dressingu.",
        "Setjið hrísgrjón, linsubaunir, pasta og kjúklingabaunir í skálar, síðan tómatsósu, edik og ríkulegan stökkan lauk."
      ]
    },
    "variants": [
      "Hlutföll hrísgrjóna, linsubauna og pasta eru breytileg eftir stöðum.",
      "Chili-sósa má vera til hliðar svo stilla megi styrkinn.",
      "Sumar útgáfur nota vermicelli með hrísgrjónunum."
    ],
    "serving": [
      "Borið fram heitt í lögum svo laukur haldi stökkri áferð.",
      "Auka edik- og chili-sósa er oft á borðinu."
    ],
    "commonMistakes": [
      "Að sjóða öll sterkjurík hráefni saman svo áferðin verði ójöfn.",
      "Laukur sem er aðeins mjúkur og brúnn en ekki stökkur.",
      "Of mild tómatsósa sem hverfur í miklu magni hrísgrjóna og pasta."
    ]
  },
  "en": {
    "overview": "Koshari is a layered meal in which inexpensive staples gain contrast from sauces and toppings. Rice, lentils and pasta are mild and filling, while spiced tomato sauce, tangy garlic vinegar and dark crispy onions provide character.",
    "history": "Koshari is widely regarded as one of Egypt's best-known national dishes, closely associated with affordable street food and specialist koshari shops. It also reflects how rice, lentils and pasta have been combined in modern Egyptian urban cooking.",
    "flavor": "A filling, earthy base with fresh tomato acidity, garlic, chilli and sweet, almost nutty crispy onions.",
    "technique": "Cook the components separately so rice, lentils and pasta retain their proper textures. Fry the onions until genuinely crisp, and concentrate the sauce enough to season the whole bowl.",
    "essentials": [
      "Rice, brown lentils and small pasta shapes.",
      "Chickpeas for extra texture and protein.",
      "Spiced tomato sauce.",
      "Garlic vinegar and crispy fried onions as essential toppings."
    ],
    "recipe": {
      "label": "Homemade koshari",
      "yield": "6 servings",
      "time": "approx. 70 min",
      "ingredients": [
        "250 g rice",
        "200 g brown lentils",
        "200 g small pasta shapes or macaroni",
        "1 tin chickpeas",
        "4 large onions, thinly sliced",
        "1 tin chopped tomatoes",
        "4 garlic cloves",
        "2 tbsp vinegar",
        "cumin and chilli",
        "neutral oil"
      ],
      "steps": [
        "Cook the lentils until almost tender and cook the rice separately or together with them according to your preferred method.",
        "Cook pasta al dente and warm the chickpeas.",
        "Fry onions in batches until deep golden and crisp and drain on a rack.",
        "Cook tomatoes with garlic, cumin and chilli into a concentrated sauce; mix a little garlic and vinegar into a tangy dressing.",
        "Layer bowls with rice, lentils, pasta and chickpeas, then tomato sauce, vinegar and plenty of crispy onions."
      ]
    },
    "variants": [
      "The ratio of rice, lentils and pasta varies between shops.",
      "Chilli sauce can be served separately for adjustable heat.",
      "Some versions use vermicelli with the rice."
    ],
    "serving": [
      "Serve warm in layers to preserve the crisp texture of the onions.",
      "Extra vinegar and chilli sauce are often available at the table."
    ],
    "commonMistakes": [
      "Cooking all the starches together and producing uneven textures.",
      "Onions that are merely soft and brown rather than crisp.",
      "Tomato sauce too mild to stand out against the quantity of rice and pasta."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
