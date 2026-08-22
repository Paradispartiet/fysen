# Fysen Oslo v1 — closeout-kontrakt

Dette er den permanente ferdigdefinisjonen for Oslo v1. Et grønt mergebevis er nødvendig, men v1 kan først erklæres ferdig når den ordinære produksjonsreleasen og production proofen er grønne på samme `main`-SHA.

## Releasekontrakt

- Produksjon deployes maksimalt to ganger per døgn: kl. **10:00 og 22:00 Europe/Oslo**.
- Merge, CI, materialisering og ikke-muterende inspeksjon kan skje mellom vinduene.
- Ingen closeout-gate utløser en ekstra eller manuell Vercel-deploy.
- Production proof skal lese både API og web etter et ordinært vindu og bevise at de kjører forventet `main`-SHA.

## Restaurantproduksjonsbaseline 2026-08-22

Restaurantproduksjon er en separat innholds-/integritetslinje og skal ikke forveksles med hele Oslo-v1-closeouten. Siste read-only production-proof på catalog revision `2e57e1d324415f2a296b43b54c13e58cb23d4292` viser:

- **56 canonical katalogmanifester**;
- **56/56 aktive canonical restauranter**;
- **56 aktive restaurant-rader totalt**;
- **56 enabled menu sources**;
- **0 inactive canonical**;
- **0 active-not-catalog drift**;
- nøyaktig **én enabled canonical menu source per katalogrestaurant**.

Batch 01 etablerte høy-throughput-metoden. Batch 02 utvidet først dekningen med **Jaipur, IndiSpice og tre Døgnvill-lokasjoner** etter en full parser-/output-cleanup. Parserendringen fikk først merge etter **50/50 serial full-catalog live-gate**, fresh **5/5** intake, separat **5/5** revalidation og eksplisitt output-inspeksjon. De fem manifestene ble staged og promotert byte-for-byte; post-merge proof verifiserte snapshots og production-search.

Deretter ble **New Delhi Tjuvholmen** den 56. canonical restauranten. #402 beviste eksisterende catalog **55/55** og New Delhi **81/81** før byte-for-byte promotion #408. Production-proof #409 / run `32600667247` / artifact `9483248543` beviser **56 active / 56 enabled**, null drift, 81-item New Delhi-snapshot og søketreff for `Mixed Ice Cream` 129 kr og `Murgh Malai Chicken Tikka` 149 kr fra korrekt canonical source. PR #411 låser samtidig at en trygg refresh-degradering på en allerede publisert restaurant fortsatt rapporteres som source-health-feil, men ikke lenger gjør hele catalog-materializeringen blokkerende når siste manifest-valide coverage er eksplisitt restaurert.

Permanent metode, historiske batchresultater og datert produksjonsbevis ligger i [`restaurant-production.md`](./restaurant-production.md).

Denne baselinen betyr **ikke** at hele Fysen Oslo v1 er ferdig. Release-, Min mat/AHA-, Claim/Pro-, mobil- og representative E2E-portene nedenfor må fortsatt være grønne på riktig produksjons-SHA før v1-erklæringen kan gis.

## De åtte låste portene

| Port | Permanent bevis | Ferdig når |
|---|---|---|
| Production release | batchet release + production proof | Alle retter, `/min-mat`, Claim og Pro svarer fra samme forventede `main` |
| Min mat + AHA | DB-integrasjon + offentlig boundary-proof + kontrollert brukerpilot | lagre, fjerne, lagre igjen, ny session, 50-cap, privat payload, one-time/replay og utløp er bevist |
| Claim + Pro | ikke-muterende proof + `pro:pilot-proof` | offentlig claim, setup/session, ekte dashboard og én verifisert restaurant er kjørt ende til ende |
| Consumer catalog | `consumer-v1` quality-metadata | rå oppføringer klassifiseres, ikke-retter fjernes og forsiktige varianter dedupliseres |
| Matleksikon | concept/menu-identiteter + UI-lenker | leksikonrett har både «Om retten» og serveringssteder; annen valid rett har bare serveringssteder |
| Mobil finish | browser-smoke på liten viewport | de fem låste reisene kan gjennomføres uten skjult handling, horisontal overflow eller blindvei |
| Representative E2E | production-pilot-proof | scenarioene under er grønne mot production |
| V1-erklæring | samlet closeout-resultat | alle portene er grønne på samme produksjons-SHA |

## Canonical consumer catalog

Browse-API-et publiserer `quality.filterVersion = consumer-v1` og teller hele transformasjonen:

1. faktisk rett beholdes;
2. drikke ekskluderes;
3. saus/tilbehør ekskluderes;
4. valg/modifier ekskluderes;
5. allergen-/informasjonslinje ekskluderes;
6. menyoverskrift ekskluderes;
7. ugyldig parserfragment ekskluderes;
8. resterende rettnavn canonicaliseres konservativt.

Canonical dish concepts vinner alltid når et kuratert alias finnes. Ellers fjernes bare ufarlig presentasjonsstøy som menynummer, enkel allergenmarkør og porsjonssuffiks. Fuzzy likhet brukes aldri til å slå sammen to browse-identiteter.

## Låste mobile brukerreiser

Kjør på en liten mobilviewport etter ordinær produksjonsrelease:

1. `Hva har du lyst på? → treff → restaurant → menybevis → booking/order`;
2. `Matlyst → kjøkken → rett → restaurant`;
3. `Alle retter → rett → treff`;
4. `Søk → Om retten → tilbake til serveringssteder`;
5. `Lagre → Min mat → AHA`.

Min mat skal ved feil eller utløpt/replayed handoff vise en kontrollert melding og beholde samlingen. Fjern-handlingen skal være minst 44 px, blokkere dobbel innsending og tilby «Prøv igjen» ved feil.

## Representative production E2E-gater

Det permanente proof-settet dekker:

- ramen;
- pizza;
- indisk rett (`Butter Chicken`);
- fuzzy stavemåte (`margerita`);
- ukjent åpningstid;
- verifisert booking;
- verifisert order;
- geolokasjon med beregnet avstand;
- canonical concept-/leksikonidentitet;
- valid ikke-leksikonrett (`menu:`);
- Min mat/AHA-boundary og kontrollert handoff-feil.

Produksjonsproofen er bevisst ikke-muterende. Stateful Min mat og den faktiske restaurantpiloten kjøres kontrollert med ekte AHA-/restaurantidentitet; hemmelige tokens skal aldri inn i CI, argv, logger eller artifacts.

## V1-erklæring

Fysen Oslo v1 skal ikke erklæres ferdig på grunnlag av restauranttall, rått menyitem-tall eller grønn CI alene. Erklæringen kan gis når følgende er bevist sammen i produksjon:

> search + discovery + restaurant action + knowledge + personal collection + production integrity

Etter erklæringen er restaurant-onboarding løpende innholdsproduksjon. Nye større forbruker- eller revenue-features tilhører neste eksplisitte produktfase.

## Overgang til v2

Oslo v1-scope forblir frosset til alle åtte porter er grønne. Det er ikke tillatt å bruke en ny v2-feature som erstatning for manglende release-, mobil-, AHA- eller restaurantpilotbevis.

Når v1 er erklært ferdig, følger videre produktarbeid den portstyrte planen i [`fysen-v2.md`](./fysen-v2.md). Hovedretningen er eksplisitt, privat og forklarbar matpersonalisering. Flerbyutrulling og Pro v2 er senere, separate spor.
