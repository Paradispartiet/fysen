# Fysen – miniillustrasjoner v1

33 originale SVG-illustrasjoner er produsert for Fysens kategori- og matopplevelse.
Bildene har et felles uttrykk: naturlige matfarger, myke skygger, varmt
håndtegnet omriss og **transparent bakgrunn**. Hver kildefil er skalerbar
og beholdes i høyest mulig oppløsning som SVG.

## Bruk

Bruk `FoodIllustration` fra `components/food-illustration.tsx` med en
navngitt illustrasjon i `food-illustration-data.ts`. Kategorier og
mattyper refererer en typekontrollert illustrasjons-ID.

**Nasjonale flagg og regionsflagg skal stå alene.** Tegninger brukes
kun når kategorien ikke har et passende flagg, og på egne
matrett-/råvareflater. Ikke sett flagg og matmotiv ved siden av
hverandre på en kjøkkenflis.

## Motivbibliotek

- Matretter: pizza, pasta, rice, curry, taco, steak, burger, chicken,
  hotdog, sandwich, wrap, fishchips, kebab, pie, bagel, barbecue,
  soup, cake
- Mat/ingredienser: coconut, flatbread, fish, greens, chili, orange,
  pretzel, olive, cheese, salad, croissant, lobster, tomato, basil,
  spice

Illustrasjoner beskriver mattype, og er **ikke dokumentasjon** på at
en bestemt restaurant har en rett på menyen. Søk og restauranttreff
krever fortsatt verifiserte menydata.

## Praktisk

- Ingen innlimte logoer eller eksterne fotografier i SVG-filene.
- Ikke legg solid bakgrunn inn i ikonene.
- Renders med `object-fit: contain` så hele motivet vises.
- Bytt ikke ut autentiske regionsflagg med illustrationer.
- En ny illustrasjon må føres inn i ID-registeret og ha tilsvarende
  automatisk integritetskontroll.
