import type { FoodKnowledgeArticle } from "../types";

export const article: FoodKnowledgeArticle = {
  dishId: "birria",
  summary: "Jalisco-rett med langtidskokt, chilemarinert kjøtt og konsentrert kraft, servert som gryte eller i tacos.",
  overview: "Birria handler om langsom tilberedning og en saus eller kraft bygget på tørkede chilier, krydder og kjøttets egen gelatin. Den moderne, internasjonalt populære quesabirria-stilen er én serveringsform, ikke hele definisjonen av retten.",
  history: "Birria forbindes særlig med Jalisco og har tradisjonelt ofte vært laget med geit, men storfe og andre kjøttslag er også utbredt. Retten serveres både ved feiringer og som spesialisert restaurant- og gatemat.",
  flavor: "Dyp, varm og chilepreget med syre, tørket fruktkarakter fra chiliene og rik umami fra langkokt kjøtt og kraft.",
  technique: "Tørkede chilier ristes og bløtlegges før de kjøres til marinade. Kjøttet skal tilberedes sakte til det kan trekkes fra hverandre, mens kraften avfettes og justeres separat slik at den blir intens uten å være tung.",
  essentials: ["Kjøtt som tåler lang tilberedning, som bog, høyrygg eller geit.","Tørkede meksikanske chilier som guajillo og ancho.","Krydder, eddik og aromater i marinaden.","Consomé eller kokekraft som serveres sammen med kjøttet."],
  recipe: { label: "Birria-inspirert storfegryte", yield: "6 porsjoner", time: "ca. 4 timer", ingredients: ["1,5 kg høyrygg eller bog","4 guajillo-chili","2 ancho-chili","3 hvitløksfedd","1 løk","2 ss eddik","1 ts spisskummen","1/2 ts kanel","1 ts oregano","1 l oksekraft","lime, løk og koriander"], steps: ["Rist de tørkede chiliene kort, fjern frø og bløtlegg dem i varmt vann.","Kjør chili med hvitløk, løk, eddik og krydder til en glatt marinade.","Brun kjøttet, dekk med marinade og kraft og la det braisere svært rolig til det faller fra hverandre.","Ta ut kjøttet, sil eller juster kraften og fjern overflødig fett etter smak.","Riv kjøttet og server i kraften eller i varme tortillaer med løk, koriander og lime."] },
  variants: ["Tradisjonelle geitevarianter.","Storfe-birria som er svært vanlig i moderne serveringer.","Quesabirria-tacos med ost og steking i fett fra kraften.","Birria servert som suppe eller gryte med consomé."],
  serving: ["Lime, hakket løk og koriander gir friskhet.","Consomé kan serveres i egen kopp som dypp til tacos."],
  commonMistakes: ["For kort koketid som gir seigt kjøtt.","Å la chilisausen være bitter etter hard brenning av tørket chili.","For mye fett i consoméen uten nok syre og krydderbalanse."],
  relatedDishIds: ["tacos-al-pastor","torta-ahogada","pozole-rojo","quesadilla"],
  sources: [{ label: "UNESCO – Traditional Mexican cuisine", href: "https://ich.unesco.org/en/lists?RL=00400" }]
};
