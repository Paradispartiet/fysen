# Anerkjente Oslo-restauranter — gjenoppretting 28. oktober 2026

**Beslutning:** Fysen skal etterstrebe 100 % kildebelagt dekning av alle aktive, dokumenterbart anerkjente Oslo-restauranter, uavhengig av om deres menyer har individuelt prisede retter. Dette er en **arbeidskø**, ikke en parallell produksjonskatalog. Publisering i ordinært rettsøk krever fortsatt alle eksisterende source-/safety-/validator-/QA-porter.

## Kontrollbaseline

- Kontrollert `main` per 2026-10-28: `06f1ce1bb2a586fab1decd732b1f07dc6e2ceb2c` med **979 JSON-manifester** i `apps/menu-worker/catalog/`.
- 979 er **ikke** antall uavhengig kvalitetsverifiserte restauranter i Oslo. `canonical` beviser ikke nødvendigvis at alle nåværende produksjonslag samtidig er synkronisert; produksjonsbevis må sjekkes separat.
- Daterte `review`-funn nedenfor er ettersett mot katalogen, men representerer **ikke** nye live intake-/DB-/UI-testresultater.
- Kuraterte kilder: [VisitOSLO restaurantoversikt](https://www.visitoslo.com/no/spise-og-drikke/restauranter/), [MICHELIN Oslo](https://guide.michelin.com/no/en/oslo-region/oslo/restaurants), [Historisk Oslo-census](./oslo-coverage-census-2026-09-21.md) og aktørenes egne sider. Steder vurderes også etter lokale redaksjonelle kilder og bydel.

## Første prioriterte publiseringsgap

| Restaurant | Katalog ved kontroll | Redaksjonell vurdering | Teknisk status / neste bevis |
| --- | --- | --- | --- |
| **Restaurant Schrøder** | Ikke canonical | Bekreftet prioritert Oslo-institusjon | Førstepartsmeny med individuelle rettpriser: generell HTML-tittel/beskrivelse/allergenfeil. Reproof i `oslo-recognized-schroder-reproof-20261028.seed.json`, etterfulgt av **manuell semantisk artifact-QA**. |
| **Engebret Café** | Ikke canonical | Bekreftet historisk restaurant | Round-4 QA i september fant 16 rene retter. Gjenprøv dagens [à la carte](https://www.engebret-cafe.no/menymenu) og sesongendringer. Må ikke merkes som publisert fra gammelt artifact. |
| **Dovrehallen** | Canonical på `main` (#1038) | Relevant tradisjonsrestaurant | 48/48 kildeprisede varianter validert; produksjonssøk ikke bekreftet. |
| **The Salmon** | Canonical på `main` (#1036) | Relevant sjømatrestaurant | 47/47 menyelementer validert; produksjonssøk ikke bekreftet. |
| **Lofoten Fiskerestaurant** | Ikke canonical | Anerkjent sjømatrestaurant | September proof: 19 rene retter; egen meny har nå sesong-/juleretter. Reproof [førstepartsmeny](https://www.lofoten-fiskerestaurant.no/menu-eng) med prisbinding, og skill sesongmeny fra ordinær à la carte. |
| **Havsmak** | Kontrollér mot canonical før intake | Relevant sjømatrestaurant | September proof: 16 rene retter. Verifiser aktuell drift, adresse, meny og dedupe før ny intake. |
| **Gamle Raadhus Restaurant** | Ikke canonical | Bekreftet tradisjonsrestaurant | [Aktuell kveldsmeny](https://www.gamleraadhus.no/kveldsmeny) viser individuelle priser. Tidligere ugyldig komponent-/beskrivelseslekkasje (Sitronette, Kantarell). Generisk linje-/korttilordning + regressjoner, deretter reproof. |
| **Den Glade Gris** | Ikke canonical | Bekreftet spesialisert norsk restaurant | Førsteparts PDF er tilgjengelig, men tidligere output blandet øl og tekstfragmenter med mat. Reparer PDF food/beverage-scope generisk og reproof. |
| **Skur 33** | Ikke canonical | Kvalitet/aktualitet må revideres | PDF menylayout skapte komponent-/allergenfragmenter; ny semantisk QA og aktuell kilde kreves. |
| **Solsiden Restaurant** | Ikke canonical | Sesongrestaurant; aktiv status må dateres | 2026-sesongen sluttet 12. september ifølge tidligere kilder. Ikke merk «åpent nå» eller promotér gammel sesongmeny; kontroller neste åpning. |

Historiske bevis fra [Oslo P0 round 4](./oslo-quality-p0-round-04-2026-09-11.md). **Promotion-ready i september er ikke synonymt med canonical i oktober.**

## Andre prioritet: fortsatt anerkjente, teknisk blokkerte

| Blockerfamilie | Restaurantene i tidligere research | Krav |
| --- | --- | --- |
| Smaks-/fastmeny uten individuelt prisede retter | Maaemo, Kontrast, Hot Shop, Sabi Omakase, Smalhans, Plah, Stallen | Behold som relevant `review`. Ingen fiktiv rettpris eller konvertering av pakkepris til rettpris. Egen produktbeslutning for restaurant-only profil. |
| Førsteparts HTML/PDF som gir ufullstendige eller semantisk urene retter | FYR Bistronomi & Bar, Vaaghals, Palace Grill og andre dokumenterte blockerfamilier | Generisk parserforbedring + kildebasert minimum + forbudte fragmentassertions. |
| Manglende stabil/maskinlesbar aktuell kilde | Mon Oncle, SAVAGE, Credo, The Little Pickle, Varemottaket, Kolonialen Bislett | Ny first-party kildekontroll, identitet og dokumentert blocker. |
| Robots-/transporthindring | Le Benjamin og øvrige kilder med dokumentert restriksjon | Respekter robots og nettverkssikkerhet; oppsøk lovlig/offisiell kilde eller behold `review`. |

Dette er **utvalg**, ikke en fullstendig liste over alle Oslo-restauranter. Den komplette relevante mengden må fortsatt avstemmes mot Michelin, hele VisitOSLO, uavhengige Oslo-guider, bydelssignaler og nåværende drift.

## Godkjenningsporter per restaurant

1. Kildekontroll: fysisk identitet, Oslo-postnummer, aktuelt mattilbud og dokumentert redaksjonell relevans.
2. Teknisk source proof: live kilde, robots/nettverk, rett-tittel/prisbinding og kildebasert minimum; food vs beverage/metadata; ingen ikke-beviste priser.
3. Manuell output-QA: alle observerte canonical rettnavn og utvalgte priser inspiseres, ikke bare grønne genererte assertions.
4. Exact-head CI og strict live validation; **separat** candidate → canonical promotion med byte-identisk manifest.
5. Etter merge: materializer, enabled source, watcher, produksjonssøk og offentlig web/API avstemmes.
6. Rapportér `canonical`, `review`, `missing` og `excluded` separat; `review` teller ikke som dekket. Ingen ferdigerklæring før hele Oslo-universet er kildeavstemt og reelle tekniske gap er håndtert.

**Ikke gjør:** nedjustere validatorfloor for å få grønt, overse robots, endre produksjonstabeller direkte, bruke oppdiktede menypriser eller tolke et akseptert source-snapshot som komplett redaksjonell Oslo-dekning.
