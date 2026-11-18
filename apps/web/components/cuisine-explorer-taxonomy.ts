/**
 * Fysen cuisine atlas. One identity per undercategory: national flag,
 * authentic regional flag, OR food symbol. Never combine them on a tile.
 *
 * The examples describe culinary traditions, not verified restaurant menu items.
 * Restaurant availability is calculated exclusively from the menu index.
 * Regional flag sources: Wikimedia Commons (see each file page for its license).
 */
export type CuisineAreaIdentity = {
  readonly name: string;
  readonly flag?: string;
  readonly flagFile?: string;
  readonly flagRegion?: string;
  readonly symbol?: string;
  readonly sourceCuisine?: string;
  readonly sourceRegion?: string;
  readonly examples: readonly string[];
};

export const cuisineAtlasAreas: Readonly<Record<string, readonly CuisineAreaIdentity[]>> = {
  "Asiatisk": [
    { name: "Japansk", flag: "🇯🇵", sourceRegion: "Japan", examples: ["Ramen","Sushi","Gyoza"] },
    { name: "Kinesisk", flag: "🇨🇳", sourceRegion: "Kina", examples: ["Bao","Dumplings","Mapo tofu"] },
    { name: "Thailandsk", flag: "🇹🇭", sourceRegion: "Thailand", examples: ["Pad thai","Tom yum"] },
    { name: "Vietnamesisk", flag: "🇻🇳", sourceRegion: "Vietnam", examples: ["Phở","Bánh mì"] },
    { name: "Koreansk", flag: "🇰🇷", sourceRegion: "Korea", sourceCuisine: "Koreansk", examples: ["Bibimbap","Bulgogi"] },
    { name: "Indonesisk", flag: "🇮🇩", examples: ["Nasi goreng","Satay","Rendang"] },
    { name: "Malaysisk", flag: "🇲🇾", examples: ["Nasi lemak","Laksa","Char kway teow"] },
    { name: "Filippinsk", flag: "🇵🇭", sourceRegion: "Filippinene", sourceCuisine: "Filippinsk", examples: ["Sisig","Pork adobo"] },
    { name: "Singaporsk", flag: "🇸🇬", examples: ["Hainanese chicken rice","Chili crab","Laksa"] },
    { name: "Kambodsjansk", flag: "🇰🇭", examples: ["Amok trey","Lok lak"] },
    { name: "Laotisk", flag: "🇱🇦", examples: ["Larb","Tam mak hoong"] },
    { name: "Myanmarsk", flag: "🇲🇲", examples: ["Mohinga","Lahpet thoke"] },
  ],
  "Indisk": [
    { name: "Nordindisk", symbol: "🥘", sourceRegion: "Nord-India", examples: ["Butter chicken","Naan"] },
    { name: "Sørindisk", symbol: "🥥", sourceRegion: "Sør-India", examples: ["Dosa","Idli"] },
    { name: "Punjabi", symbol: "🫓", examples: ["Chole bhature","Dal makhani"] },
    { name: "Hyderabadi", symbol: "🍚", sourceRegion: "Hyderabad", examples: ["Biryani","Haleem"] },
    { name: "Goansk", symbol: "🐟", examples: ["Vindaloo","Goansk fiskecurry"] },
    { name: "Keralisk", symbol: "🥥", examples: ["Appam","Keralisk fiskecurry"] },
    { name: "Gujarati", symbol: "🥬", examples: ["Dhokla","Undhiyu"] },
    { name: "Bengalsk", symbol: "🍛", examples: ["Shorshe ilish","Mishti doi"] },
    { name: "Rajasthani", symbol: "🫓", examples: ["Dal baati churma"] },
    { name: "Tamilsk", symbol: "🍛", examples: ["Pongal","Kothu parotta"] },
    { name: "Kashmiri", symbol: "🍲", examples: ["Rogan josh"] },
  ],
  "Italiensk": [
    { name: "Romersk", flagFile: "Flag of Lazio.svg", flagRegion: "Lazio", sourceRegion: "Roma", examples: ["Pizza al taglio"] },
    { name: "Napolitansk", flagFile: "Flag of Campania.svg", flagRegion: "Campania", sourceRegion: "Napoli", examples: ["Pizza napoletana"] },
    { name: "Siciliansk", flagFile: "Flag of Sicily.svg", flagRegion: "Sicilia", sourceRegion: "Sicilia", examples: ["Pasta alla Norma","Arancini"] },
    { name: "Toskansk", flagFile: "Flag of Tuscany.svg", flagRegion: "Toscana", examples: ["Ribollita","Bistecca alla fiorentina"] },
    { name: "Emiliansk-romagnolsk", flagFile: "Flag of Emilia-Romagna (de facto).svg", flagRegion: "Emilia-Romagna", examples: ["Lasagne alla bolognese","Tortellini"] },
    { name: "Ligurisk", flagFile: "Flag of Liguria.svg", flagRegion: "Liguria", examples: ["Pesto alla genovese","Focaccia"] },
    { name: "Piemontesisk", flagFile: "Flag of Piedmont.svg", flagRegion: "Piemonte", examples: ["Agnolotti","Vitello tonnato"] },
    { name: "Venetiansk", flagFile: "Flag of Veneto.svg", flagRegion: "Veneto", examples: ["Risi e bisi","Sarde in saor"] },
    { name: "Pugliesisk", flagFile: "Flag of Apulia.svg", flagRegion: "Puglia", examples: ["Orecchiette alle cime di rapa"] },
    { name: "Calabrisk", flagFile: "Flag of Calabria.svg", flagRegion: "Calabria", examples: ["'Nduja","Fileja"] },
  ],
  "Midtøsten": [
    { name: "Libanesisk", flag: "🇱🇧", examples: ["Tabbouleh","Manakish"] },
    { name: "Tyrkisk", flag: "🇹🇷", sourceRegion: "Tyrkia", examples: ["Döner","Pide"] },
    { name: "Syrisk", flag: "🇸🇾", examples: ["Kibbeh","Muhammara"] },
    { name: "Palestinsk", flag: "🇵🇸", examples: ["Musakhan","Maqluba"] },
    { name: "Iransk", flag: "🇮🇷", sourceRegion: "Iran", sourceCuisine: "Persisk", examples: ["Koobideh","Ghormeh sabzi"] },
    { name: "Irakisk", flag: "🇮🇶", examples: ["Masgouf","Dolma"] },
    { name: "Egyptisk", flag: "🇪🇬", sourceRegion: "Egypt", examples: ["Koshari","Ta'ameya"] },
    { name: "Jordansk", flag: "🇯🇴", examples: ["Mansaf","Maqluba"] },
    { name: "Jemenittisk", flag: "🇾🇪", examples: ["Saltah","Mandi"] },
    { name: "Israelsk", flag: "🇮🇱", examples: ["Sabich","Jerusalem mixed grill"] },
  ],
  "Mexicansk": [
    { name: "Sentralmeksikansk", symbol: "🌮", sourceRegion: "Sentral-Mexico", examples: ["Tacos al pastor","Tlacoyo"] },
    { name: "Oaxacansk", symbol: "🌶️", examples: ["Mole negro","Tlayuda"] },
    { name: "Yucatansk", symbol: "🍊", sourceRegion: "Yucatán", examples: ["Cochinita pibil","Sopa de lima"] },
    { name: "Jaliscansk", symbol: "🥘", sourceRegion: "Jalisco", examples: ["Birria","Torta ahogada"] },
    { name: "Pueblansk", symbol: "🌶️", examples: ["Mole poblano","Chiles en nogada"] },
    { name: "Veracruzansk", symbol: "🐟", examples: ["Pescado a la veracruzana"] },
    { name: "Baja California", symbol: "🐟", sourceRegion: "Baja", examples: ["Fish taco","Shrimp taco"] },
    { name: "Nordmeksikansk", symbol: "🥩", examples: ["Carne asada","Burrito norteño"] },
    { name: "Michoacánsk", symbol: "🌮", examples: ["Carnitas","Corundas"] },
  ],
  "Fast food": [
    { name: "Burger", symbol: "🍔", sourceRegion: "Burger", examples: ["Cheeseburger","Smashburger"] },
    { name: "Fritert kylling", symbol: "🍗", sourceRegion: "Fried chicken", examples: ["Fried chicken","Chicken wings"] },
    { name: "Pølser", symbol: "🌭", sourceRegion: "Hot dog", examples: ["Hot dog","Chili dog"] },
    { name: "Sandwich", symbol: "🥪", examples: ["Sandwich","Club sandwich"] },
    { name: "Wraps", symbol: "🌯", examples: ["Kyllingwrap","Falafelwrap"] },
    { name: "Fish & chips", symbol: "🐟", examples: ["Fish & chips"] },
    { name: "Kebab", symbol: "🥙", examples: ["Döner","Shawarma"] },
    { name: "Hurtigpizza", symbol: "🍕", examples: ["Pizzastykke","Pizza margherita"] },
    { name: "Snacks", symbol: "🥨", examples: ["Pommes frites","Løkringer"] },
  ],
  "Afrikansk": [
    {"name": "Marokkansk","flag": "🇲🇦","examples": ["Tajine","Harira","Couscous tfaya"]},
    {"name": "Etiopisk","flag": "🇪🇹","sourceCuisine": "Etiopisk","sourceRegion": "Etiopia","examples": ["Doro wat","Injera"]},
    {"name": "Eritreisk","flag": "🇪🇷","examples": ["Zigni","Taita"]},
    {"name": "Nigeriansk","flag": "🇳🇬","examples": ["Egusi soup","Suya","Jollof rice"]},
    {"name": "Ghanesisk","flag": "🇬🇭","examples": ["Waakye","Red red"]},
    {"name": "Senegalesisk","flag": "🇸🇳","examples": ["Thieboudienne","Chicken yassa"]},
    {"name": "Somalisk","flag": "🇸🇴","examples": ["Bariis iskukaris","Suqaar"]},
    {"name": "Sørafrikansk","flag": "🇿🇦","examples": ["Bobotie","Bunny chow"]},
    {"name": "Tunisisk","flag": "🇹🇳","examples": ["Brik","Lablabi"]},
    {"name": "Kenyansk","flag": "🇰🇪","examples": ["Nyama choma","Sukuma wiki"]},
  ],
  "Fransk": [
    {"name": "Bretonsk","flagFile": "Flag of Brittany.svg","flagRegion": "Bretagne","examples": ["Galette bretonne","Kouign-amann"]},
    {"name": "Alsasisk","symbol": "🥨","examples": ["Flammekueche","Choucroute garnie"]},
    {"name": "Provençalsk","symbol": "🫒","examples": ["Bouillabaisse","Ratatouille"]},
    {"name": "Normannisk","symbol": "🧀","examples": ["Moules à la crème","Tarte normande"]},
    {"name": "Burgundisk","symbol": "🥩","examples": ["Bœuf bourguignon","Œufs en meurette"]},
    {"name": "Lyonnais","symbol": "🥗","examples": ["Salade lyonnaise","Quenelles de brochet"]},
    {"name": "Savoyard","symbol": "🧀","examples": ["Tartiflette","Fondue savoyarde"]},
  ],
  "Spansk": [
    {"name": "Baskisk","flagFile": "Flag of the Basque Country.svg","flagRegion": "Baskerland","examples": ["Pintxos","Bacalao al pil-pil"]},
    {"name": "Katalansk","flagFile": "Flag of Catalonia.svg","flagRegion": "Catalonia","examples": ["Escalivada","Crema catalana"]},
    {"name": "Galicisk","flagFile": "Flag of Galicia.svg","flagRegion": "Galicia","examples": ["Pulpo a la gallega","Empanada gallega"]},
    {"name": "Andalusisk","flagFile": "Flag of Andalusia.svg","flagRegion": "Andalucía","examples": ["Gazpacho","Salmorejo"]},
    {"name": "Asturiansk","flagFile": "Flag of Asturias.svg","flagRegion": "Asturias","examples": ["Fabada asturiana","Cachopo"]},
  ],
  "Gresk": [
    {"name": "Kretisk","symbol": "🫒","examples": ["Dakos","Kalitsounia"]},
    {"name": "Kykladisk","symbol": "🍅","examples": ["Tomatokeftedes","Fava Santorinis"]},
    {"name": "Korfiotisk","symbol": "🍝","examples": ["Pastitsada","Sofrito korfiotiko"]},
    {"name": "Epirotisk","symbol": "🥧","examples": ["Blatsaria","Epirotiki pita"]},
    {"name": "Thessalonikisk","symbol": "🥐","examples": ["Bougatsa","Koulouri Thessalonikis"]},
  ],
  "Amerikansk": [
    {"name": "Louisiana – cajun og kreolsk","flagFile": "Flag of Louisiana.svg","flagRegion": "Louisiana","examples": ["Gumbo","Jambalaya","Étouffée"]},
    {"name": "Texansk","flagFile": "Flag of Texas.svg","flagRegion": "Texas","examples": ["Texas brisket","Chili con carne"]},
    {"name": "Hawaiisk","flagFile": "Flag of Hawaii.svg","flagRegion": "Hawaii","examples": ["Poke bowl","Loco moco"]},
    {"name": "New England","symbol": "🦞","examples": ["New England clam chowder","Lobster roll"]},
    {"name": "Sørstats-BBQ","symbol": "🍖","examples": ["Pulled pork","Carolina barbecue"]},
    {"name": "New York","symbol": "🥯","examples": ["New York bagel","New York-style pizza"]},
  ],
  "Nordisk": [
    {"name": "Norsk","flag": "🇳🇴","examples": ["Fårikål","Raspeballer","Fiskesuppe"]},
    {"name": "Svensk","flag": "🇸🇪","examples": ["Köttbullar","Raggmunk","Smörgåstårta"]},
    {"name": "Dansk","flag": "🇩🇰","examples": ["Smørrebrød","Stegt flæsk"]},
    {"name": "Finsk","flag": "🇫🇮","examples": ["Karjalanpiirakka","Lohikeitto"]},
    {"name": "Islandsk","flag": "🇮🇸","examples": ["Plokkfiskur","Kjötsúpa"]},
    {"name": "Færøysk","flag": "🇫🇴","examples": ["Ræst kjøt","Fiskesúpan"]},
    {"name": "Grønlandsk","flag": "🇬🇱","examples": ["Suaasat","Mattak"]},
  ],
};

/** Regional SVGs are fetched as original symbols; do not crop them. */
export function regionalFlagUrl(filename: string): string {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}`;
}

export type ItalianFoodType = {
  readonly name: string;
  readonly symbol: string;
  readonly dishNames: readonly string[];
};

export const italianFoodTypes: readonly ItalianFoodType[] = [
  {
    name: "Pizza",
    symbol: "🍕",
    dishNames: ["Pizza margherita", "Pizza marinara", "Pizza napoletana", "Pizza al taglio"],
  },
  {
    name: "Pasta",
    symbol: "🍝",
    dishNames: ["Carbonara", "Cacio e pepe", "Amatriciana", "Pasta alla Norma", "Lasagne alla bolognese", "Tortellini", "Pesto alla genovese", "Agnolotti", "Orecchiette alle cime di rapa", "Fileja"],
  },
  {
    name: "Risotto og ris",
    symbol: "🍚",
    dishNames: ["Arancini", "Risi e bisi"],
  },
  {
    name: "Forretter",
    symbol: "🫒",
    dishNames: ["Caponata", "Frittatina", "Focaccia", "Vitello tonnato", "'Nduja"],
  },
  {
    name: "Kjøtt og fisk",
    symbol: "🐟",
    dishNames: ["Saltimbocca", "Bistecca alla fiorentina", "Sarde in saor"],
  },
  {
    name: "Supper og gryter",
    symbol: "🥣",
    dishNames: ["Ribollita"],
  },
  {
    name: "Bakverk og dessert",
    symbol: "🍰",
    dishNames: ["Cannoli", "Sfogliatella"],
  },
];
