import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const aranciniTranslations = {
  "nn": {
    "overview": "Arancini gjer kokt ris til gatemat ein kan halde i handa: risen blir avkjølt, forma rundt eit konsentrert fyll, panert og fritert. Innsida skal vere saftig og samanhengande, medan skorpa må vere tørr og sprø.",
    "history": "Fylte og friterte risrettar har lange tradisjonar på Sicilia, og forma og namnet varierer regionalt – mellom anna arancini og arancine. I dag finst dei både som klassisk gatemat og moderne restaurantvariantar.",
    "flavor": "Mild og stivelsesrik ris balanserer eit salt, ofte tomat- og kjøtbasert fyll, smelta ost og rista panering.",
    "technique": "Risen må vere klebrig nok til å halde forma, men ikkje våt. Fyllet må vere konsentrert og kaldt, og bollane bør kjølast før panering og fritering.",
    "essentials": [
      "Avkjølt ris, gjerne kokt med kraft og litt safran etter stil.",
      "Eit fast fyll som ragù, ost, erter eller sopp.",
      "Mjøl eller røre og brødsmular som tett panering.",
      "Fritering ved stabil temperatur for tørr skorpe."
    ],
    "recipe": {
      "label": "Arancini med mozzarella og tomatragù",
      "yield": "10–12 stk.",
      "time": "ca. 90 min + avkjøling",
      "ingredients": [
        "350 g risottoris",
        "9 dl kraft",
        "1 lita klype safran, valfritt",
        "40 g parmesan",
        "250 g tjukk kjøt- eller linseragù",
        "150 g mozzarella i terningar",
        "80 g kveitemjøl",
        "2 egg",
        "150 g brødsmular",
        "nøytral olje til fritering"
      ],
      "steps": [
        "Kok risen med kraft til han er mør og ganske tørr, rør inn parmesan og avkjøl heilt på eit brett.",
        "Sørg for at ragùen er tjukk og kald og mozzarellaen godt avrent.",
        "Form ris rundt litt ragù og mozzarella og press til faste bollar eller kjegler.",
        "Vend i mjøl, egg og brødsmular og kjøl aranciniane i minst 20 minutt.",
        "Friter til jamt gyllen skorpe og lat dei renne av kort på rist før servering."
      ]
    },
    "variants": [
      "Al ragù med kjøtsaus, erter og ost.",
      "Al burro med ost og ofte skinke eller béchamelliknande fyll.",
      "Vegetarvariantar med sopp, aubergine eller spinat."
    ],
    "serving": [
      "Blir serverte varme, gjerne etter eit par minutt kvile slik at fyllet set seg.",
      "Passar som snacks, antipasto eller gatemat."
    ],
    "commonMistakes": [
      "For våt ris som kollapsar under fritering.",
      "Varmt eller tynt fyll som lek ut.",
      "For låg frityrtemperatur som gjev oljete panering."
    ]
  },
  "sv": {
    "overview": "Arancini gör kokt ris till gatumat som kan hållas i handen: riset kyls, formas kring en koncentrerad fyllning, paneras och friteras. Insidan ska vara saftig och sammanhängande medan skorpan ska vara torr och krispig.",
    "history": "Fyllda och friterade risrätter har långa traditioner på Sicilien, och form och namn varierar regionalt – bland annat arancini och arancine. I dag finns de både som klassisk gatumat och moderna restaurangtolkningar.",
    "flavor": "Milt, stärkelserikt ris balanserar en salt fyllning, ofta baserad på tomat och kött, smält ost och rostad panering.",
    "technique": "Riset måste vara tillräckligt klibbigt för att hålla formen, men inte blött. Fyllningen ska vara koncentrerad och kall, och bollarna bör kylas före panering och fritering.",
    "essentials": [
      "Avsvalnat ris, gärna kokt med buljong och lite saffran beroende på stil.",
      "Fast fyllning som ragù, ost, ärter eller svamp.",
      "Mjöl eller smet och ströbröd som tät panering.",
      "Fritering vid stabil temperatur för torr skorpa."
    ],
    "recipe": {
      "label": "Arancini med mozzarella och tomatragù",
      "yield": "10–12 st.",
      "time": "ca 90 min + avsvalning",
      "ingredients": [
        "350 g risottoris",
        "9 dl buljong",
        "1 liten nypa saffran, valfritt",
        "40 g parmesan",
        "250 g tjock kött- eller linsragù",
        "150 g mozzarella i tärningar",
        "80 g vetemjöl",
        "2 ägg",
        "150 g ströbröd",
        "neutral olja till fritering"
      ],
      "steps": [
        "Koka riset med buljong tills det är mjukt och ganska torrt, rör ner parmesan och låt svalna helt på en plåt.",
        "Se till att ragùn är tjock och kall och mozzarellan väl avrunnen.",
        "Forma ris kring lite ragù och mozzarella och pressa till fasta bollar eller koner.",
        "Vänd i mjöl, ägg och ströbröd och kyl arancinierna i minst 20 minuter.",
        "Fritera till jämnt gyllene skorpa och låt rinna av kort på galler före servering."
      ]
    },
    "variants": [
      "Al ragù med köttsås, ärter och ost.",
      "Al burro med ost och ofta skinka eller béchamelliknande fyllning.",
      "Vegetariska varianter med svamp, aubergine eller spenat."
    ],
    "serving": [
      "Serveras varma, gärna efter ett par minuters vila så att fyllningen sätter sig.",
      "Passar som snacks, antipasto eller gatumat."
    ],
    "commonMistakes": [
      "För blött ris som kollapsar under friteringen.",
      "Varm eller tunn fyllning som läcker ut.",
      "För låg frityrtemperatur som ger oljig panering."
    ]
  },
  "da": {
    "overview": "Arancini gør kogte ris til håndholdt gademad: risene køles af, formes omkring et koncentreret fyld, paneres og friteres. Indersiden skal være saftig og sammenhængende, mens skorpen skal være tør og sprød.",
    "history": "Fyldte og friterede risretter har lange traditioner på Sicilien, og form og navn varierer regionalt – blandt andet arancini og arancine. I dag findes de både som klassisk gademad og moderne restaurantfortolkninger.",
    "flavor": "Milde, stivelsesrige ris afbalancerer salt fyld, ofte baseret på tomat og kød, smeltet ost og ristet panering.",
    "technique": "Risene skal være klæbrige nok til at holde formen, men ikke våde. Fyldet skal være koncentreret og koldt, og bollerne bør køles inden panering og fritering.",
    "essentials": [
      "Afkølede ris, gerne kogt med bouillon og lidt safran efter stil.",
      "Fast fyld som ragù, ost, ærter eller svampe.",
      "Mel eller dej og rasp som tæt panering.",
      "Fritering ved stabil temperatur for tør skorpe."
    ],
    "recipe": {
      "label": "Arancini med mozzarella og tomatragù",
      "yield": "10–12 stk.",
      "time": "ca. 90 min + afkøling",
      "ingredients": [
        "350 g risottoris",
        "9 dl bouillon",
        "1 lille knivspids safran, valgfrit",
        "40 g parmesan",
        "250 g tyk kød- eller linseragù",
        "150 g mozzarella i tern",
        "80 g hvedemel",
        "2 æg",
        "150 g rasp",
        "neutral olie til fritering"
      ],
      "steps": [
        "Kog risene med bouillon, til de er møre og ret tørre, rør parmesan i, og afkøl helt på en bakke.",
        "Sørg for, at ragùen er tyk og kold, og mozzarellaen godt afdryppet.",
        "Form ris omkring lidt ragù og mozzarella, og pres til faste kugler eller kegler.",
        "Vend i mel, æg og rasp, og køl arancinierne i mindst 20 minutter.",
        "Fritér til en jævnt gylden skorpe, og lad dem kort dryppe af på en rist før servering."
      ]
    },
    "variants": [
      "Al ragù med kødsauce, ærter og ost.",
      "Al burro med ost og ofte skinke eller béchamellignende fyld.",
      "Vegetariske varianter med svampe, aubergine eller spinat."
    ],
    "serving": [
      "Serveres varme, gerne efter et par minutters hvile, så fyldet sætter sig.",
      "Velegnet som snack, antipasto eller gademad."
    ],
    "commonMistakes": [
      "For våde ris, som falder sammen under fritering.",
      "Varmt eller tyndt fyld, som lækker ud.",
      "For lav frituretemperatur, som giver fedtet panering."
    ]
  },
  "fi": {
    "overview": "Arancini tekee keitetystä riisistä kädessä syötävää katuruokaa: riisi jäähdytetään, muotoillaan tiiviin täytteen ympärille, paneroidaan ja uppopaistetaan. Sisuksen tulee olla mehukas ja koossa pysyvä, kuoren kuiva ja rapea.",
    "history": "Täytetyillä ja uppopaistetuilla riisiruoilla on pitkät perinteet Sisiliassa, ja muoto ja nimi vaihtelevat alueittain – esimerkiksi arancini ja arancine. Nykyään niitä saa sekä perinteisenä katuruokana että moderneina ravintolaversioina.",
    "flavor": "Mieto, tärkkelyspitoinen riisi tasapainottaa suolaista, usein tomaatti- ja lihapohjaista täytettä, sulanutta juustoa ja paahteista panerointia.",
    "technique": "Riisin on oltava riittävän tahmeaa pysyäkseen muodossaan, mutta ei märkää. Täytteen on oltava tiivistä ja kylmää, ja pallot kannattaa jäähdyttää ennen panerointia ja uppopaistamista.",
    "essentials": [
      "Jäähdytettyä riisiä, usein liemessä ja tyylin mukaan sahramissa keitettyä.",
      "Kiinteää täytettä, kuten ragùta, juustoa, herneitä tai sieniä.",
      "Jauhoja tai taikinaa ja korppujauhoja tiiviiseen panerointiin.",
      "Uppopaisto tasaisessa lämpötilassa kuivan kuoren saamiseksi."
    ],
    "recipe": {
      "label": "Arancini mozzarellalla ja tomaattiragùlla",
      "yield": "10–12 kpl",
      "time": "n. 90 min + jäähdytys",
      "ingredients": [
        "350 g risottoriisiä",
        "9 dl lientä",
        "1 pieni ripaus sahramia, halutessasi",
        "40 g parmesaania",
        "250 g paksua liha- tai linssiragùta",
        "150 g mozzarellaa kuutioina",
        "80 g vehnäjauhoja",
        "2 kananmunaa",
        "150 g korppujauhoja",
        "neutraalia öljyä uppopaistamiseen"
      ],
      "steps": [
        "Keitä riisiä liemessä, kunnes se on kypsää ja melko kuivaa, sekoita parmesaani joukkoon ja jäähdytä kokonaan tarjottimella.",
        "Varmista, että ragù on paksua ja kylmää ja mozzarella hyvin valutettua.",
        "Muotoile riisiä ragùn ja mozzarellan ympärille ja purista kiinteiksi palloiksi tai kartioiksi.",
        "Pyöritä jauhoissa, kananmunassa ja korppujauhoissa ja jäähdytä arancineja vähintään 20 minuuttia.",
        "Uppopaista tasaisen kullanruskeiksi ja valuta hetki ritilällä ennen tarjoilua."
      ]
    },
    "variants": [
      "Al ragù lihakastikkeella, herneillä ja juustolla.",
      "Al burro juustolla ja usein kinkku- tai béchameltyyppisellä täytteellä.",
      "Kasvisversiot sienillä, munakoisolla tai pinaatilla."
    ],
    "serving": [
      "Tarjoillaan lämpiminä, mielellään parin minuutin levon jälkeen, jotta täyte asettuu.",
      "Sopivat välipalaksi, antipastoksi tai katuruoaksi."
    ],
    "commonMistakes": [
      "Liian märkä riisi, joka hajoaa uppopaistettaessa.",
      "Lämmin tai ohut täyte, joka vuotaa ulos.",
      "Liian alhainen öljyn lämpötila, jolloin panerointi imee öljyä."
    ]
  },
  "is": {
    "overview": "Arancini breytir soðnum hrísgrjónum í götumat sem hægt er að halda á: grjónin eru kæld, mótuð utan um þétta fyllingu, hjúpuð og djúpsteikt. Innra byrðið á að vera safaríkt og halda saman en skorpan þurr og stökk.",
    "history": "Fylltir og djúpsteiktir hrísgrjónaréttir eiga sér langa hefð á Sikiley og lögun og heiti eru svæðisbundin, meðal annars arancini og arancine. Í dag fást þeir bæði sem hefðbundinn götumatur og nútímalegar veitingahúsaútfærslur.",
    "flavor": "Mild, sterkjurík hrísgrjón vega upp á móti saltri fyllingu, oft úr tómötum og kjöti, bráðnum osti og ristuðum hjúpi.",
    "technique": "Grjónin þurfa að vera nógu klístruð til að halda lögun en ekki blaut. Fyllingin þarf að vera þétt og köld og kúlurnar ætti að kæla fyrir hjúpun og djúpsteikingu.",
    "essentials": [
      "Kæld hrísgrjón, gjarnan soðin með soði og dálitlu saffrani eftir stíl.",
      "Þétt fylling eins og ragù, ostur, baunir eða sveppir.",
      "Hveiti eða deig og brauðmylsna sem þéttur hjúpur.",
      "Djúpsteiking við stöðugt hitastig fyrir þurra skorpu."
    ],
    "recipe": {
      "label": "Arancini með mozzarella og tómatragù",
      "yield": "10–12 stk.",
      "time": "u.þ.b. 90 mín. + kæling",
      "ingredients": [
        "350 g risotto-hrísgrjón",
        "9 dl soð",
        "1 lítil klípa af saffrani, valfrjálst",
        "40 g parmesan",
        "250 g þykkt kjöt- eða linsubaunaragù",
        "150 g mozzarella í teningum",
        "80 g hveiti",
        "2 egg",
        "150 g brauðmylsna",
        "bragðlítil olía til djúpsteikingar"
      ],
      "steps": [
        "Sjóðið grjónin í soði þar til þau eru mjúk og nokkuð þurr, hrærið parmesan saman við og kælið alveg á bakka.",
        "Gangið úr skugga um að ragù sé þykkt og kalt og vel hafi runnið af mozzarella.",
        "Mótið grjón utan um dálítið ragù og mozzarella og þrýstið í þéttar kúlur eða keilur.",
        "Veltið upp úr hveiti, eggjum og brauðmylsnu og kælið arancini í að minnsta kosti 20 mínútur.",
        "Djúpsteikið þar til skorpan er jafngyllt og látið renna stutt af á grind fyrir framreiðslu."
      ]
    },
    "variants": [
      "Al ragù með kjötsósu, baunum og osti.",
      "Al burro með osti og oft skinku eða béchamel-líkri fyllingu.",
      "Grænmetisútgáfur með sveppum, eggaldini eða spínati."
    ],
    "serving": [
      "Borið fram heitt, helst eftir nokkurra mínútna hvíld svo fyllingin nái að setjast.",
      "Hentar sem snarl, antipasto eða götumatur."
    ],
    "commonMistakes": [
      "Of blaut hrísgrjón sem falla í sundur við djúpsteikingu.",
      "Heit eða þunn fylling sem lekur út.",
      "Of lágur olíuhiti sem gefur feitan hjúp."
    ]
  },
  "en": {
    "overview": "Arancini turn cooked rice into handheld street food: the rice is cooled, shaped around a concentrated filling, coated and deep-fried. The inside should be moist and cohesive while the crust must be dry and crisp.",
    "history": "Stuffed and fried rice dishes have long traditions in Sicily, and shape and name vary regionally, including arancini and arancine. Today they are found both as classic street food and modern restaurant interpretations.",
    "flavor": "Mild, starchy rice balances a salty, often tomato-and-meat-based filling, melted cheese and toasted breading.",
    "technique": "The rice must be sticky enough to hold its shape but not wet. The filling must be concentrated and cold, and the balls should be chilled before breading and frying.",
    "essentials": [
      "Cooled rice, preferably cooked with stock and a little saffron according to style.",
      "Firm filling such as ragù, cheese, peas or mushrooms.",
      "Flour or batter and breadcrumbs for a close coating.",
      "Frying at a stable temperature for a dry crust."
    ],
    "recipe": {
      "label": "Arancini with mozzarella and tomato ragù",
      "yield": "10–12 pieces",
      "time": "approx. 90 min + cooling",
      "ingredients": [
        "350 g risotto rice",
        "9 dl stock",
        "1 small pinch of saffron, optional",
        "40 g parmesan",
        "250 g thick meat or lentil ragù",
        "150 g mozzarella, cubed",
        "80 g wheat flour",
        "2 eggs",
        "150 g breadcrumbs",
        "neutral oil for deep-frying"
      ],
      "steps": [
        "Cook the rice in stock until tender and fairly dry, stir in parmesan and cool completely on a tray.",
        "Ensure the ragù is thick and cold and the mozzarella well drained.",
        "Shape rice around a little ragù and mozzarella and press into firm balls or cones.",
        "Coat in flour, egg and breadcrumbs and chill the arancini for at least 20 minutes.",
        "Deep-fry until evenly golden and drain briefly on a rack before serving."
      ]
    },
    "variants": [
      "Al ragù with meat sauce, peas and cheese.",
      "Al burro with cheese and often ham or a béchamel-like filling.",
      "Vegetarian versions with mushrooms, aubergine or spinach."
    ],
    "serving": [
      "Serve warm, preferably after resting for a couple of minutes so the filling settles.",
      "Suitable as a snack, antipasto or street food."
    ],
    "commonMistakes": [
      "Rice that is too wet and collapses during frying.",
      "Warm or thin filling that leaks out.",
      "Oil that is too cool, producing greasy breading."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
