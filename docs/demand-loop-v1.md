# Fysen Demand Loop v1

Demand Loop v1 gjør faktisk brukerettersprørsel til et kontrollert prioriteringssignal for Oslo-piloten. Den skal ikke maksimere antall restauranter. Den skal fortelle oss hvilke reelle søk dagens ferske indeks fortsatt ikke løser trygt.

## Canonical input

Bare søk som går gjennom den eksplisitte brukerinitierte søkeflyten får `search_events.demand_source = explicit_search` og kan påvirke gap-køen.

Ved innføringen av provenance-feltet blir eksisterende historikk merket `legacy_unclassified`. Det er med hensikt: eldre data kan inneholde søk fra discovery-/bakgrunnsflyter fra før disse ble flyttet over til den ikke-attribuerende browse-indeksen. Historikken beholdes, men får ikke styre automatisk produktprioritering.

Browse/Utforsk Oslo, Quality QA og direkte production-smokes skal ikke skrive search funnel-events.

## Replay

Demand Loop ser på eksplisitte søk fra de siste sju dagene som enten:

- ga null resultater, eller
- produserte minst ett fuzzy-resultat.

Hvert historiske signal replayes mot dagens ferske, aktive menyindeks i samme by.

Et signal regnes som løst bare hvis dagens indeks gir en sikker matchklasse:

- `exact`
- `canonical`
- `prefix`
- `contains`

`fuzzy` alene løser aldri et historisk gap.

## Én prioritert kø

Nulltreff og fuzzy-signaler samles per normalisert query + by i én bounded kø på maksimalt 20 rader.

Prioriteringen er deterministisk:

1. flest signal-søk siste 7 dager;
2. flest nulltreff;
3. flest fuzzy-søk;
4. sist observert;
5. stabil alfabetisk tie-break.

Signalene går til to review-lanes:

- `coverage_or_alias`: minst ett nulltreff; vurder først om retten mangler i dekningen eller om eksisterende meny trenger canonical alias.
- `alias_or_parser`: fuzzy-only; vurder først alias/matching/parser før ny restaurant.

Køen oppretter aldri aliaser, parserregler eller restaurantkandidater automatisk.

## Gap-driven onboarding

Ny restaurant-onboarding er et mulig resultat av review, ikke standardresponsen. Før onboarding skal vi kunne svare nei på disse spørsmålene:

1. Finnes retten allerede i dagens ferske indeks under et annet navn?
2. Kan et kvalitetssikret canonical alias løse etterspørselen?
3. Er fuzzy-signalet egentlig en parser-/normaliseringsfeil?
4. Er signalet gammelt og allerede løst av nyere menydata?

Bare et reelt, fortsatt uløst coverage-gap bør drive ny restaurantinnhenting.

## Operasjon

`.github/workflows/quality-dashboard.yml` genererer både Quality Dashboard og Demand Loop etter menu-watcher-kjøringer og ved manuell dispatch. Artifactet inneholder:

- `quality-dashboard.json`
- `quality-dashboard.md`
- `demand-loop.json`
- `demand-loop.md`

Demand Loop-rapporten viser prioritert kø, signaler som er løst av dagens indeks og hvor mye legacy/unclassified historikk som bevisst er holdt utenfor prioriteringen.
