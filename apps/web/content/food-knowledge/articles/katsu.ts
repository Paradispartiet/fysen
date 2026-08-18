import type { FoodKnowledgeArticle } from "../types";

export const article: FoodKnowledgeArticle = {
  dishId: "katsu",
  summary: "Japansk panert og fritert kotelett eller filet, kjent for svært sprø panko-skorpe og saftig kjerne.",
  overview: "Katsu er en enkel idé med stor betydning i japansk hverdagsmat: kjøtt eller annen råvare paneres i mel, egg og panko før den friteres eller stekes. Tonkatsu med svin og chicken katsu er de mest kjente variantene.",
  history: "Katsu vokste fram i møte mellom japansk mat og vestlig-inspirert yōshoku fra slutten av 1800- og begynnelsen av 1900-tallet. Teknikken ble tilpasset japanske ingredienser, serveringsformer og sauser.",
  flavor: "Kjernen er mild og saftig, mens panko gir tørr, luftig crunch. Tonkatsusaus tilfører sødme, syre og krydder.",
  technique: "Jevn tykkelse og riktig oljetemperatur er avgjørende. Panko skal festes uten å presses hardt inn, slik at skorpen beholder luft.",
  essentials: ["Svinefilet, kotelett eller kylling i jevn tykkelse.","Mel og egg som binder paneringen.","Grov panko for lett og sprø skorpe.","Tonkatsusaus og finsnittet kål som klassisk følge."],
  recipe: { label: "Chicken katsu hjemme", yield: "4 porsjoner", time: "ca. 35 min", ingredients: ["4 små kyllingfileter","salt og pepper","60 g hvetemel","2 egg","120 g panko","nøytral olje til steking","finsnittet kål","tonkatsusaus eller en søt-syrlig brun saus"], steps: ["Bank kyllingen forsiktig til jevn tykkelse og krydre.","Vend først i mel, deretter egg og til slutt panko.","Varm et lag olje til middels høy varme og stek filetene gyldne på begge sider.","Kontroller at kyllingen er gjennomstekt og la den hvile kort på rist.","Skjær i skiver og server med kål og saus."] },
  variants: ["Tonkatsu: svinekotelett eller svinefilet.","Chicken katsu: kylling med samme paneringsteknikk.","Katsu curry: katsu med japansk curry og ris.","Katsu sando: sprø katsu i mykt brød."],
  serving: ["Skjæres gjerne i strimler før servering.","Finsnittet kål gir friskhet og kontrast til fritert skorpe."],
  commonMistakes: ["For lav oljetemperatur som gjør paneringen fet.","Ujevn tykkelse som gir tørr kant og rå kjerne.","Å la ferdigstekt katsu ligge flatt og dampe skorpen myk."],
  relatedDishIds: ["ramen","gyoza","sushi","cheeseburger"],
  sources: [{ label: "MAFF – Japanese Cuisine", href: "https://www.maff.go.jp/e/policies/market/japan-cuisine/index.html" }]
};
