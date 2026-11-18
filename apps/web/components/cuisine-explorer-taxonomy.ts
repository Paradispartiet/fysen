/**
 * Fysen cuisine atlas. One identity per undercategory: national flag,
 * authentic regional flag, OR original food illustration. Never combine them on a tile.
 *
 * The examples describe culinary traditions, not verified restaurant menu items.
 * Restaurant availability is calculated exclusively from the menu index.
 * Regional flag sources: Wikimedia Commons (see each file page for its license).
 */
import type { FoodIllustrationName } from "./food-illustration-data";

export type CuisineAreaIdentity = {
  readonly name: string;
  readonly flag?: string;
  readonly flagFile?: string;
  readonly flagRegion?: string;
  readonly illustration?: FoodIllustrationName;
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
    { name: "Nordindisk", illustration: "curry", sourceRegion: "Nord-India", examples: ["Butter chicken","Naan"] },
    { name: "Sørindisk", illustration: "coconut", sourceRegion: "Sør-India", examples: ["Dosa","Idli"] },
    { name: "Punjabi", illustration: "flatbread", examples: ["Chole bhature","Dal makhani"] },
    { name: "Hyderabadi", illustration: "rice", sourceRegion: "Hyderabad", examples: ["Biryani","Haleem"] },
    { name: "Goansk", illustration: "fish", examples: ["Vindaloo","Goansk fiskecurry"] },
    { name: "Keralisk", illustration: "coconut", examples: ["Appam","Keralisk fiskecurry"] },
    { name: "Gujarati", illustration: "greens", examples: ["Dhokla","Undhiyu"] },
    { name: "Bengalsk", illustration: "curry", examples: ["Shorshe ilish","Mishti doi"] },
    { name: "Rajasthani", illustration: "flatbread", examples: ["Dal baati churma"] },
    { name: "Tamilsk", illustration: "curry", examples: ["Pongal","Kothu parotta"] },
    { name: "Kashmiri", illustration: "soup", examples: ["Rogan josh"] },
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
    { name: "Sentralmeksikansk", illustration: "taco", sourceRegion: "Sentral-Mexico", examples: ["Tacos al pastor","Tlacoyo"] },
    { name: "Oaxacansk", illustration: "chili", examples: ["Mole negro","Tlayuda"] },
    { name: "Yucatansk", flagFile: "Flag of Yucatan.svg", flagRegion: "Yucatán", sourceRegion: "Yucatán", examples: ["Cochinita pibil","Sopa de lima"] },
    { name: "Jaliscansk", flagFile: "Flag of Jalisco.svg", flagRegion: "Jalisco", sourceRegion: "Jalisco", examples: ["Birria","Torta ahogada"] },
    { name: "Pueblansk", illustration: "chili", examples: ["Mole poblano","Chiles en nogada"] },
    { name: "Veracruzansk", illustration: "fish", examples: ["Pescado a la veracruzana"] },
    { name: "Baja California", illustration: "fish", sourceRegion: "Baja", examples: ["Fish taco","Shrimp taco"] },
    { name: "Nordmeksikansk", illustration: "steak", examples: ["Carne asada","Burrito norteño"] },
    { name: "Michoacánsk", illustration: "taco", examples: ["Carnitas","Corundas"] },
  ],
  "Fast food": [
    { name: "Burger", illustration: "burger", sourceRegion: "Burger", examples: ["Cheeseburger","Smashburger"] },
    { name: "Fritert kylling", illustration: "chicken", sourceRegion: "Fried chicken", examples: ["Fried chicken","Chicken wings"] },
    { name: "Pølser", illustration: "hotdog", sourceRegion: "Hot dog", examples: ["Hot dog","Chili dog"] },
    { name: "Sandwich", illustration: "sandwich", examples: ["Sandwich","Club sandwich"] },
    { name: "Wraps", illustration: "wrap", examples: ["Kyllingwrap","Falafelwrap"] },
    { name: "Fish & chips", illustration: "fish", examples: ["Fish & chips"] },
    { name: "Kebab", illustration: "kebab", examples: ["Döner","Shawarma"] },
    { name: "Hurtigpizza", illustration: "pizza", examples: ["Pizzastykke","Pizza margherita"] },
    { name: "Snacks", illustration: "pretzel", examples: ["Pommes frites","Løkringer"] },
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
    {"name": "Alsasisk","illustration": "pretzel","examples": ["Flammekueche","Choucroute garnie"]},
    {"name": "Provençalsk","illustration": "olive","examples": ["Bouillabaisse","Ratatouille"]},
    {"name": "Normannisk","illustration": "cheese","examples": ["Moules à la crème","Tarte normande"]},
    {"name": "Burgundisk","illustration": "steak","examples": ["Bœuf bourguignon","Œufs en meurette"]},
    {"name": "Lyonnais","illustration": "salad","examples": ["Salade lyonnaise","Quenelles de brochet"]},
    {"name": "Savoyard","illustration": "cheese","examples": ["Tartiflette","Fondue savoyarde"]},
  ],
  "Spansk": [
    {"name": "Baskisk","flagFile": "Flag of the Basque Country.svg","flagRegion": "Baskerland","examples": ["Pintxos","Bacalao al pil-pil"]},
    {"name": "Katalansk","flagFile": "Flag of Catalonia.svg","flagRegion": "Catalonia","examples": ["Escalivada","Crema catalana"]},
    {"name": "Galicisk","flagFile": "Flag of Galicia.svg","flagRegion": "Galicia","examples": ["Pulpo a la gallega","Empanada gallega"]},
    {"name": "Andalusisk","flagFile": "Flag of Andalusia.svg","flagRegion": "Andalucía","examples": ["Gazpacho","Salmorejo"]},
    {"name": "Asturiansk","flagFile": "Flag of Asturias.svg","flagRegion": "Asturias","examples": ["Fabada asturiana","Cachopo"]},
  ],
  "Gresk": [
    {"name": "Kretisk","illustration": "olive","examples": ["Dakos","Kalitsounia"]},
    {"name": "Kykladisk","illustration": "tomato","examples": ["Tomatokeftedes","Fava Santorinis"]},
    {"name": "Korfiotisk","illustration": "pasta","examples": ["Pastitsada","Sofrito korfiotiko"]},
    {"name": "Epirotisk","illustration": "pie","examples": ["Blatsaria","Epirotiki pita"]},
    {"name": "Thessalonikisk","illustration": "croissant","examples": ["Bougatsa","Koulouri Thessalonikis"]},
  ],
  "Amerikansk": [
    {"name": "Louisiana – cajun og kreolsk","flagFile": "Flag of Louisiana.svg","flagRegion": "Louisiana","examples": ["Gumbo","Jambalaya","Étouffée"]},
    {"name": "Texansk","flagFile": "Flag of Texas.svg","flagRegion": "Texas","examples": ["Texas brisket","Chili con carne"]},
    {"name": "Hawaiisk","flagFile": "Flag of Hawaii.svg","flagRegion": "Hawaii","examples": ["Poke bowl","Loco moco"]},
    {"name": "New England","illustration": "lobster","examples": ["New England clam chowder","Lobster roll"]},
    {"name": "Sørstats-BBQ","illustration": "barbecue","examples": ["Pulled pork","Carolina barbecue"]},
    {"name": "New York","illustration": "bagel","examples": ["New York bagel","New York-style pizza"]},
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
  readonly illustration: FoodIllustrationName;
  readonly dishNames: readonly string[];
};

export const italianFoodTypes: readonly ItalianFoodType[] = [
  {
    name: "Pizza",
    illustration: "pizza",
    dishNames: ["Pizza margherita", "Pizza marinara", "Pizza napoletana", "Pizza al taglio"],
  },
  {
    name: "Pasta",
    illustration: "pasta",
    dishNames: ["Carbonara", "Cacio e pepe", "Amatriciana", "Pasta alla Norma", "Lasagne alla bolognese", "Tortellini", "Pesto alla genovese", "Agnolotti", "Orecchiette alle cime di rapa", "Fileja"],
  },
  {
    name: "Risotto og ris",
    illustration: "rice",
    dishNames: ["Arancini", "Risi e bisi"],
  },
  {
    name: "Forretter",
    illustration: "olive",
    dishNames: ["Caponata", "Frittatina", "Focaccia", "Vitello tonnato", "'Nduja"],
  },
  {
    name: "Kjøtt og fisk",
    illustration: "fish",
    dishNames: ["Saltimbocca", "Bistecca alla fiorentina", "Sarde in saor"],
  },
  {
    name: "Supper og gryter",
    illustration: "soup",
    dishNames: ["Ribollita"],
  },
  {
    name: "Bakverk og dessert",
    illustration: "cake",
    dishNames: ["Cannoli", "Sfogliatella"],
  },
];
