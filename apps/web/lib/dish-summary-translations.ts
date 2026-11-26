import type { PreviewLocale } from "./locale-messages.ts";

// Draft translations of existing editorial summaries, keyed by canonical dish ID.
const summaries: Readonly<Record<string, readonly [string, string, string, string, string, string]>> = {
  "ramen": [
    "Japansk nudelsuppe der kraft, tare, nudlar, aromatisk olje og topping blir bygde opp som eigne lag.",
    "Japansk nudelsoppa där buljong, tare, nudlar, aromatisk olja och topping byggs upp i separata lager.",
    "Japansk nudelsuppe, hvor bouillon, tare, nudler, aromatisk olie og topping bygges op i separate lag.",
    "Japanilainen nuudelikeitto, jossa liemi, tare-maustetiiviste, nuudelit, aromaattinen öljy ja täytteet muodostavat erilliset kerrokset.",
    "Japönsk núðlusúpa þar sem soð, tare-kryddgrunnur, núðlur, ilmolía og álegg mynda aðskilin lög.",
    "Japanese noodle soup built from separate layers of broth, tare, noodles, aromatic oil and toppings."
  ],
  "biryani": [
    "Aromatisk sørasiatisk risrett der basmati, krydra fyll, urter og ofte kjøt eller grønsaker møtest gjennom lagdeling og damping.",
    "Aromatisk sydasiatisk risrätt där basmati, kryddad fyllning, örter och ofta kött eller grönsaker förenas genom varvning och ångkokning.",
    "Aromatisk sydasiatisk risret, hvor basmati, krydret fyld, urter og ofte kød eller grøntsager forenes ved lagdeling og dampning.",
    "Aromaattinen eteläaasialainen riisiruoka, jossa basmatiriisi, mausteinen täyte, yrtit ja usein liha tai kasvikset kypsyvät kerroksittain höyryssä.",
    "Ilmandi suður-asískur hrísgrjónaréttur þar sem basmatihrísgrjón, krydduð fylling, jurtir og oft kjöt eða grænmeti eru lögð í lög og gufusoðin.",
    "Aromatic South Asian rice dish in which basmati, spiced filling, herbs and often meat or vegetables come together through layering and steaming."
  ],
  "falafel": [
    "Friterte bollar eller flate kaker av bløytte belgvekstar, urter og krydder, med sprø skorpe og luftig kjerne.",
    "Friterade bollar eller platta kakor av blötlagda baljväxter, örter och kryddor, med krispig yta och luftig kärna.",
    "Friterede boller eller flade kager af udblødte bælgfrugter, urter og krydderier, med sprød skorpe og luftig kerne.",
    "Liotetuista palkokasveista, yrteistä ja mausteista tehtyjä uppopaistettuja pyöryköitä tai pihvejä, joissa on rapea pinta ja ilmava sisus.",
    "Djúpsteiktar kúlur eða flatar kökur úr bleyttum belgjurtum, kryddjurtum og kryddi, með stökkri skorpu og loftkenndri miðju.",
    "Deep-fried balls or flat patties of soaked legumes, herbs and spices, with a crisp crust and airy centre."
  ],
  "carbonara": [
    "Romersk pastarett der egg, pecorino, guanciale og svart pepar blir emulgerte med pastavatn til ein blank saus.",
    "Romersk pastarätt där ägg, pecorino, guanciale och svartpeppar emulgeras med pastavatten till en blank sås.",
    "Romersk pastaret, hvor æg, pecorino, guanciale og sort peber emulgeres med pastavand til en blank sauce.",
    "Roomalainen pastaruoka, jossa munat, pecorino, guanciale ja mustapippuri yhdistetään pastan keitinveteen kiiltäväksi emulsiokastikkeeksi.",
    "Rómverskur pastaréttur þar sem egg, pecorino, guanciale og svartur pipar eru þeytt saman við pastavatn í gljáandi sósu.",
    "Roman pasta dish in which eggs, pecorino, guanciale and black pepper are emulsified with pasta water into a glossy sauce."
  ],
  "tacos-al-pastor": [
    "Sentralmeksikanske tacos med marinert svinekjøt steikt på loddrett spidd, skore tynt og servert i maistortilla med lauk og koriander.",
    "Centralmexikanska tacos med marinerat fläskkött tillagat på vertikalt spett, tunt skuret och serverat i majstortilla med lök och koriander.",
    "Centralmexicanske tacos med marineret svinekød stegt på lodret spyd, skåret tyndt og serveret i majstortilla med løg og koriander.",
    "Keski-Meksikon tacoja, joissa pystysuorassa vartaassa paistettua marinoitua sianlihaa tarjoillaan ohuina viipaleina maissitortillassa sipulin ja korianterin kanssa.",
    "Taco frá Mið-Mexíkó með marineruðu svínakjöti steiktu á lóðréttum teini, þunnt skornu og borið fram í maístortillu með lauk og kóríander.",
    "Central Mexican tacos with marinated pork cooked on a vertical spit, thinly sliced and served in corn tortillas with onion and coriander."
  ],
  "pad-thai": [
    "Thailandsk wokrett med risnudlar, søt-syrleg-salt saus, egg og topping som peanøtter, lime og bønnespirer.",
    "Thailändsk wokrätt med risnudlar, sötsyrlig och salt sås, ägg och topping som jordnötter, lime och böngroddar.",
    "Thailandsk wokret med risnudler, sød-syrlig-salt sauce, æg og topping som jordnødder, lime og bønnespirer.",
    "Thaimaalainen wokruoka, jossa on riisinuudeleita, makean hapanta ja suolaista kastiketta, kananmunaa sekä esimerkiksi maapähkinöitä, limeä ja pavunituja.",
    "Taílenskur wokréttur með hrísgrjónanúðlum, sætri, súrri og saltri sósu, eggjum og meðlæti á borð við hnetur, límónu og baunaspírur.",
    "Thai stir-fry of rice noodles, sweet-sour-salty sauce, eggs and toppings such as peanuts, lime and bean sprouts."
  ],
  "dal-makhani": [
    "Kremete dal frå Punjab med heile svarte uradbønner og raude kidneybønner. Bønnene småkokar med tomat og krydder før retten blir runda av med smør og fløyte.",
    "Krämig dal från Punjab med hela svarta uradbönor och röda kidneybönor. Bönorna får sjuda med tomat och kryddor innan rätten rundas av med smör och grädde.",
    "Cremet dal fra Punjab med hele sorte uradbønner og røde kidneybønner. Bønnerne simrer med tomat og krydderier, før retten rundes af med smør og fløde.",
    "Punjabilainen kermainen dal, jossa on kokonaisia mustia uradpapuja ja punaisia kidneypapuja. Papuja haudutetaan tomaatin ja mausteiden kanssa ja ruoka viimeistellään voilla ja kermalla.",
    "Rjómakennt dal frá Punjab með heilum svörtum urad-baunum og rauðum nýrnabaunum. Baunirnar malla með tómötum og kryddi áður en smjöri og rjóma er bætt út í.",
    "Creamy dal from Punjab with whole black urad beans and red kidney beans. The beans simmer with tomato and spices before the dish is finished with butter and cream."
  ],
  "sushi": [
    "Japansk rettfamilie bygd rundt eddiksmakssett ris, kombinert med fisk, sjømat, grønsaker eller andre ingrediensar.",
    "Japansk maträttsfamilj som bygger på vinägersmaksatt ris i kombination med fisk, skaldjur, grönsaker eller andra ingredienser.",
    "Japansk retfamilie baseret på eddikesmagssat ris kombineret med fisk, skaldyr, grøntsager eller andre ingredienser.",
    "Japanilainen ruokalajiperhe, jonka perustana on etikalla maustettu riisi yhdessä kalan, merenelävien, kasvisten tai muiden ainesten kanssa.",
    "Japönsk réttafjölskylda sem byggist á edikskrydduðum hrísgrjónum með fiski, sjávarfangi, grænmeti eða öðru hráefni.",
    "Japanese family of dishes built around vinegared rice, combined with fish, seafood, vegetables or other ingredients."
  ],
  "gyoza": [
    "Japanske dumplings med tynt deigskal og saftig fyll, ofte steikte sprø under og dampa ferdige i same panne.",
    "Japanska dumplings med tunt degskal och saftig fyllning, ofta stekta krispiga undertill och färdigångade i samma panna.",
    "Japanske dumplings med tynd dejskal og saftigt fyld, ofte stegt sprøde på undersiden og dampet færdige i samme pande.",
    "Japanilaisia täytettyjä taikinanyyttejä, joissa on ohut kuori ja mehukas täyte; usein pohja paistetaan rapeaksi ja nyytit kypsennetään höyryssä samassa pannussa.",
    "Japanskir dumplings með þunnu deigi og safaríkri fyllingu, oft steiktir stökkir að neðan og gufusoðnir í sömu pönnu.",
    "Japanese dumplings with thin wrappers and juicy filling, often pan-fried until crisp underneath and steamed to finish in the same pan."
  ],
  "tom-yum": [
    "Thailandsk suppe med sitrongras, galangal, makrutlimeblad, chili og tydeleg syre, ofte med reker eller sopp.",
    "Thailändsk soppa med citrongräs, galangal, makrutlimeblad, chili och tydlig syra, ofta med räkor eller svamp.",
    "Thailandsk suppe med citrongræs, galanga, makrutlimeblade, chili og tydelig syre, ofte med rejer eller svampe.",
    "Thaimaalainen keitto, jossa on sitruunaruohoa, galangalia, makrutlimetin lehtiä, chiliä ja selvää hapokkuutta, usein katkarapuja tai sieniä.",
    "Taílensk súpa með sítrónugrasi, galangal, makrut-límónulaufum, chili og greinilegri sýru, oft með rækjum eða sveppum.",
    "Thai soup with lemongrass, galangal, makrut lime leaves, chilli and pronounced acidity, often with prawns or mushrooms."
  ],
  "pho": [
    "Vietnamesisk nudelsuppe med klar, aromatisk kraft, risnudlar, urter og ofte storfe eller kylling.",
    "Vietnamesisk nudelsoppa med klar, aromatisk buljong, risnudlar, örter och ofta nötkött eller kyckling.",
    "Vietnamesisk nudelsuppe med klar, aromatisk bouillon, risnudler, urter og ofte oksekød eller kylling.",
    "Vietnamilainen nuudelikeitto, jossa on kirkas, aromaattinen liemi, riisinuudeleita, yrttejä ja usein naudanlihaa tai kanaa.",
    "Víetnömsk núðlusúpa með tæru, ilmandi soði, hrísgrjónanúðlum, jurtum og oft nautakjöti eða kjúklingi.",
    "Vietnamese noodle soup with clear aromatic broth, rice noodles, herbs and often beef or chicken."
  ],
  "banh-mi": [
    "Vietnamesisk baguettesandwich der sprøtt brød møter sylta grønsaker, urter, chili og ulikt kjøt- eller tofufyll.",
    "Vietnamesisk baguettesmörgås där krispigt bröd möter inlagda grönsaker, örter, chili och olika kött- eller tofufyllningar.",
    "Vietnamesisk baguettesandwich, hvor sprødt brød møder syltede grøntsager, urter, chili og forskellige kød- eller tofufyld.",
    "Vietnamilainen patonkivoileipä, jossa rapea leipä yhdistyy pikkelöityihin kasviksiin, yrtteihin, chiliin ja erilaisiin liha- tai tofutäytteisiin.",
    "Víetnömsk baguette-samloka þar sem stökkt brauð mætir súrsuðu grænmeti, kryddjurtum, chili og ýmiss konar kjöt- eða tófúfyllingu.",
    "Vietnamese baguette sandwich combining crisp bread with pickled vegetables, herbs, chilli and a variety of meat or tofu fillings."
  ]
};
const indexes = { nn: 0, sv: 1, da: 2, fi: 3, is: 4, en: 5 } as const;
export const translatedSummaryIds = Object.keys(summaries);
export function localizedSummary(id: string, original: string, locale: PreviewLocale): { text: string; lang: PreviewLocale } {
  const translated = locale === "nb" || !Object.hasOwn(summaries, id) ? undefined : summaries[id]?.[indexes[locale]];
  return translated ? { text: translated, lang: locale } : { text: original, lang: "nb" };
}
