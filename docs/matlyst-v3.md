# Matlyst v3

Matlyst er Fysens oppdagelseslag for mat. Produktet har to innganger, i denne rekkefølgen, som begge ender i den samme ferske Oslo-indeksen:

1. **Utforsk verden** → kjøkken → canonical rett → vanlige Fysen-treff.
2. **Hva frister?** → brukerintensjon → canonical rett → vanlige Fysen-treff.

Matlyst oppretter ingen egen restaurantdatabase, ingen parallell søkeindeks og ingen egne restauranttall.

## Flat kjøkkenmodell

Verdensdel og kulinarisk region er ikke navigasjonsnivåer. Brukeren velger kjøkken direkte fra én filtrerbar katalog. Fysen unngår dermed rigide og diskutable stier som `Asia → Øst-Asia → Japansk` når brukerens faktiske mål er å finne japansk mat.

Kjøkkenenes egne relevante tradisjoner kan fortsatt vises etter at et kjøkken er valgt, for eksempel:

- Italiensk → Roma / Napoli / Sicilia
- Indisk → Nord-India / Sør-India / Hyderabad
- Mexicansk → Sentral-Mexico / Jalisco / Yucatán / Baja

Dette er nyttig intern kjøkkenproveniens, ikke et obligatorisk geografisk navigasjonshierarki.

## Aktive kjøkken

Katalogen viser 19 dokumenterte kjøkkenpresentasjoner:

- Japansk
- Kinesisk
- Koreansk
- Thai
- Vietnamesisk
- Filippinsk
- Indisk
- Pakistansk
- Nepalsk
- Usbekisk
- Tyrkisk
- Persisk
- Levantinsk
- Italiensk
- Polsk
- Egyptisk
- Etiopisk
- Mexicansk
- Brasiliansk

`Midtøsten` brukes ikke som ett aggregert kjøkken. Eksisterende canonical data presenteres gjennom konkrete kjøkken som Levantinsk, Egyptisk, Tyrkisk og Persisk uten å lage kopier av rett- eller restaurantdata.

## Forsidekontrakt

Forsiden viser, i fast rekkefølge:

1. **Utforsk verden** – én direkte, filtrerbar katalog over alle aktive kjøkken, uten verdensdel eller kulinarisk region som mellomnivå.
2. **Hva frister?** – lystinnganger som pizza, curry, nudler og grill.

Katalogen kan filtreres på kjøkkennavn, kjøkkenets egne tradisjoner, canonical rett og alias. Eksempler er `japansk`, `ramen`, `momo` og `pierogi`. Kortene viser ikke verdensdel eller kulinarisk region. Hvert kort viser i stedet **På menyen nå** med opptil to konkrete restauranter, representativ rett og adresse når fersk produksjonsdekning finnes.

Kjøkken sorteres med fersk Oslo-dekning først når browse-data er tilgjengelig. `DishBrowseResponse` leverer både konservativt restaurantantall og opptil to dedupliserte restauranteksempler per rett. Live-signalene lager ikke en ny indeks og registreres ikke som brukersøk.

## Alle retter

`/search` uten søketekst er Fysens **Alle retter**-flate. Den bruker samme flate kjøkkenmodell:

1. brukeren kan søke etter en rett;
2. brukeren kan filtrere direkte på et aktivt kjøkken;
3. et valgt kjøkken kan eventuelt avgrenses med egne relevante tradisjoner;
4. live-listen kommer fortsatt fra samme `DishBrowseResponse`.

Et kjøkkenscope kan deep-linkes med bare `cuisine`, for eksempel `?city=Oslo&cuisine=Japansk`. Parametrene `world` og `region` inngår ikke lenger i produktkontrakten.

## Source-gate

Et kjøkken blir aktivt når Fysen har:

1. canonical retter som beskriver kjøkkenet forsvarlig;
2. faktisk produksjonsmeny/dekning i Oslo;
3. konservative aliases som matcher menyidentiteter;
4. samme live browse-/search-infrastruktur som resten av Fysen.

Restaurantnavn alene er ikke bevis. Bare dokumenterte kjøkken vises i den aktive katalogen.

## Datagrense

Matlyst bruker fortsatt restaurantkatalogen, materialisert menydata, Food Knowledge-katalogene, `matlystDiscoveryCatalog` og den samme ferske browse-indeksen som «Alle retter». Den flate presentasjonen kopierer ingen restaurantdata.
