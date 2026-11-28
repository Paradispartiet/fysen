import type { PreviewLocale } from "./locale-messages.ts";

// Display labels only; canonical catalogue names remain untouched.
const translations: Readonly<Record<string, readonly [string, string, string, string, string, string]>> = {
  "Asiatisk": [
    "Asiatisk",
    "Asiatiskt",
    "Asiatisk",
    "Aasialainen",
    "Asísk",
    "Asian"
  ],
  "Indisk": [
    "Indisk",
    "Indiskt",
    "Indisk",
    "Intialainen",
    "Indversk",
    "Indian"
  ],
  "Fast food": [
    "Snøggmat",
    "Snabbmat",
    "Fastfood",
    "Pikaruoka",
    "Skyndibiti",
    "Fast food"
  ],
  "Italiensk": [
    "Italiensk",
    "Italienskt",
    "Italiensk",
    "Italialainen",
    "Ítölsk",
    "Italian"
  ],
  "Midtøsten": [
    "Midtausten",
    "Mellanöstern",
    "Mellemøsten",
    "Lähi-itä",
    "Mið-Austurlönd",
    "Middle Eastern"
  ],
  "Mexicansk": [
    "Meksikansk",
    "Mexikanskt",
    "Mexicansk",
    "Meksikolainen",
    "Mexíkósk",
    "Mexican"
  ],
  "Afrikansk": [
    "Afrikansk",
    "Afrikanskt",
    "Afrikansk",
    "Afrikkalainen",
    "Afrísk",
    "African"
  ],
  "Fransk": [
    "Fransk",
    "Franskt",
    "Fransk",
    "Ranskalainen",
    "Frönsk",
    "French"
  ],
  "Spansk": [
    "Spansk",
    "Spanskt",
    "Spansk",
    "Espanjalainen",
    "Spænsk",
    "Spanish"
  ],
  "Gresk": [
    "Gresk",
    "Grekiskt",
    "Græsk",
    "Kreikkalainen",
    "Grísk",
    "Greek"
  ],
  "Amerikansk": [
    "Amerikansk",
    "Amerikanskt",
    "Amerikansk",
    "Amerikkalainen",
    "Bandarísk",
    "American"
  ],
  "Nordisk": [
    "Nordisk",
    "Nordiskt",
    "Nordisk",
    "Pohjoismainen",
    "Norræn",
    "Nordic"
  ],
  "Japansk": [
    "Japansk",
    "Japanskt",
    "Japansk",
    "Japanilainen",
    "Japönsk",
    "Japanese"
  ],
  "Kinesisk": [
    "Kinesisk",
    "Kinesiskt",
    "Kinesisk",
    "Kiinalainen",
    "Kínversk",
    "Chinese"
  ],
  "Thailandsk": [
    "Thailandsk",
    "Thailändskt",
    "Thailandsk",
    "Thaimaalainen",
    "Taílensk",
    "Thai"
  ],
  "Vietnamesisk": [
    "Vietnamesisk",
    "Vietnamesiskt",
    "Vietnamesisk",
    "Vietnamilainen",
    "Víetnömsk",
    "Vietnamese"
  ],
  "Koreansk": [
    "Koreansk",
    "Koreanskt",
    "Koreansk",
    "Korealainen",
    "Kóresk",
    "Korean"
  ],
  "Indonesisk": [
    "Indonesisk",
    "Indonesiskt",
    "Indonesisk",
    "Indonesialainen",
    "Indónesísk",
    "Indonesian"
  ],
  "Malaysisk": [
    "Malaysisk",
    "Malaysiskt",
    "Malaysisk",
    "Malesialainen",
    "Malasísk",
    "Malaysian"
  ],
  "Filippinsk": [
    "Filippinsk",
    "Filippinskt",
    "Filippinsk",
    "Filippiiniläinen",
    "Filippseysk",
    "Filipino"
  ],
  "Singaporsk": [
    "Singaporsk",
    "Singaporianskt",
    "Singaporiansk",
    "Singaporelainen",
    "Singapúrsk",
    "Singaporean"
  ],
  "Kambodsjansk": [
    "Kambodsjansk",
    "Kambodjanskt",
    "Cambodjansk",
    "Kambodžalainen",
    "Kambódísk",
    "Cambodian"
  ],
  "Laotisk": [
    "Laotisk",
    "Laotiskt",
    "Laotisk",
    "Laosilainen",
    "Laósk",
    "Lao"
  ],
  "Myanmarsk": [
    "Myanmarsk",
    "Burmesiskt",
    "Burmesisk",
    "Myanmarilainen",
    "Búrmísk",
    "Myanmar"
  ],
  "Nordindisk": [
    "Nordindisk",
    "Nordindiskt",
    "Nordindisk",
    "Pohjoisintialainen",
    "Norður-indversk",
    "North Indian"
  ],
  "Sørindisk": [
    "Sørindisk",
    "Sydindiskt",
    "Sydindisk",
    "Eteläintialainen",
    "Suður-indversk",
    "South Indian"
  ],
  "Punjabi": [
    "Punjabi",
    "Punjab",
    "Punjab",
    "Punjab",
    "Punjab",
    "Punjabi"
  ],
  "Hyderabadi": [
    "Hyderabadi",
    "Hyderabad",
    "Hyderabad",
    "Hyderabad",
    "Hyderabad",
    "Hyderabadi"
  ],
  "Goansk": [
    "Goansk",
    "Goa",
    "Goa",
    "Goa",
    "Goa",
    "Goan"
  ],
  "Keralisk": [
    "Keralisk",
    "Kerala",
    "Kerala",
    "Kerala",
    "Kerala",
    "Kerala"
  ],
  "Gujarati": [
    "Gujarati",
    "Gujarat",
    "Gujarat",
    "Gujarat",
    "Gujarat",
    "Gujarati"
  ],
  "Bengalsk": [
    "Bengalsk",
    "Bengaliskt",
    "Bengalsk",
    "Bengalilainen",
    "Bengölsk",
    "Bengali"
  ],
  "Rajasthani": [
    "Rajasthani",
    "Rajasthan",
    "Rajasthan",
    "Rajasthan",
    "Rajasthan",
    "Rajasthani"
  ],
  "Tamilsk": [
    "Tamilsk",
    "Tamilskt",
    "Tamilsk",
    "Tamililainen",
    "Tamílsk",
    "Tamil"
  ],
  "Kashmiri": [
    "Kashmiri",
    "Kashmir",
    "Kashmir",
    "Kashmir",
    "Kasmír",
    "Kashmiri"
  ],
  "Romersk": [
    "Romersk",
    "Romerskt",
    "Romersk",
    "Roomalainen",
    "Rómversk",
    "Roman"
  ],
  "Napolitansk": [
    "Napolitansk",
    "Neapolitanskt",
    "Napolitansk",
    "Napolilainen",
    "Napólísk",
    "Neapolitan"
  ],
  "Siciliansk": [
    "Siciliansk",
    "Sicilianskt",
    "Siciliansk",
    "Sisilia",
    "Sikiley",
    "Sicilian"
  ],
  "Toskansk": [
    "Toskansk",
    "Toskanskt",
    "Toscansk",
    "Toscana",
    "Toskana",
    "Tuscan"
  ],
  "Emiliansk-romagnolsk": [
    "Emiliansk-romagnolsk",
    "Emilia-Romagna",
    "Emilia-Romagna",
    "Emilia-Romagna",
    "Emilia-Romagna",
    "Emilia-Romagna"
  ],
  "Ligurisk": [
    "Ligurisk",
    "Ligurien",
    "Ligurien",
    "Liguria",
    "Ligúría",
    "Ligurian"
  ],
  "Piemontesisk": [
    "Piemontesisk",
    "Piemonte",
    "Piemonte",
    "Piemonte",
    "Piemonte",
    "Piedmontese"
  ],
  "Venetiansk": [
    "Venetiansk",
    "Venetianskt",
    "Venetiansk",
    "Veneto",
    "Veneto",
    "Venetian"
  ],
  "Pugliesisk": [
    "Pugliesisk",
    "Apulien",
    "Apulien",
    "Apulia",
    "Apúlía",
    "Apulian"
  ],
  "Calabrisk": [
    "Calabrisk",
    "Kalabrien",
    "Calabrien",
    "Calabria",
    "Kalabría",
    "Calabrian"
  ],
  "Libanesisk": [
    "Libanesisk",
    "Libanesiskt",
    "Libanesisk",
    "Libanonilainen",
    "Líbönsk",
    "Lebanese"
  ],
  "Tyrkisk": [
    "Tyrkisk",
    "Turkiskt",
    "Tyrkisk",
    "Turkkilainen",
    "Tyrknesk",
    "Turkish"
  ],
  "Syrisk": [
    "Syrisk",
    "Syriskt",
    "Syrisk",
    "Syyrialainen",
    "Sýrlensk",
    "Syrian"
  ],
  "Palestinsk": [
    "Palestinsk",
    "Palestinskt",
    "Palæstinensisk",
    "Palestiinalainen",
    "Palestínsk",
    "Palestinian"
  ],
  "Iransk": [
    "Iransk",
    "Iranskt",
    "Iransk",
    "Iranilainen",
    "Írönsk",
    "Iranian"
  ],
  "Irakisk": [
    "Irakisk",
    "Irakiskt",
    "Irakisk",
    "Irakilainen",
    "Írösk",
    "Iraqi"
  ],
  "Egyptisk": [
    "Egyptisk",
    "Egyptiskt",
    "Egyptisk",
    "Egyptiläinen",
    "Egypsk",
    "Egyptian"
  ],
  "Jordansk": [
    "Jordansk",
    "Jordanskt",
    "Jordansk",
    "Jordanialainen",
    "Jórdönsk",
    "Jordanian"
  ],
  "Jemenittisk": [
    "Jemenittisk",
    "Jemenitiskt",
    "Yemenitisk",
    "Jemeniläinen",
    "Jemensk",
    "Yemeni"
  ],
  "Israelsk": [
    "Israelsk",
    "Israeliskt",
    "Israelsk",
    "Israelilainen",
    "Ísraelsk",
    "Israeli"
  ],
  "Sentralmeksikansk": [
    "Sentralmeksikansk",
    "Centrala Mexiko",
    "Det centrale Mexico",
    "Keski-Meksiko",
    "Mið-Mexíkó",
    "Central Mexican"
  ],
  "Oaxacansk": [
    "Oaxacansk",
    "Oaxaca",
    "Oaxaca",
    "Oaxaca",
    "Oaxaca",
    "Oaxacan"
  ],
  "Yucatansk": [
    "Yucatansk",
    "Yucatán",
    "Yucatán",
    "Yucatán",
    "Yucatán",
    "Yucatecan"
  ],
  "Jaliscansk": [
    "Jaliscansk",
    "Jalisco",
    "Jalisco",
    "Jalisco",
    "Jalisco",
    "Jalisco"
  ],
  "Pueblansk": [
    "Pueblansk",
    "Puebla",
    "Puebla",
    "Puebla",
    "Puebla",
    "Pueblan"
  ],
  "Veracruzansk": [
    "Veracruzansk",
    "Veracruz",
    "Veracruz",
    "Veracruz",
    "Veracruz",
    "Veracruz"
  ],
  "Baja California": [
    "Baja California",
    "Baja California",
    "Baja California",
    "Baja California",
    "Baja California",
    "Baja California"
  ],
  "Nordmeksikansk": [
    "Nordmeksikansk",
    "Norra Mexiko",
    "Nordmexicansk",
    "Pohjois-Meksiko",
    "Norður-Mexíkó",
    "Northern Mexican"
  ],
  "Michoacánsk": [
    "Michoacánsk",
    "Michoacán",
    "Michoacán",
    "Michoacán",
    "Michoacán",
    "Michoacán"
  ],
  "Burger": [
    "Burger",
    "Burgare",
    "Burger",
    "Hampurilaiset",
    "Hamborgarar",
    "Burgers"
  ],
  "Fritert kylling": [
    "Fritert kylling",
    "Friterad kyckling",
    "Friteret kylling",
    "Friteerattu kana",
    "Djúpsteiktur kjúklingur",
    "Fried chicken"
  ],
  "Pølser": [
    "Pølser",
    "Korv",
    "Pølser",
    "Makkarat",
    "Pylsur",
    "Hot dogs"
  ],
  "Sandwich": [
    "Sandwich",
    "Smörgåsar",
    "Sandwich",
    "Voileivät",
    "Samlokur",
    "Sandwiches"
  ],
  "Wraps": [
    "Wraps",
    "Wraps",
    "Wraps",
    "Wrapit",
    "Vefjur",
    "Wraps"
  ],
  "Fish & chips": [
    "Fish & chips",
    "Fish & chips",
    "Fish & chips",
    "Fish & chips",
    "Fish & chips",
    "Fish & chips"
  ],
  "Kebab": [
    "Kebab",
    "Kebab",
    "Kebab",
    "Kebab",
    "Kebab",
    "Kebab"
  ],
  "Hurtigpizza": [
    "Snøggpizza",
    "Snabbpizza",
    "Hurtigpizza",
    "Pikapizza",
    "Skyndipítsa",
    "Quick pizza"
  ],
  "Snacks": [
    "Snacks",
    "Snacks",
    "Snacks",
    "Naposteltavat",
    "Snarl",
    "Snacks"
  ],
  "Marokkansk": [
    "Marokkansk",
    "Marockanskt",
    "Marokkansk",
    "Marokkolainen",
    "Marokkósk",
    "Moroccan"
  ],
  "Etiopisk": [
    "Etiopisk",
    "Etiopiskt",
    "Etiopisk",
    "Etiopialainen",
    "Eþíópísk",
    "Ethiopian"
  ],
  "Eritreisk": [
    "Eritreisk",
    "Eritreanskt",
    "Eritreisk",
    "Eritrealainen",
    "Erítresk",
    "Eritrean"
  ],
  "Nigeriansk": [
    "Nigeriansk",
    "Nigerianskt",
    "Nigeriansk",
    "Nigerialainen",
    "Nígerísk",
    "Nigerian"
  ],
  "Ghanesisk": [
    "Ghanesisk",
    "Ghananskt",
    "Ghanesisk",
    "Ghanalainen",
    "Gönsk",
    "Ghanaian"
  ],
  "Senegalesisk": [
    "Senegalesisk",
    "Senegalesiskt",
    "Senegalesisk",
    "Senegalilainen",
    "Senegölsk",
    "Senegalese"
  ],
  "Somalisk": [
    "Somalisk",
    "Somaliskt",
    "Somalisk",
    "Somalialainen",
    "Sómölsk",
    "Somali"
  ],
  "Sørafrikansk": [
    "Sørafrikansk",
    "Sydafrikanskt",
    "Sydafrikansk",
    "Eteläafrikkalainen",
    "Suður-afrísk",
    "South African"
  ],
  "Tunisisk": [
    "Tunisisk",
    "Tunisiskt",
    "Tunesisk",
    "Tunisialainen",
    "Túnisk",
    "Tunisian"
  ],
  "Kenyansk": [
    "Kenyansk",
    "Kenyanskt",
    "Kenyansk",
    "Kenialainen",
    "Kenísk",
    "Kenyan"
  ],
  "Bretonsk": [
    "Bretonsk",
    "Bretagne",
    "Bretagne",
    "Bretagne",
    "Bretanía",
    "Breton"
  ],
  "Alsasisk": [
    "Alsasisk",
    "Alsace",
    "Alsace",
    "Alsace",
    "Alsace",
    "Alsatian"
  ],
  "Provençalsk": [
    "Provençalsk",
    "Provence",
    "Provence",
    "Provence",
    "Provence",
    "Provençal"
  ],
  "Normannisk": [
    "Normannisk",
    "Normandie",
    "Normandiet",
    "Normandia",
    "Normandí",
    "Normandy"
  ],
  "Burgundisk": [
    "Burgundisk",
    "Bourgogne",
    "Bourgogne",
    "Burgundi",
    "Búrgund",
    "Burgundian"
  ],
  "Lyonnais": [
    "Lyonnais",
    "Lyon",
    "Lyon",
    "Lyon",
    "Lyon",
    "Lyonnais"
  ],
  "Savoyard": [
    "Savoyard",
    "Savojen",
    "Savoie",
    "Savoie",
    "Savoie",
    "Savoyard"
  ],
  "Baskisk": [
    "Baskisk",
    "Baskiskt",
    "Baskisk",
    "Baskilainen",
    "Basknesk",
    "Basque"
  ],
  "Katalansk": [
    "Katalansk",
    "Katalanskt",
    "Catalansk",
    "Katalonialainen",
    "Katalónsk",
    "Catalan"
  ],
  "Galicisk": [
    "Galicisk",
    "Galiciskt",
    "Galicisk",
    "Galicia",
    "Galisía",
    "Galician"
  ],
  "Andalusisk": [
    "Andalusisk",
    "Andalusiskt",
    "Andalusisk",
    "Andalusia",
    "Andalúsía",
    "Andalusian"
  ],
  "Asturiansk": [
    "Asturiansk",
    "Asturien",
    "Asturien",
    "Asturia",
    "Astúría",
    "Asturian"
  ],
  "Kretisk": [
    "Kretisk",
    "Kreta",
    "Kreta",
    "Kreeta",
    "Krít",
    "Cretan"
  ],
  "Kykladisk": [
    "Kykladisk",
    "Kykladerna",
    "Kykladerne",
    "Kykladit",
    "Kýklöðurnar",
    "Cycladic"
  ],
  "Korfiotisk": [
    "Korfiotisk",
    "Korfu",
    "Korfu",
    "Korfu",
    "Korfú",
    "Corfiot"
  ],
  "Epirotisk": [
    "Epirotisk",
    "Epirus",
    "Epirus",
    "Epeiros",
    "Epírus",
    "Epirote"
  ],
  "Thessalonikisk": [
    "Thessalonikisk",
    "Thessaloniki",
    "Thessaloniki",
    "Thessaloniki",
    "Þessalóníka",
    "Thessaloniki"
  ],
  "Louisiana – cajun og kreolsk": [
    "Louisiana – cajun og kreolsk",
    "Louisiana – cajun och kreolskt",
    "Louisiana – cajun og kreolsk",
    "Louisiana – cajun ja kreoli",
    "Louisiana – cajun og kreólsk",
    "Louisiana – Cajun and Creole"
  ],
  "Texansk": [
    "Texansk",
    "Texas",
    "Texas",
    "Texas",
    "Texas",
    "Texan"
  ],
  "Hawaiisk": [
    "Hawaiisk",
    "Hawaiiskt",
    "Hawaiiansk",
    "Havaijilainen",
    "Havaísk",
    "Hawaiian"
  ],
  "New England": [
    "New England",
    "New England",
    "New England",
    "New England",
    "New England",
    "New England"
  ],
  "Sørstats-BBQ": [
    "Sørstats-BBQ",
    "Sydstats-BBQ",
    "Sydstats-BBQ",
    "Etelävaltioiden BBQ",
    "Suðurríkja-BBQ",
    "Southern barbecue"
  ],
  "New York": [
    "New York",
    "New York",
    "New York",
    "New York",
    "New York",
    "New York"
  ],
  "Norsk": [
    "Norsk",
    "Norskt",
    "Norsk",
    "Norjalainen",
    "Norsk",
    "Norwegian"
  ],
  "Svensk": [
    "Svensk",
    "Svenskt",
    "Svensk",
    "Ruotsalainen",
    "Sænsk",
    "Swedish"
  ],
  "Dansk": [
    "Dansk",
    "Danskt",
    "Dansk",
    "Tanskalainen",
    "Dönsk",
    "Danish"
  ],
  "Finsk": [
    "Finsk",
    "Finskt",
    "Finsk",
    "Suomalainen",
    "Finnsk",
    "Finnish"
  ],
  "Islandsk": [
    "Islandsk",
    "Isländskt",
    "Islandsk",
    "Islantilainen",
    "Íslensk",
    "Icelandic"
  ],
  "Færøysk": [
    "Færøysk",
    "Färöiskt",
    "Færøsk",
    "Färsaarelainen",
    "Færeysk",
    "Faroese"
  ],
  "Grønlandsk": [
    "Grønlandsk",
    "Grönländskt",
    "Grønlandsk",
    "Grönlantilainen",
    "Grænlensk",
    "Greenlandic"
  ],
  "Nudler og supper": [
    "Nudlar og supper",
    "Nudlar och soppor",
    "Nudler og supper",
    "Nuudelit ja keitot",
    "Núðlur og súpur",
    "Noodles and soups"
  ],
  "Risretter": [
    "Risrettar",
    "Risrätter",
    "Risretter",
    "Riisiruoat",
    "Hrísgrjónaréttir",
    "Rice dishes"
  ],
  "Dumplings og buns": [
    "Dumplings og buns",
    "Dumplings och buns",
    "Dumplings og buns",
    "Dumplingit ja höyrysämpylät",
    "Dumplings og gufubrauð",
    "Dumplings and buns"
  ],
  "Grill og kjøtt": [
    "Grill og kjøt",
    "Grill och kött",
    "Grill og kød",
    "Grilli ja liha",
    "Grill og kjöt",
    "Grill and meat"
  ],
  "Fisk og sjømat": [
    "Fisk og sjømat",
    "Fisk och skaldjur",
    "Fisk og skaldyr",
    "Kala ja merenelävät",
    "Fiskur og sjávarfang",
    "Fish and seafood"
  ],
  "Småretter og street food": [
    "Smårettar og gatemat",
    "Smårätter och street food",
    "Småretter og streetfood",
    "Pikkuruoat ja katuruoka",
    "Smáréttir og götumat",
    "Small dishes and street food"
  ],
  "Curry og gryter": [
    "Curry og gryter",
    "Curry och grytor",
    "Curry og gryderetter",
    "Curryt ja padat",
    "Karrí og pottréttir",
    "Curries and stews"
  ],
  "Brød, dosa og idli": [
    "Brød, dosa og idli",
    "Bröd, dosa och idli",
    "Brød, dosa og idli",
    "Leivät, dosa ja idli",
    "Brauð, dosa og idli",
    "Bread, dosa and idli"
  ],
  "Småretter": [
    "Smårettar",
    "Smårätter",
    "Småretter",
    "Pikkuruoat",
    "Smáréttir",
    "Small dishes"
  ],
  "Dessert": [
    "Dessert",
    "Efterrätter",
    "Dessert",
    "Jälkiruoat",
    "Eftirréttir",
    "Desserts"
  ],
  "Grill og kebab": [
    "Grill og kebab",
    "Grill och kebab",
    "Grill og kebab",
    "Grilli ja kebab",
    "Grill og kebab",
    "Grill and kebab"
  ],
  "Meze og småretter": [
    "Meze og smårettar",
    "Meze och smårätter",
    "Meze og småretter",
    "Meze ja pikkuruoat",
    "Meze og smáréttir",
    "Meze and small dishes"
  ],
  "Brød og bakst": [
    "Brød og bakst",
    "Bröd och bakverk",
    "Brød og bagværk",
    "Leivät ja leivonnaiset",
    "Brauð og bakstur",
    "Bread and baked goods"
  ],
  "Ris og gryter": [
    "Ris og gryter",
    "Ris och grytor",
    "Ris og gryderetter",
    "Riisi ja padat",
    "Hrísgrjón og pottréttir",
    "Rice and stews"
  ],
  "Gryter og supper": [
    "Gryter og supper",
    "Grytor och soppor",
    "Gryderetter og supper",
    "Padat ja keitot",
    "Pottréttir og súpur",
    "Stews and soups"
  ],
  "Ris og kornretter": [
    "Ris og kornrettar",
    "Ris och spannmålsrätter",
    "Ris og kornretter",
    "Riisi- ja viljaruoat",
    "Hrísgrjón og kornréttir",
    "Rice and grain dishes"
  ],
  "Brød og tilbehør": [
    "Brød og tilbehøyr",
    "Bröd och tillbehör",
    "Brød og tilbehør",
    "Leivät ja lisukkeet",
    "Brauð og meðlæti",
    "Bread and sides"
  ],
  "Bakverk og dessert": [
    "Bakverk og dessert",
    "Bakverk och efterrätter",
    "Bagværk og dessert",
    "Leivonnaiset ja jälkiruoat",
    "Bakkelsi og eftirréttir",
    "Pastries and desserts"
  ],
  "Kjøtt og gryter": [
    "Kjøt og gryter",
    "Kött och grytor",
    "Kød og gryderetter",
    "Liha ja padat",
    "Kjöt og pottréttir",
    "Meat and stews"
  ],
  "Småretter og galetter": [
    "Smårettar og galettar",
    "Smårätter och galetter",
    "Småretter og galetter",
    "Pikkuruoat ja galetit",
    "Smáréttir og galettur",
    "Small dishes and galettes"
  ],
  "Ost og fondue": [
    "Ost og fondue",
    "Ost och fondue",
    "Ost og fondue",
    "Juusto ja fondue",
    "Ostur og fondue",
    "Cheese and fondue"
  ],
  "Tapas og småretter": [
    "Tapas og smårettar",
    "Tapas och smårätter",
    "Tapas og småretter",
    "Tapas ja pikkuruoat",
    "Tapas og smáréttir",
    "Tapas and small dishes"
  ],
  "Supper og grønt": [
    "Supper og grønt",
    "Soppor och grönsaker",
    "Supper og grønt",
    "Keitot ja kasvikset",
    "Súpur og grænmeti",
    "Soups and vegetables"
  ],
  "Gryter og kjøtt": [
    "Gryter og kjøt",
    "Grytor och kött",
    "Gryderetter og kød",
    "Padat ja liha",
    "Pottréttir og kjöt",
    "Stews and meat"
  ],
  "Bakverk og pai": [
    "Bakverk og pai",
    "Bakverk och pajer",
    "Bagværk og tærter",
    "Leivonnaiset ja piirakat",
    "Bakkelsi og bökur",
    "Pastries and pies"
  ],
  "Pasta og gryter": [
    "Pasta og gryter",
    "Pasta och grytor",
    "Pasta og gryderetter",
    "Pasta ja padat",
    "Pasta og pottréttir",
    "Pasta and stews"
  ],
  "Brød og snacks": [
    "Brød og snacks",
    "Bröd och snacks",
    "Brød og snacks",
    "Leivät ja välipalat",
    "Brauð og snarl",
    "Bread and snacks"
  ],
  "Grill og BBQ": [
    "Grill og BBQ",
    "Grill och BBQ",
    "Grill og BBQ",
    "Grilli ja BBQ",
    "Grill og BBQ",
    "Grill and BBQ"
  ],
  "Pizza og bakst": [
    "Pizza og bakst",
    "Pizza och bakverk",
    "Pizza og bagværk",
    "Pizza ja leivonnaiset",
    "Pítsa og bakstur",
    "Pizza and baked goods"
  ],
  "Tradisjonsmat": [
    "Tradisjonsmat",
    "Traditionell mat",
    "Traditionsmad",
    "Perinneruoat",
    "Hefðbundinn matur",
    "Traditional food"
  ],
  "Brød og bakverk": [
    "Brød og bakverk",
    "Bröd och bakverk",
    "Brød og bagværk",
    "Leivät ja leivonnaiset",
    "Brauð og bakkelsi",
    "Bread and pastries"
  ],
  "Potetretter": [
    "Potetrettar",
    "Potatisrätter",
    "Kartoffelretter",
    "Perunaruoat",
    "Kartöfluréttir",
    "Potato dishes"
  ],
  "Tradisjonell konservering": [
    "Tradisjonell konservering",
    "Traditionell konservering",
    "Traditionel konservering",
    "Perinteinen säilöntä",
    "Hefðbundin matvælavarsla",
    "Traditional preservation"
  ],
  "Supper og gryter": [
    "Supper og gryter",
    "Soppor och grytor",
    "Supper og gryderetter",
    "Keitot ja padat",
    "Súpur og pottréttir",
    "Soups and stews"
  ],
  "Taco og maisretter": [
    "Taco og maisrettar",
    "Tacos och majsrätter",
    "Tacos og majsretter",
    "Tacot ja maissiruoat",
    "Taco og maísréttir",
    "Tacos and corn dishes"
  ],
  "Mole og chili": [
    "Mole og chili",
    "Mole och chili",
    "Mole og chili",
    "Mole ja chili",
    "Mole og chili",
    "Mole and chili"
  ],
  "Sandwich og burrito": [
    "Sandwich og burrito",
    "Smörgåsar och burrito",
    "Sandwich og burrito",
    "Voileivät ja burritot",
    "Samlokur og burrito",
    "Sandwiches and burritos"
  ],
  "Supper": [
    "Supper",
    "Soppor",
    "Supper",
    "Keitot",
    "Súpur",
    "Soups"
  ],
  "Pizza": [
    "Pizza",
    "Pizza",
    "Pizza",
    "Pizza",
    "Pítsa",
    "Pizza"
  ],
  "Pasta": [
    "Pasta",
    "Pasta",
    "Pasta",
    "Pasta",
    "Pasta",
    "Pasta"
  ],
  "Risotto og ris": [
    "Risotto og ris",
    "Risotto och ris",
    "Risotto og ris",
    "Risotto ja riisi",
    "Risotto og hrísgrjón",
    "Risotto and rice"
  ],
  "Forretter": [
    "Førrettar",
    "Förrätter",
    "Forretter",
    "Alkuruoat",
    "Forréttir",
    "Starters"
  ],
  "Kjøtt og fisk": [
    "Kjøt og fisk",
    "Kött och fisk",
    "Kød og fisk",
    "Liha ja kala",
    "Kjöt og fiskur",
    "Meat and fish"
  ],
  "Nasjonale kjøkken": [
    "Nasjonale kjøkken",
    "Nationella kök",
    "Nationale køkkener",
    "Kansalliset keittiöt",
    "Þjóðlegar matreiðsluhefðir",
    "National cuisines"
  ],
  "Regionale kjøkken": [
    "Regionale kjøkken",
    "Regionala kök",
    "Regionale køkkener",
    "Alueelliset keittiöt",
    "Svæðisbundnar matreiðsluhefðir",
    "Regional cuisines"
  ],
  "Mattyper": [
    "Mattypar",
    "Mattyper",
    "Madtyper",
    "Ruokalajityypit",
    "Matartegundir",
    "Food types"
  ],
  "Alle land": [
    "Alle land",
    "Alla länder",
    "Alle lande",
    "Kaikki maat",
    "Öll lönd",
    "All countries"
  ],
  "Alle regioner": [
    "Alle regionar",
    "Alla regioner",
    "Alle regioner",
    "Kaikki alueet",
    "Öll svæði",
    "All regions"
  ],
  "Alle mattyper": [
    "Alle mattypar",
    "Alla mattyper",
    "Alle madtyper",
    "Kaikki ruokalajityypit",
    "Allar matartegundir",
    "All food types"
  ]
};
const indexes = { nn: 0, sv: 1, da: 2, fi: 3, is: 4, en: 5 } as const;
export function cuisineLabel(name: string, locale: PreviewLocale): string {
  if (locale === "nb" || !Object.hasOwn(translations, name)) return name;
  return translations[name]?.[indexes[locale]] ?? name;
}
export const translatedCuisineNames = Object.keys(translations);
