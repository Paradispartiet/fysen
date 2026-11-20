# Fysen: privat, kryptert fullbackup av applikasjonsdatabasen (20.11.2026)

**Status: verktøyet er klargjort og kontrollert i offline-tester, men ingen live backup er utført.** En full, kryptert backup og full restore er fortsatt en sperre før produksjonsmigrering. Dette dokumentet og de to hjelpefilene ligger på PR #1231, ikke i produksjon.

## Eksakt omfang

- Lesende PostgreSQL 17 pg_dump av hele schemaet 'fysen' fra **originalprosjektet** 'voglczxxtbwcxjrbffbt': 29 applikasjonstabeller, appens schema_migrations og deres data/DDL/indekser/constraints/sekvenser samt tilgangsmetadata som pg_dump inkluderer.
- Dette inkluderer ikke andre Postgres-skjemaer, globale roller, Supabase Auth/Storage, andre eksterne tjenester, edge-funksjoner, tilkoblede kilder eller Vercel-konfigurasjon. Det ble observert 0 Supabase Auth-brukere og 0 Storage-objekter 20. november; kontroller dette på nytt ved faktisk eksport.
- pg_dump lager en konsistent snapshot av kilden uten å skrive i databasen. Data streames via age-kryptering direkte til fil, uten ukryptert dump på disk. Ingen automatisk Google Drive-opplasting, GitHub-artifakt, app-deploy, databasemigrering eller planendring.
- Det private backupmålet og krypteringsnøklene må konfigureres av autorisert operatør på en privat maskin. Ingen persondata eller nøkler skal kopieres til repoet, ChatGPT, CI-logger eller offentlige artefakter.

## Før den manuelle eksporten

Bruk en privat Linux-maskin med `pg_dump` fra PostgreSQL 17, offisiell `age`, `sha256sum` og GNU `stat`. Opprett separat age X25519-nøkkel med 'age-keygen'. **Behold den private identitetsfilen separat og sikkerhetskopier den uavhengig av arkivet; uten nøkkelen kan dumpen ikke gjenopprettes.** Kontroller kostnader, organisasjonskvote og egress for et opptil ~1,7 GB databaseuttak; ingen abonnementsoppgradering er autorisert.

Sett PostgreSQL-miljøvariabler fra en allerede verifisert, privat forbindelse til originalen:
- `PGHOST`/`PGUSER`: bruk eksakt `db.voglczxxtbwcxjrbffbt.supabase.co` med bruker `postgres`, eller Supabases session-pooler `aws-[indeks]-[region].pooler.supabase.com` med `postgres.voglczxxtbwcxjrbffbt`. Kopier faktisk pooler-host fra Supabase Connect. `PGPORT=5432`; ikke transaction-pooler `6543`.
- `PGHOSTADDR`, `PGSERVICE` og `PGSERVICEFILE` må være unset, fordi libpq ellers kan overstyre valgt server.
- PGDATABASE=postgres
- `PGSSLMODE=verify-full` er påkrevd. Sett `PGSSLROOTCERT` til en lesbar, absolutt filbane for Supabase-prosjektets nedlastede CA-sertifikat fra Dashboard → Database → SSL Configuration. `require`/`verify-ca` godtas ikke: de verifiserer ikke både CA og vertsnavn. Se [Supabase SSL-dokumentasjon](https://supabase.com/docs/guides/platform/ssl-enforcement).
- PGPASSFILE: beskyttet privat fil med 0600-tillatelser, heller enn å skrive passord i kommandolinjen
- `FYSEN_BACKUP_AGE_RECIPIENT`: offentlig `age1...`-nøkkel.
- `FYSEN_BACKUP_DEST`: eksisterende katalog eid av operatøren, med nøyaktig tilgang `0700`; ikke en symbolsk lenke.

Eksempel etter at forbindelse og nøkler er konfigurert lokalt:

~~~bash
umask 077
mkdir -p "$HOME/Fysen-private-backups"
chmod 700 "$HOME/Fysen-private-backups"
export FYSEN_BACKUP_DEST="$HOME/Fysen-private-backups"
export FYSEN_BACKUP_AGE_RECIPIENT='age1...erstatt_med_ekte_offentlig_noekkel'
bash docs/fysen-private-full-backup.sh
~~~

Verktøyet blokkerer GitHub Actions/CI, svak TLS og manglende CA/vertsnavnkontroll, ukjent eller forfalsket host, `PGHOSTADDR`-/PGSERVICE-overstyring, recovery-kilde, transaction-pooler-port, manglende `age`-nøkkel, ukontrollert backupkatalog og manglende passordmekanisme. Det kjører en read-only session og fjerner ufullstendige krypterte .partial-filer ved feil. Den krypterte filen får SHA-256-manifest; dette beviser kun filens integritet, ikke en vellykket restaurering.

## Restore-kontroll i isolasjon (ikke på Supabase)

1. Kopier den krypterte filen og .sha256-filen tilbake fra den private lagringsdestinasjonen. Kontroller med 'sha256sum -c' fra katalogen som inneholder filene.
2. Med din **private** age-identitet, inspiser innholdet uten å skrive ut raddata:

~~~bash
age -d -i /privat/noekkel/fysen-age-identity.txt \
  /privat/arkiv/fysen-original-YYYYMMDDTHHMMSSZ-XXXX.pgdump.age \
  | pg_restore --list
~~~

3. Opprett en disponibel, adgangskontrollert PostgreSQL 17 + PostGIS-database. Klargjør 'public' med 'postgis' og 'pg_trgm' og 'extensions' med 'pgcrypto' før restore. Inspiser DDL og dekrypter inn i pg_restore med '--exit-on-error' mot **den isolerte** databasen. Dersom Supabase-rollene mangler i testmiljøet, kan en prøverestaurering bruke '--no-owner --no-acl'; bevar originaldumpen med tilgangsmetadata uendret.
4. Bekreft samtlige 29 applikasjonstabeller, appens migrasjonsregister, antall, nøkler, FK-er, menyposter og søkeresultatreferanser mot en dokumentert kildeinventar fra eksporttidspunktet. Hvis datakilden fortsetter å endres, bruk eksplisitt cutover/frysetidspunkt og differansekontroll. Et bestått 'pg_restore --list' alene er ikke nok.
5. Bevar i tillegg det tidligere historiske 2. november-arkivet separat (opprinnelig dump-SHA-256 '1fd0385d2194ff6bcb80bc10cf04f577b4c970c9524a7c38a5f1382a7fefba0e') og eget arkiv over søkeresultatreferanser. Den historiske dumpen omfatter flere gamle menyendringer enn dagens original, så den skal **ikke** overskrives.

Tidligere dokumentert privat lagringssted: https://drive.google.com/drive/folders/1Ml52aXi2qr_2-smBrEXvgxGhBqgclIUW . Tilgjengeligheten til de fire ZIP-delene er **ikke kontrollert på nytt** i denne sesjonen. De midlertidige GitHub-artifaktene utløper 2. desember 2026.

## Målrettede tester

~~~bash
bash docs/fysen-private-full-backup.test.sh
~~~

Testen er offline og bruker erstatninger for `pg_dump` og `age`. Den ble kjørt på eksakt GitHub-filinnhold 20. november: lykkesti, SHA-256, eksakt kilde/pooler-bruker, blokkert host spoof, `PGHOSTADDR`, PGSERVICE, transaction-pooler-port, CI, usikker lagringskatalog, opprydding ved både dump- og krypteringsfeil og avvist svak TLS. Den **tester ikke ekte kryptering, databaseeksport, Google Drive-opplasting eller full gjenoppretting**. Disse må verifiseres separat før en eventuell godkjent produksjonsbeslutning.
