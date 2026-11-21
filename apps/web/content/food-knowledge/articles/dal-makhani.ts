import type { FoodKnowledgeArticle } from "../types";

export const article: FoodKnowledgeArticle = {
  dishId: "dal-makhani",
  summary: "Kremet dal fra Punjab med hele svarte uradbønner og røde kidneybønner. Bønnene får småkoke med tomat og krydder før retten rundes av med smør og fløte.",
  overview: "Dal makhani er en fyldig belgvekstgryte. De hele uradbønnene gir den mørke fargen og en kremet konsistens når de kokes myke, mens de røde bønnene gir litt tyggemotstand.",
  history: "Dal makhani hører til det punjabiske kjøkkenet i Nord-India. Retten lages både hjemme og på restauranter, der en fyldig versjon med smør og fløte er vanlig.",
  flavor: "Uradbønnene smaker jordlig, tomaten gir syre, og smør og fløte demper varmen fra chili og ingefær. Noen restaurantvarianter har også en lett røyksmak.",
  technique: "Kok de bløtlagte uradbønnene helt myke før de blandes med den innkokte tomat- og krydderbasen. Mos noen bønner mot grytekanten og la blandingen småkoke til den tykner.",
  essentials: [
    "Hele svarte uradbønner (sabut urad dal).",
    "Røde kidneybønner (rajma).",
    "Tomat, ingefær, spisskummen og chili.",
    "Smør og fløte gir retten den karakteristiske fylden.",
  ],
  recipe: {
    label: "Dal makhani med urad og rajma",
    yield: "4 porsjoner",
    time: "ca. 1 t 30 min + bløtlegging",
    ingredients: [
      "160 g hele svarte uradbønner, bløtlagt over natten",
      "120 g kokte røde kidneybønner fra boks, avrent",
      "1 liten løk, finhakket",
      "2 hvitløksfedd og 2 cm ingefær, finrevet",
      "250 g passerte tomater",
      "1 ts spisskummenfrø, ½ ts chilipulver og ½ ts garam masala",
      "2 ss smør, ½ dl fløte og salt",
    ],
    steps: [
      "Skyll uradbønnene og kok dem i nytt vann til de er helt myke. Ta vare på noe av kokevannet.",
      "Varm smøret i en gryte. La spisskummen frese kort, stek løken myk og tilsett hvitløk og ingefær.",
      "Rør inn tomat og chili. La det koke inn til en tykk base.",
      "Tilsett uradbønnene, kidneybønnene og litt kokevann. Mos noen av bønnene og la gryten småkoke i 20–30 minutter. Rør innimellom.",
      "Rør inn garam masala og fløte mot slutten, og smak til med salt.",
    ],
  },
  variants: ["Hjemmeversjoner med mindre fløte.", "Fyldigere restaurantversjoner med ekstra smør eller mild røyksmak."],
  serving: ["Server varm med naan, roti eller ris.", "Litt fløte eller frisk koriander kan brukes som garnityr."],
  commonMistakes: ["Å tilsette uradbønnene før de er gjennomkokte.", "Å spe med for mye vann slik at gryten blir tynn."],
  relatedDishIds: ["chana-masala", "butter-chicken", "naan"],
  sources: [
    { label: "Sanjeev Kapoor – Dal Makhani", href: "https://www.sanjeevkapoor.com/Recipe/Dal-Makhani.html" },
    { label: "Dassana Amit – Dal Makhani", href: "https://www.vegrecipesofindia.com/dal-makhani-restaurant-style-recipe/" },
  ],
};
