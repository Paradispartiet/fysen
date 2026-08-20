# Fysen Oslo v1 — closeout-kontrakt

Dette er den permanente ferdigdefinisjonen for Oslo v1. Et grønt mergebevis er nødvendig, men v1 kan først erklæres ferdig når den ordinære produksjonsreleasen og production proofen er grønne på samme `main`-SHA.

## Releasekontrakt

- Produksjon deployes maksimalt to ganger per døgn: kl. **10:00 og 22:00 Europe/Oslo**.
- Merge, CI, materialisering og ikke-muterende inspeksjon kan skje mellom vinduene.
- Ingen closeout-gate utløser en ekstra eller manuell Vercel-deploy.
- Production proof skal lese både API og web etter et ordinært vindu og bevise at de kjører forventet `main`-SHA.

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
