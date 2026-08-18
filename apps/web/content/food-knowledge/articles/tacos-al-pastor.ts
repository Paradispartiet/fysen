import type { FoodKnowledgeArticle } from "../types";

export const article: FoodKnowledgeArticle = {
  dishId: "tacos-al-pastor",
  summary: "Sentralmeksikanske tacos med marinert svinekjøtt stekt på vertikalt spidd, skåret tynt og servert i maistortilla med løk og koriander.",
  overview: "Al pastor kombinerer meksikanske chile- og maistradisjoner med en vertikal spiddteknikk som kom gjennom innvandring fra det østlige Middelhavet. Kjøttet får mørke, karamelliserte kanter mens innsiden forblir saftig.",
  history: "Retten utviklet seg i Mexico på 1900-tallet i møte mellom lokale taco-tradisjoner og vertikal spiddsteking beslektet med shawarma. Den er særlig forbundet med Mexico City og sentrale deler av landet.",
  flavor: "Ristet og saftig svinekjøtt med tørket chili, achiote, syre og krydder, balansert av rå løk, koriander og salsa. Ananas er vanlig i mange serveringer, men ikke universell.",
  technique: "Hjemme kan man etterligne trompo-effekten ved å marinere tynt skåret svinekjøtt og steke det svært hardt i porsjoner før det hakkes. Målet er mange brunede kanter uten tørt kjøtt.",
  essentials: ["Svinekjøtt i tynne skiver.","Marinade med tørket chili, achiote og syre.","Små maistortillaer.","Løk, koriander, salsa og lime som frisk avslutning."],
  recipe: { label: "Al pastor-inspirerte tacos i panne", yield: "12 tacos", time: "ca. 45 min + marinering", ingredients: ["700 g svinenakke i tynne skiver","2 ss achiotepasta","2 tørkede guajillo-chili, bløtlagt","2 ss eddik","1 dl appelsinjuice","2 hvitløksfedd","1 ts oregano","12 små maistortillaer","løk og koriander","lime, salsa og ananas etter ønske"], steps: ["Kjør achiote, chili, eddik, appelsin, hvitløk og krydder til en glatt marinade.","Mariner svinekjøttet minst to timer, gjerne over natten.","Stek kjøttet i svært varm panne i små porsjoner så kantene får kraftig farge.","La kjøttet hvile kort og hakk det i små biter; gi det eventuelt en siste rask steking.","Varm tortillaene og fyll med kjøtt, løk, koriander, salsa, lime og eventuelt ananas."] },
  variants: ["Trompo-stekt taquería-versjon.","Hjemmevariant stekt i panne eller under grill.","Noen steder serverer ananas fra toppen av trompoen, andre gjør ikke."],
  serving: ["Serveres som små tacos, vanligvis flere per person.","Salsa og lime bør være tydelige nok til å balansere det fete kjøttet."],
  commonMistakes: ["For tykke kjøttstykker uten karamelliserte kanter.","For søt marinade som brenner før kjøttet er ferdig.","Kalde, tørre tortillaer som sprekker rundt fyllet."],
  relatedDishIds: ["birria","quesadilla","pozole","cochinita-pibil"],
  sources: [{ label: "UNESCO – Traditional Mexican cuisine", href: "https://ich.unesco.org/en/lists?RL=00400" }]
};
