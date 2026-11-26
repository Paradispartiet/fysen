import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const dosaTranslations = {
  "nn": {
    "overview": "Dosa får karakteren sin frå fermentering: ris og urad dal blir malne til ei glatt røre som utviklar syre, aroma og evne til å bli både sprø og lett. Ho kan serverast naturell eller fyllast, særleg med krydra potet i masala dosa.",
    "history": "Dosa har lange tradisjonar i Sør-India og finst i svært mange regionale former. Moderne restaurantmenyar spenner frå papirtynne paper dosa til tjukkare, mjukare eller kornbaserte variantar.",
    "flavor": "Mildt syrleg, nøtteaktig og rista, med tydeleg sprø tekstur som blir balansert av saftig sambar og kremete chutneyar.",
    "technique": "Fermenteringa må få nok tid, og panna må vere varm, men ikkje så heit at røra set seg før ho kan spreiast tynt. Feitt blir tilsett rundt kanten etter at dosaen er smurd utover.",
    "essentials": [
      "Ris og urad dal som blir bløytte separat.",
      "Fermentering som gjev syre, luftigheit og gode steikeeigenskapar.",
      "Ei flat, godt oppvarma panne eller tawa.",
      "Sambar, kokoschutney og eventuelt potetfyll som klassisk følgje."
    ],
    "recipe": {
      "label": "Masala dosa heime",
      "yield": "8–10 dosa",
      "time": "ca. 45 min + bløytlegging og fermentering",
      "ingredients": [
        "300 g ris",
        "100 g urad dal",
        "1/2 ts bukkehornkløverfrø, valfritt",
        "salt",
        "nøytral olje eller ghee",
        "500 g kokte poteter",
        "1 lauk",
        "1 ts sennepsfrø",
        "gurkemeie og chili",
        "karriblad, valfritt"
      ],
      "steps": [
        "Bløytlegg ris og urad dal separat i minst fire timar og mal dei med vatn til ei glatt røre.",
        "Bland og lat røra fermentere lunt til ho er tydeleg luftig og lett syrleg.",
        "Steik lauk, sennepsfrø og krydder og vend inn grovknuste poteter til eit tørt fyll.",
        "Hell røre på varm panne og spre henne raskt i tynne sirklar før litt olje blir tilsett rundt kanten.",
        "Når dosaen er sprø og slepper panna, legg på potetfyll, brett og server straks."
      ]
    },
    "variants": [
      "Plain dosa utan fyll.",
      "Masala dosa med krydra potet.",
      "Paper dosa – ekstra stor og svært tynn.",
      "Neer dosa og andre regionale variantar bruker andre rører og teknikkar."
    ],
    "serving": [
      "Blir servert direkte frå panna medan overflata framleis er sprø.",
      "Sambar og chutney gjev både væske, syre og krydder til den tørre, sprø dosaen."
    ],
    "commonMistakes": [
      "For kort fermentering som gjev flat smak og svak tekstur.",
      "For tjukk røre som ikkje kan spreiast tynt.",
      "Å stable ferdige dosa oppå kvarandre slik at dampen gjer dei mjuke."
    ]
  },
  "sv": {
    "overview": "Dosa får sin karaktär av fermentering: ris och urad dal mals till en slät smet som utvecklar syra, arom och förmågan att bli både krispig och lätt. Den kan serveras naturell eller fylld, särskilt med kryddad potatis i masala dosa.",
    "history": "Dosa har långa traditioner i södra Indien och finns i många regionala former. Moderna restaurangmenyer sträcker sig från papperstunna paper dosa till tjockare, mjukare eller spannmålsbaserade varianter.",
    "flavor": "Milt syrlig, nötig och rostad, med en tydligt krispig konsistens som balanseras av saftig sambar och krämiga chutneyer.",
    "technique": "Fermenteringen måste få tillräckligt med tid, och pannan ska vara varm men inte så het att smeten stelnar innan den kan bredas ut tunt. Fett tillsätts runt kanten efter att dosan bretts ut.",
    "essentials": [
      "Ris och urad dal som blötläggs separat.",
      "Fermentering som ger syra, luftighet och stekegenskaper.",
      "En platt, väl uppvärmd panna eller tawa.",
      "Sambar, kokoschutney och eventuellt potatisfyllning som klassiska tillbehör."
    ],
    "recipe": {
      "label": "Masala dosa hemma",
      "yield": "8–10 dosa",
      "time": "ca 45 min + blötläggning och fermentering",
      "ingredients": [
        "300 g ris",
        "100 g urad dal",
        "1/2 tsk bockhornsklöverfrön, valfritt",
        "salt",
        "neutral olja eller ghee",
        "500 g kokt potatis",
        "1 lök",
        "1 tsk senapsfrön",
        "gurkmeja och chili",
        "curryblad, valfritt"
      ],
      "steps": [
        "Blötlägg ris och urad dal separat i minst fyra timmar och mal dem med vatten till en slät smet.",
        "Blanda och låt smeten fermentera varmt tills den är tydligt luftig och lätt syrlig.",
        "Stek lök, senapsfrön och kryddor och vänd ner grovt mosad potatis till en torr fyllning.",
        "Häll smet i en varm panna och bred snabbt ut i tunna cirklar innan lite olja tillsätts runt kanten.",
        "När dosan är krispig och lossnar från pannan, lägg på potatisfyllning, vik och servera genast."
      ]
    },
    "variants": [
      "Plain dosa utan fyllning.",
      "Masala dosa med kryddad potatis.",
      "Paper dosa – extra stor och mycket tunn.",
      "Neer dosa och andra regionala varianter använder andra smeter och tekniker."
    ],
    "serving": [
      "Serveras direkt från pannan medan ytan fortfarande är krispig.",
      "Sambar och chutney ger vätska, syra och kryddor till den torra, krispiga dosan."
    ],
    "commonMistakes": [
      "För kort fermentering som ger platt smak och svag konsistens.",
      "För tjock smet som inte kan bredas ut tunt.",
      "Att stapla färdiga dosa så att ångan gör dem mjuka."
    ]
  },
  "da": {
    "overview": "Dosa får sin karakter fra fermentering: ris og urad dal males til en glat dej, der udvikler syre, aroma og evnen til at blive både sprød og let. Den kan serveres naturel eller med fyld, især krydrede kartofler i masala dosa.",
    "history": "Dosa har lange traditioner i Sydindien og findes i mange regionale former. Moderne restaurantmenuer spænder fra papirtynde paper dosa til tykkere, blødere eller kornbaserede varianter.",
    "flavor": "Mildt syrlig, nøddeagtig og ristet med tydelig sprødhed, som afbalanceres af saftig sambar og cremede chutneyer.",
    "technique": "Fermenteringen skal have tilstrækkelig tid, og panden skal være varm, men ikke så hed, at dejen sætter sig, inden den kan fordeles tyndt. Fedtstof tilsættes rundt om kanten, efter at dosaen er bredt ud.",
    "essentials": [
      "Ris og urad dal, der udblødes separat.",
      "Fermentering, der giver syre, luftighed og stegeegenskaber.",
      "En flad, godt opvarmet pande eller tawa.",
      "Sambar, kokoschutney og eventuelt kartoffelfyld som klassisk tilbehør."
    ],
    "recipe": {
      "label": "Masala dosa derhjemme",
      "yield": "8–10 dosa",
      "time": "ca. 45 min + udblødning og fermentering",
      "ingredients": [
        "300 g ris",
        "100 g urad dal",
        "1/2 tsk bukkehornsfrø, valgfrit",
        "salt",
        "neutral olie eller ghee",
        "500 g kogte kartofler",
        "1 løg",
        "1 tsk sennepsfrø",
        "gurkemeje og chili",
        "karryblade, valgfrit"
      ],
      "steps": [
        "Udblød ris og urad dal separat i mindst fire timer, og mal dem med vand til en glat dej.",
        "Bland, og lad dejen fermentere lunt, til den er tydeligt luftig og let syrlig.",
        "Steg løg, sennepsfrø og krydderier, og vend groft mosede kartofler i til et tørt fyld.",
        "Hæld dej på en varm pande, og fordel hurtigt i tynde cirkler, før lidt olie tilsættes langs kanten.",
        "Når dosaen er sprød og slipper panden, tilsæt kartoffelfyld, fold og servér straks."
      ]
    },
    "variants": [
      "Plain dosa uden fyld.",
      "Masala dosa med krydrede kartofler.",
      "Paper dosa – ekstra stor og meget tynd.",
      "Neer dosa og andre regionale varianter bruger andre deje og teknikker."
    ],
    "serving": [
      "Serveres direkte fra panden, mens overfladen stadig er sprød.",
      "Sambar og chutney giver væske, syre og krydderi til den tørre, sprøde dosa."
    ],
    "commonMistakes": [
      "For kort fermentering, som giver flad smag og svag tekstur.",
      "For tyk dej, som ikke kan fordeles tyndt.",
      "At stable færdige dosa, så dampen gør dem bløde."
    ]
  },
  "fi": {
    "overview": "Dosan luonne syntyy fermentoinnista: riisi ja urad dal jauhetaan sileäksi taikinaksi, johon kehittyy hapokkuutta, aromia ja kyky paistua sekä rapeaksi että kevyeksi. Dosa voidaan tarjoilla sellaisenaan tai täytettynä, erityisesti masala dosassa mausteisella perunalla.",
    "history": "Dosalla on pitkät perinteet Etelä-Intiassa ja lukuisia alueellisia muotoja. Nykyiset ravintolamenut ulottuvat paperinohuista paper dosista paksumpiin, pehmeämpiin tai viljapohjaisiin muunnelmiin.",
    "flavor": "Miedosti hapan, pähkinäinen ja paahteinen, selvästi rapea rakenne, jota mehukas sambar ja kermaiset chutneyt tasapainottavat.",
    "technique": "Fermentoinnille on annettava riittävästi aikaa, ja pannun tulee olla kuuma mutta ei niin kuuma, että taikina jähmettyy ennen ohueksi levittämistä. Rasvaa lisätään reunoille levittämisen jälkeen.",
    "essentials": [
      "Riisiä ja urad dalia, jotka liotetaan erikseen.",
      "Fermentointi, joka tuo hapokkuutta, ilmavuutta ja hyvät paisto-ominaisuudet.",
      "Tasainen, hyvin kuumennettu pannu tai tawa.",
      "Sambar, kookoschutney ja mahdollinen perunatäyte perinteisinä lisukkeina."
    ],
    "recipe": {
      "label": "Masala dosa kotona",
      "yield": "8–10 dosaa",
      "time": "n. 45 min + liotus ja fermentointi",
      "ingredients": [
        "300 g riisiä",
        "100 g urad dalia",
        "1/2 tl sarviapilan siemeniä, halutessasi",
        "suolaa",
        "neutraalia öljyä tai gheetä",
        "500 g keitettyjä perunoita",
        "1 sipuli",
        "1 tl sinapinsiemeniä",
        "kurkumaa ja chiliä",
        "currynlehtiä, halutessasi"
      ],
      "steps": [
        "Liota riisiä ja urad dalia erikseen vähintään neljä tuntia ja jauha veden kanssa sileäksi taikinaksi.",
        "Sekoita ja anna taikinan fermentoitua lämpimässä, kunnes se on selvästi ilmavaa ja hieman hapanta.",
        "Paista sipuli, sinapinsiemenet ja mausteet ja kääntele joukkoon karkeasti murskatut perunat kuivahkoksi täytteeksi.",
        "Kaada taikinaa kuumalle pannulle ja levitä nopeasti ohuiksi ympyröiksi ennen öljyn lisäämistä reunoille.",
        "Kun dosa on rapea ja irtoaa pannusta, lisää perunatäyte, taita ja tarjoile heti."
      ]
    },
    "variants": [
      "Plain dosa ilman täytettä.",
      "Masala dosa mausteisella perunatäytteellä.",
      "Paper dosa – erityisen suuri ja hyvin ohut.",
      "Neer dosa ja muut alueelliset muunnelmat käyttävät erilaisia taikinoita ja tekniikoita."
    ],
    "serving": [
      "Tarjoillaan suoraan pannulta pinnan ollessa vielä rapea.",
      "Sambar ja chutney tuovat nestettä, hapokkuutta ja mausteisuutta kuivaan, rapeaan dosaan."
    ],
    "commonMistakes": [
      "Liian lyhyt fermentointi, jolloin maku jää latteaksi ja rakenne heikoksi.",
      "Liian paksu taikina, jota ei voi levittää ohueksi.",
      "Valmiiden dosien pinoaminen, jolloin höyry pehmentää ne."
    ]
  },
  "is": {
    "overview": "Dosa fær sérkenni sín frá gerjun: hrísgrjón og urad dal eru möluð í slétta blöndu sem þróar sýru, ilm og hæfileika til að verða bæði stökk og létt. Hana má bera fram án fyllingar eða með fyllingu, einkum krydduðum kartöflum í masala dosa.",
    "history": "Dosa á sér langa hefð á Suður-Indlandi og er til í fjölmörgum svæðisbundnum gerðum. Nútíma matseðlar spanna allt frá pappírsþunnum paper dosa til þykkari, mýkri eða kornbundinna útgáfa.",
    "flavor": "Mildlega súrt, hnetukennt og ristað bragð með greinilegri stökkri áferð sem safaríkt sambar og rjómakennt chutney vega upp á móti.",
    "technique": "Gerjunin þarf nægan tíma og pannan þarf að vera heit en ekki svo heit að blandan storkni áður en hægt er að dreifa henni þunnt. Fitu er bætt við brúnirnar eftir að deiginu hefur verið dreift.",
    "essentials": [
      "Hrísgrjón og urad dal sem eru lögð í bleyti hvort í sínu lagi.",
      "Gerjun sem gefur sýru, loftkennda áferð og góða steikingareiginleika.",
      "Flöt, vel hituð panna eða tawa.",
      "Sambar, kókos-chutney og mögulega kartöflufylling sem klassískt meðlæti."
    ],
    "recipe": {
      "label": "Masala dosa heima",
      "yield": "8–10 dosa",
      "time": "u.þ.b. 45 mín. + bleyting og gerjun",
      "ingredients": [
        "300 g hrísgrjón",
        "100 g urad dal",
        "1/2 tsk. grikkjasmárafræ, valfrjálst",
        "salt",
        "bragðlítil olía eða ghee",
        "500 g soðnar kartöflur",
        "1 laukur",
        "1 tsk. sinnepsfræ",
        "túrmerik og chili",
        "karrílauf, valfrjálst"
      ],
      "steps": [
        "Leggið hrísgrjón og urad dal í bleyti hvort í sínu lagi í að minnsta kosti fjórar klukkustundir og malið með vatni í slétta blöndu.",
        "Blandið saman og látið gerjast á hlýjum stað þar til blandan er greinilega loftkennd og örlítið súr.",
        "Steikið lauk, sinnepsfræ og krydd og blandið grófmuldum kartöflum saman við í þurra fyllingu.",
        "Hellið blöndunni á heita pönnu og dreifið hratt í þunna hringi áður en dálítilli olíu er bætt við brúnirnar.",
        "Þegar dosa er stökk og losnar af pönnunni, setjið kartöflufyllingu á hana, brjótið saman og berið strax fram."
      ]
    },
    "variants": [
      "Plain dosa án fyllingar.",
      "Masala dosa með krydduðum kartöflum.",
      "Paper dosa – sérstaklega stór og mjög þunn.",
      "Neer dosa og aðrar svæðisbundnar útgáfur nota annars konar blöndur og aðferðir."
    ],
    "serving": [
      "Borið fram beint af pönnunni meðan yfirborðið er enn stökkt.",
      "Sambar og chutney gefa vökva, sýru og krydd á móti þurri, stökkri dosa."
    ],
    "commonMistakes": [
      "Of stutt gerjun sem gefur flatt bragð og lélega áferð.",
      "Of þykk blanda sem ekki er hægt að dreifa þunnt.",
      "Að stafla tilbúnum dosa svo gufan mýki þær."
    ]
  },
  "en": {
    "overview": "Dosa gets its character from fermentation: rice and urad dal are ground into a smooth batter that develops acidity, aroma and the ability to become both crisp and light. It can be served plain or filled, particularly with spiced potato in masala dosa.",
    "history": "Dosa has long traditions in South India and exists in many regional forms. Modern restaurant menus range from paper-thin paper dosa to thicker, softer or grain-based versions.",
    "flavor": "Mildly tangy, nutty and toasted, with a distinct crisp texture balanced by moist sambar and creamy chutneys.",
    "technique": "Fermentation needs sufficient time, and the pan must be hot but not so hot that the batter sets before it can be spread thinly. Fat is added around the edges after spreading the dosa.",
    "essentials": [
      "Rice and urad dal soaked separately.",
      "Fermentation for acidity, lightness and cooking properties.",
      "A flat, well-heated pan or tawa.",
      "Sambar, coconut chutney and optional potato filling as classic accompaniments."
    ],
    "recipe": {
      "label": "Homemade masala dosa",
      "yield": "8–10 dosa",
      "time": "approx. 45 min + soaking and fermentation",
      "ingredients": [
        "300 g rice",
        "100 g urad dal",
        "1/2 tsp fenugreek seeds, optional",
        "salt",
        "neutral oil or ghee",
        "500 g cooked potatoes",
        "1 onion",
        "1 tsp mustard seeds",
        "turmeric and chilli",
        "curry leaves, optional"
      ],
      "steps": [
        "Soak the rice and urad dal separately for at least four hours and grind with water into a smooth batter.",
        "Mix and ferment the batter in a warm place until distinctly airy and slightly tangy.",
        "Fry onion, mustard seeds and spices and fold in roughly crushed potatoes to make a dry filling.",
        "Pour batter onto a hot pan and quickly spread it in thin circles before adding a little oil around the edges.",
        "When the dosa is crisp and releases from the pan, add the potato filling, fold and serve immediately."
      ]
    },
    "variants": [
      "Plain dosa without filling.",
      "Masala dosa with spiced potato.",
      "Paper dosa – extra large and very thin.",
      "Neer dosa and other regional versions use different batters and techniques."
    ],
    "serving": [
      "Serve directly from the pan while the surface remains crisp.",
      "Sambar and chutney provide moisture, acidity and spice to the dry, crisp dosa."
    ],
    "commonMistakes": [
      "Insufficient fermentation, resulting in flat flavour and poor texture.",
      "Batter too thick to spread thinly.",
      "Stacking cooked dosa so steam makes them soft."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
