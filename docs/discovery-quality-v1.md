# Fysen Discovery Quality v1

Discovery Quality v1 bestemmer hvordan Fysen prioriterer retter når redaksjonell matkvalitet møter faktisk menydekning i Oslo.

## Hovedregel

Fysen skal ikke bruke én enkelt popularitetsliste og heller ikke late som om menydekning alene er matkvalitet.

Utforsk kombinerer derfor to signaler:

1. `explorerPriority` fra det canonicale rettregisteret beskriver redaksjonell relevans for kjøkkenet eller regionen.
2. Ferske, sikre menytreff beskriver om brukeren faktisk kan få retten i Oslo nå.

Restaurantforslag krever fortsatt ikke-fuzzy menytreff.

## Kjøkkenkort

Hvert kjøkkenkort prøver flere høyt prioriterte canonicale retter før det konkluderer med at kjøkkenet mangler ferske treff. Dette hindrer at hele kjøkkenet fremstår tomt bare fordi den aller første redaksjonelle kandidaten ikke finnes i dagens indeks.

Rettetikettene på kortet er redaksjonelle eksempler. Restaurantnavnene under `På menyen nå` kommer alltid fra live Fysen-søk.

## Regionutforsker

Når brukeren åpner et område, hentes menydekning for hver av de inntil åtte prioriterte rettene.

Visningsrekkefølgen er:

1. retter med minst ett sikkert, ferskt Oslo-treff;
2. blant disse: flere unike restauranttreff før færre;
3. deretter `explorerPriority`;
4. til slutt alfabetisk stabilisering.

Retter uten menydekning blir ikke slettet. De beholdes etter rettene med dekning slik at Fysen fortsatt kan lære brukeren om et representativt regionalt kjøkken, men UI-et skal si tydelig at det ikke finnes sikre treff akkurat nå.

## Søk → matkunnskap

Når søket matcher en canonical rett med full Food Knowledge-artikkel, skal `Om retten` på søkeresultatsiden ha en direkte `Lær om retten`-handling.

Den samme `DishKnowledgeDialog` brukes fra:

- forsiden;
- Utforsk kjøkken;
- produksjonssøk;
- statisk GitHub Pages-preview.

Det skal ikke finnes en separat, kortere kunnskapspopup for søkeresultater.

## Restaurantkort i matkunnskap

Matkunnskapspopupen viser opptil fire sikre restauranttreff. Hvert kort kan vise:

- restaurantnavn;
- faktisk menyrett;
- pris når pris finnes i samme ferske menybevis;
- adresse.

Manglende pris skal ikke fylles inn eller estimeres.

## Sporbarhetsgrense

Discovery-rangering kan påvirke rekkefølgen på forslag, men kan aldri:

- gjøre fuzzy treff til sikre treff;
- finne på restauranter;
- finne på pris;
- påstå at generell oppskrift beskriver restaurantens versjon;
- endre restaurantens menybevis eller matchscore.

## Videre utvidelse

Når Fysen får mer bruk og menydekning kan samme modell utvides med anonymiserte signaler som søkefrekvens og klikk, men slike signaler skal være sekundære til kvalitet og dokumentert tilgjengelighet. Sponsing skal aldri inngå i den organiske kvalitetsrangeringen.
