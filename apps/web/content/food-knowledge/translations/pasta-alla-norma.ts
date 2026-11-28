import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const pastaAllaNormaTranslations = {
  "nn": {
    "overview": "Pasta alla Norma byggjer ein heil rett av få tydelege element: tomatsaus, steikt eller fritert aubergine, pasta, frisk basilikum og ricotta salata. Styrken ligg i kontrasten mellom søt tomat, kremete aubergine og den salte osten.",
    "history": "Retten er knytt til Catania, og namnet blir tradisjonelt knytt til Bellini sin opera Norma, sjølv om namneopphavet blir fortalt i fleire versjonar. I dag blir han rekna som ein av dei mest kjende pastarettane på Sicilia.",
    "flavor": "Søt og syrleg tomat møter mjuk aubergine, peparaktig basilikum og tydeleg salt ricotta. Retten skal smake konsentrert utan å bli tung.",
    "technique": "Auberginen må få skikkeleg farge og miste rå vassmak. Tomatsausen bør kokast inn til han kan kle pastaen, og litt pastavatn samlar sausen før aubergine og ost blir tilsette.",
    "essentials": [
      "Mogne tomatar eller gode hermetiske tomatar.",
      "Aubergine steikt eller fritert til han er gyllen og mjuk.",
      "Ricotta salata, ikkje vanleg fersk ricotta.",
      "Basilikum og pasta med god tyggjemotstand."
    ],
    "recipe": {
      "label": "Pasta alla Norma heime",
      "yield": "4 porsjonar",
      "time": "ca. 50 min",
      "ingredients": [
        "400 g rigatoni, maccheroni eller spaghetti",
        "2 auberginar",
        "700 g hakka eller heile hermetiske tomatar",
        "2 kvitlauksfedd",
        "olivenolje",
        "1 bunt basilikum",
        "80–100 g ricotta salata",
        "salt og svart pepar"
      ],
      "steps": [
        "Skjer auberginen i skiver eller terningar, salt lett og tørk av eventuell overflatefukt.",
        "Steik auberginen i olivenolje til han er djupgyllen og mjuk; legg til side.",
        "Fres kvitlauk kort, tilset tomat og lat sausen småkoke til han er konsentrert.",
        "Kok pasta al dente og ta vare på ein kopp pastavatn.",
        "Vend pastaen i tomatsausen med litt pastavatn, tilset mesteparten av auberginen og basilikum.",
        "Server med resten av auberginen og rikeleg riven ricotta salata."
      ]
    },
    "variants": [
      "Catania-stil med maccheroni eller annan kort pasta.",
      "Nokre heimar bruker omnsbakt aubergine for ein lettare variant.",
      "Ricotta salata kan variere i saltstyrke og tørrheit mellom produsentar."
    ],
    "serving": [
      "Blir servert straks medan pastaen er blank av saus og osten framleis er tydeleg.",
      "Eit enkelt grønt tilbehøyr er nok; retten skal stå på eigne bein."
    ],
    "commonMistakes": [
      "Å bruke rå eller bleik aubergine som gjev svampete tekstur.",
      "Å erstatte ricotta salata direkte med fersk ricotta.",
      "For mykje saus, slik at pastaen sym i tomat."
    ]
  },
  "sv": {
    "overview": "Pasta alla Norma bygger en hel rätt av några tydliga delar: tomatsås, stekt eller friterad aubergine, pasta, färsk basilika och ricotta salata. Styrkan ligger i kontrasten mellan söt tomat, krämig aubergine och salt ost.",
    "history": "Rätten förknippas med Catania och namnet kopplas traditionellt till Bellinis opera Norma, även om namnets ursprung berättas i flera versioner. I dag räknas den som en av Siciliens mest kända pastarätter.",
    "flavor": "Söt och syrlig tomat möter mjuk aubergine, pepprig basilika och tydligt salt ricotta. Smaken ska vara koncentrerad utan att bli tung.",
    "technique": "Auberginen måste få ordentlig färg och förlora den råa, vattniga smaken. Tomatsåsen bör reduceras så att den kan täcka pastan, och lite pastavatten binder såsen innan aubergine och ost tillsätts.",
    "essentials": [
      "Mogna tomater eller bra konserverade tomater.",
      "Aubergine stekt eller friterad tills den är gyllene och mjuk.",
      "Ricotta salata, inte vanlig färsk ricotta.",
      "Basilika och pasta med bra tuggmotstånd."
    ],
    "recipe": {
      "label": "Pasta alla Norma hemma",
      "yield": "4 portioner",
      "time": "ca 50 min",
      "ingredients": [
        "400 g rigatoni, maccheroni eller spaghetti",
        "2 auberginer",
        "700 g hackade eller hela konserverade tomater",
        "2 vitlöksklyftor",
        "olivolja",
        "1 knippe basilika",
        "80–100 g ricotta salata",
        "salt och svartpeppar"
      ],
      "steps": [
        "Skär auberginen i skivor eller tärningar, salta lätt och torka av eventuell ytfukt.",
        "Stek auberginen i olivolja tills den är djupt gyllene och mjuk; lägg åt sidan.",
        "Fräs vitlöken kort, tillsätt tomat och låt såsen sjuda tills den är koncentrerad.",
        "Koka pastan al dente och spara en kopp pastavatten.",
        "Vänd pastan i tomatsåsen med lite pastavatten, tillsätt merparten av auberginen och basilikan.",
        "Servera med resten av auberginen och rikligt med riven ricotta salata."
      ]
    },
    "variants": [
      "Catania-stil med maccheroni eller annan kort pasta.",
      "Vissa hem använder ugnsbakad aubergine för en lättare variant.",
      "Ricotta salata kan variera i sälta och torrhet mellan producenter."
    ],
    "serving": [
      "Serveras genast medan pastan är blank av såsen och osten fortfarande framträder.",
      "Ett enkelt grönt tillbehör räcker; rätten ska stå på egna ben."
    ],
    "commonMistakes": [
      "Att använda rå eller blek aubergine som ger svampig konsistens.",
      "Att ersätta ricotta salata direkt med färsk ricotta.",
      "För mycket sås så att pastan simmar i tomat."
    ]
  },
  "da": {
    "overview": "Pasta alla Norma bygger en hel ret af få tydelige elementer: tomatsauce, stegt eller friteret aubergine, pasta, frisk basilikum og ricotta salata. Styrken ligger i kontrasten mellem sød tomat, cremet aubergine og den salte ost.",
    "history": "Retten forbindes med Catania, og navnet knyttes traditionelt til Bellinis opera Norma, selv om navnets oprindelse fortælles i flere versioner. I dag regnes den som en af Siciliens mest kendte pastaretter.",
    "flavor": "Sød og syrlig tomat møder blød aubergine, pebret basilikum og tydeligt salt ricotta. Smagen skal være koncentreret uden at blive tung.",
    "technique": "Auberginen skal have ordentlig farve og miste sin rå, vandede smag. Tomatsaucen bør koges ind, så den kan omslutte pastaen, og lidt pastavand samler saucen, før aubergine og ost tilsættes.",
    "essentials": [
      "Modne tomater eller gode dåsetomater.",
      "Aubergine stegt eller friteret, til den er gylden og blød.",
      "Ricotta salata, ikke almindelig frisk ricotta.",
      "Basilikum og pasta med godt bid."
    ],
    "recipe": {
      "label": "Pasta alla Norma derhjemme",
      "yield": "4 portioner",
      "time": "ca. 50 min",
      "ingredients": [
        "400 g rigatoni, maccheroni eller spaghetti",
        "2 auberginer",
        "700 g hakkede eller hele dåsetomater",
        "2 fed hvidløg",
        "olivenolie",
        "1 bundt basilikum",
        "80–100 g ricotta salata",
        "salt og sort peber"
      ],
      "steps": [
        "Skær auberginen i skiver eller tern, salt let, og tør eventuel overfladefugt af.",
        "Steg auberginen i olivenolie, til den er dybt gylden og blød; læg til side.",
        "Svits hvidløg kort, tilsæt tomat, og lad saucen simre, til den er koncentreret.",
        "Kog pastaen al dente, og gem en kop pastavand.",
        "Vend pastaen i tomatsaucen med lidt pastavand, og tilsæt størstedelen af auberginen og basilikum.",
        "Servér med resten af auberginen og rigeligt revet ricotta salata."
      ]
    },
    "variants": [
      "Catania-stil med maccheroni eller anden kort pasta.",
      "Nogle hjem bruger ovnbagt aubergine til en lettere variant.",
      "Ricotta salata kan variere i saltstyrke og tørhed mellem producenter."
    ],
    "serving": [
      "Serveres straks, mens pastaen er blank af sauce, og osten stadig er tydelig.",
      "Et enkelt grønt tilbehør er nok; retten skal kunne stå alene."
    ],
    "commonMistakes": [
      "At bruge rå eller bleg aubergine, som giver svampet tekstur.",
      "At erstatte ricotta salata direkte med frisk ricotta.",
      "For meget sauce, så pastaen svømmer i tomat."
    ]
  },
  "fi": {
    "overview": "Pasta alla Norma rakentuu muutamasta selkeästä osasta: tomaattikastikkeesta, paistetusta tai uppopaistetusta munakoisosta, pastasta, tuoreesta basilikasta ja ricotta salatasta. Vahvuus on makean tomaatin, kermaisen munakoison ja suolaisen juuston kontrastissa.",
    "history": "Ruokalaji yhdistetään Cataniaan, ja nimi liitetään perinteisesti Bellinin Norma-oopperaan, vaikka nimen alkuperästä kerrotaan eri versioita. Nykyään se kuuluu Sisilian tunnetuimpiin pastaruokiin.",
    "flavor": "Makea ja hapan tomaatti kohtaa pehmeän munakoison, pippurisen basilikan ja selvästi suolaisen ricotan. Maun tulee olla tiivis olematta raskas.",
    "technique": "Munakoison pitää ruskistua kunnolla ja menettää raaka, vetinen makunsa. Tomaattikastike keitetään kokoon niin, että se peittää pastan, ja pieni määrä keitinvettä sitoo kastikkeen ennen munakoison ja juuston lisäämistä.",
    "essentials": [
      "Kypsiä tomaatteja tai hyviä säilyketomaatteja.",
      "Kullanruskeaksi ja pehmeäksi paistettua tai uppopaistettua munakoisoa.",
      "Ricotta salataa, ei tavallista tuoretta ricottaa.",
      "Basilikaa ja pastaa, jossa on hyvä purutuntuma."
    ],
    "recipe": {
      "label": "Pasta alla Norma kotona",
      "yield": "4 annosta",
      "time": "n. 50 min",
      "ingredients": [
        "400 g rigatonia, maccheronia tai spagettia",
        "2 munakoisoa",
        "700 g pilkottuja tai kokonaisia säilyketomaatteja",
        "2 valkosipulinkynttä",
        "oliiviöljyä",
        "1 nippu basilikaa",
        "80–100 g ricotta salataa",
        "suolaa ja mustapippuria"
      ],
      "steps": [
        "Leikkaa munakoiso viipaleiksi tai kuutioiksi, suolaa kevyesti ja kuivaa mahdollinen pintakosteus.",
        "Paista munakoiso oliiviöljyssä syvän kullanruskeaksi ja pehmeäksi; siirrä sivuun.",
        "Kuullota valkosipulia hetki, lisää tomaatti ja hauduta kastike tiiviiksi.",
        "Keitä pasta al dente ja säästä kupillinen keitinvettä.",
        "Kääntele pasta tomaattikastikkeeseen pienen keitinvesimäärän kanssa, lisää suurin osa munakoisosta ja basilika.",
        "Tarjoile lopun munakoison ja runsaan raastetun ricotta salatan kanssa."
      ]
    },
    "variants": [
      "Catanian tyyli maccheronilla tai muulla lyhyellä pastalla.",
      "Joissakin kodeissa käytetään uunissa paistettua munakoisoa kevyempään versioon.",
      "Ricotta salatan suolaisuus ja kuivuus vaihtelevat valmistajittain."
    ],
    "serving": [
      "Tarjoillaan heti, kun pasta kiiltää kastikkeesta ja juusto erottuu vielä selvästi.",
      "Yksinkertainen vihreä lisuke riittää; ruoka toimii sellaisenaan."
    ],
    "commonMistakes": [
      "Raa'an tai vaaleaksi jääneen munakoison käyttö, jolloin rakenne on sienimäinen.",
      "Ricotta salatan korvaaminen suoraan tuoreella ricotalla.",
      "Liikaa kastiketta, jolloin pasta ui tomaatissa."
    ]
  },
  "is": {
    "overview": "Pasta alla Norma byggir heilan rétt úr fáum skýrum þáttum: tómatsósu, steiktu eða djúpsteiktu eggaldini, pasta, ferskri basilíku og ricotta salata. Styrkurinn liggur í andstæðunni milli sætra tómata, mjúks eggaldins og salts osts.",
    "history": "Rétturinn tengist Catania og nafnið er jafnan tengt óperu Bellinis, Norma, þótt uppruni nafnsins sé sagður á ýmsa vegu. Í dag telst hann meðal þekktustu pastarétta Sikileyjar.",
    "flavor": "Sætir og súrir tómatar mæta mjúku eggaldini, piparkenndri basilíku og greinilega saltri ricotta. Bragðið á að vera þétt án þess að verða þungt.",
    "technique": "Eggaldinið þarf að brúnast vel og missa hrátt, vatnskennt bragð sitt. Sjóðið tómatsósuna niður svo hún hjúpi pastað og notið dálítið pastavatn til að binda sósuna áður en eggaldini og osti er bætt við.",
    "essentials": [
      "Þroskaðir tómatar eða góðir niðursoðnir tómatar.",
      "Eggaldin steikt eða djúpsteikt þar til það er gyllt og mjúkt.",
      "Ricotta salata, ekki venjuleg fersk ricotta.",
      "Basilíka og pasta með góðu biti."
    ],
    "recipe": {
      "label": "Pasta alla Norma heima",
      "yield": "4 skammtar",
      "time": "u.þ.b. 50 mín.",
      "ingredients": [
        "400 g rigatoni, maccheroni eða spaghetti",
        "2 eggaldin",
        "700 g saxaðir eða heilir niðursoðnir tómatar",
        "2 hvítlauksrif",
        "ólífuolía",
        "1 knippi af basilíku",
        "80–100 g ricotta salata",
        "salt og svartur pipar"
      ],
      "steps": [
        "Skerið eggaldinið í sneiðar eða teninga, saltið lítillega og þerrið yfirborðsraka.",
        "Steikið eggaldinið í ólífuolíu þar til það er dökkgyllt og mjúkt; leggið til hliðar.",
        "Steikið hvítlauk stutt, bætið tómötum við og látið sósuna malla þar til hún er þétt.",
        "Sjóðið pastað al dente og geymið bolla af pastavatni.",
        "Veltið pastanu upp úr tómatsósunni með dálitlu pastavatni, bætið mestu af eggaldininu og basilíku við.",
        "Berið fram með afganginum af eggaldininu og ríkulega af rifinni ricotta salata."
      ]
    },
    "variants": [
      "Catania-stíll með maccheroni eða öðru stuttu pasta.",
      "Sum heimili nota ofnbakað eggaldin í léttari útgáfu.",
      "Ricotta salata getur verið misjafnlega sölt og þurr eftir framleiðendum."
    ],
    "serving": [
      "Borið fram strax meðan pastað gljáir af sósunni og osturinn er enn greinilegur.",
      "Einfalt grænt meðlæti nægir; rétturinn stendur vel einn og sér."
    ],
    "commonMistakes": [
      "Að nota hrátt eða fölleitt eggaldin sem gefur svampkennda áferð.",
      "Að skipta ricotta salata beint út fyrir ferska ricotta.",
      "Of mikil sósa svo pastað syndi í tómötum."
    ]
  },
  "en": {
    "overview": "Pasta alla Norma builds a whole dish from a few distinct elements: tomato sauce, fried or deep-fried aubergine, pasta, fresh basil and ricotta salata. Its strength lies in the contrast between sweet tomato, creamy aubergine and salty cheese.",
    "history": "The dish is associated with Catania and its name is traditionally linked to Bellini's opera Norma, although the details of the naming have several versions. Today it is considered one of Sicily's best-known pasta dishes.",
    "flavor": "Sweet and tangy tomato meets soft aubergine, peppery basil and distinctly salty ricotta. The flavour should be concentrated without becoming heavy.",
    "technique": "The aubergine must brown properly and lose its raw, watery taste. Reduce the tomato sauce until it can coat the pasta, and use a little pasta water to bind the sauce before adding aubergine and cheese.",
    "essentials": [
      "Ripe tomatoes or good tinned tomatoes.",
      "Aubergine fried or deep-fried until golden and soft.",
      "Ricotta salata, not ordinary fresh ricotta.",
      "Basil and pasta with a good bite."
    ],
    "recipe": {
      "label": "Homemade pasta alla Norma",
      "yield": "4 servings",
      "time": "approx. 50 min",
      "ingredients": [
        "400 g rigatoni, maccheroni or spaghetti",
        "2 aubergines",
        "700 g chopped or whole tinned tomatoes",
        "2 garlic cloves",
        "olive oil",
        "1 bunch of basil",
        "80–100 g ricotta salata",
        "salt and black pepper"
      ],
      "steps": [
        "Slice or dice the aubergine, salt lightly and pat off any surface moisture.",
        "Fry the aubergine in olive oil until deep golden and soft; set aside.",
        "Briefly fry the garlic, add tomato and simmer until concentrated.",
        "Cook the pasta al dente and reserve a cup of pasta water.",
        "Toss the pasta in the tomato sauce with a little pasta water, add most of the aubergine and basil.",
        "Serve with the remaining aubergine and plenty of grated ricotta salata."
      ]
    },
    "variants": [
      "Catania style with maccheroni or another short pasta.",
      "Some homes use oven-baked aubergine for a lighter version.",
      "Ricotta salata varies in saltiness and dryness between producers."
    ],
    "serving": [
      "Serve immediately while the pasta is glossy with sauce and the cheese remains distinct.",
      "A simple green accompaniment is enough; the dish is meant to stand on its own."
    ],
    "commonMistakes": [
      "Using raw or pale aubergine that produces a spongy texture.",
      "Directly replacing ricotta salata with fresh ricotta.",
      "Too much sauce, leaving the pasta swimming in tomato."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
