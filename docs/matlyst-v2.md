# Matlyst v2

Matlyst er Fysens oppdagelseslag for mat. Det skal hjelpe brukeren å finne en rett både når brukeren vet hvilket kjøkken de ønsker, og når de bare vet hva som frister.

## Produktkontrakt

Matlyst har to separate innganger:

1. **Hva frister?** organiserer etter brukerintensjon og rettstype.
2. **Kjøkken** organiserer etter mattradisjon. Det er ikke en erstatning for rettsøk og skal ikke ha en parallell restaurantdatabase.

Begge innganger ender i den samme rettsøk-/browse-flaten som resten av Fysen. Live-dekning beregnes fra `DishBrowseResponse`; Matlyst skal ikke fabrikkere restauranttall eller summere overlappende menyvarianter.

## Taksonomi v2

Den gamle toppkategorien `Asiatisk` var for bred og inkonsistent med at `Indisk` allerede var et eget kjøkken. V2 presenterer derfor de dokumenterte mattradisjonene som egne kjøkken.

Aktiv Matlyst-taksonomi etter dekningsutvidelsen:

- Japansk
- Kinesisk
- Thai
- Vietnamesisk
- Koreansk
- Filippinsk
- Indisk
- Pakistansk
- Nepalsk
- Etiopisk
- Italiensk
- Midtøsten
- Tyrkisk
- Persisk
- Usbekisk
- Mexicansk
- Brasiliansk
- Polsk

`Fast food` er ikke et kjøkken i Matlyst. Burger og fried chicken er brukerintensjoner under **Hva frister?**.

## Hva frister?

Følgende innganger er nå aktive:

- Pizza
- Burger
- Nudler
- Curry
- Dumplings
- Tacos
- Fried chicken
- Vegetar
- Grill
- Street food
- Risretter

Disse er tverrgående brukerintensjoner. De kan peke på retter fra flere kjøkken.

Et lystkort er ikke en direkte lenke til et bredt tekstsøk som `street food` eller `grill`. Kortet åpner en egen Matlyst-utforsker med de canonical rettene som faktisk representerer lysten, rangert med fersk Oslo-dekning først. Derfra velger brukeren en konkret rett og går videre til vanlig Fysen-søk via **Se treff**. Dette hindrer at et kort viser dokumentert dekning fra én rett og deretter sender brukeren til et bredt søk som ikke nødvendigvis treffer den samme maten.

## Kjøkken på forsiden og Alle kjøkken

Forsiden skal ikke vokse til en vegg av store kort når taksonomien utvides. Den viser derfor bare de åtte best rangerte kjøkkenene i stor kortform.

**Alle kjøkken** åpner en separat, kompakt katalog med hele den dokumenterte taksonomien. Katalogen:

- beholder samme live-dekningsrangering som forsiden,
- kan filtreres på kjøkkennavn, regioner og representative canonical retter,
- viser ett konservativt live-signal per kjøkken når dekning finnes,
- åpner den samme kjøkken-/rettsutforskeren som de store kortene,
- oppretter ingen egen søke- eller restaurantindeks.

Dermed kan Matlyst vokse videre uten at hovedsiden blir visuelt overlesset.

## Canonical discovery-data og matkunnskap

Matlyst skiller mellom evidensnivåene, men ikke mellom sannhetskilder:

- `foodDishCatalog` er den eksisterende matkunnskapskatalogen. Retter med artikkel i manifestet kan vise **Lær om retten**.
- `foodDiscoveryCatalog` bygger videre på samme katalog med production-backed canonical discovery-retter som foreløpig ikke trenger en full matkunnskapsartikkel.
- `matlystDiscoveryCatalog` er et tynt aggregat over discovery-katalogen for nye, eksplisitt dokumenterte Matlyst-retter. Det inneholder ingen egen restaurant- eller søkelogikk.

Dette skillet gjør at Fysen kan vise dokumenterte kjøkken og live menydekning uten å late som en rett allerede har ferdig faginnhold. Nye discovery-retter får `hasKnowledge=false` helt til en faktisk artikkel er lagt i food-knowledge-manifestet.

Discovery-katalogene inneholder ingen restaurantkopier. De inneholder bare canonical rettsidentiteter, søketermer, aliaser, kjøkken/region og explorer-prioritet. Restaurant- og menybevis kommer fortsatt fra produksjonskatalogen og den materialiserte browse-indeksen.

## Produksjonsgrunnlag for kjøkkendekningen

Dekningsutvidelsen er basert på restauranter som allerede finnes i Fysens produksjonskatalog:

- Koreansk → KornDoKKi: blant annet bibimbap, bulgogi, tteokbokki og mandu.
- Filippinsk → Kain Neo-Filipino Bistro: blant annet sisig, pork adobo, chicken inasal, kare-kare, sinuglaw og siomai.
- Brasiliansk → Buteco Ipanema: blant annet pão de queijo, coxinha, bolinhos de bacalhau og mandioca frita.
- Nepalsk → Nepal House: blant annet momo, jhol momo, chowmein, sekuwa og choila.
- Pakistansk → Lahori Dera: blant annet tikka masala, lahori karahi, chapli kebab og saag paneer.
- Persisk → Tehran Spiseri: blant annet koobideh, ghormeh sabzi, zereshk polo og kashke bademjan.
- Usbekisk → Registan: blant annet plov, lagman, qazon kebab og manty.
- Polsk → Polskie Jadło: blant annet pierogi, bigos, kotlet schabowy og żur.
- Etiopisk → Hakuna Matata: blant annet doro wet, key wet, tibis, awaze tibis, gored gored, firfir, meser wet og shiro.

Aliasene i discovery-katalogene er valgt for å matche de faktiske menyidentitetene konservativt gjennom `dish-discovery.ts`.

## Live-dekning og rangering

Når browse-data er tilgjengelig, rangeres kjøkken etter beste dokumenterte ferske dekning blant kjøkkenets canonical retter. De åtte best rangerte vises på forsiden; hele listen finnes i **Alle kjøkken**. Når live-data mangler, brukes den eksplisitte produktrekkefølgen som stabil fallback.

Kortene under **Hva frister?** bruker canonical retter som representative signaler. Kortet viser ett ferskt eksempel med et konservativt restaurantminimum. Når kortet åpnes, rangeres alle rettene i lysten etter samme coverage-logikk. Matlyst registrerer ikke selve discovery-visningen som et brukersøk; først når brukeren velger **Se treff** på en konkret rett går flyten inn i vanlig søk.

## Datagrense

Matlyst skal fortsatt være en oppdagelsesflate over Fysens eksisterende sannhetskilder:

1. restaurantkatalogen,
2. materialisert menydata,
3. canonical discovery-retter,
4. matkunnskap der denne faktisk finnes,
5. den samme ferske browse-indeksen som «Alle retter».

Det skal ikke opprettes en separat Matlyst-restaurantdatabase eller hardkodes restauranttall i UI-et.

## Kandidater som ikke er aktivert ennå

Et restaurantnavn eller en enkelt tematisk rett er ikke nok til å opprette et kjøkken. For eksempel er Parthenon i produksjonskatalogen i hovedsak dokumentert med pizza, grill, falafel og kebab; det er derfor ikke tilstrekkelig grunnlag for å aktivere **Gresk** bare ut fra restaurantnavnet.

Tilsvarende har Rolis Bodega enkelte eksplisitt ungarsk-inspirerte retter, men menyen er en blandet bodega-/tapasflate. **Ungarsk** holdes derfor tilbake til Matlyst har et bredere canonical rettsgrunnlag.

## Neste utvidelser

Neste dekningsrunde bør prioritere kjøkken som allerede kan underbygges av produksjonsmenyer, før vi lager tomme kategorier. Norsk/nordisk, fransk, spansk, gresk, eritreisk og andre kjøkken aktiveres først når canonical retter og faktisk Oslo-dekning kan dokumenteres.

Parallelt kan de nye discovery-rettene gradvis få full matkunnskap. Det er et innholdsløft, ikke en forutsetning for at Matlyst kan vise dem med fersk menydekning.
