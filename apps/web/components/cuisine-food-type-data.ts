import {
  italianFoodTypes,
  type ItalianFoodType,
} from "./cuisine-explorer-taxonomy.ts";
import { matchesItalianFoodType } from "./italian-food-type-filter.ts";

/**
 * Food types cut across national / regional traditions; they never replace the
 * geographical tiers or imply that a restaurant carries any particular dish.
 *
 * One original transparent food illustration per food-type tile. Country and
 * regional flag tiles remain visually separate.
 */
export type CuisineFoodType = ItalianFoodType;

export const cuisineFoodTypeCatalog: Readonly<Record<string, readonly CuisineFoodType[]>> = {
  "Italiensk": italianFoodTypes,
  "Asiatisk": [
    { name: "Nudler og supper", illustration: "pasta", dishNames: ["Ramen", "Pad thai", "Phở", "Laksa", "Char kway teow", "Mohinga", "Tom yum"] },
    { name: "Risretter", illustration: "rice", dishNames: ["Bibimbap", "Nasi goreng", "Nasi lemak", "Hainanese chicken rice", "Pork adobo"] },
    { name: "Dumplings og buns", illustration: "flatbread", dishNames: ["Gyoza", "Bao", "Dumplings"] },
    { name: "Grill og kjøtt", illustration: "barbecue", dishNames: ["Bulgogi", "Satay", "Rendang", "Sisig", "Lok lak", "Larb"] },
    { name: "Fisk og sjømat", illustration: "fish", dishNames: ["Sushi", "Chili crab", "Amok trey"] },
    { name: "Småretter og street food", illustration: "sandwich", dishNames: ["Bánh mì", "Tam mak hoong", "Lahpet thoke", "Mapo tofu"] },
  ],
  "Indisk": [
    { name: "Curry og gryter", illustration: "curry", dishNames: ["Butter chicken", "Dal makhani", "Vindaloo", "Goansk fiskecurry", "Keralisk fiskecurry", "Haleem", "Undhiyu", "Rogan josh"] },
    { name: "Risretter", illustration: "rice", dishNames: ["Biryani", "Pongal"] },
    { name: "Brød, dosa og idli", illustration: "flatbread", dishNames: ["Naan", "Dosa", "Idli", "Chole bhature", "Appam", "Dal baati churma", "Kothu parotta"] },
    { name: "Småretter", illustration: "greens", dishNames: ["Dhokla", "Shorshe ilish"] },
    { name: "Dessert", illustration: "cake", dishNames: ["Mishti doi"] },
  ],
  "Midtøsten": [
    { name: "Grill og kebab", illustration: "kebab", dishNames: ["Döner", "Koobideh", "Masgouf", "Jerusalem mixed grill"] },
    { name: "Meze og småretter", illustration: "salad", dishNames: ["Tabbouleh", "Kibbeh", "Muhammara", "Ta'ameya", "Sabich"] },
    { name: "Brød og bakst", illustration: "flatbread", dishNames: ["Manakish", "Pide", "Musakhan"] },
    { name: "Ris og gryter", illustration: "rice", dishNames: ["Maqluba", "Ghormeh sabzi", "Dolma", "Koshari", "Mansaf", "Saltah", "Mandi"] },
  ],
  "Afrikansk": [
    { name: "Gryter og supper", illustration: "curry", dishNames: ["Tajine", "Harira", "Doro wat", "Zigni", "Egusi soup", "Lablabi", "Bunny chow"] },
    { name: "Ris og kornretter", illustration: "rice", dishNames: ["Couscous tfaya", "Jollof rice", "Waakye", "Thieboudienne", "Bariis iskukaris"] },
    { name: "Grill og kjøtt", illustration: "barbecue", dishNames: ["Suya", "Nyama choma", "Suqaar", "Chicken yassa", "Bobotie"] },
    { name: "Brød og tilbehør", illustration: "flatbread", dishNames: ["Injera", "Taita", "Red red", "Sukuma wiki"] },
    { name: "Småretter", illustration: "pie", dishNames: ["Brik"] },
  ],
  "Fransk": [
    { name: "Bakverk og dessert", illustration: "cake", dishNames: ["Kouign-amann", "Tarte normande"] },
    { name: "Fisk og sjømat", illustration: "fish", dishNames: ["Moules à la crème", "Bouillabaisse", "Quenelles de brochet"] },
    { name: "Kjøtt og gryter", illustration: "steak", dishNames: ["Bœuf bourguignon", "Choucroute garnie", "Tartiflette"] },
    { name: "Småretter og galetter", illustration: "flatbread", dishNames: ["Galette bretonne", "Flammekueche", "Salade lyonnaise", "Œufs en meurette", "Ratatouille"] },
    { name: "Ost og fondue", illustration: "cheese", dishNames: ["Fondue savoyarde", "Tartiflette"] },
  ],
  "Spansk": [
    { name: "Tapas og småretter", illustration: "olive", dishNames: ["Pintxos", "Escalivada", "Empanada gallega"] },
    { name: "Fisk og sjømat", illustration: "fish", dishNames: ["Bacalao al pil-pil", "Pulpo a la gallega"] },
    { name: "Supper og grønt", illustration: "soup", dishNames: ["Gazpacho", "Salmorejo"] },
    { name: "Gryter og kjøtt", illustration: "steak", dishNames: ["Fabada asturiana", "Cachopo"] },
    { name: "Dessert", illustration: "cake", dishNames: ["Crema catalana"] },
  ],
  "Gresk": [
    { name: "Meze og småretter", illustration: "salad", dishNames: ["Dakos", "Tomatokeftedes", "Fava Santorinis"] },
    { name: "Bakverk og pai", illustration: "pie", dishNames: ["Kalitsounia", "Blatsaria", "Epirotiki pita", "Bougatsa"] },
    { name: "Pasta og gryter", illustration: "pasta", dishNames: ["Pastitsada", "Sofrito korfiotiko"] },
    { name: "Brød og snacks", illustration: "flatbread", dishNames: ["Koulouri Thessalonikis"] },
  ],
  "Amerikansk": [
    { name: "Grill og BBQ", illustration: "barbecue", dishNames: ["Texas brisket", "Pulled pork", "Carolina barbecue", "Chili con carne"] },
    { name: "Fisk og sjømat", illustration: "lobster", dishNames: ["New England clam chowder", "Lobster roll", "Poke bowl"] },
    { name: "Ris og gryter", illustration: "rice", dishNames: ["Gumbo", "Jambalaya", "Étouffée", "Loco moco"] },
    { name: "Pizza og bakst", illustration: "pizza", dishNames: ["New York bagel", "New York-style pizza"] },
  ],
  "Nordisk": [
    { name: "Tradisjonsmat", illustration: "steak", dishNames: ["Fårikål", "Köttbullar", "Stegt flæsk", "Kjötsúpa"] },
    { name: "Fisk og sjømat", illustration: "fish", dishNames: ["Fiskesuppe", "Lohikeitto", "Plokkfiskur", "Fiskesúpan", "Mattak"] },
    { name: "Brød og bakverk", illustration: "flatbread", dishNames: ["Karjalanpiirakka", "Smørrebrød", "Smörgåstårta"] },
    { name: "Potetretter", illustration: "greens", dishNames: ["Raspeballer", "Raggmunk"] },
    { name: "Tradisjonell konservering", illustration: "steak", dishNames: ["Ræst kjøt"] },
    { name: "Supper og gryter", illustration: "soup", dishNames: ["Suaasat", "Fårikål", "Kjötsúpa"] },
  ],
  "Mexicansk": [
    { name: "Taco og maisretter", illustration: "taco", dishNames: ["Tacos al pastor", "Fish taco", "Shrimp taco", "Tlacoyo", "Tlayuda", "Corundas"] },
    { name: "Mole og chili", illustration: "chili", dishNames: ["Mole negro", "Mole poblano", "Chiles en nogada"] },
    { name: "Grill og kjøtt", illustration: "steak", dishNames: ["Birria", "Carne asada", "Carnitas", "Cochinita pibil"] },
    { name: "Sandwich og burrito", illustration: "sandwich", dishNames: ["Torta ahogada", "Burrito norteño"] },
    { name: "Fisk og sjømat", illustration: "fish", dishNames: ["Pescado a la veracruzana", "Fish taco", "Shrimp taco"] },
    { name: "Supper", illustration: "soup", dishNames: ["Sopa de lima"] },
  ],
};

function normalizedDishName(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("nb")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/gu, " ");
}

export function foodTypesForCuisine(cuisineName: string): readonly CuisineFoodType[] {
  return cuisineFoodTypeCatalog[cuisineName] ?? [];
}

export function matchingCuisineFoodType(
  cuisineName: string,
  dishName: string,
  foodType: CuisineFoodType,
): boolean {
  if (!foodTypesForCuisine(cuisineName).some((item) => item.name === foodType.name)) return false;
  if (cuisineName === "Italiensk") return matchesItalianFoodType(dishName, foodType);

  const name = normalizedDishName(dishName);
  if (!name) return false;
  const padded = ` ${name} `;
  return foodType.dishNames.some((candidate) => {
    const normalized = normalizedDishName(candidate);
    return normalized.length > 0 && padded.includes(` ${normalized} `);
  });
}
