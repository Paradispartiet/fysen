# Restaurant registration v1

Operatørflaten på `/admin/restaurants/new` oppretter én research-seed og én intake-PR i `Paradispartiet/fysen`. Den bruker dagens `Restaurant batch intake`; den har ingen egen parser, geokoder, dedupe-motor, katalog eller publiseringsvei. Første versjon er avgrenset til Oslo.

## Aktivering

Sett disse servervariablene i Fysen web-prosjektet før ordinær web-release:

- `FYSEN_RESTAURANT_INTAKE_OPERATOR_TOKEN`: tilfeldig tilgangsnøkkel på minst 32 tegn, delt med betrodde operatører.
- `FYSEN_RESTAURANT_INTAKE_GITHUB_TOKEN`: fine-grained GitHub PAT med tilgang bare til `Paradispartiet/fysen`, `Contents: Read and write` og `Pull requests: Read and write`.

Ingen av variablene skal ha `NEXT_PUBLIC_`-prefiks eller ligge i repoet. PAT-en brukes bare av webserveren. Operatørnøkkelen sendes i Authorization-header, lagres ikke i cookies/localStorage og tømmes fra skjemaet ved innsending. Ingen operasjon er tilgjengelig før begge variablene er satt; feil/manglende nøkkel avvises før request-body leses eller GitHub kontaktes. API-et krever samme origin som webflaten.

Bruk en PAT som tillater at PR-opprettelse utløser dagens workflows. `GITHUB_TOKEN` fra Actions skal ikke brukes som web-integrasjon. Roter nøklene når operatørtilgang trekkes tilbake. Eksisterende Fysen Pro-/restaurantclaim-tilgang gir ikke global registreringsrett.

Aktivering krever at servervariablene settes og webappen deployes gjennom eksisterende release-workflow og døgnbudsjett. Det skjer ikke ved å fylle inn skjemaet.

## Flyt

1. Operatøren fyller inn navn, publisert Oslo-adresse med postnummer, menylenke, valgfri nettside og en dekningsbegrunnelse. HTML/HTTP er standard; PDF, JSON-LD, API eller browser velges ved behov. Booking-/bestillingslenker krever også siden som publiserer dem.
2. Serveren validerer input, leser fersk `main`, oppretter en egen branch og skriver bare `apps/menu-worker/research/operator-<uuid>.seed.json`. Seed-en har ingen koordinater, oppdiktede retter eller quality assertions. Åpningstider markeres eksplisitt som ukontrollert.
3. Serveren åpner en intake-PR. Skjemaet viser lenke til PR-en med status sendt til kontroll, ikke publisert.
4. Eksisterende workflow geokoder mot Kartverket, deduper mot catalog, henter live meny, genererer kandidatmanifest og kjører strict livevalidering. Duplikater og uegnede kilder stopper her.
5. Operatøren vurderer kandidat og faktisk menyoutput fra intake-artifactet. Bare godkjente kandidater promoteres i en separat catalog-PR etter dagens produksjonsmetode. Grønn intake eller merge av en research-seed aktiverer ingen restaurant.
6. Catalog-promotion etterfølges av eksisterende materialisering og produksjonsbevis.

Kildetyper som trenger særskilte redirect-/browser-origins eller annen kildestøtte håndteres videre i intake-PR-en med eksisterende manifestmodell. Skjemaet gjetter ikke kildeinnstillinger og svekker ingen kvalitetsporter.

Hvis opprettelsen bare delvis bekreftes, beholder serveren branchen og viser en kontrollenke. Et tapt nettverkssvar kan skjule en vellykket PR; kontroller GitHub før ny innsending. Skjemaet lover ikke automatisk retry eller dedupe av samtidige innsendelser. Dagens catalog-dedupe er fortsatt autoritativ før kandidatgenerering.

## Verifikasjon

Webtestene kjører request-validering, tilgangskontroll, GitHub-adapteren og feiltilfeller med mockede nettverkskall. Generert seed kontrolleres mot eksisterende onboarding-skjema, inkludert fravær av seed-koordinater og kompatible meny-/handlingsfelt. Ingen tester oppretter restaurant, PR eller databaseinnhold i produksjon.

Etter `pnpm --filter @fysen/web... build` kan `node apps/web/tests/restaurant-intake-browser-proof.mjs` kjøre lokal nettleserverifikasjon av mobil-/iPad-bredde, vellykket innsending, delvis feil og deaktivert API. Testen starter og stopper sin egen produksjonsserver med registreringsnøklene tømt og mocker GitHub-kvitteringen ved nettlesergrensen. Den bruker installert Playwright Chromium; en lokal binær kan velges med `FYSEN_BROWSER_EXECUTABLE_PATH`. Dette er en UI-verifikasjon, ikke et bevis for aktivert GitHub-integrasjon i produksjon.
