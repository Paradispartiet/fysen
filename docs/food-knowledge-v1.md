# Fysen Food Knowledge v1

Fysen Food Knowledge er det canonicale redaksjonelle laget for rettoppdagelse og matkunnskap. Det er separat fra restaurantens menybevis, men koblet til samme rettidentitet og samme live søk.

## Produktløkken

Fysen skal kunne ta brukeren gjennom én sammenhengende flyt:

`kjøkken → region/tradisjon → rett → matkunnskap → relaterte retter → ferske restauranttreff`

Restaurantnavn, pris, tilgjengelighet og hva en bestemt restaurant faktisk serverer kommer alltid fra ferske, sporbare menytreff. Historie, teknikk, oppskrift og generell matkunnskap er et eget redaksjonelt lag og må aldri presenteres som om det beskriver restaurantens konkrete versjon av retten.

## Canonicalt rettregister

`apps/web/content/food-knowledge/catalog.ts` eier rettidentitetene som brukes av Utforsk kjøkken og Matkunnskap.

Hver rett har:

- stabil `id`;
- navn og søketerm;
- aliases;
- kjøkkenfamilie;
- region, land, bytradisjon eller relevant kategori;
- `explorerPriority` for redaksjonell prioritering.

Food Knowledge v1 starter med 84 canonicale retter fordelt på de seks aktive kjøkkenfamiliene og deres regioner/tradisjoner.

UI-komponenter skal ikke opprette egne parallelle rettlister. De skal lese fra det canonicale registeret.

## Utforsk kjøkken

`CuisineExplorer` bygger regionene fra registeret og viser opptil åtte redaksjonelt prioriterte retter per område.

Forsiden kombinerer to signaler:

1. `explorerPriority` bestemmer hvilke retter som er gode redaksjonelle kandidater;
2. Fysens live menyindeks avgjør hvilke kandidater som faktisk kan kobles til ferske restauranttreff.

Bare ikke-fuzzy treff kan brukes som restaurantforslag. Et område kan fortsatt vise en god og relevant rett selv om Fysen foreløpig ikke har et sikkert Oslo-treff; UI-et skal da si dette eksplisitt i stedet for å finne på en restaurant.

## Lær om retten

Fullverdige matleksikonartikler registreres i `apps/web/content/food-knowledge/manifest.ts` og eies som separate filer under `articles/`.

Første bølge inneholder 32 fullverdige artikler.

En full artikkel skal dekke:

- kort forklaring av hva retten er;
- historisk og matkulturell kontekst;
- smak og tekstur;
- sentral teknikk;
- bestanddeler og deres funksjon;
- hjemmeoppskrift med porsjoner, tid, ingredienser og trinn;
- vanlige varianter;
- servering;
- vanlige feil;
- relaterte canonicale retter;
- kilder når gode autoritative kilder finnes;
- dynamiske, ferske Fysen-treff på restauranter i Oslo.

Oppskrifter beskrives som hjemmevarianter når retten er en bred rettfamilie uten én enkelt canonical oppskrift.

## Kilder og belegg

Kunnskapskilder bør prioriteres i denne rekkefølgen når de finnes:

1. offisielle kultur-, landbruks- eller reiselivsorganer med tydelig faglig eierskap;
2. UNESCO eller tilsvarende kulturarvinstitusjoner;
3. anerkjente faglige eller historiske verk;
4. sekundære redaksjonelle kilder når bedre primærkilder ikke finnes.

Manglende kilde skal ikke fylles med en tilfeldig lenke bare for å få et kildefelt. Innhold med usikker eller omdiskutert opprinnelse skal beskrive usikkerheten eksplisitt.

Kildene er belegg for generell matkunnskap. De er aldri menybevis for en restaurant.

## Hvordan vi legger til en ny rett

1. Legg rettens stabile identitet, aliases og plassering i `catalog.ts`.
2. Sett `explorerPriority` ut fra hvor representativ, interessant og nyttig retten er for området — ikke ut fra sponsing.
3. Retten blir automatisk tilgjengelig for riktig Utforsk-region.
4. Hvis retten skal ha full Matkunnskap, legg ID-en i `manifest.ts` og opprett én artikkelfil.
5. Artikkelen må fylle hele `FoodKnowledgeArticle`-kontrakten og bare peke til eksisterende canonicale relaterte retter.
6. Legg gode kilder når de finnes.
7. La vanlig lint, typecheck, build og browser-smoke være publiseringsport.

## Skalering

Det er bevisst mulig å ha langt flere canonicale retter enn fullverdige artikler. Dette gjør at Fysen kan ha bred oppdagelse i Utforsk kjøkken uten å senke kvalitetskravet til Matkunnskap.

En naturlig videre utrulling er:

- utvide registeret når menydekningen eller en ny kjøkkenregion tilsier det;
- løfte de mest brukte og mest interessante rettene fra register til full artikkel;
- bruke anonymisert søke- og menydekning som prioriteringssignal, uten at popularitet alene bestemmer redaksjonell verdi;
- koble samme canonicale rettidentitet til flere byer når Fysen utvider geografisk.

## Ikke tillatt

- hardkodede konkurrerende rettidentiteter i enkeltkomponenter;
- generelle oppskriftsingredienser presentert som restaurantens faktiske ingredienser;
- fuzzy menytreff presentert som sikre restaurantforslag;
- sponsing som endrer matkunnskap, menybevis eller matchscore;
- bastante opprinnelsespåstander der historikken er reelt omdiskutert.
