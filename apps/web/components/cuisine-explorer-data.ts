export type DishSuggestion = {
  readonly label: string;
  readonly query: string;
};

export type CuisineArea = {
  readonly name: string;
  readonly dishes: readonly DishSuggestion[];
};

export type Cuisine = {
  readonly name: string;
  readonly context: string;
  readonly areasLabel: string;
  readonly areas: readonly CuisineArea[];
};

export type FoodKnowledgeFact = {
  readonly cuisine: string;
  readonly text: string;
};

export const cuisines: readonly Cuisine[] = [
  {
    name: "Asiatisk",
    context: "Japan · Kina · Thailand · Vietnam",
    areasLabel: "Land og kjøkkentradisjoner",
    areas: [
      {
        name: "Japan",
        dishes: [
          { label: "Ramen", query: "ramen" },
          { label: "Sushi", query: "sushi" },
          { label: "Gyoza", query: "gyoza" },
          { label: "Katsu", query: "katsu" },
        ],
      },
      {
        name: "Kina",
        dishes: [
          { label: "Bao", query: "bao" },
          { label: "Dumplings", query: "dumplings" },
          { label: "Mapo tofu", query: "mapo tofu" },
          { label: "Pekingand", query: "peking duck" },
        ],
      },
      {
        name: "Thailand",
        dishes: [
          { label: "Pad thai", query: "pad thai" },
          { label: "Grønn curry", query: "green curry" },
          { label: "Tom yum", query: "tom yum" },
          { label: "Pad kra pao", query: "pad kra pao" },
        ],
      },
      {
        name: "Vietnam",
        dishes: [
          { label: "Pho", query: "pho" },
          { label: "Bánh mì", query: "banh mi" },
          { label: "Bún chả", query: "bun cha" },
          { label: "Vårruller", query: "vietnamese spring rolls" },
        ],
      },
    ],
  },
  {
    name: "Indisk",
    context: "Mange regionale kjøkken",
    areasLabel: "Regioner og tradisjoner",
    areas: [
      {
        name: "Nord-India",
        dishes: [
          { label: "Butter chicken", query: "butter chicken" },
          { label: "Tandoori", query: "tandoori" },
          { label: "Chana masala", query: "chana masala" },
          { label: "Naan", query: "naan" },
        ],
      },
      {
        name: "Sør-India",
        dishes: [
          { label: "Dosa", query: "dosa" },
          { label: "Idli", query: "idli" },
          { label: "Sambar", query: "sambar" },
          { label: "Vada", query: "vada" },
        ],
      },
      {
        name: "Hyderabad",
        dishes: [
          { label: "Biryani", query: "biryani" },
          { label: "Haleem", query: "haleem" },
          { label: "Kebab", query: "kebab" },
          { label: "Mirchi ka salan", query: "mirchi ka salan" },
        ],
      },
    ],
  },
  {
    name: "Fast food",
    context: "Rask servering · mange tradisjoner",
    areasLabel: "Typer",
    areas: [
      {
        name: "Burger",
        dishes: [
          { label: "Cheeseburger", query: "cheeseburger" },
          { label: "Smashburger", query: "smashburger" },
          { label: "Kyllingburger", query: "chicken burger" },
          { label: "Vegetarburger", query: "veggie burger" },
        ],
      },
      {
        name: "Fried chicken",
        dishes: [
          { label: "Fried chicken", query: "fried chicken" },
          { label: "Chicken wings", query: "chicken wings" },
          { label: "Chicken tenders", query: "chicken tenders" },
          { label: "Hot chicken", query: "hot chicken" },
        ],
      },
      {
        name: "Hot dog",
        dishes: [
          { label: "Hot dog", query: "hot dog" },
          { label: "Pølse", query: "pølse" },
          { label: "Chili dog", query: "chili dog" },
          { label: "Corn dog", query: "corn dog" },
        ],
      },
    ],
  },
  {
    name: "Italiensk",
    context: "Roma · Napoli · regionale tradisjoner",
    areasLabel: "Regioner og bytradisjoner",
    areas: [
      {
        name: "Roma",
        dishes: [
          { label: "Carbonara", query: "carbonara" },
          { label: "Cacio e pepe", query: "cacio e pepe" },
          { label: "Amatriciana", query: "amatriciana" },
          { label: "Saltimbocca", query: "saltimbocca" },
        ],
      },
      {
        name: "Napoli",
        dishes: [
          { label: "Pizza margherita", query: "pizza margherita" },
          { label: "Pizza marinara", query: "pizza marinara" },
          { label: "Frittatina", query: "frittatina" },
          { label: "Sfogliatella", query: "sfogliatella" },
        ],
      },
      {
        name: "Sicilia",
        dishes: [
          { label: "Arancini", query: "arancini" },
          { label: "Pasta alla Norma", query: "pasta alla norma" },
          { label: "Caponata", query: "caponata" },
          { label: "Cannoli", query: "cannoli" },
        ],
      },
    ],
  },
  {
    name: "Midtøsten",
    context: "Levant · Egypt · naboregioner",
    areasLabel: "Regioner og tradisjoner",
    areas: [
      {
        name: "Levanten",
        dishes: [
          { label: "Falafel", query: "falafel" },
          { label: "Shawarma", query: "shawarma" },
          { label: "Hummus", query: "hummus" },
          { label: "Manakish", query: "manakish" },
        ],
      },
      {
        name: "Egypt",
        dishes: [
          { label: "Ta'ameya", query: "taameya" },
          { label: "Koshari", query: "koshari" },
          { label: "Ful medames", query: "ful medames" },
          { label: "Fattah", query: "fattah" },
        ],
      },
      {
        name: "Tyrkia",
        dishes: [
          { label: "Döner", query: "doner" },
          { label: "Pide", query: "pide" },
          { label: "Lahmacun", query: "lahmacun" },
          { label: "Mantı", query: "manti" },
        ],
      },
    ],
  },
  {
    name: "Mexicansk",
    context: "Mange regionale kjøkken",
    areasLabel: "Regioner og tradisjoner",
    areas: [
      {
        name: "Sentral-Mexico",
        dishes: [
          { label: "Tacos al pastor", query: "tacos al pastor" },
          { label: "Quesadilla", query: "quesadilla" },
          { label: "Pozole", query: "pozole" },
          { label: "Tlacoyo", query: "tlacoyo" },
        ],
      },
      {
        name: "Jalisco",
        dishes: [
          { label: "Birria", query: "birria" },
          { label: "Torta ahogada", query: "torta ahogada" },
          { label: "Carne en su jugo", query: "carne en su jugo" },
          { label: "Pozole rojo", query: "pozole rojo" },
        ],
      },
      {
        name: "Yucatán",
        dishes: [
          { label: "Cochinita pibil", query: "cochinita pibil" },
          { label: "Sopa de lima", query: "sopa de lima" },
          { label: "Panuchos", query: "panuchos" },
          { label: "Papadzules", query: "papadzules" },
        ],
      },
      {
        name: "Baja",
        dishes: [
          { label: "Fish taco", query: "fish taco" },
          { label: "Shrimp taco", query: "shrimp taco" },
          { label: "Ceviche", query: "ceviche" },
          { label: "Tostada", query: "tostada" },
        ],
      },
    ],
  },
];

export const foodKnowledgeFacts: readonly FoodKnowledgeFact[] = [
  {
    cuisine: "Asiatisk",
    text: "Ramen, bao, pad thai og pho kommer fra ulike land og kjøkkentradisjoner; «asiatisk» er en svært bred samlebetegnelse.",
  },
  {
    cuisine: "Indisk",
    text: "Biryani finnes i mange regionale varianter i Sør-Asia, med ulike krydder, råvarer og tilberedninger.",
  },
  {
    cuisine: "Fast food",
    text: "Fast food beskriver først og fremst en serveringsform, ikke ett bestemt kjøkken eller én matkultur.",
  },
  {
    cuisine: "Italiensk",
    text: "Carbonara forbindes særlig med Roma, mens pizza har sterke historiske røtter i Napoli.",
  },
  {
    cuisine: "Midtøsten",
    text: "Falafel lages ofte av kikerter eller favabønner; råvaren og krydringen varierer mellom tradisjoner.",
  },
  {
    cuisine: "Mexicansk",
    text: "Taco er en matform med mange regionale varianter, ikke én enkelt oppskrift.",
  },
];
