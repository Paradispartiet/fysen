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

Disse er tverrgående brukerintensjoner. De kan peke på retter fra flere kjøkken, men ender fortsatt i vanlig Fysen-søk.

## Canonical discovery-data og matkunnskap

Matlyst skiller mellom to evidensnivåer:

- `foodDishCatalog` er den eksisterende matkunnskapskatalogen. Retter med artikkel i manifestet kan vise **Lær om retten**.
- `foodDiscoveryCatalog` bygger videre på samme katalog med production-backed canonical discovery-retter som foreløpig ikke trenger en full matkunnskapsartikkel.

Dette skillet gjør at Fysen kan vise dokumenterte kjøkken og live menydekning uten å late som en rett allerede har ferdig faginnhold. Nye discovery-retter får `hasKnowledge=false` helt til en faktisk artikkel er lagt i food-knowledge-manifestet.

Discovery-katalogen inneholder ingen restaurantkopier. Den inneholder bare canonical rettsidentiteter, søketermer, aliaser, kjøkken/region og explorer-prioritet. Restaurant- og menybevis kommer fortsatt fra produksjonskatalogen og den materialiserte browse-indeksen.

## Produksjonsgrunnlag for den nye kjøkkendekningen

Dekningsutvidelsen er basert på restauranter som allerede finnes i Fysens produksjonskatalog:

- Koreansk → KornDoKKi: blant annet bibimbap, bulgogi, tteokbokki og mandu.
- Filippinsk → Kain Neo-Filipino Bistro: blant annet sisig, pork adobo, chicken inasal, kare-kare, sinuglaw og siomai.
- Brasiliansk → Buteco Ipanema: blant annet pão de queijo, coxinha, bolinhos de bacalhau og mandioca frita.
- Nepalsk → Nepal House: blant annet momo, jhol momo, chowmein, sekuwa og choila.
- Pakistansk → Lahori Dera: blant annet tikka masala, lahori karahi, chapli kebab og saag paneer.
- Persisk → Tehran Spiseri: blant annet koobideh, ghormeh sabzi, zereshk polo og kashke bademjan.
- Usbekisk → Registan: blant annet plov, lagman, qazon kebab og manty.
- Polsk → Polskie Jadło: blant annet pierogi, bigos, kotlet schabowy og żur.

Aliasene i discovery-katalogen er valgt for å matche de faktiske menyidentitetene konservativt gjennom `dish-discovery.ts`.

## Live-dekning og rangering

Når browse-data er tilgjengelig, rangeres kjøkken etter beste dokumenterte ferske dekning blant kjøkkenets canonical retter. De åtte best rangerte vises først, mens resten ligger bak **Flere kjøkken**. Når live-data mangler, brukes den eksplisitte produktrekkefølgen som stabil fallback.

Kortene under **Hva frister?** bruker canonical retter som representative signaler. Kortet viser ett ferskt eksempel med et konservativt restaurantminimum, men lenken går til et vanlig brukersøk for hele lystbegrepet.

## Datagrense

Matlyst skal fortsatt være en oppdagelsesflate over Fysens eksisterende sannhetskilder:

1. restaurantkatalogen,
2. materialisert menydata,
3. canonical discovery-retter,
4. matkunnskap der denne faktisk finnes,
5. den samme ferske browse-indeksen som «Alle retter».

Det skal ikke opprettes en separat Matlyst-restaurantdatabase eller hardkodes restauranttall i UI-et.

## Neste utvidelser

Neste dekningsrunde bør prioritere kjøkken som allerede kan underbygges av produksjonsmenyer, før vi lager tomme kategorier. Kandidater vurderes fortløpende mot restaurantproduksjonen. Norsk/nordisk, fransk, spansk, gresk, etiopisk/eritreisk og andre kjøkken aktiveres først når canonical retter og faktisk Oslo-dekning kan dokumenteres.

Parallelt kan de nye discovery-rettene gradvis få full matkunnskap. Det er et innholdsløft, ikke en forutsetning for at Matlyst kan vise dem med fersk menydekning.
