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
  }
} as const satisfies Record<string,ArticleBody>;
