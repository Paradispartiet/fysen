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
  ],
  "katsu": [
    "Japansk panert og fritert kotelett eller filet, kjend for svært sprø pankoskorpe og saftig kjerne.",
    "Japansk panerad och friterad kotlett eller filé, känd för mycket krispig pankopanering och saftigt inre.",
    "Japansk paneret og friteret kotelet eller filet, kendt for en meget sprød pankoskorpe og saftig kerne.",
    "Japanilainen paneroitu ja uppopaistettu kotletti tai filee, joka tunnetaan rapeasta pankokuoresta ja mehukkaasta sisuksesta.",
    "Japönsk brauðhúðuð og djúpsteikt kóteletta eða flak, þekkt fyrir mjög stökka pankohúð og safaríkt innra byrði.",
    "Japanese breaded and deep-fried cutlet or fillet, known for its exceptionally crisp panko crust and juicy centre."
  ],
  "bao": [
    "Mjuke, dampa kveitebollar frå kinesiske tradisjonar, anten fylte og lukka eller opne rundt kjøt, tofu og grønsaker.",
    "Mjuka ångkokta vetebullar från kinesiska traditioner, antingen fyllda och slutna eller öppna kring kött, tofu och grönsaker.",
    "Bløde, dampede hvedeboller fra kinesiske traditioner, enten fyldte og lukkede eller åbne omkring kød, tofu og grøntsager.",
    "Kiinalaisiin perinteisiin kuuluvat pehmeät höyrytetyt vehnäsämpylät, jotka joko suljetaan täytteen ympärille tai jätetään avoimiksi liha-, tofu- ja kasvistäytteille.",
    "Mjúkar gufusoðnar hveitibollur úr kínverskum hefðum, ýmist lokaðar með fyllingu eða opnar utan um kjöt, tófú og grænmeti.",
    "Soft steamed wheat buns from Chinese traditions, either sealed around a filling or open around meat, tofu and vegetables."
  ],
  "mapo-tofu": [
    "Sichuan-rett med silkemjuk tofu i sterk, aromatisk saus med chili, fermenterte bønner og sichuanpepar.",
    "Sichuanrätt med silkesmjuk tofu i stark, aromatisk sås med chili, fermenterade bönor och sichuanpeppar.",
    "Sichuanret med silkeblød tofu i stærk, aromatisk sauce med chili, fermenterede bønner og sichuanpeber.",
    "Sichuanilainen ruokalaji, jossa silkinpehmeää tofua tarjoillaan tulisessa ja aromaattisessa chiliä, fermentoituja papuja ja sichuaninpippuria sisältävässä kastikkeessa.",
    "Réttur frá Sichuan með silkimjúku tófúi í sterkri, ilmandi sósu með chili, gerjuðum baunum og Sichuan-pipar.",
    "Sichuan dish of silky tofu in a hot, aromatic sauce with chilli, fermented beans and Sichuan pepper."
  ],
  "butter-chicken": [
    "Nordindisk kyllingrett i fyldig tomat- og smørsaus med varme krydder, kjend som murgh makhani.",
    "Nordindisk kycklingrätt i fyllig tomat- och smörsås med varma kryddor, känd som murgh makhani.",
    "Nordindisk kyllingeret i fyldig tomat- og smørsauce med varme krydderier, kendt som murgh makhani.",
    "Pohjoisintialainen kanaruoka täyteläisessä tomaatti-voikastikkeessa ja lämpimissä mausteissa, tunnetaan nimellä murgh makhani.",
    "Norður-indverskur kjúklingaréttur í ríkulegri tómat- og smjörsósu með hlýjum kryddum, þekktur sem murgh makhani.",
    "North Indian chicken dish in a rich tomato and butter sauce with warming spices, known as murgh makhani."
  ],
  "tandoori": [
    "Nordindisk tillaging der marinert kjøt eller andre råvarer blir steikte ved høg varme i ein sylindrisk tandoor.",
    "Nordindisk tillagningsmetod där marinerat kött eller andra råvaror tillagas vid hög värme i en cylindrisk tandoorugn.",
    "Nordindisk tilberedning, hvor marineret kød eller andre råvarer steges ved høj varme i en cylindrisk tandoorovn.",
    "Pohjoisintialainen valmistustapa, jossa marinoitua lihaa tai muita raaka-aineita kypsennetään korkeassa lämpötilassa lieriömäisessä tandooriuunissa.",
    "Norður-indversk eldunaraðferð þar sem marinerað kjöt eða annað hráefni er eldað við mikinn hita í sívölum tandoor-ofni.",
    "North Indian cooking method in which marinated meat or other ingredients are cooked at high heat in a cylindrical tandoor."
  ],
  "chana-masala": [
    "Krydra kikertrett frå nordindiske og punjabiske mattradisjonar, med tomat, lauk, ingefær og syrleg krydderprofil.",
    "Kryddad kikärtsrätt från nordindiska och punjabiska mattraditioner, med tomat, lök, ingefära och syrlig kryddprofil.",
    "Krydret kikærteret fra nordindiske og punjabiske madtraditioner, med tomat, løg, ingefær og syrlig krydderprofil.",
    "Pohjoisintialaisiin ja punjabilaisiin ruokaperinteisiin kuuluva mausteinen kikherneruoka, jossa on tomaattia, sipulia, inkivääriä ja hapokas maustemaailma.",
    "Kryddaður kjúklingabaunaréttur úr norður-indverskum og punjabískum matarhefðum, með tómötum, lauk, engifer og súrum kryddkeim.",
    "Spiced chickpea dish from North Indian and Punjabi culinary traditions, with tomato, onion, ginger and tangy seasoning."
  ],
  "dosa": [
    "Sørindisk, tynn og sprø pannekake av fermentert ris- og linserøre, ofte servert med sambar og chutney.",
    "Sydindisk, tunn och krispig pannkaka av fermenterad ris- och linssmet, ofta serverad med sambar och chutney.",
    "Sydindisk, tynd og sprød pandekage af fermenteret ris- og linsedej, ofte serveret med sambar og chutney.",
    "Eteläintialainen ohut ja rapea lettu fermentoidusta riisi- ja linssitaikinasta, tarjoillaan usein sambarin ja chutneyn kanssa.",
    "Suður-indversk, þunn og stökk pönnukaka úr gerjaðri hrísgrjóna- og linsubaunablöndu, oft borin fram með sambar og chutney.",
    "South Indian thin, crisp pancake made from fermented rice and lentil batter, often served with sambar and chutney."
  ],
  "cacio-e-pepe": [
    "Romersk pasta med pecorino romano og svart pepar, bunden til ein kremete saus med stivelsesrikt pastavatn.",
    "Romersk pasta med pecorino romano och svartpeppar, sammanbunden till en krämig sås med stärkelserikt pastavatten.",
    "Romersk pasta med pecorino romano og sort peber, bundet sammen til en cremet sauce med stivelsesrigt pastavand.",
    "Roomalainen pasta, jossa pecorino romano ja mustapippuri yhdistyvät tärkkelyspitoisen pastan keitinveden avulla kermaiseksi kastikkeeksi.",
    "Rómverskt pasta með pecorino romano og svörtum pipar sem mynda mjúka sósu með sterkjuríku pastavatni.",
    "Roman pasta with pecorino romano and black pepper, brought together into a creamy sauce with starchy pasta water."
  ],
  "pizza-margherita": [
    "Napolitansk pizza der fermentert deig, tomat, mozzarella, basilikum og olivenolje får svært høg varme og kort steiketid.",
    "Neapolitansk pizza där jäst deg, tomat, mozzarella, basilika och olivolja gräddas kort vid mycket hög värme.",
    "Napolitansk pizza, hvor fermenteret dej, tomat, mozzarella, basilikum og olivenolie bages kort ved meget høj varme.",
    "Napolilainen pizza, jossa kohotettu taikina, tomaatti, mozzarella, basilika ja oliiviöljy paistetaan lyhyesti hyvin korkeassa lämpötilassa.",
    "Napólísk pítsa þar sem gerjað deig, tómatar, mozzarella, basilíka og ólífuolía eru bökuð stutt við mjög mikinn hita.",
    "Neapolitan pizza in which fermented dough, tomato, mozzarella, basil and olive oil are cooked briefly at very high heat."
  ],
  "arancini": [
    "Sicilianske friterte risbollar eller riskjegler med sprø panering og fyll som ragù, ost eller grønsaker.",
    "Sicilianska friterade risbollar eller riskoner med krispig panering och fyllning som ragù, ost eller grönsaker.",
    "Sicilianske friterede risboller eller riskegler med sprød panering og fyld som ragù, ost eller grøntsager.",
    "Sisiliasta peräisin olevia uppopaistettuja riisipalloja tai -kartioita, joissa on rapea panerointi ja täytteenä esimerkiksi ragù, juusto tai kasvikset.",
    "Sikileyskar djúpsteiktar hrísgrjónakúlur eða keilur með stökkri brauðhúð og fyllingu á borð við ragù, ost eða grænmeti.",
    "Sicilian deep-fried rice balls or cones with crisp breading and fillings such as ragù, cheese or vegetables."
  ],
  "pasta-alla-norma": [
    "Siciliansk pasta med tomat, aubergine, basilikum og salta ricotta, særleg knytt til Catania.",
    "Siciliansk pasta med tomat, aubergine, basilika och saltad ricotta, särskilt förknippad med Catania.",
    "Siciliansk pasta med tomat, aubergine, basilikum og saltet ricotta, især forbundet med Catania.",
    "Sisilialainen pasta, jossa on tomaattia, munakoisoa, basilikaa ja suolattua ricottaa, yhdistetään erityisesti Cataniaan.",
    "Sikileyskt pasta með tómötum, eggaldini, basilíku og saltaðri ricotta, einkum tengt Catania.",
    "Sicilian pasta with tomato, aubergine, basil and salted ricotta, particularly associated with Catania."
  ],
  "hummus": [
    "Kremete kikert- og tahinirett frå austlege middelhavstradisjonar, smaksett med sitron, kvitlauk og olivenolje.",
    "Krämig kikärts- och tahinirätt från östra Medelhavets mattraditioner, smaksatt med citron, vitlök och olivolja.",
    "Cremet kikærte- og tahiniret fra det østlige Middelhavs madtraditioner, smagt til med citron, hvidløg og olivenolie.",
    "Itäisen Välimeren ruokaperinteisiin kuuluva kermainen kikherne- ja tahiniruoka, joka maustetaan sitruunalla, valkosipulilla ja oliiviöljyllä.",
    "Rjómakenndur kjúklingabauna- og tahiniréttur úr austanverðum Miðjarðarhafshefðum, bragðbættur með sítrónu, hvítlauk og ólífuolíu.",
    "Creamy chickpea and tahini dish from eastern Mediterranean traditions, flavoured with lemon, garlic and olive oil."
  ],
  "shawarma": [
    "Krydra kjøt frå loddrett roterande spidd, skore i tynne bitar og servert med brød, saus, salat og sylta grønsaker.",
    "Kryddat kött från ett vertikalt roterande spett, skuret i tunna bitar och serverat med bröd, sås, sallad och inlagda grönsaker.",
    "Krydret kød fra et lodret roterende spyd, skåret i tynde stykker og serveret med brød, sauce, salat og syltede grøntsager.",
    "Pystysuorassa pyörivässä vartaassa kypsennettyä maustettua lihaa, joka leikataan ohuiksi paloiksi ja tarjoillaan leivän, kastikkeen, salaatin ja pikkelöityjen kasvisten kanssa.",
    "Kryddað kjöt af lóðréttum snúnings­teini, skorið í þunna bita og borið fram með brauði, sósu, salati og súrsuðu grænmeti.",
    "Spiced meat from a vertical rotating spit, thinly sliced and served with bread, sauce, salad and pickles."
  ],
  "manakish": [
    "Levantinsk flatbrød bakt med za'atar, ost, kjøt eller anna topping, ofte ete til frukost eller som eit raskt måltid.",
    "Levantinskt flatbröd bakat med za'atar, ost, kött eller annan topping, ofta ätet till frukost eller som en snabb måltid.",
    "Levantinsk fladbrød bagt med za'atar, ost, kød eller andet fyld, ofte spist til morgenmad eller som et hurtigt måltid.",
    "Levanttilainen litteä leipä, joka paistetaan za'atarin, juuston, lihan tai muiden päällysteiden kanssa ja syödään usein aamiaiseksi tai nopeaksi ateriaksi.",
    "Flatbrauð frá Levant bakað með za'atar, osti, kjöti eða öðru áleggi, oft borðað í morgunmat eða sem fljótleg máltíð.",
    "Levantine flatbread baked with za'atar, cheese, meat or other toppings, often eaten for breakfast or as a quick meal."
  ],
  "koshari": [
    "Egyptisk kvardags- og gatemat med ris, linser, pasta og kikerter, toppa med tomatsaus, kvitlaukseddik og sprøsteikt lauk.",
    "Egyptisk vardags- och gatumat med ris, linser, pasta och kikärter, toppad med tomatsås, vitlöksvinäger och krispigt stekt lök.",
    "Egyptisk hverdags- og gademad med ris, linser, pasta og kikærter, toppet med tomatsauce, hvidløgseddike og sprødstegte løg.",
    "Egyptiläinen arki- ja katuruoka, jossa riisiä, linssejä, pastaa ja kikherneitä täydennetään tomaattikastikkeella, valkosipulietikalla ja rapeaksi paistetulla sipulilla.",
    "Egypskur hversdags- og götumatur með hrísgrjónum, linsubaunum, pasta og kjúklingabaunum, toppaður með tómatsósu, hvítlauksediki og stökkum steiktum lauk.",
    "Egyptian everyday and street food of rice, lentils, pasta and chickpeas topped with tomato sauce, garlic vinegar and crisp fried onions."
  ],
  "pide": [
    "Tyrkisk omnsbakt flatbrød, ofte båtforma og toppa med kjøt, ost, grønsaker eller egg.",
    "Turkiskt ugnsbakat flatbröd, ofta båtformat och toppat med kött, ost, grönsaker eller ägg.",
    "Tyrkisk ovnbagt fladbrød, ofte bådformet og toppet med kød, ost, grøntsager eller æg.",
    "Turkkilainen uunissa paistettu litteä leipä, usein veneen muotoinen ja päällystetty lihalla, juustolla, kasviksilla tai kananmunalla.",
    "Tyrkneskt ofnbakað flatbrauð, oft bátslaga og með kjöti, osti, grænmeti eða eggjum ofan á.",
    "Turkish oven-baked flatbread, often boat-shaped and topped with meat, cheese, vegetables or eggs."
  ],
  "birria": [
    "Jalisco-rett med langtidskokt, chilimarinert kjøt og konsentrert kraft, servert som gryte eller i tacos.",
    "Rätt från Jalisco med långkokt, chilimarinerat kött och koncentrerad buljong, serverad som gryta eller i tacos.",
    "Ret fra Jalisco med langtidskogt, chilimarineret kød og koncentreret bouillon, serveret som gryderet eller i tacos.",
    "Jaliscosta peräisin oleva ruoka, jossa on pitkään kypsennettyä chilimarinoitua lihaa ja tiivistä lientä, tarjoillaan pataruokana tai tacoissa.",
    "Réttur frá Jalisco með langelduðu, chili­marineruðu kjöti og þéttu soði, borinn fram sem pottréttur eða í taco.",
    "Dish from Jalisco featuring slow-cooked, chilli-marinated meat and concentrated broth, served as a stew or in tacos."
  ],
  "cochinita-pibil": [
    "Yucatán-rett med svinekjøt marinert i achiote og sitrus, tradisjonelt tillaga langsamt innpakka til det blir svært mørt.",
    "Rätt från Yucatán med fläskkött marinerat i achiote och citrus, traditionellt långsamt tillagat i ett omslag tills det blir mycket mört.",
    "Ret fra Yucatán med svinekød marineret i achiote og citrus, traditionelt langsomt tilberedt indpakket, til det bliver meget mørt.",
    "Yucatánista peräisin oleva ruoka, jossa achiotella ja sitruksella marinoitu sianliha kypsennetään perinteisesti hitaasti kääreessä hyvin mureaksi.",
    "Réttur frá Yucatán með svínakjöti marineruðu í achiote og sítrus, hefðbundið eldað hægt í umbúðum þar til það verður mjög meyrt.",
    "Dish from Yucatán of pork marinated in achiote and citrus, traditionally wrapped and slow-cooked until very tender."
  ],
  "pozole": [
    "Meksikansk suppe eller gryte bygd rundt nixtamalisert mais – hominy – med kjøt eller andre råvarer og eit stort utval frisk topping.",
    "Mexikansk soppa eller gryta med nixtamaliserad majs – hominy – som bas, kött eller andra råvaror och många färska tillbehör.",
    "Mexicansk suppe eller gryderet baseret på nixtamaliseret majs – hominy – med kød eller andre råvarer og et stort udvalg af friske toppings.",
    "Meksikolainen keitto tai pataruoka, jonka perustana on nixtamalisoitu maissi eli hominy, liha tai muut raaka-aineet sekä runsas valikoima tuoreita lisukkeita.",
    "Mexíkósk súpa eða pottréttur byggður á nixtamal-meðhöndluðum maís – hominy – með kjöti eða öðru hráefni og fjölbreyttu fersku meðlæti.",
    "Mexican soup or stew built around nixtamalised maize, or hominy, with meat or other ingredients and a wide variety of fresh toppings."
  ],
  "fish-taco": [
    "Baja-inspirert taco med fisk, ofte sprøpanert eller grilla, i maistortilla med kål, kremete saus, salsa og lime.",
    "Baja-inspirerad taco med fisk, ofta krispigt panerad eller grillad, i majstortilla med kål, krämig sås, salsa och lime.",
    "Baja-inspireret taco med fisk, ofte sprødpaneret eller grillet, i majstortilla med kål, cremet sauce, salsa og lime.",
    "Bajan ruokaperinteestä inspiroitunut kalataco, jossa usein rapeaksi paneroitu tai grillattu kala tarjoillaan maissitortillassa kaalin, kermaisen kastikkeen, salsan ja limen kanssa.",
    "Taco að hætti Baja með fiski, oft stökkum í brauðhúð eða grilluðum, í maístortillu með káli, rjómakenndri sósu, salsa og límónu.",
    "Baja-inspired fish taco, often crisp-battered or grilled, in a corn tortilla with cabbage, creamy sauce, salsa and lime."
  ],
  "smashburger": [
    "Burgerstil der ein laus kjøtball blir pressa hardt mot ei svært varm steikeflate for mest mogleg brun skorpe og tynne, saftige burgerar.",
    "Burgarstil där en löst formad köttboll pressas hårt mot en mycket het stekyta för maximal brynt skorpa och tunna, saftiga burgare.",
    "Burgerstil, hvor en løst formet kødbolle presses hårdt mod en meget varm stegeflade for maksimal brunet skorpe og tynde, saftige bøffer.",
    "Hampurilaistyyli, jossa löyhästi muotoiltu lihapallo painetaan voimakkaasti erittäin kuumaa paistopintaa vasten, jotta syntyy mahdollisimman ruskistunut pinta ja ohut, mehukas pihvi.",
    "Hamborgarastíll þar sem lausmótaðri kjötbollu er þrýst fast á mjög heitan steikflöt til að fá sem mesta brúna skorpu og þunna, safaríka borgara.",
    "Burger style in which a loosely formed ball of meat is pressed firmly onto a very hot cooking surface for maximum browned crust and thin, juicy patties."
  ]
};
const indexes = { nn: 0, sv: 1, da: 2, fi: 3, is: 4, en: 5 } as const;
export const translatedSummaryIds = Object.keys(summaries);
export function localizedSummary(id: string, original: string, locale: PreviewLocale): { text: string; lang: PreviewLocale } {
  const translated = locale === "nb" || !Object.hasOwn(summaries, id) ? undefined : summaries[id]?.[indexes[locale]];
  return translated ? { text: translated, lang: locale } : { text: original, lang: "nb" };
}
