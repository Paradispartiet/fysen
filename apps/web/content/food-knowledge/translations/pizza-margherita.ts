import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const pizzaMargheritaTranslations = {
  "nn": {
    "overview": "Margherita ser enkel ut, men avslører kvaliteten på kvart element. Deigen skal vere elastisk med luftig kant, midten tynn og mjuk, tomaten frisk og osten smelta utan at botnen blir vassmetta.",
    "history": "Pizza har sterke historiske røter i Napoli, medan historia om Margherita-namnet og dronningbesøket blir fortald i fleire versjonar. Kombinasjonen tomat, mozzarella og basilikum har blitt eit globalt symbol på napolitansk pizza.",
    "flavor": "Syrleg tomat, mjølkeaktig mozzarella, frisk basilikum og rista deig. Smaken skal vere direkte og råvaredriven.",
    "technique": "Lang nok fermentering utviklar aroma og strekkbarheit. Form deigen med hendene slik at gassen blir bevart i kanten, og steik pizzaen så varmt og raskt som heimekjøkkenet tillèt.",
    "essentials": [
      "God kveitedeig med kontrollert fermentering.",
      "Knuste tomatar med rein smak og moderat væske.",
      "Mozzarella som får renne av før bruk.",
      "Basilikum, olivenolje og høg steiketemperatur."
    ],
    "recipe": {
      "label": "Margherita på bakestein eller stål heime",
      "yield": "4 pizzaer",
      "time": "ca. 45 min + 8–24 t fermentering",
      "ingredients": [
        "600 g pizzamjøl eller sterkt kveitemjøl",
        "390 g vatn",
        "15 g salt",
        "2 g tørrgjær",
        "1 boks gode heile tomatar",
        "400 g mozzarella",
        "basilikum",
        "extra virgin olivenolje"
      ],
      "steps": [
        "Bland mjøl, vatn, gjær og salt til ein smidig deig og lat han fermentere kjølig eller ved romtemperatur etter tidsplan.",
        "Del i fire emne og lat dei tempererast til dei er mjuke og luftige.",
        "Førehandsvarm pizzastål eller stein på høgaste omnstemperatur i minst 45 minutt.",
        "Form deigen med hendene, legg på eit tynt lag tomat og moderat mengd mozzarella.",
        "Steik så raskt som mogleg til kanten er godt bruna og avslutt med basilikum og olivenolje."
      ]
    },
    "variants": [
      "Pizza marinara utan ost, med tomat, kvitlauk, oregano og olje.",
      "Napolitansk stil med mjuk midte og luftig cornicione.",
      "Heimeomnsvariant på stål med litt lågare hydrering for enklare handtering."
    ],
    "serving": [
      "Blir servert straks medan kanten framleis er sprø utanpå og mjuk inni.",
      "For mykje topping er unødvendig; Margherita lever av balansen mellom få råvarer."
    ],
    "commonMistakes": [
      "For våt mozzarella som gjer midten blaut.",
      "Å bruke kjevle og presse all gass ut av kanten.",
      "For kald steikeflate som tørkar pizzaen før han får farge."
    ]
  },
  "sv": {
    "overview": "Margherita ser enkel ut men avslöjar kvaliteten på varje del. Degen ska vara elastisk med luftig kant, mitten tunn och mjuk, tomaten frisk och osten smält utan att botten blir vattnig.",
    "history": "Pizza har starka historiska rötter i Neapel, medan historien om namnet Margherita och drottningbesöket berättas i flera versioner. Kombinationen tomat, mozzarella och basilika har blivit en global symbol för napolitansk pizza.",
    "flavor": "Syrlig tomat, mjölkig mozzarella, frisk basilika och rostad deg. Smaken ska vara direkt och råvarudriven.",
    "technique": "Tillräckligt lång fermentering utvecklar arom och töjbarhet. Degen formas för hand så att gasen bevaras i kanten, och pizzan gräddas så varmt och snabbt som hemmaköket tillåter.",
    "essentials": [
      "Bra vetedeg med kontrollerad fermentering.",
      "Krossade tomater med ren smak och måttlig vätska.",
      "Mozzarella som får rinna av före användning.",
      "Basilika, olivolja och hög gräddningstemperatur."
    ],
    "recipe": {
      "label": "Margherita på pizzasten eller stål hemma",
      "yield": "4 pizzor",
      "time": "ca 45 min + 8–24 tim fermentering",
      "ingredients": [
        "600 g pizzamjöl eller starkt vetemjöl",
        "390 g vatten",
        "15 g salt",
        "2 g torrjäst",
        "1 burk bra hela tomater",
        "400 g mozzarella",
        "basilika",
        "extra jungfruolivolja"
      ],
      "steps": [
        "Blanda mjöl, vatten, jäst och salt till en smidig deg och låt den fermentera svalt eller i rumstemperatur enligt tidsschemat.",
        "Dela i fyra bitar och låt dem tempereras tills de är mjuka och luftiga.",
        "Förvärm pizzastål eller sten på ugnens högsta temperatur i minst 45 minuter.",
        "Forma degen för hand, lägg på ett tunt lager tomat och måttligt med mozzarella.",
        "Grädda så snabbt som möjligt tills kanten är väl brynt och avsluta med basilika och olivolja."
      ]
    },
    "variants": [
      "Pizza marinara utan ost, med tomat, vitlök, oregano och olja.",
      "Napolitansk stil med mjuk mitt och luftig cornicione.",
      "Hemmaugnsvariant på stål med något lägre hydrering för enklare hantering."
    ],
    "serving": [
      "Serveras genast medan kanten är krispig utanpå och mjuk inuti.",
      "För mycket topping är onödigt; Margherita bygger på balansen mellan få råvaror."
    ],
    "commonMistakes": [
      "För blöt mozzarella som gör mitten blöt.",
      "Att använda kavel och pressa ut all gas ur kanten.",
      "För kall gräddningsyta som torkar pizzan innan den får färg."
    ]
  },
  "da": {
    "overview": "Margherita ser enkel ud, men afslører kvaliteten af hvert element. Dejen skal være elastisk med luftig kant, midten tynd og blød, tomaten frisk og osten smeltet uden at gøre bunden vandmættet.",
    "history": "Pizza har stærke historiske rødder i Napoli, mens historien om navnet Margherita og dronningebesøget fortælles i flere versioner. Kombinationen af tomat, mozzarella og basilikum er blevet et globalt symbol på napolitansk pizza.",
    "flavor": "Syrlig tomat, mælkeagtig mozzarella, frisk basilikum og ristet dej. Smagen skal være direkte og råvaredrevet.",
    "technique": "Tilstrækkelig lang fermentering udvikler aroma og strækbarhed. Dejen formes med hænderne, så gassen bevares i kanten, og pizzaen bages så varmt og hurtigt, som hjemmekøkkenet tillader.",
    "essentials": [
      "God hvededej med kontrolleret fermentering.",
      "Knuste tomater med ren smag og moderat væske.",
      "Mozzarella, der får lov at dryppe af inden brug.",
      "Basilikum, olivenolie og høj bagetemperatur."
    ],
    "recipe": {
      "label": "Margherita på bagesten eller stål derhjemme",
      "yield": "4 pizzaer",
      "time": "ca. 45 min + 8–24 t fermentering",
      "ingredients": [
        "600 g pizzamel eller stærkt hvedemel",
        "390 g vand",
        "15 g salt",
        "2 g tørgær",
        "1 dåse gode hele tomater",
        "400 g mozzarella",
        "basilikum",
        "ekstra jomfruolivenolie"
      ],
      "steps": [
        "Bland mel, vand, gær og salt til en smidig dej, og lad den fermentere køligt eller ved stuetemperatur efter tidsplanen.",
        "Del i fire dejstykker, og lad dem temperere, til de er bløde og luftige.",
        "Forvarm pizzastål eller sten på ovnens højeste temperatur i mindst 45 minutter.",
        "Form dejen med hænderne, læg et tyndt lag tomat og en moderat mængde mozzarella på.",
        "Bag så hurtigt som muligt, til kanten er godt brunet, og afslut med basilikum og olivenolie."
      ]
    },
    "variants": [
      "Pizza marinara uden ost, med tomat, hvidløg, oregano og olie.",
      "Napolitansk stil med blød midte og luftig cornicione.",
      "Hjemmeovnsvariant på stål med lidt lavere hydrering for lettere håndtering."
    ],
    "serving": [
      "Serveres straks, mens kanten stadig er sprød udenpå og blød indeni.",
      "For meget topping er unødvendigt; Margherita lever af balancen mellem få råvarer."
    ],
    "commonMistakes": [
      "For våd mozzarella, som gør midten blød.",
      "At bruge kagerulle og presse al gas ud af kanten.",
      "For kold bageflade, som tørrer pizzaen, før den får farve."
    ]
  },
  "fi": {
    "overview": "Margherita näyttää yksinkertaiselta, mutta paljastaa jokaisen osan laadun. Taikinan tulee olla joustavaa ja reunojen ilmavat, keskustan ohut ja pehmeä, tomaatin raikas ja juuston sulanut ilman pohjan vettymistä.",
    "history": "Pizzalla on vahvat historialliset juuret Napolissa, kun taas Margherita-nimen ja kuningattaren vierailun tarinasta kerrotaan eri versioita. Tomaatin, mozzarellan ja basilikan yhdistelmästä on tullut napolilaisen pizzan maailmanlaajuinen symboli.",
    "flavor": "Hapokasta tomaattia, maitomaista mozzarellaa, tuoretta basilikaa ja paahteista taikinaa. Maun tulee olla selkeä ja raaka-aineiden hallitsema.",
    "technique": "Riittävän pitkä fermentointi kehittää aromia ja venyvyyttä. Taikina muotoillaan käsin, jotta kaasu säilyy reunoissa, ja pizza paistetaan niin kuumassa ja nopeasti kuin kotikeittiössä on mahdollista.",
    "essentials": [
      "Hyvä vehnätaikina, jonka fermentointia hallitaan.",
      "Tomaattimurskaa, jossa on puhdas maku ja kohtuullisesti nestettä.",
      "Mozzarellaa, joka valutetaan ennen käyttöä.",
      "Basilikaa, oliiviöljyä ja korkea paistolämpötila."
    ],
    "recipe": {
      "label": "Margherita kotona pizzakivellä tai teräksellä",
      "yield": "4 pizzaa",
      "time": "n. 45 min + 8–24 t fermentointi",
      "ingredients": [
        "600 g pizzajauhoja tai vahvoja vehnäjauhoja",
        "390 g vettä",
        "15 g suolaa",
        "2 g kuivahiivaa",
        "1 tölkki hyviä kokonaisia tomaatteja",
        "400 g mozzarellaa",
        "basilikaa",
        "ekstra-neitsytoliiviöljyä"
      ],
      "steps": [
        "Sekoita jauhot, vesi, hiiva ja suola notkeaksi taikinaksi ja anna fermentoitua viileässä tai huoneenlämmössä aikataulun mukaan.",
        "Jaa neljään palaan ja anna lämmetä, kunnes ne ovat pehmeitä ja ilmavia.",
        "Esikuumenna pizzaterästä tai -kiveä uunin korkeimmassa lämpötilassa vähintään 45 minuuttia.",
        "Muotoile taikina käsin, levitä ohut kerros tomaattia ja kohtuullinen määrä mozzarellaa.",
        "Paista mahdollisimman nopeasti, kunnes reuna on kunnolla ruskistunut, ja viimeistele basilikalla ja oliiviöljyllä."
      ]
    },
    "variants": [
      "Pizza marinara ilman juustoa, tomaatilla, valkosipulilla, oreganolla ja öljyllä.",
      "Napolilainen tyyli, jossa on pehmeä keskusta ja ilmava cornicione-reuna.",
      "Kotiuuniversio teräksellä ja hieman pienemmällä vesimäärällä käsittelyn helpottamiseksi."
    ],
    "serving": [
      "Tarjoillaan heti, kun reunat ovat vielä ulkoa rapeita ja sisältä pehmeitä.",
      "Liialliset täytteet ovat turhia; Margherita perustuu muutaman raaka-aineen tasapainoon."
    ],
    "commonMistakes": [
      "Liian märkä mozzarella, joka vetistää keskustan.",
      "Kaulimen käyttö, jolloin kaikki kaasu puristuu reunoista.",
      "Liian viileä paistoalusta, joka kuivattaa pizzan ennen ruskistumista."
    ]
  },
  "is": {
    "overview": "Margherita virðist einföld en sýnir gæði hvers þáttar. Deigið á að vera teygjanlegt með loftkenndum brúnum, miðjan þunn og mjúk, tómatarnir ferskir og osturinn bráðinn án þess að botninn verði vatnsósa.",
    "history": "Pítsa á sér sterkar sögulegar rætur í Napólí, en sagan um Margherita-nafnið og heimsókn drottningarinnar er til í nokkrum útgáfum. Samsetning tómata, mozzarella og basilíku er orðin alþjóðlegt tákn napólískrar pítsu.",
    "flavor": "Súrir tómatar, mjólkurkenndur mozzarella, fersk basilíka og ristað deig. Bragðið á að vera skýrt og ráðast af hráefnunum.",
    "technique": "Nægilega löng gerjun þróar ilm og teygjanleika. Deigið er mótað í höndunum svo loftið haldist í brúnunum og pítsan bökuð eins heitt og hratt og heimiliseldhúsið leyfir.",
    "essentials": [
      "Gott hveitideig með stýrðri gerjun.",
      "Muldir tómatar með hreinu bragði og hóflegum vökva.",
      "Mozzarella sem fær að renna af fyrir notkun.",
      "Basilíka, ólífuolía og hár bökunarhiti."
    ],
    "recipe": {
      "label": "Margherita á bökunarsteini eða stáli heima",
      "yield": "4 pítsur",
      "time": "u.þ.b. 45 mín. + 8–24 klst. gerjun",
      "ingredients": [
        "600 g pítsuhveiti eða sterkt hveiti",
        "390 g vatn",
        "15 g salt",
        "2 g þurrger",
        "1 dós af góðum heilum tómötum",
        "400 g mozzarella",
        "basilíka",
        "extra virgin ólífuolía"
      ],
      "steps": [
        "Blandið hveiti, vatni, geri og salti í mjúkt deig og látið gerjast í kæli eða við stofuhita eftir tímaáætlun.",
        "Skiptið í fjóra bita og látið ná hita þar til þeir eru mjúkir og loftkenndir.",
        "Forhitið pítsustál eða stein við hæsta hita ofnsins í að minnsta kosti 45 mínútur.",
        "Mótið deigið í höndunum, setjið þunnt lag af tómötum og hóflegt magn af mozzarella á.",
        "Bakið eins hratt og hægt er þar til brúnirnar eru vel brúnaðar og ljúkið með basilíku og ólífuolíu."
      ]
    },
    "variants": [
      "Pizza marinara án osts, með tómötum, hvítlauk, oregano og olíu.",
      "Napólískur stíll með mjúkri miðju og loftkenndri cornicione-brún.",
      "Heimilisofnsútgáfa á stáli með örlítið minna vatni til að auðvelda meðhöndlun."
    ],
    "serving": [
      "Borið fram strax meðan brúnirnar eru enn stökkar að utan og mjúkar innan.",
      "Of mikið álegg er óþarft; Margherita byggist á jafnvægi fárra hráefna."
    ],
    "commonMistakes": [
      "Of blautur mozzarella sem gerir miðjuna blauta.",
      "Að nota kökukefli og þrýsta öllu lofti úr brúnunum.",
      "Of kaldur bökunarflötur sem þurrkar pítsuna áður en hún brúnast."
    ]
  },
  "en": {
    "overview": "Margherita looks simple but reveals the quality of every element. The dough should be elastic with an airy rim, the centre thin and soft, the tomato fresh and the cheese melted without waterlogging the base.",
    "history": "Pizza has strong historical roots in Naples, while the story of the Margherita name and the queen's visit has several versions. The combination of tomato, mozzarella and basil has become a global symbol of Neapolitan pizza.",
    "flavor": "Tangy tomato, milky mozzarella, fresh basil and toasted dough. The flavour should be direct and ingredient-led.",
    "technique": "Sufficient fermentation develops aroma and stretchability. Shape the dough by hand to preserve gas in the rim, and bake as hot and quickly as the home kitchen permits.",
    "essentials": [
      "Good wheat dough with controlled fermentation.",
      "Crushed tomatoes with a clean flavour and moderate liquid.",
      "Mozzarella drained before use.",
      "Basil, olive oil and high baking temperature."
    ],
    "recipe": {
      "label": "Margherita on a home pizza stone or steel",
      "yield": "4 pizzas",
      "time": "approx. 45 min + 8–24 hr fermentation",
      "ingredients": [
        "600 g pizza flour or strong wheat flour",
        "390 g water",
        "15 g salt",
        "2 g dried yeast",
        "1 tin good whole tomatoes",
        "400 g mozzarella",
        "basil",
        "extra virgin olive oil"
      ],
      "steps": [
        "Mix flour, water, yeast and salt into a supple dough and ferment in a cool place or at room temperature according to the schedule.",
        "Divide into four dough balls and let them come to temperature until soft and airy.",
        "Preheat a pizza steel or stone at the oven's highest temperature for at least 45 minutes.",
        "Shape the dough by hand, add a thin layer of tomato and a moderate amount of mozzarella.",
        "Bake as quickly as possible until the rim is well browned and finish with basil and olive oil."
      ]
    },
    "variants": [
      "Pizza marinara without cheese, with tomato, garlic, oregano and oil.",
      "Neapolitan style with a soft centre and airy cornicione.",
      "Home-oven version on steel with slightly lower hydration for easier handling."
    ],
    "serving": [
      "Serve immediately while the rim is crisp outside and soft inside.",
      "Excessive toppings are unnecessary; Margherita depends on the balance of a few ingredients."
    ],
    "commonMistakes": [
      "Mozzarella that is too wet, making the centre soggy.",
      "Using a rolling pin and pressing all the gas out of the rim.",
      "A baking surface too cool, drying out the pizza before it browns."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
