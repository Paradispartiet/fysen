import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const shawarmaTranslations = {
  "nn": {
    "overview": "Shawarma handlar om marinering og steikeflate. På eit loddrett spidd blir det ytste laget stadig bruna medan kjøtet innanfor held seg saftig. Kokken skjer av tynne flak etter kvart som dei blir ferdige.",
    "history": "Teknikken med loddrett roterande kjøt utvikla seg i det osmanske området og fekk ulike lokale uttrykk, mellom anna shawarma, döner og seinare gyro. Shawarma er særleg utbreidd i levantinske og arabiske matkulturar.",
    "flavor": "Varmt krydra, steikt og saftig, ofte balansert av kvitlaukssaus, tahini, syrlege sylta grønsaker og friske grønsaker.",
    "technique": "Heime får ein best resultat ved å marinere tynt kjøt, steikje på høg varme i porsjonar og samle det raskt i omn eller panne utan å koke det i eiga væske.",
    "essentials": [
      "Kylling, lam eller storfe skore eller stabla for stor steikeflate.",
      "Marinade med varme krydder, syre og aromatiske ingrediensar.",
      "Flatbrød eller pita.",
      "Saus og syrleg garnityr som toum, tahini og sylta grønsaker."
    ],
    "recipe": {
      "label": "Kyllingshawarma i panne",
      "yield": "4 porsjonar",
      "time": "ca. 45 min + marinering",
      "ingredients": [
        "700 g kyllinglår i tynne strimlar",
        "2 ss yoghurt",
        "2 ss sitronsaft",
        "2 ss olivenolje",
        "3 kvitlauksfedd",
        "1 ts spisskummen",
        "1 ts paprika",
        "1/2 ts gurkemeie",
        "1/2 ts kanel eller allehande",
        "pita, salat og sylta grønsaker",
        "toum eller tahinisaus"
      ],
      "steps": [
        "Bland kyllingen med yoghurt, sitron, olje, kvitlauk og krydder og mariner minst éin time.",
        "Tørk lett av overflødig marinade slik at kjøtet kan brunast.",
        "Steik i svært varm panne i små porsjonar til kjøtet har mørke kantar og er gjennomsteikt.",
        "Lat kjøtet kvile kort og skjer eventuelt endå tynnare før ein siste rask tur i panna.",
        "Server i varmt brød med saus, salat og syrlege sylta grønsaker."
      ]
    },
    "variants": [
      "Kyllingshawarma med kvitlauksrik toum.",
      "Lam- eller storfeshawarma med tahinisaus.",
      "Tallerkenservering med ris, salat og brød ved sida av."
    ],
    "serving": [
      "Brød og kjøt bør serverast varmt medan sylta grønsaker og salat er friske og kalde.",
      "Syre og kvitlaukssaus balanserer det rike kjøtet."
    ],
    "commonMistakes": [
      "For mykje kjøt i panna slik at det kokar i staden for å brunast.",
      "For tjukk saus og for lite syrleg garnityr.",
      "Å bruke magert kjøt og steikje det for lenge."
    ]
  },
  "sv": {
    "overview": "Shawarma handlar om marinering och stekyta. På ett vertikalt spett bryns det yttersta lagret kontinuerligt medan köttet innanför förblir saftigt. Kocken skär av tunna skivor allteftersom de blir färdiga.",
    "history": "Tekniken med vertikalt roterande kött utvecklades i det osmanska området och fick lokala uttryck som shawarma, döner och senare gyro. Shawarma är särskilt utbredd i levantinska och arabiska matkulturer.",
    "flavor": "Varmt kryddad, stekt och saftig, ofta balanserad av vitlökssås, tahini, syrliga inlagda grönsaker och färska grönsaker.",
    "technique": "Hemma blir resultatet bäst när tunt kött marineras, steks hårt i omgångar och sedan snabbt samlas i ugn eller panna utan att kokas i sin egen vätska.",
    "essentials": [
      "Kyckling, lamm eller nöt, skuret eller staplat för stor stekyta.",
      "Marinad med värmande kryddor, syra och aromatiska ingredienser.",
      "Flatbröd eller pita.",
      "Sås och syrlig garnering som toum, tahini och inlagda grönsaker."
    ],
    "recipe": {
      "label": "Kycklingshawarma i stekpanna",
      "yield": "4 portioner",
      "time": "ca 45 min + marinering",
      "ingredients": [
        "700 g kycklinglår i tunna strimlor",
        "2 msk yoghurt",
        "2 msk citronsaft",
        "2 msk olivolja",
        "3 vitlöksklyftor",
        "1 tsk spiskummin",
        "1 tsk paprikapulver",
        "1/2 tsk gurkmeja",
        "1/2 tsk kanel eller kryddpeppar",
        "pita, sallad och inlagda grönsaker",
        "toum eller tahinisås"
      ],
      "steps": [
        "Blanda kycklingen med yoghurt, citron, olja, vitlök och kryddor och marinera minst en timme.",
        "Torka lätt bort överflödig marinad så att köttet kan brynas.",
        "Stek i mycket het panna i små omgångar tills köttet har mörka kanter och är genomstekt.",
        "Låt vila kort och skär eventuellt ännu tunnare före en sista snabb stekning.",
        "Servera i varmt bröd med sås, sallad och syrliga inlagda grönsaker."
      ]
    },
    "variants": [
      "Kycklingshawarma med vitlöksrik toum.",
      "Lamm- eller nötshawarma med tahinisås.",
      "Tallriksservering med ris, sallad och bröd vid sidan av."
    ],
    "serving": [
      "Bröd och kött bör serveras varma medan sallad och inlagda grönsaker är friska och kalla.",
      "Syra och vitlökssås balanserar det rika köttet."
    ],
    "commonMistakes": [
      "För mycket kött i pannan så att det kokas i stället för att brynas.",
      "För tjock sås och för lite syrlig garnering.",
      "Att använda magert kött och steka det för länge."
    ]
  },
  "da": {
    "overview": "Shawarma handler om marinering og stegeflade. På et lodret spyd brunes det yderste lag løbende, mens kødet indenfor forbliver saftigt. Kokken skærer tynde skiver af, efterhånden som de bliver færdige.",
    "history": "Teknikken med lodret roterende kød udviklede sig i det osmanniske område og fik lokale udtryk som shawarma, döner og senere gyro. Shawarma er særligt udbredt i levantinske og arabiske madkulturer.",
    "flavor": "Varmt krydret, stegt og saftigt, ofte afbalanceret af hvidløgssauce, tahin, syrlige syltede grøntsager og friske grøntsager.",
    "technique": "Hjemme opnås det bedste resultat ved at marinere tyndt kød, stege det hårdt i portioner og samle det hurtigt i ovn eller på pande uden at koge det i egen væske.",
    "essentials": [
      "Kylling, lam eller oksekød skåret eller stablet for stor stegeflade.",
      "Marinade med varmende krydderier, syre og aromatiske ingredienser.",
      "Fladbrød eller pita.",
      "Sauce og syrligt tilbehør som toum, tahin og syltede grøntsager."
    ],
    "recipe": {
      "label": "Kyllingeshawarma på pande",
      "yield": "4 portioner",
      "time": "ca. 45 min + marinering",
      "ingredients": [
        "700 g kyllingelår i tynde strimler",
        "2 spsk yoghurt",
        "2 spsk citronsaft",
        "2 spsk olivenolie",
        "3 fed hvidløg",
        "1 tsk spidskommen",
        "1 tsk paprika",
        "1/2 tsk gurkemeje",
        "1/2 tsk kanel eller allehånde",
        "pita, salat og syltede grøntsager",
        "toum eller tahinsauce"
      ],
      "steps": [
        "Bland kyllingen med yoghurt, citron, olie, hvidløg og krydderier, og marinér mindst en time.",
        "Tør let overskydende marinade af, så kødet kan brunes.",
        "Steg på en meget varm pande i små portioner, til kødet har mørke kanter og er gennemstegt.",
        "Lad kødet hvile kort, og skær det eventuelt endnu tyndere inden en sidste hurtig stegning.",
        "Servér i varmt brød med sauce, salat og syrlige syltede grøntsager."
      ]
    },
    "variants": [
      "Kyllingeshawarma med hvidløgsrig toum.",
      "Lamme- eller okseshawarma med tahinsauce.",
      "Tallerkenservering med ris, salat og brød ved siden af."
    ],
    "serving": [
      "Brød og kød bør serveres varmt, mens salat og syltede grøntsager er friske og kolde.",
      "Syre og hvidløgssauce afbalancerer det fyldige kød."
    ],
    "commonMistakes": [
      "For meget kød på panden, så det koger frem for at brune.",
      "For tyk sauce og for lidt syrligt tilbehør.",
      "At bruge magert kød og stege det for længe."
    ]
  },
  "fi": {
    "overview": "Shawarmassa korostuvat marinointi ja paistopinta. Pystysuorassa vartaassa uloin kerros ruskistuu jatkuvasti, kun sisempi liha säilyy mehukkaana. Kypsästä pinnasta leikataan ohuita siivuja.",
    "history": "Pystysuoran pyörivän lihavartaan tekniikka kehittyi osmanien alueella ja sai paikallisia muotoja, kuten shawarma, döner ja myöhemmin gyro. Shawarma on erityisen yleinen Levantin ja arabimaiden ruokakulttuureissa.",
    "flavor": "Lämpimän mausteinen, paahteinen ja mehukas, usein valkosipulikastikkeen, tahinin, happamien pikkelien ja tuoreiden kasvisten tasapainottama.",
    "technique": "Kotona paras tulos syntyy marinoimalla ohuita lihaviipaleita, paistamalla niitä kovalla lämmöllä erissä ja kokoamalla ne nopeasti pannulle tai uuniin hauduttamatta omassa nesteessään.",
    "essentials": [
      "Kanaa, lammasta tai naudanlihaa leikattuna tai pinottuna suuren paistopinnan saamiseksi.",
      "Marinadi, jossa on lämmittäviä mausteita, happoa ja aromaattisia aineksia.",
      "Litteää leipää tai pitaa.",
      "Kastiketta ja happamia lisukkeita, kuten toumia, tahinia ja pikkelöityjä kasviksia."
    ],
    "recipe": {
      "label": "Kanashawarma pannulla",
      "yield": "4 annosta",
      "time": "n. 45 min + marinointi",
      "ingredients": [
        "700 g kanan reisilihaa ohuina suikaleina",
        "2 rkl jogurttia",
        "2 rkl sitruunamehua",
        "2 rkl oliiviöljyä",
        "3 valkosipulinkynttä",
        "1 tl juustokuminaa",
        "1 tl paprikajauhetta",
        "1/2 tl kurkumaa",
        "1/2 tl kanelia tai maustepippuria",
        "pitaa, salaattia ja pikkelöityjä kasviksia",
        "toum- tai tahinikastiketta"
      ],
      "steps": [
        "Sekoita kana jogurttiin, sitruunaan, öljyyn, valkosipuliin ja mausteisiin ja marinoi vähintään tunti.",
        "Pyyhi ylimääräinen marinadi kevyesti pois, jotta liha ruskistuu.",
        "Paista erittäin kuumalla pannulla pienissä erissä, kunnes reunat ovat tummia ja liha täysin kypsää.",
        "Anna lihan levätä hetki ja leikkaa halutessasi vielä ohuemmaksi ennen viimeistä nopeaa paistoa.",
        "Tarjoile lämpimässä leivässä kastikkeen, salaatin ja happamien pikkelien kanssa."
      ]
    },
    "variants": [
      "Kanashawarma valkosipulisen toumin kanssa.",
      "Lammas- tai naudanlihaversio tahinikastikkeella.",
      "Lautasannos, jossa on riisiä, salaattia ja leipää."
    ],
    "serving": [
      "Leivän ja lihan tulee olla lämpimiä, salaatin ja pikkelien raikkaita ja kylmiä.",
      "Hapokkuus ja valkosipulikastike tasapainottavat täyteläistä lihaa."
    ],
    "commonMistakes": [
      "Liikaa lihaa pannulla, jolloin se hautuu ruskistumisen sijaan.",
      "Liian paksu kastike ja liian vähän happamia lisukkeita.",
      "Vähärasvaisen lihan liian pitkä paistaminen."
    ]
  },
  "is": {
    "overview": "Shawarma snýst um marineringu og steikt yfirborð. Á lóðréttum teini brúnast ysta lagið stöðugt en kjötið innar helst safaríkt. Matreiðslumaður sker þunnar sneiðar af eftir því sem þær eldast.",
    "history": "Aðferðin með lóðrétt snúningskjöt þróaðist á svæði Ottómanaveldisins og fékk staðbundnar gerðir, meðal annars shawarma, döner og síðar gyro. Shawarma er sérstaklega útbreidd í arabískri og levantískri matarmenningu.",
    "flavor": "Hlýtt kryddað, steikt og safaríkt, oft í jafnvægi við hvítlaukssósu, tahini, súrsað og ferskt grænmeti.",
    "technique": "Heima fæst bestur árangur með því að marinera þunnt kjöt, steikja við mikinn hita í skömmtum og sameina hratt í ofni eða á pönnu án þess að sjóða kjötið í eigin vökva.",
    "essentials": [
      "Kjúklingur, lambakjöt eða nautakjöt skorið eða staflað fyrir stórt steikingaryfirborð.",
      "Marinering með hlýjum kryddum, sýru og ilmandi hráefni.",
      "Flatbrauð eða pítubrauð.",
      "Sósa og súrt meðlæti eins og toum, tahini og súrsað grænmeti."
    ],
    "recipe": {
      "label": "Kjúklingashawarma á pönnu",
      "yield": "4 skammtar",
      "time": "u.þ.b. 45 mín. + marinering",
      "ingredients": [
        "700 g kjúklingalæri í þunnum ræmum",
        "2 msk. jógúrt",
        "2 msk. sítrónusafi",
        "2 msk. ólífuolía",
        "3 hvítlauksrif",
        "1 tsk. kúmín",
        "1 tsk. paprikuduft",
        "1/2 tsk. túrmerik",
        "1/2 tsk. kanill eða allrahanda",
        "pítubrauð, salat og súrsað grænmeti",
        "toum eða tahini-sósa"
      ],
      "steps": [
        "Blandið kjúklingnum við jógúrt, sítrónu, olíu, hvítlauk og krydd og marinerið í að minnsta kosti eina klukkustund.",
        "Þerrið umfram marineringu létt af svo kjötið brúnist.",
        "Steikið á mjög heitri pönnu í litlum skömmtum þar til kjötið hefur dökkar brúnir og er fulleldað.",
        "Látið kjötið hvíla stutt og skerið jafnvel þynnra fyrir síðustu snöggu steikingu.",
        "Berið fram í heitu brauði með sósu, salati og súrsuðu grænmeti."
      ]
    },
    "variants": [
      "Kjúklingashawarma með hvítlauksríku toum.",
      "Lamba- eða nautashawarma með tahini-sósu.",
      "Diskur með hrísgrjónum, salati og brauði til hliðar."
    ],
    "serving": [
      "Brauð og kjöt eiga að vera heit en salat og súrsað grænmeti ferskt og kalt.",
      "Sýra og hvítlaukssósa vega upp á móti ríkulegu kjötinu."
    ],
    "commonMistakes": [
      "Of mikið kjöt á pönnunni svo það sjóði í stað þess að brúnast.",
      "Of þykk sósa og of lítið súrt meðlæti.",
      "Að nota magurt kjöt og steikja of lengi."
    ]
  },
  "en": {
    "overview": "Shawarma is about both marination and searing. On a vertical spit, the outer layer browns continuously while the meat inside remains juicy; thin slices are cut off as they cook.",
    "history": "Vertical rotating meat developed in the Ottoman region and acquired local forms including shawarma, döner and later gyro. Shawarma is especially widespread in Levantine and Arab food cultures.",
    "flavor": "Warmly spiced, roasted and juicy, often balanced by garlic sauce, tahini, tangy pickles and fresh vegetables.",
    "technique": "At home, marinate thinly sliced meat, sear in batches and quickly bring it together in the oven or pan without simmering it in its own juices.",
    "essentials": [
      "Chicken, lamb or beef sliced or stacked for ample searing surface.",
      "Marinade with warming spices, acidity and aromatics.",
      "Flatbread or pita.",
      "Sauce and tangy garnishes such as toum, tahini and pickles."
    ],
    "recipe": {
      "label": "Pan-fried chicken shawarma",
      "yield": "4 servings",
      "time": "approx. 45 min + marinating",
      "ingredients": [
        "700 g chicken thighs in thin strips",
        "2 tbsp yoghurt",
        "2 tbsp lemon juice",
        "2 tbsp olive oil",
        "3 garlic cloves",
        "1 tsp cumin",
        "1 tsp paprika",
        "1/2 tsp turmeric",
        "1/2 tsp cinnamon or allspice",
        "pita, salad and pickles",
        "toum or tahini sauce"
      ],
      "steps": [
        "Mix chicken with yoghurt, lemon, oil, garlic and spices and marinate for at least one hour.",
        "Lightly wipe away excess marinade so the meat can brown.",
        "Fry in a very hot pan in small batches until the meat has dark edges and is cooked through.",
        "Rest briefly and optionally slice even thinner before a final quick sear.",
        "Serve in warm bread with sauce, salad and tangy pickles."
      ]
    },
    "variants": [
      "Chicken shawarma with garlicky toum.",
      "Lamb or beef shawarma with tahini sauce.",
      "Plated version with rice, salad and bread on the side."
    ],
    "serving": [
      "Serve bread and meat warm while pickles and salad are fresh and cold.",
      "Acidity and garlic sauce balance the rich meat."
    ],
    "commonMistakes": [
      "Crowding the pan so the meat steams rather than browns.",
      "Overly thick sauce and insufficient tangy garnish.",
      "Using lean meat and cooking it too long."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
