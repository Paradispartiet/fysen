# Fysen – diskret visuelt matatlas v2

Denne stilkontrakten gjelder **Utforsk**, **Alle retter**, arkivsøket,
redaksjonelle rettsforslag, menytreff og matleksikon.

## Hierarki

1. **Kategorinavnet er hovedelementet.** God kontrast, rolig skrift, ingen
   brølende caps, dekorative flater eller unødvendig typografi.
2. **Ett lite visuelt tegn** står over kategorinavnet:
   - Nasjonalt kjøkken: autentisk landflagg som SVG-bilde. Ikke emoji.
   - Avgrenset region med dokumentert flagg: autentisk regionsflagg.
   - Andre regioner og mattyper: én original, konkret matillustrasjon.
3. På rett-/menynivå er bildet et valgfritt visuelt tillegg, aldri en
   erstatning for navn, pris, restaurant eller faktisk menykilde.

## Størrelse

| Flate | Flagg | Illustrasjon | Kategori-/resultattekst |
|---|---|---|---|
| Utforsk (kategori/underkategori) | 28 × 19 px visningsboks | 28 × 28 px | 11 px, ca. 570 vekt |
| Utforsk (mattype) | – | 28 × 28 px | 11 px, ca. 570 vekt |
| Alle retter (underkategori) | 28 × 19 px | 28 × 28 px | 11 px |
| Alle retter (mattype) | – | 28 × 28 px | 11 px |
| Menyarkiv (underkategori/mattype) | 28 × 19 px | 28 × 28 px | ~11–12 px |
| Meny-/restauranteresultat | – | 20–22 px | Normal tittel-/prisprioritet |
| Nye retter / Mest søkt | – | 20–25 px | Normal tekstprioritet |
| Matleksikonets rettoverskrift | – | 32–38 px | Overskriften dominerer |
| Matleksikonets ingredienser | – | 18–19 px | Ingrediensnavn dominerer |

Størrelsene er *visningsbokser*, ikke harde beskæringer. Flagg og
illustrasjoner bruker `object-fit: contain`, uten zoom og uten beskåret motiv.

## Materiale

- **Flagg:** Original flaggproporsjon, ingen skygge, maksimum 1 px avrunding.
  Landflagg kommer som ekte SVG-bilde fra
  [Flagpedia/FlagCDN](https://flagcdn.com/), og regionalflagg fra
  kildeidentifiserte SVG-originaler på Wikimedia Commons.
- **Illustrasjoner:** De eksisterende originale, transparente mat-SVG-ene
  brukes som konkrete små tegninger, ikke som store ikonmerker.
  Nedtonet metning og kontrast, uten egen ikonbakgrunn.
- Ikke hent et standardikon fra operativsystemet eller et ikonbibliotek.
  Ingen emoji i selve UI-et. Unicode-flagg i data kan brukes kun som
  *landkode-inndata* for autentiske SVG-flagg.
- Ingen generiske flagg, fiktive regionsflagg eller blanding av
  flagg og matillustrasjon på samme flis.
- Et illustrert rettnavn er aldri bevis for at et bestemt spisested
  tilbyr retten. Restaurant, pris og kildelenke beholdes som før.

## Flater og interaksjon

- Kategori-/mattypefliser er kompakte (normalt omtrent 58–63 px høye),
  uten fremtredende ramme eller fylt ikonbakgrunn.
- Hover: svært svak lysning. Aktivt valg: subtil, rolig kant.
- Tastaturfokus beholder synlig `focus-visible`-markering.
- Avstand mellom flisene: ca. 4–5 px; mellom illustrasjon/flagg og
  etikett: ca. 4–5 px.
- Mobil: responsivt antall kolonner, tydelig lesbar tekst, ingen beskjæring.
- Vår tidligere oppdeling i **12 hovedkjøkken, 101 underkategorier og
  57 mattyper** skal forbli uendret. Hurtigmat har sine ni mattyper på
  første nivå.

## Ved endringer

Kategorier må oppfylle nøyaktig én av `flag`, `flagFile` og
`illustration`. Fysiske menydata og restauranttreff skal aldri
konstrueres fra dekorative assets.


## Hjemmesidens «Utforsk matretter»

- Hele funksjonen ligger i **én** native `<details>`-utbrettmeny som
  **alltid starter lukket**. Bare overskrift og kort hjelpetekst vises.
- Når den åpnes, vises **12 enkle, tekstbaserte kjøkkenvalg** – ikke de gamle
  store kjøkken- og restaurantkortene. Antall underkategorier vises lite.
- På telefon bruker listen to kolonner (seks korte rader); på nettbrett to,
  på desktop tre. Resten av forsiden ligger utenfor og vises som før.
- Ett trykk på et kjøkken åpner eksisterende valg av region og mattype,
  med ekte menydekning. Ingen rett er fjernet.
- Menyen lukkes ved trykk på samme overskrift; tastatur og skjermleser
  støttes av native `summary` og synlig fokusmarkering.
- «Nye retter», «Mest søkt» og bildegalleriet er egne seksjoner. Ingen
  av dem dupliseres inne i denne menyen.
