import type { FoodKnowledgeArticle } from "../types";

export const article: FoodKnowledgeArticle = {
  dishId: "pasta-alla-norma",
  summary: "Siciliansk pasta med tomat, aubergine, basilika og salt ricotta, særlig forbundet med Catania.",
  overview: "Pasta alla Norma bygger en hel rett av få tydelige elementer: tomatsaus, stekt eller fritert aubergine, pasta, frisk basilika og ricotta salata. Styrken ligger i kontrasten mellom søt tomat, kremet aubergine og den salte osten.",
  history: "Retten forbindes med Catania og navnet knyttes tradisjonelt til Bellinis opera Norma, selv om detaljene rundt navneopphavet fortelles i flere versjoner. I dag regnes den som en av Sicilias mest kjente pastaretter.",
  flavor: "Søt og syrlig tomat møter myk aubergine, pepperaktig basilika og tydelig salt ricotta. Retten skal smake konsentrert uten å bli tung.",
  technique: "Auberginen må få ordentlig farge og miste rå vannsmak. Tomatsausen bør reduseres til den kan kle pastaen, og litt pastavann brukes til å samle sausen før aubergine og ost tilsettes.",
  essentials: ["Modne tomater eller god hermetisk tomat.", "Aubergine stekt eller fritert til den er gyllen og myk.", "Ricotta salata, ikke vanlig fersk ricotta.", "Basilika og pasta med god tyggemotstand."],
  recipe: { label: "Pasta alla Norma hjemme", yield: "4 porsjoner", time: "ca. 50 min", ingredients: ["400 g rigatoni, maccheroni eller spaghetti", "2 auberginer", "700 g hakkede eller hele hermetiske tomater", "2 hvitløksfedd", "olivenolje", "1 bunt basilika", "80–100 g ricotta salata", "salt og sort pepper"], steps: ["Skjær auberginen i skiver eller terninger, salt lett og tørk av eventuell overflatefukt.", "Stek auberginen i olivenolje til den er dypt gyllen og myk; legg til side.", "Fres hvitløk kort, tilsett tomat og la sausen småkoke til den er konsentrert.", "Kok pasta al dente og spar en kopp pastavann.", "Vend pastaen i tomatsausen med litt pastavann, tilsett mesteparten av auberginen og basilika.", "Server med resten av auberginen og rikelig revet ricotta salata." ] },
  variants: ["Catania-stil med maccheroni eller annen kort pasta.", "Noen hjem bruker ovnsbakt aubergine for en lettere variant.", "Ricotta salata kan variere i saltstyrke og tørrhet mellom produsenter."],
  serving: ["Serveres straks mens pastaen er blank av saus og osten fortsatt er tydelig.", "Et enkelt grønt tilbehør er nok; retten er ment å stå på egne ben."],
  commonMistakes: ["Å bruke rå eller blek aubergine som gir svampete tekstur.", "Å erstatte ricotta salata direkte med fersk ricotta.", "For mye saus, slik at pastaen svømmer i tomat."],
  relatedDishIds: ["arancini", "caponata", "carbonara", "pizza-margherita"],
  sources: [{ label: "Italia.it – Typical Sicilian products and dishes", href: "https://www.italia.it/en/sicily/things-to-do/typical-sicilian-products-dishes" }, { label: "Italia.it – Sicily European Region of Gastronomy", href: "https://www.italia.it/it/sicilia/cosa-fare/visitare-sicilia-regione-europea-gastronomia-2025" }]
};
