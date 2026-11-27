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
  }
} as const satisfies Record<string,ArticleBody>;
