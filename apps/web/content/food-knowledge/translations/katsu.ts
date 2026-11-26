import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const katsuTranslations = {
  "nn": {
    "overview": "Katsu er ein enkel idé med stor betydning i japansk kvardagsmat: kjøt eller andre råvarer blir panerte i mjøl, egg og panko før fritering eller steiking. Tonkatsu med svin og chicken katsu er dei mest kjende variantane.",
    "history": "Katsu voks fram i møtet mellom japansk mat og vestleginspirert yōshoku frå slutten av 1800- og byrjinga av 1900-talet. Teknikken blei tilpassa japanske råvarer, serveringsformer og sausar.",
    "flavor": "Kjernen er mild og saftig, medan panko gjev tørr, luftig sprøheit. Tonkatsusaus tilfører sødme, syre og krydder.",
    "technique": "Jamn tjukkleik og rett oljetemperatur er avgjerande. Panko skal festast utan å pressast hardt inn, slik at skorpa held på lufta.",
    "essentials": [
      "Svinefilet, kotelett eller kylling med jamn tjukkleik.",
      "Mjøl og egg som bind paneringa.",
      "Grov panko for lett og sprø skorpe.",
      "Tonkatsusaus og finsnitta kål som klassisk følgje."
    ],
    "recipe": {
      "label": "Chicken katsu heime",
      "yield": "4 porsjonar",
      "time": "ca. 35 min",
      "ingredients": [
        "4 små kyllingfiletar",
        "salt og pepar",
        "60 g kveitemjøl",
        "2 egg",
        "120 g panko",
        "nøytral olje til steiking",
        "finsnitta kål",
        "tonkatsusaus eller ein søt-syrleg brun saus"
      ],
      "steps": [
        "Bank kyllingen varsamt til jamn tjukkleik og krydre.",
        "Vend først i mjøl, så egg og til slutt panko.",
        "Varm eit lag olje til middels høg varme og steik filetane gylne på begge sider.",
        "Kontroller at kyllingen er gjennomsteikt og lat han kvile kort på rist.",
        "Skjer i skiver og server med kål og saus."
      ]
    },
    "variants": [
      "Tonkatsu: svinekotelett eller svinefilet.",
      "Chicken katsu: kylling med same paneringsteknikk.",
      "Katsu curry: katsu med japansk curry og ris.",
      "Katsu sando: sprø katsu i mjukt brød."
    ],
    "serving": [
      "Blir gjerne skoren i strimlar før servering.",
      "Finsnitta kål gjev friskheit og kontrast til fritert skorpe."
    ],
    "commonMistakes": [
      "For låg oljetemperatur som gjer paneringa feit.",
      "Ujamn tjukkleik som gjev tørr kant og rå kjerne.",
      "Å la ferdigsteikt katsu liggje flatt og dampe skorpa mjuk."
    ]
  },
  "sv": {
    "overview": "Katsu är en enkel idé med stor betydelse i japansk vardagsmat: kött eller andra råvaror paneras i mjöl, ägg och panko innan de friteras eller steks. Tonkatsu med fläsk och chicken katsu är de mest kända varianterna.",
    "history": "Katsu växte fram i mötet mellan japansk mat och västinspirerad yōshoku från slutet av 1800-talet och början av 1900-talet. Tekniken anpassades till japanska råvaror, serveringssätt och såser.",
    "flavor": "Kärnan är mild och saftig medan panko ger ett torrt, luftigt fras. Tonkatsusås tillför sötma, syra och kryddor.",
    "technique": "Jämn tjocklek och rätt oljetemperatur är avgörande. Panko ska fästa utan att pressas hårt, så att skorpan förblir luftig.",
    "essentials": [
      "Fläskfilé, kotlett eller kyckling med jämn tjocklek.",
      "Mjöl och ägg som binder paneringen.",
      "Grov panko för en lätt och krispig skorpa.",
      "Tonkatsusås och finstrimlad kål som klassiska tillbehör."
    ],
    "recipe": {
      "label": "Chicken katsu hemma",
      "yield": "4 portioner",
      "time": "ca 35 min",
      "ingredients": [
        "4 små kycklingfiléer",
        "salt och peppar",
        "60 g vetemjöl",
        "2 ägg",
        "120 g panko",
        "neutral olja till stekning",
        "finstrimlad kål",
        "tonkatsusås eller en sötsyrlig brun sås"
      ],
      "steps": [
        "Banka försiktigt kycklingen till jämn tjocklek och krydda.",
        "Vänd först i mjöl, sedan ägg och sist panko.",
        "Värm ett lager olja till medelhög värme och stek filéerna gyllene på båda sidor.",
        "Kontrollera att kycklingen är genomstekt och låt den vila kort på galler.",
        "Skär i skivor och servera med kål och sås."
      ]
    },
    "variants": [
      "Tonkatsu: fläskkotlett eller fläskfilé.",
      "Chicken katsu: kyckling med samma paneringsteknik.",
      "Katsu curry: katsu med japansk curry och ris.",
      "Katsu sando: krispig katsu i mjukt bröd."
    ],
    "serving": [
      "Skärs gärna i strimlor före servering.",
      "Finstrimlad kål ger friskhet och kontrast till den friterade skorpan."
    ],
    "commonMistakes": [
      "För låg oljetemperatur som gör paneringen fet.",
      "Ojämn tjocklek som ger torr kant och rå kärna.",
      "Att låta färdigstekt katsu ligga plant så att ångan gör skorpan mjuk."
    ]
  },
  "da": {
    "overview": "Katsu er en enkel idé med stor betydning i japansk hverdagsmad: kød eller andre råvarer paneres i mel, æg og panko, før de friteres eller steges. Tonkatsu med svinekød og chicken katsu er de mest kendte varianter.",
    "history": "Katsu voksede frem i mødet mellem japansk mad og vestligt inspireret yōshoku fra slutningen af 1800-tallet og begyndelsen af 1900-tallet. Teknikken blev tilpasset japanske råvarer, serveringsformer og saucer.",
    "flavor": "Kernen er mild og saftig, mens panko giver tør, luftig sprødhed. Tonkatsusauce tilfører sødme, syre og krydderier.",
    "technique": "Ensartet tykkelse og korrekt olietemperatur er afgørende. Panko skal hæfte uden at blive presset hårdt ind, så skorpen bevarer sin luftighed.",
    "essentials": [
      "Svinefilet, kotelet eller kylling med ensartet tykkelse.",
      "Mel og æg, der binder paneringen.",
      "Grov panko til en let, sprød skorpe.",
      "Tonkatsusauce og fintsnittet kål som klassisk tilbehør."
    ],
    "recipe": {
      "label": "Chicken katsu derhjemme",
      "yield": "4 portioner",
      "time": "ca. 35 min",
      "ingredients": [
        "4 små kyllingefileter",
        "salt og peber",
        "60 g hvedemel",
        "2 æg",
        "120 g panko",
        "neutral olie til stegning",
        "fintsnittet kål",
        "tonkatsusauce eller en sød-syrlig brun sauce"
      ],
      "steps": [
        "Bank forsigtigt kyllingen til ensartet tykkelse, og krydr.",
        "Vend først i mel, derefter æg og til sidst panko.",
        "Varm et lag olie til middelhøj varme, og steg fileterne gyldne på begge sider.",
        "Kontrollér, at kyllingen er gennemstegt, og lad den hvile kort på en rist.",
        "Skær i skiver, og servér med kål og sauce."
      ]
    },
    "variants": [
      "Tonkatsu: svinekotelet eller svinefilet.",
      "Chicken katsu: kylling med samme paneringsteknik.",
      "Katsu curry: katsu med japansk karry og ris.",
      "Katsu sando: sprød katsu i blødt brød."
    ],
    "serving": [
      "Skæres gerne i strimler før servering.",
      "Fintsnittet kål giver friskhed og kontrast til den friterede skorpe."
    ],
    "commonMistakes": [
      "For lav olietemperatur, som gør paneringen fedtet.",
      "Ujævn tykkelse, som giver tør kant og rå kerne.",
      "At lade færdigstegt katsu ligge fladt, så dampen gør skorpen blød."
    ]
  },
  "fi": {
    "overview": "Katsu on yksinkertainen mutta tärkeä osa japanilaista arkiruokaa: liha tai muu raaka-aine paneroidaan jauholla, kananmunalla ja pankolla ennen uppo- tai pannupaistoa. Sianlihasta tehtävä tonkatsu ja chicken katsu ovat tunnetuimmat versiot.",
    "history": "Katsu syntyi japanilaisen ruoan ja länsivaikutteisen yōshokun kohtaamisesta 1800-luvun lopulla ja 1900-luvun alussa. Tekniikka mukautui japanilaisiin raaka-aineisiin, tarjoilutapoihin ja kastikkeisiin.",
    "flavor": "Sisus on mieto ja mehukas, ja panko antaa kuivan, ilmavan rapeuden. Tonkatsukastike tuo makeutta, hapokkuutta ja mausteisuutta.",
    "technique": "Tasainen paksuus ja sopiva öljyn lämpötila ovat ratkaisevia. Panko kiinnitetään painamatta sitä tiukasti, jotta kuori säilyy ilmavana.",
    "essentials": [
      "Tasapaksua sianfileetä, kyljystä tai kanaa.",
      "Jauhoa ja kananmunaa paneroinnin kiinnittämiseen.",
      "Karkeaa pankoa kevyen ja rapean kuoren saamiseksi.",
      "Tonkatsukastiketta ja hienoksi suikaloitua kaalia perinteisinä lisukkeina."
    ],
    "recipe": {
      "label": "Chicken katsu kotona",
      "yield": "4 annosta",
      "time": "n. 35 min",
      "ingredients": [
        "4 pientä broilerinfileetä",
        "suolaa ja pippuria",
        "60 g vehnäjauhoja",
        "2 kananmunaa",
        "120 g pankoa",
        "neutraalin makuista paistoöljyä",
        "hienoksi suikaloitua kaalia",
        "tonkatsukastiketta tai makeanhapanta ruskeaa kastiketta"
      ],
      "steps": [
        "Nuiji kana varovasti tasapaksuksi ja mausta.",
        "Pyöritä ensin jauhoissa, sitten munassa ja lopuksi pankossa.",
        "Kuumenna öljykerros keskilämpöä kuumemmaksi ja paista fileet kullanruskeiksi molemmin puolin.",
        "Varmista kanan kypsyys ja anna levätä hetki ritilällä.",
        "Viipaloi ja tarjoile kaalin ja kastikkeen kanssa."
      ]
    },
    "variants": [
      "Tonkatsu: siankyljys tai -filee.",
      "Chicken katsu: kana samalla panerointitekniikalla.",
      "Katsu curry: katsu japanilaisen curryn ja riisin kanssa.",
      "Katsu sando: rapea katsu pehmeässä leivässä."
    ],
    "serving": [
      "Leikataan usein suikaleiksi ennen tarjoilua.",
      "Suikaloitu kaali tuo raikkautta ja vastapainoa paistetulle kuorelle."
    ],
    "commonMistakes": [
      "Liian viileä öljy, joka tekee paneroinnista rasvaisen.",
      "Epätasainen paksuus, jolloin reunat kuivuvat ja sisus jää raa'aksi.",
      "Valmiin katsun jättäminen tasaiselle alustalle, jolloin höyry pehmentää kuoren."
    ]
  },
  "is": {
    "overview": "Katsu er einföld hugmynd sem skiptir miklu í japönskum hversdagsmat: kjöt eða annað hráefni er húðað með hveiti, eggjum og panko áður en það er steikt eða djúpsteikt. Tonkatsu úr svínakjöti og chicken katsu eru þekktustu gerðirnar.",
    "history": "Katsu varð til í samspili japanskrar matargerðar og vestrænt innblásinnar yōshoku undir lok 19. aldar og í upphafi 20. aldar. Aðferðin var löguð að japönsku hráefni, framreiðslu og sósum.",
    "flavor": "Innvolsið er milt og safaríkt en panko gefur þurra, loftkennda stökkleika. Tonkatsu-sósa bætir við sætu, sýru og kryddi.",
    "technique": "Jöfn þykkt og réttur olíuhiti skipta sköpum. Panko á að festast án þess að vera þrýst fast niður svo skorpan haldist loftkennd.",
    "essentials": [
      "Svínalund, kóteletta eða kjúklingur af jafnri þykkt.",
      "Hveiti og egg sem binda hjúpinn.",
      "Gróft panko fyrir létta og stökka skorpu.",
      "Tonkatsu-sósa og fínt skorið kál sem klassískt meðlæti."
    ],
    "recipe": {
      "label": "Chicken katsu heima",
      "yield": "4 skammtar",
      "time": "u.þ.b. 35 mín.",
      "ingredients": [
        "4 lítil kjúklingaflök",
        "salt og pipar",
        "60 g hveiti",
        "2 egg",
        "120 g panko",
        "bragðlítil olía til steikingar",
        "fínt skorið kál",
        "tonkatsu-sósa eða sæt­súr brún sósa"
      ],
      "steps": [
        "Berjið kjúklinginn varlega í jafna þykkt og kryddið.",
        "Veltið fyrst upp úr hveiti, síðan eggjum og loks panko.",
        "Hitið lag af olíu við meðalháan hita og steikið flökin gyllt á báðum hliðum.",
        "Gangið úr skugga um að kjúklingurinn sé fulleldaður og látið hvíla stutt á grind.",
        "Skerið í sneiðar og berið fram með káli og sósu."
      ]
    },
    "variants": [
      "Tonkatsu: svínakóteletta eða svínalund.",
      "Chicken katsu: kjúklingur með sömu hjúpunaraðferð.",
      "Katsu curry: katsu með japönsku karríi og hrísgrjónum.",
      "Katsu sando: stökkt katsu í mjúku brauði."
    ],
    "serving": [
      "Oft skorið í ræmur fyrir framreiðslu.",
      "Fínt skorið kál gefur ferskleika og andstæðu við steiktu skorpuna."
    ],
    "commonMistakes": [
      "Of lágur olíuhiti sem gerir hjúpinn feitan.",
      "Ójöfn þykkt sem gefur þurra brún og hráan kjarna.",
      "Að láta steikt katsu liggja flatt svo gufan mýki skorpuna."
    ]
  },
  "en": {
    "overview": "Katsu is a simple idea with great importance in everyday Japanese cooking: meat or another ingredient is coated in flour, egg and panko before deep-frying or pan-frying. Pork tonkatsu and chicken katsu are the best-known versions.",
    "history": "Katsu emerged where Japanese cooking met Western-inspired yōshoku in the late nineteenth and early twentieth centuries. The technique was adapted to Japanese ingredients, serving styles and sauces.",
    "flavor": "The centre is mild and juicy, while panko provides a dry, airy crunch. Tonkatsu sauce adds sweetness, acidity and spices.",
    "technique": "Even thickness and the right oil temperature are essential. Attach the panko without pressing it down hard so the crust retains its airiness.",
    "essentials": [
      "Pork fillet, chop or chicken of even thickness.",
      "Flour and egg to bind the coating.",
      "Coarse panko for a light, crisp crust.",
      "Tonkatsu sauce and finely shredded cabbage as classic accompaniments."
    ],
    "recipe": {
      "label": "Homemade chicken katsu",
      "yield": "4 servings",
      "time": "approx. 35 min",
      "ingredients": [
        "4 small chicken fillets",
        "salt and pepper",
        "60 g wheat flour",
        "2 eggs",
        "120 g panko",
        "neutral oil for frying",
        "finely shredded cabbage",
        "tonkatsu sauce or a sweet-sour brown sauce"
      ],
      "steps": [
        "Gently pound the chicken to an even thickness and season.",
        "Coat first in flour, then egg and finally panko.",
        "Heat a layer of oil over medium-high heat and fry the fillets until golden on both sides.",
        "Check that the chicken is cooked through and rest briefly on a wire rack.",
        "Slice and serve with cabbage and sauce."
      ]
    },
    "variants": [
      "Tonkatsu: pork chop or pork fillet.",
      "Chicken katsu: chicken with the same coating technique.",
      "Katsu curry: katsu with Japanese curry and rice.",
      "Katsu sando: crisp katsu in soft bread."
    ],
    "serving": [
      "Often sliced into strips before serving.",
      "Finely shredded cabbage provides freshness and contrast to the fried crust."
    ],
    "commonMistakes": [
      "Oil that is too cool, making the coating greasy.",
      "Uneven thickness, resulting in dry edges and a raw centre.",
      "Leaving cooked katsu flat so steam softens the crust."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
