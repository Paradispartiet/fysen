import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";

type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const carbonaraTranslations = {
  "nn": {
    "overview": "Carbonara er meir ein teknisk krevjande rett enn ein rett med mange ingrediensar. Den kremete kjensla kjem frå emulsjonen mellom egg, ost, feitt frå guanciale og stivelsesrikt pastavatn – ikkje frå ein tung fløytesaus.",
    "history": "Carbonara er sterkt knytt til Roma og Lazio, men det nøyaktige opphavet er omdiskutert. Retten slik han er kjend i dag, blei særleg synleg i etterkrigstida og har sidan fått ein tydeleg romersk identitet.",
    "flavor": "Salt, peparprega og djupt umamirik, med sødme og nøttepreg frå steikt guanciale og skarpheit frå pecorino romano.",
    "technique": "Temperaturkontroll er avgjerande: egg- og osteblandinga skal møte varm pasta utan direkte høg varme. Pastavatn justerer både salt, temperatur og emulsjon.",
    "essentials": [
      "Pasta, ofte spaghetti eller rigatoni.",
      "Egg eller ei blanding av egg og ekstra eggeplommer.",
      "Pecorino romano og rikeleg svart pepar.",
      "Guanciale som blir steikt til feittet smeltar ut og kantane blir sprø."
    ],
    "recipe": {
      "label": "Romerskinspirert carbonara",
      "yield": "4 porsjonar",
      "time": "ca. 30 min",
      "ingredients": [
        "400 g spaghetti eller rigatoni",
        "150 g guanciale",
        "3 egg",
        "2 eggeplommer",
        "100 g finriven pecorino romano",
        "grovmalen svart pepar",
        "salt til pastavatnet"
      ],
      "steps": [
        "Skjer guanciale i bitar og steik roleg til feittet har smelta ut og kjøtet er gyllent.",
        "Visp egg, eggeplommer, pecorino og rikeleg pepar til ein tjukk masse.",
        "Kok pastaen litt fastare enn al dente og ta vare på mykje pastavatn.",
        "Vend pastaen i guancialefeittet, ta panna av varmen og lat temperaturen falle nokre sekund.",
        "Rør inn eggemassen og små mengder pastavatn energisk til sausen blir blank og kremete utan at egget koagulerer til eggerøre."
      ]
    },
    "variants": [
      "Spaghetti carbonara – den mest ikoniske forma.",
      "Rigatoni gjev større flater og holrom for saus og guanciale.",
      "Forholdet mellom heile egg og eggeplommer varierer mellom kokkar."
    ],
    "serving": [
      "Blir servert straks med meir pecorino og pepar.",
      "Sausen skal vere blank og flytande nok til å omslutte pastaen, ikkje stå som ein tjukk klump."
    ],
    "commonMistakes": [
      "Å tilsetje egg over direkte høg varme.",
      "Å bruke for lite pastavatn til å skape emulsjon.",
      "Å salte pastavatnet for mykje når både pecorino og guanciale allereie er svært salte."
    ]
  },
  "sv": {
    "overview": "Carbonara är mer en fråga om teknik än om många ingredienser. Den krämiga känslan kommer från en emulsion av ägg, ost, fett från guanciale och stärkelserikt pastavatten – inte från en tung gräddsås.",
    "history": "Carbonara förknippas starkt med Rom och Lazio, men den exakta ursprungshistorien är omdiskuterad. Rätten som vi känner den i dag blev särskilt framträdande under efterkrigstiden och har sedan dess fått en tydlig romersk identitet.",
    "flavor": "Salt, pepprig och djupt umamirik, med sötma och nötaktiga toner från stekt guanciale och skärpa från pecorino romano.",
    "technique": "Temperaturkontroll är avgörande: ägg- och ostblandningen ska möta varm pasta utan direkt hög värme. Pastavattnet justerar både salthalt, temperatur och emulsion.",
    "essentials": [
      "Pasta, ofta spaghetti eller rigatoni.",
      "Ägg eller en blandning av ägg och extra äggulor.",
      "Pecorino romano och rikligt med svartpeppar.",
      "Guanciale som steks tills fettet smälter ut och kanterna blir krispiga."
    ],
    "recipe": {
      "label": "Romerskinspirerad carbonara",
      "yield": "4 portioner",
      "time": "ca 30 min",
      "ingredients": [
        "400 g spaghetti eller rigatoni",
        "150 g guanciale",
        "3 ägg",
        "2 äggulor",
        "100 g finriven pecorino romano",
        "grovmalen svartpeppar",
        "salt till pastavattnet"
      ],
      "steps": [
        "Skär guanciale i bitar och stek på låg värme tills fettet smält ut och köttet är gyllene.",
        "Vispa ägg, äggulor, pecorino och rikligt med peppar till en tjock smet.",
        "Koka pastan något fastare än al dente och spara rikligt med pastavatten.",
        "Vänd pastan i fettet från guancialen, ta pannan från värmen och låt temperaturen sjunka några sekunder.",
        "Rör kraftigt ner äggblandningen och små mängder pastavatten tills såsen blir blank och krämig utan att äggen koagulerar till äggröra."
      ]
    },
    "variants": [
      "Spaghetti carbonara – den mest ikoniska formen.",
      "Rigatoni ger större ytor och hålrum för sås och guanciale.",
      "Förhållandet mellan hela ägg och äggulor varierar mellan kockar."
    ],
    "serving": [
      "Serveras omedelbart med mer pecorino och peppar.",
      "Såsen ska vara blank och tillräckligt flytande för att omsluta pastan, inte ligga som en tjock klump."
    ],
    "commonMistakes": [
      "Att tillsätta ägg över direkt hög värme.",
      "Att använda för lite pastavatten för att skapa en emulsion.",
      "Att salta pastavattnet för mycket när både pecorino och guanciale redan är mycket salta."
    ]
  },
  "da": {
    "overview": "Carbonara handler mere om teknik end om mange ingredienser. Den cremede fornemmelse kommer fra en emulsion af æg, ost, fedt fra guanciale og stivelsesrigt pastavand – ikke fra en tung flødesauce.",
    "history": "Carbonara forbindes stærkt med Rom og Lazio, men den præcise oprindelseshistorie er omdiskuteret. Retten, som den kendes i dag, blev især synlig i efterkrigstiden og har siden fået en tydelig romersk identitet.",
    "flavor": "Salt, pebret og dybt umamirig med sødme og nøddeagtige toner fra stegt guanciale og skarphed fra pecorino romano.",
    "technique": "Temperaturkontrol er afgørende: ægge- og osteblandingen skal møde varm pasta uden direkte høj varme. Pastavand justerer både salt, temperatur og emulsion.",
    "essentials": [
      "Pasta, ofte spaghetti eller rigatoni.",
      "Æg eller en blanding af æg og ekstra æggeblommer.",
      "Pecorino romano og rigeligt sort peber.",
      "Guanciale, der steges, til fedtet smelter af, og kanterne bliver sprøde."
    ],
    "recipe": {
      "label": "Romerskinspireret carbonara",
      "yield": "4 portioner",
      "time": "ca. 30 min",
      "ingredients": [
        "400 g spaghetti eller rigatoni",
        "150 g guanciale",
        "3 æg",
        "2 æggeblommer",
        "100 g fintrevet pecorino romano",
        "groftmalet sort peber",
        "salt til pastavandet"
      ],
      "steps": [
        "Skær guanciale i stykker, og steg ved rolig varme, til fedtet er smeltet af, og kødet er gyldent.",
        "Pisk æg, æggeblommer, pecorino og rigeligt peber til en tyk masse.",
        "Kog pastaen lidt fastere end al dente, og gem rigeligt pastavand.",
        "Vend pastaen i guancialefedtet, tag panden af varmen, og lad temperaturen falde i nogle sekunder.",
        "Rør æggemassen og små mængder pastavand energisk i, til saucen bliver blank og cremet, uden at ægget koagulerer til røræg."
      ]
    },
    "variants": [
      "Spaghetti carbonara – den mest ikoniske form.",
      "Rigatoni giver større flader og hulrum til sauce og guanciale.",
      "Forholdet mellem hele æg og æggeblommer varierer mellem kokke."
    ],
    "serving": [
      "Serveres straks med mere pecorino og peber.",
      "Saucen skal være blank og flydende nok til at omslutte pastaen, ikke ligge som en tyk klump."
    ],
    "commonMistakes": [
      "At tilsætte æg over direkte høj varme.",
      "At bruge for lidt pastavand til at skabe en emulsion.",
      "At oversalte pastavandet, når både pecorino og guanciale allerede er meget salte."
    ]
  },
  "fi": {
    "overview": "Carbonarassa korostuu valmistustekniikka pikemmin kuin raaka-aineiden määrä. Kermainen suutuntuma syntyy munien, juuston, guancialesta irtoavan rasvan ja tärkkelyspitoisen pastan keitinveden emulsiosta – ei raskaasta kermakastikkeesta.",
    "history": "Carbonara yhdistetään vahvasti Roomaan ja Lazioon, mutta sen tarkasta alkuperästä kiistellään. Nykyisessä muodossaan ruokalaji nousi erityisesti esiin sodanjälkeisenä aikana ja on sittemmin saanut vahvan roomalaisen identiteetin.",
    "flavor": "Suolainen, pippurinen ja umamipitoinen. Paistettu guanciale tuo makeutta ja pähkinäisiä sävyjä, pecorino romano puolestaan terävyyttä.",
    "technique": "Lämpötilan hallinta on ratkaisevaa: muna-juustoseos yhdistetään kuumaan pastaan ilman suoraa kovaa lämpöä. Pastan keitinvedellä säädetään suolaisuutta, lämpötilaa ja emulsiota.",
    "essentials": [
      "Pastaa, usein spagettia tai rigatonia.",
      "Kananmunia tai kananmunien ja ylimääräisten keltuaisten seosta.",
      "Pecorino romanoa ja runsaasti mustapippuria.",
      "Guancialea, jota paistetaan, kunnes rasva sulaa ja reunat rapeutuvat."
    ],
    "recipe": {
      "label": "Roomalaistyylinen carbonara",
      "yield": "4 annosta",
      "time": "n. 30 min",
      "ingredients": [
        "400 g spagettia tai rigatonia",
        "150 g guancialea",
        "3 kananmunaa",
        "2 keltuaista",
        "100 g hienoksi raastettua pecorino romanoa",
        "karkeaksi jauhettua mustapippuria",
        "suolaa pastan keitinveteen"
      ],
      "steps": [
        "Leikkaa guanciale paloiksi ja paista rauhallisesti, kunnes rasva on sulanut ja liha on kullanruskeaa.",
        "Vatkaa kananmunat, keltuaiset, pecorino ja runsas pippuri paksuksi seokseksi.",
        "Keitä pasta hieman al dente -kypsyyttä kiinteämmäksi ja ota runsaasti keitinvettä talteen.",
        "Kääntele pasta guancialesta irronneessa rasvassa, nosta pannu pois liedeltä ja anna lämpötilan laskea muutaman sekunnin ajan.",
        "Sekoita munaseos ja pienet määrät keitinvettä voimakkaasti pastaan, kunnes kastike on kiiltävää ja kermaista ilman, että muna hyytyy munakokkeliksi."
      ]
    },
    "variants": [
      "Spaghetti carbonara – tunnetuin muoto.",
      "Rigatonissa on suuremmat pinnat ja ontelot kastikkeelle ja guancialelle.",
      "Kokonaisten munien ja keltuaisten suhde vaihtelee kokin mukaan."
    ],
    "serving": [
      "Tarjoillaan heti pecorinon ja pippurin kera.",
      "Kastikkeen tulee olla kiiltävää ja riittävän juoksevaa peittämään pasta, ei paksuna paakkuna."
    ],
    "commonMistakes": [
      "Munien lisääminen suorassa kovassa lämmössä.",
      "Liian vähäinen keitinvesi emulsion muodostamiseksi.",
      "Pastan keitinveden liiallinen suolaaminen, kun pecorino ja guanciale ovat jo hyvin suolaisia."
    ]
  },
  "is": {
    "overview": "Carbonara snýst fremur um tækni en fjölda hráefna. Rjómakennd áferðin kemur frá þeytiblöndu eggja, osts, fitu úr guanciale og sterkjuríks pastavatns – ekki þungri rjómasósu.",
    "history": "Carbonara er sterklega tengd Róm og Lazio, en nákvæm upprunasaga réttarins er umdeild. Rétturinn í þeirri mynd sem hann er þekktur í dag varð sérstaklega áberandi á eftirstríðsárunum og hefur síðan fengið skýra rómverska sjálfsmynd.",
    "flavor": "Salt, piprað og umamíríkt bragð með sætum og hnetukenndum tónum frá steiktu guanciale og hvössu bragði pecorino romano.",
    "technique": "Hitastýring skiptir öllu máli: eggja- og ostablandan á að fara saman við heitt pasta án beins mikils hita. Pastavatn stillir saltmagn, hitastig og þeytiblönduna.",
    "essentials": [
      "Pasta, oft spaghetti eða rigatoni.",
      "Egg eða blanda af eggjum og aukaeggjarauðum.",
      "Pecorino romano og ríkulegur svartur pipar.",
      "Guanciale sem er steikt þar til fitan bráðnar úr því og brúnirnar verða stökkar."
    ],
    "recipe": {
      "label": "Carbonara að rómverskum hætti",
      "yield": "4 skammtar",
      "time": "u.þ.b. 30 mín.",
      "ingredients": [
        "400 g spaghetti eða rigatoni",
        "150 g guanciale",
        "3 egg",
        "2 eggjarauður",
        "100 g fínt rifinn pecorino romano",
        "grófmalaður svartur pipar",
        "salt í pastavatnið"
      ],
      "steps": [
        "Skerið guanciale í bita og steikið rólega þar til fitan hefur bráðnað úr því og kjötið er gyllt.",
        "Þeytið egg, eggjarauður, pecorino og ríkulegan pipar í þykka blöndu.",
        "Sjóðið pastað aðeins stinnara en al dente og geymið mikið af pastavatninu.",
        "Veltið pastanu upp úr guanciale-fitunni, takið pönnuna af hitanum og látið hitann lækka í nokkrar sekúndur.",
        "Hrærið eggjablöndunni og litlu magni af pastavatni kröftuglega saman við þar til sósan verður gljáandi og rjómakennd án þess að eggin hlaupi í kekki eins og hrærð egg."
      ]
    },
    "variants": [
      "Spaghetti carbonara – þekktasta gerðin.",
      "Rigatoni gefur stærri yfirborðsfleti og holrúm fyrir sósu og guanciale.",
      "Hlutfall heilla eggja og eggjarauða er breytilegt eftir matreiðslumönnum."
    ],
    "serving": [
      "Borið fram strax með meiri pecorino og pipar.",
      "Sósan á að vera gljáandi og nógu fljótandi til að umlykja pastað, ekki liggja í þykkum kekki."
    ],
    "commonMistakes": [
      "Að bæta eggjum við yfir beinum miklum hita.",
      "Að nota of lítið pastavatn til að mynda þeytiblönduna.",
      "Að ofsalta pastavatnið þegar bæði pecorino og guanciale eru þegar mjög sölt."
    ]
  },
  "en": {
    "overview": "Carbonara is more about technique than the number of ingredients. Its creamy texture comes from an emulsion of eggs, cheese, fat rendered from guanciale and starchy pasta water – not from a heavy cream sauce.",
    "history": "Carbonara is strongly associated with Rome and Lazio, but its precise origins are debated. The dish as it is known today became particularly prominent in the post-war period and has since acquired a distinct Roman identity.",
    "flavor": "Salty, peppery and deeply savoury, with sweetness and nutty notes from fried guanciale and sharpness from pecorino romano.",
    "technique": "Temperature control is everything: the egg and cheese mixture should meet hot pasta without direct high heat. Pasta water adjusts the salt level, temperature and emulsion.",
    "essentials": [
      "Pasta, often spaghetti or rigatoni.",
      "Eggs or a mixture of eggs and extra egg yolks.",
      "Pecorino romano and plenty of black pepper.",
      "Guanciale fried until its fat renders and the edges become crisp."
    ],
    "recipe": {
      "label": "Roman-inspired carbonara",
      "yield": "4 servings",
      "time": "approx. 30 min",
      "ingredients": [
        "400 g spaghetti or rigatoni",
        "150 g guanciale",
        "3 eggs",
        "2 egg yolks",
        "100 g finely grated pecorino romano",
        "coarsely ground black pepper",
        "salt for the pasta water"
      ],
      "steps": [
        "Cut the guanciale into pieces and fry gently until the fat has rendered and the meat is golden.",
        "Whisk the eggs, egg yolks, pecorino and plenty of pepper into a thick mixture.",
        "Cook the pasta until slightly firmer than al dente and reserve plenty of pasta water.",
        "Toss the pasta in the guanciale fat, remove the pan from the heat and let the temperature fall for a few seconds.",
        "Stir the egg mixture and small amounts of pasta water vigorously into the pasta until the sauce is glossy and creamy without the eggs coagulating into scrambled eggs."
      ]
    },
    "variants": [
      "Spaghetti carbonara – the most iconic form.",
      "Rigatoni provides larger surfaces and cavities for sauce and guanciale.",
      "The ratio of whole eggs to yolks varies between cooks."
    ],
    "serving": [
      "Serve immediately with extra pecorino and pepper.",
      "The sauce should be glossy and fluid enough to coat the pasta, not sit in a thick lump."
    ],
    "commonMistakes": [
      "Adding eggs over direct high heat.",
      "Using too little pasta water to form an emulsion.",
      "Oversalting the pasta water when both pecorino and guanciale are already very salty."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
