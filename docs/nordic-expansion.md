# Nordisk ekspansjon – fase 1

Mål: samme rett-først-søk i Oslo, København, Stockholm og Helsinki. Ingen fiktive treff.

Fase 1 er navigasjon og et byregister med lokal valuta. Den eksisterende Oslo-dekningen beholdes. De nye byene skal ikke markedsføres som dekket før reelle menyer er verifisert. Denne PR-en er et utkast.

## Før produksjon

- Opprett byspesifikke restaurantkataloger og kilder med korrekt land, fysisk adresse, lokale åpningstider, tidssone og valuta (DKK, SEK, EUR).
- Gjør arkivformat, prisparser, API, søk og visning by- og valutasikre; dagens offentlige arkiv er Oslo-spesifikt. Ikke tolk utenlandske priser som NOK.
- Bruk nyeste verifiserte meny per restaurant. Vis dato for menyobservasjon; ikke skjul eldre tilgjengelige menyer bare på grunn av alder. Ikke bland utdaterte priser inn i nyere menyer.
- Bevar alle relevante restauranttreff; bruk paginering eller last flere fremfor å skjule dem.
- Støtt lokale rettnavn, norske aliaser og København/Copenhagen/Kobenhavn, Stockholm, Helsinki/Helsingfors.
- Bygg restaurantdekning batchvis med offisielle menykilder; mål faktisk dekning separat for hver by.
- Verifiser søk, tomtilstander, mobil/desktop, prisformat, byisolasjon og Oslo-regresjon før publisering. Native iOS-klient må også kontrolleres.

## Arkivkontrakt v2 (lesere, ikke publisert datasett)

V1 beholdes uendret og gir bare Oslo-treff i NOK. V2 beholder de eksisterende feltene i restaurant-, kilde- og rett-tuplene, men krever valutakode på posisjon 8 (niende felt) i hver rett-tuple. Manifest og indeks må ha samme versjon. Bare NOK/Oslo, DKK/København, SEK/Stockholm og EUR/Helsinki aksepteres. Manglende eller feil valuta stopper hele v2-innlesingen. Eksisterende integritets- og karantenekrav beholdes. Web/API kan lese v2, men produsenten må fortsatt utvides og verifiseres. Ingen syntetiske testmenyer skal materialiseres i offentlige data.

Arkivfallback brukes bare dersom arkivet har verifiserbare data for valgt by. De nye testene bruker eksplisitt syntetiske fixtures. Menyobservasjonsdato vises ved prisen. Gjeldende begrensninger på antall treff og prioritering av nyeste meny må koordineres med det separate arbeidet på søkevisningen før lansering.

## Pilot-til-søk: isolert integrasjonstest

Alle 124 research-only oppføringer (69 København, 33 Stockholm, 22 Helsinki) konverteres i minnet til arkivformat v2 av webtesten. Den bruker de faktiske arkivleser-, browse- og søkefunksjonene og sjekker hver retts pris, valuta, kilde, observasjonsdato og byisolasjon. Oslo-fixturen beholdes. Ingen offentlig fil, database, arkivgren eller produksjonsmeny skrives av testen. Oppføringene er fortsatt ikke produksjonsgodkjent; dette er en integrasjonstest av utviklingsdata, ikke et nytt live-kildebevis.

## Danish source probe

`pnpm --filter @fysen/menu-worker probe:nordic:schonnemann` fetches the 13 reviewed first-party categories using the existing robots-aware HTTP client, records source digests and compares 70 priced rows against 69 unique reviewed dishes. It fails closed outside the reviewed seasonal date range, on missing or unmapped rows, changed identity, or conflicting cross-listed prices. This is read-only research; no publication, database or archive writes. The live HTML layout and tests still need verification.

## Swedish source probe

`pnpm --filter @fysen/menu-worker probe:nordic:pelikan` verifies the current first-party menu link and fetches the reviewed PDF through the robots-aware HTTP client. It scopes the first of two pages to three food columns, preserves half/full portions and SEK, and rejects missing, unknown or duplicate priced rows. The PDF layout was visually reviewed, but automated live extraction is not yet proven. No archive or database writes.

## Seasonal guard and regression status (2026-11-25)

Savotta ordinary-menu previews stop during 21 December 2026–3 January 2027, when the separate Christmas menu applies; other dates outside the reviewed season also stop. Schønnemann checks the published menu index date text and all thirteen category links before fetching individual categories. These are additional fail-closed checks, not live proof of successful automated extraction.

At head df029713, the affected-package quality workflow completed 27/27 tasks, including the 124-row search integration test and Savotta parser tests. The existing Oslo batch-03 intake failed for five DIGG locations, all with HTTP 404 on the same historical menu URL (job 139301330239). Do not replace the historical price evidence or bypass source validation; find and verify a current first-party menu separately. The latest Nordic source-preview workflow has not yet returned a result.

## Staging the v2 archive

`scripts/build-fysen-nordic-candidate.py <v1-copy> <probe-reports> <new-output-dir>` prepares a local-only v2 candidate from three successful, complete live probe JSON reports. It preserves Oslo rows, source indices and quarantines; adds explicit currency and an atomic menu snapshot; and saves exact per-page evidence and portion/availability notes in a separate proof file. Price changes require review before staging. No production branch or database writes. The existing v1 refresh workflow cannot yet refresh v2: keep production on v1 until compatibility, note rendering and end-to-end validation are complete.
