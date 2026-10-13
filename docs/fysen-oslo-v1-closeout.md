# Fysen Oslo v1 — separate sluttkontrakter for forbruker og Pro

**Beslutning 13. oktober 2026:** Fysen forbruker Oslo v1 og Fysen Pro v1 er to selvstendige leveranser med hver sin godkjenning. En manglende restaurantrepresentant kan ikke blokkere godkjenning eller videreutvikling av forbrukerappen.

- **Fysen forbruker Oslo v1:** kan erklæres produksjonsferdig når forbrukerportene nedenfor er dokumentert grønne mot aktuell produksjon. En autentisert restaurantpilot inngår ikke i denne ferdigdefinisjonen.
- **Fysen Pro v1 — teknisk leveranseklar:** kan godkjennes med isolerte syntetiske tester, integrasjonstester og ikke-muterende produksjonskontroller av offentlig Claim/Pro og sikkerhetsgrenser. Dette er ikke det samme som at en virkelig restaurant har tatt løsningen i bruk.
- **Fysen Pro v1 — partnerverifisert:** krever en ekte, uavhengig verifisert restaurantrepresentant som gjennomfører Claim → review → access grant → engangskode → Pro-session → dashboard → logout/revokering. Denne akseptansen gjennomføres når en partner finnes, og kan ikke erstattes av fiktive produksjonsidentiteter.

Kommersialisering av Pro, partnerbetaling og sponsing krever fortsatt særskilt pilotbevis og egen beslutning. Ingen sikkerhetsgrense eller kildekvalitetsport svekkes gjennom oppdelingen.

## Releasekontrakt

- Produksjon deployes i maksimalt tre batcher per Europe/Oslo-døgn, uten faste klokkeslett.
- En grønn `main`-CI evaluerer om nok produksjonsrelevante endringer har samlet seg; uten relevante endringer opprettes ingen Vercel-deploy.
- Når dagsgrensen er nådd, blir ventende endringer stående til neste Europe/Oslo-døgn.
- Production proof skal kontrollere faktisk deployet web/API-revisjon, aktive API-/webflater og produksjonsdata. Hvis nyere `main`-commits bare endrer menyinnhenting eller katalog, kan uendret `apps/web/` og `apps/api/` dokumenteres ved commit-sammenligning i stedet for å kreve en unødvendig ny Vercel-deploy. En grønn release-workflow med hoppede deployjobber er ikke alene deploybevis. Katalogmaterialisering og produksjonsintegritet kontrolleres separat.

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

Baselinen fra august er historisk. Gjeldende katalogstatus skal alltid måles i siste produksjonskontroll; det historiske 56-tallet er ingen lanseringskvote. Min mat/AHA er en separat, utsatt pilot.

## Forbruker Oslo v1 — sju selvstendige porter

| Port | Permanent bevis | Ferdig når |
|---|---|---|
| 1. Web/API og release | faktisk Vercel-deploy + production proof og eventuell dokumentert uendret app-kode | offentlig søk, rettliste og brukerhandlinger virker mot riktig produksjonsruntime; Min mat viser pausemelding |
| 2. Restaurantintegritet | fullkatalog + materialisering/reconcile + production proof | alle canonical restauranter som regnes med, er aktive, har godkjente kilder og er søkbare uten drift |
| 3. Consumer catalog | `consumer-v1` quality-metadata | rå oppføringer klassifiseres, ikke-retter fjernes og forsiktige varianter dedupliseres |
| 4. Matleksikon | concept/menu-identiteter + UI-lenker | leksikonrett har både «Om retten» og serveringssteder; annen gyldig rett har bare serveringssteder |
| 5. Mobil finish | browser-smoke på liten viewport | de fire offentlige reisene gjennomføres uten skjult handling, horisontal overflow eller blindvei |
| 6. Representative E2E | `production-pilot-proof` | scenarioene under er grønne mot produksjon |
| 7. Consumer v1-erklæring | dokumentert avstemming av port 1–6 | forbrukerflyten er bevist mot aktuell, konsistent produksjon; Pro-partnerpilot kreves ikke |

## Fysen Pro v1 — egen godkjenning

| Nivå | Bevis | Tillatt status |
|---|---|---|
| Teknisk leveranseklar | API-/webtester, isolert databaseintegrasjon med syntetiske restauranter og grants, kontroll av hashing, one-time token, restaurant-skoping, logout, revokering og privat Demand Loop, samt ikke-muterende live-kontroll av Claim/Pro | «Teknisk leveranseklar» når bevisene er dokumentert; aldri «partnerverifisert» |
| Partnerverifisert | én ekte restaurant gjennom `docs/fysen-pro-pilot-operator.md` og `pro:pilot-proof`, med uavhengig virksomhetsverifisering | «Pilot godkjent» først etter faktisk kontroll |
| Kommersiell utrulling / R5 | særskilt beslutning etter fungerende partnerpilot og godkjent produksjonsgrunnlag | Ikke åpnet av teknisk ferdigmelding alene |

Tekniske tester utføres i isolert testdatabase. Ingen test skal opprette fiktive restaurantkrav, grants eller innlogginger i produksjon, bruke produksjonshemmeligheter i CI eller gi tilgang uten uavhengig verifisering. Offentlige Claim- og Pro-ruter kan eksistere på produksjon selv om ingen restaurant ennå er verifisert.

### Sluttgodkjenning 13. oktober 2026

**Fysen forbruker Oslo v1 er GODKJENT / production-closed.** Seks operative produksjonsporter er avstemt mot faktiske Vercel-deployer, 749 canonical restauranter, live browse-/søke-API, post-deploy mobilbrowser og representative E2E-scenarioer. Permanent kildebevis: [Fysen forbruker Oslo v1 – signoff](./fysen-consumer-oslo-v1-signoff-2026-10-13.md). Fysen Pro-partnerakseptanse er fortsatt en separat åpen oppgave.

**Pro v1 teknisk godkjenning:** [Signoff 13. oktober 2026](./fysen-pro-v1-technical-signoff-2026-10-13.md) dokumenterer eksisterende isolerte tester og ikke-muterende live-proof. Ingen ekte restaurantpilot er utført; partnerakseptanse og R5 forblir separate.

### Dokumentert kontrollstatus 13. oktober 2026

- [Fullkatalog #38364566185](https://github.com/Paradispartiet/fysen/actions/runs/38364566185): **749/749** restaurantkilder godkjent.
- [Produksjonsbevis #38371310094](https://github.com/Paradispartiet/fysen/actions/runs/38371310094): grønt etter siste materialisering og avklaring av åtte midlertidig inaktive restauranter.
- [Mobilbevis #38376406202](https://github.com/Paradispartiet/fysen/actions/runs/38376406202): **4/4** offentlige reiser bestått på **390 × 844**. [PR #926](https://github.com/Paradispartiet/fysen/pull/926) styrket navigasjons- og dialogassertions og ble merget.
- [Database-CI #36514385344](https://github.com/Paradispartiet/fysen/actions/runs/36514385344): Claim- og Pro-integrasjonstestene på isolert PostgreSQL bestått.
- Pro har **ingen gjennomført reell restaurantpilot**. Det er en eksplisitt ekstern avhengighet i Pro-sporet, ikke et gjenstående krav til forbruker-v1.

Dette er dokumenterte delbevis, ikke en automatisk sluttsignering av de øvrige forbrukerportene. De avstemmes etter tabellen over.

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
4. `Søk → Om retten → tilbake til serveringssteder`.

«Lagre i Min mat» og lenken i toppmenyen er skjult mens piloten er satt på pause. Direkte besøk til `/min-mat` skal forklare pausen, og nye forsøk på AHA-innlogging skal ikke sende brukeren til AHA. Eksisterende gyldige Fysen-sesjoner kan fortsatt se og fjerne sine lagrede retter.

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
- Min mat-pausen og kontrollert AHA-connect-stopp i ordinær release-proof.

Produksjonsproofen er bevisst ikke-muterende. Restaurantpiloten kjøres kontrollert med en verifisert restaurantidentitet; hemmelige tokens skal aldri inn i CI, argv, logger eller artifacts. Stateful Min mat/AHA-bevis hører til en separat pilot når AHA er driftsklar, har et avtalt testmiljø og et godkjent kostnadstak. Ordinær produksjonsrelease skal ikke kontakte AHA.

## Separate ferdigerklæringer

**Fysen forbruker Oslo v1** skal ikke erklæres ferdig på grunnlag av restauranttall, rå menyitem-tall eller grønn CI alene. Erklæringen kan gis når forbrukerportene 1–6 er avstemt mot aktuell produksjon:

> search + discovery + restaurant action + knowledge + production integrity

**Fysen Pro v1 — teknisk leveranseklar** kan erklæres når den isolerte autentiserte testkjeden og relevante offentlige, ikke-muterende kontroller er dokumentert. En ekte restaurantpilot kreves for senere **partnerverifisert Pro v1**, ikke for å godkjenne teknisk implementasjon eller forbrukerprodukt.

Etter consumer-erklæringen er restaurant-onboarding løpende innholdsproduksjon. Større consumer-funksjoner og Pro-kommersialisering følger hvert sitt videre spor.

## Overgang til v2

Forbruker-v2 kan starte først når **forbruker Oslo v1** er produksjonsgodkjent etter sine egne porter. En manglende restaurantpartner eller Pro-pilot skal ikke stoppe forbruker-v2. V2-funksjoner kan aldri erstatte manglende release-, mobil-, søke- eller katalogbevis.

Pro v2, betaling, partneroppgjør og sponsing er fortsatt sperret til Pro v1 har en reell, godkjent restaurantpilot og egen produktbeslutning.

Min mat/AHA er ikke en forbruker-v1-port. Reaktivering krever en egen beslutning om AHA-drift, et kostnadstak og en kontrollert brukerpilot. Den eksisterende integrasjonskoden beholdes, men er av som standard med `NEXT_PUBLIC_FYSEN_ENABLE_AHA_MIN_MAT`. AHA-boundary kan kjøres separat med `include_aha` i revenue-proof-workflowen når piloten faktisk er aktivert.

Når forbruker-v1 er erklært ferdig, følger videre produktarbeid den portstyrte planen i [`fysen-v2.md`](./fysen-v2.md). Hovedretningen er eksplisitt, privat og forklarbar matpersonalisering. Flerbyutrulling og Pro v2 er senere, separate spor.
