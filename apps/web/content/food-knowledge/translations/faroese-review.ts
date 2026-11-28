import type { FoodKnowledgeArticle } from "../types.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
// Unreviewed Faroese article drafts; never imported into the runtime article registry.
export const draftFaroeseArticles = {
  "ramen": {
    "overview": "Ramen er ein bólkur av nudlusúpum, ikki ein einstøk uppskrift. Ein góð skál snýr seg um javnvágina millum fyldina í soðnum, salta og umamiríka tare-grunnin, bitið í nudlunum og angandi oljuna, sum bindur lukt og smakk saman.",
    "history": "Ramen mentist í Japan við týðiligari ávirkan frá kinesiskum hveitinudlum. Í 1900-talinum vuksu staðbundin sløg fram um alt landið, frá klárum shoyu- og shio-súpum til fyldig tonkotsu og miso.",
    "flavor": "Smakkurin kann vera lættur og saltur, djúpur og fermenteraður ella sera fyldigur. Felags er týðiligt umami og mótsetningurin millum heita súpu, fastar nudlur og omanátilfar.",
    "technique": "Ger soð, tare og angandi olju hvør sær og tillaga í skálini. Kóka nudlurnar heilt at enda; tær skulu ikki liggja í súpuni áðrenn borðreiðing.",
    "essentials": [
      "Soð av høsnarunga, svíni, sjógæti, soppi ella grønmeti.",
      "Tare – konsentreraður smakkgrunnur við sojasós, miso ella salti.",
      "Alkaliskar hveitinudlur við góðum biti.",
      "Angandi olja og omanátilfar sum egg, várleykur, nori, soppur ella kjøt."
    ],
    "recipe": {
      "label": "Heimauppskrift við íblástri frá shoyu",
      "yield": "4 portiónir",
      "time": "uml. 60 min",
      "ingredients": [
        "1,5 l høsnarunga- ella grønmetissoð",
        "30 g ingifer í flísum",
        "4 hvítleyksgeirar, lætt kroystir",
        "150 g shiitake ella annar soppur",
        "5 súpsk. sojasós",
        "1 súpsk. rísediki",
        "1 tesk. sesamolja",
        "400 g ramen- ella hveitinudlur",
        "4 egg, um ynskt",
        "várleykur, nori og omanátilfar eftir ynski"
      ],
      "steps": [
        "Lat soð, ingifer, hvítleyk og sopp standa og smákóka í 25–30 minuttir.",
        "Blanda sojasós, rísediki og sesamolju og býtið sum einfalda tare í fýra skálir.",
        "Ger omanátilfarið til reiðar og kóka møgulig egg í 6–7 minuttir, áðrenn tey verða køld skjótt.",
        "Kóka nudlurnar fyri seg beint áðrenn borðreiðing og lat vatnið renna væl frá.",
        "Stoyt heitt soð á tare, legg nudlur og omanátilfar í og smakka til, áðrenn tú møguliga saltar meira."
      ]
    },
    "variants": [
      "Shoyu: tare við sojasós og ofta klárari soð.",
      "Miso: fyldigari, fermenteraður smakkur og ofta meira fylda.",
      "Tonkotsu: emulgerað svínasoð við sera fyldigari konsistens.",
      "Shio: saltgrundað tare við løttum og reinum smakki."
    ],
    "serving": [
      "Borðreið rúkandi heitt og et beinanvegin, tá nudlurnar koma í súpuna.",
      "Omanátilfarið skal geva mótsetning, til dømis bleytt egg, feskan várleyk og broyskið nori."
    ],
    "commonMistakes": [
      "At kóka nudlurnar í sjálvum soðnum og gera súpuna stívilseríka.",
      "At salta soðið heilt, áðrenn tare verður latið í.",
      "At fylla ov nógv omanátilfar í skálina, so súpan missir javnvágina."
    ]
  },
  "biryani": {
    "overview": "Biryani er ein stórur rættabólkur við stórum økisbundnum munum. Nógv sløg byggja á hálvkókað basmatirís, konsentreraða kryddaða fyllu og ein enda við dum-mannagongd, har grýtan verður latin tætt aftur, so rís og fylla taka smakk frá hvørjum øðrum.",
    "history": "Biryani hevur eina samansetta søgu við bæði staðbundnum suðurasiatiskum og persiskt ávirkaðum matsiðum. Hyderabad, Lucknow, Kolkata og onnur støð hava ment síni egnu sløg, so ein uppskrift kann ikki umboða allan rættin.",
    "flavor": "Angandi og lagdelt heldur enn bert sterkt: kardamumma, kanel, urtir, stoktur leykur og safran kunnu liggja omaná ein djúpari kryddgrunn.",
    "technique": "Rísið skal vera lutvíst kókað áðrenn lagdeling, annars verður tað lætt greytut. Tøtt grýta og lágur hiti lata dampin gera rísið liðugt uttan harða røring.",
    "essentials": [
      "Langkornað basmatirís, skolað og ofta lagt í blot.",
      "Kryddað fylla av kjøti, fiski ella grønmeti.",
      "Stoktur leykur, urtir og heil heit krydd.",
      "Lagdeling og rólig dum-damping undir tøttum loki."
    ],
    "recipe": {
      "label": "Høsnarungabiryani heima",
      "yield": "4–5 portiónir",
      "time": "uml. 90 min",
      "ingredients": [
        "350 g basmatirís",
        "600 g høsnarungalør í bitum",
        "150 g jogurt",
        "2 stórir leykir í tunnum flísum",
        "4 hvítleyksgeirar",
        "30 g ingifer",
        "1 tesk. spískumman",
        "1 tesk. koriander",
        "1 tesk. garam masala",
        "1 kanelstong og 4 kardamummuhylki",
        "mynta og koriander",
        "safranvatn, um ynskt"
      ],
      "steps": [
        "Skola rísið væl og legg tað í blot í 20–30 minuttir.",
        "Marinera høsnarungan við jogurti, ingiferi, hvítleyki, kryddi og salti.",
        "Steik leykin djúpt gullbrúnan og tak nakað frá til omanátilfar, áðrenn høsnarungin verður stoktur í restini.",
        "Kóka rísið í saltaðum vatni, til tað er umleið 70 prosent liðugt, og stoyt vatnið frá.",
        "Legg rís, høsnarunga, urtir og stoktan leyk í løg, lat grýtuna tætt aftur og dampa á sera lágum hita í 20–25 minuttir, áðrenn tað hvílir."
      ]
    },
    "variants": [
      "Hyderabadi: sera angandi og ofta tætt knýtt at dum-mannagongd.",
      "Lucknowi/Awadhi: ofta meira varlig krydding og sera neyvt løgd løg.",
      "Kolkata: ofta mildari og kent fyri epli í nógvum sløgum.",
      "Vegetarbiryani við grønmeti, paneer ella bølgfruktum."
    ],
    "serving": [
      "Ofta borðreitt við raita, salati ella súrligum hjámeti.",
      "Loys rísið varliga við borðreiðing, so longu kornini og løgini varðveitast."
    ],
    "commonMistakes": [
      "At kóka rísið heilt liðugt áðrenn dum-stigið.",
      "Ov vát fylla, sum ger botnin greytutan.",
      "At røra hart eftir damping og knúsa rískornini."
    ]
  },
  "falafel": {
    "overview": "Falafel verður vanliga gjørt úr ókókaðum kikertum ella favabønum, sum eru lagdar í blot og malnar við urtum og angandi tilfari. Tá massin er nóg grovur og turrur, víðkast hann í frityruni og fær ein saftigan, porøsan heldur enn tættan kjarna.",
    "history": "Neyvi upprunin er umstríddur, men falafel hevur sterk søgulig sambond við Egyptaland og Levantin. Tilfar, krydding, skap og borðreiðing eru ymisk millum lond, býir og familjur.",
    "flavor": "Nøtakendur smakkur av bølgfruktum, spískumman, koriander, hvítleyki og feskum urtum, við týðiligum stoktum smakki frá friteringini.",
    "technique": "Legg turrar bølgfruktir í blot, men kóka tær vanliga ikki áðrenn maling. Massin skal líkjast grovum, slavnari molum og hvíla áðrenn hann verður formaður; ov fínt mauk gevur tætta falafel.",
    "essentials": [
      "Turrar kikertur ella favabønir, lagdar leingi í blot.",
      "Persilla, koriander, leykur og hvítleykur.",
      "Spískumman og annað økisbundið krydd.",
      "Nóg heit frityrolja, so skorpan setur seg skjótt."
    ],
    "recipe": {
      "label": "Falafel úr kikertum",
      "yield": "18–20 stk.",
      "time": "uml. 35 min + 12–18 t í blot",
      "ingredients": [
        "250 g turrar kikertur",
        "1 lítil leykur",
        "3 hvítleyksgeirar",
        "1 stór hondfull av persillu",
        "1 lítil hondfull av koriander",
        "1 tesk. spískumman",
        "1 tesk. malin koriander",
        "1/2 tesk. bakipulvur",
        "1–1,5 tesk. salt",
        "neutral olja til fritering"
      ],
      "steps": [
        "Legg kikertur í nógv kalt vatn í 12–18 tímar og turka tær væl.",
        "Mala kikertur, leyk, hvítleyk og urtir í stuttum umførum til grovar, slavnar molar.",
        "Blanda krydd, bakipulvur og salt í og lat massan hvíla í minsta lagi 20 minuttir.",
        "Forma smáar kúlur ella flatar køkur og royn eina í oljuni, áðrenn restin verður friterað.",
        "Fritera, til tær eru myrkt gullbrúnar og broysknar uttan og heitar ígjøgnum, og lat oljuna renna frá á rist."
      ]
    },
    "variants": [
      "Kikertufalafel úr Levantinum.",
      "Egyptisk ta'ameya við favabønum og ofta sera grønum urtum.",
      "Falafel við sesamfræi uttaná.",
      "Ovnbakað sløg eru eisini til, men hava annan konsistens enn friterað falafel."
    ],
    "serving": [
      "Borðreitt í pita ella sum partur av mezze við tahinisós, salati og súltaðum grønmeti.",
      "Súrligt og feskt tilhoyr er týdningarmikið mótvegis friteraðu skorpuni."
    ],
    "commonMistakes": [
      "At brúka liðugt kókaðar kikertur og fáa ein leysan ella greytutan massa.",
      "At mala massan til hummuskonsistens.",
      "Ov køld olja, sum ger falafel tungt og feitt."
    ]
  },
  "carbonara": {
    "overview": "Carbonara krevur meira tøkni enn nógv tilfar. Kremuta konsistensurin kemur frá emulgering av eggum, osti, feitti frá guanciale og stívilseríkum pastavatni – ikki frá tungari rómasós.",
    "history": "Carbonara verður serliga sett í samband við Róm og Lazio, men neyvi upprunin er umstríddur. Rætturin, sum vit kenna hann í dag, gjørdist serliga sjónligur eftir kríggið og hevur síðani fingið ein týðiligan rómverskan samleika.",
    "flavor": "Saltur, piparkendur og sera umamiríkur smakkur við søtleika og nøtakendum smakki frá stoktum guanciale og skerpuni frá pecorino romano.",
    "technique": "Hitastýring er avgerandi: eggja- og ostablandingin skal møta heitum pasta uttan beinleiðis høgan hita. Pastavatn tillagar salt, hita og emulgering.",
    "essentials": [
      "Pasta, ofta spaghetti ella rigatoni.",
      "Egg ella blanding av eggum og eyka eggjareyðum.",
      "Pecorino romano og nógv svart pipar.",
      "Guanciale, stokið til feittið bráðnar og kantarnir verða broysknir."
    ],
    "recipe": {
      "label": "Carbonara við rómverskum íblástri",
      "yield": "4 portiónir",
      "time": "uml. 30 min",
      "ingredients": [
        "400 g spaghetti ella rigatoni",
        "150 g guanciale",
        "3 egg",
        "2 eggjareyðar",
        "100 g fínt rivaður pecorino romano",
        "grovt malin svartur pipar",
        "salt til pastavatnið"
      ],
      "steps": [
        "Sker guanciale í bitar og steik varliga, til feittið er bráðnað og kjøtið gullbrúnt.",
        "Píska egg, eggjareyðar, pecorino og nógvan pipar til ein tjúkkan massa.",
        "Kóka pasta eitt sindur fastari enn al dente og goym nógv pastavatn.",
        "Vend pasta í guancialefeittinum, tak pannuna av hitanum og lat hitan falla nakrar sekund.",
        "Rør eggjamassan og smáar mongdir av pastavatni væl saman, til sósin verður glansandi og kremut, uttan at eggið verður til rørt egg."
      ]
    },
    "variants": [
      "Spaghetti carbonara – kendasta slagið.",
      "Rigatoni gevur størri flatur og hol til sós og guanciale.",
      "Lutfallið millum heil egg og eggjareyðar er ymiskt hjá kokkum."
    ],
    "serving": [
      "Borðreið beinanvegin við meira pecorino og pipari.",
      "Sósin skal vera glansandi og flótandi nokk til at leggja seg um pasta, ikki vera ein tjúkkur klumpur."
    ],
    "commonMistakes": [
      "At lata egg í á beinleiðis høgum hita.",
      "At brúka ov lítið pastavatn til emulgering.",
      "At salta pastavatnið ov nógv, tá bæði pecorino og guanciale longu eru sera salt."
    ]
  },
  "tacos-al-pastor": {
    "overview": "Al pastor sameinir meksikanskar chili- og maisvanar við loddrættari spjótsteiking, sum kom við innflytarum úr eystara Miðjarðarhavi. Kjøtið fær myrkar, karamelliseraðar kantar, meðan tað er saftigt innan.",
    "history": "Rætturin mentist í Meksiko í 1900-talinum, tá staðbundnir tacovanar møttu loddrættari spjótsteiking, skyld shawarma. Hann er serliga knýttur at Meksikobýi og miðpørtunum av landinum.",
    "flavor": "Stokið og saftigt svínakjøt við turkaðum chili, achiote, sýru og kryddi, javnað við ráum leyki, koriander og salsa. Ananas er vanligt í nógvum sløgum, men ikki øllum.",
    "technique": "Heima kanst tú eftirgera trompo við at marinera tunt skorið svínakjøt og steikja tað sera hart í umførum, áðrenn tað verður hakkað. Endamálið er nógvir brúnir kantar uttan turt kjøt.",
    "essentials": [
      "Svínakjøt í tunnum flísum.",
      "Marinada við turkaðum chili, achiote og sýru.",
      "Smáar maistortillur.",
      "Leykur, koriander, salsa og lime sum feskt tilhoyr."
    ],
    "recipe": {
      "label": "Tacos á pannu við íblástri frá al pastor",
      "yield": "12 tacos",
      "time": "uml. 45 min + marinering",
      "ingredients": [
        "700 g svínanakki í tunnum flísum",
        "2 súpsk. achiotemauk",
        "2 turkaðar guajillo-chili, lagdar í blot",
        "2 súpsk. ediki",
        "1 dl appilsindjúsi",
        "2 hvítleyksgeirar",
        "1 tesk. oregano",
        "12 smáar maistortillur",
        "leykur og koriander",
        "lime, salsa og ananas eftir ynski"
      ],
      "steps": [
        "Mala achiote, chili, ediki, appilsin, hvítleyk og krydd til eina slætta marinadu.",
        "Marinera svínakjøtið í minsta lagi tveir tímar, fegin alla náttina.",
        "Steik kjøtið á sera heitari pannu í smáum umførum, so kantarnir fáa nógvan lit.",
        "Lat kjøtið hvíla stutt og hakka í smáar bitar; steik tað møguliga skjótt eina ferð aftrat.",
        "Hita tortillurnar og fyll við kjøti, leyki, koriander, salsa, lime og møguliga ananasi."
      ]
    },
    "variants": [
      "Taquería-slag stokið á trompo.",
      "Heimaslag stokið á pannu ella undir grill.",
      "Summastaðni verður ananas frá toppinum av trompo borðreittur, aðrastaðni ikki."
    ],
    "serving": [
      "Borðreið sum smá tacos, vanliga fleiri til hvønn persón.",
      "Salsa og lime skulu hava nóg týðiligan smakk til at javna feitta kjøtið."
    ],
    "commonMistakes": [
      "Ov tjúkkir kjøtbitar uttan karamelliseraðar kantar.",
      "Ov søt marinada, sum brennur, áðrenn kjøtið er liðugt.",
      "Kaldar, turrar tortillur, sum skrædna um fylluna."
    ]
  },
  "pad-thai": {
    "overview": "Pad thai eydnast, tá nudlurnar eru elastiskar og sósin situr á teimum uttan at gera rættin vátan. Tamarind gevur høvuðssýruna, meðan fiskasós og sukur geva saltan og søtan smakk.",
    "history": "Rætturin fekk ein týðiligan tjóðskaparligan leiklut í Teilandi í 1900-talinum og er í dag millum kendastu rættir landsins uttanlands. Matstovusløg eru sera ymisk í søtleika og vali av proteini.",
    "flavor": "Søtt, súrt, salt og umamiríkt við nøtakendum smakki og feskum lime. Chili verður ofta borðreitt sum valfrí eyka styrki.",
    "technique": "Legg rísnudlurnar í blot heldur enn at kóka tær heilt lidnar frammanundan. Wokpannan skal vera heit, og sósin skal vera blandað, áðrenn steikingin byrjar.",
    "essentials": [
      "Flatar rísnudlur.",
      "Tamarind, fiskasós og sukur sum sósgrunnur.",
      "Egg, tofu, rækjur ella høsnarungi eftir slagnum.",
      "Bønasprotar, jarðnøtur, lime og fegin hvítleyksgrasleykur."
    ],
    "recipe": {
      "label": "Pad thai við tofu og rækjum",
      "yield": "4 portiónir",
      "time": "uml. 35 min",
      "ingredients": [
        "300 g flatar rísnudlur",
        "3 súpsk. tamarindkonsentrat",
        "3 súpsk. fiskasós",
        "2–3 súpsk. pálmasukur ella brúnt sukur",
        "2 egg",
        "200 g fast tofu",
        "200 g reinsaðar rækjur, um ynskt",
        "150 g bønasprotar",
        "60 g ristaðar jarðnøtur",
        "lime og várleykur"
      ],
      "steps": [
        "Legg nudlurnar í blot, til tær eru bendar, men framvegis fastar.",
        "Hita tamarind, fiskasós og sukur saman til eina javna sós.",
        "Steik tofu og møguligar rækjur skjótt í heitari wokpannu og skumpa til síðis.",
        "Lat egg í, síðani nudlur og sós, og vend skjótt, til nudlurnar eru moyrar og glansandi.",
        "Vend meginpartin av sprotunum í og borðreið við jarðnøtum, lime og várleyki."
      ]
    },
    "variants": [
      "Við rækjum, eitt vanligt matstovuslag.",
      "Við høsnarunga ella tofu.",
      "Vegetariskt við sojasós í staðin fyri fiskasós og eyka tofu."
    ],
    "serving": [
      "Borðreið við lime, jarðnøtum og chili, so gesturin sjálvur kann tillaga smakkin.",
      "Bønasprotarnir skulu framvegis vera týðiliga broysknir."
    ],
    "commonMistakes": [
      "At kóka rísnudlurnar heilt lidnar áðrenn woksteiking.",
      "Ov nógv sós, sum ger rættin søtan og klistrutan.",
      "Ov lítil ella køld panna, sum dampar heldur enn at woksteikja."
    ]
  },
  "dal-makhani": {
    "overview": "Dal makhani er ein fyldigur grýturættur úr bølgfruktum. Heilu uradbønirnar geva myrka litin og kremuta konsistensin, tá tær eru kókaðar bleytar, meðan reyðu bønirnar geva eitt sindur av biti.",
    "history": "Dal makhani hoyrir til punjabisku matmentanina í Norðurindia. Rætturin verður gjørdur bæði heima og á matstovum, har eitt fyldigt slag við smøri og róma er vanligt.",
    "flavor": "Uradbønirnar hava jarðkendan smakk, tomat gevur sýru, og smør og rómi minka um styrkina frá chili og ingiferi. Summi matstovusløg hava eisini ein lættan royksmakk.",
    "technique": "Kóka uradbønirnar, sum hava ligið í blot, heilt bleytar, áðrenn tær verða blandaðar við innkókaða tomat- og kryddgrunnin. Mosa nakrar bønir móti grýtukantinum og lat blandingina smákóka, til hon tjúknar.",
    "essentials": [
      "Heilar svartar uradbønir (sabut urad dal).",
      "Reyðar kidneybønir (rajma).",
      "Tomat, ingifer, spískumman og chili.",
      "Smør og rómi geva rættinum ta eyðkendu fyldina."
    ],
    "recipe": {
      "label": "Dal makhani við urad og rajma",
      "yield": "4 portiónir",
      "time": "uml. 1 t 30 min + blotlegging",
      "ingredients": [
        "160 g heilar svartar uradbønir, lagdar í blot um náttina",
        "120 g kókaðar reyðar kidneybønir úr dós, avdroypaðar",
        "1 lítil leykur, fínt hakkaður",
        "2 hvítleyksgeirar og 2 cm ingifer, fínt rivið",
        "250 g passeraðar tomatir",
        "1 tesk. spískummanfræ, ½ tesk. chilipulvur og ½ tesk. garam masala",
        "2 súpsk. smør, ½ dl rómi og salt"
      ],
      "steps": [
        "Skola uradbønirnar og kóka tær í nýggjum vatni, til tær eru heilt bleytar. Goym nakað av kókivatninum.",
        "Hita smørið í einari grýtu. Lat spískumman steikja stutt, steik leykin bleytan og lat hvítleyk og ingifer í.",
        "Rør tomat og chili í. Lat kóka inn til ein tjúkkan grunn.",
        "Lat uradbønir, kidneybønir og eitt sindur av kókivatni í. Mosa nakrar av bønunum og lat grýtuna smákóka í 20–30 minuttir. Rør av og á.",
        "Rør garam masala og róma í móti endanum og smakka til við salti."
      ]
    },
    "variants": [
      "Heimasløg við minni róma.",
      "Fyldigari matstovusløg við eyka smøri ella mildum royksmakki."
    ],
    "serving": [
      "Borðreið heitt við naan, roti ella rísi.",
      "Eitt sindur av róma ella feskur koriander kann brúkast omaná."
    ],
    "commonMistakes": [
      "At lata uradbønirnar í, áðrenn tær eru gjøgnumkókaðar.",
      "At lata ov nógv vatn í, so grýturætturin verður tunnur."
    ]
  },
  "sushi": {
    "overview": "Sushi snýr seg fyrst og fremst um rísið. Kryddað sushirís er grundarlagið undir nigiri, maki, chirashi og nógvum øðrum sløgum, meðan ráur fiskur bert er eitt av fleiri møguligum sløgum av omanátilfari og fyllu.",
    "history": "Sushi hevur langar søguligar røtur í varðveitslu av fiski við fermenteraðum rísi, men nútímans Edomae-sushi mentist í Edo, Tokyo í dag, sum skjót borðreiðing við feskari tilfari. Sushi í dag fevnir um bæði sera siðbundin og nútímans sløg.",
    "flavor": "Gott sushi javnar milda sýru og søtleika í rísi við salti, umami og egna smakkinum hjá tilfarinum. Hiti og konsistensur eru líka týdningarmikil sum smakkur.",
    "technique": "Skola rísið, kóka tað neyvt og vend ediksblandingina í uttan at mosa tað. Forma nigiri lætt; tað skal hanga saman, men ikki vera ov tætt.",
    "essentials": [
      "Stuttkornað japanskt rís við røttum klistri.",
      "Rísediki, sukur og salt, sum verða vend í, meðan rísið er heitt.",
      "Fiskur, sjógæti, egg ella grønmeti eftir slagnum.",
      "Nori, wasabi, sojasós og omanátilfar verða brúkt í hóskandi nøgdum."
    ],
    "recipe": {
      "label": "Einfalt maki heima",
      "yield": "4 rullur",
      "time": "uml. 50 min",
      "ingredients": [
        "300 g sushirís",
        "3,5 dl vatn",
        "4 súpsk. rísediki",
        "2 súpsk. sukur",
        "1 tesk. salt",
        "4 ørk nori",
        "avokado og agurk í stavum",
        "200 g hitaviðgjørdur laksur ella annað trygt omanátilfar",
        "sojasós og súltað ingifer"
      ],
      "steps": [
        "Skola rísið, til vatnið næstan er klárt, og lat vatnið renna frá áðrenn kóking.",
        "Kóka rísið eftir vegleiðingini á pakkanum og lat tað hvíla undir loki.",
        "Loys sukur og salt upp í rísedikinum og vend blandingina varliga í heitt rís.",
        "Být eitt tunt lag av rísi á nori, legg fyllu í eina linju og rulla fast við bambusmottu ella bakipappíri.",
        "Lat rullurnar hvíla einar tveir minuttir og sker við einum vátum, hvøssum knívi."
      ]
    },
    "variants": [
      "Nigiri: hondformað rís við omanátilfari.",
      "Maki: rís og fylla rullað í nori.",
      "Chirashi: sushirís í skál við omanátilfari býtt omaná.",
      "Temaki: hondrullað nori, formað sum ein kegli."
    ],
    "serving": [
      "Sushi er best, tá rísið ikki er ísskápakalt.",
      "Sojasós verður brúkt sum krydd, ikki sum bað; viðkvæmir bitar krevja lítið."
    ],
    "commonMistakes": [
      "Ov vátt rís, sum verður greytut.",
      "Ov nógv rís í makirulluni.",
      "At trýsta rísið ov hart saman, so konsistensurin hvørvur."
    ]
  },
  "gyoza": {
    "overview": "Gyoza verður kent aftur á mótsetninginum millum eina brúna, broyskna undirsiðu og eitt bleytt, dampað deiggj. Fyllan er ofta svínakjøt og kál, men sløg við grønmeti, høsnarunga og sjógæti eru vanlig.",
    "history": "Japanskt gyoza er nær skylt við kinesiskt jiaozi. Rætturin gjørdist útbreiddur í Japan í 1900-talinum og fekk sítt egna slag, ofta við tunnari deiggi og meira hvítleyki.",
    "flavor": "Saftig, sølt og angandi fylla møtir mildum deiggi og týðiligari steikiskorpu. Ein einføld dippsós við sojasós og ediki gevur sýru og javnvág.",
    "technique": "Klassiska pannumátin sameinir steiking og damping: fyrst litur í olju, síðani eitt sindur av vatni undir loki og at enda turrsteiking, so botnurin verður broyskin aftur.",
    "essentials": [
      "Tunn gyoza- ella dumplingørk.",
      "Fínt hakkað kál og angandi tilfar sum ingifer, hvítleykur og várleykur.",
      "Fylla úr svíni, høsnarunga, soppi ella grønmeti.",
      "Sojasós, sesamolja og rísediki til smakk og dippsós."
    ],
    "recipe": {
      "label": "Pannustokt gyoza",
      "yield": "uml. 28 stk.",
      "time": "uml. 55 min",
      "ingredients": [
        "28 gyozaørk",
        "300 g malið svínakjøt",
        "200 g fínt skorið høvdakál",
        "2 várleykir",
        "1 súpsk. rivið ingifer",
        "1 hvítleyksgeiri",
        "1,5 súpsk. sojasós",
        "1 tesk. sesamolja",
        "neutral olja",
        "1 dl vatn"
      ],
      "steps": [
        "Salta kálið lætt, lat tað standa í tíggju minuttir og kroyst ov nógvan vætu úr.",
        "Blanda kál, kjøt, várleyk, ingifer, hvítleyk, sojasós og sesamolju.",
        "Legg eina lítla skeið av fyllu á hvørt ark, væt kantin og legg tætt saman.",
        "Steik gyoza í olju, til undirsiðan er gullbrún, lat vatn í og legg lok á.",
        "Dampa, til fyllan er gjøgnumstokt, tak lokið av og lat botnin verða broysknan aftur."
      ]
    },
    "variants": [
      "Yaki gyoza: pannustokt og dampað.",
      "Sui gyoza: kókað í vatni ella soði.",
      "Age gyoza: friterað og broyskið allan vegin."
    ],
    "serving": [
      "Borðreið beint av pannuni við sojasós og rísediki.",
      "Chiliolja kann latast í dippsósina fyri meira styrki."
    ],
    "commonMistakes": [
      "Ov nógv fylla, so dumplingurin ikki kann latast tættur aftur.",
      "Vát kálfylla, sum spreingir deiggið undir steiking.",
      "At leypa seinastu turrsteikingina um og missa broyskna botnin."
    ]
  },
  "tom-yum": {
    "overview": "Tom yum er ein angandi súpa, har soðið hevur sterkan anga av urtum og sitrusfruktum. Hon skal vera hvøss og frísk heldur enn tung, eisini tá chilimauk ella mjólk verður latið í eina kremuta útgávu.",
    "history": "Tom yum er tætt knýtt at matgerð í Miðteilandi og finst í nógvum ymiskum sløgum. Tom yum goong við rækjum er kendast úti í heimi.",
    "flavor": "Súrligur, sterkur og saltur smakkur við anga av sitrus; søtan kemur heldur frá rávørunum enn frá nógvum sukri.",
    "technique": "Angandi tilfarið verður kroyst eitt sindur og fær at trekkja í soðnum, men verður vanliga ikki etið. Limesaft verður latin í móti endanum, so fríski smakkurin ikki hvørvur.",
    "essentials": [
      "Sitrongras, galangal og makrutlimebløð.",
      "Chili og fiskasós.",
      "Limesaft til fríska súrleikan.",
      "Rækjur, soppar ella annað tilfar, sum skjótt verður liðugt."
    ],
    "recipe": {
      "label": "Súpa við íblástri frá tom yum goong",
      "yield": "4 portiónir",
      "time": "uml. 30 min",
      "ingredients": [
        "1,2 l høsnarunga- ella sjógætissoð",
        "2 stelkar av sitrongrasi",
        "30 g galangal ella ingifer",
        "4 makrutlimebløð",
        "2–4 teilendsk chili",
        "250 g soppar",
        "300 g ráar rækjur",
        "2 súpsk. fiskasós",
        "3 súpsk. limesaft",
        "koriander"
      ],
      "steps": [
        "Kroyst sitrongras og galangal lætt og lat tey trekkja við limebløðum og chili í soðnum í 10 minuttir.",
        "Lat sopparnar í og kóka, til teir eru moyrir.",
        "Lat rækjurnar í og lat tær trekkja, bara til tær eru gjøgnumkókaðar.",
        "Tak grýtuna av hitanum og smakka til við fiskasós og limesaft.",
        "Borðreið beinanvegin við koriander; angandi tilfarið kann sílast frá ella verða verandi fyri angans skuld."
      ]
    },
    "variants": [
      "Tom yum goong við rækjum.",
      "Tom yum gai við høsnarunga.",
      "Nam khon: kremut útgáva við chilimauki.",
      "Klár nam sai uttan kremut tilfar."
    ],
    "serving": [
      "Borðreið rúkandi heitt sum súpu ella part av einari størri máltíð.",
      "Rís afturvið milda sterka og súrliga smakkin."
    ],
    "commonMistakes": [
      "At kóka limesaft leingi og missa fríska angan.",
      "At brúka nógv sukur til at minka um súrleikan.",
      "At kóka rækjur ella soppar ov leingi."
    ]
  },
  "pho": {
    "overview": "Phở er ein rættur, har soðið er í miðdeplinum. Klára súpan verður gjørd við ristaðum angandi tilfari og heitum kryddi, meðan rísnudlur og kjøt verða gjørd til, so súpan varðveitir fríska og reina smakkin.",
    "history": "Phở verður serliga sett í samband við Norðurvjetnam og mentist tíðliga í 1900-talinum, áðrenn ymisk staðbundin sløg tóku skap. Norðarligu sløgini hava ofta minni omanátilfar, meðan fleiri urtir og annað hjámeti kunnu fylgja við sunnanfyri.",
    "flavor": "Angandi, eitt sindur søtur og umamiríkur smakkur við stjørnuanis, kaneli og ristaðum leyki. Feskar urtir, lime og chili verða latin í eftir smakki.",
    "technique": "Reint soð krevur varliga kóking og at skúmið verður tikið av. Krydd og angandi tilfar verða ristað, áðrenn tey trekkja í soðnum; nudlurnar verða hildnar fyri seg til borðreiðing.",
    "essentials": [
      "Klárt neyta- ella høsnarungasoð.",
      "Ristaður leykur og ingifer.",
      "Stjørnuanis, kanel og annað heitt krydd.",
      "Flatar rísnudlur, urtir og feskt omanátilfar."
    ],
    "recipe": {
      "label": "Einfaldað phở gà",
      "yield": "4 portiónir",
      "time": "uml. 75 min",
      "ingredients": [
        "1,5 l gott høsnarungasoð",
        "400 g høsnarungalør",
        "1 leykur, býttur sundur",
        "50 g ingifer",
        "2 stjørnuanis",
        "1 lítil kanelstong",
        "2 súpsk. fiskasós",
        "300 g flatar rísnudlur",
        "várleykur og koriander",
        "lime og chili"
      ],
      "steps": [
        "Rista leyk og ingifer á turrari pannu, til skurðflaturnar fáa myrkar blettir.",
        "Lat soð, høsnarunga, leyk, ingifer og krydd smákóka, til høsnarungin er moyrur.",
        "Tak høsnarungan úr, síla soðið og smakka til við fiskasós.",
        "Ger rísnudlurnar til fyri seg og být tær í heitar skálir við høsnarunga í flísum.",
        "Stoyt kókandi heitt soð yvir og borðreið við urtum, lime og chili."
      ]
    },
    "variants": [
      "Phở bò við neytakjøti.",
      "Phở gà við høsnarunga.",
      "Norðarlig útgáva við einfaldari omanátilfari og lítlari søtu.",
      "Sunnarlig útgáva við fleiri urtum og spírum á borðinum."
    ],
    "serving": [
      "Lat urtir og lime í í smáum nøgdum, meðan tú etur.",
      "Soðið skal vera sera heitt, tá tað verður stoytt í skálina."
    ],
    "commonMistakes": [
      "At kóka soðið ov hart, so tað verður óklárt.",
      "At lata kryddið ráða so nógv, at súpan verður tung.",
      "At lata kókaðar rísnudlur standa leingi, so tær kleistra saman."
    ]
  },
  "banh-mi": {
    "overview": "Bánh mì er bæði navnið á breyðinum og á sandwichunum, ið verða gjørdir í tí. Tað eyðkenda er mótsetningurin millum lætt, broyskið breyð og kraftiga fyllu, javnað við súrleika, feskum koriander og chili.",
    "history": "Rætturin endurspeglar hjálandasøguna hjá Vjetnam og staðbundna tillaging av fronskum baguette og paté til vjetnamesiskan smakk og rávørur. Nógv ymisk staðbundin og persónlig sløg eru til.",
    "flavor": "Broyskið, feskt, súrligt, salt og ofta sterkt. Majonesa ella paté gevur feitt, sum súltað grønmeti og urtir javna.",
    "technique": "Hita breyðið stutt, so skorpan verður broyskin, uttan at tað torna innan. Súltaða grønmetið skal hava nóg mikið av súrleika til at javna ríka fyllu.",
    "essentials": [
      "Lætt baguette ella bánh mì-breyð.",
      "Súltaðar gularøtur og daikon ella reddikur.",
      "Koriander, agurka og chili.",
      "Fylla sum svínakjøt, høsnarungi, paté, omelett ella tofu."
    ],
    "recipe": {
      "label": "Bánh mì við tofu og sitrongrasi",
      "yield": "4 sandwichir",
      "time": "uml. 40 min",
      "ingredients": [
        "4 smá baguette",
        "400 g fast tofu",
        "1 stelkur av sitrongrasi, fínt hakkaður",
        "2 súpsk. sojasós",
        "1 súpsk. sukur",
        "2 gularøtur",
        "150 g daikon ella reddikur",
        "4 súpsk. rísediki",
        "agurka og koriander",
        "majonesa og chili"
      ],
      "steps": [
        "Sker gularøtur og daikon tunt og lat tey trekkja í rísediki, eitt sindur av sukri og salti.",
        "Trýst vætuna úr tofu, sker í flísar og marinera við sitrongrasi, sojasós og eitt sindur av sukri.",
        "Steik tofu á høgum hita, til yvirflatan er gullbrún.",
        "Hita baguette stutt, sker upp og smyr við majonesu.",
        "Fyll við tofu, súltaðum grønmeti, agurku, koriander og chili og borðreið beinanvegin."
      ]
    },
    "variants": [
      "Bánh mì thịt við ymsum svínakjøtsvørum.",
      "Útgáva við sitrongrasi og høsnarunga ella grillaðum høsnarunga.",
      "Vegetarisk útgáva við tofu, soppum ella omelett."
    ],
    "serving": [
      "Et feskt, meðan breyðið enn er broyskið.",
      "Eyka chili og feskur koriander geva smakk."
    ],
    "commonMistakes": [
      "Tungt, tætt baguette, sum køvir smakkin av fylluni.",
      "Ov søtt súltað grønmeti uttan týðiligan súrleika.",
      "At fylla breyðið leingi áðrenn borðreiðing, so tað verður bleytt."
    ]
  },
  "katsu": {
    "overview": "Katsu er eitt einfalt hugskot við stórum týdningi í japanskum gerandismati: kjøt ella annað tilfar verður vent í mjøli, eggi og panko, áðrenn tað verður friterað ella stokt. Tonkatsu við svínakjøti og chicken katsu eru kendastu sløgini.",
    "history": "Katsu mentist í møtinum millum japanska matgerð og vesturlendskt ávirkaða yōshoku frá endanum á 1800-talinum og byrjanini á 1900-talinum. Mannagongdin varð tillagað japanskum rávørum, borðsiðum og sósum.",
    "flavor": "Mildur og saftigur kjarni, meðan panko gevur turra, luftiga og broyskna skorpu. Tonkatsusós gevur søtu, súrleika og krydd.",
    "technique": "Jøvn tjúkd og rættur oljuhiti eru avgerandi. Panko skal festast uttan at verða trýst hart inn, so skorpan varðveitir luftina.",
    "essentials": [
      "Svínaflak, kotelett ella høsnarungi í javnari tjúkd.",
      "Mjøl og egg til at festa skorpu.",
      "Grovt panko til lætta og broyskna skorpu.",
      "Tonkatsusós og fínt skorið kál sum siðbundið hjámeti."
    ],
    "recipe": {
      "label": "Chicken katsu heima",
      "yield": "4 portiónir",
      "time": "uml. 35 min",
      "ingredients": [
        "4 smá høsnarungafløk",
        "salt og pipar",
        "60 g hveitimjøl",
        "2 egg",
        "120 g panko",
        "neutral olja til steiking",
        "fínt skorið kál",
        "tonkatsusós ella ein søt og súrlig brún sós"
      ],
      "steps": [
        "Banka høsnarungan varliga til javna tjúkd og krydda.",
        "Vend fyrst í mjøli, síðani í eggi og at enda í panko.",
        "Hita eitt lag av olju á miðalhøgum hita og steik fløkini gullbrún báðumegin.",
        "Kanna, at høsnarungin er gjøgnumstoktur, og lat hann hvíla stutt á rist.",
        "Sker í flísar og borðreið við káli og sós."
      ]
    },
    "variants": [
      "Tonkatsu: svínakotelett ella svínaflak.",
      "Chicken katsu: høsnarungi við somu mannagongd.",
      "Katsu curry: katsu við japanskum karri og rísi.",
      "Katsu sando: broyskið katsu í bleytum breyði."
    ],
    "serving": [
      "Verður ofta skorið í strimlar áðrenn borðreiðing.",
      "Fínt skorið kál gevur frískleika og mótsetning til friteraðu skorpuna."
    ],
    "commonMistakes": [
      "Ov lágur oljuhiti, so skorpan verður feit.",
      "Ójøvn tjúkd, sum gevur turrar kantar og ráan kjarna.",
      "At lata liðugt stokið katsu liggja flatt, so dampurin ger skorpuna bleyta."
    ]
  },
  "bao": {
    "overview": "Bao verður uttan fyri Kina brúkt sum felagsnavn á fleiri sløgum av dampaðum bollum. Baozi eru vanliga afturlatnir um eina fyllu, meðan opnu, samanlagdu bollarnir á nógvum matstovum ofta minna um gua bao.",
    "history": "Dampaðir hveitibollar hava langar siðir í Kina og finnast í nógvum staðbundnum sløgum. Nútímans matstovur uttan fyri Kina brúka ofta orðið bao breiðari enn har á staðnum.",
    "flavor": "Deiggið er milt, eitt sindur søtt og luftigt og gevur bleytan mótsetning til salta, kryddaða ella súrliga fyllu.",
    "technique": "Deiggið skal ganga væl og dampast varliga. Vatn, ið drýpur av lokinum á bollarnar, kann geva vátar blettir; lokið kann tí pakkast í eitt reint viskustykki.",
    "essentials": [
      "Hveitideiggj við geri og ofta eitt sindur av sukri.",
      "Damping heldur enn baking.",
      "Fylla við týðiligum salti, súrleika ella kryddi.",
      "Feskt tilfar sum agurka, urtir ella súltað grønmeti."
    ],
    "recipe": {
      "label": "Einfaldir samanlagdir bao",
      "yield": "10–12 stk.",
      "time": "uml. 2 tímar",
      "ingredients": [
        "350 g hveitimjøl",
        "7 g turrger",
        "2 súpsk. sukur",
        "2 dl flógvt vatn",
        "1 súpsk. neutral olja",
        "1/2 tesk. salt",
        "sesamolja til at pensla við",
        "fylla eftir ynski av tofu, svínakjøti ella soppum",
        "agurka og várleykur",
        "hoisin ella chilisós"
      ],
      "steps": [
        "Elt mjøl, ger, sukur, vatn, olju og salt til slætt deiggj og lat ganga til næstan tvífalda stødd.",
        "Být deiggið sundur, rulla til avlangar flatur og pensla lætt við olju, áðrenn tær verða lagdar saman.",
        "Lat ganga aftur í 20–30 minuttir á smáum stykkjum av bakipappíri.",
        "Dampa bollarnar í umførum, til teir eru vaksnir og gjøgnumkókaðir.",
        "Fyll beint áðrenn borðreiðing, so deiggið verður verandi bleytt og lætt."
      ]
    },
    "variants": [
      "Baozi: afturlatin bolli við fyllu inni í.",
      "Opnir bollar, ið minna um gua bao, við fyllu eftir damping.",
      "Søtir bao við bønumauki ella aðrari søtari fyllu."
    ],
    "serving": [
      "Borðreið heitar beint úr dampikurvini.",
      "Súltað grønmeti og feskar urtir javna ríka fyllu."
    ],
    "commonMistakes": [
      "At fylla ov nógv í dampikurvina, so bollarnir kleistra saman.",
      "Ov stutt tíð at ganga, so deiggið verður tætt.",
      "At lata lokið upp ferð eftir ferð undir damping og missa javnan hita."
    ]
  },
  "mapo-tofu": {
    "overview": "Mapo tofu byggir á mótsetning: bleytt tofu í einari sterkari sós við hita frá chili og tí doyvnandi, sitruslíka smakkinum av sichuanpipari. Ofta verður malið kjøt brúkt, men vegetarisk sløg kunnu gerast við soppum.",
    "history": "Rætturin verður settur í samband við Chengdu í Sichuan og er vorðin ein av kendastu rættunum úr økinum úti í heimi. Nógvar útgávur uttan fyri Kina brúka minni av fermenteraðum bønum og sichuanpipari.",
    "flavor": "Sterkur, saltur, fermenteraður og umamiríkur smakkur við eyðkendu ma-la-samansetingini av chili og doyvnandi sichuanpipari.",
    "technique": "Far varliga við tofu og ger sósina, áðrenn tofu verður vent í. Sichuanpipar verður brúktur bæði í sósini og ofta nýmalaður omaná at enda.",
    "essentials": [
      "Fast ella silkibleytt tofu, sum tolir varliga kóking.",
      "Doubanjiang – fermenterað chili- og bønumauk.",
      "Sichuanpipar til ma-la-smakkin.",
      "Soð, sojasós, angandi tilfar og eitt sindur av stívilsi til fyldina í sósini."
    ],
    "recipe": {
      "label": "Mapo tofu heima",
      "yield": "4 portiónir",
      "time": "uml. 30 min",
      "ingredients": [
        "500 g tofu í terningum",
        "200 g malið svínakjøt ella fínt hakkaðir soppar",
        "2 súpsk. doubanjiang",
        "1 tesk. kroystur sichuanpipar",
        "2 hvítleyksgeirar",
        "1 súpsk. fínt hakkað ingifer",
        "3 dl høsnarunga- ella grønmetissoð",
        "1 súpsk. sojasós",
        "1 tesk. maisstívilsi, rørt út í vatn",
        "várleykur"
      ],
      "steps": [
        "Steik kjøt ella soppar væl á heitari pannu.",
        "Lat doubanjiang, hvítleyk, ingifer og helvtina av sichuanpiparinum í og steik stutt, til tað angar.",
        "Stoyt soð og sojasós í og legg tofu varliga í sósina.",
        "Lat rættin smákóka nakrar minuttir og javna varliga við maisstívilsi í vatni.",
        "Enda við várleyki og restini av sichuanpiparinum beint áðrenn borðreiðing."
      ]
    },
    "variants": [
      "Siðbundið við malnum kjøti, ofta svína- ella neytakjøti.",
      "Vegetarisk útgáva við soppum og møguliga fermenteraðum svørtum bønum.",
      "Mildari matstovuútgávur við minni chili og sichuanpipari."
    ],
    "serving": [
      "Borðreið við dampaðum rísi, sum sýgur sterku sósina í seg.",
      "Einfalt grønt grønmeti afturvið gevur mótsetning."
    ],
    "commonMistakes": [
      "At brúka bara vanliga chilisós í staðin fyri doubanjiang.",
      "At røra hart og knúsa tofu.",
      "At kóka sichuanpipar leingi, so angin hvørvur."
    ]
  },
  "butter-chicken": {
    "overview": "Butter chicken sameinir grillaðan ella hart stoktan marineraðan høsnarunga við slættari sós úr tomat, smøri og ofta róma. Besta útgávan er ikki bara søt og kremut: súrleikin frá tomat, royksmakkurin frá høsnarunganum og angandi krydd skulu enn merkjast.",
    "history": "Rætturin verður settur í samband við Delhi og matstovuumhvørvið, ið vaks fram eftir býtið av India. Hann er tætt knýttur at høsnarunga, ið er stoktur í tandoor, og hugskotinum at venda leivdir ella liðugt grillað kjøt í ríka makhani-sós.",
    "flavor": "Fyldigur, mildliga kryddaður, við frískum tomatsmakki og smøri, ofta við bukkehornkløvara sum eyðkendum anga.",
    "technique": "Marinadan skal bæði krydda og moyra høsnarungan, meðan høgur hiti gevur honum steikiskorpu, áðrenn hann verður lagdur í sósina. Kóka sósina inn, áðrenn smør og rómi tillaga konsistensin móti endanum.",
    "essentials": [
      "Høsnarungi marineraður við jogurti, ingiferi, hvítleyki og kryddi.",
      "Tomatgrunnur, ið verður kókaður inn, til rái súrleikin er burtur.",
      "Smør og møguliga rómi til at gera smakkin mildari, ikki til at fjala kryddið.",
      "Kasuri methi ella annað angandi krydd at enda."
    ],
    "recipe": {
      "label": "Butter chicken heima",
      "yield": "4 portiónir",
      "time": "uml. 75 min + marinering",
      "ingredients": [
        "700 g høsnarungalør í bitum",
        "150 g jogurt",
        "2 súpsk. rivið ingifer og hvítleykur",
        "1 tesk. garam masala",
        "1 tesk. malin spískumman",
        "1 tesk. chilipulvur eftir smakki",
        "500 g knústar tomatir",
        "50 g smør",
        "1 dl rómi",
        "1 tesk. kasuri methi, um ynskt",
        "salt og sitrón"
      ],
      "steps": [
        "Marinera høsnarungan við jogurti, helvtini av ingiferinum og hvítleykinum og kryddi í minsta lagi 30 minuttir.",
        "Steik ella grilla høsnarungan á høgum hita í umførum, til hann fær týðiligan lit.",
        "Kóka tomatirnar við restini av angandi tilfari og kryddi, til sósin er konsentrerað og glitrandi.",
        "Rør smør og róma í, legg høsnarungan aftur í og lat hann verða gjøgnumstoknan í sósini.",
        "Smakka til við salti, sitrón og knústum kasuri methi beint áðrenn borðreiðing."
      ]
    },
    "variants": [
      "Matstovustílur við serliga slættari, sílaðari sós.",
      "Lættari útgáva við minni róma og meira tomat.",
      "Paneer ella tofu kann brúkast við sama sósugrunni í einari vegetariskari útgávu."
    ],
    "serving": [
      "Borðreið við basmatirísi, naan ella roti.",
      "Frískt salat ella súrligt súltað hjámeti javnar ríku sósina."
    ],
    "commonMistakes": [
      "At kóka ráan høsnarunga beinleiðis í sósini uttan steikiskorpu.",
      "Ov nógv sukur, so rætturin minnir um omaná.",
      "At lata róman ráða, so tomat og krydd hvørva."
    ]
  },
  "tandoori": {
    "overview": "Tandoori lýsir fyrst og fremst eina mannagongd. Tilfarið verður ofta marinerað við jogurti, súrleika og kryddi, áðrenn tað verður stokt á sera høgum hita í einum tandoor, sum gevur skjóta steiking, ristaðar kantar og saftigan kjarna.",
    "history": "Tandoorovnar hava langar siðir í Suður- og Miðasia. Tandoori chicken er serliga tætt knýtt at norðurindiskum og punjabiskum matstovumati og gjørdist ein sera sjónligur partur av nútímans indiskari matmentan í 1900-talinum.",
    "flavor": "Súrligt jogurt, angandi krydd, roykur og brendir kantar geva sterkan smakk, sum tó ikki nýtist at vera sera chiliheitur. Sitrón, leykur og chutney geva frískan mótsetning.",
    "technique": "Marinadan skal fáa tíð at virka, men yvirflatan eigur ikki at vera vát, tá tilfarið kemur á høgan hita. Heima riggar sera heitur ovnur, grill ella grillfunktión best, tá luft er kring tilfarið og tað skjótt fær lit.",
    "essentials": [
      "Jogurt, sum ber kryddið og hjálpir at moyra kjøtið.",
      "Ingifer, hvítleykur og krydd sum spískumman, koriander og garam masala.",
      "Súrleiki frá sitrón ella lime.",
      "Høgur, beinleiðis hiti, sum gevur ristaðar kantar uttan at turka kjarnan."
    ],
    "recipe": {
      "label": "Høsnarungi við íblástri frá tandoori",
      "yield": "4 portiónir",
      "time": "45 min + marinering",
      "ingredients": [
        "700 g høsnarungalør uttan bein",
        "150 g natúrligt jogurt",
        "2 súpsk. sitrónsaft",
        "3 hvítleyksgeirar, rivnir",
        "20 g ingifer, rivið",
        "1 tesk. spískumman",
        "1 tesk. malin koriander",
        "1 tesk. garam masala",
        "1 tesk. paprika ella kashmiri chili",
        "salt",
        "1 súpsk. neutral olja"
      ],
      "steps": [
        "Blanda jogurt, sitrón, ingifer, hvítleyk, krydd og salt.",
        "Vend høsnarungan í marinaduni og lat standa í minsta lagi 2 tímar, gjarna náttina yvir.",
        "Hita ovnin so nógv sum gjørligt, helst við grillfunktión ella heitum bakisteini ella stálplátu.",
        "Legg høsnarungan á rist ella plátu við rúmi ímillum og steik, til hann hevur myrkar kantar og er gjøgnumstoktur.",
        "Lat kjøtið hvíla stutt og borðreið við sitrón, leyki, koriander og chutney."
      ]
    },
    "variants": [
      "Tandoori chicken: siðbundin matstovuútgáva við høsnarunga.",
      "Paneer tikka: paneer og grønmeti stokt við líknandi marinadu og høgum hita.",
      "Fish tikka: fastari fiskur, marineraður styttri og stoktur skjótt.",
      "Tandoori-grønmeti: blómukál, soppar ella paprika hóska væl til mannagongdina."
    ],
    "serving": [
      "Borðreið gjarna við naan ella rísi, ráum leyki, sitrón og grønari chutney.",
      "Tandoori kann vera høvuðsrættur ella partur av fleiri rættum."
    ],
    "commonMistakes": [
      "Ov lágur hiti, so tilfarið kókar í marinaduni í staðin fyri at verða ristað.",
      "Ov nógv vát marinada á yvirflatuni.",
      "At brúka soltið kjøt og steikja tað ov leingi."
    ]
  },
  "chana-masala": {
    "overview": "Chana masala vísir, hvussu djúpan smakk ein einfaldur bølgfruktarrættur kann fáa. Kikertur trekkja í einari konsentreraðari masala úr leyki, tomat og kryddi, til sósin liggur tætt um tær; rætturin verður ofta endaður við súrleika og feskum urtum.",
    "history": "Rætturin finst í nógvum sløgum í Norðurindia og Pakistan og er skyldur við rættir sum chole. Kryddblandingin og hvussu turrur ella sósutur rætturin er, er ymiskt millum øki, heim og borðreiðingar.",
    "flavor": "Heitt kryddaður, jarðkendur og súrligur smakkur, við søtu frá leyki og tomat, ið eru stokt leingi. Amchur ella sitrón kann geva eyðkenda fríska smakkin at enda.",
    "technique": "Steik masala leingi nokk til at rái smakkurin av leyki og tomat hvørvur. Nakrar kikertur kunnu kroystast móti grýtukantinum til at binda sósina uttan nógv eyka feitt.",
    "essentials": [
      "Kókaðar kikertur við eitt sindur av kókivatninum.",
      "Leykur, tomat, ingifer og hvítleykur sum konsentreraður masalagrunnur.",
      "Spískumman, koriander, garam masala og chili.",
      "Súrleiki frá amchur, sitrón ella tamarindi eftir stíli."
    ],
    "recipe": {
      "label": "Chana masala",
      "yield": "4 portiónir",
      "time": "uml. 45 min",
      "ingredients": [
        "2 blikk av kikertum, skolaðar",
        "2 leykir, fínt hakkaðir",
        "3 tomatir ella 1 blikk av hakkaðum tomatum",
        "3 hvítleyksgeirar",
        "20 g ingifer",
        "1 tesk. spískummanfræ",
        "2 tesk. malin koriander",
        "1 tesk. garam masala",
        "chili og gurkumeja eftir smakki",
        "1 tesk. amchur ella sitrónsaft",
        "koriander"
      ],
      "steps": [
        "Steik spískumman í olju, til tað angar, lat leyk í og steik djúpt gullbrúnan.",
        "Lat ingifer, hvítleyk og turt krydd í og steik stutt.",
        "Lat tomatir í og kóka masala inn, til hon er tjúkk og glitrandi.",
        "Lat kikertur og eitt sindur av vatni í, lat smákóka í 15–20 minuttir og knús nakrar kikertur til at binda sósina.",
        "Enda við garam masala, súrleika og feskum koriander."
      ]
    },
    "variants": [
      "Chole í ymsum punjabiskum sløgum.",
      "Turrari chana borðreidd sum snarl ella fylla.",
      "Myrkari sløg við te, amla ella øðrum tilfari, ið gevur djúpan lit og smakk."
    ],
    "serving": [
      "Borðreið við rísi, roti, naan ella bhatura eftir stíli.",
      "Ráur leykur, sitrón og urtir geva frískan mótsetning."
    ],
    "commonMistakes": [
      "At steðga, áðrenn leykur og tomat eru væl kókað inn.",
      "Ov nógv vatn, so rætturin verður tunn kikertusúpa.",
      "At gloyma súrleikan og enda við fløtum, tungum kryddsmakki."
    ]
  },
  "dosa": {
    "overview": "Dosa fær sín serliga dám frá fermentering: rís og urad dal verða malin til slætta deiggjblanding, sum fær súrleika og anga og kann verða bæði broyskin og løtt. Dosa kann borðreiðast uttan fyllu ella við fyllu, serliga kryddaðum eplum í masala dosa.",
    "history": "Dosa hevur langar siðir í Suðurindia og finst í nógvum staðbundnum sløgum. Nútímans matstovur hava alt frá pappírstunnum paper dosa til tjúkkari, bleytari sløg ella sløg úr korni.",
    "flavor": "Mildur súrleiki, nøtakendur og ristaður smakkur við broysknari konsistens, sum verður javnað við sambar og kremutari chutney.",
    "technique": "Fermenteringin skal fáa nóg mikið av tíð. Pannan skal vera heit, men ikki so heit, at deiggið stívnar, áðrenn tað verður smurt tunt út. Lat feitt rundan um kantin aftaná.",
    "essentials": [
      "Rís og urad dal, løgd í blot hvør sær.",
      "Fermentering, ið gevur súrleika, luft og góðar steikiegindir.",
      "Fløt, væl hitað panna ella tawa.",
      "Sambar, kokoschutney og møguliga eplafylla."
    ],
    "recipe": {
      "label": "Masala dosa heima",
      "yield": "8–10 dosa",
      "time": "uml. 45 min + tíð í blot og fermentering",
      "ingredients": [
        "300 g rís",
        "100 g urad dal",
        "1/2 tesk. bukkehornkløvarafræ, um ynskt",
        "salt",
        "neutral olja ella ghee",
        "500 g kókað epli",
        "1 leykur",
        "1 tesk. sinnopfræ",
        "gurkumeja og chili",
        "karríbløð, um ynskt"
      ],
      "steps": [
        "Legg rís og urad dal í blot hvør sær í minsta lagi fýra tímar og mala við vatni til slætta deiggjblanding.",
        "Blanda og lat fermentera á lunum staði, til blandingin er luftug og lætt súrlig.",
        "Steik leyk, sinnopfræ og krydd og blanda grovt knúst epli í til turra fyllu.",
        "Stoyt deiggj á heita pannu og spjað tað skjótt í tunnar rundingar, áðrenn olja verður latin rundan um kantin.",
        "Tá dosa er broyskin og losnar frá pannuni, legg eplafyllu á, legg saman og borðreið beinanvegin."
      ]
    },
    "variants": [
      "Plain dosa uttan fyllu.",
      "Masala dosa við kryddaðum eplum.",
      "Paper dosa – eyka stór og sera tunn.",
      "Neer dosa og onnur staðbundin sløg við øðrum deiggi og mannagongdum."
    ],
    "serving": [
      "Borðreið beint av pannuni, meðan yvirflatan enn er broyskin.",
      "Sambar og chutney geva vætu, súrleika og krydd til turru, broysknu dosa."
    ],
    "commonMistakes": [
      "Ov stutt fermentering, sum gevur flatan smakk og vánaliga konsistens.",
      "Ov tjúkt deiggj, ið ikki kann smyrjast tunt út.",
      "At leggja lidnar dosa hvørja omaná aðra, so dampurin ger tær bleytar."
    ]
  },
  "cacio-e-pepe": {
    "overview": "Cacio e pepe vísir pastatøkni sera væl: við fáum rávørum mugu ostur, hiti og pastavatn virka væl saman. Sósin er ein emulsjón, ikki bara bræddur ostur omaná pasta.",
    "history": "Rætturin hoyrir heima í Róm og Lazio og verður ofta settur í samband við einfaldan hirða- og gerandismat úr turrum, haldgóðum rávørum. Nútímans matstovuútgávur leggja stóran dent á emulsjón og rætta konsistens.",
    "flavor": "Hvassur, saltur pecorino møtir angandi, heitum pipari og søtuni í hveitipasta. Smakkurin skal vera sterkur uttan at verða tungur.",
    "technique": "Osturin skal møta vætu, ið er nóg heit til at bræða hann, men ikki so heit, at eggjahvítaevnini klumpa. Fínt rivin ostur og pastavatn, ið verður rørt í so líðandi, geva stýring.",
    "essentials": [
      "Pasta við nógvum stívilsi á yvirflatuni, ofta tonnarelli ella spaghetti.",
      "Fínt rivin pecorino romano.",
      "Nýmalaður svartur pipar, lætt ristaður.",
      "Stívilseríkt pastavatn, ið bindur sósina."
    ],
    "recipe": {
      "label": "Cacio e pepe",
      "yield": "4 portiónir",
      "time": "uml. 25 min",
      "ingredients": [
        "400 g spaghetti ella tonnarelli",
        "150 g fínt rivin pecorino romano",
        "2 tesk. grovt knústur svartur pipar",
        "salt",
        "nógv pastavatn"
      ],
      "steps": [
        "Rista piparin stutt á stórari pannu, til hann angar.",
        "Kóka pasta í hóvliga saltaðum vatni og goym fleiri desilitrar av pastavatni.",
        "Rør pecorino við eitt sindur av kólnaðum pastavatni til tjúkkan, slættan krem.",
        "Vend næstan liðuga pasta við pipari og eitt sindur av pastavatni á pannuni og tak hana av hitanum.",
        "Rør ostakremin í so líðandi og tillaga við pastavatni, til sósin er glitrandi og leggur seg rundan um pasta."
      ]
    },
    "variants": [
      "Tonnarelli gevur eyka bit og stívilsi.",
      "Spaghetti er ein vanlig og løtt atkomulig útgáva.",
      "Summir kokkar mala piparin í ymiskar støddir fyri meira anga."
    ],
    "serving": [
      "Borðreið beinanvegin; sósin tjúknar skjótt, tá hon kólnar.",
      "Eyka pipar omaná skal anga, ikki køva ostin."
    ],
    "commonMistakes": [
      "At lata pecorino í ov heita pannu og fáa ostaklumpar.",
      "Ov lítið pastavatn til at halda emulsjónini flótandi.",
      "Ov nógv salt í kókivatninum saman við sera søltum osti."
    ]
  },
  "pizza-margherita": {
    "overview": "Margherita sær einføld út, men vísir góðskuna á hvørjari rávøru. Deiggið skal vera elastiskt við luftugum kanti, miðjan tunn og bleyt, tomatin frísk og osturin bræddur uttan at gera botnin vátan.",
    "history": "Pizza hevur sterkar søguligar røtur í Napoli, meðan søgan um navnið Margherita og vitjanina hjá drotningini verður søgd á ymiskan hátt. Samanrenningin av tomat, mozzarella og basilikum er vorðin heimsumfatandi ímynd av napolitanskari pizza.",
    "flavor": "Súrlig tomat, mjólkakendur mozzarella, feskt basilikum og ristað deiggj. Rávørurnar skulu bera smakkin.",
    "technique": "Nóg long fermentering mennir anga og ger deiggið lætt at strekkja. Forma við hondunum, so luftin varðveitist í kantinum, og baka so heitt og skjótt sum gjørligt heima.",
    "essentials": [
      "Gott hveitideiggj við stýrdari fermentering.",
      "Knústar tomatir við reinum smakki og hóvligari vætu.",
      "Mozzarella, ið fær at renna av áðrenn nýtslu.",
      "Basilikum, olivenolja og høgur bakihiti."
    ],
    "recipe": {
      "label": "Margherita á bakisteini ella stálplátu heima",
      "yield": "4 pizzaer",
      "time": "uml. 45 min + 8–24 t fermentering",
      "ingredients": [
        "600 g pizzamjøl ella sterkt hveitimjøl",
        "390 g vatn",
        "15 g salt",
        "2 g turrger",
        "1 blikk av góðum heilum tomatum",
        "400 g mozzarella",
        "basilikum",
        "extra virgin olivenolja"
      ],
      "steps": [
        "Blanda mjøl, vatn, ger og salt til smidligt deiggj og lat fermentera kalt ella við stovuhita eftir tíðarætlan.",
        "Být í fýra partar og lat teir fáa stovuhita, til teir eru bleytir og luftugir.",
        "Hita pizzastál ella stein á hægsta ovnhita í minsta lagi 45 minuttir.",
        "Forma deiggið við hondunum, legg eitt tunt lag av tomat og hóvliga nógv mozzarella á.",
        "Baka so skjótt sum gjørligt, til kanturin er væl brúnur, og enda við basilikum og olivenolju."
      ]
    },
    "variants": [
      "Pizza marinara uttan ost, við tomat, hvítleyki, oregano og olju.",
      "Napolitanskur stílur við bleytari miðju og luftugum cornicione.",
      "Útgáva í heimaovni á stáli við eitt sindur minni vatni í deigginum."
    ],
    "serving": [
      "Borðreið beinanvegin, meðan kanturin enn er broyskin uttan og bleytur innan.",
      "Ov nógv omanátilfar er óneyðugt; Margherita byggir á javnvágina millum fáar rávørur."
    ],
    "commonMistakes": [
      "Ov vátur mozzarella, sum ger miðjuna bleyta.",
      "At brúka bakirullu og trýsta alla luft úr kantinum.",
      "Ov køld bakiflata, so pizza torna áðrenn hon fær lit."
    ]
  },
  "arancini": {
    "overview": "Arancini gera kókað rís til gøtumat, ið kann etast við hondunum: rísið verður kølt, formað um konsentreraða fyllu, vent í panering og friterað. Kjarnin skal vera saftigur og hanga saman, meðan skorpan skal vera turr og broyskin.",
    "history": "Fyltir og friteraðir rísrættir hava langar siðir á Sisilia; skap og navn eru ymisk eftir øki, millum annað arancini og arancine. Í dag finnast tey bæði sum siðbundin gøtumatur og í nútímans matstovum.",
    "flavor": "Milt, stívilseríkt rís javnar salta fyllu, ofta úr tomat og kjøti, bræddan ost og ristaða skorpu.",
    "technique": "Rísið skal vera nóg klebrið til at halda skapinum, men ikki vátt. Fyllan skal vera tjøtt og køld, og bollarnir skulu kølast áðrenn panering og fritering.",
    "essentials": [
      "Kølt rís, gjarna kókað við soði og eitt sindur av safrani.",
      "Føst fylla sum ragù, ostur, ertrar ella soppar.",
      "Mjøl ella deiggjblanding og breyðmolar til tætta skorpu.",
      "Fritering við jøvnum hita til turra skorpu."
    ],
    "recipe": {
      "label": "Arancini við mozzarella og tomatragù",
      "yield": "10–12 stk.",
      "time": "uml. 90 min + køling",
      "ingredients": [
        "350 g risottorís",
        "9 dl soð",
        "1 lítil klípa av safrani, um ynskt",
        "40 g parmesan",
        "250 g tjúkk kjøt- ella linsuragù",
        "150 g mozzarella í terningum",
        "80 g hveitimjøl",
        "2 egg",
        "150 g breyðmolar",
        "neutral olja til fritering"
      ],
      "steps": [
        "Kóka rísið við soði, til tað er moyrt og rættiliga turt, rør parmesan í og køl heilt á einari plátu.",
        "Ansa eftir, at ragù er tjúkk og køld, og at mozzarella er væl avrunnið.",
        "Forma rís rundan um eitt sindur av ragù og mozzarella og trýst til fastar kúlur ella keilur.",
        "Vend í mjøli, eggi og breyðmolum og køl arancini í minsta lagi 20 minuttir.",
        "Fritera til javna gullbrúna skorpu og lat oljuna renna stutt av á rist áðrenn borðreiðing."
      ]
    },
    "variants": [
      "Al ragù við kjøtsós, ertrum og osti.",
      "Al burro við osti og ofta skinku ella béchamel-líkari fyllu.",
      "Vegetarisk sløg við soppum, auberginu ella spinati."
    ],
    "serving": [
      "Borðreið heit, gjarna eftir nakrar minuttir í hvíld, so fyllan setur seg.",
      "Hóska sum snarl, antipasto ella gøtumatur."
    ],
    "commonMistakes": [
      "Ov vátt rís, ið dettur sundur undir fritering.",
      "Heit ella tunn fylla, ið rennur út.",
      "Ov lágur frityrhiti, sum gevur feita skorpu."
    ]
  },
  "pasta-alla-norma": {
    "overview": "Pasta alla Norma byggir ein heilan rætt úr fáum greiðum lutum: tomatsós, stokt ella friterað aubergina, pasta, feskt basilikum og ricotta salata. Styrkin liggur í mótsetninginum millum søta tomat, kremuta auberginu og salta ostin.",
    "history": "Rætturin verður settur í samband við Catania, og navnið verður siðbundið knýtt at operuni Norma eftir Bellini, hóast upprunin til navnið verður sagdur á ymiskan hátt. Í dag er hann ein av kendastu pastarættunum á Sisilia.",
    "flavor": "Søt og súrlig tomat møtir bleytari auberginu, piparkendum basilikum og týðiliga saltari ricotta. Smakkurin skal vera konsentreraður uttan at verða tungur.",
    "technique": "Auberginan skal fáa góðan lit og missa ráa vatnsmakkin. Kóka tomatsósina inn, so hon kann leggja seg um pasta, og brúka eitt sindur av pastavatni til at binda sósina, áðrenn aubergina og ostur verða latin í.",
    "essentials": [
      "Búnar tomatir ella góðar tomatir úr blikki.",
      "Aubergina, stokt ella friterað til gullbrún og bleyt.",
      "Ricotta salata, ikki vanlig feskt ricotta.",
      "Basilikum og pasta við góðum biti."
    ],
    "recipe": {
      "label": "Pasta alla Norma heima",
      "yield": "4 portiónir",
      "time": "uml. 50 min",
      "ingredients": [
        "400 g rigatoni, maccheroni ella spaghetti",
        "2 auberginur",
        "700 g hakkaðar ella heilar tomatir úr blikki",
        "2 hvítleyksgeirar",
        "olivenolja",
        "1 tyssi av basilikum",
        "80–100 g ricotta salata",
        "salt og svartur pipar"
      ],
      "steps": [
        "Sker auberginu í flísar ella terningar, salta lætt og turka møguliga vætu av yvirflatuni.",
        "Steik auberginu í olivenolju, til hon er djúpt gullbrún og bleyt; legg til viks.",
        "Steik hvítleyk stutt, lat tomat í og lat sósina smákóka, til hon er konsentrerað.",
        "Kóka pasta al dente og goym ein kopp av pastavatni.",
        "Vend pasta í tomatsósini við eitt sindur av pastavatni, lat meginpartin av auberginuni og basilikum í.",
        "Borðreið við restini av auberginuni og nógvum rivnum ricotta salata."
      ]
    },
    "variants": [
      "Catania-stílur við maccheroni ella aðrari stuttari pasta.",
      "Summastaðni verður ovnbakað aubergina brúkt til lættari útgávu.",
      "Ricotta salata kann vera ymiskt salt og turt eftir framleiðara."
    ],
    "serving": [
      "Borðreið beinanvegin, meðan pasta glitrar av sós og osturin enn merkist væl.",
      "Einfalt grønt hjámeti er nóg mikið; rætturin stendur væl einsamallur."
    ],
    "commonMistakes": [
      "At brúka ráa ella bleika auberginu, sum gevur svampakenda konsistens.",
      "At brúka feska ricotta beinleiðis í staðin fyri ricotta salata.",
      "Ov nógv sós, so pasta svimur í tomat."
    ]
  },
  "hummus": {
    "overview": "Hummus sær einfalt út, men konsistensurin veldst um, hvussu kikertur verða kókaðar og malnar. Tahini gevur nøtakendan smakk, beiskleika og fyldu, meðan sitrón og salt skulu javna mildu kikertuna.",
    "history": "Samansetingin av kikertum og sesam hevur langar røtur í økinum, og hummus er ein týðandi partur av matmentanini í fleiri londum í Levantinum og Miðeystri. Uppruni og ognarskapur verða ofta umrødd, so neyvari er at lýsa rættin sum staðbundnan í økinum enn at geva honum ein einstakan tjóðskaparligan uppruna.",
    "flavor": "Kremutur, nøtakendur og frískur sitrussmakkur við mildum hvítleyki; olivenolja og krydd geva anga at enda.",
    "technique": "Sera moyrar kikertur og gott tahini eru týdningarmest. At píska tahini við sitrón og ísakøldum vatni, áðrenn kikertur verða latnar í, kann geva lættari og slættari konsistens.",
    "essentials": [
      "Væl kókaðar kikertur.",
      "Tahini úr sesamfræi.",
      "Sitrón, hvítleykur og salt.",
      "Olivenolja og omanátilfar sum paprika, spískumman ella heilar kikertur."
    ],
    "recipe": {
      "label": "Serliga kremutur hummus",
      "yield": "1 stór skál",
      "time": "uml. 20 min",
      "ingredients": [
        "500 g sera moyrar kókaðar kikertur",
        "120 g tahini",
        "1 stór sitrón",
        "1–2 hvítleyksgeirar",
        "1 tesk. salt",
        "0,5–1 dl ísakalt vatn",
        "2 súpsk. olivenolja",
        "paprika ella spískumman omaná"
      ],
      "steps": [
        "Mala tahini, sitrón, hvítleyk og salt í nakrar sekundir, til blandingin tjúknar.",
        "Lat ísakalt vatn í eitt sindur í senn, til tahini verður ljóst og luftugt.",
        "Lat heitar ella stovuheitar, sera moyrar kikertur í og mala leingi, til blandingin er heilt sløtt.",
        "Tillaga við vatni, sitrón og salti, til konsistensurin er bleytur og smakkurin í javnvág.",
        "Legg í grunna skál og enda við olivenolju og kryddi eftir ynski."
      ]
    },
    "variants": [
      "Hummus við eyka tahini og sera slættari konsistens.",
      "Omanátilfar av kryddaðum kjøti, soppum ella heilum kikertum.",
      "Hummus fatteh sameinir hummuslíkt tilfar við breyði og øðrum løgum."
    ],
    "serving": [
      "Borðreið sum morgunmat, mezze, hjámeti ella part av máltíð.",
      "Heitt breyð, rátt grønmeti og súltað grønmeti geva mótsetning."
    ],
    "commonMistakes": [
      "Ikki nóg kókaðar kikertur, sum geva kornuta konsistens.",
      "Ov lítið tahini ella súrleiki, sum gevur flatan smakk.",
      "At borðreiða hummus ísakaldan beint úr køliskápinum, tá angin er veikari."
    ]
  },
  "shawarma": {
    "overview": "Shawarma snýr seg bæði um marinering og steikiflatu. Á einum loddrøttum, snúningsspjóti verður ytsta lagið brúnað so við og við, meðan kjøtið innan fyri verður verandi saftigt. Kokkurin sker tunnar flísar av, so hvørt tær eru stoknar.",
    "history": "Mannagongdin at steikja kjøt á loddrøttum, snúningsspjóti mentist í osmanska økinum og fekk ymisk staðbundin snið, millum annað shawarma, döner og seinni gyro. Shawarma er serliga útbreitt í levantinskari og arabiskari matmentan.",
    "flavor": "Heitt kryddaður, stoktur og saftigur smakkur, ofta javnaður við hvítleykssós, tahini, súltaðum grønmeti og feskum grønmeti.",
    "technique": "Heima fæst besta úrslitið við at marinera tunt kjøt, steikja á høgum hita í umførum og síðani savna kjøtið skjótt í ovni ella á pannu uttan at kóka tað í egnari vætu.",
    "essentials": [
      "Høsnarungi, lambskjøt ella neytakjøt, skorið ella lagt saman til stóra steikiflatu.",
      "Marinada við heitum kryddi, súrleika og angandi tilfari.",
      "Flatt breyð ella pita.",
      "Sós og súrligt omanátilfar sum toum, tahini og súltað grønmeti."
    ],
    "recipe": {
      "label": "Høsnarungashawarma á pannu",
      "yield": "4 portiónir",
      "time": "uml. 45 min + marinering",
      "ingredients": [
        "700 g høsnarungalør í tunnum strimlum",
        "2 súpsk. jogurt",
        "2 súpsk. sitrónsaft",
        "2 súpsk. olivenolja",
        "3 hvítleyksgeirar",
        "1 tesk. spískumman",
        "1 tesk. paprika",
        "1/2 tesk. gurkumeja",
        "1/2 tesk. kanel ella allehånde",
        "pita, salat og súltað grønmeti",
        "toum ella tahinisós"
      ],
      "steps": [
        "Blanda høsnarungan við jogurti, sitrón, olju, hvítleyki og kryddi og marinera í minsta lagi ein tíma.",
        "Turka ov nógva marinadu lætt av, so kjøtið kann brúnast.",
        "Steik á sera heitari pannu í smáum umførum, til kjøtið hevur myrkar kantar og er gjøgnumstokið.",
        "Lat kjøtið hvíla stutt og sker tað møguliga í enn tunnari flísar, áðrenn tað fer eina stutta ferð á pannuna aftur.",
        "Borðreið í heitum breyði við sós, salati og súrligum súltaðum grønmeti."
      ]
    },
    "variants": [
      "Høsnarungashawarma við toum, ið hevur nógvan hvítleyk.",
      "Lamba- ella neytashawarma við tahinisós.",
      "Borðreitt á tallerki við rísi, salati og breyði afturvið."
    ],
    "serving": [
      "Breyð og kjøt eiga at vera heit, meðan súltað grønmeti og salat eru feskt og kalt.",
      "Súrleiki og hvítleykssós eru týdningarmikil mótsetningur til ríka kjøtið."
    ],
    "commonMistakes": [
      "Ov nógv kjøt á pannuni, so tað kókar heldur enn brúnast.",
      "Ov tjúkk sós og ov lítið súrligt omanátilfar.",
      "At brúka soltið kjøt og steikja tað ov leingi."
    ]
  },
  "manakish": {
    "overview": "Manakish er bæði breyð og liðugur rættur: bleytt, eitt sindur seigt deiggj verður flatt og fær omanátilfar áðrenn baking. Za'atar við urtum, sesami og sumaki er eitt av eyðkendastu sløgunum.",
    "history": "Flatt breyð við omanátilfari hevur langar siðir í Levantinum, og manakish ella manoushe er tætt knýtt at bakaríum og gerandismorgunmati í millum annað Libanon og grannalondunum. Omanátilfar og deiggj eru ymisk eftir staði.",
    "flavor": "Ristað breyð, urtakendur za'atar, nøtakendur sesam og frískur súrleiki frá sumaki. Ostasløgini eru saltari og fyldigari.",
    "technique": "Deiggið skal ganga nóg leingi til at verða smidligt og luftugt, men skal formast tunnari enn ein tjúkk pizza. Blanda za'atar við olivenolju til eitt smyrjandi mauk, ið ikki ger deiggið ov vátt.",
    "essentials": [
      "Bleytt hveitideiggj við geri.",
      "Za'atar og olivenolja sum siðbundið omanátilfar.",
      "Høgur bakihiti, so breyðið skjótt gongur upp og botnurin brúnast.",
      "Feskt grønmeti, labneh ella súltað grønmeti sum hjámeti."
    ],
    "recipe": {
      "label": "Manakish við za'atar",
      "yield": "6 smá breyð",
      "time": "uml. 90 min",
      "ingredients": [
        "500 g hveitimjøl",
        "7 g turrger",
        "3 dl flógvt vatn",
        "1 tesk. sukur",
        "1,5 tesk. salt",
        "2 súpsk. olivenolja",
        "5 súpsk. za'atar",
        "5 súpsk. olivenolja til omanátilfar"
      ],
      "steps": [
        "Elt mjøl, ger, vatn, sukur, salt og olju til bleytt deiggj og lat ganga til næstan tvífalda stødd.",
        "Blanda za'atar og olivenolju til tjúkt, smyrjandi omanátilfar.",
        "Být deiggið í seks partar og rulla ella trýst teir til fløt breyð.",
        "Smyr za'atarblandingina í tunnum lagi og lat ein lítlan kant vera frían.",
        "Baka á væl forhitaðari flatu á høgum hita, til botnurin er gullbrúnur og kanturin luftugur."
      ]
    },
    "variants": [
      "Za'atar manakish.",
      "Ostamanakish við søltum ostum, ið bráðna væl.",
      "Sløg við kjøti omaná, skyld við onnur fløt breyð úr Levantinum.",
      "Samansetingar av osti og za'atar."
    ],
    "serving": [
      "Borðreið heitt, gjarna lagt saman um tomat, agurku og urtir.",
      "Labneh og oliven eru siðbundið morgunmatshjámeti."
    ],
    "commonMistakes": [
      "Ov nógv omanátilfar, so miðjan verður tung og oljut.",
      "Ov tjúkt deiggj, sum tornar, áðrenn botnurin brúnast.",
      "Ov lágur ovnhiti, sum gevur langa bakitíð og turra skorpu."
    ]
  },
  "koshari": {
    "overview": "Koshari er ein máltíð í løgum, har bíligar grundvørur fáa mótsetning frá sós og omanátilfari. Rís, linsur og pasta eru mild og mettandi, meðan kryddað tomatsós, súrligt hvítleyksediki og myrkur, broyskin leykur geva rættinum dám.",
    "history": "Koshari verður víða mett sum ein av kendastu tjóðarrættunum í Egyptalandi og er tætt knýtt at bíligum gøtumati og serligum koshari-matstovum. Rætturin vísir eisini, hvussu rís, linsur og pasta eru sameind í nútímans egyptiskum býarmati.",
    "flavor": "Mettandi, jarðkendur grunnur við frískum tomatsúrleika, hvítleyki, chili og søtligum, næstan nøtakendum broysknum leyki.",
    "technique": "Kóka lutirnar hvør sær, so rís, linsur og pasta varðveita rætta konsistens. Leykurin skal steikjast leingi nokk til at verða broyskin, og sósin skal vera nóg konsentrerað til at krydda alla skálina.",
    "essentials": [
      "Rís, brúnar linsur og smá pastasløg.",
      "Kikertur til eyka konsistens og protein.",
      "Kryddað tomatsós.",
      "Hvítleyksediki og broyskið stoktur leykur sum týdningarmikið omanátilfar."
    ],
    "recipe": {
      "label": "Koshari heima",
      "yield": "6 portiónir",
      "time": "uml. 70 min",
      "ingredients": [
        "250 g rís",
        "200 g brúnar linsur",
        "200 g smá pasta ella makaroni",
        "1 blikk av kikertum",
        "4 stórir leykir í tunnum flísum",
        "1 blikk av hakkaðum tomatum",
        "4 hvítleyksgeirar",
        "2 súpsk. ediki",
        "spískumman og chili",
        "neutral olja"
      ],
      "steps": [
        "Kóka linsurnar, til tær eru næstan moyrar, og kóka rísið fyri seg ella saman eftir ynsktari mannagongd.",
        "Kóka pasta al dente og hita kikerturnar.",
        "Steik leykin í umførum, til hann er djúpt gullbrúnur og broyskin, og lat oljuna renna av á rist.",
        "Kóka tomat við hvítleyki, spískumman og chili til konsentreraða sós; blanda eitt sindur av hvítleyki og ediki sum súrliga dressing.",
        "Bygg skálir við rísi, linsum, pasta og kikertum, síðani tomatsós, ediki og nógvum broysknum leyki."
      ]
    },
    "variants": [
      "Lutfallið millum rís, linsur og pasta er ymiskt eftir staði.",
      "Chilisós kann borðreiðast fyri seg, so styrkin kann tillagast.",
      "Summar útgávur brúka vermicelli saman við rísinum."
    ],
    "serving": [
      "Borðreið heitt í løgum, so broyskni leykurin varðveitir konsistensin.",
      "Eyka edikisós og chilisós standa ofta á borðinum."
    ],
    "commonMistakes": [
      "At kóka alt stívilseríkt tilfar saman og fáa ójavna konsistens.",
      "Leykur, ið bert er bleytur og brúnur, ikki veruliga broyskin.",
      "Ov mild tomatsós, ið hvørvur í stóru nøgdini av rísi og pasta."
    ]
  },
  "pide": {
    "overview": "Pide sameinir bleytt, seigt gerdeiggj við omanátilfari, sum verður bakað samstundis. Eyðkenda bátaskapið verður gjørt við at leggja kantarnar inn yvir fylluna, so væta og bræddur ostur verða hildin á plássi uttan at gera rættin til eina afturlatna tertu.",
    "history": "Pide finst í nógvum staðbundnum turkiskum sløgum og er ein týðandi partur av bakarí- og matstovumati. Navnið kann eisini brúkast breiðari um breyð, men uttan fyri Turkaland verður tað ofta sett í samband við avlongu sløgini við omanátilfari.",
    "flavor": "Ristað deiggj og brúnir kantar møta søltum osti, kryddaðum kjøti ella grønmeti. Smør og egg verða brúkt í summum sløgum fyri meira fyldu.",
    "technique": "Deiggið skal vera nóg elastiskt til at verða strekt tunt í miðjuni, meðan kanturin verður verandi tjúkkari. Sera heit bakiflata gevur skjótt lit á botnin, áðrenn omanátilfarið tornar.",
    "essentials": [
      "Gerdeiggj, ið lætt kann strekkjast.",
      "Avlangt skap ella bátaskap.",
      "Omanátilfar av osti, kjøti, grønmeti ella blandaðum tilfari.",
      "Høgur ovnhiti og heit bakiflata."
    ],
    "recipe": {
      "label": "Pide við osti og urtum",
      "yield": "4 pide",
      "time": "uml. 90 min",
      "ingredients": [
        "500 g hveitimjøl",
        "7 g turrger",
        "3 dl flógvt vatn",
        "1 tesk. sukur",
        "1,5 tesk. salt",
        "2 súpsk. olivenolja",
        "300 g rivin mozzarella ella mildur hvítur ostur",
        "150 g feta",
        "persilla",
        "1 egg til at pensla við, um ynskt"
      ],
      "steps": [
        "Elt deiggið, til tað er slætt og smidligt, og lat ganga til næstan tvífalda stødd.",
        "Být í fýra partar og strekk hvønn part til avlangt ovalskap.",
        "Legg ost og urtir á miðjuna og lat 2–3 cm av kantinum vera fríar.",
        "Legg kantarnar inn og klemma endarnar saman, so pide fær bátaskap.",
        "Baka á sera heitum steini ella plátu, til botnurin er brúnur og osturin bløðrar; pensla møguliga kantin lætt eftir baking."
      ]
    },
    "variants": [
      "Kaşarlı pide við osti.",
      "Kıymalı pide við kryddaðum malnum kjøti.",
      "Kuşbaşılı pide við smáum kjøtbitum.",
      "Egg kann knúvast omaná summi sløg móti endanum á bakingini."
    ],
    "serving": [
      "Verður ofta skorið tvørtur um í bitar og borðreitt heitt.",
      "Feskt salat, sitrón ella ayran hóska til rík kjøt- og ostasløg."
    ],
    "commonMistakes": [
      "Ov nógv omanátilfar, sum ger botnin vátan.",
      "Ov lágur bakihiti, so deiggið tornar, áðrenn tað fær lit.",
      "At gera kantin so tjúkkan, at hann verður tungur og breyðkendur."
    ]
  },
  "birria": {
    "overview": "Birria snýr seg um spakuliga matgerð og sós ella soð úr turrum chili, kryddi og gelatin úr kjøtinum. Nútímans quesabirria, ið er væl umtókt úti í heimi, er ein borðreiðingarháttur, ikki øll lýsingin av rættinum.",
    "history": "Birria verður serliga sett í samband við Jalisco og er siðbundið ofta gjørt úr geitakjøti, men neytakjøt og onnur kjøtsløg eru eisini vanlig. Rætturin verður borðreiddur bæði til hátíðarhald og sum serligur matstovu- og gøtumatur.",
    "flavor": "Djúpur, heitur chilismakkur við súrleika, smakki av turrari frukt frá chilinum og ríkum umami frá langtíðarkókaðum kjøti og soði.",
    "technique": "Turt chili verður ristað og lagt í blot, áðrenn tað verður malið til marinadu. Kjøtið skal kóka spakuliga, til tað kann dragast sundur. Tak feitt av soðnum og tillaga tað fyri seg, so tað fær sterkan smakk uttan at verða tungt.",
    "essentials": [
      "Kjøt, ið tolir langa kóking, sum neytabógvur, ryggstykki ella geitakjøt.",
      "Turt meksikanskt chili sum guajillo og ancho.",
      "Krydd, ediki og angandi tilfar í marinaduni.",
      "Consomé ella kókisoð, ið verður borðreitt saman við kjøtinum."
    ],
    "recipe": {
      "label": "Neytagrýta við íblástri frá birria",
      "yield": "6 portiónir",
      "time": "uml. 4 tímar",
      "ingredients": [
        "1,5 kg neytaryggur ella bógvur",
        "4 guajillo-chili",
        "2 ancho-chili",
        "3 hvítleyksgeirar",
        "1 leykur",
        "2 súpsk. ediki",
        "1 tesk. spískumman",
        "1/2 tesk. kanel",
        "1 tesk. oregano",
        "1 l neytasoð",
        "lime, leykur og koriander"
      ],
      "steps": [
        "Rista turru chilini stutt, tak fræini úr og legg tey í blot í heitum vatni.",
        "Mala chili við hvítleyki, leyki, ediki og kryddi til slætta marinadu.",
        "Brúna kjøtið, dekka við marinadu og soði og lat smákóka sera spakuliga, til tað dettur sundur.",
        "Tak kjøtið úr, síla ella tillaga soðið og tak ov nógv feitt av eftir smakki.",
        "Drag kjøtið sundur og borðreið í soðnum ella í heitum tortillum við leyki, koriander og lime."
      ]
    },
    "variants": [
      "Siðbundin sløg við geitakjøti.",
      "Neytabirria, ið er sera vanlig í nútímans borðreiðing.",
      "Quesabirria-tacos við osti, stoknar í feitti frá soðnum.",
      "Birria borðreitt sum súpa ella grýturættur við consomé."
    ],
    "serving": [
      "Lime, hakkaður leykur og koriander geva frískleika.",
      "Consomé kann borðreiðast í egnum koppi at dyppa tacos í."
    ],
    "commonMistakes": [
      "Ov stutt kókitíð, sum gevur seigt kjøt.",
      "Beisk chilisós, tí turra chilið er brent ov hart.",
      "Ov nógv feitt í consomé uttan nóg mikið av súrleika og kryddjavnvág."
    ]
  },
  "cochinita-pibil": {
    "overview": "Cochinita pibil fær eyðkenda reyða litin frá annatto í achiote og fríska smakkin frá súrligum sitrusfruktum. Kjøtið verður gjørt til leingi og við vætu, til tað kann dragast sundur, meðan súltaður reyðleykur og sterkt chili geva mótsetning við borðreiðing.",
    "history": "Rætturin er tætt knýttur at Yucatán og pibil-mannagongdum, har matur verður gjørdur til innpakkaður í einum jarðovni. Nútímans heim og matstovur brúka ofta vanligan ovn, men varðveita achiote, sitrus og spakuliga matgerð sum grundarlag.",
    "flavor": "Jarðkendur og piparkendur achiote, sitrus, hvítleykur og heitt krydd rundan um ríkt svínakjøt, javnað við sera súrligum reyðleyki.",
    "technique": "Marinadan skal fáa tíð at treingja inn, og kjøtið verður gjørt til tætt innpakkað ella undir loki, so tað smákókar í egnari vætu. Høgur hiti móti endanum kann brúkast stutt til at brúna kantarnar.",
    "essentials": [
      "Svínbógvur ella nakki við nógvum feitti og bindivevnaði.",
      "Achiotemauk ella recado rojo við annatto.",
      "Súrlig sitrusfrukt og hvítleykur.",
      "Súltaður reyðleykur og sterkt chili sum feskt omanátilfar."
    ],
    "recipe": {
      "label": "Cochinita pibil í ovni",
      "yield": "6 portiónir",
      "time": "uml. 4 tímar + marinering",
      "ingredients": [
        "1,5 kg svínabógvur",
        "100 g achiotemauk",
        "1,5 dl appelsinsaft",
        "0,75 dl limesaft",
        "4 hvítleyksgeirar",
        "1 tesk. oregano",
        "1/2 tesk. spískumman",
        "2 reyðleykir",
        "1 dl ediki",
        "maistortillur",
        "habanero eftir smakki"
      ],
      "steps": [
        "Blanda achiote, sitrus, hvítleyk og krydd og gníggja marinaduna væl inn í svínakjøtið.",
        "Marinera í minsta lagi fýra tímar, gjarna náttina yvir.",
        "Legg kjøtið í grýtu við tøttum loki ella pakka tað í bakipappír og folie og steik spakuliga, til tað lætt kann dragast sundur.",
        "Sker reyðleykin tunt og súlta hann skjótt í ediki, lime, salti og møguliga eitt sindur av habanero.",
        "Drag kjøtið sundur í steikisoðnum og borðreið í heitum maistortillum við súltaðum leyki."
      ]
    },
    "variants": [
      "Siðbundin pibil-mannagongd í jarðovni.",
      "Heimaútgáva í grýtu við tøttum loki ella ovni.",
      "Tacos, tortas og borðreiðing á tallerki við sama kjøti."
    ],
    "serving": [
      "Súltaður reyðleykur er meira enn prýði – súrleikin javnar ríka kjøtið.",
      "Maistortillur og sterk salsa hóska væl afturvið."
    ],
    "commonMistakes": [
      "Ov soltið kjøt, sum tornar undir langari matgerð.",
      "Ov lítil súrleiki í marinaduni og tungur, jarðkendur smakkur.",
      "At stoyta steikisoðið burtur í staðin fyri at blanda tað aftur í kjøtið."
    ]
  },
  "pozole": {
    "overview": "Pozole snýr seg líka nógv um maisið sum um soðið. Stór hominy-korn fáa ein týðiligan, næstan blómukendan maisanga og fasta konsistens, meðan heiti grýturætturin verður javnaður við káli, reddiki, leyki, lime, chili og oregano við borðið.",
    "history": "Pozole hevur djúpar røtur í maissiðum frá tíðini fyri Kolumbus og finst í nógvum staðbundnum sløgum í Meksiko. Reyð, grøn og hvít pozole vísa, hvussu sama grundhugskot broytist við staðbundnum chili, urtum og mannagongdum.",
    "flavor": "Djúpt, heitt soð við týðiligum maissmakki, lyft av frískum súrleika og broysknum ráum grønmeti við borðreiðing.",
    "technique": "Hominy skal vera heilt moyrt uttan at detta sundur, og kjøtið skal smákóka varliga, so soðið verður verandi reint. Omanátilfarið verður latið í við borðið, ikki kókað saman við grýtuni.",
    "essentials": [
      "Hominy ella pozolemais.",
      "Soð og ofta svínakjøt ella høsnarungi.",
      "Chili- ella urtagrunnur eftir staðbundnum stíli.",
      "Nógv feskt omanátilfar: kál, reddikur, leykur, lime og oregano."
    ],
    "recipe": {
      "label": "Grýturættur við íblástri frá pozole rojo",
      "yield": "6 portiónir",
      "time": "uml. 2,5 tímar",
      "ingredients": [
        "1,2 kg svínabógvur í stórum bitum",
        "2 stór blikk av hominy, skolað",
        "4 guajillo-chili",
        "2 ancho-chili",
        "1 leykur",
        "4 hvítleyksgeirar",
        "2 l vatn ella soð",
        "oregano",
        "kál og reddikur",
        "lime og tostadas til borðreiðing"
      ],
      "steps": [
        "Lat svínakjøt, hálvan leyk og hvítleyk smákóka í soði, til kjøtið er moyrt.",
        "Rista chilini, legg tey í blot og mala við eitt sindur av soði til slætta sós.",
        "Síla chilisósina í grýtuna og lat hominy í.",
        "Lat alt smákóka, til maisið er moyrt og soðið væl samankókað, og drag ella sker kjøtið sundur.",
        "Borðreið við skálum av fínt skornum káli, reddiki, leyki, oregano, lime og broysknum tostadas."
      ]
    },
    "variants": [
      "Pozole blanco uttan ráðandi lit frá chili ella urtum.",
      "Pozole rojo við reyðum, turrum chili.",
      "Pozole verde við grønum chili, urtum og staðbundnum tilfari."
    ],
    "serving": [
      "Hvør gestur finnur sína egnu javnvág millum styrki, súrleika og broyskni við borðið.",
      "Tostadas ella aðrar broysknar maisvørur geva eyka konsistens."
    ],
    "commonMistakes": [
      "At brúka vanligt mais í staðin fyri hominy og missa grundarlagið í rættinum.",
      "At kóka omanátilfarið í grýtuni, so frískleikin hvørvur.",
      "Ov hørð kóking, ið ger kjøtið turt og soðið óklárt."
    ]
  },
  "fish-taco": {
    "overview": "Fish taco byggir á mótsetningar: heitur fiskur, bleyt tortilla, broyskið kál, súrlig lime og ein sós, sum bindur alt saman. Friteraður fiskur er sera kendur í Baja-stíli, men grillað sjógæti er eisini vanligt.",
    "history": "Fiskataco verður serliga sett í samband við Baja California og atgongdina hjá strandarbýunum til feskt sjógæti. Seinni er rætturin vorðin eitt av kendastu sløgunum av norðvesturmeksikanskum gøtumati úti í heimi.",
    "flavor": "Frískur, saltur og súrligur smakkur við ristaðum ella friteraðum fiski, broysknum káli, chili og kremutari sós. Maisið í tortilluni skal enn merkjast.",
    "technique": "Fiskur skal gerast til stutta tíð. Við fritering skal deiggjblandingin vera køld og oljan nóg heit til tunna, broyskna skorpu; við grilling skal fiskurin turkast væl og steikjast skjótt.",
    "essentials": [
      "Fastur hvítur fiskur ella annað sjógæti.",
      "Smáar maistortillur.",
      "Fínt skorið kál og fesk salsa.",
      "Lime og kremut, súrlig sós."
    ],
    "recipe": {
      "label": "Fish tacos við íblástri frá Baja",
      "yield": "12 tacos",
      "time": "uml. 40 min",
      "ingredients": [
        "700 g toskur, upsi ella annar fastur hvítur fiskur",
        "150 g hveitimjøl",
        "1 tesk. bakipulvur",
        "2 dl ísakalt vatn við kolsýru ella øl",
        "salt og chili",
        "neutral olja til fritering",
        "12 maistortillur",
        "300 g fínt skorið kál",
        "1 dl jogurt ella majonesa",
        "lime, koriander og salsa"
      ],
      "steps": [
        "Sker fiskin í avlangar bitar og turka hann væl.",
        "Blanda mjøl, bakipulvur, krydd og ísakalda vætu skjótt til lætta deiggjblanding.",
        "Dyppa fiskin í blandingina og fritera í heitari olju, til skorpan er gullbrún og fiskurin júst gjøgnumkókaður.",
        "Blanda einfalda sós úr jogurti ella majonesu, lime og salti og hita tortillurnar.",
        "Bygg tacos við fiski, káli, sós, salsa, koriander og nógvari lime."
      ]
    },
    "variants": [
      "Broyskin, friteraður Baja-stílur.",
      "Grillaður fiskur við lættari salsa og káli.",
      "Shrimp tacos nýta sama bygnað við rækjum.",
      "Tostada við sjógæti og líknandi omanátilfari."
    ],
    "serving": [
      "Borðreið fiskin beinanvegin, so skorpan ikki verður bleyt.",
      "Kál og lime eiga at vera køld og fesk mótvegis heita fiskinum."
    ],
    "commonMistakes": [
      "Vátur fiskur, ið ger frityrblandingina leysa og fær oljuna at sproyta.",
      "Ov lágur oljuhiti og feit skorpa.",
      "Ov nógv sós, ið køvir fiskasmakkin og ger tortilluna bleyta."
    ]
  },
  "smashburger": {
    "overview": "Smashburger er fyrst og fremst ein steikimannagongd. Heldur enn at forma tjúkkan burgara frammanundan verður kjøtið trýst hart eina ferð móti heitari plátu, so ein stór flata fær beinleiðis samband við hitan og kraftiga Maillard-brúning.",
    "history": "Tunnir diner- og griddle-burgarar hava langar amerikanskar siðir, meðan orðið smashburger er vorðið sera sjónligt gjøgnum nútímans burgaraketur og sjálvstøðugar matstovur. Mannagongdin byggir á sama grundhugskot: høgur hiti, skjót steiking og nógv skorpa.",
    "flavor": "Sterkur smakkur av stoknum kjøti, salti, bræddum osti og bleytum breyði, ofta javnaður við súltaðari agurku, leyki og súrligari burgarasós.",
    "technique": "Brúka kalt kjøt við nógvum feitti, forma leysar kúlur og trýst tær beinanvegin móti næstan rúkandi heitari stál- ella stoypijarnsflatu. Trýst ikki aftur, tá skorpan er sett – tá trýstir tú bara saftina út.",
    "essentials": [
      "Malið kjøt við nógvum feitti til saftigleika.",
      "Sera heit, tung steikiflata.",
      "Eitt hart trýst beint í byrjanini av steikingini.",
      "Bleytt burgarabreyð, ostur og fá, greið sløg av omanátilfari."
    ],
    "recipe": {
      "label": "Dupultur smashburger",
      "yield": "4 burgarar",
      "time": "uml. 25 min",
      "ingredients": [
        "600 g malið kjøt við uml. 20 % feitti",
        "8 flísar av burgaraosti",
        "4 bleyt burgarabreyð",
        "salt og pipar",
        "1 leykur í sera tunnum flísum",
        "súltað agurka",
        "majonesa, sinnop og ketchup eftir smakki",
        "eitt sindur av smøri til breyðini"
      ],
      "steps": [
        "Být kjøtið leyst í átta kúlur uttan at trýsta tær saman.",
        "Rista skurðflaturnar á burgarabreyðunum í eitt sindur av smøri og legg tey til viks.",
        "Legg kjøtkúlurnar á sera heita stál- ella stoypijarnsflatu og trýst tær flatar hart fyrstu sekundini.",
        "Salta, lat myrka skorpu verða gjørda, skava burgaran leysan, vend eina ferð og legg ost á.",
        "Legg tvær kjøtflísar í hvønn burgara og borðreið beinanvegin við leyki, súltaðari agurku og sós."
      ]
    },
    "variants": [
      "Dupultur smash við tveimum sera tunnum kjøtflísum.",
      "Oklahoma onion burger, har sera tunnur leykur verður trýstur inn í kjøtið.",
      "Single smash til ein lættari burgara."
    ],
    "serving": [
      "Borðreið beint av steikiflatuni; tunnu burgararnir kólna skjótt.",
      "Súltað agurka og ráur ella stoktur leykur geva súrleika og konsistens móti kjøti og osti."
    ],
    "commonMistakes": [
      "At brúka non-stick-pannu, ið ikki tolir ella heldur nóg nógvan hita.",
      "At forma kjøtflísina frammanundan og missa smash-árinið.",
      "At trýsta burgaran fleiri ferðir undir steiking og trýsta saftina út, eftir at skorpan er sett."
    ]
  }
} as const satisfies Record<string,ArticleBody>;
