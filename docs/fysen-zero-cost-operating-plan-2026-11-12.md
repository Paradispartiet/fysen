# Fysen: gratis drift og trygg gjenoppretting (beslutning 12. november 2026)

**Beslutning:** Brukeren velger **0 kr i nye abonnementskostnader**. Ikke oppgrader Supabase, ikke deaktiver Spend Cap, ikke kjøp ekstra databasekapasitet. Bevar historikken. Deaktiver heller ikke beskyttelsesmekanismer eller slett tabeller som en automatisk følge av denne beslutningen.

## Hva som faktisk virker – og hva som ikke er friskmeldt

| Område | Dokumentert status | Begrensning |
|---|---|---|
| Offentlig web | `https://fysen.vercel.app` ble distribuert og var tilgjengelig 12. november | Nettstedet er ikke i seg selv bevis for at den opprinnelige databasen kan motta skriver |
| Verifisert offentlig menyarkiv | `fysen-free-public-index`, ca. 973 restauranter og 47 265 menyposter etter oppdateringen 12. november | Historiske kilder med egne observasjonsdatoer, ikke sanntidsmenyer |
| Arkiv-API | `/v1/dishes/archive/status`, `/search`, `/browse` på `fysen-api.vercel.app` bestod offentlig produksjonskontroll 12. november, samt isolert Vercel-test i PR #1165 | Ikke bevis for full DB-søk, booking eller betaling |
| Mobilreise for gratis rettsøk | PR #1179 er merget etter grønn mobiltest og ordinær CI | Egen kontroll, ikke erstatning for streng live-DB/booking-gate |
| Supabase original | `voglczxxtbwcxjrbffbt`, observert Unhealthy og 91 % diskkapasitet 11. november | Read-only ble teknisk verifisert 2. november; live skrivekapasitet nå ikke dokumentert |
| Supabase recovery | `txaopscyxjvvmwawsphk`, observert Unhealthy og 17 % diskkapasitet 11. november | Samme organisasjon kan være blokkert av organisasjonens forbruk; ikke automatisk live-erstatning |
| Full produksjonsbevis | Feiler på eldre menykilder og enkelte inaktive restauranter | Skal forbli blokkert frem til faktiske kilde- og produksjonsdata er verifisert |

**Brukervennlig visning:** Ikke legg tekniske advarsler om «gamle eller ikke ferske menyer» på vanlige sider. Vis vanlig søk, restaurant, pris og «Se meny», der en kilde er dokumentert. Kildedato og status skal fortsatt være tilgjengelig på en hensiktsmessig informasjonsflate eller ved kilden, og aldri forfalskes. Ikke vis uverifisert booking eller påstå sanntid. Oppdaterings- og driftsdetaljer kan ligge under meny/om eller intern driftstatus.

## Gratis driftsmodell vi bruker nå

1. **Offentlig lesesøk:** Hent checksum-verifisert indeks fra isolert `fysen-free-public-index`. Bevar `sourceUrl`, `observedAt`, godkjente restaurantidentiteter og karantene. Alle svar fra arkiv-API har `source: verified-menu-archive` og `realtime: false`.
2. **Begrenset menykildeoppdatering:** Fortsett eksisterende GitHub Actions-jobb `Refresh Fysen Free menus (bounded, database-independent)` med gitt kildebudsjett. Ikke gjør nattlig full dump/import på Supabase. Ikke lov automatisk at alle 973 er oppdatert selv om indeksen ble regenerert.
3. **Liten offentlig indeks, ikke historisk database:** Det offentlige indekset holder bare et kvalitetssikret, deduplisert utvalg. Det inneholder ikke brukerhistorikk, søkelogger, private kilder eller alle tidligere menyversjoner.
4. **Historien bevares privat:** Historisk dump fra 2. november er lagret i fire private deler i Google Drive og re-verifisert med SHA-256, og seks historietabeller ble gjenopprettet i isolert PostgreSQL 17 (se dokumentert run #41510938739). Søkereferanser har også separat arkivbevis. GitHub Actions-artifakter alene er ikke langtidsbackup.
5. **Egen kvalitetssperre:** Tester skal kontrollere API, indekser, identitetskarantener, mobilreise og kildebevis. Streng produksjonskontroll for live-DB, bordbestilling/booking og priser beholdes separat, selv om gratis arkivsøk er grønt.

## Hvorfor vi ikke straks kan ta original Postgres tilbake på Free

- Dokumentert 2. november: originaldatabasen hadde ca. 1 582 MB databaseinnhold. `menu_items` utgjorde ca. 1 323 MB inkludert indekser. Det er over 500 MB Free databasegrense.
- Supabase har **to ulike problemer**: prosjektvis disk/read-only (95 %-diskfare) og organisasjonens Fair Use 402 basert på gjennomsnittlig databaseforbruk over fakturaperioden. Underliggende Free-diskgrense kan variere over tid; kontroller gjeldende Supabase-dokumentasjon. Lav diskbruk på recovery (17 %) opphever ikke automatisk organisasjonsbegrensningen.
- Å slette gamle rader alene garanterer ikke mindre databasefiler; WAL, indekser og nødvendig vedlikehold kan bruke ekstra disk. Supabase-dokumentasjon advarer om at når disk blir full og Postgres stanser, kan betalt plan bli nødvendig for å starte den opprinnelige instansen igjen. Gratis løsning kan derfor bestå i å **ikke** gjenstarte originalen for drift, men la offentlig arkivmodus fungere videre.
- `DELETE FROM menu_snapshots` ville kaskadeslette menyposter og deler av pris-/endringshistorikken. Det ville også fjerne eller nullstille relasjoner fra søkeresultater og overvåking. Historikken må derfor ikke beskjæres uten eksplisitt omfang og separat restoretst.

## Sikker vei til en kompakt database – ikke en autorisert sletting

**Trinn A – ingen produksjonsendring:** Inventer original DB med bare read-only spørringer hvis tilgjengelig. Bekreft organisasjonskvote og disk, regn ut datamengde per tabell, test at backup er nedlastbar, hashet og kan gjenopprettes. Bevar alle tabeller med datoer og referanser.

**Trinn B – isolert prøverestaurering:** Bruk det eksisterende `rehearse-fysen-three-day-prune.yml` *kun mot en midlertidig lokal Postgres-container*. Scriptet selekterer en hypotetisk tre-dagers beholdning fra den frosne 2. november-kopien. Dokumenter logiske resultatantall, fysiske bytes etter komprimering, fremmednøkler, søkeresultat-referanser og om appen fungerer med snapshottene. Dette er ikke et mandat for driftssletting.

**Trinn C – beslutningsport:** Velg først etter verifisert øvelse og eksplisitt samtykke enten (a) fortsatt arkivbasert offentlig gratisdrift mens originalen bevares, eller (b) en avgrenset, reverserbar driftsovergang med kompakt database innenfor Free-kvoten og org-kvoten. Hvis fysiske bytes, indekser, WAL eller ønsket vekst gjør 500 MB urealistisk, behold arkivmodellen.

**Trinn D – organisasjonens sperre:** Selv en virkelig mindre DB fjerner ikke nødvendigvis 402 før tilstrekkelig tid under kvoten eller ny fakturaperiode. Kontroller org-totalen, ikke bare prosjektets diskprosent. Ikke opprett flere freeprosjekter for å omgå en gjeldende organisasjonssperre.

## Verifisert måleresultat: isolert kompakt database, 12. november 2026

**Resultat: PASS i [GitHub Actions #43174708909](https://github.com/Paradispartiet/fysen/actions/runs/43174708909)** etter PR #1182–#1184. Kjøringen brukte en *midlertidig lokal* PostgreSQL 17 + PostGIS-container, en SHA-256-verifisert menyhistorikkdump fra 2. november og separat arkiv av gamle søkeresultatreferanser. Ingen Supabase-forbindelse, driftsendring, betalplan eller produksjonssletting ble brukt.

| Kontroll i isolert restaurering | Faktisk resultat |
|---|---:|
| Gjenopprettede restauranter | 1 116 |
| Gjenopprettede kilder | 1 154 |
| Gjenopprettede snapshots før hypotetisk reduksjon | 40 707 |
| Gjenopprettede menyposter før reduksjon | 1 997 348 |
| Snapshots bevart i prøvemodellen (siste per kilde + datert 3-dagersutvalg) | 3 096 |
| Menyposter bevart i prøvemodellen | 151 408 |
| Søkeresultatreferanser med brutt historisk kobling og `ON DELETE SET NULL` i prøvemodellen | 5 150 |
| Foreldreløse søkereferanser etter simuleringen | 0 |
| Fysisk `pg_database_size()` etter staging-`VACUUM FULL` og etterfølgende sjekk | **163 212 435 byte (~163,2 MB)** |
| Konservativ planleggingsgrense | 400 000 000 byte |
| Supabase Free databaseinnholdsgrense brukt i vurderingen | 500 000 000 byte |

Kjøringen rapporterte også 163 589 267 byte i den første størrelsesspørringen rett etter `VACUUM FULL` i samme steg. Etterfølgende måling ga 163 212 435 byte; begge er under 400 MB. Bruk derfor **omtrent 163 MB**, ikke et absolutt størrelsesløfte for produksjon. Forskjellen er liten, men vi dokumenterer begge målingene for etterprøvbarhet.

### Hva dette beviser – og hva som fortsatt er blokkert

**Bevist:** Denne *avgrensede* restore- og prøvebeholdningen får plass i nominell 500 MB-grense med margin. Gjenopprettingen kontrollerte eksakte antall, de definerte fremmednøkkelvirkningene og fravær av foreldreløse søkereferanser. Den komplette historiske sikkerhetskopien i Google Drive skal fortsatt bevares separat; prøvemodellen er ikke et alternativ til arkivet.

**Ikke bevist:** At alle applikasjonstabeller, brukere, autentisering, indekser, utvidelser, RLS, skrivemønster og framtidig vekst får plass, eller at Fysen kan skrive til et faktisk Free-prosjekt under organisasjonens nåværende Fair Use-sperre. Prøven gjenopprettet seks historikk-/menytabeller og et separat utdrag med søkereferanser, ikke et komplett produksjonskluster. En *database på 163 MB i staging* er ikke en friskmelding av original Supabase eller en godkjenning for migrering.

**Viktig tap i prøvemodellen:** 5 150 gamle `search_result_impressions.menu_item_id`-koblinger ble satt til `NULL` i den midlertidige databasen. SQL-integritet bestod, men eldre direkte referanser ville forsvinne ved tilsvarende sletting i produksjon. Historiske koblinger må derfor først bevares i en verifiserbar, privat og reverserbar avbildning/arkiv. Ikke tolk «0 foreldreløse» som «0 informasjonstap».

### Neste testporter – uten produksjonsinngrep

1. **Fullt applikasjonsskjema i isolasjon:** Inventer tabeller, indekser, utvidelser og API-avhengigheter uten å kopiere eller eksponere private data. Beregn fysisk totalstørrelse inkludert ikke-arkiverte produksjonstabeller, WAL-/vedlikeholdsmargin og forventet vekst.
2. **Historikk og sporbarhet:** Verifiser privat arkiv for *alle* kilder og bevar en reverserbar mapping for de 5 150 søkereferansene før en annen modell i det hele tatt vurderes. Ingen live-sletting eller kassering av originaldata.
3. **Faktiske funksjonstester:** Kjør søk, kilder, oppdateringsløp, mobile visninger og nødvendige appforespørsler mot en isolert, migrert **fullskjema**-kandidat. Ikke åpne booking-/betalingsfunksjoner kun fordi arkivsøket fungerer.
4. **Org- og Free-port:** Bekreft tilgjengelig Free-kvote, organisasjonens Fair Use-status og reell skriverettighet *uten* å endre plan, Spend Cap eller produksjonspekere.
5. **Utrulling og godkjenning:** Hold den verifiserte offentlige, databaseuavhengige menyindeksen i drift. Krev ny separat beslutning før eventuell databaseflytting, datareduksjon eller avvikling av et gammelt prosjekt. Ikke baser langtidsbevaring på GitHub Actions-artefakter, som utløper.

## Read-only skjemabevis 20. november 2026 – identiske applikasjonsobjekter, ulike indekser

**Gjennomført, kun lesetilgang.** Begge Supabase-prosjektene ble kontrollert direkte med `pg_catalog`-spørringer 20. november. Ingen migrasjoner, DDL, DML, nøkler, prosjektinnstillinger eller betalplaner ble endret. Katalogkontrollen ekskluderer bevisst `fysen.schema_migrations` ved sammenligning av applikasjonsskjemaet.

| Kontroll | Original `fysen` | `fysen-recovery-free` | Vurdering |
|---|---:|---:|---|
| Databaseinnhold (`pg_database_size`, avrundet) | 1 590 MB | 60 MB | Ulikt innhold |
| Fysen-tabeller totalt | 30 | 29 | Forskjellen er migrasjonsregisteret |
| Applikasjonstabeller ekskl. register | 29 | 29 | Eksakt likt sett |
| Kolonnedefinisjoner | 297 | 297 | Identisk, inkludert type, NOT NULL og DEFAULT |
| Tabellbegrensninger | 209 | 209 | Identisk, inkludert `pg_get_constraintdef` |
| Applikasjonsindekser ekskl. register | 88 | 87 | 85 identiske, 3 vs. 2 ulike |
| Egendefinerte triggere | 0 | 0 | Lik verdi; ingen utsagn om interne triggere |
| RLS-aktiverte Fysen-tabeller | 0 | 0 | Sikkerhetsrevisjon gjenstår |
| Skjematilgang / SELECT til `anon`, `authenticated` | Ingen | Ingen | Ingen dokumentert direkte klienttilgang |
| `fysen.schema_migrations` | 22 versjoner (`0001`–`0022`) | Mangler | **Blokkerer migrering** |
| Påkrevde utvidelser (postgis/pgcrypto/pg_trgm) | 3/3 | 3/3 | Bekreftet |

Normaliserte, sorterte `pg_catalog`-fingeravtrykk, eksklusive registeret, stemmer eksakt mellom de to prosjektene:

- Tabeller og RLS-status: `deba6eaddf22639ce0312a285610dd57`.
- Kolonner, typer, NOT NULL, defaults: `b945d55ab1eac2f7c829f335b9ab1ffe`.
- Constraint-navn, typer og definisjoner: `b009aded5216f37192c19f3885ca4e45`.

Den eksakte listebaserte sammenligningen av `pg_catalog.pg_indexes` fant **85 felles indekser med identisk `indexdef`** og ingen med samme navn og ulik definisjon.

**Kun i originalen:**

- `menu_changes_current_snapshot_id_idx`
- `menu_changes_previous_snapshot_id_idx`
- `menu_watch_runs_snapshot_id_idx`

**Kun i recovery:**

- `menu_changes_added_date_idx`
- `menu_changes_added_source_key_idx`

Originalen har i tillegg `schema_migrations_pkey` på sin egen migrasjonstabell. De to recovery-indeksene samsvarer navnemessig med repoets `0023_recent_menu_additions.sql`, som ikke er registrert som kjørt i originalen. **Indeksnavn alene beviser ikke** hvilke historiske migrasjoner som faktisk ble brukt til å bygge recovery. Ikke kopier 22 ledger-rader, og ikke stemple `0023`, uten etterprøvbar isolert rekonstruksjon.

**Viktig grense for beviset:** Identisk skjemakatalog er *ikke* identiske rader, søkehistorikk, FK-koblinger eller autentiserings-/tilgangsatferd. De dokumenterte menypost- og loggvolumene er fortsatt ulike. Ingen fullstendig originalhistorikk er gjenopprettet i recovery ved denne kontrollen.

### Neste isolerte beslutningsport

1. Bevar begge live prosjekter uendret. Etabler en disponibel PostgreSQL 17 + PostGIS-prøve, uten prod-credentials. Bygg en ren referansestruktur med repoets `0001`–`0023` og kontroller eksakte `pg_catalog`-objekter (inkl. indekser og migrasjonsregister) mot den observerte recovery-strukturen.
2. Verifiser separat at privat, komplett og **SHA-256-kontrollert** backup omfatter data utenfor menyarkivet: søkehendelser, søkeresultatreferanser, kildemetadata, åpningstider, menykontroller, restaurantkrav og autorisasjons-/revisjonshistorikk. Bevar opprinnelige nøkler; ikke importer persondata til CI-artifakter eller logger.
3. Gjør kun isolert ledger-rekonstruksjon dersom hele objektlisten passer, test alle fremmednøkler og en reversibel restore. Valider søkereferansene som tidligere mistet 5 150 direkte koblinger ved prøvebeskjæring. **Ingen reparasjonskommando mot live recovery.**
4. Før eventuell produksjonsavgjørelse: kontroller organisasjonens faktiske Free-/Fair Use-status, private RLS/grants, appens autentiserte skriverettighet, og separat godkjent rollback. Behold `PR #1241` som utkast.


## Dokumentert migrasjonspassasje 20. november – 23/23 SQL-filer identiske

**Status: SQL-opphav bekreftet, live ledger-backfill fortsatt sperret.** En ny, read-only kontroll sammenlignet **alle 23** rader i recovery-prosjektets `supabase_migrations.schema_migrations` direkte med `packages/database/migrations/0001_...sql` til og med `0023_recent_menu_additions.sql` fra Fysen commit `b3b94072a4ff49ea613f7dc235eeabea55a111af`. For hver registrering ble `statements[1]` hentet ut og sammenlignet med den eksakte UTF-8-filen fra GitHub. **23/23 var tegn-for-tegn identiske; ingen normalisering eller omtolkning ble nødvendig.** Hver registrering inneholder ett SQL-statement-felt. Ingen private tabellrader ble hentet eller eksportert.

| Kontroll | Verifisert resultat |
|---|---|
| Recovery: Supabase-migrasjonshistorikk | 23 rader navngitt `fysen_recovery_0001_...` til `0023_...` |
| Lagret SQL mot repoets tilsvarende migrasjonsfil | **23/23 eksakt lik**, ingen avvik |
| Original: Supabase-migrasjonshistorikk | Egen enkeltstående registrering for indekser fra 2. november |
| Original: `fysen.schema_migrations` | 22 applikasjonsmigrasjoner til og med `0022` |
| Recovery: `fysen.schema_migrations` | **Mangler**, selv om Supabases register er komplett |
| Isolert PostgreSQL 17/PostGIS på Fysen commit `b3b9407` | GitHub CI database-jobb bestått: migrasjoner, `verify:production`, integrasjonstester ([run 44759966802](https://github.com/Paradispartiet/fysen/actions/runs/44759966802)) |

**Tolkning:** Recovery ble registrert med *akkurat de samme migrasjons-SQL-filene* som finnes i Fysens repo på denne commiten. Det er sterkt bevis for migrasjonenes proveniens, men ikke alene bevis for at alle SQL-effekter, data, indekser, endringer etter migrering, private tilganger eller historiske nøkler samsvarer. `fysen.schema_migrations` må ikke opprettes eller stemples i den levende recovery-instansen ut fra dette beviset alene.

**Presis neste port:**
1. Sammenlign `pg_catalog` fra en ren, isolert 23-migrasjonsdatabase og recovery, med forklaring for alle avvik (inkludert forskjeller i indekser, extension-skjema og appens ledger); test en *kun lokal* ledger-rekonstruksjon og avvis gjenkjøring av gamle datamigrasjoner.
2. Verifiser komplette, private SHA-256-kontrollerte backup- og restorebevis for alle historikk-/brukertabeller, uten eksport av persondata til CI-logger eller offentlige artefakter.
3. Verifiser at kvote, skrivekapasitet, private tillatelser og rollback er sikre før noen separat godkjent produksjonsbeslutning.

**Uendret HOLD:** Ingen live SQL-skriving, ledger-stempling, produksjons-merge, tilkoblingsbytte, kostnad eller deploy. PR #1241 forblir Draft.

## Verifisert status 18. november 2026

Den isolerte prøven ble gjentatt med de verifiserte meny- og søkekopiene fra 2. november. Kompaktdataene ble importert i PostgreSQL 17 med PostGIS etter alle 23 Fysen-migrasjonene. De 30 applikasjonstabellene, 151 408 menypostene og den private koblingstabellen for 5 150 gamle søketreff tok **180 221 619 byte**. Ingen direkte søkereferanser pekte til manglende menyposter, og alle 39 databaseintegrasjonstestene bestod. Lokale testdata og søkereferanser ligger utenfor repositoryet.

| Kontroll | Original Supabase | Gjenopprettingsprosjekt |
|---|---:|---:|
| Fysisk databasestørrelse | 1 667 296 403 byte | 62 543 539 byte |
| Restauranter / menykilder | 1 116 / 1 154 | 1 116 / 1 154 |
| Menyposter / menyversjoner | 1 709 517 / 34 447 | 42 000 / 3 096 |
| Menyendringer / menykontroller | 54 472 / 111 963 | 0 / 0 |
| Søkehendelser / søketreff | 1 327 / 7 261 | 0 / 0 |
| Åpningstidsintervaller / -kontroller | 729 / 12 111 | 0 / 0 |
| Restaurantlenker / lenkekontroller | 41 / 213 | 0 / 0 |
| Registrerte brukere i Supabase Auth / Storage-objekter | 0 / 0 | 0 / 0 |

Gjenopprettingsprosjektet dekker alle 983 aktive menykilder med minst én menypost. En skriveprøve på én rad bestod og ble rullet tilbake. I begge prosjekter mangler `anon` og `authenticated` tilgang til Fysen-skjemaet og tabellene. Gjenopprettingsprosjektet mangler migrasjonsregisteret selv om de fleste appskjemaobjektene finnes.

### Overgang til den kompakte databasen

1. **Ta en oppdatert, privat eksport.** Behold det verifiserte historiearkivet fra 2. november. Ta med tabellene som lå utenfor den første kompakte eksporten, inkludert åpningstider, restaurantlenker og støtteopphav for menykilder. Disse og øvrige applikasjonstabeller utenfor den første meny- og søkekopien utgjorde samlet ca. 5,5 MB i originalen. Fang også nye søke- og konverteringshendelser. Det var 61 søkehendelser etter sikkerhetskopien ved kontrollen 18. november. Ta et siste differanseuttrekk ved en eventuell overgang, siden originalen fortsatt får søkehendelser.
2. **Verifiser deretter en komplett kandidat.** Bygg databaseskjemaet via Fysens migrasjoner og last inn de verifiserte dataene med opprinnelige nøkler. Kontroller eksakte antall, kildedatoer og søkekoblinger. Oppdater et avgrenset utvalg menykilder i testdatabasen og test søk, åpningstider og restaurantlenker gjennom API-et. Arkivsøk holdes tilgjengelig under prøven; begge Supabase-prosjektene hadde siste menyversjon fra 2. november.
3. **Kontroller gratiskvoten før et fullt innlastings- eller produksjonsløp.** Begge prosjektene ligger i samme Free-organisasjon. Originalen alene overstiger 500 MB. Supabase måler også gjennomsnittlig bruk gjennom fakturaperioden, så en mindre aktiv database gir først grunnlag for ny verifisering etter at målt bruk har falt. Gjenopprettingsskrivingen på én rad dokumenterer nåværende SQL-tilgang, mens organisasjonens framtidige kapasitet avhenger av kvoten. Se [Supabase sin forklaring av Fair Use](https://supabase.com/docs/guides/platform/database-size#fair-use-database-size-restriction).
4. **Gjør en reverserbar produksjonsovergang etter godkjent kvote og verifisert eksport.** Pek API-et og GitHub-jobbene mot samme godkjente database. Kjør tilkoblingskontroll, en manuell menyoppdatering og offentlig søkebevis før planlagte jobber aktiveres. Behold den tidligere tilkoblingskonfigurasjonen for tilbakeføring. Avgjørelse om plassering eller avvikling av originalprosjektet tas separat, etter at den private eksporten er verifisert gjenopprettbar.

---

## Release- og kvalitetsporter

| Kontroll | Krav |
|---|---|
| Offentlig arkiv-API | HTTP 200, gyldig JSON, korrekte antall, `source`/`realtime`, ekte kildelenker, karantener |
| Nettside og mobil | Søkeresultater med restaurant, rett og kilde; navigasjon fungerer uten horisontal overflow |
| Pris og tidsangivelser | Bare verdier fra de dokumenterte kildene; ikke omtale som nåtidspris uten ny verifikasjon |
| Full DB-produksjon | Read-write status, aktuell kildedata, samkjørt katalog, vellykket prøve på live-DB, separate booking/Revenue-tester |
| Kostnad | Ingen oppgradering eller aktivering av betalingsfunksjon uten separat godkjenning |

## Henvisninger

- [Hendelse, størrelser, backup og FK-analyse](fysen-storage-readonly-recovery-2026-11-02.md)
- [Supabase prosjektregister](supabase-project-inventory.md)
- [Fysen issue #1147: produksjonsblokker](https://github.com/Paradispartiet/fysen/issues/1147)
- [Free arkiv-API PR #1165](https://github.com/Paradispartiet/fysen/pull/1165)
- [Verifisert karantene PR #1178](https://github.com/Paradispartiet/fysen/pull/1178)
- [Mobil fallback-bevis PR #1179](https://github.com/Paradispartiet/fysen/pull/1179)
- [Supabase størrelse, disk og Fair Use](https://supabase.com/docs/guides/platform/database-size)

Dokumentstatus: Gratisdrift valgt. Destruktiv opprydding, databaseoverføring, restart av stoppet full-disk original eller abonnement er **ikke godkjent**.
